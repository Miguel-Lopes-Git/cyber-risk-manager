import RackBay from "./RackBay.js";
import Inventory from "./Inventory.js";

/**
 * Représente un joueur dans le jeu.
 * Gère le solde, le nom et la baie de serveurs du joueur.
 */
export default class Player {
    // Attributs publics
    name = "";
    inventory = new Inventory();

    // Attributs privés
    #solde = 0;
    #rackBay = new RackBay({
        brand: "Generic",
        model: "Start Rack",
        totalU: 2,
        price: 0,
    });

    /**
     * Constructeur de la classe Player (Joueur).
     * @param {string} name - Le nom du joueur.
     * @param {number} soldeInitial - Le solde initial du joueur.
     */
    constructor(name, soldeInitial) {
        this.name = name;
        this.#solde = soldeInitial;
    }

    /**
     * Définit le nom du joueur.
     * @param {string} name - Le nouveau nom.
     */
    setName(name) {
        this.name = name;
    }

    /**
     * Récupère le solde actuel du joueur.
     * @returns {number} - Le solde actuel.
     */
    getSolde() {
        return this.#solde;
    }

    /**
     * Crédite le compte du joueur d'un certain montant.
     * @param {number} amount - Le montant à ajouter.
     * @throws {Error} - Si le montant est négatif ou nul.
     */
    credit(amount) {
        if (amount > 0) {
            this.#solde += amount;
        } else {
            throw new Error("Le montant à créditer doit être positif.");
        }
    }

    /**
     * Débite le compte du joueur d'un certain montant.
     * @param {number} amount - Le montant à retirer.
     * @throws {Error} - Si le montant est négatif ou si les fonds sont insuffisants.
     */
    debit(amount) {
        if (amount > 0) {
            if (amount <= this.#solde) {
                this.#solde -= amount;
            } else {
                throw new Error("Fonds insuffisants.");
            }
        } else {
            throw new Error("Le montant à débiter doit être positif.");
        }
    }

    /**
     * Récupère la baie (RackBay) du joueur.
     * @returns {RackBay} - L'objet RackBay du joueur.
     */
    getRackBay() {
        return this.#rackBay;
    }

    /**
     * Améliore la baie du joueur en ajoutant des unités (U).
     * @param {number} additionalU - Nombre d'unités à ajouter.
     * @param {number} cost - Coût de l'amélioration.
     */
    upgradeRackBay(additionalU, cost) {
        this.debit(cost);
        this.#rackBay.upgrade(additionalU);
    }
}
