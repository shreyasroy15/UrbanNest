import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, FolderTree, MessageSquare, 
  ShoppingCart, Users, BarChart3, Tag, Bot, Cpu, 
  Settings, UserCircle, LogOut, ChevronLeft, ChevronRight, X
} from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const AdminSidebar = ({ collapsed, setCollapsed, open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('urbannest_admin_logged_in');
    localStorage.removeItem('urbannest_admin_user');
    setOpen(false);
    navigate('/admin/login');
  };

  const navGroups = [
    {
      title: 'Overview',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'Catalog',
      items: [
        { name: 'Products', path: '/admin/products', icon: ShoppingBag },
        { name: 'Categories', path: '/admin/categories', icon: FolderTree }
      ]
    },
    {
      title: 'Customers & Orders',
      items: [
        { name: 'Queries', path: '/admin/queries', icon: MessageSquare },
        { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
        { name: 'Customers', path: '/admin/customers', icon: Users }
      ]
    },
    {
      title: 'Engagement',
      items: [
        { name: 'Offers', path: '/admin/offers', icon: Tag },
        { name: 'AI Chatbot', path: '/admin/chatbot', icon: Bot }
      ]
    },
    {
      title: 'Analytics',
      items: [
        { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'System',
      items: [
        { name: 'N8N Integrations', path: '/admin/integrations', icon: Cpu },
        { name: 'Settings', path: '/admin/settings', icon: Settings }
      ]
    },
    {
      title: 'Account',
      items: [
        { name: 'Profile', path: '/admin/profile', icon: UserCircle }
      ]
    }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-stone-900 border-r border-stone-855 text-stone-300 font-sans">
      {/* Brand Header */}
      <div className="p-5 flex items-center justify-between border-b border-stone-800 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <img 
            src={logoImg} 
            alt="Logo" 
            className="w-8 h-8 rounded-full object-cover shrink-0 border border-stone-700/80 shadow-md"
          />
          {(!collapsed || open) && (
            <div className="flex flex-col text-left transition-opacity duration-300">
              <span className="font-heading text-sm font-bold text-white tracking-widest leading-none">URBANNEST</span>
              <span className="text-[8px] text-orange-400 font-medium tracking-widest font-heading mt-0.5">ADMIN OFFICE</span>
            </div>
          )}
        </div>
        
        {/* Mobile close button */}
        {open && (
          <button 
            onClick={() => setOpen(false)}
            className="p-1 px-1.5 text-stone-400 hover:text-white rounded-md bg-stone-800 transition-colors cursor-pointer"
            aria-label="Close menu navigation drawer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        )}
      </div>

      {/* Navigation menu list */}
      <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-6 text-left custom-scrollbar mini">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1.5">
            {(!collapsed || open) ? (
              <h4 className="px-3 text-[10px] uppercase font-bold tracking-wider text-stone-500 font-heading">
                {group.title}
              </h4>
            ) : (
              <div className="border-t border-stone-850 my-2 mx-1" />
            )}
            
            <div className="space-y-0.5">
              {group.items.map((item, iIdx) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);

                return (
                  <NavLink
                    key={iIdx}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={() => `
                      flex items-center gap-3 px-3 py-2 text-xs rounded-xl font-medium transition-all group relative cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-600/30
                      ${isActive 
                        ? 'bg-orange-700 text-white shadow-md font-semibold' 
                        : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                      }
                    `}
                    title={collapsed && !open ? item.name : undefined}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-stone-400 group-hover:text-stone-200'}`} />
                    {(!collapsed || open) && (
                      <span className="transition-opacity duration-300 truncate">{item.name}</span>
                    )}

                    {collapsed && !open && (
                      <div className="absolute left-14 invisible group-hover:visible bg-stone-950 text-white text-[10px] font-medium font-heading tracking-wide px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 transition-all border border-stone-800">
                        {item.name}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout button */}
      <div className="p-3 border-t border-stone-800 bg-stone-950/20 shrink-0 text-left">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl transition-all cursor-pointer group relative focus:outline-none font-medium ${collapsed && !open ? 'justify-center' : ''}`}
          title={collapsed && !open ? 'Logout' : undefined}
        >
          <LogOut className="w-4 h-4 text-red-400 group-hover:scale-105 shrink-0" />
          {(!collapsed || open) && <span>Logout</span>}
          {collapsed && !open && (
            <div className="absolute left-14 invisible group-hover:visible bg-stone-950 text-red-400 text-[10px] font-medium font-heading tracking-wide px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-50 border border-stone-800">
              Logout
            </div>
          )}
        </button>
      </div>

      {/* Width toggle (Desktop only) */}
      {!open && (
        <div className="hidden lg:flex p-2 items-center justify-end border-t border-stone-850 hover:bg-stone-850/20 transition-colors">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 px-1.5 rounded-md hover:bg-stone-850 text-stone-400 hover:text-white cursor-pointer transition-transform duration-250 focus:outline-none"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:block shrink-0 h-screen transition-all duration-300 sticky top-0 ${collapsed ? 'w-20' : 'w-72'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile drawer slider */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
          />
          {/* Sliding drawer panel */}
          <div className="relative flex flex-col w-72 h-full z-10 transition-transform duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
