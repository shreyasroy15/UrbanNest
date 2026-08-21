import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  getDashboardSummary, getSalesOverviewData, 
  getCategoryDistribution, getQueryBarData 
} from '../../data/admin/dashboardData';
import { 
  Plus, MessageSquare, Tag, Globe, Cpu, Bot, 
  ArrowUpRight, ShoppingBag, TrendingUp, HelpCircle
} from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const summary = getDashboardSummary();
  const sales = getSalesOverviewData();
  const categories = getCategoryDistribution();
  const queries = getQueryBarData();

  // SVG Line Chart coordinates calculation for Sales Overview
  const maxSales = Math.max(...sales.map(s => s.sales));
  const chartWidth = 500;
  const chartHeight = 140;
  const paddingX = 40;
  const paddingY = 20;

  const points = sales.map((item, idx) => {
    const x = paddingX + (idx / (sales.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (item.sales / maxSales) * (chartHeight - paddingY * 2);
    return { x, y, month: item.month, sales: item.sales };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingY} L ${points[0].x} ${chartHeight - paddingY} Z`;

  // Color mapping configuration for notifications
  const getActivityBadge = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500';
      case 'warning':
        return 'bg-amber-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-stone-900 dark:text-white font-semibold">
            Good morning, Admin 👋
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 font-light mt-1">
            Here's what's happening at UrbanNest lifestyle store today.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Link
            to="/admin/integrations"
            className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-xl hover:bg-stone-200 dark:hover:bg-stone-750 flex items-center gap-1.5 focus:outline-none transition-colors border border-stone-250 dark:border-stone-700"
          >
            <Cpu className="w-3.5 h-3.5" />
            Integrations Status
          </Link>
          <button
            onClick={() => navigate('/admin/products/new')}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-805 dark:bg-orange-700 dark:hover:bg-orange-655 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 focus:outline-none transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summary.kpis.map((kpi) => (
          <div 
            key={kpi.id} 
            className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between text-left transition-all hover:shadow-md"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-450 dark:text-stone-550 block font-heading">
                {kpi.label}
              </span>
              <span className={`text-2xl sm:text-3xl font-bold mt-2 block tracking-tight dark:text-white`}>
                {kpi.value}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-4">
              <span className="p-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-3 h-3" />
              </span>
              <span className="text-[10px] text-stone-550 dark:text-stone-400 font-medium">
                {kpi.growth}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Overview Line Chart Card */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-205 dark:border-stone-800 shadow-sm lg:col-span-2 text-left flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-stone-850 dark:text-stone-100 font-heading tracking-wide uppercase">
                  Sales Overview
                </h3>
                <p className="text-[10px] text-stone-405 mt-0.5 font-light">
                  Sales figures mapped over the calendar months (Demo context)
                </p>
              </div>
              <span className="text-xs font-bold text-orange-700 bg-orange-50 dark:bg-orange-950/25 px-2.5 py-1 rounded-full font-heading">
                ₹48,650 Total
              </span>
            </div>

            {/* SVG Line Graph */}
            <div className="w-full overflow-hidden mt-6">
              <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                className="w-full h-44 select-none font-light"
              >
                {/* SVG definitions */}
                <defs>
                  <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(249, 115, 22, 0.25)" />
                    <stop offset="100%" stopColor="rgba(249, 115, 22, 0.0)" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="rgba(120,113,108,0.1)" strokeDasharray="3 3" />
                <line x1={paddingX} y1={(chartHeight) / 2} x2={chartWidth - paddingX} y2={(chartHeight) / 2} stroke="rgba(120,113,108,0.1)" strokeDasharray="3 3" />
                <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="rgba(120,113,108,0.2)" />

                {/* Area Background */}
                <path d={areaPath} fill="url(#chart-grad)" />

                {/* Line Path */}
                <path d={linePath} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />

                {/* Data point Dots and labels */}
                {points.map((p, idx) => (
                  <g key={idx} className="group cursor-pointer">
                    <circle 
                      cx={p.x} 
                      cy={p.y} 
                      r="3.5" 
                      fill={idx === points.length - 1 ? '#f97316' : '#ffffff'} 
                      stroke="#f97316" 
                      strokeWidth="2" 
                    />
                    <text 
                      x={p.x} 
                      y={p.y - 8} 
                      textAnchor="middle" 
                      className="text-[8px] font-bold fill-stone-700 dark:fill-stone-300 font-heading opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ₹{p.sales.toLocaleString()}
                    </text>
                    <text 
                      x={p.x} 
                      y={chartHeight - 4} 
                      textAnchor="middle" 
                      className="text-[9px] fill-stone-400 dark:fill-stone-500 font-heading"
                    >
                      {p.month}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Categories Distribution Ring Card */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-205 dark:border-stone-800 shadow-sm text-left flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-stone-850 dark:text-stone-105 font-heading tracking-wide uppercase">
              Categories Split
            </h3>
            <p className="text-[10px] text-stone-405 mt-0.5 mb-6 font-light">
              Item distribution count by category
            </p>

            {/* List Distribution list bars */}
            <div className="space-y-4">
              {categories.map((cat, idx) => {
                const colors = ['bg-orange-600', 'bg-amber-600', 'bg-stone-700', 'bg-stone-500', 'bg-orange-400'];
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                      <span className="truncate">{cat.name}</span>
                      <span>{cat.count} items</span>
                    </div>
                    <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${colors[idx % colors.length]} rounded-full`}
                        style={{ width: `${(cat.count / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 mt-6 flex justify-between text-[10px] text-stone-400 font-heading">
            <span>Total Categories: {categories.length}</span>
            <Link to="/admin/categories" className="text-orange-700 dark:text-orange-400 font-semibold flex items-center gap-0.5 hover:underline">
              Manage
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

      </div>

      {/* Quick Actions & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions Panel */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-205 dark:border-stone-800 shadow-sm text-left lg:col-span-1 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-stone-850 dark:text-stone-105 font-heading tracking-wide uppercase mb-4">
              Quick Shortcuts
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/admin/products/new')}
                className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-150 dark:border-stone-800/80 rounded-2xl flex flex-col items-center justify-center text-center hover:border-orange-600 dark:hover:border-orange-500 group transition-all cursor-pointer focus:outline-none"
              >
                <Plus className="w-5 h-5 text-orange-655 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300 font-heading">Add Product</span>
              </button>

              <button
                onClick={() => navigate('/admin/queries')}
                className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-150 dark:border-stone-800/80 rounded-2xl flex flex-col items-center justify-center text-center hover:border-orange-600 dark:hover:border-orange-500 group transition-all cursor-pointer focus:outline-none"
              >
                <MessageSquare className="w-5 h-5 text-orange-655 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300 font-heading">View Queries</span>
              </button>

              <button
                onClick={() => navigate('/admin/offers')}
                className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-150 dark:border-stone-800/80 rounded-2xl flex flex-col items-center justify-center text-center hover:border-orange-600 dark:hover:border-orange-500 group transition-all cursor-pointer focus:outline-none"
              >
                <Tag className="w-5 h-5 text-orange-655 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300 font-heading">Add Offer</span>
              </button>

              <Link
                to="/"
                className="p-4 bg-stone-50 dark:bg-stone-800/40 border border-stone-150 dark:border-stone-800/80 rounded-2xl flex flex-col items-center justify-center text-center hover:border-orange-600 dark:hover:border-orange-500 group transition-all cursor-pointer focus:outline-none"
              >
                <Globe className="w-5 h-5 text-orange-655 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-semibold text-stone-700 dark:text-stone-300 font-heading">View Website</span>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-105 dark:border-stone-800 mt-6 lg:mt-0 flex gap-2 justify-center text-[10px] text-stone-400 font-heading items-center bg-stone-50 dark:bg-stone-850 p-2.5 rounded-xl border border-stone-200/50 dark:border-stone-800/85">
            <Bot className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>Chatbot Assistant: Active Mode</span>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-205 dark:border-stone-800 shadow-sm text-left lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-stone-850 dark:text-stone-105 font-heading tracking-wide uppercase mb-4">
              Recent Activity Feed
            </h3>
            
            <div className="divide-y divide-stone-100 dark:divide-stone-800/60 space-y-3.5">
              {summary.recentActivity.map((act) => (
                <div key={act.id} className="pt-3.5 flex items-start gap-3.5 text-xs font-light">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getActivityBadge(act.type)}`} />
                  <div className="flex-1">
                    <p className="text-stone-800 dark:text-stone-300 font-light leading-relaxed">
                      {act.text}
                    </p>
                    <span className="text-[10px] text-stone-400 block mt-1 font-heading">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
