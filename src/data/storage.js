import Storage from "../classes/Storage.js";
import { brands } from "./brands.js";

export const storageDevices = {
    // =================================================================================================
    // HDD (Hard Disk Drives) - 3.5" SATA
    // =================================================================================================
    eastern_digital_blue_1tb: new Storage({
        brand: brands.eastern_digital,
        model: "Blue 1TB",
        type: "HDD",
        capacity: 1000,
        readSpeed: 150,
        writeSpeed: 150,
        interface: "SATA III",
        formFactor: "3.5",
        price: 40,
    }),
    lakegate_barracuda_2tb: new Storage({
        brand: brands.lakegate,
        model: "Barracuda 2TB",
        type: "HDD",
        capacity: 2000,
        readSpeed: 190,
        writeSpeed: 180,
        interface: "SATA III",
        formFactor: "3.5",
        price: 55,
    }),
    eastern_digital_black_4tb: new Storage({
        brand: brands.eastern_digital,
        model: "Black 4TB",
        type: "HDD",
        capacity: 4000,
        readSpeed: 250,
        writeSpeed: 240,
        interface: "SATA III",
        formFactor: "3.5",
        price: 120,
    }),
    lakegate_ironwolf_8tb: new Storage({
        brand: brands.lakegate,
        model: "IronWolf 8TB",
        type: "HDD",
        capacity: 8000,
        readSpeed: 210,
        writeSpeed: 200,
        interface: "SATA III",
        formFactor: "3.5",
        price: 200,
    }),

    // =================================================================================================
    // SSD SATA (2.5")
    // =================================================================================================
    queenston_a400_240gb: new Storage({
        brand: brands.queenston,
        model: "A400 240GB",
        type: "SSD",
        capacity: 240,
        readSpeed: 500,
        writeSpeed: 350,
        interface: "SATA III",
        formFactor: "2.5",
        price: 25,
    }),
    critical_mx500_500gb: new Storage({
        brand: brands.critical,
        model: "MX500 500GB",
        type: "SSD",
        capacity: 500,
        readSpeed: 560,
        writeSpeed: 510,
        interface: "SATA III",
        formFactor: "2.5",
        price: 45,
    }),
    samswung_870_evo_1tb: new Storage({
        brand: brands.samswung,
        model: "870 EVO 1TB",
        type: "SSD",
        capacity: 1000,
        readSpeed: 560,
        writeSpeed: 530,
        interface: "SATA III",
        formFactor: "2.5",
        price: 80,
    }),
    samswung_870_qvo_4tb: new Storage({
        brand: brands.samswung,
        model: "870 QVO 4TB",
        type: "SSD",
        capacity: 4000,
        readSpeed: 560,
        writeSpeed: 530,
        interface: "SATA III",
        formFactor: "2.5",
        price: 220,
    }),

    // =================================================================================================
    // NVMe M.2 (PCIe 3.0)
    // =================================================================================================
    queenston_nv1_500gb: new Storage({
        brand: brands.queenston,
        model: "NV1 500GB",
        type: "NVMe",
        capacity: 500,
        readSpeed: 2100,
        writeSpeed: 1700,
        interface: "PCIe 3.0",
        formFactor: "M.2",
        price: 40,
    }),
    samswung_970_evo_plus_1tb: new Storage({
        brand: brands.samswung,
        model: "970 EVO Plus 1TB",
        type: "NVMe",
        capacity: 1000,
        readSpeed: 3500,
        writeSpeed: 3300,
        interface: "PCIe 3.0",
        formFactor: "M.2",
        price: 90,
    }),
    critical_p3_2tb: new Storage({
        brand: brands.critical,
        model: "P3 2TB",
        type: "NVMe",
        capacity: 2000,
        readSpeed: 3500,
        writeSpeed: 3000,
        interface: "PCIe 3.0",
        formFactor: "M.2",
        price: 130,
    }),

    // =================================================================================================
    // NVMe M.2 (PCIe 4.0)
    // =================================================================================================
    eastern_digital_sn850x_1tb: new Storage({
        brand: brands.eastern_digital,
        model: "Black SN850X 1TB",
        type: "NVMe",
        capacity: 1000,
        readSpeed: 7300,
        writeSpeed: 6300,
        interface: "PCIe 4.0",
        formFactor: "M.2",
        price: 110,
    }),
    samswung_980_pro_2tb: new Storage({
        brand: brands.samswung,
        model: "980 PRO 2TB",
        type: "NVMe",
        capacity: 2000,
        readSpeed: 7000,
        writeSpeed: 5100,
        interface: "PCIe 4.0",
        formFactor: "M.2",
        price: 180,
    }),
    samswung_990_pro_4tb: new Storage({
        brand: brands.samswung,
        model: "990 PRO 4TB",
        type: "NVMe",
        capacity: 4000,
        readSpeed: 7450,
        writeSpeed: 6900,
        interface: "PCIe 4.0",
        formFactor: "M.2",
        price: 350,
    }),

    // =================================================================================================
    // NVMe M.2 (PCIe 5.0)
    // =================================================================================================
    critical_t700_2tb: new Storage({
        brand: brands.critical,
        model: "T700 2TB",
        type: "NVMe",
        capacity: 2000,
        readSpeed: 12400,
        writeSpeed: 11800,
        interface: "PCIe 5.0",
        formFactor: "M.2",
        price: 300,
    }),
};
