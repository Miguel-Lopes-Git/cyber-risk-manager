import React from "react";

export default function Bank({ player }) {
    return (
        <div className="h-full bg-gray-100 font-sans overflow-auto">
            {/* Header Banque */}
            <div className="bg-[#003366] text-white p-4 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                    <div className="text-3xl">🏦</div>
                    <div>
                        <h1 className="text-2xl font-bold">CyberBank</h1>
                        <p className="text-xs text-gray-300">
                            La banque de demain, aujourd'hui.
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold">
                        Bonjour, {player?.name || "Client"}
                    </p>
                    <p className="text-xs opacity-80">
                        Dernière connexion : Aujourd'hui
                    </p>
                </div>
            </div>

            <div className="p-8 max-w-4xl mx-auto">
                {/* Solde */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-[#003366]">
                    <h2 className="text-gray-500 text-sm uppercase font-bold mb-1">
                        Solde du compte courant
                    </h2>
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-bold text-[#003366]">
                            {player?.getSolde() || 0} €
                        </span>
                        <span className="text-green-600 font-bold text-sm">
                            +0.00% (Derniers 24h)
                        </span>
                    </div>
                </div>

                {/* Actions rapides */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <button className="bg-white p-4 rounded shadow hover:bg-blue-50 text-[#003366] font-bold flex flex-col items-center gap-2 transition-colors">
                        <span className="text-2xl">💸</span>
                        Virement
                    </button>
                    <button className="bg-white p-4 rounded shadow hover:bg-blue-50 text-[#003366] font-bold flex flex-col items-center gap-2 transition-colors">
                        <span className="text-2xl">💳</span>
                        Cartes
                    </button>
                    <button className="bg-white p-4 rounded shadow hover:bg-blue-50 text-[#003366] font-bold flex flex-col items-center gap-2 transition-colors">
                        <span className="text-2xl">📄</span>
                        Relevés
                    </button>
                </div>

                {/* Historique des transactions (Fictif) */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                        <h3 className="font-bold text-gray-700">
                            Dernières opérations
                        </h3>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-gray-500 text-sm border-b border-gray-100">
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">
                                    Libellé
                                </th>
                                <th className="px-6 py-3 font-medium text-right">
                                    Montant
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="border-b border-gray-50 hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-500">
                                    23/11/2025
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    Ouverture de compte
                                </td>
                                <td className="px-6 py-4 text-right text-green-600 font-bold">
                                    +5000.00 €
                                </td>
                            </tr>
                            {/* On pourrait ajouter d'autres transactions fictives ici */}
                        </tbody>
                    </table>
                    <div className="p-4 text-center border-t border-gray-100">
                        <button className="text-blue-600 hover:underline text-sm font-medium">
                            Voir tout l'historique
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
