import { useEffect, useState } from "react";
import { useWindows } from "@/contexts/WindowContext";
import Image from "next/image";

export default function Footer({ className }) {
    const [currentWeather, setCurrentWeather] = useState("");
    const [contextMenu, setContextMenu] = useState(null);
    const { windows, restoreWindow, closeWindow } = useWindows();

    const handleContextMenu = (e, windowId) => {
        e.preventDefault();
        setContextMenu({
            windowId,
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleCloseWindow = (windowId) => {
        closeWindow(windowId);
        setContextMenu(null);
    };

    useEffect(() => {
        document.addEventListener("click", handleCloseContextMenu);
        return () => {
            document.removeEventListener("click", handleCloseContextMenu);
        };
    }, []);

    useEffect(() => {
        // Fetch current weather data from a weather API
        async function fetchWeather() {
            try {
                const response = await fetch(
                    "https://api.open-meteo.com/v1/forecast?latitude=49.25&longitude=4.03&hourly=temperature_2m&forecast_hours=1"
                );
                const data = await response.json();
                if (data && data.hourly && data.hourly.temperature_2m) {
                    setCurrentWeather(data.hourly.temperature_2m[0] + "°C");
                    console.log(data.hourly.temperature_2m[0] + "°C");
                }
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        }

        fetchWeather();
    }, []);

    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleString("fr-FR", {
            hour: "numeric",
            minute: "numeric",
        })
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(
                new Date().toLocaleString("fr-FR", {
                    hour: "numeric",
                    minute: "numeric",
                })
            );
        }, 10000); // Met à jour toutes les 10 secondes

        return () => clearInterval(interval);
    }, []);

    return (
        <footer
            className={
                "flex justify-between pt-4 px-8 select-none " + className
            }
        >
            {/* Start menu and open windows */}
            <div className="flex gap-2 items-center relative">
                {windows.map((window) => (
                    <button
                        key={window.id}
                        onClick={() => restoreWindow(window.id)}
                        onContextMenu={(e) => handleContextMenu(e, window.id)}
                        className={`p-2 rounded border-2 flex items-center justify-center w-16 h-16 ${
                            window.isMinimized
                                ? "bg-gray-200 border-gray-400"
                                : "bg-blue-500 border-blue-700"
                        } hover:bg-blue-600 hover:border-blue-800 transition-colors`}
                        title={window.title}
                    >
                        <Image
                            src={window.iconPath}
                            alt={window.title}
                            width={40}
                            height={40}
                        />
                    </button>
                ))}

                {/* Context Menu */}
                {contextMenu && (
                    <div
                        className="fixed bg-white border-2 border-gray-300 rounded shadow-lg z-50"
                        style={{
                            left: `${contextMenu.x}px`,
                            top: `${contextMenu.y - 50}px`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() =>
                                handleCloseWindow(contextMenu.windowId)
                            }
                            className="px-4 py-2 hover:bg-gray-200 w-full text-left text-gray-800"
                        >
                            Fermer la fenêtre
                        </button>
                    </div>
                )}
            </div>

            {/* Right information */}
            <div className="flex gap-6">
                {/* Weather */}
                <div>
                    <span className="text-3xl px-3 py-2 bg-gray-300 rounded-lg">
                        {currentWeather || "00°C"}
                    </span>
                </div>

                {/* Time */}
                <div>
                    <span className="text-3xl px-3 py-2 bg-gray-300 rounded-lg">
                        {currentTime}
                    </span>
                </div>
            </div>
        </footer>
    );
}
