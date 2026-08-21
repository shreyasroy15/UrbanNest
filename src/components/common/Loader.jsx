import React from 'react';

export const Loader = ({ fullPage = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4'
  };

  const spinner = (
    <div className={`animate-spin rounded-full border-t-orange-700 border-stone-200 ${sizeClasses[size]}`} />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-50/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-6">
      {spinner}
    </div>
  );
};

export default Loader;
