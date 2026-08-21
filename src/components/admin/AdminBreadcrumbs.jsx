import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const AdminBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Capitalize name mapping
  const getBreadcrumbName = (slug) => {
    if (!slug) return '';
    if (slug === 'admin') return 'Admin';
    if (slug === 'new') return 'Add Product';
    
    // Capitalize and replace hyphens
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <nav className="flex items-center text-xs font-heading font-medium tracking-wide text-stone-500 dark:text-stone-400 select-none">
      <Link
        to="/admin/dashboard"
        className="flex items-center gap-1 hover:text-stone-900 dark:hover:text-white transition-colors focus:outline-none"
      >
        <Home className="w-3.5 h-3.5 text-stone-400" />
        <span className="hidden md:inline">Dashboard</span>
      </Link>

      {pathnames.map((value, index) => {
        // Skip first 'admin' if it matches 'dashboard' pathing, or print clean splits
        if (value === 'admin' && pathnames[index + 1] === 'dashboard') return null;
        if (value === 'admin') return null;

        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = getBreadcrumbName(value);

        // Don't link if it is just a product ID in editing url paths or similar
        const isUuid = /^[0-9a-fA-F-]+$/.test(value) || !isNaN(value);
        const displayName = isUuid ? 'Edit' : name;

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-3 h-3 mx-2 text-stone-300 dark:text-stone-700 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-stone-800 dark:text-stone-105 font-heading">
                {displayName}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-stone-900 dark:hover:text-white transition-colors focus:outline-none"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default AdminBreadcrumbs;
