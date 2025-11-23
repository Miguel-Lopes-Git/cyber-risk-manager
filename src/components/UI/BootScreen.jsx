import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Composant BootScreen (Écran de démarrage).
 * Simule un démarrage style Windows XP / Retro.
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onComplete - Fonction appelée à la fin du chargement.
 */
export default function BootScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Petit délai à la fin
                    return 100;
                }
                // Progression aléatoire pour simuler un chargement réel
                return prev + Math.random() * 5;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-gray z-[9999] flex flex-col items-center justify-center font-sans text-white">
            <div className="mb-8">
                {/* Placeholder pour le logo du système */}
                <div className="w-64 h-64 relative flex items-center justify-center">
                    {/* <Image
                        src="/images/boot-logo.png"
                        alt="System Logo"
                        width={200}
                        height={200}
                        className="object-contain"
                        onError={(e) => {
                            e.target.style.display = "none"; // Cache l'image si elle n'existe pas
                        }}
                    /> */}
                    {/* Fallback visuel si pas d'image */}
                    <div
                        className="absolute inset-0 flex items-center justify-center border-4 border-white/20 rounded-xl"
                        style={{ display: "none" }}
                    >
                        {" "}
                        {/* Masqué si image présente, à gérer mieux si besoin */}
                        <span className="text-4xl font-bold italic">
                            CyberOS
                        </span>
                    </div>
                </div>
                <h1 className="text-4xl font-bold mt-4 text-center italic tracking-wider">
                    <span className="text-[#F26522]">Cyber</span>
                    <span className="text-white">Risk</span>
                    <span className="text-[#00AEEF]">Manager</span>
                </h1>
            </div>

            {/* Barre de chargement style XP */}
            <div className="w-64 h-4 bg-gray-800 border border-gray-600 rounded-sm relative overflow-hidden p-0.5">
                <div className="w-full h-full flex gap-1">
                    {/* Les blocs de chargement qui défilent */}
                    <div
                        className="h-full bg-linear-to-b from-blue-400 to-blue-600 w-full origin-left animate-pulse"
                        style={{
                            width: `${Math.min(progress, 100)}%`,
                            transition: "width 0.1s linear",
                        }}
                    ></div>
                </div>
            </div>

            <div className="mt-4 text-sm text-gray-400 font-mono">
                Chargement du système... {Math.floor(progress)}%
            </div>

            <div className="absolute bottom-4 right-4 text-xs text-gray-600">
                Copyright © 1998-2025 CyberCorp
            </div>
        </div>
    );
}
