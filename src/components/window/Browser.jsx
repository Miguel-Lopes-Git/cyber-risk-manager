import React, { useState } from "react";
import Homepage from "@/components/browser/pages/Homepage";
import Bank from "@/components/browser/pages/Bank";
import Taxes from "@/components/browser/pages/Taxes";
import WebCatalogue from "@/components/browser/pages/WebCatalogue";

export default function Browser({ player }) {
    const [history, setHistory] = useState(["home"]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [urlInput, setUrlInput] = useState("www.google.com");
    const [cart, setCart] = useState([]);

    const currentPage = history[currentIndex];

    const addToCart = (item) => {
        setCart((prev) => {
            // Normalisation préventive
            const normalizedPrev = prev.map((i) =>
                i.product ? i : { product: i, quantity: 1 }
            );

            const existingIndex = normalizedPrev.findIndex(
                (i) => i.product.model === item.model
            );
            if (existingIndex >= 0) {
                const newCart = [...normalizedPrev];
                newCart[existingIndex] = {
                    ...newCart[existingIndex],
                    quantity: newCart[existingIndex].quantity + 1,
                };
                return newCart;
            }
            return [...normalizedPrev, { product: item, quantity: 1 }];
        });
    };

    const removeFromCart = (index) => {
        setCart((prev) => {
            const newCart = [...prev];
            newCart.splice(index, 1);
            return newCart;
        });
    };

    const updateQuantity = (index, delta) => {
        setCart((prev) => {
            const newCart = [...prev];
            let item = newCart[index];

            // Normalisation si nécessaire
            if (!item.product) {
                item = { product: item, quantity: 1 };
            }

            const newQ = item.quantity + delta;
            if (newQ <= 0) {
                newCart.splice(index, 1);
            } else {
                newCart[index] = { ...item, quantity: newQ };
            }
            return newCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    const navigate = (page) => {
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(page);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
        updateUrlInput(page);
    };

    const goBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            updateUrlInput(history[currentIndex - 1]);
        }
    };

    const goForward = () => {
        if (currentIndex < history.length - 1) {
            setCurrentIndex(currentIndex + 1);
            updateUrlInput(history[currentIndex + 1]);
        }
    };

    const updateUrlInput = (page) => {
        switch (page) {
            case "home":
                setUrlInput("www.google.com");
                break;
            case "bank":
                setUrlInput("www.cyberbank.com");
                break;
            case "taxes":
                setUrlInput("www.impots.gouv.fr");
                break;
            case "catalogue":
                setUrlInput("www.cybermarket.com");
                break;
            default:
                setUrlInput("about:blank");
        }
    };

    const handleUrlSubmit = (e) => {
        e.preventDefault();
        // Simple URL routing simulation
        const lowerUrl = urlInput.toLowerCase();
        if (lowerUrl.includes("google")) navigate("home");
        else if (lowerUrl.includes("bank")) navigate("bank");
        else if (lowerUrl.includes("impot")) navigate("taxes");
        else if (lowerUrl.includes("market") || lowerUrl.includes("shop"))
            navigate("catalogue");
        else navigate("home"); // Default fallback
    };

    const renderContent = () => {
        switch (currentPage) {
            case "home":
                return <Homepage navigate={navigate} />;
            case "bank":
                return <Bank player={player} />;
            case "taxes":
                return <Taxes />;
            case "catalogue":
                return (
                    <WebCatalogue
                        player={player}
                        cart={cart}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        clearCart={clearCart}
                        updateQuantity={updateQuantity}
                    />
                );
            default:
                return <Homepage navigate={navigate} />;
        }
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 font-sans">
            {/* Browser Toolbar */}
            <div className="bg-[#ECE9D8] border-b border-gray-400 p-1 flex items-center gap-2 shadow-sm">
                <div className="flex gap-1">
                    <button
                        onClick={goBack}
                        disabled={currentIndex === 0}
                        className={`px-2 py-1 rounded border border-gray-400 ${
                            currentIndex === 0
                                ? "text-gray-400 bg-gray-100"
                                : "hover:bg-white bg-[#ECE9D8] text-black"
                        }`}
                    >
                        ←
                    </button>
                    <button
                        onClick={goForward}
                        disabled={currentIndex === history.length - 1}
                        className={`px-2 py-1 rounded border border-gray-400 ${
                            currentIndex === history.length - 1
                                ? "text-gray-400 bg-gray-100"
                                : "hover:bg-white bg-[#ECE9D8] text-black"
                        }`}
                    >
                        →
                    </button>
                    <button
                        onClick={() => navigate(currentPage)} // Refresh
                        className="px-2 py-1 rounded border border-gray-400 hover:bg-white bg-[#ECE9D8] text-black"
                    >
                        ↻
                    </button>
                    <button
                        onClick={() => navigate("home")}
                        className="px-2 py-1 rounded border border-gray-400 hover:bg-white bg-[#ECE9D8] text-black"
                    >
                        🏠
                    </button>
                </div>

                {/* Address Bar */}
                <form onSubmit={handleUrlSubmit} className="flex-1">
                    <div className="relative flex items-center bg-white border border-gray-400 rounded-sm shadow-inner">
                        <span className="pl-2 text-gray-400 text-xs">🌐</span>
                        <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            className="w-full px-2 py-1 text-sm focus:outline-none font-mono"
                        />
                        <button
                            type="submit"
                            className="px-2 text-green-600 hover:text-green-800"
                        >
                            ➜
                        </button>
                    </div>
                </form>
            </div>

            {/* Browser Content */}
            <div className="flex-1 overflow-hidden relative bg-white">
                {renderContent()}
            </div>

            {/* Status Bar */}
            <div className="bg-[#ECE9D8] border-t border-gray-400 px-2 py-0.5 text-xs text-gray-600 flex justify-between">
                <span>Terminé</span>
                <span>Internet</span>
            </div>
        </div>
    );
}
