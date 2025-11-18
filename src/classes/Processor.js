export default class Processor {
    // attributs publics
    brand; // e.g., AMD, Intel
    model; // e.g., Ryzen 5 5600X
    architecture; // e.g., x86, ARM
    socket; // type of socket
    baseClock; // in Ghz
    boostClock; // in Ghz
    cores; // number of cores
    threads; // number of threads
    cacheL1; // in MB
    cacheL2; // in MB
    cacheL3; // in MB
    tdp; // in Watts
    lithography; // in nm
    integratedGraphics; // boolean
    releaseDate; // year of release
    speed; // in MHz
    maxTemp; // in Celsius
    memorySupport; // in GO
    memorySpeed; // max capacity in GHz
    pciExpressVersion; // version of PCIe supported
    price; // Prix en €

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
        this.speed = speed;
        this.maxTemp = maxTemp;
        this.memorySupport = memorySupport;
        this.memorySpeed = memorySpeed;
        this.pciExpressVersion = pciExpressVersion;
        this.price = price;
    }

    // méthode pour obtenir toute les informations du processeur
    getInfo() {
        return {
            brand: this.brand,
            model: this.model,
            architecture: this.architecture,
            socket: this.socket,
            baseClock: this.baseClock,
            boostClock: this.boostClock,
            cores: this.cores,
            threads: this.threads,
            cacheL1: this.cacheL1,
            cacheL2: this.cacheL2,
            cacheL3: this.cacheL3,
            tdp: this.tdp,
            lithography: this.lithography,
            integratedGraphics: this.integratedGraphics,
            releaseDate: this.releaseDate,
            speed: this.speed,
            maxTemp: this.maxTemp,
            memorySupport: this.memorySupport,
            memorySpeed: this.memorySpeed,
            pciExpressVersion: this.pciExpressVersion,
            price: this.price,
        };
    }
}
