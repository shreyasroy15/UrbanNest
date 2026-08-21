import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { id, name, price, image, category, quantity } = item;

  return (
    <div className="flex gap-4 py-4 border-b border-stone-100 font-sans text-left items-start">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-xl bg-stone-50 shrink-0 border border-stone-200/50"
      />

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between min-h-[80px]">
        <div>
          <span className="text-[9px] uppercase font-bold tracking-widest font-heading text-stone-400">
            {category}
          </span>
          <h4 className="text-xs font-semibold text-stone-850 font-heading line-clamp-1">
            {name}
          </h4>
          <p className="text-sm font-bold text-orange-850 mt-1 font-heading">
            {formatCurrency(price)}
          </p>
        </div>

        {/* Quantity Controls & Delete */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50 overflow-hidden">
            <button
              onClick={() => updateQuantity(id, quantity - 1)}
              className="p-1 px-2 hover:bg-stone-150 text-stone-500 cursor-pointer transition-colors focus:outline-none"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-bold text-stone-800 font-heading">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="p-1 px-2 hover:bg-stone-150 text-stone-500 cursor-pointer transition-colors focus:outline-none"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => removeFromCart(id)}
            className="p-1 text-stone-400 hover:text-red-600 transition-colors cursor-pointer focus:outline-none"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
