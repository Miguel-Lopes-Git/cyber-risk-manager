/**
 * Représente un processeur (CPU).
 */
export default class Processor {
    /**
     * Constructeur de la classe Processor (Processeur).
     * @param {Object} params - Les paramètres du processeur.
     * @param {string} params.brand - Marque (ex: AMD, Intel).
     * @param {string} params.model - Modèle (ex: Ryzen 5 5600X).
     * @param {string} params.architecture - Architecture (ex: x86, ARM).
     * @param {string} params.socket - Type de socket.
     * @param {number} params.baseClock - Fréquence de base en GHz.
     * @param {number} params.boostClock - Fréquence boost en GHz.
     * @param {number} params.cores - Nombre de cœurs.
     * @param {number} params.threads - Nombre de threads.
     * @param {number} params.cacheL1 - Cache L1 en Mo.
     * @param {number} params.cacheL2 - Cache L2 en Mo.
     * @param {number} params.cacheL3 - Cache L3 en Mo.
     * @param {number} params.tdp - Enveloppe thermique (TDP) en Watts.
     * @param {string} params.lithography - Finesse de gravure en nm.
     * @param {boolean} params.integratedGraphics - Présence d'un chipset graphique intégré.
     * @param {number} params.releaseDate - Année de sortie.
     * @param {number} params.speed - Vitesse en MHz.
     * @param {number} params.maxTemp - Température maximale en Celsius.
     * @param {string} params.memorySupport - Type de mémoire supportée (ex: DDR4/DDR5).
     * @param {number} params.memorySpeed - Vitesse mémoire maximale en MHz.
     * @param {string} params.pciExpressVersion - Version PCIe supportée.
     * @param {number} params.price - Prix en €.
     */
    constructor({
        brand,
        model,
        architecture,
        socket,
        baseClock,
        boostClock,
        cores,
        threads,
        cacheL1,
        cacheL2,
        cacheL3,
        tdp,
        lithography,
        integratedGraphics,
        releaseDate,
        speed,
        maxTemp,
        memorySupport,
        memorySpeed,
        pciExpressVersion,
        price,
    }) {
        this.brand = brand;
        this.model = model;
        this.architecture = architecture;
        this.socket = socket;
        this.baseClock = baseClock;
        this.boostClock = boostClock;
        this.cores = cores;
        this.threads = threads;
        this.cacheL1 = cacheL1;
        this.cacheL2 = cacheL2;
        this.cacheL3 = cacheL3;
        this.tdp = tdp;
        this.lithography = lithography;
        this.integratedGraphics = integratedGraphics;
        this.releaseDate = releaseDate;
        this.speedsupportedMotherboards = speed;
        this.maxTemp = maxTemp;
        this.memorySupport = memorySupport;
        this.memorySpeed = memorySpeed;
        this.pciExpressVersion = pciExpressVersion;
        this.price = price;
    }
}
