import React, { useState } from 'react';
import { Settings, ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';

export const AdminSettings = () => {
  const [storeName, setStoreName] = useState('UrbanNest Lifestyle Store');
  const [tagline, setTagline] = useState('Little Things. Beautiful Living.');
  const [supportEmail, setSupportEmail] = useState('contact@urbannest.com');
  const [seoTitle, setSeoTitle] = useState('UrbanNest - Premium Home Decors and Stationery Store');
  const [seoDesc, setSeoDesc] = useState('Explore our organic handmade soy candles, diffusers, greeting journals, and stationery accessories boutiques.');
  
  const [success, setSuccess] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess('Global site options saved successfully.');
    setTimeout(() => setSuccess(''), 1500);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          System settings
        </h1>
        <p className="text-xs text-stone-505 dark:text-stone-400 font-light mt-1">
          Adjust public boutique titles, contact info registry, or SEO search descriptors metadata parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        
        {/* Edit fields */}
        <div className="md:col-span-2 bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200 flex items-center gap-1.5 font-heading">
            <Settings className="w-4.5 h-4.5 text-orange-705" />
            General Branding Attributes
          </h3>

          {success && (
            <div className="p-3 bg-emerald-50 text-emerald-805 border border-emerald-202 text-xs font-medium rounded-xl">
              {success}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4 text-xs font-light">
            
            {/* Store title & tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-450 mb-1.5 uppercase font-heading">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-xs text-stone-705 dark:text-stone-205"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-450 mb-1.5 uppercase font-heading">
                  Tagline Phrase
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-xs text-stone-705 dark:text-stone-205"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-405 mb-1.5 uppercase font-heading">
                Support Mailbox Address
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-xs text-stone-707 dark:text-stone-200"
              />
            </div>

            {/* SEO */}
            <h4 className="border-t border-stone-105 dark:border-stone-800 pt-4 block text-[10px] font-bold uppercase tracking-wider text-orange-700 font-heading">
              SEO Google Index Meta Parameters
            </h4>

            <div>
              <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                Meta title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-xs text-stone-705 dark:text-stone-200"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                Meta description
              </label>
              <textarea
                rows="3"
                value={seoDesc}
                onChange={(e) => setSeoDesc(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-205 dark:border-stone-750 rounded-xl focus:outline-none text-xs text-stone-707 dark:text-stone-300 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-655 text-white text-xs font-semibold rounded-xl focus:outline-none cursor-pointer"
            >
              Apply Settings changes
            </button>

          </form>
        </div>

        {/* Info panel */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-202 dark:border-stone-800 shadow-sm space-y-4 self-start">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200 flex items-center gap-1.5 font-heading">
            <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
            Integrity Checks
          </h3>
          <p className="text-[11px] font-light text-stone-450 dark:text-stone-400 leading-relaxed">
            Site settings are stored globally to configure SEO elements. Modifying contact email redirects inquiries notifications logs.
          </p>
        </div>

      </div>

    </div>
  );
};

export default AdminSettings;
