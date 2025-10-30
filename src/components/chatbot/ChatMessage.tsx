import { ChatMessage as ChatMessageType } from "@/hooks/useChatBot";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';
  
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-slide-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] px-4 py-3 rounded-2xl text-sm md:text-base font-medium break-words",
          isUser
            ? "bg-gradient-to-r from-primary to-secondary text-white rounded-br-md shadow-lg"
            : "bg-white/8 backdrop-blur-sm border border-white/10 text-gray-200 rounded-bl-md"
        )}
      >
        {message.content}
      </div>
    </div>
  );
};
