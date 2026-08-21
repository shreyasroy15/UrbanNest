import React from 'react';
import { Award, ShieldCheck, HeartHandshake, MessageSquareText } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

export const WhyChooseUs = () => {
  const pillars = [
    {
      id: 1,
      title: "Quality Products",
      desc: "Carefully selected lifestyle products sourced from eco-conscious and artisanal crafters.",
      icon: <Award className="w-6 h-6 text-orange-700" />
    },
    {
      id: 2,
      title: "Affordable Prices",
      desc: "Beautiful products at highly accessible prices. Elegance shouldn't carry a luxury tax.",
      icon: <ShieldCheck className="w-6 h-6 text-orange-700" />
    },
    {
      id: 3,
      title: "Personalized Service",
      desc: "Proudly local. We treat every visitor like a neighbor and curate order packaging with care.",
      icon: <HeartHandshake className="w-6 h-6 text-orange-700" />
    },
    {
      id: 4,
      title: "Fast Customer Support",
      desc: "Quick, helpful answers through our integrated AI assistant chatbot and ticketing system.",
      icon: <MessageSquareText className="w-6 h-6 text-orange-700" />
    }
  ];

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 bg-stone-50 border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionTitle
          title="Designed for Your Lifestyle"
          subtitle="Why Choose UrbanNest"
        />

        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={cardItemVariants}
              whileHover={{ y: -5 }}
              className="p-8 bg-white rounded-2xl text-left shadow-xs hover:shadow-md transition-all duration-300 border border-stone-100"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-50 mb-6">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-semibold font-heading text-stone-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-stone-550 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
