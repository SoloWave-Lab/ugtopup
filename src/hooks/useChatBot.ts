import { useState, useCallback, useRef, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  sessionId: string;
}

const STORAGE_KEY = 'ugc-chat-session';
const WEBHOOK_URL = 'https://n8n.aiagentra.com/webhook/chatbot';
const WEBHOOK_TIMEOUT = 30000; // 30 seconds

// Generate unique session ID
const generateSessionId = (): string => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 9);
  return `ugc-${timestamp}-${randomStr}`;
};

// Get or create session ID from localStorage
const getSessionId = (): string => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const data = JSON.parse(stored);
      if (data.sessionId && data.timestamp) {
        // Session valid for 24 hours
        const age = Date.now() - data.timestamp;
        if (age < 24 * 60 * 60 * 1000) {
          return data.sessionId;
        }
      }
    } catch (e) {
      console.error('Error parsing session:', e);
    }
  }
  
  const newSessionId = generateSessionId();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    sessionId: newSessionId,
    timestamp: Date.now()
  }));
  return newSessionId;
};

export const useChatBot = () => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isOpen: false,
    isLoading: false,
    sessionId: ''
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasShownWelcome = useRef(false);

  // Initialize session and show welcome message
  useEffect(() => {
    if (state.isOpen && !hasShownWelcome.current && state.messages.length === 0) {
      const sessionId = getSessionId();
      setState(prev => ({ ...prev, sessionId }));
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: 'welcome-' + Date.now(),
        content: 'Hi! Welcome to UGC-Topup. How can I help you today? 🎮',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setState(prev => ({
        ...prev,
        messages: [welcomeMessage]
      }));
      
      hasShownWelcome.current = true;
    }
  }, [state.isOpen, state.messages.length]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [state.messages]);

  const toggleChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  }, []);

  const closeChat = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    const trimmedContent = content.trim();
    if (!trimmedContent || state.isLoading) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      content: trimmedContent,
      sender: 'user',
      timestamp: new Date()
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));

    try {
      // Prepare webhook payload
      const payload = {
        message: trimmedContent,
        timestamp: new Date().toISOString(),
        session_id: state.sessionId,
        source: 'UGC-Topup Website'
      };

      // Send to webhook with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT);

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Webhook returned ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.message || data.response || 'Thank you for your message. Our team will assist you shortly.';

      // Add bot response
      const botMessage: ChatMessage = {
        id: 'bot-' + Date.now(),
        content: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false
      }));

    } catch (error: any) {
      console.error('Chat error:', error);

      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.name === 'AbortError') {
        errorMessage = 'Response is taking longer than expected. Please try again.';
      } else if (error.message.includes('fetch')) {
        errorMessage = "Sorry, I'm having trouble connecting. Please check your internet and try again.";
      }

      const errorBotMessage: ChatMessage = {
        id: 'bot-error-' + Date.now(),
        content: errorMessage,
        sender: 'bot',
        timestamp: new Date()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorBotMessage],
        isLoading: false
      }));
    }
  }, [state.isLoading, state.sessionId]);

  return {
    messages: state.messages,
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    toggleChat,
    closeChat,
    sendMessage,
    messagesEndRef
  };
};
