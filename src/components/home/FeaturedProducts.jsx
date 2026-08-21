import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from '../products/ProductCard';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

export const FeaturedProducts = ({ onQuickView }) => {
  const navigate = useNavigate();
  // Filter top 4 features
  const featured = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-20 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <SectionTitle
            title="Featured Essentials"
            subtitle="Our Handpicked Favorites"
            align="left"
            className="mb-0 max-w-xl"
          />
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/products')}
            className="mt-4 md:mt-0 font-heading border-stone-300 hover:border-orange-700 hover:text-orange-700 self-start"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
