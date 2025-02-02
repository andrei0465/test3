"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

const data = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
]

interface DrawerDemoProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function DrawerDemo({ open, setOpen }: DrawerDemoProps) {
    const [goal, setGoal] = React.useState(350)

    // const drawerRef = React.useRef<HTMLDivElement | null>(null)

    // React.useEffect(() => {
    //     function handleClickOutside(event: MouseEvent) {
    //         // Close if clicked outside the drawer
    //         if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
    //             setOpen(false)
    //         }
    //     }

    //     if (open) {
    //         // Attach event listener when the drawer is open
    //         document.addEventListener("mousedown", handleClickOutside)
    //     } else {
    //         // Remove event listener when the drawer is closed
    //         document.removeEventListener("mousedown", handleClickOutside)
    //     }

    //     return () => {
    //         // Cleanup the event listener on unmount
    //         document.removeEventListener("mousedown", handleClickOutside)
    //     }
    // }, [open, setOpen])

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }

    return (
        <Drawer open={open} modal={true} dismissible={true}>
            {/* <DrawerContent ref={drawerRef}> */}
            <DrawerContent className="rounded-t-none">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Move Goal</DrawerTitle>
                        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                    </DrawerHeader>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
