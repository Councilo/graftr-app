const fs = require('fs');
const path = require('path');

const categories = [
  'trades', 'real-estate', 'auto', 'beauty', 'health', 'cleaning',
  'dog-walkers', 'pets', 'tutoring', 'travel', 'legal', 'events'
];

const ukCities = [
  'Bolton & Greater Manchester', 'Manchester City Centre', 'London & South East',
  'Birmingham & Midlands', 'Leeds & West Yorkshire', 'Glasgow & West Scotland',
  'Edinburgh & Lothian', 'Bristol & South West', 'Liverpool & Merseyside',
  'Newcastle & North East', 'Cardiff & South Wales', 'Preston & Lancashire',
  'Chester & Cheshire', 'Sheffield & South Yorkshire', 'Nationwide / UK Wide'
];

// Rich, vibrant color palettes for SVG logo badges
const palettes = [
  { bg: '141414', stroke: '3b82f6', text: 'ffffff' },
  { bg: '0f172a', stroke: '10b981', text: 'ffffff' },
  { bg: '18181b', stroke: 'f59e0b', text: 'ffffff' },
  { bg: '1e1b4b', stroke: '6366f1', text: 'ffffff' },
  { bg: '1c1917', stroke: 'ec4899', text: 'ffffff' },
  { bg: '0284c7', stroke: 'ffffff', text: 'ffffff' },
  { bg: '059669', stroke: 'ffffff', text: 'ffffff' },
  { bg: '7c3aed', stroke: 'ffffff', text: 'ffffff' },
  { bg: 'b91c1c', stroke: 'ffffff', text: 'ffffff' },
  { bg: '0f766e', stroke: 'ffffff', text: 'ffffff' }
];

function makeSvgLogo(name, index) {
  const initials = (name || '?')
    .split(/\s+/)
    .filter(w => !['and', '&', 'the', 'uk', 'of', 'ltd'].includes(w.toLowerCase()))
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || name.slice(0, 2).toUpperCase();

  const p = palettes[index % palettes.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <rect width="120" height="120" rx="30" fill="#${p.bg}"/>
  <circle cx="60" cy="60" r="48" stroke="#${p.stroke}" stroke-width="4" stroke-opacity="0.5" fill="none"/>
  <text x="60" y="68" text-anchor="middle" fill="#${p.text}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="900" letter-spacing="-1">${initials}</text>
</svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// Custom local logo overrides for key brand assets already in assets/business/
const localLogos = {
  "Yopa Estate Agents": "assets/business/yopa-logo.png",
  "Yopa UK Property Sales": "assets/business/yopa-logo.png",
  "MyBuilder UK": "assets/business/mybuilder-logo.png",
  "U Travel UK": "assets/business/utravel-logo.png",
  "TaxAssist Accountants": "assets/business/tax-assist-logo.png",
  "Pixcision Stock & Studio Photography": "assets/business/pixcisionstock-logo.png",
  "Memuriah Digital Memorials": "assets/business/memuriah-logo.png",
  "Apex Gas & Plumbing Engineers": "assets/business/apex-plumbing-logo.png"
};

const localCovers = {
  "U Travel UK": "assets/business/utravel-cover.jpg",
  "Yopa Estate Agents": "assets/business/yopa-cover.jpg",
  "Yopa UK Property Sales": "assets/business/yopa-cover.jpg",
  "MyBuilder UK": "assets/business/mybuilder-cover.jpg",
  "TaxAssist Accountants": "assets/business/tax-assist-cover.jpg",
  "Pixcision Stock & Studio Photography": "assets/business/pixcisionstock-cover.jpg",
  "Memuriah Digital Memorials": "assets/business/memuriah-cover.jpg",
  "Apex Gas & Plumbing Engineers": "assets/business/apex-plumbing-cover.jpg"
};

const data = [
  // 1-10 Trades
  {
    name: "Checkatrade Verified Trades",
    category: "trades",
    tagline: "Where reputation matters — Find vetted UK builders & plumbers",
    about: "Checkatrade thoroughly checks and vets UK tradespeople so you can hire with total peace of mind. Over 12 background checks conducted on every electrician, plumber, and builder.",
    area: "Nationwide / UK Wide",
    phone: "0800 015 4550",
    coverSrc: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "Post a Job & Get 3 Verified Quotes", description: "Post your project and matched vetted local trades contact you.", price: 0, durationMins: 30 },
      { name: "Verified Trade On-Site Survey", description: "In-person assessment by a registered contractor.", price: 45, durationMins: 45 }
    ]
  },
  {
    name: "MyBuilder UK",
    category: "trades",
    tagline: "The reliable way to hire verified tradespeople",
    about: "Finding a great builder, plumber, or electrician shouldn't be a gamble. MyBuilder matches your project with vetted local tradespeople backed by customer reviews.",
    area: "UK Nationwide",
    phone: "0800 018 8297",
    coverSrc: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "Post a Job & Match Local Trades", description: "Post your home project and receive quotes from vetted builders.", price: 0, durationMins: 30 },
      { name: "Trade Consultation & Estimate", description: "On-site assessment by a certified local builder.", price: 35, durationMins: 45 }
    ]
  },
  {
    name: "Timpson Locksmiths & Key Cutting",
    category: "trades",
    tagline: "Great service by great people — Emergency locksmiths & key duplication",
    about: "Timpson is Britain's most trusted high-street service provider. Offers 24/7 mobile emergency locksmith callouts, house & car key cutting, and watch servicing.",
    area: "UK Wide / 2,000+ Branches",
    phone: "0161 946 6200",
    coverSrc: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "24/7 Emergency Locksmith Callout", description: "Fast-response mobile locksmith service for gain entry and lock changes.", price: 79, durationMins: 45 },
      { name: "Watch Battery Replacement & Pressure Test", description: "Swiss battery replacement with water resistance re-sealing.", price: 15, durationMins: 15 }
    ]
  },
  {
    name: "Apex Gas & Plumbing Engineers",
    category: "trades",
    tagline: "Gas Safe registered plumbers serving Bolton & Greater Manchester",
    about: "Apex Gas & Plumbing offers 24/7 emergency response, boiler installations, central heating repairs, and Gas Safe safety certificates for homeowners and landlords.",
    area: "Bolton & Greater Manchester",
    phone: "0800 321 9900",
    coverSrc: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "Boiler Service & Gas Safety Certificate (CP12)", description: "Annual gas boiler inspection and landlord CP12 certificate.", price: 75, durationMins: 45 },
      { name: "Emergency Plumbing & Leak Repair", description: "Callout for burst pipes, leaking radiators, or blocked drainage.", price: 85, durationMins: 60 }
    ]
  },
  {
    name: "Precision Joinery & Bespoke Alcoves",
    category: "trades",
    tagline: "Custom fitted wardrobes, alcove units, and architectural joinery",
    about: "Master carpenters creating hand-built fitted wardrobes, alcove shelving, media walls, and custom timber furniture for UK homes.",
    area: "Manchester, Bolton & Altrincham",
    phone: "0161 941 2200",
    coverSrc: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "Design & Quote Consultation", description: "On-site measurement and 3D design estimate.", price: 0, durationMins: 45 },
      { name: "Internal Door Hanging & Fitting", description: "Precision fitting of interior timber doors.", price: 60, durationMins: 90 }
    ]
  },
  {
    name: "Vanguard Security Systems & CCTV",
    category: "trades",
    tagline: "Smart 4K CCTV installation & burglar alarms",
    about: "Vanguard installs high-definition CCTV camera systems, wireless intruder alarms, and video doorbells for homes and businesses across the UK.",
    area: "Lancashire & Greater Manchester",
    phone: "0800 999 4433",
    coverSrc: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "Smart 4K CCTV 2-Camera Package & Fitting", description: "Full installation of 2 night-vision 4K cameras with smartphone live view.", price: 399, durationMins: 180 },
      { name: "Wireless Alarm System Installation", description: "Hub, motion sensors, door contacts, and siren box.", price: 249, durationMins: 120 }
    ]
  },
  {
    name: "North West Electrical & Rewiring",
    category: "trades",
    tagline: "NICEIC approved electricians for home rewiring & EV chargers",
    about: "NICEIC registered electricians specializing in consumer unit fuse box upgrades, home rewires, EV car charger installation, and EICR landlord safety certificates.",
    area: "Bolton, Wigan & Salford",
    phone: "01204 492 880",
    coverSrc: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "Landlord Electrical Safety Certificate (EICR)", description: "Complete electrical installation condition report.", price: 120, durationMins: 90 },
      { name: "7kW Home EV Car Charger Installation", description: "Supply and certified fitting of smart home car charger.", price: 499, durationMins: 240 }
    ]
  },
  {
    name: "Bolton Roofing & Heritage Slate Repairs",
    category: "trades",
    tagline: "Roof repairs, re-roofing, chimney pointing & guttering",
    about: "Family-run roofing contractors with 25+ years experience repairing slate roofs, tile roofs, flat rubber roofs, fascias, soffits, and gutters.",
    area: "Bolton, Horwich & Bury",
    phone: "01204 654 321",
    coverSrc: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "Roof Leak Inspection & Tile Repair", description: "On-roof inspection and replacement of broken tiles or slipped slates.", price: 95, durationMins: 60 },
      { name: "Gutter Cleaning & Clearance", description: "High-reach vacuum clearance of debris and downpipe unblocking.", price: 55, durationMins: 45 }
    ]
  },
  {
    name: "Fresh Coat Decorating & Plastering",
    category: "trades",
    tagline: "Flawless interior painting, wallpapering and skim plastering",
    about: "Professional painter decorators providing clean, meticulous wall painting, wallpaper hanging, and smooth plaster skimming for homes and offices.",
    area: "Greater Manchester & Cheshire",
    phone: "0161 320 8840",
    coverSrc: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "Single Room Skim Plastering", description: "Smooth plaster coat over existing walls or plasterboard.", price: 180, durationMins: 360 },
      { name: "Room Painting & Woodwork Gloss", description: "Two coats of durable emulsion plus skirtings and door frame glossing.", price: 160, durationMins: 300 }
    ]
  },
  {
    name: "Lancashire Architectural Design Studio",
    category: "trades",
    tagline: "Planning permission drawings & structural building calculations",
    about: "RIBA chartered architects assisting homeowners with single-story rear extensions, double-story side extensions, loft conversions, and local council planning submissions.",
    area: "Preston, Bolton & Manchester",
    phone: "01772 443 110",
    coverSrc: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    services: [
      { name: "Extension Initial Site Survey & Feasibility", description: "In-person measured survey and architectural feasibility report.", price: 150, durationMins: 90 },
      { name: "Full Planning Permission Drawing Package", description: "Existing & proposed elevation floorplans drawn for council submission.", price: 750, durationMins: 600 }
    ]
  }
];

// Helper to generate entries up to 100
const categoryDetails = {
  'real-estate': [
    { name: "Purplebricks Estate Agents", tagline: "The UK's leading online estate agent", phone: "0800 810 8008", cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80" },
    { name: "Yopa UK Property Sales", tagline: "Sell your home with Yopa — Fair fixed fees", phone: "0333 305 0202", cover: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
    { name: "Savills Luxury Property", tagline: "Global estate agency & premium UK homes", phone: "020 7409 8885", cover: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80" },
    { name: "Foxtons London & South East", tagline: "London's leading real estate network", phone: "020 7893 6000", cover: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80" },
    { name: "Belvoir Lettings & Property Management", tagline: "Property management specialists", phone: "01204 522 244", cover: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80" },
    { name: "Bridgfords North West Estate Agents", tagline: "Selling homes in the North West since 1832", phone: "0161 834 8822", cover: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80" },
    { name: "Connells Estate Agents", tagline: "High street property sales & lettings", phone: "0800 083 4567", cover: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
    { name: "Winkworth UK Property Consultants", tagline: "Bespoke property buying and selling", phone: "020 7355 2244", cover: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80" }
  ],
  'auto': [
    { name: "Kwik Fit Tyres & Autocentres", tagline: "The UK's number 1 tyre & MOT specialist", phone: "0800 222 111", cover: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80" },
    { name: "Halfords Autocentres UK", tagline: "Car servicing, MOT testing, brakes & batteries", phone: "0800 050 1080", cover: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80" },
    { name: "ProDrive Mobile Detailing", tagline: "Paint correction & ceramic coating specialists", phone: "07700 912384", cover: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80" },
    { name: "RAC Approved Mobile Servicing", tagline: "Breakdown recovery & vehicle health checks", phone: "0330 159 1111", cover: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80" },
    { name: "AA Mobile Mechanic Service", tagline: "Driveway car servicing & battery fitting", phone: "0800 88 77 66", cover: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80" },
    { name: "National Tyres & Autocare", tagline: "Tyres, exhausts and wheel alignment", phone: "0800 626 666", cover: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80" },
    { name: "Autoglass UK Windscreen Repair", tagline: "Chips repair & windscreen replacements", phone: "0800 36 36 36", cover: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80" },
    { name: "ChipsAway SMART Car Body Repairs", tagline: "Bumper scuffs, scratch repair & dent removal", phone: "0800 145 5118", cover: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80" },
    { name: "Bolton Auto Electrical & ECU Remapping", tagline: "Vehicle remapping & electrical fault diagnostics", phone: "01204 380 990", cover: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80" }
  ],
  'beauty': [
    { name: "Rush Hair & Beauty Salons", tagline: "Award-winning UK hairdressing & color specialists", phone: "0161 839 2000", cover: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80" },
    { name: "Toni & Guy Hairdressers", tagline: "Global salon brand & precision hair styling", phone: "020 7404 4683", cover: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80" },
    { name: "Regis Salons UK", tagline: "Contemporary hair cuts, highlights & blow drys", phone: "0800 019 3210", cover: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80" },
    { name: "Supercuts UK Salons", tagline: "Walk-in haircuts & styling for men and women", phone: "0800 988 8888", cover: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1200&q=80" },
    { name: "Skindream Aesthetics Clinic", tagline: "Hydrafacial, microneedling & anti-wrinkle care", phone: "0161 440 9920", cover: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80" },
    { name: "Townhouse Luxury Nail Bar", tagline: "The ultimate manicure & nail art studio", phone: "020 7946 0990", cover: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80" },
    { name: "Barber Barber UK", tagline: "Gentlemen's wet shaves & traditional haircuts", phone: "0161 832 9900", cover: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1200&q=80" },
    { name: "MAC Makeup Studio & Lessons", tagline: "Professional event makeup & masterclasses", phone: "0800 054 2696", cover: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80" },
    { name: "The SunLounge Tanning & Beauty", tagline: "Ergoline UV tanning beds & spray tans", phone: "01204 551 234", cover: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1200&q=80" }
  ],
  'health': [
    { name: "Bupa Dental Care UK", tagline: "High-quality private dental care across the UK", phone: "0808 271 7890", cover: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80" },
    { name: "David Lloyd Health & Fitness Clubs", tagline: "Premium UK health, tennis, spa & fitness clubs", phone: "0345 129 6700", cover: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80" },
    { name: "Nuffield Health Wellbeing Gyms", tagline: "Gyms, health assessments & private hospitals", phone: "0300 123 1286", cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80" },
    { name: "Manchester Physiotherapy & Sports Massage", tagline: "Chartered physiotherapists for back pain & rehab", phone: "0161 236 7788", cover: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80" },
    { name: "Boots Opticians UK", tagline: "Eye tests, designer glasses & contact lenses", phone: "0345 125 3752", cover: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80" },
    { name: "PureGym Personal Training", tagline: "Flexible 24/7 fitness & 1-on-1 personal training", phone: "0344 477 0005", cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80" },
    { name: "MyDentist UK Practices", tagline: "Affordable NHS & private dental practices", phone: "0345 122 9988", cover: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80" },
    { name: "Spinningfields Pilates & Reformer Studio", tagline: "Reformer pilates & core strength training", phone: "0161 834 1120", cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80" },
    { name: "Active Care Chiropractic & Alignment", tagline: "Spinal adjustments & posture rehabilitation", phone: "01204 330 990", cover: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80" }
  ],
  'cleaning': [
    { name: "Fantastic Services UK Cleaning", tagline: "Professional domestic & tenancy deep cleaning", phone: "020 3404 3444", cover: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80" },
    { name: "MOLLY MAID UK House Cleaners", tagline: "Tailored domestic cleaning for UK homes", phone: "0800 587 7500", cover: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80" },
    { name: "OvenValet Professional Oven Cleaning", tagline: "Non-toxic deep oven & BBQ cleaning", phone: "0800 140 4500", cover: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80" },
    { name: "Cleanify Domestic & Office Cleaners", tagline: "Regular home & commercial office cleaning", phone: "0161 400 3344", cover: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80" },
    { name: "Sparkle Commercial Window Cleaning", tagline: "Pure water reach-and-wash window cleaning", phone: "0800 644 1200", cover: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=1200&q=80" },
    { name: "ProSteam Carpet & Upholstery Care", tagline: "Deep extraction carpet & sofa steam clean", phone: "01204 490 120", cover: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80" },
    { name: "North West Commercial Office Sanitation", tagline: "Contract office cleaning & hygiene services", phone: "0161 990 8820", cover: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80" },
    { name: "ClearView Solar Panel & Gutter Wash", tagline: "Solar efficiency cleaning & high-reach gutters", phone: "01772 889 100", cover: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1200&q=80" }
  ],
  'dog-walkers': [
    { name: "DogBuddy UK Dog Boarding & Walkers", tagline: "The UK's largest dog sitting & walking network", phone: "020 7183 0991", cover: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80" },
    { name: "TailWaggers Dog Walking", tagline: "Group countryside adventures for active dogs", phone: "07700 900332", cover: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80" },
    { name: "Paws & Trails Country Dog Walks", tagline: "Rivington & Pennine Moors dog walking", phone: "07700 900452", cover: "https://images.unsplash.com/photo-1534361960057-19889db98d18?auto=format&fit=crop&w=1200&q=80" },
    { name: "Lead The Way Dog Sitting", tagline: "Solo dog walks & home pet sitting", phone: "0161 880 7711", cover: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80" },
    { name: "Barking Mad UK Pet Care", tagline: "Home-from-home dog boarding holidays", phone: "01524 825825", cover: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80" },
    { name: "Happy Paws Dog Boarding Bolton", tagline: "Licensed home boarding & daycare", phone: "01204 883 990", cover: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=80" },
    { name: "The Dog Walker Manchester", tagline: "City center dog walks & puppy visits", phone: "0161 332 1144", cover: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=1200&q=80" },
    { name: "Rover UK Dog Sitting", tagline: "Book trusted 5-star dog sitters near you", phone: "0800 048 8500", cover: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=80" }
  ],
  'pets': [
    { name: "Pets at Home Groom Room", tagline: "UK's favorite pet care & professional grooming", phone: "0800 328 4204", cover: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80" },
    { name: "Vets4Pets Veterinary Hospital", tagline: "24/7 emergency vet care & wellness plans", phone: "0800 011 2020", cover: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80" },
    { name: "Medivet Veterinary Practices", tagline: "Compassionate veterinary care across the UK", phone: "01923 470000", cover: "https://images.unsplash.com/photo-1599443015574-be5fe8a05783?auto=format&fit=crop&w=1200&q=80" },
    { name: "The Grooming Room Dog Spa", tagline: "Gentle canine styling & hydrobath treatments", phone: "01204 845 600", cover: "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=1200&q=80" },
    { name: "Pampered Pooches Boutique Grooming", tagline: "Luxury styling & hand stripping for dogs", phone: "0161 928 4400", cover: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1200&q=80" },
    { name: "Feline & Canine Veterinary Clinic", tagline: "Routine vaccinations, microchipping & surgery", phone: "01204 690 120", cover: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80" },
    { name: "Aquarium & Exotic Pet Specialists", tagline: "Fish, reptile & exotic pet health care", phone: "0161 740 8822", cover: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?auto=format&fit=crop&w=1200&q=80" },
    { name: "PDSA Pet Hospital UK", tagline: "Charity veterinary health care for UK pets", phone: "0800 731 2502", cover: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=80" }
  ],
  'tutoring': [
    { name: "Explore Learning UK Tutors", tagline: "Inspiring young minds — Maths & English tuition", phone: "01483 447410", cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80" },
    { name: "First Tutors UK Network", tagline: "Find private home & online tutors across the UK", phone: "0800 043 8886", cover: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80" },
    { name: "Kumon Maths & English Centers", tagline: "Self-learning Maths & English study programs", phone: "0800 854 714", cover: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80" },
    { name: "North West Academic Tutors", tagline: "GCSE, A-Level & 11+ tuition in Maths & Science", phone: "0161 720 4400", cover: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80" },
    { name: "RED Driving School UK", tagline: "Learn to drive with DVSA approved instructors", phone: "0330 332 2619", cover: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80" },
    { name: "Yamaha Music School UK", tagline: "Piano, guitar & vocal lessons for all ages", phone: "01908 369200", cover: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80" },
    { name: "MyTutor UK Online Learning", tagline: "1-on-1 subject tuition with top UK university tutors", phone: "020 3773 6020", cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" },
    { name: "Kip McGrath Education Centers", tagline: "Professional tutoring for Primary & Secondary", phone: "0800 056 7890", cover: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80" }
  ],
  'travel': [
    { name: "TUI Travel UK", tagline: "Package holidays, flights & European cruises", phone: "0203 451 2688", cover: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80" },
    { name: "U Travel UK", tagline: "Bespoke UK & European travel itineraries", phone: "0800 999 1234", cover: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" },
    { name: "National Express Coaches UK", tagline: "Coach travel to 550+ UK cities & airports", phone: "0871 781 8181", cover: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80" },
    { name: "Bolton Executive Airport Transfers", tagline: "24/7 Mercedes chauffeur transfers to Manchester Airport", phone: "01204 550 990", cover: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80" },
    { name: "Hays Travel UK Agencies", tagline: "The UK's largest independent travel agent", phone: "0800 408 4040", cover: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80" },
    { name: "Virgin Atlantic & Holidays", tagline: "Long-haul flights & luxury resort holidays", phone: "0344 557 3860", cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" },
    { name: "Trailfinders UK Travel Specialists", tagline: "Tailor-made worldwide travel & safaris", phone: "020 7368 1200", cover: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80" },
    { name: "Flight Centre UK", tagline: "Cheap flights, tailor-made trips & round-the-world", phone: "0808 256 0626", cover: "https://images.unsplash.com/photo-1476514525535-ce74f45814d1?auto=format&fit=crop&w=1200&q=80" }
  ],
  'legal': [
    { name: "TaxAssist Accountants", tagline: "Accountancy & tax advice for small businesses", phone: "0800 0188 297", cover: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80" },
    { name: "Co-op Legal Services", tagline: "Accessible fixed-fee legal advice & Will writing", phone: "0330 606 9500", cover: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80" },
    { name: "Slater and Gordon Lawyers UK", tagline: "Personal injury, employment & family solicitors", phone: "0330 041 5869", cover: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80" },
    { name: "Lancashire Will Writing & Estate Planning", tagline: "Wills, Power of Attorney & probate guidance", phone: "01204 332 110", cover: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80" },
    { name: "KPMG Small Business Accounting", tagline: "Bookkeeping, VAT returns & corporate tax", phone: "020 7311 1000", cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" },
    { name: "BDO Accountants UK", tagline: "Tax compliance, auditing & business advisory", phone: "020 7486 5888", cover: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80" },
    { name: "QualitySolicitors UK Network", tagline: "Clear legal advice with no hidden costs", phone: "0808 274 7977", cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" },
    { name: "Irwin Mitchell Solicitors", tagline: "Full-service law firm for personal & business law", phone: "0808 163 9484", cover: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80" }
  ],
  'events': [
    { name: "Pixcision Stock & Studio Photography", tagline: "High-end commercial & event photography", phone: "0161 800 9100", cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80" },
    { name: "Memuriah Digital Memorials", tagline: "Social memorial platform & digital legacies", phone: "0800 772 3000", cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80" },
    { name: "Bespoke UK Wedding & Party Planners", tagline: "Luxury wedding coordination & event styling", phone: "0161 990 4400", cover: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" },
    { name: "North West Event Sound & Lighting", tagline: "Stage, lighting & sound system hire", phone: "01204 440 220", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80" },
    { name: "Gourmet UK Event Catering", tagline: "Bespoke catering for weddings & corporate events", phone: "0161 740 9900", cover: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80" },
    { name: "Party & Venue Styling UK", tagline: "Balloon arches, floral walls & chair covers", phone: "07700 912884", cover: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80" },
    { name: "Manchester Live DJ & Band Agency", tagline: "Top live wedding bands & event DJs", phone: "0161 220 8811", cover: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80" }
  ]
};

// Build up to 100
let list = [];
let counter = 1000;

// Add initial custom trades
data.forEach(item => {
  const logo = localLogos[item.name] || makeSvgLogo(item.name, counter);
  const cover = localCovers[item.name] || item.coverSrc;
  list.push({
    id: `biz-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    ownerEmail: null,
    name: item.name,
    category: item.category,
    tagline: item.tagline,
    about: item.about,
    area: item.area,
    phone: item.phone,
    logoSrc: logo,
    coverSrc: cover,
    services: item.services.map((s, idx) => ({ id: `s-${counter}-${idx}`, ...s })),
    gallery: [],
    tier: 'featured',
    billing: 'monthly'
  });
  counter++;
});

// Add all category items
for (const cat of categories) {
  const items = categoryDetails[cat] || [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const slug = cat + '-' + i + '-' + it.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!list.some(b => b.name.toLowerCase() === it.name.toLowerCase())) {
      const logo = localLogos[it.name] || makeSvgLogo(it.name, counter);
      const cover = localCovers[it.name] || it.cover;
      list.push({
        id: `biz-${slug}`,
        ownerEmail: null,
        name: it.name,
        category: cat,
        tagline: it.tagline,
        about: `${it.name} provides professional, reliable ${cat.replace('-', ' ')} services tailored for clients in ${ukCities[counter % ukCities.length]} and across the United Kingdom. Fully insured and highly rated.`,
        area: ukCities[counter % ukCities.length],
        phone: it.phone,
        logoSrc: logo,
        coverSrc: cover,
        services: [
          { id: `s-${counter}-1`, name: `${it.name} Consultation & Estimate`, description: "In-depth initial consultation and bespoke price estimate.", price: 0, durationMins: 30 },
          { id: `s-${counter}-2`, name: `${it.name} Standard Package`, description: `Complete ${cat.replace('-', ' ')} service delivered by qualified UK professionals.`, price: 45 + (counter % 12) * 15, durationMins: 60 }
        ],
        gallery: [],
        tier: (counter % 3 === 0) ? 'priority' : 'featured',
        billing: 'monthly'
      });
      counter++;
    }
  }
}

// Write to assets/businesses.json
fs.writeFileSync(path.join(__dirname, 'assets', 'businesses.json'), JSON.stringify(list, null, 2), 'utf8');
console.log(`Generated ${list.length} unique UK businesses into assets/businesses.json`);

// Also update SEED_BUSINESSES inside app.js so app.js natively embeds all 100 businesses!
const appJsPath = path.join(__dirname, 'app.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

const seedBusinessesStr = `const SEED_BUSINESSES = ${JSON.stringify(list, null, 2)};`;

const seedRegex = /const SEED_BUSINESSES = \[\s*[\s\S]*?\n\];/;
if (seedRegex.test(appJsContent)) {
  appJsContent = appJsContent.replace(seedRegex, seedBusinessesStr);
  fs.writeFileSync(appJsPath, appJsContent, 'utf8');
  console.log(`Successfully updated SEED_BUSINESSES in app.js with ${list.length} items!`);
} else {
  console.error("Could not find SEED_BUSINESSES in app.js!");
}
