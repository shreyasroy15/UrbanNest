import React from 'react';

export const SectionTitle = ({
  title,
  subtitle,
  align = 'center', // 'left' | 'center' | 'right'
  className = '',
  light = false
}) => {
  const alignment = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right'
  };

  return (
    <div className={`max-w-2xl mb-12 ${alignment[align]} ${className}`}>
      {subtitle && (
        <span className={`block text-xs uppercase tracking-widest font-semibold font-heading mb-2 ${
          light ? 'text-stone-300' : 'text-orange-700'
        }`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl font-serif font-semibold tracking-tight ${
        light ? 'text-stone-100' : 'text-stone-900'
      }`}>
        {title}
      </h2>
      <div className={`h-1 w-16 mt-4 rounded ${
        align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''
      } ${light ? 'bg-stone-500' : 'bg-orange-700/60'}`} />
    </div>
  );
};

export default SectionTitle;
