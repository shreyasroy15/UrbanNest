import React from 'react';
import ProductCard from './ProductCard';
import { PackageX } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProductGrid = ({ products, onQuickView }) => {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 py-16 px-4 text-center bg-white border border-stone-200/80 custom-shadow-sm rounded-2.5xl flex flex-col items-center justify-center font-sans"
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-stone-50 mb-6 text-stone-300">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-stone-850 mb-2">No Products Found</h3>
        <p className="text-sm text-stone-500 max-w-sm leading-relaxed font-light">
          We couldn't search any catalog matches for your current filters. Try resetting headings or clear matching terms.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
