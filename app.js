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
//    (e.g. https://vendaru.com and http://localhost:8126 for local testing).
// 2. Paste the Client ID below. It's a public identifier, safe to ship in client code
//    (unlike the Stripe secret key, this one isn't a secret).
const GOOGLE_CLIENT_ID = '310040090151-6llrfgdqkg0vamomn9fdqnbiml3anv5k.apps.googleusercontent.com';

const EMPTY_PROFILE = {
  name: '', email: '', phone: '', address: '', city: '', postcode: '', instructions: ''
};

// A new account starts blank. Details arrive from Google or the email sign-up
// form, and anything still missing is asked for before an order can be placed.
function loadUserProfile() {
  try {
    const saved = localStorage.getItem('graftr_user_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') return Object.assign({}, EMPTY_PROFILE, parsed);
    }
  } catch (e) { /* ignore corrupt storage */ }
  return Object.assign({}, EMPTY_PROFILE);
}

// Ordering needs somewhere to deliver to and a way to reach the customer.
const REQUIRED_PROFILE_FIELDS = [
  { key: 'email', label: 'Email address' },
  { key: 'phone', label: 'Mobile number' },
  { key: 'address', label: 'Street address' },
  { key: 'postcode', label: 'Postcode' },
];

function missingProfileFields() {
  const p = state.userProfile || {};
  return REQUIRED_PROFILE_FIELDS.filter(f => !String(p[f.key] || '').trim());
}

function saveUserProfile() {
  try { localStorage.setItem('graftr_user_profile', JSON.stringify(state.userProfile)); } catch(e){}
}

function loadLoggedOrders() {
  try {
    const saved = localStorage.getItem('graftr_logged_orders');
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.filter(o => o.address && !o.address.includes('Kingsdown'));
      }
    }
  } catch(e){}
  return [];
}

function saveLoggedOrders() {
  try { localStorage.setItem('graftr_logged_orders', JSON.stringify(state.orders)); } catch(e){}
}

// ---- Loyalty card -------------------------------------------------------
// A stamp per delivered order of £30+. Stamps are derived from the orders
// themselves rather than kept as a counter, so an order that's cancelled or
// never delivered simply stops counting — nothing to unwind by hand. Only the
// number already spent on rewards is stored.
const LOYALTY_MIN_ORDER = 30;
const LOYALTY_STAMPS_PER_REWARD = 6;
const LOYALTY_REWARD_MAX = 5;

function loadLoyaltyRedeemed() {
  try {
    const saved = localStorage.getItem('graftr_loyalty');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed.redeemed === 'number') return Math.max(0, parsed.redeemed);
    }
  } catch (e) { /* ignore corrupt storage */ }
  return 0;
}

function saveLoyalty() {
  try {
    localStorage.setItem('graftr_loyalty', JSON.stringify({ redeemed: state.loyaltyRedeemed }));
  } catch (e) { /* ignore write failure */ }
}

function qualifyingOrderCount() {
  return (state.orders || []).filter(o =>
    o.status === 'Delivered' && (o.total || 0) >= LOYALTY_MIN_ORDER
  ).length;
}

function loyaltyState() {
  const earned = qualifyingOrderCount();
  // A reward sitting unpaid in the basket is reserved, not spent: it counts
  // against the balance so you can't claim two, but it's released the moment
  // the item leaves the basket.
  const spent = ((state.loyaltyRedeemed || 0) + loyaltyPendingFree()) * LOYALTY_STAMPS_PER_REWARD;
  // If stamps vanish (an order was cancelled after a reward was claimed) the
  // balance can go negative — clamp so the card never shows nonsense.
  const available = Math.max(0, earned - spent);
  return {
    earned,
    stamps: available % LOYALTY_STAMPS_PER_REWARD,
    rewardsReady: Math.floor(available / LOYALTY_STAMPS_PER_REWARD),
    redeemed: state.loyaltyRedeemed || 0,
  };
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

  // A scheduled order waits out of the courier pool until its window is close.
  // If the chosen slot is already within the lead time it just goes live now.
  const scheduledAt = snapshot.scheduledAt || null;
  const holdUntilLater = !!scheduledAt && Date.now() < scheduledAt - SCHEDULE_RELEASE_LEAD_MS;

  // A basket of service bookings alone is never handed to a courier.
  const bookedServices = snapshot.bookings || [];
  const hasDelivery = (snapshot.items || []).length > 0;

  const newOrder = {
    id: newId,
    merchant: hasDelivery
      ? 'Morrisons Daily'
      : (bookedServices.length === 1 ? bookedServices[0].businessName : 'Local services'),
    timestamp: 'Just now',
    createdAt: Date.now(),
    items: snapshot.items,
    bookings: bookedServices,
    subtotal: snapshot.subtotal,
    deliveryFee: snapshot.deliveryFee,
    total: snapshot.subtotal + snapshot.deliveryFee,
    status: !hasDelivery ? 'Booked'
      : holdUntilLater ? 'Scheduled'
      : 'Pending Courier Acceptance',
    address: snapshot.address,
    courier: null,
    tip: 0,
    scheduledAt,
    scheduledFor: scheduledAt ? scheduleLabelFor(scheduledAt) : null,
    loyaltyDiscount: snapshot.loyaltyDiscount || 0,
  };
  state.orders.unshift(newOrder);
  state.activeOrderId = newId;

  // The order is real now, so the reserved rewards are finally spent.
  if (snapshot.loyaltyUsed) {
    state.loyaltyRedeemed = (state.loyaltyRedeemed || 0) + snapshot.loyaltyUsed;
    saveLoyalty();
  }
  // Paid bookings become real appointments the business can see and work.
  bookedServices.forEach((bk, i) => {
    state.bookings.unshift({
      id: `bk-${Date.now().toString(36)}-${i}`,
      orderId: newId,
      businessId: bk.businessId,
      businessName: bk.businessName,
      serviceId: bk.serviceId,
      serviceName: bk.serviceName,
      price: bk.price,
      scheduledAt: bk.at,
      customerName: state.userProfile.name || '',
      customerPhone: state.userProfile.phone || '',
      customerAddress: snapshot.address || '',
      status: 'Confirmed',
      createdAt: Date.now(),
    });
    logBusinessMessage(bk.businessId, 'New booking',
      `${bk.serviceName} booked for ${scheduleLabelFor(bk.at)} by ${state.userProfile.name || 'a customer'} — £${(bk.price || 0).toFixed(2)}.`);
  });
  if (bookedServices.length) saveBookings();

  // The shop the groceries came from gets the order on its own account.
  if (hasDelivery) {
    const itemCount = (snapshot.items || []).reduce((s, i) => s + (i.qty || 1), 0);
    logBusinessMessage(merchantBusinessId(newOrder.merchant), 'New order',
      `Order ${newId} — ${itemCount} item${itemCount === 1 ? '' : 's'}, £${newOrder.total.toFixed(2)}, to ${snapshot.address}.`);
  }
  state.bookingCart = [];

  state.loyaltyFree = {};
  state.cart = {};
  state.showCheckoutModal = false;
  state.mode = 'shopper';

  // Don't carry the schedule over into the next basket.
  state.deliveryLater = false;
  state.deliverySlot = null;
  state.deliveryDayOffset = 0;

  saveLoggedOrders();
  state.shopperInbox.unshift({
    tag: !hasDelivery ? 'Booking' : 'Order Alert',
    text: !hasDelivery
      ? `${bookedServices.length} booking${bookedServices.length === 1 ? '' : 's'} confirmed — £${newOrder.total.toFixed(2)}. ${bookedServices.length === 1 ? bookedServices[0].businessName + ' has' : 'The businesses have'} your details.`
      : holdUntilLater
        ? `Order ${newOrder.id} scheduled for ${newOrder.scheduledFor} — £${newOrder.total.toFixed(2)}. We'll line up a courier nearer the time.`
        : `Order ${newOrder.id} confirmed — £${newOrder.total.toFixed(2)}. We're finding you a courier.`,
    createdAt: Date.now(),
    read: false,
  });
  // Bookings never reach the courier pool, and a scheduled order isn't offered
  // yet — that alert fires when it's released, otherwise couriers would see a
  // job they can't start for two days.
  if (hasDelivery && !holdUntilLater) {
    state.courierInbox.unshift({
      tag: 'Job alert',
      text: `New job available: ${newOrder.merchant} → ${newOrder.address}, £${newOrder.deliveryFee.toFixed(2)}`,
      createdAt: Date.now(),
      read: false,
    });
  }
  saveInbox();
  state.screen = 'shopper-inbox';
  render();
}

// Cleared if the redirect to Stripe actually happens; fires otherwise so the
// Pay button can't stay stuck on "Redirecting…".
let redirectWatchdog = null;

// No payment backend at all — either the endpoint isn't deployed (404) or the
// server has no STRIPE_SECRET_KEY. That's the demo setup, not a failed payment,
// so the order still goes through as a mock. A real payment error (a decline,
// a Stripe fault) is a different thing and must not quietly create an order.
function isPaymentBackendUnavailable(res, data) {
  if (res && res.status === 404) return true;
  return !!(data && typeof data.error === 'string' && /not configured/i.test(data.error));
}

function checkStripeRedirectResult() {
  const params = new URLSearchParams(window.location.search);

  // Coming back from subscribing to a listing plan.
  const plan = params.get('plan');
  if (plan) {
    const raw = localStorage.getItem(PENDING_PLAN_KEY);
    if (plan === 'success' && raw) {
      try { applyPlan(JSON.parse(raw)); } catch (e) { /* malformed, nothing to apply */ }
    } else {
      state.planError = plan === 'cancelled' ? 'Subscription cancelled — you have not been charged.' : null;
      state.businessTab = 'plan';
    }
    state.subscribing = false;
    try { localStorage.removeItem(PENDING_PLAN_KEY); } catch (e) { /* ignore */ }
    window.history.replaceState({}, '', window.location.pathname);
    return;
  }

  const payment = params.get('payment');
  if (!payment) return;

  if (payment === 'success') {
    const raw = localStorage.getItem(PENDING_ORDER_KEY);
    if (raw) {
      try {
        finalizeOrder(JSON.parse(raw));
      } catch (e) { /* malformed snapshot, nothing to recover */ }
    }
    localStorage.removeItem(PENDING_ORDER_KEY);
  } else {
    // Cancelled or abandoned at Stripe: drop the snapshot so it can't be
    // finalised later, and put the checkout back in a usable state.
    localStorage.removeItem(PENDING_ORDER_KEY);
    state.placingOrder = false;
    state.checkoutError = 'Payment was cancelled — you have not been charged.';
    state.showCheckoutModal = true;
  }
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

// The URL decides which of the two apps you're in: /courier is the courier
// app, everything else is the customer app. Both are served from the same
// origin on purpose — all state lives in localStorage, which is per-origin,
// so a split across domains or subdomains would stop the courier from ever
// seeing a customer's order. Same origin keeps that loop working.
const ROLE_PATH = '/courier';
const BUSINESS_PATH = '/business';

const CURRENT_PATH = window.location.pathname.replace(/\/+$/, '').toLowerCase();
const PATH_ROLE = CURRENT_PATH === ROLE_PATH ? 'courier'
  : CURRENT_PATH === BUSINESS_PATH ? 'business'
  : 'shopper';

function roleHome(role) {
  if (role === 'courier') return ROLE_PATH;
  if (role === 'business') return BUSINESS_PATH;
  return '/';
}

// ---------------------------------------------------------------------------
// Local services marketplace
//
// The platform is no longer only groceries: businesses list themselves under a
// category, get a page of their own, and sell bookable services. A booking is
// just another line in the basket, so it pays through the same Stripe checkout
// the shopping does.
// ---------------------------------------------------------------------------

// Ordered by how often people actually look for them, since this order drives
// the row across the top of the Shop page.
const SERVICE_CATEGORIES = [
  { id: 'trades', label: 'Trades', emoji: '🔧' },
  { id: 'real-estate', label: 'Real estate', emoji: '🏠' },
  { id: 'auto', label: 'Automotive', emoji: '🚗' },
  { id: 'beauty', label: 'Hair & beauty', emoji: '💇' },
  { id: 'health', label: 'Health', emoji: '🩺' },
  { id: 'cleaning', label: 'Cleaning', emoji: '🧽' },
  { id: 'dog-walkers', label: 'Dog walkers', emoji: '🐕' },
  { id: 'pets', label: 'Pets', emoji: '🐾' },
  { id: 'tutoring', label: 'Tutoring', emoji: '📚' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'legal', label: 'Legal & Tax', emoji: '⚖️' },
  { id: 'events', label: 'Events', emoji: '🎉' },
];

function serviceCategory(id) {
  return SERVICE_CATEGORIES.find(c => c.id === id) || null;
}

// --- listing plans ---------------------------------------------------------
//
// What a business pays for is how their card looks and where it sits. Basic is
// the compact logo-and-text row; Featured upgrades it to the full banner card;
// Priority additionally pins it above everyone else. Annual is ten months'
// money for twelve.

const BUSINESS_TIERS = [
  {
    id: 'basic', label: 'Basic', monthly: 9, annual: 90, rank: 0,
    card: 'compact',
    summary: 'Logo-and-text card in your category',
    features: ['Listed in your category', 'Compact logo and text card', 'Bookable services and enquiries'],
  },
  {
    id: 'featured', label: 'Featured', monthly: 24, annual: 240, rank: 1,
    card: 'large',
    summary: 'Full banner card, shown on the home screen',
    features: ['Everything in Basic', 'Full-width banner card with your photo', 'Shown on the Vendaru home screen'],
  },
  {
    id: 'priority', label: 'Priority', monthly: 49, annual: 490, rank: 2,
    card: 'large',
    summary: 'Banner card pinned above every other listing',
    features: ['Everything in Featured', 'Pinned to the top of your category', 'First on the home screen'],
  },
];

const DEFAULT_TIER = 'basic';

function tierById(id) {
  return BUSINESS_TIERS.find(t => t.id === id) || BUSINESS_TIERS[0];
}

function tierOf(business) {
  return tierById((business && business.tier) || DEFAULT_TIER);
}

function tierPrice(tier, billing) {
  return billing === 'annual' ? tier.annual : tier.monthly;
}

// Higher tiers first, then most recently listed. Used everywhere a set of
// listings is shown, so paid placement is consistent across the app.
function byTierThenRecency(a, b) {
  const diff = tierOf(b).rank - tierOf(a).rank;
  if (diff !== 0) return diff;
  return (b.createdAt || 0) - (a.createdAt || 0);
}

function billingLabel(billing) {
  return billing === 'annual' ? 'a year' : 'a month';
}

const PENDING_PLAN_KEY = 'graftr_pending_plan';

// Puts a paid-for plan onto the listing. Called on return from Stripe, or
// straight away when there's no billing backend to redirect to.
function applyPlan(pending) {
  const b = businessById(pending && pending.businessId);
  if (!b) return false;
  b.tier = pending.tier;
  b.billing = pending.billing;
  b.subscribedAt = Date.now();
  saveBusinesses();
  const t = tierById(pending.tier);
  state.businessNotice = {
    tone: 'ok',
    text: `${b.name} is on the ${t.label} plan — £${tierPrice(t, pending.billing)} ${billingLabel(pending.billing)}. ${t.summary}.`,
  };
  state.businessTab = 'page';
  state.planChoice = null;
  try { localStorage.removeItem(PENDING_PLAN_KEY); } catch (e) { /* ignore */ }
  return true;
}

const BUSINESSES_KEY = 'graftr_businesses';
const BOOKINGS_KEY = 'graftr_bookings';

// Bumped when the shipped listings change in a way that has to reach browsers
// that already saved the old set. Storage written before this version is
// cleared once, so retired demo listings don't linger on anyone's device.
const BUSINESS_SEED_VERSION = 15;
const BUSINESS_SEED_VERSION_KEY = 'graftr_businesses_seed_version';

// Verified UK Business Directory listings.
const SEED_BUSINESSES = [
  {
    "id": "biz-checkatrade",
    "ownerEmail": null,
    "name": "Checkatrade",
    "category": "trades",
    "tagline": "Where reputation matters — Find vetted UK builders & plumbers",
    "about": "Checkatrade is Britain's leading directory for vetted tradespeople. Every electrician, plumber, and builder undergoes over 12 rigorous background checks before joining.",
    "area": "Portsmouth & UK Wide",
    "phone": "0800 015 4550",
    "websiteUrl": "https://www.checkatrade.com",
    "domain": "checkatrade.com",
    "logoSrc": "https://logo.clearbit.com/checkatrade.com",
    "coverSrc": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4000-0",
        "name": "Post a Job & Match Vetted Local Trades",
        "description": "Post your home project and receive quotes from checked local contractors.",
        "price": 0,
        "durationMins": 30
      },
      {
        "id": "s-4000-1",
        "name": "Verified Trade On-Site Inspection",
        "description": "In-person assessment and written estimate by a registered trade.",
        "price": 45,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-mybuilder",
    "ownerEmail": null,
    "name": "MyBuilder",
    "category": "trades",
    "tagline": "The reliable way to hire verified tradespeople",
    "about": "MyBuilder matches home improvement projects with local, vetted tradespeople backed by authentic customer reviews across England, Scotland and Wales.",
    "area": "London & UK Wide",
    "phone": "0800 018 8297",
    "websiteUrl": "https://www.mybuilder.com",
    "domain": "mybuilder.com",
    "logoSrc": "assets/business/mybuilder-logo.png",
    "coverSrc": "assets/business/mybuilder-cover.jpg",
    "services": [
      {
        "id": "s-4001-0",
        "name": "Post a Job & Get 3 Verified Quotes",
        "description": "Post details of your building, plumbing or electrical work.",
        "price": 0,
        "durationMins": 30
      },
      {
        "id": "s-4001-1",
        "name": "Building Project Initial Consultation",
        "description": "On-site scope analysis and price breakdown.",
        "price": 35,
        "durationMins": 45
      }
    ],
    "gallery": [
      "assets/business/mybuilder-cover.jpg",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-timpson",
    "ownerEmail": null,
    "name": "Timpson",
    "category": "trades",
    "tagline": "Great service by great people — Emergency locksmiths & key cutting",
    "about": "Timpson is Britain's most trusted high-street repairer with over 2,000 branches. Offers 24/7 mobile emergency locksmith callouts, house & car key cutting, and watch servicing.",
    "area": "Wythenshawe, Manchester & 2,000 UK Branches",
    "phone": "0161 946 6200",
    "websiteUrl": "https://www.timpson.co.uk",
    "domain": "timpson.co.uk",
    "logoSrc": "https://logo.clearbit.com/timpson.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4002-0",
        "name": "24/7 Emergency Mobile Locksmith Callout",
        "description": "Fast-response mobile locksmith service for gain entry and lock changes.",
        "price": 79,
        "durationMins": 45
      },
      {
        "id": "s-4002-1",
        "name": "Watch Battery Replacement & Pressure Re-Seal",
        "description": "Swiss watch battery replacement with water-resistance testing.",
        "price": 15,
        "durationMins": 15
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-pimlico-plumbers",
    "ownerEmail": null,
    "name": "Pimlico Plumbers",
    "category": "trades",
    "tagline": "London's leading plumbing, heating & drain specialist",
    "about": "Pimlico Plumbers provides 24/7 emergency plumbing, heating installations, electrical work and drainage solutions across Greater London and the Home Counties.",
    "area": "Sail Street, London & Home Counties",
    "phone": "020 7928 8888",
    "websiteUrl": "https://www.pimlicoplumbers.com",
    "domain": "pimlicoplumbers.com",
    "logoSrc": "https://logo.clearbit.com/pimlicoplumbers.com",
    "coverSrc": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4003-0",
        "name": "24/7 Emergency Plumbing Callout",
        "description": "Immediate response for burst pipes, leaks, and central heating failures.",
        "price": 120,
        "durationMins": 60
      },
      {
        "id": "s-4003-1",
        "name": "Boiler Safety Inspection & Gas Service",
        "description": "Complete Gas Safe inspection and boiler tune-up.",
        "price": 95,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-homeserve-uk",
    "ownerEmail": null,
    "name": "Homeserve UK",
    "category": "trades",
    "tagline": "Home emergency cover, boiler installations & repairs",
    "about": "HomeServe is one of the UK's leading home emergency cover providers, fixing plumbing, drainage, electrical and heating problems for over 2 million customers.",
    "area": "Walsall & UK Wide",
    "phone": "0800 694 4167",
    "websiteUrl": "https://www.homeserve.co.uk",
    "domain": "homeserve.co.uk",
    "logoSrc": "https://logo.clearbit.com/homeserve.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4004-0",
        "name": "Annual Boiler Service & Health Check",
        "description": "Certified Gas Safe inspection and efficiency report.",
        "price": 89,
        "durationMins": 45
      },
      {
        "id": "s-4004-1",
        "name": "Electrical Wiring Diagnostic Survey",
        "description": "Consumer unit and home wiring fault finding.",
        "price": 75,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-dyno-rod-plumbing-drainage",
    "ownerEmail": null,
    "name": "Dyno-Rod Plumbing & Drainage",
    "category": "trades",
    "tagline": "24/7 unblocking drains & emergency plumbing",
    "about": "Dyno-Rod is the UK's largest emergency plumbing and drain unblocking specialist, using high-pressure jetting and CCTV drain surveys nationwide.",
    "area": "UK Nationwide",
    "phone": "0800 52 64 89",
    "websiteUrl": "https://www.dyno.com",
    "domain": "dyno.com",
    "logoSrc": "https://logo.clearbit.com/dyno.com",
    "coverSrc": "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4005-0",
        "name": "Emergency Drain Jetting & Clearance",
        "description": "High-pressure water jet unblocking of main sewer and waste pipes.",
        "price": 110,
        "durationMins": 60
      },
      {
        "id": "s-4005-1",
        "name": "CCTV Drain Inspection Camera Survey",
        "description": "HD camera survey to identify root ingress, cracks and blockages.",
        "price": 135,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-baxi-boilers-uk",
    "ownerEmail": null,
    "name": "Baxi Boilers UK",
    "category": "trades",
    "tagline": "British manufactured boilers & heating solutions",
    "about": "Baxi has been manufacturing smart boilers in the UK since 1866, delivering reliable gas, combi, and heat pump heating systems supported by nationwide engineers.",
    "area": "Warwick & UK Wide",
    "phone": "0344 871 1525",
    "websiteUrl": "https://www.baxi.co.uk",
    "domain": "baxi.co.uk",
    "logoSrc": "https://logo.clearbit.com/baxi.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4006-0",
        "name": "Baxi Combi Boiler Installation Quote",
        "description": "On-site survey for new A-rated energy efficient Baxi boiler replacement.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4006-1",
        "name": "Official Manufacturer Annual Service",
        "description": "Baxi engineer annual maintenance to protect boiler warranty.",
        "price": 99,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-british-gas-homecare-services",
    "ownerEmail": null,
    "name": "British Gas Homecare Services",
    "category": "trades",
    "tagline": "Britain's favorite energy & home maintenance company",
    "about": "British Gas provides heating, plumbing, electrical and gas repairs across the UK with a team of 6,000+ Gas Safe registered engineers.",
    "area": "UK Nationwide",
    "phone": "0333 202 9802",
    "websiteUrl": "https://www.britishgas.co.uk",
    "domain": "britishgas.co.uk",
    "logoSrc": "https://logo.clearbit.com/britishgas.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4007-0",
        "name": "Gas Safe Annual Boiler Service",
        "description": "Comprehensive safety inspection and combustion test.",
        "price": 90,
        "durationMins": 45
      },
      {
        "id": "s-4007-1",
        "name": "Smart Hive Thermostat Installation",
        "description": "Supply and professional fitting of wireless Hive heating control.",
        "price": 199,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-screwfix-trade-direct",
    "ownerEmail": null,
    "name": "Screwfix Trade Direct",
    "category": "trades",
    "tagline": "The UK's top trade tool & hardware supplier",
    "about": "Screwfix supplies UK builders, plumbers, and electricians with over 40,000 tools, electrical fittings, plumbing supplies, and workwear across 800+ stores.",
    "area": "Yeovil & 800+ UK Stores",
    "phone": "03330 112 112",
    "websiteUrl": "https://www.screwfix.com",
    "domain": "screwfix.com",
    "logoSrc": "https://logo.clearbit.com/screwfix.com",
    "coverSrc": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4008-0",
        "name": "Trade Account On-Site Click & Collect",
        "description": "1-minute click and collect for professional trade materials.",
        "price": 0,
        "durationMins": 15
      },
      {
        "id": "s-4008-1",
        "name": "Bulk Trade Order Site Delivery",
        "description": "Same-day direct delivery to UK construction sites.",
        "price": 15,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-travis-perkins-building-supplies",
    "ownerEmail": null,
    "name": "Travis Perkins Building Supplies",
    "category": "trades",
    "tagline": "The UK's largest building materials merchant",
    "about": "Travis Perkins has supplied the UK construction industry for over 200 years with timber, bricks, paving, drylining, and heavy building supplies across 500+ branches.",
    "area": "Northampton & 500+ UK Branches",
    "phone": "0330 123 3846",
    "websiteUrl": "https://www.travisperkins.co.uk",
    "domain": "travisperkins.co.uk",
    "logoSrc": "https://logo.clearbit.com/travisperkins.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4009-0",
        "name": "Building Project Material Take-Off & Estimating",
        "description": "Architectural drawing material calculation for site builds.",
        "price": 0,
        "durationMins": 60
      },
      {
        "id": "s-4009-1",
        "name": "Hiab Crane Site Delivery Service",
        "description": "Heavy timber and brick crane unloading directly to site.",
        "price": 25,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-purplebricks",
    "ownerEmail": null,
    "name": "Purplebricks",
    "category": "real-estate",
    "tagline": "The UK's leading online estate agency",
    "about": "Purplebricks revolutionized UK home sales by offering expert local estate agents combined with fair transparent fees and 24/7 online property tracking.",
    "area": "Solihull & UK Wide",
    "phone": "0800 810 8008",
    "websiteUrl": "https://www.purplebricks.co.uk",
    "domain": "purplebricks.co.uk",
    "logoSrc": "https://logo.clearbit.com/purplebricks.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4010-0",
        "name": "Free In-Person Home Valuation",
        "description": "Local estate agent property appraisal and market pricing strategy.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4010-1",
        "name": "Full Property Sales Package & Rightmove Listing",
        "description": "Professional photography, floorplan, virtual tour and portal listings.",
        "price": 999,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-yopa-estate-agents",
    "ownerEmail": null,
    "name": "Yopa Estate Agents",
    "category": "real-estate",
    "tagline": "Sell your home with Yopa — Fair fixed fees",
    "about": "Yopa connects UK sellers with dedicated local estate agents offering award-winning property sales, fixed fee savings, and Rightmove & Zoopla advertising.",
    "area": "London & UK Wide",
    "phone": "0333 305 0202",
    "websiteUrl": "https://www.yopa.co.uk",
    "domain": "yopa.co.uk",
    "logoSrc": "assets/business/yopa-logo.png",
    "coverSrc": "assets/business/yopa-cover.jpg",
    "services": [
      {
        "id": "s-4011-0",
        "name": "Expert Home Appraisal & Valuation",
        "description": "Comprehensive market comparison and property valuation.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4011-1",
        "name": "Yopa Fixed Fee Sales Package",
        "description": "Dedicated agent, Rightmove & Zoopla listing, and offer negotiation.",
        "price": 990,
        "durationMins": 60
      }
    ],
    "gallery": [
      "assets/business/yopa-cover.jpg",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-savills-property",
    "ownerEmail": null,
    "name": "Savills Property",
    "category": "real-estate",
    "tagline": "Global estate agency & premium UK luxury homes",
    "about": "Savills is one of the world's leading real estate advisers, offering prime residential sales, lettings, agricultural land sales, and commercial property advice.",
    "area": "Mayfair, London & UK Wide",
    "phone": "020 7409 8885",
    "websiteUrl": "https://www.savills.co.uk",
    "domain": "savills.co.uk",
    "logoSrc": "https://logo.clearbit.com/savills.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4012-0",
        "name": "Prime Residential Property Consultation",
        "description": "Discreet valuation and marketing strategy for premium UK properties.",
        "price": 0,
        "durationMins": 60
      },
      {
        "id": "s-4012-1",
        "name": "Bespoke Landlord Property Management",
        "description": "Complete tenancy management and high-net-worth tenant vetting.",
        "price": 150,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-foxtons-estate-agents",
    "ownerEmail": null,
    "name": "Foxtons Estate Agents",
    "category": "real-estate",
    "tagline": "London's leading real estate network",
    "about": "Foxtons is London's most recognized estate agency, operating dozens of high-profile offices providing residential sales, lettings, and property management.",
    "area": "London & South East",
    "phone": "020 7893 6000",
    "websiteUrl": "https://www.foxtons.co.uk",
    "domain": "foxtons.co.uk",
    "logoSrc": "https://logo.clearbit.com/foxtons.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4013-0",
        "name": "London Property Market Valuation",
        "description": "In-depth London property pricing and demand assessment.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4013-1",
        "name": "Lettings & Tenant Finder Service",
        "description": "Comprehensive tenant vetting, referencing, and lease drafting.",
        "price": 250,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-belvoir-property-management",
    "ownerEmail": null,
    "name": "Belvoir Property Management",
    "category": "real-estate",
    "tagline": "Property management & letting specialists",
    "about": "Belvoir operates over 170 nationwide offices managing thousands of residential letting properties for landlords and property investors.",
    "area": "Grantham & 170+ UK Offices",
    "phone": "01476 570000",
    "websiteUrl": "https://www.belvoir.co.uk",
    "domain": "belvoir.co.uk",
    "logoSrc": "https://logo.clearbit.com/belvoir.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4014-0",
        "name": "Landlord Rental Yield Valuation",
        "description": "Rental income assessment and compliance review.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4014-1",
        "name": "Full Tenant Management & Rent Protection",
        "description": "Monthly rent collection, inspections, and maintenance cover.",
        "price": 95,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-bridgfords-estate-agents",
    "ownerEmail": null,
    "name": "Bridgfords Estate Agents",
    "category": "real-estate",
    "tagline": "Selling homes in the North West since 1832",
    "about": "Bridgfords has been a dominant force in North West property sales for over 190 years, operating branches across Greater Manchester, Cheshire, and Lancashire.",
    "area": "Manchester & North West UK",
    "phone": "0161 834 8822",
    "websiteUrl": "https://www.bridgfords.co.uk",
    "domain": "bridgfords.co.uk",
    "logoSrc": "https://logo.clearbit.com/bridgfords.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4015-0",
        "name": "North West Residential Property Valuation",
        "description": "Local market appraisal by experienced regional estate agents.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4015-1",
        "name": "Auction & Fast-Sale Property Consultation",
        "description": "Modern method of auction property advisory.",
        "price": 0,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-connells-group",
    "ownerEmail": null,
    "name": "Connells Group",
    "category": "real-estate",
    "tagline": "High street property sales, lettings & mortgages",
    "about": "Connells is one of the UK's largest estate agency networks with nearly 600 branches providing estate agency, survey, mortgage, and conveyancing services.",
    "area": "Leighton Buzzard & UK Wide",
    "phone": "01525 218500",
    "websiteUrl": "https://www.connells.co.uk",
    "domain": "connells.co.uk",
    "logoSrc": "https://logo.clearbit.com/connells.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4016-0",
        "name": "Home Valuation & Market Appraisal",
        "description": "Expert appraisal for residential sales and lettings.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4016-1",
        "name": "Mortgage Advice & Financial Review",
        "description": "Independent mortgage advice across major UK lenders.",
        "price": 0,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-winkworth-estate-agents",
    "ownerEmail": null,
    "name": "Winkworth Estate Agents",
    "category": "real-estate",
    "tagline": "Bespoke property buying, selling & lettings",
    "about": "Winkworth is a premium high-street real estate franchisor operating over 100 offices specializing in upscale UK residential properties.",
    "area": "Mayfair, London & 100+ UK Offices",
    "phone": "020 7355 2244",
    "websiteUrl": "https://www.winkworth.co.uk",
    "domain": "winkworth.co.uk",
    "logoSrc": "https://logo.clearbit.com/winkworth.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4017-0",
        "name": "High-End Property Sales Appraisal",
        "description": "Discreet valuation and target buyer marketing plan.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4017-1",
        "name": "Bespoke Relocation & Property Search",
        "description": "Tailored property search for buying or renting in top UK postcodes.",
        "price": 250,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-kwik-fit",
    "ownerEmail": null,
    "name": "Kwik Fit",
    "category": "auto",
    "tagline": "The UK's number 1 tyre & MOT specialist",
    "about": "Kwik Fit is the UK leader in tyre replacement, MOT testing, brake repairs, oil servicing and wheel alignment with over 600 service centres nation-wide.",
    "area": "Broxburn, Scotland & 600+ UK Branches",
    "phone": "0800 222 111",
    "websiteUrl": "https://www.kwik-fit.com",
    "domain": "kwik-fit.com",
    "logoSrc": "https://logo.clearbit.com/kwik-fit.com",
    "coverSrc": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4018-0",
        "name": "Class 4 MOT Test",
        "description": "DVSA certified annual car safety inspection.",
        "price": 39.95,
        "durationMins": 45
      },
      {
        "id": "s-4018-1",
        "name": "Premium Tyre Fitting & Laser Alignment",
        "description": "Supply, fitting, wheel balancing and tracking.",
        "price": 85,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-halfords-autocentres",
    "ownerEmail": null,
    "name": "Halfords Autocentres",
    "category": "auto",
    "tagline": "Car servicing, MOT testing, brakes & batteries",
    "about": "Halfords Autocentres operates over 400 garages delivering dealership-quality car servicing, MOTs, air conditioning re-gassing and mechanical repairs.",
    "area": "Redditch & 400+ UK Garages",
    "phone": "0800 050 1080",
    "websiteUrl": "https://www.halfords.com",
    "domain": "halfords.com",
    "logoSrc": "https://logo.clearbit.com/halfords.com",
    "coverSrc": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4019-0",
        "name": "Full Annual Car Service",
        "description": "77-point check including engine oil and filter change.",
        "price": 149,
        "durationMins": 120
      },
      {
        "id": "s-4019-1",
        "name": "Air Conditioning Re-gas (R134a / R1234yf)",
        "description": "Re-gas and refrigerant pressure check for cold cabin air.",
        "price": 59,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-rac-breakdown-servicing",
    "ownerEmail": null,
    "name": "RAC Breakdown & Servicing",
    "category": "auto",
    "tagline": "The UK's oldest breakdown recovery service",
    "about": "The RAC has kept UK motorists moving since 1897, providing 24/7 roadside assistance, mobile mechanics, vehicle inspections and car insurance.",
    "area": "Walsall & UK Nationwide",
    "phone": "0330 159 1111",
    "websiteUrl": "https://www.rac.co.uk",
    "domain": "rac.co.uk",
    "logoSrc": "https://logo.clearbit.com/rac.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4020-0",
        "name": "24/7 Mobile Breakdown Callout",
        "description": "Roadside patrol repair or vehicle recovery to local garage.",
        "price": 99,
        "durationMins": 60
      },
      {
        "id": "s-4020-1",
        "name": "Comprehensive Used Car Pre-Purchase Inspection",
        "description": "218-point mechanical and structural car check.",
        "price": 189,
        "durationMins": 120
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-the-aa-automobile-association-",
    "ownerEmail": null,
    "name": "The AA (Automobile Association)",
    "category": "auto",
    "tagline": "Britain's largest breakdown cover & mobile mechanics",
    "about": "The AA serves over 14 million members with roadside assistance, mobile driveway servicing, battery replacements and driving instruction.",
    "area": "Basingstoke & UK Wide",
    "phone": "0800 88 77 66",
    "websiteUrl": "https://www.theaa.com",
    "domain": "theaa.com",
    "logoSrc": "https://logo.clearbit.com/theaa.com",
    "coverSrc": "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4021-0",
        "name": "Driveway Mobile Car Service",
        "description": "AA certified mechanic conducts full oil service on your driveway.",
        "price": 139,
        "durationMins": 90
      },
      {
        "id": "s-4021-1",
        "name": "Mobile Battery Replacement & Testing",
        "description": "New Bosch car battery supplied and fitted with 3-year warranty.",
        "price": 95,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-national-tyres-and-autocare",
    "ownerEmail": null,
    "name": "National Tyres and Autocare",
    "category": "auto",
    "tagline": "Tyres, exhausts, brakes & steering alignment",
    "about": "National Tyres operates 230+ branches providing budget and premium tyres, exhaust replacements, shock absorbers, and steering alignment.",
    "area": "Stockport & 230+ UK Branches",
    "phone": "0800 626 666",
    "websiteUrl": "https://www.national.co.uk",
    "domain": "national.co.uk",
    "logoSrc": "https://logo.clearbit.com/national.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4022-0",
        "name": "4-Wheel Computerized Alignment Check",
        "description": "Laser tracking and camber alignment for even tyre wear.",
        "price": 35,
        "durationMins": 30
      },
      {
        "id": "s-4022-1",
        "name": "Exhaust System & Catalytic Converter Replacement",
        "description": "Supply and fitting of stainless exhaust sections.",
        "price": 120,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-autoglass-uk",
    "ownerEmail": null,
    "name": "Autoglass UK",
    "category": "auto",
    "tagline": "Chips repair & windscreen replacements",
    "about": "Autoglass is the UK's leading windscreen repair and replacement company, operating mobile fitting vans and branches nation-wide.",
    "area": "Bedford & UK Wide Mobile Vans",
    "phone": "0800 36 36 36",
    "websiteUrl": "https://www.autoglass.co.uk",
    "domain": "autoglass.co.uk",
    "logoSrc": "https://logo.clearbit.com/autoglass.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4023-0",
        "name": "Windscreen Stone Chip Resin Repair",
        "description": "Resin injection repair to prevent stone chips spreading into cracks.",
        "price": 50,
        "durationMins": 30
      },
      {
        "id": "s-4023-1",
        "name": "Full Windscreen Replacement & ADAS Calibration",
        "description": "OEM glass fitting and camera calibration.",
        "price": 195,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-chipsaway-car-body-repair",
    "ownerEmail": null,
    "name": "ChipsAway Car Body Repair",
    "category": "auto",
    "tagline": "SMART car body repairs, bumper scuffs & dent removal",
    "about": "ChipsAway is the UK's pioneer in SMART (Small to Medium Area Repair Technology), fixing bumper scuffs, paintwork scratches, and minor dents without costly bodyshop fees.",
    "area": "Kidderminster & UK Wide Mobile Specialist",
    "phone": "0800 145 5118",
    "websiteUrl": "https://www.chipsaway.co.uk",
    "domain": "chipsaway.co.uk",
    "logoSrc": "https://logo.clearbit.com/chipsaway.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4024-0",
        "name": "Bumper Scuff & Paint Scratch Repair",
        "description": "Color-matched paint repair for corner bumper scuffs.",
        "price": 110,
        "durationMins": 120
      },
      {
        "id": "s-4024-1",
        "name": "Paintless Dent Removal (PDR)",
        "description": "Specialist dent pull without disturbing original paint factory finish.",
        "price": 75,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-ats-euromaster",
    "ownerEmail": null,
    "name": "ATS Euromaster",
    "category": "auto",
    "tagline": "Tyres, MOT testing & commercial fleet maintenance",
    "about": "ATS Euromaster is a major UK tyre distributor and auto service provider operating 250+ service centres for car drivers and commercial vehicle fleets.",
    "area": "Aston, Birmingham & 250+ UK Branches",
    "phone": "0800 601060",
    "websiteUrl": "https://www.atseuromaster.co.uk",
    "domain": "atseuromaster.co.uk",
    "logoSrc": "https://logo.clearbit.com/atseuromaster.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4025-0",
        "name": "Michelin / Continental Tyre Fitting",
        "description": "Premium tyre fitting, valve replacement and balance.",
        "price": 90,
        "durationMins": 40
      },
      {
        "id": "s-4025-1",
        "name": "Brake Pads & Discs Safety Check & Replacement",
        "description": "Inspection and replacement of front or rear brake sets.",
        "price": 140,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-lookers-motor-group",
    "ownerEmail": null,
    "name": "Lookers Motor Group",
    "category": "auto",
    "tagline": "One of the UK's top automotive retail & service networks",
    "about": "Lookers represents 30 leading car manufacturers across 150 UK dealerships, offering new & used vehicle sales, servicing, parts, and MOTs.",
    "area": "Manchester & 150+ UK Dealerships",
    "phone": "0330 096 9804",
    "websiteUrl": "https://www.lookers.co.uk",
    "domain": "lookers.co.uk",
    "logoSrc": "https://logo.clearbit.com/lookers.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4026-0",
        "name": "Manufacturer Approved Scheduled Service",
        "description": "Official brand technician service using genuine manufacturer parts.",
        "price": 199,
        "durationMins": 120
      },
      {
        "id": "s-4026-1",
        "name": "Vehicle Health Check & Video Report",
        "description": "Comprehensive safety inspection with direct technician video walkthrough.",
        "price": 0,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-rush-hair-beauty",
    "ownerEmail": null,
    "name": "Rush Hair & Beauty",
    "category": "beauty",
    "tagline": "Award-winning UK hairdressing & color specialists",
    "about": "Rush Hair & Beauty operates over 60 stylish salons across London and the UK, delivering award-winning haircuts, creative hair coloring, and balayage.",
    "area": "Croydon, London & 60+ UK Salons",
    "phone": "020 8642 0100",
    "websiteUrl": "https://www.rush.co.uk",
    "domain": "rush.co.uk",
    "logoSrc": "https://logo.clearbit.com/rush.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4027-0",
        "name": "Cut & Blow Dry with Stylist",
        "description": "Personal consultation, shampoo massage, precision haircut and blow dry styling.",
        "price": 55,
        "durationMins": 60
      },
      {
        "id": "s-4027-1",
        "name": "Bespoke Balayage & Olaplex Treatment",
        "description": "Hand-painted balayage highlights with Olaplex bond repair.",
        "price": 135,
        "durationMins": 150
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-toni-guy",
    "ownerEmail": null,
    "name": "Toni & Guy",
    "category": "beauty",
    "tagline": "Global salon brand & precision fashion hair styling",
    "about": "Toni & Guy is the international hair brand leader celebrating 60 years of catwalk fashion, precision hair cutting, and innovative styling.",
    "area": "London & 400+ Global Salons",
    "phone": "020 7404 4683",
    "websiteUrl": "https://www.toniandguy.com",
    "domain": "toniandguy.com",
    "logoSrc": "https://logo.clearbit.com/toniandguy.com",
    "coverSrc": "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4028-0",
        "name": "Creative Hair Cut & Styling",
        "description": "Consultation, precision technical cut and personal finish.",
        "price": 70,
        "durationMins": 60
      },
      {
        "id": "s-4028-1",
        "name": "Full Head Highlights & Gloss",
        "description": "Foil highlights throughout with custom gloss toner.",
        "price": 140,
        "durationMins": 120
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-regis-salons-uk",
    "ownerEmail": null,
    "name": "Regis Salons UK",
    "category": "beauty",
    "tagline": "Contemporary haircuts, highlights & styling",
    "about": "Regis Salons are located in premium UK high streets and department stores, offering accessible professional hair styling, colors and treatments.",
    "area": "UK Wide High Street Salons",
    "phone": "0800 019 3210",
    "websiteUrl": "https://www.regissalons.co.uk",
    "domain": "regissalons.co.uk",
    "logoSrc": "https://logo.clearbit.com/regissalons.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4029-0",
        "name": "Ladies Wash, Cut & Finish",
        "description": "Shampoo treatment, haircut, and blow dry finish.",
        "price": 45,
        "durationMins": 45
      },
      {
        "id": "s-4029-1",
        "name": "Half Head Foil Highlights",
        "description": "Crown and side highlights with conditioning treatment.",
        "price": 75,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-supercuts-uk",
    "ownerEmail": null,
    "name": "Supercuts UK",
    "category": "beauty",
    "tagline": "Walk-in haircuts & styling for men, women and kids",
    "about": "Supercuts offers convenient walk-in haircuts, color touch-ups, and styling without needing an advance appointment across UK shopping centres.",
    "area": "UK Wide Shopping Centres",
    "phone": "0800 988 8888",
    "websiteUrl": "https://www.supercuts.co.uk",
    "domain": "supercuts.co.uk",
    "logoSrc": "https://logo.clearbit.com/supercuts.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4030-0",
        "name": "Supercut Haircut & Blow Dry",
        "description": "Quick precision haircut and style.",
        "price": 28,
        "durationMins": 30
      },
      {
        "id": "s-4030-1",
        "name": "Men's Clipper Cut & Trim",
        "description": "Clipper fade, scissor top trim and neck clean.",
        "price": 19,
        "durationMins": 20
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-sk-n-clinics",
    "ownerEmail": null,
    "name": "SK:N Clinics",
    "category": "beauty",
    "tagline": "The UK's largest chain of specialist skin & laser clinics",
    "about": "SK:N Clinics operates over 50 medical skin clinics staffed by dermatologists and plastic surgeons providing laser hair removal, anti-aging, and acne treatments.",
    "area": "Birmingham & 50+ UK Clinics",
    "phone": "0333 014 2434",
    "websiteUrl": "https://www.sknclinics.co.uk",
    "domain": "sknclinics.co.uk",
    "logoSrc": "https://logo.clearbit.com/sknclinics.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4031-0",
        "name": "Dermatologist Medical Skin Consultation",
        "description": "In-depth skin assessment for acne, scarring, or pigmentation.",
        "price": 50,
        "durationMins": 45
      },
      {
        "id": "s-4031-1",
        "name": "HydraFacial Deep Cleansing Treatment",
        "description": "Patented 6-step medical facial for glowing, hydrated skin.",
        "price": 120,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-townhouse-nails",
    "ownerEmail": null,
    "name": "Townhouse Nails",
    "category": "beauty",
    "tagline": "The ultimate luxury manicure & nail art studio",
    "about": "Townhouse is the UK's premier luxury nail salon brand, recognized for impeccable manicures, gel extensions, and elegant nail art in sleek design spaces.",
    "area": "Fitzrovia, London & UK Wide",
    "phone": "020 7946 0990",
    "websiteUrl": "https://www.townhouse.co.uk",
    "domain": "townhouse.co.uk",
    "logoSrc": "https://logo.clearbit.com/townhouse.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4032-0",
        "name": "Signature Gel Manicure",
        "description": "Nail shaping, cuticle care, long-lasting gel polish and hand massage.",
        "price": 48,
        "durationMins": 45
      },
      {
        "id": "s-4032-1",
        "name": "Townhouse Luxury Pedicure",
        "description": "Foot soak, exfoliation, nail care and gel polish finish.",
        "price": 62,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-barber-barber-uk",
    "ownerEmail": null,
    "name": "Barber Barber UK",
    "category": "beauty",
    "tagline": "Gentlemen's wet shaves & traditional haircuts",
    "about": "Barber Barber UK offers authentic bespoke barbering, traditional hot-towel wet shaves, and beard grooming in high-end classic barber shops.",
    "area": "Deansgate, Manchester & London",
    "phone": "0161 832 9900",
    "websiteUrl": "https://www.barberbarberuk.com",
    "domain": "barberbarberuk.com",
    "logoSrc": "https://logo.clearbit.com/barberbarberuk.com",
    "coverSrc": "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4033-0",
        "name": "Bespoke Gents Haircut & Style",
        "description": "Consultation, precision wash, scissor cut and hair tonic finish.",
        "price": 35,
        "durationMins": 40
      },
      {
        "id": "s-4033-1",
        "name": "Traditional Hot Towel Cut-Throat Shave",
        "description": "Pre-shave oils, hot towels, razor shave and cold towel finish.",
        "price": 40,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-mac-cosmetics-uk",
    "ownerEmail": null,
    "name": "MAC Cosmetics UK",
    "category": "beauty",
    "tagline": "Professional event makeup & beauty masterclasses",
    "about": "M·A·C Cosmetics is the world's leading professional makeup authority, offering 1-on-1 makeup applications, lessons, and bridal makeup services.",
    "area": "London & UK Retail Stores",
    "phone": "0800 054 2696",
    "websiteUrl": "https://www.maccosmetics.co.uk",
    "domain": "maccosmetics.co.uk",
    "logoSrc": "https://logo.clearbit.com/maccosmetics.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4034-0",
        "name": "Full Focus 60-Minute Makeup Application",
        "description": "Bespoke full-face makeup application by a certified M·A·C Artist.",
        "price": 60,
        "durationMins": 60
      },
      {
        "id": "s-4034-1",
        "name": "1-on-1 Makeup Technique Masterclass",
        "description": "Learn professional contouring, eye makeup, and skin prep techniques.",
        "price": 75,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-superdrug-beauty-studio",
    "ownerEmail": null,
    "name": "Superdrug Beauty Studio",
    "category": "beauty",
    "tagline": "Eyebrow threading, pierings & gel nails on the high street",
    "about": "Superdrug Beauty Studio offers quick, affordable brow threading, lash extensions, ear piercing, and nail services inside 300+ high-street Superdrug stores.",
    "area": "Croydon & 300+ UK Stores",
    "phone": "0345 671 0709",
    "websiteUrl": "https://www.superdrug.com",
    "domain": "superdrug.com",
    "logoSrc": "https://logo.clearbit.com/superdrug.com",
    "coverSrc": "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4035-0",
        "name": "Eyebrow Threading & Tinting",
        "description": "Precision cotton thread shaping and semi-permanent brow tinting.",
        "price": 18,
        "durationMins": 20
      },
      {
        "id": "s-4035-1",
        "name": "Lash Lift & Tint",
        "description": "Natural lash curling and dark tint for fluttery lashes.",
        "price": 45,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-bupa-dental-care",
    "ownerEmail": null,
    "name": "Bupa Dental Care",
    "category": "health",
    "tagline": "High-quality private & NHS dental care across the UK",
    "about": "Bupa Dental Care operates over 400 practices across the UK, providing routine check-ups, teeth whitening, Invisalign clear aligners, and dental implants.",
    "area": "London & 400+ UK Dental Practices",
    "phone": "0808 271 7890",
    "websiteUrl": "https://www.bupa.co.uk/dental",
    "domain": "bupa.co.uk",
    "logoSrc": "https://logo.clearbit.com/bupa.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4036-0",
        "name": "New Patient Dental Examination & X-Rays",
        "description": "Full oral health examination, gum health check and digital X-rays.",
        "price": 65,
        "durationMins": 30
      },
      {
        "id": "s-4036-1",
        "name": "Hygienist Scale & Airflow Polish",
        "description": "Professional tartar removal, stain removal, and gum polishing.",
        "price": 78,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-david-lloyd-clubs",
    "ownerEmail": null,
    "name": "David Lloyd Clubs",
    "category": "health",
    "tagline": "Premium UK health, tennis, spa & fitness clubs",
    "about": "David Lloyd Clubs is Europe's premier health, sport and leisure group with 100+ UK clubs featuring state-of-the-art gyms, indoor & outdoor pools, and spas.",
    "area": "Hatfield & 100+ UK Clubs",
    "phone": "0345 129 6700",
    "websiteUrl": "https://www.davidlloyd.co.uk",
    "domain": "davidlloyd.co.uk",
    "logoSrc": "https://logo.clearbit.com/davidlloyd.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4037-0",
        "name": "Personal Trainer 1-on-1 Session",
        "description": "Bespoke fitness assessment and tailored workout coaching.",
        "price": 50,
        "durationMins": 60
      },
      {
        "id": "s-4037-1",
        "name": "Spa Retreat Day Pass & Hydrotherapy Access",
        "description": "Access to thermal spa, Himalayan salt sauna, and hydro pools.",
        "price": 85,
        "durationMins": 180
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-nuffield-health",
    "ownerEmail": null,
    "name": "Nuffield Health",
    "category": "health",
    "tagline": "Gyms, health assessments & private hospitals",
    "about": "Nuffield Health is the UK's largest healthcare charity, operating 114 fitness & wellbeing centres and 31 private hospitals.",
    "area": "Epsom & 114 UK Wellbeing Centres",
    "phone": "0300 123 1286",
    "websiteUrl": "https://www.nuffieldhealth.com",
    "domain": "nuffieldhealth.com",
    "logoSrc": "https://logo.clearbit.com/nuffieldhealth.com",
    "coverSrc": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4038-0",
        "name": "Comprehensive Health MOT Assessment",
        "description": "Blood glucose, cholesterol, body composition, and cardiac health test.",
        "price": 195,
        "durationMins": 60
      },
      {
        "id": "s-4038-1",
        "name": "Chartered Physiotherapy Assessment & Treatment",
        "description": "In-depth musculoskeletal assessment and joint rehab therapy.",
        "price": 72,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-boots-opticians",
    "ownerEmail": null,
    "name": "Boots Opticians",
    "category": "health",
    "tagline": "Eye tests, designer glasses & contact lenses",
    "about": "Boots Opticians has over 550 practices across the UK providing comprehensive eye tests, OCT 3D retinal scanning, and designer optical frames.",
    "area": "Nottingham & 550+ UK Practices",
    "phone": "0345 125 3752",
    "websiteUrl": "https://www.boots.com/opticians",
    "domain": "boots.com",
    "logoSrc": "https://logo.clearbit.com/boots.com",
    "coverSrc": "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4039-0",
        "name": "Advanced Eye Test with OCT 3D Scan",
        "description": "Comprehensive vision test plus 3D retinal health scanning.",
        "price": 35,
        "durationMins": 30
      },
      {
        "id": "s-4039-1",
        "name": "Contact Lens Consultation & Free Trial",
        "description": "Fitting consultation and trial lenses for daily or monthly wear.",
        "price": 25,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-puregym",
    "ownerEmail": null,
    "name": "PureGym",
    "category": "health",
    "tagline": "Flexible 24/7 fitness & 1-on-1 personal training",
    "about": "PureGym is the UK's largest gym operator with over 340 gyms offering low-cost, contract-free 24/7 access to high quality gym equipment and group classes.",
    "area": "Leeds & 340+ UK Gyms",
    "phone": "0344 477 0005",
    "websiteUrl": "https://www.puregym.com",
    "domain": "puregym.com",
    "logoSrc": "https://logo.clearbit.com/puregym.com",
    "coverSrc": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4040-0",
        "name": "1-on-1 Personal Trainer Induction & Plan",
        "description": "Goal setting, fitness testing, and 4-week gym program.",
        "price": 40,
        "durationMins": 60
      },
      {
        "id": "s-4040-1",
        "name": "Body Composition InBody Scan & Review",
        "description": "Biometric body fat, muscle mass and visceral health analysis.",
        "price": 15,
        "durationMins": 20
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz--my-dentist-uk",
    "ownerEmail": null,
    "name": "{my}dentist UK",
    "category": "health",
    "tagline": "Affordable NHS & private dental practices",
    "about": "{my}dentist is the UK's largest dental network with over 500 practices treating over 4 million patients every year.",
    "area": "Kearsley, Greater Manchester & 500+ Practices",
    "phone": "0345 122 9988",
    "websiteUrl": "https://www.mydentist.co.uk",
    "domain": "mydentist.co.uk",
    "logoSrc": "https://logo.clearbit.com/mydentist.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4041-0",
        "name": "Private Routine Dental Check-Up",
        "description": "Full tooth exam, oral cancer check and advice.",
        "price": 49,
        "durationMins": 20
      },
      {
        "id": "s-4041-1",
        "name": "Professional Boutique Teeth Whitening",
        "description": "Custom whitening trays and dentist-prescribed peroxide gel.",
        "price": 299,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-gymshark-lifting-club",
    "ownerEmail": null,
    "name": "Gymshark Lifting Club",
    "category": "health",
    "tagline": "State-of-the-art strength conditioning & fitness hub",
    "about": "Gymshark Lifting Club is an elite strength, conditioning and wellbeing hub created by global fitness brand Gymshark for athletes and fitness enthusiasts.",
    "area": "Solihull, West Midlands",
    "phone": "0800 011 9800",
    "websiteUrl": "https://www.gymshark.com",
    "domain": "gymshark.com",
    "logoSrc": "https://logo.clearbit.com/gymshark.com",
    "coverSrc": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4042-0",
        "name": "Elite Strength & Conditioning Coaching",
        "description": "Biomechanical lifting analysis and powerlifting coaching.",
        "price": 65,
        "durationMins": 60
      },
      {
        "id": "s-4042-1",
        "name": "Recovery Cryotherapy & Infrared Sauna Session",
        "description": "Whole-body cryo chamber and infrared muscle recovery.",
        "price": 45,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-the-gym-group",
    "ownerEmail": null,
    "name": "The Gym Group",
    "category": "health",
    "tagline": "24/7 low-cost, contract-free fitness nationwide",
    "about": "The Gym Group operates 230+ 24/7 gyms across the UK, making fitness accessible, affordable, and flexible with state-of-the-art cardio and weights.",
    "area": "Croydon & 230+ UK Locations",
    "phone": "0300 303 4800",
    "websiteUrl": "https://www.thegymgroup.com",
    "domain": "thegymgroup.com",
    "logoSrc": "https://logo.clearbit.com/thegymgroup.com",
    "coverSrc": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4043-0",
        "name": "Personalized Gym Starter Workout Session",
        "description": "1-on-1 machine guidance and workout plan.",
        "price": 30,
        "durationMins": 45
      },
      {
        "id": "s-4043-1",
        "name": "Group Functional Fitness Class Pass",
        "description": "High-intensity functional training group class.",
        "price": 10,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-specsavers-opticians-audiology",
    "ownerEmail": null,
    "name": "Specsavers Opticians & Audiology",
    "category": "health",
    "tagline": "High-street eye tests, glasses & hearing care",
    "about": "Specsavers is Britain's largest optical chain with nearly 900 stores providing eye exams, designer glasses frames, contact lenses, and hearing aid checks.",
    "area": "Guernsey & 900+ UK Stores",
    "phone": "0808 172 0072",
    "websiteUrl": "https://www.specsavers.co.uk",
    "domain": "specsavers.co.uk",
    "logoSrc": "https://logo.clearbit.com/specsavers.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4044-0",
        "name": "Comprehensive Eye Test & Retinal Photography",
        "description": "Digital retinal photography eye exam.",
        "price": 25,
        "durationMins": 25
      },
      {
        "id": "s-4044-1",
        "name": "Free Hearing Assessment & Hearing Aid Trial",
        "description": "Comprehensive hearing check by registered audiologist.",
        "price": 0,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-fantastic-services-uk",
    "ownerEmail": null,
    "name": "Fantastic Services UK",
    "category": "cleaning",
    "tagline": "Professional domestic & end-of-tenancy deep cleaning",
    "about": "Fantastic Services is an international cleaning brand operating across the UK, offering regular house cleaning, end-of-tenancy deep cleans, and carpet steam cleaning.",
    "area": "London & UK Nationwide",
    "phone": "020 3404 3444",
    "websiteUrl": "https://www.fantasticservices.com",
    "domain": "fantasticservices.com",
    "logoSrc": "https://logo.clearbit.com/fantasticservices.com",
    "coverSrc": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4045-0",
        "name": "End of Tenancy Guaranteed Deep Clean",
        "description": "Full deposit-back guarantee cleaning including oven and inside cupboards.",
        "price": 185,
        "durationMins": 240
      },
      {
        "id": "s-4045-1",
        "name": "Professional Carpet Hot Water Extraction",
        "description": "Deep steam carpet cleaning to remove stubborn stains and allergens.",
        "price": 65,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-molly-maid-uk",
    "ownerEmail": null,
    "name": "MOLLY MAID UK",
    "category": "cleaning",
    "tagline": "Tailored domestic cleaning for UK homes",
    "about": "MOLLY MAID is Britain's most recognized home cleaning service, delivering customized house cleaning from insured and uniformed cleaning teams.",
    "area": "Maidenhead & 70+ UK Franchises",
    "phone": "0800 587 7500",
    "websiteUrl": "https://www.mollymaid.co.uk",
    "domain": "mollymaid.co.uk",
    "logoSrc": "https://logo.clearbit.com/mollymaid.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4046-0",
        "name": "Free In-Home Cleaning Price Estimate",
        "description": "In-person walkthrough to customize your home cleaning schedule.",
        "price": 0,
        "durationMins": 30
      },
      {
        "id": "s-4046-1",
        "name": "Regular Weekly House Cleaning Visit",
        "description": "Dusting, vacuuming, kitchen sanitation and bathroom scrubbing.",
        "price": 56,
        "durationMins": 120
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-ovenu-oven-cleaning",
    "ownerEmail": null,
    "name": "Ovenu Oven Cleaning",
    "category": "cleaning",
    "tagline": "The UK's favorite eco-friendly oven cleaning service",
    "about": "Ovenu is the UK's largest network of eco-friendly oven valeting specialists, using non-caustic products to restore ovens, hobs and extractors to pristine condition.",
    "area": "Wokingham & 100+ UK Franchises",
    "phone": "0800 140 4500",
    "websiteUrl": "https://www.ovenu.co.uk",
    "domain": "ovenu.co.uk",
    "logoSrc": "https://logo.clearbit.com/ovenu.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4047-0",
        "name": "Single Oven Deep Clean & Degrease",
        "description": "Complete disassembly, rack soaking, door glass cleaning.",
        "price": 65,
        "durationMins": 90
      },
      {
        "id": "s-4047-1",
        "name": "Range Cooker / AGA Complete Valet",
        "description": "Eco-friendly deep valet of multi-oven range cookers.",
        "price": 110,
        "durationMins": 150
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-cleanzer-domestic-cleaning",
    "ownerEmail": null,
    "name": "Cleanzer Domestic Cleaning",
    "category": "cleaning",
    "tagline": "Regular home & commercial office cleaning",
    "about": "Cleanzer provides reliable house cleaners and commercial office cleaning services across Greater Manchester and the North West.",
    "area": "Manchester & North West UK",
    "phone": "0161 400 3344",
    "websiteUrl": "https://www.cleanzer.co.uk",
    "domain": "cleanzer.co.uk",
    "logoSrc": "https://logo.clearbit.com/cleanzer.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4048-0",
        "name": "Fortnightly Home Clean Visit",
        "description": "2-hour thorough cleaning of living areas, kitchen and bathrooms.",
        "price": 36,
        "durationMins": 120
      },
      {
        "id": "s-4048-1",
        "name": "Office Daily After-Hours Clean",
        "description": "Desk sanitization, bin emptying, floor washing and kitchen hygiene.",
        "price": 45,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-window-clean-uk",
    "ownerEmail": null,
    "name": "Window Clean UK",
    "category": "cleaning",
    "tagline": "Pure water reach-and-wash commercial window cleaning",
    "about": "Window Clean UK uses 100% purified water pole systems to clean windows, glass facades, solar panels and frames up to 60ft safely from the ground.",
    "area": "UK Wide Commercial Cleaning",
    "phone": "0800 644 1200",
    "websiteUrl": "https://www.windowcleanuk.com",
    "domain": "windowcleanuk.com",
    "logoSrc": "https://logo.clearbit.com/windowcleanuk.com",
    "coverSrc": "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4049-0",
        "name": "Residential Pure Water Exterior Window Wash",
        "description": "Pure water wash of all exterior glass, frames and sills.",
        "price": 30,
        "durationMins": 45
      },
      {
        "id": "s-4049-1",
        "name": "Solar Panel De-ionised Water Wash",
        "description": "Efficiency restoration wash of roof solar panels.",
        "price": 75,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-safeclean-by-guaranteed-clean",
    "ownerEmail": null,
    "name": "Safeclean by Guaranteed Clean",
    "category": "cleaning",
    "tagline": "Spot & stain carpet, curtain & sofa cleaning",
    "about": "Safeclean has provided specialist carpet, upholstery and curtain cleaning across the UK for over 50 years, endorsed by major UK carpet manufacturers.",
    "area": "UK Wide Franchises",
    "phone": "0800 328 2626",
    "websiteUrl": "https://www.safeclean.co.uk",
    "domain": "safeclean.co.uk",
    "logoSrc": "https://logo.clearbit.com/safeclean.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4050-0",
        "name": "3-Seater Sofa Fabric Deep Clean & Guard",
        "description": "Stain extraction and fabric stain protection guard application.",
        "price": 95,
        "durationMins": 90
      },
      {
        "id": "s-4050-1",
        "name": "Curtain In-Situ Dry Clean",
        "description": "Professional curtain cleaning while still hanging on rails.",
        "price": 80,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-commercial-clean-uk",
    "ownerEmail": null,
    "name": "Commercial Clean UK",
    "category": "cleaning",
    "tagline": "Contract office cleaning & hygiene services",
    "about": "Commercial Clean UK provides contract cleaning, floor buffing, and washroom hygiene management for offices, schools, and medical clinics.",
    "area": "Manchester City Centre",
    "phone": "0161 990 8820",
    "websiteUrl": "https://www.commercialcleanuk.co.uk",
    "domain": "commercialcleanuk.co.uk",
    "logoSrc": "https://logo.clearbit.com/commercialcleanuk.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4051-0",
        "name": "Office Deep Sanitization & Fogging",
        "description": "Antimicrobial surface fogging and touchpoint sterilization.",
        "price": 150,
        "durationMins": 120
      },
      {
        "id": "s-4051-1",
        "name": "Hard Floor Scrubbing & Buffer Polishing",
        "description": "Deep scrub and high-shine polish for vinyl and marble floors.",
        "price": 120,
        "durationMins": 120
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-rentokil-hygiene-uk",
    "ownerEmail": null,
    "name": "Rentokil Hygiene UK",
    "category": "cleaning",
    "tagline": "Specialist deep cleaning & washroom hygiene",
    "about": "Rentokil Hygiene is the UK leader in specialist deep cleaning, kitchen extraction duct cleaning, biohazard remediation and washroom services.",
    "area": "Crawley & UK Nationwide",
    "phone": "0808 256 2850",
    "websiteUrl": "https://www.rentokil-hygiene.co.uk",
    "domain": "rentokil-hygiene.co.uk",
    "logoSrc": "https://logo.clearbit.com/rentokil-hygiene.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4052-0",
        "name": "Commercial Kitchen Extraction & Duct Clean",
        "description": "TR19 certified grease removal from commercial kitchen canopies and ductwork.",
        "price": 350,
        "durationMins": 300
      },
      {
        "id": "s-4052-1",
        "name": "Washroom Hygiene Unit Installation & Service",
        "description": "Sanitary bin exchange and automated air freshener fitting.",
        "price": 45,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-barking-mad-dog-care",
    "ownerEmail": null,
    "name": "Barking Mad Dog Care",
    "category": "dog-walkers",
    "tagline": "Home-from-home dog boarding holidays",
    "about": "Barking Mad is the UK's pioneer of home dog boarding holidays, placing dogs with loving host families as a gentle alternative to traditional kennels.",
    "area": "Kirkby Lonsdale & 70+ UK Franchises",
    "phone": "01524 825825",
    "websiteUrl": "https://www.barkingmad.uk.com",
    "domain": "barkingmad.uk.com",
    "logoSrc": "https://logo.clearbit.com/barkingmad.uk.com",
    "coverSrc": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4053-0",
        "name": "Home Dog Boarding Meet & Greet",
        "description": "In-home initial consultation to match your dog with the ideal host family.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4053-1",
        "name": "Per Night Home Dog Boarding Holiday",
        "description": "24/7 home care, walks, feeding and photo updates while you're away.",
        "price": 38,
        "durationMins": 1440
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-rover-uk-pet-care",
    "ownerEmail": null,
    "name": "Rover UK Pet Care",
    "category": "dog-walkers",
    "tagline": "Book trusted 5-star dog sitters & walkers near you",
    "about": "Rover connects pet parents with thousands of background-checked, reviewed dog walkers, house sitters and pet boarders across the UK.",
    "area": "London & UK Nationwide Network",
    "phone": "0800 048 8500",
    "websiteUrl": "https://www.rover.com/uk",
    "domain": "rover.com",
    "logoSrc": "https://logo.clearbit.com/rover.com",
    "coverSrc": "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4054-0",
        "name": "60-Minute Country Dog Walk",
        "description": "1-on-1 energetic walk with real-time GPS map tracking and photo updates.",
        "price": 20,
        "durationMins": 60
      },
      {
        "id": "s-4054-1",
        "name": "In-Home Drop-In Pet Visit",
        "description": "30-minute visit for feeding, fresh water, letting out, and playtime.",
        "price": 15,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-we-love-pets-uk",
    "ownerEmail": null,
    "name": "We Love Pets UK",
    "category": "dog-walkers",
    "tagline": "Award-winning dog walking & pet sitting across the UK",
    "about": "We Love Pets is an award-winning pet care franchisor operating over 100 branches, with DBS-checked and pet first-aid trained walkers.",
    "area": "Hungerford & 100+ UK Branches",
    "phone": "01635 295055",
    "websiteUrl": "https://welovepets.care",
    "domain": "welovepets.care",
    "logoSrc": "https://logo.clearbit.com/welovepets.care",
    "coverSrc": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4055-0",
        "name": "Group Park & Countryside Walk",
        "description": "Small group walk (max 4 dogs) in safe countryside locations.",
        "price": 16,
        "durationMins": 60
      },
      {
        "id": "s-4055-1",
        "name": "Puppy Visit & Socialization Service",
        "description": "Midday visit for young puppies needing garden breaks and feed.",
        "price": 14,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-tailster-pet-care",
    "ownerEmail": null,
    "name": "Tailster Pet Care",
    "category": "dog-walkers",
    "tagline": "Find vetted local dog walkers & boarders",
    "about": "Tailster helps thousands of UK dog owners quickly find tracked, insured local dog sitters and walkers backed by comprehensive insurance.",
    "area": "London & UK Wide",
    "phone": "020 3322 7338",
    "websiteUrl": "https://tailster.com",
    "domain": "tailster.com",
    "logoSrc": "https://logo.clearbit.com/tailster.com",
    "coverSrc": "https://images.unsplash.com/photo-1534361960057-19889db98d18?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4056-0",
        "name": "Regular Midday Solo Dog Walk",
        "description": "Solo walk tailored to your dog's pace and energy levels.",
        "price": 18,
        "durationMins": 45
      },
      {
        "id": "s-4056-1",
        "name": "Overnight House Sitting Service",
        "description": "Sitter stays in your home to keep your pet comfortable.",
        "price": 45,
        "durationMins": 720
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1534361960057-19889db98d18?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-gudog-uk-dog-sitting",
    "ownerEmail": null,
    "name": "Gudog UK Dog Sitting",
    "category": "dog-walkers",
    "tagline": "Alternative to dog kennels — Local home boarders",
    "about": "Gudog is an established platform providing cage-free home dog boarding, doggy daycare, and 1-hour walks with loving local sitters.",
    "area": "UK Nationwide",
    "phone": "020 3808 6848",
    "websiteUrl": "https://gudog.co.uk",
    "domain": "gudog.co.uk",
    "logoSrc": "https://logo.clearbit.com/gudog.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4057-0",
        "name": "Full Day Doggy Daycare",
        "description": "Supervised play, walks and companionship in a quiet home environment.",
        "price": 30,
        "durationMins": 480
      },
      {
        "id": "s-4057-1",
        "name": "1-Hour Energetic Park Walk",
        "description": "On-leash or off-leash park exercise session.",
        "price": 17,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-pawshake-uk-dog-sitters",
    "ownerEmail": null,
    "name": "Pawshake UK Dog Sitters",
    "category": "dog-walkers",
    "tagline": "Trusted pet care, dog walking & home visits",
    "about": "Pawshake connects pet parents with passionate local pet lovers offering home dog boarding, house sitting, and dog walking.",
    "area": "London & UK Wide",
    "phone": "0800 011 9988",
    "websiteUrl": "https://www.pawshake.co.uk",
    "domain": "pawshake.co.uk",
    "logoSrc": "https://logo.clearbit.com/pawshake.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4058-0",
        "name": "Dog Walk & Paw Clean",
        "description": "Fun exercise walk followed by towel dry and paw clean.",
        "price": 18,
        "durationMins": 60
      },
      {
        "id": "s-4058-1",
        "name": "Cat Feeding & Litter Box Visit",
        "description": "Daily home visit to feed cats, clean litter trays, and give cuddles.",
        "price": 12,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-petpals-uk-pet-care-services",
    "ownerEmail": null,
    "name": "Petpals UK Pet Care Services",
    "category": "dog-walkers",
    "tagline": "UK's longest established pet care franchise",
    "about": "Petpals has provided professional dog walking, cat sitting and small pet care across Britain for over 20 years in branded uniform vehicles.",
    "area": "Andover & 50+ UK Franchises",
    "phone": "01264 326362",
    "websiteUrl": "https://www.petpals.com",
    "domain": "petpals.com",
    "logoSrc": "https://logo.clearbit.com/petpals.com",
    "coverSrc": "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4059-0",
        "name": "Petpals Signature Countryside Walk",
        "description": "60-minute walk through woodland or parks.",
        "price": 17.5,
        "durationMins": 60
      },
      {
        "id": "s-4059-1",
        "name": "Pet Taxi & Vet Appointment Transport",
        "description": "Safe transport in caged, air-conditioned vehicle to vet appointments.",
        "price": 25,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-scamps-scoundrels-dog-walking",
    "ownerEmail": null,
    "name": "Scamps & Scoundrels Dog Walking",
    "category": "dog-walkers",
    "tagline": "Bespoke dog walking & puppy care in South Manchester",
    "about": "Scamps & Scoundrels is a premier Manchester dog walking service providing small group pack walks in Chorlton, Didsbury and surrounding parks.",
    "area": "Chorlton, Manchester",
    "phone": "0161 332 1144",
    "websiteUrl": "https://scampsandscoundrels.co.uk",
    "domain": "scampsandscoundrels.co.uk",
    "logoSrc": "https://logo.clearbit.com/scampsandscoundrels.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4060-0",
        "name": "Chorlton Meadows Pack Adventure Walk",
        "description": "Group walk through Chorlton Water Park and Meadows.",
        "price": 15,
        "durationMins": 60
      },
      {
        "id": "s-4060-1",
        "name": "Puppy Socialization & Toilet Break Visit",
        "description": "Targeted visit for young pups requiring garden play.",
        "price": 13,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-pets-at-home-groom-room",
    "ownerEmail": null,
    "name": "Pets at Home Groom Room",
    "category": "pets",
    "tagline": "UK's favorite pet care & professional grooming",
    "about": "Pets at Home operates over 300 Groom Room salons across the UK, offering full grooms, bath & blow drys, and microchipping by trained salon stylists.",
    "area": "Handforth, Cheshire & 300+ UK Salons",
    "phone": "0800 328 4204",
    "websiteUrl": "https://www.petsathome.com/groom-room",
    "domain": "petsathome.com",
    "logoSrc": "https://logo.clearbit.com/petsathome.com",
    "coverSrc": "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4061-0",
        "name": "Full Dog Groom, Style & Nail Trim",
        "description": "Hydrobath wash, blow dry, coat cut to breed standard, ear clean and nail clip.",
        "price": 45,
        "durationMins": 90
      },
      {
        "id": "s-4061-1",
        "name": "Puppy First Bath & Pamper Session",
        "description": "Gentle introduction bath, brush, and coat trim for puppies up to 6 months.",
        "price": 25,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-vets4pets-veterinary-group",
    "ownerEmail": null,
    "name": "Vets4Pets Veterinary Group",
    "category": "pets",
    "tagline": "24/7 emergency vet care, surgery & wellness plans",
    "about": "Vets4Pets operates over 440 UK veterinary practices providing routine vaccinations, dental care, digital X-rays, and emergency surgeries.",
    "area": "Handforth & 440+ UK Practices",
    "phone": "0800 011 2020",
    "websiteUrl": "https://www.vets4pets.com",
    "domain": "vets4pets.com",
    "logoSrc": "https://logo.clearbit.com/vets4pets.com",
    "coverSrc": "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4062-0",
        "name": "Full Veterinary Health Consultation",
        "description": "Comprehensive health examination by registered MRCVS veterinarian.",
        "price": 48,
        "durationMins": 20
      },
      {
        "id": "s-4062-1",
        "name": "Pet Annual Booster Vaccination & Flea/Wormer",
        "description": "Core annual vaccine booster plus 3-month parasite prevention.",
        "price": 65,
        "durationMins": 20
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-medivet-veterinary-partnership",
    "ownerEmail": null,
    "name": "Medivet Veterinary Partnership",
    "category": "pets",
    "tagline": "Compassionate 24-hour veterinary hospitals across the UK",
    "about": "Medivet is a community of over 400 practices and 24-hour veterinary hospitals offering advanced diagnostics, MRI scans, and round-the-clock emergency care.",
    "area": "Watford & 400+ UK Practices",
    "phone": "01923 470000",
    "websiteUrl": "https://www.medivet.co.uk",
    "domain": "medivet.co.uk",
    "logoSrc": "https://logo.clearbit.com/medivet.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4063-0",
        "name": "24/7 Emergency Vet Consultation",
        "description": "Immediate out-of-hours veterinary emergency triage.",
        "price": 120,
        "durationMins": 30
      },
      {
        "id": "s-4063-1",
        "name": "Canine Ultrasonic Dental Scale & Polish",
        "description": "General anesthesia tooth cleaning, scaling, and polishing.",
        "price": 220,
        "durationMins": 120
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-pdsa-pet-hospitals",
    "ownerEmail": null,
    "name": "PDSA Pet Hospitals",
    "category": "pets",
    "tagline": "The UK's leading veterinary charity",
    "about": "PDSA (People's Dispensary for Sick Animals) operates 48 pet hospitals providing free and low-cost veterinary treatment to sick and injured pets of eligible owners.",
    "area": "Telford & 48 UK Pet Hospitals",
    "phone": "0800 731 2502",
    "websiteUrl": "https://www.pdsa.org.uk",
    "domain": "pdsa.org.uk",
    "logoSrc": "https://logo.clearbit.com/pdsa.org.uk",
    "coverSrc": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4064-0",
        "name": "Pet Health & Wellbeing Consultation",
        "description": "Clinical exam and preventive care guidance.",
        "price": 35,
        "durationMins": 20
      },
      {
        "id": "s-4064-1",
        "name": "Microchip Implantation & Registration",
        "description": "ISO compliant electronic microchip fitting.",
        "price": 15,
        "durationMins": 15
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-cvs-uk-veterinary-group",
    "ownerEmail": null,
    "name": "CVS UK Veterinary Group",
    "category": "pets",
    "tagline": "Leading provider of integrated veterinary services",
    "about": "CVS Group operates over 500 veterinary practices, referral centres, and diagnostic laboratories across the UK, Europe, and Australia.",
    "area": "Diss, Norfolk & 500+ UK Practices",
    "phone": "01379 658000",
    "websiteUrl": "https://www.cvsukltd.co.uk",
    "domain": "cvsukltd.co.uk",
    "logoSrc": "https://logo.clearbit.com/cvsukltd.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4065-0",
        "name": "Senior Pet Wellness Screening & Blood Test",
        "description": "Comprehensive organ function blood panel for senior dogs & cats.",
        "price": 95,
        "durationMins": 30
      },
      {
        "id": "s-4065-1",
        "name": "Orthopedic Specialist Referral Consultation",
        "description": "Expert consultation for joint problems or ligament injuries.",
        "price": 180,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-linnaeus-veterinary-limited",
    "ownerEmail": null,
    "name": "Linnaeus Veterinary Limited",
    "category": "pets",
    "tagline": "Specialist veterinary referral hospitals",
    "about": "Linnaeus operates top-tier UK specialist veterinary referral hospitals (including VRCC and Willows) offering CT, MRI, oncology, and cardiology.",
    "area": "Solihull & UK Specialist Hospitals",
    "phone": "0121 712 7050",
    "websiteUrl": "https://www.linnaeusgroup.co.uk",
    "domain": "linnaeusgroup.co.uk",
    "logoSrc": "https://logo.clearbit.com/linnaeusgroup.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4066-0",
        "name": "Cardiology Echocardiogram Ultrasound Scan",
        "description": "Advanced heart ultrasound by European veterinary specialist.",
        "price": 350,
        "durationMins": 60
      },
      {
        "id": "s-4066-1",
        "name": "MRI Neurological Scan & Report",
        "description": "High-field magnetic resonance imaging scan.",
        "price": 950,
        "durationMins": 120
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-jollyes-the-pet-people",
    "ownerEmail": null,
    "name": "Jollyes The Pet People",
    "category": "pets",
    "tagline": "The pet superstore — Food, accessories & community clinic",
    "about": "Jollyes operates over 100 pet superstores across the UK offering premium pet food, aquatic supplies, wild bird care, and community pet clinics.",
    "area": "Waltham Abbey & 100+ UK Superstores",
    "phone": "01992 700500",
    "websiteUrl": "https://www.jollyes.co.uk",
    "domain": "jollyes.co.uk",
    "logoSrc": "https://logo.clearbit.com/jollyes.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4067-0",
        "name": "In-Store Community Vet Vaccine Clinic",
        "description": "Affordable routine pet vaccinations and flea treatments.",
        "price": 32,
        "durationMins": 15
      },
      {
        "id": "s-4067-1",
        "name": "Pet Nutrition & Weight Management Advice",
        "description": "Free dietary advice and weight monitoring for dogs & cats.",
        "price": 0,
        "durationMins": 20
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-battersea-dogs-cats-home",
    "ownerEmail": null,
    "name": "Battersea Dogs & Cats Home",
    "category": "pets",
    "tagline": "Rescuing and rehoming dogs and cats since 1860",
    "about": "Battersea is one of the UK's oldest and most famous animal rescue centers, caring for over 3,000 dogs and cats every year across 3 UK sites.",
    "area": "Battersea, London & Windsor",
    "phone": "020 7622 3626",
    "websiteUrl": "https://www.battersea.org.uk",
    "domain": "battersea.org.uk",
    "logoSrc": "https://logo.clearbit.com/battersea.org.uk",
    "coverSrc": "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4068-0",
        "name": "Dog Rehoming Matching Consultation",
        "description": "Meet with rehoming experts to find a rescue dog matching your home.",
        "price": 0,
        "durationMins": 60
      },
      {
        "id": "s-4068-1",
        "name": "Canine Behavior & Training Workshop",
        "description": "Public advice workshop on positive reinforcement dog training.",
        "price": 25,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-explore-learning",
    "ownerEmail": null,
    "name": "Explore Learning",
    "category": "tutoring",
    "tagline": "Inspiring young minds — Maths & English tuition",
    "about": "Explore Learning operates 140+ tuition centres across the UK, delivering tailored Maths and English learning programs for children aged 4-14.",
    "area": "Guildford & 140+ UK Tuition Centres",
    "phone": "01483 447410",
    "websiteUrl": "https://www.explorelearning.co.uk",
    "domain": "explorelearning.co.uk",
    "logoSrc": "https://logo.clearbit.com/explorelearning.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4069-0",
        "name": "Free Academic Trial & Assessment",
        "description": "Mapped assessment in Maths and English to identify learning gaps.",
        "price": 0,
        "durationMins": 60
      },
      {
        "id": "s-4069-1",
        "name": "11+ Exam Preparation Workshop",
        "description": "Verbal and non-verbal reasoning exam technique coaching.",
        "price": 35,
        "durationMins": 75
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-first-tutors-uk",
    "ownerEmail": null,
    "name": "First Tutors UK",
    "category": "tutoring",
    "tagline": "Find private home & online tutors across the UK",
    "about": "First Tutors is the UK's premier tuition search platform matching students with verified private tutors for GCSEs, A-Levels, languages, and music.",
    "area": "UK Wide Private Tutor Network",
    "phone": "0800 043 8886",
    "websiteUrl": "https://www.firsttutors.com/uk",
    "domain": "firsttutors.com",
    "logoSrc": "https://logo.clearbit.com/firsttutors.com",
    "coverSrc": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4070-0",
        "name": "1-on-1 GCSE Mathematics Online Lesson",
        "description": "Targeted exam paper preparation and topic review.",
        "price": 38,
        "durationMins": 60
      },
      {
        "id": "s-4070-1",
        "name": "A-Level Physics / Chemistry Tuition Session",
        "description": "Advanced theory and past paper question breakdown.",
        "price": 45,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-kumon-uk-education",
    "ownerEmail": null,
    "name": "Kumon UK Education",
    "category": "tutoring",
    "tagline": "Self-learning Maths & English study programs",
    "about": "Kumon is the world's largest supplementary education provider with over 600 study centres across the UK developing independent learning skills.",
    "area": "Ealing, London & 600+ UK Centres",
    "phone": "0800 854 714",
    "websiteUrl": "https://www.kumon.co.uk",
    "domain": "kumon.co.uk",
    "logoSrc": "https://logo.clearbit.com/kumon.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4071-0",
        "name": "Kumon Diagnostic Math Assessment",
        "description": "Initial proficiency test to set baseline study level.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4071-1",
        "name": "Monthly Kumon Study Program Membership",
        "description": "Daily study worksheets plus twice-weekly centre instruction.",
        "price": 70,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-mytutor-uk",
    "ownerEmail": null,
    "name": "MyTutor UK",
    "category": "tutoring",
    "tagline": "1-on-1 subject tuition with top UK university tutors",
    "about": "MyTutor is trusted by over 1,000 UK secondary schools, connecting pupils with tutors from Oxbridge and top Russell Group universities.",
    "area": "London & UK Nationwide",
    "phone": "020 3773 6020",
    "websiteUrl": "https://www.mytutor.co.uk",
    "domain": "mytutor.co.uk",
    "logoSrc": "https://logo.clearbit.com/mytutor.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4072-0",
        "name": "Free 15-Minute Tutor Match Consultation",
        "description": "Video introduction to find a compatible university subject tutor.",
        "price": 0,
        "durationMins": 15
      },
      {
        "id": "s-4072-1",
        "name": "1-on-1 Interactive Online Tutorial",
        "description": "Live video session with interactive whiteboard and shared notes.",
        "price": 32,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-red-driving-school",
    "ownerEmail": null,
    "name": "RED Driving School",
    "category": "tutoring",
    "tagline": "Learn to drive with DVSA approved instructors",
    "about": "RED is one of the UK's largest driving schools with over 1,600 DVSA registered driving instructors teaching thousands of learners every week.",
    "area": "Billingham & UK Wide Instructors",
    "phone": "0330 332 2619",
    "websiteUrl": "https://www.reddrivingschool.com",
    "domain": "reddrivingschool.com",
    "logoSrc": "https://logo.clearbit.com/reddrivingschool.com",
    "coverSrc": "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4073-0",
        "name": "2-Hour Manual / Automatic Driving Lesson",
        "description": "DVSA syllabus driving lesson covering maneuvers and test routes.",
        "price": 72,
        "durationMins": 120
      },
      {
        "id": "s-4073-1",
        "name": "10-Hour Prepaid Driving Lesson Block",
        "description": "Discounted block of driving instruction.",
        "price": 340,
        "durationMins": 600
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-bsm-british-school-of-motoring-",
    "ownerEmail": null,
    "name": "BSM (British School of Motoring)",
    "category": "tutoring",
    "tagline": "Britain's original driving school since 1910",
    "about": "BSM has taught generations of UK drivers for over a century, offering manual and automatic driving lessons in modern dual-control cars.",
    "area": "Basingstoke & UK Wide",
    "phone": "0330 100 7501",
    "websiteUrl": "https://www.bsm.co.uk",
    "domain": "bsm.co.uk",
    "logoSrc": "https://logo.clearbit.com/bsm.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4074-0",
        "name": "Single 1-Hour Driving Lesson",
        "description": "Confidence building lesson on quiet residential roads.",
        "price": 36,
        "durationMins": 60
      },
      {
        "id": "s-4074-1",
        "name": "Mock DVSA Practical Driving Test",
        "description": "Realistic practice test conducted under official exam conditions.",
        "price": 50,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-kip-mcgrath-education",
    "ownerEmail": null,
    "name": "Kip McGrath Education",
    "category": "tutoring",
    "tagline": "Professional tutoring for Primary & Secondary pupils",
    "about": "Kip McGrath operates over 200 UK tuition centres staffed by fully qualified teachers providing targeted help in English and Maths.",
    "area": "UK Wide 200+ Tuition Centres",
    "phone": "0800 056 7890",
    "websiteUrl": "https://www.kipmcgrath.co.uk",
    "domain": "kipmcgrath.co.uk",
    "logoSrc": "https://logo.clearbit.com/kipmcgrath.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4075-0",
        "name": "Free Educational Assessment by Qualified Teacher",
        "description": "Evaluation of reading, comprehension, and math skills.",
        "price": 0,
        "durationMins": 60
      },
      {
        "id": "s-4075-1",
        "name": "In-Centre Weekly 80-Minute Session",
        "description": "Small group setting with individualized learning computer tasks.",
        "price": 34,
        "durationMins": 80
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-fleetwood-driving-school",
    "ownerEmail": null,
    "name": "Fleetwood Driving School",
    "category": "tutoring",
    "tagline": "Friendly driving instruction in Fleetwood & Fylde Coast",
    "about": "Fleetwood Driving School provides patient, highly-rated driving lessons across Fleetwood, Blackpool and the Lancashire coast.",
    "area": "Fleetwood & Lancashire",
    "phone": "01253 877990",
    "websiteUrl": "https://www.fleetwooddrivingschool.co.uk",
    "domain": "fleetwooddrivingschool.co.uk",
    "logoSrc": "https://logo.clearbit.com/fleetwooddrivingschool.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4076-0",
        "name": "1.5 Hour Lancashire Coastal Lesson",
        "description": "Dual-carriageway and junction driving tuition.",
        "price": 50,
        "durationMins": 90
      },
      {
        "id": "s-4076-1",
        "name": "Pass Plus Advanced Post-Test Course",
        "description": "Motorway driving, night driving, and adverse weather tuition.",
        "price": 210,
        "durationMins": 360
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-tui-travel-uk",
    "ownerEmail": null,
    "name": "TUI Travel UK",
    "category": "travel",
    "tagline": "Package holidays, flights & European cruises",
    "about": "TUI is the UK's leading travel company, offering beach holidays, city breaks, Marella cruises and direct flights from 20 UK airports.",
    "area": "Luton & 300+ Travel Agencies",
    "phone": "0203 451 2688",
    "websiteUrl": "https://www.tui.co.uk",
    "domain": "tui.co.uk",
    "logoSrc": "https://logo.clearbit.com/tui.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4077-0",
        "name": "Travel Clinic Holiday Planning Consultation",
        "description": "Face-to-face holiday booking assistance with a TUI travel expert.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4077-1",
        "name": "Airport Lounge Pass Booking",
        "description": "Fast-track security and VIP lounge access at major UK airports.",
        "price": 35,
        "durationMins": 15
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-u-travel-uk",
    "ownerEmail": null,
    "name": "U Travel UK",
    "category": "travel",
    "tagline": "Bespoke UK & European travel itineraries",
    "about": "U Travel UK provides luxury holiday planning, tailor-made European tours, hotel bookings, and corporate group travel.",
    "area": "London & UK Wide",
    "phone": "0800 999 1234",
    "websiteUrl": "https://www.utravel.uk",
    "domain": "utravel.uk",
    "logoSrc": "assets/business/utravel-logo.png",
    "coverSrc": "assets/business/utravel-cover.jpg",
    "services": [
      {
        "id": "s-4078-0",
        "name": "Bespoke European Itinerary Consultation",
        "description": "Tailored multi-city holiday itinerary design.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4078-1",
        "name": "Private Villa & Yacht Charter Booking",
        "description": "Exclusive luxury accommodation sourcing.",
        "price": 150,
        "durationMins": 60
      }
    ],
    "gallery": [
      "assets/business/utravel-cover.jpg",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-national-express-coaches",
    "ownerEmail": null,
    "name": "National Express Coaches",
    "category": "travel",
    "tagline": "Coach travel to 550+ UK cities & airports",
    "about": "National Express is the UK's largest scheduled coach operator, connecting hundreds of towns, cities and major airports with modern air-conditioned coaches.",
    "area": "Digbeth, Birmingham & 550+ UK Routes",
    "phone": "0871 781 8181",
    "websiteUrl": "https://www.nationalexpress.com",
    "domain": "nationalexpress.com",
    "logoSrc": "https://logo.clearbit.com/nationalexpress.com",
    "coverSrc": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4079-0",
        "name": "Airport Direct Coach Transfer Ticket",
        "description": "Direct coach transfer to Heathrow, Gatwick, Manchester or Stansted.",
        "price": 18,
        "durationMins": 120
      },
      {
        "id": "s-4079-1",
        "name": "Intercity Return Coach Ticket",
        "description": "Comfortable intercity coach travel with free Wi-Fi and power sockets.",
        "price": 25,
        "durationMins": 180
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-hays-travel",
    "ownerEmail": null,
    "name": "Hays Travel",
    "category": "travel",
    "tagline": "The UK's largest independent travel agent",
    "about": "Hays Travel operates over 450 retail branches across the UK, offering impartial advice and ATOL-protected holidays worldwide.",
    "area": "Sunderland & 450+ UK Branches",
    "phone": "0800 408 4040",
    "websiteUrl": "https://www.haystravel.co.uk",
    "domain": "haystravel.co.uk",
    "logoSrc": "https://logo.clearbit.com/haystravel.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4080-0",
        "name": "Worldwide Cruise & Tour Consultation",
        "description": "In-store consultation to compare worldwide ocean and river cruises.",
        "price": 0,
        "durationMins": 60
      },
      {
        "id": "s-4080-1",
        "name": "Foreign Currency Exchange Commission-Free",
        "description": "Euros, Dollars and 50+ currencies available for branch pickup.",
        "price": 0,
        "durationMins": 15
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-virgin-atlantic-holidays",
    "ownerEmail": null,
    "name": "Virgin Atlantic Holidays",
    "category": "travel",
    "tagline": "Long-haul flights & luxury resort holidays",
    "about": "Virgin Atlantic Holidays has created memorable long-haul trips to the USA, Caribbean, and Indian Ocean for over 35 years.",
    "area": "Crawley, West Sussex & UK Wide",
    "phone": "0344 557 3860",
    "websiteUrl": "https://www.virginholidays.co.uk",
    "domain": "virginholidays.co.uk",
    "logoSrc": "https://logo.clearbit.com/virginholidays.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4081-0",
        "name": "Orlando & Caribbean Holiday Design",
        "description": "Tailor-made Disney theme park or luxury beach resort trip planning.",
        "price": 0,
        "durationMins": 60
      },
      {
        "id": "s-4081-1",
        "name": "Upper Class Flight Upgrade Consultation",
        "description": "Lie-flat seat booking and Clubhouse lounge access advisory.",
        "price": 0,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-trailfinders",
    "ownerEmail": null,
    "name": "Trailfinders",
    "category": "travel",
    "tagline": "Tailor-made worldwide travel & safaris",
    "about": "Trailfinders is the UK's leading tailor-made travel specialist, having served over 16 million clients through 40+ travel centres.",
    "area": "Kensington, London & 40+ UK Centres",
    "phone": "020 7368 1200",
    "websiteUrl": "https://www.trailfinders.com",
    "domain": "trailfinders.com",
    "logoSrc": "https://logo.clearbit.com/trailfinders.com",
    "coverSrc": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4082-0",
        "name": "Australia & New Zealand Fly-Drive Itinerary",
        "description": "Custom multi-stop flight, motorhome or hotel itinerary design.",
        "price": 0,
        "durationMins": 60
      },
      {
        "id": "s-4082-1",
        "name": "African Safari & Wildlife Tour Package",
        "description": "Expert safari lodge reservation and private guide booking.",
        "price": 0,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-flight-centre-uk",
    "ownerEmail": null,
    "name": "Flight Centre UK",
    "category": "travel",
    "tagline": "Cheap flights, tailor-made trips & round-the-world",
    "about": "Flight Centre operates 80+ high street shops across the UK, providing airfare expertise, complex round-the-world flights, and holiday packages.",
    "area": "London & 80+ UK Travel Shops",
    "phone": "0808 256 0626",
    "websiteUrl": "https://www.flightcentre.co.uk",
    "domain": "flightcentre.co.uk",
    "logoSrc": "https://logo.clearbit.com/flightcentre.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4083-0",
        "name": "Round-the-World Multi-Stop Flight Quote",
        "description": "Complex airfare route optimization and luggage allowance advice.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4083-1",
        "name": "Business Class International Airfare Search",
        "description": "Discounted corporate and premium cabin fare search.",
        "price": 0,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-addison-lee-executive-chauffeurs",
    "ownerEmail": null,
    "name": "Addison Lee Executive Chauffeurs",
    "category": "travel",
    "tagline": "London's premier executive car & courier service",
    "about": "Addison Lee provides premium Mercedes executive cars, private hires, and VIP airport transfers across London and the UK.",
    "area": "Euston, London & Airports",
    "phone": "020 7387 8888",
    "websiteUrl": "https://www.addisonlee.com",
    "domain": "addisonlee.com",
    "logoSrc": "https://logo.clearbit.com/addisonlee.com",
    "coverSrc": "https://images.unsplash.com/photo-1476514525535-ce74f45814d1?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4084-0",
        "name": "London Airport Executive Mercedes Transfer",
        "description": "Flight tracking, meet-and-greet in arrivals hall, and Wi-Fi ride.",
        "price": 85,
        "durationMins": 60
      },
      {
        "id": "s-4084-1",
        "name": "Full Day Executive Driver & Chauffeur Hire",
        "description": "Dedicated driver for business meetings or events.",
        "price": 380,
        "durationMins": 480
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1476514525535-ce74f45814d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-taxassist-accountants",
    "ownerEmail": null,
    "name": "TaxAssist Accountants",
    "category": "legal",
    "tagline": "Accountancy & tax advice for small businesses",
    "about": "TaxAssist Accountants is the UK's largest network of accountants focused on small businesses, sole traders, and limited companies across 250+ storefront offices.",
    "area": "Norwich & 250+ UK Offices",
    "phone": "0800 0188 297",
    "websiteUrl": "https://www.taxassist.co.uk",
    "domain": "taxassist.co.uk",
    "logoSrc": "assets/business/tax-assist-logo.png",
    "coverSrc": "assets/business/tax-assist-cover.jpg",
    "services": [
      {
        "id": "s-4085-0",
        "name": "Free Small Business Initial Tax Review",
        "description": "Review of business structure, allowable expenses, and tax efficiency.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4085-1",
        "name": "Self-Assessment Tax Return Preparation",
        "description": "Complete income tax calculation and online HMRC filing.",
        "price": 175,
        "durationMins": 60
      }
    ],
    "gallery": [
      "assets/business/tax-assist-cover.jpg",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-co-op-legal-services",
    "ownerEmail": null,
    "name": "Co-op Legal Services",
    "category": "legal",
    "tagline": "Accessible fixed-fee legal advice & Will writing",
    "about": "Co-op Legal Services offers fixed-fee legal advice in probate, estate planning, family law, and personal injury backed by the trusted Co-op brand.",
    "area": "Bristol & Manchester",
    "phone": "0330 606 9500",
    "websiteUrl": "https://www.cooplegalservices.co.uk",
    "domain": "cooplegalservices.co.uk",
    "logoSrc": "https://logo.clearbit.com/cooplegalservices.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4086-0",
        "name": "Standard Single Will Drafting",
        "description": "Fixed-fee legally binding Will drafted by specialist solicitor.",
        "price": 150,
        "durationMins": 45
      },
      {
        "id": "s-4086-1",
        "name": "Lasting Power of Attorney (LPA) Drafting",
        "description": "Health/Welfare or Property/Financial LPA preparation.",
        "price": 240,
        "durationMins": 60
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-slater-and-gordon-lawyers",
    "ownerEmail": null,
    "name": "Slater and Gordon Lawyers",
    "category": "legal",
    "tagline": "Personal injury, employment & family law solicitors",
    "about": "Slater and Gordon is one of the UK's best-known consumer law firms, providing expert advice in personal injury, employment disputes, and family law.",
    "area": "Manchester & London",
    "phone": "0330 041 5869",
    "websiteUrl": "https://www.slatergordon.co.uk",
    "domain": "slatergordon.co.uk",
    "logoSrc": "https://logo.clearbit.com/slatergordon.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4087-0",
        "name": "No-Win No-Fee Personal Injury Claim Assessment",
        "description": "Free legal evaluation of accident or workplace injury claims.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4087-1",
        "name": "Employment Contract & Redundancy Consultation",
        "description": "Review of settlement agreements and employment disputes.",
        "price": 150,
        "durationMins": 45
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-kpmg-uk",
    "ownerEmail": null,
    "name": "KPMG UK",
    "category": "legal",
    "tagline": "Audit, tax & business advisory services",
    "about": "KPMG UK is one of the Big Four accounting firms, employing over 17,000 people providing audit, corporate tax, M&A advisory, and digital transformation.",
    "area": "Canary Wharf, London & 20 UK Offices",
    "phone": "020 7311 1000",
    "websiteUrl": "https://home.kpmg/uk",
    "domain": "home.kpmg",
    "logoSrc": "https://logo.clearbit.com/home.kpmg",
    "coverSrc": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4088-0",
        "name": "Corporate Tax Advisory & Structure Review",
        "description": "Corporate tax optimization and international compliance.",
        "price": 450,
        "durationMins": 90
      },
      {
        "id": "s-4088-1",
        "name": "ESG & Sustainability Business Audit",
        "description": "Assessment of corporate environmental footprint and ESG reporting.",
        "price": 600,
        "durationMins": 120
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-bdo-uk-llp",
    "ownerEmail": null,
    "name": "BDO UK LLP",
    "category": "legal",
    "tagline": "Accountancy & business advisory for mid-market businesses",
    "about": "BDO UK provides tax, audit, and financial advisory services to ambitious UK businesses, operating 18 offices across the country.",
    "area": "Marylebone, London & 18 UK Offices",
    "phone": "020 7486 5888",
    "websiteUrl": "https://www.bdo.co.uk",
    "domain": "bdo.co.uk",
    "logoSrc": "https://logo.clearbit.com/bdo.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4089-0",
        "name": "R&D Tax Credits Assessment & Claim Filing",
        "description": "Identification of qualifying innovation costs for HMRC tax relief.",
        "price": 350,
        "durationMins": 90
      },
      {
        "id": "s-4089-1",
        "name": "Statutory Financial Audit Planning",
        "description": "Comprehensive corporate audit strategy and risk evaluation.",
        "price": 500,
        "durationMins": 120
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-qualitysolicitors",
    "ownerEmail": null,
    "name": "QualitySolicitors",
    "category": "legal",
    "tagline": "Clear legal advice with no hidden costs",
    "about": "QualitySolicitors is a national network of top independent law firms offering clear, straightforward legal advice for individuals and small businesses.",
    "area": "UK Wide Law Firm Network",
    "phone": "0808 274 7977",
    "websiteUrl": "https://www.qualitysolicitors.com",
    "domain": "qualitysolicitors.com",
    "logoSrc": "https://logo.clearbit.com/qualitysolicitors.com",
    "coverSrc": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4090-0",
        "name": "Same-Day Initial Legal Consultation",
        "description": "First 45-minute consultation with a local qualified solicitor.",
        "price": 99,
        "durationMins": 45
      },
      {
        "id": "s-4090-1",
        "name": "Residential Property Conveyancing Estimate",
        "description": "Fixed fee quote for property purchasing or selling legal work.",
        "price": 0,
        "durationMins": 30
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-irwin-mitchell-solicitors",
    "ownerEmail": null,
    "name": "Irwin Mitchell Solicitors",
    "category": "legal",
    "tagline": "Full-service law firm for personal & business law",
    "about": "Irwin Mitchell is one of the UK's largest full-service law firms with 15 offices providing legal expertise in personal injury, medical negligence, wills and corporate law.",
    "area": "Sheffield & 15 UK Offices",
    "phone": "0808 163 9484",
    "websiteUrl": "https://www.irwinmitchell.com",
    "domain": "irwinmitchell.com",
    "logoSrc": "https://logo.clearbit.com/irwinmitchell.com",
    "coverSrc": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4091-0",
        "name": "Medical Negligence Free Claim Assessment",
        "description": "Specialist evaluation of NHS or private healthcare negligence.",
        "price": 0,
        "durationMins": 45
      },
      {
        "id": "s-4091-1",
        "name": "Complex Trust & High-Net-Worth Estate Planning",
        "description": "Tax planning and inheritance trust structure design.",
        "price": 350,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-shoosmiths-law-firm",
    "ownerEmail": null,
    "name": "Shoosmiths Law Firm",
    "category": "legal",
    "tagline": "Leading UK law firm serving commercial & private clients",
    "about": "Shoosmiths is a major UK law firm with 13 offices advising UK national brands, real estate developers, private equity firms and wealthy individuals.",
    "area": "Northampton & 13 UK Offices",
    "phone": "0370 086 3000",
    "websiteUrl": "https://www.shoosmiths.co.uk",
    "domain": "shoosmiths.co.uk",
    "logoSrc": "https://logo.clearbit.com/shoosmiths.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4092-0",
        "name": "Commercial Contract Review & Drafting",
        "description": "B2B contract, SLA, and terms & conditions legal review.",
        "price": 295,
        "durationMins": 60
      },
      {
        "id": "s-4092-1",
        "name": "Commercial Property Lease Negotiations",
        "description": "Landlord and tenant lease negotiation for retail and office spaces.",
        "price": 400,
        "durationMins": 90
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-pixcision-stock-studio-photography",
    "ownerEmail": null,
    "name": "Pixcision Stock & Studio Photography",
    "category": "events",
    "tagline": "High-end commercial, corporate & event photography",
    "about": "Pixcision is a premier commercial photography studio based at MediaCityUK, capturing corporate headshots, product photography, and major live events.",
    "area": "MediaCityUK, Salford & Manchester",
    "phone": "0161 800 9100",
    "websiteUrl": "https://www.pixcision.com",
    "domain": "pixcision.com",
    "logoSrc": "assets/business/pixcisionstock-logo.png",
    "coverSrc": "assets/business/pixcisionstock-cover.jpg",
    "services": [
      {
        "id": "s-4093-0",
        "name": "Corporate Studio Headshot Session",
        "description": "Studio lighting, 3 retouched high-res digital images.",
        "price": 95,
        "durationMins": 45
      },
      {
        "id": "s-4093-1",
        "name": "Half-Day Event Photography Coverage",
        "description": "4 hours of candid event coverage with full digital gallery release.",
        "price": 350,
        "durationMins": 240
      }
    ],
    "gallery": [
      "assets/business/pixcisionstock-cover.jpg",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-memuriah-digital-memorials",
    "ownerEmail": null,
    "name": "Memuriah Digital Memorials",
    "category": "events",
    "tagline": "Social memorial platform & digital legacies",
    "about": "Memuriah provides elegant digital tribute spaces, QR physical memorial plaques, and social legacy preservation for families across the UK.",
    "area": "London & UK Wide",
    "phone": "0800 772 3000",
    "websiteUrl": "https://www.memuriah.com",
    "domain": "memuriah.com",
    "logoSrc": "assets/business/memuriah-logo.png",
    "coverSrc": "assets/business/memuriah-cover.jpg",
    "services": [
      {
        "id": "s-4094-0",
        "name": "Lifetime Digital Memorial Page Creation",
        "description": "Permanent online tribute page with photo gallery, video, and memory guestbook.",
        "price": 79,
        "durationMins": 30
      },
      {
        "id": "s-4094-1",
        "name": "Weatherproof Brass QR Memorial Plaque",
        "description": "Laser-engraved brass plaque linking directly to online memorial.",
        "price": 129,
        "durationMins": 30
      }
    ],
    "gallery": [
      "assets/business/memuriah-cover.jpg",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-the-hopton-wedding-event-planners",
    "ownerEmail": null,
    "name": "The Hopton Wedding & Event Planners",
    "category": "events",
    "tagline": "Luxury wedding coordination & event styling in Cheshire",
    "about": "The Hopton is an acclaimed North West event planning studio creating bespoke luxury weddings, marquee parties, and corporate galas.",
    "area": "Manchester & Cheshire",
    "phone": "0161 990 4400",
    "websiteUrl": "https://www.hoptonevents.co.uk",
    "domain": "hoptonevents.co.uk",
    "logoSrc": "https://logo.clearbit.com/hoptonevents.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4095-0",
        "name": "Wedding Full Design & Coordination Consultation",
        "description": "In-depth concept design, budget creation, and supplier matching.",
        "price": 150,
        "durationMins": 90
      },
      {
        "id": "s-4095-1",
        "name": "On-the-Day Wedding Management",
        "description": "12 hours of discreet coordination on your wedding day.",
        "price": 750,
        "durationMins": 720
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-production-park-event-staging",
    "ownerEmail": null,
    "name": "Production Park Event Staging",
    "category": "events",
    "tagline": "World-class arena staging, lighting & sound hire",
    "about": "Production Park is Europe's premier live event technology campus, designing concert stages, LED screens, and audio systems for major tours and festivals.",
    "area": "South Elmsall, Yorkshire",
    "phone": "01977 659500",
    "websiteUrl": "https://www.productionpark.co.uk",
    "domain": "productionpark.co.uk",
    "logoSrc": "https://logo.clearbit.com/productionpark.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4096-0",
        "name": "Festival Stage & Audio Tech Planning",
        "description": "3D CAD stage design and acoustic sound coverage assessment.",
        "price": 250,
        "durationMins": 120
      },
      {
        "id": "s-4096-1",
        "name": "Indoor Concert LED Video Wall Rental",
        "description": "High-resolution 4K modular LED screen rigging.",
        "price": 850,
        "durationMins": 360
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-rhubarb-hospitality-collection",
    "ownerEmail": null,
    "name": "Rhubarb Hospitality Collection",
    "category": "events",
    "tagline": "Bespoke luxury event catering & banqueting",
    "about": "Rhubarb is one of the UK's premier luxury caterers, serving state banquets, high-profile weddings, and galas at iconic venues like the Royal Albert Hall.",
    "area": "Wimbledon, London & Iconic UK Venues",
    "phone": "020 8812 3200",
    "websiteUrl": "https://www.rhubarb.co.uk",
    "domain": "rhubarb.co.uk",
    "logoSrc": "https://logo.clearbit.com/rhubarb.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4097-0",
        "name": "3-Course Gourmet Dinner Tasting for 2",
        "description": "Private chef tasting session to finalize wedding or banquet menu.",
        "price": 120,
        "durationMins": 120
      },
      {
        "id": "s-4097-1",
        "name": "Bespoke Event Canapé & Cocktail Package",
        "description": "Luxury hand-crafted hot & cold canapés with sommelier paired wines.",
        "price": 45,
        "durationMins": 180
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  },
  {
    "id": "biz-qube-events-venue-styling",
    "ownerEmail": null,
    "name": "Qube Events & Venue Styling",
    "category": "events",
    "tagline": "Award-winning venue dressing, floral design & props",
    "about": "Qube Events is an award-winning venue styling agency specializing in floral installations, balloon arches, custom backdrops, and furniture hire.",
    "area": "Bury, Greater Manchester",
    "phone": "0161 773 8444",
    "websiteUrl": "https://www.qubeevents.co.uk",
    "domain": "qubeevents.co.uk",
    "logoSrc": "https://logo.clearbit.com/qubeevents.co.uk",
    "coverSrc": "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4098-0",
        "name": "Showroom Design Consultation & Moodboard",
        "description": "Explore table centerpieces, lighting, and floral arches in person.",
        "price": 0,
        "durationMins": 60
      },
      {
        "id": "s-4098-1",
        "name": "Luxury Floral Arch & Flower Wall Installation",
        "description": "On-site delivery and styling of fresh or silk floral photo backdrops.",
        "price": 350,
        "durationMins": 180
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "priority",
    "billing": "monthly"
  },
  {
    "id": "biz-contraband-entertainment-agency",
    "ownerEmail": null,
    "name": "Contraband Entertainment Agency",
    "category": "events",
    "tagline": "Top UK live event bands, DJs, acrobats & performers",
    "about": "Contraband is one of the UK's top entertainment booking agencies, providing thousands of live musicians, celebrity DJs, circus acts, and magicians.",
    "area": "London & UK Nationwide",
    "phone": "020 8829 1180",
    "websiteUrl": "https://www.contrabandevents.com",
    "domain": "contrabandevents.com",
    "logoSrc": "https://logo.clearbit.com/contrabandevents.com",
    "coverSrc": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    "services": [
      {
        "id": "s-4099-0",
        "name": "4-Piece Live Party Band 2x 45-Min Sets",
        "description": "Professional cover band with PA system and stage lighting.",
        "price": 950,
        "durationMins": 240
      },
      {
        "id": "s-4099-1",
        "name": "Corporate Event DJ & Saxophone Duo",
        "description": "Club DJ paired with live roaming saxophonist.",
        "price": 650,
        "durationMins": 180
      }
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
    ],
    "tier": "featured",
    "billing": "monthly"
  }
];

function loadBusinesses() {
  try {
    // Saved copies of retired demo listings would otherwise outlive their
    // removal from the code, since saving writes the merged set back out.
    const storedVersion = Number(localStorage.getItem(BUSINESS_SEED_VERSION_KEY) || 0);
    if (storedVersion < BUSINESS_SEED_VERSION) {
      localStorage.removeItem(BUSINESSES_KEY);
      localStorage.setItem(BUSINESS_SEED_VERSION_KEY, String(BUSINESS_SEED_VERSION));
      return SEED_BUSINESSES.map(b => ({ ...b }));
    }
  } catch (e) { /* ignore storage failure */ }

  try {
    const raw = localStorage.getItem(BUSINESSES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Seeds are re-merged on load so a new demo listing appears for people
        // who already have storage, without touching anything they've edited.
        const own = parsed.filter(b => b && b.id);
        const ids = new Set(own.map(b => b.id));
        return own.concat(SEED_BUSINESSES.filter(s => !ids.has(s.id)));
      }
    }
  } catch (e) { /* ignore corrupt storage */ }
  return SEED_BUSINESSES.map(b => ({ ...b }));
}

function saveBusinesses() {
  try { localStorage.setItem(BUSINESSES_KEY, JSON.stringify(state.businesses)); } catch (e) { /* ignore */ }
}

function loadBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) return parsed;
  } catch (e) { /* ignore corrupt storage */ }
  return [];
}

function saveBookings() {
  try { localStorage.setItem(BOOKINGS_KEY, JSON.stringify(state.bookings)); } catch (e) { /* ignore */ }
}

const BUSINESS_MESSAGES_KEY = 'graftr_business_messages';

function loadBusinessMessages() {
  try {
    const parsed = JSON.parse(localStorage.getItem(BUSINESS_MESSAGES_KEY) || '[]');
    if (Array.isArray(parsed)) return parsed;
  } catch (e) { /* ignore corrupt storage */ }
  return [];
}

function saveBusinessMessages() {
  try { localStorage.setItem(BUSINESS_MESSAGES_KEY, JSON.stringify(state.businessMessages)); } catch (e) { /* ignore */ }
}

function businessById(id) {
  return (state.businesses || []).find(b => b.id === id) || null;
}

// A listing is only public once it has a name — creating one starts a draft,
// and an unnamed draft must never show up in front of customers.
function isBusinessLive(b) {
  return !!(b && String(b.name || '').trim());
}

// Paid placement applies here: Priority listings sit above Featured, which sit
// above Basic, and only then does recency decide.
function businessesInCategory(categoryId) {
  return (state.businesses || [])
    .filter(b => b.category === categoryId && isBusinessLive(b))
    .slice()
    .sort(byTierThenRecency);
}

// The home screen carries the listings that paid to be seen there. Basic is a
// category listing only, so it doesn't appear.
function featuredBusinesses(limit) {
  return (state.businesses || [])
    .filter(b => isBusinessLive(b) && tierOf(b).rank > 0)
    .slice()
    .sort(byTierThenRecency)
    .slice(0, limit || 6);
}

// SETUP ONLY. Lets one operator create and edit every listing from /business
// while the accounts are being built, rather than one listing per sign-in.
// Set to false (or delete this and the admin bar) to hand each business its
// own account and nothing else.
const ADMIN_MODE = true;

// The listing owned by whoever is signed in on /business, if they've made one.
// In admin mode, whichever listing the operator has selected instead.
function myBusiness() {
  if (ADMIN_MODE && state.adminEditingId) {
    const picked = businessById(state.adminEditingId);
    if (picked) return picked;
  }
  const email = state.authUser && state.authUser.email;
  if (!email) return null;
  return (state.businesses || []).find(
    b => b.ownerEmail && b.ownerEmail.toLowerCase() === String(email).toLowerCase()
  ) || null;
}

function serviceById(business, serviceId) {
  if (!business) return null;
  return (business.services || []).find(s => s.id === serviceId) || null;
}

// Services book further ahead than groceries deliver.
const SERVICE_BOOKING_DAYS = 14;

function serviceDayLabel(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  if (offset === 0) return 'Today';
  if (offset === 1) return 'Tomorrow';
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function serviceSlotsFor(offset) {
  const now = new Date();
  const earliest = offset === 0 ? now.getHours() + 2 : 0;   // two hours' notice
  return DELIVERY_SLOT_HOURS
    .filter(h => h >= earliest)
    .map(h => `${String(h).padStart(2, '0')}:00`);
}

function serviceSlotTimestamp(offset, slot) {
  const hour = parseInt(String(slot).slice(0, 2), 10);
  if (Number.isNaN(hour)) return null;
  const d = new Date();
  d.setDate(d.getDate() + (offset || 0));
  d.setHours(hour, 0, 0, 0);
  return d.getTime();
}

// --- bookings held in the basket -------------------------------------------

function bookingLines() {
  return (state.bookingCart || []).map(b => ({
    ...b,
    business: businessById(b.businessId),
  }));
}

function bookingsTotal() {
  return (state.bookingCart || []).reduce((sum, b) => sum + (b.price || 0), 0);
}

function bookingCount() {
  return (state.bookingCart || []).length;
}

// A basket of services alone has nothing for a courier to carry, so it doesn't
// attract a delivery fee and never reaches the courier pool.
function basketHasDelivery() {
  return cartLines().length > 0;
}

const state = {
  screen: 'login',
  mode: null,
  authRole: PATH_ROLE,
  showAuthModal: false,
  authProvider: null,
  emailAuthMode: 'login',
  authError: null,
  authNotice: null,
  showGoogleFallbackButton: false,
  authUser: loadAuthUser(),
  userProfile: loadUserProfile(),
  orders: loadLoggedOrders(),
  activeOrderId: null,
  showAddressModal: false,
  showCheckoutModal: false,
  // Local services marketplace
  businesses: loadBusinesses(),
  bookings: loadBookings(),
  businessMessages: loadBusinessMessages(),
  bookingCart: [],                 // bookings sitting in the basket, unpaid
  servicesCategory: null,          // category being browsed
  activeBusinessId: null,          // business page being viewed
  bookingDraft: null,              // { businessId, serviceId, dayOffset, slot }
  businessTab: 'page',             // business dashboard section
  businessEditor: null,            // working copy while editing the listing
  businessNotice: null,            // confirmation shown after saving/publishing
  confirmingBusinessDelete: false, // delete listing is a two-tap action
  adminEditingId: null,            // setup-only: which listing the operator is editing
  planBilling: 'monthly',          // monthly | annual
  planChoice: null,                // tier being considered in the picker
  subscribing: false,
  planError: null,
  placingOrder: false,
  checkoutError: null,
  scannerStatus: null,
  manualBarcodeInput: '',
  aiChatOpen: false,
  aiMessages: [
    { role: 'bot', text: "👋 Hi! I'm your Vendaru AI Assistant. Ask me to find items, recommend groceries, or locate verified local UK services!" }
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
  deliveryDayOffset: 0,
  deliverySlot: null,
  loyaltyRedeemed: loadLoyaltyRedeemed(),
  // productId -> how many units of it are free in the basket right now. Held in
  // memory alongside the cart on purpose: the stamp isn't spent until the order
  // is placed, so emptying the basket or reloading hands the reward back.
  loyaltyFree: {},
  showLoyaltyPicker: false,
  ...loadInbox(),
  basketCheckedOut: false,
  trackStep: 2,
  shopImages: { morrisons: null, track: null, offers: null, local: null },
  cart: {},
  savedForLater: loadSavedForLater(),
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
// The account is shared across both URLs (same origin), so the path — not the role
// stored at signup — decides which app you land in.
if (state.authUser) {
  state.mode = PATH_ROLE;
  state.screen = PATH_ROLE === 'courier' ? 'courier-activity'
    : PATH_ROLE === 'business' ? 'business-dashboard'
    : 'shopper-shop';
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

// Saved-for-later outlives the basket on purpose: the cart is in-memory only
// and empties on reload, whereas "later" is worthless if it doesn't come back.
function loadSavedForLater() {
  try {
    const saved = localStorage.getItem('graftr_saved_items');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (e) { /* ignore corrupt storage */ }
  return {};
}

function saveSavedForLater() {
  try { localStorage.setItem('graftr_saved_items', JSON.stringify(state.savedForLater)); } catch (e) { /* ignore */ }
}

function savedLines() {
  return Object.entries(state.savedForLater || {})
    .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty }))
    .filter((l) => l.product && l.qty > 0);
}


function cartCount() {
  return cartLines().reduce((sum, l) => sum + l.qty, 0);
}

// Free units can never outnumber what's actually in the basket — if the item is
// removed or reduced, the reward stops applying (and the stamp comes back).
function freeQtyFor(productId, cartQty) {
  const claimed = (state.loyaltyFree || {})[productId] || 0;
  return Math.max(0, Math.min(claimed, cartQty));
}

// Drop reservations for items that have left the basket, so re-adding the same
// product later doesn't quietly come out free.
function pruneLoyaltyFree() {
  Object.keys(state.loyaltyFree || {}).forEach((id) => {
    const inCart = state.cart[id] || 0;
    if (inCart <= 0) delete state.loyaltyFree[id];
    else if (state.loyaltyFree[id] > inCart) state.loyaltyFree[id] = inCart;
  });
}

// Rewards attached to the current basket but not yet paid for.
function loyaltyPendingFree() {
  return cartLines().reduce((sum, l) => sum + freeQtyFor(l.product.id, l.qty), 0);
}

function cartSubtotal() {
  return cartLines().reduce((sum, l) => sum + l.qty * l.product.estimated_price_gbp, 0);
}

function loyaltyDiscount() {
  return cartLines().reduce(
    (sum, l) => sum + freeQtyFor(l.product.id, l.qty) * l.product.estimated_price_gbp, 0
  );
}

function cartTotal() {
  return Math.max(0, cartSubtotal() - loyaltyDiscount());
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
  const isBusiness = state.authRole === 'business';
  return `
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 24px;gap:24px;text-align:center;min-height:580px;background:#ffffff">
    
    <!-- Brand wordmark. Swapping assets/brand/logo.svg changes it everywhere. -->
    <img src="assets/brand/logo.svg" alt="Vendaru" width="200"
         style="width:200px;max-width:62%;height:auto;display:block" />

    <div>
      <div style="font-size:27px;font-weight:800;letter-spacing:-0.6px;color:#141414">Welcome</div>
      <div style="font-size:13.5px;color:#6b6b6b;margin-top:6px;line-height:1.45;max-width:280px">${isCourier ? 'Courier sign-in · Bolton delivery network' : isBusiness ? 'List your business and take bookings across Bolton' : 'Groceries, couriers &amp; local services in Bolton'}</div>
    </div>

    <!-- Which app you're signing into is set by the URL, not a toggle. -->
    <div style="display:inline-flex;align-items:center;gap:7px;background:#f2f2f2;border-radius:20px;padding:7px 14px;font-size:12.5px;font-weight:700;color:#141414">
      ${isCourier ? '🚴 Courier app' : isBusiness ? '🏪 Business app' : '🛒 Customer app'}
    </div>

    ${state.authNotice ? `
      <div style="width:100%;max-width:330px;background:#fafafa;border:1.5px solid #d4d4d4;color:#141414;border-radius:16px;padding:12px 14px;font-size:12.5px;text-align:left;line-height:1.45">
        ${escapeHtml(state.authNotice)}
      </div>
    ` : ''}

    <!-- Clean High-Aesthetic Authentication Buttons -->
    <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:330px">
      <!-- Google Sign-In: our styled button until One Tap needs the fallback, then Google's real button takes its place (never both at once) -->
      ${state.showGoogleFallbackButton ? `<div id="google-signin-button-container" style="display:flex;justify-content:center;width:100%"></div>` : `
      <button type="button" data-action="loginWithGoogle" style="width:100%;background:#ffffff;color:#141414;border:1.5px solid rgba(20,20,20,0.12);border-radius:18px;padding:14px 18px;font-size:14.5px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:12px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,0.04);transition:all 0.2s">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        Continue with Google
      </button>
      `}

      <!-- Email & Password — defaults to logging in; signing up is the link below. -->
      <button type="button" data-action="loginWithEmail" style="width:100%;background:#141414;color:#ffffff;border:none;border-radius:18px;padding:14px 18px;font-size:14.5px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;box-shadow:0 6px 18px rgba(20,20,20,0.18)">
        Log In with Email
      </button>
    </div>

    <!-- Sign-up entry point for anyone without an account yet. -->
    <div style="font-size:13px;color:#5c5c5c;max-width:330px">
      New to Vendaru?
      <span class="press" data-action="openEmailSignup" style="color:#141414;font-weight:800;text-decoration:underline;text-underline-offset:2px;cursor:pointer;margin-left:2px">Sign Up Here</span>
    </div>

    <!-- Escape hatch for anyone who landed on the wrong URL. -->
    <div style="display:flex;flex-direction:column;gap:9px;align-items:center">
      ${(isCourier || isBusiness) ? `<a href="/" style="font-size:12px;color:#5c5c5c;font-weight:700;text-decoration:underline;text-underline-offset:2px">Looking to order? Go to the customer app</a>` : ''}
      ${!isCourier ? `<a href="${ROLE_PATH}" style="font-size:12px;color:#5c5c5c;font-weight:700;text-decoration:underline;text-underline-offset:2px">Are you a courier? Go to the courier app</a>` : ''}
      ${!isBusiness ? `<a href="${BUSINESS_PATH}" style="font-size:12px;color:#5c5c5c;font-weight:700;text-decoration:underline;text-underline-offset:2px">Run a business? List it on Vendaru</a>` : ''}
    </div>

    <div style="font-size:11px;color:#9a9a9a;max-width:270px;line-height:1.45">
      By continuing, you agree to Vendaru's Terms of Service and Privacy Policy.
    </div>
  </div>`;
}

function renderAuthModal() {
  if (!state.showAuthModal || state.authProvider !== 'email') return '';

  const roleTitle = state.authRole === 'courier' ? 'Courier'
    : state.authRole === 'business' ? 'Business'
    : 'Shopper';
  const isLogin = state.emailAuthMode === 'login';
  return `
    <div class="graftr-modal-overlay" style="z-index:99999;background:rgba(0,0,0,0.85);backdrop-filter:blur(6px);justify-content:center;align-items:center;padding:24px">
      <div style="width:100%;max-width:370px;max-height:100%;overflow-y:auto;background:#ffffff;border-radius:24px;padding:24px;display:flex;flex-direction:column;gap:16px;box-shadow:0 20px 40px rgba(0,0,0,0.3);text-align:center">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:16px;font-weight:800;color:#141414">${isLogin ? 'Log In' : 'Create Your Account'}</span>
          </div>
          <button type="button" data-action="closeAuthModal" style="background:none;border:none;color:#6b6b6b;font-size:22px;cursor:pointer">✕</button>
        </div>

        <div style="font-size:12.5px;color:#5c5c5c;text-align:left;line-height:1.45;margin-top:-6px">
          ${isLogin
            ? 'Welcome back — sign in to pick up where you left off.'
            : `Set up your Vendaru ${roleTitle.toLowerCase()} account. It only takes a moment.`}
        </div>

        ${state.authError ? `<div style="background:#f2f2f2;border:1.5px solid #d4d4d4;color:#141414;border-radius:12px;padding:10px 12px;font-size:12.5px;text-align:left;line-height:1.4">${escapeHtml(state.authError)}</div>` : ''}

        <div style="display:flex;flex-direction:column;gap:10px;text-align:left">
          ${!isLogin ? `
            <div>
              <label style="font-size:11.5px;font-weight:700;color:#5c5c5c;margin-bottom:3px;display:block">Full Name</label>
              <input type="text" id="email-setup-name" placeholder="Your full name" value="" style="width:100%;padding:11px 12px;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;font-size:13.5px;font-weight:600" />
            </div>
          ` : ''}
          <div>
            <label style="font-size:11.5px;font-weight:700;color:#5c5c5c;margin-bottom:3px;display:block">Email Address</label>
            <input type="email" id="email-setup-email" placeholder="name@example.com" value="" style="width:100%;padding:11px 12px;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;font-size:13.5px;font-weight:600" />
          </div>
          <div>
            <label style="font-size:11.5px;font-weight:700;color:#5c5c5c;margin-bottom:3px;display:block">Password</label>
            <input type="password" id="email-setup-password" placeholder="At least 6 characters" value="" style="width:100%;padding:11px 12px;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;font-size:13.5px;font-weight:600" />
          </div>
          ${!isLogin ? `
            <div>
              <label style="font-size:11.5px;font-weight:700;color:#5c5c5c;margin-bottom:3px;display:block">Delivery Address (Bolton Hub)</label>
              <input type="text" id="email-setup-address" value="${escapeHtml(state.userProfile.address || '')}${state.userProfile.postcode ? ', ' + escapeHtml(state.userProfile.postcode) : ''}" placeholder="Your address" style="width:100%;padding:11px 12px;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;font-size:13.5px;font-weight:600" />
            </div>
          ` : ''}
        </div>

        <button type="button" data-action="confirmEmailAuthSetup" style="width:100%;background:#141414;color:#fff;border:none;padding:15px;border-radius:16px;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,0.18);margin-top:4px">
          ${isLogin ? 'Log In' : 'Create Account'}
        </button>

        <div style="font-size:12.5px;color:#5c5c5c">
          ${isLogin ? 'New to Vendaru?' : 'Already have an account?'}
          <span class="press" data-action="setEmailAuthMode" data-arg="${isLogin ? 'signup' : 'login'}" style="color:#141414;font-weight:800;text-decoration:underline;text-underline-offset:2px;cursor:pointer;margin-left:2px">
            ${isLogin ? 'Sign Up Here' : 'Log In'}
          </span>
        </div>
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
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:14px 16px;display:flex;flex-direction:column;gap:10px;margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">
        <span style="font-size:12.5px;color:#6b6b6b">New job · ${o.id}</span>
        <span style="font-size:14px;font-weight:600;color:#141414;flex:0 0 auto">£${o.total ? o.total.toFixed(2) : '7.80'}</span>
      </div>
      <div>
        <div style="font-size:14px;font-weight:500;line-height:1.45">${escapeHtml(o.merchant)} to ${escapeHtml(o.address)}</div>
        <div style="font-size:12.5px;color:#6b6b6b;margin-top:2px">${o.items ? o.items.length : 1} items · ${escapeHtml(state.userProfile.name)}</div>
      </div>
      <button type="button" data-action="acceptCourierJob" data-arg="${o.id}" style="background:#141414;color:#fff;border:none;padding:11px;border-radius:12px;font-weight:600;font-size:13.5px;cursor:pointer;width:100%;font-family:inherit">
        Accept job
      </button>
    </div>
  `).join('') : '';

  const activeOrder = state.orders.find(o => o.status === 'Out for Delivery');

  let inner;

  if (state.justDeliveredOrderId) {
    const deliveredOrder = state.orders.find(o => o.id === state.justDeliveredOrderId);
    inner = `
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:8px;align-items:center;text-align:center">
      <div style="font-size:16px;font-weight:600">Delivered · +£${deliveredOrder && deliveredOrder.total ? deliveredOrder.total.toFixed(2) : '0.00'}</div>
      <div style="font-size:13px;color:#6b6b6b">Nice work on ${deliveredOrder ? deliveredOrder.id : 'that order'}. Ready for the next one?</div>
      <button type="button" data-action="dismissDeliveryConfirmation" style="background:#141414;color:#fff;border:none;border-radius:12px;padding:10px 22px;font-weight:600;font-size:13.5px;cursor:pointer;margin-top:4px;font-family:inherit">Continue</button>
    </div>`;
  } else if (!activeOrder) {
    inner = `
    ${pendingJobsHtml}
    <div style="padding:18px 0;text-align:center">
      <div style="font-size:14px;font-weight:500;color:#141414">No active delivery</div>
      <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.5">${pendingOrders.length > 0 ? 'Accept a job above to get started.' : 'New orders appear here as soon as a shopper places one.'}</div>
    </div>`;
  } else {
    const itemCount = activeOrder.items ? activeOrder.items.length : 1;
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeOrder.address)}`;
    const customerTel = (state.userProfile.phone || '').replace(/[^0-9+]/g, '');
    inner = `
    ${pendingJobsHtml}
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:14px 16px;display:flex;flex-direction:column;gap:4px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">
        <span style="font-size:12.5px;color:#6b6b6b">In progress · ${activeOrder.id}</span>
        <span style="font-size:14px;font-weight:600;flex:0 0 auto">£${activeOrder.total ? activeOrder.total.toFixed(2) : '0.00'}</span>
      </div>
      <div style="font-size:14px;font-weight:500;margin-top:3px;line-height:1.45">${escapeHtml(activeOrder.merchant)} to ${escapeHtml(activeOrder.address)}</div>
      <div style="font-size:12.5px;color:#6b6b6b">${escapeHtml(state.userProfile.name)} · ${itemCount} item${itemCount > 1 ? 's' : ''}</div>
    </div>
    <div style="display:flex;gap:10px">
      <a href="${mapsUrl}" target="_blank" rel="noopener" class="press" style="flex:1;background:#141414;color:#fff;border-radius:12px;padding:12px;text-align:center;font-weight:600;font-size:13.5px;cursor:pointer;text-decoration:none;display:block;box-sizing:border-box">Navigate</a>
      <a href="tel:${customerTel}" class="press" style="flex:1;background:#fff;border:1.5px solid rgba(20,20,20,0.15);color:#141414;border-radius:12px;padding:12px;text-align:center;font-weight:600;font-size:13.5px;cursor:pointer;text-decoration:none;display:block;box-sizing:border-box">Call customer</a>
    </div>
    <div style="display:flex;gap:10px">
      ${activeOrder.pickedUp
        ? `<div style="flex:1;border:1.5px solid rgba(20,20,20,0.1);color:#9a9a9a;border-radius:12px;padding:12px;text-align:center;font-weight:500;font-size:13.5px">Picked up</div>`
        : `<div class="press" data-action="markPickedUp" style="flex:1;background:#fff;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;padding:12px;text-align:center;font-weight:600;font-size:13.5px;cursor:pointer">Mark picked up</div>`}
      ${activeOrder.pickedUp
        ? `<div class="press" data-action="markDelivered" style="flex:1;background:#141414;color:#fff;border-radius:12px;padding:12px;text-align:center;font-weight:600;font-size:13.5px;cursor:pointer">Mark delivered</div>`
        : `<div style="flex:1;background:#f2f2f2;color:#9a9a9a;border-radius:12px;padding:12px;text-align:center;font-weight:500;font-size:13.5px">Mark delivered</div>`}
    </div>`;
  }

  const trackingCard = `
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:16px;display:flex;flex-direction:column;gap:14px">
        <span style="font-size:12.5px;font-weight:600;color:#6b6b6b">Deliveries</span>
        ${inner}
      </div>
    </div>`;

  const messagesCard = `
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:16px;display:flex;flex-direction:column;gap:12px">
        ${renderInboxHeader(state.courierInbox, 'markAllCourierRead', 'Messages', '12.5px')}
        <div id="courier-inbox-messages" style="max-height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding-right:2px">
          ${renderInboxList(state.courierInbox, 'toggleCourierRead')}
        </div>
      </div>
    </div>`;

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:25px;font-weight:700;color:#141414">Activity</div>
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
    <div style="display:flex;background:#f2f2f2;border-radius:14px;padding:4px;gap:4px">
      <button type="button" data-action="setEarningsTab" data-arg="today" style="flex:1;padding:9px;border:none;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;background:${currentTab === 'today' ? '#fff' : 'transparent'};color:${currentTab === 'today' ? '#141414' : '#6b6b6b'};box-shadow:${currentTab === 'today' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}">
        Today (£${data.todayTotal.toFixed(2)})
      </button>
      <button type="button" data-action="setEarningsTab" data-arg="week" style="flex:1;padding:9px;border:none;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;background:${currentTab === 'week' ? '#fff' : 'transparent'};color:${currentTab === 'week' ? '#141414' : '#6b6b6b'};box-shadow:${currentTab === 'week' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}">
        This Week (£${data.weekTotal.toFixed(2)})
      </button>
      <button type="button" data-action="setEarningsTab" data-arg="history" style="flex:1;padding:9px;border:none;border-radius:10px;font-size:12.5px;font-weight:700;cursor:pointer;background:${currentTab === 'history' ? '#fff' : 'transparent'};color:${currentTab === 'history' ? '#141414' : '#6b6b6b'};box-shadow:${currentTab === 'history' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}">
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
            <span style="font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:10px;background:#f2f2f2;color:#141414">${job.status}</span>
          </div>
          <div style="font-size:11.5px;opacity:0.6;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(job.customer)} · ${escapeHtml(job.address)}</div>
          <div style="font-size:10.5px;opacity:0.45;margin-top:2px">${job.itemCount} item${job.itemCount > 1 ? 's' : ''} · Base £${job.basePay.toFixed(2)} + Tip £${job.tip.toFixed(2)}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:16px;font-weight:800;color:#141414">+£${job.totalPay.toFixed(2)}</div>
          <div style="font-size:10.5px;opacity:0.5">${job.timestamp}</div>
        </div>
      </div>
    `).join('') : `<div style="text-align:center;font-size:13px;opacity:0.5;padding:16px;border:1px dashed #d4d4d4;border-radius:12px">No deliveries completed today yet.</div>`;

    tabBodyContent = `
      <!-- Today's Main Balance Card -->
      <div style="background:linear-gradient(135deg, #141414 0%, #2e2e2e 100%);color:#fff;border-radius:20px;padding:20px;box-shadow:0 8px 24px rgba(0,0,0,0.15);display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:12.5px;color:#9a9a9a;font-weight:600">TODAY'S EARNINGS</span>
          <span style="font-size:11.5px;background:rgba(255,255,255,0.16);color:#ffffff;padding:3px 10px;border-radius:12px;font-weight:700">Bolton Hub</span>
        </div>
        
        <div style="font-size:36px;font-weight:900;letter-spacing:-0.5px">£${data.todayTotal.toFixed(2)}</div>
        <div style="font-size:12.5px;color:#d4d4d4;display:flex;align-items:center;gap:6px">
          <span>${data.todayJobs} deliveries completed</span>
          <span>•</span>
          <span>⏱️ ${data.onlineLabel} online</span>
        </div>

        <!-- Daily Goal Bar -->
        <div style="margin-top:4px">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:#9a9a9a;margin-bottom:6px">
            <span>Daily Goal Progress</span>
            <span style="color:#ffffff;font-weight:700">${goalPercent}% (£120.00 Target)</span>
          </div>
          <div style="height:8px;background:rgba(255,255,255,0.15);border-radius:6px;overflow:hidden">
            <div style="height:100%;background:#ffffff;width:${goalPercent}%;transition:width 0.3s ease"></div>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="border:1.5px solid rgba(20,20,20,0.1);border-radius:16px;padding:14px;background:#fff">
          <div style="font-size:11.5px;opacity:0.55;font-weight:600">BASE DELIVERY PAY</div>
          <div style="font-size:20px;font-weight:800;margin-top:4px">£${data.todayBasePay.toFixed(2)}</div>
          <div style="font-size:11px;color:#141414;margin-top:2px;font-weight:700">100% Guaranteed</div>
        </div>
        <div style="border:1.5px solid rgba(20,20,20,0.1);border-radius:16px;padding:14px;background:#fff">
          <div style="font-size:11.5px;opacity:0.55;font-weight:600">CUSTOMER TIPS</div>
          <div style="font-size:20px;font-weight:800;margin-top:4px">£${data.todayTips.toFixed(2)}</div>
          <div style="font-size:11px;color:#141414;margin-top:2px;font-weight:700">Keep 100% of tips</div>
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
          <span style="font-size:9.5px;${isToday ? 'font-weight:700;color:#141414' : 'opacity:0.5'}">£${val.toFixed(0)}</span>
          <div style="width:100%;border-radius:4px 4px 0 0;background:${isToday ? '#141414' : (val > 0 ? '#141414' : '#e5e5e5')};height:${height}px"></div>
        </div>`;
    }).join('');

    const dayLabelsHtml = dayLabels.map((label, i) => `<span style="${i === data.todayDayIdx ? 'color:#141414;font-weight:700' : ''}">${label}</span>`).join('');

    tabBodyContent = `
      <!-- Weekly Summary Card -->
      <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:20px;padding:18px;background:#fff;display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;justify-content:space-between;align-items:baseline">
          <div>
            <div style="font-size:12px;opacity:0.55;font-weight:600">THIS WEEK TOTAL</div>
            <div style="font-size:32px;font-weight:900;margin-top:2px">£${data.weekTotal.toFixed(2)}</div>
          </div>
          <span style="background:#f2f2f2;color:#141414;font-size:11.5px;font-weight:800;padding:4px 10px;border-radius:12px">Avg £${avgPerJob.toFixed(2)}/job</span>
        </div>

        <!-- 7-Day Bar Chart, built from real delivered orders -->
        <div>
          <div style="display:flex;align-items:flex-end;gap:10px;height:90px;margin-top:10px;padding-bottom:6px;border-bottom:1px solid #e5e5e5">
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
          <div style="font-size:16px;font-weight:800;color:#141414">£${data.weekTips.toFixed(2)}</div>
        </div>
        <div style="background:#fff;border:1.5px solid rgba(20,20,20,0.1);border-radius:16px;padding:14px;display:flex;justify-content:space-between;align-items:center">
          <div><div style="font-size:13.5px;font-weight:700">Average Per Job</div><div style="font-size:11.5px;opacity:0.5">Base pay + tip</div></div>
          <div style="font-size:16px;font-weight:800;color:#141414">£${avgPerJob.toFixed(2)}</div>
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
          <div style="font-size:11px;color:#141414;font-weight:700;margin-top:2px">${p.status}</div>
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
    <div style="border:1.5px solid #141414;border-radius:20px;padding:18px;background:#fafafa;box-shadow:0 4px 16px rgba(20,20,20,0.12)">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:12.5px;color:#141414;font-weight:700">AVAILABLE BALANCE</div>
          <div style="font-size:24px;font-weight:900;color:#141414;margin-top:2px">£${data.pendingPayout.toFixed(2)}</div>
        </div>
        <span style="font-size:11.5px;background:#f2f2f2;color:#141414;padding:4px 10px;border-radius:12px;font-weight:700">Instant Transfer</span>
      </div>

      ${data.pendingPayout > 0 ? `
        <button type="button" data-action="cashOut" style="width:100%;margin-top:14px;background:#141414;color:#fff;border:none;border-radius:16px;padding:14px;text-align:center;font-weight:800;font-size:14.5px;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,0.2)">
          Cash Out Now (£${data.pendingPayout.toFixed(2)})
        </button>
      ` : `
        <div style="margin-top:14px;background:#e5e5e5;color:#6b6b6b;border-radius:16px;padding:14px;text-align:center;font-weight:700;font-size:13.5px">
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
          <div style="font-size:25px;font-weight:700;color:#141414">Courier Earnings</div>
          <div style="font-size:12.5px;opacity:0.6">Sam Whitfield (E-bike Courier) · Bolton Hub</div>
        </div>
        <span style="background:#f2f2f2;color:#141414;font-size:12px;font-weight:800;padding:5px 12px;border-radius:14px">🟢 Active</span>
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
    <div style="padding:22px 0;text-align:center">
      <div style="font-size:13.5px;font-weight:500;color:#141414">No messages yet</div>
      <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.5">Updates about your orders will show up here.</div>
    </div>`;
  }
  // Rows split by hairlines instead of each sitting in its own bordered box.
  return list.map((msg, i) => {
    const unread = !msg.read;
    return `
    <div data-action="${toggleAction}" data-arg="${i}" style="padding:11px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : ''}cursor:pointer">
      <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">
        <span style="font-size:12.5px;color:#6b6b6b">${escapeHtml(msg.tag)}</span>
        <span style="font-size:12px;color:#9a9a9a;flex:0 0 auto">${formatRelativeTime(msg.createdAt)}</span>
      </div>
      <div style="font-size:13.5px;font-weight:${unread ? 500 : 400};color:${unread ? '#141414' : '#6b6b6b'};margin-top:2px;line-height:1.45">${msg.text}</div>
    </div>`;
  }).join('');
}

function renderInboxHeader(list, markAllAction, title, size) {
  const unread = list.filter(m => !m.read).length;
  const fontSize = size || '12.5px';
  return `
  <div style="display:flex;align-items:center;justify-content:space-between">
    <div style="font-size:${fontSize};font-weight:600;color:#6b6b6b">${title || 'Messages'}${unread ? ` (${unread})` : ''}</div>
    ${unread ? `<button type="button" data-action="${markAllAction}" style="background:none;border:none;font-size:13px;font-weight:500;color:#141414;cursor:pointer;font-family:inherit;padding:0">Mark all read</button>` : ''}
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
      banner.style.background = feedback.type === 'match' ? '#f2f2f2' : '#f2f2f2';
      banner.style.color = feedback.type === 'match' ? '#141414' : '#141414';
      banner.style.border = `1.5px solid ${feedback.type === 'match' ? '#d4d4d4' : '#d4d4d4'}`;
      banner.textContent = feedback.message;
    } else {
      banner.style.display = 'none';
      banner.textContent = '';
    }
  }
  if (viewfinder) {
    viewfinder.style.borderColor = feedback ? (feedback.type === 'match' ? '#141414' : '#141414') : '#141414';
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

      <div id="scan-feedback-banner" style="width:100%;padding:12px;border-radius:14px;font-size:13px;font-weight:800;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);${state.scanFeedback ? '' : 'display:none;'}background:${state.scanFeedback && state.scanFeedback.type === 'match' ? '#f2f2f2' : '#f2f2f2'};color:${state.scanFeedback && state.scanFeedback.type === 'match' ? '#141414' : '#141414'};border:1.5px solid ${state.scanFeedback && state.scanFeedback.type === 'match' ? '#d4d4d4' : '#d4d4d4'}">${state.scanFeedback ? escapeHtml(state.scanFeedback.message) : ''}</div>

      <!-- Live WebRTC Camera Stream Viewfinder -->
      <div id="scanner-viewfinder" style="width:100%;max-width:280px;height:190px;border:2px solid #141414;border-radius:16px;position:relative;overflow:hidden;background:#000;box-shadow:0 8px 20px rgba(0,0,0,0.4)">
        <video id="barcode-scanner-video" autoplay playsinline muted style="width:100%;height:100%;object-fit:cover"></video>
      </div>

      <div id="scanner-status-text" style="font-size:11.5px;opacity:0.7;min-height:14px">${scannerStatusMessage(state.scannerStatus)}</div>

      <div id="manual-barcode-fallback" style="display:${showManualFallback ? 'flex' : 'none'};gap:8px;width:100%">
        <input id="manual-barcode-input" data-bind="manualBarcodeInput" value="${escapeHtml(state.manualBarcodeInput || '')}" placeholder="Or type the barcode number" style="flex:1;min-width:0;border:1.5px solid #444444;background:#1f1f23;color:#fff;border-radius:12px;padding:10px 12px;font-size:12.5px;font-family:monospace;outline:none" />
        <button type="button" data-action="submitManualBarcode" data-arg="${state.scanningBarcodeIndex}" style="background:#141414;color:#ffffff;border:none;padding:0 16px;border-radius:12px;font-size:12.5px;font-weight:800;cursor:pointer">Check</button>
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
      <div style="background:${isChecked ? '#fafafa' : '#fff'};border:1.5px solid ${isChecked ? '#d4d4d4' : 'rgba(20,20,20,0.12)'};border-radius:16px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;gap:12px">
        <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0">
          <img src="${item.image}" style="width:42px;height:42px;object-fit:contain;border-radius:8px;background:#fafafa;padding:2px;border:1px solid #e5e5e5" alt="${escapeHtml(item.name)}" />
          <div style="flex:1;min-width:0">
            <div style="font-size:13.5px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;${isChecked ? 'text-decoration:line-through;opacity:0.6' : ''}">${escapeHtml(item.name)}</div>
            <div style="font-size:11px;opacity:0.55;margin-top:2px">Qty: ${item.qty}</div>
          </div>
        </div>
        <span title="${isChecked ? 'Scanned' : 'Not scanned yet'}" style="width:16px;height:16px;min-width:16px;border-radius:50%;background:${isChecked ? '#141414' : '#141414'};box-shadow:0 0 0 3px ${isChecked ? 'rgba(20,20,20,0.15)' : 'rgba(239,68,68,0.15)'}"></span>
      </div>
    `;
  }).join('');

  return `
    <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:25px;font-weight:700;color:#141414">Pick &amp; Pack Scanner</div>
          <div style="font-size:12.5px;opacity:0.65">Order ${activeOrder.id} · Morrisons Daily</div>
        </div>
        <span style="background:${allPacked ? '#141414' : '#f2f2f2'};color:${allPacked ? '#ffffff' : '#141414'};font-size:12px;font-weight:800;padding:5px 12px;border-radius:14px">${progressPercent}% Done</span>
      </div>

      <!-- Live Progress Bar -->
      <div style="height:10px;background:#e5e5e5;border-radius:10px;overflow:hidden">
        <div style="height:100%;background:#141414;width:${progressPercent}%;transition:width 0.3s ease"></div>
      </div>
      <div style="font-size:12.5px;opacity:0.6;text-align:right">${packedCount} of ${totalPack} items verified</div>

      ${scannerBox}

      <div style="display:flex;flex-direction:column;gap:10px">
        ${itemsHtml}
      </div>

      ${allPacked ? `
        <button type="button" data-action="completePackingJob" style="background:#141414;color:#fff;border:none;padding:16px;border-radius:18px;font-size:15px;font-weight:800;cursor:pointer;margin-top:8px;box-shadow:0 8px 24px rgba(20,20,20,0.3)">
          📦 All Items Verified — Complete Packing & Start Delivery
        </button>
      ` : ''}
    </div>
  `;
}

function renderCourierAccount() {
  const onlineBg = state.courierOnline ? '#141414' : '#e5e5e5';
  const onlineJustify = state.courierOnline ? 'flex-end' : 'flex-start';
  const auth = state.authUser;
  const isSignedIn = !!auth;
  const displayName = auth ? auth.name : 'Courier';
  const providerLabel = !auth ? 'Not signed in' : auth.provider === 'google' ? 'Google Account' : auth.provider === 'apple' ? 'Apple ID' : 'Email Account';

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:25px;font-weight:700;color:#141414">Courier Account</div>

    <!-- Courier Profile Header -->
    <div style="display:flex;align-items:center;gap:14px;background:#fafafa;border:1.5px solid rgba(20,20,20,0.12);border-radius:20px;padding:16px">
      <div style="width:52px;height:52px;border-radius:50%;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px">
        ${(displayName || 'GC').substring(0,2).toUpperCase()}
      </div>
      <div>
        <div style="font-size:16.5px;font-weight:800">${escapeHtml(displayName)}</div>
        <div style="font-size:12px;opacity:0.6">${auth ? escapeHtml(auth.email) : 'Sign in to link a real account'}</div>
      </div>
    </div>

    <!-- Live GPS Duty Switch -->
    <div data-action="toggleOnline" style="border:1.5px solid ${state.courierOnline ? '#141414' : 'rgba(20,20,20,0.12)'};background:${state.courierOnline ? '#fafafa' : '#fff'};border-radius:18px;padding:16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.03)">
      <div>
        <div style="font-size:14.5px;font-weight:800">${state.courierOnline ? "🟢 Online - Live GPS Tracking ON" : "⚪ Offline - GPS Tracking OFF"}</div>
        <div style="font-size:11.5px;opacity:0.65;margin-top:2px">${state.courierOnline ? (state.courierLiveGps ? `Device GPS: ${state.courierLiveGps.lat.toFixed(4)}, ${state.courierLiveGps.lng.toFixed(4)}` : 'Streaming location to active customer maps...') : 'Turn ON to stream your real location to customer map'}</div>
      </div>
      <span style="width:36px;height:22px;border-radius:12px;background:${onlineBg};display:flex;align-items:center;padding:2px;justify-content:${onlineJustify};box-sizing:border-box"><span style="width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.25)"></span></span>
    </div>

    <!-- Account Identity -->
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:20px;padding:16px;background:#fff;display:flex;flex-direction:column;gap:10px">
      <div style="font-size:11.5px;font-weight:800;opacity:0.55;text-transform:uppercase">ACCOUNT</div>
      <div style="display:flex;justify-content:space-between;font-size:13.5px;font-weight:700"><span>Sign-in Method</span><span style="color:${isSignedIn ? '#141414' : '#9a9a9a'}">${providerLabel}${isSignedIn ? ' ✓' : ''}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13.5px;font-weight:700"><span>Active Region</span><span style="font-weight:700">Bolton Hub (BL1 3PJ)</span></div>
    </div>

    <button type="button" data-action="logout" style="width:100%;background:#f2f2f2;color:#141414;border:none;padding:14px;border-radius:16px;font-size:14px;font-weight:800;cursor:pointer;margin-top:8px">
      🚪 Log Out
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

// Scheduled delivery: three days out, hourly slots. Today only offers slots
// that haven't already passed, so you can't schedule into the past.
const DELIVERY_SLOT_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function deliveryDayLabel(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  if (offset === 0) return 'Today';
  if (offset === 1) return 'Tomorrow';
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function deliverySlotsFor(offset) {
  const now = new Date();
  // Need at least an hour's notice for a slot starting today.
  const earliest = offset === 0 ? now.getHours() + 1 : 0;
  return DELIVERY_SLOT_HOURS
    .filter(h => h >= earliest)
    .map(h => `${String(h).padStart(2, '0')}:00–${String(h + 1).padStart(2, '0')}:00`);
}

function selectedDeliveryLabel() {
  if (!state.deliveryLater || !state.deliverySlot) return null;
  return `${deliveryDayLabel(state.deliveryDayOffset)} ${state.deliverySlot.split('–')[0]}`;
}

// The order needs a real point in time, not a label: "Tomorrow 09:00" stops
// being true the moment tomorrow arrives, and nothing can be scheduled off it.
function selectedDeliveryTimestamp() {
  if (!state.deliveryLater || !state.deliverySlot) return null;
  const hour = parseInt(state.deliverySlot.slice(0, 2), 10);
  if (Number.isNaN(hour)) return null;
  const d = new Date();
  d.setDate(d.getDate() + (state.deliveryDayOffset || 0));
  d.setHours(hour, 0, 0, 0);
  return d.getTime();
}

// Display label derived from the stored timestamp, so an order placed today
// for tomorrow still reads correctly when you open the app tomorrow.
function scheduleLabelFor(ts) {
  if (!ts) return null;
  const d = new Date(ts);
  const midnight = new Date(); midnight.setHours(0, 0, 0, 0);
  const dayStart = new Date(ts); dayStart.setHours(0, 0, 0, 0);
  const days = Math.round((dayStart - midnight) / 86400000);
  const dayLabel = days === 0 ? 'Today'
    : days === 1 ? 'Tomorrow'
    : days === -1 ? 'Yesterday'
    : d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const pad = (h) => String(h).padStart(2, '0');
  return `${dayLabel} ${pad(d.getHours())}:00–${pad(d.getHours() + 1)}:00`;
}

// Drawn rather than an emoji: 🗓 renders as a lopsided spiral-bound pad on
// Windows and doesn't sit straight in a circle.
const CALENDAR_ICON_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <rect x="3" y="5" width="18" height="16" rx="3" />
  <path d="M3 10h18M8 3v4M16 3v4" />
</svg>`;

// One flat fee on every order, whether it's shopping, a booking or both.
// Simpler than charging delivery on some baskets and nothing on others.
const SERVICE_FEE = 1.99;

// A scheduled order joins the courier pool this far before its window opens —
// enough lead time to shop the items and travel.
const SCHEDULE_RELEASE_LEAD_MS = 45 * 60 * 1000;

function isScheduledOrder(o) {
  return !!o && o.status === 'Scheduled';
}

function scheduleReleaseAt(o) {
  return o && o.scheduledAt ? o.scheduledAt - SCHEDULE_RELEASE_LEAD_MS : 0;
}

// Flips scheduled orders into the live courier pool once their window is near.
// Returns true if anything changed so the caller can re-render.
function releaseDueScheduledOrders() {
  const now = Date.now();
  let changed = false;

  state.orders.forEach((o) => {
    if (!isScheduledOrder(o) || !o.scheduledAt) return;
    if (now < scheduleReleaseAt(o)) return;

    o.status = 'Pending Courier Acceptance';
    changed = true;

    // The alerts fire now rather than at order time — this is the point where
    // a courier can actually do something with it.
    state.shopperInbox.unshift({
      tag: 'Order Alert',
      text: `Your scheduled order ${o.id} is being prepared for ${scheduleLabelFor(o.scheduledAt)}. We're finding you a courier.`,
      createdAt: Date.now(),
      read: false,
    });
    state.courierInbox.unshift({
      tag: 'Job alert',
      text: `Scheduled job due ${scheduleLabelFor(o.scheduledAt)}: ${o.merchant} → ${o.address}, £${(o.deliveryFee || 0).toFixed(2)}`,
      createdAt: Date.now(),
      read: false,
    });
  });

  if (changed) { saveLoggedOrders(); saveInbox(); }
  return changed;
}

// Lives inside the checkout sheet, next to the address it's being delivered to.
// Takes the sheet's own card styles so it can't drift from the cards around it.
function renderCheckoutDeliveryCard(cardShell, sectionLabel) {
  const later = state.deliveryLater;
  const days = [0, 1, 2, 3].filter(o => deliverySlotsFor(o).length > 0);
  const slots = deliverySlotsFor(state.deliveryDayOffset);

  const chip = (active) => `flex:0 0 auto;padding:8px 13px;border-radius:20px;font-size:12.5px;font-weight:${active ? 600 : 500};cursor:pointer;white-space:nowrap;border:1.5px solid ${active ? '#141414' : 'rgba(20,20,20,0.15)'};background:${active ? '#141414' : '#fff'};color:${active ? '#fff' : '#141414'};font-family:inherit`;

  return `
    <div style="${cardShell}">
      <div style="${sectionLabel}">Delivery time</div>

      <div style="display:flex;gap:7px;margin-top:9px">
        <button type="button" data-action="setDeliveryNow" style="${chip(!later)}">As soon as possible</button>
        <button type="button" data-action="setDeliveryLater" style="${chip(later)}">Schedule</button>
      </div>

      ${!later
        ? `<div style="font-size:13px;color:#6b6b6b;margin-top:9px;line-height:1.5">Arriving in about 15–30 minutes.</div>`
        : `
          <div style="display:flex;gap:7px;overflow-x:auto;padding:9px 0 2px" class="slot-scroll">
            ${days.map(o => `<button type="button" data-action="setDeliveryDay" data-arg="${o}" style="${chip(o === state.deliveryDayOffset)}">${deliveryDayLabel(o)}</button>`).join('')}
          </div>

          ${slots.length
            ? `<div style="display:flex;gap:7px;overflow-x:auto;padding:7px 0 2px" class="slot-scroll">
                 ${slots.map(s => `<button type="button" data-action="setDeliverySlot" data-arg="${s}" style="${chip(s === state.deliverySlot)}">${s}</button>`).join('')}
               </div>`
            : `<div style="font-size:13px;color:#6b6b6b;margin-top:9px">No slots left today — pick another day.</div>`}

          <div style="font-size:13px;color:#6b6b6b;margin-top:9px;line-height:1.5">
            ${state.deliverySlot
              ? `Arriving ${deliveryDayLabel(state.deliveryDayOffset).toLowerCase()} between ${state.deliverySlot}.`
              : 'Choose a time slot to continue.'}
          </div>`}
    </div>`;
}

// --- customer-facing services screens --------------------------------------

const SERVICE_CARD_SHELL = 'border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff';
const SERVICE_SECTION_LABEL = 'font-size:12.5px;font-weight:600;color:#6b6b6b;padding:13px 0 0';

// The listing card, in two sizes. `compact` is a single row for scanning a
// category; `large` carries a banner image and sits alongside the shop's own
// picture cards on the home screen. Both are built here so they can't drift.
function businessCardHtml(b, { linked = true, variant } = {}) {
  // Which card you get is what the plan buys, unless a caller forces one
  // (the dashboard previews both so an owner can see what they'd upgrade to).
  if (!variant) variant = tierOf(b).card;
  const cat = serviceCategory(b.category);
  const initials = (b.name || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const cheapest = (b.services || []).filter(s => s.price > 0).map(s => s.price).sort((x, y) => x - y)[0];
  const meta = `${cat ? `${cat.emoji} ${escapeHtml(cat.label)}` : ''}${b.area ? ` · ${escapeHtml(b.area)}` : ''}`;
  const open = linked ? `data-action="openBusiness" data-arg="${b.id}"` : '';
  const shell = `${SERVICE_CARD_SHELL}${linked ? ';cursor:pointer' : ''}`;

  // Same logo tile on both cards, just sized to suit.
  const avatarHtml = (size, radius) => {
    const fallbackLogo = b.domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(b.domain)}&sz=128` : '';
    return b.logoSrc
      ? `<img src="${escapeHtml(b.logoSrc)}" onerror="this.onerror=null;if('${fallbackLogo}')this.src='${fallbackLogo}';" style="width:${size}px;height:${size}px;border-radius:${radius}px;flex:0 0 auto;object-fit:contain;background:#ffffff;padding:3px;box-sizing:border-box;border:1px solid rgba(0,0,0,0.08)" />`
      : `<span style="width:${size}px;height:${size}px;border-radius:${radius}px;flex:0 0 auto;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-size:${Math.round(size / 3)}px;font-weight:600">${escapeHtml(initials)}</span>`;
  };

  if (variant === 'large') {
    // Banner falls back to the first piece of their work, then to a plain
    // tile — a business with no photos yet still gets a full-size card.
    const banner = b.coverSrc || (b.gallery || []).find(Boolean);
    // The banner is much wider than it is tall, so a photo gets cropped
    // top and bottom. coverPosition lets a listing keep its subject in frame.
    const focal = b.coverPosition || 'center';
    return `
      <div class="${linked ? 'press ' : ''}shop-card" ${open} style="${shell}">
        <div class="biz-banner" style="background:${banner ? `#eef0ee url('${banner}') ${focal}/cover no-repeat` : '#eef0ee'}">
          ${banner ? '' : `<span style="font-size:32px;opacity:0.3">${cat ? cat.emoji : '🏪'}</span>`}
        </div>
        <!-- Logo sits with the text beneath the banner, so the brand mark
             reads the same way it does on the compact card. -->
        <div style="padding:14px 16px;display:flex;align-items:center;gap:12px">
          ${avatarHtml(46, 12)}
          <div style="flex:1;min-width:0">
            <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">
              <span style="font-size:15.5px;font-weight:700;color:#141414;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(b.name)}</span>
              ${cheapest !== undefined
                ? `<span style="font-size:13px;color:#6b6b6b;flex:0 0 auto">from £${cheapest.toFixed(2)}</span>`
                : `<span style="opacity:0.4;flex:0 0 auto">›</span>`}
            </div>
            <div style="font-size:13px;color:#6b6b6b;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(b.tagline || (cat ? cat.label : ''))}</div>
            <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px">${meta}</div>
          </div>
        </div>
      </div>`;
  }

  return `
    <div class="${linked ? 'press ' : ''}shop-card" ${open} style="${shell}">
      <div style="padding:14px 16px;display:flex;align-items:center;gap:12px">
        ${avatarHtml(52, 14)}
        <div style="flex:1;min-width:0">
          <div style="font-size:15px;font-weight:600;color:#141414;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(b.name)}</div>
          <div style="font-size:12.5px;color:#6b6b6b;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(b.tagline || (cat ? cat.label : ''))}</div>
          <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px">${meta}</div>
        </div>
        ${cheapest !== undefined
          ? `<div style="text-align:right;flex:0 0 auto">
               <div style="font-size:11.5px;color:#6b6b6b">from</div>
               <div style="font-size:14px;font-weight:600;color:#141414">£${cheapest.toFixed(2)}</div>
             </div>`
          : ''}
      </div>
    </div>`;
}

// Category list: every business filed under one category.
// Every listed business as a square logo tile, laid out like app icons on a
// phone home screen. Tapping one opens that business's page.
function renderShopperAllServices() {
  const all = (state.businesses || []).filter(isBusinessLive).slice().sort(byTierThenRecency);

  // Grouped by category so a long directory still has some structure.
  const groups = SERVICE_CATEGORIES
    .map(cat => ({ cat, items: all.filter(b => b.category === cat.id) }))
    .filter(g => g.items.length);

  const tile = (b) => {
    const initials = (b.name || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const fallbackLogo = b.domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(b.domain)}&sz=128` : '';
    const face = b.logoSrc
      ? `<img class="app-tile-icon" src="${escapeHtml(b.logoSrc)}" onerror="this.onerror=null;if('${fallbackLogo}')this.src='${fallbackLogo}';" style="object-fit:contain;background:#ffffff;padding:5px;box-sizing:border-box;border:1px solid rgba(0,0,0,0.08)" />`
      : `<span class="app-tile-icon app-tile-initials">${escapeHtml(initials)}</span>`;
    return `
      <div class="press app-tile" data-action="openBusiness" data-arg="${b.id}">
        ${face}
        <span class="app-tile-label">${escapeHtml(b.name)}</span>
      </div>`;
  };

  return `
    <div class="page" style="padding:0 18px 24px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div>
          <div style="font-size:25px;font-weight:700;color:#141414">Services</div>
          <div style="font-size:13px;color:#6b6b6b;margin-top:2px">${all.length} business${all.length === 1 ? '' : 'es'} on Vendaru</div>
        </div>
        <div class="press" data-action="goShop" title="Close" style="width:32px;height:32px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:17px;color:#6b6b6b;background:#f2f2f2">✕</div>
      </div>

      ${groups.length
        ? groups.map(g => `
            <div>
              <div style="font-size:12.5px;font-weight:600;color:#6b6b6b;margin-bottom:11px">${g.cat.emoji} ${escapeHtml(g.cat.label)}</div>
              <div class="app-grid">${g.items.map(tile).join('')}</div>
            </div>
          `).join('')
        : `<div class="shop-card" style="${SERVICE_CARD_SHELL}">
             <div style="padding:22px 16px;text-align:center">
               <div style="font-size:15px;font-weight:600;color:#141414">No businesses listed yet</div>
               <div style="font-size:13px;color:#6b6b6b;margin-top:3px;line-height:1.5">Local businesses will appear here once they've published a page.</div>
             </div>
           </div>`}
    </div>`;
}

function renderShopperServices() {
  const cat = serviceCategory(state.servicesCategory);
  const list = cat ? businessesInCategory(cat.id) : [];

  return `
    <div class="page page-cards" style="padding:0 18px 24px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div>
          <div style="font-size:25px;font-weight:700;color:#141414">${cat ? escapeHtml(cat.label) : 'Services'}</div>
          <div style="font-size:13px;color:#6b6b6b;margin-top:2px">${list.length} local business${list.length === 1 ? '' : 'es'}</div>
        </div>
        <div class="press" data-action="goShop" title="Close" style="width:32px;height:32px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:17px;color:#6b6b6b;background:#f2f2f2">✕</div>
      </div>

      ${list.length
        ? list.map(b => businessCardHtml(b)).join('')
        : `<div class="shop-card" style="${SERVICE_CARD_SHELL}">
             <div style="padding:22px 16px;text-align:center">
               <div style="font-size:15px;font-weight:600;color:#141414">Nobody listed here yet</div>
               <div style="font-size:13px;color:#6b6b6b;margin-top:3px;line-height:1.5">Run a business in this area? List it free and take bookings through Vendaru.</div>
               <a href="${BUSINESS_PATH}" style="display:inline-block;background:#141414;color:#fff;text-decoration:none;padding:11px 22px;border-radius:14px;font-size:13.5px;font-weight:600;margin-top:12px">List your business</a>
             </div>
           </div>`}
    </div>`;
}

// Four tiles of the business's own work. Empty slots stay visible so the page
// keeps its shape before the owner has uploaded anything.
function galleryGridHtml(gallery, { editable = false } = {}) {
  const tiles = Array.from({ length: 4 }, (_, i) => {
    const src = (gallery || [])[i];
    const inner = src
      ? `<span style="position:absolute;inset:0;background:#f2f2f2 center/cover url('${src}')"></span>`
      : `<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#f6f6f6;color:#b0b0b0;font-size:12px">${editable ? 'Add photo' : ''}</span>`;

    const body = `<span style="position:relative;display:block;width:100%;padding-top:100%;border-radius:12px;overflow:hidden;border:1.5px solid rgba(20,20,20,0.1)">${inner}</span>`;

    return editable
      ? `<label style="cursor:pointer;display:block">
           ${body}
           <input type="file" accept="image/*" data-upload-gallery="${i}" style="display:none" />
         </label>`
      : body;
  }).join('');

  return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:11px">${tiles}</div>`;
}

// The business's own page: card, then bookable services, then their work.
function renderShopperBusiness() {
  const b = businessById(state.activeBusinessId);
  if (!b) {
    return `<div style="padding:0 18px 24px"><div style="font-size:25px;font-weight:700">Not found</div>
      <div style="font-size:13px;color:#6b6b6b;margin-top:6px">That business is no longer listed.</div>
      <button type="button" data-action="goShop" style="background:#141414;color:#fff;border:none;padding:11px 22px;border-radius:14px;font-size:13.5px;font-weight:600;cursor:pointer;margin-top:12px;font-family:inherit">Back to Shop</button></div>`;
  }

  const cat = serviceCategory(b.category);
  const booked = new Set((state.bookingCart || []).filter(x => x.businessId === b.id).map(x => x.serviceId));

  const servicesHtml = (b.services || []).length
    ? (b.services || []).map((s, i) => `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:12px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
          <div style="flex:1;min-width:0">
            <div style="font-size:13.5px;font-weight:500;color:#141414">${escapeHtml(s.name)}</div>
            ${s.description ? `<div style="font-size:12.5px;color:#6b6b6b;margin-top:2px;line-height:1.45">${escapeHtml(s.description)}</div>` : ''}
            <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px">
              ${[s.durationMins ? `${s.durationMins} min` : '', s.price > 0 ? `£${s.price.toFixed(2)}` : 'Free']
                .filter(Boolean).join(' · ')}
            </div>
          </div>
          ${booked.has(s.id)
            ? `<span style="flex:0 0 auto;font-size:12.5px;font-weight:600;color:#6b6b6b;padding:10px 0">In basket</span>`
            : `<div class="press" data-action="openBookingPicker" data-arg="${b.id}|${s.id}" style="flex:0 0 auto;background:#141414;color:#fff;border-radius:14px;padding:10px 16px;font-weight:600;font-size:13.5px;cursor:pointer">Book</div>`}
        </div>
      `).join('')
    : `<div style="padding:14px 0 4px;font-size:13px;color:#6b6b6b">No services listed yet.</div>`;

  return `
    <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div class="press" data-action="backToCategory" style="cursor:pointer;font-size:13px;font-weight:500;color:#6b6b6b">‹ ${cat ? escapeHtml(cat.label) : 'Back'}</div>
        <div class="press" data-action="goShop" title="Close" style="width:32px;height:32px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:17px;color:#6b6b6b;background:#f2f2f2">✕</div>
      </div>

      <!-- 1. Their card, full size — this is the top of their page -->
      ${businessCardHtml(b, { linked: false, variant: 'large' })}

      ${b.about ? `
        <div class="shop-card" style="${SERVICE_CARD_SHELL}">
          <div style="padding:4px 16px 14px">
            <div style="${SERVICE_SECTION_LABEL}">About</div>
            <!-- pre-line keeps the paragraph breaks the owner typed. -->
            <div style="font-size:13.5px;color:#141414;line-height:1.55;margin-top:6px;white-space:pre-line">${escapeHtml(b.about)}</div>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:10px;padding-top:10px;border-top:1px solid #f0f0f0;font-size:13px">
              ${b.phone ? `<div style="color:#6b6b6b;display:flex;align-items:center;gap:4px">📞 <a href="tel:${escapeHtml(b.phone.replace(/\s+/g, ''))}" style="color:#6b6b6b;text-decoration:none">${escapeHtml(b.phone)}</a></div>` : ''}
              ${b.websiteUrl ? `<div style="display:flex;align-items:center;gap:4px">🌐 <a href="${escapeHtml(b.websiteUrl)}" target="_blank" rel="noopener noreferrer" style="color:#141414;font-weight:600;text-decoration:underline">${escapeHtml(b.websiteUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a></div>` : ''}
            </div>
          </div>
        </div>` : ''}

      <!-- 2. Bookable services -->
      <div class="shop-card" style="${SERVICE_CARD_SHELL}">
        <div style="padding:4px 16px 14px">
          <div style="${SERVICE_SECTION_LABEL}">Services</div>
          ${servicesHtml}
        </div>
      </div>

      <!-- 3. Their work -->
      <div class="shop-card" style="${SERVICE_CARD_SHELL}">
        <div style="padding:4px 16px 16px">
          <div style="${SERVICE_SECTION_LABEL}">Their work</div>
          ${galleryGridHtml(b.gallery)}
        </div>
      </div>
    </div>`;
}

// Slot picker for a single service — same day/time chip pattern as delivery.
function renderBookingPickerModal() {
  const draft = state.bookingDraft;
  if (!draft) return '';
  const b = businessById(draft.businessId);
  const s = serviceById(b, draft.serviceId);
  if (!b || !s) return '';

  const days = Array.from({ length: SERVICE_BOOKING_DAYS }, (_, i) => i)
    .filter(o => serviceSlotsFor(o).length > 0);
  const slots = serviceSlotsFor(draft.dayOffset);
  const chip = (active) => `flex:0 0 auto;padding:8px 13px;border-radius:20px;font-size:12.5px;font-weight:${active ? 600 : 500};cursor:pointer;white-space:nowrap;border:1.5px solid ${active ? '#141414' : 'rgba(20,20,20,0.15)'};background:${active ? '#141414' : '#fff'};color:${active ? '#fff' : '#141414'};font-family:inherit`;

  return `
    <div class="graftr-modal-overlay">
      <div class="graftr-modal-card" style="padding:0;gap:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 18px 14px;border-bottom:1px solid #f0f0f0;flex:0 0 auto">
          <div style="min-width:0">
            <div style="font-size:17px;font-weight:700;color:#141414">${escapeHtml(s.name)}</div>
            <div style="font-size:12.5px;color:#6b6b6b;margin-top:2px">${escapeHtml(b.name)} · ${s.price > 0 ? `£${s.price.toFixed(2)}` : 'Free'}</div>
          </div>
          <button data-action="closeBookingPicker" style="background:none;border:none;font-size:20px;cursor:pointer;color:#6b6b6b;padding:2px 6px;line-height:1">✕</button>
        </div>

        <div style="flex:1;min-height:0;overflow-y:auto;padding:14px 18px">
          <div style="font-size:12.5px;font-weight:600;color:#6b6b6b">Pick a date</div>
          <div style="display:flex;gap:7px;overflow-x:auto;padding:9px 0 2px" class="slot-scroll">
            ${days.map(o => `<button type="button" data-action="setBookingDay" data-arg="${o}" style="${chip(o === draft.dayOffset)}">${serviceDayLabel(o)}</button>`).join('')}
          </div>

          <div style="font-size:12.5px;font-weight:600;color:#6b6b6b;margin-top:13px">Pick a time</div>
          ${slots.length
            ? `<div style="display:flex;flex-wrap:wrap;gap:7px;padding-top:9px">
                 ${slots.map(t => `<button type="button" data-action="setBookingSlot" data-arg="${t}" style="${chip(t === draft.slot)}">${t}</button>`).join('')}
               </div>`
            : `<div style="font-size:13px;color:#6b6b6b;margin-top:9px">No times left that day.</div>`}
        </div>

        <div style="display:flex;gap:10px;padding:14px 18px calc(14px + env(safe-area-inset-bottom, 0px));border-top:1px solid #f0f0f0;flex:0 0 auto">
          <button type="button" data-action="closeBookingPicker" style="flex:1;background:#fff;border:1.5px solid rgba(20,20,20,0.15);padding:13px;border-radius:14px;font-weight:600;font-size:13.5px;cursor:pointer;font-family:inherit">Cancel</button>
          <button type="button" data-action="confirmBooking" ${draft.slot ? '' : 'disabled'} style="flex:1;background:${draft.slot ? '#141414' : 'rgba(20,20,20,0.35)'};color:#fff;border:none;padding:13px;border-radius:14px;font-weight:600;font-size:13.5px;cursor:${draft.slot ? 'pointer' : 'default'};font-family:inherit">
            ${draft.slot ? 'Add to basket' : 'Pick a time'}
          </button>
        </div>
      </div>
    </div>`;
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
    <div class="press shop-card" data-action="goSpecialRequest" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;cursor:pointer">
      ${cardImageHtml('local', '📍')}
      <div style="padding:16px">
        <div style="display:flex;justify-content:space-between"><span style="font-size:15.5px;font-weight:700">Special Requests</span><span style="opacity:0.4">›</span></div>
        <div style="font-size:13px;opacity:0.6">Collection and delivery from any store</div>
      </div>
    </div>

    <!-- Newly published listings surface here, not only inside their category,
         so a business that has just signed up is visible straight away. -->
    ${(() => {
      const featured = featuredBusinesses(6);
      if (!featured.length) return '';
      return `
        <div style="font-size:12.5px;font-weight:600;color:#6b6b6b">Local businesses</div>
        ${featured.map(b => businessCardHtml(b)).join('')}`;
    })()}

    <!-- Category directory sits at the foot of the page. -->
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:4px 16px 14px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-size:12.5px;font-weight:600;color:#6b6b6b;padding:13px 0 0">
          <span>Local services</span>
          <button type="button" data-action="goAllServices" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#141414;cursor:pointer;font-family:inherit">See all</button>
        </div>
        <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.5">Book trusted businesses near you and pay in the same basket.</div>
        <!-- The category grid that used to sit here is now the rail at the top
             of the page, so this card just points into the directory. -->
        <a href="${BUSINESS_PATH}" style="display:block;text-align:center;margin-top:12px;font-size:13px;font-weight:500;color:#6b6b6b;text-decoration:underline;text-underline-offset:2px">List your business</a>
      </div>
    </div>
  `;

  return `<div class="page page-cards" style="padding:0 18px 24px">
    <!-- Brand mark, centred. Same 200px width as the sign-in screen.
         Swapping assets/brand/logo.svg changes it here too. -->
    <div class="press" data-action="goShop" style="display:flex;justify-content:center;padding:2px 0;cursor:pointer">
      <img src="assets/brand/logo.svg" alt="Vendaru" width="200"
           style="width:200px;max-width:62%;height:auto;display:block" />
    </div>
    <div style="font-size:15px;opacity:0.55;font-weight:600">Good afternoon</div>
    <div style="display:flex;align-items:center;gap:10px;border:1.5px solid rgba(20,20,20,0.15);border-radius:26px;padding:11px 16px">
      <span style="opacity:0.4;font-size:15px">⌕</span>
      <input id="shop-search-input" data-bind="searchQuery" value="${escapeHtml(state.searchQuery)}" placeholder="Search shops, groceries, essentials..." style="border:none;outline:none;flex:1;font-size:13.5px;font-family:inherit;background:transparent" />
    </div>
    <div class="cat-rail slot-scroll">
      <!-- Groceries first, then the service categories in order of how often
           people look for them. Scrolls sideways rather than shrinking. -->
      <div class="cat-tile" data-action="goBrowseCategory" data-arg="Grocery">
        <span class="cat-tile-icon">🛒</span>
        <span class="cat-tile-label">Groceries</span>
      </div>
      ${SERVICE_CATEGORIES.map(c => `
      <div class="cat-tile" data-action="goServiceCategory" data-arg="${c.id}">
        <span class="cat-tile-icon">${c.emoji}</span>
        <span class="cat-tile-label">${c.label}</span>
      </div>`).join('')}    </div>
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
    // Compact bar sized to its own content and pinned to the left, rather than
    // a full-width bar spanning the column. 14px radius and a fixed 36px height
    // to match the Checkout button it leads to — set explicitly rather than via
    // padding, since this bar's text is smaller and wouldn't land on the same
    // height on its own.
    // translateY drops it 19px so its centre lines up with the AI button's.
    // The sticky offset can't go lower on its own — the scroll container's
    // 110px bottom padding clamps it well above the AI button.
    ? `<div class="press" data-action="goBasket" style="position:sticky;bottom:14px;transform:translateY(19px);align-self:flex-start;max-width:100%;height:36px;box-sizing:border-box;background:#141414;color:#fff;border-radius:14px;padding:0 14px;display:flex;align-items:center;gap:9px;cursor:pointer;margin-top:14px;box-shadow:0 8px 20px rgba(0,0,0,0.2);white-space:nowrap">
        <span style="font-size:12px;font-weight:600">${count} item${count > 1 ? 's' : ''} · £${total.toFixed(2)}</span>
        <span style="font-size:12px;font-weight:600;opacity:0.6">View basket ›</span>
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

function renderOrderItemsCardHtml(currentOrder) {
  if (!currentOrder) return '';

  const isCancelled = currentOrder.status === 'Cancelled';
  const isDelivered = currentOrder.status === 'Delivered';

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
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#ffffff;border:1px solid rgba(20,20,20,0.1);border-radius:12px;gap:10px">
        <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1">
          <img src="${imgSrc}" style="width:34px;height:34px;object-fit:contain;border-radius:8px;background:#fafafa;padding:2px;border:1px solid #f2f2f2;flex:none" alt="${escapeHtml(item.name)}" />
          <div style="min-width:0;flex:1">
            <div style="font-size:12.5px;font-weight:700;color:#141414;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(item.name)}</div>
            <div style="font-size:11px;color:#6b6b6b">Qty: ${item.qty || 1}</div>
          </div>
        </div>
        <div style="font-size:12.5px;font-weight:700;color:#141414">£${((item.qty || 1) * priceGbp).toFixed(2)}</div>
      </div>
    `;
  }).join('');

  return `
    <!-- Order Items Container (Shop Page Design) -->
    <div style="background:#ffffff;border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:10px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:11.5px;font-weight:700;text-transform:uppercase;color:#6b6b6b;letter-spacing:0.5px">ORDER ITEMS (${itemsCount} ITEMS)</div>
        <span style="font-size:11px;background:#f2f2f2;color:#5c5c5c;font-weight:700;padding:2px 8px;border-radius:10px">Scrollable ↕</span>
      </div>

      <div style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;padding-right:3px">
        ${itemsRowsHtml}
      </div>

      <div style="font-size:12px;color:#444444;border-top:1px dashed rgba(20,20,20,0.15);padding-top:8px;margin-top:2px">
        📍 Delivering to: <b>${escapeHtml(currentOrder.address || state.userProfile.address)}</b>
      </div>
    </div>

    <div>
      ${isCancelled
        ? `<button type="button" data-action="deleteOrder" data-arg="${currentOrder.id}" style="width:100%;background:#fff;color:#6b6b6b;border:1.5px solid rgba(20,20,20,0.15);padding:12px;border-radius:16px;font-weight:700;font-size:13.5px;cursor:pointer">Remove Order</button>`
        : isDelivered
          ? `<button type="button" data-action="deleteOrder" data-arg="${currentOrder.id}" style="width:100%;background:#fff;color:#6b6b6b;border:1.5px solid rgba(20,20,20,0.15);padding:12px;border-radius:16px;font-weight:700;font-size:13.5px;cursor:pointer">Clear Order</button>`
          : `<button type="button" data-action="cancelOrder" data-arg="${currentOrder.id}" style="width:100%;background:#fff;color:#141414;border:1.5px solid #d4d4d4;padding:12px;border-radius:16px;font-weight:700;font-size:13.5px;cursor:pointer">Cancel Order</button>`}
    </div>
  `;
}

function renderShopperBasket() {
  const lines = cartLines();
  const count = cartCount();
  const total = cartTotal();

  const cardShell = 'border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff';
  const sectionLabel = 'font-size:12.5px;font-weight:600;color:#6b6b6b;padding:13px 0 0';

  // CARD 1: the basket you're building right now.
  const basketBox = state.basketCheckedOut
    ? `
      <div class="shop-card" style="${cardShell}">
        <div style="padding:20px 16px;text-align:center">
          <div style="font-size:15px;font-weight:600;color:#141414">Order placed</div>
          <div style="font-size:13px;color:#6b6b6b;margin-top:3px;line-height:1.5">Your basket has been sent to local couriers.</div>
          <button type="button" data-action="newBasket" style="background:#141414;color:#fff;border:none;padding:11px 22px;border-radius:14px;font-size:13.5px;font-weight:600;cursor:pointer;margin-top:12px;font-family:inherit">Start new basket</button>
        </div>
      </div>`
    : (lines.length > 0
      ? `
        <div class="shop-card" style="${cardShell}">
          <div style="padding:4px 16px 14px">
            <div style="display:flex;justify-content:space-between;align-items:baseline;${sectionLabel}">
              <span>Basket · Morrisons Daily</span>
              <span style="font-size:14px;font-weight:600;color:#141414">£${total.toFixed(2)}</span>
            </div>

            ${lines.map((l, i) => {
              const free = freeQtyFor(l.product.id, l.qty);
              const charged = (l.qty - free) * l.product.estimated_price_gbp;
              return `
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:11px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
                <div style="flex:1;min-width:0">
                  <div style="font-size:13.5px;font-weight:500;color:#141414;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(l.product.name)}</div>
                  <div style="font-size:12.5px;color:#6b6b6b">£${l.product.estimated_price_gbp.toFixed(2)} each</div>
                  ${free > 0
                    ? `<div style="font-size:12.5px;font-weight:600;color:#c9447a;margin-top:1px">${free} free · loyalty reward</div>`
                    : ''}
                  <button type="button" data-action="saveForLater" data-arg="${l.product.id}" style="background:none;border:none;padding:2px 0 0;font-size:12.5px;font-weight:500;color:#6b6b6b;cursor:pointer;font-family:inherit">Save for later</button>
                </div>
                <div style="display:flex;align-items:center;gap:8px;flex:0 0 auto">
                  <div class="press" data-action="removeFromCart" data-arg="${l.product.id}" style="width:26px;height:26px;border-radius:50%;border:1.5px solid rgba(20,20,20,0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;color:#141414">−</div>
                  <span style="font-size:13.5px;font-weight:500;min-width:16px;text-align:center">${l.qty}</span>
                  <div class="press" data-action="addToCart" data-arg="${l.product.id}" style="width:26px;height:26px;border-radius:50%;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px">+</div>
                </div>
                <span style="font-size:13.5px;font-weight:600;min-width:48px;text-align:right;color:#141414;flex:0 0 auto">£${charged.toFixed(2)}</span>
              </div>`;
            }).join('')}

            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f0f0f0;padding-top:13px;margin-top:2px;gap:10px">
              <div style="display:flex;align-items:center;gap:14px">
                <span style="font-size:12.5px;color:#6b6b6b">${count} item${count > 1 ? 's' : ''}</span>
                <button type="button" data-action="emptyBasket" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#6b6b6b;cursor:pointer;font-family:inherit">Empty</button>
              </div>
              <div class="press" data-action="checkout" style="background:#141414;color:#fff;border-radius:14px;padding:10px 18px;font-weight:600;font-size:13.5px;cursor:pointer;flex:0 0 auto">
                Checkout · £${total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>`
      : `
        <div class="shop-card" style="${cardShell}">
          <div style="padding:22px 16px;text-align:center">
            <div style="font-size:15px;font-weight:600;color:#141414">Your basket is empty</div>
            <div style="font-size:13px;color:#6b6b6b;margin-top:3px;line-height:1.5">Add groceries and essentials from Morrisons Daily.</div>
            <button type="button" data-action="goShop" style="background:#141414;color:#fff;border:none;padding:11px 22px;border-radius:14px;font-size:13.5px;font-weight:600;cursor:pointer;margin-top:12px;font-family:inherit">Start shopping</button>
          </div>
        </div>`
  );

  // Items parked out of the basket. Persisted, so they're still here next visit.
  const saved = savedLines();
  const savedCard = saved.length
    ? `
    <div class="shop-card" style="${cardShell}">
      <div style="padding:4px 16px 12px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;${sectionLabel}">
          <span>Saved for later (${saved.length})</span>
          ${saved.length > 1
            ? `<button type="button" data-action="moveAllToBasket" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#141414;cursor:pointer;font-family:inherit">Move all</button>`
            : ''}
        </div>
        ${saved.map((l, i) => `
          <div style="display:flex;align-items:center;gap:11px;padding:11px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
            <span style="width:36px;height:36px;border-radius:9px;flex:0 0 auto;background:#f2f2f2 center/cover url('${state.productImages[l.product.id] || l.product.image}')"></span>
            <div style="flex:1;min-width:0">
              <div style="font-size:13.5px;font-weight:500;color:#141414;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(l.product.name)}</div>
              <div style="font-size:12.5px;color:#6b6b6b">£${l.product.estimated_price_gbp.toFixed(2)}${l.qty > 1 ? ` · ${l.qty}` : ''}</div>
              <div style="display:flex;gap:14px;margin-top:5px">
                <button type="button" data-action="moveToBasket" data-arg="${l.product.id}" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#141414;cursor:pointer;font-family:inherit">Move to basket</button>
                <button type="button" data-action="removeSaved" data-arg="${l.product.id}" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#6b6b6b;cursor:pointer;font-family:inherit">Remove</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`
    : '';

  // CARD 2 + 3: orders still in flight, and everything that's finished.
  const activeOrders = state.orders.filter(o => o.status !== 'Cancelled' && o.status !== 'Delivered');
  const pastOrders = state.orders.filter(o => o.status === 'Cancelled' || o.status === 'Delivered');

  const activeOrdersCard = `
    <div class="shop-card" style="${cardShell}">
      <div style="padding:4px 16px 12px">
        <div style="${sectionLabel}">Active orders${activeOrders.length ? ` (${activeOrders.length})` : ''}</div>
        ${activeOrders.length
          ? orderRowsHtml(activeOrders)
          : `<div style="padding:14px 0 4px">
               <div style="font-size:13.5px;font-weight:500;color:#141414">No active orders</div>
               <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.5">Place an order to follow it here and on Activity.</div>
             </div>`}
      </div>
    </div>`;

  const pastOrdersCard = pastOrders.length
    ? `
    <div class="shop-card" style="${cardShell}">
      <div style="padding:4px 16px 12px">
        <div style="${sectionLabel}">Past orders (${pastOrders.length})</div>
        ${orderRowsHtml(pastOrders)}
      </div>
    </div>`
    : '';

  // The free item is chosen here rather than on Account — it lands in this
  // basket, so the card only shows up once there's a reward waiting.
  const loyaltyCard = loyaltyState().rewardsReady > 0 ? renderLoyaltyCard('basket') : '';

  // Service bookings ride in the same basket as the shopping.
  const bookings = bookingLines();
  const bookingsCard = bookings.length
    ? `
    <div class="shop-card" style="${cardShell}">
      <div style="padding:4px 16px 12px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;${sectionLabel}">
          <span>Bookings (${bookings.length})</span>
          <span style="font-size:14px;font-weight:600;color:#141414">£${bookingsTotal().toFixed(2)}</span>
        </div>
        ${bookings.map((bk, i) => `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;padding:11px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
            <div style="flex:1;min-width:0">
              <div style="font-size:13.5px;font-weight:500;color:#141414">${escapeHtml(bk.serviceName)}</div>
              <div style="font-size:12.5px;color:#6b6b6b;margin-top:2px">${escapeHtml(bk.businessName)}</div>
              <div style="font-size:12.5px;color:#6b6b6b;margin-top:2px">${escapeHtml(scheduleLabelFor(bk.at) || '')}</div>
              <button type="button" data-action="removeBooking" data-arg="${bk.key}" style="background:none;border:none;padding:4px 0 0;font-size:12.5px;font-weight:500;color:#6b6b6b;cursor:pointer;font-family:inherit">Remove</button>
            </div>
            <span style="font-size:13.5px;font-weight:600;color:#141414;flex:0 0 auto">£${bk.price.toFixed(2)}</span>
          </div>
        `).join('')}
        ${lines.length === 0 ? `
          <div style="display:flex;justify-content:flex-end;border-top:1px solid #f0f0f0;padding-top:13px;margin-top:2px">
            <div class="press" data-action="checkout" style="background:#141414;color:#fff;border-radius:14px;padding:10px 18px;font-weight:600;font-size:13.5px;cursor:pointer;flex:0 0 auto">
              Checkout · £${bookingsTotal().toFixed(2)}
            </div>
          </div>` : ''}
      </div>
    </div>`
    : '';

  return `
    <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div style="font-size:25px;font-weight:700;color:#141414">Basket</div>
        <div class="press" data-action="goShop" title="Close" style="width:32px;height:32px;border-radius:50%;flex:0 0 auto;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:17px;color:#6b6b6b;background:#f2f2f2">✕</div>
      </div>
      ${loyaltyCard}
      ${bookingsCard}
      <!-- "Your basket is empty" would contradict a basket holding bookings. -->
      ${(state.basketCheckedOut || lines.length > 0 || bookings.length === 0) ? basketBox : ''}
      ${savedCard}
      ${activeOrdersCard}
      ${pastOrdersCard}
    </div>
  `;
}

function renderAddressModal() {
  if (!state.showAddressModal) return '';
  const p = state.userProfile;
  const avatarHtml = p.avatarSrc
    ? `<img src="${p.avatarSrc}" style="width:56px;height:56px;border-radius:50%;object-fit:cover;flex:0 0 auto" />`
    : `<div style="width:56px;height:56px;border-radius:50%;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;flex:0 0 auto">
        ${((p.name || 'Y')).substring(0, 2).toUpperCase()}
      </div>`;

  return `
    <div class="graftr-modal-overlay">
      <div class="graftr-modal-card" style="padding:0;gap:0">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 18px 14px;border-bottom:1px solid #f0f0f0;flex:0 0 auto">
          <div style="font-size:17px;font-weight:700;color:#141414">Edit profile</div>
          <button data-action="closeAddressModal" style="background:none;border:none;font-size:20px;cursor:pointer;color:#6b6b6b;padding:2px 6px;line-height:1">✕</button>
        </div>

        <!-- Only the fields scroll; the header and actions stay put, so Save is
             always reachable instead of sitting below the fold on a phone. -->
        <div style="flex:1;min-height:0;overflow-y:auto;padding:16px 18px;display:flex;flex-direction:column;gap:13px">
          <div style="display:flex;align-items:center;gap:13px">
            ${avatarHtml}
            <label style="font-size:13.5px;font-weight:500;color:#141414;cursor:pointer;text-decoration:underline;text-underline-offset:2px">
              Change photo
              <input type="file" accept="image/*" data-upload-avatar style="display:none" />
            </label>
          </div>

        <div class="graftr-input-group">
          <label>Full name</label>
          <input type="text" id="prof-name" data-bind="profile.name" value="${escapeHtml(p.name)}" placeholder="Your name" />
        </div>

        <div class="graftr-input-group">
          <label>Email address</label>
          <input type="email" id="prof-email" data-bind="profile.email" value="${escapeHtml(p.email || '')}" placeholder="name@example.com" />
        </div>

        <div class="graftr-input-group">
          <label>Mobile number</label>
          <input type="tel" id="prof-phone" data-bind="profile.phone" value="${escapeHtml(p.phone)}" placeholder="+44 7700 900000" />
        </div>

        <div class="graftr-input-group">
          <label>Street address</label>
          <input type="text" id="prof-address" data-bind="profile.address" value="${escapeHtml(p.address)}" placeholder="123 High Street" />
        </div>

        <div style="display:flex;gap:10px">
          <div class="graftr-input-group" style="flex:1;min-width:0">
            <label>City</label>
            <input type="text" id="prof-city" data-bind="profile.city" value="${escapeHtml(p.city)}" placeholder="Bolton" />
          </div>
          <div class="graftr-input-group" style="flex:1;min-width:0">
            <label>Postcode</label>
            <input type="text" id="prof-postcode" data-bind="profile.postcode" value="${escapeHtml(p.postcode)}" placeholder="BL1 3PJ" />
          </div>
        </div>

          <div class="graftr-input-group">
            <label>Delivery instructions (optional)</label>
            <textarea id="prof-instructions" data-bind="profile.instructions" rows="2" placeholder="Leave at door, gate code, etc.">${escapeHtml(p.instructions)}</textarea>
          </div>
        </div>

        <div style="display:flex;gap:10px;padding:14px 18px calc(14px + env(safe-area-inset-bottom, 0px));border-top:1px solid #f0f0f0;flex:0 0 auto">
          <button type="button" data-action="closeAddressModal" style="flex:1;background:#fff;border:1.5px solid rgba(20,20,20,0.15);padding:13px;border-radius:14px;font-weight:600;font-size:13.5px;cursor:pointer;font-family:inherit">Cancel</button>
          <button type="button" data-action="saveAddressModal" style="flex:1;background:#141414;color:#fff;border:none;padding:13px;border-radius:14px;font-weight:600;font-size:13.5px;cursor:pointer;font-family:inherit">Save</button>
        </div>
      </div>
    </div>
  `;
}

function renderCheckoutModal() {
  if (!state.showCheckoutModal) return '';
  const missing = missingProfileFields();
  const lines = cartLines();
  const subtotal = cartSubtotal();
  const discount = loyaltyDiscount();
  const bookings = bookingLines();
  const bookingsSum = bookingsTotal();
  // A basket of bookings alone has nothing to carry, so no delivery fee.
  const serviceFee = SERVICE_FEE;
  const grandTotal = subtotal - discount + bookingsSum + serviceFee;
  const p = state.userProfile;
  // "Schedule" picked but no slot chosen — otherwise the order would quietly
  // go out as an immediate one.
  const needsSlot = basketHasDelivery() && state.deliveryLater && !state.deliverySlot;

  const cardShell = 'border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;background:#fff;padding:4px 16px 14px';
  const sectionLabel = 'font-size:12.5px;font-weight:600;color:#6b6b6b;padding:13px 0 0';
  const summaryRow = 'display:flex;justify-content:space-between;gap:12px;font-size:13px;color:#6b6b6b;padding:3px 0';

  const itemsListHtml = lines.map((l, i) => {
    const free = freeQtyFor(l.product.id, l.qty);
    return `
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:10px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
      <span style="font-size:13.5px;color:#141414;min-width:0">${l.qty} × ${escapeHtml(l.product.name)}${
        free > 0 ? `<span style="display:block;font-size:12.5px;font-weight:600;color:#c9447a">${free} free · loyalty reward</span>` : ''
      }</span>
      <span style="font-size:13.5px;font-weight:600;flex:0 0 auto">£${(l.qty * l.product.estimated_price_gbp).toFixed(2)}</span>
    </div>`;
  }).join('');

  return `
    <div class="graftr-modal-overlay">
      <div class="graftr-modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:19px;font-weight:700;color:#141414">Checkout</div>
          <button data-action="closeCheckoutModal" style="background:none;border:none;font-size:20px;cursor:pointer;color:#6b6b6b;padding:2px 6px;line-height:1">✕</button>
        </div>

        <!-- Delivery address -->
        <div style="${cardShell}">
          <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;${sectionLabel}">
            <span>Deliver to</span>
            <button type="button" data-action="openAddressModal" style="background:none;border:none;padding:0;font-size:13.5px;font-weight:600;color:#141414;cursor:pointer;font-family:inherit">Change</button>
          </div>
          <div style="margin-top:5px;min-width:0">
            ${missing.length
              ? `<div style="font-size:13.5px;color:#141414;line-height:1.5">We need your ${missing.map(f => f.label.toLowerCase()).join(', ')} before this order can go through.</div>`
              : `<div style="font-size:14px;color:#141414;line-height:1.5">${escapeHtml(p.address)}, ${escapeHtml(p.postcode)}</div>
                 <div style="font-size:13px;color:#6b6b6b;margin-top:3px">${escapeHtml(p.name || '')}${p.name && p.phone ? ' · ' : ''}${escapeHtml(p.phone || '')}</div>
                 ${p.instructions ? `<div style="font-size:13px;color:#6b6b6b;margin-top:3px">Note: ${escapeHtml(p.instructions)}</div>` : ''}`}
          </div>
        </div>

        <!-- Bookings -->
        ${bookings.length ? `
          <div style="${cardShell}">
            <div style="${sectionLabel}">Bookings (${bookings.length})</div>
            ${bookings.map((bk, i) => `
              <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;padding:10px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
                <span style="font-size:13.5px;color:#141414;min-width:0">
                  ${escapeHtml(bk.serviceName)}
                  <span style="display:block;font-size:12.5px;color:#6b6b6b">${escapeHtml(bk.businessName)} · ${escapeHtml(scheduleLabelFor(bk.at) || '')}</span>
                </span>
                <span style="font-size:13.5px;font-weight:600;flex:0 0 auto">£${bk.price.toFixed(2)}</span>
              </div>
            `).join('')}
          </div>` : ''}

        <!-- Delivery time — only when something is actually being delivered -->
        ${basketHasDelivery() ? renderCheckoutDeliveryCard(cardShell, sectionLabel) : ''}

        <!-- Order summary -->
        <div style="${cardShell}">
          <div style="${sectionLabel}">Order summary (${cartCount() + bookings.length} item${cartCount() + bookings.length === 1 ? '' : 's'})</div>
          ${itemsListHtml}
          <div style="border-top:1px solid #f0f0f0;padding-top:10px;margin-top:2px">
            <div style="${summaryRow}"><span>Subtotal</span><span>£${subtotal.toFixed(2)}</span></div>
            ${discount > 0
              ? `<div style="${summaryRow};color:#c9447a;font-weight:600"><span>Loyalty reward</span><span>−£${discount.toFixed(2)}</span></div>`
              : ''}
            ${bookingsSum > 0 ? `<div style="${summaryRow}"><span>Bookings</span><span>£${bookingsSum.toFixed(2)}</span></div>` : ''}
            <div style="${summaryRow}"><span>Service fee</span><span>£${serviceFee.toFixed(2)}</span></div>
            <div style="display:flex;justify-content:space-between;gap:12px;font-size:15px;font-weight:600;color:#141414;padding-top:9px;margin-top:5px;border-top:1px solid #f0f0f0">
              <span>Total</span><span>£${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        ${state.checkoutError ? `
          <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:14px;padding:12px 14px;font-size:13px;color:#141414;line-height:1.5">
            ${escapeHtml(state.checkoutError)}
          </div>
        ` : ''}

        ${missing.length
          ? `<button type="button" data-action="openAddressModal" style="background:#141414;color:#fff;border:none;padding:15px;border-radius:16px;font-weight:600;font-size:14.5px;cursor:pointer;margin-top:2px;font-family:inherit">
               Add your details to continue
             </button>`
          : `<button type="button" data-action="placeOrder" ${state.placingOrder || needsSlot ? 'disabled' : ''} style="background:${state.placingOrder || needsSlot ? 'rgba(20,20,20,0.35)' : '#141414'};color:#fff;border:none;padding:15px;border-radius:16px;font-weight:600;font-size:14.5px;cursor:${state.placingOrder || needsSlot ? 'default' : 'pointer'};margin-top:2px;font-family:inherit">
               ${state.placingOrder
                 ? 'Redirecting to secure checkout…'
                 : needsSlot
                   ? 'Choose a delivery slot'
                   : `${state.checkoutError ? 'Try again' : 'Pay & place order'} · £${grandTotal.toFixed(2)}`}
             </button>`}
      </div>
    </div>
  `;
}

function renderTermsModal() {
  if (!state.showTermsModal) return '';
  const isTerms = state.termsModalTab !== 'privacy';

  return `
    <div class="graftr-modal-overlay">
      <div class="graftr-modal-card" style="max-height:85vh;overflow-y:auto">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e5e5e5;padding-bottom:12px;position:sticky;top:0;background:#fff;z-index:2">
          <div style="font-size:17px;font-weight:800;color:#141414">${isTerms ? '📜 Terms of Service' : '🔒 Privacy Policy'}</div>
          <button data-action="closeTermsModal" style="background:none;border:none;font-size:20px;cursor:pointer;color:#6b6b6b">✕</button>
        </div>

        <!-- Modal Tab Switcher -->
        <div style="display:flex;background:#f2f2f2;border-radius:12px;padding:4px;gap:4px;margin-top:12px">
          <button type="button" data-action="setTermsTab" data-arg="terms" style="flex:1;padding:8px;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;background:${isTerms ? '#fff' : 'transparent'};color:${isTerms ? '#141414' : '#6b6b6b'};box-shadow:${isTerms ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}">
            Terms of Service
          </button>
          <button type="button" data-action="setTermsTab" data-arg="privacy" style="flex:1;padding:8px;border:none;border-radius:8px;font-size:12.5px;font-weight:700;cursor:pointer;background:${!isTerms ? '#fff' : 'transparent'};color:${!isTerms ? '#141414' : '#6b6b6b'};box-shadow:${!isTerms ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}">
            Privacy Policy
          </button>
        </div>

        <div style="font-size:13px;line-height:1.6;color:#444444;display:flex;flex-direction:column;gap:12px;margin-top:14px">
          ${isTerms ? `
            <p><b>1. Introduction</b><br>Welcome to Vendaru ("Company", "we", "our", "us"). These Terms of Service govern your use of our local delivery network mobile and web applications operating in Bolton, Greater Manchester, UK.</p>
            <p><b>2. Delivery Services &amp; Timelines</b><br>Vendaru provides on-demand courier dispatch connecting local customers with independent couriers and local retail merchants (such as Morrisons Daily). Standard delivery estimates range between 15 to 30 minutes subject to courier availability and local traffic conditions.</p>
            <p><b>3. Payments &amp; Cancellations</b><br>All payments are securely processed. Orders may be cancelled penalty-free prior to courier departure. Once a courier accepts and departs with an order, cancellation requests may be subject to a restock fee.</p>
            <p><b>4. User Responsibilities</b><br>Customers must provide accurate delivery addresses and contact information to ensure successful dispatch.</p>
          ` : `
            <p><b>1. Information We Collect</b><br>We collect personal information necessary for delivery fulfillment including your name, contact telephone number, delivery address, and device location coordinates for live GPS courier tracking.</p>
            <p><b>2. How We Use Information</b><br>Your information is used strictly to process orders, facilitate live GPS navigation for couriers, send order status updates, and provide customer support.</p>
            <p><b>3. Data Security</b><br>We implement SSL encryption and strict data protection measures. We do not sell or share your personal data with third-party marketers.</p>
            <p><b>4. Contacting Data Protection</b><br>If you have questions about your personal data, contact us at privacy@graftr.co.uk.</p>
          `}
        </div>

        <button type="button" data-action="closeTermsModal" style="background:#141414;color:#fff;border:none;padding:12px;border-radius:14px;font-weight:700;font-size:13.5px;cursor:pointer;margin-top:16px">
          Close Window
        </button>
      </div>
    </div>
  `;
}

// The one place the brand pink is allowed back into an otherwise monochrome
// UI — it's the loyalty card, so it should look like a card in your wallet.
// `context` is 'account' (progress, points you at the basket) or 'basket'
// (where the free item is actually chosen, since that's the shopping cart).
function renderLoyaltyCard(context = 'account') {
  const l = loyaltyState();
  const ready = l.rewardsReady > 0;

  // On the order that completes a card the remainder wraps to 0, which would
  // blank every stamp at the exact moment the reward lands. Show a full card
  // instead until the reward is claimed.
  const shown = ready && l.stamps === 0 ? LOYALTY_STAMPS_PER_REWARD : l.stamps;

  // Earned stamps fill in a deeper rose than the card itself so they read as
  // stamped rather than printed; white numerals need that much contrast.
  const dots = Array.from({ length: LOYALTY_STAMPS_PER_REWARD }, (_, i) =>
    `<span class="loyalty-stamp${i < shown ? ' is-filled' : ''}">${i + 1}</span>`
  ).join('');

  const toGo = LOYALTY_STAMPS_PER_REWARD - l.stamps;

  // Same shell, section label and footer-row-with-a-pill as every other card;
  // only the fill colour is the brand pink.
  const cardShell = 'border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#ffcbe1';
  const sectionLabel = 'font-size:12.5px;font-weight:600;color:rgba(20,20,20,0.6);padding:13px 0 0';
  const pill = 'background:#141414;color:#fff;border-radius:14px;padding:10px 18px;font-weight:600;font-size:13.5px;cursor:pointer;flex:0 0 auto';

  const footer = ready
    ? `<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;border-top:1px solid rgba(20,20,20,0.1);padding-top:13px;margin-top:13px">
         <span style="font-size:12.5px;color:rgba(20,20,20,0.7);line-height:1.45">
           Free item unlocked${l.rewardsReady > 1 ? ` ×${l.rewardsReady}` : ''} · up to £${LOYALTY_REWARD_MAX}.00
         </span>
         ${context === 'basket'
           ? `<div class="press" data-action="openLoyaltyPicker" style="${pill}">Choose item</div>`
           : `<div class="press" data-action="goBasket" style="${pill}">Go to basket</div>`}
       </div>`
    : `<div style="font-size:12.5px;color:rgba(20,20,20,0.7);line-height:1.45;border-top:1px solid rgba(20,20,20,0.1);padding-top:13px;margin-top:13px">
         ${toGo} more order${toGo === 1 ? '' : 's'} over £${LOYALTY_MIN_ORDER} to unlock a free item worth up to £${LOYALTY_REWARD_MAX}.00. Stamps land once an order is delivered.
       </div>`;

  return `
    <div class="shop-card" style="${cardShell}">
      <div style="padding:4px 16px 14px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;${sectionLabel}">
          <span>Vendaru loyalty</span>
          <span style="font-weight:500">${shown}/${LOYALTY_STAMPS_PER_REWARD}</span>
        </div>

        <div style="display:flex;gap:7px;justify-content:space-between;margin-top:13px">${dots}</div>

        ${footer}

        ${l.redeemed > 0
          ? `<div style="font-size:12px;color:rgba(20,20,20,0.55);margin-top:9px">${l.redeemed} reward${l.redeemed === 1 ? '' : 's'} claimed so far</div>`
          : ''}
      </div>
    </div>`;
}

// Free-item picker: only things at or under the reward cap.
function renderLoyaltyPickerModal() {
  if (!state.showLoyaltyPicker) return '';
  const eligible = PRODUCTS
    .filter(p => p.estimated_price_gbp <= LOYALTY_REWARD_MAX)
    .sort((a, b) => b.estimated_price_gbp - a.estimated_price_gbp);

  return `
    <div class="graftr-modal-overlay" style="z-index:99998;justify-content:center;align-items:center;padding:24px">
      <div style="width:100%;max-width:370px;max-height:100%;overflow-y:auto;background:#fff;border-radius:20px;padding:16px;display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-size:17px;font-weight:700;color:#141414">Choose your free item</div>
          <button type="button" data-action="closeLoyaltyPicker" style="background:none;border:none;font-size:20px;cursor:pointer;color:#6b6b6b;padding:2px 6px;line-height:1">✕</button>
        </div>
        <div style="font-size:13px;color:#6b6b6b;line-height:1.5;margin-top:-6px">Anything up to £${LOYALTY_REWARD_MAX}.00, on us.</div>
        <div style="display:flex;flex-direction:column">
          ${eligible.map((p, i) => `
            <button type="button" data-action="redeemLoyaltyItem" data-arg="${p.id}" style="display:flex;align-items:center;gap:11px;text-align:left;background:none;border:none;padding:10px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : ''}cursor:pointer;font-family:inherit;width:100%">
              <span style="width:38px;height:38px;border-radius:10px;flex:0 0 auto;background:#f2f2f2 center/cover url('${state.productImages[p.id] || p.image}')"></span>
              <span style="flex:1;min-width:0">
                <span style="display:block;font-size:13.5px;font-weight:500;color:#141414;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(p.name)}</span>
                <span style="display:block;font-size:12.5px;color:#6b6b6b">${escapeHtml(p.weight_or_volume || '')}</span>
              </span>
              <span style="font-size:13px;color:#6b6b6b;flex:0 0 auto">£${p.estimated_price_gbp.toFixed(2)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>`;
}

function renderShopperAccount() {
  const p = state.userProfile;
  const auth = state.authUser;
  const isSignedIn = !!auth;

  const displayName = auth ? auth.name : (p.name || 'Your account');
  const emailDisplay = (auth && auth.email) || p.email || 'No email saved';
  const providerLabel = !auth ? 'Not signed in' : auth.provider === 'google' ? 'Google Account' : 'Email Account';

  const avatarBadge = p.avatarSrc
    ? `<img src="${p.avatarSrc}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid #141414;box-shadow:0 4px 12px rgba(20,20,20,0.15)" />`
    : `<div style="width:52px;height:52px;border-radius:50%;background:#141414;color:#ffffff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:19px;box-shadow:0 4px 12px rgba(20,20,20,0.2)">
        ${(displayName || 'GU').substring(0, 2).toUpperCase()}
      </div>`;

  const openFaq = state.openFaqIdx;

  const faqs = [
    {
      q: 'How fast is delivery in Bolton?',
      a: 'Orders are fulfilled by local couriers in Bolton. Standard delivery is 15–30 minutes, direct from merchants like Morrisons Daily.'
    },
    {
      q: 'How does live tracking work?',
      a: 'Once an order is placed it is broadcast to nearby couriers. As soon as one accepts and leaves the store, live tracking turns on so you can follow their route on the map.'
    },
    {
      q: 'Can I cancel an active order?',
      a: 'Yes. Use Cancel Order on your Basket or Activity tab any time before the courier leaves with your items.'
    },
    {
      q: 'How do I contact support?',
      a: 'Chat to the assistant any time, email support@vendaru.com, or call +44 161 800 9000.'
    }
  ];

  // Rows share one card and are separated by hairlines rather than each being
  // its own bordered box — far calmer than boxes nested inside boxes.
  const rowBase = 'width:100%;background:none;border:none;padding:13px 0;font-size:14px;color:#141414;display:flex;justify-content:space-between;align-items:center;gap:12px;cursor:pointer;text-align:left;font-family:inherit;box-sizing:border-box';
  const divider = 'border-top:1px solid #f0f0f0';

  const faqListHtml = faqs.map((f, i) => {
    const isOpen = openFaq == i;
    return `
      <div style="${i > 0 ? divider : ''}">
        <button type="button" data-action="toggleFaq" data-arg="${i}" style="${rowBase}">
          <span style="font-weight:500">${escapeHtml(f.q)}</span>
          <span style="font-size:17px;color:#9a9a9a;font-weight:400;line-height:1;flex:0 0 auto">${isOpen ? '−' : '+'}</span>
        </button>
        ${isOpen ? `<div style="padding:0 0 13px;font-size:13px;color:#5c5c5c;line-height:1.55;max-width:92%">${escapeHtml(f.a)}</div>` : ''}
      </div>
    `;
  }).join('');

  const cardStyle = 'border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;background:#ffffff;padding:4px 16px';
  const sectionLabel = 'font-size:12.5px;font-weight:600;color:#6b6b6b;padding:13px 0 4px';
  const linkRow = 'text-decoration:none;' + rowBase;
  const rowValue = 'font-size:13px;color:#6b6b6b;font-weight:400;flex:0 0 auto';

  return `
  <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">

    <div style="font-size:25px;font-weight:700;color:#141414">Account</div>

    <!-- Profile -->
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;background:#ffffff;padding:16px;display:flex;flex-direction:row;align-items:center;gap:14px;text-align:left">
      ${avatarBadge}
      <div style="flex:1;min-width:0">
        <div style="font-size:16px;font-weight:600;color:#141414">${escapeHtml(displayName)}</div>
        <div style="font-size:13px;color:#6b6b6b;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(emailDisplay)}</div>
        <div style="font-size:12.5px;color:#9a9a9a;margin-top:3px">${isSignedIn ? 'Signed in with ' + providerLabel : 'Not signed in'}</div>
      </div>
      <button type="button" data-action="openAddressModal" style="background:none;border:none;font-size:13.5px;font-weight:600;color:#141414;cursor:pointer;flex:0 0 auto;font-family:inherit;padding:4px">Edit</button>
    </div>

    <!-- Delivery address -->
    <div class="shop-card" style="${cardStyle}">
      <div style="display:flex;justify-content:space-between;align-items:baseline;${sectionLabel}">
        <span>Delivery address</span>
        <button type="button" data-action="openAddressModal" style="background:none;border:none;font-size:13.5px;font-weight:600;color:#141414;cursor:pointer;font-family:inherit;padding:0">Edit</button>
      </div>
      <div style="padding-bottom:14px">
        ${p.address
          ? `<div style="font-size:14px;color:#141414;line-height:1.5">${escapeHtml(p.address)}${p.postcode ? ', ' + escapeHtml(p.postcode) : ''}</div>
             <div style="font-size:13px;color:#6b6b6b;margin-top:3px">${escapeHtml(p.city || '')}${p.city && p.phone ? ' · ' : ''}${escapeHtml(p.phone || '')}</div>
             ${p.instructions ? `<div style="font-size:13px;color:#6b6b6b;margin-top:6px">Note: ${escapeHtml(p.instructions)}</div>` : ''}`
          : `<div style="font-size:13.5px;color:#6b6b6b;line-height:1.5">No delivery address saved yet. You'll need one before you can order.</div>`}
      </div>
    </div>

    ${renderLoyaltyCard()}

    <!-- Help -->
    <div class="shop-card" style="${cardStyle}">
      <div style="${sectionLabel}">Help</div>
      ${faqListHtml}
    </div>

    <!-- Contact -->
    <div class="shop-card" style="${cardStyle}">
      <div style="${sectionLabel}">Contact</div>
      <button type="button" data-action="openContactChat" style="${rowBase}">
        <span style="font-weight:500">Live chat</span>
        <span style="${rowValue}">24/7</span>
      </button>
      <a href="mailto:support@vendaru.com" style="${linkRow};${divider}">
        <span style="font-weight:500">Email</span>
        <span style="${rowValue}">support@vendaru.com</span>
      </a>
      <a href="tel:+441618009000" style="${linkRow};${divider}">
        <span style="font-weight:500">Phone</span>
        <span style="${rowValue}">+44 161 800 9000</span>
      </a>
    </div>

    <!-- Legal -->
    <div class="shop-card" style="${cardStyle}">
      <div style="${sectionLabel}">Legal</div>
      <button type="button" data-action="openTermsModal" data-arg="terms" style="${rowBase}">
        <span style="font-weight:500">Terms of Service</span>
      </button>
      <button type="button" data-action="openTermsModal" data-arg="privacy" style="${rowBase};${divider}">
        <span style="font-weight:500">Privacy Policy</span>
      </button>
    </div>

    <!-- Switch app / sign out -->
    <div style="display:flex;flex-direction:column;gap:10px;margin-top:2px">
      <a href="${ROLE_PATH}" style="width:100%;background:#ffffff;color:#141414;border:1.5px solid rgba(20,20,20,0.15);padding:14px;border-radius:16px;font-size:14px;font-weight:600;text-decoration:none;text-align:center;box-sizing:border-box;display:block">
        Switch to courier app
      </a>
      <a href="${BUSINESS_PATH}" style="width:100%;background:#ffffff;color:#141414;border:1.5px solid rgba(20,20,20,0.15);padding:14px;border-radius:16px;font-size:14px;font-weight:600;text-decoration:none;text-align:center;box-sizing:border-box;display:block">
        List your business
      </a>
      <button type="button" data-action="logout" style="width:100%;background:none;border:none;padding:6px;font-size:14px;font-weight:600;color:#6b6b6b;cursor:pointer;font-family:inherit">
        Log out
      </button>
    </div>

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
      <div style="border:1.5px solid #141414;background:#fafafa;border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center">
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
  return `display:flex;flex-direction:column;align-items:center;gap:3px;font-size:10px;cursor:pointer;color:${active ? '#141414' : 'rgba(20,20,20,0.45)'};font-weight:${active ? 800 : 500}`;
}

function renderCourierTabs() {
  return `
  <div class="floating-tabbar">
    <div class="press tabbar-brand" data-action="goActivity" title="Vendaru home"><img src="assets/brand/logo.svg" alt="Vendaru" /></div>
    <div class="press floating-tab" data-action="goActivity" style="${tabStyle('courier-activity')}">
      <span style="position:relative">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 3 H16 V15 L15 16.5 L14 15 L13 16.5 L12 15 L11 16.5 L10 15 L9 16.5 L8 15 L7 16.5 L6 15 L5 16.5 L4 15 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.5 7H13.5M6.5 10H13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        ${state.courierInbox.some(m => !m.read) ? '<span class="tab-badge"></span>' : ''}
      </span>
      Activity
    </div>
    <div class="press floating-tab" data-action="goEarnings" style="${tabStyle('courier-earnings')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="5" width="16" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2 9h16" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="12.5" r="1.2" fill="currentColor"/></svg>
      Earnings
    </div>
    <div class="press floating-tab" data-action="goPack" style="${tabStyle('courier-pack')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2l7 3.5v9L10 18l-7-3.5v-9L10 2z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 5.5L10 9l6.5-3.5M10 9v9" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>
      Pick&amp;Pack
    </div>
    <div class="press floating-tab" data-action="goCourierAccount" style="${tabStyle('courier-account')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="6.5" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 17c1-3.5 4-5 6.5-5s5.5 1.5 6.5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Account
    </div>
  </div>`;
}

function renderShopperTabs() {
  return `
  <div class="floating-tabbar">
    <div class="press tabbar-brand" data-action="goShop" title="Vendaru home"><img src="assets/brand/logo.svg" alt="Vendaru" /></div>
    <div class="press floating-tab" data-action="goShop" style="${tabStyle('shopper-shop')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M5 7h10l-1 10H6L5 7z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7.5 7V5.5a2.5 2.5 0 015 0V7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Shop
    </div>
    <div class="press floating-tab" data-action="goAllServices" style="${tabStyle('shopper-all-services')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><rect x="2.5" y="2.5" width="6" height="6" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="11.5" y="2.5" width="6" height="6" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="2.5" y="11.5" width="6" height="6" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="11.5" y="11.5" width="6" height="6" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Services
    </div>
    <div class="press floating-tab" data-action="goBasket" style="${tabStyle('shopper-basket')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="6.5" cy="17" r="1.3" fill="currentColor"/><circle cx="14.5" cy="17" r="1.3" fill="currentColor"/><path d="M2 3h2l1.6 10.4a1.5 1.5 0 001.5 1.3h8.1a1.5 1.5 0 001.5-1.2L18 6H4.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Basket
    </div>
    <div class="press floating-tab" data-action="goShopperInbox" style="${tabStyle('shopper-inbox')}">
      <span style="position:relative">
        <svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 3 H16 V15 L15 16.5 L14 15 L13 16.5 L12 15 L11 16.5 L10 15 L9 16.5 L8 15 L7 16.5 L6 15 L5 16.5 L4 15 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.5 7H13.5M6.5 10H13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        ${state.shopperInbox.some(m => !m.read) ? '<span class="tab-badge"></span>' : ''}
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

function processVendaruAiQuery(rawQuery) {
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
    return "<b>Vendaru Delivery</b>: Standard delivery takes 15–30 minutes directly from your local merchant! You can track your courier live on the order screen.";
  }

  if (query.includes('offer') || query.includes('discount') || query.includes('deal')) {
    return "🏷️ <b>Today's Hot Deals</b>:<br>• Morrisons Meal Deal Sandwiches from £2.45<br>• Walkers Crisps 6-pack for £2.20<br>• Ben & Jerry's Cookie Dough Ice Cream - £4.95";
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hello! 👋 I'm here to help you shop on Vendaru. What would you like to order today?";
  }

  return "I can help you search for groceries, check prices, recommend items, or track your delivery! Try asking: <i>'Find fresh milk'</i> or <i>'Add chocolate to basket'</i>";
}

// Quick-add row: real products with their real photos rather than topic chips.
// Prefers things this customer has actually ordered before, topped up with
// staples so the row is never empty on a new account.
const AI_QUICK_ADD_STAPLE_IDS = [1, 3, 6, 5, 25, 19, 10];

function aiQuickAddProducts(limit = 8) {
  const picked = [];
  const seen = new Set();
  const push = (p) => { if (p && !seen.has(p.id)) { seen.add(p.id); picked.push(p); } };

  (state.orders || []).forEach(o => (o.items || []).forEach(i => {
    push(PRODUCTS.find(p => p.name === i.name));
  }));
  AI_QUICK_ADD_STAPLE_IDS.forEach(id => push(PRODUCTS.find(p => p.id === id)));

  return picked.slice(0, limit);
}

function renderAiChatDrawer() {
  if (!state.aiChatOpen) return '';

  const msgsHtml = state.aiMessages.map(m => {
    const isBot = m.role === 'bot';
    return `
      <div class="ai-msg ${m.role}">
        ${isBot ? '<div style="font-size:11px;font-weight:700;color:#64748b;margin-bottom:4px;display:flex;align-items:center;gap:4px">✨ Vendaru AI</div>' : ''}
        <div>${escapeHtml(m.text)}</div>
      </div>`;
  }).join('');

  const loadingHtml = state.aiLoading ? `
    <div class="ai-msg bot" style="display:flex;align-items:center;gap:8px;color:#64748b;font-size:13px;font-style:italic">
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#3b82f6"></span>
      ✨ Vendaru AI is thinking...
    </div>` : '';

  const presetChips = [
    { label: '🛒 Grocery Staples', prompt: 'Find grocery staples for fast delivery' },
    { label: '📦 Track My Order', prompt: 'Where is my active order?' },
    { label: '🔧 Local Trades', prompt: 'Show me verified plumbers and electricians' },
    { label: '⚡ Free Shipping', prompt: 'Which items have free delivery?' }
  ];

  return `
    <div class="ai-modal-overlay" data-action="toggleAiChat">
      <div class="ai-chat-sheet" onclick="event.stopPropagation()">
        <!-- Grab handle for mobile bottom sheet -->
        <div style="width:38px;height:4px;background:#e2e8f0;border-radius:2px;margin:8px auto 0;flex:0 0 auto" class="ai-grab-handle"></div>

        <!-- Header -->
        <div class="ai-sheet-header">
          <div style="display:flex;align-items:center;gap:10px;min-width:0">
            <div style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg, #1e293b, #0f172a);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,0.2);flex:0 0 auto">✨</div>
            <div style="min-width:0">
              <div style="display:flex;align-items:center;gap:6px">
                <span style="font-size:14.5px;font-weight:700;color:#ffffff;line-height:1.2">Vendaru Assistant</span>
                <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#10b981;box-shadow:0 0 8px #10b981"></span>
              </div>
              <div style="font-size:11.5px;color:#94a3b8;line-height:1.2;margin-top:2px">Online · Shopping & Services</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:6px">
            <button type="button" data-action="clearAiChat" title="Reset Conversation" style="background:rgba(255,255,255,0.1);border:none;color:#94a3b8;border-radius:8px;padding:5px 9px;font-size:11.5px;font-weight:600;cursor:pointer;font-family:inherit;transition:all 0.15s">Reset</button>
            <button type="button" data-action="toggleAiChat" title="Close" style="width:28px;height:28px;border-radius:50%;background:rgba(255,255,255,0.12);border:none;color:#ffffff;font-size:15px;display:flex;align-items:center;justify-content:center;cursor:pointer;line-height:1;transition:all 0.15s">✕</button>
          </div>
        </div>

        <!-- Chat Body -->
        <div class="ai-chat-body" id="ai-chat-body-scroll">
          ${msgsHtml}
          ${loadingHtml}
        </div>

        <!-- Suggestion Chips Row -->
        <div class="ai-chip-suggestions">
          ${presetChips.map(c => `
            <button type="button" class="ai-chip" data-action="sendPresetPrompt" data-arg="${escapeHtml(c.prompt)}">
              ${escapeHtml(c.label)}
            </button>
          `).join('')}
          ${aiQuickAddProducts().map(p => {
            const src = state.productImages[p.id] || p.image;
            return `
            <button type="button" class="ai-product-chip" data-action="addToCart" data-arg="${p.id}" title="Add ${escapeHtml(p.name)} to basket">
              <span class="ai-product-chip-img" style="background-image:url('${src}')"></span>
              <span class="ai-product-chip-name">${escapeHtml(p.name)}</span>
              <span class="ai-product-chip-price">£${p.estimated_price_gbp.toFixed(2)}</span>
            </button>`;
          }).join('')}
        </div>

        <!-- Input Footer -->
        <div class="ai-chat-footer">
          <button type="button" class="ai-mic-btn-inline${state.aiListening ? ' listening' : ''}" data-action="toggleVoiceInput" title="Speak message">
            ${state.aiListening
              ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>'
              : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z"/><path d="M19 11a7 7 0 01-14 0"/><line x1="12" y1="18" x2="12" y2="22"/></svg>'}
          </button>
          <input type="text" id="ai-chat-input" data-bind="aiInput" value="${escapeHtml(state.aiInput || '')}" placeholder="${state.aiListening ? 'Listening… speak now' : 'Ask Vendaru AI anything...'}" autocomplete="off" />
          <button type="button" class="ai-send-btn" data-action="submitAiMessage" title="Send message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
        ${state.aiVoiceSupported === false ? '<div style="padding:0 16px 8px;font-size:11px;color:#94a3b8;text-align:center">Voice input unavailable in this browser — type instead.</div>' : ''}
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
  const isScheduled = currentOrder.status === 'Scheduled';
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
  const mapBadgeText = isScheduled
    ? `SCHEDULED · ${(scheduleLabelFor(currentOrder.scheduledAt) || currentOrder.scheduledFor || '').toUpperCase()}`
    : isPending
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
      <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:#ffffff;border:1px solid #e5e5e5;border-radius:12px;gap:10px">
        <div style="display:flex;align-items:center;gap:10px;min-width:0;flex:1">
          <img src="${imgSrc}" style="width:34px;height:34px;object-fit:contain;border-radius:8px;background:#fafafa;padding:2px;border:1px solid #f2f2f2;flex:none" alt="${escapeHtml(item.name)}" />
          <div style="min-width:0;flex:1">
            <div style="font-size:12.5px;font-weight:700;color:#141414;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(item.name)}</div>
            <div style="font-size:11px;color:#6b6b6b">Qty: ${item.qty || 1}</div>
          </div>
        </div>
        <div style="font-size:12.5px;font-weight:800;color:#141414">£${((item.qty || 1) * priceGbp).toFixed(2)}</div>
      </div>
    `;
  }).join('');

  const pendingNoticeHtml = '';

  const tipHtml = isDelivered ? (
    currentOrder.tip
      ? `
      <div style="background:#fafafa;border:2px solid #d4d4d4;border-radius:20px;padding:16px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:6px">
        <div style="font-size:28px">💚</div>
        <div style="font-size:14.5px;font-weight:800">Thanks for tipping £${currentOrder.tip.toFixed(2)}!</div>
        <div style="font-size:12px;opacity:0.65">Your courier will see this on their earnings.</div>
      </div>
    `
      : `
      <div style="background:#fafafa;border:2px solid #141414;border-radius:20px;padding:16px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:10px">
        <div style="font-size:14.5px;font-weight:800">Delivered! Add a tip for ${escapeHtml((currentOrder.courier || 'your courier').split(' (')[0])}?</div>
        <div style="display:flex;gap:8px;width:100%">
          ${[1, 2, 5].map(amt => `<button type="button" data-action="addTip" data-arg="${amt}" style="flex:1;background:#141414;color:#fff;border:none;padding:12px 0;border-radius:14px;font-weight:800;font-size:13.5px;cursor:pointer">£${amt}</button>`).join('')}
        </div>
        <button type="button" data-action="addTip" data-arg="0" style="background:none;border:none;color:#6b6b6b;font-size:12px;font-weight:700;cursor:pointer;text-decoration:underline">No thanks</button>
      </div>
    `
  ) : '';

  let etaLabel;
  // A scheduled order has no courier and no route yet, so there's nothing to
  // estimate — show the booked window instead of a spinning "Calculating…".
  if (isScheduled) etaLabel = scheduleLabelFor(currentOrder.scheduledAt) || currentOrder.scheduledFor || 'Scheduled';
  else if (isPending) etaLabel = 'Pending';
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
    <div style="background:#ffffff;border:1.5px solid rgba(20,20,20,0.12);border-radius:24px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);display:flex;flex-direction:column">
      
      <!-- 1. Top Section: Live Map -->
      <div style="position:relative;width:100%;height:220px">
        <div id="graftr-leaflet-map" style="width:100%;height:100%"></div>
        <div style="position:absolute;top:12px;right:12px;z-index:2;background:rgba(255,255,255,0.92);backdrop-filter:blur(6px);padding:5px 11px;border-radius:20px;font-size:10.5px;font-weight:800;box-shadow:0 2px 8px rgba(0,0,0,0.15);display:flex;align-items:center;gap:6px">
          <span style="width:7px;height:7px;border-radius:50%;background:${isLiveGpsActive ? '#141414' : (isPending ? '#141414' : '#141414')};display:inline-block;animation:${isLiveGpsActive ? 'courierPulse 1.5s infinite' : 'none'}"></span>
          ${mapBadgeText}
        </div>
      </div>

      <!-- 2. Middle Section: Courier Driver & Live ETA Bar -->
      <div style="background:#141414;color:#fff;padding:14px 16px;display:flex;align-items:center;justify-content:space-between">
        <div style="display:flex;align-items:center;gap:10px">
          ${isScheduled
            // No disc behind the calendar — the long two-line label squeezed it
            // into an oval. Bare icon instead.
            ? `<div style="flex:0 0 auto;color:#ffffff;display:flex;align-items:center;justify-content:center">${CALENDAR_ICON_SVG}</div>`
            // flex:0 0 auto so this one can't get squashed out of round either.
            : `<div style="width:38px;height:38px;flex:0 0 auto;border-radius:50%;background:rgba(255,255,255,0.16);color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:18px">🚴</div>`}
          <div>
            <!-- Nobody is assigned to a scheduled order yet, so don't claim a
                 courier is on their way to you. -->
            <div style="font-size:13.5px;font-weight:700">${isScheduled ? 'Delivery booked' : (currentOrder.courier || 'Alex (Assigned Courier)')}</div>
            <div style="font-size:11px;opacity:0.7">${isScheduled
              ? 'A courier is assigned nearer the time'
              : `Heading to ${escapeHtml((currentOrder.address || state.userProfile.address).split(',')[0])}`}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div id="graftr-eta-value" style="font-size:18px;font-weight:800;color:#ffffff">${etaLabel}</div>
          <div style="font-size:10.5px;opacity:0.7">Total £${currentOrder.total ? currentOrder.total.toFixed(2) : '0.00'}</div>
        </div>
      </div>

      <!-- 3. Bottom Section: Seamless Horizontal Order Timeline -->
      <div style="padding:16px 14px 14px;background:#ffffff;border-top:1px solid #f2f2f2;position:relative">
        <div style="position:relative;padding:0 9px">
          <div style="position:absolute;top:9px;left:0;right:0;height:2px;background:#e5e5e5;z-index:0"></div>
          <div style="position:absolute;top:9px;left:0;height:2px;background:#141414;z-index:0;width:${progressPct}%;transition:width 0.3s"></div>
          <div style="display:flex;justify-content:space-between;position:relative;z-index:1">
            ${steps.map(s => `
              <div style="display:flex;flex-direction:column;align-items:center;gap:5px;width:25%">
                <div style="width:18px;height:18px;border-radius:50%;background:${s.done ? '#141414' : '#fff'};border:2px solid ${s.done ? '#141414' : '#e5e5e5'};color:#fff;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700">${s.done ? '✓' : ''}</div>
                <div style="font-size:9.5px;font-weight:${s.done ? 700 : 500};opacity:${s.done ? 1 : 0.5};text-align:center;line-height:1.15">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

    </div>

    ${renderOrderItemsCardHtml(currentOrder)}
  `;
}

// One order row, shared by the Activity and Basket cards so the two can't drift.
// Rows share their card and are split by hairlines rather than each being its own
// bordered box; the tracked one is marked by weight, not a heavy border.
function orderRowsHtml(orders) {
  const smallBtn = 'background:none;border:none;padding:0;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit';
  return orders.map((o, index) => {
    const isSelected = o.id === state.activeOrderId;
    const itemCount = o.items ? o.items.reduce((s, i) => s + (i.qty || 1), 0) : 1;
    const isCancelled = o.status === 'Cancelled';
    const isDelivered = o.status === 'Delivered';
    const isClosed = isCancelled || isDelivered;
    // Recomputed from the timestamp so "Tomorrow" doesn't go stale overnight.
    const slotLabel = scheduleLabelFor(o.scheduledAt) || o.scheduledFor || '';

    return `
      <div style="padding:13px 0;${index > 0 ? 'border-top:1px solid #f0f0f0;' : ''}">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">
          <div style="font-size:14px;font-weight:${isSelected ? 600 : 500};color:#141414">${escapeHtml(o.merchant)}</div>
          <div style="font-size:14px;font-weight:600;color:#141414;flex:0 0 auto">£${o.total ? o.total.toFixed(2) : '0.00'}</div>
        </div>
        <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px">
          ${o.id} · ${itemCount} item${itemCount > 1 ? 's' : ''} · ${escapeHtml(o.status)}${slotLabel ? ` · ${escapeHtml(slotLabel)}` : ''}
        </div>
        <div style="display:flex;gap:16px;margin-top:9px">
          ${!isClosed ? `
            <button type="button" data-action="selectOrderToTrack" data-arg="${o.id}" style="${smallBtn};color:#141414">
              ${isSelected ? 'Tracking' : 'Track'}
            </button>
            <button type="button" data-action="cancelOrder" data-arg="${o.id}" style="${smallBtn};color:#6b6b6b">Cancel</button>
          ` : `
            <button type="button" data-action="selectOrderToTrack" data-arg="${o.id}" style="${smallBtn};color:#141414">View</button>
          `}
          <button type="button" data-action="deleteOrder" data-arg="${o.id}" style="${smallBtn};color:#6b6b6b">Remove</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderLoggedOrdersCard() {
  if (!state.orders || state.orders.length === 0) return '';

  return `
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:4px 16px 12px">
        <div style="font-size:12.5px;font-weight:600;color:#6b6b6b;padding:13px 0 0">Orders (${state.orders.length})</div>
        ${orderRowsHtml(state.orders)}
      </div>
    </div>`;
}

function renderShopperInbox() {
  const currentOrder = state.orders.find(o => o.id === state.activeOrderId) || state.orders[0];

  const trackingHtml = currentOrder ? renderShopperTrackingSection(currentOrder) : `
    <div style="padding:18px 0 22px;display:flex;flex-direction:column;gap:12px;align-items:center;text-align:center">
      <div>
        <div style="font-size:15px;font-weight:600;color:#141414">No orders yet</div>
        <div style="font-size:13px;color:#6b6b6b;margin-top:4px;max-width:280px;line-height:1.5">
          Place an order to track your delivery here.
        </div>
      </div>
      <button type="button" data-action="goShop" style="background:#141414;color:#fff;border:none;padding:11px 22px;border-radius:14px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit">
        Start shopping
      </button>
    </div>
  `;

  const trackingCard = `
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:16px;display:flex;flex-direction:column;gap:14px">
        <span style="font-size:12.5px;font-weight:600;color:#6b6b6b">Order tracking</span>
        ${trackingHtml}
      </div>
    </div>`;

  const messagesCard = `
    <div class="shop-card" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff">
      <div style="padding:16px;display:flex;flex-direction:column;gap:12px">
        ${renderInboxHeader(state.shopperInbox, 'markAllShopperRead', 'Messages', '12.5px')}
        <div id="shopper-inbox-messages" style="max-height:280px;overflow-y:auto;display:flex;flex-direction:column;gap:10px;padding-right:2px">
          ${renderInboxList(state.shopperInbox, 'toggleShopperRead')}
        </div>
      </div>
    </div>`;

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:25px;font-weight:700;color:#141414">Activity</div>
    ${trackingCard}
    ${renderLoggedOrdersCard()}
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
    html: '<div style="background:#141414;color:#fff;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 4px 12px rgba(20,20,20,0.4)">🏠</div>',
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
  L.marker(customerPos, { icon: customerIcon }).addTo(map).bindPopup(`<b>${escapeHtml(addressLabel)}</b>`).openPopup();

  // Real Street Route Path connecting Store to Customer Address (snapped to actual roads)
  const streetRoutePath = await fetchStreetRoute(storePos, customerPos);
  L.polyline(streetRoutePath, { color: '#141414', weight: 5, opacity: 0.9, lineCap: 'round', lineJoin: 'round' }).addTo(map);

  // COURIER VISIBILITY RULE: Only show courier marker IF accepted!
  const isAccepted = currentOrder
    && currentOrder.status !== 'Pending Courier Acceptance'
    && currentOrder.status !== 'Scheduled';

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
      html: '<div style="background:#141414;color:#fff;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:19px;box-shadow:0 6px 16px rgba(0,0,0,0.3);border:2px solid #141414">🚴</div>',
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
  if (!currentOrder || currentOrder.status === 'Pending Courier Acceptance' || currentOrder.status === 'Scheduled' || currentOrder.status === 'Delivered' || currentOrder.status === 'Cancelled') {
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


function stopVoiceRecognition() {
  if (recognition) {
    try { recognition.stop(); } catch (err) { /* already stopped */ }
    recognition = null;
  }
  state.aiListening = false;
}

// --- business dashboard (/business) ----------------------------------------

function blankBusiness() {
  return {
    id: 'biz-' + Date.now().toString(36),
    ownerEmail: (state.authUser && state.authUser.email) || null,
    name: '', category: SERVICE_CATEGORIES[0].id, tagline: '', about: '',
    area: '', phone: '', services: [], gallery: [], createdAt: Date.now(),
  };
}

// Every business keeps its own log — bookings, orders and cancellations for
// that account only, so one merchant never sees another's activity.
function logBusinessMessage(businessId, tag, text) {
  if (!businessId) return;
  state.businessMessages.unshift({
    id: 'bm-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    businessId, tag, text, createdAt: Date.now(), read: false,
  });
  saveBusinessMessages();
}

function messagesForBusiness(businessId) {
  return (state.businessMessages || []).filter(m => m.businessId === businessId);
}

// Grocery orders belong to the shop they were placed with, so Morrisons gets
// the same per-account log a service business does.
function merchantBusinessId(merchantName) {
  const match = (state.businesses || []).find(
    b => (b.name || '').toLowerCase() === String(merchantName || '').toLowerCase()
  );
  return match ? match.id : null;
}

function bookingsForBusiness(businessId) {
  return (state.bookings || [])
    .filter(bk => bk.businessId === businessId)
    .sort((a, b) => a.scheduledAt - b.scheduledAt);
}

function renderBusinessTabs() {
  const tab = (id, label, icon) => `
    <div class="press floating-tab" data-action="setBusinessTab" data-arg="${id}" style="${state.businessTab === id
      ? 'color:#141414;font-weight:600' : 'color:#9a9a9a;font-weight:500'}">
      ${icon}
      ${label}
    </div>`;

  return `
  <div class="floating-tabbar">
    <div class="press tabbar-brand" data-action="setBusinessTab" data-arg="page" title="Vendaru home"><img src="assets/brand/logo.svg" alt="Vendaru" /></div>
    ${tab('page', 'Page', '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="3.5" y="3" width="13" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6.5 7.5h7M6.5 10.5h7M6.5 13.5h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>')}
    ${tab('services', 'Services', '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 6h14M3 10h14M3 14h9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>')}
    ${tab('gallery', 'Photos', '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="7.5" cy="8" r="1.2" fill="currentColor"/><path d="M4 14l4-4 3.5 3.5L14 11l2 2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>')}
    ${tab('bookings', 'Bookings', '<svg width="20" height="20" viewBox="0 0 20 20"><rect x="3" y="4.5" width="14" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3 8.5h14M7 3v3M13 3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>')}
    ${tab('messages', 'Activity', `<span style="position:relative"><svg width="20" height="20" viewBox="0 0 20 20"><path d="M4 3 H16 V15 L15 16.5 L14 15 L13 16.5 L12 15 L11 16.5 L10 15 L9 16.5 L8 15 L7 16.5 L6 15 L5 16.5 L4 15 Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M6.5 7H13.5M6.5 10H13.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>${
      (() => { const m = myBusiness(); return m && messagesForBusiness(m.id).some(x => !x.read) ? '<span class="tab-badge"></span>' : ''; })()
    }</span>`)}
  </div>`;
}

// The plan picker. Sits behind the Page tab rather than taking a slot in the
// tab bar, which is already full.
function renderBusinessPlanTab(mine, shell, label) {
  const billing = state.planBilling || 'monthly';
  const chosen = state.planChoice || (mine.tier || DEFAULT_TIER);
  const current = mine.tier || null;
  const chosenTier = tierById(chosen);
  const isCurrent = current === chosen && (mine.billing || 'monthly') === billing;

  const toggle = (id, text) => `
    <button type="button" data-action="setPlanBilling" data-arg="${id}" style="flex:1;padding:9px;border-radius:12px;border:none;font-size:12.5px;font-weight:${billing === id ? 600 : 500};cursor:pointer;font-family:inherit;background:${billing === id ? '#fff' : 'transparent'};color:${billing === id ? '#141414' : '#6b6b6b'};box-shadow:${billing === id ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'}">${text}</button>`;

  return `
    <div class="shop-card" style="${shell}">
      <div style="padding:4px 16px 14px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;${label}">
          <span>Your plan</span>
          <button type="button" data-action="setBusinessTab" data-arg="page" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#141414;cursor:pointer;font-family:inherit">Done</button>
        </div>
        <div style="font-size:13.5px;color:#141414;margin-top:6px;line-height:1.5">
          ${current
            ? `You're on <b>${escapeHtml(tierById(current).label)}</b>, billed ${billingLabel(mine.billing || 'monthly')}.`
            : 'Choose how your listing appears and where it sits.'}
        </div>

        <div style="display:flex;background:#f2f2f2;border-radius:12px;padding:4px;gap:4px;margin-top:12px">
          ${toggle('monthly', 'Monthly')}
          ${toggle('annual', 'Annual · 2 months free')}
        </div>
      </div>
    </div>

    ${BUSINESS_TIERS.map(t => {
      const on = t.id === chosen;
      const live = t.id === current;
      return `
      <div class="press shop-card" data-action="setPlanChoice" data-arg="${t.id}" style="border:1.5px solid ${on ? '#141414' : 'rgba(20,20,20,0.12)'};border-radius:16px;overflow:hidden;background:#fff;cursor:pointer">
        <div style="padding:14px 16px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">
            <span style="font-size:15px;font-weight:600;color:#141414">
              ${escapeHtml(t.label)}${live ? ' <span style="font-size:12px;font-weight:500;color:#6b6b6b">· current</span>' : ''}
            </span>
            <span style="font-size:15px;font-weight:600;color:#141414;flex:0 0 auto">£${tierPrice(t, billing)}<span style="font-size:12px;font-weight:500;color:#6b6b6b">/${billing === 'annual' ? 'yr' : 'mo'}</span></span>
          </div>
          <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.45">${escapeHtml(t.summary)}</div>
          <div style="margin-top:9px">
            ${t.features.map(f => `<div style="font-size:12.5px;color:#6b6b6b;line-height:1.6">· ${escapeHtml(f)}</div>`).join('')}
          </div>
          ${billing === 'annual'
            ? `<div style="font-size:12px;color:#6b6b6b;margin-top:7px">£${(t.annual / 12).toFixed(2)} a month, paid yearly</div>`
            : ''}
        </div>
      </div>`;
    }).join('')}

    <div class="shop-card" style="${shell}">
      <div style="padding:14px 16px">
        <div style="${label};padding-top:0">How your card will look on ${escapeHtml(chosenTier.label)}</div>
        <div style="margin-top:10px">${businessCardHtml(mine, { linked: false, variant: chosenTier.card })}</div>
        ${chosen === 'priority'
          ? `<div style="font-size:12.5px;color:#6b6b6b;margin-top:9px;line-height:1.45">Pinned above every other listing in Events and on the home screen.</div>`
          : ''}
      </div>
    </div>

    ${state.planError ? `
      <div style="border:1.5px solid rgba(20,20,20,0.15);border-radius:14px;padding:12px 14px;font-size:13px;color:#141414;line-height:1.5">${escapeHtml(state.planError)}</div>
    ` : ''}

    <button type="button" data-action="subscribePlan" ${state.subscribing || isCurrent ? 'disabled' : ''}
      style="background:${state.subscribing || isCurrent ? 'rgba(20,20,20,0.35)' : '#141414'};color:#fff;border:none;padding:15px;border-radius:16px;font-weight:600;font-size:14.5px;cursor:${state.subscribing || isCurrent ? 'default' : 'pointer'};font-family:inherit">
      ${state.subscribing
        ? 'Opening secure checkout…'
        : isCurrent
          ? 'This is your current plan'
          : `Subscribe · £${tierPrice(chosenTier, billing)} ${billingLabel(billing)}`}
    </button>

    ${current ? `
      <button type="button" data-action="cancelPlan" style="background:none;border:none;padding:4px;font-size:13px;font-weight:500;color:#6b6b6b;cursor:pointer;font-family:inherit">Cancel subscription</button>
    ` : ''}`;
}

function renderBusinessDashboard() {
  const shell = 'border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;background:#fff';
  const label = 'font-size:12.5px;font-weight:600;color:#6b6b6b;padding:13px 0 0';
  const mine = myBusiness();

  // SETUP ONLY — remove with ADMIN_MODE.
  const adminBar = ADMIN_MODE ? `
    <div class="shop-card" style="${shell}">
      <div style="padding:4px 16px 14px">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;${label}">
          <span>All listings (${(state.businesses || []).length})</span>
          <button type="button" data-action="exportBusinesses" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#141414;cursor:pointer;font-family:inherit">Export</button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:10px">
          ${(state.businesses || []).map(b => {
            const on = mine && b.id === mine.id;
            return `<button type="button" data-action="adminSelectBusiness" data-arg="${b.id}" style="flex:0 0 auto;padding:8px 12px;border-radius:20px;font-size:12.5px;font-weight:${on ? 600 : 500};cursor:pointer;border:1.5px solid ${on ? '#141414' : 'rgba(20,20,20,0.15)'};background:${on ? '#141414' : '#fff'};color:${on ? '#fff' : '#141414'};font-family:inherit">${escapeHtml(b.name || 'Untitled')}</button>`;
          }).join('')}
          <button type="button" data-action="createBusiness" style="flex:0 0 auto;padding:8px 12px;border-radius:20px;font-size:12.5px;font-weight:500;cursor:pointer;border:1.5px dashed rgba(20,20,20,0.3);background:#fff;color:#141414;font-family:inherit">+ New listing</button>
        </div>
      </div>
    </div>` : '';

  // Nothing listed yet — one button to create the listing.
  if (!mine) {
    return `
      <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
        <div style="font-size:25px;font-weight:700;color:#141414">Your business</div>
        ${adminBar}
        <div class="shop-card" style="${shell}">
          <div style="padding:22px 16px;text-align:center">
            <div style="font-size:15px;font-weight:600;color:#141414">List your business on Vendaru</div>
            <div style="font-size:13px;color:#6b6b6b;margin-top:4px;line-height:1.5">Create your card, add the services you offer and take bookings from local customers.</div>
            <button type="button" data-action="createBusiness" style="background:#141414;color:#fff;border:none;padding:11px 22px;border-radius:14px;font-size:13.5px;font-weight:600;cursor:pointer;margin-top:12px;font-family:inherit">Create my page</button>
          </div>
        </div>
      </div>`;
  }

  const tab = state.businessTab;
  let body;



  if (tab === 'page') {
    const e = state.businessEditor || mine;
    const live = isBusinessLive(mine);
    body = `
      <!-- Plan drives how the card looks and where it ranks, so it's the
           first thing on the page tab. -->
      <div class="press shop-card" data-action="setBusinessTab" data-arg="plan" style="${shell};cursor:pointer">
        <div style="padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div style="min-width:0">
            <div style="font-size:14px;font-weight:600;color:#141414">
              ${mine.tier ? `${escapeHtml(tierOf(mine).label)} plan` : 'Choose a plan'}
            </div>
            <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.45">
              ${mine.tier
                ? `£${tierPrice(tierOf(mine), mine.billing || 'monthly')} ${billingLabel(mine.billing || 'monthly')} · ${escapeHtml(tierOf(mine).summary)}`
                : 'Pick how your card looks and where it appears.'}
            </div>
          </div>
          <span style="opacity:0.4;flex:0 0 auto">›</span>
        </div>
      </div>

      <!-- Whether customers can see them yet, stated plainly. -->
      <div class="shop-card" style="${shell}">
        <div style="padding:14px 16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div style="min-width:0">
            <div style="font-size:14px;font-weight:600;color:#141414">${live ? 'Your page is live' : 'Draft — not visible yet'}</div>
            <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.45">
              ${live
                ? `Customers can find you on the home screen and under ${serviceCategory(mine.category) ? escapeHtml(serviceCategory(mine.category).label) : 'your category'}.`
                : 'Add a business name and save to publish your page.'}
            </div>
          </div>
          <span style="flex:0 0 auto;width:10px;height:10px;border-radius:50%;background:${live ? '#2e7d4f' : 'rgba(20,20,20,0.25)'}"></span>
        </div>
      </div>

      <!-- Both sizes previewed: the large one heads their page and the home
           screen, the small one is what a category listing shows. -->
      <div class="shop-card" style="${shell}">
        <div style="padding:4px 16px 14px">
          <div style="${label}">On the home screen &amp; your page</div>
          <div style="margin-top:10px">${businessCardHtml(e, { linked: false, variant: 'large' })}</div>
          <label style="display:block;text-align:center;margin-top:10px;font-size:13px;font-weight:500;color:#141414;cursor:pointer;text-decoration:underline;text-underline-offset:2px">
            ${e.coverSrc ? 'Change banner photo' : 'Add a banner photo'}
            <input type="file" accept="image/*" data-upload-business-cover style="display:none" />
          </label>
          <div style="${label}">In category listings</div>
          <div style="margin-top:10px">${businessCardHtml(e, { linked: false, variant: 'compact' })}</div>
        </div>
      </div>

      <div class="shop-card" style="${shell}">
        <div style="padding:14px 16px;display:flex;flex-direction:column;gap:13px">
          <div style="display:flex;align-items:center;gap:13px">
            ${e.logoSrc
              ? `<img src="${e.logoSrc}" style="width:56px;height:56px;border-radius:14px;object-fit:cover;flex:0 0 auto" />`
              : `<div style="width:56px;height:56px;border-radius:14px;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;flex:0 0 auto">${escapeHtml((e.name || '?').slice(0, 1).toUpperCase())}</div>`}
            <label style="font-size:13.5px;font-weight:500;color:#141414;cursor:pointer;text-decoration:underline;text-underline-offset:2px">
              Change logo
              <input type="file" accept="image/*" data-upload-business-logo style="display:none" />
            </label>
          </div>

          <div class="graftr-input-group">
            <label>Business name</label>
            <input type="text" data-bind="business.name" value="${escapeHtml(e.name || '')}" placeholder="e.g. Paws of Bolton" />
          </div>

          <div class="graftr-input-group">
            <label>Category</label>
            <select data-bind="business.category" style="width:100%;box-sizing:border-box;border:1.5px solid rgba(20,20,20,0.15);border-radius:12px;padding:11px 13px;font-size:16px;font-family:inherit;background:#fff;color:#141414">
              ${SERVICE_CATEGORIES.map(c => `<option value="${c.id}" ${c.id === e.category ? 'selected' : ''}>${c.emoji} ${c.label}</option>`).join('')}
            </select>
          </div>

          <div class="graftr-input-group">
            <label>One-line description</label>
            <input type="text" data-bind="business.tagline" value="${escapeHtml(e.tagline || '')}" placeholder="Insured dog walking &amp; drop-in visits" />
          </div>

          <div class="graftr-input-group">
            <label>Area covered</label>
            <input type="text" data-bind="business.area" value="${escapeHtml(e.area || '')}" placeholder="Bolton BL1" />
          </div>

          <div class="graftr-input-group">
            <label>Contact number</label>
            <input type="tel" data-bind="business.phone" value="${escapeHtml(e.phone || '')}" placeholder="01204 900 000" />
          </div>

          <div class="graftr-input-group">
            <label>About your business</label>
            <textarea data-bind="business.about" rows="4" placeholder="Tell customers what you do and what makes you different.">${escapeHtml(e.about || '')}</textarea>
          </div>

          <button type="button" data-action="saveBusiness" style="background:#141414;color:#fff;border:none;padding:13px;border-radius:14px;font-weight:600;font-size:13.5px;cursor:pointer;font-family:inherit">Save page</button>

          ${state.confirmingBusinessDelete
            ? `<div style="border-top:1px solid #f0f0f0;padding-top:13px;margin-top:2px">
                 <div style="font-size:13px;color:#141414;line-height:1.5">Delete this listing? Customers will no longer be able to find or book you.</div>
                 <div style="display:flex;gap:10px;margin-top:11px">
                   <button type="button" data-action="cancelDeleteBusiness" style="flex:1;background:#fff;border:1.5px solid rgba(20,20,20,0.15);padding:12px;border-radius:14px;font-weight:600;font-size:13.5px;cursor:pointer;font-family:inherit">Keep it</button>
                   <button type="button" data-action="deleteBusiness" style="flex:1;background:#fff;border:1.5px solid rgba(20,20,20,0.15);padding:12px;border-radius:14px;font-weight:600;font-size:13.5px;cursor:pointer;font-family:inherit;color:#a3243b">Delete listing</button>
                 </div>
               </div>`
            : `<button type="button" data-action="confirmDeleteBusiness" style="background:none;border:none;padding:2px 0 0;font-size:13px;font-weight:500;color:#6b6b6b;cursor:pointer;font-family:inherit">Delete this listing</button>`}
        </div>
      </div>`;
  } else if (tab === 'services') {
    const list = mine.services || [];
    body = `
      <div class="shop-card" style="${shell}">
        <div style="padding:4px 16px 14px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;${label}">
            <span>Services you offer${list.length ? ` (${list.length})` : ''}</span>
            <button type="button" data-action="addService" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#141414;cursor:pointer;font-family:inherit">Add service</button>
          </div>
          ${list.length
            ? list.map((s, i) => `
                <div style="padding:12px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
                  <div class="graftr-input-group">
                    <label>Name</label>
                    <input type="text" data-bind="service.${s.id}.name" value="${escapeHtml(s.name || '')}" placeholder="Group walk (1 hour)" />
                  </div>
                  <div class="graftr-input-group" style="margin-top:9px">
                    <label>Description</label>
                    <input type="text" data-bind="service.${s.id}.description" value="${escapeHtml(s.description || '')}" placeholder="What's included" />
                  </div>
                  <div style="display:flex;gap:10px;margin-top:9px">
                    <div class="graftr-input-group" style="flex:1;min-width:0">
                      <label>Price (£)</label>
                      <input type="number" min="0" step="0.01" data-bind="service.${s.id}.price" value="${s.price != null ? s.price : ''}" placeholder="14.00" />
                    </div>
                    <div class="graftr-input-group" style="flex:1;min-width:0">
                      <label>Minutes</label>
                      <input type="number" min="0" step="5" data-bind="service.${s.id}.durationMins" value="${s.durationMins != null ? s.durationMins : ''}" placeholder="60" />
                    </div>
                  </div>
                  <button type="button" data-action="removeService" data-arg="${s.id}" style="background:none;border:none;padding:8px 0 0;font-size:13px;font-weight:500;color:#6b6b6b;cursor:pointer;font-family:inherit">Remove</button>
                </div>`).join('')
            : `<div style="padding:14px 0 4px">
                 <div style="font-size:13.5px;font-weight:500;color:#141414">No services yet</div>
                 <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.5">Add what customers can book, with a price and how long it takes.</div>
               </div>`}
        </div>
      </div>`;
  } else if (tab === 'gallery') {
    body = `
      <div class="shop-card" style="${shell}">
        <div style="padding:4px 16px 16px">
          <div style="${label}">Showcase your work</div>
          <div style="font-size:12.5px;color:#6b6b6b;margin-top:4px;line-height:1.5">Four photos, shown at the bottom of your page. Tap a tile to replace it.</div>
          ${galleryGridHtml(mine.gallery, { editable: true })}
        </div>
      </div>`;
  } else if (tab === 'plan') {
    body = renderBusinessPlanTab(mine, shell, label);
  } else if (tab === 'messages') {
    const msgs = messagesForBusiness(mine.id);
    body = `
      <div class="shop-card" style="${shell}">
        <div style="padding:4px 16px 14px">
          <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;${label}">
            <span>Activity${msgs.length ? ` (${msgs.length})` : ''}</span>
            ${msgs.some(m => !m.read)
              ? `<button type="button" data-action="markBusinessMessagesRead" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#141414;cursor:pointer;font-family:inherit">Mark all read</button>`
              : ''}
          </div>
          ${msgs.length
            ? msgs.map((m, i) => `
                <div style="padding:12px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
                  <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">
                    <span style="font-size:12.5px;font-weight:600;color:#6b6b6b">${escapeHtml(m.tag)}</span>
                    <span style="font-size:12px;color:#6b6b6b;flex:0 0 auto">${scheduleLabelFor(m.createdAt) || ''}</span>
                  </div>
                  <div style="font-size:13.5px;color:#141414;line-height:1.5;margin-top:3px;font-weight:${m.read ? 400 : 500}">${escapeHtml(m.text)}</div>
                </div>`).join('')
            : `<div style="padding:14px 0 4px">
                 <div style="font-size:13.5px;font-weight:500;color:#141414">Nothing yet</div>
                 <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.5">Orders and bookings placed with this account are logged here.</div>
               </div>`}
        </div>
      </div>`;
  } else {
    const list = bookingsForBusiness(mine.id);
    const upcoming = list.filter(bk => bk.status === 'Confirmed');
    const past = list.filter(bk => bk.status !== 'Confirmed');
    const row = (bk, i) => `
      <div style="padding:13px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : ''}">
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px">
          <div style="font-size:14px;font-weight:500;color:#141414">${escapeHtml(bk.serviceName)}</div>
          <div style="font-size:14px;font-weight:600;color:#141414;flex:0 0 auto">£${(bk.price || 0).toFixed(2)}</div>
        </div>
        <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px">
          ${escapeHtml(scheduleLabelFor(bk.scheduledAt) || '')} · ${escapeHtml(bk.customerName || 'Customer')} · ${escapeHtml(bk.status)}
        </div>
        ${bk.customerPhone ? `<div style="font-size:12.5px;color:#6b6b6b;margin-top:2px">${escapeHtml(bk.customerPhone)}</div>` : ''}
        ${bk.customerAddress ? `<div style="font-size:12.5px;color:#6b6b6b;margin-top:2px">${escapeHtml(bk.customerAddress)}</div>` : ''}
        ${bk.status === 'Confirmed'
          ? `<div style="display:flex;gap:16px;margin-top:9px">
               <button type="button" data-action="completeBooking" data-arg="${bk.id}" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#141414;cursor:pointer;font-family:inherit">Mark complete</button>
               <button type="button" data-action="cancelBooking" data-arg="${bk.id}" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#6b6b6b;cursor:pointer;font-family:inherit">Cancel</button>
             </div>`
          : ''}
      </div>`;

    body = `
      <div class="shop-card" style="${shell}">
        <div style="padding:4px 16px 14px">
          <div style="${label}">Upcoming${upcoming.length ? ` (${upcoming.length})` : ''}</div>
          ${upcoming.length
            ? upcoming.map(row).join('')
            : `<div style="padding:14px 0 4px">
                 <div style="font-size:13.5px;font-weight:500;color:#141414">No bookings yet</div>
                 <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.5">Bookings customers pay for appear here with their contact details.</div>
               </div>`}
        </div>
      </div>
      ${past.length ? `
        <div class="shop-card" style="${shell}">
          <div style="padding:4px 16px 14px">
            <div style="${label}">Past (${past.length})</div>
            ${past.map(row).join('')}
          </div>
        </div>` : ''}`;
  }

  const titles = { page: 'Your page', services: 'Services', gallery: 'Photos', bookings: 'Bookings', messages: 'Activity', plan: 'Your plan' };

  return `
    <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div style="font-size:25px;font-weight:700;color:#141414">${titles[tab] || 'Your business'}</div>
        <button type="button" data-action="logout" style="background:none;border:none;padding:0;font-size:13px;font-weight:500;color:#6b6b6b;cursor:pointer;font-family:inherit">Log out</button>
      </div>

      ${adminBar}

      ${state.businessNotice ? `
        <div style="border:1.5px solid ${state.businessNotice.tone === 'ok' ? 'rgba(46,125,79,0.35)' : 'rgba(20,20,20,0.15)'};border-radius:16px;padding:13px 15px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;background:${state.businessNotice.tone === 'ok' ? '#f2f9f5' : '#fafafa'}">
          <div style="font-size:13px;color:#141414;line-height:1.5;min-width:0">${escapeHtml(state.businessNotice.text)}</div>
          <button type="button" data-action="dismissBusinessNotice" style="background:none;border:none;font-size:16px;cursor:pointer;color:#6b6b6b;padding:0 2px;line-height:1;flex:0 0 auto">✕</button>
        </div>` : ''}

      ${body}
    </div>`;
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
  'shopper-services': renderShopperServices,
  'shopper-all-services': renderShopperAllServices,
  'shopper-business': renderShopperBusiness,
  'business-dashboard': renderBusinessDashboard,
};

function render() {
  const content = screenRenderers[state.screen]();
  let tabs = '';
  let bottomPad = '';
  if (state.mode === 'courier') {
    tabs = renderCourierTabs();
    bottomPad = 'padding-bottom:calc(110px + env(safe-area-inset-bottom, 0px));';
  } else if (state.mode === 'shopper') {
    tabs = renderShopperTabs();
    bottomPad = 'padding-bottom:calc(110px + env(safe-area-inset-bottom, 0px));';
  } else if (state.mode === 'business') {
    tabs = renderBusinessTabs();
    bottomPad = 'padding-bottom:calc(110px + env(safe-area-inset-bottom, 0px));';
  }

  const aiDrawer = renderAiChatDrawer();
  const addressModal = renderAddressModal();
  const checkoutModal = renderCheckoutModal();
  const authModal = renderAuthModal();
  const termsModal = renderTermsModal();
  const loyaltyPicker = renderLoyaltyPickerModal();
  const bookingPicker = renderBookingPickerModal();

  root.innerHTML = `
    <div class="app-scroll" style="flex:1;overflow:auto;padding-top:calc(56px + env(safe-area-inset-top, 0px));${bottomPad}">${content}</div>
    ${tabs}
    ${aiDrawer}
    ${addressModal}
    ${checkoutModal}
    ${authModal}
    ${termsModal}
    ${loyaltyPicker}
    ${bookingPicker}
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
        google.accounts.id.renderButton(el, { theme: 'outline', size: 'large', shape: 'pill', text: 'continue_with', logo_alignment: 'left', width: 330 });
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
    state.screen = state.authRole === 'courier' ? 'courier-activity'
      : state.authRole === 'business' ? 'business-dashboard'
      : 'shopper-shop';

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
  // Role is decided by the URL now, so switching role means going to that app.
  setAuthRole: (role) => {
    if (role === PATH_ROLE) return;
    window.location.href = roleHome(role);
  },
  loginWithEmail: () => {
    state.authProvider = 'email';
    state.authError = null;
    state.emailAuthMode = 'login';
    state.showAuthModal = true;
    render();
  },
  // "New to Vendaru? Sign Up Here" — same modal, opened straight onto the signup form.
  openEmailSignup: () => {
    state.authProvider = 'email';
    state.authError = null;
    state.emailAuthMode = 'signup';
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
    state.screen = state.authRole === 'courier' ? 'courier-activity'
      : state.authRole === 'business' ? 'business-dashboard'
      : 'shopper-shop';

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
      state.authNotice = "Google Sign-In isn't connected yet — add a Google OAuth Client ID in app.js to enable it. Use email sign-in for now.";
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
    state.checkoutError = null;
    render();
  },
  closeCheckoutModal: () => {
    state.showCheckoutModal = false;
    state.checkoutError = null;
    state.placingOrder = false;
    render();
  },
  placeOrder: async () => {
    const lines = cartLines();
    if ((lines.length === 0 && bookingCount() === 0) || state.placingOrder) return;

    // Belt and braces: the button is swapped out when details are missing, but
    // never let an order through without somewhere to deliver it.
    const missing = missingProfileFields();
    if (missing.length) {
      state.checkoutError = `Add your ${missing.map(f => f.label.toLowerCase()).join(', ')} first.`;
      state.showAddressModal = true;
      render();
      return;
    }

    // Same belt and braces for scheduling: the button is disabled without a
    // slot, but never let a "Schedule" order through as an immediate one.
    if (basketHasDelivery() && state.deliveryLater && !state.deliverySlot) {
      state.checkoutError = 'Choose a delivery slot first.';
      render();
      return;
    }
    const sub = cartTotal();                 // already net of any free items
    // One flat fee, whatever the basket holds.
    const deliveryFee = SERVICE_FEE;
    const freeUsed = loyaltyPendingFree();
    const bookings = bookingLines();

    // Free units are billed as their own zero-priced line so they show up on
    // the Stripe receipt as a reward rather than silently vanishing.
    const billedLines = [];
    lines.forEach(l => {
      const free = freeQtyFor(l.product.id, l.qty);
      if (l.qty - free > 0) {
        billedLines.push({ name: l.product.name, qty: l.qty - free, unitPrice: l.product.estimated_price_gbp });
      }
      if (free > 0) {
        billedLines.push({ name: `${l.product.name} (loyalty reward)`, qty: free, unitPrice: 0 });
      }
    });

    // Each booking bills as its own line so it shows on the Stripe receipt.
    bookings.forEach(bk => {
      billedLines.push({ name: `${bk.serviceName} — ${bk.businessName}`, qty: 1, unitPrice: bk.price });
    });

    const snapshot = {
      items: lines.map(l => ({
        name: l.product.name,
        qty: l.qty,
        price: l.product.estimated_price_gbp,
        freeQty: freeQtyFor(l.product.id, l.qty),
      })),
      subtotal: sub + bookingsTotal(),
      deliveryFee,
      bookings: bookings.map(bk => ({ businessId: bk.businessId, businessName: bk.businessName, serviceId: bk.serviceId, serviceName: bk.serviceName, price: bk.price, at: bk.at })),
      loyaltyUsed: freeUsed,
      loyaltyDiscount: loyaltyDiscount(),
      address: `${state.userProfile.address}, ${state.userProfile.postcode}`,
      scheduledAt: selectedDeliveryTimestamp(),
    };

    state.placingOrder = true;
    state.checkoutError = null;
    render();

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: billedLines,
          deliveryFee,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.url) {
        localStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(snapshot));
        // The redirect can fail to take (blocked navigation, or the user comes
        // straight back). Re-enable the button so it can't sit disabled forever.
        redirectWatchdog = setTimeout(() => {
          state.placingOrder = false;
          state.checkoutError = "Couldn't reach the payment page. Please try again.";
          localStorage.removeItem(PENDING_ORDER_KEY);
          render();
        }, 8000);
        window.location.href = data.url;
        return;
      }

      // No payment backend is the expected demo setup, not a failed payment —
      // fall through to the mock order. Anything else is a genuine failure, so
      // surface it instead of quietly creating an order.
      if (!isPaymentBackendUnavailable(res, data)) {
        state.placingOrder = false;
        state.checkoutError = data.error
          ? `Payment failed: ${data.error}`
          : 'Payment failed. No charge was made — please try again.';
        render();
        return;
      }
      console.warn('Stripe not configured, placing a mock order instead:', data.error);
    } catch (err) {
      // Network/offline. Don't invent an order the customer never paid for.
      console.warn('Checkout request failed:', err);
      state.placingOrder = false;
      state.checkoutError = "Couldn't reach checkout. Check your connection and try again.";
      render();
      return;
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
  clearAllOrders: () => {
    state.orders = [];
    state.activeOrderId = null;
    saveLoggedOrders();
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
  clearAiChat: () => {
    state.aiMessages = [
      { role: 'bot', text: "👋 Hi! I'm your Graftr AI Assistant. Ask me to find items, recommend groceries, or locate verified local UK services!" }
    ];
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
        replyText = processVendaruAiQuery(query);
      }

      state.aiMessages.push({ role: 'bot', text: replyText });
      state.aiLoading = false;
      render();
    }, 500);
  },
  goActivity: () => { state.screen = 'courier-activity'; render(); },
  goEarnings: () => { state.screen = 'courier-earnings'; render(); },
  goPack: () => { state.screen = 'courier-pack'; render(); },
  goCourierAccount: () => { state.screen = 'courier-account'; render(); },
  goShop: () => { state.screen = 'shopper-shop'; render(); },
  goBrowse: () => { state.screen = 'shopper-browse'; render(); },
  goBrowseCategory: (category) => { state.screen = 'shopper-browse'; state.pendingScrollCategory = category; render(); },
  // --- local services: browsing and booking --------------------------------
  goAllServices: () => { state.screen = 'shopper-all-services'; render(); },
  goServiceCategory: (id) => {
    state.servicesCategory = String(id);
    state.screen = 'shopper-services';
    render();
  },
  openBusiness: (id) => {
    state.activeBusinessId = String(id);
    state.screen = 'shopper-business';
    render();
  },
  backToCategory: () => {
    const b = businessById(state.activeBusinessId);
    if (b) state.servicesCategory = b.category;
    state.screen = state.servicesCategory ? 'shopper-services' : 'shopper-shop';
    render();
  },
  openBookingPicker: (arg) => {
    const [businessId, serviceId] = String(arg).split('|');
    const business = businessById(businessId);
    if (!serviceById(business, serviceId)) return;
    // Open on the first day that still has usable times.
    const firstDay = Array.from({ length: SERVICE_BOOKING_DAYS }, (_, i) => i)
      .find(o => serviceSlotsFor(o).length > 0) ?? 1;
    state.bookingDraft = { businessId, serviceId, dayOffset: firstDay, slot: null };
    render();
  },
  closeBookingPicker: () => { state.bookingDraft = null; render(); },
  setBookingDay: (offset) => {
    if (!state.bookingDraft) return;
    state.bookingDraft.dayOffset = Number(offset) || 0;
    state.bookingDraft.slot = null;      // times differ per day
    render();
  },
  setBookingSlot: (slot) => {
    if (!state.bookingDraft) return;
    state.bookingDraft.slot = String(slot);
    render();
  },
  confirmBooking: () => {
    const d = state.bookingDraft;
    if (!d || !d.slot) return;
    const business = businessById(d.businessId);
    const service = serviceById(business, d.serviceId);
    if (!business || !service) return;

    const at = serviceSlotTimestamp(d.dayOffset, d.slot);
    if (!at) return;

    state.bookingCart.push({
      key: `${business.id}:${service.id}:${at}`,
      businessId: business.id,
      businessName: business.name,
      serviceId: service.id,
      serviceName: service.name,
      price: Number(service.price) || 0,
      durationMins: service.durationMins || null,
      at,
    });
    state.bookingDraft = null;
    state.screen = 'shopper-basket';
    render();
  },
  removeBooking: (key) => {
    state.bookingCart = (state.bookingCart || []).filter(b => b.key !== String(key));
    render();
  },

  // --- business owner ------------------------------------------------------
  setBusinessTab: (tab) => {
    state.businessTab = String(tab);
    state.businessEditor = null;
    render();
  },
  createBusiness: () => {
    const fresh = blankBusiness();
    state.businesses.unshift(fresh);
    saveBusinesses();
    state.businessTab = 'page';
    state.businessEditor = null;
    if (ADMIN_MODE) state.adminEditingId = fresh.id;   // edit the new one straight away
    render();
  },
  // --- plans ---------------------------------------------------------------
  setPlanBilling: (id) => { state.planBilling = String(id); state.planError = null; render(); },
  setPlanChoice: (id) => { state.planChoice = String(id); state.planError = null; render(); },
  subscribePlan: async () => {
    const mine = myBusiness();
    if (!mine || state.subscribing) return;
    const billing = state.planBilling || 'monthly';
    const tier = tierById(state.planChoice || mine.tier || DEFAULT_TIER);

    state.subscribing = true;
    state.planError = null;
    render();

    // Held so the plan can be applied when Stripe sends the browser back.
    const pending = { businessId: mine.id, tier: tier.id, billing };
    try { localStorage.setItem(PENDING_PLAN_KEY, JSON.stringify(pending)); } catch (e) { /* ignore */ }

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: {
            name: `Vendaru ${tier.label} listing — ${mine.name}`,
            amount: tierPrice(tier, billing),
            interval: billing === 'annual' ? 'year' : 'month',
          },
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      // No billing backend is the expected setup locally, so apply the plan
      // directly rather than blocking. A real failure is surfaced instead.
      if (isPaymentBackendUnavailable(res, data)) {
        applyPlan(pending);
        state.subscribing = false;
        render();
        return;
      }

      state.subscribing = false;
      state.planError = data.error ? `Subscription failed: ${data.error}` : 'Could not start the subscription. Please try again.';
      try { localStorage.removeItem(PENDING_PLAN_KEY); } catch (e) { /* ignore */ }
      render();
    } catch (err) {
      state.subscribing = false;
      state.planError = 'Could not reach the billing service. Please try again.';
      try { localStorage.removeItem(PENDING_PLAN_KEY); } catch (e) { /* ignore */ }
      render();
    }
  },
  cancelPlan: () => {
    const mine = myBusiness();
    if (!mine) return;
    mine.tier = null;
    mine.billing = null;
    mine.subscribedAt = null;
    saveBusinesses();
    state.businessNotice = { tone: 'warn', text: 'Subscription cancelled. Your listing drops back to a basic category card.' };
    render();
  },
  adminSelectBusiness: (id) => {
    state.adminEditingId = String(id);
    state.businessEditor = null;
    state.confirmingBusinessDelete = false;
    render();
  },
  saveBusiness: () => {
    const mine = myBusiness();
    if (!mine) { render(); return; }

    const wasLive = isBusinessLive(mine);
    if (state.businessEditor) Object.assign(mine, state.businessEditor);
    state.businessEditor = null;

    if (!isBusinessLive(mine)) {
      state.businessNotice = { tone: 'warn', text: 'Add a business name before your page can go live.' };
      render();
      return;
    }

    const cat = serviceCategory(mine.category);
    if (!wasLive) {
      // First time it has everything it needs to be public.
      mine.publishedAt = Date.now();
      mine.createdAt = mine.createdAt || Date.now();
      state.businessNotice = {
        tone: 'ok',
        text: `Your page is live. ${mine.name} now appears on the Vendaru home screen and under ${cat ? cat.label : 'your category'}.`,
      };
    } else {
      state.businessNotice = { tone: 'ok', text: 'Changes saved — your page has been updated.' };
    }

    saveBusinesses();
    render();
  },
  dismissBusinessNotice: () => { state.businessNotice = null; render(); },
  markBusinessMessagesRead: () => {
    const mine = myBusiness();
    if (!mine) return;
    state.businessMessages.forEach(m => { if (m.businessId === mine.id) m.read = true; });
    saveBusinessMessages();
    render();
  },

  // --- setup-only: publishing listings to everyone -------------------------
  // Listings live in this browser. Downloading them as assets/businesses.json
  // and committing that file is what makes them visible to every visitor.
  // Delete ADMIN_MODE (and this action) once the accounts are set up.
  exportBusinesses: () => {
    const payload = (state.businesses || []).filter(isBusinessLive).map(b => ({ ...b }));
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'businesses.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    state.businessNotice = {
      tone: 'ok',
      text: `Exported ${payload.length} listing${payload.length === 1 ? '' : 's'} to businesses.json. Drop it into assets/ and deploy to publish them to everyone.`,
    };
    render();
  },
  // Two taps: the first arms it, so a stray tap can't wipe a live listing.
  confirmDeleteBusiness: () => { state.confirmingBusinessDelete = true; render(); },
  cancelDeleteBusiness: () => { state.confirmingBusinessDelete = false; render(); },
  deleteBusiness: () => {
    const mine = myBusiness();
    if (!mine) return;
    state.businesses = state.businesses.filter(b => b.id !== mine.id);
    saveBusinesses();
    state.confirmingBusinessDelete = false;
    state.businessEditor = null;
    state.businessNotice = { tone: 'ok', text: `${mine.name || 'Your listing'} has been deleted. It no longer appears anywhere on Vendaru.` };
    render();
  },
  addService: () => {
    const mine = myBusiness();
    if (!mine) return;
    mine.services = mine.services || [];
    mine.services.push({
      id: 's' + Date.now().toString(36),
      name: '', description: '', price: 0, durationMins: 60,
    });
    saveBusinesses();
    render();
  },
  removeService: (serviceId) => {
    const mine = myBusiness();
    if (!mine) return;
    mine.services = (mine.services || []).filter(s => s.id !== String(serviceId));
    saveBusinesses();
    render();
  },
  completeBooking: (id) => {
    const bk = (state.bookings || []).find(x => x.id === String(id));
    if (!bk) return;
    bk.status = 'Completed';
    saveBookings();
    logBusinessMessage(bk.businessId, 'Completed', `${bk.serviceName} for ${bk.customerName || 'a customer'} marked complete.`);
    render();
  },
  cancelBooking: (id) => {
    const bk = (state.bookings || []).find(x => x.id === String(id));
    if (!bk) return;
    bk.status = 'Cancelled';
    saveBookings();
    logBusinessMessage(bk.businessId, 'Cancelled', `${bk.serviceName} on ${scheduleLabelFor(bk.scheduledAt)} was cancelled.`);
    state.shopperInbox.unshift({
      tag: 'Booking',
      text: `${bk.businessName} cancelled your ${bk.serviceName} booking for ${scheduleLabelFor(bk.scheduledAt)}.`,
      createdAt: Date.now(),
      read: false,
    });
    saveInbox();
    render();
  },
  goBasket: () => { state.screen = 'shopper-basket'; render(); },
  addToCart: (id) => { state.cart[id] = (state.cart[id] || 0) + 1; render(); },
  removeFromCart: (id) => {
    if (!state.cart[id]) return;
    state.cart[id] -= 1;
    if (state.cart[id] <= 0) delete state.cart[id];
    pruneLoyaltyFree();
    render();
  },
  goShopperInbox: () => { state.screen = 'shopper-inbox'; render(); },
  goShopperAccount: () => { state.screen = 'shopper-account'; render(); },
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
  openTermsModal: (tab) => {
    state.showTermsModal = true;
    state.termsModalTab = tab || 'terms';
    render();
  },
  closeTermsModal: () => {
    state.showTermsModal = false;
    render();
  },
  setTermsTab: (tab) => {
    state.termsModalTab = tab;
    render();
  },
  toggleFaq: (idx) => {
    const i = Number(idx);
    state.openFaqIdx = state.openFaqIdx === i ? null : i;
    render();
  },
  openContactChat: () => {
    state.aiChatOpen = true;
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
  // A segmented control, not a toggle: pressing the option you're already on
  // must keep it selected rather than flipping back.
  setDeliveryLater: () => {
    if (state.deliveryLater) return;
    state.deliveryLater = true;
    // Open on the first day that still has slots, with none pre-picked.
    state.deliveryDayOffset = [0, 1, 2, 3].find(o => deliverySlotsFor(o).length > 0) ?? 1;
    state.deliverySlot = null;
    render();
  },
  setDeliveryNow: () => {
    state.deliveryLater = false;
    state.deliverySlot = null;
    render();
  },
  setDeliveryDay: (offset) => {
    state.deliveryDayOffset = Number(offset) || 0;
    state.deliverySlot = null;   // slots differ per day
    render();
  },
  setDeliverySlot: (slot) => {
    state.deliverySlot = slot;
    render();
  },
  saveForLater: (productId) => {
    const id = String(productId);
    const qty = state.cart[id] || 0;
    if (!qty) return;
    state.savedForLater[id] = (state.savedForLater[id] || 0) + qty;
    delete state.cart[id];
    pruneLoyaltyFree();                   // parking it gives the reward back
    saveSavedForLater();
    render();
  },
  moveToBasket: (productId) => {
    const id = String(productId);
    const qty = state.savedForLater[id] || 0;
    if (!qty) return;
    state.cart[id] = (state.cart[id] || 0) + qty;   // merge if it's already there
    delete state.savedForLater[id];
    saveSavedForLater();
    render();
  },
  removeSaved: (productId) => {
    delete state.savedForLater[String(productId)];
    saveSavedForLater();
    render();
  },
  moveAllToBasket: () => {
    Object.entries(state.savedForLater).forEach(([id, qty]) => {
      state.cart[id] = (state.cart[id] || 0) + qty;
    });
    state.savedForLater = {};
    saveSavedForLater();
    render();
  },
  openLoyaltyPicker: () => {
    if (loyaltyState().rewardsReady < 1) return;
    state.showLoyaltyPicker = true;
    render();
  },
  closeLoyaltyPicker: () => { state.showLoyaltyPicker = false; render(); },
  redeemLoyaltyItem: (productId) => {
    const l = loyaltyState();
    if (l.rewardsReady < 1) return;                       // nothing to spend
    const product = PRODUCTS.find(p => String(p.id) === String(productId));
    if (!product || product.estimated_price_gbp > LOYALTY_REWARD_MAX) return;

    // The stamp isn't spent here — it's reserved by loyaltyFree and only
    // committed when the order is actually placed.
    state.cart[product.id] = (state.cart[product.id] || 0) + 1;
    state.loyaltyFree[product.id] = (state.loyaltyFree[product.id] || 0) + 1;
    state.showLoyaltyPicker = false;

    state.shopperInbox.unshift({
      tag: 'Loyalty',
      text: `Reward claimed — ${product.name} added to your basket free.`,
      createdAt: Date.now(),
      read: false,
    });
    saveInbox();

    state.screen = 'shopper-basket';
    render();
  },
  toggleCourierRead: (i) => { state.courierInbox[i].read = !state.courierInbox[i].read; saveInbox(); render(); },
  toggleShopperRead: (i) => { state.shopperInbox[i].read = !state.shopperInbox[i].read; saveInbox(); render(); },
  markAllCourierRead: () => { state.courierInbox.forEach(m => m.read = true); saveInbox(); render(); },
  markAllShopperRead: () => { state.shopperInbox.forEach(m => m.read = true); saveInbox(); render(); },
  newBasket: () => { state.basketCheckedOut = false; state.cart = {}; state.loyaltyFree = {}; render(); },
  emptyBasket: () => { state.cart = {}; state.loyaltyFree = {}; render(); },
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
      return;
    }
    const avatarInput = e.target.closest('input[type="file"][data-upload-avatar]');
    if (avatarInput && avatarInput.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        state.userProfile.avatarSrc = reader.result;
        if (state.authUser) state.authUser.avatarSrc = reader.result;
        saveUserProfile();
        if (state.authUser) saveAuthUser(state.authUser);
        render();
      };
      reader.readAsDataURL(avatarInput.files[0]);
      return;
    }
    const bizLogoInput = e.target.closest('input[type="file"][data-upload-business-logo]');
    if (bizLogoInput && bizLogoInput.files[0]) {
      const mine = myBusiness();
      if (mine) {
        const reader = new FileReader();
        reader.onload = () => {
          mine.logoSrc = reader.result;
          if (state.businessEditor) state.businessEditor.logoSrc = reader.result;
          saveBusinesses();
          render();
        };
        reader.readAsDataURL(bizLogoInput.files[0]);
      }
      return;
    }
    const bizCoverInput = e.target.closest('input[type="file"][data-upload-business-cover]');
    if (bizCoverInput && bizCoverInput.files[0]) {
      const mine = myBusiness();
      if (mine) {
        const reader = new FileReader();
        reader.onload = () => {
          mine.coverSrc = reader.result;
          if (state.businessEditor) state.businessEditor.coverSrc = reader.result;
          saveBusinesses();
          render();
        };
        reader.readAsDataURL(bizCoverInput.files[0]);
      }
      return;
    }
    const galleryInput = e.target.closest('input[type="file"][data-upload-gallery]');
    if (galleryInput && galleryInput.files[0]) {
      const mine = myBusiness();
      if (mine) {
        const slot = Number(galleryInput.dataset.uploadGallery);
        const reader = new FileReader();
        reader.onload = () => {
          mine.gallery = mine.gallery || [];
          // Pad so an upload into slot 3 doesn't collapse into slot 0.
          while (mine.gallery.length < 4) mine.gallery.push(null);
          mine.gallery[slot] = reader.result;
          saveBusinesses();
          render();
        };
        reader.readAsDataURL(galleryInput.files[0]);
      }
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
  // Typing used to re-render the whole app on every keystroke — root.innerHTML
  // was rebuilt, the input destroyed and recreated, then refocused with the
  // caret restored. That's what made every letter flicker. Most fields only
  // need their value recorded; the input already shows what you typed. Only
  // the ones that change other parts of the screen re-render, and those are
  // debounced so it happens once you pause rather than per letter.
  let bindRenderTimer = null;
  const renderKeepingFocus = () => {
    const el = document.activeElement;
    const id = el && el.id;
    const selStart = el && el.selectionStart;
    const selEnd = el && el.selectionEnd;
    render();
    if (!id) return;
    const same = document.getElementById(id);
    if (!same) return;
    same.focus();
    try { same.setSelectionRange(selStart, selEnd); } catch (err) { /* not text-selectable */ }
  };

  root.addEventListener('input', (e) => {
    const el = e.target.closest('[data-bind]');
    if (!el) return;
    const path = el.dataset.bind;
    let needsRender = false;

    if (path === 'searchQuery') {
      state.searchQuery = el.value;
      needsRender = true;               // drives the results list
    } else if (path === 'aiInput') {
      state.aiInput = el.value;
    } else if (path === 'manualBarcodeInput') {
      state.manualBarcodeInput = el.value;
    } else if (path.startsWith('profile.')) {
      state.userProfile[path.replace('profile.', '')] = el.value;
      saveUserProfile();
    } else if (path.startsWith('business.')) {
      // Edited into a working copy so the card preview updates on Save, not
      // on every keystroke — typing must not re-render and steal focus.
      const mine = myBusiness();
      if (mine) {
        if (!state.businessEditor) state.businessEditor = { ...mine };
        state.businessEditor[path.replace('business.', '')] = el.value;
      }
    } else if (path.startsWith('service.')) {
      const [, serviceId, field] = path.split('.');
      const svc = serviceById(myBusiness(), serviceId);
      if (svc) {
        svc[field] = (field === 'price' || field === 'durationMins')
          ? (el.value === '' ? 0 : Number(el.value))
          : el.value;
        saveBusinesses();
      }
    } else {
      const m = /^specialRequest\.(\w+)$/.exec(path);
      if (m) {
        state.specialRequest[m[1]] = el.value;
        needsRender = true;             // enables/disables the send button
      }
    }

    if (!needsRender) return;
    clearTimeout(bindRenderTimer);
    bindRenderTimer = setTimeout(renderKeepingFocus, 180);
  });
  // Coming back from Stripe via the back button restores this page from the
  // bfcache with its old JS state, which would leave the Pay button disabled
  // on "Redirecting…". Reset it whenever the page is shown again.
  window.addEventListener('pageshow', (e) => {
    if (redirectWatchdog) { clearTimeout(redirectWatchdog); redirectWatchdog = null; }
    if (e.persisted && state.placingOrder) {
      state.placingOrder = false;
      state.checkoutError = 'Payment was not completed — you have not been charged.';
      try { localStorage.removeItem(PENDING_ORDER_KEY); } catch (err) { /* ignore */ }
      render();
    }
  });

  // Published listings ship as a data file rather than code, so adding a
  // business is a matter of committing assets/businesses.json. Missing file is
  // the normal case early on — the seeds in this file still apply.
  fetch('assets/businesses.json', { cache: 'no-cache' })
    .then(res => (res.ok ? res.json() : null))
    .then(list => {
      if (!Array.isArray(list) || !list.length) return;
      // Published entries win over the in-code seeds of the same id, so this
      // file is the source of truth and the seeds are only a fallback for when
      // it hasn't been deployed yet.
      const published = new Map(list.filter(b => b && b.id).map(b => [b.id, b]));
      state.businesses = state.businesses
        .map(b => published.get(b.id) || b)
        .concat(list.filter(b => b && b.id && !state.businesses.some(x => x.id === b.id)));
      render();
    })
    .catch(() => { /* no published file yet */ });

  checkStripeRedirectResult();

  // Scheduled orders join the courier pool on their own once the window is
  // near, including for slots that came due while the app was closed.
  releaseDueScheduledOrders();
  setInterval(() => { if (releaseDueScheduledOrders()) render(); }, 30000);

  render();
});
