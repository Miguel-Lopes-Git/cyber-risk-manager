import RackBay from "./RackBay.js";

export default class Player {
    // Attributs publics
    name = "";

    // Attributs privés
    #solde = 0;
    #rackBay = new RackBay({
        brand: "Generic",
        model: "Start Rack",
        totalU: 2,
        price: 0,
    });

    constructor(name, soldeInitial) {
        this.name = name;
        this.#solde = soldeInitial;
    }

    setName(name) {
        this.name = name;
    }

    // Méthode pour obtenir le solde actuel
    getSolde() {
        return this.#solde;
    }

    // Méthode pour créditer le compte du joueur
    credit(amount) {
        if (amount > 0) {
            this.#solde += amount;
        } else {
            throw new Error("Le montant à créditer doit être positif.");
        }
    }

    // Méthode pour débiter le compte du joueur
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

    // Récupérer la baie du joueur
    getRackBay() {
        return this.#rackBay;
    }

    // Améliorer la baie (ajouter des U)
    upgradeRackBay(additionalU, cost) {
        this.debit(cost);
        this.#rackBay.upgrade(additionalU);
    }
}
