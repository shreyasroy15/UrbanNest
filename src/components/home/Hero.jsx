import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ShoppingBag, ArrowDown } from 'lucide-react';
import { useChatbot } from '../../hooks/useChatbot';
import { motion } from 'framer-motion';
import Button from '../common/Button';

export const Hero = () => {
  const navigate = useNavigate();
  const { setIsOpen: setChatbotOpen } = useChatbot();

  const handleScrollDown = () => {
    const nextSection = document.getElementById('featured-categories');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-50 py-20">
      {/* Background Graphic elements & overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-stone-100/90 via-stone-50/50 to-transparent z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Tagline Pill */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100/80 text-orange-900 text-xs font-semibold tracking-widest uppercase mb-6 font-heading shadow-xs">
            ✨ Little Things. Beautiful Living.
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-stone-900 max-w-4xl leading-tight mb-6">
            Make Your Space <br />
            <span className="text-orange-700 italic">Feel Like Home</span>
          </h1>

          {/* Subtext */}
          <p className="text-stone-605 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-sans font-light">
            Discover thoughtfully selected décor, gifts, stationery, and everyday lifestyle essentials designed to make your space feel more like you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/products')}
              className="w-full sm:w-auto"
              icon={<ShoppingBag className="w-4 h-4" />}
            >
              Explore Products
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setChatbotOpen(true)}
              className="w-full sm:w-auto border-stone-300 hover:border-orange-700 hover:text-orange-700"
              icon={<MessageSquare className="w-4 h-4 text-orange-700" />}
            >
              Ask UrbanNest AI
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Decorative floating minimal product cards for visual premium wow factor */}
      <motion.div
        initial={{ opacity: 0, x: -50, rotate: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="absolute left-8 lg:left-16 bottom-16 hidden xl:flex flex-col p-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 pointer-events-none max-w-xs"
      >
        <img 
          src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=120&q=80" 
          alt="Clay Decor" 
          className="w-24 h-24 object-cover rounded-xl mb-3 mx-auto"
        />
        <div className="text-left">
          <h4 className="text-xs font-semibold text-stone-900 font-heading">Handcrafted Clay Vase</h4>
          <span className="text-[10px] text-orange-700 font-bold font-heading">₹899</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50, rotate: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute right-8 lg:right-16 top-24 hidden xl:flex flex-col p-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 pointer-events-none max-w-xs"
      >
        <img 
          src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=120&q=80" 
          alt="Amber Diffuser" 
          className="w-24 h-24 object-cover rounded-xl mb-3 mx-auto"
        />
        <div className="text-left font-heading">
          <h4 className="text-xs font-semibold text-stone-900">Amber Reed Diffuser</h4>
          <span className="text-[10px] text-orange-700 font-bold">₹649</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.button
          onClick={handleScrollDown}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-1 text-stone-400 hover:text-stone-850 cursor-pointer focus:outline-none"
        >
          <span className="text-[9px] uppercase tracking-widest font-heading font-medium">Scroll Discover</span>
          <ArrowDown className="w-4 h-4 text-orange-700" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
