import { useChatBot } from "@/hooks/useChatBot";
import { ChatBotButton } from "./ChatBotButton";
import { ChatBotWindow } from "./ChatBotWindow";

export const ChatBot = () => {
  const {
    messages,
    isOpen,
    isLoading,
    toggleChat,
    closeChat,
    sendMessage,
    messagesEndRef
  } = useChatBot();

  return (
    <>
      <ChatBotButton isOpen={isOpen} onClick={toggleChat} />
      <ChatBotWindow
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        onClose={closeChat}
        onSendMessage={sendMessage}
        messagesEndRef={messagesEndRef}
      />
    </>
  );
};
