import React, { useState, useEffect } from "react";

/**
 * Fenêtre d'inventaire affichant les composants possédés par le joueur.
 * @param {Object} props
 * @param {Player} props.player - L'instance du joueur.
 */
export default function InventoryWindow({ player }) {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");

    // Met à jour l'affichage de l'inventaire
    const refreshInventory = () => {
        if (player && player.inventory) {
            setItems(player.inventory.getAllItems());
        }
    };

    useEffect(() => {
        refreshInventory();
        // Idéalement, on devrait s'abonner à des changements de l'inventaire,
        // mais pour l'instant on rafraîchit au montage.
        // On pourrait ajouter un intervalle ou un événement si nécessaire.
        const interval = setInterval(refreshInventory, 1000);
        return () => clearInterval(interval);
    }, [player]);

    const filteredItems = items.filter((item) => {
        if (filter === "all") return true;
        return item.type === filter;
    });

    const categories = [
        { id: "all", label: "Tout" },
        { id: "cpu", label: "Processeurs" },
        { id: "motherboard", label: "Cartes Mères" },
        { id: "ram", label: "RAM" },
        { id: "gpu", label: "GPU" },
        { id: "storage", label: "Stockage" },
        { id: "psu", label: "Alim." },
        { id: "case", label: "Boîtiers" },
        { id: "cooler", label: "Refroid." },
    ];

    return (
        <div className="flex flex-col h-full bg-[#ECE9D8] font-sans text-sm">
            {/* Barre d'outils / Filtres */}
            <div className="bg-[#ECE9D8] border-b border-[#ACA899] p-2 flex gap-2 overflow-x-auto">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={`px-3 py-1 rounded border ${
                            filter === cat.id
                                ? "bg-white border-[#ACA899] font-bold shadow-inner"
                                : "bg-[#ECE9D8] border-transparent hover:bg-[#316AC5] hover:text-white hover:border-[#316AC5]"
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Liste des items */}
            <div className="flex-1 overflow-auto p-2 bg-white border-2 border-[#ACA899] m-2 shadow-inner">
                {filteredItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <p className="text-xl">Aucun objet trouvé</p>
                    </div>
                ) : (
                    <table className="w-full border-collapse text-left">
                        <thead className="bg-[#ECE9D8] sticky top-0">
                            <tr>
                                <th className="border border-[#ACA899] px-2 py-1 w-1/2">
                                    Nom
                                </th>
                                <th className="border border-[#ACA899] px-2 py-1 w-1/4">
                                    Type
                                </th>
                                <th className="border border-[#ACA899] px-2 py-1 w-1/4 text-right">
                                    Quantité
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-[#316AC5] hover:text-white group"
                                >
                                    <td className="border border-[#E0DFE3] px-2 py-1">
                                        <span className="font-bold">
                                            {item.component.brand?.name}
                                        </span>{" "}
                                        {item.component.model}
                                    </td>
                                    <td className="border border-[#E0DFE3] px-2 py-1 capitalize">
                                        {item.type}
                                    </td>
                                    <td className="border border-[#E0DFE3] px-2 py-1 text-right font-mono font-bold">
                                        {item.quantity}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Barre d'état */}
            <div className="bg-[#ECE9D8] border-t border-[#ACA899] px-2 py-1 text-xs text-gray-600">
                {filteredItems.length} élément(s)
            </div>
        </div>
    );
}
