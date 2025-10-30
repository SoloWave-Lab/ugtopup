import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatBotButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const ChatBotButton = ({ isOpen, onClick }: ChatBotButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-5 right-5 md:bottom-6 md:right-6 w-14 h-14 md:w-[60px] md:h-[60px]",
        "rounded-full shadow-2xl z-50 transition-all duration-300",
        "neon-button chat-button-pulse",
        "flex items-center justify-center",
        "hover:scale-110 active:scale-95",
        isOpen && "rotate-[360deg]"
      )}
      aria-label={isOpen ? "Close chat" : "Open chat support"}
    >
      {isOpen ? (
        <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
      ) : (
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
      )}
    </button>
  );
};
