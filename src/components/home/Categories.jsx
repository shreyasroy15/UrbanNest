import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../data/categories';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

export const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${encodeURIComponent(slug)}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="featured-categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          title="Curated Collections"
          subtitle="Explore Categories"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              onClick={() => handleCategoryClick(category.name)}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Category background image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

              {/* Text placement */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                <span className="text-[10px] uppercase font-bold tracking-widest font-heading text-orange-400 mb-1">
                  Collection ({category.count} items)
                </span>
                <h3 className="text-xl font-semibold font-serif text-white group-hover:text-orange-350 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-xs text-stone-300 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-12 overflow-hidden">
                  {category.description}
                </p>
                <div className="h-0.5 w-0 bg-orange-500 mt-3 transition-all duration-500 group-hover:w-12" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Categories;
