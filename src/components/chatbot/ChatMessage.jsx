import React from 'react';
import { Bot, User } from 'lucide-react';

export const ChatMessage = ({ msg }) => {
  const { sender, text, timestamp, isError } = msg;
  const isBot = sender === 'bot';

  // Format local display times
  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };

  return (
    <div className={`flex gap-3 mb-4 font-sans max-w-[85%] ${isBot ? 'mr-auto text-left' : 'ml-auto text-right flex-row-reverse'}`}>
      
      {/* Icon profile */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs border ${
        isBot ? 'bg-orange-50 border-orange-100 text-orange-700' : 'bg-stone-105 border-stone-200 text-stone-705'
      }`}>
        {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      {/* Bubble text content */}
      <div className="flex flex-col">
        <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
          isBot 
            ? isError
              ? 'bg-red-50 border border-red-100 text-red-800'
              : 'bg-stone-50 border border-stone-100 text-stone-800 rounded-tl-sm'
            : 'bg-stone-900 border border-stone-900 text-stone-100 rounded-tr-sm'
        }`}>
          <p className="whitespace-pre-wrap font-light">{text}</p>
        </div>
        
        {/* Timing block */}
        {timestamp && (
          <span className="text-[9px] text-stone-400 mt-1 font-heading px-1">
            {formatTime(timestamp)}
          </span>
        )}
      </div>

    </div>
  );
};

export default ChatMessage;
