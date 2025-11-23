/**
 * Représente un périphérique de stockage (Disque dur, SSD, NVMe).
 */
export default class Storage {
    /**
     * Constructeur de la classe Storage.
     * @param {Object} params - Les paramètres du stockage.
     * @param {Object} params.brand - La marque du périphérique.
     * @param {string} params.model - Le modèle du périphérique.
     * @param {string} params.type - Le type de stockage (HDD, SSD SATA, NVMe M.2).
     * @param {number} params.capacity - La capacité en Go.
     * @param {number} params.readSpeed - Vitesse de lecture en Mo/s.
     * @param {number} params.writeSpeed - Vitesse d'écriture en Mo/s.
     * @param {string} params.interface - L'interface de connexion (SATA III, PCIe 3.0, PCIe 4.0).
     * @param {string} params.formFactor - Le format physique (3.5", 2.5", M.2 2280).
     * @param {number} params.price - Le prix en €.
     */
    constructor({
        brand,
        model,
        type,
        capacity,
        readSpeed,
        writeSpeed,
        interface: interfaceType,
        formFactor,
        price,
    }) {
        this.brand = brand;
        this.model = model;
        this.type = type; // "HDD", "SSD", "NVMe"
        this.capacity = capacity;
        this.readSpeed = readSpeed;
        this.writeSpeed = writeSpeed;
        this.interface = interfaceType;
        this.formFactor = formFactor; // "3.5", "2.5", "M.2"
        this.price = price;
    }
}
