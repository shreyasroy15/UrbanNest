import React, { useState } from 'react';
import { UserCircle, Shield, Mail, KeyRound, CheckCircle2 } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export const AdminProfile = () => {
  const [adminUser, setAdminUser] = useState(() => {
    return JSON.parse(localStorage.getItem('urbannest_admin_user') || '{"name":"UrbanNest Admin","role":"Administrator","email":"admin@urbannest.demo"}');
  });

  const [name, setName] = useState(adminUser.name);
  const [success, setSuccess] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    const updated = { ...adminUser, name: name.trim() };
    setAdminUser(updated);
    localStorage.setItem('urbannest_admin_user', JSON.stringify(updated));
    setSuccess('Admin displayName successfully updated.');
    
    // Trigger custom event to reload profile in Navbar
    window.dispatchEvent(new Event('urbannest_admin_profile_updated'));
    
    setTimeout(() => setSuccess(''), 1505);
  };

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          Administrator Profile
        </h1>
        <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
          Review administrator profile roles, privileges, and edit display credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col items-center text-center self-start space-y-4">
          <div className="relative">
            <img
              src={logoImg}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border border-stone-200 dark:border-stone-700 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-5.5 h-5.5 rounded-full bg-emerald-500 flex items-center justify-center border-2 border-white dark:border-stone-850" title="System Online">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900 dark:text-white font-heading text-sm">
              {adminUser.name}
            </h3>
            <span className="text-[10px] text-stone-400 font-light">
              System {adminUser.role}
            </span>
          </div>

          <div className="w-full border-t border-stone-105 dark:border-stone-800 pt-4 space-y-2.5 text-xs text-stone-550 dark:text-stone-400 font-light text-left">
            <div className="flex justify-between">
              <span>Security Level</span>
              <span className="font-semibold text-orange-700 font-heading">Level 1 (SysOp)</span>
            </div>
            <div className="flex justify-between">
              <span>Current Status</span>
              <span className="font-semibold text-emerald-600">Active</span>
            </div>
          </div>
        </div>

        {/* Configurations */}
        <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-205 dark:border-stone-805 shadow-sm md:col-span-2 text-left space-y-5">
          <legend className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-205 font-heading">
            Profile settings
          </legend>

          {success && (
            <div className="p-3 bg-emerald-50 text-emerald-805 border border-emerald-202 text-xs font-semibold rounded-xl flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {success}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4 text-xs font-light">
            <div>
              <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                Admin Privilege Role (Read Only)
              </label>
              <div className="px-3.5 py-2.5 bg-stone-55 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl text-stone-405 font-medium flex items-center gap-2 select-all">
                <Shield className="w-4 h-4 text-stone-400" />
                {adminUser.role} Privilege Mode
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                Support Mailbox Login
              </label>
              <div className="px-3.5 py-2.5 bg-stone-55 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl text-stone-405 font-mono flex items-center gap-2 select-all">
                <Mail className="w-4 h-4 text-stone-400" />
                {adminUser.email}
              </div>
            </div>

            <div>
              <label htmlFor="admin-name-input" className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                Display Name
              </label>
              <input
                id="admin-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-stone-50 dark:bg-stone-905 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none text-xs text-stone-707 dark:text-stone-300"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-655 text-white font-semibold rounded-xl focus:outline-none cursor-pointer flex items-center gap-1.5"
            >
              <KeyRound className="w-4 h-4 text-orange-400" />
              Apply Name Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
