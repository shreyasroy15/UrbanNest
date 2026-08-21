import React from 'react';
import { X, Check, Trash2, ShieldAlert, Sparkles, MessageCircle, AlertCircle, ShoppingBag } from 'lucide-react';

export const NotificationCenter = ({ 
  isOpen, 
  onClose, 
  notifications, 
  markAllRead, 
  clearNotifications 
}) => {
  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <ShieldAlert className="w-4 h-4 text-amber-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'info':
        return <MessageCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <ShoppingBag className="w-4 h-4 text-stone-605" />;
    }
  };

  const getBgClass = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30';
      case 'warning':
        return 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30';
      case 'error':
        return 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/30';
      case 'info':
        return 'bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/30';
      default:
        return 'bg-stone-50 dark:bg-stone-800 border-stone-100 dark:border-stone-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl flex flex-col z-10 animate-slideLeft transition-colors duration-200">
        
        {/* Header toolbar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="text-left">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white font-heading">
              Notification Center
            </h3>
            <p className="text-[10px] text-stone-400 font-light mt-0.5">
              System alerts, N8N logs, and queries
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-stone-405 hover:bg-stone-50 dark:hover:bg-stone-800 dark:text-stone-500 hover:text-stone-900 dark:hover:text-white rounded-xl focus:outline-none cursor-pointer"
            aria-label="Close notifications panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Header controls */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800/60 bg-stone-50/50 dark:bg-stone-950/25 flex justify-between text-[10px] font-heading font-medium tracking-wide">
            <button
              onClick={markAllRead}
              className="text-stone-500 hover:text-orange-700 dark:hover:text-orange-400 transition-colors cursor-pointer focus:outline-none"
            >
              Mark all read
            </button>
            <button
              onClick={clearNotifications}
              className="text-stone-400 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer focus:outline-none"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear all
            </button>
          </div>
        )}

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 select-none animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-stone-50 dark:bg-stone-800/80 flex items-center justify-center text-stone-400 border border-stone-200 dark:border-stone-750 mb-3">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-semibold text-stone-800 dark:text-stone-105 font-heading">
                All Caught Up!
              </h4>
              <p className="text-[10px] text-stone-450 dark:text-stone-500 font-light mt-1">
                You have no pending notification alerts.
              </p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl border text-left flex gap-3 transition-all relative ${getBgClass(notif.type)} ${
                  !notif.read ? 'ring-1 ring-orange-700/20 shadow-xs' : 'opacity-70'
                }`}
              >
                {/* Status Dot */}
                {!notif.read && (
                  <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-orange-700" />
                )}
                
                {/* Event Type Icon */}
                <div className="w-8 h-8 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-750 flex items-center justify-center shrink-0 shadow-sm">
                  {getIcon(notif.type)}
                </div>

                <div className="text-left pr-2 flex-grow">
                  <span className={`text-[11px] leading-relaxed block font-light text-stone-750 dark:text-stone-300 ${!notif.read ? 'font-medium' : ''}`}>
                    {notif.text}
                  </span>
                  <span className="text-[9px] text-stone-400 font-light block mt-1.5 font-heading">
                    {notif.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default NotificationCenter;
