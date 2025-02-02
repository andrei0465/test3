"use client";

// import { Metadata } from "next";
import Image from "next/image";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// import { CodeViewer } from "./components/code-viewer";
// import { MaxLengthSelector } from "./components/maxlength-selector";
// import { ModelSelector } from "./components/model-selector";
// import { PresetActions } from "./components/preset-actions";
import { PresetSave } from "./components/preset-save";
import { PresetSelector } from "./components/preset-selector";
// import { PresetShare } from "./components/preset-share";
// import { TemperatureSelector } from "./components/temperature-selector";
// import { TopPSelector } from "./components/top-p-selector";
// import { models, types } from "./data/models";
import { presets } from "./data/presets";

import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { DrawerDemo } from "./components/drawer";
import React from "react";
// import { WasmDemo } from "./components/wasm";
import { useWasm } from "@/lib/useWasm";

// export const metadata: Metadata = {
//   title: "Playground",
//   description: "The OpenAI Playground built using the components.",
// };

// TODO: change position of this
// if (typeof window !== 'undefined') {
//   document.body.style.overflow = 'hidden'
// }

export default function PlaygroundPage() {
  const editorRef = useRef(null);

  const [wasmExp, loading, error] = useWasm(`${typeof window !== "undefined" ? window.location.origin : ""}/main.wasm`);

  useEffect(() => {
    if (!wasmExp) return; // Prevent running before WASM is ready
    console.log("WASM is loaded:", wasmExp);
  }, [wasmExp]);

  const onChange = useCallback(
    (value: string | undefined) => {
      if (!wasmExp || !value) return; // Prevent running if WASM isn't ready
      try {
        console.log(wasmExp.parse("main.tf", value, () => { }));
      } catch (error) {
        console.error("Error in WASM parse:", error);
      }
    },
    [wasmExp]
  );

  function handleEditorDidMount(editor: any) {
    // editor.setValue("asd")
    // console.log(editor.getValue())
    // console.log(mod?.parse("main.tf", ``, () => { }))
    editorRef.current = editor;
  }

  const data = `resource "kubernetes_pod_v1" "test" {
  metadata {
    name = "terraform-example"
  }

  spec {
    container {
      image = "nginx:1.21.6"
      name  = "example"

      env {
        name  = "environment"
        value = "test"
      }

      port {
        container_port = 80
      }

      liveness_probe {
        http_get {
          path = "/"
          port = 80

          http_header {
            name  = "X-Custom-Header"
            value = "Awesome"
          }
        }

        initial_delay_seconds = 3
        period_seconds        = 3
      }
    }

    dns_config {
      nameservers = ["1.1.1.1", "8.8.8.8", "9.9.9.9"]
      searches    = ["example.com"]

      option {
        name  = "ndots"
        value = 1
      }

      option {
        name = "use-vc"
      }
    }

    dns_policy = "None"
  }
}`;

  const [open, setOpen] = React.useState(false)

  // Programmatically open the drawer from the root component
  const openDrawer = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="hidden h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <Button onClick={openDrawer}>Open Drawer from Root</Button>
            {/* <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div> */}
            {/* <PresetActions /> */}
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="h-full">
            <div className="md:order-1">
              <TabsContent value="complete" className="mt-0 border-0 p-0">
                <div className="flex h-full flex-col space-y-4">
                  <Editor
                    height="90vh"
                    defaultLanguage="hcl"
                    defaultValue={data}
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    onChange={onChange}
                  />
                </div>
              </TabsContent>
              <TabsContent value="insert" className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                  <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                    <Textarea
                      placeholder="We're writing to [inset]. Congrats from OpenAI!"
                      className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                    />
                    <div className="rounded-md border bg-muted"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button>Submit</Button>
                    <Button variant="secondary">
                      <span className="sr-only">Show history</span>
                      <RotateCcw />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="edit" className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                  <div className="grid h-full gap-6 lg:grid-cols-2">
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-1 flex-col space-y-2">
                        <Label htmlFor="input">Input</Label>
                        <Textarea
                          id="input"
                          placeholder="We is going to the market."
                          className="flex-1 lg:min-h-[580px]"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="instructions">Instructions</Label>
                        <Textarea
                          id="instructions"
                          placeholder="Fix the grammar."
                        />
                      </div>
                    </div>
                    <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button>Submit</Button>
                    <Button variant="secondary">
                      <span className="sr-only">Show history</span>
                      <RotateCcw />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>

      <DrawerDemo open={open} setOpen={setOpen} />
    </>
  );
}
