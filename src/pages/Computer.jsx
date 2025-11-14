"use client";

import { useEffect, useRef } from "react";
import { initScreenEffect } from "@/lib/crtEffect";
import "@/styles/crt-effect.css";

export default function Computer() {
    const screenRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined" && screenRef.current) {
            const screen = initScreenEffect("#screen");

            // Cleanup function
            return () => {
                // Clean up the screen effect if needed
                if (screen && screen.nodes && screen.nodes.container) {
                    screen.nodes.container.remove();
                }
            };
        }
    }, []);

    return (
        <>
            <div id="screen" ref={screenRef}>
                <div className="bg-red-600 w-50 h-50 hover:bg-amber-400"></div>
            </div>
        </>
    );
}
