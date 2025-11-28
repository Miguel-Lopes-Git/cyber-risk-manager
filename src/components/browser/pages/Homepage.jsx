import React from "react";

export default function Homepage({ navigate }) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-white font-sans">
            <div className="mb-8 text-center">
                <h1 className="text-6xl font-bold mb-2">
                    <span className="text-blue-600">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-500">o</span>
                    <span className="text-blue-600">g</span>
                    <span className="text-green-600">l</span>
                    <span className="text-red-500">e</span>
                </h1>
                <p className="text-gray-500 text-sm">Cyber Search</p>
            </div>

            <div className="w-full max-w-md flex gap-2 mb-8">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Rechercher sur le web..."
                />
                <button className="bg-gray-100 border border-gray-300 rounded px-4 py-2 hover:bg-gray-200 text-sm font-bold text-gray-700">
                    Rechercher
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-2xl px-4">
                <button
                    onClick={() => navigate("bank")}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded hover:shadow-md transition-shadow bg-gray-50"
                >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 text-2xl">
                        🏦
                    </div>
                    <span className="font-bold text-blue-700 underline">
                        Ma Banque
                    </span>
                    <span className="text-xs text-gray-500">
                        Gérez vos finances
                    </span>
                </button>

                <button
                    onClick={() => navigate("catalogue")}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded hover:shadow-md transition-shadow bg-gray-50"
                >
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 text-2xl">
                        🛒
                    </div>
                    <span className="font-bold text-blue-700 underline">
                        CyberMarket
                    </span>
                    <span className="text-xs text-gray-500">
                        Achetez vos composants
                    </span>
                </button>

                <button
                    onClick={() => navigate("taxes")}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded hover:shadow-md transition-shadow bg-gray-50"
                >
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2 text-2xl">
                        🏛️
                    </div>
                    <span className="font-bold text-blue-700 underline">
                        Impôts.gouv
                    </span>
                    <span className="text-xs text-gray-500">
                        Déclarez vos revenus
                    </span>
                </button>
            </div>
        </div>
    );
}
