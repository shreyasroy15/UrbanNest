import React, { useEffect, useRef, useState } from 'react';
import { Send, Sparkles, X, RotateCcw } from 'lucide-react';
import { useChatbot } from '../../hooks/useChatbot';
import ChatMessage from './ChatMessage';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatbotWidget = () => {
  const { isOpen, setIsOpen, messages, isLoading, sendMessage, clearChat } = useChatbot();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What products do you sell?",
    "Store timings?",
    "Delivery available?",
    "Where are you located?"
  ];

  // Auto Scroll down
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    
    sendMessage(inputText.trim());
    setInputText('');
  };

  const handleSuggestionClick = (question) => {
    if (isLoading) return;
    sendMessage(question);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 md:right-8 z-40 w-[calc(100%-32px)] sm:w-[400px] h-[calc(100vh-120px)] sm:h-[520px] font-sans flex flex-col pointer-events-auto">
        
        {/* Main interactive chat card panel container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', duration: 0.35 }}
          className="bg-white rounded-3xl border border-stone-200 shadow-2xl overflow-hidden flex flex-col h-full"
        >
          {/* Header */}
          <div className="p-4 bg-stone-900 text-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-left">
              <div className="w-8 h-8 rounded-full bg-orange-700 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white font-heading">UrbanNest Assistant</h3>
                <span className="text-[10px] text-orange-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping inline-block" />
                  Online Custom AI
                </span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                title="Restart conversation history"
                className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors focus:outline-none cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors focus:outline-none cursor-pointer"
                aria-label="Close assistant help window"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Messages list area (scrolling content) */}
          <div className="flex-1 overflow-y-auto p-4 bg-stone-50/50">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} />
            ))}

            {/* Pulsing bot typing animations */}
            {isLoading && (
              <div className="flex gap-3 mb-4 mr-auto text-left max-w-[85%] font-sans">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-orange-50 border border-orange-100 text-orange-700">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="flex flex-col">
                  <div className="p-3 bg-stone-50 border border-stone-100 text-stone-750 rounded-2xl rounded-tl-sm shadow-xs flex items-center gap-1.5 min-w-[70px] min-h-[36px]">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions footer tags */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-4 py-2 bg-stone-50 border-t border-stone-105 flex flex-wrap gap-2 text-left">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(q)}
                  className="px-3 py-1.5 bg-white border border-stone-200 rounded-full text-xs text-stone-650 hover:border-orange-600 hover:text-orange-705 hover:bg-orange-50/20 transition-all cursor-pointer focus:outline-none"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Text message input box form footer */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-stone-150 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about our lifestyle store..."
              className="flex-1 px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-orange-700 focus:border-orange-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-full bg-stone-900 border border-stone-900 text-white hover:bg-stone-800 disabled:opacity-40 flex items-center justify-center cursor-pointer transition-colors focus:outline-none shadow-xs"
              aria-label="Submit message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};

export default ChatbotWidget;
