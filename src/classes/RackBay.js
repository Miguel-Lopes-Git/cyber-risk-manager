export default class RackBay {
    constructor(totalU, price = 0) {
        this.totalU = totalU; // hauteur totale disponible du rack
        this.cases = []; // liste des boîtiers installés
        this.price = price; // Prix en €
    }

    // Ajouter un boîtier
    addCase(serverCase) {
        const usedU = this.cases.reduce((sum, c) => sum + c.sizeU, 0);
        if (usedU + serverCase.sizeU > this.totalU) {
            console.log(
                `❌ Impossible d'ajouter ${serverCase.brand} ${serverCase.model} : plus de place dans le rack.`
            );
            return false;
        }
        this.cases.push(serverCase);
        console.log(
            `✔️ ${serverCase.brand} ${serverCase.model} ajouté au rack (${serverCase.sizeU}U).`
        );
        return true;
    }

    // Vérifie l'espace restant
    availableU() {
        const usedU = this.cases.reduce((sum, c) => sum + c.sizeU, 0);
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
                console.log(` - ${c.brand} ${c.model} (${c.sizeU}U)`);
            });
        }
        console.log("───────────────────────────────");
    }
}
