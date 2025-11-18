export default class RAM {
    constructor({
        brand, // Corsair, G.Skill, Kingston, etc.
        model,
        type, // DDR4, DDR5, LPDDR5, etc.
        capacity, // Capacite par module en Go
        modules, // Nombre de barrettes (ex: 2)
        speed, // Fréquence en MHz (ex: 6000)
        timings, // "CL36-36-36-76"
        voltage, // en Volts
        ecc = false, // ECC ou non
        rgb = false, // True/false
        height = null, // Hauteur en mm (utile pour gros ventirads)
        price = 0, // Prix en €
    }) {
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.capacity = capacity;
        this.modules = modules;
        this.speed = speed;
        this.timings = timings;
        this.voltage = voltage;
        this.ecc = ecc;
        this.rgb = rgb;
        this.height = height;
        this.price = price;
    }

    // Capacité totale (Go)
    totalCapacity() {
        return this.capacity * this.modules;
    }

    // Vérification compatibilité avec une carte mère
    isCompatibleWithMotherboard(motherboard) {
        if (!motherboard) return false;

        // Type DDR
        if (this.type !== motherboard.memoryType) return false;

        // Vitesse compatible (on accepte <= max)
        if (this.speed > motherboard.memorySpeed) return false;

        // Nombre de slots
        if (this.modules > motherboard.memorySlots) return false;

        return true;
    }
}
