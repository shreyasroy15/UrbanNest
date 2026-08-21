import React, { createContext, useContext, useState, useEffect } from 'react';
import chatbotService from '../services/n8n/chatbotService';
import apiConfig from '../services/apiConfig';

const ChatbotContext = createContext(null);

// Fallback UUID generator in case crypto.randomUUID is unavailable
const getUUID = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const ChatbotProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('urbannest_chat_history');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading chat history', e);
    }
    return [
      {
        id: 'welcome',
        sender: 'bot',
        text: "👋 Hi! I'm the UrbanNest AI assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
      }
    ];
  });

  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let sid = localStorage.getItem('urbannest_chat_session_id');
    if (!sid) {
      sid = getUUID();
      localStorage.setItem('urbannest_chat_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    localStorage.setItem('urbannest_chat_history', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: getUUID(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      if (!apiConfig.n8n.isChatbotAvailable) {
        // Fail-safe simulation if integration URL is not set
        setTimeout(() => {
          const botMsg = {
            id: getUUID(),
            sender: 'bot',
            text: `[Demo Mode] I received your message: "${text.trim()}". (N8N integration URL is currently not set).`,
            timestamp: new Date().toISOString(),
          };
          setMessages((prev) => [...prev, botMsg]);
          setIsLoading(false);
        }, 1200);
        return;
      }

      const response = await chatbotService.sendMessageToChatbot({
        message: text.trim(),
        sessionId: sessionId,
      });

      // Handle typical formats returned by N8N (either string response, or object containing text)
      let botResponseText = "How else can I assist you?";
      if (response) {
        if (typeof response === 'string') {
          botResponseText = response;
        } else if (response.output || response.text || response.message || response.response) {
          botResponseText = response.output || response.text || response.message || response.response;
        } else if (Array.isArray(response) && response[0]) {
          const item = response[0];
          botResponseText = item.output || item.text || item.message || item.response || JSON.stringify(item);
        } else {
          botResponseText = JSON.stringify(response);
        }
      }

      const botMsg = {
        id: getUUID(),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      console.error('Failed to communicate with N8N Chatbot', e);
      setError("I'm having trouble connecting right now. Please try again in a moment.");
      
      const botMsg = {
        id: getUUID(),
        sender: 'bot',
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem('urbannest_chat_history');
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "👋 Hi! I'm the UrbanNest AI assistant. How can I help you today?",
        timestamp: new Date().toISOString(),
      }
    ]);
  };

  return (
    <ChatbotContext.Provider
      value={{
        isOpen,
        setIsOpen,
        messages,
        sessionId,
        isLoading,
        error,
        sendMessage,
        clearChat,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
export default useChatbot;
