const JOBS = [
  { id: '#4821', merchant: 'Morrisons Daily', address: '541 Halliwell Road, Bolton', customer: 'Priya Nair', bags: 2, distance: '1.2 mi', eta: '8 min', price: '£7.80' },
  { id: '#4822', merchant: 'Morrisons Daily', address: '541 Halliwell Road, Bolton', customer: 'Priya Nair', bags: 1, distance: '0.8 mi', eta: '6 min', price: '£6.20' },
  { id: '#4823', merchant: 'Morrisons Daily', address: '541 Halliwell Road, Bolton', customer: 'Priya Nair', bags: 1, distance: '1.5 mi', eta: '9 min', price: '£5.90' },
];

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

const PENDING_ORDER_KEY = 'graftr_pending_order';

// Shared by both the real Stripe-paid path and the no-backend-configured fallback,
// so an order is logged the same way regardless of how payment happened.
function finalizeOrder(snapshot) {
  const newId = '#' + Math.floor(4824 + Math.random() * 100);
  const newOrder = {
    id: newId,
    merchant: 'Morrisons Daily',
    timestamp: 'Just now',
    items: snapshot.items,
    subtotal: snapshot.subtotal,
    deliveryFee: snapshot.deliveryFee,
    total: snapshot.subtotal + snapshot.deliveryFee,
    status: 'Pending Courier Acceptance',
    address: snapshot.address,
    courier: null,
  };
  state.orders.unshift(newOrder);
  state.activeOrderId = newId;
  state.cart = {};
  state.showCheckoutModal = false;
  state.mode = 'shopper';
  saveLoggedOrders();
  state.screen = 'shopper-track';
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

const state = {
  screen: 'login',
  mode: null,
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
    { role: 'bot', text: "👋 Hi! I'm your Graftr AI Shopping Assistant. Ask me to find items, recommend groceries, or add products directly to your basket!" }
  ],
  aiInput: '',
  aiLoading: false,
  aiListening: false,
  aiVoiceSupported: undefined,
  courierOnline: true,
  jobIndex: 0,
  nextIndex: 1,
  pickedUp: false,
  delivered: false,
  courierLiveGps: null,
  packItems: [
    { name: 'Semi-skimmed milk 2L', qty: 1, checked: true },
    { name: 'Free range eggs x6', qty: 1, checked: true },
    { name: 'Sourdough loaf', qty: 1, checked: false },
    { name: 'Baby spinach 200g', qty: 2, checked: false },
  ],
  packDone: false,
  cashedOut: false,
  deliveryLater: false,
  courierInbox: [
    { tag: 'Job alert', text: 'New job available near you — Lewisham, £7.80', time: '2m', read: false },
    { tag: 'Support', text: 'Your document was approved ✓', time: '40m', read: false },
    { tag: 'System', text: 'Your weekly earnings summary is ready', time: '1h', read: true },
    { tag: 'Customer', text: 'Priya: "Leave it at the door please"', time: '3h', read: true },
    { tag: 'Job alert', text: 'Delivery slot starting soon — 6:00–9:00pm shift', time: 'Yesterday', read: true },
  ],
  shopperInbox: [
    { tag: 'Order update', text: 'Your Morrisons Daily order is on the way', time: '2m', read: false },
    { tag: 'Courier', text: 'Alex: "Running 5 min late, sorry!"', time: '6m', read: false },
    { tag: 'Offer', text: '20% off your next Boots order', time: '1h', read: true },
    { tag: 'Support', text: "We've refunded £3.40 for a missing item", time: 'Yesterday', read: true },
  ],
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
  return `
  <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 28px 40px;gap:26px;text-align:center;min-height:600px">
    <div style="font-size:14px;letter-spacing:2.5px;text-transform:uppercase;opacity:0.45;font-weight:700">Absolutely</div>
    <div>
      <div style="font-size:26px;font-weight:700;margin-bottom:10px;line-height:1.2">Who's delivering today?</div>
      <div style="font-size:14px;opacity:0.55;line-height:1.5;max-width:260px">Choose how you'll use Absolutely. Courier and shopper are separate accounts.</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:270px">
      <div class="press" data-action="chooseCourier" style="background:#141414;color:#fff;border-radius:16px;padding:18px;font-size:16px;font-weight:700;cursor:pointer">I'm a Courier</div>
      <div class="press" data-action="chooseShopper" style="background:#fff;color:#141414;border:1.5px solid #141414;border-radius:16px;padding:18px;font-size:16px;font-weight:700;cursor:pointer">I'm Shopping</div>
    </div>
  </div>`;
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

      if (courierMarkerInstance && (state.screen === 'shopper-track' || state.screen === 'shopper-basket')) {
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
  const job = JOBS[state.jobIndex];
  const nextJob = JOBS[state.nextIndex];

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

  let inner;

  if (state.delivered) {
    inner = `
    <div style="border:1.5px solid oklch(56% 0.17 258);border-radius:16px;padding:20px;display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;background:oklch(97% 0.02 258)">
      <div style="font-size:18px;font-weight:700">Delivered! +${job.price}</div>
      <div style="font-size:13px;opacity:0.6">Nice work on ${job.id}. Ready for the next one?</div>
      <div class="press" data-action="startNextJob" style="background:#141414;color:#fff;border-radius:20px;padding:11px 22px;font-weight:700;font-size:14px;cursor:pointer;margin-top:4px">Start next job</div>
    </div>`;
  } else {
    inner = `
    ${pendingJobsHtml}
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:16px;display:flex;flex-direction:column;gap:6px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="background:oklch(94% 0.05 258);color:oklch(42% 0.17 258);font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px">In progress</span>
        <span style="font-size:11px;opacity:0.5">Job ${job.id}</span>
      </div>
      <div style="font-size:16px;font-weight:700;margin-top:4px">${escapeHtml(job.merchant)} → ${escapeHtml(state.userProfile.address)}, ${escapeHtml(state.userProfile.postcode)}</div>
      <div style="font-size:13px;opacity:0.6">Deliver to ${escapeHtml(state.userProfile.name)} · ${job.bags} bags</div>
    </div>
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;overflow:hidden;height:150px;background:#eaf1ef">
      <svg width="100%" height="100%" viewBox="0 0 340 150" preserveAspectRatio="none">
        <line x1="0" y1="35" x2="340" y2="22" stroke="#141414" stroke-opacity="0.15" stroke-width="4"/>
        <line x1="60" y1="0" x2="90" y2="150" stroke="#141414" stroke-opacity="0.15" stroke-width="4"/>
        <line x1="0" y1="110" x2="340" y2="120" stroke="#141414" stroke-opacity="0.15" stroke-width="4"/>
        <line x1="250" y1="0" x2="220" y2="150" stroke="#141414" stroke-opacity="0.15" stroke-width="4"/>
        <path d="M60 46 Q150 24 190 70 T290 104" fill="none" stroke="oklch(56% 0.17 258)" stroke-width="3" stroke-dasharray="7 6"/>
        <circle cx="60" cy="46" r="6" fill="#fff" stroke="#141414" stroke-width="2.5"/>
        <circle cx="290" cy="104" r="7" fill="#141414"/>
      </svg>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:12.5px;opacity:0.6">
      <span>${job.distance}</span><span>ETA ${job.eta}</span><span>En route to drop-off</span>
    </div>
    <div style="display:flex;gap:10px">
      <div class="press" style="flex:1;background:#141414;color:#fff;border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px;cursor:pointer">Navigate</div>
      <div class="press" style="flex:1;background:#fff;border:1.5px solid #141414;border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px;cursor:pointer">Call customer</div>
    </div>
    <div style="display:flex;gap:10px">
      ${state.pickedUp
        ? `<div style="flex:1;border:1.5px solid rgba(20,20,20,0.15);color:rgba(20,20,20,0.4);border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px">✓ Picked up</div>`
        : `<div class="press" data-action="markPickedUp" style="flex:1;background:#fff;border:1.5px solid #141414;border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px;cursor:pointer">Mark picked up</div>`}
      ${state.pickedUp
        ? `<div class="press" data-action="markDelivered" style="flex:1;background:#141414;color:#fff;border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px;cursor:pointer">Mark delivered</div>`
        : `<div style="flex:1;background:rgba(20,20,20,0.07);color:rgba(20,20,20,0.35);border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px">Mark delivered</div>`}
    </div>
    <div style="height:1px;background:rgba(20,20,20,0.1);margin:2px 0"></div>
    <div style="font-size:12px;opacity:0.55">Next job queued</div>
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:14px;padding:10px 14px;display:flex;justify-content:space-between">
      <div><div style="font-size:13px;font-weight:600">${nextJob.id} · ${nextJob.merchant}</div><div style="font-size:11.5px;opacity:0.55">${nextJob.distance} away</div></div>
      <div style="font-size:13px;font-weight:700">${nextJob.price}</div>
    </div>`;
  }

  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:25px;font-weight:700">Activity</div>
    ${inner}
  </div>`;
}

function renderCourierEarnings() {
  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
    <div style="font-size:25px;font-weight:700">Earnings</div>
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:16px">
      <div style="font-size:12.5px;opacity:0.55">Today</div>
      <div style="font-size:30px;font-weight:700">£86.40</div>
      <div style="font-size:12px;opacity:0.55">6 jobs completed · online 4h 12m</div>
    </div>
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-size:14px;font-weight:700">This week</span><span style="font-size:13px;opacity:0.6">£412.90</span></div>
      <div style="display:flex;align-items:flex-end;gap:8px;height:60px;margin-top:10px">
        <div style="width:16px;border-radius:3px 3px 0 0;background:#141414;height:24px"></div>
        <div style="width:16px;border-radius:3px 3px 0 0;background:#141414;height:40px"></div>
        <div style="width:16px;border-radius:3px 3px 0 0;background:#141414;height:32px"></div>
        <div style="width:16px;border-radius:3px 3px 0 0;background:oklch(56% 0.17 258);height:52px"></div>
        <div style="width:16px;border-radius:3px 3px 0 0;background:oklch(56% 0.17 258);height:58px"></div>
        <div style="width:16px;border-radius:3px 3px 0 0;background:#141414;height:20px"></div>
        <div style="width:16px;border-radius:3px 3px 0 0;background:#141414;height:12px"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:11px;opacity:0.5;margin-top:4px"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
    </div>
    <div style="display:flex;gap:12px">
      <div style="flex:1;border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:14px;text-align:center"><div style="font-size:12px;opacity:0.55">Tips</div><div style="font-size:18px;font-weight:700">£38.50</div></div>
      <div style="flex:1;border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:14px;text-align:center"><div style="font-size:12px;opacity:0.55">Jobs done</div><div style="font-size:18px;font-weight:700">34</div></div>
    </div>
    <div style="border:1.5px solid oklch(56% 0.17 258);border-radius:16px;padding:16px;background:oklch(97% 0.02 258)">
      <div style="font-size:12.5px;opacity:0.6">Next payout</div>
      <div style="font-size:16px;font-weight:700">Fri 7 Aug · £412.90</div>
      ${state.cashedOut
        ? `<div style="margin-top:10px;text-align:center;font-size:14px;font-weight:700">Payout requested ✓</div>`
        : `<div class="press" data-action="cashOut" style="margin-top:10px;background:#141414;color:#fff;border-radius:20px;padding:12px;text-align:center;font-weight:700;font-size:14px;cursor:pointer">Cash out now</div>`}
      <div style="text-align:center;font-size:11px;opacity:0.5;margin-top:6px">Instant transfer · £0.50 fee</div>
    </div>
  </div>`;
}

function renderInboxList(list, toggleAction) {
  return list.map((msg, i) => {
    const dotOpacity = msg.read ? 0 : 1;
    const textWeight = msg.read ? 400 : 700;
    const wrapOpacity = msg.read ? 0.55 : 1;
    return `
    <div class="press" data-action="${toggleAction}" data-arg="${i}" style="opacity:${wrapOpacity};border:1.5px solid rgba(20,20,20,0.12);border-radius:14px;padding:12px 14px;cursor:pointer;display:flex;flex-direction:column;gap:5px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:oklch(56% 0.17 258);opacity:${dotOpacity}"></span><span style="font-size:11px;border:1.5px solid rgba(20,20,20,0.2);border-radius:20px;padding:3px 8px">${msg.tag}</span></div>
        <span style="font-size:11px;opacity:0.45">${msg.time}</span>
      </div>
      <div style="font-size:13.5px;font-weight:${textWeight}">${msg.text}</div>
    </div>`;
  }).join('');
}

function renderCourierInbox() {
  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:10px">
    <div style="font-size:25px;font-weight:700">Inbox</div>
    ${renderInboxList(state.courierInbox, 'toggleCourierRead')}
  </div>`;
}

function renderShopperInbox() {
  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:10px">
    <div style="font-size:25px;font-weight:700">Inbox</div>
    ${renderInboxList(state.shopperInbox, 'toggleShopperRead')}
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
  return `<div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:12px">
    <div style="font-size:25px;font-weight:700">Account</div>
    <div style="display:flex;align-items:center;gap:12px">
      <div style="width:44px;height:44px;border-radius:50%;border:2px solid #141414;display:flex;align-items:center;justify-content:center;font-weight:700">SW</div>
      <div><div style="font-size:15px;font-weight:700">Sam Whitfield</div><div style="font-size:12px;opacity:0.55">Courier since Mar 2024 · 4.92 ★</div></div>
    </div>
    <div data-action="toggleOnline" style="border:1.5px solid ${state.courierOnline ? '#10b981' : 'rgba(20,20,20,0.12)'};background:${state.courierOnline ? '#f0fdf4' : '#fff'};border-radius:16px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;cursor:pointer">
      <div>
        <div style="font-size:14.5px;font-weight:700">${state.courierOnline ? "🟢 Online - Live GPS Tracking ON" : "⚪ Offline - GPS Tracking OFF"}</div>
        <div style="font-size:11.5px;opacity:0.65">${state.courierOnline ? (state.courierLiveGps ? `Device GPS: ${state.courierLiveGps.lat.toFixed(4)}, ${state.courierLiveGps.lng.toFixed(4)}` : 'Streaming location to active customer maps...') : 'Turn ON to stream your real location to customer map'}</div>
      </div>
      <span style="width:34px;height:20px;border-radius:12px;background:${onlineBg};display:flex;align-items:center;padding:2px;justify-content:${onlineJustify};box-sizing:border-box"><span style="width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.25)"></span></span>
    </div>
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:14px 16px;display:flex;flex-direction:column;gap:8px">
      <div style="font-size:12px;opacity:0.55">Documents</div>
      <div style="display:flex;justify-content:space-between;font-size:13.5px"><span>Right to work</span><span>✓</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13.5px"><span>Insurance</span><span>✓</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13.5px"><span>DBS check</span><span style="font-size:11px;border:1.5px solid rgba(20,20,20,0.2);border-radius:20px;padding:2px 8px">Pending</span></div>
    </div>
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:16px;padding:4px 16px;display:flex;flex-direction:column">
      <div style="padding:11px 0;border-bottom:1px solid rgba(20,20,20,0.08);font-size:14px">Vehicle · E-bike</div>
      <div style="padding:11px 0;border-bottom:1px solid rgba(20,20,20,0.08);font-size:14px">Notifications</div>
      <div style="padding:11px 0;border-bottom:1px solid rgba(20,20,20,0.08);font-size:14px">Payment details</div>
      <div style="padding:11px 0;border-bottom:1px solid rgba(20,20,20,0.08);font-size:14px">Working areas</div>
      <div style="padding:11px 0;font-size:14px">Help &amp; support</div>
    </div>
    <div class="press" data-action="logout" style="text-align:center;font-size:14px;font-weight:700;opacity:0.55;padding:8px;cursor:pointer">Log out</div>
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
    <div style="font-size:25px;font-weight:700">Account &amp; Settings</div>
    
    <div style="display:flex;align-items:center;justify-content:space-between;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:18px;padding:16px">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:48px;height:48px;border-radius:50%;background:#141414;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px">
          ${p.name ? p.name.substring(0,2).toUpperCase() : 'PN'}
        </div>
        <div>
          <div style="font-size:16px;font-weight:700">${escapeHtml(p.name)}</div>
          <div style="font-size:12.5px;opacity:0.6">${escapeHtml(p.phone)}</div>
        </div>
      </div>
      <button type="button" data-action="openAddressModal" style="background:#fff;border:1.5px solid #141414;padding:7px 12px;border-radius:14px;font-size:12px;font-weight:700;cursor:pointer">Edit Profile</button>
    </div>

    <!-- Active Delivery Address Card -->
    <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:6px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:12px;font-weight:700;opacity:0.55;text-transform:uppercase">PRIMARY DELIVERY ADDRESS</div>
        <span class="press" data-action="openAddressModal" style="font-size:12px;font-weight:700;color:#6366f1;cursor:pointer">Change ✎</span>
      </div>
      <div style="font-size:14.5px;font-weight:700">${escapeHtml(p.address)}, ${escapeHtml(p.postcode)}</div>
      <div style="font-size:12.5px;opacity:0.65">${escapeHtml(p.city || 'London')}</div>
      ${p.instructions ? `<div style="font-size:12px;color:#475569;background:#f1f5f9;padding:6px 10px;border-radius:8px;margin-top:4px">📝 ${escapeHtml(p.instructions)}</div>` : ''}
    </div>

    <!-- Order History -->
    <div style="display:flex;flex-direction:column;gap:8px">
      <div style="font-size:13px;font-weight:700;opacity:0.55;text-transform:uppercase">YOUR LOGGED ORDERS (${state.orders.length})</div>
      ${ordersListHtml}
    </div>

    <div class="press" data-action="logout" style="text-align:center;font-size:14px;font-weight:700;opacity:0.55;padding:8px;cursor:pointer">Log out</div>
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
      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 2c-3 0-5.5 2.4-5.5 5.5C4.5 11 10 18 10 18s5.5-7 5.5-10.5C15.5 4.4 13 2 10 2z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="7.5" r="2" fill="currentColor"/></svg>
      Activity
    </div>
    <div data-action="goEarnings" style="${tabStyle('courier-earnings')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="5" width="16" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M2 9h16" stroke="currentColor" stroke-width="1.6"/><circle cx="14" cy="12.5" r="1.2" fill="currentColor"/></svg>
      Earnings
    </div>
    <div data-action="goCourierInbox" style="${tabStyle('courier-inbox')}">
      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V5z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Inbox
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
      <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H9l-4 3v-3H5a2 2 0 01-2-2V5z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
      Inbox
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
    return `Here are the top matches I found on Graftr:<br><br>${productList}<br><br>💡 <i>Tip: Say "Add ${matchedProducts[0].name.split(' ')[0]}" to add it to your basket!</i>`;
  }

  if (query.includes('delivery') || query.includes('fast') || query.includes('time')) {
    return "⚡ <b>Graftr Delivery</b>: Standard delivery takes 15–30 minutes directly from your local merchant! You can track your courier live on the order screen.";
  }

  if (query.includes('offer') || query.includes('discount') || query.includes('deal')) {
    return "🏷️ <b>Today's Hot Deals</b>:<br>• Morrisons Meal Deal Sandwiches from £2.45<br>• Walkers Crisps 6-pack for £2.20<br>• Ben & Jerry's Cookie Dough Ice Cream - £4.95";
  }

  if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hello! 👋 I'm here to help you shop on Graftr. What would you like to order today?";
  }

  return "I can help you search for groceries, check prices, recommend items, or track your delivery! Try asking: <i>'Find fresh milk'</i> or <i>'Add chocolate to basket'</i>";
}

function renderAiChatDrawer() {
  if (!state.aiChatOpen) return '';

  const msgsHtml = state.aiMessages.map(m => {
    return `<div class="ai-msg ${m.role}">${m.text}</div>`;
  }).join('');

  const loadingHtml = state.aiLoading ? `<div class="ai-msg bot" style="font-style:italic;color:#64748b;">✨ Graftr AI is thinking...</div>` : '';

  return `
    <div class="ai-modal-overlay">
      <div class="ai-chat-sheet">
        <div class="ai-sheet-header">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:32px;height:32px;border-radius:50%;background:rgba(20,20,20,0.08);display:flex;align-items:center;justify-content:center;font-size:16px">✨</div>
            <div>
              <div style="font-weight:700;font-size:15px;line-height:1.2">Graftr AI Assistant</div>
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

function renderShopperTrack() {
  const currentOrder = state.orders.find(o => o.id === state.activeOrderId) || state.orders[0];

  if (!currentOrder) {
    return `
      <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:18px;align-items:center;text-align:center;min-height:520px;justify-content:center">
        <div style="width:72px;height:72px;border-radius:50%;background:#f8fafc;border:2px solid #e2e8f0;display:flex;align-items:center;justify-content:center;font-size:36px;box-shadow:0 6px 16px rgba(0,0,0,0.06)">📦</div>
        <div>
          <div style="font-size:20px;font-weight:800">No Orders Placed Yet</div>
          <div style="font-size:13.5px;opacity:0.65;margin-top:6px;max-width:280px;line-height:1.4">
            You don't have any active orders right now. Place an order from Morrisons Daily to track your delivery live on the map!
          </div>
        </div>
        <button type="button" data-action="goShop" style="background:#141414;color:#fff;border:none;padding:14px 28px;border-radius:18px;font-size:14.5px;font-weight:800;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,0.2)">
          🛒 Start Shopping
        </button>
      </div>
    `;
  }

  const isPending = currentOrder.status === 'Pending Courier Acceptance';

  const steps = [
    { title: 'Order Confirmed', time: 'Just now', done: true },
    { title: `Courier Acceptance`, time: isPending ? 'Pending' : 'Accepted', done: !isPending },
    { title: `Out for Delivery`, time: isPending ? 'Waiting' : 'In progress', done: !isPending },
    { title: 'Delivered to ' + (currentOrder.address ? currentOrder.address.split(',')[0] : 'Home'), time: 'ETA ~8 min', done: false },
  ];

  const itemsSummary = currentOrder.items && currentOrder.items.length
    ? currentOrder.items.map(i => `${i.qty}x ${i.name}`).join(', ')
    : 'Grocery & Essentials';

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

  return `
    <div style="padding:0 18px 24px;display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;align-items:center;gap:10px;padding:4px 0">
        <div class="press" data-action="goShop" style="cursor:pointer;font-size:22px;line-height:1">‹</div>
        <div>
          <div style="font-size:18px;font-weight:700">Live Order Tracking</div>
          <div style="font-size:12px;opacity:0.6">Order ${currentOrder.id} · ${escapeHtml(currentOrder.merchant)}</div>
        </div>
      </div>

      ${pendingNoticeHtml}

      <!-- Live Interactive Leaflet Map Container -->
      <div style="position:relative">
        <div id="graftr-leaflet-map" style="width:100%;height:320px;border-radius:20px;box-shadow:0 8px 24px rgba(0,0,0,0.12);border:1px solid rgba(0,0,0,0.08);overflow:hidden;z-index:1"></div>
        <div style="position:absolute;top:12px;right:12px;z-index:2;background:rgba(255,255,255,0.92);backdrop-filter:blur(6px);padding:6px 12px;border-radius:20px;font-size:11px;font-weight:700;box-shadow:0 2px 8px rgba(0,0,0,0.15);display:flex;align-items:center;gap:6px">
          <span style="width:8px;height:8px;border-radius:50%;background:${isPending ? '#f59e0b' : '#10b981'};display:inline-block;animation:courierPulse 1.5s infinite"></span>
          ${isPending ? 'SEARCHING FOR COURIER' : 'LIVE GPS TRACKING'}
        </div>
      </div>

      <!-- Driver & ETA Status Card -->
      <div style="background:#141414;color:#fff;border-radius:20px;padding:16px;display:flex;align-items:center;justify-content:space-between;box-shadow:0 10px 24px rgba(0,0,0,0.2)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:46px;height:46px;border-radius:50%;background:#ffcbe1;color:#141414;display:flex;align-items:center;justify-content:center;font-size:22px">🚴</div>
          <div>
            <div style="font-size:15px;font-weight:700">${currentOrder.courier || 'Alex (Assigned Courier)'}</div>
            <div style="font-size:12px;opacity:0.7">Heading to ${escapeHtml(currentOrder.address || state.userProfile.address)}</div>
          </div>
        </div>
        <div style="text-align:right">
          <div style="font-size:20px;font-weight:800;color:#ffcbe1">${isPending ? 'Pending' : '~6 min'}</div>
          <div style="font-size:11px;opacity:0.7">Total £${currentOrder.total ? currentOrder.total.toFixed(2) : '0.00'}</div>
        </div>
      </div>

      <!-- Order Details Summary -->
      <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:18px;padding:14px">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b">ORDER ITEMS (${itemsSummary.length > 45 ? itemsSummary.substring(0, 45) + '...' : itemsSummary})</div>
        <div style="font-size:12.5px;opacity:0.8;margin-top:2px">Delivering to: <b>${escapeHtml(currentOrder.address || state.userProfile.address)}</b></div>
      </div>

      <!-- Timeline Progress -->
      <div style="border:1.5px solid rgba(20,20,20,0.12);border-radius:20px;padding:16px;display:flex;flex-direction:column;gap:12px">
        <div style="font-size:13px;font-weight:700;opacity:0.6">ORDER TIMELINE</div>
        ${steps.map(s => `
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:20px;height:20px;border-radius:50%;background:${s.done ? '#141414' : '#e2e8f0'};color:${s.done ? '#fff' : '#94a3b8'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">
              ${s.done ? '✓' : '•'}
            </div>
            <div style="flex:1;font-size:13.5px;font-weight:${s.done ? '600' : '400'};opacity:${s.done ? '1' : '0.55'}">${s.title}</div>
            <div style="font-size:12px;opacity:0.5">${s.time}</div>
          </div>
        `).join('')}
      </div>

      <div style="display:flex;gap:10px">
        ${currentOrder.status !== 'Cancelled' ? `<button type="button" data-action="cancelOrder" data-arg="${currentOrder.id}" style="flex:1;background:#fee2e2;color:#ef4444;border:none;padding:12px;border-radius:14px;font-weight:700;font-size:13px;cursor:pointer">❌ Cancel Order</button>` : `<button type="button" data-action="deleteOrder" data-arg="${currentOrder.id}" style="flex:1;background:#f1f5f9;color:#64748b;border:1px solid #cbd5e1;padding:12px;border-radius:14px;font-weight:700;font-size:13px;cursor:pointer">🗑️ Remove Order</button>`}
        <button type="button" data-action="toggleAiChat" style="flex:1;background:#ffcbe1;color:#141414;border:none;padding:12px;border-radius:14px;font-weight:700;font-size:13px;cursor:pointer">✨ Ask AI Assistant</button>
      </div>
    </div>
  `;
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
  'courier-inbox': renderCourierInbox,
  'courier-pack': renderCourierPack,
  'courier-account': renderCourierAccount,
  'shopper-shop': renderShopperShop,
  'shopper-browse': renderShopperBrowse,
  'shopper-basket': renderShopperBasket,
  'shopper-inbox': renderShopperInbox,
  'shopper-account': renderShopperAccount,
  'shopper-special-request': renderShopperSpecialRequest,
  'shopper-track': renderShopperTrack,
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

  root.innerHTML = `
    <div class="app-scroll" style="flex:1;overflow:auto;padding-top:56px;${bottomPad}">${content}</div>
    ${tabs}
    ${aiDrawer}
    ${addressModal}
    ${checkoutModal}
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

  if (state.screen === 'shopper-track') {
    setTimeout(initGraftrLiveMap, 50);
  } else if (state.screen === 'shopper-basket') {
    setTimeout(initGraftrBasketMap, 50);
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
}

const actions = {
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
  acceptCourierJob: (orderId) => {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'Out for Delivery';
      order.courier = 'Alex (E-bike)';
      saveLoggedOrders();
      state.shopperInbox.unshift({
        tag: 'Courier Alert',
        text: `Courier Alex accepted your Order ${order.id}! Live GPS tracking is active.`,
        time: 'Just now',
        read: false
      });
    }
    if (!state.courierOnline) {
      state.courierOnline = true;
      startCourierGpsTracking();
    }
    state.activeOrderId = orderId;
    state.mode = 'shopper';
    state.screen = 'shopper-track';
    render();
  },
  cancelOrder: (id) => {
    const targetId = id || state.activeOrderId;
    const order = state.orders.find(o => o.id === targetId);
    if (order) {
      order.status = 'Cancelled';
      saveLoggedOrders();
      state.shopperInbox.unshift({
        tag: 'Order Alert',
        text: `Order ${order.id} was successfully cancelled.`,
        time: 'Just now',
        read: false
      });
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
    state.screen = 'shopper-track';
    render();
  },
  goTrack: () => { state.screen = 'shopper-track'; render(); },
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
  goCourierInbox: () => { state.screen = 'courier-inbox'; render(); },
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
    state.courierOnline = !state.courierOnline;
    if (state.courierOnline) {
      startCourierGpsTracking();
    } else {
      stopCourierGpsTracking();
      state.courierLiveGps = null;
    }
    render();
  },
  markPickedUp: () => { state.pickedUp = true; render(); },
  markDelivered: () => { state.delivered = true; render(); },
  startNextJob: () => {
    state.jobIndex = state.nextIndex;
    state.nextIndex = (state.nextIndex + 1) % JOBS.length;
    state.pickedUp = false;
    state.delivered = false;
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
        time: 'Just now',
        read: false
      });
    }
    state.screen = 'courier-activity';
    render();
  },
  cashOut: () => { state.cashedOut = true; render(); },
  toggleDeliveryLater: () => { state.deliveryLater = !state.deliveryLater; render(); },
  toggleCourierRead: (i) => { state.courierInbox[i].read = !state.courierInbox[i].read; render(); },
  toggleShopperRead: (i) => { state.shopperInbox[i].read = !state.shopperInbox[i].read; render(); },
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
