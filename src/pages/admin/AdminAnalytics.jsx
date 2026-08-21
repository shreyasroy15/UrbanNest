import React from 'react';
import { getSalesOverviewData, getCategoryDistribution, getQueryBarData } from '../../data/admin/dashboardData';
import { BarChart3, TrendingUp, Users, Calendar, ArrowUpRight } from 'lucide-react';

export const AdminAnalytics = () => {
  const sales = getSalesOverviewData();
  const categories = getCategoryDistribution();
  const queries = getQueryBarData();

  // Sales Chart Calculation
  const maxSales = Math.max(...sales.map(s => s.sales));
  const sWidth = 500;
  const sHeight = 150;
  const sPadX = 40;
  const sPadY = 20;

  const sPoints = sales.map((item, idx) => {
    const x = sPadX + (idx / (sales.length - 1)) * (sWidth - sPadX * 2);
    const y = sHeight - sPadY - (item.sales / maxSales) * (sHeight - sPadY * 2);
    return { x, y, month: item.month, sales: item.sales };
  });

  const lineD = sPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Queries Bar Graph Calculation (100% css/div or SVG bars)
  const maxQueries = Math.max(...queries.map(q => q.queries));

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          Business Reports & Analytics
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
          Detailed metrics charting, visual trends analysis, and category performance.
        </p>
      </div>

      {/* Overview Analytics stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="bg-white dark:bg-stone-850 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-heading">Monthly Revenue Goal</span>
          <span className="text-xl font-bold font-heading block mt-1.5 dark:text-white">₹1,00,000</span>
          <div className="w-full h-1.5 bg-stone-105 dark:bg-stone-800 rounded-full overflow-hidden mt-3">
            <div className="h-full bg-orange-700 rounded-full" style={{ width: '48.6%' }} />
          </div>
          <span className="text-[9px] text-stone-405 mt-2 block font-heading">48.6% reached this month</span>
        </div>

        <div className="bg-white dark:bg-stone-850 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-heading">Avg Order Basket Value</span>
          <span className="text-xl font-bold font-heading block mt-1.5 dark:text-white">₹1,845</span>
          <div className="flex items-center gap-1 mt-2.5 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold font-heading">
            <TrendingUp className="w-3.5 h-3.5" />
            +8.4% since last quarter
          </div>
        </div>

        <div className="bg-white dark:bg-stone-850 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-heading">Customer Conversion Rate</span>
          <span className="text-xl font-bold font-heading block mt-1.5 dark:text-white">3.12%</span>
          <div className="flex items-center gap-1 mt-2.5 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold font-heading">
            <TrendingUp className="w-3.5 h-3.5" />
            +1.5% from public storefront searches
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-left">
        
        {/* Sales trends SVG */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-805 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200 font-heading">
            Revenue Progression Trends
          </h3>

          <div className="w-full overflow-hidden pt-4">
            <svg viewBox={`0 0 ${sWidth} ${sHeight}`} className="w-full h-48 select-none">
              <line x1={sPadX} y1={sPadY} x2={sWidth - sPadX} y2={sPadY} stroke="rgba(120,113,108,0.1)" strokeDasharray="3 3" />
              <line x1={sPadX} y1={sHeight - sPadY} x2={sWidth - sPadX} y2={sHeight - sPadY} stroke="rgba(120,113,108,0.2)" />

              <path d={lineD} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />

              {sPoints.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="3" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
                  <text x={p.x} y={sHeight - 4} textAnchor="middle" className="text-[10px] fill-stone-400 dark:fill-stone-500 font-heading">{p.month}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* N8N Customer Queries Column bar stats */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-805 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200 font-heading">
            Inquiry Tickets Volume
          </h3>

          <div className="flex h-44 items-end justify-between gap-6 px-4 pt-6 border-b border-stone-105 dark:border-stone-800">
            {queries.map((q, idx) => {
              const barHeight = (q.queries / maxQueries) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer justify-end h-full">
                  <span className="text-[9px] font-bold text-stone-600 dark:text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity font-heading">
                    {q.queries}
                  </span>
                  
                  <div 
                    className="w-full bg-orange-100 dark:bg-stone-800 group-hover:bg-orange-700 rounded-t-lg transition-colors"
                    style={{ height: `${barHeight || 5}%` }}
                  />
                  
                  <span className="text-[9px] text-stone-450 dark:text-stone-500 font-heading tracking-wide mb-1 shrink-0">
                    {q.category.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminAnalytics;
