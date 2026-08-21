import React from 'react';
import SectionTitle from '../components/common/SectionTitle';
import { Heart, Globe, Footprints, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const About = () => {
  const stats = [
    { label: 'Founded In', value: '2021' },
    { label: 'Happy Neighbors', value: '5,000+' },
    { label: 'Curated Items', value: '300+' },
    { label: 'Store Location', value: 'Bellandur' }
  ];

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans text-left">
      <SectionTitle
        title="Little Things. Beautiful Living."
        subtitle="About UrbanNest"
      />

      {/* Grid section split image/text */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 mt-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-xl mx-auto"
        >
          <img
            src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80"
            alt="Inside UrbanNest lifestyle boutique shelfs"
            className="rounded-3xl shadow-lg border border-stone-200 object-cover w-full h-[450px]"
          />
          <div className="absolute -bottom-6 -right-6 hidden sm:flex bg-orange-700 text-stone-50 p-6 rounded-2xl flex-col shadow-xl">
            <span className="text-xl font-bold font-heading">100%</span>
            <span className="text-xs uppercase tracking-wide font-heading">Artisanal Curation</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:pl-6 text-stone-600 font-light"
        >
          <h3 className="text-2xl font-semibold font-serif text-stone-900 mb-6 leading-tight">
            Thoughtful Accents for Intentional Spaces
          </h3>
          <p className="text-sm leading-relaxed mb-6">
            At UrbanNest, we believe that your home should be a reflection of who you are. We started as a tiny boutique brick-and-mortar storefront in Bangalore with a singular vision: to curate home décor, stationery, gifts, and lifestyle accessories that bring comfort and beauty to everyday routines.
          </p>
          <p className="text-sm leading-relaxed mb-8">
            Every product cataloged in our shop holds a story. From hand-trimmed soy candles featuring organic wood wicks to sustainably harvested cork notebooks, we search for materials that are both tactilely premium and responsibly sourced. We cooperate directly with local artisans, making sure our collections remain distinct and affordable.
          </p>
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-stone-200">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-2xl font-bold text-orange-850 font-heading">{stat.value}</p>
                <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400 font-heading mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Brand Values section */}
      <section className="bg-stone-50 rounded-3.5xl p-8 sm:p-12 border border-stone-105 mb-16">
        <h3 className="text-xl sm:text-2xl font-semibold font-serif text-stone-900 mb-8 text-center">
          Our Guiding Philosophy
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-xs border border-stone-100 flex flex-col items-start">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-50 mb-4 text-orange-700">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-stone-850 mb-2 font-heading">Local Neighborhood Care</h4>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              We operate offline-first. We know our regulars by name, pack every order by hand, and include custom greeting notes to verify our genuine care.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xs border border-stone-100 flex flex-col items-start">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-50 mb-4 text-orange-700">
              <Globe className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-stone-850 mb-2 font-heading">Eco-Friendly Sourcing</h4>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              We actively filter out harsh synthetics, choosing natural cork, organic linen, soy wax, and heavy linen boards designed to decompose naturally.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-xs border border-stone-100 flex flex-col items-start">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-50 mb-4 text-orange-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-semibold text-stone-850 mb-2 font-heading font-heading">Elegant Simplicity</h4>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Minimal visual patterns, earth tone palettes, and clean lines. We focus on utility that accents your room without cluttering it.
            </p>
          </div>
        </div>
      </section>

      {/* Split photo section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:order-2"
        >
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
            alt="Artisanal packaging paper rolls"
            className="rounded-3xl shadow-lg border border-stone-200 object-cover w-full h-[350px]"
          />
        </motion.div>
        
        <div className="lg:pr-6 text-stone-600 font-light">
          <h3 className="text-2xl font-semibold font-serif text-stone-900 mb-6 leading-tight">
            Stop By and Say Hello
          </h3>
          <p className="text-sm leading-relaxed mb-6">
            Our retail store is nestled in Bellandur, Bangalore. Designed as a sanctuary from the busy city streets, it contains all the items on our site (and a few exclusive handmade runs). Enjoy fresh green tea, test different wood candle aromatics, and browse our physical desk.
          </p>
          <div className="flex items-center gap-3 text-sm text-stone-800 font-semibold font-heading">
            <Footprints className="w-5 h-5 text-orange-700" />
            <span>Visit us at Bellandur, Bangalore</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
