export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  colors: string[];
  badge?: string;
  featured?: boolean;
  bestseller?: boolean;
  stock: number;
};

const photo = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

const baseProducts: Product[] = [
  {
    id: 'p01',
    slug: 'studio-wireless-headphones',
    name: 'Studio Wireless Headphones',
    category: 'Electronics',
    brand: 'Soundcore',
    price: 129,
    originalPrice: 169,
    rating: 4.8,
    reviews: 284,
    image: photo('photo-1505740420928-5e560c06d30e'),
    images: [
      photo('photo-1505740420928-5e560c06d30e'),
      photo('photo-1484704849700-f032a568e944'),
      photo('photo-1546435770-a3e426bf472b'),
    ],
    description:
      'Immersive, balanced sound with adaptive noise cancellation and all-day comfort. Designed for focused work, long journeys and everything in between.',
    colors: ['Midnight', 'Cloud', 'Sage'],
    badge: 'Bestseller',
    featured: true,
    bestseller: true,
    stock: 18,
  },
  {
    id: 'p02',
    slug: 'everyday-runner-sneakers',
    name: 'Everyday Runner Sneakers',
    category: 'Fashion',
    brand: 'Northline',
    price: 94,
    originalPrice: 120,
    rating: 4.7,
    reviews: 193,
    image: photo('photo-1542291026-7eec264c27ff'),
    images: [
      photo('photo-1542291026-7eec264c27ff'),
      photo('photo-1608231387042-66d1773070a5'),
      photo('photo-1495555961986-6d4c1ecb7be3'),
    ],
    description:
      'A lightweight everyday sneaker with a responsive sole, breathable upper and understated silhouette that works from commute to weekend.',
    colors: ['Crimson', 'White', 'Black'],
    badge: '-22%',
    featured: true,
    bestseller: true,
    stock: 24,
  },
  {
    id: 'p03',
    slug: 'minimal-ceramic-table-lamp',
    name: 'Minimal Ceramic Table Lamp',
    category: 'Home & Living',
    brand: 'Forma',
    price: 78,
    rating: 4.9,
    reviews: 86,
    image: photo('photo-1507473885765-e6ed057f782c'),
    images: [
      photo('photo-1507473885765-e6ed057f782c'),
      photo('photo-1507473885765-bb3b2f6c2f2a'),
      photo('photo-1507473885765-6e2f5c5c0f1a'),
    ],
    description:
      'Soft ambient light meets sculptural form. A ceramic base and warm linen shade bring a calm, considered finish to bedside tables and reading corners.',
    colors: ['Ivory', 'Terracotta'],
    badge: 'New',
    featured: true,
    stock: 9,
  },
  {
    id: 'p04',
    slug: 'daily-hydration-bottle',
    name: 'Daily Hydration Bottle',
    category: 'Accessories',
    brand: 'Formwell',
    price: 32,
    originalPrice: 40,
    rating: 4.6,
    reviews: 312,
    image: photo('photo-1602143407151-7111542de6e8'),
    images: [
      photo('photo-1602143407151-7111542de6e8'),
      photo('photo-1523362628745-0c100150b504'),
      photo('photo-1602143407151-7111542de6e8'),
    ],
    description:
      'A durable, double-wall insulated bottle that keeps drinks cold for hours. A leak-resistant lid makes it an easy everyday carry.',
    colors: ['Lilac', 'Ocean', 'Stone'],
    badge: 'Popular',
    featured: true,
    stock: 42,
  },
  {
    id: 'p05',
    slug: 'everyday-crossbody-bag',
    name: 'Everyday Crossbody Bag',
    category: 'Fashion',
    brand: 'Northline',
    price: 65,
    rating: 4.5,
    reviews: 118,
    image: photo('photo-1548036328-c9fa89d128fa'),
    images: [
      photo('photo-1548036328-c9fa89d128fa'),
      photo('photo-1584917865442-de89df76afd3'),
      photo('photo-1590874103328-eac38a683ce7'),
    ],
    description:
      'A compact, versatile carryall with considered pockets and an adjustable strap. Made for the essentials you reach for every day.',
    colors: ['Sand', 'Black', 'Olive'],
    featured: true,
    stock: 13,
  },
  {
    id: 'p06',
    slug: 'smart-watch-series-one',
    name: 'Smart Watch Series One',
    category: 'Electronics',
    brand: 'Aster',
    price: 189,
    originalPrice: 229,
    rating: 4.7,
    reviews: 156,
    image: photo('photo-1523275335684-37898b6baf30'),
    images: [
      photo('photo-1523275335684-37898b6baf30'),
      photo('photo-1508685096489-7aacd43bd3b1'),
      photo('photo-1434493789847-2f02dc6ca35d'),
    ],
    description:
      'A clean, bright display, thoughtful activity tracking and helpful notifications in a slim, comfortable design.',
    colors: ['Graphite', 'Silver'],
    badge: 'Save 17%',
    featured: true,
    stock: 7,
  },
  {
    id: 'p07',
    slug: 'botanical-face-serum',
    name: 'Botanical Face Serum',
    category: 'Beauty',
    brand: 'Kindred',
    price: 38,
    rating: 4.8,
    reviews: 221,
    image: photo('photo-1608248543803-ba4f8c70ae0b'),
    images: [
      photo('photo-1608248543803-ba4f8c70ae0b'),
      photo('photo-1601049541289-9b1b7bbbfe19'),
      photo('photo-1556229010-6c3f2c9ca5f8'),
    ],
    description:
      'A lightweight daily serum formulated for a comfortable, hydrated feel. A simple addition to a consistent skincare routine.',
    colors: ['30 ml'],
    badge: 'Clean beauty',
    featured: true,
    stock: 31,
  },
  {
    id: 'p08',
    slug: 'weekend-travel-backpack',
    name: 'Weekend Travel Backpack',
    category: 'Accessories',
    brand: 'Formwell',
    price: 112,
    originalPrice: 140,
    rating: 4.6,
    reviews: 94,
    image: photo('photo-1553062407-98eeb64c6a62'),
    images: [
      photo('photo-1553062407-98eeb64c6a62'),
      photo('photo-1622560480654-d96214fdc887'),
      photo('photo-1553062407-98eeb64c6a62'),
    ],
    description:
      'A practical carry-on backpack with a padded laptop sleeve, easy-access pockets and a structured shape that keeps its form.',
    colors: ['Black', 'Moss'],
    featured: true,
    stock: 16,
  },
  {
    id: 'p09',
    slug: 'linen-cushion-cover',
    name: 'Linen Cushion Cover',
    category: 'Home & Living',
    brand: 'Forma',
    price: 26,
    rating: 4.4,
    reviews: 67,
    image: photo('photo-1584100936595-c0654b55a2e2'),
    images: [
      photo('photo-1584100936595-c0654b55a2e2'),
      photo('photo-1616486338812-3dadae4b4ace'),
      photo('photo-1600210492486-724fe5c67fb0'),
    ],
    description:
      'A tactile linen-blend cover that adds a relaxed layer to sofas, beds and reading nooks. Insert sold separately.',
    colors: ['Oat', 'Clay', 'Forest'],
    stock: 20,
  },
  {
    id: 'p10',
    slug: 'compact-bluetooth-speaker',
    name: 'Compact Bluetooth Speaker',
    category: 'Electronics',
    brand: 'Soundcore',
    price: 59,
    rating: 4.6,
    reviews: 402,
    image: photo('photo-1608043152269-423dbba4e7e1'),
    images: [
      photo('photo-1608043152269-423dbba4e7e1'),
      photo('photo-1589003077984-894e133d102e'),
      photo('photo-1608043152269-423dbba4e7e1'),
    ],
    description:
      'Room-filling sound in a compact, portable form. Pair quickly and bring your favorite playlists from desk to outdoors.',
    colors: ['Blue', 'Black', 'Coral'],
    badge: 'Top rated',
    bestseller: true,
    stock: 28,
  },
  {
    id: 'p11',
    slug: 'classic-sunglasses',
    name: 'Classic Everyday Sunglasses',
    category: 'Fashion',
    brand: 'Northline',
    price: 49,
    originalPrice: 64,
    rating: 4.5,
    reviews: 73,
    image: photo('photo-1511499767150-a48a237f0083'),
    images: [
      photo('photo-1511499767150-a48a237f0083'),
      photo('photo-1517841905240-472988babdf9'),
      photo('photo-1508296695146-257a814070b4'),
    ],
    description:
      'A timeless frame with comfortable proportions and UV-protective lenses. An easy finishing touch for sunny days.',
    colors: ['Tortoise', 'Black'],
    stock: 14,
  },
  {
    id: 'p12',
    slug: 'soft-knit-throw',
    name: 'Soft Knit Throw',
    category: 'Home & Living',
    brand: 'Forma',
    price: 84,
    rating: 4.9,
    reviews: 51,
    image: photo('photo-1600369671236-e74521d4b6ad'),
    images: [
      photo('photo-1600369671236-e74521d4b6ad'),
      photo('photo-1616486338812-3dadae4b4ace'),
      photo('photo-1600210492486-724fe5c67fb0'),
    ],
    description:
      'A cozy textured throw for slow mornings and cool evenings. Soft, easy to style and generous enough to share.',
    colors: ['Cream', 'Sage'],
    badge: 'New',
    stock: 11,
  },
  {
    id: 'p13',
    slug: 'daily-skin-care-set',
    name: 'Daily Skin Care Set',
    category: 'Beauty',
    brand: 'Kindred',
    price: 72,
    originalPrice: 88,
    rating: 4.7,
    reviews: 139,
    image: photo('photo-1556229010-6c3f2c9ca5f8'),
    images: [
      photo('photo-1556229010-6c3f2c9ca5f8'),
      photo('photo-1608248543803-ba4f8c70ae0b'),
      photo('photo-1601049541289-9b1b7bbbfe19'),
    ],
    description:
      'A streamlined set of daily essentials for a simple morning and evening routine. Thoughtfully packaged and easy to gift.',
    colors: ['Set'],
    stock: 19,
  },
  {
    id: 'p14',
    slug: 'resistance-training-kit',
    name: 'Resistance Training Kit',
    category: 'Sports',
    brand: 'Motion Lab',
    price: 44,
    rating: 4.6,
    reviews: 88,
    image: photo('photo-1598289431512-b97b0917affc'),
    images: [
      photo('photo-1598289431512-b97b0917affc'),
      photo('photo-1518611012118-696072aa579a'),
      photo('photo-1571019613454-1cb2f99b2d8b'),
    ],
    description:
      'A versatile home-training kit with multiple resistance levels for warmups, strength sessions and mobility work.',
    colors: ['Set'],
    stock: 35,
  },
  {
    id: 'p15',
    slug: 'performance-yoga-mat',
    name: 'Performance Yoga Mat',
    category: 'Sports',
    brand: 'Motion Lab',
    price: 58,
    rating: 4.8,
    reviews: 164,
    image: photo('photo-1603988363607-e1e4a66962c3'),
    images: [
      photo('photo-1603988363607-e1e4a66962c3'),
      photo('photo-1599447421416-3414500d18a5'),
      photo('photo-1518611012118-696072aa579a'),
    ],
    description:
      'A supportive, grippy surface for stretching, yoga and floor workouts. Easy to roll and carry between sessions.',
    colors: ['Mauve', 'Charcoal'],
    badge: 'Top rated',
    stock: 22,
  },
];

const extraNames: Record<string, string[]> = {
  Electronics: [
    'Portable Desk Speaker',
    'Noise-Canceling Earbuds',
    'Wireless Charging Stand',
    'Smart Home Hub',
    'Compact Digital Camera',
    'USB-C Travel Charger',
    'Mechanical Desk Keyboard',
    'Portable Power Bank',
  ],
  Fashion: [
    'Relaxed Cotton Shirt',
    'Everyday Canvas Tote',
    'Classic Leather Belt',
    'Weekend Knit Sweater',
    'Essential Straight Jeans',
    'Lightweight Overshirt',
    'Minimal Leather Wallet',
  ],
  'Home & Living': [
    'Ribbed Glass Vase',
    'Sculptural Ceramic Bowl',
    'Soft Cotton Bedding Set',
    'Oak Desk Organizer',
    'Textured Area Rug',
    'Stoneware Coffee Set',
    'Woven Storage Basket',
  ],
  Beauty: [
    'Gentle Daily Cleanser',
    'Hydrating Body Lotion',
    'Overnight Recovery Mask',
    'Daily Mineral Sunscreen',
    'Nourishing Lip Treatment',
    'Balancing Toner',
    'Essential Hand Cream',
    'Calming Face Mist',
  ],
  Accessories: [
    'Compact Tech Organizer',
    'Travel Toiletry Case',
    'Everyday Key Holder',
    'Minimal Card Wallet',
    'Packable Weekend Tote',
    'Insulated Travel Mug',
    'Everyday Belt Bag',
    'Classic Leather Keychain',
  ],
  Sports: [
    'Adjustable Jump Rope',
    'Training Grip Socks',
    'Recovery Massage Roller',
    'Lightweight Gym Duffel',
    'Stretch Mobility Strap',
    'Everyday Running Cap',
    'Core Training Sliders',
    'Quick-Dry Workout Towel',
  ],
};
const extraImages: Record<string, string[]> = {
  Electronics: [
    'photo-1505740420928-5e560c06d30e',
    'photo-1608043152269-423dbba4e7e1',
    'photo-1523275335684-37898b6baf30',
    'photo-1498049794561-7780e7231661',
    'photo-1517336714731-489689fd1ca8',
    'photo-1546868871-7041f2a55e12',
    'photo-1587829741301-dc798b83add3',
    'photo-1609091839311-d5365f9ff1c5',
  ],
  Fashion: [
    'photo-1529139574466-a303027c1d8b',
    'photo-1512436991641-6745cdb1723f',
    'photo-1483985988355-763728e1935b',
    'photo-1490481651871-ab68de25d43d',
    'photo-1548036328-c9fa89d128fa',
    'photo-1523381210434-271e8be1f52b',
    'photo-1515886657613-9f3515b0c78f',
  ],
  'Home & Living': [
    'photo-1490312278390-ab64016e0aa9',
    'photo-1616486338812-3dadae4b4ace',
    'photo-1600210492486-724fe5c67fb0',
    'photo-1507473885765-e6ed057f782c',
    'photo-1600566753086-00f18fb6b3ea',
    'photo-1600607687939-ce8a6c25118c',
    'photo-1618221195710-dd6b41faaea6',
  ],
  Beauty: [
    'photo-1608248543803-ba4f8c70ae0b',
    'photo-1556229010-6c3f2c9ca5f8',
    'photo-1601049541289-9b1b7bbbfe19',
    'photo-1596462502278-27bfdc403348',
    'photo-1571781926291-c477ebfd024b',
    'photo-1608248543803-ba4f8c70ae0b',
    'photo-1611930022073-b7a4ba5fcccd',
    'photo-1601049541289-9b1b7bbbfe19',
  ],
  Accessories: [
    'photo-1553062407-98eeb64c6a62',
    'photo-1523275335684-37898b6baf30',
    'photo-1548036328-c9fa89d128fa',
    'photo-1622560480654-d96214fdc887',
    'photo-1602143407151-7111542de6e8',
    'photo-1584917865442-de89df76afd3',
    'photo-1508296695146-257a814070b4',
    'photo-1602143407151-7111542de6e8',
  ],
  Sports: [
    'photo-1598289431512-b97b0917affc',
    'photo-1603988363607-e1e4a66962c3',
    'photo-1517836357463-d25dfeac3438',
    'photo-1571019613454-1cb2f99b2d8b',
    'photo-1518611012118-696072aa579a',
    'photo-1599447421416-3414500d18a5',
    'photo-1546483875-ad9014c88eba',
    'photo-1598289431512-b97b0917affc',
  ],
};
const extraProducts: Product[] = Object.entries(extraNames).flatMap(
  ([category, names]) => {
    const template = baseProducts.find(
      (product) => product.category === category,
    )!;
    return names.map((name, index) => {
      const imageId =
        extraImages[category][index % extraImages[category].length];
      const price = Math.max(18, template.price + ((index % 5) - 2) * 7 + 5);
      return {
        ...template,
        id: `extra-${category.toLowerCase().replace(/[^a-z]+/g, '-')}-${index + 1}`,
        slug: name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
        name,
        price,
        originalPrice: index % 3 === 0 ? price + 18 : undefined,
        image: photo(imageId),
        images: [photo(imageId), template.images[1], template.images[2]],
        badge: index % 4 === 0 ? 'Popular' : undefined,
        featured: false,
        bestseller: index % 5 === 0,
        reviews: 24 + index * 13,
        stock: 8 + index * 3,
      };
    });
  },
);
export const products: Product[] = [...baseProducts, ...extraProducts];

export const categories = [
  'Electronics',
  'Fashion',
  'Home & Living',
  'Beauty',
  'Accessories',
  'Sports',
];
export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);
export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
