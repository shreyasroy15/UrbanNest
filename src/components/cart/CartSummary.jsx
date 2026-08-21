import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export const CartSummary = ({ total, count, onCheckout, onContinue }) => {
  return (
    <div className="border-t border-stone-200 p-6 bg-stone-50/70 font-sans text-left">
      {/* Subtotal calculation row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-stone-600">Subtotal ({count} items)</span>
        <span className="text-lg font-bold font-heading text-stone-900">{formatCurrency(total)}</span>
      </div>
      
      {/* Tax/Shipping notice */}
      <p className="text-[10px] text-stone-450 leading-relaxed mb-6">
        Prices include GST. Standard shipping or store pickup will be selected during checkout inquiries.
      </p>

      {/* Button CTAs */}
      <div className="space-y-3">
        <button
          onClick={onCheckout}
          className="w-full py-3 px-6 rounded-full bg-stone-903 bg-stone-900 border border-stone-900 text-stone-105 font-medium text-sm hover:bg-stone-800 transition-all text-center flex items-center justify-center cursor-pointer focus:outline-none"
        >
          Contact Store to Buy
        </button>
        <button
          onClick={onContinue}
          className="w-full py-3 px-6 rounded-full border border-stone-300 bg-white text-stone-700 font-medium text-sm hover:bg-stone-50 transition-all text-center cursor-pointer focus:outline-none"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
