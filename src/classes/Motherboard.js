export default class Motherboard {
    constructor({
        brand,
        model,
        chipset,
        socket,
        cpuSockets = 1, // Nombre de sockets CPU
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

        supportedProcessors = null, // Optionnel : fonction ou tableau
        price = 0, // Prix en €
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

    // Vérifie si un processeur est compatible
    isProcessorCompatible(processor) {
        if (!processor) return false;

        // Vérification du socket
        if (processor.socket !== this.socket) return false;

        // Vérification du type de RAM supporté
        if (
            processor.memorySupport &&
            processor.memorySupport !== this.memoryType
        ) {
            return false;
        }

        // Vérification personnalisée si fournie
        if (typeof this.supportedProcessors === "function") {
            return this.supportedProcessors(processor);
        }

        return true;
    }
}
