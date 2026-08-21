import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

export const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          title="What Our Neighbors Say"
          subtitle="Customer Testimonials"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="p-8 rounded-2xl bg-stone-50 border border-stone-100 text-left flex flex-col justify-between custom-shadow-sm hover:custom-shadow-md transition-all duration-300 relative"
            >
              {/* Review Text */}
              <div className="mb-6">
                {/* Stars Indicator */}
                <div className="flex gap-0.5 mb-4 text-orange-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 fill-current ${
                        i < Math.floor(item.rating) ? 'text-orange-550' : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-stone-605 italic text-sm leading-relaxed font-light">
                  "{item.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-4 pt-4 border-t border-stone-200/60">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 border border-stone-200"
                  loading="lazy"
                />
                <div>
                  <h4 className="text-sm font-semibold text-stone-900 font-heading">
                    {item.name}
                  </h4>
                  <span className="text-xs text-stone-500 font-heading">
                    {item.location}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
