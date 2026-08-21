import React, { useEffect } from 'react';
import { X, Star, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();

  // Scroll lock & Escape key listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const { name, category, price, rating, reviewsCount, description, image, features } = product;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
        />

        {/* Modal content body container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-2xl border border-stone-105 flex flex-col md:flex-row z-10 text-left"
        >
          {/* Close button top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-stone-850 hover:bg-stone-50 rounded-full cursor-pointer focus:outline-none"
            aria-label="Close modal dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left section: Product zoom photo */}
          <div className="w-full md:w-1/2 bg-stone-50 flex items-center justify-center p-4 relative">
            <img
              src={image}
              alt={name}
              className="w-full aspect-square object-cover rounded-2xl shadow-xs"
            />
          </div>

          {/* Right section: Info specifications & actions */}
          <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category pill */}
              <span className="text-[10px] uppercase font-bold tracking-widest font-heading text-stone-500">
                {category}
              </span>
              
              {/* Product Name */}
              <h3 className="text-2xl font-semibold font-serif text-stone-900 mt-2 mb-3 leading-tight">
                {name}
              </h3>

              {/* Star reviews rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-500">
                  <Star className="w-4 h-4 fill-current text-orange-550" />
                </div>
                <span className="text-sm font-semibold text-stone-800 font-heading">{rating}</span>
                <span className="text-xs text-stone-400">({reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              <p className="text-2xl font-bold font-heading text-orange-850 mb-4">
                {formatCurrency(price)}
              </p>

              {/* Long description text */}
              <p className="text-sm text-stone-605 font-light leading-relaxed mb-6">
                {description}
              </p>

              {/* Feature check list */}
              {features && features.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 font-heading mb-3">
                    Specifications
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-stone-550">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-655 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions button controls */}
            <div className="flex gap-4 pt-6 border-t border-stone-100 mt-auto">
              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="flex-1 py-3 px-6 rounded-full bg-stone-900 border border-stone-900 text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors cursor-pointer focus:outline-none"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductModal;
