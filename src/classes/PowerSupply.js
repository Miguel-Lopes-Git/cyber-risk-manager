export default class PowerSupply {
    constructor({
        brand, // Corsair, Seasonic, BeQuiet...
        model,
        wattage, // Puissance totale (ex : 750W)
        efficiency, // 80+ Bronze, Gold, Platinum, Titanium
        modularity, // none, semi, full
        formFactor, // ATX, SFX, SFX-L

        rails12V, // Ampérage sur le rail 12V (important pour GPU)

        length = null, // Longueur en mm (pour compatibilité boîtier)
        price = 0, // Prix en €
    }) {
        this.brand = brand;
        this.model = model;
        this.wattage = wattage;
        this.efficiency = efficiency;
        this.modularity = modularity;
        this.formFactor = formFactor;

        this.rails12V = rails12V;

        this.length = length;
        this.price = price;
    }

    // Vérifie si la PSU est suffisante pour un GPU
    isEnoughForGPU(gpu) {
        if (!gpu) return false;
        return this.wattage >= gpu.recommendedPSU;
    }

    // Compatibilité avec un boîtier
    fitsInCase(maxLength) {
        if (!this.length) return true;
        return this.length <= maxLength;
    }
}
