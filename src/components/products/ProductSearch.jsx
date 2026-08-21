import React from 'react';
import { Search, X } from 'lucide-react';

export const ProductSearch = ({ value, onChange, onClear }) => {
  return (
    <div className="relative w-full max-w-xl mx-auto mb-8 font-sans">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search products by name, category, or materials..."
          className="w-full pl-12 pr-10 py-3.5 bg-white border border-stone-200 rounded-full text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-700/30 focus:border-orange-700 text-sm shadow-xs transition-all"
        />
        <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-stone-450 hover:text-stone-850 focus:outline-none cursor-pointer"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
