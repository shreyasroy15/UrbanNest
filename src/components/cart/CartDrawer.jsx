import React, { useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  // Scroll lock & Escape key
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckoutRedirect = () => {
    setIsCartOpen(false);
    navigate('/contact');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-45 bg-stone-900/60 backdrop-blur-xs"
          />

          {/* Sliding drawer bar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-150 flex items-center justify-between font-sans">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-orange-705" />
                <h3 className="text-base font-semibold text-stone-900 font-heading">
                  Your Shopping Cart ({cartCount})
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1 hover:bg-stone-50 rounded-full text-stone-500 hover:text-stone-850 cursor-pointer focus:outline-none"
                aria-label="Close cart drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center font-sans">
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-stone-50 mb-4 text-stone-300">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-semibold text-stone-800">Your Cart is Empty</h4>
                  <p className="text-xs text-stone-400 max-w-[200px] mt-1.5 leading-relaxed font-light">
                    It looks like you haven't added any curated items yet.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/products');
                    }}
                    className="mt-6 text-xs text-orange-700 font-bold uppercase tracking-wider hover:underline cursor-pointer focus:outline-none"
                  >
                    Start Shopping &rarr;
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {/* Summary calculation drawer footer */}
            {cartItems.length > 0 && (
              <CartSummary
                total={cartTotal}
                count={cartCount}
                onCheckout={handleCheckoutRedirect}
                onContinue={() => setIsCartOpen(false)}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
