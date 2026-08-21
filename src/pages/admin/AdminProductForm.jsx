import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getAdminProducts, saveAdminProducts } from '../../data/admin/demoProducts';
import { categories } from '../../data/categories';
import { ArrowLeft, Save, Sparkles, Image as ImageIcon } from 'lucide-react';

export const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    description: '',
    price: '',
    discountPrice: '',
    sku: '',
    stock: '',
    rating: '4.8',
    image: '',
    isFeatured: false,
    status: 'Active'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Sample decorative preset URLs
  const sampleImages = [
    { label: 'Ceramic Vase', url: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=400&q=80' },
    { label: 'Reed Diffuser', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=400&q=80' },
    { label: 'Soy Candle', url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=400&q=80' },
    { label: 'Paper Journal', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80' },
    { label: 'Linen Napkins', url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80' }
  ];

  useEffect(() => {
    if (isEditMode) {
      const items = getAdminProducts();
      const match = items.find(p => p.id === Number(id));
      if (match) {
        setFormData({
          name: match.name || '',
          slug: match.slug || '',
          category: match.category || '',
          description: match.description || '',
          price: match.price || '',
          discountPrice: match.discountPrice || '',
          sku: match.sku || `UN-${match.id}`,
          stock: match.stock || '20',
          rating: match.rating || '4.8',
          image: match.image || '',
          isFeatured: match.isFeatured || false,
          status: match.status || 'Active'
        });
      } else {
        setError('Requested product item not found.');
      }
    }
  }, [id, isEditMode]);

  // Derive Slug
  const handleNameChange = (e) => {
    const val = e.target.value;
    const derivedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    setFormData(prev => ({
      ...prev,
      name: val,
      slug: isEditMode ? prev.slug : derivedSlug,
      sku: isEditMode ? prev.sku : `UN-${derivedSlug.toUpperCase().slice(0, 8)}`
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic Input Validations
    if (!formData.name.trim()) return setError('Product name is required.');
    if (!formData.category) return setError('Please choose a valid category.');
    if (!formData.description.trim()) return setError('Please enter a brief item description.');
    if (!formData.image) return setError('Product image URL cannot be blank.');
    
    const priceNum = Number(formData.price);
    const stockNum = Number(formData.stock);

    if (isNaN(priceNum) || priceNum <= 0) {
      return setError('Please enter a valid product price higher than 0.');
    }
    if (isNaN(stockNum) || stockNum < 0) {
      return setError('Inventory stock levels must be greater than or equal to 0.');
    }

    const items = getAdminProducts();

    if (isEditMode) {
      const idx = items.findIndex(p => p.id === Number(id));
      if (idx !== -1) {
        items[idx] = {
          ...items[idx],
          name: formData.name,
          slug: formData.slug,
          category: formData.category,
          description: formData.description,
          price: priceNum,
          discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
          sku: formData.sku,
          stock: stockNum,
          rating: Number(formData.rating),
          image: formData.image,
          isFeatured: formData.isFeatured,
          status: formData.status
        };
        saveAdminProducts(items);
        setSuccess('Product details successfully updated.');
        setTimeout(() => navigate('/admin/products'), 1000);
      } else {
        setError('Save error: Could not identify target product ID.');
      }
    } else {
      const nextId = items.length > 0 ? Math.max(...items.map(p => p.id)) + 1 : 1;
      const newProduct = {
        id: nextId,
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        description: formData.description,
        price: priceNum,
        discountPrice: formData.discountPrice ? Number(formData.discountPrice) : undefined,
        sku: formData.sku,
        stock: stockNum,
        rating: Number(formData.rating),
        image: formData.image,
        isFeatured: formData.isFeatured,
        status: formData.status
      };
      
      const updated = [newProduct, ...items];
      saveAdminProducts(updated);
      setSuccess('Product successfully added to the catalog.');
      setTimeout(() => navigate('/admin/products'), 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans text-left">
      {/* Back button */}
      <div>
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Catalog List
        </Link>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          {isEditMode ? 'Edit Product Details' : 'Add New Catalog Product'}
        </h1>
        <p className="text-xs text-stone-505 dark:text-stone-400 font-light mt-1">
          {isEditMode ? 'Modify specific inventory information, categories and landing hooks.' : 'Specify price, slug tags, categories and images for a new storefront item.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Inputs parameters */}
        <div className="lg:col-span-2 space-y-5 bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm">
          {error && (
            <div className="p-3.5 bg-red-50 text-red-800 border border-red-200 text-xs font-semibold rounded-xl leading-relaxed">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold rounded-xl leading-relaxed animate-fadeIn">
              {success}
            </div>
          )}

          {/* Name & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Product Name *
              </label>
              <input
                id="name-input"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Amber Glass Candlestick"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
              />
            </div>
            
            <div>
              <label htmlFor="slug-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Slug (Auto URL)
              </label>
              <input
                id="slug-input"
                name="slug"
                type="text"
                required
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="amber-glass-candlestick"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-205 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="desc-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
              Item Description *
            </label>
            <textarea
              id="desc-input"
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide a descriptive detail specifications list for this item..."
              className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-707 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700 font-light leading-relaxed"
            />
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Price (₹ INR) *
              </label>
              <input
                id="price-input"
                name="price"
                type="number"
                min="0"
                required
                value={formData.price}
                onChange={handleInputChange}
                placeholder="699"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
              />
            </div>

            <div>
              <label htmlFor="discount-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Discount Price (Optional)
              </label>
              <input
                id="discount-input"
                name="discountPrice"
                type="number"
                min="0"
                value={formData.discountPrice}
                onChange={handleInputChange}
                placeholder="499"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
              />
            </div>
          </div>

          {/* Category & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cat-select" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Category Group *
              </label>
              <select
                id="cat-select"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-805 border border-stone-202 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
              >
                <option value="">Choose category...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status-select" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Visibility Status
              </label>
              <select
                id="status-select"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-805 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
              >
                <option value="Active">Active Listing</option>
                <option value="Draft">Draft Mode</option>
              </select>
            </div>
          </div>

          {/* SKU & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sku-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Inventory SKU
              </label>
              <input
                id="sku-input"
                name="sku"
                type="text"
                required
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700 font-mono"
              />
            </div>

            <div>
              <label htmlFor="stock-input" className="block text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 mb-2">
                Stock Quantity *
              </label>
              <input
                id="stock-input"
                name="stock"
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="20"
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Image and Featured toggles */}
        <div className="space-y-6">
          
          {/* Brand Image Upload/Selector Card */}
          <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200">
              Product Media Image
            </h3>
            
            {/* Live Image boundary preview */}
            <div className="h-44 rounded-xl border border-stone-200 dark:border-stone-750 bg-stone-50 dark:bg-stone-900 overflow-hidden flex items-center justify-center relative">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Url Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-stone-400 p-4 font-light">
                  <ImageIcon className="w-8 h-8 text-stone-300 mx-auto mb-1.5" />
                  <span className="text-[10px]">No image URL defined.</span>
                </div>
              )}
            </div>

            {/* Input URL field */}
            <div>
              <label htmlFor="image-input" className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5">
                Image Source URL *
              </label>
              <input
                id="image-input"
                name="image"
                type="text"
                required
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://unsplash..."
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-[11px] text-stone-707 dark:text-stone-300 focus:outline-none"
              />
            </div>

            {/* Preset Selector Helpers */}
            <div className="space-y-1.5 pt-2">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-stone-400">
                Preset Unsplash Stock Options
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sampleImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: img.url }))}
                    className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-650 dark:text-stone-300 hover:bg-stone-200 hover:text-stone-900 rounded-lg cursor-pointer focus:outline-none border border-stone-200 dark:border-stone-700/80"
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Featured toggle option card */}
          <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-205 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200">
              Homepage Visibility
            </h3>
            
            <label className="flex items-center gap-3 bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-800/80 p-3 rounded-2xl cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="w-4.5 h-4.5 accent-orange-700 border-stone-300 rounded cursor-pointer"
              />
              <div className="text-left font-light select-none">
                <span className="text-xs font-semibold text-stone-800 dark:text-white font-heading block">
                  Mark as Featured
                </span>
                <span className="text-[9px] text-stone-450 dark:text-stone-500 leading-none">
                  Display this item on landing hero shelves.
                </span>
              </div>
            </label>
          </div>

          {/* Form actions triggers */}
          <div className="flex gap-3 text-xs font-heading font-semibold">
            <Link
              to="/admin/products"
              className="flex-1 text-center py-3 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-850 text-stone-600 dark:text-stone-400 hover:bg-stone-50 cursor-pointer focus:outline-none"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-600 text-white rounded-xl flex items-center justify-center gap-1.5 focus:outline-none transition-colors shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4 text-orange-400" />
              Save Article
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
