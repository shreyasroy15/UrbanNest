import React, { useState, useEffect } from 'react';
import { getAdminQueries, saveAdminQueries } from '../../data/admin/demoQueries';
import { MessageSquare, Check, RotateCcw, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';

export const AdminQueries = () => {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setQueries(getAdminQueries());
  }, []);

  const handleStatusUpdate = (queryId, nextStatus) => {
    const updated = queries.map(q => {
      if (q.id === queryId) {
        return { ...q, status: nextStatus };
      }
      return q;
    });
    setQueries(updated);
    saveAdminQueries(updated);
    setSuccess(`Query ticket is now marked as ${nextStatus}.`);
    
    if (selectedQuery && selectedQuery.id === queryId) {
      setSelectedQuery(prev => ({ ...prev, status: nextStatus }));
    }
    setTimeout(() => setSuccess(''), 1500);
  };

  const filtered = queries.filter(q => {
    const matchesStatus = statusFilter ? q.status === statusFilter : true;
    const matchesCategory = categoryFilter ? q.category === categoryFilter : true;
    return matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400 ring-1 ring-blue-500/20';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 ring-1 ring-emerald-500/30';
      case 'Spam':
        return 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-450';
      default:
        return 'bg-stone-50 text-stone-700 dark:bg-stone-850 dark:text-stone-300';
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="text-left font-sans">
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          Customer Inquiry Tickets
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
          Review customer contact form submissions, categorize topics, and track resolution statuses.
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white dark:bg-stone-850 p-4 rounded-xl border border-stone-200/80 dark:border-stone-805 shadow-xs flex flex-wrap gap-4 items-center justify-between text-left">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-orange-700" />
          <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 font-heading">Support Desk</span>
        </div>
        
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-650 dark:text-stone-305 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Resolved">Resolved</option>
            <option value="Spam">Spam</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-650 dark:text-stone-305 focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Product Inquiry">Product Inquiry</option>
            <option value="Store Location">Store Location</option>
            <option value="Bulk Order">Bulk Order</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
      </div>

      {/* Success banner */}
      {success && (
        <div className="p-3 bg-emerald-50 text-emerald-805 border border-emerald-202 text-xs font-semibold rounded-xl text-left animate-fadeIn">
          {success}
        </div>
      )}

      {/* Split details body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Table of tickets */}
        <div className="lg:col-span-2 bg-white dark:bg-stone-850 rounded-2.5xl border border-stone-200/80 dark:border-stone-805 shadow-sm overflow-hidden text-left self-start">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-[10px] uppercase font-bold tracking-wider text-stone-450 dark:text-stone-500 font-heading">
                <th className="px-5 py-4">Sender Profile</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-105 dark:divide-stone-850">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-5 py-8 text-center text-stone-400 font-light">
                    No tickets found matching filtered criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((q) => (
                  <tr
                    key={q.id}
                    className={`hover:bg-stone-50/50 dark:hover:bg-stone-900/10 transition-colors cursor-pointer ${
                      selectedQuery && selectedQuery.id === q.id ? 'bg-orange-50/20 dark:bg-orange-950/5 font-semibold' : ''
                    }`}
                    onClick={() => setSelectedQuery(q)}
                  >
                    <td className="px-5 py-4 text-left">
                      <span className="font-semibold text-stone-900 dark:text-white font-heading block">
                        {q.name}
                      </span>
                      <span className="text-[10px] text-stone-450 dark:text-stone-500 font-light mt-0.5">
                        {q.email}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-stone-600 dark:text-stone-400 font-light">
                      {q.category}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-heading uppercase ${getStatusBadge(q.status)}`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right text-stone-505 dark:text-stone-505 font-light">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Selected Query details card context view */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-left">
          {selectedQuery ? (
            <div className="space-y-6">
              <div className="pb-4 border-b border-stone-105 dark:border-stone-800 flex justify-between items-start">
                <div className="text-left select-text">
                  <h3 className="text-sm font-semibold text-stone-905 dark:text-white font-heading">
                    {selectedQuery.name}
                  </h3>
                  <span className="text-[10px] text-stone-405 font-light flex items-center gap-1 mt-1">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    {selectedQuery.email}
                  </span>
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold font-heading uppercase ${getStatusBadge(selectedQuery.status)}`}>
                  {selectedQuery.status}
                </span>
              </div>

              {/* Message block */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 font-heading">
                  Message Content
                </span>
                <div className="p-4 bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-800/80 rounded-2xl text-[11px] text-stone-707 dark:text-stone-300 leading-relaxed font-light select-text">
                  "{selectedQuery.message}"
                </div>
              </div>

              {/* Action Resolution updates options */}
              <div className="space-y-2 pt-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 font-heading">
                  Mark Resolution
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold font-heading uppercase">
                  {selectedQuery.status !== 'Resolved' ? (
                    <button
                      onClick={() => handleStatusUpdate(selectedQuery.id, 'Resolved')}
                      className="py-2.5 rounded-xl bg-stone-900 dark:bg-orange-700 text-white hover:opacity-90 flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Resolve Ticket
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusUpdate(selectedQuery.id, 'New')}
                      className="py-2.5 rounded-xl border border-stone-200 dark:border-stone-750 text-stone-600 dark:text-stone-300 hover:bg-stone-50 flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reopen Ticket
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleStatusUpdate(selectedQuery.id, 'Spam')}
                    className="py-2.5 rounded-xl bg-red-50 text-red-700 border border-red-200/50 hover:bg-red-100/50 flex items-center justify-center gap-1 cursor-pointer focus:outline-none"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Spam Filter
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-center p-4 select-none">
              <MessageSquare className="w-8 h-8 text-stone-350 dark:text-stone-605 mb-2" />
              <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-200 font-heading">No Ticket Selected</h4>
              <p className="text-[10px] text-stone-400 font-light mt-1">Select an active contact inquiry from the table to respond and manage tickets status.</p>
            </div>
          )}
        </div>
        
      </div>
      
    </div>
  );
};

export default AdminQueries;
