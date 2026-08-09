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

// The businesses someone has kept, as ids rather than copies, so a listing
// that changes its details stays current in their favourites.
function loadFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem('graftr_favourites') || '[]');
    if (Array.isArray(saved)) return saved.map(String);
  } catch (e) { /* ignore corrupt storage */ }
  return [];
}

function saveFavourites() {
  try { localStorage.setItem('graftr_favourites', JSON.stringify(state.favourites)); } catch(e){}
}

// What they've called their own wall. Empty means they haven't renamed it, so
// it follows their name instead of freezing whatever it was when they set it.
function loadListTitle() {
  try { return localStorage.getItem('graftr_list_title') || ''; } catch (e) { return ''; }
}

function saveListTitle() {
  try {
    if (state.listTitle) localStorage.setItem('graftr_list_title', state.listTitle);
    else localStorage.removeItem('graftr_list_title');
  } catch (e) { /* ignore */ }
}

function listTitle() {
  if (state.listTitle) return state.listTitle;
  const name = (state.authUser && state.authUser.name) || (state.userProfile || {}).name || '';
  const first = name.trim().split(/\s+/)[0];
  return first ? `${first}’s list` : 'Your list';
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
  };
  state.orders.unshift(newOrder);
  state.activeOrderId = newId;

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

  // Coming back from taking out a membership.
  const membership = params.get('membership');
  if (membership) {
    const rawMember = localStorage.getItem(PENDING_MEMBER_KEY);
    if (membership === 'success' && rawMember) {
      try { applyMembership(JSON.parse(rawMember)); } catch (e) { /* malformed, nothing to apply */ }
    } else {
      try { localStorage.removeItem(PENDING_MEMBER_KEY); } catch (e) { /* ignore */ }
    }
  }

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
// Screens live under the role prefix now (/courier/pack), so the role has to be
// read from the first segment rather than the whole path.
const inRole = (base) => CURRENT_PATH === base || CURRENT_PATH.startsWith(base + '/');
const PATH_ROLE = inRole(ROLE_PATH) ? 'courier'
  : inRole(BUSINESS_PATH) ? 'business'
  : 'shopper';

function roleHome(role) {
  if (role === 'courier') return ROLE_PATH;
  if (role === 'business') return BUSINESS_PATH;
  return '/';
}

// ---------------------------------------------------------------------------
// Routing
//
// Every screen has an address, so the URL says where you are, the browser's
// own back button works, and a link or a refresh lands on the same page.
// A business page is /listing/<id>, not /business/<id> — /business is the
// business-owner app and the two must not collide.
// ---------------------------------------------------------------------------
const SCREEN_ROUTES = [
  { screen: 'shopper-shop', path: '/shop' },
  { screen: 'login', path: '/login' },
  { screen: 'shopper-browse', path: '/groceries' },
  { screen: 'shopper-all-services', path: '/services' },
  { screen: 'shopper-services', path: '/services/:category' },
  { screen: 'shopper-business', path: '/listing/:id' },
  { screen: 'shopper-favourites', path: '/favourites' },
  { screen: 'shopper-basket', path: '/basket' },
  { screen: 'shopper-inbox', path: '/board' },
  { screen: 'shopper-account', path: '/account' },
  { screen: 'shopper-special-request', path: '/special-request' },
  { screen: 'courier-activity', path: ROLE_PATH },
  { screen: 'courier-earnings', path: ROLE_PATH + '/earnings' },
  { screen: 'courier-pack', path: ROLE_PATH + '/pack' },
  { screen: 'courier-account', path: ROLE_PATH + '/account' },
  { screen: 'business-dashboard', path: BUSINESS_PATH },
];

// The owner dashboard is one screen with sections rather than separate
// screens, so its sections need their own entry: /business is the page
// itself, everything else hangs off it.
const BUSINESS_TAB_PATHS = {
  page: '',
  services: 'services',
  gallery: 'photos',
  bookings: 'bookings',
  messages: 'activity',
  plan: 'plan',
};

function businessTabForSlug(slug) {
  return Object.keys(BUSINESS_TAB_PATHS).find(tab => BUSINESS_TAB_PATHS[tab] === slug);
}

function pathForScreen(screen) {
  // Signing in has an address of its own, but only on the customer app: the
  // courier and business screens are told apart by their path, so rewriting
  // either to /login would lose which app you were signing into.
  if (screen === 'login') return PATH_ROLE === 'shopper' ? '/login' : roleHome(PATH_ROLE);
  if (screen === 'business-dashboard') {
    const slug = BUSINESS_TAB_PATHS[state.businessTab] || '';
    return slug ? BUSINESS_PATH + '/' + slug : BUSINESS_PATH;
  }
  const route = SCREEN_ROUTES.find(r => r.screen === screen);
  // login has no address of its own — it stands in for whichever app you
  // opened, so signing in doesn't change the URL under you.
  if (!route) return roleHome(state.mode || PATH_ROLE);
  if (route.path.includes(':category')) {
    return state.servicesCategory
      ? '/services/' + encodeURIComponent(state.servicesCategory)
      : '/services';
  }
  if (route.path.includes(':id')) {
    return state.activeBusinessId
      ? '/listing/' + encodeURIComponent(state.activeBusinessId)
      : '/services';
  }
  return route.path;
}

function routeForPath(pathname) {
  const path = '/' + String(pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase();

  // The bare domain is Shop. /shop is the address it answers to; this only
  // keeps a link to the root working.
  if (path === '/') return { screen: 'shopper-shop' };

  // Checked ahead of the table: /business/photos would otherwise fall through
  // to no match, and bare /business has to name its section too.
  if (path === BUSINESS_PATH) return { screen: 'business-dashboard', tab: 'page' };
  if (path.startsWith(BUSINESS_PATH + '/')) {
    const tab = businessTabForSlug(path.slice(BUSINESS_PATH.length + 1));
    return tab ? { screen: 'business-dashboard', tab } : null;
  }

  for (const route of SCREEN_ROUTES) {
    if (!route.path.includes(':')) {
      if (route.path === path) return { screen: route.screen };
      continue;
    }
    const base = route.path.split('/:')[0];
    if (path.startsWith(base + '/')) {
      const param = decodeURIComponent(path.slice(base.length + 1));
      if (param) return { screen: route.screen, param };
    }
  }
  return null;
}

// Points state at whatever the address bar says. Returns false for an unknown
// or stale URL — a deleted listing, say — so the caller can leave state alone.
// The address the visitor arrived on. applyRoute falls back to Shop for a
// listing it can't find, and syncUrl then rewrites the bar to /shop — so by the
// time the listings file lands there is nothing left to say where they meant to
// go. Captured here, before any of that runs.
const LANDING_PATH = window.location.pathname;

function applyRoute(pathname) {
  const match = routeForPath(pathname);
  if (!match) return false;
  if (match.screen === 'shopper-services') {
    if (!serviceCategory(match.param)) return false;
    state.servicesCategory = match.param;
  }
  if (match.screen === 'shopper-business') {
    if (!businessById(match.param)) return false;
    state.activeBusinessId = match.param;
  }
  if (match.tab) state.businessTab = match.tab;
  if (match.screen === 'login') {
    state.mode = null;
    state.authRole = PATH_ROLE;
  }
  state.screen = match.screen;
  return true;
}

// Called at the end of every render. Pushing only when the path actually
// changes keeps one history entry per navigation, so the browser's Back steps
// through pages rather than through keystrokes.
function syncUrl() {
  // file:// has no origin to push against — the pathname is a disk path.
  if (window.location.protocol === 'file:') return;
  const path = pathForScreen(state.screen);
  if (path === window.location.pathname) return;

  // Landing on the bare domain: swap the full address in rather than pushing,
  // or Back would return to / and be sent straight here again.
  if (window.location.pathname === '/' && state.screen === 'shopper-shop') {
    window.history.replaceState({ screen: state.screen }, '', path);
    return;
  }

  window.history.pushState({ screen: state.screen }, '', path);
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
  // Added for the board slots nothing could fill: banking, insurance of every
  // kind, nurseries and home care had no category to be listed under.
  { id: 'money', label: 'Money & insurance', emoji: '💷' },
  { id: 'care', label: 'Childcare & care', emoji: '🧸' },
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
  saveBusinesses(b);
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
const BUSINESS_SEED_VERSION = 26;
const BUSINESS_SEED_VERSION_KEY = 'graftr_businesses_seed_version';

// Verified UK Business Directory listings.
// The listings live in assets/businesses.json, which is fetched on every load
// and is the source of truth. This array used to hold a second copy of all one
// hundred of them — 177KB, 31% of this file — which the browser had to download
// and parse before it could draw anything, only to replace it moments later
// with the identical set from the file. Every id in it existed there too.
//
// Empty now. Until the file lands the app draws its own shell instead of the
// crawler article, which is the thing being fixed; a listing that only exists
// in a visitor's own storage still survives, since loadBusinesses reads that.
const SEED_BUSINESSES = [];

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

// `touched` is the listing this call is saving. It gets a flag, because
// assets/businesses.json is fetched on every load and its entries replace the
// ones held here — without the flag an operator's new photo lasted until the
// next page load and then quietly reverted to the published one, which reads
// as the change never having saved at all.
function saveBusinesses(touched) {
  if (touched) touched.locallyEdited = true;
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
    .filter(b => b.category === categoryId && isBusinessLive(b) && servesLocation(b))
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

// Lets one operator create and edit every listing from /business — picking any
// of them and changing its logo, cover, work photos and details — rather than
// one listing per sign-in.
//
// Tied to an account rather than a build flag, so it can stay on without every
// visitor getting the editing controls. It is not a security boundary and can't
// be one: there is no server here, so the check runs inside code the visitor has
// already downloaded and anyone determined can set the flag on themselves.
//
// What actually holds is further down. Editing only ever touches this browser's
// own copy of the listings; a change reaches other people when businesses.json
// is exported and committed. So a spoofed admin can rearrange their own screen
// and nobody else's, which is why an allowlist is enough here.
const ADMIN_EMAILS = ['hello@pixcision.co.uk'];

function isAdmin() {
  const email = state.authUser && state.authUser.email;
  return !!email && ADMIN_EMAILS.indexOf(String(email).trim().toLowerCase()) !== -1;
}

// The listing owned by whoever is signed in on /business, if they've made one.
// In admin mode, whichever listing the operator has selected instead.
function myBusiness() {
  if (isAdmin() && state.adminEditingId) {
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
  openFavPicker: null,             // category whose chooser is open on the wall
  listTitle: loadListTitle(),      // what they've named their own wall
  servicesView: 'cards',           // directory layout: 'cards' or 'icons'
  board: {},                       // slot id -> business id; see BOARD_AREAS
  openBoardPicker: null,           // which board slot has its chooser open
  pendingBoardScroll: null,        // slot to scroll to once it has been drawn
  expandedBoardSlot: null,         // slot showing its full card; phones only
  membership: null,                // { tier, billing, since }; read below
  memberBilling: null,             // monthly | annual, while choosing
  memberChoice: null,              // tier being considered on the account card
  memberBuying: false,
  memberError: null,
  shopCategory: '',                // narrows the shops band; '' is all of them
  favourites: loadFavourites(),    // business ids the shopper has kept
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
  // productId -> how many units of it are free in the basket right now. Held in
  // memory alongside the cart on purpose: the stamp isn't spent until the order
  // is placed, so emptying the basket or reloading hands the reward back.
  ...loadInbox(),
  basketCheckedOut: false,
  trackStep: 2,
  shopImages: { morrisons: null, track: null, offers: null, local: null },
  cart: {},
  savedForLater: loadSavedForLater(),
  productImages: {},
  searchQuery: '',
  userLocation: localStorage.getItem('graftr_user_location') || '',
  showLocationPicker: false,
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
  // A deep link beats the role's home screen, so a shared URL opens the page
  // it points at rather than dumping you on Shop.
  applyRoute(window.location.pathname);
} else if (PATH_ROLE === 'shopper') {
  // Everyone lands on Shop, signed in or not — signing in is a choice, made
  // from the button in the corner or at /login. The courier and business apps
  // still open on their sign-in screen: those need an account to be any use.
  state.mode = 'shopper';
  state.screen = 'shopper-shop';
  applyRoute(window.location.pathname);
}

// Read-only now: nothing writes shop images since the upload control went, but
// a browser that was used to set one in admin mode still holds it, and
// shopFeatureCardHtml prefers it over the bundled default. Kept so those don't
// silently revert.
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

function cartSubtotal() {
  return cartLines().reduce((sum, l) => sum + l.qty * l.product.estimated_price_gbp, 0);
}

function cartTotal() {
  return cartSubtotal();
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
function escapeHtml(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
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

function renderLogin() {
  const isCourier = state.authRole === 'courier';
  const isBusiness = state.authRole === 'business';
  return `
  <div style="position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px 24px;gap:24px;text-align:center;min-height:580px;background:#ffffff">

    <!-- Closing the screen browses signed out. Only on the customer app: a
         listing or a delivery run has to belong to an account. -->
    ${(isCourier || isBusiness) ? '' : `
      <button type="button" class="login-close" data-action="browseAsGuest" title="Browse without signing in" aria-label="Close">✕</button>`}

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

    ${(isCourier || isBusiness) ? '' : `
      <div class="press" data-action="browseAsGuest" style="font-size:13px;font-weight:700;color:#5c5c5c;text-decoration:underline;text-underline-offset:2px;cursor:pointer">
        Browse without an account
      </div>`}

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

// Some logos are app icons — artwork that already fills its own frame, corners
// and all. `contain` letterboxes those, so the white tile shows as a ring
// around the mark. Near-square art fills the tile instead; a wide wordmark
// keeps `contain`, since `cover` would crop it to pieces.
window.__fitLogo = function (img) {
  const w = img.naturalWidth, h = img.naturalHeight;
  if (!w || !h) return;
  const ratio = w / h;
  img.classList.toggle('is-fill', ratio > 0.8 && ratio < 1.25);
};

function backBar(action, label, arg) {
  return `
    <div class="press back-bar" data-action="${action}"${arg === undefined ? '' : ` data-arg="${arg}"`}>
      <span class="back-bar-arrow" aria-hidden="true">‹</span>
      <span>${escapeHtml(label)}</span>
    </div>`;
}



// Line icons drawn in currentColor, so they invert with the button rather than
// sitting on it in colour the way the emoji did.
const ICON_GLOBE = '<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="7.2"/><path d="M2.8 10h14.4M10 2.8c2.1 2.3 2.1 12.1 0 14.4M10 2.8c-2.1 2.3-2.1 12.1 0 14.4"/></svg>';
const ICON_PHONE = '<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M6.6 3.2H4.5A1.5 1.5 0 003 4.8C3 11.4 8.6 17 15.2 17a1.5 1.5 0 001.6-1.5v-2.1a1 1 0 00-.8-1l-2.5-.5a1 1 0 00-1 .4l-.6.9a10.6 10.6 0 01-4.1-4.1l.9-.6a1 1 0 00.4-1L8.6 4a1 1 0 00-1-.8z"/></svg>';
// fill comes from CSS so the same glyph reads as outline or solid.
const ICON_HEART = '<svg width="15" height="15" viewBox="0 0 20 20" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M10 16.5S3.2 12.4 3.2 7.9A3.7 3.7 0 0110 5.6a3.7 3.7 0 016.8 2.3c0 4.5-6.8 8.6-6.8 8.6z"/></svg>';
const ICON_PIN = '<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M10 17.5s5.5-5 5.5-9a5.5 5.5 0 10-11 0c0 4 5.5 9 5.5 9z"/><circle cx="10" cy="8.4" r="2.1"/></svg>';
const ICON_CROSSHAIR = '<svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="10" cy="10" r="5.4"/><circle cx="10" cy="10" r="1.4" fill="currentColor" stroke="none"/><path d="M10 1.6v2.6M10 15.8v2.6M18.4 10h-2.6M4.2 10H1.6" stroke-linecap="round"/></svg>';
const ICON_CARET = '<svg width="9" height="9" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 7.5L10 13l5.5-5.5"/></svg>';
const ICON_CAMERA = '<svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M2.8 6.9h2.6l1.2-1.9h6.8l1.2 1.9h2.6a1 1 0 011 1v7.2a1 1 0 01-1 1H2.8a1 1 0 01-1-1V7.9a1 1 0 011-1z"/><circle cx="10" cy="11.2" r="2.9"/></svg>';
const ICON_CHECK = '<svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10.5l4 4 8-9"/></svg>';
// The directory card. Lifted out of the search results so the Services page
// can lay the same card out when it isn't searching.
function businessGridCard(b) {
  const banner = b.coverSrc || (b.gallery || [])[0] || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';

  // What they actually do, in their own words. Falls back to the category, and
  // then to the services they list, so the line is never empty.
  const cat = serviceCategory(b.category);
  const summary = b.tagline
    || (cat ? cat.label : '')
    || (b.services || []).map(s => s.name).join(' · ');

  // Website and Call are real links — a tel: and an external site — so they are
  // anchors, not actions. The click handler lets any href through rather than
  // firing the card's own action.
  const site = b.websiteUrl || (b.domain ? `https://${b.domain}` : '');
  const tel = b.phone ? `tel:${String(b.phone).replace(/[^\d+]/g, '')}` : '';

  // The brand mark sits on the photo. Clearbit is down for some listings, so
  // fall back to the site's favicon and then to initials.
  const initials = (b.name || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const fallbackLogo = b.domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(b.domain)}&sz=128` : '';
  const logoHtml = b.logoSrc
    ? `<img class="biz-card-logo" src="${escapeHtml(b.logoSrc)}" alt="" onload="__fitLogo(this)" onerror="this.onerror=null;${fallbackLogo ? `this.src='${fallbackLogo}'` : `this.replaceWith(Object.assign(document.createElement('span'),{className:'biz-card-logo is-initials',textContent:'${escapeHtml(initials)}'}))`}" />`
    : `<span class="biz-card-logo is-initials">${escapeHtml(initials)}</span>`;

  return `
    <div class="shop-card press biz-card" data-action="openBusiness" data-arg="${b.id}">
      <div class="biz-card-photo" style="background-image:url('${banner}')">
        ${logoHtml}
        ${keepButtonHtml(b)}
      </div>

      <div class="biz-card-body">
        <div class="biz-card-name">${escapeHtml(b.name)}</div>
        <div class="biz-card-desc">${escapeHtml(summary)}</div>
        <div class="biz-card-meta">
          <span class="biz-card-rating">4.8 <span aria-hidden="true">★</span> <span style="font-weight:400;color:#6b6b6b">(107)</span></span>
        </div>
        <div class="biz-card-actions">
          ${site ? `<a class="biz-card-action" href="${escapeHtml(site)}" target="_blank" rel="noopener noreferrer">${ICON_GLOBE} Website</a>` : ''}
          ${tel ? `<a class="biz-card-action" href="${escapeHtml(tel)}">${ICON_PHONE} Call</a>` : ''}
          <button type="button" class="biz-card-action" data-action="openBusiness" data-arg="${b.id}">Overview</button>
        </div>
      </div>
    </div>`;
}

// The wall is a household you're staffing, not a directory you're filtering.
// Each slot is the person you'd ring, named the way you'd think of them —
// "someone for the odd jobs", not "Trades" — and backed by the category the
// listings are actually filed under.
const LIFE_ROLES = [
  { cat: 'trades', role: 'Personal handyman', does: 'Shelves, leaks, flat-pack, the jobs that pile up' },
  { cat: 'cleaning', role: 'Cleaner', does: 'A regular going-over, or one big reset' },
  { cat: 'dog-walkers', role: 'Dog walker', does: 'Midday walks when you can’t get back' },
  { cat: 'pets', role: 'Pet care', does: 'Grooming, jabs, the vet you’d actually call' },
  { cat: 'beauty', role: 'Hair & beauty', does: 'The one who knows how you like it' },
  { cat: 'auto', role: 'Car sorted', does: 'MOT, tyres, the noise it’s started making' },
  { cat: 'health', role: 'Health & fitness', does: 'Dentist, physio, somewhere to train' },
  { cat: 'tutoring', role: 'Tutor', does: 'Help before the exams, not after' },
  { cat: 'legal', role: 'Money & legal', does: 'Tax return, a will, the letter you’re avoiding' },
  { cat: 'real-estate', role: 'Moving house', does: 'Valuations, lettings, when the time comes' },
  { cat: 'events', role: 'Events', does: 'Birthdays, the wedding, the big one' },
  { cat: 'travel', role: 'Getting away', does: 'Booked by someone who does it all day' },
];

function isFavourite(id) {
  return (state.favourites || []).indexOf(String(id)) !== -1;
}

// Keeping a business is the same control everywhere it appears — a card, a
// listing page — so the gesture is learned once. Its own data-action resolves
// before the card's, so keeping never opens the page by accident.
function keepButtonHtml(b, extraClass) {
  const on = isFavourite(b.id);
  return `<button type="button" class="biz-card-keep${on ? ' is-on' : ''}${extraClass ? ' ' + extraClass : ''}"
    data-action="toggleFavourite" data-arg="${b.id}"
    title="${on ? 'Remove from your list' : 'Add to your list'}"
    aria-label="${on ? 'Remove from your list' : 'Add to your list'}">${ICON_HEART}</button>`;
}

// The favourites board: one slot per category, so it reads as the set of
// people you'd call for your life rather than an undifferentiated list. A slot
// you haven't filled suggests the best-ranked business in that category.
function renderShopperFavourites() {
  const live = (state.businesses || []).filter(isBusinessLive).filter(servesLocation);
  const kept = (state.favourites || [])
    .map(id => live.find(b => String(b.id) === String(id)))
    .filter(Boolean);

  const slots = LIFE_ROLES.map(r => {
    const cat = serviceCategory(r.cat);
    if (!cat) return null;
    const mine = kept.filter(b => b.category === r.cat);
    const choices = live
      .filter(b => b.category === r.cat && !isFavourite(b.id))
      .sort(byTierThenRecency);
    return { cat, role: r.role, does: r.does, mine, choices };
  }).filter(s => s && (s.mine.length || s.choices.length));

  const filled = slots.filter(s => s.mine.length).length;

  // A compact row for the dropdown: the mark, who they are, what they do. Same
  // width as the card it will become, so choosing doesn't shift the wall.
  const choiceRow = (b) => {
    const fallback = b.domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(b.domain)}&sz=64` : '';
    const initials = (b.name || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const mark = b.logoSrc
      ? `<img class="fav-choice-logo" src="${escapeHtml(b.logoSrc)}" alt="" onload="__fitLogo(this)" onerror="this.onerror=null;${fallback ? `this.src='${fallback}'` : `this.replaceWith(Object.assign(document.createElement('span'),{className:'fav-choice-logo is-initials',textContent:'${escapeHtml(initials)}'}))`}" />`
      : `<span class="fav-choice-logo is-initials">${escapeHtml(initials)}</span>`;
    return `
      <button type="button" class="fav-choice" data-action="pickFavourite" data-arg="${b.id}">
        ${mark}
        <span class="fav-choice-text">
          <span class="fav-choice-name">${escapeHtml(b.name)}</span>
          <span class="fav-choice-desc">${escapeHtml(b.tagline || (serviceCategory(b.category) || {}).label || '')}</span>
        </span>
      </button>`;
  };

  // An empty slot is a card-shaped hole the same size as a filled one, so the
  // wall keeps its grid whether or not a place is taken. The button in the
  // middle opens a list of who could fill it; picking one makes it a card.
  const slotHead = (slot) => `
    <div class="fav-slot-head">
      <span class="fav-slot-icon">${slot.cat.emoji}</span>
      <span class="fav-slot-titles">
        <span class="fav-slot-label">${escapeHtml(slot.role)}</span>
        <span class="fav-slot-does">${escapeHtml(slot.does)}</span>
      </span>
    </div>`;

  const emptySlot = (slot) => {
    const open = state.openFavPicker === slot.cat.id;
    return `
    <div class="fav-slot is-empty">
      ${slotHead(slot)}

      <div class="fav-empty-card">
        <button type="button" class="fav-add-btn${open ? ' is-open' : ''}" data-action="toggleFavPicker" data-arg="${slot.cat.id}"
          title="Choose your ${escapeHtml(slot.role.toLowerCase())}" aria-label="Choose your ${escapeHtml(slot.role.toLowerCase())}">+</button>
      </div>

      ${open ? `<div class="fav-choices">${slot.choices.map(choiceRow).join('')}</div>` : ''}
    </div>`;
  };

  const p = state.userProfile || {};
  const who = (state.authUser && state.authUser.name) || p.name || '';
  const initials = who.trim()
    ? who.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '';

  // Their face and their name for it, so the wall reads as somewhere of their
  // own rather than a page of the app. The photo is the same one the account
  // uses — set it here or there, it's the same picture.
  const header = `
    <div class="fav-header">
      <label class="fav-avatar" title="Change photo">
        ${p.avatarSrc
          ? `<img src="${escapeHtml(p.avatarSrc)}" alt="" />`
          : `<span class="fav-avatar-initials">${escapeHtml(initials || '＋')}</span>`}
        <span class="fav-avatar-edit">${ICON_CAMERA}</span>
        <input type="file" accept="image/*" data-upload-avatar />
      </label>
      <div class="fav-header-text">
        <input class="fav-title" data-bind="listTitle" value="${escapeHtml(listTitle())}"
          placeholder="Your list" aria-label="Name your list" maxlength="40" />
        <div class="fav-sub">
          ${filled
            ? `${filled} of ${slots.length} sorted${filled === slots.length ? ' — the lot' : ''}`
            : 'Pick the people you’d call, one job at a time'}
        </div>
        <div class="fav-bar" aria-hidden="true"><span style="width:${Math.round((filled / slots.length) * 100)}%"></span></div>
      </div>
    </div>`;

  return `
    <div class="page" style="padding:0 18px 24px">
      ${header}

      <div class="fav-board">
        ${slots.map(s => s.mine.length
          ? `<div class="fav-slot">
               ${slotHead(s)}
               ${s.mine.map(b => businessCardHtml(b, { variant: 'large' })).join('')}
             </div>`
          : emptySlot(s)).join('')}
      </div>

      
      
    </div>`;
}

// Every listed business as a square logo tile, laid out like app icons on a
// phone home screen.
function businessIconTile(b) {
  const initials = (b.name || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const fallbackLogo = b.domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(b.domain)}&sz=128` : '';
  const face = b.logoSrc
    ? `<img class="app-tile-icon" src="${escapeHtml(b.logoSrc)}" onload="__fitLogo(this)" onerror="this.onerror=null;if('${fallbackLogo}')this.src='${fallbackLogo}';" style="background:#ffffff;box-sizing:border-box" />`
    : `<span class="app-tile-icon app-tile-initials">${escapeHtml(initials)}</span>`;

  // A tile has no room for what they do, so it carries the category rather
  // than a price — same rule as the card: no quote figures on a listing.
  const cat = serviceCategory(b.category);
  const priceBadge = cat
    ? `<span style="font-size:10.5px;font-weight:500;color:#6b6b6b">${escapeHtml(cat.label)}</span>`
    : '';

  return `
    <div class="press app-tile" data-action="openBusiness" data-arg="${b.id}" style="display:flex;flex-direction:column;align-items:center;text-align:center">
      ${face}
      <span class="app-tile-label" style="margin-top:4px">${escapeHtml(b.name)}</span>
      ${priceBadge ? `<div style="margin-top:2px">${priceBadge}</div>` : ''}
    </div>`;
}

// Two ways to look at the directory, nothing more. Icons fit far more on a
// screen; cards carry the price and rating.
function servicesViewToggle() {
  const view = state.servicesView === 'icons' ? 'icons' : 'cards';
  const opt = (id, label) =>
    `<button type="button" class="view-opt${view === id ? ' is-on' : ''}" data-action="setServicesView" data-arg="${id}">${label}</button>`;
  return `<div class="view-toggle">${opt('cards', '▦ Cards')}${opt('icons', '⊞ Icons')}</div>`;
}

// Cards, with an ad card dropped in every so often. The socket is a grid item
// like any other, so the ad takes a card's place in the run rather than
// interrupting it.
//
// Counted across the whole page, not per category: the directory draws a grid
// per category, so counting inside each would put an ad in every one of the
// twelve. Capped as well — a page is a page whether it holds ten cards or a
// hundred.
const AD_EVERY = 6;
const AD_MAX_PER_PAGE = 3;
let adCardsSince = 0;
let adCardsPlaced = 0;

function resetAdCards() {
  adCardsSince = 0;
  adCardsPlaced = 0;
}

function businessListHtml(list, { appendCells = '' } = {}) {
  if (state.servicesView === 'icons') {
    // Icon tiles and a full card can't sit in the same grid, so anything extra
    // keeps its own row here.
    return `<div class="app-grid">${list.map(businessIconTile).join('')}</div>`
      + (appendCells ? `<div class="biz-card-grid">${appendCells}</div>` : '');
  }
  const cells = [];
  list.forEach((b, i) => {
    cells.push(businessGridCard(b));
    adCardsSince++;
    // Never trailing the run — an ad shouldn't be the last thing in a grid.
    const room = i + 1 < list.length;
    if (adInFeedConfigured() && room && adCardsSince >= AD_EVERY && adCardsPlaced < AD_MAX_PER_PAGE) {
      cells.push(adFeedSlotHtml(adCardsPlaced++));
      adCardsSince = 0;
    }
  });
  return `<div class="biz-card-grid">${cells.join('')}${appendCells}</div>`;
}

function renderShopperSearchResults(query, { businessesOnly = false, shoppingOnly = false } = {}) {
  const q = (query || '').trim().toLowerCase();

  const matchesQuery = (b) => {
    const catObj = serviceCategory(b.category);
    return (b.name || '').toLowerCase().includes(q) ||
           (catObj && catObj.label.toLowerCase().includes(q)) ||
           (b.tagline || '').toLowerCase().includes(q) ||
           (b.about || '').toLowerCase().includes(q) ||
           (b.area || '').toLowerCase().includes(q) ||
           (b.services || []).some(s =>
             (s.name || '').toLowerCase().includes(q) ||
             (s.description || '').toLowerCase().includes(q));
  };

  const matchingBiz = (state.businesses || [])
    .filter(isBusinessLive)
    .filter(servesLocation)
    .filter(matchesQuery)
    .sort(byTierThenRecency);

  const matchingServices = [];
  (state.businesses || []).filter(isBusinessLive).filter(servesLocation).forEach(b => {
    (b.services || []).forEach(s => {
      if ((s.name || '').toLowerCase().includes(q) ||
          (s.description || '').toLowerCase().includes(q) ||
          (b.name || '').toLowerCase().includes(q)) {
        matchingServices.push({ business: b, service: s });
      }
    });
  });

  const matchingProducts = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  // Shop lists the local shops, so its search has to reach them — otherwise a
  // town or a chain name comes back empty from a page that's showing both.
  // Not on the Services directory, which is businesses only.
  const matchingShops = businessesOnly ? [] : searchableShops().filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.sells.toLowerCase().includes(q) ||
    s.town.toLowerCase().includes(q) ||
    // The kind of shop, so "florist" finds the florists rather than only the
    // one that happens to have the word in its name.
    s.category.toLowerCase().includes(q)
  );

  // The Services page is a directory of businesses, so it counts and shows
  // only those; Shop search still spans bookings and groceries too.
  const totalCount = businessesOnly ? matchingBiz.length
    : shoppingOnly ? matchingProducts.length + matchingShops.length
    : matchingBiz.length + matchingServices.length + matchingProducts.length + matchingShops.length;

  const bizGridHtml = (!shoppingOnly && matchingBiz.length > 0)
    ? `<div style="margin-bottom:20px">${businessListHtml(matchingBiz)}</div>`
    : '';

  const shopsGridHtml = matchingShops.length > 0
    ? `<div style="margin-bottom:20px">
         <div style="font-size:13px;font-weight:800;color:#141414;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">
           Shops to send a courier to (${matchingShops.length})
         </div>
         <div class="biz-card-grid">${matchingShops.slice(0, 12).map(shopCardHtml).join('')}</div>
       </div>`
    : '';

  // Bookable Services list
  let servicesListHtml = '';
  if (!businessesOnly && !shoppingOnly && matchingServices.length > 0) {
    const booked = new Set((state.bookingCart || []).map(x => `${x.businessId}|${x.serviceId}`));
    servicesListHtml = `
      <div style="margin-bottom:20px">
        <div style="font-size:13px;font-weight:800;color:#141414;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">
          Bookable Services (${matchingServices.length})
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${matchingServices.slice(0, 10).map(({ business: b, service: s }) => `
            <div class="shop-card" style="border:1px solid rgba(20,20,20,0.1);border-radius:14px;padding:12px 14px;background:#fff;display:flex;justify-content:space-between;align-items:center;gap:10px">
              <div style="flex:1;min-width:0" class="press" data-action="openBusiness" data-arg="${b.id}">
                <div style="font-size:13.5px;font-weight:700;color:#141414">${escapeHtml(s.name)}</div>
                <div style="font-size:12.5px;color:#6b6b6b;margin-top:2px">${escapeHtml(b.name)} ${b.area ? `· ${escapeHtml(b.area)}` : ''}</div>
                <div style="font-size:12px;color:#141414;font-weight:700;margin-top:3px">${s.price > 0 ? `£${s.price.toFixed(2)}` : 'Free Quote'}</div>
              </div>
              <button type="button" class="press" data-action="openBookingPicker" data-arg="${b.id}|${s.id}"
                style="background:#141414;color:#fff;border:none;border-radius:12px;padding:8px 14px;font-weight:700;font-size:12.5px;cursor:pointer;font-family:inherit">
                Book
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Products List
  let productsListHtml = '';
  if (!businessesOnly && matchingProducts.length > 0) {
    productsListHtml = `
      <div style="margin-bottom:20px">
        <div style="font-size:13px;font-weight:800;color:#141414;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">
          Products &amp; Essentials (${matchingProducts.length})
        </div>
        <div style="display:flex;flex-direction:column">
          ${matchingProducts.slice(0, 15).map(productRow).join('')}
        </div>
      </div>
    `;
  }

  // Shop searches shops and the aisles, so a word that only matches a business
  // would dead-end here. Hand it across rather than saying nothing found.
  const crossover = shoppingOnly && matchingBiz.length > 0;

  const noResultsHtml = totalCount === 0 ? `
    <div style="padding:40px 20px;text-align:center;background:#fff;border-radius:20px;border:1px solid rgba(20,20,20,0.08)">
      <div style="font-size:32px;margin-bottom:8px">🔍</div>
      <div style="font-size:16px;font-weight:800;color:#141414">
        ${crossover ? 'Nothing in the shops' : 'No matching items found'}
      </div>
      <div style="font-size:13px;color:#6b6b6b;margin-top:4px">
        ${crossover
          ? `${matchingBiz.length} business${matchingBiz.length === 1 ? '' : 'es'} match “${escapeHtml(q)}”.`
          : 'Try a different word, or clear the search to see everything.'}
      </div>
      ${crossover
        ? `<button type="button" data-action="goAllServices" style="background:#141414;color:#fff;border:none;padding:10px 20px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;margin-top:14px;font-family:inherit">Look in Services</button>`
        : `<button type="button" data-action="clearSearch" style="background:#141414;color:#fff;border:none;padding:10px 20px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;margin-top:14px;font-family:inherit">Clear search</button>`}
    </div>
  ` : '';

  return `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div style="font-size:20px;font-weight:800;color:#141414">
          ${businessesOnly ? 'Businesses' : shoppingOnly ? 'Shops &amp; groceries' : 'Shops, services &amp; groceries'}
        </div>
        <div style="font-size:12.5px;color:#6b6b6b;font-weight:600">
          ${totalCount} result${totalCount === 1 ? '' : 's'}
        </div>
      </div>

      ${bizGridHtml}
      ${servicesListHtml}
      ${shopsGridHtml}
      ${productsListHtml}
      ${noResultsHtml}
    </div>
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

// AdSense Ad Slot and Footer Policy Links Helper
function adSlotHtml() {
  return `
    <div style="margin:16px 0;text-align:center;min-height:90px;background:#fafafa;border-radius:12px;border:1px dashed rgba(20,20,20,0.12);display:flex;align-items:center;justify-content:center;overflow:hidden">
      <ins class="adsbygoogle"
           style="display:block;width:100%"
           data-ad-client="ca-pub-8020577058635926"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>`;
}

function vendaruFooterHtml() {
  return `
    <footer style="margin-top:28px;padding:20px 0 16px;border-top:1px solid rgba(20,20,20,0.08);text-align:center;font-size:12px;color:#6b6b6b">
      <div style="display:flex;justify-content:center;gap:14px;margin-bottom:10px;flex-wrap:wrap;font-weight:600">
        <a href="/about.html" style="color:#141414;text-decoration:none">About Us</a>
        <a href="/privacy.html" style="color:#141414;text-decoration:none">Privacy Policy</a>
        <a href="/terms.html" style="color:#141414;text-decoration:none">Terms of Service</a>
        <a href="/contact.html" style="color:#141414;text-decoration:none">Contact Us</a>
        <a href="/ads.txt" style="color:#141414;text-decoration:none">ads.txt</a>
      </div>
      <div>&copy; 2026 Vendaru UK Directory. Verified Local Services &amp; Shopping.</div>
    </footer>`;
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
  const meta = `${cat ? `${cat.emoji} ${escapeHtml(cat.label)}` : ''}${b.area ? ` · ${escapeHtml(b.area)}` : ''}`;
  const open = linked ? `data-action="openBusiness" data-arg="${b.id}"` : '';
  const shell = `${SERVICE_CARD_SHELL};position:relative${linked ? ';cursor:pointer' : ''}`;
  // A card that isn't a link is either the top of the listing's own page,
  // where the wide button sits, or an owner previewing their own card.
  const keep = linked ? keepButtonHtml(b) : '';
  const keepFlat = linked ? keepButtonHtml(b, 'is-flat') : '';

  // Same logo tile on both cards, just sized to suit.
  const avatarHtml = (size, radius) => {
    const fallbackLogo = b.domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(b.domain)}&sz=128` : '';
    return b.logoSrc
      ? `<img src="${escapeHtml(b.logoSrc)}" onerror="this.onerror=null;if('${fallbackLogo}')this.src='${fallbackLogo}';" style="width:${size}px;height:${size}px;border-radius:${radius}px;flex:0 0 auto;object-fit:contain;background:#ffffff;box-sizing:border-box" />`
      : `<span style="width:${size}px;height:${size}px;border-radius:${radius}px;flex:0 0 auto;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-size:${Math.round(size / 3)}px;font-weight:600">${escapeHtml(initials)}</span>`;
  };

  // No price or quote label on a business card — the tagline below says what
  // they do instead. Prices belong on the listing, against a named service.
  const priceLabelHtml = `<span style="opacity:0.4;flex:0 0 auto">›</span>`;

  if (variant === 'large') {
    // Banner falls back to the first piece of their work, then to a plain
    // tile — a business with no photos yet still gets a full-size card.
    const banner = b.coverSrc || (b.gallery || []).find(Boolean);
    // The banner is much wider than it is tall, so a photo gets cropped
    // top and bottom. coverPosition lets a listing keep its subject in frame.
    const focal = b.coverPosition || 'center';
    return `
      <div class="${linked ? 'press ' : ''}shop-card" ${open} style="${shell}">
        ${keep}
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
              ${priceLabelHtml}
            </div>
            <div style="font-size:13px;color:#6b6b6b;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(b.tagline || (cat ? cat.label : ''))}</div>
            <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px">${meta}</div>
          </div>
        </div>
      </div>`;
  }

  const compactPriceHtml = '';

  return `
    <div class="${linked ? 'press ' : ''}shop-card" ${open} style="${shell}">
      ${keepFlat}
      <div style="padding:14px 16px;display:flex;align-items:center;gap:12px">
        ${avatarHtml(52, 14)}
        <div style="flex:1;min-width:0">
          <div style="font-size:15px;font-weight:600;color:#141414;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(b.name)}</div>
          <div style="font-size:12.5px;color:#6b6b6b;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(b.tagline || (cat ? cat.label : ''))}</div>
          <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px">${meta}</div>
        </div>
        ${compactPriceHtml}
      </div>
    </div>`;
}
// ─── Location selector ────────────────────────────────────────────────────────

// Coordinates so "use my current location" can resolve offline: the nearest of
// these is the answer. No geocoding service, no key, no network round trip.
const UK_CITY_COORDS = {
  London: [51.507, -0.128], Manchester: [53.480, -2.243], Birmingham: [52.487, -1.890],
  Leeds: [53.801, -1.549], Liverpool: [53.408, -2.992], Sheffield: [53.381, -1.470],
  Bristol: [51.455, -2.588], Edinburgh: [55.953, -3.189], Glasgow: [55.864, -4.252],
  Cardiff: [51.481, -3.179], Newcastle: [54.978, -1.618], Nottingham: [52.954, -1.158],
  Leicester: [52.637, -1.139], Southampton: [50.910, -1.404], Portsmouth: [50.816, -1.088],
  Brighton: [50.822, -0.137], Oxford: [51.752, -1.258], Cambridge: [52.205, 0.119],
  York: [53.960, -1.081], Norwich: [52.630, 1.297], Exeter: [50.719, -3.534],
  Bath: [51.380, -2.360], Derby: [52.922, -1.477], Coventry: [52.407, -1.510],
  Reading: [51.454, -0.978], 'Milton Keynes': [52.041, -0.759], Plymouth: [50.376, -4.143],
  'Stoke-on-Trent': [53.003, -2.180], Wolverhampton: [52.587, -2.129], Belfast: [54.597, -5.930],
  Bolton: [53.578, -2.429],
  Bury: [53.593, -2.297], Radcliffe: [53.562, -2.327], Salford: [53.483, -2.290],
  Rochdale: [53.616, -2.155], Oldham: [53.541, -2.118], Stockport: [53.408, -2.148],
  Wigan: [53.545, -2.632], Altrincham: [53.387, -2.348],
};

const UK_CITIES = Object.keys(UK_CITY_COORDS).sort();

// A listing describes its patch in prose — "Croydon & UK Wide", "UK
// Nationwide", "Wythenshawe, Manchester & 2,000 UK Branches". Naming the place
// counts, and so does national coverage: without that second test, choosing a
// city would hide every chain that serves it, which is most of the directory.
const NATIONAL_COVERAGE = /uk[\s-]?wide|nationwide|national|branches|stores|centres|salons|clinics|locations|home counties/i;

function locationChosen() {
  const loc = state.userLocation || '';
  return loc && !loc.startsWith('📡') ? loc : '';
}

function servesLocation(b) {
  const loc = locationChosen();
  if (!loc) return true;
  const area = String(b.area || '');
  return area.toLowerCase().includes(loc.toLowerCase()) || NATIONAL_COVERAGE.test(area);
}

function nearestCity(lat, lng) {
  let best = null, bestD = Infinity;
  Object.keys(UK_CITY_COORDS).forEach(city => {
    const [cLat, cLng] = UK_CITY_COORDS[city];
    // Flat approximation: fine for ranking towns a few hundred km apart.
    const dLat = cLat - lat;
    const dLng = (cLng - lng) * Math.cos(lat * Math.PI / 180);
    const d = dLat * dLat + dLng * dLng;
    if (d < bestD) { bestD = d; best = city; }
  });
  return best;
}

function locationSearchBarHtml(inputId) {
  const loc = state.userLocation || '';
  const open = !!state.showLocationPicker;
  const isShop = inputId === 'shop-search-input';
  const inputPlaceholder = isShop
    ? 'Search shops, groceries, essentials...'
    : 'Search services, trades, auto...';

  const locating = loc.startsWith('📡');
  const locLabel = locating
    ? '<span class="loc-btn-text">Locating…</span>'
    : `${ICON_PIN}<span class="loc-btn-text">${escapeHtml(loc || 'Anywhere')}</span>`;

  // How many listings a place would leave you with, counted the same way the
  // filter counts, so the number on the row is the number you get.
  const countFor = (city) => (state.businesses || [])
    .filter(isBusinessLive)
    .filter(b => !city || String(b.area || '').toLowerCase().includes(city.toLowerCase()) || NATIONAL_COVERAGE.test(String(b.area || '')))
    .length;

  const picker = open ? `
    <div id="location-picker" class="loc-picker">
      <div class="press loc-picker-gps" data-action="detectUserLocation">
        <span class="loc-picker-icon">${ICON_CROSSHAIR}</span>
        <div>
          <div class="loc-picker-gps-title">Use my current location</div>
          <div class="loc-picker-gps-sub">Matched to the nearest city</div>
        </div>
      </div>

      ${state.locationNotice ? `<div class="loc-picker-notice">${escapeHtml(state.locationNotice)}</div>` : ''}

      <div class="press loc-picker-anywhere ${loc === '' ? 'selected' : ''}" data-action="setUserLocation" data-arg="">
        <span class="loc-picker-icon">${ICON_PIN}</span>
        <span style="flex:1;font-size:13px">Anywhere in the UK</span>
        <span class="loc-picker-count">${countFor('')}</span>
        ${loc === '' ? `<span class="loc-picker-badge">${ICON_CHECK}</span>` : ''}
      </div>

      <div class="loc-picker-list">
        ${UK_CITIES.map(city => `
          <div class="press loc-picker-row ${loc === city ? 'selected' : ''}" data-action="setUserLocation" data-arg="${escapeHtml(city)}">
            <span class="loc-picker-icon">${ICON_PIN}</span>
            <span style="flex:1">${escapeHtml(city)}</span>
            <span class="loc-picker-count">${countFor(city)}</span>
            ${loc === city ? `<span class="loc-picker-badge">${ICON_CHECK}</span>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  ` : '';

  return `
    <div class="loc-search-wrap">
      <div class="loc-search-bar">
        <span class="loc-search-icon">⌕</span>
        <input id="${inputId}" data-bind="searchQuery"
          class="loc-search-input"
          value="${escapeHtml(state.searchQuery || '')}"
          placeholder="${escapeHtml(inputPlaceholder)}" />
        <div class="loc-divider"></div>
        <button type="button" data-action="toggleLocationPicker"
          class="loc-btn ${locationChosen() ? 'active' : ''}${open ? ' is-open' : ''}">
          ${locLabel}<span class="loc-btn-caret">${ICON_CARET}</span>
        </button>
      </div>
      ${picker}
    </div>
  `;
}

// Category list: every business filed under one category.
// Every listed business as a square logo tile, laid out like app icons on a
// phone home screen. Tapping one opens that business's page.
function renderShopperAllServices() {
  const isSearching = (state.searchQuery || '').trim().length > 0
    || !!(state.userLocation && !state.userLocation.startsWith('📡'));

  if (isSearching) {
    return `
      <div class="page" style="padding:0 18px 24px">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px">
          <div>
            <div style="font-size:25px;font-weight:700;color:#141414">Services</div>
            <div style="font-size:13px;color:#6b6b6b;margin-top:2px">${(state.businesses||[]).filter(isBusinessLive).length} businesses on Vendaru</div>
          </div>
        </div>

        ${locationSearchBarHtml('services-search-input')}

        ${servicesViewToggle()}

        ${renderShopperSearchResults(state.searchQuery, { businessesOnly: true })}
        
      
      </div>`;
  }

  const all = (state.businesses || []).filter(isBusinessLive).filter(servesLocation).slice().sort(byTierThenRecency);
  const groups = SERVICE_CATEGORIES
    .map(cat => ({ cat, items: all.filter(b => b.category === cat.id) }))
    .filter(g => g.items.length);

  return `
    <div class="page" style="padding:0 18px 24px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <div>
          <div style="font-size:25px;font-weight:700;color:#141414">Services</div>
          <div style="font-size:13px;color:#6b6b6b;margin-top:2px">${all.length} business${all.length === 1 ? '' : 'es'} on Vendaru</div>
        </div>
      </div>

      ${locationSearchBarHtml('services-search-input')}

      ${newToVendaru().length ? shopNewSectionHtml() : ''}

      ${servicesViewToggle()}

      ${groups.length
        ? groups.map(g => `
            <div>
              <div style="font-size:12.5px;font-weight:600;color:#6b6b6b;margin-bottom:11px">${g.cat.emoji} ${escapeHtml(g.cat.label)}</div>
              ${businessListHtml(g.items)}
            </div>
          `).join('')
        : `<div class="shop-card" style="${SERVICE_CARD_SHELL}">
             <div style="padding:22px 16px;text-align:center">
               <div style="font-size:15px;font-weight:600;color:#141414">No businesses listed yet</div>
               <div style="font-size:13px;color:#6b6b6b;margin-top:3px;line-height:1.5">Local businesses will appear here once they've published a page.</div>
             </div>
           </div>`}
      
      
      ${vendaruFooterHtml()}
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
      
      
      ${vendaruFooterHtml()}
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
        <!-- Spelled out here rather than left as a bare heart: there's room,
             and this is where someone decides they'd call this business. -->
        <button type="button" class="biz-keep-wide${isFavourite(b.id) ? ' is-on' : ''}" data-action="toggleFavourite" data-arg="${b.id}">
          ${ICON_HEART}<span>${isFavourite(b.id) ? 'On your list' : 'Add to list'}</span>
        </button>
      </div>

      <!-- 1. Their card, full size — this is the top of their page -->
      ${businessCardHtml(b, { linked: false, variant: 'large' })}

      <!-- About, and how to reach them. The card shows whichever it has: a
           listing with no description still needs its Website button, and one
           with no website still gets its description. Tying the buttons to the
           paragraph meant a listing without one had no way through to the
           business at all. -->
      ${(b.about || b.websiteUrl || b.domain || b.phone) ? `
        <div class="shop-card" style="${SERVICE_CARD_SHELL}">
          <div style="padding:4px 16px 14px">
            <div style="${SERVICE_SECTION_LABEL}">${b.about ? 'About' : 'Get in touch'}</div>
            ${b.about
              ? `<div style="font-size:13.5px;color:#141414;line-height:1.55;margin-top:6px;white-space:pre-line">${escapeHtml(b.about)}</div>`
              : ''}
            ${(() => {
              // Matching the card's fallback: a listing with a domain but no
              // full URL still gets a Website button.
              const site = b.websiteUrl || (b.domain ? `https://${b.domain}` : '');
              const tel = b.phone ? `tel:${String(b.phone).replace(/[^\d+]/g, '')}` : '';
              if (!site && !tel) return '';
              return `
                <div class="biz-detail-actions"${b.about ? '' : ' style="border-top:none;margin-top:10px;padding-top:0"'}>
                  ${site ? `<a class="biz-card-action" href="${escapeHtml(site)}" target="_blank" rel="noopener noreferrer">${ICON_GLOBE} Website</a>` : ''}
                  ${tel ? `<a class="biz-card-action" href="${escapeHtml(tel)}">${ICON_PHONE} Call</a>` : ''}
                </div>`;
            })()}
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

// The shops a courier can be sent to: independents, not chains — the kind of
// place worth sending someone across town for. Named with their town, never a
// street address, and the picture is of the kind of shop rather than a
// photograph captioned as that particular door.
const SHOPS_100 = [
  {
    "id": "shop-1",
    "name": "Rokit Vintage & Streetwear",
    "domain": "rokit.co.uk",
    "category": "Clothes",
    "sells": "Vintage denim, 90s jackets & retro streetwear",
    "town": "London",
    "photo": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-2",
    "name": "Endless Joy Atelier",
    "category": "Clothes",
    "sells": "Luxury designer fashion & tailored apparel",
    "town": "Manchester",
    "photo": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-3",
    "name": "Beyond Retro Apparel",
    "domain": "beyondretro.com",
    "category": "Clothes",
    "sells": "Handpicked vintage dresses, leather coats & 70s fashion",
    "town": "Brighton",
    "photo": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-4",
    "name": "Saturdays Footwear & Leather",
    "category": "Clothes",
    "sells": "Handcrafted leather boots & artisan sneakers",
    "town": "Bristol",
    "photo": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-5",
    "name": "The Crafty Tailor & Tweed",
    "category": "Clothes",
    "sells": "Scottish Harris tweed jackets & custom suits",
    "town": "Edinburgh",
    "photo": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-6",
    "name": "Blue Collar Vintage Denim",
    "category": "Clothes",
    "sells": "Japanese selvage denim & heavy canvas jackets",
    "town": "Leeds",
    "photo": "https://images.unsplash.com/photo-1542272604-780c36856d63?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-7",
    "name": "Thread & Needle Childrenswear",
    "category": "Clothes",
    "sells": "Organic cotton baby clothes & handmade knits",
    "town": "Bath",
    "photo": "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-8",
    "name": "Studio Velvet Boutique",
    "category": "Clothes",
    "sells": "Contemporary womenswear & evening gowns",
    "town": "Birmingham",
    "photo": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-9",
    "name": "Cotswold Cashmere & Wool",
    "category": "Clothes",
    "sells": "Pure Scottish cashmere jumpers & Merino scarves",
    "town": "Oxford",
    "photo": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-10",
    "name": "Rebel Threads Streetwear",
    "category": "Clothes",
    "sells": "Independent UK streetwear, hoodies & sneakers",
    "town": "Glasgow",
    "photo": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-11",
    "name": "Avenue Silk & Lace",
    "category": "Clothes",
    "sells": "Luxury silk sleepwear & handmade lingerie",
    "town": "Cambridge",
    "photo": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-12",
    "name": "Old Town Hatters & Caps",
    "category": "Clothes",
    "sells": "Felt fedoras, tweed flat caps & Panama hats",
    "town": "York",
    "photo": "https://images.unsplash.com/photo-1521369984125-658097b6a655?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-13",
    "name": "High Street Consignment Hub",
    "category": "Clothes",
    "sells": "Pre-loved designer handbags & heels",
    "town": "Liverpool",
    "photo": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-14",
    "name": "Nomad Outdoor Apparel",
    "category": "Clothes",
    "sells": "Weatherproof oilskin jackets & waterproof boots",
    "town": "Sheffield",
    "photo": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-15",
    "name": "St. Ives Linen Studio",
    "category": "Clothes",
    "sells": "Organic linen shirts & summer dresses",
    "town": "Exeter",
    "photo": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-16",
    "name": "Kensington Cobbler & Leather",
    "category": "Clothes",
    "sells": "Handmade Italian dress shoes & oxford boots",
    "town": "London",
    "photo": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-17",
    "name": "Northern Soul Mod Outfitters",
    "category": "Clothes",
    "sells": "60s Mod suits, harrington jackets & polo shirts",
    "town": "Newcastle",
    "photo": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-18",
    "name": "The Vintage Fur & Shearling Co.",
    "category": "Clothes",
    "sells": "Reclaimed shearling coats & suede jackets",
    "town": "Norwich",
    "photo": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-19",
    "name": "Bespoke Bridal & Silk",
    "category": "Clothes",
    "sells": "Custom wedding gowns & bridal veil couture",
    "town": "Bath",
    "photo": "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-20",
    "name": "Urban Edge Denim Lab",
    "category": "Clothes",
    "sells": "Custom raw denim jeans & embroidered jackets",
    "town": "Nottingham",
    "photo": "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-21",
    "name": "The Old Bank Antiques",
    "category": "Antiques",
    "sells": "Georgian silverware, antique clocks & oil paintings",
    "town": "Bath",
    "photo": "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-22",
    "name": "Portobello Relics & Curios",
    "category": "Antiques",
    "sells": "Victorian curiosities, telescopes & brass compasses",
    "town": "London",
    "photo": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-23",
    "name": "Northern Quarter Vintage Finds",
    "category": "Antiques",
    "sells": "Mid-century teak furniture & 1970s glassware",
    "town": "Manchester",
    "photo": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-24",
    "name": "Royal Mile Rare Books & Prints",
    "category": "Antiques",
    "sells": "18th-century leatherbound books & antique maps",
    "town": "Edinburgh",
    "photo": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-25",
    "name": "The Clockwork Emporium",
    "category": "Antiques",
    "sells": "Restored grandfather clocks & pocket watches",
    "town": "York",
    "photo": "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-26",
    "name": "Brighton Lanes Jewellery & Gold",
    "category": "Antiques",
    "sells": "Edwardian diamond rings & Art Deco gold",
    "town": "Brighton",
    "photo": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-27",
    "name": "Cotswold Fine Antiques",
    "category": "Antiques",
    "sells": "Mahogany dining tables & crystal chandeliers",
    "town": "Oxford",
    "photo": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-28",
    "name": "The Industrial Relic Co.",
    "category": "Antiques",
    "sells": "Salvaged factory lights & cast iron signs",
    "town": "Birmingham",
    "photo": "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-29",
    "name": "Merchant City Art & Antiques",
    "category": "Antiques",
    "sells": "Victorian oil portraits & Scottish landscapes",
    "town": "Glasgow",
    "photo": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-30",
    "name": "The Vintage Rug Exchange",
    "category": "Antiques",
    "sells": "Hand-knotted Persian rugs & Turkish kilims",
    "town": "Bristol",
    "photo": "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-31",
    "name": "The Shabby Chic Emporium",
    "category": "Antiques",
    "sells": "French country furniture & distressed mirrors",
    "town": "Cambridge",
    "photo": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-32",
    "name": "The Old Marine Salvage Shop",
    "category": "Antiques",
    "sells": "Ship wheels, brass portholes & maritime antiques",
    "town": "Portsmouth",
    "photo": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-33",
    "name": "St. Nicholas Antique Arcade",
    "category": "Antiques",
    "sells": "Antique toys, vintage tin signs & coins",
    "town": "Leicester",
    "photo": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-34",
    "name": "High Street Curiosities",
    "category": "Antiques",
    "sells": "Vintage apothecary bottles & cabinet curios",
    "town": "Norwich",
    "photo": "https://images.unsplash.com/photo-1516981879613-9f5da904015f?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-35",
    "name": "The Grand Arcade Antiques",
    "category": "Antiques",
    "sells": "Art Nouveau lamps & ceramic vases",
    "town": "Leeds",
    "photo": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-36",
    "name": "Scoops Artisan Gelato Lab",
    "category": "Ice Cream",
    "sells": "Handcrafted pistachio gelato & sea salt caramel",
    "town": "Brighton",
    "photo": "https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-37",
    "name": "The Milkshake & Sundae Parlour",
    "category": "Ice Cream",
    "sells": "Waffle sundaes, thick shakes & gelato cakes",
    "town": "London",
    "photo": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-38",
    "name": "Cotswold Creamery & Dairy",
    "category": "Ice Cream",
    "sells": "Jersey milk ice cream & clotted cream scoops",
    "town": "Oxford",
    "photo": "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-39",
    "name": "Lick! Artisan Gelateria",
    "category": "Ice Cream",
    "sells": "Dark chocolate gelato & mango sorbetto",
    "town": "Manchester",
    "photo": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-40",
    "name": "Highland Fudge & Ice Cream",
    "category": "Ice Cream",
    "sells": "Scottish tablet ice cream & honeycomb scoops",
    "town": "Edinburgh",
    "photo": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-41",
    "name": "Harbour Front Ice Cream Works",
    "category": "Ice Cream",
    "sells": "Waffle cones & plant-based gelato",
    "town": "Bristol",
    "photo": "https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-42",
    "name": "Lakeside Dairy & Ice Cream Parlour",
    "category": "Ice Cream",
    "sells": "Organic strawberry swirls & mint choc chip",
    "town": "Cambridge",
    "photo": "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-43",
    "name": "The Gelato Alchemist",
    "category": "Ice Cream",
    "sells": "Smoked vanilla bean & hazelnut praline",
    "town": "Bath",
    "photo": "https://images.unsplash.com/photo-1576506295286-5cda482453a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-44",
    "name": "Sweet Treats Gelateria",
    "category": "Ice Cream",
    "sells": "Churros with warm chocolate dip & gelato",
    "town": "York",
    "photo": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-45",
    "name": "Seaside Sundae House",
    "category": "Ice Cream",
    "sells": "Banana splits & knickerbocker glories",
    "town": "Southampton",
    "photo": "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-46",
    "name": "The Frozen Spoon Parlour",
    "category": "Ice Cream",
    "sells": "Bubble waffle gelato cones & frappes",
    "town": "Leeds",
    "photo": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-47",
    "name": "Little Italy Gelato Bar",
    "category": "Ice Cream",
    "sells": "Sicilian cannoli & espresso gelato",
    "town": "Liverpool",
    "photo": "https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-48",
    "name": "Artisan Churn Ice Cream Shop",
    "category": "Ice Cream",
    "sells": "Clotted cream & wild blueberry ice cream",
    "town": "Exeter",
    "photo": "https://images.unsplash.com/photo-1516559828984-fb3b99548b21?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-49",
    "name": "The Ice Cream Cartel",
    "category": "Ice Cream",
    "sells": "Gourmet gelato sandwiches & waffle nachos",
    "town": "Glasgow",
    "photo": "https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-50",
    "name": "Pistachio & Co. Gelateria",
    "category": "Ice Cream",
    "sells": "Bronte pistachio & roasted almond gelato",
    "town": "Nottingham",
    "photo": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-51",
    "name": "The Artisan Espresso Bar",
    "category": "Cafes",
    "sells": "Single-origin pour-overs & sourdough toasts",
    "town": "London",
    "photo": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-52",
    "name": "Heritage Velvet Tea Rooms",
    "category": "Cafes",
    "sells": "Traditional afternoon tea & warm scones",
    "town": "Bath",
    "photo": "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-53",
    "name": "Northern Quarter Roasters",
    "category": "Cafes",
    "sells": "House-roasted beans & flat whites",
    "town": "Manchester",
    "photo": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-54",
    "name": "The Botanical Glasshouse Cafe",
    "category": "Cafes",
    "sells": "Matcha lattes, avocado toast & cakes",
    "town": "Cambridge",
    "photo": "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-55",
    "name": "Royal Mile Coffee House",
    "category": "Cafes",
    "sells": "Scottish shortbread & specialty filter coffee",
    "town": "Edinburgh",
    "photo": "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-56",
    "name": "Harbour Light Coffee & Bakehouse",
    "category": "Cafes",
    "sells": "Cardamom buns & specialty coffee",
    "town": "Bristol",
    "photo": "https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-57",
    "name": "The Old Bookshop Cafe",
    "category": "Cafes",
    "sells": "Loose-leaf teas, flapjacks & reading corner",
    "town": "Oxford",
    "photo": "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-58",
    "name": "Lanes Espresso & Brew Bar",
    "category": "Cafes",
    "sells": "Cold brew on tap & iced matcha",
    "town": "Brighton",
    "photo": "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-59",
    "name": "The Shambles Coffee Roastery",
    "category": "Cafes",
    "sells": "Freshly roasted Arabica beans & croissants",
    "town": "York",
    "photo": "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-60",
    "name": "Merchant City Roasters",
    "category": "Cafes",
    "sells": "Micro-batch coffees & sourdough toasties",
    "town": "Glasgow",
    "photo": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-61",
    "name": "The Victorian Tea Salon",
    "category": "Cafes",
    "sells": "Fine china afternoon tea & cucumber sandwiches",
    "town": "Leamington Spa",
    "photo": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-62",
    "name": "Black Gold Coffee Works",
    "category": "Cafes",
    "sells": "Dark roast espresso & almond croissants",
    "town": "Leeds",
    "photo": "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-63",
    "name": "The Quarterdeck Cafe",
    "category": "Cafes",
    "sells": "Specialty roasts, crab rolls & fresh cakes",
    "town": "Portsmouth",
    "photo": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-64",
    "name": "Green Leaf Vegan Cafe",
    "category": "Cafes",
    "sells": "Plant-based lattes, vegan sausage rolls & acai",
    "town": "Leicester",
    "photo": "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-65",
    "name": "Cathedral Bakehouse & Cafe",
    "category": "Cafes",
    "sells": "Artisan sourdough, hot soups & coffees",
    "town": "Norwich",
    "photo": "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-66",
    "name": "The Beanery Specialty Coffee",
    "category": "Cafes",
    "sells": "Single-estate Ethiopian beans & babka",
    "town": "Liverpool",
    "photo": "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-67",
    "name": "The Little French Cafe",
    "category": "Cafes",
    "sells": "Freshly baked butter croissants & cafe au lait",
    "town": "Exeter",
    "photo": "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-68",
    "name": "The Copper Kettle Cafe",
    "category": "Cafes",
    "sells": "Full English breakfasts & Victoria sponge",
    "town": "Milton Keynes",
    "photo": "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-69",
    "name": "St. Peter's Square Coffee Bar",
    "category": "Cafes",
    "sells": "Iced lattes, toasted bagels & sourdough",
    "town": "Nottingham",
    "photo": "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-70",
    "name": "Castle Hill Espresso Bar",
    "category": "Cafes",
    "sells": "Artisan espresso, shortbread & oatcakes",
    "town": "Stirling",
    "photo": "https://images.unsplash.com/photo-1468418143278-41595b1a4c01?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-71",
    "name": "Sourdough & Flour Bakehouse",
    "category": "Bakery & Delis",
    "sells": "Country sourdough loaves & focaccia",
    "town": "London",
    "photo": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-72",
    "name": "La Petite Patisserie Francaise",
    "category": "Bakery & Delis",
    "sells": "Handmade eclairs, fruit tarts & mille-feuille",
    "town": "Bath",
    "photo": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-73",
    "name": "The Fine Cheesemonger",
    "category": "Bakery & Delis",
    "sells": "British & European artisan cheeses & chutneys",
    "town": "Oxford",
    "photo": "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-74",
    "name": "The Artisan Pastry Kitchen",
    "category": "Bakery & Delis",
    "sells": "Almond croissants, pain au chocolat & tarts",
    "town": "Manchester",
    "photo": "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-75",
    "name": "Merchant Deli & Charcuterie",
    "category": "Bakery & Delis",
    "sells": "Cured meats, truffle oils & fresh pasta",
    "town": "Edinburgh",
    "photo": "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-76",
    "name": "The Golden Wheat Bakery",
    "category": "Bakery & Delis",
    "sells": "Yorkshire curd tarts, sourdough & pork pies",
    "town": "York",
    "photo": "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-77",
    "name": "Boutique Chocolatier & Truffles",
    "category": "Bakery & Delis",
    "sells": "Hand-poured dark chocolate truffles & pralines",
    "town": "Brighton",
    "photo": "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-78",
    "name": "St. Nicholas Market Bakehouse",
    "category": "Bakery & Delis",
    "sells": "Fresh cinnamon swirls & sourdough rolls",
    "town": "Bristol",
    "photo": "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-79",
    "name": "The Old Town Delicatessen",
    "category": "Bakery & Delis",
    "sells": "Imported Italian olive oils, prosciutto & cheeses",
    "town": "Cambridge",
    "photo": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-80",
    "name": "Highland Crust Bakery",
    "category": "Bakery & Delis",
    "sells": "Scottish oatcakes, steak pies & fruit scones",
    "town": "Inverness",
    "photo": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-81",
    "name": "The Old Corner Bookshop",
    "category": "Books",
    "sells": "Rare hardbacks, fiction & cozy reading nooks",
    "town": "Oxford",
    "photo": "https://images.unsplash.com/photo-1526243741027-444d633d7342?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-82",
    "name": "Graphic Novel & Comic Depot",
    "category": "Books",
    "sells": "Manga, indie graphic novels & collectibles",
    "town": "Manchester",
    "photo": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-83",
    "name": "Royal Mile Paper & Fine Pens",
    "category": "Books",
    "sells": "Italian leather notebooks & fountain pens",
    "town": "Edinburgh",
    "photo": "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-84",
    "name": "The Children's Storybook Tree",
    "category": "Books",
    "sells": "Illustrated children's books & wooden toys",
    "town": "Bath",
    "photo": "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-85",
    "name": "Lanes Independent Booksellers",
    "category": "Books",
    "sells": "Fiction, art books & coffee table editions",
    "town": "Brighton",
    "photo": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-86",
    "name": "The Vintage Map & Book Trader",
    "category": "Books",
    "sells": "19th-century atlases & travel memoirs",
    "town": "York",
    "photo": "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-87",
    "name": "The Botanical Stationer",
    "category": "Books",
    "sells": "Eco-friendly journals & calligraphy sets",
    "town": "Cambridge",
    "photo": "https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-88",
    "name": "Merchant City Rare Volumes",
    "category": "Books",
    "sells": "First edition novels & leatherbound classics",
    "town": "Glasgow",
    "photo": "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-89",
    "name": "The High Street Paperback Exchange",
    "category": "Books",
    "sells": "Secondhand paperbacks & sci-fi classics",
    "town": "Leeds",
    "photo": "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-90",
    "name": "The Waterfront Bookshop & Cafe",
    "category": "Books",
    "sells": "Independent releases & local history books",
    "town": "Bristol",
    "photo": "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-91",
    "name": "The Botanical Florist Studio",
    "category": "Florists",
    "sells": "Custom flower bouquets & dried arrangements",
    "town": "London",
    "photo": "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-92",
    "name": "Urban Jungle Succulents & Ferns",
    "category": "Florists",
    "sells": "Rare houseplants, monstera & terrariums",
    "town": "Manchester",
    "photo": "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-93",
    "name": "Cotswold Flower Garden",
    "category": "Florists",
    "sells": "Freshly cut English garden roses & peonies",
    "town": "Oxford",
    "photo": "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-94",
    "name": "Highland Wildflower Studio",
    "category": "Florists",
    "sells": "Scottish heather & thistle bouquets",
    "town": "Edinburgh",
    "photo": "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-95",
    "name": "The Glasshouse Plant Nursery",
    "category": "Florists",
    "sells": "Indoor palms, bonsai trees & terracotta pots",
    "town": "Cambridge",
    "photo": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-96",
    "name": "Bath Spa Floral Design",
    "category": "Florists",
    "sells": "Pastel bouquets & dried flower stems",
    "town": "Bath",
    "photo": "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-97",
    "name": "Lanes Botanical House",
    "category": "Florists",
    "sells": "Hanging pothos, cacti & macrame hangers",
    "town": "Brighton",
    "photo": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-98",
    "name": "The Bloom & Willow Shop",
    "category": "Florists",
    "sells": "Seasonal blooms & luxury hatbox flowers",
    "town": "York",
    "photo": "https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-99",
    "name": "Merchant City Plant Parlour",
    "category": "Florists",
    "sells": "Calathea, snake plants & organic plant food",
    "town": "Glasgow",
    "photo": "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80"
  },
  {
    "id": "shop-100",
    "name": "The Waterfront Flower Stall",
    "category": "Florists",
    "sells": "Fresh market tulips, sunflowers & gift wraps",
    "town": "Bristol",
    "photo": "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80"
  }
];

// Vendaru own patch, used by the local-businesses band. Separate from the
// shops above, which reach further than the courier network does.
const SHOP_TOWNS = [
  'Manchester', 'Bolton', 'Bury', 'Radcliffe', 'Salford',
  'Rochdale', 'Oldham', 'Stockport', 'Wigan', 'Altrincham',
];

// The kinds of shop, in the order they should appear, derived from the data so
// a new category cannot be added without a chip appearing for it.
const SHOP_CATEGORY_EMOJI = {
  Clothes: '👗', Antiques: '🏺', 'Ice Cream': '🍨', Cafes: '☕',
  'Bakery & Delis': '🥖', Books: '📚', Florists: '💐',
};

function shopCategories() {
  const seen = [];
  SHOPS_100.forEach(s => { if (seen.indexOf(s.category) === -1) seen.push(s.category); });
  return seen;
}

function shopCategory() {
  return shopCategories().indexOf(state.shopCategory) === -1 ? '' : state.shopCategory;
}

// The pool a search draws from: a chosen town narrows it, exactly as it narrows
// which businesses are shown. Not narrowed by the category chip, which belongs
// to the band rather than to a search.
function shopsInTown(loc) {
  if (!loc) return SHOPS_100;
  return SHOPS_100.filter(s => String(s.town).toLowerCase() === loc.toLowerCase());
}

function searchableShops() {
  return shopsInTown(locationChosen());
}

// What the Shops band draws: the chosen town, narrowed by the category chip —
// and if that leaves nothing, the country rather than an empty page.
//
// The shops are independents in twenty-five towns; the location chip offers
// thirty-nine, most of them Greater Manchester. Picking Bolton emptied the
// whole section, which reads as a broken page rather than as "none here yet".
// Showing the rest, and saying that is what you are looking at, is better than
// showing nothing.
function shopsForLocation() {
  const cat = shopCategory();
  const byCat = (list) => list.filter(s => !cat || s.category === cat);
  const loc = locationChosen();

  const here = byCat(shopsInTown(loc));
  if (!loc || here.length) return { shops: here, elsewhere: false, loc };

  return { shops: byCat(SHOPS_100), elsewhere: true, loc };
}

// A shop's mark. Not a logo: two of these hundred are real businesses with real
// logos, and the rest are names without a company behind them — putting an
// invented brand mark on an invented shop would be dressing a placeholder up as
// a trader. This is a monogram instead, its colour fixed by the name, so each
// shop reads as its own and the same shop always looks the same.
function shopMarkHtml(shop) {
  const initials = shop.name.replace(/^(the|la|le)\s+/i, '')
    .split(/\s+/).map(w => w[0]).filter(c => /[a-z0-9]/i.test(c)).join('').slice(0, 2).toUpperCase();

  // Hashed from the name so it never moves, and kept dark so white initials
  // hold up on it whatever the photo behind the tile is doing.
  let h = 0;
  for (let i = 0; i < shop.name.length; i++) h = (h * 31 + shop.name.charCodeAt(i)) % 360;
  const bg = `hsl(${h} 42% 26%)`;

  const monogram = `<span class="biz-card-logo is-initials shop-mark" style="background:${bg}">${escapeHtml(initials || '?')}</span>`;

  // A shop with a domain is a real company, so it gets its real mark. The
  // monogram is the fallback, and the fallback for the fallback if the icon
  // fails to load — nothing on the card ends up empty.
  if (!shop.domain) return monogram;
  return `<img class="biz-card-logo shop-logo" alt=""
    src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(shop.domain)}&sz=128"
    onload="__fitLogo(this)"
    onerror="this.onerror=null;this.outerHTML=${JSON.stringify(monogram).replace(/"/g, '&quot;')}" />`;
}

function shopCardHtml(shop) {
  const arg = escapeHtml(shop.name + '|' + shop.town);
  return `
    <div class="shop-card press biz-card" data-action="requestFromShop" data-arg="${arg}">
      <div class="biz-card-photo"${shop.photo ? ` style="background-image:url('${escapeHtml(shop.photo)}')"` : ''}>
        ${shopMarkHtml(shop)}
      </div>
      <div class="biz-card-body">
        <div class="biz-card-name">${escapeHtml(shop.name)}</div>
        <div class="biz-card-desc">${escapeHtml(shop.sells)}</div>
        <div class="biz-card-meta">
          <span class="biz-card-town">${ICON_PIN} ${escapeHtml(shop.town)}</span>
        </div>
        <div class="biz-card-actions">
          <button type="button" class="biz-card-action" data-action="requestFromShop" data-arg="${arg}">Send a courier</button>
        </div>
      </div>
    </div>`;
}

// The app's own two services — the Morrisons basket and Special Requests — in
// the same card as everything else on the page. They keep their spot at the top
// rather than a bigger card, since the page is now one card language throughout.
function shopFeatureCardHtml({ action, imageKey, emoji, title, sub, cta }) {
  const src = state.shopImages[imageKey] || SHOP_IMAGE_DEFAULTS[imageKey];
  return `
    <div class="shop-card press biz-card" data-action="${action}">
      <div class="biz-card-photo"${src ? ` style="background-image:url('${src}')"` : ''}>
        ${src ? '' : `<span class="biz-card-photo-empty">${emoji}</span>`}
      </div>
      <div class="biz-card-body">
        <div class="biz-card-name">${escapeHtml(title)}</div>
        <div class="biz-card-desc">${escapeHtml(sub)}</div>
        <div class="biz-card-actions">
          <button type="button" class="biz-card-action" data-action="${action}">${escapeHtml(cta)}</button>
        </div>
      </div>
    </div>`;
}

// Businesses that have listed themselves, newest first. The seeded listings
// carry no join date, so they are not "new" — this fills as real businesses
// sign up rather than pretending they already have.
//
// Not filtered by location, unlike the directory and the shops. A new arrival
// is news for the whole platform, and the location is remembered between
// visits, so filtering it silently hid any joiner whose area line doesn't claim
// national coverage — a Salford studio vanished the moment a town was picked
// while the "UK Wide" listing next to it stayed put.
function newToVendaru() {
  return (state.businesses || []).filter(isBusinessLive)
    .filter(b => b.createdAt)
    .slice()
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

function listYourBusinessLinkHtml() {
  return `<a href="${BUSINESS_PATH}" style="display:block;text-align:center;padding:6px 0;font-size:13px;font-weight:500;color:#6b6b6b;text-decoration:underline;text-underline-offset:2px">List your business</a>`;
}

function shopFeatureGridHtml() {
  return `
    <div class="biz-card-grid">
      ${shopFeatureCardHtml({
        action: 'goBrowse', imageKey: 'morrisons', emoji: '🛒',
        title: 'Morrisons Daily', sub: 'Order in 12 min · £30 min basket', cta: 'Shop the aisles',
      })}
      ${shopFeatureCardHtml({
        action: 'goSpecialRequest', imageKey: 'local', emoji: '📍',
        title: 'Special Requests', sub: 'Collection and delivery from any store', cta: 'Make a request',
      })}
    </div>`;
}

// Paid placements. These are affiliate links — Vendaru earns if someone signs
// up — so each card says Ad on its face and the band says it again above them.
// An affiliate card sitting unmarked among the listings would be telling people
// it is a listing, which is both against the ASA's rules on identifying ads and
// the reason the directory is worth anything.
//
// rel="sponsored" is the other half: it tells search engines the link is paid,
// so it can't be read as an editorial recommendation.
const PARTNER_CARDS = [
  {
    id: 'shopify',
    name: 'Shopify',
    blurb: 'Set your shop up online and sell from your own site',
    cta: 'Start free trial',
    tint: '#008060',
    logo: 'https://www.google.com/s2/favicons?domain=shopify.com&sz=128',
    photo: 'https://images.unsplash.com/photo-1449247666642-264389f5f5b1?ixid=M3wxMDIxNDkyfDB8MXxzZWFyY2h8MXx8c21hbGwlMjBidXNpbmVzcyUyMG93bmVyJTIwcGFja2luZyUyMG9yZGVyc3xlbnwxfDB8fHwxNzg2MjcwMjQzfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80',
    url: 'https://shopify.pxf.io/dyEmAj',
  },
  {
    id: 'tiktok',
    name: 'TikTok for Business',
    blurb: 'Put your business in front of people nearby',
    cta: 'Get started',
    tint: '#010101',
    logo: 'https://www.google.com/s2/favicons?domain=tiktok.com&sz=128',
    // No photo: nothing in the library reads as short video or creators, and a
    // stock picture that doesn't mean anything is worse than the brand's own
    // black. build_partner_photos.js fills this in with a real one.
    photo: 'https://images.unsplash.com/photo-1630797160666-38e8c5ba44c1?ixid=M3wxMDIxNDkyfDB8MXxzZWFyY2h8MXx8ZmlsbWluZyUyMHZpZGVvJTIwc21hcnRwaG9uZSUyMGNyZWF0b3J8ZW58MXwwfHx8MTc4NjI3MDI0NHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80',
    url: 'https://getstartedtiktok.partnerlinks.io/00n0j6kr0ids',
  },
  {
    // A local butcher delivering. Held back from the page until it has somewhere
    // to send people: a card with an Order now button that goes nowhere is worse
    // than no card, so partnerCards() drops any entry with an empty url.
    //
    // To turn it on: put the destination in url — their site, their online-order
    // page, or tel:+44... if orders are taken by phone — and drop the logo in at
    // assets/business/barrons-of-beef.png. The banner arrives with
    // build_partner_photos.js.
    id: 'barrons',
    name: 'Barrons of Beef',
    blurb: 'High-class butchers since 1978 — delivered to your door',
    cta: 'Order now',
    tint: '#141414',
    logo: 'assets/business/barrons-of-beef.png',
    photo: 'https://images.unsplash.com/photo-1597417321971-45e034f7a993?ixid=M3wxMDIxNDkyfDB8MXxzZWFyY2h8MXx8YnV0Y2hlciUyMHNob3AlMjBtZWF0JTIwY291bnRlcnxlbnwxfDB8fHwxNzg2MjcwMjQ1fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80',
    // Ordered through Vendaru rather than sent off to a website: this opens a
    // special request with the shop already filled in, which is the flow a
    // courier collection actually runs on. Still a paid placement, so still
    // marked Ad — what's bought is the position, not a pretence that it isn't
    // advertising.
    action: 'requestFromShop',
    arg: 'Barrons of Beef',
  },
  {
    // Ours, so it is marked as ours rather than as an ad: nobody pays us for
    // this click, and calling it an ad would be as inaccurate as leaving the
    // affiliate cards unmarked. Brand blue lifted from the UTravel design
    // system so the tile is its colour rather than a guess at it.
    id: 'utravel',
    name: 'UTravel',
    blurb: 'Plan smarter trips around your route, budget and comfort',
    cta: 'Plan a trip',
    tint: '#1D4ED8',
    // Its own mark, served as SVG by the site itself, so it stays sharp.
    logo: 'https://utraveluk.net/favicon.svg',
    photo: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixid=M3wxMDIxNDkyfDB8MXxzZWFyY2h8MXx8dHJhdmVsJTIwcGxhbm5pbmclMjBtYXAlMjBob2xpZGF5fGVufDF8MHx8fDE3ODYyNzAyNDR8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80',
    url: 'https://utraveluk.net/',
    kind: 'ours',
  },
];

// Filled by /api/partners when an Impact token is configured on the server.
// Until then this stays empty and the built-in list above is what shows, so the
// band never depends on the endpoint being there.
let livePartners = null;

// Merged, not replaced. Impact only knows about the programmes joined through
// Impact — TikTok's is on another network entirely, so a straight swap to live
// data would have quietly dropped it. Live entries win where the two name the
// same brand, since those carry the real tracking link.
// Two brands are the same brand if either name contains the other — Impact's
// "TikTok" against our "TikTok for Business".
function sameBrand(a, b) {
  const x = String(a || '').toLowerCase(), y = String(b || '').toLowerCase();
  return x === y || x.includes(y) || y.includes(x);
}

function partnerCards() {
  // No destination, no card — whether that destination is a website or a screen
  // in the app. Keeps a half-set-up entry off the page rather than shipping a
  // button that does nothing.
  const band = PARTNER_CARDS.filter(p => p.url || p.action);
  const live = (livePartners || []).filter(p => p && p.url && p.name);
  if (!live.length) return band;

  // Field by field, not card for card. Impact supplies the tracking link and
  // the programme's own copy; it has no logo and no banner, so a straight
  // swap stripped the artwork off any card it matched. The live URL wins
  // because that's the one that pays, and everything the API doesn't carry
  // falls back to what's set here.
  const merged = live.map((p) => {
    const mine = band.find(b => sameBrand(b.name, p.name));
    if (!mine) return p;
    return {
      ...mine,
      ...p,
      logo: p.logo || mine.logo,
      photo: p.photo || mine.photo,
      blurb: p.blurb || mine.blurb,
      cta: p.cta || mine.cta,
      tint: p.tint || mine.tint,
    };
  });

  const builtInOnly = band.filter(b => !live.some(p => sameBrand(b.name, p.name)));
  return merged.concat(builtInOnly);
}

function partnerCardHtml(p) {
  // Paid placements carry rel="sponsored" and say Ad. Our own sites are neither
  // — a nofollow on them would be telling search engines we don't vouch for our
  // own work — so they say Ours and link normally.
  const ours = p.kind === 'ours';
  const rel = ours ? 'noopener noreferrer' : 'sponsored nofollow noopener noreferrer';
  // The brand colour stays underneath the photo, so a picture that hasn't
  // loaded leaves the card looking intentional rather than grey. The wordmark
  // only appears when there is no photo to caption.
  const tile = p.photo
    ? `background:${p.tint} url('${escapeHtml(p.photo)}') center/cover no-repeat`
    : `background:${p.tint}`;
  return `
    <div class="shop-card biz-card partner-card">
      <div class="biz-card-photo" style="${tile}">
        ${p.photo ? '' : `<span class="partner-mark">${escapeHtml(p.name)}</span>`}
        ${p.logo ? `<img class="biz-card-logo partner-logo" src="${escapeHtml(p.logo)}" alt=""
             onerror="this.remove()" />` : ''}
        <span class="partner-tag${ours ? ' is-ours' : ''}">${ours ? 'Ours' : 'Ad'}</span>
      </div>
      <div class="biz-card-body">
        <div class="biz-card-name">${escapeHtml(p.name)}</div>
        <div class="biz-card-desc">${escapeHtml(p.blurb)}</div>
        <div class="biz-card-actions">
          ${p.action
            ? `<button type="button" class="biz-card-action" data-action="${escapeHtml(p.action)}"${p.arg ? ` data-arg="${escapeHtml(p.arg)}"` : ''}>${escapeHtml(p.cta)}</button>`
            : `<a class="biz-card-action" href="${escapeHtml(p.url)}"
                  target="_blank" rel="${rel}">${escapeHtml(p.cta)}</a>`}
        </div>
      </div>
    </div>`;
}

function shopPartnersSectionHtml() {
  const cards = partnerCards();
  if (!cards.length) return '';
  return `
    <div class="page-band">
      <span>Partner offers</span>
      <span class="page-band-count">Ad</span>
    </div>
    <div style="font-size:12.5px;color:#6b6b6b;line-height:1.5;margin:-4px 0 2px">Marked <strong>Ad</strong> are paid links — Vendaru earns a commission if you sign up. Marked <strong>Ours</strong> are our own sites. Neither is part of the directory.</div>
    <div class="biz-card-grid">${cards.map(partnerCardHtml).join('')}</div>`;
}

// Asked for once, after the first paint, and only ever additive: a failure or a
// server with no token leaves the built-in cards exactly as they are.
function loadPartners() {
  fetch('/api/partners')
    .then(r => (r.ok ? r.json() : null))
    .then(d => {
      const list = d && Array.isArray(d.partners) ? d.partners.filter(p => p && p.url && p.name) : [];
      if (!list.length) return;
      livePartners = list;
      render();
    })
    .catch(() => { /* built-in cards stand */ });
}


// The independents a courier can be sent to. Follows the location chip above,
// and the category chips below it.
//
// `limit` is for the All view, where this is one band among four: a hundred
// shop cards before the directory even starts would bury everything under it.
// The Shops button is the whole list.
function shopShopsSectionHtml() {
  const { shops: all, elsewhere } = shopsForLocation();
  const loc = locationChosen();
  const cat = shopCategory();

  const chips = `
    <div class="quick-rail slot-scroll" style="margin-top:8px">
      <button type="button" class="quick-btn${cat ? '' : ' is-on'}" data-action="setShopCategory" data-arg="">All shops</button>
      ${shopCategories().map(c => `
        <button type="button" class="quick-btn${cat === c ? ' is-on' : ''}"
          data-action="setShopCategory" data-arg="${escapeHtml(c)}">${SHOP_CATEGORY_EMOJI[c] || ''} ${escapeHtml(c)}</button>`).join('')}
    </div>`;

  if (!all.length) {
    // With the nationwide fallback in place, the only way to empty this is a
    // category nobody is listed under at all.
    return `
      <div class="page-band"><span>Shops</span></div>
      ${chips}
      <div class="shop-card" style="${SERVICE_CARD_SHELL}">
        <div style="padding:22px 16px;text-align:center">
          <div style="font-size:15px;font-weight:600;color:#141414">No ${escapeHtml((cat || 'shops').toLowerCase())} listed yet</div>
          <div style="font-size:13px;color:#6b6b6b;margin-top:3px;line-height:1.5">Special Requests still works from any shop, anywhere — name it and a courier collects.</div>
        </div>
      </div>`;
  }

  return `
    <div class="page-band">
      <span>${elsewhere || !loc ? 'Independent shops' : `Shops in ${escapeHtml(loc)}`}</span>
      <span class="page-band-count">${all.length}</span>
    </div>
    ${elsewhere
      ? `<div style="font-size:12.5px;color:#6b6b6b;line-height:1.5;margin:-4px 0 2px">None in ${escapeHtml(loc)} yet — these are elsewhere, and a courier still collects.</div>`
      : ''}
    ${chips}
    <div class="biz-card-grid">${all.map(shopCardHtml).join('')}</div>`;
}


function shopNewSectionHtml() {
  const fresh = newToVendaru();

  if (!fresh.length) {
    return `
      <div class="page-band"><span>New to Vendaru</span></div>
      <div class="shop-card" style="${SERVICE_CARD_SHELL}">
        <div style="padding:22px 16px;text-align:center">
          <div style="font-size:15px;font-weight:600;color:#141414">Nobody has joined yet</div>
          <div style="font-size:13px;color:#6b6b6b;margin-top:3px;line-height:1.5">Businesses that list themselves on Vendaru show up here first, newest at the top. Yours could be the one.</div>
        </div>
      </div>`;
  }
  return `
    <div class="page-band">
      <span>New to Vendaru</span>
      <span class="page-band-count">${fresh.length}</span>
    </div>
    ${businessListHtml(fresh)}`;
}

function renderShopperShop() {
  const searching = (state.searchQuery || '').trim().length > 0;

  // Shop is shopping: the two Vendaru runs itself, then the independents a
  // courier can be sent to. The services directory lives on Services, which is
  // a tab of its own — carrying a hundred listings here as well made this the
  // same page twice and buried the shops under them.
  //
  // The filter row went with them. With nothing but shops left to show, a row
  // offering to show only shops was a button that did nothing; the shop
  // categories below are the filter that matters now.
  let body;
  if (searching) {
    body = renderShopperSearchResults(state.searchQuery, { shoppingOnly: true });
  } else {
    // Shops first, then the two Vendaru runs itself. The independents are what
    // the page is a directory of; Morrisons and Special Requests are always
    // there and don't need the top of it.
    body = shopPartnersSectionHtml()
      + shopShopsSectionHtml()
      + shopFeatureGridHtml();
  }
  if (!searching) body += listYourBusinessLinkHtml();

  return `<div class="page page-cards" style="padding:0 18px 24px">
    <!-- Brand mark, centred. Same 200px width as the sign-in screen.
         Swapping assets/brand/logo.svg changes it here too. -->
    <div class="press" data-action="goShop" style="display:flex;justify-content:center;padding:2px 0;cursor:pointer">
      <img src="assets/brand/logo.svg" alt="Vendaru" width="200"
           style="width:200px;max-width:62%;height:auto;display:block" />
    </div>
    <div style="font-size:15px;opacity:0.55;font-weight:600">Good afternoon</div>
    ${locationSearchBarHtml('shop-search-input')}
    <!-- Which part of the app you're after. The grocery aisle rail used to sit
         under this; the aisles are inside Morrisons Daily, which is a card on
         the page, so a second way in was a row of tiles earning its keep on
         every visit. -->
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
  const placeholder = src ? '' : `<span style="font-size:18px">${emoji}</span>`;

  // Only an upload target for an operator setting the shop up.
  if (!isAdmin()) {
    return `<span class="product-thumb" style="${bgStyle}">${placeholder}</span>`;
  }

  return `
  <label class="product-thumb" style="${bgStyle}" title="${src ? 'Change image' : 'Add image'}">
    ${placeholder}
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
              const charged = l.qty * l.product.estimated_price_gbp;
              return `
              <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;padding:11px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
                <div style="flex:1;min-width:0">
                  <div style="font-size:13.5px;font-weight:500;color:#141414;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(l.product.name)}</div>
                  <div style="font-size:12.5px;color:#6b6b6b">£${l.product.estimated_price_gbp.toFixed(2)} each</div>
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
               <div style="font-size:12.5px;color:#6b6b6b;margin-top:3px;line-height:1.5">Place an order to follow it here and on your Board.</div>
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
      </div>
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
  const bookings = bookingLines();
  const bookingsSum = bookingsTotal();
  // A basket of bookings alone has nothing to carry, so no delivery fee.
  const serviceFee = SERVICE_FEE;
  const grandTotal = subtotal + bookingsSum + serviceFee;
  const p = state.userProfile;
  // "Schedule" picked but no slot chosen — otherwise the order would quietly
  // go out as an immediate one.
  const needsSlot = basketHasDelivery() && state.deliveryLater && !state.deliverySlot;

  const cardShell = 'border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;background:#fff;padding:4px 16px 14px';
  const sectionLabel = 'font-size:12.5px;font-weight:600;color:#6b6b6b;padding:13px 0 0';
  const summaryRow = 'display:flex;justify-content:space-between;gap:12px;font-size:13px;color:#6b6b6b;padding:3px 0';

  const itemsListHtml = lines.map((l, i) => `
    <div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:10px 0;${i > 0 ? 'border-top:1px solid #f0f0f0;' : 'margin-top:4px;'}">
      <span style="font-size:13.5px;color:#141414;min-width:0">${l.qty} × ${escapeHtml(l.product.name)}</span>
      <span style="font-size:13.5px;font-weight:600;flex:0 0 auto">£${(l.qty * l.product.estimated_price_gbp).toFixed(2)}</span>
    </div>`).join('');

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

// Customer membership, built the same way the listing plans are: a ladder of
// paid tiers, monthly or annual, bought through the same Stripe endpoint. Free
// is a real rung rather than the absence of one, so somebody who never pays
// still has a membership rather than a blank.
//
// Annual is ten months' money for twelve, matching the listing plans — one
// pricing idea across the site rather than two.
const MEMBER_TIERS = [
  {
    id: 'free', label: 'Free', monthly: 0, annual: 0, rank: 0,
    summary: 'Everything you need to shop and book',
    features: ['Browse and book every listing', 'Your board, all fifteen slots', 'Special requests by courier'],
  },
  {
    id: 'plus', label: 'Plus', monthly: 9.99, annual: 99.90, rank: 1, trialDays: 7,
    summary: 'No service fee on anything you order',
    features: ['Everything in Free', `No £${SERVICE_FEE.toFixed(2)} service fee, ever`, 'Priority on the courier queue'],
  },
  {
    id: 'pro', label: 'Pro', monthly: 19.99, annual: 199.90, rank: 2, trialDays: 7,
    summary: 'Free delivery and first pick of new listings',
    features: ['Everything in Plus', 'Free delivery on every order', 'New businesses before anyone else'],
  },
];

const PENDING_MEMBER_KEY = 'graftr_pending_membership';

// Applied on the way back from Stripe, or straight away when there is no
// billing backend to go to.
function applyMembership(pending) {
  if (!pending || !pending.tier) return;
  state.membership = {
    tier: memberTierById(pending.tier).id,
    billing: pending.billing === 'annual' ? 'annual' : 'monthly',
    since: Date.now(),
  };
  state.memberChoice = null;
  saveMembership();
  try { localStorage.removeItem(PENDING_MEMBER_KEY); } catch (e) { /* ignore */ }
}

const MEMBER_KEY = 'graftr_membership';
const DEFAULT_MEMBER_TIER = 'free';

function loadMembership() {
  try {
    const raw = localStorage.getItem(MEMBER_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === 'object') return parsed;
  } catch (e) { /* ignore corrupt storage */ }
  return { tier: DEFAULT_MEMBER_TIER, billing: 'monthly', since: null };
}

function saveMembership() {
  try { localStorage.setItem(MEMBER_KEY, JSON.stringify(state.membership || {})); } catch (e) { /* ignore */ }
}

function memberTierById(id) {
  return MEMBER_TIERS.find(t => t.id === id) || MEMBER_TIERS[0];
}

function memberTier() {
  return memberTierById((state.membership || {}).tier || DEFAULT_MEMBER_TIER);
}

function memberPrice(tier, billing) {
  return billing === 'annual' ? tier.annual : tier.monthly;
}

// The badge: one pip per rung, filled to the tier held. Reads at a glance and
// needs no artwork, so adding a tier is a line of data rather than a new asset.
function memberBadgeHtml(tier, size) {
  return `
    <span class="member-badge is-${escapeHtml(tier.id)}${size === 'sm' ? ' is-sm' : ''}" aria-hidden="true">
      ${MEMBER_TIERS.map((t) => `<span class="member-pip${t.rank <= tier.rank ? ' is-on' : ''}"></span>`).join('')}
    </span>`;
}

function memberCrestHtml() {
  const tier = memberTier();
  return `
    <button type="button" class="member-crest is-${escapeHtml(tier.id)}" data-action="goShopperAccount"
      title="Vendaru ${escapeHtml(tier.label)} — tap to manage">
      <span class="member-crest-rule" aria-hidden="true"></span>
      <span class="member-crest-body">
        <span class="member-crest-kicker">Member</span>
        <span class="member-crest-tier">${escapeHtml(tier.label)}</span>
      </span>
      <span class="member-crest-pips" aria-hidden="true">
        ${MEMBER_TIERS.map((t) => `<span class="member-pip${t.rank <= tier.rank ? ' is-on' : ''}"></span>`).join('')}
      </span>
    </button>`;
}


function renderMembershipCard() {
  const held = memberTier();
  const billing = state.memberBilling || (state.membership || {}).billing || 'monthly';
  const chosen = memberTierById(state.memberChoice || held.id);
  const cardShell = 'border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;background:#fff';

  const toggle = ['monthly', 'annual'].map(id => `
    <button type="button" class="view-opt${billing === id ? ' is-on' : ''}"
      data-action="setMemberBilling" data-arg="${id}">${id === 'annual' ? 'Annual' : 'Monthly'}</button>`).join('');

  const rows = MEMBER_TIERS.map((t) => {
    const isHeld = t.id === held.id;
    const isChosen = t.id === chosen.id;
    const price = memberPrice(t, billing);
    return `
      <button type="button" class="member-plan${isChosen ? ' is-chosen' : ''}"
        data-action="setMemberChoice" data-arg="${t.id}">
        <span class="member-plan-top">
          <span class="member-plan-name">${escapeHtml(t.label)}${isHeld ? ' <span class="member-plan-current">Current</span>' : ''}</span>
          <span class="member-plan-price">${price ? `£${price.toFixed(2)}<span>/${billing === 'annual' ? 'yr' : 'mo'}</span>` : 'Free'}</span>
        </span>
        <span class="member-plan-summary">${escapeHtml(t.summary)}</span>
        ${t.trialDays && t.id !== held.id ? `<span class="member-plan-trial">${t.trialDays} days free, then £${price.toFixed(2)}</span>` : ''}
        <span class="member-plan-features">${t.features.map(f => `<span>${escapeHtml(f)}</span>`).join('')}</span>
      </button>`;
  }).join('');

  const canBuy = chosen.rank > 0 && chosen.id !== held.id;
  const canCancel = held.rank > 0;

  return `
    <div class="shop-card" style="${cardShell}">
      <div style="padding:4px 16px 16px">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;font-size:12.5px;font-weight:600;color:#6b6b6b;padding:13px 0 0">
          <span>Membership</span>
          ${memberBadgeHtml(held, 'sm')}
        </div>

        <div class="member-head">
          <div style="min-width:0">
            <div class="member-tier-name">${escapeHtml(held.label)}</div>
            <div class="member-tier-blurb">${escapeHtml(held.summary)}</div>
          </div>
        </div>

        <div class="view-toggle" style="margin:12px 0 4px">${toggle}</div>
        <div class="member-plans">${rows}</div>

        ${state.memberError ? `<div class="member-error">${escapeHtml(state.memberError)}</div>` : ''}

        <div class="member-actions">
          ${canBuy
            ? `<button type="button" class="member-buy" data-action="subscribeMembership"${state.memberBuying ? ' disabled' : ''}>
                 ${state.memberBuying
                   ? 'Redirecting…'
                   : chosen.trialDays
                     ? `Start ${chosen.trialDays}-day free trial`
                     : `Get ${escapeHtml(chosen.label)} · £${memberPrice(chosen, billing).toFixed(2)}`}
               </button>`
            : ''}
          ${canCancel
            ? `<button type="button" class="board-clear" data-action="cancelMembership">Cancel membership</button>`
            : ''}
        </div>

        <div class="member-note">${canBuy && chosen.trialDays
          ? `Free for ${chosen.trialDays} days, then £${memberPrice(chosen, billing).toFixed(2)} ${billing === 'annual' ? 'a year' : 'a month'}. Cancel during the trial and you pay nothing. `
          : ''}Billed by Stripe. Cancel any time — you keep the tier until the period you have paid for runs out.</div>
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
      a: 'Yes. Use Cancel Order on your Basket or Board tab any time before the courier leaves with your items.'
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
  <div class="page page-cards" style="padding:0 18px 24px">

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

    <!-- Under the profile: whose account it is, then the part of it they come
         back for. The address lives in Edit profile, not on a card of its own. -->
    <div class="press shop-card" data-action="goFavourites" style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;cursor:pointer">
      <div style="padding:16px;display:flex;align-items:center;justify-content:space-between;gap:12px">
        <div style="min-width:0">
          <div style="font-size:15.5px;font-weight:700">Your list</div>
          <div style="font-size:13px;opacity:0.6">
            ${(state.favourites || []).length
              ? `${(state.favourites || []).length} kept · your people for jobs around the house`
              : 'Keep a cleaner, a plumber, a dog walker — ready when you need them'}
          </div>
        </div>
        <span style="opacity:0.4;flex:0 0 auto">›</span>
      </div>
    </div>

    ${renderMembershipCard()}

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

    <!-- The other two apps. A card, so on desktop it takes the column beside
         Legal instead of running the full width under it. -->
    <div class="shop-card" style="${cardStyle}">
      <div style="${sectionLabel}">Other Vendaru apps</div>
      <a href="${ROLE_PATH}" style="${rowBase};text-decoration:none">
        <span style="font-weight:500">Switch to courier app</span>
        <span style="opacity:0.4;flex:0 0 auto">›</span>
      </a>
      <a href="${BUSINESS_PATH}" style="${rowBase};${divider};text-decoration:none">
        <span style="font-weight:500">List your business</span>
        <span style="opacity:0.4;flex:0 0 auto">›</span>
      </a>
    </div>

    <!-- Signing out is its own thing, not one of the app links. -->
    <button type="button" data-action="logout" style="width:100%;background:none;border:none;padding:6px;font-size:14px;font-weight:600;color:#6b6b6b;cursor:pointer;font-family:inherit">
      Log out
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
      Board
    </div>
    <!-- The last tab is the way in until there's an account behind it. -->
    ${state.authUser ? `
    <div class="press floating-tab" data-action="goShopperAccount" style="${tabStyle('shopper-account')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="6.5" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M3.5 17c1-3.5 4-5 6.5-5s5.5 1.5 6.5 5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Account
    </div>` : `
    <div class="press floating-tab" data-action="goLogin" style="${tabStyle('login')}">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 3.2h3.1a1.4 1.4 0 011.4 1.4v10.8a1.4 1.4 0 01-1.4 1.4h-3.1"/><path d="M8 13.2L11.2 10 8 6.8"/><path d="M11.2 10H3.4"/></svg>
      Log in
    </div>`}
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
    <div class="ai-chat-sheet">
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

// The board: seven parts of a household, four things to sort in each.
//
// A slot draws from `cat`, then narrows with `match` against the business name.
// Both matter — four Health slots sit on the same `health` category, and
// without the second filter every one would offer the identical nine listings.
//
// Twelve of these twenty-eight have nobody to offer today: banking, insurance,
// nurseries, elderly care, skip hire, electricians, pharmacy, physio, luggage.
// They stay on the board and say so. A household has those things whether or
// not Vendaru lists anybody for them, and the gaps are the recruiting list.
const BOARD_AREAS = [
  { id: 'health', label: 'Health', emoji: '💚', slots: [
    { id: 'health-gp',       label: 'Primary care & GP',        does: 'Check-ups, and someone to call when it is not right', cat: 'health', match: /nuffield|bupa health/i },
    { id: 'health-dental',   label: 'Dental care',              does: 'Six-monthly, and the one that cannot wait',           cat: 'health', match: /dental|dentist/i },
    { id: 'health-physio',   label: 'Physiotherapy & rehab',    does: 'Backs, knees, and getting moving again',              cat: 'health', match: /physio|ascenti|bodyset|rehab/i },
    { id: 'health-pharmacy', label: 'Pharmacy & prescriptions', does: 'Repeat prescriptions, and what you need today',       cat: 'health', match: /pharmacy|chemist|rowlands/i },
  ] },

  { id: 'home', label: 'Home', emoji: '🏠', slots: [
    { id: 'home-plumbing', label: 'Plumbing & heating', does: 'Leaks, boilers, no hot water on a Sunday',     cat: 'trades', match: /plumb|dyno|boiler|heating|homeserve|british gas/i },
    { id: 'home-electric', label: 'Electrical work',    does: 'Rewiring, sockets, anything that trips',       cat: 'trades', match: /electric|niceic/i },
    { id: 'home-handyman', label: 'Handyman & repairs', does: 'Shelves, locks, the jobs that pile up',        cat: 'trades', match: /checkatrade|mybuilder|handyman|timpson|screwfix/i },
    { id: 'home-waste',    label: 'Waste & skip hire',  does: 'Clearing out, and getting rid of it properly', cat: 'trades', match: /waste|skip|junk|clearabee|biffa/i },
  ] },

  { id: 'pets', label: 'Pets', emoji: '🐾', slots: [
    { id: 'pets-supplies',  label: 'Supplies & nutrition',  does: 'Food, bedding, the treats they hold out for', cat: 'pets', match: /pets at home|jollyes|groom/i },
    { id: 'pets-vet',       label: 'Veterinary care',       does: 'Jabs, and the number for a bad night',        cat: 'pets', match: /vet|pdsa|linnaeus|cvs/i },
    { id: 'pets-walker',    label: 'Daily care & exercise', does: 'Midday walks when you cannot get back',       cat: 'dog-walkers' },
    { id: 'pets-insurance', label: 'Pet insurance',         does: 'The bill you hope never lands',               cat: 'pets', match: /insur|petplan|animal friends/i },
  ] },

  { id: 'money', label: 'Money & legal', emoji: '📄', slots: [
    { id: 'money-bank',      label: 'Banking & accounts', does: 'Where it comes in, and where it goes',          cat: 'money', match: /bank|hsbc|barclays|monzo|starling/i },
    { id: 'money-wills',     label: 'Wills & estate law', does: 'A will, probate, the letter you are avoiding',  cat: 'legal', match: /solicitor|law|legal|mitchell|shoosmith|gordon/i },
    { id: 'money-insurance', label: 'Insurance brokers',  does: 'One person who knows what you are covered for', cat: 'money', match: /broker|compare the market|gallagher|howden/i },
    { id: 'money-tax',       label: 'Tax & accounting',   does: 'The return, and someone to ring about it',      cat: 'legal', match: /tax|account|kpmg|bdo/i },
  ] },

  { id: 'auto', label: 'Automotive', emoji: '🚗', slots: [
    { id: 'auto-service',   label: 'Servicing & repairs',  does: 'MOT, servicing, the noise it has started making', cat: 'auto', match: /kwik|halfords|autocentre|servicing|chipsaway|autoglass|lookers/i },
    { id: 'auto-tyres',     label: 'Tyres & wheels',       does: 'The one that goes down every fortnight',          cat: 'auto', match: /tyre|euromaster|kwik/i },
    { id: 'auto-breakdown', label: 'Breakdown & recovery', does: 'Who you ring from the hard shoulder',             cat: 'auto', match: /rac|automobile association|breakdown|recovery/i },
    { id: 'auto-insurance', label: 'Vehicle insurance',    does: 'Who you are with, and when it renews',            cat: 'money', match: /admiral|aviva|direct line/i },
  ] },

  { id: 'family', label: 'Family', emoji: '🎒', slots: [
    { id: 'family-childcare', label: 'Early years childcare', does: 'Nursery, and the wraparound either side',  cat: 'care',     match: /nurser|busy bees|bright horizons|kids planet/i },
    { id: 'family-tutor',     label: 'Academic tutoring',     does: 'Help before the exams, not after',         cat: 'tutoring', match: /tutor|kumon|explore learning|kip mcgrath/i },
    { id: 'family-cleaning',  label: 'Home cleaning',         does: 'A regular going-over, or one big reset',   cat: 'cleaning', match: /molly|domestic|fantastic|ovenu|safeclean/i },
    { id: 'family-eldercare', label: 'Elderly home care',     does: 'Someone looking in, and help staying put', cat: 'care',     match: /home instead|helping hands|bluebird/i },
  ] },

  { id: 'plans', label: 'Plans & travel', emoji: '✈️', slots: [
    { id: 'plans-agent',     label: 'Travel agency & bookings', does: 'Booked by someone who does it all day',    cat: 'travel', match: /tui|hays|trailfinders|flight centre|virgin|travel/i },
    { id: 'plans-insurance', label: 'Travel insurance',         does: 'The bit everyone leaves until the airport', cat: 'money', match: /staysure|coverwise|allclear/i },
    { id: 'plans-transfer',  label: 'Airport transit',          does: 'Getting there at five in the morning',      cat: 'travel', match: /national express|addison lee|coach|chauffeur|taxi|transfer/i },
    { id: 'plans-gear',      label: 'Luggage & travel gear',    does: 'A case that survives the carousel',         cat: 'travel', match: /luggage|antler|mountain warehouse|cotswold/i },
  ] },
];

// The businesses a slot can be filled from: its category, narrowed by its
// matcher. Either may be absent; both absent means nothing to offer.
function boardSlotPool(slot) {
  if (!slot.cat && !slot.match) return [];
  return (state.businesses || [])
    .filter(isBusinessLive)
    .filter(servesLocation)
    .filter(b => (!slot.cat || b.category === slot.cat)
      // Name only. Taglines list what a business can arrange as much as what
      // it is — Checkatrade's mentions plumbers, {my}dentist's mentions
      // practices — so matching them put a directory under Plumbing and a
      // dentist under GP.
      && (!slot.match || slot.match.test(b.name)))
    .sort(byTierThenRecency);
}

const BOARD_KEY = 'graftr_board';

function loadBoard() {
  try {
    const raw = localStorage.getItem(BOARD_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (e) { return {}; }
}

function saveBoard() {
  try { localStorage.setItem(BOARD_KEY, JSON.stringify(state.board || {})); } catch (e) { /* ignore */ }
}

// Read here rather than up with the other stores: loadBoard is hoisted, but
// BOARD_KEY above it is a const, and touching that before this line throws
// straight into loadBoard's own catch — which hands back an empty board and
// says nothing. Everything saved would come back missing on reload.
state.board = loadBoard();
state.membership = loadMembership();

// Phones get the compact card — the Basic-tier row — and open the full one on
// a tap. There is room for the banner on a wide screen, so it is always shown
// there and the tap does nothing.
//
// Decided in JS rather than CSS because the two cards pull different images:
// rendering both and hiding one would have every phone downloading a banner it
// never sees. Re-rendered when the query flips, so a resize doesn't strand the
// page in the wrong one.
const BOARD_NARROW = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(max-width: 559px)')
  : null;

if (BOARD_NARROW && BOARD_NARROW.addEventListener) {
  BOARD_NARROW.addEventListener('change', () => {
    if (state.screen === 'shopper-inbox') render();
  });
}

function boardShowsFullCard(slotId) {
  if (!BOARD_NARROW || !BOARD_NARROW.matches) return true;
  return state.expandedBoardSlot === slotId;
}

function boardBusiness(slotId) {
  const id = (state.board || {})[slotId];
  if (!id) return null;
  return (state.businesses || []).filter(isBusinessLive).find(b => String(b.id) === String(id)) || null;
}

function boardSlotCount() {
  return BOARD_AREAS.reduce((n, a) => n + a.slots.length, 0);
}

function boardFilledCount() {
  return BOARD_AREAS.reduce((n, a) => n + a.slots.filter(sl => boardBusiness(sl.id)).length, 0);
}

// Reuses the wall's slot styling, so a slot looks the same wherever it appears
// and there is one place to change how it looks.
function boardSlotHtml(area, slot) {
  const chosen = boardBusiness(slot.id);
  const cat = slot.cat ? serviceCategory(slot.cat) : null;

  const head = `
    <div class="fav-slot-head">
      <span class="fav-slot-icon">${cat ? cat.emoji : area.emoji}</span>
      <span class="fav-slot-titles">
        <span class="fav-slot-label">${escapeHtml(slot.label)}</span>
        <span class="fav-slot-does">${escapeHtml(slot.does)}</span>
      </span>
    </div>`;

  if (chosen) {
    const full = boardShowsFullCard(slot.id);
    const canExpand = BOARD_NARROW && BOARD_NARROW.matches;
    return `
      <div class="fav-slot" data-slot="${escapeHtml(slot.id)}">
        ${head}
        <div class="board-card${canExpand ? ' press' : ''}"${canExpand ? ` data-action="toggleBoardCard" data-arg="${escapeHtml(slot.id)}"` : ''}>
          ${businessCardHtml(chosen, { linked: false, variant: full ? 'large' : 'compact' })}
        </div>
        <div class="board-slot-actions">
          ${canExpand ? `<button type="button" class="board-clear" data-action="toggleBoardCard" data-arg="${escapeHtml(slot.id)}">${full ? 'Show less' : 'Preview'}</button>` : ''}
          <button type="button" class="board-clear" data-action="openBusiness" data-arg="${chosen.id}">Open listing</button>
          <button type="button" class="board-clear" data-action="clearBoardSlot" data-arg="${escapeHtml(slot.id)}">Change</button>
        </div>
      </div>`;
  }

  const choices = boardSlotPool(slot);

  if (!choices.length) {
    return `
      <div class="fav-slot is-empty" data-slot="${escapeHtml(slot.id)}">
        ${head}
        <div class="fav-empty-card board-none">
          <span>${slot.cat ? 'Nobody listed yet' : 'Not on Vendaru yet'}</span>
        </div>
      </div>`;
  }

  const open = state.openBoardPicker === slot.id;
  return `
    <div class="fav-slot is-empty" data-slot="${escapeHtml(slot.id)}">
      ${head}
      <div class="fav-empty-card">
        <button type="button" class="fav-add-btn${open ? ' is-open' : ''}" data-action="toggleBoardPicker"
          data-arg="${escapeHtml(slot.id)}" title="Choose your ${escapeHtml(slot.label.toLowerCase())}"
          aria-label="Choose your ${escapeHtml(slot.label.toLowerCase())}">+</button>
      </div>
      ${open ? `<div class="fav-choices">${choices.map(b => boardChoiceHtml(slot, b)).join('')}</div>` : ''}
    </div>`;
}

function boardChoiceHtml(slot, b) {
  const fallback = b.domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(b.domain)}&sz=64` : '';
  const initials = (b.name || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const mark = b.logoSrc
    ? `<img class="fav-choice-logo" src="${escapeHtml(b.logoSrc)}" alt="" onload="__fitLogo(this)" onerror="this.onerror=null;${fallback ? `this.src='${fallback}'` : `this.replaceWith(Object.assign(document.createElement('span'),{className:'fav-choice-logo is-initials',textContent:'${escapeHtml(initials)}'}))`}" />`
    : `<span class="fav-choice-logo is-initials">${escapeHtml(initials)}</span>`;
  return `
    <button type="button" class="fav-choice" data-action="setBoardSlot" data-arg="${escapeHtml(slot.id)}|${b.id}">
      ${mark}
      <span class="fav-choice-text">
        <span class="fav-choice-name">${escapeHtml(b.name)}</span>
        <span class="fav-choice-desc">${escapeHtml(b.tagline || (serviceCategory(b.category) || {}).label || '')}</span>
      </span>
    </button>`;
}

// The top of the board is a page about a person, not a screen of the app: their
// picture, their name said out loud, and what the board is for underneath. The
// photo is the account's, so setting it here or there sets it in both places.
// How far along, in words. A bare percentage tells you a number; this tells you
// whether to bother carrying on.
function boardProgressNote(filled, total) {
  if (!total) return '';
  if (filled === 0) return 'Nothing on your board yet — start with the one you would ring first';
  if (filled === total) return 'Every slot filled. Nothing left to sort';
  const pct = Math.round((filled / total) * 100);
  if (pct < 25) return 'Made a start — a few more and this is worth coming back to';
  if (pct < 50) return 'Coming together. The gaps are the ones you notice at the worst moment';
  if (pct < 80) return 'Over halfway. Worth finishing while you are here';
  return 'Nearly there — a couple of slots left';
}

// Every slot that can hold someone, filled or not — a filled one keeps its
// place in the rail and wears the business's own mark, so the row fills up as
// the board does instead of counting down to nothing. Only the slots Vendaru
// has nobody for are left out; a shortcut to an empty list is no shortcut.
function boardQuickSlots() {
  const out = [];
  BOARD_AREAS.forEach((area) => {
    area.slots.forEach((slot) => {
      const chosen = boardBusiness(slot.id);
      if (!chosen && !boardSlotPool(slot).length) return;
      out.push({ area, slot, chosen, cat: slot.cat ? serviceCategory(slot.cat) : null });
    });
  });
  return out;
}

// The icon itself: their logo once a slot is taken, the trade's mark while it
// is still open.
function boardQuickIconHtml({ slot, chosen, cat }) {
  if (!chosen) {
    return `<span class="board-quick-icon"><span class="board-quick-plus" aria-hidden="true">+</span></span>`;
  }
  const fallback = chosen.domain
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(chosen.domain)}&sz=128`
    : '';
  const initials = (chosen.name || '?').split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const inner = chosen.logoSrc
    ? `<img src="${escapeHtml(chosen.logoSrc)}" alt="" onload="__fitLogo(this)" onerror="this.onerror=null;${fallback ? `this.src='${fallback}'` : `this.replaceWith(Object.assign(document.createElement('span'),{className:'board-quick-initials',textContent:'${escapeHtml(initials)}'}))`}" />`
    : `<span class="board-quick-initials">${escapeHtml(initials)}</span>`;
  return `<span class="board-quick-icon is-filled">${inner}</span>`;
}

// The rail above the first card. Tapping an empty one opens its chooser and
// takes you to the slot, which is usually well below the fold; tapping a filled
// one just takes you to it. The plus inside a slot still works for anyone who
// would rather go one at a time.
function boardQuickRailHtml() {
  const quick = boardQuickSlots();
  if (!quick.length) return '';
  const left = quick.filter(q => !q.chosen).length;
  return `
    <div class="board-quick">
      <div class="board-quick-head">${left ? `Quick add — ${left} still to pick` : 'Your line-up'}</div>
      <div class="board-quick-rail slot-scroll">
        ${quick.map((q) => `
          <button type="button" class="board-quick-btn${q.chosen ? ' is-filled' : ''}"
            data-action="quickBoardSlot" data-arg="${escapeHtml(q.slot.id)}"
            title="${q.chosen ? escapeHtml(q.chosen.name) : `Choose your ${escapeHtml(q.slot.label.toLowerCase())}`}">
            ${boardQuickIconHtml(q)}
            <span class="board-quick-label">${escapeHtml(q.chosen ? q.chosen.name : q.slot.label)}</span>
          </button>`).join('')}
      </div>
    </div>`;
}

function boardHeroHtml(filled, total) {
  const p = state.userProfile || {};
  const who = ((state.authUser && state.authUser.name) || p.name || '').trim();
  const first = who ? who.split(/\s+/)[0] : '';
  const initials = who
    ? who.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '';
  return `
    <div class="board-hero">
      <label class="board-portrait" title="Change photo">
        ${p.avatarSrc
          ? `<img src="${escapeHtml(p.avatarSrc)}" alt="" />`
          : `<span class="board-portrait-initials">${escapeHtml(initials || '＋')}</span>`}
        <input type="file" accept="image/*" data-upload-avatar />
      </label>

      <div class="board-hero-text">
        ${memberCrestHtml()}
        <div class="board-hey">Hey,</div>
        <div class="board-name">${escapeHtml(first || 'there')}</div>
        <div class="board-lede">${filled
          ? 'Everyone you’d call, in one place.'
          : 'Put the people you’d call in one place, before you need them.'}</div>
        <div class="board-progress">
          <div class="fav-bar" aria-hidden="true"><span style="width:${total ? Math.round((filled / total) * 100) : 0}%"></span></div>
          <span class="board-progress-count">${total ? Math.round((filled / total) * 100) : 0}%</span>
        </div>
        <div class="board-progress-note">${escapeHtml(boardProgressNote(filled, total))} · ${filled} of ${total}</div>
      </div>
    </div>`;
}

function renderBoardSection() {
  const filled = boardFilledCount();
  const total = boardSlotCount();
  return `
    ${boardHeroHtml(filled, total)}

    <div class="board-lede-2">Explore further and fill in:</div>

    ${boardQuickRailHtml()}

    ${BOARD_AREAS.map(area => `
      <div class="board-area">
        <div class="board-area-head">${area.emoji} ${escapeHtml(area.label)}</div>
        <div class="board-slots">${area.slots.map(sl => boardSlotHtml(area, sl)).join('')}</div>
      </div>`).join('')}`;
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
    ${renderBoardSection()}

    <!-- What the page used to open with. Still a tap away, no longer first. -->
    <div class="page-band"><span>Activity</span></div>
    ${trackingCard}
    ${renderLoggedOrdersCard()}
    ${messagesCard}
  </div>`;
}

let mapWaitAttempts = 0;
let graftrMapInstance = null;
let courierMarkerInstance = null;
let liveAnimationInterval = null;

const STORE_ADDRESS = "Brownlow Wy., Brownlow Fold, Bolton BL1 3UB";
const STORE_COORDS = [53.587892, -2.43748];

async function initGraftrLiveMap() {
  const container = document.getElementById('graftr-leaflet-map');
  if (!container) return;

  // Leaflet loads async now, so it can still be in flight if someone reaches
  // tracking within the first moment. Wait for it rather than returning to a
  // blank panel that never fills.
  if (typeof L === 'undefined') {
    if (mapWaitAttempts++ < 40) setTimeout(initGraftrLiveMap, 150);
    return;
  }
  mapWaitAttempts = 0;

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

  // Operators only — see isAdmin.
  const adminBar = isAdmin() ? `
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
        ${backBar('setAuthRole', 'Vendaru', 'shopper')}
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
      <!-- A section steps back to the page it belongs to; the page itself
           steps out to the customer site, which is a different app and so a
           real navigation rather than a screen change. -->
      ${tab === 'page'
        ? backBar('setAuthRole', 'Vendaru', 'shopper')
        : backBar('setBusinessTab', 'Back', 'page')}

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
  'shopper-favourites': renderShopperFavourites,
  'shopper-business': renderShopperBusiness,
  'business-dashboard': renderBusinessDashboard,
};

// The AdSense unit, kept as one long-lived element.
//
// Two things about this app make the pasted snippet not work as written: a
// <script> set through innerHTML never runs, so the push that activates the
// unit has to live in code; and render() rebuilds #app wholesale, so an <ins>
// written into the template would be destroyed and recreated on every render,
// asking for a fresh ad each time. So the element is created once, pushed
// once, and moved into whichever socket is on the page now.
const AD_CLIENT = 'ca-pub-8020577058635926';

// Dropped at the foot of a content page. Only ever one on screen — a single
// screen renders at a time — so the one unit moves to whichever is showing.
function adSlotHtml() {
  return '<div id="ad-multiplex" class="ad-slot"></div>';
}

// --- Ads in the card grid -------------------------------------------------
// An ad taking a card's place in the run, so it reads as part of the grid
// rather than a block bolted onto the page. The responsive display unit sizes
// itself to whatever box it's in, which is what makes that work.
const AD_CARD_SLOT = '9817285420';

function adInFeedConfigured() {
  return !!AD_CARD_SLOT;
}

function adFeedSlotHtml(index) {
  return `<div class="ad-card" data-ad-feed="${index}"></div>`;
}

// Every unit is kept and reused by key. A key's element is built and pushed
// once, then moved into whichever socket carries that key now.
const adNodes = new Map();

// AdSense marks a slot it processed but couldn't fill as data-ad-status
// "unfilled". Left alone that's a blank card sitting in the run, so the card
// is told to stand down. Watched rather than polled: the status is set
// whenever the ad resolves, which isn't on a schedule we can guess.
function watchFill(host, ins) {
  const sync = () => {
    host.classList.toggle('is-unfilled', ins.getAttribute('data-ad-status') === 'unfilled');
  };
  sync();
  new MutationObserver(sync).observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] });
}

function mountAdInto(host, key, build) {
  let node = adNodes.get(key);
  if (!node) {
    node = build();
    adNodes.set(key, node);
    host.appendChild(node);
    watchFill(host, node);
    // Queues whether or not the loader has arrived — it's an array until then.
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) { /* blocked, offline, or an ad blocker: leave the gap empty */ }
    return;
  }
  // Already filled: move it rather than replace it, so no second request.
  if (node.parentElement !== host) {
    host.appendChild(node);
    watchFill(host, node);
  }
}

function mountAdUnit() {
  const foot = root.querySelector('#ad-multiplex');
  if (foot) {
    mountAdInto(foot, 'multiplex', () => {
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-format', 'autorelaxed');
      ins.setAttribute('data-ad-client', AD_CLIENT);
      ins.setAttribute('data-ad-slot', '9901045905');
      return ins;
    });
  }

  if (!adInFeedConfigured()) return;
  root.querySelectorAll('[data-ad-feed]').forEach((host) => {
    mountAdInto(host, 'feed-' + host.dataset.adFeed, () => {
      const ins = document.createElement('ins');
      ins.className = 'adsbygoogle';
      ins.style.display = 'block';
      ins.setAttribute('data-ad-format', 'auto');
      // The unit's own snippet asks for full-width-responsive, which on a
      // phone stretches an ad to the viewport. Inside a card that would burst
      // the grid, so here it sizes to the card instead.
      ins.setAttribute('data-full-width-responsive', 'false');
      ins.setAttribute('data-ad-client', AD_CLIENT);
      ins.setAttribute('data-ad-slot', AD_CARD_SLOT);
      return ins;
    });
  });
}

function render() {
  // Before anything is measured or drawn: it records the page being left, and
  // the back button below reads that to know where it goes.
  syncUrl();

  // Ad placement counts across the page being built, so it starts from zero.
  resetAdCards();

  // Added here rather than inside each renderer so no customer screen can ship
  // without a way back — including any added later.
  // No Back bar: every screen has its own address and the browser's own Back
  // steps through them, so a second one on the page was the same button twice.
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
  const bookingPicker = renderBookingPickerModal();

  root.innerHTML = `
    <div class="app-scroll" style="flex:1;overflow:auto;padding-top:calc(56px + env(safe-area-inset-top, 0px));${bottomPad}">${content}</div>
    ${tabs}
    ${aiDrawer}
    ${addressModal}
    ${checkoutModal}
    ${authModal}
    ${termsModal}
    ${bookingPicker}
  `;

  mountAdUnit();

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

  if (state.pendingBoardScroll) {
    const el = root.querySelector(`[data-slot="${state.pendingBoardScroll}"]`);
    if (el) el.scrollIntoView({ block: 'center' });
    state.pendingBoardScroll = null;
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
    const sub = cartTotal();
    // One flat fee, whatever the basket holds.
    const deliveryFee = SERVICE_FEE;
    const bookings = bookingLines();

    const billedLines = lines.map(l => ({
      name: l.product.name,
      qty: l.qty,
      unitPrice: l.product.estimated_price_gbp,
    }));

    // Each booking bills as its own line so it shows on the Stripe receipt.
    bookings.forEach(bk => {
      billedLines.push({ name: `${bk.serviceName} — ${bk.businessName}`, qty: 1, unitPrice: bk.price });
    });

    const snapshot = {
      items: lines.map(l => ({
        name: l.product.name,
        qty: l.qty,
        price: l.product.estimated_price_gbp,
      })),
      subtotal: sub + bookingsTotal(),
      deliveryFee,
      bookings: bookings.map(bk => ({ businessId: bk.businessId, businessName: bk.businessName, serviceId: bk.serviceId, serviceName: bk.serviceName, price: bk.price, at: bk.at })),
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
      { role: 'bot', text: "👋 Hi! I'm your Vendaru AI Assistant. Ask me to find items, recommend groceries, or locate verified local UK services!" }
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

    // Each render rebuilds the panel and destroys the composer, so the caret
    // goes with it — and on a phone the keyboard drops after every message.
    // Only restore it if the composer had focus: tapping a suggestion chip
    // shouldn't summon the keyboard.
    const keepFocus = document.activeElement && document.activeElement.id === 'ai-chat-input';
    const restoreFocus = () => {
      if (!keepFocus) return;
      const el = document.getElementById('ai-chat-input');
      if (el) el.focus();
    };

    state.aiMessages.push({ role: 'user', text: query });
    state.aiInput = '';
    state.aiLoading = true;
    render();
    restoreFocus();

    setTimeout(async () => {
      let replyText = "";
      try {
        // Without a deadline a stalled /api/chat leaves aiLoading stuck on
        // forever, and the guard at the top of this function then silently
        // swallows every later send — the composer and quick chips just stop
        // responding. The abort cancels the request; the race is what
        // guarantees we carry on, since a promise that never settles never
        // sees the signal either way. 8s, then the local engine answers.
        const abort = new AbortController();
        let deadline;
        const timeout = new Promise((_, reject) => {
          deadline = setTimeout(() => { abort.abort(); reject(new Error('ai-timeout')); }, 8000);
        });
        try {
          const res = await Promise.race([
            fetch('/api/chat', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prompt: query }),
              signal: abort.signal
            }),
            timeout
          ]);
          if (res.ok) {
            const data = await Promise.race([res.json(), timeout]);
            replyText = data.reply;
          }
        } finally {
          clearTimeout(deadline);
        }
      } catch (err) {
        // Fallback to client query engine
      }

      try {
        if (!replyText) {
          replyText = processVendaruAiQuery(query);
        }
        state.aiMessages.push({ role: 'bot', text: replyText });
      } finally {
        // Must clear even if the reply blows up, or the panel deadlocks.
        state.aiLoading = false;
        render();
        restoreFocus();
      }
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
    saveBusinesses(fresh);
    state.businessTab = 'page';
    state.businessEditor = null;
    if (isAdmin()) state.adminEditingId = fresh.id;   // edit the new one straight away
    render();
  },
  // --- membership ----------------------------------------------------------
  setMemberBilling: (id) => { state.memberBilling = id === 'annual' ? 'annual' : 'monthly'; state.memberError = null; render(); },
  setMemberChoice: (id) => { state.memberChoice = String(id); state.memberError = null; render(); },

  // Bought through the same endpoint the listing plans use, so there is one
  // billing path to keep working rather than two.
  subscribeMembership: async () => {
    if (state.memberBuying) return;
    const billing = state.memberBilling || (state.membership || {}).billing || 'monthly';
    const tier = memberTierById(state.memberChoice || DEFAULT_MEMBER_TIER);
    if (tier.rank === 0) return;

    state.memberBuying = true;
    state.memberError = null;
    render();

    // Held so the tier can be applied when Stripe sends the browser back.
    const pending = { tier: tier.id, billing };
    try { localStorage.setItem(PENDING_MEMBER_KEY, JSON.stringify(pending)); } catch (e) { /* ignore */ }

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription: {
            kind: 'membership',
            name: `Vendaru ${tier.label} membership`,
            amount: memberPrice(tier, billing),
            interval: billing === 'annual' ? 'year' : 'month',
            trialDays: tier.trialDays || 0,
          },
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      // No billing backend is the expected setup locally, so apply it directly
      // rather than blocking. A real failure is surfaced instead.
      if (isPaymentBackendUnavailable(res, data)) {
        applyMembership(pending);
        state.memberBuying = false;
        render();
        return;
      }

      state.memberBuying = false;
      state.memberError = data.error ? `Subscription failed: ${data.error}` : 'Could not start the membership. Please try again.';
      try { localStorage.removeItem(PENDING_MEMBER_KEY); } catch (e) { /* ignore */ }
      render();
    } catch (err) {
      state.memberBuying = false;
      state.memberError = 'Could not reach the billing service. Please try again.';
      try { localStorage.removeItem(PENDING_MEMBER_KEY); } catch (e) { /* ignore */ }
      render();
    }
  },

  cancelMembership: () => {
    state.membership = { tier: DEFAULT_MEMBER_TIER, billing: 'monthly', since: null };
    state.memberChoice = null;
    saveMembership();
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
    saveBusinesses(mine);
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

    saveBusinesses(mine);
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
  // Retire this along with isAdmin once every business holds its own account.
  exportBusinesses: () => {
    const payload = (state.businesses || []).filter(isBusinessLive).map(b => {
      const copy = { ...b };
      delete copy.locallyEdited;   // bookkeeping for this browser, not for the repo
      return copy;
    });
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
    // Nothing left to flag as edited. Note that deleting a listing that is in
    // assets/businesses.json only holds until the next load, when the fetch
    // adds it back — undoing that needs a record of what was deleted, which
    // this doesn't keep yet.
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
    saveBusinesses(mine);
    render();
  },
  removeService: (serviceId) => {
    const mine = myBusiness();
    if (!mine) return;
    mine.services = (mine.services || []).filter(s => s.id !== String(serviceId));
    saveBusinesses(mine);
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
  newBasket: () => { state.basketCheckedOut = false; state.cart = {}; render(); },
  emptyBasket: () => { state.cart = {}; render(); },
  advanceTrack: () => { state.trackStep = Math.min(state.trackStep + 1, 3); render(); },
  // A shop card starts the request with the store already filled in.
  requestFromShop: (arg) => {
    const [name, town] = String(arg).split('|');
    state.specialRequest.storeLocation = town ? `${name}, ${town}` : name;
    state.screen = 'shopper-special-request';
    render();
  },
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
  clearSearch: () => {
    state.searchQuery = '';
    render();
  },
  setServicesView: (view) => {
    state.servicesView = view === 'icons' ? 'icons' : 'cards';
    render();
  },
  // A search spans the whole app, so switching part clears it — otherwise the
  // row looks like it did nothing while the results stay put.
  // '' is every kind. Anything unrecognised falls back to that rather than
  // leaving the band filtered to a category that no longer exists.
  // One slot's chooser at a time — two open lists on a page of slots is a mess
  // to read and nobody is filling two at once.
  // The rail's shortcut: open that slot and take them to it, since the slot it
  // opens is usually well below the fold.
  // One open at a time: a column of expanded cards is the same scrolling
  // problem the compact card exists to avoid.
  toggleBoardCard: (slotId) => {
    state.expandedBoardSlot = state.expandedBoardSlot === String(slotId) ? null : String(slotId);
    render();
  },
  quickBoardSlot: (slotId) => {
    // A taken slot has nothing to choose — tapping it goes to it, and Change on
    // the card is how it gets swapped.
    state.openBoardPicker = boardBusiness(slotId) ? null : String(slotId);
    state.pendingBoardScroll = String(slotId);
    render();
  },
  toggleBoardPicker: (slotId) => {
    state.openBoardPicker = state.openBoardPicker === slotId ? null : String(slotId);
    render();
  },
  setBoardSlot: (arg) => {
    const [slotId, bizId] = String(arg).split('|');
    if (!slotId || !bizId) return;
    state.board = { ...(state.board || {}), [slotId]: bizId };
    state.openBoardPicker = null;
    saveBoard();
    render();
  },
  clearBoardSlot: (slotId) => {
    const next = { ...(state.board || {}) };
    delete next[String(slotId)];
    state.board = next;
    // Straight back to choosing, since Change is only ever pressed to swap.
    state.openBoardPicker = String(slotId);
    saveBoard();
    render();
  },
  setShopCategory: (cat) => {
    state.shopCategory = shopCategories().indexOf(cat) === -1 ? '' : cat;
    render();
  },
  toggleLocationPicker: () => {
    state.showLocationPicker = !state.showLocationPicker;
    render();
  },
  setUserLocation: (city) => {
    state.userLocation = String(city === undefined ? '' : city);
    try { localStorage.setItem('graftr_user_location', state.userLocation); } catch (e) { /* ignore */ }
    state.showLocationPicker = false;
    render();
  },
  // Resolved against the city table rather than a geocoding service, so it
  // works with no key and no network beyond the browser's own fix.
  detectUserLocation: () => {
    if (!navigator.geolocation) {
      state.locationNotice = 'This browser can’t share a location. Pick a city instead.';
      render();
      return;
    }
    const previous = state.userLocation || '';
    state.userLocation = '📡 Locating…';
    state.locationNotice = null;
    render();
    navigator.geolocation.getCurrentPosition(
      (pos) => actions.setUserLocation(nearestCity(pos.coords.latitude, pos.coords.longitude) || previous),
      () => {
        // Denied or timed out — put back whatever they had rather than
        // leaving the button reading "Locating…" for ever.
        state.locationNotice = 'Couldn’t get your location. Pick a city instead.';
        actions.setUserLocation(previous);
      },
      { timeout: 8000, maximumAge: 300000 }
    );
  },
  goFavourites: () => { state.screen = 'shopper-favourites'; render(); },
  // Leaving the sign-in screen without signing in.
  browseAsGuest: () => {
    state.mode = 'shopper';
    state.screen = 'shopper-shop';
    render();
  },
  // The screen has an address of its own now, so it can be linked to and
  // returned from. mode goes null so the tab bar doesn't frame it.
  goLogin: () => {
    state.mode = null;
    state.authRole = PATH_ROLE;
    state.screen = 'login';
    render();
  },
  toggleFavPicker: (catId) => {
    const id = String(catId);
    state.openFavPicker = state.openFavPicker === id ? null : id;
    render();
  },
  // Choosing from the list fills the slot and closes it — one gesture.
  pickFavourite: (id) => {
    const key = String(id);
    const list = state.favourites || (state.favourites = []);
    if (list.indexOf(key) === -1) list.push(key);
    saveFavourites();
    state.openFavPicker = null;
    render();
  },
  toggleFavourite: (id) => {
    const key = String(id);
    const list = state.favourites || (state.favourites = []);
    const at = list.indexOf(key);
    if (at === -1) list.push(key); else list.splice(at, 1);
    saveFavourites();
    render();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  root = document.getElementById('app');
  root.addEventListener('click', (e) => {
    // Only a real upload control may swallow the tap. Matching the class alone
    // also caught the plain images shoppers see, killing the card links.
    if (e.target.closest('label.card-image') || e.target.closest('label.product-thumb')) return;
    // A genuine link inside a card — tel:, an external site — must navigate.
    // Without this the card's own action claims it and preventDefault kills it.
    if (e.target.closest('a[href]')) return;
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = actions[el.dataset.action];
    if (!action) return;
    e.preventDefault();
    const arg = el.dataset.arg;
    const parsedArg = arg === undefined ? undefined : (/^-?\d+$/.test(arg) ? Number(arg) : arg);
    action(parsedArg);
  });
  root.addEventListener('change', (e) => {
    // Swapping a product thumbnail is an operator job. The control isn't
    // rendered for anyone else, but the handler stays live, so anything that got
    // an input onto the page could still write over an image. Held shut here as
    // well as hidden in the markup.
    const productInput = isAdmin() && e.target.closest('input[type="file"][data-upload-product]');
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
          saveBusinesses(mine);
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
          saveBusinesses(mine);
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
          saveBusinesses(mine);
          render();
        };
        reader.readAsDataURL(galleryInput.files[0]);
      }
    }
  });
  // Escape closes the chat. Bound to the document, not root, so it still works
  // if focus has left the panel.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.aiChatOpen) {
      e.preventDefault();
      actions.toggleAiChat();
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
    } else if (path === 'listTitle') {
      state.listTitle = el.value;
      saveListTitle();
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
        saveBusinesses(mine);
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
  // The browser's own Back/Forward. syncUrl only pushes when the path really
  // changes, so re-rendering here can't push a duplicate entry back on.
  window.addEventListener('popstate', () => {
    if (applyRoute(window.location.pathname)) render();
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
  // business is a matter of committing assets/businesses.json. The request was
  // started by a line in the page head while this file was still downloading,
  // so by now it has usually landed; falling back to asking here keeps the app
  // working if it's opened without that page, from a file:// copy for instance.
  (window.__vendaruListings || fetch('assets/businesses.json', { cache: 'no-cache' })
    .then(res => (res.ok ? res.json() : null))
    .catch(() => null))
    .then(list => {
      if (!Array.isArray(list) || !list.length) return;
      // This file is the source of truth for what's listed; what's held here is
      // either a visitor's own listing or one they've edited.
      const published = new Map(list.filter(b => b && b.id).map(b => [b.id, b]));
      state.businesses = state.businesses
        // Published wins, except over a listing edited in this browser — that
        // work is unsaved-to-the-repo, not stale, and overwriting it loses it.
        .map(b => (b.locallyEdited ? b : (published.get(b.id) || b)))
        .concat(list.filter(b => b && b.id && !state.businesses.some(x => x.id === b.id)));
      // A /listing/<id> link is resolved before this file arrives, so it will
      // have fallen back to Shop and the address bar will already read /shop.
      // Retry what they actually opened, and put the address back if it takes.
      if (state.screen === 'shopper-shop' && LANDING_PATH !== window.location.pathname) {
        if (applyRoute(LANDING_PATH)) {
          window.history.replaceState({ screen: state.screen }, '', LANDING_PATH);
        }
      }
      render();
    })
    .catch(() => { /* no published file yet */ });

  // After the first paint, never before it: the band already has cards to draw.
  loadPartners();

  checkStripeRedirectResult();

  // Scheduled orders join the courier pool on their own once the window is
  // near, including for slots that came due while the app was closed.
  releaseDueScheduledOrders();
  setInterval(() => { if (releaseDueScheduledOrders()) render(); }, 30000);

  render();
});
