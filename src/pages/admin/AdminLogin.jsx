import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ShieldAlert, ArrowLeft, KeyRound } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all parameters.');
      return;
    }

    setIsLoading(true);

    // Simulate authentication check after brief timeout for professional look
    setTimeout(() => {
      if (email === 'admin@urbannest.demo' && password === 'admin123') {
        localStorage.setItem('urbannest_admin_logged_in', 'true');
        localStorage.setItem('urbannest_admin_user', JSON.stringify({
          name: 'UrbanNest Admin',
          email: 'admin@urbannest.demo',
          role: 'Admin',
          avatar: logoImg
        }));
        navigate('/admin/dashboard');
      } else {
        setError('Invalid administrator email or password.');
      }
      setIsLoading(false);
    }, 850);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/80 shadow-xl text-left">
        
        {/* Branding header logo */}
        <div className="text-center flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 mb-4 group focus:outline-none hover:opacity-90 transition-opacity">
            <img
              src={logoImg}
              alt="UrbanNest Logo"
              className="w-10 h-10 rounded-full object-cover border border-stone-200 shadow-xs"
            />
            <div className="flex flex-col text-left">
              <span className="font-heading text-xl font-bold tracking-tight text-stone-900 leading-none">
                UrbanNest
              </span>
              <span className="text-[9px] tracking-widest font-semibold uppercase font-heading text-orange-700 mt-0.5">
                Lifestyle Store
              </span>
            </div>
          </Link>
          <h2 className="mt-2 text-2xl font-semibold font-serif text-stone-900">
            Admin Portal
          </h2>
          <p className="mt-1 text-xs text-stone-500 font-light">
            Manage your store smarter, simpler, online.
          </p>
        </div>

        {/* Security Warning notice */}
        <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl flex gap-3 text-amber-900 items-start">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed font-light">
            <span className="font-semibold">Demo Mode Session:</span> Use credentials <code className="bg-amber-100/80 px-1 rounded-sm font-semibold">admin@urbannest.demo</code> and password <code className="bg-amber-100/80 px-1 rounded-sm font-semibold">admin123</code>.
          </div>
        </div>

        <form className="mt-6 space-y-5" onSubmit={handleLogin}>
          {error && (
            <div className="p-3 bg-red-55 px-4 rounded-xl text-xs font-medium text-red-800 border border-red-200">
              {error}
            </div>
          )}

          {/* Email input field */}
          <div>
            <label htmlFor="email-address" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
              Email Address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@urbannest.demo"
              className="w-full px-4 py-3 bg-stone-50/60 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700 font-light"
            />
          </div>

          {/* Password Input field */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password-field" className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
                Password
              </label>
            </div>
            
            <div className="relative">
              <input
                id="password-field"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-stone-50/60 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700 pr-12 font-light"
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-700 focus:outline-none cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-orange-400" />
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="text-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-stone-550 hover:text-stone-900 transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Public Store
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
