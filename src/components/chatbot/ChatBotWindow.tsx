import { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "@/hooks/useChatBot";
import { cn } from "@/lib/utils";

interface ChatBotWindowProps {
  isOpen: boolean;
  messages: ChatMessageType[];
  isLoading: boolean;
  onClose: () => void;
  onSendMessage: (content: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatBotWindow = ({
  isOpen,
  messages,
  isLoading,
  onClose,
  onSendMessage,
  messagesEndRef
}: ChatBotWindowProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed bottom-20 right-5 md:bottom-24 md:right-6 z-40",
        "w-[calc(100vw-2.5rem)] h-[calc(100vh-140px)] md:w-[400px] md:h-[600px]",
        "bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl",
        "border border-white/10",
        "chat-window-enter",
        "flex flex-col overflow-hidden"
      )}
      style={{
        boxShadow: "0 8px 40px rgba(255, 20, 147, 0.4), 0 0 80px rgba(255, 20, 147, 0.2)"
      }}
      role="dialog"
      aria-label="Chat support window"
    >
      {/* Header */}
      <div className="neon-button p-4 flex items-center gap-3 border-b border-white/10 flex-shrink-0">
        <img
          src="/logo.jpg"
          alt="UGC-Topup"
          className="w-8 h-8 rounded-lg object-cover"
        />
        <h3 className="text-white font-semibold text-base md:text-lg flex-1">
          UGC-Topup Chat Support 💬
        </h3>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors p-1"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-2 chat-scrollbar"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,20,147,0.05) 100%)"
        }}
        aria-live="polite"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="bg-white/8 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex items-center gap-1">
                <span className="text-gray-400 text-sm mr-2">Typing</span>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-typing-dot" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-typing-dot" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-typing-dot" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/5 border-t border-white/10 flex-shrink-0">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className={cn(
              "flex-1 px-4 py-3 rounded-xl",
              "bg-white/8 backdrop-blur-sm border border-white/15",
              "text-white placeholder:text-gray-400",
              "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
              "text-sm md:text-base transition-all"
            )}
            disabled={isLoading}
            style={{ fontSize: window.innerWidth < 640 ? '16px' : undefined }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
              "neon-button transition-all duration-300",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none",
              "hover:scale-105 active:scale-95"
            )}
            aria-label="Send message"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
