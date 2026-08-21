import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, Mail, Clock } from 'lucide-react';
import { useChatbot } from '../../hooks/useChatbot';
import logoImg from '../../assets/logo.png';

// Inline fallback brand icons to resolve package version conflicts
const Instagram = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer = () => {
  const { setIsOpen: setChatbotOpen } = useChatbot();

  return (
    <footer className="bg-stone-900 text-stone-300 font-sans border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Store Intro */}
          <div className="flex flex-col items-start text-left">
            <Link to="/" className="flex items-center gap-3 mb-4 group focus:outline-none">
              <img
                src={logoImg}
                alt="UrbanNest Logo"
                className="w-10 h-10 rounded-full object-cover border border-stone-800 shadow-xs"
              />
              <div className="flex flex-col text-left">
                <span className="font-heading text-xl font-bold tracking-tight text-white leading-none">
                  UrbanNest
                </span>
                <span className="text-[9px] tracking-widest font-semibold uppercase font-heading text-orange-400 mt-0.5">
                  Lifestyle Store
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-400 mb-6 leading-relaxed">
              "Little Things. Beautiful Living."<br />
              Discover thoughtfully selected décor, gifts, stationery, and everyday lifestyle essentials designed to make your space feel more like you.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="p-2 rounded-full bg-stone-800 hover:bg-orange-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="p-2 rounded-full bg-stone-800 hover:bg-orange-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-left">
            <h3 className="text-white font-heading font-semibold tracking-wider text-sm uppercase mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-orange-600">
              Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Shop Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Our Story</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact & Location</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support Options */}
          <div className="text-left">
            <h3 className="text-white font-heading font-semibold tracking-wider text-sm uppercase mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-orange-600">
              Customer Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => setChatbotOpen(true)}
                  className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-left focus:outline-none"
                >
                  <MessageSquare className="w-4 h-4 text-orange-500" />
                  Ask AI Assistant
                </button>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-orange-500" />
                  Submit Customer Query
                </Link>
              </li>
              <li>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>Mon - Sat: 10 AM - 8 PM</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact/Address Details */}
          <div className="text-left text-sm text-stone-400">
            <h3 className="text-white font-heading font-semibold tracking-wider text-sm uppercase mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-orange-600">
              Visit The Store
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>
                  104, Green Glen layout, Near Bellandur, Bangalore, Karnataka - 560103
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="tel:+91804928190" className="hover:text-white transition-colors">+91 80 4928 190</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <a href="mailto:support@urbanneststore.in" className="hover:text-white transition-colors">support@urbanneststore.in</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-850 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500">
          <p>© {new Date().getFullYear()} UrbanNest Lifestyle Store. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0 flex gap-4">
            <Link to="/about" className="hover:underline">Privacy Policy</Link>
            <Link to="/products" className="hover:underline">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
