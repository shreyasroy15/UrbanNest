const STORAGE_KEY = 'urbannest_admin_customers';

const initialCustomers = [
  {
    id: 'CUST-301',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    queriesCount: 1,
    cartItems: 0,
    lastActivity: '2026-08-21T10:14:00Z',
    status: 'Active'
  },
  {
    id: 'CUST-302',
    name: 'Priya Patel',
    email: 'priya.patel@gmail.com',
    queriesCount: 1,
    cartItems: 2,
    lastActivity: '2026-08-21T14:30:00Z',
    status: 'Active'
  },
  {
    id: 'CUST-303',
    name: 'Amit Verma',
    email: 'amit.v@outlook.com',
    queriesCount: 1,
    cartItems: 0,
    lastActivity: '2026-08-19T09:15:00Z',
    status: 'Inactive'
  },
  {
    id: 'CUST-304',
    name: 'Sneha Rao',
    email: 'sneha.rao@hotmail.com',
    queriesCount: 1,
    cartItems: 1,
    lastActivity: '2026-08-18T16:45:00Z',
    status: 'Active'
  },
  {
    id: 'CUST-305',
    name: 'Vikram Singh',
    email: 'vikram.s@yahoo.com',
    queriesCount: 0,
    cartItems: 0,
    lastActivity: '2026-08-17T10:05:00Z',
    status: 'Active'
  }
];

export const getAdminCustomers = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCustomers));
    return initialCustomers;
  }
  return JSON.parse(data);
};

export const saveAdminCustomers = (customersList) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customersList));
};
