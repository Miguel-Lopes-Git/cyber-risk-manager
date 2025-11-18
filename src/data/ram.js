import Ram from "../classes/Ram.js";
import { brands } from "./brands.js";

export const ramModules = {
    // =================================================================================================
    // DDR2
    // =================================================================================================
    queenston_ddr2_1gb_800: new Ram({
        brand: brands.queenston,
        model: "ValueRAM 1GB DDR2",
        type: "DDR2",
        speed: 800,
        capacity: 1,
        price: 2,
    }),
    queenston_ddr2_2gb_800: new Ram({
        brand: brands.queenston,
        model: "ValueRAM 2GB DDR2",
        type: "DDR2",
        speed: 800,
        capacity: 2,
        price: 4,
    }),
    gkill_ddr2_2gb_800: new Ram({
        brand: brands.gkill,
        model: "Performance 2GB DDR2",
        type: "DDR2",
        speed: 800,
        capacity: 2,
        price: 5,
    }),
    pirate_ddr2_2gb_800: new Ram({
        brand: brands.pirate,
        model: "XMS2 2GB DDR2",
        type: "DDR2",
        speed: 800,
        capacity: 2,
        price: 6,
    }),
    queenston_ddr2_4gb_800: new Ram({
        brand: brands.queenston,
        model: "ValueRAM 4GB DDR2",
        type: "DDR2",
        speed: 800,
        capacity: 4,
        price: 10,
    }), // Rare high density DDR2

    // =================================================================================================
    // DDR3
    // =================================================================================================
    queenston_ddr3_2gb_1333: new Ram({
        brand: brands.queenston,
        model: "ValueRAM 2GB DDR3",
        type: "DDR3",
        speed: 1333,
        capacity: 2,
        price: 5,
    }),
    queenston_ddr3_4gb_1333: new Ram({
        brand: brands.queenston,
        model: "ValueRAM 4GB DDR3",
        type: "DDR3",
        speed: 1333,
        capacity: 4,
        price: 10,
    }),
    queenston_ddr3_8gb_1333: new Ram({
        brand: brands.queenston,
        model: "ValueRAM 8GB DDR3",
        type: "DDR3",
        speed: 1333,
        capacity: 8,
        price: 20,
    }),

    pirate_ddr3_4gb_1600: new Ram({
        brand: brands.pirate,
        model: "Vengeance 4GB DDR3",
        type: "DDR3",
        speed: 1600,
        capacity: 4,
        price: 15,
    }),
    pirate_ddr3_8gb_1600: new Ram({
        brand: brands.pirate,
        model: "Vengeance 8GB DDR3",
        type: "DDR3",
        speed: 1600,
        capacity: 8,
        price: 25,
    }),
    gkill_ddr3_4gb_1600: new Ram({
        brand: brands.gkill,
        model: "Ripjaws X 4GB DDR3",
        type: "DDR3",
        speed: 1600,
        capacity: 4,
        price: 15,
    }),
    gkill_ddr3_8gb_1600: new Ram({
        brand: brands.gkill,
        model: "Ripjaws X 8GB DDR3",
        type: "DDR3",
        speed: 1600,
        capacity: 8,
        price: 25,
    }),

    gkill_ddr3_8gb_1866: new Ram({
        brand: brands.gkill,
        model: "Sniper 8GB DDR3",
        type: "DDR3",
        speed: 1866,
        capacity: 8,
        price: 30,
    }),
    pirate_ddr3_8gb_1866: new Ram({
        brand: brands.pirate,
        model: "Dominator Platinum 8GB DDR3",
        type: "DDR3",
        speed: 1866,
        capacity: 8,
        price: 40,
    }),

    // =================================================================================================
    // DDR4
    // =================================================================================================
    critical_ddr4_4gb_2133: new Ram({
        brand: brands.critical,
        model: "Basics 4GB DDR4",
        type: "DDR4",
        speed: 2133,
        capacity: 4,
        price: 15,
    }),
    critical_ddr4_8gb_2133: new Ram({
        brand: brands.critical,
        model: "Basics 8GB DDR4",
        type: "DDR4",
        speed: 2133,
        capacity: 8,
        price: 25,
    }),

    queenston_ddr4_8gb_2400: new Ram({
        brand: brands.queenston,
        model: "Fury 8GB DDR4",
        type: "DDR4",
        speed: 2400,
        capacity: 8,
        price: 30,
    }),
    queenston_ddr4_16gb_2400: new Ram({
        brand: brands.queenston,
        model: "Fury 16GB DDR4",
        type: "DDR4",
        speed: 2400,
        capacity: 16,
        price: 50,
    }),

    pirate_ddr4_8gb_2666: new Ram({
        brand: brands.pirate,
        model: "Vengeance LPX 8GB DDR4",
        type: "DDR4",
        speed: 2666,
        capacity: 8,
        price: 35,
    }),
    pirate_ddr4_16gb_2666: new Ram({
        brand: brands.pirate,
        model: "Vengeance LPX 16GB DDR4",
        type: "DDR4",
        speed: 2666,
        capacity: 16,
        price: 60,
    }),

    gkill_ddr4_8gb_3000: new Ram({
        brand: brands.gkill,
        model: "Aegis 8GB DDR4",
        type: "DDR4",
        speed: 3000,
        capacity: 8,
        price: 40,
    }),
    gkill_ddr4_16gb_3000: new Ram({
        brand: brands.gkill,
        model: "Aegis 16GB DDR4",
        type: "DDR4",
        speed: 3000,
        capacity: 16,
        price: 70,
    }),

    pirate_ddr4_8gb_3200: new Ram({
        brand: brands.pirate,
        model: "Vengeance RGB Pro 8GB DDR4",
        type: "DDR4",
        speed: 3200,
        capacity: 8,
        price: 50,
    }),
    pirate_ddr4_16gb_3200: new Ram({
        brand: brands.pirate,
        model: "Vengeance RGB Pro 16GB DDR4",
        type: "DDR4",
        speed: 3200,
        capacity: 16,
        price: 80,
    }),
    pirate_ddr4_32gb_3200: new Ram({
        brand: brands.pirate,
        model: "Vengeance RGB Pro 32GB DDR4",
        type: "DDR4",
        speed: 3200,
        capacity: 32,
        price: 150,
    }),

    gkill_ddr4_16gb_3600: new Ram({
        brand: brands.gkill,
        model: "Trident Z Neo 16GB DDR4",
        type: "DDR4",
        speed: 3600,
        capacity: 16,
        price: 90,
    }),
    gkill_ddr4_32gb_3600: new Ram({
        brand: brands.gkill,
        model: "Trident Z Neo 32GB DDR4",
        type: "DDR4",
        speed: 3600,
        capacity: 32,
        price: 170,
    }),

    // =================================================================================================
    // DDR5
    // =================================================================================================
    critical_ddr5_8gb_4800: new Ram({
        brand: brands.critical,
        model: "Basics 8GB DDR5",
        type: "DDR5",
        speed: 4800,
        capacity: 8,
        price: 40,
    }),
    critical_ddr5_16gb_4800: new Ram({
        brand: brands.critical,
        model: "Basics 16GB DDR5",
        type: "DDR5",
        speed: 4800,
        capacity: 16,
        price: 70,
    }),

    queenston_ddr5_16gb_5200: new Ram({
        brand: brands.queenston,
        model: "Fury Beast 16GB DDR5",
        type: "DDR5",
        speed: 5200,
        capacity: 16,
        price: 80,
    }),
    queenston_ddr5_32gb_5200: new Ram({
        brand: brands.queenston,
        model: "Fury Beast 32GB DDR5",
        type: "DDR5",
        speed: 5200,
        capacity: 32,
        price: 150,
    }),

    pirate_ddr5_16gb_5600: new Ram({
        brand: brands.pirate,
        model: "Vengeance 16GB DDR5",
        type: "DDR5",
        speed: 5600,
        capacity: 16,
        price: 90,
    }),
    pirate_ddr5_32gb_5600: new Ram({
        brand: brands.pirate,
        model: "Vengeance 32GB DDR5",
        type: "DDR5",
        speed: 5600,
        capacity: 32,
        price: 170,
    }),

    gkill_ddr5_16gb_6000: new Ram({
        brand: brands.gkill,
        model: "Trident Z5 RGB 16GB DDR5",
        type: "DDR5",
        speed: 6000,
        capacity: 16,
        price: 110,
    }),
    gkill_ddr5_32gb_6000: new Ram({
        brand: brands.gkill,
        model: "Trident Z5 RGB 32GB DDR5",
        type: "DDR5",
        speed: 6000,
        capacity: 32,
        price: 200,
    }),
    gkill_ddr5_48gb_6000: new Ram({
        brand: brands.gkill,
        model: "Trident Z5 RGB 48GB DDR5",
        type: "DDR5",
        speed: 6000,
        capacity: 48,
        price: 300,
    }),

    pirate_ddr5_32gb_6400: new Ram({
        brand: brands.pirate,
        model: "Dominator Titanium 32GB DDR5",
        type: "DDR5",
        speed: 6400,
        capacity: 32,
        price: 250,
    }),
    pirate_ddr5_64gb_6400: new Ram({
        brand: brands.pirate,
        model: "Dominator Titanium 64GB DDR5",
        type: "DDR5",
        speed: 6400,
        capacity: 64,
        price: 450,
    }),
};
