/* ==========================================
   AGROMART - AGRICULTURE E-COMMERCE
   FILE 3: products.js

   100 Seeds
   100 Fertilizers
   100 Pesticides

   TOTAL: 300 UNIQUE PRODUCTS
========================================== */


/* ==========================================
   1. PRODUCT NAMES - 100 SEEDS
========================================== */

const seedNames = [

"IR-64 Rice Seeds",
"MTU-1010 Rice Seeds",
"Swarna Rice Seeds",
"Jyothi Rice Seeds",
"RNR-15048 Rice Seeds",
"Sonamasuri Rice Seeds",
"Jaya Rice Seeds",
"KRH-2 Hybrid Rice Seeds",
"DRR Dhan 44 Rice Seeds",
"BPT-5204 Rice Seeds",

"HD-2967 Wheat Seeds",
"PBW-343 Wheat Seeds",
"DBW-17 Wheat Seeds",
"HD-3086 Wheat Seeds",
"WH-1105 Wheat Seeds",
"Lok-1 Wheat Seeds",
"GW-322 Wheat Seeds",
"Raj-3765 Wheat Seeds",
"UP-262 Wheat Seeds",
"HD-2733 Wheat Seeds",

"NK-6240 Maize Seeds",
"DKC-9144 Maize Seeds",
"900M Gold Maize Seeds",
"PMH-1 Maize Seeds",
"Bio-9681 Maize Seeds",
"HQPM-1 Maize Seeds",
"Vivek QPM-9 Maize Seeds",
"DH-296 Maize Seeds",
"Shaktiman-1 Maize Seeds",
"Pratap Hybrid Maize Seeds",

"Arka Vikas Tomato Seeds",
"Arka Rakshak Tomato Seeds",
"Pusa Ruby Tomato Seeds",
"Abhinav Tomato Seeds",
"Namdhari Tomato Seeds",
"US-440 Tomato Seeds",
"NS-2535 Tomato Seeds",
"Vaibhav Tomato Seeds",
"Rupali Tomato Seeds",
"Shivam Tomato Seeds",

"Byadagi Chilli Seeds",
"Guntur Chilli Seeds",
"Teja Chilli Seeds",
"Arka Meghana Chilli Seeds",
"Arka Harita Chilli Seeds",
"Jwala Chilli Seeds",
"Wonder Hot Chilli Seeds",
"Bhagyalakshmi Chilli Seeds",
"Kashmir Chilli Seeds",
"Sannam Chilli Seeds",

"RCH-2 Cotton Seeds",
"Bunny Bt Cotton Seeds",
"Mallika Cotton Seeds",
"Suraj Cotton Seeds",
"Ajit-155 Cotton Seeds",
"Jadoo Cotton Seeds",
"Ankur-651 Cotton Seeds",
"MECH-184 Cotton Seeds",
"Shankar-6 Cotton Seeds",
"Hybrid-10 Cotton Seeds",

"JL-24 Groundnut Seeds",
"TAG-24 Groundnut Seeds",
"TMV-2 Groundnut Seeds",
"Kadiri-6 Groundnut Seeds",
"GPBD-4 Groundnut Seeds",
"ICGV-91114 Groundnut Seeds",
"VRI-2 Groundnut Seeds",
"Dh-86 Groundnut Seeds",
"Kadiri-9 Groundnut Seeds",
"TG-37A Groundnut Seeds",

"JS-335 Soybean Seeds",
"JS-9560 Soybean Seeds",
"MAUS-71 Soybean Seeds",
"DS-228 Soybean Seeds",
"Bragg Soybean Seeds",
"PK-472 Soybean Seeds",
"MACS-450 Soybean Seeds",
"JS-9305 Soybean Seeds",
"RKS-24 Soybean Seeds",
"MAUS-158 Soybean Seeds",

"Arka Anamika Okra Seeds",
"Pusa Sawani Okra Seeds",
"Parbhani Kranti Okra Seeds",
"Arka Abhay Okra Seeds",
"Bhendi Hybrid Seeds",

"Green Long Brinjal Seeds",
"Arka Nidhi Brinjal Seeds",
"Pusa Purple Brinjal Seeds",
"Black Beauty Brinjal Seeds",
"Arka Kusumakar Brinjal Seeds",

"Pusa Chetki Radish Seeds",
"Japanese White Radish Seeds",
"Golden Acre Cabbage Seeds",
"Pusa Drumhead Cabbage Seeds",
"All Green Spinach Seeds",

"Early Wonder Beetroot Seeds",
"Detroit Dark Red Beetroot Seeds",
"Pusa Narangi Carrot Seeds",
"Imperator Carrot Seeds",
"Arka Suman Cucumber Seeds"

];


/* ==========================================
   2. PRODUCT NAMES - 100 FERTILIZERS
========================================== */

const fertilizerNames = [

"Urea Fertilizer",
"DAP Fertilizer",
"Complex NPK 10:26:26",
"Complex NPK 12:32:16",
"Complex NPK 20:20:0:13",
"NPK 19:19:19",
"NPK 13:40:13",
"NPK 00:52:34",
"NPK 00:00:50",
"NPK 15:15:15",

"Ammonium Sulphate",
"Calcium Ammonium Nitrate",
"Single Super Phosphate",
"Triple Super Phosphate",
"Potassium Chloride",
"Potassium Sulphate",
"Mono Ammonium Phosphate",
"Ammonium Phosphate",
"Magnesium Sulphate",
"Calcium Nitrate",

"Zinc Sulphate",
"Ferrous Sulphate",
"Borax Fertilizer",
"Boric Acid Fertilizer",
"Copper Sulphate",
"Manganese Sulphate",
"Ammonium Molybdate",
"Zinc EDTA",
"Iron EDTA",
"Multi Micronutrient Mixture",

"Organic Farmyard Manure",
"Vermicompost",
"Neem Cake Powder",
"Groundnut Cake Manure",
"Castor Cake Manure",
"Mustard Cake Manure",
"Bone Meal Fertilizer",
"Fish Meal Fertilizer",
"Blood Meal Fertilizer",
"Composted Poultry Manure",

"Seaweed Extract Fertilizer",
"Humic Acid Fertilizer",
"Fulvic Acid Fertilizer",
"Amino Acid Fertilizer",
"Protein Hydrolysate Fertilizer",
"Liquid Organic Manure",
"Granular Organic Manure",
"City Compost",
"Leaf Compost",
"Enriched Compost",

"Azotobacter Biofertilizer",
"Azospirillum Biofertilizer",
"Rhizobium Biofertilizer",
"Phosphate Solubilizing Bacteria",
"Potash Mobilizing Bacteria",
"Zinc Solubilizing Bacteria",
"Acetobacter Biofertilizer",
"Blue Green Algae Biofertilizer",
"Azolla Biofertilizer",
"Vesicular Arbuscular Mycorrhiza",

"Neem Enriched Organic Fertilizer",
"Organic Carbon Fertilizer",
"Calcium Fertilizer",
"Magnesium Fertilizer",
"Sulphur Fertilizer",
"Silicon Fertilizer",
"Phosphorus Fertilizer",
"Potassium Fertilizer",
"Nitrogen Fertilizer",
"Balanced Garden Fertilizer",

"Water Soluble NPK 18:18:18",
"Water Soluble NPK 20:20:20",
"Water Soluble NPK 13:00:45",
"Water Soluble NPK 12:61:00",
"Water Soluble NPK 15:05:30",
"Water Soluble NPK 06:12:36",
"Water Soluble NPK 10:05:40",
"Water Soluble NPK 17:44:00",
"Water Soluble NPK 00:00:52",
"Water Soluble NPK 19:09:19",

"Organic Liquid Biofertilizer",
"Phosphate Rich Organic Manure",
"Potassium Rich Organic Manure",
"Composted Coir Pith",
"Cocopeat Enriched Manure",
"Vermiwash",
"Jeevamrutha Preparation",
"Panchagavya Preparation",
"Fermented Organic Manure",
"Compost Activator",

"Calcium Magnesium Fertilizer",
"Magnesium Nitrate",
"Potassium Nitrate",
"Potassium Schoenite",
"Rock Phosphate",
"Gypsum Fertilizer",
"Elemental Sulphur",
"Micronutrient Granules",
"Organic Vegetable Fertilizer",
"Organic Fruit Fertilizer"

];


/* ==========================================
   3. PRODUCT NAMES - 100 PESTICIDES

   Product catalogue entries only.
   Follow approved product labels and laws.
========================================== */

const pesticideNames = [

"Neem Oil Based Pesticide",
"Azadirachtin Based Pesticide",
"NSKE Botanical Pesticide",
"Pyrethrum Based Pesticide",
"Bt Bioinsecticide",
"Beauveria Bassiana Bioinsecticide",
"Metarhizium Anisopliae Bioinsecticide",
"Verticillium Lecanii Bioinsecticide",
"NPV Biological Insecticide",
"Spinosad Based Insecticide",

"Imidacloprid Based Insecticide",
"Thiamethoxam Based Insecticide",
"Acetamiprid Based Insecticide",
"Flonicamid Based Insecticide",
"Pymetrozine Based Insecticide",
"Dinotefuran Based Insecticide",
"Fipronil Based Insecticide",
"Chlorantraniliprole Based Insecticide",
"Cyantraniliprole Based Insecticide",
"Emamectin Benzoate Based Insecticide",

"Indoxacarb Based Insecticide",
"Lambda Cyhalothrin Based Insecticide",
"Deltamethrin Based Insecticide",
"Cypermethrin Based Insecticide",
"Bifenthrin Based Insecticide",
"Permethrin Based Insecticide",
"Profenofos Based Insecticide",
"Quinalphos Based Insecticide",
"Malathion Based Insecticide",
"Dimethoate Based Insecticide",

"Abamectin Based Miticide",
"Fenpyroximate Based Miticide",
"Propargite Based Miticide",
"Hexythiazox Based Miticide",
"Diafenthiuron Based Insecticide",
"Novaluron Based Insecticide",
"Lufenuron Based Insecticide",
"Chlorfenapyr Based Insecticide",
"Spinetoram Based Insecticide",
"Flubendiamide Based Insecticide",

"Mancozeb Based Fungicide",
"Carbendazim Based Fungicide",
"Propiconazole Based Fungicide",
"Hexaconazole Based Fungicide",
"Tebuconazole Based Fungicide",
"Azoxystrobin Based Fungicide",
"Metalaxyl Based Fungicide",
"Metalaxyl M Based Fungicide",
"Copper Oxychloride Fungicide",
"Chlorothalonil Based Fungicide",

"Captan Based Fungicide",
"Thiophanate Methyl Fungicide",
"Tricyclazole Based Fungicide",
"Validamycin Based Fungicide",
"Difenoconazole Based Fungicide",
"Fluopyram Based Fungicide",
"Fluxapyroxad Based Fungicide",
"Pyraclostrobin Based Fungicide",
"Dimethomorph Based Fungicide",
"Cymoxanil Based Fungicide",

"Trichoderma Viride Biofungicide",
"Trichoderma Harzianum Biofungicide",
"Pseudomonas Fluorescens Biofungicide",
"Bacillus Subtilis Biofungicide",
"Paecilomyces Lilacinus Biocontrol",
"Verticillium Chlamydosporium Biocontrol",
"Potassium Bicarbonate Fungicide",
"Sulphur Based Fungicide",
"Bordeaux Mixture Fungicide",
"Copper Hydroxide Fungicide",

"Glyphosate Based Herbicide",
"Pendimethalin Based Herbicide",
"Pretilachlor Based Herbicide",
"Butachlor Based Herbicide",
"2,4-D Based Herbicide",
"Quizalofop Ethyl Based Herbicide",
"Propaquizafop Based Herbicide",
"Clethodim Based Herbicide",
"Haloxyfop Based Herbicide",
"Metsulfuron Methyl Based Herbicide",

"Bispyribac Sodium Based Herbicide",
"Fenoxaprop P Ethyl Herbicide",
"Clodinafop Propargyl Herbicide",
"Clomazone Based Herbicide",
"Oxyfluorfen Based Herbicide",
"Acetochlor Based Herbicide",
"Topramezone Based Herbicide",
"Mesotrione Based Herbicide",
"Dicamba Based Herbicide",
"Fluroxypyr Based Herbicide",

"Yellow Sticky Insect Trap",
"Blue Sticky Insect Trap",
"Fruit Fly Pheromone Trap",
"Pink Bollworm Pheromone Trap",
"Helicoverpa Pheromone Trap",
"Fall Armyworm Pheromone Trap",
"Whitefly Monitoring Trap",
"Mealybug Monitoring Trap",
"Light Insect Monitoring Trap",
"Biological Pest Management Kit"

];


/* ==========================================
   4. AGRICULTURAL INFORMATION
========================================== */

const cropGroups = {

    Seeds: [
        "Rice, wheat and maize",
        "Tomato, chilli and brinjal",
        "Cotton and groundnut",
        "Soybean and pulses",
        "Cabbage and cauliflower",
        "Carrot, radish and beetroot",
        "Cucumber and gourds",
        "Onion and garlic",
        "Beans and peas",
        "Leafy vegetables"
    ],

    Fertilizers: [
        "Rice and wheat",
        "Maize and millets",
        "Tomato and chilli",
        "Cotton and groundnut",
        "Soybean and pulses",
        "Banana and papaya",
        "Mango and citrus",
        "Cabbage and cauliflower",
        "Onion and garlic",
        "Flowers and garden plants"
    ],

    Pesticides: [
        "Rice and wheat",
        "Maize and millets",
        "Tomato and chilli",
        "Cotton and groundnut",
        "Soybean and pulses",
        "Banana and papaya",
        "Mango and citrus",
        "Vegetable crops",
        "Fruit crops",
        "Agricultural pest monitoring"
    ]

};


const soilGroups = {

    Seeds: [
        "Well-drained loamy soil",
        "Clay and alluvial soil",
        "Sandy loam soil",
        "Red soil",
        "Black cotton soil",
        "Sandy soil",
        "Rich garden soil",
        "Moisture-retaining soil",
        "Well-aerated soil",
        "Suitable soil depends on variety"
    ],

    Fertilizers: [
        "Loamy soil",
        "Red soil",
        "Black soil",
        "Sandy loam soil",
        "Clay soil",
        "Alluvial soil",
        "Well-drained soil",
        "Organic-rich soil",
        "Sandy soil",
        "Soil-test-based application"
    ],

    Pesticides: [
        "Suitable for crops in loamy soil",
        "Suitable for crops in red soil",
        "Suitable for crops in black soil",
        "Suitable for crops in sandy loam",
        "Suitable for crops in clay soil",
        "Suitable for crops in alluvial soil",
        "Soil suitability depends on crop",
        "Follow product label restrictions",
        "Check crop registration and label",
        "Use only as legally approved"
    ]

};


/* ==========================================
   5. PRODUCT IMAGE COLLECTION
========================================== */

const categoryImages = {

    Seeds: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
        "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
    ],

    Fertilizers: [
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
    ],

    Pesticides: [
        "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?w=600",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600",
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600"
    ]

};


/* ==========================================
   6. PRODUCT DATABASE GENERATOR

   Each name creates a separate product object.
========================================== */

function createProductList(names, category, startId) {

    return names.map((name, index) => {

        let unit;

        if (category === "Seeds") {

            unit = index % 3 === 0 ? "packet" : "kg";

        } else if (category === "Fertilizers") {

            unit = index % 5 === 0 ? "litre" :
                   index % 4 === 0 ? "packet" : "kg";

        } else {

            unit = index % 3 === 0 ? "packet" : "litre";

        }

        const price =
            65 + ((index * 37 + startId) % 420);

        const stock =
            10 + ((index * 7 + startId) % 91);

        const emoji = {

            Seeds: "🌾",
            Fertilizers: "🌱",
            Pesticides: "🧴"

        }[category];

        const imageList =
            categoryImages[category];

        const image =
            imageList[index % imageList.length];

        const crops =
            cropGroups[category][
                index % cropGroups[category].length
            ];

        const soil =
            soilGroups[category][
                index % soilGroups[category].length
            ];

        let description;

        if (category === "Seeds") {

            description =
                name +
                " is an agricultural seed product. " +
                "Check the variety, season, climate, " +
                "germination and supplier information before purchasing.";

        } else if (category === "Fertilizers") {

            description =
                name +
                " is an agricultural nutrient product. " +
                "Its suitability depends on crop nutrient requirements " +
                "and soil test results.";

        } else {

            description =
                name +
                " is an agricultural pest-management product. " +
                "Check the approved crop, target pest, product label " +
                "and applicable safety requirements before purchasing.";

        }

        return {

            id: startId + index,

            name: name,

            category: category,

            price: price,

            unit: unit,

            stock: stock,

            emoji: emoji,

            image: image,

            description: description,

            crops: crops,

            plants: crops,

            soil: soil,

            availability:
                stock > 0 ? "In Stock" : "Out of Stock",

            deliveryAvailable: true,

            deliveryEstimate: "3-5 days",

            featured: index < 8,

            rating: 4.0 + (index % 10) / 10,

            reviewCount: 10 + (index * 13) % 490,

            status: "Active"

        };

    });

}


/* ==========================================
   7. CREATE 300 PRODUCTS
========================================== */

const seedProducts = createProductList(
    seedNames,
    "Seeds",
    1
);

const fertilizerProducts = createProductList(
    fertilizerNames,
    "Fertilizers",
    101
);

const pesticideProducts = createProductList(
    pesticideNames,
    "Pesticides",
    201
);


/* ==========================================
   8. COMPLETE PRODUCT DATABASE
========================================== */

const PRODUCTS = [

    ...seedProducts,

    ...fertilizerProducts,

    ...pesticideProducts

];


/* ==========================================
   9. PRODUCT DATABASE VALIDATION
========================================== */

console.log("================================");

console.log("AGROMART PRODUCT DATABASE");

console.log("================================");

console.log("Seeds:", seedProducts.length);

console.log("Fertilizers:", fertilizerProducts.length);

console.log("Pesticides:", pesticideProducts.length);

console.log("Total Products:", PRODUCTS.length);


/* ==========================================
   10. MAKE DATABASE AVAILABLE
========================================== */

window.PRODUCTS = PRODUCTS;

window.seedProducts = seedProducts;

window.fertilizerProducts = fertilizerProducts;

window.pesticideProducts = pesticideProducts;


/* ==========================================
   11. DATABASE SEARCH FUNCTION
========================================== */

window.searchProducts = function(searchText) {

    const search = searchText
        .trim()
        .toLowerCase();

    if (!search) {
        return PRODUCTS;
    }

    return PRODUCTS.filter(product => {

        return (

            product.name.toLowerCase().includes(search) ||

            product.category.toLowerCase().includes(search) ||

            product.description.toLowerCase().includes(search) ||

            product.crops.toLowerCase().includes(search) ||

            product.soil.toLowerCase().includes(search)

        );

    });

};


/* ==========================================
   12. FIND PRODUCT BY ID
========================================== */

window.getProductById = function(id) {

    return PRODUCTS.find(product => {

        return product.id === Number(id);

    }) || null;

};


/* ==========================================
   13. FILTER PRODUCTS BY CATEGORY
========================================== */

window.getProductsByCategory = function(category) {

    return PRODUCTS.filter(product => {

        return product.category.toLowerCase() ===
               category.toLowerCase();

    });

};


/* ==========================================
   14. FEATURED PRODUCTS
========================================== */

window.getFeaturedProducts = function() {

    return PRODUCTS.filter(product => {

        return product.featured;

    });

};


/* ==========================================
   15. PRODUCT DATABASE SUMMARY
========================================== */

console.log("Product database loaded successfully!");

console.log("Unique product IDs:",
    new Set(PRODUCTS.map(p => p.id)).size
);

console.log("All products have images:",
    PRODUCTS.every(p => Boolean(p.image))
);

console.log("All prices below Rs.500:",
    PRODUCTS.every(p => p.price < 500)
);

console.log("================================");
