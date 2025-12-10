// generate_products.js
// Generates N electronics products in INR.
// Usage: node generate_products.js > public/data/products.json

const N = 120; // change to 100–150 as you like

const categories = [
  "smartphones",
  "laptops",
  "headphones",
  "smartwatches",
  "tvs",
  "monitors",
  "speakers",
  "gaming",
  "accessories"
];

const brandsByCategory = {
  smartphones: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Vivo", "Oppo", "Google"],
  laptops: ["Dell", "HP", "Lenovo", "Apple", "Asus", "Acer", "MSI"],
  headphones: ["Sony", "Bose", "Sennheiser", "JBL", "Boat", "Realme"],
  smartwatches: ["Apple", "Samsung", "Garmin", "Fitbit", "Noise", "Fossil"],
  tvs: ["LG", "Samsung", "Sony", "TCL", "Panasonic", "Vu"],
  monitors: ["Dell", "LG", "Samsung", "Asus", "BenQ", "Acer"],
  speakers: ["Bose", "JBL", "Boat", "Sony", "Marshall", "Sonos"],
  gaming: ["Sony", "Microsoft", "Nintendo", "Asus", "Lenovo", "Razer"],
  accessories: ["Logitech", "Anker", "Belkin", "AmazonBasics", "Boat", "Portronics"]
};

const sampleModels = {
  smartphones: ["14 Pro", "S23 Ultra", "Nord 3", "Mi 11", "Pixel 8", "A78"],
  laptops: ["XPS 13", "ThinkPad X1", "MacBook Air", "ROG Strix", "IdeaPad 5"],
  headphones: ["WH-1000XM5", "QC45", "HD 560S", "Tune 750", "BassHeads 900"],
  smartwatches: ["Watch Series 9", "Galaxy Watch6", "Venu 3", "Versa 4", "ColorFit Pro"],
  tvs: ["OLED55", "QLED 4K", "NanoCell 55", "P-Series", "Cinema 4K"],
  monitors: ["UltraSharp 27", "ProArt 24", "Odyssey G9", "ROG Swift", "VA24"],
  speakers: ["Home Speaker", "Flip 6", "SoundBar 2.1", "BoomBox", "SoundLink"],
  gaming: ["PlayStation 5", "Xbox Series X", "Switch OLED", "ROG Strix", "Legion 5"],
  accessories: ["MX Master 3", "PowerCore 10000", "USB-C Hub", "Wireless Charger", "Docking Station"]
};

const sampleAdjectives = [
  "Premium", "Sleek", "Powerful", "Compact", "Lightweight", "High-Performance",
  "Wireless", "Portable", "Next-gen", "Advanced"
];

const sampleReviewComments = [
  "Fantastic performance and value.",
  "Battery life is excellent.",
  "Great display, but a bit pricey.",
  "Highly recommended!",
  "Good device overall.",
  "Sound quality is amazing.",
  "Very smooth performance.",
  "Build quality feels premium.",
  "Perfect for daily use.",
  "Exceeded expectations."
];

function randomFrom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat(min, max, decimals = 1) {
  const v = Math.random() * (max - min) + min;
  return Math.round(v * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

function randomDate() {
  const now = new Date();
  const past = new Date(now.getFullYear() - 1.5, now.getMonth(), now.getDate()).getTime();
  const t = rand(past, now.getTime());
  return new Date(t).toISOString().slice(0, 10);
}

function unsplash(query) {
  return `https://source.unsplash.com/featured/?${encodeURIComponent(query)}`;
}

// INR price ranges per category
const INRPriceRanges = {
  smartphones: [8000, 120000],
  laptops: [25000, 250000],
  headphones: [800, 45000],
  smartwatches: [1500, 55000],
  tvs: [10000, 250000],
  monitors: [6000, 90000],
  speakers: [700, 70000],
  gaming: [20000, 80000],
  accessories: [200, 10000]
};

const products = [];
let idCounter = 1;

for (let i = 0; i < N; i++) {
  const category = randomFrom(categories);
  const brand = randomFrom(brandsByCategory[category]);
  const model = randomFrom(sampleModels[category]);
  const adjective = Math.random() < 0.4 ? randomFrom(sampleAdjectives) + " " : "";

  const [pmin, pmax] = INRPriceRanges[category];
  const price = rand(pmin, pmax); // 💰 INR price

  const discountPercentage = rand(0, 25);
  const rating = randFloat(3.5, 5.0);
  const stock = rand(0, 120);

  const queryBase = `${brand} ${category} ${model}`.replace(/\s+/g, ",");

  const product = {
    id: idCounter++,
    title: `${brand} ${model}`,
    description: `${adjective}${brand} ${model} — a feature-rich ${category} device with excellent performance.`,
    price, // INR ✔
    brand,
    category,
    discountPercentage,
    rating,
    stock,
    thumbnail: unsplash(queryBase + ",product"),
    images: [
      unsplash(queryBase + ",front"),
      unsplash(queryBase + ",side"),
      unsplash(queryBase + ",lifestyle")
    ],
    reviews: [
      { rating: rand(4, 5), comment: randomFrom(sampleReviewComments), date: randomDate() },
      { rating: rand(3, 5), comment: randomFrom(sampleReviewComments), date: randomDate() }
    ]
  };

  products.push(product);
}

console.log(JSON.stringify(products, null, 2));
