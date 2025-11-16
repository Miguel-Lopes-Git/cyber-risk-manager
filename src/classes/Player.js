export default class Player {
    // Attributs publics
    name = "";

    // Attributs privés
    #solde = 0;

    constructor(name, soldeInitial) {
        this.name = name;
        this.#solde = soldeInitial;
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
}
