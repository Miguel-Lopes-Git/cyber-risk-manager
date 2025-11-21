import RackBay from "../classes/RackBay.js";
import { brands } from "./brands.js";

export const rackBays = {
    // =================================================================================================
    // RACK BAYS
    // =================================================================================================

    // --- Small Rack ---
    rack_2u_basic: new RackBay({
        brand: brands.supermacro,
        model: "2U Rack Bay",
        totalU: 2,
        price: 50,
    }),
    rack_4u_compact: new RackBay({
        brand: brands.supermacro,
        model: "4U Rack Bay",
        totalU: 4,
        price: 100,
    }),
    rack_8u_standard: new RackBay({
        brand: brands.supermacro,
        model: "8U Rack Bay",
        totalU: 8,
        price: 200,
    }),
    rack_12u_medium: new RackBay({
        brand: brands.supermacro,
        model: "12U Rack Bay",
        totalU: 12,
        price: 350,
    }),
    rack_20u_large: new RackBay({
        brand: brands.supermacro,
        model: "20U Rack Bay",
        totalU: 20,
        price: 600,
    }),
};
