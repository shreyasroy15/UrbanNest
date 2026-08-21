import React, { useState, useEffect } from 'react';
import { getAdminCustomers, saveAdminCustomers } from '../../data/admin/demoCustomers';
import { Users, Mail, MessageSquare, ShoppingBag, ShieldAlert } from 'lucide-react';

export const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setCustomers(getAdminCustomers());
  }, []);

  const handleStatusToggle = (customerId) => {
    const updated = customers.map(c => {
      if (c.id === customerId) {
        const nextStatus = c.status === 'Active' ? 'Suspended' : 'Active';
        return { ...c, status: nextStatus };
      }
      return c;
    });
    setCustomers(updated);
    saveAdminCustomers(updated);
    setSuccess('Customer account status updated.');
    setTimeout(() => setSuccess(''), 1500);
  };

  const filtered = customers.filter(c => {
    return c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           c.email.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          Customer Directory
        </h1>
        <p className="text-xs text-stone-505 dark:text-stone-400 font-light mt-1">
          Review customer accounts, monitor active sessions, or toggle user portal access permission.
        </p>
      </div>

      {/* Security alert */}
      <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl flex gap-3 text-amber-900 items-start text-left">
        <ShieldAlert className="w-5 h-5 text-amber-705 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed font-light">
          <span className="font-semibold">Security Settings:</span> Toggling user status to <code className="bg-amber-100/80 px-1 rounded-sm">Suspended</code> restricts store checkout permissions for that specific client profile session check.
        </div>
      </div>

      {/* Search Header Tool bar */}
      <div className="bg-white dark:bg-stone-850 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between text-left">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name or email..."
            className="w-full pl-4 pr-10 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-705 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <Users className="w-4 h-4 text-orange-700" />
          <span className="text-xs font-semibold text-stone-700 dark:text-stone-305 font-heading">
            {filtered.length} Registered Users
          </span>
        </div>
      </div>

      {/* Feedback banner */}
      {success && (
        <div className="p-3.5 bg-emerald-50 text-emerald-805 border border-emerald-202 text-xs font-semibold rounded-xl text-left animate-fadeIn">
          {success}
        </div>
      )}

      {/* Directory Grid */}
      <div className="bg-white dark:bg-stone-850 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm overflow-hidden text-left">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-[10px] uppercase font-bold tracking-wider text-stone-450 dark:text-stone-500 font-heading">
                <th className="px-5 py-4">Customer Details</th>
                <th className="px-5 py-4">Queries Submitted</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Joined Date</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-105 dark:divide-stone-850">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-8 text-center text-stone-400 font-light">
                    No customer directory entries found.
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-900/10 transition-colors">
                    
                    {/* Basic Name details */}
                    <td className="px-5 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold font-heading flex items-center justify-center border border-stone-200 dark:border-stone-700">
                        {c.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <span className="font-semibold text-stone-900 dark:text-white font-heading block">
                          {c.name}
                        </span>
                        <span className="text-[10px] text-stone-450 dark:text-stone-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 text-stone-450" />
                          {c.email}
                        </span>
                      </div>
                    </td>

                    {/* Queries tickets count */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-stone-750 dark:text-stone-300 font-medium">
                        <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                        {c.queriesCount || 0} Tickets
                      </div>
                    </td>

                    {/* Status check */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-heading uppercase ${
                        c.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' 
                          : 'bg-red-50 text-red-800 dark:bg-red-950/20 dark:text-red-400'
                      }`}>
                        {c.status}
                      </span>
                    </td>

                    {/* Registration Join date */}
                    <td className="px-5 py-4 text-stone-550 dark:text-stone-400 font-light">
                      {new Date(c.joinedAt).toLocaleDateString()}
                    </td>

                    {/* Action Toggle status */}
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => handleStatusToggle(c.id)}
                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold font-heading cursor-pointer focus:outline-none transition-colors ${
                          c.status === 'Active'
                            ? 'border-red-200 hover:bg-red-50 text-red-650 dark:border-red-950/20 dark:hover:bg-red-950/25'
                            : 'border-emerald-202 hover:bg-emerald-50 text-emerald-800 dark:border-emerald-950/20 dark:hover:bg-emerald-950/25'
                        }`}
                      >
                        {c.status === 'Active' ? 'Suspend Portal' : 'Unsuspend'}
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminCustomers;
