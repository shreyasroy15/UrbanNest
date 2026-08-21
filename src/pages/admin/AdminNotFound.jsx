import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const AdminNotFound = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 font-sans">
      <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/20 text-orange-700 rounded-full flex items-center justify-center border border-orange-200 dark:border-orange-900/40 mb-4 animate-bounce">
        <ShieldAlert className="w-6 h-6" />
      </div>
      <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-white">
        Dashboard View Not Found
      </h2>
      <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1.5 max-w-sm leading-relaxed">
        The administrative panel route index you are looking for does not exist or has been restricted by system settings.
      </p>
      
      <div className="mt-6">
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-655 text-white text-xs font-semibold rounded-xl transition-colors focus:outline-none shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard Home
        </Link>
      </div>
    </div>
  );
};

export default AdminNotFound;
