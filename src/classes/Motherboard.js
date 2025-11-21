/**
 * Représente une carte mère (Motherboard).
 */
export default class Motherboard {
    /**
     * Constructeur de la classe Motherboard (Carte Mère).
     * @param {Object} params - Les paramètres de la carte mère.
     * @param {string} params.brand - La marque de la carte mère.
     * @param {string} params.model - Le modèle de la carte mère.
     * @param {string} params.chipset - Le chipset de la carte mère.
     * @param {string} params.socket - Le socket CPU (ex: LGA1700, AM5).
     * @param {number} params.cpuSockets - Nombre de sockets CPU (par défaut 1).
     * @param {string} params.formFactor - Le format de la carte mère (ex: ATX, Micro-ATX).
     * @param {string} params.memoryType - Type de mémoire supporté (ex: DDR4, DDR5).
     * @param {number} params.memorySlots - Nombre de slots mémoire.
     * @param {number} params.maxMemory - Capacité mémoire maximale supportée en Go.
     * @param {number} params.memorySpeed - Vitesse mémoire maximale supportée en MHz.
     * @param {string} params.pcieVersion - Version PCIe principale.
     * @param {Object[]} params.pcieSlots - Liste des slots PCIe disponibles.
     * @param {number} params.sataPorts - Nombre de ports SATA.
     * @param {string[]} params.m2Slots - Liste des slots M.2 disponibles.
     * @param {string[]} params.usbPorts - Liste des ports USB disponibles.
     * @param {string} params.ethernet - Type de connexion Ethernet.
     * @param {string} params.wifi - Support Wi-Fi.
     * @param {string} params.bluetooth - Support Bluetooth.
     * @param {number} params.powerPhases - Nombre de phases d'alimentation.
     * @param {string} params.bios - Type de BIOS.
     * @param {string[]} params.rgbHeaders - Connecteurs RGB disponibles.
     * @param {Function|Array} params.supportedProcessors - Fonction ou tableau pour vérifier la compatibilité processeur (optionnel).
     * @param {number} params.price - Prix de la carte mère en €.
     */
    constructor({
        brand,
        model,
        chipset,
        socket,
        cpuSockets = 1,
        formFactor,
        memoryType,
        memorySlots,
        maxMemory,
        memorySpeed,

        pcieVersion,
        pcieSlots = [],

        sataPorts,
        m2Slots = [],

        usbPorts = [],

        ethernet,
        wifi,
        bluetooth,

        powerPhases,
        bios,
        rgbHeaders = [],

        supportedProcessors = null,
        price = 0,
    }) {
        this.brand = brand;
        this.model = model;
        this.chipset = chipset;
        this.socket = socket;
        this.cpuSockets = cpuSockets;
        this.formFactor = formFactor;

        this.memoryType = memoryType;
        this.memorySlots = memorySlots;
        this.maxMemory = maxMemory;
        this.memorySpeed = memorySpeed;

        this.pcieVersion = pcieVersion;
        this.pcieSlots = pcieSlots;

        this.sataPorts = sataPorts;
        this.m2Slots = m2Slots;

        this.usbPorts = usbPorts;

        this.ethernet = ethernet;
        this.wifi = wifi;
        this.bluetooth = bluetooth;

        this.powerPhases = powerPhases;
        this.bios = bios;

        this.rgbHeaders = rgbHeaders;

        this.supportedProcessors = supportedProcessors;
        this.price = price;
    }

    /**
     * Vérifie si un processeur est compatible avec la carte mère.
     * @param {Object} processor - L'objet processeur à vérifier.
     * @returns {boolean} - Retourne true si compatible, sinon false.
     */
    isProcessorCompatible(processor) {
        if (!processor) return false;

        // Vérification du socket
        if (processor.socket !== this.socket) return false;

        // Vérification du type de RAM supporté par le processeur
        if (processor.memorySupport) {
            const supportedTypes = processor.memorySupport
                .split("/")
                .map((t) => t.trim());
            if (!supportedTypes.includes(this.memoryType)) {
                return false;
            }
        }

        // Vérification personnalisée supplémentaire si une fonction est fournie
        if (typeof this.supportedProcessors === "function") {
            return this.supportedProcessors(processor);
        }

        return true;
    }
}
