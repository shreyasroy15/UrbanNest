import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminProducts, saveAdminProducts } from '../../data/admin/demoProducts';
import { categories } from '../../data/categories';
import { Plus, Search, Edit, Copy, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');
  const [activeStatus, setActiveStatus] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Confirm delete modal state
  const [deleteTarget, setDeleteTarget] = useState(null);
  
  useEffect(() => {
    setProducts(getAdminProducts());
  }, []);

  const handleFeaturedToggle = (targetId) => {
    const updated = products.map(p => {
      if (p.id === targetId) {
        return { ...p, isFeatured: !p.isFeatured };
      }
      return p;
    });
    setProducts(updated);
    saveAdminProducts(updated);
  };

  const handleDuplicate = (product) => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    const duplicated = {
      ...product,
      id: newId,
      name: `${product.name} (Copy)`,
      sku: `${product.sku || 'SKU'}-copy`,
      isFeatured: false,
      status: 'Draft'
    };
    const updated = [duplicated, ...products];
    setProducts(updated);
    saveAdminProducts(updated);
  };

  const handleDeleteClick = (product) => {
    setDeleteTarget(product);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const updated = products.filter(p => p.id !== deleteTarget.id);
    setProducts(updated);
    saveAdminProducts(updated);
    setDeleteTarget(null);
    if (currentPage > 1 && (filtered.length - 1) <= (currentPage - 1) * itemsPerPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filtering
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.sku && p.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory ? p.category === activeCategory : true;
    const pStatus = p.status || 'Active';
    const matchesStatus = activeStatus ? pStatus === activeStatus : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate Paginated subsets
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div>
          <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
            Catalog Products
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
            Manage your UrbanNest catalog items list, duplicate copy data, or edit listings.
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/products/new')}
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-600 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 focus:outline-none transition-colors shadow-sm self-start cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Product
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white dark:bg-stone-850 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between text-left">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center text-stone-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name, SKU..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 rounded-xl text-xs text-stone-705 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700 font-light"
          />
        </div>

        {/* Action filter category and statuses values */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={activeCategory}
            onChange={(e) => { setActiveCategory(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 bg-stone-55 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-650 dark:text-stone-300 focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          <select
            value={activeStatus}
            onChange={(e) => { setActiveStatus(e.target.value); setCurrentPage(1); }}
            className="px-3 py-2 bg-stone-55 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-650 dark:text-stone-300 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Main Table listings */}
      <div className="bg-white dark:bg-stone-850 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse bg-white dark:bg-stone-850 text-left">
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-[10px] uppercase font-bold tracking-wider text-stone-450 dark:text-stone-500 font-heading">
                <th className="px-5 py-4">Article Product</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Price</th>
                <th className="px-5 py-4 text-center">Stock</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-center">Featured</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-stone-105 dark:divide-stone-800/80">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-12 text-center text-stone-400 font-light">
                    No articles found matching filters criteria.
                  </td>
                </tr>
              ) : (
                paginated.map((product) => {
                  const status = product.status || 'Active';
                  return (
                    <tr 
                      key={product.id} 
                      className="hover:bg-stone-50/50 dark:hover:bg-stone-900/10 transition-colors"
                    >
                      {/* Name Details */}
                      <td className="px-5 py-4 flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 rounded-xl object-cover shrink-0 border border-stone-150 dark:border-stone-800 shadow-2xs"
                        />
                        <div className="flex flex-col text-left">
                          <span className="font-semibold text-stone-900 dark:text-white font-heading">
                            {product.name}
                          </span>
                          <span className="text-[10px] text-stone-450 dark:text-stone-500 font-mono mt-0.5">
                            SKU: {product.sku || `UN-${product.id}`}
                          </span>
                        </div>
                      </td>

                      {/* Category field */}
                      <td className="px-5 py-4 text-stone-600 dark:text-stone-400 font-light">
                        {product.category}
                      </td>

                      {/* Price fields */}
                      <td className="px-5 py-4 font-bold text-stone-800 dark:text-stone-250 font-heading">
                        ₹{product.price}
                      </td>

                      {/* Stock field */}
                      <td className="px-5 py-4 text-center font-heading font-medium dark:text-stone-300">
                        {product.stock || 20}
                      </td>

                      {/* Status switch toggle indicator */}
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold font-heading uppercase ${
                          status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' 
                            : 'bg-stone-100 text-stone-550 dark:bg-stone-800 dark:text-stone-450'
                        }`}>
                          {status}
                        </span>
                      </td>

                      {/* Featured button key */}
                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => handleFeaturedToggle(product.id)}
                          className={`w-6 h-6 rounded-full inline-flex items-center justify-center focus:outline-none transition-colors border cursor-pointer ${
                            product.isFeatured 
                              ? 'bg-amber-500 border-amber-600 text-white' 
                              : 'bg-white border-stone-200 dark:bg-stone-800 dark:border-stone-705 text-stone-400 hover:text-stone-700'
                          }`}
                          title="Toggle featured landing homepage view"
                        >
                          ★
                        </button>
                      </td>

                      {/* Options actions lists */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <button
                            onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                            className="p-1 px-1.5 text-stone-500 hover:text-orange-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md focus:outline-none cursor-pointer"
                            title="Edit Product Details"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDuplicate(product)}
                            className="p-1 px-1.5 text-stone-500 hover:text-orange-700 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md focus:outline-none cursor-pointer"
                            title="Duplicate Product Card"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className="p-1 px-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md focus:outline-none cursor-pointer"
                            title="Delete Product Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar controls footer */}
        {totalPages > 1 && (
          <div className="px-5 py-4 bg-stone-50 dark:bg-stone-900 border-t border-stone-105 dark:border-stone-850 flex items-center justify-between text-xs font-heading">
            <span className="text-stone-400">
              Showing page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 border border-stone-200 dark:border-stone-800 rounded-lg bg-white dark:bg-stone-850 text-stone-650 dark:text-stone-450 hover:bg-stone-50 disabled:opacity-40 cursor-pointer focus:outline-none font-medium"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-2.5 py-1.5 border border-stone-200 dark:border-stone-800 rounded-lg bg-white dark:bg-stone-850 text-stone-650 dark:text-stone-450 hover:bg-stone-50 disabled:opacity-40 cursor-pointer focus:outline-none font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Delete Dialog overlay modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <div 
            onClick={() => setDeleteTarget(null)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
          />
          {/* Modal Container */}
          <div className="relative w-full max-w-sm bg-white dark:bg-stone-850 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 z-10 text-left shadow-2xl animate-scaleUp">
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/20 text-red-650 flex items-center justify-center mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-stone-900 dark:text-white font-semibold font-serif text-lg">
              Delete Product?
            </h3>
            <p className="text-xs text-stone-550 dark:text-stone-450 font-light mt-1.5 leading-relaxed">
              Are you sure you want to remove <span className="font-semibold text-stone-850 dark:text-stone-300">"{deleteTarget.name}"</span> from the catalog list? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-2.5 text-xs font-heading font-semibold">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border border-stone-205 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-850 text-stone-600 dark:text-stone-400 hover:bg-stone-50 cursor-pointer focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-white bg-red-600 hover:bg-red-500 cursor-pointer focus:outline-none"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;
