export default class CpuCooler {
    constructor({
        brand,
        model,
        type, // "Air", "AIO", "Custom"
        sockets = [], // ["LGA1700", "AM5", etc.]
        height, // Hauteur en mm (pour compatibilité boîtier)
        tdp, // Capacité de refroidissement en Watts
        price = 0, // Prix en €
    }) {
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.sockets = sockets;
        this.height = height;
        this.tdp = tdp;
        this.price = price;
    }

    // Vérifie si le refroidisseur est compatible avec le socket
    isCompatibleWithSocket(socket) {
        return this.sockets.includes(socket);
    }

    // Vérifie si le refroidisseur est suffisant pour le TDP du processeur
    isSufficientForTDP(cpuTdp) {
        return this.tdp >= cpuTdp;
    }
}
