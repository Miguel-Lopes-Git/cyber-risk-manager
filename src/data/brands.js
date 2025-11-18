import Brand from "../classes/Brand.js";

export const brands = {
    // CPU / GPU
    pintel: new Brand({ name: "Pintel", country: "USA" }), // Intel
    mad: new Brand({ name: "MAD", country: "USA" }), // AMD
    novideo: new Brand({ name: "Novideo", country: "USA" }), // NVIDIA
    radon: new Brand({ name: "Radon", country: "USA" }), // Radeon (AMD)

    // Components
    sus: new Brand({ name: "Sus", country: "Taiwan" }), // ASUS
    mzi: new Brand({ name: "MZI", country: "Taiwan" }), // MSI
    megabyte: new Brand({ name: "Megabyte", country: "Taiwan" }), // Gigabyte
    azrock: new Brand({ name: "Azrock", country: "Taiwan" }), // ASRock
    evg: new Brand({ name: "EVG", country: "USA" }), // EVGA
    ruby: new Brand({ name: "Ruby", country: "Hong Kong" }), // Sapphire
    zattack: new Brand({ name: "Z-Attack", country: "Hong Kong" }), // Zotac
    pallet: new Brand({ name: "Pallet", country: "Taiwan" }), // Palit
    colorful: new Brand({ name: "Colorful", country: "China" }), // Colorful
    inno3d: new Brand({ name: "Inno3D", country: "Hong Kong" }), // Inno3D
    pny: new Brand({ name: "PNY", country: "USA" }), // PNY
    gainward: new Brand({ name: "Gainward", country: "Taiwan" }), // Gainward
    powercolor: new Brand({ name: "PowerColor", country: "Taiwan" }), // PowerColor
    xfx: new Brand({ name: "XFX", country: "USA" }), // XFX
    biostar: new Brand({ name: "Biostar", country: "Taiwan" }), // Biostar

    // Memory / Storage
    pirate: new Brand({ name: "Pirate", country: "USA" }), // Corsair
    gkill: new Brand({ name: "G.Kill", country: "Taiwan" }), // G.Skill
    queenston: new Brand({ name: "Queenston", country: "USA" }), // Kingston
    critical: new Brand({ name: "Critical", country: "USA" }), // Crucial
    samswung: new Brand({ name: "Samswung", country: "South Korea" }), // Samsung
    eastern_digital: new Brand({ name: "Eastern Digital", country: "USA" }), // Western Digital
    lakegate: new Brand({ name: "LakeGate", country: "USA" }), // Seagate
    teamgroupie: new Brand({ name: "TeamGroupie", country: "Taiwan" }), // TeamGroup
    adata: new Brand({ name: "A-Data", country: "Taiwan" }), // ADATA
    patriot: new Brand({ name: "Patriot", country: "USA" }), // Patriot
    mushkin: new Brand({ name: "Mushkin", country: "USA" }), // Mushkin
    silicon_power: new Brand({ name: "Silicon Power", country: "Taiwan" }), // Silicon Power
    klevv: new Brand({ name: "Klevv", country: "Hong Kong" }), // Klevv

    // Cooling / Cases / PSU
    owlcool: new Brand({ name: "OwlCool", country: "Austria" }), // Noctua
    heater_master: new Brand({ name: "Heater Master", country: "Taiwan" }), // Cooler Master
    beloud: new Brand({ name: "BeLoud", country: "Germany" }), // Be Quiet!
    next: new Brand({ name: "Next", country: "USA" }), // NZXT
    lean_lee: new Brand({ name: "Lean Lee", country: "Taiwan" }), // Lian Li
    seasoned: new Brand({ name: "Seasoned", country: "Taiwan" }), // Seasonic
    thermalfake: new Brand({ name: "ThermalFake", country: "Taiwan" }), // Thermaltake
    fractal_mess: new Brand({ name: "Fractal Mess", country: "Sweden" }), // Fractal Design
    silverrock: new Brand({ name: "SilverRock", country: "Taiwan" }), // Silverstone
    supermacro: new Brand({ name: "SuperMacro", country: "USA" }), // Supermicro (Server)
    phanteks: new Brand({ name: "Phanteks", country: "Netherlands" }), // Phanteks
    antec: new Brand({ name: "Antec", country: "USA" }), // Antec
    deepcool: new Brand({ name: "DeepCool", country: "China" }), // DeepCool
    arctic: new Brand({ name: "Arctic", country: "Switzerland" }), // Arctic
    id_cooling: new Brand({ name: "ID-Cooling", country: "China" }), // ID-Cooling
    scythe: new Brand({ name: "Scythe", country: "Japan" }), // Scythe
    zalman: new Brand({ name: "Zalman", country: "South Korea" }), // Zalman
    cougar: new Brand({ name: "Cougar", country: "Germany" }), // Cougar
    bitfenix: new Brand({ name: "BitFenix", country: "Taiwan" }), // BitFenix

    // Generic
    noname: new Brand({ name: "NoName", country: "Unknown" }),
    explosive: new Brand({ name: "Explosive", country: "Unknown" }),
};
