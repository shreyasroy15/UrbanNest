import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import NotificationCenter from './NotificationCenter';

export const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('urbannest_admin_sidebar_collapsed') === 'true';
  });
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('urbannest_admin_dark_mode');
    if (saved) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 'notif-1', text: 'New customer query received from Rahul Sharma', time: '5m ago', type: 'info', read: false },
    { id: 'notif-2', text: 'Amber Reed Diffuser stock is running low (< 5 units)', time: '20m ago', type: 'warning', read: false },
    { id: 'notif-3', text: 'N8N Chatbot connection test successful', time: '1h ago', type: 'success', read: true },
    { id: 'notif-4', text: 'Failed payment callback detected (telemetry alert)', time: '3h ago', type: 'error', read: true }
  ]);

  // Handle body theme class toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('urbannest_admin_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('urbannest_admin_dark_mode', 'false');
    }
  }, [darkMode]);

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem('urbannest_admin_sidebar_collapsed', sidebarCollapsed);
  }, [sidebarCollapsed]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-200 select-none flex">
      {/* Sidebar Panel */}
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        setCollapsed={setSidebarCollapsed} 
        open={mobileSidebarOpen} 
        setOpen={setMobileSidebarOpen} 
      />

      {/* Main View Area */}
      <div className="flex-grow flex flex-col min-w-0">
        <AdminNavbar 
          setSidebarOpen={setMobileSidebarOpen}
          setNotificationsOpen={setNotificationsOpen}
          unreadCount={notifications.filter(n => !n.read).length}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        
        {/* Scrollable sub-routes content container */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet context={{ 
            darkMode, 
            notifications, 
            setNotifications,
            sidebarCollapsed
          }} />
        </main>
      </div>

      {/* Slide-out notification side drawer */}
      <NotificationCenter 
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        markAllRead={markAllRead}
        clearNotifications={clearNotifications}
      />
    </div>
  );
};

export default AdminLayout;
