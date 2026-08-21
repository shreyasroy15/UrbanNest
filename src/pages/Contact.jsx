import React from 'react';
import SectionTitle from '../components/common/SectionTitle';
import QueryForm from '../components/contact/QueryForm';
import { MapPin, Phone, Mail, Clock, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact = () => {
  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left font-sans">
      <SectionTitle
        title="We'd Love to Hear From You"
        subtitle="Get in Touch"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 mb-16 items-start">
        
        {/* Left Column: Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-semibold font-serif text-stone-900 mb-4">
              Visit Our Retail Store
            </h3>
            <p className="text-sm text-stone-600 font-light leading-relaxed max-w-md">
              Have questions about our collections, customized gift packaging, or bulk pricing? Meet us in person or fill out our online ticketing sheet.
            </p>
          </div>

          <div className="space-y-6">
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-850 font-heading">Our Location</h4>
                <p className="text-xs text-stone-550 mt-1 leading-relaxed max-w-xs font-light">
                  104, Green Glen layout, Near Bellandur, Bangalore, Karnataka - 560103
                </p>
              </div>
            </div>

            {/* Telephone */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-850 font-heading">Phone number</h4>
                <p className="text-xs text-stone-550 mt-1 font-light">
                  <a href="tel:+91804928190" className="hover:text-orange-700 transition-colors">+91 80 4928 190</a>
                </p>
              </div>
            </div>

            {/* Email Support */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-850 font-heading">Email Address</h4>
                <p className="text-xs text-stone-550 mt-1 font-light">
                  <a href="mailto:support@urbanneststore.in" className="hover:text-orange-705 transition-colors">support@urbanneststore.in</a>
                </p>
              </div>
            </div>

            {/* Opening Timings */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-stone-850 font-heading">Store Hours</h4>
                <p className="text-xs text-stone-550 mt-1 font-light">
                  Monday - Saturday: 10 AM - 8 PM <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Map Link / Placeholder Visual */}
          <div className="border border-stone-200 rounded-2.5xl p-4 bg-stone-50 overflow-hidden shadow-xs relative">
            <h4 className="text-sm font-semibold text-stone-850 font-heading mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-700" />
              View Map Guide
            </h4>
            <div className="h-44 rounded-xl overflow-hidden relative shadow-xs group cursor-pointer border border-stone-105">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80" 
                alt="Map representation" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-stone-900/50 flex items-center justify-center transition-opacity duration-300 opacity-60 group-hover:opacity-80">
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-stone-905 text-xs font-semibold rounded-full shadow-lg font-heading"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Query Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <QueryForm />
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
