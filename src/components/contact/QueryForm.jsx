import React from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useQueryForm } from '../../hooks/useQueryForm';
import { motion, AnimatePresence } from 'framer-motion';
import apiConfig from '../../services/apiConfig';

export const QueryForm = () => {
  const {
    fields,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm
  } = useQueryForm();

  const queryFormUrl = apiConfig.n8n.queryWebhookUrl;
  const hasExternalForm = !!queryFormUrl && (queryFormUrl.startsWith('http://') || queryFormUrl.startsWith('https://'));

  const categories = [
    { label: 'General Inquiry', value: 'General' },
    { label: 'Product Details', value: 'Product' },
    { label: 'Pricing & Discounts', value: 'Pricing' },
    { label: 'Delivery & Shipping', value: 'Delivery' },
    { label: 'Order Assistance', value: 'Order' },
    { label: 'Store Feedback', value: 'Feedback' },
    { label: 'Other', value: 'Other' }
  ];

  if (hasExternalForm) {
    return (
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 custom-shadow-sm w-full font-sans text-left flex flex-col justify-center min-h-[350px]">
        <h3 className="text-xl font-semibold font-serif text-stone-900 mb-4">
          Submit A Query
        </h3>
        <p className="text-sm text-stone-500 font-light leading-relaxed mb-8">
          Thank you for choosing UrbanNest Lifestyle Store. To manage customer tickets safely and promptly, we coordinate inquiry forms directly on our secure N8N integration desk.
        </p>
        <button
          onClick={() => window.open(queryFormUrl, '_blank')}
          className="w-full py-3.5 px-6 rounded-full bg-stone-900 hover:bg-stone-850 dark:bg-orange-700 dark:hover:bg-orange-655 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Open Inquiry Form (New Tab)
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 custom-shadow-sm w-full font-sans text-left">
      <h3 className="text-xl font-semibold font-serif text-stone-900 mb-6">
        Submit a Custom Query
      </h3>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 px-6 text-center border-2 border-dashed border-orange-200/80 bg-orange-50/30 rounded-2xl flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <CheckCircle2 className="w-16 h-16 text-orange-700 mb-4" />
            </motion.div>
            <h4 className="text-lg font-semibold text-stone-850 mb-2">Query Submitted!</h4>
            <p className="text-sm text-stone-500 max-w-sm mb-6 leading-relaxed font-light">
              Thank you for writing to us. Our desk staff or AI assistant pipeline has received your parameters and will react within the hour.
            </p>
            <button
              onClick={resetForm}
              className="px-6 py-2 rounded-full border border-stone-305 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors focus:outline-none"
            >
              Submit Another Query
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Unable to connect right now. Please try again.</span>
              </div>
            )}

            {/* Grid Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label htmlFor="name-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Full Name <span className="text-orange-700">*</span>
                </label>
                <input
                  id="name-input"
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="E.g., Shreya Sen"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 bg-stone-50 border ${
                    errors.name ? 'border-red-400 focus:ring-red-200/50' : 'border-stone-200 focus:ring-orange-750/30 focus:border-orange-700'
                  } rounded-xl text-sm focus:outline-none focus:ring-2 disabled:opacity-60`}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Email Address <span className="text-orange-700">*</span>
                </label>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="E.g., shreya@work.com"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 bg-stone-50 border ${
                    errors.email ? 'border-red-400 focus:ring-red-200/50' : 'border-stone-200 focus:ring-orange-750/30 focus:border-orange-700'
                  } rounded-xl text-sm focus:outline-none focus:ring-2 disabled:opacity-60`}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
              </div>
            </div>

            {/* Grid Phone and Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone Number */}
              <div>
                <label htmlFor="phone-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Phone Number <span className="text-orange-700">*</span>
                </label>
                <input
                  id="phone-input"
                  type="tel"
                  name="phone"
                  value={fields.phone}
                  onChange={handleChange}
                  placeholder="10-digit number (e.g., 9876543210)"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 bg-stone-50 border ${
                    errors.phone ? 'border-red-400 focus:ring-red-200/50' : 'border-stone-200 focus:ring-orange-750/30 focus:border-orange-700'
                  } rounded-xl text-sm focus:outline-none focus:ring-2 disabled:opacity-60`}
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1.5">{errors.phone}</p>}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category-select" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Query Category <span className="text-orange-700">*</span>
                </label>
                <select
                  id="category-select"
                  name="category"
                  value={fields.category}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2.5 bg-stone-50 border ${
                    errors.category ? 'border-red-400 focus:ring-red-200/50' : 'border-stone-200 focus:ring-orange-750/30 focus:border-orange-700'
                  } rounded-xl text-sm focus:outline-none focus:ring-2 disabled:opacity-60`}
                >
                  <option value="">Select a Category</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-xs text-red-500 mt-1.5">{errors.category}</p>}
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label htmlFor="message-input" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                Your Message <span className="text-orange-700">*</span>
              </label>
              <textarea
                id="message-input"
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="What details are you looking for? Write a brief summary..."
                disabled={isSubmitting}
                rows="5"
                className={`w-full px-4 py-2.5 bg-stone-50 border ${
                  errors.message ? 'border-red-400 focus:ring-red-200/50' : 'border-stone-200 focus:ring-orange-750/30 focus:border-orange-700'
                } rounded-xl text-sm focus:outline-none focus:ring-2 disabled:opacity-60 resize-y`}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>}
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-full bg-stone-900 border border-stone-900 text-stone-105 font-medium text-sm flex items-center justify-center gap-2 hover:bg-stone-800 disabled:opacity-50 cursor-pointer focus:outline-none shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Parameters...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Query to N8N
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QueryForm;
