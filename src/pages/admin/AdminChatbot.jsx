import React, { useState } from 'react';
import { Bot, MessageSquare, Plus, Trash2, ShieldCheck, Cpu } from 'lucide-react';
import { getDashboardSummary } from '../../data/admin/dashboardData';

export const AdminChatbot = () => {
  const summary = getDashboardSummary();
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'What are your shop operational hours?', answer: 'We are open Monday to Saturday from 10:00 AM to 8:00 PM. Closed on Sundays.' },
    { id: 2, question: 'Where is UrbanNest offline store located?', answer: 'Our offline boutique is located at 12, Park Street, Near City Square, Kolkata, India.' },
    { id: 3, question: 'Do you offer custom gifting wrapping?', answer: 'Yes! We offer premium environment-friendly gift wrapping styles for a nominal feed of ₹50.' }
  ]);

  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Floating bot params
  const [welcomeMsg, setWelcomeMsg] = useState('Hello! Welcome to UrbanNest Boutique. How may I guide your beautiful shopping journey today?');
  const [botTone, setBotTone] = useState('Warm and Polite');

  const handleAddFaq = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newQ.trim() || !newA.trim()) {
      return setError('Please fill in FAQ questions and answers.');
    }

    const nextId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
    setFaqs([...faqs, { id: nextId, question: newQ.trim(), answer: newA.trim() }]);
    setNewQ('');
    setNewA('');
    setSuccess('FAQ training node successfully registered in bot logic.');
  };

  const handleRemoveFaq = (id) => {
    setFaqs(faqs.filter(f => f.id !== id));
    setSuccess('FAQ node removed.');
    setTimeout(() => setSuccess(''), 1500);
  };

  const handleBotSave = (e) => {
    e.preventDefault();
    setSuccess('Bot personality attributes updated.');
    setTimeout(() => setSuccess(''), 1500);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-xl sm:text-2xl font-serif text-stone-900 dark:text-white font-semibold">
          AI Chatbot Workspace
        </h1>
        <p className="text-xs text-stone-505 dark:text-stone-400 font-light mt-1">
          Train custom FAQ knowledge answers, adjust conversational tones, or inspect telemetry chats stats.
        </p>
      </div>

      {/* KPI counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        <div className="bg-white dark:bg-stone-850 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-heading">Total Bot Sessions</span>
          <span className="text-2xl font-bold font-heading block mt-2 dark:text-white">1,248</span>
          <span className="text-[10px] text-stone-500 font-light mt-1.5 block">Across public store pages</span>
        </div>
        <div className="bg-white dark:bg-stone-850 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-heading">Response Accuracy</span>
          <span className="text-2xl font-bold font-heading block mt-2 dark:text-white">96.8%</span>
          <span className="text-[10px] text-stone-500 font-light mt-1.5 block">With N8N automation node resolver</span>
        </div>
        <div className="bg-white dark:bg-stone-850 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-2xs">
          <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 font-heading">Fallback Triggers</span>
          <span className="text-2xl font-bold font-heading block mt-2 dark:text-white">4.2%</span>
          <span className="text-[10px] text-stone-500 font-light mt-1.5 block">Redirected to customer email forms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Left Columns: Bot Personality Configurations */}
        <div className="space-y-6 lg:col-span-1">
          <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-200 flex items-center gap-1.5 font-heading">
              <Bot className="w-4.5 h-4.5 text-orange-700 shrink-0" />
              Bot Personality
            </h3>

            {success && (
              <div className="p-3 bg-emerald-50 text-emerald-805 border border-emerald-202 text-[10px] rounded-xl font-medium">
                {success}
              </div>
            )}

            <form onSubmit={handleBotSave} className="space-y-4 text-xs font-light">
              <div>
                <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                  Welcome Greeting Prompt
                </label>
                <textarea
                  rows="4"
                  value={welcomeMsg}
                  onChange={(e) => setWelcomeMsg(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-[11px] leading-relaxed text-stone-705 dark:text-stone-300"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5 uppercase font-heading">
                  Conversational Voice Tone
                </label>
                <select
                  value={botTone}
                  onChange={(e) => setBotTone(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-xs text-stone-705 dark:text-stone-300 font-semibold"
                >
                  <option value="Warm and Polite">Warm and Polite</option>
                  <option value="Concise and Technical">Concise and Technical</option>
                  <option value="Casual Friend">Casual Friend</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-orange-700 dark:hover:bg-orange-655 text-white text-xs font-semibold rounded-xl focus:outline-none cursor-pointer"
              >
                Apply Personality Settings
              </button>
            </form>
          </div>
        </div>

        {/* Right Columns: FAQ train listings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-stone-850 p-6 rounded-2.5xl border border-stone-200/80 dark:border-stone-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-750 dark:text-stone-205 font-heading">
                FAQ Knowledge Trainer Node
              </h3>
              <Cpu className="w-4 h-4 text-orange-705" />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-808 border border-red-200 text-xs font-medium rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleAddFaq} className="space-y-3.5 text-xs font-light">
              <div>
                <label htmlFor="faq-q" className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5">
                  Frequently Asked Question *
                </label>
                <input
                  id="faq-q"
                  type="text"
                  value={newQ}
                  onChange={(e) => setNewQ(e.target.value)}
                  placeholder="What is your return refund strategy?"
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-xs text-stone-705 dark:text-stone-300"
                />
              </div>

              <div>
                <label htmlFor="faq-a" className="block text-[10px] font-semibold text-stone-500 dark:text-stone-400 mb-1.5">
                  Pre-Configured Chatbot Answer *
                </label>
                <textarea
                  id="faq-a"
                  rows="3"
                  value={newA}
                  onChange={(e) => setNewA(e.target.value)}
                  placeholder="We offer details returns within 14 calendar days from receipt invoice timestamp..."
                  className="w-full px-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-750 rounded-xl focus:outline-none text-xs text-stone-707 dark:text-stone-300 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-850 dark:bg-orange-700 dark:hover:bg-orange-655 text-white text-xs font-semibold rounded-xl focus:outline-none cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Train FAQ Node
              </button>
            </form>

            <div className="border-t border-stone-105 dark:border-stone-800 pt-5 space-y-4">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Trained FAQ Indexes Details
              </span>

              <div className="space-y-3.5">
                {faqs.map((faq) => (
                  <div 
                    key={faq.id} 
                    className="p-4 bg-stone-50 dark:bg-stone-900 border border-stone-150 dark:border-stone-800/80 rounded-2.5xl flex gap-3 text-xs justify-between group"
                  >
                    <div className="space-y-1.5 text-left font-light pr-2">
                      <div className="font-semibold text-stone-850 dark:text-white font-heading">
                        Q: {faq.question}
                      </div>
                      <div className="text-stone-550 dark:text-stone-400 text-[11px] leading-relaxed">
                        A: {faq.answer}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveFaq(faq.id)}
                      className="p-1 px-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md focus:outline-none cursor-pointer self-start shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChatbot;
