import React, { useState } from "react";
import Catalogue from "../../window/Catalogue";

export default function WebCatalogue({
    player,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
}) {
    const [view, setView] = useState("store"); // 'store' or 'cart'

    // Sécurisation du panier pour gérer l'ancien format (migration à la volée)
    const safeCart = cart.map((item) =>
        item.product ? item : { product: item, quantity: 1 }
    );

    const cartTotal = safeCart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const cartCount = safeCart.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        if (player.getSolde() < cartTotal) {
            alert("Fonds insuffisants !");
            return;
        }

        try {
            player.debit(cartTotal);

            safeCart.forEach((cartItem) => {
                // Mapping des catégories vers les types d'inventaire
                const typeMapping = {
                    processors: "cpu",
                    motherboards: "motherboard",
                    graphicsCards: "gpu",
                    ramModules: "ram",
                    powerSupplies: "psu",
                    cpuCoolers: "cooler",
                    cases: "case",
                    rackBays: "rackBay",
                    storageDevices: "storage",
                };
                const type =
                    typeMapping[cartItem.product.category] ||
                    cartItem.product.category;

                // Ajoute la quantité achetée à l'inventaire
                for (let i = 0; i < cartItem.quantity; i++) {
                    player.inventory.add(cartItem.product, type);
                }
            });

            clearCart();
            alert("Commande validée ! Merci pour votre achat.");
            setView("store");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header du site e-commerce */}
            <div className="bg-gray-800 text-white p-3 flex justify-between items-center shadow-md z-10">
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setView("store")}
                >
                    <span className="text-2xl">🛒</span>
                    <span className="font-bold text-xl tracking-tight">
                        CyberMarket
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition-colors"
                        onClick={() => setView("cart")}
                    >
                        <span className="text-xl">🛍️</span>
                        <span className="font-bold">{cartCount}</span>
                        <span className="text-sm text-gray-300">
                            ({cartTotal} €)
                        </span>
                    </div>
                </div>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 overflow-hidden relative">
                {view === "store" ? (
                    <Catalogue onAddToCart={addToCart} />
                ) : (
                    <div className="h-full overflow-auto bg-gray-100 p-8 font-sans">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                            Votre Panier
                        </h2>

                        {cart.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">
                                <p className="text-xl">
                                    Votre panier est vide.
                                </p>
                                <button
                                    onClick={() => setView("store")}
                                    className="mt-4 text-blue-600 hover:underline"
                                >
                                    Retourner à la boutique
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div className="bg-white rounded shadow-md overflow-hidden">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-gray-200 text-gray-700">
                                            <tr>
                                                <th className="p-3 border-b">
                                                    Produit
                                                </th>
                                                <th className="p-3 border-b text-center">
                                                    Quantité
                                                </th>
                                                <th className="p-3 border-b text-right">
                                                    Prix Unitaire
                                                </th>
                                                <th className="p-3 border-b text-right">
                                                    Total
                                                </th>
                                                <th className="p-3 border-b text-center">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {safeCart.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-b hover:bg-gray-50"
                                                >
                                                    <td className="p-3">
                                                        <span className="font-bold">
                                                            {
                                                                item.product
                                                                    .brand?.name
                                                            }
                                                        </span>{" "}
                                                        {item.product.model}
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        index,
                                                                        -1
                                                                    )
                                                                }
                                                                className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-8 text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        index,
                                                                        1
                                                                    )
                                                                }
                                                                className="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300 font-bold"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-right font-mono">
                                                        {item.product.price} €
                                                    </td>
                                                    <td className="p-3 text-right font-mono font-bold">
                                                        {item.product.price *
                                                            item.quantity}{" "}
                                                        €
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <button
                                                            onClick={() =>
                                                                removeFromCart(
                                                                    index
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-700 font-bold"
                                                        >
                                                            ✕
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot className="bg-gray-100 font-bold text-lg">
                                            <tr>
                                                <td
                                                    colSpan="3"
                                                    className="p-3 text-right"
                                                >
                                                    Total :
                                                </td>
                                                <td className="p-3 text-right text-green-700">
                                                    {cartTotal} €
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>

                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        onClick={() => setView("store")}
                                        className="px-6 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-200"
                                    >
                                        Continuer mes achats
                                    </button>
                                    <button
                                        onClick={handleCheckout}
                                        className="px-6 py-2 bg-green-600 text-white rounded font-bold shadow hover:bg-green-700 active:translate-y-0.5"
                                    >
                                        Payer ({cartTotal} €)
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
