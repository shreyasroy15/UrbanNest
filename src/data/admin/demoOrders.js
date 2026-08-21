const STORAGE_KEY = 'urbannest_admin_orders';

const initialOrders = [
  {
    id: 'UN-9821',
    customerName: 'Rahul Sharma',
    items: [
      { name: 'Handcrafted Clay Vase', quantity: 1, price: 899 },
      { name: 'Amber Reed Diffuser', quantity: 2, price: 649 }
    ],
    amount: 2197,
    status: 'Processing',
    createdAt: '2026-08-21T08:30:00Z'
  },
  {
    id: 'UN-9822',
    customerName: 'Aarav Mehta',
    items: [
      { name: 'Handmade Linen Journal', quantity: 1, price: 349 }
    ],
    amount: 349,
    status: 'Completed',
    createdAt: '2026-08-20T11:20:00Z'
  },
  {
    id: 'UN-9823',
    customerName: 'Priya Patel',
    items: [
      { name: 'Scented Soy Candle', quantity: 3, price: 499 }
    ],
    amount: 1497,
    status: 'Pending',
    createdAt: '2026-08-20T14:10:00Z'
  },
  {
    id: 'UN-9824',
    customerName: 'Sneha Rao',
    items: [
      { name: 'Brass Incense Holder', quantity: 1, price: 799 },
      { name: 'Handmade Linen Journal', quantity: 2, price: 349 }
    ],
    amount: 1497,
    status: 'Completed',
    createdAt: '2026-08-18T15:50:00Z'
  },
  {
    id: 'UN-9825',
    customerName: 'Vikram Singh',
    items: [
      { name: 'Minimalist Ceramic Mug', quantity: 2, price: 599 }
    ],
    amount: 1198,
    status: 'Cancelled',
    createdAt: '2026-08-17T10:05:00Z'
  }
];

export const getAdminOrders = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialOrders));
    return initialOrders;
  }
  return JSON.parse(data);
};

export const saveAdminOrders = (ordersList) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ordersList));
};
