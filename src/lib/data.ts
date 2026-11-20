import { nanoid } from 'nanoid';

export const categorySeeds = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Gadgets and electronic accessories.',
    image: `https://picsum.photos/seed/category-electronics/800/600`,
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: 'Clothing, footwear and everyday accessories.',
    image: `https://picsum.photos/seed/category-fashion/800/600`,
  },
  {
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Useful products for home and kitchen.',
    image: `https://picsum.photos/seed/category-home-kitchen/800/600`,
  },
  {
    name: 'Beauty & Personal Care',
    slug: 'beauty',
    description: 'Personal care and beauty accessories.',
    image: `https://picsum.photos/seed/category-beauty/800/600`,
  },
  {
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Fitness, sports and outdoor essentials.',
    image: `https://picsum.photos/seed/category-sports-outdoors/800/600`,
  },
  {
    name: 'Books & Stationery',
    slug: 'books-stationery',
    description: 'Stationery and creative supplies.',
    image: `https://picsum.photos/seed/category-books-stationery/800/600`,
  },
  {
    name: 'Toys & Accessories',
    slug: 'toys-accessories',
    description: 'Toys, games and useful everyday accessories.',
    image: `https://picsum.photos/seed/category-toys-accessories/800/600`,
  },
] as const;

export const productSeeds = [
  {
    id: nanoid(),
    name: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description: 'Comfortable wireless headphones with clear sound.',
    price: 4500,
    stock: 35,
    categorySlug: 'electronics',
    images: '/test.jpg',
  },
  {
    name: 'Smart Watch',
    slug: 'smart-watch',
    description: 'Smart watch with fitness and notification features.',
    price: 6500,
    stock: 24,
    categorySlug: 'electronics',
    images: Array.from(
      { length: 5 },
      (_, i) => `https://picsum.photos/seed/smart-watch-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Portable Bluetooth Speaker',
    slug: 'portable-bluetooth-speaker',
    description: 'Compact speaker for music at home or outdoors.',
    price: 3200,
    stock: 40,
    categorySlug: 'electronics',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/portable-bluetooth-speaker-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Wireless Mouse',
    slug: 'wireless-mouse',
    description: 'Ergonomic wireless mouse for everyday use.',
    price: 1200,
    stock: 60,
    categorySlug: 'electronics',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/wireless-mouse-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Mechanical Keyboard',
    slug: 'mechanical-keyboard',
    description: 'Responsive keyboard for work and gaming.',
    price: 5800,
    stock: 18,
    categorySlug: 'electronics',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/mechanical-keyboard-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'USB-C Fast Charger',
    slug: 'usb-c-fast-charger',
    description: 'Fast charging adapter for compatible devices.',
    price: 1800,
    stock: 50,
    categorySlug: 'electronics',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/usb-c-fast-charger-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Power Bank 20000mAh',
    slug: 'power-bank-20000mah',
    description: 'Portable power bank for charging on the go.',
    price: 4200,
    stock: 30,
    categorySlug: 'electronics',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/power-bank-20000mah-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'LED Desk Lamp',
    slug: 'led-desk-lamp',
    description: 'Adjustable LED lamp for your desk.',
    price: 2500,
    stock: 22,
    categorySlug: 'electronics',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/led-desk-lamp-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Webcam HD',
    slug: 'webcam-hd',
    description: 'HD webcam for online meetings and classes.',
    price: 3500,
    stock: 16,
    categorySlug: 'electronics',
    images: Array.from(
      { length: 5 },
      (_, i) => `https://picsum.photos/seed/webcam-hd-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Classic Cotton T-Shirt',
    slug: 'classic-cotton-t-shirt',
    description: 'Everyday cotton T-shirt with a comfortable fit.',
    price: 1200,
    stock: 80,
    categorySlug: 'fashion',
    images: Array.from({ length: 5 }, (_, i) => '/text.jpg'),
  },
  {
    name: 'Casual Hoodie',
    slug: 'casual-hoodie',
    description: 'Soft casual hoodie for cooler days.',
    price: 2800,
    stock: 35,
    categorySlug: 'fashion',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/casual-hoodie-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Denim Jeans',
    slug: 'denim-jeans',
    description: 'Classic denim jeans for everyday wear.',
    price: 3200,
    stock: 28,
    categorySlug: 'fashion',
    images: Array.from(
      { length: 5 },
      (_, i) => `https://picsum.photos/seed/denim-jeans-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Running Sneakers',
    slug: 'running-sneakers',
    description: 'Lightweight sneakers for everyday activities.',
    price: 4800,
    stock: 20,
    categorySlug: 'fashion',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/running-sneakers-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Leather Wallet',
    slug: 'leather-wallet',
    description: 'Minimal wallet with multiple card slots.',
    price: 1500,
    stock: 45,
    categorySlug: 'fashion',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/leather-wallet-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Classic Wrist Watch',
    slug: 'classic-wrist-watch',
    description: 'Simple wrist watch with a timeless design.',
    price: 3900,
    stock: 18,
    categorySlug: 'fashion',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/classic-wrist-watch-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Canvas Backpack',
    slug: 'canvas-backpack',
    description: 'Everyday backpack for books and essentials.',
    price: 2600,
    stock: 32,
    categorySlug: 'fashion',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/canvas-backpack-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Baseball Cap',
    slug: 'baseball-cap',
    description: 'Casual adjustable cap.',
    price: 850,
    stock: 55,
    categorySlug: 'fashion',
    images: Array.from(
      { length: 5 },
      (_, i) => `https://picsum.photos/seed/baseball-cap-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Ceramic Coffee Mug',
    slug: 'ceramic-coffee-mug',
    description: 'Reusable ceramic mug for coffee and tea.',
    price: 650,
    stock: 70,
    categorySlug: 'home-kitchen',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/ceramic-coffee-mug-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description: 'Reusable bottle for everyday hydration.',
    price: 1400,
    stock: 48,
    categorySlug: 'home-kitchen',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/stainless-steel-water-bottle-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Non-Stick Frying Pan',
    slug: 'non-stick-frying-pan',
    description: 'Everyday frying pan for home cooking.',
    price: 2200,
    stock: 25,
    categorySlug: 'home-kitchen',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/non-stick-frying-pan-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Kitchen Knife Set',
    slug: 'kitchen-knife-set',
    description: 'Multi-piece kitchen knife set.',
    price: 3500,
    stock: 15,
    categorySlug: 'home-kitchen',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/kitchen-knife-set-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Storage Container Set',
    slug: 'storage-container-set',
    description: 'Containers for organizing kitchen essentials.',
    price: 1800,
    stock: 40,
    categorySlug: 'home-kitchen',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/storage-container-set-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Decorative Table Clock',
    slug: 'decorative-table-clock',
    description: 'A simple clock for your desk or shelf.',
    price: 1600,
    stock: 20,
    categorySlug: 'home-kitchen',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/decorative-table-clock-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Soft Cushion Set',
    slug: 'soft-cushion-set',
    description: 'Decorative cushions for your living space.',
    price: 2100,
    stock: 26,
    categorySlug: 'home-kitchen',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/soft-cushion-set-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Laundry Basket',
    slug: 'laundry-basket',
    description: 'Lightweight basket for laundry organization.',
    price: 1300,
    stock: 30,
    categorySlug: 'home-kitchen',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/laundry-basket-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Daily Face Cleanser',
    slug: 'daily-face-cleanser',
    description: 'Gentle facial cleanser for daily use.',
    price: 950,
    stock: 45,
    categorySlug: 'beauty',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/daily-face-cleanser-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Moisturizing Cream',
    slug: 'moisturizing-cream',
    description: 'Daily moisturizing cream.',
    price: 1250,
    stock: 38,
    categorySlug: 'beauty',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/moisturizing-cream-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Hair Care Shampoo',
    slug: 'hair-care-shampoo',
    description: 'Everyday shampoo for hair cleansing.',
    price: 780,
    stock: 60,
    categorySlug: 'beauty',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/hair-care-shampoo-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Hair Styling Brush',
    slug: 'hair-styling-brush',
    description: 'Brush for everyday hair styling.',
    price: 550,
    stock: 50,
    categorySlug: 'beauty',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/hair-styling-brush-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Makeup Brush Set',
    slug: 'makeup-brush-set',
    description: 'Brush set for applying makeup.',
    price: 1700,
    stock: 25,
    categorySlug: 'beauty',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/makeup-brush-set-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Travel Toiletry Bag',
    slug: 'travel-toiletry-bag',
    description: 'Compact organizer for personal care items.',
    price: 1100,
    stock: 32,
    categorySlug: 'beauty',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/travel-toiletry-bag-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Bath Towel Set',
    slug: 'bath-towel-set',
    description: 'Soft towels for everyday bathroom use.',
    price: 1900,
    stock: 28,
    categorySlug: 'beauty',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/bath-towel-set-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Yoga Mat',
    slug: 'yoga-mat',
    description: 'Comfortable mat for stretching and yoga.',
    price: 1800,
    stock: 30,
    categorySlug: 'sports-outdoors',
    images: Array.from(
      { length: 5 },
      (_, i) => `https://picsum.photos/seed/yoga-mat-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Sports Water Bottle',
    slug: 'sports-water-bottle',
    description: 'Reusable bottle for workouts and outdoor use.',
    price: 750,
    stock: 55,
    categorySlug: 'sports-outdoors',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/sports-water-bottle-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Skipping Rope',
    slug: 'skipping-rope',
    description: 'Adjustable skipping rope for exercise.',
    price: 500,
    stock: 65,
    categorySlug: 'sports-outdoors',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/skipping-rope-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Football',
    slug: 'football',
    description: 'Durable football for recreational play.',
    price: 1600,
    stock: 24,
    categorySlug: 'sports-outdoors',
    images: Array.from(
      { length: 5 },
      (_, i) => `https://picsum.photos/seed/football-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Gym Training Gloves',
    slug: 'gym-training-gloves',
    description: 'Training gloves for gym workouts.',
    price: 950,
    stock: 35,
    categorySlug: 'sports-outdoors',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/gym-training-gloves-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Camping Backpack',
    slug: 'camping-backpack',
    description: 'Spacious backpack for outdoor trips.',
    price: 5200,
    stock: 12,
    categorySlug: 'sports-outdoors',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/camping-backpack-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Insulated Travel Flask',
    slug: 'insulated-travel-flask',
    description: 'Flask for keeping drinks at temperature.',
    price: 2100,
    stock: 22,
    categorySlug: 'sports-outdoors',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/insulated-travel-flask-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Hardcover Notebook',
    slug: 'hardcover-notebook',
    description: 'Notebook for notes, ideas and planning.',
    price: 450,
    stock: 100,
    categorySlug: 'books-stationery',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/hardcover-notebook-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Premium Pen Set',
    slug: 'premium-pen-set',
    description: 'Set of smooth-writing pens.',
    price: 600,
    stock: 75,
    categorySlug: 'books-stationery',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/premium-pen-set-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Desk Organizer',
    slug: 'desk-organizer',
    description: 'Organizer for stationery and desk accessories.',
    price: 950,
    stock: 40,
    categorySlug: 'books-stationery',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/desk-organizer-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Color Pencil Set',
    slug: 'color-pencil-set',
    description: 'Color pencils for drawing and creative projects.',
    price: 700,
    stock: 50,
    categorySlug: 'books-stationery',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/color-pencil-set-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Study Table Calendar',
    slug: 'study-table-calendar',
    description: 'Compact calendar for desk planning.',
    price: 500,
    stock: 45,
    categorySlug: 'books-stationery',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/study-table-calendar-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Building Blocks Set',
    slug: 'building-blocks-set',
    description: 'Creative building blocks for imaginative play.',
    price: 2200,
    stock: 20,
    categorySlug: 'toys-accessories',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/building-blocks-set-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Puzzle Game',
    slug: 'puzzle-game',
    description: 'Puzzle game for problem-solving fun.',
    price: 850,
    stock: 30,
    categorySlug: 'toys-accessories',
    images: Array.from(
      { length: 5 },
      (_, i) => `https://picsum.photos/seed/puzzle-game-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Plush Teddy Bear',
    slug: 'plush-teddy-bear',
    description: 'Soft plush toy for gifting and decoration.',
    price: 1400,
    stock: 25,
    categorySlug: 'toys-accessories',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/plush-teddy-bear-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Mini Desk Fan',
    slug: 'mini-desk-fan',
    description: 'Compact fan for your desk.',
    price: 1900,
    stock: 18,
    categorySlug: 'toys-accessories',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/mini-desk-fan-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Phone Stand',
    slug: 'phone-stand',
    description: 'Adjustable stand for smartphones.',
    price: 450,
    stock: 70,
    categorySlug: 'toys-accessories',
    images: Array.from(
      { length: 5 },
      (_, i) => `https://picsum.photos/seed/phone-stand-view-${i + 1}/800/800`,
    ),
  },
  {
    name: 'Travel Organizer Pouch',
    slug: 'travel-organizer-pouch',
    description: 'Small pouch for organizing travel essentials.',
    price: 800,
    stock: 40,
    categorySlug: 'toys-accessories',
    images: Array.from(
      { length: 5 },
      (_, i) =>
        `https://picsum.photos/seed/travel-organizer-pouch-view-${i + 1}/800/800`,
    ),
  },
] as const;

export const userSeeds = [
  {
    name: 'Ayesha Khan',
    email: 'ayesha@example.com',
    password: 'DemoPassword123!',
    role: 'user',
  },
  {
    name: 'Hamza Ali',
    email: 'hamza@example.com',
    password: 'DemoPassword123!',
    role: 'user',
  },
  {
    name: 'Store Admin',
    email: 'admin@example.com',
    password: 'DemoPassword123!',
    role: 'admin',
  },
] as const;

export const messageSeeds = [
  {
    name: 'Ayesha Khan',
    email: 'ayesha@example.com',
    subject: 'Order question',
    message: 'Could you please share an update about delivery times?',
    status: 'unread',
    userEmail: 'ayesha@example.com',
  },
  {
    name: 'Guest Customer',
    email: 'guest@example.com',
    subject: 'Product availability',
    message: 'Will the wireless headphones be restocked soon?',
    status: 'unread',
    userEmail: null,
  },
  {
    name: 'Hamza Ali',
    email: 'hamza@example.com',
    subject: 'Return policy',
    message: 'I would like to know more about the return process.',
    status: 'read',
    userEmail: 'hamza@example.com',
  },
] as const;

export const orderSeeds = [
  {
    userEmail: 'ayesha@example.com',
    status: 'delivered',
    lines: [
      { productSlug: 'wireless-bluetooth-headphones', quantity: 1 },
      { productSlug: 'ceramic-coffee-mug', quantity: 2 },
    ],
  },
  {
    userEmail: 'hamza@example.com',
    status: 'processing',
    lines: [
      { productSlug: 'mechanical-keyboard', quantity: 1 },
      { productSlug: 'wireless-mouse', quantity: 1 },
    ],
  },
  {
    userEmail: 'ayesha@example.com',
    status: 'pending',
    lines: [
      { productSlug: 'canvas-backpack', quantity: 1 },
      { productSlug: 'hardcover-notebook', quantity: 3 },
    ],
  },
] as const;
