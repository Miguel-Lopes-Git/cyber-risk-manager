export default class RackBay {
    constructor({ brand, model, totalU, price = 0 }) {
        this.brand = brand;
        this.model = model;
        this.totalU = totalU; // hauteur totale disponible du rack
        this.cases = []; // liste des boîtiers installés
        this.price = price; // Prix en €
    }

    // Ajouter un boîtier
    addCase(serverCase, startU) {
        // Vérifier si le boîtier rentre dans le rack
        if (startU < 1 || startU + serverCase.sizeU - 1 > this.totalU) {
            throw new Error("Le boîtier dépasse la hauteur du rack.");
        }

        // Vérifier si l'espace est libre
        for (let i = 0; i < serverCase.sizeU; i++) {
            if (this.getCaseAt(startU + i)) {
                throw new Error(`Le slot ${startU + i} est déjà occupé.`);
            }
        }

        // Ajouter la position au boîtier (ou le wrapper)
        // On va modifier l'objet case pour lui ajouter sa position dans ce rack
        // Idéalement on ne devrait pas modifier l'objet Case, mais pour simplifier ici on va le faire
        // ou stocker un objet { case: serverCase, startU: startU }
        this.cases.push({ component: serverCase, startU: startU });

        console.log(
            `✔️ ${serverCase.brand} ${serverCase.model} ajouté au rack (Slot ${startU}, ${serverCase.sizeU}U).`
        );
        return true;
    }

    // Récupérer le boîtier à une position donnée (U)
    getCaseAt(u) {
        return this.cases.find(
            (c) => u >= c.startU && u < c.startU + c.component.sizeU
        );
    }

    // Retirer un boîtier
    removeCase(u) {
        const index = this.cases.findIndex(
            (c) => u >= c.startU && u < c.startU + c.component.sizeU
        );
        if (index !== -1) {
            this.cases.splice(index, 1);
            return true;
        }
        return false;
    }

    // Améliorer le rack (ajouter des U)
    upgrade(additionalU) {
        this.totalU += additionalU;
    }

    // Vérifie l'espace restant (juste le nombre de U libres total, pas contigus)
    availableU() {
        const usedU = this.cases.reduce((sum, c) => sum + c.component.sizeU, 0);
        return this.totalU - usedU;
    }

    // Affiche l'état du rack
    printStatus() {
        console.log("───────── Rack Status ─────────");
        console.log(`Capacité totale : ${this.totalU}U`);
        console.log(`Place disponible : ${this.availableU()}U`);
        console.log("Cases installés :");
        if (this.cases.length === 0) {
            console.log(" - Aucun boîtier installé");
        } else {
            this.cases.forEach((c) => {
                console.log(
                    ` - Slot ${c.startU}: ${c.component.brand} ${c.component.model} (${c.component.sizeU}U)`
                );
            });
        }
        console.log("───────────────────────────────");
    }
}
