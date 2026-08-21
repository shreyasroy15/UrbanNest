import React from 'react';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';
import { motion } from 'framer-motion';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { name, category, price, rating, image, isNew } = product;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl border border-stone-100 overflow-hidden flex flex-col justify-between custom-shadow-sm hover:custom-shadow-md transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-50">
        
        {/* badges */}
        {isNew && (
          <span className="absolute top-4 left-4 z-10 px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider bg-orange-700 text-stone-50 rounded-full shadow-xs">
            NEW
          </span>
        )}

        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* hover quick actions */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white hover:bg-stone-50 text-stone-900 rounded-full shadow-lg transition-transform duration-300 hover:scale-115 cursor-pointer focus:outline-none"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-5" />
          </button>
          
          <button
            onClick={() => addToCart(product)}
            className="p-3 bg-orange-700 hover:bg-orange-800 text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-115 cursor-pointer focus:outline-none"
            aria-label="Add to Cart"
          >
            <ShoppingCart className="w-4 h-5" />
          </button>
        </div>
      </div>

      {/* Product Description details */}
      <div className="p-5 flex flex-col justify-between grow">
        <div className="text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest font-heading text-stone-500">
            {category}
          </span>
          <h3 className="text-sm font-semibold text-stone-850 font-heading tracking-wide mt-1 line-clamp-1 leading-snug">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current text-orange-550" />
            </div>
            <span className="text-xs text-stone-600 font-heading font-medium">{rating}</span>
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-50">
          <span className="text-base font-bold font-heading text-orange-850">
            {formatCurrency(price)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-orange-700 cursor-pointer transition-colors focus:outline-none py-1.5 px-3 rounded-md hover:bg-stone-50"
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
