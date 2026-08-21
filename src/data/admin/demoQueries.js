const STORAGE_KEY = 'urbannest_admin_queries';

const initialQueries = [
  {
    id: 'QR-101',
    customerName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    category: 'Product',
    message: 'Do you have the Amber Reed Diffuser in a larger 500ml size? The 100ml one smells amazing but runs out too quickly.',
    createdAt: '2026-08-21T10:14:00Z',
    status: 'New'
  },
  {
    id: 'QR-102',
    customerName: 'Priya Patel',
    email: 'priya.patel@gmail.com',
    phone: '+91 91234 56789',
    category: 'Delivery',
    message: 'My order number UN-9823 is showing in transit for 3 days. Could you please check with your local Bangalore delivery partner?',
    createdAt: '2026-08-20T14:30:00Z',
    status: 'Replied'
  },
  {
    id: 'QR-103',
    customerName: 'Amit Verma',
    email: 'amit.v@outlook.com',
    phone: '+91 88888 77777',
    category: 'Pricing',
    message: 'Interested in purchasing 50 units of the Handmade Linen Journals for corporate gifting. Do you offer corporate bulk rates?',
    createdAt: '2026-08-19T09:15:00Z',
    status: 'In Progress'
  },
  {
    id: 'QR-104',
    customerName: 'Sneha Rao',
    email: 'sneha.rao@hotmail.com',
    phone: '+91 99000 11223',
    category: 'Feedback',
    message: 'Loved the Ceramic Table Vase! The packaging was so safe and contained a lovely handwritten note. Keep it up!',
    createdAt: '2026-08-18T16:45:00Z',
    status: 'Resolved'
  }
];

export const getAdminQueries = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialQueries));
    return initialQueries;
  }
  return JSON.parse(data);
};

export const saveAdminQueries = (queriesList) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queriesList));
};
