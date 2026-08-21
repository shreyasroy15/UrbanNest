import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-transition min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 text-center font-sans">
      <span className="text-8xl md:text-9xl font-serif font-black text-stone-200 tracking-widest text-stroke mb-4">
        404
      </span>
      <h1 className="text-3xl md:text-4xl font-serif font-semibold text-stone-900 mb-4">
        Oops! This page wandered away.
      </h1>
      <p className="text-sm text-stone-500 max-w-md mx-auto mb-10 leading-relaxed font-light">
        We can't seem to locate the section you are searching for. Grab a warm tea and return to our clean cozy home.
      </p>
      
      <Button
        variant="primary"
        size="md"
        onClick={() => navigate('/')}
        icon={<Navigation className="w-4 h-4 text-orange-400 rotate-45" />}
      >
        Back Home
      </Button>
    </div>
  );
};

export default NotFound;
