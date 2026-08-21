import React, { useState, useEffect } from 'react';
import { getAdminProducts } from '../../data/admin/demoProducts';
import { categories as initialCategories } from '../../data/categories';
import { FolderTree, Plus, Trash2, Edit2, ShieldAlert } from 'lucide-react';

export const AdminCategories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [products, setProducts] = useState([]);
  const [newCatName, setNewCatName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setProducts(getAdminProducts());
    
    // Seed initial categories from local storage or data definition
    const saved = localStorage.getItem('urbannest_admin_categories');
    if (saved) {
      setCategoriesList(JSON.parse(saved));
    } else {
      setCategoriesList(initialCategories);
      localStorage.setItem('urbannest_admin_categories', JSON.stringify(initialCategories));
    }
  }, []);

  const saveCategories = (updatedList) => {
    setCategoriesList(updatedList);
    localStorage.setItem('urbannest_admin_categories', JSON.stringify(updatedList));
  };

  const getProductCount = (categoryName) => {
    return products.filter(p => p.category === categoryName).length;
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newCatName.trim()) {
      return setError('Category name cannot be empty.');
    }

    const matches = categoriesList.find(c => c.name.toLowerCase() === newCatName.trim().toLowerCase());
    if (matches) {
      return setError('Category already exists.');
    }

    const newId = categoriesList.length > 0 ? Math.max(...categoriesList.map(c => c.id)) + 1 : 1;
    const updated = [...categoriesList, { id: newId, name: newCatName.trim() }];
    saveCategories(updated);
    setNewCatName('');
    setSuccess('Category successfully created.');
  };

  const handleUpdate = (id) => {
    setError('');
    setSuccess('');

    if (!editingName.trim()) {
      return setError('Category name cannot be empty.');
    }

    const updated = categoriesList.map(c => {
      if (c.id === id) {
        return { ...c, name: editingName.trim() };
      }
      return c;
    });

    saveCategories(updated);
    setEditingId(null);
    setEditingName('');
    setSuccess('Category renamed successfully.');
  };

  const handleDelete = (category) => {
    setError('');
    setSuccess('');
    
    // Prevent delete check if it has products inside
    const hasProducts = getProductCount(category.name) > 0;
    if (hasProducts) {
      return setError(`Cannot delete "${category.name}". Move or delete the products inside it first.`);
    }

    const updated = categoriesList.filter(c => c.id !== category.id);
    saveCategories(updated);
    setSuccess('Category removed successfully.');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          Category Manager
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
          Review categories list, check product counts density, or rename category filters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Form to create */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm text-left self-start space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200 flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-orange-700" />
            Add New Category
          </h3>

          {error && (
            <div className="p-3 bg-red-50 text-red-800 border border-red-200 text-[11px] rounded-xl font-medium leading-relaxed">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] rounded-xl font-medium leading-relaxed">
              {success}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label htmlFor="cat-name-input" className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5">
                Category Name *
              </label>
              <input
                id="cat-name-input"
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="Holiday Delights"
                className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs text-stone-707 dark:text-stone-300 focus:outline-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-600 text-white text-xs font-semibold rounded-xl focus:outline-none cursor-pointer text-center"
            >
              Create Category
            </button>
          </form>
        </div>

        {/* Right Columns: List categories */}
        <div className="md:col-span-2 space-y-3.5">
          <div className="bg-white dark:bg-stone-850 rounded-2.5xl border border-stone-205 dark:border-stone-800 shadow-sm overflow-hidden text-left">
            <div className="p-4 sm:p-5 border-b border-stone-105 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/10 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-450 dark:text-stone-550 font-heading">
                Store Categories
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 font-semibold text-stone-650 dark:text-stone-300">
                {categoriesList.length} total
              </span>
            </div>

            <div className="divide-y divide-stone-105 dark:divide-stone-850">
              {categoriesList.map((cat) => {
                const count = getProductCount(cat.name);
                const isEditing = editingId === cat.id;

                return (
                  <div 
                    key={cat.id} 
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 font-light text-stone-700 dark:text-stone-300"
                  >
                    <div className="flex items-center gap-3 w-full max-w-md">
                      <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-700 flex items-center justify-center shrink-0">
                        <FolderTree className="w-4 h-4" />
                      </div>
                      
                      {isEditing ? (
                        <div className="flex items-center gap-2 w-full">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="flex-grow px-3 py-1.5 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs text-stone-700 dark:text-white focus:outline-none"
                          />
                          <button
                            onClick={() => handleUpdate(cat.id)}
                            className="px-2.5 py-1.5 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-605 text-white text-[10px] font-semibold rounded-lg cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="px-2.5 py-1.5 border border-stone-200 dark:border-stone-700 text-stone-500 rounded-lg text-[10px] hover:bg-stone-50 cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="text-left">
                          <span className="font-semibold text-stone-900 dark:text-white font-heading block">
                            {cat.name}
                          </span>
                          <span className="text-[10px] text-stone-400 font-light block mt-0.5">
                            Contains {count} active products
                          </span>
                        </div>
                      )}
                    </div>

                    {!isEditing && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setEditingId(cat.id); setEditingName(cat.name); }}
                          className="p-1.5 text-stone-450 hover:text-stone-800 dark:hover:text-white hover:bg-stone-55 dark:hover:bg-stone-800 rounded-lg cursor-pointer"
                          title="Rename Category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat)}
                          className="p-1.5 text-red-500 hover:text-red-750 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminCategories;
