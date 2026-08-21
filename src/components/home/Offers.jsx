import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Percent, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

export const Offers = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Background soft lighting overlays */}
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-orange-700/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 top-0 w-80 h-80 rounded-full bg-stone-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 text-left"
        >
          {/* Left Text Detail */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950 text-orange-400 text-xs font-semibold uppercase tracking-widest font-heading mb-4">
              <Percent className="w-3.5 h-3.5" /> Special Offer
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-6 leading-tight">
              Make Your Space Truly Feel <br />Like Home
            </h2>
            <p className="text-stone-400 text-base md:text-lg mb-8 leading-relaxed font-light">
              Create cozy corners and elegant workspaces. Get a flat <strong className="text-orange-400 font-semibold">15% off</strong> your very first purchase of curated ceramics and stationery sets. Use code <span className="font-mono bg-stone-800 text-stone-105 px-2.5 py-1 rounded border border-stone-700 font-bold ml-1">NEST15</span> at our offline desk, or inquire through our form.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/products')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Explore Selected Items
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => navigate('/contact')}
                className="text-stone-300 hover:text-white"
              >
                Inquire For Bulk Gifts
              </Button>
            </div>
          </div>

          {/* Right Product Spotlight Image */}
          <div className="relative w-full lg:w-96 h-80 rounded-2xl overflow-hidden shadow-2xl shrink-0 group border border-stone-850">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=650&q=80"
              alt="Cozy interior light"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent flex items-end p-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-orange-400 font-bold font-heading mb-1">Spotlight Item</p>
                <h4 className="text-sm font-medium text-stone-50">Ceramic Glazed Table Sets</h4>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Offers;
