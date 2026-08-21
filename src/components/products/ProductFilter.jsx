import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { categories } from '../../data/categories';

export const ProductFilter = ({
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  sortBy,
  onSortChange,
  onResetFilters,
  productsCount
}) => {
  const sortingOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Customer Rating', value: 'rating' },
    { label: 'Newest Arrivals', value: 'newest' }
  ];

  return (
    <aside className="w-full lg:w-72 bg-white p-6 rounded-2.5xl border border-stone-200/80 custom-shadow-sm shrink-0 text-left font-sans self-start">
      {/* Header and Reset button */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-orange-700" />
          Filters
        </h3>
        <button
          onClick={onResetFilters}
          className="text-xs text-stone-500 hover:text-orange-700 flex items-center gap-1 cursor-pointer transition-colors focus:outline-none"
        >
          <RotateCcw className="w-3 h-3" />
          Reset All
        </button>
      </div>

      {/* Sort Section */}
      <div className="mb-6">
        <label htmlFor="sort-select" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
          Sort By
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-700 text-sm focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
        >
          {sortingOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Category List Filters */}
      <div className="mb-6">
        <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
          Categories
        </span>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange(null)}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer focus:outline-none flex justify-between items-center ${
              activeCategory === null
                ? 'bg-orange-50 text-orange-800 font-semibold'
                : 'text-stone-600 hover:bg-stone-50'
            }`}
          >
            <span>All Categories</span>
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.name)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer focus:outline-none flex justify-between items-center ${
                activeCategory === cat.name
                  ? 'bg-orange-50 text-orange-800 font-semibold'
                  : 'text-stone-650 hover:bg-stone-50'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
            Max Price
          </span>
          <span className="text-sm font-bold text-orange-850">
            ₹{priceRange}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="1500"
          step="50"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-orange-700 cursor-pointer h-1.5 bg-stone-200 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] text-stone-400 mt-1">
          <span>₹100</span>
          <span>₹1,500</span>
        </div>
      </div>

      {/* Ratings Filter */}
      <div className="mb-6">
        <span className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3">
          Minimum Rating
        </span>
        <div className="space-y-1">
          {[4.5, 4, 3].map((rating) => (
            <button
              key={rating}
              onClick={() => onRatingChange(rating)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors focus:outline-none cursor-pointer flex items-center justify-between ${
                minRating === rating
                  ? 'bg-orange-50 text-orange-800 font-semibold'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>{rating} Stars & above</span>
            </button>
          ))}
          <button
            onClick={() => onRatingChange(0)}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors focus:outline-none cursor-pointer flex items-center justify-between ${
              minRating === 0
                ? 'bg-orange-50 text-orange-800 font-semibold'
                : 'text-stone-605 hover:bg-stone-50'
            }`}
          >
            <span>Any Rating</span>
          </button>
        </div>
      </div>

      {/* Products aggregate count display footer */}
      <div className="pt-4 border-t border-stone-100 text-xs text-stone-450 font-heading">
        {productsCount} articles found
      </div>
    </aside>
  );
};

export default ProductFilter;
