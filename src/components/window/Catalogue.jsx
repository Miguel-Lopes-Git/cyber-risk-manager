import { useState, useRef } from "react";
import {
    processors,
    motherboards,
    graphicsCards,
    ramModules,
    powerSupplies,
    cases,
    cpuCoolers,
} from "@/data/initialData";

const categories = [
    { id: "processors", label: "Processeurs", data: processors },
    { id: "motherboards", label: "Cartes Mères", data: motherboards },
    { id: "graphicsCards", label: "Cartes Graphiques", data: graphicsCards },
    { id: "ramModules", label: "Mémoire RAM", data: ramModules },
    { id: "powerSupplies", label: "Alimentations", data: powerSupplies },
    { id: "cpuCoolers", label: "Refroidissement", data: cpuCoolers },
    { id: "cases", label: "Boîtiers", data: cases },
];

export default function Catalogue() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [selectedItem, setSelectedItem] = useState(null);
    const listRef = useRef(null);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedItem(null);
        if (listRef.current) {
            listRef.current.scrollTop = 0;
        }
    };

    return (
        <div className="flex w-full h-full bg-[#ECE9D8] font-sans text-sm">
            {/* Sidebar - Categories */}
            <div className="w-48 flex flex-col gap-1 p-2 border-r-2 border-white shadow-[inset_-1px_-1px_0_0_#ACA899,inset_1px_1px_0_0_white]">
                <div className="bg-linear-to-r from-[#3E6FD8] to-[#96B4E8] p-2 mb-2">
                    <h2 className="text-white font-bold text-lg">Catégories</h2>
                </div>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat)}
                        className={`text-left px-3 py-2 border border-transparent hover:underline hover:text-blue-800 ${
                            selectedCategory.id === cat.id
                                ? "font-bold text-blue-700 bg-white border-[#ACA899]"
                                : "text-gray-800"
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Main Content - List */}
            <div className="flex-1 flex flex-col p-2 overflow-hidden">
                <div
                    ref={listRef}
                    className="bg-white border-2 border-[#ACA899] h-full overflow-auto p-1"
                >
                    <table className="w-full border-collapse">
                        <thead className="bg-[#ECE9D8] sticky top-0">
                            <tr>
                                <th className="border border-[#ACA899] px-2 py-1 text-left w-2/3">
                                    Nom du produit
                                </th>
                                <th className="border border-[#ACA899] px-2 py-1 text-right w-1/3">
                                    Prix
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(selectedCategory.data).map(
                                ([key, item]) => (
                                    <tr
                                        key={key}
                                        onClick={() => setSelectedItem(item)}
                                        className={`cursor-pointer hover:bg-[#316AC5] hover:text-white ${
                                            selectedItem === item
                                                ? "bg-[#316AC5] text-white"
                                                : "even:bg-gray-50"
                                        }`}
                                    >
                                        <td className="border border-[#E0DFE3] px-2 py-1">
                                            {item.brand?.name} {item.model}
                                        </td>
                                        <td className="border border-[#E0DFE3] px-2 py-1 text-right">
                                            {item.price} €
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Panel (Right or Bottom, let's do Right for wide screens) */}
            {selectedItem && (
                <div className="w-64 bg-[#F0F0F0] border-l-2 border-white shadow-[inset_1px_1px_0_0_#ACA899] p-4 overflow-auto flex flex-col gap-4">
                    <div className="border-b border-[#ACA899] pb-2">
                        <h3 className="font-bold text-lg text-blue-800">
                            {selectedItem.brand?.name}
                        </h3>
                        <h4 className="text-md font-semibold">
                            {selectedItem.model}
                        </h4>
                        <p className="text-xl font-bold text-green-700 mt-2">
                            {selectedItem.price} €
                        </p>
                    </div>

                    <div className="text-xs">
                        <h5 className="font-bold mb-1 underline">
                            Spécifications :
                        </h5>
                        <ul className="list-disc pl-4 space-y-1">
                            {Object.entries(selectedItem).map(
                                ([key, value]) => {
                                    if (
                                        key === "brand" ||
                                        key === "model" ||
                                        key === "price"
                                    )
                                        return null;
                                    if (
                                        typeof value === "object" &&
                                        value !== null
                                    )
                                        return null; // Skip complex objects for now
                                    if (value === undefined || value === null)
                                        return null;
                                    return (
                                        <li key={key}>
                                            <span className="font-semibold capitalize">
                                                {key}:
                                            </span>{" "}
                                            {value.toString()}
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
