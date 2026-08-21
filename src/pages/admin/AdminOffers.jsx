import React, { useState } from 'react';
import { Tag, Plus, Trash2, Calendar, ShieldAlert } from 'lucide-react';

export const AdminOffers = () => {
  const [offers, setOffers] = useState([
    { id: 1, title: 'WINTER15', description: 'Get 15% off all home decor items', type: 'Percentage', value: 15, active: true },
    { id: 2, title: 'FESTIVE10', description: 'Festive discount on premium notebooks', type: 'Percentage', value: 10, active: true },
    { id: 3, title: 'FREESHIP', description: 'Free shipping on orders above ₹1,500', type: 'Free Shipping', value: 0, active: false }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newVal, setNewVal] = useState('');
  const [newType, setNewType] = useState('Percentage');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newTitle.trim() || !newDesc.trim()) {
      return setError('Please fill in required promo fields.');
    }

    const matches = offers.find(o => o.title.toUpperCase() === newTitle.trim().toUpperCase());
    if (matches) {
      return setError('Promo code title already exists.');
    }

    const nextId = offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1;
    const created = {
      id: nextId,
      title: newTitle.trim().toUpperCase(),
      description: newDesc.trim(),
      type: newType,
      value: newType === 'Percentage' ? Number(newVal) : 0,
      active: true
    };

    setOffers([...offers, created]);
    setNewTitle('');
    setNewDesc('');
    setNewVal('');
    setSuccess('Promotional coupon created successfully.');
  };

  const handleToggle = (id) => {
    setOffers(prev => prev.map(o => {
      if (o.id === id) {
        return { ...o, active: !o.active };
      }
      return o;
    }));
  };

  const handleDelete = (id) => {
    setOffers(prev => prev.filter(o => o.id !== id));
    setSuccess('Offer deleted.');
    setTimeout(() => setSuccess(''), 1500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          Offers & Promotions
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
          Schedule storefront marketing announcements, edit promo discount coupons, or configure shipping thresholds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Input Creator */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-left self-start space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200 flex items-center gap-1.5 font-heading">
            <Plus className="w-4 h-4 text-orange-700" />
            Create Promo Code
          </h3>

          {error && (
            <div className="p-3 bg-red-50 text-red-800 border border-red-200 text-[11px] rounded-xl font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 text-emerald-805 border border-emerald-202 text-[11px] rounded-xl font-medium animate-fadeIn">
              {success}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-3.5 text-xs font-light">
            <div>
              <label htmlFor="promo-title" className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                Coupon Code *
              </label>
              <input
                id="promo-title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="FESTIVE25"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none placeholder-stone-400 text-xs text-stone-707 dark:text-stone-300 font-semibold tracking-wider font-heading uppercase"
              />
            </div>
            
            <div>
              <label htmlFor="promo-desc" className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                Description Details *
              </label>
              <input
                id="promo-desc"
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Get 25% discount off festive envelopes"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none placeholder-stone-400 text-xs text-stone-707 dark:text-stone-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                  Discount Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none text-[11px] text-stone-705 dark:text-stone-300 font-semibold"
                >
                  <option value="Percentage">Percentage</option>
                  <option value="Free Shipping">Free Shipping</option>
                </select>
              </div>

              {newType === 'Percentage' && (
                <div>
                  <label htmlFor="promo-val" className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                    Discount (%)
                  </label>
                  <input
                    id="promo-val"
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newVal}
                    onChange={(e) => setNewVal(e.target.value)}
                    placeholder="25"
                    className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none placeholder-stone-400 text-xs text-stone-705 dark:text-stone-300"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-655 text-white text-xs font-semibold rounded-xl focus:outline-none cursor-pointer tracking-wider"
            >
              Publish Promotion
            </button>
          </form>
        </div>

        {/* Right Listings List */}
        <div className="md:col-span-2 space-y-4 text-left">
          <div className="bg-white dark:bg-stone-850 rounded-2.5xl border border-stone-205 dark:border-stone-800 shadow-sm overflow-hidden text-left">
            <div className="p-4 sm:p-5 border-b border-stone-105 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/10 flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-450 dark:text-stone-550 font-heading">Active Promotions</span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold">{offers.length} codes listed</span>
            </div>

            <div className="divide-y divide-stone-105 dark:divide-stone-850">
              {offers.map((coupon) => (
                <div key={coupon.id} className={`p-4 sm:p-5 flex items-center justify-between gap-4 font-light text-stone-700 dark:text-stone-300 ${!coupon.active ? 'opacity-65' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-700 flex items-center justify-center shrink-0">
                      <Tag className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="font-semibold text-stone-905 dark:text-white font-heading tracking-wider text-xs block">
                        {coupon.title}
                      </span>
                      <span className="text-[10.5px] text-stone-400 mt-0.5 block">
                        {coupon.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <button
                      onClick={() => handleToggle(coupon.id)}
                      className={`text-[9px] font-bold font-heading px-2 py-0.5 rounded-full uppercase cursor-pointer border ${
                        coupon.active 
                          ? 'bg-emerald-50 text-emerald-805 border-emerald-202 dark:bg-emerald-950/20 dark:text-emerald-400' 
                          : 'bg-stone-100 text-stone-450 border-stone-200 dark:bg-stone-800 dark:text-stone-500'
                      }`}
                    >
                      {coupon.active ? 'Active' : 'Disabled'}
                    </button>
                    
                    <button
                      onClick={() => handleDelete(coupon.id)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/25 rounded-md cursor-pointer focus:outline-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminOffers;
