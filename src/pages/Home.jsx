import React, { useState } from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import Offers from '../components/home/Offers';
import ProductModal from '../components/products/ProductModal';

export const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="page-transition min-h-screen">
      {/* Hero section banner */}
      <Hero />

      {/* Product Categories grid split */}
      <Categories />

      {/* Featured list catalog panel snippet */}
      <FeaturedProducts onQuickView={handleQuickView} />

      {/* Why Choose Us feature pillars info */}
      <WhyChooseUs />

      {/* Special Marketing Discounts banner */}
      <Offers />

      {/* Customer testimonials block */}
      <Testimonials />

      {/* Quick View Dialog modal wrapper */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;
