import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useChatbot } from '../../hooks/useChatbot';
import { motion } from 'framer-motion';

export const ChatbotButton = () => {
  const { isOpen, setIsOpen } = useChatbot();

  return (
    <motion.button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle AI Assistance Help window"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-orange-700 hover:bg-orange-800 text-white shadow-xl flex items-center justify-center cursor-pointer transition-colors focus:outline-none"
    >
      {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
    </motion.button>
  );
};

export default ChatbotButton;
