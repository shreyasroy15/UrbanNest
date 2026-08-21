import React, { useEffect, useRef } from 'react';
import { Menu, Bell, Sun, Moon, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminBreadcrumbs from './AdminBreadcrumbs';

export const AdminNavbar = ({ 
  setSidebarOpen, 
  setNotificationsOpen, 
  unreadCount, 
  darkMode, 
  setDarkMode 
}) => {
  const searchInputRef = useRef(null);
  const adminUser = JSON.parse(localStorage.getItem('urbannest_admin_user') || '{}');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850 transition-colors duration-200 font-sans shadow-xs shrink-0">
      {/* Left items: Mobile toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-1.5 text-stone-500 dark:text-stone-405 hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl cursor-pointer focus:outline-none"
          aria-label="Open sidebar menu drawer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <AdminBreadcrumbs />
        </div>
      </div>

      {/* Right items: Search, DarkMode, Bells, Admin profile */}
      <div className="flex items-center gap-3">
        {/* Global Search input */}
        <div className="relative hidden md:block w-64 lg:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center text-stone-405">
            <Search className="w-4 h-4" />
          </span>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search anything... (Ctrl + K)"
            className="w-full pl-9 pr-12 py-1.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/80 rounded-full text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700 font-light"
          />
          <kbd className="absolute right-3 top-1.5 px-1.5 py-0.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-[9px] font-bold text-stone-400 rounded-md select-none leading-none shadow-2xs">
            ⌘K
          </kbd>
        </div>

        {/* Theme select switcher */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl transition-all cursor-pointer focus:outline-none"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
        </button>

        {/* Notifications center bell */}
        <button
          onClick={() => setNotificationsOpen(true)}
          className="p-2 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-stone-800 rounded-xl transition-all cursor-pointer relative focus:outline-none"
          title="Notifications Center"
        >
          <Bell className="w-4.5 h-4.5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-700 text-white text-[8px] font-bold font-heading flex items-center justify-center rounded-full ring-2 ring-white dark:ring-stone-900">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Separator line */}
        <div className="h-6 w-px bg-stone-200 dark:bg-stone-800/80" />

        {/* Profile details */}
        <div className="flex items-center gap-2.5 pl-1.5">
          <img
            src={adminUser.avatar}
            alt={adminUser.name || 'Admin'}
            className="w-8 h-8 rounded-full object-cover border border-stone-200 dark:border-stone-700 shadow-xs"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-105 font-heading">
              {adminUser.name || 'Admin'}
            </span>
            <span className="text-[10px] text-stone-400 font-light truncate">
              {adminUser.role || 'Support'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
