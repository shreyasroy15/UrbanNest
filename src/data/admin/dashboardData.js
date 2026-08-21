import { getAdminProducts } from './demoProducts';
import { getAdminQueries } from './demoQueries';
import { getAdminOrders } from './demoOrders';
import { getAdminCustomers } from './demoCustomers';

export const getDashboardSummary = () => {
  const products = getAdminProducts();
  const queries = getAdminQueries();
  const orders = getAdminOrders();
  const customers = getAdminCustomers();

  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.amount, 0);

  return {
    kpis: [
      {
        id: 'kpi-products',
        label: 'Total Products',
        value: products.length,
        growth: '+12 this month',
        color: 'text-stone-900',
        bg: 'bg-stone-50'
      },
      {
        id: 'kpi-queries',
        label: 'Customer Queries',
        value: queries.length,
        growth: '+18% this week',
        color: 'text-orange-700',
        bg: 'bg-orange-50'
      },
      {
        id: 'kpi-sales',
        label: 'Estimated Sales',
        value: `₹${totalSales.toLocaleString('en-IN')}`,
        growth: '+14.5%',
        color: 'text-amber-800',
        bg: 'bg-amber-50'
      },
      {
        id: 'kpi-conversations',
        label: 'AI Conversations',
        value: 342,
        growth: '+23%',
        color: 'text-stone-900',
        bg: 'bg-stone-100/50'
      }
    ],
    recentActivity: [
      {
        id: 'act-1',
        text: 'Admin added new product "Handcrafted Clay Vase"',
        time: '5 minutes ago',
        type: 'success'
      },
      {
        id: 'act-2',
        text: 'Customer query QR-101 received from Rahul Sharma',
        time: '12 minutes ago',
        type: 'info'
      },
      {
        id: 'act-3',
        text: 'Order UN-9821 marked as Processing',
        time: '1 hour ago',
        type: 'info'
      },
      {
        id: 'act-4',
        text: 'Promotion "Monsoon Magic" scheduled successfully',
        time: '3 hours ago',
        type: 'success'
      },
      {
        id: 'act-5',
        text: 'N8N Chatbot webhook check successful',
        time: '5 hours ago',
        type: 'success'
      }
    ]
  };
};

export const getSalesOverviewData = () => [
  { month: 'Jan', sales: 12000 },
  { month: 'Feb', sales: 19000 },
  { month: 'Mar', sales: 15000 },
  { month: 'Apr', sales: 28000 },
  { month: 'May', sales: 22000 },
  { month: 'Jun', sales: 34000 },
  { month: 'Jul', sales: 31000 },
  { month: 'Aug', sales: 48650 }
];

export const getCategoryDistribution = () => {
  const products = getAdminProducts();
  const distribution = {};
  products.forEach(p => {
    distribution[p.category] = (distribution[p.category] || 0) + 1;
  });
  return Object.entries(distribution).map(([name, count]) => ({ name, count }));
};

export const getQueryBarData = () => [
  { category: 'Product', count: 12 },
  { category: 'Delivery', count: 6 },
  { category: 'Pricing', count: 3 },
  { category: 'Feedback', count: 2 },
  { category: 'Other', count: 1 }
];
