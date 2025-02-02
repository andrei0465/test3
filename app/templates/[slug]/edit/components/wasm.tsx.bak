
'use client'

import { useWasm } from "@/lib/useWasm"

export function WasmDemo() {
    // (globalThis as any).__parse_terraform_config_wasm__ = {};

    // let mod
    // if (typeof window !== 'undefined') {
    //     mod = useWasm(`${window.location.origin}/main.wasm`)
    // }

    if (typeof window !== 'undefined') {
        const [mod] = useWasm(`${window.location.origin}/main.wasm`)

        console.log(mod?.parse("main.tf", `provider "kubernetes" {
  # Configuration options
}`, () => { }))
    }

    return ""
}