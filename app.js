const PRODUCTS = [
  { id: 1, name: 'Morrisons Fresh Semi-Skimmed Milk', category: 'Dairy & Eggs', estimated_price_gbp: 1.55, weight_or_volume: '2L', image: 'assets/products/product_1.png' },
  { id: 2, name: 'Morrisons Fresh Whole Milk', category: 'Dairy & Eggs', estimated_price_gbp: 1.15, weight_or_volume: '1L', image: 'assets/products/product_2.png' },
  { id: 3, name: "Warburtons Toastie Thick White Bread", category: 'Bakery', estimated_price_gbp: 1.45, weight_or_volume: '800g', image: 'assets/products/product_3.webp' },
  { id: 4, name: 'Hovis Soft Medium Wholemeal Bread', category: 'Bakery', estimated_price_gbp: 1.40, weight_or_volume: '800g', image: 'assets/products/product_4.webp' },
  { id: 5, name: 'Lurpak Slightly Salted Butter', category: 'Dairy & Eggs', estimated_price_gbp: 2.75, weight_or_volume: '250g', image: 'assets/products/product_5.webp' },
  { id: 6, name: 'Morrisons Free Range Medium Eggs', category: 'Dairy & Eggs', estimated_price_gbp: 1.85, weight_or_volume: '6 pack', image: 'assets/products/product_6.webp' },
  { id: 7, name: 'Morrisons British Mature Cheddar Cheese', category: 'Dairy & Eggs', estimated_price_gbp: 2.80, weight_or_volume: '350g', image: 'assets/products/product_7.webp' },
  { id: 8, name: 'Cathedral City Mature Cheddar', category: 'Dairy & Eggs', estimated_price_gbp: 3.50, weight_or_volume: '350g', image: 'assets/products/product_8.png' },
  { id: 9, name: 'Muller Corner Strawberry & Peach Yoghurt', category: 'Dairy & Eggs', estimated_price_gbp: 2.50, weight_or_volume: '4x124g', image: 'assets/products/product_9.webp' },
  { id: 10, name: 'Cadbury Dairy Milk Chocolate Bar', category: 'Confectionery & Chocolate', estimated_price_gbp: 1.50, weight_or_volume: '110g', image: 'assets/products/product_10.webp' },
  { id: 11, name: 'Galaxy Smooth Milk Chocolate Bar', category: 'Confectionery & Chocolate', estimated_price_gbp: 1.50, weight_or_volume: '110g', image: 'assets/products/product_11.webp' },
  { id: 12, name: 'KitKat Four Finger Milk Chocolate Bar', category: 'Confectionery & Chocolate', estimated_price_gbp: 0.95, weight_or_volume: '41.5g', image: 'assets/products/product_12.webp' },
  { id: 13, name: 'Snickers Single Chocolate Bar', category: 'Confectionery & Chocolate', estimated_price_gbp: 0.95, weight_or_volume: '48g', image: 'assets/products/product_13.webp' },
  { id: 14, name: 'Haribo Starmix Sweets Bag', category: 'Confectionery & Chocolate', estimated_price_gbp: 1.35, weight_or_volume: '175g', image: 'assets/products/product_14.webp' },
  { id: 15, name: "Maltesers Chocolate Pouch Bag", category: 'Confectionery & Chocolate', estimated_price_gbp: 1.65, weight_or_volume: '102g', image: 'assets/products/product_15.webp' },
  { id: 16, name: 'Walkers Ready Salted Crisps', category: 'Snacks & Crisps', estimated_price_gbp: 2.20, weight_or_volume: '6x25g', image: 'assets/products/product_16.webp' },
  { id: 17, name: 'Walkers Cheese & Onion Grab Bag', category: 'Snacks & Crisps', estimated_price_gbp: 1.05, weight_or_volume: '45g', image: 'assets/products/product_17.webp' },
  { id: 18, name: 'Pringles Original Potato Crisps', category: 'Snacks & Crisps', estimated_price_gbp: 2.50, weight_or_volume: '165g', image: 'assets/products/product_18.webp' },
  { id: 19, name: "McVitie's Milk Chocolate Digestives", category: 'Snacks & Crisps', estimated_price_gbp: 1.75, weight_or_volume: '266g', image: 'assets/products/product_19.webp' },
  { id: 20, name: 'Oreo Original Sandwich Biscuits', category: 'Snacks & Crisps', estimated_price_gbp: 1.25, weight_or_volume: '154g', image: 'assets/products/product_20.webp' },
  { id: 21, name: 'Coca-Cola Original Taste Bottle', category: 'Soft Drinks & Hot Beverages', estimated_price_gbp: 1.85, weight_or_volume: '500ml', image: 'assets/products/product_21.webp' },
  { id: 22, name: 'Diet Coke Bottle', category: 'Soft Drinks & Hot Beverages', estimated_price_gbp: 1.65, weight_or_volume: '500ml', image: 'assets/products/product_22.webp' },
  { id: 23, name: 'Pepsi Max Bottle', category: 'Soft Drinks & Hot Beverages', estimated_price_gbp: 1.65, weight_or_volume: '500ml', image: 'assets/products/product_23.webp' },
  { id: 24, name: 'Lucozade Energy Original', category: 'Soft Drinks & Hot Beverages', estimated_price_gbp: 1.70, weight_or_volume: '500ml', image: 'assets/products/product_24.webp' },
  { id: 25, name: 'Innocent Smooth Orange Juice', category: 'Soft Drinks & Hot Beverages', estimated_price_gbp: 2.30, weight_or_volume: '900ml', image: 'assets/products/product_25.webp' },
  { id: 26, name: 'Nescafe Gold Blend Instant Coffee', category: 'Soft Drinks & Hot Beverages', estimated_price_gbp: 4.50, weight_or_volume: '100g', image: 'assets/products/product_26.webp' },
  { id: 27, name: 'PG Tips Original Black Tea Bags', category: 'Soft Drinks & Hot Beverages', estimated_price_gbp: 2.60, weight_or_volume: '80 pack', image: 'assets/products/product_27.webp' },
  { id: 28, name: 'Heinz Baked Beans in Tomato Sauce', category: 'Store Cupboard & Essentials', estimated_price_gbp: 1.40, weight_or_volume: '415g', image: 'assets/products/product_28.webp' },
  { id: 29, name: 'Heinz Cream of Tomato Soup', category: 'Store Cupboard & Essentials', estimated_price_gbp: 1.40, weight_or_volume: '400g', image: 'assets/products/product_29.webp' },
  { id: 30, name: 'Dolmio Bolognese Original Pasta Sauce', category: 'Store Cupboard & Essentials', estimated_price_gbp: 2.10, weight_or_volume: '500g', image: 'assets/products/product_30.webp' },
  { id: 31, name: 'Napolina Penne Pasta', category: 'Store Cupboard & Essentials', estimated_price_gbp: 1.50, weight_or_volume: '500g', image: 'assets/products/product_31.webp' },
  { id: 32, name: "Ben's Original Long Grain Microwave Rice", category: 'Store Cupboard & Essentials', estimated_price_gbp: 1.60, weight_or_volume: '250g', image: 'assets/products/product_32.webp' },
  { id: 33, name: "Kellogg's Corn Flakes Cereal", category: 'Store Cupboard & Essentials', estimated_price_gbp: 2.85, weight_or_volume: '450g', image: 'assets/products/product_33.webp' },
  { id: 34, name: 'Weetabix Cereal', category: 'Store Cupboard & Essentials', estimated_price_gbp: 3.40, weight_or_volume: '24 pack', image: 'assets/products/product_34.webp' },
  { id: 35, name: 'Richmond 8 Thick Pork Sausages', category: 'Chilled & Meat', estimated_price_gbp: 2.60, weight_or_volume: '426g', image: 'assets/products/product_35.webp' },
  { id: 36, name: 'Morrisons Unsmoked Back Bacon', category: 'Chilled & Meat', estimated_price_gbp: 2.25, weight_or_volume: '300g', image: 'assets/products/product_36.webp' },
  { id: 37, name: 'Morrisons British Chicken Breast Fillets', category: 'Chilled & Meat', estimated_price_gbp: 3.85, weight_or_volume: '300g', image: 'assets/products/product_37.webp' },
  { id: 38, name: 'Morrisons Meal Deal Chicken & Bacon Sandwich', category: 'Ready Meals & Food to Go', estimated_price_gbp: 2.95, weight_or_volume: '185g', image: 'assets/products/product_38.webp' },
  { id: 39, name: 'Morrisons Meal Deal Egg & Cress Sandwich', category: 'Ready Meals & Food to Go', estimated_price_gbp: 2.45, weight_or_volume: '170g', image: 'assets/products/product_39.webp' },
  { id: 40, name: 'Rustlers The Classic Quarter Pounder', category: 'Ready Meals & Food to Go', estimated_price_gbp: 2.50, weight_or_volume: '190g', image: 'assets/products/product_40.webp' },
  { id: 41, name: 'Ginsters Original Cornish Pasty', category: 'Ready Meals & Food to Go', estimated_price_gbp: 1.95, weight_or_volume: '227g', image: 'assets/products/product_41.webp' },
  { id: 42, name: 'Chicago Town Deep Dish Pepperoni Pizza', category: 'Frozen & Chilled Essentials', estimated_price_gbp: 2.75, weight_or_volume: '2x160g', image: 'assets/products/product_42.webp' },
  { id: 43, name: "Goodfella's Stonebaked Thin Margherita Pizza", category: 'Frozen & Chilled Essentials', estimated_price_gbp: 3.00, weight_or_volume: '345g', image: 'assets/products/product_43.webp' },
  { id: 44, name: 'Birds Eye Fish Fingers', category: 'Frozen & Chilled Essentials', estimated_price_gbp: 3.25, weight_or_volume: '10 pack', image: 'assets/products/product_44.webp' },
  { id: 45, name: "Ben & Jerry's Cookie Dough Ice Cream", category: 'Frozen & Chilled Essentials', estimated_price_gbp: 4.95, weight_or_volume: '465ml', image: 'assets/products/product_45.webp' },
  { id: 46, name: 'Andrex Soft Gentle Toilet Tissue', category: 'Household & Toiletries', estimated_price_gbp: 3.20, weight_or_volume: '4 pack', image: 'assets/products/product_46.webp' },
  { id: 47, name: 'Fairy Original Washing Up Liquid', category: 'Household & Toiletries', estimated_price_gbp: 1.95, weight_or_volume: '433ml', image: 'assets/products/product_47.webp' },
  { id: 48, name: 'Colgate Total Original Toothpaste', category: 'Household & Toiletries', estimated_price_gbp: 2.00, weight_or_volume: '75ml', image: 'assets/products/product_48.webp' },
  { id: 49, name: 'Radox Feel Refreshed Shower Gel', category: 'Household & Toiletries', estimated_price_gbp: 1.50, weight_or_volume: '225ml', image: 'assets/products/product_49.webp' },
  { id: 50, name: 'Morrisons Paracetamol 500mg Caplets', category: 'Household & Toiletries', estimated_price_gbp: 0.65, weight_or_volume: '16 pack', image: 'assets/products/product_50.webp' },
  { id: 51, name: 'Filippo Berio Extra Virgin Olive Oil', category: 'Grocery', estimated_price_gbp: 5.50, weight_or_volume: '500ml', image: 'assets/products/product_51.webp' },
  { id: 52, name: 'Mutti Polpa Fine Chopped Tomatoes', category: 'Grocery', estimated_price_gbp: 1.25, weight_or_volume: '400g', image: 'assets/products/product_52.webp' },
  { id: 53, name: 'Silver Spoon White Granulated Sugar', category: 'Grocery', estimated_price_gbp: 1.15, weight_or_volume: '1kg', image: 'assets/products/product_53.webp' },
  { id: 54, name: 'McDougalls Plain Flour', category: 'Grocery', estimated_price_gbp: 1.40, weight_or_volume: '1kg', image: 'assets/products/product_54.jpg' },
  { id: 55, name: "Hartley's Best Strawberry Jam", category: 'Grocery', estimated_price_gbp: 1.75, weight_or_volume: '340g', image: 'assets/products/product_55.webp' },
  { id: 56, name: 'Knorr Vegetable Stock Cubes', category: 'Grocery', estimated_price_gbp: 1.60, weight_or_volume: '8 pack', image: 'assets/products/product_56.webp' },
  { id: 57, name: 'Kikkoman Naturally Brewed Soy Sauce', category: 'Grocery', estimated_price_gbp: 2.35, weight_or_volume: '150ml', image: 'assets/products/product_57.webp' },
  { id: 58, name: "Hellmann's Real Mayonnaise Squeezy", category: 'Grocery', estimated_price_gbp: 2.85, weight_or_volume: '430ml', image: 'assets/products/product_58.webp' },
  { id: 59, name: 'HP Original Brown Sauce', category: 'Grocery', estimated_price_gbp: 2.20, weight_or_volume: '425g', image: 'assets/products/product_59.webp' },
  { id: 60, name: 'Batchelors Super Noodles Chicken Flavour', category: 'Grocery', estimated_price_gbp: 0.90, weight_or_volume: '90g', image: 'assets/products/product_60.webp' },
  { id: 61, name: 'Nurofen Ibuprofen 200mg Tablets', category: 'Health', estimated_price_gbp: 2.20, weight_or_volume: '16 pack', image: 'assets/products/product_61.webp' },
  { id: 62, name: 'Savlon Antiseptic Cream', category: 'Health', estimated_price_gbp: 2.45, weight_or_volume: '30g', image: 'assets/products/product_62.webp' },
  { id: 63, name: 'Elastoplast Water Resistant Plasters', category: 'Health', estimated_price_gbp: 2.70, weight_or_volume: '20 pack', image: 'assets/products/product_63.webp' },
  { id: 64, name: 'Strepsils Honey & Lemon Sore Throat Lozenges', category: 'Health', estimated_price_gbp: 3.50, weight_or_volume: '16 pack', image: 'assets/products/product_64.webp' },
  { id: 65, name: 'Benylin Chesty Cough Original Syrup', category: 'Health', estimated_price_gbp: 5.25, weight_or_volume: '150ml', image: 'assets/products/product_65.webp' },
  { id: 66, name: 'Berocca Orange Effervescent Tablets', category: 'Health', estimated_price_gbp: 4.80, weight_or_volume: '15 pack', image: 'assets/products/product_66.webp' },
  { id: 67, name: 'Seven Seas Multivitamin with Cod Liver Oil', category: 'Health', estimated_price_gbp: 4.25, weight_or_volume: '30 capsules', image: 'assets/products/product_67.webp' },
  { id: 68, name: 'Piriteze One A Day Allergy Relief Tablets', category: 'Health', estimated_price_gbp: 4.10, weight_or_volume: '7 pack', image: 'assets/products/product_68.webp' },
  { id: 69, name: 'Dettol Anti-Bacterial Hand Sanitiser Gel', category: 'Health', estimated_price_gbp: 1.60, weight_or_volume: '50ml', image: 'assets/products/product_69.webp' },
  { id: 70, name: 'Vaseline Lip Therapy Original Tin', category: 'Health', estimated_price_gbp: 1.50, weight_or_volume: '20g', image: 'assets/products/product_70.webp' },
  { id: 71, name: 'Doritos Tangy Cheese Sharing Tortilla Chips', category: 'Snacks', estimated_price_gbp: 2.25, weight_or_volume: '180g', image: 'assets/products/product_71.webp' },
  { id: 72, name: 'Sensations Thai Sweet Chilli Potato Crisps', category: 'Snacks', estimated_price_gbp: 2.25, weight_or_volume: '150g', image: 'assets/products/product_72.webp' },
  { id: 73, name: 'KP Salted Peanuts Bag', category: 'Snacks', estimated_price_gbp: 1.80, weight_or_volume: '150g', image: 'assets/products/product_73.webp' },
  { id: 74, name: "Jacob's Mini Cheddars Original", category: 'Snacks', estimated_price_gbp: 2.00, weight_or_volume: '6x23g', image: 'assets/products/product_74.webp' },
  { id: 75, name: 'Twiglets Baked Wheat Snacks', category: 'Snacks', estimated_price_gbp: 1.75, weight_or_volume: '150g', image: 'assets/products/product_75.webp' },
  { id: 76, name: 'Nature Valley Crunchy Oats & Honey Bars', category: 'Snacks', estimated_price_gbp: 2.50, weight_or_volume: '5x42g', image: 'assets/products/product_76.webp' },
  { id: 77, name: 'Nakd Cocoa Delight Fruit & Nut Bar', category: 'Snacks', estimated_price_gbp: 1.10, weight_or_volume: '35g', image: 'assets/products/product_77.webp' },
  { id: 78, name: 'Popchips Barbeque Potato Snacks', category: 'Snacks', estimated_price_gbp: 2.00, weight_or_volume: '85g', image: 'assets/products/product_78.webp' },
  { id: 79, name: "Jack Link's Beef Jerky Original", category: 'Snacks', estimated_price_gbp: 2.10, weight_or_volume: '25g', image: 'assets/products/product_79.webp' },
  { id: 80, name: 'Graze Smoky BBQ Crunch Snack Punnet', category: 'Snacks', estimated_price_gbp: 1.30, weight_or_volume: '36g', image: 'assets/products/product_80.webp' },
  { id: 81, name: 'Stella Artois Premium Lager Cans', category: 'Alcohol', estimated_price_gbp: 5.75, weight_or_volume: '4x440ml', image: 'assets/products/product_81.webp' },
  { id: 82, name: 'Carling Original Lager Cans', category: 'Alcohol', estimated_price_gbp: 5.25, weight_or_volume: '4x440ml', image: 'assets/products/product_82.webp' },
  { id: 83, name: 'Guinness Draught Stout Cans', category: 'Alcohol', estimated_price_gbp: 6.25, weight_or_volume: '4x440ml', image: 'assets/products/product_83.webp' },
  { id: 84, name: 'Kopparberg Strawberry & Lime Cider', category: 'Alcohol', estimated_price_gbp: 2.45, weight_or_volume: '500ml', image: 'assets/products/product_84.webp' },
  { id: 85, name: 'Hardys Stamp Shiraz Cabernet Red Wine', category: 'Alcohol', estimated_price_gbp: 7.25, weight_or_volume: '75cl', image: 'assets/products/product_85.webp' },
  { id: 86, name: 'Oyster Bay Sauvignon Blanc White Wine', category: 'Alcohol', estimated_price_gbp: 9.95, weight_or_volume: '75cl', image: 'assets/products/product_86.webp' },
  { id: 87, name: "Gordon's Special Dry London Gin", category: 'Alcohol', estimated_price_gbp: 16.50, weight_or_volume: '70cl', image: 'assets/products/product_87.webp' },
  { id: 88, name: 'Smirnoff Triple Distilled Red Label Vodka', category: 'Alcohol', estimated_price_gbp: 16.00, weight_or_volume: '70cl', image: 'assets/products/product_88.webp' },
  { id: 89, name: "Jack Daniel's Old No. 7 Tennessee Whiskey", category: 'Alcohol', estimated_price_gbp: 22.00, weight_or_volume: '70cl', image: 'assets/products/product_89.webp' },
  { id: 90, name: 'Thatchers Gold West Country Cider Cans', category: 'Alcohol', estimated_price_gbp: 5.50, weight_or_volume: '4x440ml', image: 'assets/products/product_90.webp' },
  { id: 91, name: 'Felix As Good As It Looks Meat Selection in Jelly', category: 'Pets', estimated_price_gbp: 5.50, weight_or_volume: '12x85g', image: 'assets/products/product_91.webp' },
  { id: 92, name: 'Whiskas Adult Cat Pouches Gravy Selection', category: 'Pets', estimated_price_gbp: 5.25, weight_or_volume: '12x85g', image: 'assets/products/product_92.webp' },
  { id: 93, name: 'Dreamies Cat Treats with Chicken', category: 'Pets', estimated_price_gbp: 1.35, weight_or_volume: '60g', image: 'assets/products/product_93.webp' },
  { id: 94, name: 'Pedigree Adult Wet Dog Food Cans Poultry in Jelly', category: 'Pets', estimated_price_gbp: 4.50, weight_or_volume: '4x385g', image: 'assets/products/product_94.webp' },
  { id: 95, name: 'Pedigree Dentastix Medium Dog Dental Chews', category: 'Pets', estimated_price_gbp: 2.20, weight_or_volume: '7 pack', image: 'assets/products/product_95.webp' },
  { id: 96, name: 'Bakers Adult Small Dog Dry Food Chicken & Veg', category: 'Pets', estimated_price_gbp: 3.95, weight_or_volume: '1.1kg', image: 'assets/products/product_96.webp' },
  { id: 97, name: 'Purina ONE Adult Dry Cat Food Chicken & Whole Grains', category: 'Pets', estimated_price_gbp: 4.80, weight_or_volume: '800g', image: 'assets/products/product_97.webp' },
  { id: 98, name: 'Catsan Hygiene Non-Clumping Cat Litter', category: 'Pets', estimated_price_gbp: 7.50, weight_or_volume: '10L', image: 'assets/products/product_98.webp' },
  { id: 99, name: 'Wagg Complete Beef & Veg Dry Dog Food', category: 'Pets', estimated_price_gbp: 3.80, weight_or_volume: '2kg', image: 'assets/products/product_99.webp' },
  { id: 100, name: 'Whiskas Cat Milk for Cats & Kittens', category: 'Pets', estimated_price_gbp: 1.95, weight_or_volume: '3x200ml', image: 'assets/products/product_100.webp' },
];

// To enable real "Continue with Google" sign-in:
// 1. Go to https://console.cloud.google.com/apis/credentials, create an OAuth 2.0 Client ID
//    (type: Web application), and add this site's URL under "Authorized JavaScript origins"
//    (e.g. https://graftr-app.vercel.app and http://localhost:8126 for local testing).
// 2. Paste the Client ID below. It's a public identifier, safe to ship in client code
//    (unlike the Stripe secret key, this one isn't a secret).
const GOOGLE_CLIENT_ID = '310040090151-6llrfgdqkg0vamomn9fdqnbiml3anv5k.apps.googleusercontent.com';

function loadUserProfile() {
  try {
    const saved = localStorage.getItem('graftr_user_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.address && !parsed.address.includes('Kingsdown')) {
        return parsed;
      }
    }
  } catch(e){}
  return {
    name: 'Priya Nair',
    phone: '+44 7700 900077',
    address: '541 Halliwell Road',
    city: 'Bolton',
    postcode: 'BL1 3PJ',
    instructions: 'Leave at front door / ring bell'
  };
}

function saveUserProfile() {
  try { localStorage.setItem('graftr_user_profile', JSON.stringify(state.userProfile)); } catch(e){}
}

function loadLoggedOrders() {
  try {
    const saved = localStorage.getItem('graftr_logged_orders');
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(o => {
          // If an active demo order was saved as Out for Delivery before courier acceptance, reset it to Pending
          if (!o.courier && o.status === 'Out for Delivery') {
            o.status = 'Pending Courier Acceptance';
          }
          return o;
        }).filter(o => o.address && !o.address.includes('Kingsdown'));
      }
    }
  } catch(e){}
  return [
    {
      id: '#4821',
      merchant: 'Morrisons Daily',
      timestamp: 'Just now',
      createdAt: Date.now(),
      status: 'Pending Courier Acceptance',
      address: '541 Halliwell Road, BL1 3PJ',
      courier: null,
      total: 15.74,
      items: [
        { name: 'Warburtons Toastie Thick White Bread 800g', qty: 1, price: 1.40 },
        { name: 'Morrisons Fresh Semi-Skimmed Milk 2L', qty: 1, price: 1.55 },
        { name: 'Lurpak Slightly Salted Butter 500g', qty: 1, price: 4.25 },
        { name: 'Morrisons Free Range Medium Eggs x6', qty: 1, price: 1.80 }
      ]
    }
  ];
}

function saveLoggedOrders() {
  try { localStorage.setItem('graftr_logged_orders', JSON.stringify(state.orders)); } catch(e){}
}

function loadCourierStats() {
  try {
    const saved = localStorage.getItem('graftr_courier_stats');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return {
          courierOnlineSecondsToday: parsed.courierOnlineSecondsToday || 0,
          courierOnlineDayKey: parsed.courierOnlineDayKey || null,
          lastCashOutAt: parsed.lastCashOutAt || null,
          payoutHistory: Array.isArray(parsed.payoutHistory) ? parsed.payoutHistory : [],
        };
      }
    }
  } catch (e) { /* ignore corrupt storage */ }
  return { courierOnlineSecondsToday: 0, courierOnlineDayKey: null, lastCashOutAt: null, payoutHistory: [] };
}

function saveCourierStats() {
  try {
    localStorage.setItem('graftr_courier_stats', JSON.stringify({
      courierOnlineSecondsToday: state.courierOnlineSecondsToday,
      courierOnlineDayKey: state.courierOnlineDayKey,
      lastCashOutAt: state.lastCashOutAt,
      payoutHistory: state.payoutHistory,
    }));
  } catch (e) { /* ignore write failure */ }
}

function loadInbox() {
  try {
    const saved = localStorage.getItem('graftr_inbox');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return {
          shopperInbox: Array.isArray(parsed.shopperInbox) ? parsed.shopperInbox : [],
          courierInbox: Array.isArray(parsed.courierInbox) ? parsed.courierInbox : [],
        };
      }
    }
  } catch (e) { /* ignore corrupt storage */ }
  return { shopperInbox: [], courierInbox: [] };
}

function saveInbox() {
  try {
    localStorage.setItem('graftr_inbox', JSON.stringify({
      shopperInbox: state.shopperInbox,
      courierInbox: state.courierInbox,
    }));
  } catch (e) { /* ignore write failure */ }
}

function formatRelativeTime(ts) {
  if (!ts) return '';
  const diffSec = Math.floor((Date.now() - ts) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay === 1) return 'Yesterday';
  if (diffDay < 7) return `${diffDay}d`;
  return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const PENDING_ORDER_KEY = 'graftr_pending_order';

// Shared by both the real Stripe-paid path and the no-backend-configured fallback,
// so an order is logged the same way regardless of how payment happened.
function finalizeOrder(snapshot) {
  const newId = '#' + Math.floor(4824 + Math.random() * 100);
  const newOrder = {
    id: newId,
    merchant: 'Morrisons Daily',
    timestamp: 'Just now',
    createdAt: Date.now(),
    items: snapshot.items,
    subtotal: snapshot.subtotal,
    deliveryFee: snapshot.deliveryFee,
    total: snapshot.subtotal + snapshot.deliveryFee,
    status: 'Pending Courier Acceptance',
    address: snapshot.address,
    courier: null,
    tip: 0,
  };
  state.orders.unshift(newOrder);
  state.activeOrderId = newId;
  state.cart = {};
  state.showCheckoutModal = false;
  state.mode = 'shopper';
  saveLoggedOrders();
  state.shopperInbox.unshift({
    tag: 'Order Alert',
    text: `Order ${newOrder.id} confirmed — £${newOrder.total.toFixed(2)}. We're finding you a courier.`,
    createdAt: Date.now(),
    read: false,
  });
  state.courierInbox.unshift({
    tag: 'Job alert',
    text: `New job available: ${newOrder.merchant} → ${newOrder.address}, £${newOrder.deliveryFee.toFixed(2)}`,
    createdAt: Date.now(),
    read: false,
  });
  saveInbox();
  state.screen = 'shopper-inbox';
  render();
}

function checkStripeRedirectResult() {
  const params = new URLSearchParams(window.location.search);
  const payment = params.get('payment');
  if (!payment) return;

  if (payment === 'success') {
    const raw = localStorage.getItem(PENDING_ORDER_KEY);
    if (raw) {
      try {
        finalizeOrder(JSON.parse(raw));
      } catch (e) { /* malformed snapshot, nothing to recover */ }
      localStorage.removeItem(PENDING_ORDER_KEY);
    }
  }
  // payment === 'cancelled': nothing to finalize, just strip the query string below.
  window.history.replaceState({}, '', window.location.pathname);
}

function loadAuthUser() {
  try {
    const saved = localStorage.getItem('graftr_auth_user');
    if (saved) return JSON.parse(saved);
  } catch(e){}
  return null;
}

function saveAuthUser() {
  try { localStorage.setItem('graftr_auth_user', JSON.stringify(state.authUser)); } catch(e){}
}

// Real (client-side-only) email account book: email -> { name, passwordHash, address, createdAt }.
// There's no backend here, so this is the honest ceiling for "email auth" in a static app —
// genuine account creation/lookup/password checks, just scoped to this browser's storage.
function loadEmailAccounts() {
  try {
    const saved = localStorage.getItem('graftr_email_accounts');
    if (saved) return JSON.parse(saved);
  } catch (e) { /* ignore corrupt storage */ }
  return {};
}

function saveEmailAccounts(accounts) {
  try { localStorage.setItem('graftr_email_accounts', JSON.stringify(accounts)); } catch (e) { /* ignore write failure */ }
}

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const state = {
  screen: 'login',
  mode: null,
  authRole: 'shopper',
  showAuthModal: false,
  authProvider: null,
  emailAuthMode: 'signup',
  authError: null,
  authNotice: null,
  showGoogleFallbackButton: false,
  authUser: loadAuthUser(),
  userProfile: loadUserProfile(),
  orders: loadLoggedOrders(),
  activeOrderId: '#4822',
  showAddressModal: false,
  showCheckoutModal: false,
  placingOrder: false,
  scannerStatus: null,
  manualBarcodeInput: '',
  aiChatOpen: false,
  aiMessages: [
    { role: 'bot', text: "👋 Hi! I'm your Vendaru AI Shopping Assistant. Ask me to find items, recommend groceries, or add products directly to your basket!" }
  ],
  aiInput: '',
  aiLoading: false,
  aiListening: false,
  aiVoiceSupported: undefined,
  courierOnline: true,
  courierOnlineSince: Date.now(),
  ...loadCourierStats(),
  justDeliveredOrderId: null,
  courierLiveGps: null,
  liveEtaMinutes: null,
  liveEtaUpdatedAt: null,
  shopperInboxScrollTop: null,
  courierInboxScrollTop: null,
  packItems: [
    { name: 'Semi-skimmed milk 2L', qty: 1, checked: true },
    { name: 'Free range eggs x6', qty: 1, checked: true },
    { name: 'Sourdough loaf', qty: 1, checked: false },
    { name: 'Baby spinach 200g', qty: 2, checked: false },
  ],
  packDone: false,
  earningsTab: 'today',
  deliveryLater: false,
  ...loadInbox(),
  basketCheckedOut: false,
  trackStep: 2,
  shopImages: { morrisons: null, track: null, offers: null, local: null },
  cart: {},
  productImages: {},
  searchQuery: '',
  specialRequest: {
    productName: '',
    productUrl: '',
    storeLocation: '',
    stockStatus: null,
    screenshot: null,
    submitted: false,
  },
};

// Resume a signed-in session across reloads instead of bouncing back to the login screen.
if (state.authUser && state.authUser.role) {
  state.mode = state.authUser.role;
  state.screen = state.authUser.role === 'courier' ? 'courier-activity' : 'shopper-shop';
}

const SHOP_IMAGES_KEY = 'absolutely-shop-images';
try {
  const saved = JSON.parse(localStorage.getItem(SHOP_IMAGES_KEY) || '{}');
  Object.assign(state.shopImages, saved);
} catch (e) { /* ignore corrupt storage */ }

const PRODUCT_IMAGES_KEY = 'absolutely-product-images';
try {
  const savedProductImages = JSON.parse(localStorage.getItem(PRODUCT_IMAGES_KEY) || '{}');
  Object.assign(state.productImages, savedProductImages);
} catch (e) { /* ignore corrupt storage */ }

function cartLines() {
  return Object.entries(state.cart)
    .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty }))
    .filter((l) => l.product && l.qty > 0);
}

function cartCount() {
  return cartLines().reduce((sum, l) => sum + l.qty, 0);
}

function cartTotal() {
  return cartLines().reduce((sum, l) => sum + l.qty * l.product.estimated_price_gbp, 0);
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function escapeHtml(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

function saveShopImages() {
  localStorage.setItem(SHOP_IMAGES_KEY, JSON.stringify(state.shopImages));
}

function saveProductImages() {
  localStorage.setItem(PRODUCT_IMAGES_KEY, JSON.stringify(state.productImages));
}

let root;

const SHOP_IMAGE_DEFAULTS = {
  morrisons: 'assets/shop/morrisons.png',
  track: 'assets/shop/track.png',
  offers: 'assets/shop/offers.png',
  local: 'assets/shop/local.png',
};

function cardImageHtml(key, placeholderEmoji) {
  const src = state.shopImages[key] || SHOP_IMAGE_DEFAULTS[key];
  const bgStyle = src ? `background-image:url('${src}');background-size:cover;background-position:center;` : '';
  return `
  <label class="card-image" style="${bgStyle}">
    ${src ? '' : `<span style="font-size:32px;opacity:0.3">${placeholderEmoji}</span>`}
    <span class="upload-overlay">⤴ ${src ? 'Change image' : 'Add image'}</span>
    <input type="file" accept="image/*" data-upload="${key}" />
  </label>`;
}

function renderLogin() {
  const isCourier = state.authRole === 'courier';
  return `
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 24px;gap:24px;text-align:center;min-height:580px;background:#ffffff">
    
    <!-- Hero Brand Badge -->
    <div style="width:76px;height:76px;border-radius:24px;background:#ffcbe1;color:#141414;display:flex;align-items:center;justify-content:center;font-size:38px;box-shadow:0 14px 30px rgba(255,203,225,0.5)">
      ${isCourier ? '🚴' : '🛍️'}
    </div>

    <div>
      <div style="font-size:27px;font-weight:800;letter-spacing:-0.6px;color:#0f172a">Welcome to Vendaru</div>
      <div style="font-size:13.5px;color:#64748b;margin-top:6px;line-height:1.45;max-width:280px">Fast local delivery &amp; courier network in Bolton</div>
    </div>

    <!-- Role Selector Segmented Tabs -->
    <div style="display:flex;background:#f1f5f9;border-radius:16px;padding:4px;width:100%;max-width:330px;gap:4px">
      <button type="button" data-action="setAuthRole" data-arg="shopper" style="flex:1;padding:11px;border:none;border-radius:12px;font-size:13.5px;font-weight:700;cursor:pointer;background:${isCourier ? 'transparent' : '#ffffff'};color:${isCourier ? '#64748b' : '#0f172a'};box-shadow:${isCourier ? 'none' : '0 4px 12px rgba(0,0,0,0.06)'}">
        🛒 I'm Shopping
      </button>
      <button type="button" data-action="setAuthRole" data-arg="courier" style="flex:1;padding:11px;border:none;border-radius:12px;font-size:13.5px;font-weight:700;cursor:pointer;background:${isCourier ? '#ffffff' : 'transparent'};color:${isCourier ? '#0f172a' : '#64748b'};box-shadow:${isCourier ? '0 4px 12px rgba(0,0,0,0.06)' : 'none'}">
        🚴 I'm a Courier
      </button>
    </div>

    ${state.authNotice ? `
      <div style="width:100%;max-width:330px;background:#fffbeb;border:1.5px solid #fde68a;color:#92400e;border-radius:16px;padding:12px 14px;font-size:12.5px;text-align:left;line-height:1.45">
        ${escapeHtml(state.authNotice)}
      </div>
    ` : ''}

    <!-- Clean High-Aesthetic Authentication Buttons -->
    <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:330px">
      <!-- Google Sign-In -->
      <button type="button" data-action="loginWithGoogle" style="width:100%;background:#ffffff;color:#1e293b;border:1.5px solid #e2e8f0;border-radius:18px;padding:14px 18px;font-size:14.5px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:12px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,0.04);transition:all 0.2s">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        Continue with Google
      </button>
      ${state.showGoogleFallbackButton ? `<div id="google-signin-button-container" style="display:flex;justify-content:center"></div>` : ''}

      <!-- Email & Password -->
      <button type="button" data-action="loginWithEmail" style="width:100%;background:#0f172a;color:#ffffff;border:none;border-radius:18px;padding:14px 18px;font-size:14.5px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;box-shadow:0 6px 18px rgba(15,23,42,0.18)">
        ✉️ Continue with Email
      </button>
    </div>

    <!-- Divider -->
    <div style="display:flex;align-items:center;gap:12px;width:100%;max-width:330px;opacity:0.5;font-size:12px;margin-top:2px">
      <div style="flex:1;height:1px;background:#cbd5e1"></div>
      <span style="font-weight:600">or continue as guest</span>
      <div style="flex:1;height:1px;background:#cbd5e1"></div>
    </div>

    <!-- Guest Access Button -->
    <div style="width:100%;max-width:330px">
      ${isCourier
        ? `<div class="press" data-action="chooseCourier" style="background:#f8fafc;color:#334155;border:1.5px solid #cbd5e1;border-radius:16px;padding:13px;font-size:13.5px;font-weight:700;cursor:pointer">🚴 Enter Courier Guest Mode</div>`
        : `<div class="press" data-action="chooseShopper" style="background:#f8fafc;color:#334155;border:1.5px solid #cbd5e1;border-radius:16px;padding:13.5px;font-size:13.5px;font-weight:700;cursor:pointer">🛒 Enter Shopper Guest Mode</div>`
      }
    </div>

    <div style="font-size:11px;color:#94a3b8;max-width:270px;line-height:1.45">
      By continuing, you agree to Vendaru's Terms of Service and Privacy Policy.
    </div>
  </div>`;
}

function renderAuthModal() {
  if (!state.showAuthModal || state.authProvider !== 'email') return '';

  const roleTitle = state.authRole === 'courier' ? 'Courier' : 'Shopper';
  const isLogin = state.emailAuthMode === 'login';
  return `
    <div class="graftr-modal-overlay" style="z-index:99999;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px)">
      <div style="width:100%;max-width:370px;background:#ffffff;border-radius:24px;padding:24px;display:flex;flex-direction:column;gap:16px;box-shadow:0 20px 40px rgba(0,0,0,0.3);text-align:center">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:20px">✉️</span>
            <span style="font-size:16px;font-weight:800;color:#1e293b">Email Account Setup</span>
          </div>
          <button type="button" data-action="closeAuthModal" style="background:none;border:none;color:#64748b;font-size:22px;cursor:pointer">✕</button>
        </div>

        <!-- Toggle Sign Up vs Log In -->
        <div style="display:flex;background:#f1f5f9;border-radius:12px;padding:4px;gap:4px">
          <button type="button" data-action="setEmailAuthMode" data-arg="signup" style="flex:1;padding:8px;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;background:${isLogin ? 'transparent' : '#fff'};color:${isLogin ? '#64748b' : '#141414'};box-shadow:${isLogin ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'}">
            Create Account
          </button>
          <button type="button" data-action="setEmailAuthMode" data-arg="login" style="flex:1;padding:8px;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;background:${isLogin ? '#fff' : 'transparent'};color:${isLogin ? '#141414' : '#64748b'};box-shadow:${isLogin ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'}">
            Log In
          </button>
        </div>

        ${state.authError ? `<div style="background:#fee2e2;border:1.5px solid #fecaca;color:#b91c1c;border-radius:12px;padding:10px 12px;font-size:12.5px;text-align:left;line-height:1.4">${escapeHtml(state.authError)}</div>` : ''}

        <div style="display:flex;flex-direction:column;gap:10px;text-align:left">
          ${!isLogin ? `
            <div>
              <label style="font-size:11.5px;font-weight:700;color:#475569;margin-bottom:3px;display:block">Full Name</label>
              <input type="text" id="email-setup-name" placeholder="Your full name" value="" style="width:100%;padding:11px 12px;border:1.5px solid #cbd5e1;border-radius:12px;font-size:13.5px;font-weight:600" />
            </div>
          ` : ''}
          <div>
            <label style="font-size:11.5px;font-weight:700;color:#475569;margin-bottom:3px;display:block">Email Address</label>
            <input type="email" id="email-setup-email" placeholder="name@example.com" value="" style="width:100%;padding:11px 12px;border:1.5px solid #cbd5e1;border-radius:12px;font-size:13.5px;font-weight:600" />
          </div>
          <div>
            <label style="font-size:11.5px;font-weight:700;color:#475569;margin-bottom:3px;display:block">Password</label>
            <input type="password" id="email-setup-password" placeholder="At least 6 characters" value="" style="width:100%;padding:11px 12px;border:1.5px solid #cbd5e1;border-radius:12px;font-size:13.5px;font-weight:600" />
          </div>
          ${!isLogin ? `
            <div>
              <label style="font-size:11.5px;font-weight:700;color:#475569;margin-bottom:3px;display:block">Delivery Address (Bolton Hub)</label>
              <input type="text" id="email-setup-address" value="${escapeHtml(state.userProfile.address || '')}${state.userProfile.postcode ? ', ' + escapeHtml(state.userProfile.postcode) : ''}" placeholder="Your address" style="width:100%;padding:11px 12px;border:1.5px solid #cbd5e1;border-radius:12px;font-size:13.5px;font-weight:600" />
            </div>
          ` : ''}
        </div>

        <button type="button" data-action="confirmEmailAuthSetup" style="width:100%;background:#141414;color:#fff;border:none;padding:15px;border-radius:16px;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,0.18);margin-top:4px">
          ⚡ ${isLogin ? 'Log In to Account' : 'Create Vendaru Account'} (${roleTitle})
        </button>
      </div>
    </div>
  `;
}



function getCoordsForAddress(addressStr) {
  const str = (addressStr || '').toLowerCase().trim();
  if (str.includes('halliwell') || str.includes('bolton')) return [53.5933, -2.4405];
  if (str.includes('deptford')) return [51.4788, -0.0210];
  if (str.includes('greenwich')) return [51.4810, -0.0050];
  if (str.includes('high st')) return [51.4775, -0.0150];
  if (str.includes('kingsdown')) return [51.4740, -0.0084];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const latOffset = ((Math.abs(hash) % 100) - 50) * 0.00035;
  const lngOffset = ((Math.abs(hash >> 3) % 100) - 50) * 0.00035;

  return [53.5933 + latOffset, -2.4405 + lngOffset];
}

const addressCoordsCache = {};

async function fetchAddressCoords(addressStr) {
  if (!addressStr) return [53.5933, -2.4405];
  const cleanAddr = addressStr.trim();
  if (addressCoordsCache[cleanAddr]) {
    return addressCoordsCache[cleanAddr];
  }

  try {
    const query = encodeURIComponent(cleanAddr.toLowerCase().includes('uk') ? cleanAddr : cleanAddr + ', UK');
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`, {
      headers: { 'Accept-Language': 'en' }
    });
    const data = await response.json();
    if (data && data.length > 0) {
      const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      addressCoordsCache[cleanAddr] = coords;
      return coords;
    }
  } catch (err) {
    console.warn('Nominatim geocoding error:', err);
  }

  return getCoordsForAddress(cleanAddr);
}

const routeCache = {};

async function fetchStreetRoute(startPos, endPos) {
  const key = `${startPos[0].toFixed(4)},${startPos[1].toFixed(4)}_${endPos[0].toFixed(4)},${endPos[1].toFixed(4)}`;
  if (routeCache[key]) return routeCache[key];

  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${startPos[1]},${startPos[0]};${endPos[1]},${endPos[0]}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.routes && data.routes.length > 0 && data.routes[0].geometry) {
      const streetCoords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
      routeCache[key] = streetCoords;
      return streetCoords;
    }
  } catch (err) {
    console.warn('OSRM Routing error:', err);
  }

  return [startPos, endPos];
}

let courierGpsWatchId = null;

function startCourierGpsTracking() {
  if (!navigator.geolocation) {
    console.warn('Geolocation not supported by browser.');
    return;
  }
  stopCourierGpsTracking();

  courierGpsWatchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      state.courierLiveGps = {
        lat: latitude,
        lng: longitude,
        timestamp: Date.now()
      };
      state.courierOnline = true;

      if (courierMarkerInstance && (state.screen === 'shopper-inbox' || state.screen === 'shopper-basket')) {
        courierMarkerInstance.setLatLng([latitude, longitude]);
      }
      render();
    },
    (err) => {
      console.warn('GPS Watch error or permission denied:', err.message);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 3000,
      timeout: 10000
    }
  );
}

function stopCourierGpsTracking() {
  if (courierGpsWatchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(courierGpsWatchId);
    courierGpsWatchId = null;
  }
}

function renderCourierActivity() {
  // Real Pending Jobs placed by Shopper
  const pendingOrders = state.orders.filter(o => o.status === 'Pending Courier Acceptance');
  const pendingJobsHtml = pendingOrders.length > 0 ? pendingOrders.map(o => `
    <div style="background:#fff;border:2px solid #ffcbe1;border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:10px;box-shadow:0 8px 20px rgba(0,0,0,0.08);margin-bottom:12px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="background:#ffcbe1;color:#141414;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px">✨ LIVE SHOPPER ORDER (${o.id})</span>
        <span style="font-size:14px;font-weight:800;color:#10b981">£${o.total ? o.total.toFixed(2) : '7.80'}</span>
      </div>
      <div>
        <div style="font-size:15px;font-weight:700">${escapeHtml(o.merchant)} ➔ ${escapeHtml(o.address)}</div>
        <div style="font-size:12.5px;opacity:0.65">${o.items ? o.items.length : 1} items · Customer: ${escapeHtml(state.userProfile.name)}</div>
      </div>
      <button type="button" data-action="acceptCourierJob" data-arg="${o.id}" style="background:#141414;color:#fff;border:none;padding:12px;border-radius:14px;font-weight:800;font-size:13.5px;cursor:pointer;width:100%">
        🚴 Accept Delivery Job (${o.id})
      </button>
    </div>
  `).join('') : '';

  const activeOrder = state.orders.find(o => o.status === 'Out for Delivery');

  let inner;

  if (state.justDeliveredOrderId) {
    const deliveredOrder = state.orders.find(o => o.id === state.justDeliveredOrderId);
    inner = `
    <div style="border:1.5px solid oklch(56% 0.17 258);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;background:oklch(97% 0.02 258)">
      <div style="font-size:18px;font-weight:700">Delivered! +£${deliveredOrder && deliveredOrder.total ? deliveredOrder.total.toFixed(2) : '0.00'}</div>
      <div style="font-size:13px;opacity:0.6">Nice work on ${deliveredOrder ? deliveredOrder.id : 'that order'}. Ready for the next one?</div>
      <div class="press" data-action="dismissDeliveryConfirmation" style="background:#141414;color:#fff;border-radius:20px;padding:11px 22px;font-weight:700;font-size:14px;cursor:pointer;margin-top:4px">Continue</div>
    </div>`;
  } else if (!activeOrder) {
    inner = `
    ${pendingJobsHtml}
    <div style="border:1.5px dashed rgba(20,20,20,0.25);border-radius:16px;padding:28px 20px;text-align:center;display:flex;flex-direction:column;gap:6px">
      <div style="font-size:14px;font-weight:700">No active delivery</div>
      <div style="font-size:12.5px;opacity:0.6">${pendingOrders.length > 0 ? 'Accept a job above to get started.' : 'New orders will appear here as soon as a shopper places one.'}</div>
    </div>`;
  } else {
    const itemCount = activeOrder.items ? activeOrder.items.length : 1;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeOrder.address)}`;
    const customerTel = (state.userProfile.phone || '').replace(/[^0-9+]/g, '');
    inner = `
    ${pendingJobsHtml}
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:6px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="background:oklch(94% 0.05 258);color:oklch(42% 0.17 258);font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px">In progress</span>
        <span style="font-size:11px;opacity:0.5">Order ${activeOrder.id}</span>
      </div>
      <div style="font-size:16px;font-weight:700;margin-top:4px">${escapeHtml(activeOrder.merchant)} → ${escapeHtml(activeOrder.address)}</div>
      <div style="font-size:13px;opacity:0.6">Deliver to ${escapeHtml(state.userProfile.name)} · ${itemCount} item${itemCount > 1 ? 's' : ''} · £${activeOrder.total ? activeOrder.total.toFixed(2) : '0.00'}</div>
    </div>
    <div style="display:flex;gap:10px">
      <a href="${mapsUrl}" target="_blank" rel="noopener" class="press" style="flex:1;background:#141414;color:#fff;border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none;display:block;box-sizing:border-box">Navigate</a>
      <a href="tel:${customerTel}" class="press" style="flex:1;background:#fff;border:1.5px solid #141414;color:#141414;border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none;display:block;box-sizing:border-box">Call customer</a>
    </div>
    <div style="display:flex;gap:10px">
      ${activeOrder.pickedUp
        ? `<div style="flex:1;border:1.5px solid rgba(20,20,20,0.15);color:rgba(20,20,20,0.4);border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px">✓ Picked up</div>`
        : `<div class="press" data-action="markPickedUp" style="flex:1;background:#fff;border:1.5px solid #141414;border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px;cursor:pointer">Mark picked up</div>`}
      ${activeOrder.pickedUp
        ? `<div class="press" data-action="markDelivered" style="flex:1;background:#141414;color:#fff;border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px;cursor:pointer">Mark delivered</div>`
        : `<div style="flex:1;background:rgba(20,20,20,0.07);color:rgba(20,20,20,0.35);border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px">Mark delivered</div>`}
    </div>`;
  }

  const trackingCard = `
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:16px;display:flex;flex-direction:column;gap:14px">
        <span style="font-size:15.5px;font-weight:700">🚴 Deliveries</span>
        ${inner}
      </div>
    </div>`;

  const messagesCard = `
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:16px;display:flex;flex-direction:column;gap:12px">
        ${renderInboxHeader(state.courierInbox, 'markAllCourierRead', '💬 Messages & Updates', '15.5px')}
        <div id="courier-inbox-messages" style="max-height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding-right:2px">
          ${renderInboxList(state.courierInbox, 'toggleCourierRead')}
        </div>
      </div>
    </div>`;

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:25px;font-weight:700">Activity</div>
    ${trackingCard}
    ${messagesCard}
  </div>`;
}

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0=Sun..6=Sat
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + diffToMonday);
  return d;
}

// A courier is paid the real delivery fee the customer was charged, plus whatever
// tip the customer actually added — no invented or padded numbers.
function courierJobPay(order) {
  return (order.deliveryFee || 0) + (order.tip || 0);
}

function getCourierEarningsData() {
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const weekStart = getWeekStart(now);

  const deliveredOrders = (state.orders || []).filter(o => o.status === 'Delivered' && typeof o.deliveredAt === 'number');

  const todayOrders = deliveredOrders.filter(o => o.deliveredAt >= todayStart.getTime());
  const weekOrders = deliveredOrders.filter(o => o.deliveredAt >= weekStart.getTime());

  const todayTotal = todayOrders.reduce((sum, o) => sum + courierJobPay(o), 0);
  const todayJobs = todayOrders.length;
  const todayTips = todayOrders.reduce((sum, o) => sum + (o.tip || 0), 0);
  const todayBasePay = todayTotal - todayTips;

  const weekTotal = weekOrders.reduce((sum, o) => sum + courierJobPay(o), 0);
  const weekTips = weekOrders.reduce((sum, o) => sum + (o.tip || 0), 0);
  const weekJobs = weekOrders.length;

  // Per-day totals, Mon..Sun, for the week bar chart
  const dayTotals = [0, 0, 0, 0, 0, 0, 0];
  weekOrders.forEach(o => {
    const d = new Date(o.deliveredAt);
    const dayIdx = (d.getDay() + 6) % 7; // Mon=0..Sun=6
    dayTotals[dayIdx] += courierJobPay(o);
  });
  const todayDayIdx = (now.getDay() + 6) % 7;

  const todayJobList = todayOrders
    .slice()
    .sort((a, b) => b.deliveredAt - a.deliveredAt)
    .map(o => ({
      id: o.id,
      merchant: o.merchant || 'Morrisons Daily',
      customer: state.userProfile ? state.userProfile.name : 'Customer',
      address: o.address || `${state.userProfile.address}, ${state.userProfile.postcode}`,
      status: o.status,
      basePay: o.deliveryFee || 0,
      tip: o.tip || 0,
      totalPay: courierJobPay(o),
      itemCount: o.items ? o.items.length : 1,
      timestamp: new Date(o.deliveredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

  const pendingPayout = deliveredOrders
    .filter(o => o.deliveredAt > (state.lastCashOutAt || 0))
    .reduce((sum, o) => sum + courierJobPay(o), 0);

  const onlineSeconds = (state.courierOnlineDayKey === now.toDateString() ? state.courierOnlineSecondsToday : 0)
    + (state.courierOnline && state.courierOnlineSince ? Math.round((Date.now() - state.courierOnlineSince) / 1000) : 0);
  const onlineHours = Math.floor(onlineSeconds / 3600);
  const onlineMinutes = Math.floor((onlineSeconds % 3600) / 60);
  const onlineLabel = `${onlineHours}h ${onlineMinutes}m`;

  return {
    todayTotal, todayJobs, todayTips, todayBasePay, todayJobList,
    weekTotal, weekTips, weekJobs, dayTotals, todayDayIdx,
    pendingPayout, onlineLabel,
  };
}

function renderCourierEarnings() {
  const data = getCourierEarningsData();
  const currentTab = state.earningsTab || 'today';

  const tabSelectorHtml = `
    <div style="display:flex;background:#f1f5f9;border-radius:14px;padding:4px;gap:4px">
      <button type="button" data-action="setEarningsTab" data-arg="today" style="flex:1;padding:9px;border:none;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;background:${currentTab === 'today' ? '#fff' : 'transparent'};color:${currentTab === 'today' ? '#141414' : '#64748b'};box-shadow:${currentTab === 'today' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}">
        Today (£${data.todayTotal.toFixed(2)})
      </button>
      <button type="button" data-action="setEarningsTab" data-arg="week" style="flex:1;padding:9px;border:none;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;background:${currentTab === 'week' ? '#fff' : 'transparent'};color:${currentTab === 'week' ? '#141414' : '#64748b'};box-shadow:${currentTab === 'week' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}">
        This Week (£${data.weekTotal.toFixed(2)})
      </button>
      <button type="button" data-action="setEarningsTab" data-arg="history" style="flex:1;padding:9px;border:none;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;background:${currentTab === 'history' ? '#fff' : 'transparent'};color:${currentTab === 'history' ? '#141414' : '#64748b'};box-shadow:${currentTab === 'history' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}">
        Payouts (${(state.payoutHistory || []).length})
      </button>
    </div>
  `;

  let tabBodyContent = '';

  if (currentTab === 'today') {
    const goalPercent = Math.min(100, Math.round((data.todayTotal / 120) * 100));
    const jobsListHtml = data.todayJobList.length ? data.todayJobList.map(job => `
      <div style="background:#fff;border:1.5px solid rgba(20,20,20,0.1);border-radius:14px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:13.5px;font-weight:700">${escapeHtml(job.merchant)}</span>
            <span style="font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:10px;background:#dcfce7;color:#15803d">${job.status}</span>
          </div>
          <div style="font-size:11.5px;opacity:0.6;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(job.customer)} · ${escapeHtml(job.address)}</div>
          <div style="font-size:10.5px;opacity:0.45;margin-top:2px">${job.itemCount} item${job.itemCount > 1 ? 's' : ''} · Base £${job.basePay.toFixed(2)} + Tip £${job.tip.toFixed(2)}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:16px;font-weight:800;color:#10b981">+£${job.totalPay.toFixed(2)}</div>
          <div style="font-size:10.5px;opacity:0.5">${job.timestamp}</div>
        </div>
      </div>
    `).join('') : `<div style="text-align:center;font-size:13px;opacity:0.5;padding:16px;border:1px dashed #cbd5e1;border-radius:12px">No deliveries completed today yet.</div>`;

    tabBodyContent = `
      <!-- Today's Main Balance Card -->
      <div style="background:linear-gradient(135deg, #141414 0%, #262626 100%);color:#fff;border-radius:20px;padding:20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:12.5px;color:#a1a1aa;font-weight:600">TODAY'S EARNINGS</span>
          <span style="font-size:11.5px;background:rgba(255,203,225,0.2);color:#ffcbe1;padding:3px 10px;border-radius:12px;font-weight:700">Bolton Hub</span>
        </div>
        
        <div style="font-size:36px;font-weight:900;letter-spacing:-0.5px">£${data.todayTotal.toFixed(2)}</div>
        <div style="font-size:12.5px;color:#d4d4d8;display:flex;align-items:center;gap:6px">
          <span>⚡ ${data.todayJobs} deliveries completed</span>
          <span>•</span>
          <span>⏱️ ${data.onlineLabel} online</span>
        </div>

        <!-- Daily Goal Bar -->
        <div style="margin-top:4px">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:#a1a1aa;margin-bottom:6px">
            <span>Daily Goal Progress</span>
            <span style="color:#ffcbe1;font-weight:700">${goalPercent}% (£120.00 Target)</span>
          </div>
          <div style="height:8px;background:rgba(255,255,255,0.15);border-radius:6px;overflow:hidden">
            <div style="height:100%;background:#10b981;width:${goalPercent}%;transition:width 0.3s ease"></div>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="border:1.5px solid rgba(20,20,20,0.1);border-radius:16px;padding:14px;background:#fff">
          <div style="font-size:11.5px;opacity:0.55;font-weight:600">BASE DELIVERY PAY</div>
          <div style="font-size:20px;font-weight:800;margin-top:4px">£${data.todayBasePay.toFixed(2)}</div>
          <div style="font-size:11px;color:#10b981;margin-top:2px;font-weight:700">100% Guaranteed</div>
        </div>
        <div style="border:1.5px solid rgba(20,20,20,0.1);border-radius:16px;padding:14px;background:#fff">
          <div style="font-size:11.5px;opacity:0.55;font-weight:600">CUSTOMER TIPS</div>
          <div style="font-size:20px;font-weight:800;margin-top:4px">£${data.todayTips.toFixed(2)}</div>
          <div style="font-size:11px;color:#6366f1;margin-top:2px;font-weight:700">Keep 100% of tips</div>
        </div>
      </div>

      <!-- Today's Job History Header -->
      <div style="margin-top:4px">
        <div style="font-size:15px;font-weight:800;margin-bottom:8px">Today's Completed Orders</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${jobsListHtml}
        </div>
      </div>
    `;
  } else if (currentTab === 'week') {
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const maxDay = Math.max(1, ...data.dayTotals);
    const avgPerJob = data.weekJobs > 0 ? data.weekTotal / data.weekJobs : 0;

    const barsHtml = data.dayTotals.map((val, i) => {
      const isToday = i === data.todayDayIdx;
      const height = Math.max(val > 0 ? 6 : 2, Math.round((val / maxDay) * 70));
      return `
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
          <span style="font-size:9.5px;${isToday ? 'font-weight:700;color:#10b981' : 'opacity:0.5'}">£${val.toFixed(0)}</span>
          <div style="width:100%;border-radius:4px 4px 0 0;background:${isToday ? '#10b981' : (val > 0 ? '#141414' : '#e2e8f0')};height:${height}px"></div>
        </div>`;
    }).join('');

    const dayLabelsHtml = dayLabels.map((label, i) => `<span style="${i === data.todayDayIdx ? 'color:#10b981;font-weight:700' : ''}">${label}</span>`).join('');

    tabBodyContent = `
      <!-- Weekly Summary Card -->
      <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:20px;padding:18px;background:#fff;display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <div>
            <div style="font-size:12px;opacity:0.55;font-weight:600">THIS WEEK TOTAL</div>
            <div style="font-size:32px;font-weight:900;margin-top:2px">£${data.weekTotal.toFixed(2)}</div>
          </div>
          <span style="background:#e0e7ff;color:#3730a3;font-size:11.5px;font-weight:800;padding:4px 10px;border-radius:12px">Avg £${avgPerJob.toFixed(2)}/job</span>
        </div>

        <!-- 7-Day Bar Chart, built from real delivered orders -->
        <div>
          <div style="display:flex;align-items:flex-end;gap:10px;height:90px;margin-top:10px;padding-bottom:6px;border-bottom:1px solid #e2e8f0">
            ${barsHtml}
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;font-weight:700;opacity:0.6;margin-top:6px;padding:0 4px">
            ${dayLabelsHtml}
          </div>
        </div>
      </div>

      <!-- Weekly Performance Breakdown -->
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="font-size:15px;font-weight:800">Weekly Stats Summary</div>
        <div style="background:#fff;border:1.5px solid rgba(20,20,20,0.1);border-radius:16px;padding:14px;display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-size:13.5px;font-weight:700">Jobs Completed</div><div style="font-size:11.5px;opacity:0.5">Since Monday</div></div>
          <div style="font-size:16px;font-weight:800">${data.weekJobs}</div>
        </div>
        <div style="background:#fff;border:1.5px solid rgba(20,20,20,0.1);border-radius:16px;padding:14px;display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-size:13.5px;font-weight:700">Customer Tips</div><div style="font-size:11.5px;opacity:0.5">Keep 100% of tips</div></div>
          <div style="font-size:16px;font-weight:800;color:#6366f1">£${data.weekTips.toFixed(2)}</div>
        </div>
        <div style="background:#fff;border:1.5px solid rgba(20,20,20,0.1);border-radius:16px;padding:14px;display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-size:13.5px;font-weight:700">Average Per Job</div><div style="font-size:11.5px;opacity:0.5">Base pay + tip</div></div>
          <div style="font-size:16px;font-weight:800;color:#10b981">£${avgPerJob.toFixed(2)}</div>
        </div>
      </div>
    `;
  } else {
    // Payout History Tab
    const historyItemsHtml = (state.payoutHistory || []).map(p => `
      <div style="background:#fff;border:1.5px solid rgba(20,20,20,0.1);border-radius:16px;padding:14px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:14px;font-weight:700">${p.date}</div>
          <div style="font-size:11.5px;opacity:0.5;margin-top:2px">Barclays Bank ****4892 · ${p.ref}</div>
          <div style="font-size:11px;color:#10b981;font-weight:700;margin-top:2px">${p.status}</div>
        </div>
        <div style="font-size:18px;font-weight:800">${p.amount}</div>
      </div>
    `).join('');

    tabBodyContent = `
      <div style="font-size:15px;font-weight:800">Bank Transfer & Payout History</div>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${historyItemsHtml || `<div style="text-align:center;padding:24px 0;opacity:0.5;font-size:13px">No payouts yet — cash out your balance to see history here.</div>`}
      </div>
    `;
  }

  const cashOutCard = `
    <div style="border:1.5px solid #10b981;border-radius:20px;padding:18px;background:#f0fdf4;box-shadow:0 4px 16px rgba(16,185,129,0.12)">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:12.5px;color:#15803d;font-weight:700">AVAILABLE BALANCE</div>
          <div style="font-size:24px;font-weight:900;color:#141414;margin-top:2px">£${data.pendingPayout.toFixed(2)}</div>
        </div>
        <span style="font-size:11.5px;background:#dcfce7;color:#15803d;padding:4px 10px;border-radius:12px;font-weight:700">Instant Transfer</span>
      </div>

      ${data.pendingPayout > 0 ? `
        <button type="button" data-action="cashOut" style="width:100%;margin-top:14px;background:#141414;color:#fff;border:none;border-radius:16px;padding:14px;text-align:center;font-weight:800;font-size:14.5px;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,0.2)">
          ⚡ Cash Out Now (£${data.pendingPayout.toFixed(2)})
        </button>
      ` : `
        <div style="margin-top:14px;background:#e2e8f0;color:#64748b;border-radius:16px;padding:14px;text-align:center;font-weight:700;font-size:13.5px">
          No earnings to cash out yet — complete a delivery first
        </div>
      `}
      <div style="text-align:center;font-size:11px;opacity:0.5;margin-top:8px">Transfers instantly to Barclays Bank plc (****4892) · £0.50 fee</div>
    </div>
  `;

  return `
    <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:24px;font-weight:800">Courier Earnings</div>
          <div style="font-size:12.5px;opacity:0.6">Sam Whitfield (E-bike Courier) · Bolton Hub</div>
        </div>
        <span style="background:#dcfce7;color:#15803d;font-size:12px;font-weight:800;padding:5px 12px;border-radius:14px">🟢 Active</span>
      </div>

      ${tabSelectorHtml}

      ${cashOutCard}

      ${tabBodyContent}
    </div>
  `;
}

function renderInboxList(list, toggleAction) {
  if (!list.length) {
    return `
    <div style="padding:48px 0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;opacity:0.5">
      <div style="font-size:32px">📭</div>
      <div style="font-size:13.5px;font-weight:600">No notifications yet</div>
      <div style="font-size:12px;max-width:220px;line-height:1.4">Updates about your orders and account will show up here.</div>
    </div>`;
  }
  return list.map((msg, i) => {
    const dotOpacity = msg.read ? 0 : 1;
    const textWeight = msg.read ? 400 : 700;
    const wrapOpacity = msg.read ? 0.55 : 1;
    return `
    <div class="press" data-action="${toggleAction}" data-arg="${i}" style="opacity:${wrapOpacity};border:1.5px solid rgba(20,20,20,0.12);border-radius:14px;padding:12px 14px;cursor:pointer;display:flex;flex-direction:column;gap:5px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:oklch(56% 0.17 258);opacity:${dotOpacity}"></span><span style="font-size:11px;border:1.5px solid rgba(20,20,20,0.2);border-radius:20px;padding:3px 8px">${msg.tag}</span></div>
        <span style="font-size:11px;opacity:0.45">${formatRelativeTime(msg.createdAt)}</span>
      </div>
      <div style="font-size:13.5px;font-weight:${textWeight}">${msg.text}</div>
    </div>`;
  }).join('');
}

function renderInboxHeader(list, markAllAction, title, size) {
  const unread = list.filter(m => !m.read).length;
  const fontSize = size || '25px';
  return `
  <div style="display:flex;align-items:center;justify-content:space-between">
    <div style="font-size:${fontSize};font-weight:700">${title || 'Inbox'}${unread ? ` <span style="font-size:13px;font-weight:700;color:#fff;background:oklch(56% 0.17 258);border-radius:20px;padding:2px 9px;vertical-align:middle">${unread}</span>` : ''}</div>
    ${unread ? `<div class="press" data-action="${markAllAction}" style="font-size:12px;font-weight:700;color:oklch(56% 0.17 258);cursor:pointer">Mark all read</div>` : ''}
  </div>`;
}


let mediaStreamInstance = null;
let barcodeDetectorInstance = null;
let zxingReaderInstance = null;
let scannerStartedForIndex = null;

function scannerStatusMessage(status) {
  switch (status) {
    case 'starting': return 'Starting camera…';
    case 'active': return 'Scanning — point the camera at a barcode';
    case 'permission-denied': return 'Camera permission denied — allow access in your browser, or type the code below';
    case 'no-camera': return "Couldn't access a camera — type the code below instead";
    case 'no-support': return "Barcode scanning isn't supported in this browser — type the code below instead";
    default: return '';
  }
}

function compareScannedBarcode(itemIndex, scannedVal) {
  const item = state.packItems ? state.packItems[itemIndex] : null;
  if (!item || !scannedVal) return false;
  const scanned = String(scannedVal).trim();
  const expected = String(item.barcode).trim();
  return scanned === expected || scanned.includes(expected) || expected.includes(scanned);
}

let lastHandledScan = { itemIndex: null, value: null, time: 0 };

function handleDecodedBarcode(itemIndex, scannedVal) {
  const now = Date.now();
  if (lastHandledScan.itemIndex === itemIndex && lastHandledScan.value === scannedVal && now - lastHandledScan.time < 1800) {
    return;
  }
  lastHandledScan = { itemIndex, value: scannedVal, time: now };
  const isMatch = compareScannedBarcode(itemIndex, scannedVal);
  actions.processBarcodeScanned(itemIndex, isMatch, scannedVal);
}

// Updates the scanner status text in place, without a full render() —
// a full render() replaces the <video> element and orphans the live camera stream,
// which is what caused the black/white flashing.
function setScannerStatus(status) {
  state.scannerStatus = status;
  const el = document.getElementById('scanner-status-text');
  if (el) el.textContent = scannerStatusMessage(status);
}

// Same idea: update the match/mismatch banner and viewfinder border in place,
// so the live camera preview is never torn down mid-scan.
function updateScanFeedbackUI(feedback) {
  state.scanFeedback = feedback;
  const banner = document.getElementById('scan-feedback-banner');
  const viewfinder = document.getElementById('scanner-viewfinder');
  if (banner) {
    if (feedback) {
      banner.style.display = 'flex';
      banner.style.background = feedback.type === 'match' ? '#dcfce7' : '#fee2e2';
      banner.style.color = feedback.type === 'match' ? '#15803d' : '#b91c1c';
      banner.style.border = `1.5px solid ${feedback.type === 'match' ? '#86efac' : '#fca5a5'}`;
      banner.textContent = feedback.message;
    } else {
      banner.style.display = 'none';
      banner.textContent = '';
    }
  }
  if (viewfinder) {
    viewfinder.style.borderColor = feedback ? (feedback.type === 'match' ? '#10b981' : '#ef4444') : '#ffcbe1';
  }
}

async function startCameraScanner(itemIndex) {
  const video = document.getElementById('barcode-scanner-video');
  if (!video) return;

  stopCameraScanner();
  setScannerStatus('starting');

  let fallbackStatus = 'no-support';

  // 1. ZXing JS Barcode Reader Engine — real decode of whatever the camera sees
  if (typeof ZXing !== 'undefined') {
    try {
      zxingReaderInstance = new ZXing.BrowserMultiFormatReader();
      await zxingReaderInstance.decodeFromVideoDevice(null, video, (result) => {
        if (result && state.scanningBarcodeIndex === itemIndex) {
          handleDecodedBarcode(itemIndex, result.getText());
        }
      });
      setScannerStatus('active');
      return;
    } catch (err) {
      zxingReaderInstance = null;
      fallbackStatus = err && err.name === 'NotAllowedError' ? 'permission-denied' : 'no-camera';
    }
  }

  // 2. Native Browser BarcodeDetector fallback (Chrome/Edge on Android, some desktop builds)
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && 'BarcodeDetector' in window) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 640 }, height: { ideal: 480 } }
      });
      mediaStreamInstance = stream;
      video.srcObject = stream;
      await video.play();
      barcodeDetectorInstance = new BarcodeDetector({
        formats: ['ean_13', 'ean_8', 'code_128', 'qr_code', 'upc_a']
      });
      setScannerStatus('active');
      detectBarcodeLoop(video, itemIndex);
      return;
    } catch (err) {
      fallbackStatus = err && err.name === 'NotAllowedError' ? 'permission-denied' : 'no-camera';
    }
  }

  // 3. Nothing decoded a real barcode — surface the most specific reason we found
  state.scannerStatus = fallbackStatus;
  render();
}

function stopCameraScanner() {
  if (zxingReaderInstance) {
    try { zxingReaderInstance.reset(); } catch (e) { /* already stopped */ }
    zxingReaderInstance = null;
  }
  if (mediaStreamInstance) {
    mediaStreamInstance.getTracks().forEach((track) => track.stop());
    mediaStreamInstance = null;
  }
  barcodeDetectorInstance = null;
  state.scannerStatus = null;
}

async function detectBarcodeLoop(videoElement, itemIndex) {
  if (!mediaStreamInstance || state.scanningBarcodeIndex !== itemIndex) return;

  if (barcodeDetectorInstance) {
    try {
      const barcodes = await barcodeDetectorInstance.detect(videoElement);
      if (barcodes && barcodes.length > 0) {
        handleDecodedBarcode(itemIndex, barcodes[0].rawValue);
      }
    } catch (e) { /* keep trying next frame */ }
  }

  requestAnimationFrame(() => detectBarcodeLoop(videoElement, itemIndex));
}

function playTone(frequency, duration, type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) { /* audio not available */ }
}

function playScanBeepSound() {
  playTone(1800, 0.15, 'sine');
}

function playMatchSound() {
  playTone(1200, 0.12, 'sine');
  setTimeout(() => playTone(1800, 0.15, 'sine'), 110);
}

function playMismatchSound() {
  playTone(220, 0.35, 'square');
}

function renderCourierPack() {
  const activeOrder = state.orders.find(o => o.status !== 'Cancelled' && o.status !== 'Delivered') || {
    id: '#4824',
    merchant: 'Morrisons Daily',
    address: `${state.userProfile.address}, ${state.userProfile.postcode}`,
    items: [
      { name: 'Warburtons Toastie Thick White Bread', qty: 1 },
      { name: 'Morrisons Fresh Semi-Skimmed Milk', qty: 1 },
      { name: 'Morrisons Free Range Medium Eggs', qty: 1 },
      { name: 'Cadbury Dairy Milk Chocolate Bar', qty: 1 }
    ]
  };

  if (!state.packItems || state.packItems.length === 0 || activeOrder.id !== state.lastPackedOrderId) {
    state.packItems = activeOrder.items.map((it, idx) => {
      const prod = PRODUCTS.find(p => p.name.toLowerCase() === it.name.toLowerCase() || it.name.toLowerCase().includes(p.name.toLowerCase()));
      return {
        name: it.name,
        qty: it.qty || 1,
        image: prod ? prod.image : 'assets/products/product_1.png',
        barcode: prod ? `500011900${prod.id < 10 ? '0' + prod.id : prod.id}` : `5000119${1000 + idx * 42}`,
        checked: false
      };
    });
    state.lastPackedOrderId = activeOrder.id;
  }

  const packedCount = state.packItems.filter(i => i.checked).length;
  const totalPack = state.packItems.length;
  const progressPercent = totalPack > 0 ? Math.round((packedCount / totalPack) * 100) : 0;
  const allPacked = packedCount === totalPack && totalPack > 0;

  const currentScanItem = (typeof state.scanningBarcodeIndex === 'number' && state.scanningBarcodeIndex !== null) ? state.packItems[state.scanningBarcodeIndex] : null;
  const nextUnscannedIndex = state.packItems.findIndex((it) => !it.checked);

  const showManualFallback = state.scannerStatus === 'permission-denied' || state.scannerStatus === 'no-camera' || state.scannerStatus === 'no-support';

  const scannerBox = currentScanItem ? `
    <div style="background:#141414;color:#fff;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px">
      <div style="display:flex;justify-content:space-between;align-items:center;width:100%">
        <div style="font-size:14px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(currentScanItem.name)}</div>
        <button type="button" data-action="closeScanner" style="background:none;border:none;color:#fff;font-size:22px;cursor:pointer;flex:none;line-height:1">✕</button>
      </div>

      <div id="scan-feedback-banner" style="width:100%;padding:12px;border-radius:14px;font-size:13px;font-weight:800;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);${state.scanFeedback ? '' : 'display:none;'}background:${state.scanFeedback && state.scanFeedback.type === 'match' ? '#dcfce7' : '#fee2e2'};color:${state.scanFeedback && state.scanFeedback.type === 'match' ? '#15803d' : '#b91c1c'};border:1.5px solid ${state.scanFeedback && state.scanFeedback.type === 'match' ? '#86efac' : '#fca5a5'}">${state.scanFeedback ? escapeHtml(state.scanFeedback.message) : ''}</div>

      <!-- Live WebRTC Camera Stream Viewfinder -->
      <div id="scanner-viewfinder" style="width:100%;max-width:280px;height:190px;border:2px solid #ffcbe1;border-radius:16px;position:relative;overflow:hidden;background:#000;box-shadow:0 8px 20px rgba(0,0,0,0.4)">
        <video id="barcode-scanner-video" autoplay playsinline muted style="width:100%;height:100%;object-fit:cover"></video>
      </div>

      <div id="scanner-status-text" style="font-size:11.5px;opacity:0.7;min-height:14px">${scannerStatusMessage(state.scannerStatus)}</div>

      <div id="manual-barcode-fallback" style="display:${showManualFallback ? 'flex' : 'none'};gap:8px;width:100%">
        <input id="manual-barcode-input" data-bind="manualBarcodeInput" value="${escapeHtml(state.manualBarcodeInput || '')}" placeholder="Or type the barcode number" style="flex:1;min-width:0;border:1.5px solid #3f3f46;background:#1f1f23;color:#fff;border-radius:12px;padding:10px 12px;font-size:12.5px;font-family:monospace;outline:none" />
        <button type="button" data-action="submitManualBarcode" data-arg="${state.scanningBarcodeIndex}" style="background:#ffcbe1;color:#141414;border:none;padding:0 16px;border-radius:12px;font-size:12.5px;font-weight:800;cursor:pointer">Check</button>
      </div>
    </div>
  ` : (allPacked ? '' : `
    <div class="press" data-action="openScanner" data-arg="${nextUnscannedIndex}" style="border:1.5px dashed rgba(20,20,20,0.3);border-radius:20px;padding:26px 20px;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;cursor:pointer">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#141414" stroke-width="1.6"><rect x="2" y="6" width="2" height="12"/><rect x="6" y="6" width="1" height="12"/><rect x="9" y="6" width="2" height="12"/><rect x="13" y="6" width="1" height="12"/><rect x="16" y="6" width="2" height="12"/><rect x="20" y="6" width="2" height="12"/></svg>
      <div style="font-size:13.5px;font-weight:700">Tap to scan barcode or QR</div>
      <div style="font-size:12px;opacity:0.55">Next: ${escapeHtml(state.packItems[nextUnscannedIndex].name)}</div>
    </div>
  `);

  const itemsHtml = state.packItems.map((item) => {
    const isChecked = item.checked;
    return `
      <div style="background:${isChecked ? '#f0fdf4' : '#fff'};border:1.5px solid ${isChecked ? '#86efac' : 'rgba(20,20,20,0.12)'};border-radius:16px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:12px">
        <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0">
          <img src="${item.image}" style="width:42px;height:42px;object-fit:contain;border-radius:8px;background:#f8fafc;padding:2px;border:1px solid #e2e8f0" alt="${escapeHtml(item.name)}" />
          <div style="flex:1;min-width:0">
            <div style="font-size:13.5px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${isChecked ? 'text-decoration:line-through;opacity:0.6' : ''}">${escapeHtml(item.name)}</div>
            <div style="font-size:11px;opacity:0.55;margin-top:2px">Qty: ${item.qty}</div>
          </div>
        </div>
        <span title="${isChecked ? 'Scanned' : 'Not scanned yet'}" style="width:16px;height:16px;min-width:16px;border-radius:50%;background:${isChecked ? '#10b981' : '#ef4444'};box-shadow:0 0 0 3px ${isChecked ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)'}"></span>
      </div>
    `;
  }).join('');

  return `
    <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:22px;font-weight:800">Pick &amp; Pack Scanner</div>
          <div style="font-size:12.5px;opacity:0.65">Order ${activeOrder.id} · Morrisons Daily</div>
        </div>
        <span style="background:${allPacked ? '#dcfce7' : '#ffcbe1'};color:${allPacked ? '#15803d' : '#141414'};font-size:12px;font-weight:800;padding:5px 12px;border-radius:14px">${progressPercent}% Done</span>
      </div>

      <!-- Live Progress Bar -->
      <div style="height:10px;background:#e2e8f0;border-radius:10px;overflow:hidden">
        <div style="height:100%;background:#10b981;width:${progressPercent}%;transition:width 0.3s ease"></div>
      </div>
      <div style="font-size:12.5px;opacity:0.6;text-align:right">${packedCount} of ${totalPack} items verified</div>

      ${scannerBox}

      <div style="display:flex;flex-direction:column;gap:10px">
        ${itemsHtml}
      </div>

      ${allPacked ? `
        <button type="button" data-action="completePackingJob" style="background:#10b981;color:#fff;border:none;padding:16px;border-radius:18px;font-size:15px;font-weight:800;cursor:pointer;margin-top:8px;box-shadow:0 8px 24px rgba(16,185,129,0.3)">
          📦 All Items Verified — Complete Packing & Start Delivery
        </button>
      ` : ''}
    </div>
  `;
}

function renderCourierAccount() {
  const onlineBg = state.courierOnline ? 'oklch(56% 0.17 258)' : '#e2e2e2';
  const onlineJustify = state.courierOnline ? 'flex-end' : 'flex-start';
  const auth = state.authUser;
  const isSignedIn = !!auth;
  const displayName = auth ? auth.name : 'Guest Courier';
  const providerLabel = !auth ? 'Not signed in' : auth.provider === 'google' ? 'Google Account' : auth.provider === 'apple' ? 'Apple ID' : 'Email Account';

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:25px;font-weight:800">Courier Account</div>

    <!-- Courier Profile Header -->
    <div style="display:flex;align-items:center;gap:14px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:20px;padding:16px">
      <div style="width:52px;height:52px;border-radius:50%;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px">
        ${(displayName || 'GC').substring(0,2).toUpperCase()}
      </div>
      <div>
        <div style="font-size:16.5px;font-weight:800">${escapeHtml(displayName)}</div>
        <div style="font-size:12px;opacity:0.6">${auth ? escapeHtml(auth.email) : 'Sign in to link a real account'}</div>
      </div>
    </div>

    ${!isSignedIn ? `
      <div style="background:#fffbeb;border:1.5px solid #fde68a;color:#92400e;border-radius:16px;padding:12px 14px;font-size:12.5px;line-height:1.4">
        You're browsing in guest mode. <span class="press" data-action="logout" style="text-decoration:underline;font-weight:700;cursor:pointer">Sign in</span> with Google or your email to save your account.
      </div>
    ` : ''}

    <!-- Live GPS Duty Switch -->
    <div data-action="toggleOnline" style="border:1.5px solid ${state.courierOnline ? '#10b981' : 'rgba(20,20,20,0.12)'};background:${state.courierOnline ? '#f0fdf4' : '#fff'};border-radius:18px;padding:16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.03)">
      <div>
        <div style="font-size:14.5px;font-weight:800">${state.courierOnline ? "🟢 Online - Live GPS Tracking ON" : "⚪ Offline - GPS Tracking OFF"}</div>
        <div style="font-size:11.5px;opacity:0.65;margin-top:2px">${state.courierOnline ? (state.courierLiveGps ? `Device GPS: ${state.courierLiveGps.lat.toFixed(4)}, ${state.courierLiveGps.lng.toFixed(4)}` : 'Streaming location to active customer maps...') : 'Turn ON to stream your real location to customer map'}</div>
      </div>
      <span style="width:36px;height:22px;border-radius:12px;background:${onlineBg};display:flex;align-items:center;padding:2px;justify-content:${onlineJustify};box-sizing:border-box"><span style="width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.25)"></span></span>
    </div>

    <!-- Account Identity -->
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:20px;padding:16px;background:#fff;display:flex;flex-direction:column;gap:10px">
      <div style="font-size:11.5px;font-weight:800;opacity:0.55;text-transform:uppercase">ACCOUNT</div>
      <div style="display:flex;justify-content:space-between;font-size:13.5px;font-weight:700"><span>Sign-in Method</span><span style="color:${isSignedIn ? '#10b981' : '#94a3b8'}">${providerLabel}${isSignedIn ? ' ✓' : ''}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13.5px;font-weight:700"><span>Active Region</span><span style="font-weight:700">Bolton Hub (BL1 3PJ)</span></div>
    </div>

    <button type="button" data-action="logout" style="width:100%;background:#fee2e2;color:#ef4444;border:none;padding:14px;border-radius:16px;font-size:14px;font-weight:800;cursor:pointer;margin-top:8px">
      🚪 ${isSignedIn ? 'Log Out of Courier Account' : 'Back to Sign In'}
    </button>
  </div>`;
}

function specialRequestPrompt(prefillQuery) {
  return `<div class="press" data-action="goSpecialRequest" data-arg="${escapeHtml(prefillQuery || '')}" style="border:1.5px dashed rgba(20,20,20,0.25);border-radius:16px;padding:16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer">
    <div>
      <div style="font-size:13.5px;font-weight:700">Can't find it?</div>
      <div style="font-size:12px;opacity:0.6">Request a special delivery from any store</div>
    </div>
    <span style="opacity:0.4;font-size:18px">›</span>
  </div>`;
}

function renderShopperSearchResults(query) {
  const q = query.trim().toLowerCase();
  const matches = PRODUCTS.filter((p) => p.name.toLowerCase().includes(q));
  const list = matches.slice(0, 25).map(productRow).join('');
  const heading = matches.length
    ? `<div style="font-size:12px;opacity:0.55">${matches.length} result${matches.length > 1 ? 's' : ''} for "${escapeHtml(query)}"</div>`
    : `<div style="font-size:13px;opacity:0.6">No results for "${escapeHtml(query)}"</div>`;
  return `
    ${heading}
    ${list ? `<div style="display:flex;flex-direction:column">${list}</div>` : ''}
    ${specialRequestPrompt(query)}
  `;
}

function renderShopperShop() {
  const searching = state.searchQuery.trim().length > 0;
  const body = searching
    ? renderShopperSearchResults(state.searchQuery)
    : `
    <div class="press shop-card" data-action="goBrowse" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;cursor:pointer">
      ${cardImageHtml('morrisons', '🛒')}
      <div style="padding:16px">
        <div style="display:flex;justify-content:space-between"><span style="font-size:15.5px;font-weight:700">Morrisons Daily</span><span style="opacity:0.4">›</span></div>
        <div style="font-size:13px;opacity:0.6">Order in 12 min · £30 min basket</div>
      </div>
    </div>
    <div class="press shop-card" data-action="goTrack" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;cursor:pointer">
      ${cardImageHtml('track', '📦')}
      <div style="padding:16px">
        <div style="display:flex;justify-content:space-between"><span style="font-size:15.5px;font-weight:700">Track my order</span><span style="opacity:0.4">›</span></div>
        <div style="font-size:13px;opacity:0.6">Boots Pharmacy — arriving 14:20</div>
      </div>
    </div>
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden">
      ${cardImageHtml('offers', '🏷️')}
      <div style="padding:16px">
        <div style="display:flex;justify-content:space-between"><span style="font-size:15.5px;font-weight:700">Weekly offers</span><span style="opacity:0.4">›</span></div>
        <div style="font-size:13px;opacity:0.6">New deals this week · 4 collections</div>
      </div>
    </div>
    <div class="press shop-card" data-action="goSpecialRequest" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;cursor:pointer">
      ${cardImageHtml('local', '📍')}
      <div style="padding:16px">
        <div style="display:flex;justify-content:space-between"><span style="font-size:15.5px;font-weight:700">Special Requests</span><span style="opacity:0.4">›</span></div>
        <div style="font-size:13px;opacity:0.6">Collection and delivery from any store</div>
      </div>
    </div>
  `;

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:15px;opacity:0.55;font-weight:600">Good afternoon</div>
    <div style="display:flex;align-items:center;gap:10px;border:1.5px solid rgba(20,20,20,0.15);border-radius:26px;padding:11px 16px">
      <span style="opacity:0.4;font-size:15px">⌕</span>
      <input id="shop-search-input" data-bind="searchQuery" value="${escapeHtml(state.searchQuery)}" placeholder="Search shops, groceries, essentials..." style="border:none;outline:none;flex:1;font-size:13.5px;font-family:inherit;background:transparent" />
      <span class="press" data-action="toggleDeliveryLater" style="font-size:11px;border:1.5px solid #141414;border-radius:20px;padding:5px 10px;cursor:pointer;white-space:nowrap">${state.deliveryLater ? 'Later ▾' : 'Now ▾'}</span>
    </div>
    <div style="display:flex;gap:6px">
      <div class="press" data-action="goBrowseCategory" data-arg="Grocery" style="flex:1;text-align:center;cursor:pointer"><div style="width:44px;height:44px;margin:0 auto;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:17px">🛒</div><div style="font-size:10px;margin-top:3px">Groceries</div></div>
      <div class="press" data-action="goBrowseCategory" data-arg="Health" style="flex:1;text-align:center;cursor:pointer"><div style="width:44px;height:44px;margin:0 auto;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:17px">💊</div><div style="font-size:10px;margin-top:3px">Health</div></div>
      <div class="press" data-action="goBrowseCategory" data-arg="Snacks" style="flex:1;text-align:center;cursor:pointer"><div style="width:44px;height:44px;margin:0 auto;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:17px">🍿</div><div style="font-size:10px;margin-top:3px">Snacks</div></div>
      <div class="press" data-action="goBrowseCategory" data-arg="Alcohol" style="flex:1;text-align:center;cursor:pointer"><div style="width:44px;height:44px;margin:0 auto;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:17px">🍷</div><div style="font-size:10px;margin-top:3px">Alcohol</div></div>
      <div class="press" data-action="goBrowseCategory" data-arg="Pets" style="flex:1;text-align:center;cursor:pointer"><div style="width:44px;height:44px;margin:0 auto;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:17px">🐾</div><div style="font-size:10px;margin-top:3px">Pet</div></div>
    </div>
    ${body}
  </div>`;
}

const CATEGORY_EMOJI = {
  'Dairy & Eggs': '🥛',
  Bakery: '🍞',
  'Confectionery & Chocolate': '🍫',
  'Snacks & Crisps': '🍟',
  'Soft Drinks & Hot Beverages': '🥤',
  'Store Cupboard & Essentials': '🥫',
  'Chilled & Meat': '🥩',
  'Ready Meals & Food to Go': '🥪',
  'Frozen & Chilled Essentials': '🧊',
  'Household & Toiletries': '🧴',
  Grocery: '🛒',
  Health: '💊',
  Snacks: '🍿',
  Alcohol: '🍷',
  Pets: '🐾',
};

function categorySlug(cat) {
  return cat.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

function productThumb(p) {
  const custom = state.productImages[p.id];
  const src = custom || p.image;
  const emoji = CATEGORY_EMOJI[p.category] || '🛒';
  const bgStyle = src ? `background-image:url('${src}');background-size:cover;background-position:center;` : '';
  return `
  <label class="product-thumb" style="${bgStyle}" title="${src ? 'Change image' : 'Add image'}">
    ${src ? '' : `<span style="font-size:18px">${emoji}</span>`}
    <span class="product-thumb-overlay">✎</span>
    <input type="file" accept="image/*" data-upload-product="${p.id}" />
  </label>`;
}

function productRow(p) {
  const qty = state.cart[p.id] || 0;
  const control = qty > 0
    ? `<div style="display:flex;align-items:center;gap:10px">
         <div class="press" data-action="removeFromCart" data-arg="${p.id}" style="width:26px;height:26px;border-radius:50%;border:1.5px solid #141414;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:700;font-size:15px">−</div>
         <span style="font-size:13.5px;font-weight:700;min-width:14px;text-align:center">${qty}</span>
         <div class="press" data-action="addToCart" data-arg="${p.id}" style="width:26px;height:26px;border-radius:50%;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:700;font-size:15px">+</div>
       </div>`
    : `<div class="press" data-action="addToCart" data-arg="${p.id}" style="border:1.5px solid #141414;border-radius:20px;padding:6px 14px;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap">Add</div>`;
  return `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(20,20,20,0.08)">
    ${productThumb(p)}
    <div style="flex:1;padding-right:10px">
      <div style="font-size:13.5px;font-weight:600">${escapeHtml(p.name)}</div>
      <div style="font-size:11.5px;opacity:0.55">${escapeHtml(p.weight_or_volume)} · £${p.estimated_price_gbp.toFixed(2)}</div>
    </div>
    ${control}
  </div>`;
}

function renderShopperBrowse() {
  const categories = [];
  const byCategory = {};
  PRODUCTS.forEach((p) => {
    if (!byCategory[p.category]) { byCategory[p.category] = []; categories.push(p.category); }
    byCategory[p.category].push(p);
  });

  const sections = categories.map((cat) => {
    const items = byCategory[cat].map(productRow).join('');
    return `<div style="display:flex;flex-direction:column">
      <div id="category-${categorySlug(cat)}" style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;opacity:0.5;margin:14px 0 2px;scroll-margin-top:14px">${cat}</div>
      ${items}
    </div>`;
  }).join('');

  const count = cartCount();
  const total = cartTotal();
  const summaryBar = count > 0
    ? `<div class="press" data-action="goBasket" style="position:sticky;bottom:14px;background:#141414;color:#fff;border-radius:16px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;margin-top:14px;box-shadow:0 10px 24px rgba(0,0,0,0.2)">
        <span style="font-size:13.5px;font-weight:700">${count} item${count > 1 ? 's' : ''} · £${total.toFixed(2)}</span>
        <span style="font-size:13.5px;font-weight:700">View basket ›</span>
      </div>`
    : '';

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column">
    <div style="display:flex;align-items:center;gap:10px;padding:4px 0 10px">
      <div class="press" data-action="goShop" style="cursor:pointer;font-size:20px;line-height:1">‹</div>
      <div style="font-size:18px;font-weight:700">Morrisons Daily</div>
    </div>
    ${sections}
    ${summaryBar}
  </div>`;
}

function renderShopperBasket() {
  const lines = cartLines();
  const count = cartCount();
  const total = cartTotal();

  const summary = state.basketCheckedOut
    ? `<div style="border:1.5px solid oklch(56% 0.17 258);background:oklch(97% 0.02 258);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:8px;text-align:center">
        <div style="font-size:15px;font-weight:700">✓ Order placed — Morrisons Daily</div>
        <div data-action="newBasket" style="font-size:12.5px;opacity:0.6;cursor:pointer">Start a new basket</div>
      </div>`
    : (lines.length > 0
      ? `<div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;justify-content:space-between"><span style="font-size:15.5px;font-weight:700">Morrisons Daily</span><span style="font-size:14px;font-weight:700">£${total.toFixed(2)}</span></div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${lines.map((l) => `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
              <div style="flex:1;min-width:0">
                <div style="font-size:12.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.product.name}</div>
                <div style="font-size:11.5px;opacity:0.55">£${l.product.estimated_price_gbp.toFixed(2)} each</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="press" data-action="removeFromCart" data-arg="${l.product.id}" style="width:24px;height:24px;border-radius:50%;border:1.5px solid #141414;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:700;font-size:14px">−</div>
                <span style="font-size:13px;font-weight:700;min-width:14px;text-align:center">${l.qty}</span>
                <div class="press" data-action="addToCart" data-arg="${l.product.id}" style="width:24px;height:24px;border-radius:50%;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-weight:700;font-size:14px">+</div>
              </div>
              <span style="font-size:12.5px;font-weight:700;min-width:44px;text-align:right">£${(l.qty * l.product.estimated_price_gbp).toFixed(2)}</span>
            </div>`).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div style="display:flex;align-items:center;gap:10px">
              <span style="font-size:12.5px;opacity:0.55">${count} item${count > 1 ? 's' : ''}</span>
              <span class="press" data-action="emptyBasket" style="font-size:12px;font-weight:700;opacity:0.5;text-decoration:underline;cursor:pointer">Empty basket</span>
            </div>
            <div class="press" data-action="checkout" style="background:#141414;color:#fff;border-radius:20px;padding:9px 18px;font-weight:700;font-size:13px;cursor:pointer">Checkout</div>
          </div>
        </div>`
      : `<div style="border:1.5px dashed rgba(20,20,20,0.2);border-radius:16px;padding:24px;display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center">
          <div style="font-size:14px;opacity:0.6">Your basket is empty</div>
          <div class="press" data-action="goShop" style="background:#141414;color:#fff;border-radius:20px;padding:10px 20px;font-weight:700;font-size:13px;cursor:pointer">Start Shopping</div>
        </div>`);

  const activeOrder = state.orders.find(o => o.status !== 'Cancelled' && o.status !== 'Delivered');

  const activeOrderCard = activeOrder ? `
    <div style="border:1.5px solid #6366f1;background:#f8fafc;border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:10px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:14px;font-weight:800">Active Delivery ${activeOrder.id}</div>
          <div style="font-size:12px;color:#6366f1;font-weight:700">${escapeHtml(activeOrder.status)}</div>
        </div>
        <button type="button" data-action="goTrack" style="background:#6366f1;color:#fff;border:none;padding:8px 14px;border-radius:12px;font-size:12px;font-weight:700;cursor:pointer">Live Map ↗</button>
      </div>
      <div class="press" data-action="goTrack" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;height:120px;position:relative;cursor:pointer">
        <div id="graftr-basket-leaflet-map" style="width:100%;height:100%"></div>
        <div style="position:absolute;bottom:6px;right:6px;z-index:2;background:rgba(20,20,20,0.85);color:#fff;padding:3px 8px;border-radius:8px;font-size:10px;font-weight:600">Tap for full map</div>
      </div>
    </div>
  ` : '';

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:22px;font-weight:700">Basket &amp; Activity</div>
    ${summary}
    ${activeOrderCard}
  </div>`;
}

function renderAddressModal() {
  if (!state.showAddressModal) return '';
  const p = state.userProfile;
  return `
    <div class="graftr-modal-overlay">
      <div class="graftr-modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e2e8f0;padding-bottom:12px">
          <div style="font-size:16px;font-weight:700">Edit Profile & Delivery Address</div>
          <button data-action="closeAddressModal" style="background:none;border:none;font-size:20px;cursor:pointer">✕</button>
        </div>

        <div class="graftr-input-group">
          <label>Full Name</label>
          <input type="text" id="prof-name" data-bind="profile.name" value="${escapeHtml(p.name)}" placeholder="Your Name" />
        </div>

        <div class="graftr-input-group">
          <label>Phone Number</label>
          <input type="tel" id="prof-phone" data-bind="profile.phone" value="${escapeHtml(p.phone)}" placeholder="+44 7700 900000" />
        </div>

        <div class="graftr-input-group">
          <label>Street Address</label>
          <input type="text" id="prof-address" data-bind="profile.address" value="${escapeHtml(p.address)}" placeholder="123 High Street" />
        </div>

        <div style="display:flex;gap:10px">
          <div class="graftr-input-group" style="flex:1">
            <label>City</label>
            <input type="text" id="prof-city" data-bind="profile.city" value="${escapeHtml(p.city)}" placeholder="London" />
          </div>
          <div class="graftr-input-group" style="flex:1">
            <label>Postcode</label>
            <input type="text" id="prof-postcode" data-bind="profile.postcode" value="${escapeHtml(p.postcode)}" placeholder="SE13 7QS" />
          </div>
        </div>

        <div class="graftr-input-group">
          <label>Delivery Instructions (Optional)</label>
          <textarea id="prof-instructions" data-bind="profile.instructions" rows="2" placeholder="Leave at door, gate code, etc.">${escapeHtml(p.instructions)}</textarea>
        </div>

        <div style="display:flex;gap:10px;margin-top:6px">
          <button type="button" data-action="closeAddressModal" style="flex:1;background:#f1f5f9;border:1px solid #cbd5e1;padding:12px;border-radius:14px;font-weight:700;font-size:13.5px;cursor:pointer">Cancel</button>
          <button type="button" data-action="saveAddressModal" style="flex:1;background:#141414;color:#fff;border:none;padding:12px;border-radius:14px;font-weight:700;font-size:13.5px;cursor:pointer">Save Details</button>
        </div>
      </div>
    </div>
  `;
}

function renderCheckoutModal() {
  if (!state.showCheckoutModal) return '';
  const lines = cartLines();
  const subtotal = cartTotal();
  const deliveryFee = 1.99;
  const grandTotal = subtotal + deliveryFee;
  const p = state.userProfile;

  const itemsListHtml = lines.map(l => `
    <div style="display:flex;justify-content:space-between;font-size:13px">
      <span>${l.qty}x ${escapeHtml(l.product.name)}</span>
      <span style="font-weight:600">£${(l.qty * l.product.estimated_price_gbp).toFixed(2)}</span>
    </div>
  `).join('');

  return `
    <div class="graftr-modal-overlay">
      <div class="graftr-modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e2e8f0;padding-bottom:12px">
          <div>
            <div style="font-size:17px;font-weight:800">Checkout & Order Review</div>
            <div style="font-size:12px;opacity:0.6">Morrisons Daily</div>
          </div>
          <button data-action="closeCheckoutModal" style="background:none;border:none;font-size:20px;cursor:pointer">✕</button>
        </div>

        <!-- Delivery Address Box -->
        <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:16px;padding:14px;display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b">DELIVER TO</div>
            <div style="font-size:14px;font-weight:700;margin-top:2px">${escapeHtml(p.name)}</div>
            <div style="font-size:12.5px;opacity:0.8">${escapeHtml(p.address)}, ${escapeHtml(p.postcode)}</div>
            ${p.instructions ? `<div style="font-size:11.5px;color:#6366f1;margin-top:2px">Note: "${escapeHtml(p.instructions)}"</div>` : ''}
          </div>
          <button type="button" data-action="openAddressModal" style="background:#fff;border:1px solid #cbd5e1;padding:6px 10px;border-radius:12px;font-size:11.5px;font-weight:700;cursor:pointer">Change</button>
        </div>

        <!-- Items Summary -->
        <div style="border:1.5px solid #e2e8f0;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b">ORDER SUMMARY (${cartCount()} items)</div>
          ${itemsListHtml}
          <div style="border-top:1px dashed #e2e8f0;padding-top:8px;margin-top:4px;display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;justify-content:space-between;font-size:12.5px;opacity:0.7"><span>Subtotal</span><span>£${subtotal.toFixed(2)}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:12.5px;opacity:0.7"><span>Delivery Fee (Fast 15-min)</span><span>£${deliveryFee.toFixed(2)}</span></div>
            <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:800;margin-top:4px;padding-top:4px;border-top:1px solid #141414"><span>Total Amount</span><span>£${grandTotal.toFixed(2)}</span></div>
          </div>
        </div>

        <button type="button" data-action="placeOrder" ${state.placingOrder ? 'disabled' : ''} style="background:${state.placingOrder ? 'rgba(20,20,20,0.4)' : '#141414'};color:#fff;border:none;padding:16px;border-radius:18px;font-weight:800;font-size:15px;cursor:${state.placingOrder ? 'default' : 'pointer'};box-shadow:0 8px 20px rgba(0,0,0,0.25);margin-top:4px">
          ${state.placingOrder ? 'Redirecting to secure checkout…' : `🔒 Pay &amp; Place Order (£${grandTotal.toFixed(2)})`}
        </button>
      </div>
    </div>
  `;
}

function renderShopperAccount() {
  const p = state.userProfile;
  const auth = state.authUser;
  const isSignedIn = !!auth;

  const providerIcon = !auth ? '👤' : auth.provider === 'google'
    ? `<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>`
    : auth.provider === 'apple'
      ? `<svg width="16" height="18" fill="currentColor" viewBox="0 0 170 170"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.9.13-9.76-1.91-14.58-6.12-3.32-2.88-7.25-7.66-11.8-14.34-6.8-10.01-12.18-21.2-16.14-33.56-3.96-12.37-5.94-24.16-5.94-35.37 0-14.47 3.57-26.24 10.72-35.32 7.15-9.08 16.03-13.68 26.65-13.81 4.96.12 10.25 1.25 15.86 3.38 5.61 2.13 9.4 3.24 11.37 3.35 2.62 0 6.64-1.24 12.06-3.71 5.42-2.47 10.24-3.62 14.46-3.46 11.75.87 21.03 5.48 27.84 13.82-10.42 6.34-15.5 15.1-15.24 26.28.26 8.78 3.59 16.17 9.99 22.18 6.4 6 14.15 9.41 23.24 10.24-2.58 7.55-5.98 15.02-10.21 22.41zM119.22 31.84c0-7.07 2.58-13.83 7.74-20.28 5.16-6.45 11.66-10.45 19.51-12 0.79 7.07-1.7 13.88-7.47 20.43-5.77 6.55-12.39 10.37-19.78 11.85z"/></svg>`
      : '✉️';

  const providerLabel = !auth ? 'Guest (not signed in)' : auth.provider === 'google' ? 'Google Account' : auth.provider === 'apple' ? 'Apple ID' : 'Verified Email';
  const displayName = auth ? auth.name : (p.name || 'Guest');

  const ordersListHtml = state.orders.length > 0 ? state.orders.map(o => {
    const isCancelled = o.status === 'Cancelled';
    const isDelivered = o.status === 'Delivered';
    const statusColor = isCancelled ? '#ef4444' : (isDelivered ? '#10b981' : '#6366f1');

    return `
    <div style="border:1.5px solid ${isCancelled ? '#fecaca' : 'rgba(20,20,20,0.12)'};background:${isCancelled ? '#fff5f5' : '#fff'};border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:14px;font-weight:700">${escapeHtml(o.merchant)} <span style="font-size:11px;background:#f1f5f9;padding:2px 6px;border-radius:6px;margin-left:4px">${o.id}</span></div>
          <div style="font-size:12px;opacity:0.6">${o.items ? o.items.length : 1} items · ${o.timestamp}</div>
          <div style="font-size:11.5px;color:${statusColor};font-weight:700;margin-top:2px">Status: ${escapeHtml(o.status)}</div>
        </div>
        <div style="font-size:14.5px;font-weight:800">£${o.total ? o.total.toFixed(2) : '0.00'}</div>
      </div>
      <div style="display:flex;gap:8px;margin-top:4px;border-top:1px dashed #e2e8f0;padding-top:8px">
        ${!isCancelled ? `<button type="button" data-action="selectOrderToTrack" data-arg="${o.id}" style="flex:1;background:#6366f1;color:#fff;border:none;padding:7px;border-radius:8px;font-size:11.5px;font-weight:700;cursor:pointer">Track Map ↗</button>` : ''}
        ${!isCancelled && !isDelivered ? `<button type="button" data-action="cancelOrder" data-arg="${o.id}" style="flex:1;background:#fee2e2;color:#ef4444;border:none;padding:7px;border-radius:8px;font-size:11.5px;font-weight:700;cursor:pointer">Cancel Order ✕</button>` : ''}
        <button type="button" data-action="deleteOrder" data-arg="${o.id}" style="background:#f1f5f9;color:#64748b;border:1px solid #cbd5e1;padding:7px 12px;border-radius:8px;font-size:11.5px;font-weight:700;cursor:pointer" title="Remove from history">Remove 🗑️</button>
      </div>
    </div>
  `;
  }).join('') : `<div style="text-align:center;font-size:13px;opacity:0.5;padding:16px;border:1px dashed #cbd5e1;border-radius:12px">No logged orders yet.</div>`;

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:25px;font-weight:800;color:#141414">Account &amp; Settings</div>
    
    <!-- User Profile Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:20px;padding:16px;box-shadow:0 2px 8px rgba(0,0,0,0.03)">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;box-shadow:0 4px 12px rgba(0,0,0,0.15)">
          ${(displayName || 'GU').substring(0,2).toUpperCase()}
        </div>
        <div>
          <div style="font-size:16.5px;font-weight:800;color:#0f172a">${escapeHtml(displayName)}</div>
          <div style="font-size:12.5px;color:#64748b;margin-top:1px">${escapeHtml((auth && auth.email) || p.email || 'No email on file')}</div>
          <div style="font-size:11.5px;color:${isSignedIn ? '#10b981' : '#94a3b8'};font-weight:700;margin-top:2px;display:flex;align-items:center;gap:5px">
            ${providerIcon} ${isSignedIn ? `Connected via ${providerLabel}` : providerLabel}
          </div>
        </div>
      </div>
      <button type="button" data-action="openAddressModal" style="background:#fff;border:1.5px solid #141414;padding:8px 12px;border-radius:14px;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.05)">Edit Profile</button>
    </div>

    ${!isSignedIn ? `
      <div style="background:#fffbeb;border:1.5px solid #fde68a;color:#92400e;border-radius:16px;padding:12px 14px;font-size:12.5px;line-height:1.4">
        You're browsing in guest mode — your account isn't saved anywhere. <span class="press" data-action="logout" style="text-decoration:underline;font-weight:700;cursor:pointer">Sign in</span> to link a real account.
      </div>
    ` : ''}

    <!-- Connected OAuth Identity Cards -->
    <div style="border:1.5px solid #e2e8f0;border-radius:20px;padding:16px;background:#fff;display:flex;flex-direction:column;gap:12px">
      <div style="font-size:11.5px;font-weight:800;opacity:0.55;text-transform:uppercase;letter-spacing:0.5px">LINKED IDENTITY &amp; AUTHENTICATION</div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#f8fafc;border-radius:14px;border:1px solid ${auth && auth.provider === 'google' ? '#bfdbfe' : '#e2e8f0'}">
        <div style="display:flex;align-items:center;gap:10px">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <div>
            <div style="font-size:13.5px;font-weight:700">Google Account</div>
            <div style="font-size:11.5px;color:#64748b">${auth && auth.provider === 'google' ? escapeHtml(auth.email) : (GOOGLE_CLIENT_ID ? 'Not linked' : 'Not connected yet')}</div>
          </div>
        </div>
        <button type="button" data-action="loginWithGoogle" style="background:${auth && auth.provider === 'google' ? '#dcfce7' : '#fff'};color:${auth && auth.provider === 'google' ? '#15803d' : '#141414'};border:1px solid ${auth && auth.provider === 'google' ? '#86efac' : '#cbd5e1'};padding:6px 10px;border-radius:10px;font-size:11.5px;font-weight:700;cursor:pointer">
          ${auth && auth.provider === 'google' ? 'Connected ✓' : 'Link Google'}
        </button>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#f8fafc;border-radius:14px;border:1px solid #e2e8f0">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:18px">✉️</span>
          <div>
            <div style="font-size:13.5px;font-weight:700">Email Account</div>
            <div style="font-size:11.5px;color:#64748b">${auth && auth.provider === 'email' ? escapeHtml(auth.email) : 'Not linked'}</div>
          </div>
        </div>
        <button type="button" data-action="loginWithEmail" style="background:${auth && auth.provider === 'email' ? '#dcfce7' : '#fff'};color:${auth && auth.provider === 'email' ? '#15803d' : '#141414'};border:1px solid ${auth && auth.provider === 'email' ? '#86efac' : '#cbd5e1'};padding:6px 10px;border-radius:10px;font-size:11.5px;font-weight:700;cursor:pointer">
          ${auth && auth.provider === 'email' ? 'Connected ✓' : 'Link Email'}
        </button>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 12px;background:#f8fafc;border-radius:14px;border:1px solid #e2e8f0;opacity:0.75">
        <div style="display:flex;align-items:center;gap:10px">
          <svg width="18" height="20" fill="currentColor" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.9.13-9.76-1.91-14.58-6.12-3.32-2.88-7.25-7.66-11.8-14.34-6.8-10.01-12.18-21.2-16.14-33.56-3.96-12.37-5.94-24.16-5.94-35.37 0-14.47 3.57-26.24 10.72-35.32 7.15-9.08 16.03-13.68 26.65-13.81 4.96.12 10.25 1.25 15.86 3.38 5.61 2.13 9.4 3.24 11.37 3.35 2.62 0 6.64-1.24 12.06-3.71 5.42-2.47 10.24-3.62 14.46-3.46 11.75.87 21.03 5.48 27.84 13.82-10.42 6.34-15.5 15.1-15.24 26.28.26 8.78 3.59 16.17 9.99 22.18 6.4 6 14.15 9.41 23.24 10.24-2.58 7.55-5.98 15.02-10.21 22.41zM119.22 31.84c0-7.07 2.58-13.83 7.74-20.28 5.16-6.45 11.66-10.45 19.51-12 0.79 7.07-1.7 13.88-7.47 20.43-5.77 6.55-12.39 10.37-19.78 11.85z"/>
          </svg>
          <div>
            <div style="font-size:13.5px;font-weight:700">Apple ID</div>
            <div style="font-size:11.5px;color:#64748b">Coming soon</div>
          </div>
        </div>
        <button type="button" data-action="loginWithApple" style="background:#fff;color:#94a3b8;border:1px solid #cbd5e1;padding:6px 10px;border-radius:10px;font-size:11.5px;font-weight:700;cursor:not-allowed">
          Not available
        </button>
      </div>
    </div>

    <!-- Active Delivery Address Card -->
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:20px;padding:16px;background:#fff;display:flex;flex-direction:column;gap:6px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:11.5px;font-weight:800;opacity:0.55;text-transform:uppercase;letter-spacing:0.5px">PRIMARY DELIVERY ADDRESS</div>
        <span class="press" data-action="openAddressModal" style="font-size:12px;font-weight:700;color:#6366f1;cursor:pointer">Change ✎</span>
      </div>
      <div style="font-size:14.5px;font-weight:800;color:#0f172a">${escapeHtml(p.address)}, ${escapeHtml(p.postcode)}</div>
      <div style="font-size:12.5px;opacity:0.65">${escapeHtml(p.city || 'Bolton')}</div>
      ${p.instructions ? `<div style="font-size:12px;color:#475569;background:#f1f5f9;padding:8px 12px;border-radius:10px;margin-top:4px">📝 Note: "${escapeHtml(p.instructions)}"</div>` : ''}
    </div>

    <!-- Payment Methods -->
    <div style="border:1.5px solid #e2e8f0;border-radius:20px;padding:16px;background:#fff;display:flex;flex-direction:column;gap:10px">
      <div style="font-size:11.5px;font-weight:800;opacity:0.55;text-transform:uppercase;letter-spacing:0.5px">PAYMENT METHODS</div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:13.5px;font-weight:700">
        <span> Apple Pay / Google Pay</span>
        <span style="font-size:11px;background:#dcfce7;color:#15803d;padding:3px 8px;border-radius:8px">Primary</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;opacity:0.75">
        <span>Barclays Visa Debit (•••• 4892)</span>
        <span style="font-size:11px;color:#64748b">Verified</span>
      </div>
    </div>

    <!-- Order History -->
    <div style="display:flex;flex-direction:column;gap:8px">
      <div style="font-size:12px;font-weight:800;opacity:0.55;text-transform:uppercase;letter-spacing:0.5px">LOGGED ORDERS (${state.orders.length})</div>
      ${ordersListHtml}
    </div>

    <button type="button" data-action="logout" style="width:100%;background:#fee2e2;color:#ef4444;border:none;padding:14px;border-radius:16px;font-size:14px;font-weight:800;cursor:pointer;margin-top:8px">
      🚪 ${isSignedIn ? 'Log Out of Account' : 'Back to Sign In'}
    </button>
  </div>`;
}

function stockPill(status, label) {
  const active = state.specialRequest.stockStatus === status;
  const style = active
    ? 'background:#141414;color:#fff;'
    : 'border:1.5px solid rgba(20,20,20,0.2);color:#141414;';
  return `<div class="press" data-action="setStockStatus" data-arg="${status}" style="flex:1;text-align:center;border-radius:20px;padding:9px 6px;font-size:12.5px;font-weight:700;cursor:pointer;${style}">${label}</div>`;
}

function textField(id, bindPath, placeholder, value) {
  return `<input id="${id}" data-bind="${bindPath}" value="${escapeHtml(value || '')}" placeholder="${escapeHtml(placeholder)}" style="border:1.5px solid rgba(20,20,20,0.15);border-radius:14px;padding:12px 14px;font-size:13.5px;font-family:inherit;outline:none;width:100%;background:transparent" />`;
}

function specialRequestScreenshotCard() {
  const src = state.specialRequest.screenshot;
  const bgStyle = src ? `background-image:url('${src}');background-size:cover;background-position:center;` : '';
  return `<div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden">
    <label class="card-image" style="${bgStyle};height:150px" title="${src ? 'Change screenshot' : 'Add screenshot'}">
      ${src ? '' : `<span style="font-size:13px;opacity:0.5;text-align:center;padding:0 30px">📷 Tap to add a screenshot of the item</span>`}
      <span class="upload-overlay">⤴ ${src ? 'Change screenshot' : 'Add screenshot'}</span>
      <input type="file" accept="image/*" data-upload-screenshot />
    </label>
    <div style="padding:12px 16px;font-size:12px;opacity:0.6">Your courier will see this screenshot when collecting, so they know exactly what to look for.</div>
  </div>`;
}

function renderShopperSpecialRequest() {
  const r = state.specialRequest;

  if (r.submitted) {
    return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;align-items:center;gap:10px;padding:4px 0 10px">
        <div class="press" data-action="goShop" style="cursor:pointer;font-size:20px;line-height:1">‹</div>
        <div style="font-size:18px;font-weight:700">Special Request</div>
      </div>
      <div style="border:1.5px solid oklch(56% 0.17 258);background:oklch(97% 0.02 258);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center">
        <div style="font-size:18px;font-weight:700">✓ Request sent</div>
        <div style="font-size:13px;opacity:0.6">We're matching you with a courier who can collect "${escapeHtml(r.productName)}"${r.storeLocation ? ` from ${escapeHtml(r.storeLocation)}` : ''}.</div>
        <div class="press" data-action="newSpecialRequest" style="margin-top:4px;background:#141414;color:#fff;border-radius:20px;padding:10px 20px;font-weight:700;font-size:13px;cursor:pointer">Make another request</div>
        <div class="press" data-action="goShop" style="font-size:12.5px;opacity:0.6;cursor:pointer">Back to Shop</div>
      </div>
    </div>`;
  }

  const canSubmit = r.productName.trim().length > 0;
  const submitStyle = canSubmit
    ? 'background:#141414;color:#fff;cursor:pointer;'
    : 'background:rgba(20,20,20,0.07);color:rgba(20,20,20,0.35);cursor:default;';

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="display:flex;align-items:center;gap:10px;padding:4px 0 10px">
      <div class="press" data-action="goShop" style="cursor:pointer;font-size:20px;line-height:1">‹</div>
      <div style="font-size:18px;font-weight:700">Special Request</div>
    </div>
    <div style="font-size:13px;opacity:0.6">Can't find an item in Morrisons Daily? Tell us where to find it and we'll match you with a courier to collect it.</div>

    <div style="display:flex;flex-direction:column;gap:6px">
      <div style="font-size:12px;opacity:0.55">What are you looking for?</div>
      ${textField('sr-product-name', 'specialRequest.productName', "e.g. Percy Pigs sharing bag", r.productName)}
    </div>

    <div style="display:flex;flex-direction:column;gap:6px">
      <div style="font-size:12px;opacity:0.55">Product URL (optional)</div>
      ${textField('sr-product-url', 'specialRequest.productUrl', "Link to the item online", r.productUrl)}
    </div>

    <div style="display:flex;flex-direction:column;gap:6px">
      <div style="font-size:12px;opacity:0.55">Store location</div>
      ${textField('sr-store-location', 'specialRequest.storeLocation', "Store name or address", r.storeLocation)}
    </div>

    <div style="display:flex;flex-direction:column;gap:6px">
      <div style="font-size:12px;opacity:0.55">Stock availability</div>
      <div style="display:flex;gap:8px">
        ${stockPill('in_stock', 'In stock')}
        ${stockPill('limited', 'Limited stock')}
        ${stockPill('unsure', 'Not sure')}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:6px">
      <div style="font-size:12px;opacity:0.55">Screenshot for courier</div>
      ${specialRequestScreenshotCard()}
    </div>

    <div class="press" data-action="submitSpecialRequest" style="border-radius:20px;padding:13px;text-align:center;font-weight:700;font-size:14px;${submitStyle}">Send request</div>
  </div>`;
}

function tabStyle(key) {
  const active = state.screen === key;
  return `display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10px;cursor:pointer;color:${active ? 'oklch(56% 0.17 258)' : 'rgba(20,20,20,0.45)'};font-weight:${active ? 700 : 500}`;
}

function renderCourierTabs() {
  return `<div style="flex:none;display:flex;border-top:1px solid rgba(20,20,20,0.1);padding:10px 4px 22px;justify-content:space-around;background:#fff">
    <div data-action="goActivity" style="${tabStyle('courier-activity')}">
      <span style="position:relative">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 3 H16 V15 L15 16.5 L14 15 L13 16.5 L12 15 L11 16.5 L10 15 L9 16.5 L8 15 L7 16.5 L6 15 L5 16.5 L4 15 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.5 7H13.5M6.5 10H13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        ${state.courierInbox.some(m => !m.read) ? '<span style="position:absolute;top:-1px;right:-3px;width:7px;height:7px;border-radius:50%;background:#ef4444;border:1.5px solid #fff"></span>' : ''}
      </span>
      Activity
    </div>
    <div data-action="goEarnings" style="${tabStyle('courier-earnings')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="5" width="16" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2 9h16" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="12.5" r="1.2" fill="currentColor"/></svg>
      Earnings
    </div>
    <div data-action="goPack" style="${tabStyle('courier-pack')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2l7 3.5v9L10 18l-7-3.5v-9L10 2z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 5.5L10 9l6.5-3.5M10 9v9" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>
      Pick&amp;Pack
    </div>
    <div data-action="goCourierAccount" style="${tabStyle('courier-account')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="6.5" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 17c1-3.5 4-5 6.5-5s5.5 1.5 6.5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Account
    </div>
  </div>`;
}

function renderShopperTabs() {
  return `
  <div class="floating-tabbar">
    <div class="press floating-tab" data-action="goShop" style="${tabStyle('shopper-shop')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 7h10l-1 10H6L5 7z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7.5 7V5.5a2.5 2.5 0 015 0V7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Shop
    </div>
    <div class="press floating-tab" data-action="goBasket" style="${tabStyle('shopper-basket')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="6.5" cy="17" r="1.3" fill="currentColor"/><circle cx="14.5" cy="17" r="1.3" fill="currentColor"/><path d="M2 3h2l1.6 10.4a1.5 1.5 0 001.5 1.3h8.1a1.5 1.5 0 001.5-1.2L18 6H4.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Basket
    </div>
    <div class="press floating-tab" data-action="goShopperInbox" style="${tabStyle('shopper-inbox')}">
      <span style="position:relative">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 3 H16 V15 L15 16.5 L14 15 L13 16.5 L12 15 L11 16.5 L10 15 L9 16.5 L8 15 L7 16.5 L6 15 L5 16.5 L4 15 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.5 7H13.5M6.5 10H13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        ${state.shopperInbox.some(m => !m.read) ? '<span style="position:absolute;top:-1px;right:-3px;width:7px;height:7px;border-radius:50%;background:#ef4444;border:1.5px solid #fff"></span>' : ''}
      </span>
      Activity
    </div>
    <div class="press floating-tab" data-action="goShopperAccount" style="${tabStyle('shopper-account')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="6.5" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 17c1-3.5 4-5 6.5-5s5.5 1.5 6.5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Account
    </div>
  </div>
  <div class="press ai-fab" data-action="toggleAiChat" title="Chat with AI Assistant">
    <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" fill="#fff"/></svg>
  </div>`;
}

const SHOPPING_LIST_LEAD_INS = /^(please\s+)?(can you\s+|could you\s+)?(add|buy|get me|get|put|i need|i want|i'd like|order|find me)\s+/i;
const SHOPPING_LIST_TRAIL_OFFS = /\s+(to|into)\s+(my\s+)?(basket|cart)\.?$/i;

function extractShoppingListTerms(query) {
  let q = query.trim();
  q = q.replace(SHOPPING_LIST_LEAD_INS, '');
  q = q.replace(SHOPPING_LIST_TRAIL_OFFS, '');
  return q
    .split(/,|\band\b|\+/i)
    .map((s) => s.replace(/^(a|an|some|\d+)\s+/i, '').trim())
    .filter(Boolean);
}

const COMMON_ITEM_KEYWORDS = {
  milk: 1, bread: 3, butter: 5, eggs: 6, cheese: 7, cheddar: 7, yoghurt: 9, yogurt: 9,
  chocolate: 10, crisps: 16, digestives: 19, biscuits: 20, cola: 21, coke: 21, juice: 25,
  coffee: 26, tea: 27, beans: 28, soup: 29, pasta: 31, rice: 32, cereal: 33, weetabix: 34,
  sausages: 35, bacon: 36, chicken: 37, sandwich: 38, pizza: 42, sugar: 53, flour: 54,
  jam: 55, mayonnaise: 58, mayo: 58, noodles: 60, plasters: 63, vitamins: 67, peanuts: 73,
  lager: 81, beer: 81, wine: 85, gin: 87, vodka: 88, whiskey: 89, cider: 84,
};

function findProductForTerm(term) {
  if (!term) return null;
  const byName = PRODUCTS.find((p) => p.name.toLowerCase().includes(term));
  if (byName) return byName;
  return PRODUCTS.find((p) => p.category.toLowerCase().includes(term)) || null;
}

function findProductsForSegment(segment) {
  const whole = findProductForTerm(segment);
  if (whole) return [whole];

  const words = segment.split(/\s+/).filter(Boolean);
  const found = [];
  const leftover = [];
  for (const word of words) {
    const id = COMMON_ITEM_KEYWORDS[word];
    const product = id ? PRODUCTS.find((p) => p.id === id) : findProductForTerm(word);
    if (product) found.push(product);
    else leftover.push(word);
  }
  return found.length ? found : null;
}

function processGraftrAiQuery(rawQuery) {
  const query = rawQuery.toLowerCase();

  const terms = extractShoppingListTerms(query);
  if (terms.length) {
    const added = [];
    const notFound = [];
    for (const term of terms) {
      const products = findProductsForSegment(term);
      if (products) {
        for (const product of products) {
          state.cart[product.id] = (state.cart[product.id] || 0) + 1;
          added.push(product);
        }
      } else {
        notFound.push(term);
      }
    }
    if (added.length) {
      const addedList = added.map((p) => `• ${p.name} — £${p.estimated_price_gbp.toFixed(2)}`).join('<br>');
      const missing = notFound.length ? `<br><br>Couldn't find: ${notFound.join(', ')}` : '';
      const heading = added.length > 1 ? '🛒 Added to your basket:' : `🛒 Added **${added[0].name}** to your basket!`;
      return added.length > 1 ? `${heading}<br>${addedList}${missing}` : `${heading}${missing}`;
    }
  }

  const keywords = query.split(/\s+/).filter(w => w.length > 2 && !['find', 'show', 'search', 'want', 'need', 'me', 'the', 'for'].includes(w));
  let matchedProducts = [];
  if (keywords.length > 0) {
    matchedProducts = PRODUCTS.filter(p => {
      const name = p.name.toLowerCase();
      const cat = p.category.toLowerCase();
      return keywords.some(k => name.includes(k) || cat.includes(k));
    }).slice(0, 3);
  }

  if (matchedProducts.length > 0) {
    const productList = matchedProducts.map(p => `• ${p.name} - £${p.estimated_price_gbp.toFixed(2)} (${p.weight_or_volume})`).join('<br>');
    return `Here are the top matches I found on Vendaru:<br><br>${productList}<br><br>💡 <i>Tip: Say "Add ${matchedProducts[0].name.split(' ')[0]}" to add it to your basket!</i>`;
  }

  if (query.includes('delivery') || query.includes('fast') || query.includes('time')) {
    return "⚡ <b>Vendaru Delivery</b>: Standard delivery takes 15–30 minutes directly from your local merchant! You can track your courier live on the order screen.";
  }

  if (query.includes('offer') || query.includes('discount') || query.includes('deal')) {
    return "🏷️ <b>Today's Hot Deals</b>:<br>• Morrisons Meal Deal Sandwiches from £2.45<br>• Walkers Crisps 6-pack for £2.20<br>• Ben & Jerry's Cookie Dough Ice Cream - £4.95";
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hello! 👋 I'm here to help you shop on Vendaru. What would you like to order today?";
  }

  return "I can help you search for groceries, check prices, recommend items, or track your delivery! Try asking: <i>'Find fresh milk'</i> or <i>'Add chocolate to basket'</i>";
}

function renderAiChatDrawer() {
  if (!state.aiChatOpen) return '';

  const msgsHtml = state.aiMessages.map(m => {
    return `<div class="ai-msg ${m.role}">${m.text}</div>`;
  }).join('');

  const loadingHtml = state.aiLoading ? `<div class="ai-msg bot" style="font-style:italic;color:#64748b;">✨ Vendaru AI is thinking...</div>` : '';

  return `
    <div class="ai-modal-overlay">
      <div class="ai-chat-sheet">
        <div class="ai-sheet-header">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:32px;height:32px;border-radius:50%;background:rgba(20,20,20,0.08);display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>
            <div>
              <div style="font-weight:700;font-size:15px;line-height:1.2">Vendaru AI Assistant</div>
              <div style="font-size:11px;opacity:0.75">Customer Shopping Helper</div>
            </div>
          </div>
          <button data-action="toggleAiChat" style="background:none;border:none;color:#141414;font-size:20px;cursor:pointer;padding:4px 8px">✕</button>
        </div>

        <div class="ai-chat-body" id="ai-chat-body-scroll">
          ${msgsHtml}
          ${loadingHtml}
        </div>

        <div class="ai-chip-suggestions">
          <div class="ai-chip" data-action="sendPresetPrompt" data-arg="Find me fresh milk & bread">🥛 Milk & Bread</div>
          <div class="ai-chip" data-action="sendPresetPrompt" data-arg="Recommend snacks">🍿 Party Snacks</div>
          <div class="ai-chip" data-action="sendPresetPrompt" data-arg="What soft drinks do you have?">🥤 Soft Drinks</div>
          <div class="ai-chip" data-action="sendPresetPrompt" data-arg="How fast is delivery?">⚡ Delivery Info</div>
        </div>

        <div class="ai-chat-footer">
          <button type="button" class="ai-mic-btn-inline${state.aiListening ? ' listening' : ''}" data-action="toggleVoiceInput" title="Speak to add items">
            ${state.aiListening
              ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>'
              : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z"/><path d="M19 11a7 7 0 01-14 0"/><line x1="12" y1="18" x2="12" y2="22"/></svg>'}
          </button>
          <input type="text" id="ai-chat-input" data-bind="aiInput" value="${escapeHtml(state.aiInput || '')}" placeholder="${state.aiListening ? 'Listening…' : 'Ask AI to find items or help...'}" autocomplete="off" />
          <button type="button" class="ai-send-btn" data-action="submitAiMessage">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
        ${state.aiVoiceSupported === false ? '<div style="padding:0 16px 10px;font-size:11px;color:#94a3b8;text-align:center">Voice input isn\'t available in this browser — type instead.</div>' : ''}
      </div>
    </div>
  `;
}

let recognition = null;

function getSpeechRecognitionCtor() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function startVoiceRecognition() {
  const SR = getSpeechRecognitionCtor();
  if (!SR) {
    state.aiVoiceSupported = false;
    render();
    return;
  }
  state.aiVoiceSupported = true;
  recognition = new SR();
  recognition.lang = 'en-GB';
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onresult = (e) => {
    let transcript = '';
    for (let i = 0; i < e.results.length; i++) transcript += e.results[i][0].transcript;
    state.aiInput = transcript;
    const last = e.results[e.results.length - 1];
    if (last.isFinal) {
      state.aiListening = false;
      render();
      actions.submitAiMessage();
    } else {
      render();
    }
  };
  recognition.onerror = (e) => {
    state.aiListening = false;
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
      state.aiVoiceSupported = false;
    }
    render();
  };
  recognition.onend = () => {
    state.aiListening = false;
    render();
  };

  state.aiListening = true;
  render();
  try {
    recognition.start();
  } catch (err) {
    state.aiListening = false;
    render();
  }
}

function renderShopperTrackingSection(currentOrder) {
  const isPending = currentOrder.status === 'Pending Courier Acceptance';
  const isPacking = currentOrder.status === 'Packing';
  const isOutForDelivery = currentOrder.status === 'Out for Delivery';
  const isDelivered = currentOrder.status === 'Delivered';
  const isCancelled = currentOrder.status === 'Cancelled';

  // Strict Lifecycle Triggers:
  // Step 1 (Ordered): Customer places order
  // Step 2 (Packing): Courier accepts job & packs items
  // Step 3 (On the Way): Courier completes packing & departs (Live GPS Enabled)
  // Step 4 (Delivered): Courier confirms delivery
  const steps = [
    { label: 'Ordered', done: true },
    { label: 'Packing', done: isPacking || isOutForDelivery || isDelivered },
    { label: 'On the Way', done: isOutForDelivery || isDelivered },
    { label: 'Delivered', done: isDelivered },
  ];
  const doneCount = steps.filter(s => s.done).length;
  const progressPct = Math.max(0, ((doneCount - 1) / (steps.length - 1)) * 100);

  const isLiveGpsActive = isOutForDelivery;
  const mapBadgeText = isPending
    ? '⏳ WAITING FOR COURIER'
    : isPacking
      ? '🏬 STORE PACKING IN PROGRESS'
      : isOutForDelivery
        ? '🟢 LIVE GPS TRACKING'
        : '🏠 DELIVERED';

  const itemsList = (currentOrder.items && currentOrder.items.length > 0)
    ? currentOrder.items
    : [
        { name: 'Warburtons Toastie Thick White Bread 800g', qty: 1, price: 1.40 },
        { name: 'Morrisons Fresh Semi-Skimmed Milk 2L', qty: 1, price: 1.55 },
        { name: 'Lurpak Slightly Salted Butter 500g', qty: 1, price: 4.25 },
        { name: 'Morrisons Free Range Medium Eggs x6', qty: 1, price: 1.80 }
      ];

  const itemsCount = itemsList.reduce((sum, i) => sum + (i.qty || 1), 0);

  const itemsRowsHtml = itemsList.map(item => {
    const prod = PRODUCTS.find(p => p.name.toLowerCase() === item.name.toLowerCase() || item.name.toLowerCase().includes(p.name.toLowerCase()));
    const imgSrc = item.image || (prod ? prod.image : 'assets/products/product_1.png');
    const priceGbp = item.price || (prod ? prod.estimated_price_gbp : 2.50);

    return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;gap:10px">
        <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1">
          <img src="${imgSrc}" style="width:34px;height:34px;object-fit:contain;border-radius:8px;background:#f8fafc;padding:2px;border:1px solid #f1f5f9;flex:none" alt="${escapeHtml(item.name)}" />
          <div style="min-width:0;flex:1">
            <div style="font-size:12.5px;font-weight:700;color:#0f172a;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(item.name)}</div>
            <div style="font-size:11px;color:#64748b">Qty: ${item.qty || 1}</div>
          </div>
        </div>
        <div style="font-size:12.5px;font-weight:800;color:#1e293b">£${((item.qty || 1) * priceGbp).toFixed(2)}</div>
      </div>
    `;
  }).join('');

  const pendingNoticeHtml = isPending ? `
    <div style="background:#fff5f9;border:2px dashed #ffcbe1;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px;box-shadow:0 4px 14px rgba(0,0,0,0.05)">
      <div style="font-size:32px">⏳</div>
      <div>
        <div style="font-size:15.5px;font-weight:800">Waiting for Courier Acceptance...</div>
        <div style="font-size:12.5px;opacity:0.7;margin-top:2px">Order ${currentOrder.id} has been broadcast to couriers near ${escapeHtml(currentOrder.merchant)}.</div>
      </div>
      <button type="button" data-action="chooseCourier" style="background:#141414;color:#fff;border:none;padding:12px 20px;border-radius:14px;font-size:13px;font-weight:700;cursor:pointer;margin-top:4px;box-shadow:0 4px 12px rgba(0,0,0,0.2)">
        🚴 Demo: Switch to Courier Mode to Accept Job
      </button>
    </div>
  ` : '';

  const tipHtml = isDelivered ? (
    currentOrder.tip
      ? `
      <div style="background:#f0fdf4;border:2px solid #bbf7d0;border-radius:20px;padding:16px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px">
        <div style="font-size:28px">💚</div>
        <div style="font-size:14.5px;font-weight:800">Thanks for tipping £${currentOrder.tip.toFixed(2)}!</div>
        <div style="font-size:12px;opacity:0.65">Your courier will see this on their earnings.</div>
      </div>
    `
      : `
      <div style="background:#fff5f9;border:2px solid #ffcbe1;border-radius:20px;padding:16px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px">
        <div style="font-size:14.5px;font-weight:800">Delivered! Add a tip for ${escapeHtml((currentOrder.courier || 'your courier').split(' (')[0])}?</div>
        <div style="display:flex;gap:8px;width:100%">
          ${[1, 2, 5].map(amt => `<button type="button" data-action="addTip" data-arg="${amt}" style="flex:1;background:#141414;color:#fff;border:none;padding:12px 0;border-radius:14px;font-weight:800;font-size:13.5px;cursor:pointer">£${amt}</button>`).join('')}
        </div>
        <button type="button" data-action="addTip" data-arg="0" style="background:none;border:none;color:#64748b;font-size:12px;font-weight:700;cursor:pointer;text-decoration:underline">No thanks</button>
      </div>
    `
  ) : '';

  let etaLabel;
  if (isPending) etaLabel = 'Pending';
  else if (isDelivered) etaLabel = 'Delivered ✓';
  else if (isCancelled) etaLabel = 'Cancelled';
  else etaLabel = state.liveEtaMinutes ? `~${state.liveEtaMinutes} min` : 'Calculating…';

  return `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 0">
      <div>
        <div style="font-size:15px;font-weight:700">Order ${currentOrder.id} · ${escapeHtml(currentOrder.merchant)}</div>
        <div style="font-size:11.5px;opacity:0.55">${escapeHtml(currentOrder.status)}</div>
      </div>
    </div>

    ${pendingNoticeHtml}
    ${tipHtml}

    <!-- Unified Master Delivery Tracking Card -->
    <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:24px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);display:flex;flex-direction:column">
      
      <!-- 1. Top Section: Live Map -->
      <div style="position:relative;width:100%;height:220px">
        <div id="graftr-leaflet-map" style="width:100%;height:100%"></div>
        <div style="position:absolute;top:12px;right:12px;z-index:2;background:rgba(255,255,255,0.92);backdrop-filter:blur(6px);padding:5px 11px;border-radius:20px;font-size:10.5px;font-weight:800;box-shadow:0 2px 8px rgba(0,0,0,0.15);display:flex;align-items:center;gap:6px">
          <span style="width:7px;height:7px;border-radius:50%;background:${isLiveGpsActive ? '#10b981' : (isPending ? '#f59e0b' : '#6366f1')};display:inline-block;animation:${isLiveGpsActive ? 'courierPulse 1.5s infinite' : 'none'}"></span>
          ${mapBadgeText}
        </div>
      </div>

      <!-- 2. Middle Section: Courier Driver & Live ETA Bar -->
      <div style="background:#141414;color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:38px;height:38px;border-radius:50%;background:#ffcbe1;color:#141414;display:flex;align-items:center;justify-content:center;font-size:18px">🚴</div>
          <div>
            <div style="font-size:13.5px;font-weight:700">${currentOrder.courier || 'Alex (Assigned Courier)'}</div>
            <div style="font-size:11px;opacity:0.7">Heading to ${escapeHtml((currentOrder.address || state.userProfile.address).split(',')[0])}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div id="graftr-eta-value" style="font-size:18px;font-weight:800;color:#ffcbe1">${etaLabel}</div>
          <div style="font-size:10.5px;opacity:0.7">Total £${currentOrder.total ? currentOrder.total.toFixed(2) : '0.00'}</div>
        </div>
      </div>

      <!-- 3. Bottom Section: Seamless Horizontal Order Timeline -->
      <div style="padding:16px 14px 14px;background:#ffffff;border-top:1px solid #f1f5f9;position:relative">
        <div style="position:relative;padding:0 9px">
          <div style="position:absolute;top:9px;left:0;right:0;height:2px;background:#e2e8f0;z-index:0"></div>
          <div style="position:absolute;top:9px;left:0;height:2px;background:#141414;z-index:0;width:${progressPct}%;transition:width 0.3s"></div>
          <div style="display:flex;justify-content:space-between;position:relative;z-index:1">
            ${steps.map(s => `
              <div style="display:flex;flex-direction:column;align-items:center;gap:5px;width:25%">
                <div style="width:18px;height:18px;border-radius:50%;background:${s.done ? '#141414' : '#fff'};border:2px solid ${s.done ? '#141414' : '#e2e8f0'};color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">${s.done ? '✓' : ''}</div>
                <div style="font-size:9.5px;font-weight:${s.done ? 700 : 500};opacity:${s.done ? 1 : 0.5};text-align:center;line-height:1.15">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

    </div>

    <!-- Enlarged & Scrollable Order Details Summary Box -->
    <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:20px;padding:14px;display:flex;flex-direction:column;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,0.02)">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:11.5px;font-weight:800;text-transform:uppercase;color:#64748b;letter-spacing:0.5px">ORDER ITEMS (${itemsCount} items)</div>
        <span style="font-size:11px;background:#e2e8f0;color:#334155;font-weight:700;padding:2px 8px;border-radius:10px">Scrollable ↕</span>
      </div>

      <div style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding-right:3px">
        ${itemsRowsHtml}
      </div>

      <div style="font-size:12px;color:#334155;border-top:1px dashed #cbd5e1;padding-top:8px;margin-top:2px">
        📍 Delivering to: <b>${escapeHtml(currentOrder.address || state.userProfile.address)}</b>
      </div>
    </div>

    <div>
      ${isCancelled
        ? `<button type="button" data-action="deleteOrder" data-arg="${currentOrder.id}" style="width:100%;background:#f8fafc;color:#64748b;border:1.5px solid #cbd5e1;padding:12px;border-radius:16px;font-weight:700;font-size:13.5px;cursor:pointer">Remove Order</button>`
        : isDelivered
          ? `<button type="button" data-action="deleteOrder" data-arg="${currentOrder.id}" style="width:100%;background:#f8fafc;color:#64748b;border:1.5px solid #cbd5e1;padding:12px;border-radius:16px;font-weight:700;font-size:13.5px;cursor:pointer">Clear Order</button>`
          : `<button type="button" data-action="cancelOrder" data-arg="${currentOrder.id}" style="width:100%;background:#fff;color:#ef4444;border:1.5px solid #fca5a5;padding:12px;border-radius:16px;font-weight:700;font-size:13.5px;cursor:pointer">Cancel Order</button>`}
    </div>
  `;
}

function renderShopperInbox() {
  const currentOrder = state.orders.find(o => o.id === state.activeOrderId) || state.orders[0];

  const trackingHtml = currentOrder ? renderShopperTrackingSection(currentOrder) : `
    <div style="padding:24px 0;display:flex;flex-direction:column;gap:14px;align-items:center;text-align:center">
      <div style="width:60px;height:60px;border-radius:50%;background:#f8fafc;border:2px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 6px 16px rgba(0,0,0,0.06)">📦</div>
      <div>
        <div style="font-size:16.5px;font-weight:800">No Orders Placed Yet</div>
        <div style="font-size:12.5px;opacity:0.65;margin-top:4px;max-width:280px;line-height:1.4">
          Place an order from Morrisons Daily to track your delivery live here.
        </div>
      </div>
      <button type="button" data-action="goShop" style="background:#141414;color:#fff;border:none;padding:12px 24px;border-radius:16px;font-size:13.5px;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,0.2)">
        🛒 Start Shopping
      </button>
    </div>
  `;

  const trackingCard = `
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:16px;display:flex;flex-direction:column;gap:14px">
        <span style="font-size:15.5px;font-weight:700">📦 Order Tracking</span>
        ${trackingHtml}
      </div>
    </div>`;

  const messagesCard = `
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:16px;display:flex;flex-direction:column;gap:12px">
        ${renderInboxHeader(state.shopperInbox, 'markAllShopperRead', '💬 Messages & Updates', '15.5px')}
        <div id="shopper-inbox-messages" style="max-height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding-right:2px">
          ${renderInboxList(state.shopperInbox, 'toggleShopperRead')}
        </div>
      </div>
    </div>`;

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:25px;font-weight:700">Activity</div>
    ${trackingCard}
    ${messagesCard}
  </div>`;
}

let graftrMapInstance = null;
let courierMarkerInstance = null;
let liveAnimationInterval = null;

const STORE_ADDRESS = "Brownlow Wy., Brownlow Fold, Bolton BL1 3UB";
const STORE_COORDS = [53.587892, -2.43748];

async function initGraftrLiveMap() {
  const container = document.getElementById('graftr-leaflet-map');
  if (!container || typeof L === 'undefined') return;

  if (graftrMapInstance) {
    try { graftrMapInstance.remove(); } catch(e){}
    graftrMapInstance = null;
  }

  const currentOrder = state.orders.find(o => o.id === state.activeOrderId) || state.orders[0];
  const customerPos = await fetchAddressCoords(currentOrder ? currentOrder.address : state.userProfile.address);
  const storePos = STORE_COORDS;

  // Fit map bounds to encompass Store & Customer Address perfectly
  const bounds = L.latLngBounds([storePos, customerPos]);
  const map = L.map('graftr-leaflet-map', {
    zoomControl: false,
    attributionControl: false
  }).fitBounds(bounds, { padding: [40, 40] });

  graftrMapInstance = map;

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(map);

  // Store Marker
  const storeIcon = L.divIcon({
    className: 'custom-map-icon store-icon',
    html: '<div style="background:#141414;color:#fff;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 12px rgba(0,0,0,0.3)">🏬</div>',
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
  L.marker(storePos, { icon: storeIcon }).addTo(map).bindPopup(`<b>Morrisons Daily<br><span style="font-size:11px;font-weight:normal">${STORE_ADDRESS}</span></b>`);

  // Customer Destination Marker (100% synced with customer address)
  const addressLabel = currentOrder ? currentOrder.address : `${state.userProfile.address}, ${state.userProfile.postcode}`;
  const customerIcon = L.divIcon({
    className: 'custom-map-icon customer-icon',
    html: '<div style="background:#4f46e5;color:#fff;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 12px rgba(79,70,229,0.4)">🏠</div>',
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
  L.marker(customerPos, { icon: customerIcon }).addTo(map).bindPopup(`<b>${escapeHtml(addressLabel)}</b>`).openPopup();

  // Real Street Route Path connecting Store to Customer Address (snapped to actual roads)
  const streetRoutePath = await fetchStreetRoute(storePos, customerPos);
  L.polyline(streetRoutePath, { color: '#ec4899', weight: 5, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }).addTo(map);

  // COURIER VISIBILITY RULE: Only show courier marker IF accepted!
  const isAccepted = currentOrder && currentOrder.status !== 'Pending Courier Acceptance';

  if (isAccepted) {
    let liveGps = state.courierLiveGps;
    if (!liveGps) {
      try {
        const res = await fetch('/api/courier/location');
        if (res.ok) {
          const data = await res.json();
          if (data.location) liveGps = data.location;
        }
      } catch(e){}
    }

    const livePos = (liveGps && liveGps.lat) ? [liveGps.lat, liveGps.lng] : storePos;

    const courierIcon = L.divIcon({
      className: 'custom-map-icon courier-icon',
      html: '<div style="background:#141414;color:#fff;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 6px 16px rgba(0,0,0,0.3);border:2px solid #ffcbe1">🚴</div>',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    courierMarkerInstance = L.marker(livePos, { icon: courierIcon }).addTo(map).bindPopup("<b>Courier Alex (Real Device GPS)</b>");
  }
}

let etaUpdateInterval = null;

// Live-recomputes ETA from the courier's real GPS position (or the store, before pickup) to the
// customer address via OSRM, and pushes it straight into the DOM so it doesn't have to tear down
// the live Leaflet map to refresh a number.
async function updateLiveEta() {
  const currentOrder = state.orders.find(o => o.id === state.activeOrderId) || state.orders[0];
  if (!currentOrder || currentOrder.status === 'Pending Courier Acceptance' || currentOrder.status === 'Delivered' || currentOrder.status === 'Cancelled') {
    return;
  }
  try {
    const customerPos = await fetchAddressCoords(currentOrder.address);
    const fromPos = (state.courierLiveGps && state.courierLiveGps.lat) ? [state.courierLiveGps.lat, state.courierLiveGps.lng] : STORE_COORDS;
    const url = `https://router.project-osrm.org/route/v1/driving/${fromPos[1]},${fromPos[0]};${customerPos[1]},${customerPos[0]}?overview=false`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.routes && data.routes[0]) {
      state.liveEtaMinutes = Math.max(1, Math.round(data.routes[0].duration / 60));
      state.liveEtaUpdatedAt = Date.now();
      updateEtaBoxUI();
    }
  } catch (e) { /* keep last known ETA on network failure */ }
}

function updateEtaBoxUI() {
  const el = document.getElementById('graftr-eta-value');
  if (el && state.liveEtaMinutes) el.textContent = `~${state.liveEtaMinutes} min`;
}

function startEtaLiveUpdates() {
  stopEtaLiveUpdates();
  updateLiveEta();
  etaUpdateInterval = setInterval(updateLiveEta, 20000);
}

function stopEtaLiveUpdates() {
  if (etaUpdateInterval) {
    clearInterval(etaUpdateInterval);
    etaUpdateInterval = null;
  }
}

let basketMapInstance = null;
let basketCourierMarker = null;

async function initGraftrBasketMap() {
  const container = document.getElementById('graftr-basket-leaflet-map');
  if (!container || typeof L === 'undefined') return;

  if (basketMapInstance) {
    try { basketMapInstance.remove(); } catch(e){}
    basketMapInstance = null;
  }

  const currentOrder = state.orders.find(o => o.id === state.activeOrderId) || state.orders[0];
  const customerPos = await fetchAddressCoords(currentOrder ? currentOrder.address : state.userProfile.address);
  const storePos = STORE_COORDS;

  const bounds = L.latLngBounds([storePos, customerPos]);
  const map = L.map('graftr-basket-leaflet-map', {
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false
  }).fitBounds(bounds, { padding: [15, 15] });

  basketMapInstance = map;

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(map);

  const streetRoutePath = await fetchStreetRoute(storePos, customerPos);
  L.polyline(streetRoutePath, { color: '#ec4899', weight: 4, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }).addTo(map);

  const storeIcon = L.divIcon({
    className: 'custom-map-icon store-icon',
    html: '<div style="background:#141414;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:13px">🏬</div>',
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
  L.marker(storePos, { icon: storeIcon }).addTo(map);

  const customerIcon = L.divIcon({
    className: 'custom-map-icon customer-icon',
    html: '<div style="background:#4f46e5;color:#fff;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:13px">🏠</div>',
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
  L.marker(customerPos, { icon: customerIcon }).addTo(map);

  const isAccepted = currentOrder && currentOrder.status !== 'Pending Courier Acceptance';

  if (isAccepted) {
    let liveGps = state.courierLiveGps;
    if (!liveGps) {
      try {
        const res = await fetch('/api/courier/location');
        if (res.ok) {
          const data = await res.json();
          if (data.location) liveGps = data.location;
        }
      } catch(e){}
    }

    const livePos = (liveGps && liveGps.lat) ? [liveGps.lat, liveGps.lng] : storePos;

    const courierIcon = L.divIcon({
      className: 'custom-map-icon courier-icon',
      html: '<div style="background:#141414;color:#fff;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 4px 10px rgba(0,0,0,0.3);border:2px solid #ffcbe1">🚴</div>',
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    basketCourierMarker = L.marker(livePos, { icon: courierIcon }).addTo(map);
  }
}

function stopVoiceRecognition() {
  if (recognition) {
    try { recognition.stop(); } catch (err) { /* already stopped */ }
    recognition = null;
  }
  state.aiListening = false;
}

const screenRenderers = {
  login: renderLogin,
  'courier-activity': renderCourierActivity,
  'courier-earnings': renderCourierEarnings,
  'courier-pack': renderCourierPack,
  'courier-account': renderCourierAccount,
  'shopper-shop': renderShopperShop,
  'shopper-browse': renderShopperBrowse,
  'shopper-basket': renderShopperBasket,
  'shopper-inbox': renderShopperInbox,
  'shopper-account': renderShopperAccount,
  'shopper-special-request': renderShopperSpecialRequest,
};

function render() {
  const content = screenRenderers[state.screen]();
  let tabs = '';
  let bottomPad = '';
  if (state.mode === 'courier') {
    tabs = renderCourierTabs();
  } else if (state.mode === 'shopper') {
    tabs = renderShopperTabs();
    bottomPad = 'padding-bottom:110px;';
  }

  const aiDrawer = renderAiChatDrawer();
  const addressModal = renderAddressModal();
  const checkoutModal = renderCheckoutModal();
  const authModal = renderAuthModal();

  root.innerHTML = `
    <div class="app-scroll" style="flex:1;overflow:auto;padding-top:56px;${bottomPad}">${content}</div>
    ${tabs}
    ${aiDrawer}
    ${addressModal}
    ${checkoutModal}
    ${authModal}
  `;

  if (typeof state.scanningBarcodeIndex === 'number' && state.scanningBarcodeIndex !== null) {
    if (scannerStartedForIndex !== state.scanningBarcodeIndex) {
      scannerStartedForIndex = state.scanningBarcodeIndex;
      setTimeout(() => startCameraScanner(state.scanningBarcodeIndex), 80);
    }
  } else if (scannerStartedForIndex !== null) {
    scannerStartedForIndex = null;
    stopCameraScanner();
  }

  if (state.screen === 'shopper-inbox') {
    setTimeout(initGraftrLiveMap, 50);
    startEtaLiveUpdates();
  } else {
    stopEtaLiveUpdates();
    if (state.screen === 'shopper-basket') {
      setTimeout(initGraftrBasketMap, 50);
    }
  }

  if (state.screen === 'shopper-inbox') {
    const msgBox = root.querySelector('#shopper-inbox-messages');
    if (msgBox) {
      if (typeof state.shopperInboxScrollTop === 'number') msgBox.scrollTop = state.shopperInboxScrollTop;
      msgBox.addEventListener('scroll', () => { state.shopperInboxScrollTop = msgBox.scrollTop; });
    }
  }

  if (state.screen === 'courier-activity') {
    const courierMsgBox = root.querySelector('#courier-inbox-messages');
    if (courierMsgBox) {
      if (typeof state.courierInboxScrollTop === 'number') courierMsgBox.scrollTop = state.courierInboxScrollTop;
      courierMsgBox.addEventListener('scroll', () => { state.courierInboxScrollTop = courierMsgBox.scrollTop; });
    }
  }

  if (state.aiChatOpen) {
    const chatBody = root.querySelector('#ai-chat-body-scroll');
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (state.pendingScrollCategory && state.screen === 'shopper-browse') {
    const el = root.querySelector(`#category-${categorySlug(state.pendingScrollCategory)}`);
    if (el) el.scrollIntoView({ block: 'start' });
    state.pendingScrollCategory = null;
  }

  if (state.screen === 'login' && state.showGoogleFallbackButton) {
    setTimeout(() => {
      const el = document.getElementById('google-signin-button-container');
      if (el && typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        el.innerHTML = '';
        google.accounts.id.renderButton(el, { theme: 'outline', size: 'large', width: 280 });
      }
    }, 50);
  }
}

let googleSignInInitialized = false;

// Decodes the real ID token Google issues after the user authenticates on Google's own
// consent screen — name/email/picture here are genuinely theirs, not typed by hand.
// (A production backend would also verify the JWT signature server-side; this app has
// no backend, so this is the honest ceiling for a static client-only integration.)
function handleGoogleCredentialResponse(response) {
  try {
    const base64Payload = response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64Payload));
    const email = payload.email;
    const name = payload.name || email;

    state.userProfile.name = name;
    state.userProfile.email = email;
    if (payload.picture) state.userProfile.avatarUrl = payload.picture;

    state.authUser = {
      provider: 'google',
      name,
      email,
      picture: payload.picture || null,
      role: state.authRole,
      createdAt: new Date().toISOString()
    };
    saveAuthUser();
    saveUserProfile();

    state.authNotice = null;
    state.showGoogleFallbackButton = false;
    state.mode = state.authRole;
    state.screen = state.authRole === 'courier' ? 'courier-activity' : 'shopper-shop';

    const inboxTarget = state.authRole === 'courier' ? state.courierInbox : state.shopperInbox;
    if (inboxTarget) {
      inboxTarget.unshift({
        tag: 'Account Verified',
        text: `Welcome ${name}! Signed in with Google (${email}).`,
        createdAt: Date.now(),
        read: false
      });
      saveInbox();
    }
    render();
  } catch (e) {
    state.authNotice = 'Google Sign-In failed to complete. Please try again.';
    render();
  }
}

function initGoogleSignIn() {
  if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
    state.authNotice = 'Google Sign-In library failed to load. Check your connection and try again.';
    render();
    return;
  }
  if (!googleSignInInitialized) {
    google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleGoogleCredentialResponse });
    googleSignInInitialized = true;
  }
  google.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed && (notification.isNotDisplayed() || notification.isSkippedMoment())) {
      state.showGoogleFallbackButton = true;
      render();
    }
  });
}

const actions = {
  logout: () => {
    state.authUser = null;
    state.mode = null;
    state.screen = 'login';
    try { localStorage.removeItem('graftr_auth_user'); } catch(e){}
    render();
  },
  setAuthRole: (role) => {
    state.authRole = role;
    render();
  },
  loginWithEmail: () => {
    state.authProvider = 'email';
    state.authError = null;
    state.showAuthModal = true;
    render();
  },
  setEmailAuthMode: (mode) => {
    state.emailAuthMode = mode;
    state.authError = null;
    render();
  },
  confirmEmailAuthSetup: async () => {
    const emailEl = document.getElementById('email-setup-email');
    const nameEl = document.getElementById('email-setup-name');
    const passwordEl = document.getElementById('email-setup-password');
    const addrEl = document.getElementById('email-setup-address');
    const isLogin = state.emailAuthMode === 'login';

    const email = ((emailEl && emailEl.value.trim()) || '').toLowerCase();
    const password = (passwordEl && passwordEl.value) || '';
    const name = (nameEl && nameEl.value.trim()) || '';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      state.authError = 'Enter a valid email address.';
      render();
      return;
    }
    if (password.length < 6) {
      state.authError = 'Password must be at least 6 characters.';
      render();
      return;
    }
    if (!isLogin && !name) {
      state.authError = 'Enter your full name.';
      render();
      return;
    }

    const accounts = loadEmailAccounts();
    const passwordHash = await hashPassword(password);
    let finalName;

    if (isLogin) {
      const account = accounts[email];
      if (!account) {
        state.authError = 'No account found for this email. Try creating one instead.';
        render();
        return;
      }
      if (account.passwordHash !== passwordHash) {
        state.authError = 'Incorrect password.';
        render();
        return;
      }
      finalName = account.name;
      state.userProfile.name = account.name;
      state.userProfile.email = email;
      if (account.address) state.userProfile.address = account.address;
    } else {
      if (accounts[email]) {
        state.authError = 'An account with this email already exists. Log in instead.';
        render();
        return;
      }
      let address = (addrEl && addrEl.value.trim()) || state.userProfile.address;
      if (state.userProfile.postcode && address.endsWith(', ' + state.userProfile.postcode)) {
        address = address.slice(0, -(', ' + state.userProfile.postcode).length);
      }
      accounts[email] = { name, passwordHash, address, createdAt: new Date().toISOString() };
      saveEmailAccounts(accounts);
      finalName = name;
      state.userProfile.name = name;
      state.userProfile.email = email;
      if (address) state.userProfile.address = address;
    }

    state.authError = null;
    state.authUser = {
      provider: 'email',
      name: finalName,
      email: email,
      role: state.authRole,
      createdAt: new Date().toISOString()
    };
    saveAuthUser();
    saveUserProfile();

    state.showAuthModal = false;
    state.authProvider = null;
    state.mode = state.authRole;
    state.screen = state.authRole === 'courier' ? 'courier-activity' : 'shopper-shop';

    const inboxTarget = state.authRole === 'courier' ? state.courierInbox : state.shopperInbox;
    if (inboxTarget) {
      inboxTarget.unshift({
        tag: 'Account Verified',
        text: isLogin
          ? `Welcome back, ${finalName}! You're logged in as ${email}.`
          : `Welcome ${finalName}! Your email account (${email}) has been created. Fast local delivery is ready!`,
        createdAt: Date.now(),
        read: false
      });
      saveInbox();
    }

    render();
  },
  loginWithGoogle: () => {
    if (!GOOGLE_CLIENT_ID) {
      state.authNotice = "Google Sign-In isn't connected yet — add a Google OAuth Client ID in app.js to enable it. Use Email or guest mode for now.";
      render();
      return;
    }
    state.authNotice = null;
    initGoogleSignIn();
  },
  loginWithApple: () => {
    state.authNotice = "Sign in with Apple isn't available yet — it requires a paid Apple Developer account. Use Google or Email for now.";
    render();
  },
  closeAuthModal: () => {
    state.showAuthModal = false;
    state.authProvider = null;
    state.authError = null;
    render();
  },
  openAddressModal: () => { state.showAddressModal = true; render(); },
  closeAddressModal: () => { state.showAddressModal = false; render(); },
  saveAddressModal: () => {
    saveUserProfile();
    if (state.orders && state.orders.length > 0) {
      state.orders[0].address = `${state.userProfile.address}, ${state.userProfile.postcode}`;
      saveLoggedOrders();
    }
    state.showAddressModal = false;
    render();
  },
  checkout: () => {
    if (cartCount() === 0) return;
    state.showCheckoutModal = true;
    render();
  },
  closeCheckoutModal: () => { state.showCheckoutModal = false; render(); },
  placeOrder: async () => {
    const lines = cartLines();
    if (lines.length === 0 || state.placingOrder) return;
    const sub = cartTotal();
    const deliveryFee = 1.99;

    const snapshot = {
      items: lines.map(l => ({ name: l.product.name, qty: l.qty, price: l.product.estimated_price_gbp })),
      subtotal: sub,
      deliveryFee,
      address: `${state.userProfile.address}, ${state.userProfile.postcode}`,
    };

    state.placingOrder = true;
    render();

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map(l => ({ name: l.product.name, qty: l.qty, unitPrice: l.product.estimated_price_gbp })),
          deliveryFee,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        localStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(snapshot));
        window.location.href = data.url;
        return;
      }
      console.warn('Stripe checkout unavailable, placing a mock order instead:', data.error);
    } catch (err) {
      console.warn('Stripe checkout request failed, placing a mock order instead:', err);
    }

    state.placingOrder = false;
    finalizeOrder(snapshot);
  },
  setOrderStage: (stage) => {
    const order = state.orders.find(o => o.id === state.activeOrderId) || state.orders[0];
    if (!order) return;
    if (stage === 'pending') {
      order.status = 'Pending Courier Acceptance';
      order.courier = null;
    } else if (stage === 'packing') {
      order.status = 'Packing';
      order.courier = 'Alex (E-bike)';
    } else if (stage === 'ontheway') {
      order.status = 'Out for Delivery';
      order.courier = 'Alex (E-bike)';
    } else if (stage === 'delivered') {
      order.status = 'Delivered';
      order.courier = 'Alex (E-bike)';
    }
    saveLoggedOrders();
    render();
  },
  acceptCourierJob: (orderId) => {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'Packing';
      order.courier = 'Alex (E-bike)';
      saveLoggedOrders();
      state.shopperInbox.unshift({
        tag: 'Courier Alert',
        text: `Courier Alex accepted your Order ${order.id}! Packing in progress at Morrisons Daily.`,
        createdAt: Date.now(),
        read: false
      });
      saveInbox();
    }
    state.activeOrderId = orderId;
    state.mode = 'courier';
    state.screen = 'courier-pack';
    render();
  },
  cancelOrder: (id) => {
    const targetId = id || state.activeOrderId;
    const order = state.orders.find(o => o.id === targetId);
    if (order) {
      const hadCourier = !!order.courier;
      order.status = 'Cancelled';
      saveLoggedOrders();
      state.shopperInbox.unshift({
        tag: 'Order Alert',
        text: `Order ${order.id} was successfully cancelled.`,
        createdAt: Date.now(),
        read: false
      });
      if (hadCourier) {
        state.courierInbox.unshift({
          tag: 'Order Alert',
          text: `Order ${order.id} was cancelled by the customer.`,
          createdAt: Date.now(),
          read: false
        });
      }
      saveInbox();
    }
    render();
  },
  deleteOrder: (id) => {
    state.orders = state.orders.filter(o => o.id !== id);
    if (state.activeOrderId === id) {
      state.activeOrderId = state.orders.length > 0 ? state.orders[0].id : null;
    }
    saveLoggedOrders();
    render();
  },
  selectOrderToTrack: (id) => {
    state.activeOrderId = id;
    state.screen = 'shopper-inbox';
    render();
  },
  goTrack: () => { state.screen = 'shopper-inbox'; render(); },
  toggleAiChat: () => {
    state.aiChatOpen = !state.aiChatOpen;
    if (!state.aiChatOpen) stopVoiceRecognition();
    render();
  },
  toggleVoiceInput: () => {
    if (state.aiListening) {
      stopVoiceRecognition();
      render();
    } else {
      startVoiceRecognition();
    }
  },
  sendPresetPrompt: (text) => {
    state.aiInput = text;
    actions.submitAiMessage();
  },
  submitAiMessage: async () => {
    const query = (state.aiInput || '').trim();
    if (!query || state.aiLoading) return;

    state.aiMessages.push({ role: 'user', text: query });
    state.aiInput = '';
    state.aiLoading = true;
    render();

    setTimeout(async () => {
      let replyText = "";
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: query })
        });
        if (res.ok) {
          const data = await res.json();
          replyText = data.reply;
        }
      } catch (err) {
        // Fallback to client query engine
      }

      if (!replyText) {
        replyText = processGraftrAiQuery(query);
      }

      state.aiMessages.push({ role: 'bot', text: replyText });
      state.aiLoading = false;
      render();
    }, 500);
  },
  chooseCourier: () => { state.mode = 'courier'; state.screen = 'courier-activity'; render(); },
  chooseShopper: () => { state.mode = 'shopper'; state.screen = 'shopper-shop'; render(); },
  goActivity: () => { state.screen = 'courier-activity'; render(); },
  goEarnings: () => { state.screen = 'courier-earnings'; render(); },
  goPack: () => { state.screen = 'courier-pack'; render(); },
  goCourierAccount: () => { state.screen = 'courier-account'; render(); },
  goShop: () => { state.screen = 'shopper-shop'; render(); },
  goBrowse: () => { state.screen = 'shopper-browse'; render(); },
  goBrowseCategory: (category) => { state.screen = 'shopper-browse'; state.pendingScrollCategory = category; render(); },
  goBasket: () => { state.screen = 'shopper-basket'; render(); },
  addToCart: (id) => { state.cart[id] = (state.cart[id] || 0) + 1; render(); },
  removeFromCart: (id) => {
    if (!state.cart[id]) return;
    state.cart[id] -= 1;
    if (state.cart[id] <= 0) delete state.cart[id];
    render();
  },
  goShopperInbox: () => { state.screen = 'shopper-inbox'; render(); },
  goShopperAccount: () => { state.screen = 'shopper-account'; render(); },
  logout: () => { state.screen = 'login'; state.mode = null; render(); },
  toggleOnline: () => {
    const todayKey = new Date().toDateString();
    if (state.courierOnlineDayKey !== todayKey) {
      state.courierOnlineDayKey = todayKey;
      state.courierOnlineSecondsToday = 0;
    }
    state.courierOnline = !state.courierOnline;
    if (state.courierOnline) {
      state.courierOnlineSince = Date.now();
      startCourierGpsTracking();
    } else {
      if (state.courierOnlineSince) {
        state.courierOnlineSecondsToday += Math.round((Date.now() - state.courierOnlineSince) / 1000);
      }
      state.courierOnlineSince = null;
      stopCourierGpsTracking();
      state.courierLiveGps = null;
    }
    saveCourierStats();
    render();
  },
  markPickedUp: () => {
    const order = state.orders.find(o => o.status === 'Out for Delivery');
    if (order) {
      order.pickedUp = true;
      saveLoggedOrders();
    }
    render();
  },
  markDelivered: () => {
    const order = state.orders.find(o => o.status === 'Out for Delivery');
    if (order) {
      order.status = 'Delivered';
      order.pickedUp = false;
      order.deliveredAt = Date.now();
      saveLoggedOrders();
      state.justDeliveredOrderId = order.id;
      state.shopperInbox.unshift({
        tag: 'Courier Alert',
        text: `Your order ${order.id} from ${order.merchant} has been delivered! Enjoy.`,
        createdAt: Date.now(),
        read: false,
      });
      saveInbox();
    }
    render();
  },
  dismissDeliveryConfirmation: () => {
    state.justDeliveredOrderId = null;
    render();
  },
  addTip: (amount) => {
    const order = state.orders.find(o => o.id === state.activeOrderId) || state.orders[0];
    if (!order || order.status !== 'Delivered' || order.tip) return;
    order.tip = Number(amount) || 0;
    saveLoggedOrders();
    if (order.tip > 0) {
      state.courierInbox.unshift({
        tag: 'Tip Received',
        text: `${state.userProfile.name} tipped £${order.tip.toFixed(2)} on order ${order.id}. Nice work!`,
        createdAt: Date.now(),
        read: false,
      });
      saveInbox();
    }
    render();
  },
  openScanner: (index) => {
    state.scanFeedback = null;
    state.manualBarcodeInput = '';
    state.scanningBarcodeIndex = index;
    render();
  },
  closeScanner: () => {
    stopCameraScanner();
    state.scanFeedback = null;
    state.scanningBarcodeIndex = null;
    render();
  },
  submitManualBarcode: (index) => {
    const value = (state.manualBarcodeInput || '').trim();
    if (!value) return;
    const isMatch = compareScannedBarcode(index, value);
    state.manualBarcodeInput = '';
    actions.processBarcodeScanned(index, isMatch, value);
  },
  processBarcodeScanned: (index, isMatch, scannedVal) => {
    const item = state.packItems ? state.packItems[index] : null;
    if (!item) return;

    if (isMatch) {
      playMatchSound();
      item.checked = true;
      updateScanFeedbackUI({ type: 'match', message: `✅ MATCH VERIFIED! ${item.name}` });
      setTimeout(() => {
        stopCameraScanner();
        state.scanFeedback = null;
        state.scanningBarcodeIndex = null;
        render();
      }, 1100);
    } else {
      playMismatchSound();
      const scannedNote = scannedVal ? ` (scanned ${scannedVal}, expected ${item.barcode})` : '';
      updateScanFeedbackUI({ type: 'mismatch', message: `⚠️ WRONG PRODUCT!${scannedNote}` });
    }
  },
  completePackingJob: () => {
    const activeOrder = state.orders.find(o => o.status !== 'Cancelled' && o.status !== 'Delivered');
    if (activeOrder) {
      activeOrder.status = 'Out for Delivery';
      activeOrder.courier = 'Alex (E-bike)';
      saveLoggedOrders();
      state.shopperInbox.unshift({
        tag: 'Courier Alert',
        text: `Courier Alex finished packing your items at Morrisons Daily! Out for delivery now.`,
        createdAt: Date.now(),
        read: false
      });
      saveInbox();
    }
    state.screen = 'courier-activity';
    render();
  },
  setEarningsTab: (tab) => {
    state.earningsTab = tab;
    render();
  },
  cashOut: () => {
    const data = getCourierEarningsData();
    if (data.pendingPayout <= 0) return;
    const ref = 'PAY-' + Math.floor(89000 + Math.random() * 1000);
    const payoutAmount = data.pendingPayout;
    state.lastCashOutAt = Date.now();
    if (!state.payoutHistory) state.payoutHistory = [];
    state.payoutHistory.unshift({
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      amount: `£${payoutAmount.toFixed(2)}`,
      status: 'Transferring to Barclays (****4892) ✓',
      ref: ref
    });
    saveCourierStats();
    state.courierInbox.unshift({
      tag: 'Payout Alert',
      text: `Cash out request of £${payoutAmount.toFixed(2)} sent to Barclays (****4892). Ref: ${ref}`,
      createdAt: Date.now(),
      read: false
    });
    saveInbox();
    render();
  },
  toggleDeliveryLater: () => { state.deliveryLater = !state.deliveryLater; render(); },
  toggleCourierRead: (i) => { state.courierInbox[i].read = !state.courierInbox[i].read; saveInbox(); render(); },
  toggleShopperRead: (i) => { state.shopperInbox[i].read = !state.shopperInbox[i].read; saveInbox(); render(); },
  markAllCourierRead: () => { state.courierInbox.forEach(m => m.read = true); saveInbox(); render(); },
  markAllShopperRead: () => { state.shopperInbox.forEach(m => m.read = true); saveInbox(); render(); },
  newBasket: () => { state.basketCheckedOut = false; state.cart = {}; render(); },
  emptyBasket: () => { state.cart = {}; render(); },
  advanceTrack: () => { state.trackStep = Math.min(state.trackStep + 1, 3); render(); },
  goSpecialRequest: (prefill) => {
    state.screen = 'shopper-special-request';
    if (prefill) state.specialRequest.productName = prefill;
    render();
  },
  setStockStatus: (status) => { state.specialRequest.stockStatus = status; render(); },
  submitSpecialRequest: () => {
    if (!state.specialRequest.productName.trim()) return;
    state.specialRequest.submitted = true;
    render();
  },
  newSpecialRequest: () => {
    state.specialRequest = {
      productName: '', productUrl: '', storeLocation: '', stockStatus: null, screenshot: null, submitted: false,
    };
    render();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  root = document.getElementById('app');
  root.addEventListener('click', (e) => {
    if (e.target.closest('.card-image') || e.target.closest('.product-thumb')) return;
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = actions[el.dataset.action];
    if (!action) return;
    const arg = el.dataset.arg;
    const parsedArg = arg === undefined ? undefined : (/^-?\d+$/.test(arg) ? Number(arg) : arg);
    action(parsedArg);
  });
  root.addEventListener('change', (e) => {
    const cardInput = e.target.closest('input[type="file"][data-upload]');
    if (cardInput && cardInput.files[0]) {
      const key = cardInput.dataset.upload;
      const reader = new FileReader();
      reader.onload = () => {
        state.shopImages[key] = reader.result;
        saveShopImages();
        render();
      };
      reader.readAsDataURL(cardInput.files[0]);
      return;
    }
    const productInput = e.target.closest('input[type="file"][data-upload-product]');
    if (productInput && productInput.files[0]) {
      const id = productInput.dataset.uploadProduct;
      const reader = new FileReader();
      reader.onload = () => {
        state.productImages[id] = reader.result;
        saveProductImages();
        render();
      };
      reader.readAsDataURL(productInput.files[0]);
      return;
    }
    const screenshotInput = e.target.closest('input[type="file"][data-upload-screenshot]');
    if (screenshotInput && screenshotInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        state.specialRequest.screenshot = reader.result;
        render();
      };
      reader.readAsDataURL(screenshotInput.files[0]);
    }
  });
  root.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.id === 'ai-chat-input') {
      e.preventDefault();
      actions.submitAiMessage();
    }
    if (e.key === 'Enter' && e.target.id === 'manual-barcode-input' && typeof state.scanningBarcodeIndex === 'number') {
      e.preventDefault();
      actions.submitManualBarcode(state.scanningBarcodeIndex);
    }
  });
  root.addEventListener('input', (e) => {
    const el = e.target.closest('[data-bind]');
    if (!el) return;
    const path = el.dataset.bind;
    if (path === 'searchQuery') {
      state.searchQuery = el.value;
    } else if (path === 'aiInput') {
      state.aiInput = el.value;
    } else if (path === 'manualBarcodeInput') {
      state.manualBarcodeInput = el.value;
    } else if (path.startsWith('profile.')) {
      const field = path.replace('profile.', '');
      state.userProfile[field] = el.value;
      saveUserProfile();
    } else {
      const m = /^specialRequest\.(\w+)$/.exec(path);
      if (m) state.specialRequest[m[1]] = el.value;
    }
    const id = el.id;
    const selStart = el.selectionStart;
    const selEnd = el.selectionEnd;
    render();
    if (id) {
      const same = document.getElementById(id);
      if (same) {
        same.focus();
        try { same.setSelectionRange(selStart, selEnd); } catch (err) { /* not a text-selectable input */ }
      }
    }
  });
  checkStripeRedirectResult();
  render();
});
