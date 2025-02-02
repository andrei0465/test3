import { useEffect, useState } from "react";

export function useWasm(path: string) {
    const [state, setState] = useState<[any, boolean, Error | null]>([
        null,
        true,
        null,
    ]);

    async function getWasm(path: string) {
        try {
            if (typeof window === "undefined") return null; // Ensure it's client-side

            if (!("Go" in window)) {
                console.error("wasm_exec.js is not loaded.");
                return null;
            }

            // @ts-ignore
            const go = new window.Go(); // Defined in wasm_exec.js
            const resp = await fetch(path);
            const bytes = await resp.arrayBuffer();
            const { instance } = await WebAssembly.instantiate(bytes, go.importObject);

            // Ensure globalThis is modified only when WASM is ready
            (globalThis as any).__parse_terraform_config_wasm__ = {};

            go.run(instance); // Runs WebAssembly

            return (globalThis as any).__parse_terraform_config_wasm__;
        } catch (e) {
            console.error("Error loading WASM:", e);
            return null;
        }
    }

    useEffect(() => {
        if (typeof window === "undefined") return; // Prevent running during SSR

        getWasm(path)
            .then((exp) => {
                setState([exp, false, null]);
                console.log("WASM initialized:", exp);
            })
            .catch((err) => {
                console.error("WASM initialization failed:", err);
                setState([null, false, err]);
            });
    }, [path]);

    return state;
}
