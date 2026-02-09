// Mock data for wardrobe app

export interface WardrobeItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'outerwear';
  colors: string[];
  brand?: string;
  purchaseDate: string;
  wearCount: number;
  lastWorn?: string;
  image: string;
  notes?: string;
}

export interface PlannedOutfit {
  id: string;
  date: string;
  items: string[]; // item IDs
  title?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  outfitPlanned: boolean;
  outfitId?: string;
}

export interface Activity {
  id: string;
  type: 'added' | 'planned' | 'worn';
  description: string;
  timestamp: string;
  itemId?: string;
}

// Color palette for items
export const COLOR_OPTIONS = [
  { name: 'Black', value: '#1a1a1a' },
  { name: 'White', value: '#f5f5f5' },
  { name: 'Navy', value: '#1e3a5f' },
  { name: 'Brown', value: '#8b5a2b' },
  { name: 'Beige', value: '#d4c4a8' },
  { name: 'Gray', value: '#6b7280' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Yellow', value: '#eab308' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Denim', value: '#4a6fa5' },
  { name: 'Cream', value: '#f5f0e6' },
  { name: 'Burgundy', value: '#722f37' },
];

export const CATEGORIES = [
  { id: 'tops', label: 'Tops', icon: 'shirt' },
  { id: 'bottoms', label: 'Bottoms', icon: 'ruler' },
  { id: 'shoes', label: 'Shoes', icon: 'footprints' },
  { id: 'accessories', label: 'Accessories', icon: 'watch' },
  { id: 'outerwear', label: 'Outerwear', icon: 'coat' },
] as const;

// Mock wardrobe items
export const mockItems: WardrobeItem[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    category: 'tops',
    colors: ['#f5f5f5'],
    brand: 'Uniqlo',
    purchaseDate: '2024-06-15',
    wearCount: 24,
    lastWorn: '2025-02-03',
    image: '/top.png',
  },
  {
    id: '2',
    name: 'Blue Denim Jacket',
    category: 'outerwear',
    colors: ['#4a6fa5'],
    brand: "Levi's",
    purchaseDate: '2024-03-10',
    wearCount: 18,
    lastWorn: '2025-02-01',
    image: '/dress.jpg',
  },
  {
    id: '3',
    name: 'Black Slim Jeans',
    category: 'bottoms',
    colors: ['#1a1a1a'],
    brand: 'Zara',
    purchaseDate: '2024-07-20',
    wearCount: 32,
    lastWorn: '2025-02-04',
    image: '/jeans.png',
  },
  {
    id: '4',
    name: 'Camel Wool Coat',
    category: 'outerwear',
    colors: ['#d4c4a8', '#8b5a2b'],
    brand: 'COS',
    purchaseDate: '2024-10-05',
    wearCount: 15,
    lastWorn: '2025-02-02',
    image: '/dress.png',
  },
  {
    id: '5',
    name: 'White Leather Sneakers',
    category: 'shoes',
    colors: ['#f5f5f5'],
    brand: 'Common Projects',
    purchaseDate: '2024-04-12',
    wearCount: 45,
    lastWorn: '2025-02-04',
    image: '/shoes.png',
  },
  {
    id: '6',
    name: 'Navy Crew Sweater',
    category: 'tops',
    colors: ['#1e3a5f'],
    brand: 'J.Crew',
    purchaseDate: '2024-09-18',
    wearCount: 12,
    lastWorn: '2025-01-28',
    image: '/top2.png',
  },
  {
    id: '7',
    name: 'Brown Leather Belt',
    category: 'accessories',
    colors: ['#8b5a2b'],
    brand: 'Massimo Dutti',
    purchaseDate: '2024-02-14',
    wearCount: 28,
    lastWorn: '2025-02-03',
    image: '/bag.png',
  },
  {
    id: '8',
    name: 'Beige Chinos',
    category: 'bottoms',
    colors: ['#d4c4a8'],
    brand: 'Dockers',
    purchaseDate: '2024-05-22',
    wearCount: 20,
    lastWorn: '2025-01-30',
    image: '/jeans.png',
  },
  {
    id: '9',
    name: 'Black Chelsea Boots',
    category: 'shoes',
    colors: ['#1a1a1a'],
    brand: 'Clarks',
    purchaseDate: '2024-11-08',
    wearCount: 22,
    lastWorn: '2025-02-01',
    image: '/shoes.png',
  },
  {
    id: '10',
    name: 'Burgundy Cashmere Scarf',
    category: 'accessories',
    colors: ['#722f37'],
    brand: 'Loro Piana',
    purchaseDate: '2024-12-01',
    wearCount: 8,
    lastWorn: '2025-01-25',
    image: '/bag.png',
  },
  {
    id: '11',
    name: 'Gray Hoodie',
    category: 'tops',
    colors: ['#6b7280'],
    brand: 'Nike',
    purchaseDate: '2024-08-05',
    wearCount: 19,
    lastWorn: '2025-02-02',
    image: '/top.png',
  },
  {
    id: '12',
    name: 'Dark Wash Jeans',
    category: 'bottoms',
    colors: ['#1e3a5f', '#4a6fa5'],
    brand: 'A.P.C.',
    purchaseDate: '2024-07-10',
    wearCount: 26,
    lastWorn: '2025-02-03',
    image: '/jeans.png',
  },
  {
    id: '13',
    name: 'Striped Oxford Shirt',
    category: 'tops',
    colors: ['#f5f5f5', '#3b82f6'],
    brand: 'Ralph Lauren',
    purchaseDate: '2024-04-28',
    wearCount: 14,
    lastWorn: '2025-01-29',
    image: '/top2.png',
  },
  {
    id: '14',
    name: 'Black Puffer Jacket',
    category: 'outerwear',
    colors: ['#1a1a1a'],
    brand: 'The North Face',
    purchaseDate: '2024-11-15',
    wearCount: 10,
    lastWorn: '2025-02-04',
    image: '/dress.jpg',
  },
  {
    id: '15',
    name: 'Tan Loafers',
    category: 'shoes',
    colors: ['#8b5a2b'],
    brand: 'Cole Haan',
    purchaseDate: '2024-05-08',
    wearCount: 16,
    lastWorn: '2025-01-27',
    image: '/shoes.png',
  },
  {
    id: '16',
    name: 'Silver Watch',
    category: 'accessories',
    colors: ['#6b7280'],
    brand: 'Tissot',
    purchaseDate: '2023-12-25',
    wearCount: 120,
    lastWorn: '2025-02-04',
    image: '/bag.png',
  },
  {
    id: '17',
    name: 'Pink Linen Shirt',
    category: 'tops',
    colors: ['#ec4899'],
    brand: 'Mango',
    purchaseDate: '2024-06-20',
    wearCount: 6,
    lastWorn: '2025-01-15',
    image: '/top.png',
  },
  {
    id: '18',
    name: 'Olive Cargo Pants',
    category: 'bottoms',
    colors: ['#22c55e', '#6b7280'],
    brand: 'Carhartt',
    purchaseDate: '2024-09-02',
    wearCount: 11,
    lastWorn: '2025-01-31',
    image: '/jeans.png',
  },
  {
    id: '19',
    name: 'Cream Turtleneck',
    category: 'tops',
    colors: ['#f5f0e6'],
    brand: 'Everlane',
    purchaseDate: '2024-10-20',
    wearCount: 9,
    lastWorn: '2025-02-01',
    image: '/top2.png',
  },
  {
    id: '20',
    name: 'Running Sneakers',
    category: 'shoes',
    colors: ['#1a1a1a', '#dc2626'],
    brand: 'Adidas',
    purchaseDate: '2024-08-15',
    wearCount: 35,
    lastWorn: '2025-02-04',
    image: '/shoes.png',
  },
  {
    id: '21',
    name: 'Leather Messenger Bag',
    category: 'accessories',
    colors: ['#8b5a2b'],
    brand: 'Fossil',
    purchaseDate: '2024-01-10',
    wearCount: 85,
    lastWorn: '2025-02-04',
    image: '/bag.png',
  },
  {
    id: '22',
    name: 'Black Blazer',
    category: 'outerwear',
    colors: ['#1a1a1a'],
    brand: 'Hugo Boss',
    purchaseDate: '2024-03-25',
    wearCount: 8,
    lastWorn: '2025-01-20',
    image: '/dress.png',
  },
  {
    id: '23',
    name: 'White Dress Shirt',
    category: 'tops',
    colors: ['#f5f5f5'],
    brand: 'Brooks Brothers',
    purchaseDate: '2024-02-28',
    wearCount: 12,
    lastWorn: '2025-01-22',
    image: '/top.png',
  },
  {
    id: '24',
    name: 'Navy Dress Pants',
    category: 'bottoms',
    colors: ['#1e3a5f'],
    brand: 'Banana Republic',
    purchaseDate: '2024-04-15',
    wearCount: 10,
    lastWorn: '2025-01-21',
    image: '/jeans.png',
  },
  {
    id: '25',
    name: 'Sunglasses',
    category: 'accessories',
    colors: ['#1a1a1a', '#8b5a2b'],
    brand: 'Ray-Ban',
    purchaseDate: '2024-06-01',
    wearCount: 40,
    lastWorn: '2025-02-03',
    image: '/bag.png',
  },
];

// Mock planned outfits
export const mockOutfits: PlannedOutfit[] = [
  // 2026 - Current test data
  {
    id: 'o101',
    date: '2026-02-06',
    items: ['1', '3', '5', '7'],
    title: 'Smart Casual',
  },
  {
    id: 'o102',
    date: '2026-02-07',
    items: ['6', '12', '9', '16'],
    title: 'Coffee Date',
  },
  {
    id: 'o103',
    date: '2026-02-11',
    items: ['23', '24', '9', '22'],
    title: 'Business Professional',
  },
  {
    id: 'o104',
    date: '2026-02-13',
    items: ['11', '18', '20'],
    title: 'Casual Friday',
  },
  {
    id: 'o105',
    date: '2026-02-14',
    items: ['17', '3', '9', '4'],
    title: 'Valentine\'s Dinner',
  },
  {
    id: 'o106',
    date: '2026-02-16',
    items: ['19', '8', '15', '7'],
    title: 'Weekend Brunch',
  },
  {
    id: 'o107',
    date: '2026-02-20',
    items: ['2', '12', '5'],
    title: 'Casual Day Out',
  },
  {
    id: 'o108',
    date: '2026-02-09',
    items: ['1', '8', '5', '21'],
    title: 'Work from Home Casual',
  },
  // 2025 - Old data
  {
    id: 'o1',
    date: '2025-02-05',
    items: ['1', '3', '5'],
    title: 'Casual Day',
  },
  {
    id: 'o2',
    date: '2025-02-06',
    items: ['23', '24', '9', '22'],
    title: 'Business Meeting',
  },
  {
    id: 'o3',
    date: '2025-02-08',
    items: ['6', '8', '15', '7'],
    title: 'Weekend Brunch',
  },
  {
    id: 'o4',
    date: '2025-02-10',
    items: ['13', '12', '5'],
    title: 'Office Casual',
  },
  {
    id: 'o5',
    date: '2025-02-12',
    items: ['11', '18', '20'],
    title: 'Gym Day',
  },
  {
    id: 'o6',
    date: '2025-02-14',
    items: ['17', '3', '9', '4'],
    title: "Valentine's Date",
  },
  {
    id: 'o7',
    date: '2025-02-15',
    items: ['19', '24', '9'],
    title: 'Dinner Party',
  },
  {
    id: 'o8',
    date: '2025-02-20',
    items: ['2', '1', '3', '5'],
    title: 'Casual Friday',
  },
];

// Mock user
export const mockUser: User = {
  id: 'u1',
  name: 'Sarah',
  email: 'sarah@example.com',
};

// Mock events
export const mockEvents: Event[] = [
  // 2026 - Current test data
  {
    id: 'e101',
    title: 'Team Standup',
    date: '2026-02-06',
    time: '9:00 AM',
    outfitPlanned: true,
    outfitId: 'o101',
  },
  {
    id: 'e102',
    title: 'Lunch Meeting',
    date: '2026-02-06',
    time: '12:30 PM',
    outfitPlanned: false,
  },
  {
    id: 'e103',
    title: 'Coffee with Sarah',
    date: '2026-02-07',
    time: '3:00 PM',
    outfitPlanned: true,
    outfitId: 'o102',
  },
  {
    id: 'e104',
    title: 'Morning Workout',
    date: '2026-02-10',
    time: '7:00 AM',
    outfitPlanned: false,
  },
  {
    id: 'e105',
    title: 'Client Presentation',
    date: '2026-02-11',
    time: '2:00 PM',
    outfitPlanned: true,
    outfitId: 'o103',
  },
  {
    id: 'e106',
    title: 'Dentist Appointment',
    date: '2026-02-12',
    time: '10:30 AM',
    outfitPlanned: false,
  },
  {
    id: 'e107',
    title: 'Team Happy Hour',
    date: '2026-02-13',
    time: '5:30 PM',
    outfitPlanned: true,
    outfitId: 'o104',
  },
  {
    id: 'e108',
    title: 'Valentine\'s Dinner',
    date: '2026-02-14',
    time: '7:00 PM',
    outfitPlanned: true,
    outfitId: 'o105',
  },
  {
    id: 'e109',
    title: 'Brunch with Friends',
    date: '2026-02-16',
    time: '11:00 AM',
    outfitPlanned: true,
    outfitId: 'o106',
  },
  {
    id: 'e110',
    title: 'Grocery Shopping',
    date: '2026-02-17',
    time: '4:00 PM',
    outfitPlanned: false,
  },
  {
    id: 'e111',
    title: 'Movie Night',
    date: '2026-02-20',
    time: '8:00 PM',
    outfitPlanned: true,
    outfitId: 'o107',
  },
  {
    id: 'e112',
    title: 'Board Game Night',
    date: '2026-02-22',
    time: '6:30 PM',
    outfitPlanned: false,
  },
  {
    id: 'e113',
    title: 'Team Meeting',
    date: '2026-02-09',
    time: '10:00 AM',
    outfitPlanned: true,
    outfitId: 'o108',
  },
  {
    id: 'e114',
    title: 'Lunch with Alex',
    date: '2026-02-09',
    time: '1:00 PM',
    outfitPlanned: false,
  },
  {
    id: 'e115',
    title: 'Yoga Class',
    date: '2026-02-09',
    time: '6:00 PM',
    outfitPlanned: false,
  },
  // 2025 - Old data
  {
    id: 'e1',
    title: 'Client Meeting',
    date: '2025-02-06',
    time: '2:00 PM',
    outfitPlanned: true,
    outfitId: 'o2',
  },
  {
    id: 'e2',
    title: 'Dinner with Friends',
    date: '2025-02-08',
    time: '7:00 PM',
    outfitPlanned: true,
    outfitId: 'o3',
  },
  {
    id: 'e3',
    title: 'Job Interview',
    date: '2025-02-10',
    time: '10:00 AM',
    outfitPlanned: false,
  },
  {
    id: 'e4',
    title: "Valentine's Date",
    date: '2025-02-14',
    time: '6:30 PM',
    outfitPlanned: true,
    outfitId: 'o6',
  },
  {
    id: 'e5',
    title: 'Networking Event',
    date: '2025-02-18',
    time: '5:00 PM',
    outfitPlanned: false,
  },
];

// Mock activities
export const mockActivities: Activity[] = [
  {
    id: 'a1',
    type: 'added',
    description: 'Added Black Puffer Jacket to wardrobe',
    timestamp: '2025-02-04T14:30:00',
    itemId: '14',
  },
  {
    id: 'a2',
    type: 'planned',
    description: 'Planned outfit for Business Meeting',
    timestamp: '2025-02-04T10:15:00',
  },
  {
    id: 'a3',
    type: 'worn',
    description: 'Wore Black Slim Jeans',
    timestamp: '2025-02-04T08:00:00',
    itemId: '3',
  },
  {
    id: 'a4',
    type: 'added',
    description: 'Added Cream Turtleneck to wardrobe',
    timestamp: '2025-02-03T16:45:00',
    itemId: '19',
  },
  {
    id: 'a5',
    type: 'planned',
    description: 'Planned outfit for Weekend Brunch',
    timestamp: '2025-02-03T11:20:00',
  },
];

// Dashboard stats
export const getDashboardStats = () => {
  const totalItems = mockItems.length;
  const mostWorn = mockItems.reduce((prev, current) =>
    prev.wearCount > current.wearCount ? prev : current
  );

  // Count colors
  const colorCounts: Record<string, number> = {};
  mockItems.forEach((item) => {
    item.colors.forEach((color) => {
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    });
  });

  const favoriteColor = Object.entries(colorCounts).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );

  const itemsThisWeek = mockItems.filter((item) => {
    const purchaseDate = new Date(item.purchaseDate);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return purchaseDate >= weekAgo;
  }).length;

  return {
    totalItems,
    mostWorn,
    favoriteColor: favoriteColor[0],
    itemsThisWeek,
  };
};

// Color distribution for pie chart
export const getColorDistribution = () => {
  const colorCounts: Record<string, number> = {};
  mockItems.forEach((item) => {
    item.colors.forEach((color) => {
      const colorName = COLOR_OPTIONS.find((c) => c.value === color)?.name || 'Other';
      colorCounts[colorName] = (colorCounts[colorName] || 0) + 1;
    });
  });

  return Object.entries(colorCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
};

// Category wear counts for bar chart
export const getCategoryWearCounts = () => {
  const categoryCounts: Record<string, number> = {};
  mockItems.forEach((item) => {
    categoryCounts[item.category] = (categoryCounts[item.category] || 0) + item.wearCount;
  });

  return CATEGORIES.map((cat) => ({
    name: cat.label,
    wearCount: categoryCounts[cat.id] || 0,
  }));
};

// Items added over time for line chart
export const getItemsOverTime = () => {
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
  return months.map((month, index) => ({
    name: month,
    items: Math.floor(Math.random() * 5) + 1 + index,
  }));
};
