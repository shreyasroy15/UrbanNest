import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useChatbot } from '../../hooks/useChatbot';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../../assets/logo.png';

export const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { setIsOpen: setChatbotOpen } = useChatbot();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100 py-4'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <img
                src={logoImg}
                alt="UrbanNest Logo"
                className="w-8.5 h-8.5 rounded-full object-cover border border-stone-200 shadow-xs"
              />
              <div className="flex flex-col text-left">
                <span className={`font-heading text-lg font-bold tracking-tight leading-none transition-colors ${
                  isScrolled || !isHomePage ? 'text-stone-900' : 'text-stone-900 md:text-stone-900'
                }`}>
                  UrbanNest
                </span>
                <span className={`text-[9px] tracking-widest font-semibold uppercase font-heading transition-colors mt-0.5 ${
                  isScrolled || !isHomePage ? 'text-orange-700' : 'text-orange-850'
                }`}>
                  Lifestyle Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Link Items */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-heading font-medium tracking-wide transition-all relative py-1 focus:outline-none focus:text-orange-705 ${
                    location.pathname === link.path
                      ? 'text-orange-700'
                      : isScrolled || !isHomePage
                      ? 'text-stone-600 hover:text-stone-900'
                      : 'text-stone-700 hover:text-stone-900 md:text-stone-820 hover:md:text-stone-950'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-700 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Nav actions buttons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/products"
                aria-label="Search Catalog"
                className={`p-2 rounded-full cursor-pointer hover:bg-stone-105 transition-colors focus:outline-none ${
                  isScrolled || !isHomePage ? 'text-stone-600' : 'text-stone-700'
                }`}
              >
                <Search className="w-5 h-5" />
              </Link>
              
              <button
                onClick={() => setChatbotOpen(true)}
                aria-label="Ask AI Assistant"
                className={`p-2 rounded-full cursor-pointer hover:bg-stone-105 transition-colors flex items-center gap-1.5 focus:outline-none ${
                  isScrolled || !isHomePage ? 'text-stone-600' : 'text-stone-700'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-wider bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">AI</span>
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Toggle Shopping Cart"
                className="relative p-2 rounded-full cursor-pointer hover:bg-stone-100 transition-colors focus:outline-none"
              >
                <ShoppingBag className={`w-5 h-5 ${isScrolled || !isHomePage ? 'text-stone-800' : 'text-stone-900'}`} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 px-1.5 py-0.5 text-[10px] font-bold bg-orange-700 text-white rounded-full min-w-5 text-center shadow-sm"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="flex md:hidden items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Toggle Shopping Cart"
                className="relative p-2 text-stone-800 focus:outline-none"
              >
                <ShoppingBag className="w-5.5 h-5.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 px-1.5 py-0.5 text-[9px] font-bold bg-orange-700 text-white rounded-full min-w-4 text-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 text-stone-800 focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-stone-900/40 backdrop-blur-xs md:hidden"
            />
            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white z-40 shadow-2xl p-6 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <img
                    src={logoImg}
                    alt="UrbanNest Logo"
                    className="w-8 h-8 rounded-full object-cover border border-stone-200"
                  />
                  <div className="flex flex-col text-left">
                    <span className="font-heading text-base font-bold tracking-tight text-stone-900 leading-none">
                      UrbanNest
                    </span>
                    <span className="text-[9px] tracking-widest font-semibold uppercase font-heading text-orange-700 mt-0.5">
                      Lifestyle Store
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Navigation Menu"
                  className="p-2 text-stone-650 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-4 mb-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-base font-medium py-2 border-b border-stone-50 focus:outline-none ${
                      location.pathname === link.path
                        ? 'text-orange-700 font-semibold'
                        : 'text-stone-605'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Quick Actions inside mobile menu */}
              <div className="flex flex-col space-y-3 mt-auto">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setChatbotOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border border-orange-200 bg-orange-50 text-orange-800 text-sm font-semibold cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Ask AI Assistant
                </button>
                
                <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-stone-900 text-stone-105 text-sm font-medium hover:bg-stone-800"
                >
                  Browse Products
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content overlapping due to sticky absolute nav */}
      {!isHomePage && <div className="h-16 md:h-20" />}
      {isHomePage && <div className="h-16 md:h-0" />} 
    </>
  );
};

export default Navbar;
