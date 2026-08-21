import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductSearch from '../components/products/ProductSearch';
import ProductFilter from '../components/products/ProductFilter';
import ProductGrid from '../components/products/ProductGrid';
import ProductModal from '../components/products/ProductModal';
import SectionTitle from '../components/common/SectionTitle';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam || null);
  const [priceRange, setPriceRange] = useState(1500); // max price search
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync category param change
  useEffect(() => {
    setActiveCategory(categoryParam || null);
  }, [categoryParam]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveCategory(null);
    setPriceRange(1500);
    setMinRating(0);
    setSortBy('featured');
    setSearchParams({});
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Compile Filtering Logic
  const filteredProducts = products
    .filter((product) => {
      // Search Box matching
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      // Category matching
      if (activeCategory && product.category !== activeCategory) {
        return false;
      }

      // Max price limit
      if (product.price > priceRange) {
        return false;
      }

      // Rating matching
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sorting Options
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'newest') {
        return b.isNew - a.isNew; // New items first
      }
      return b.isFeatured - a.isFeatured; // default featured
    });

  return (
    <div className="page-transition max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SectionTitle
        title="Find Joy in the Little Things"
        subtitle="Explore Our Pieces"
      />

      {/* Main product search input */}
      <ProductSearch
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm('')}
      />

      {/* Grid listing and side controls split */}
      <div className="flex flex-col lg:flex-row gap-8 mt-12">
        <ProductFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          minRating={minRating}
          onRatingChange={setMinRating}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          productsCount={filteredProducts.length}
        />

        <ProductGrid
          products={filteredProducts}
          onQuickView={handleQuickView}
        />
      </div>

      {/* Quick View detail modal dialog */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Products;
