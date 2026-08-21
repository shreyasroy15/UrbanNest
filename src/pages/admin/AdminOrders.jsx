import React, { useState, useEffect } from 'react';
import { getAdminOrders, saveAdminOrders } from '../../data/admin/demoOrders';
import { ShoppingCart, Eye, ToggleLeft, ShieldAlert } from 'lucide-react';

export const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setOrders(getAdminOrders());
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    });
    setOrders(updated);
    saveAdminOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const filteredOrders = orders.filter(o => {
    return statusFilter ? o.status === statusFilter : true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100/70 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400';
      case 'Processing':
        return 'bg-blue-105 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400';
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400';
      case 'Cancelled':
        return 'bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400';
      default:
        return 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          Customer Orders
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
          Review transaction registers, update shipping processing states, or inspect invoice receipts.
        </p>
      </div>

      {/* Notice */}
      <div className="p-3 bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 rounded-xl flex gap-3 text-stone-600 dark:text-stone-400 items-start text-left">
        <ShieldAlert className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed font-light">
          <span className="font-semibold">Simulated Payments Architecture:</span> No actual credit cards or bank payments are processed during testing. Use status triggers to manage mock delivery workflows.
        </p>
      </div>

      {/* Toolbar Filter */}
      <div className="bg-white dark:bg-stone-850 p-4 rounded-xl border border-stone-200/80 dark:border-stone-805 shadow-xs flex justify-between items-center text-left">
        <div className="flex items-center gap-2.5">
          <ShoppingCart className="w-4 h-4 text-orange-705" />
          <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 font-heading">Filter Orders</span>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-650 dark:text-stone-300 focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table List of Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-855 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm overflow-hidden text-left self-start">
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-[10px] uppercase font-bold tracking-wider text-stone-450 dark:text-stone-505 font-heading">
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Total Amount</th>
                  <th className="px-5 py-4 text-center">Status</th>
                  <th className="px-5 py-4 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-105 dark:divide-stone-850">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-stone-400 font-light">
                      No customer orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => (
                    <tr 
                      key={o.id} 
                      className={`hover:bg-stone-50/50 dark:hover:bg-stone-900/10 transition-colors cursor-pointer ${
                        selectedOrder && selectedOrder.id === o.id ? 'bg-orange-50/20 dark:bg-orange-950/5' : ''
                      }`}
                      onClick={() => setSelectedOrder(o)}
                    >
                      <td className="px-5 py-4 font-semibold text-stone-800 dark:text-stone-200 font-heading">
                        {o.id}
                      </td>
                      <td className="px-5 py-4 font-medium dark:text-stone-300">
                        {o.customerName}
                      </td>
                      <td className="px-5 py-4 text-stone-500 dark:text-stone-400 font-light">
                        {new Date(o.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4 font-bold text-stone-900 dark:text-white font-heading">
                        ₹{o.amount.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-heading uppercase ${getStatusColor(o.status)}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); setSelectedOrder(o); }}
                          className="p-1 px-1.5 text-stone-500 hover:text-orange-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md cursor-pointer focus:outline-none"
                          title="View order Invoice details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Order Detailed Drawer Invoice */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-left">
          {selectedOrder ? (
            <div className="space-y-6">
              <div className="pb-4 border-b border-stone-105 dark:border-stone-800 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-stone-905 dark:text-white font-heading">
                    Order details
                  </h3>
                  <span className="text-[10px] text-stone-400 font-mono mt-0.5 block">{selectedOrder.id}</span>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-heading uppercase ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Items Summary list */}
              <div className="space-y-3.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Items Purchased
                </span>
                <div className="divide-y divide-stone-100 dark:divide-stone-800/60">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="pt-2.5 flex justify-between text-xs font-light">
                      <div className="text-left font-medium dark:text-stone-300">
                        {item.name} <span className="text-stone-400 font-normal">x {item.quantity}</span>
                      </div>
                      <div className="font-semibold text-stone-800 dark:text-white font-heading">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Invoice */}
              <div className="pt-4 border-t border-stone-105 dark:border-stone-800 flex justify-between items-center bg-stone-50 dark:bg-stone-905 p-3.5 rounded-xl border border-stone-200/60 dark:border-stone-800/80">
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-305 font-heading">
                  Total Bill
                </span>
                <span className="text-base font-bold text-orange-705 dark:text-orange-400 font-heading">
                  ₹{selectedOrder.amount.toLocaleString()}
                </span>
              </div>

              {/* Update Status Workflow controls */}
              <div className="space-y-2 pt-2">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Update Processing State
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold font-heading">
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, 'Processing')}
                    className="py-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 cursor-pointer focus:outline-none"
                  >
                    Processing
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, 'Completed')}
                    className="py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 cursor-pointer focus:outline-none"
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, 'Pending')}
                    className="py-2 rounded-lg border border-stone-205 dark:border-stone-750 text-stone-500 hover:bg-stone-50 cursor-pointer focus:outline-none"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedOrder.id, 'Cancelled')}
                    className="py-2 rounded-lg bg-red-50 text-red-650 hover:bg-red-100/50 cursor-pointer focus:outline-none"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-center p-4">
              <ShoppingCart className="w-8 h-8 text-stone-300 mb-2" />
              <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200 font-heading">No Order Selected</h4>
              <p className="text-[10px] text-stone-400 font-light mt-1">Select an order row from the table list to manage invoice summary data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
