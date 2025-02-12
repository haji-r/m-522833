
import { Avatar } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}

export const ChatMessage = ({ message, isFirstInGroup, isLastInGroup }: ChatMessageProps) => {
  return (
    <div 
      className={`flex items-start gap-3 ${message.sender === "me" ? "flex-row-reverse" : ""}`}
    >
      {isLastInGroup && (
        <Avatar className="w-8 h-8 mt-0.5">
          <img 
            src={message.sender === "me" 
              ? "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              : "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            } 
            alt={message.sender === "me" ? "Me" : "Other"} 
            className="object-cover"
          />
        </Avatar>
      )}
      <div className={`flex flex-col ${message.sender === "me" ? "items-end" : "items-start"}`}>
        <div 
          className={`px-4 py-2 rounded-lg max-w-[85%] ${
            message.sender === "me" 
              ? "bg-[var(--bubble-sent)] text-[var(--foreground)]" 
              : "bg-[var(--message-bg)] text-[var(--foreground)]"
          } ${message.sending ? "opacity-70" : ""} prose prose-sm max-w-none`}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        {isLastInGroup && (
          <div className="flex items-center gap-1 text-xs text-[var(--muted)] mt-1 px-1">
            {message.timestamp}
            {message.sender === "me" && (
              message.sending ? (
                <div className="w-3 h-3 rounded-full bg-[var(--muted)] animate-pulse" />
              ) : (
                message.read && <Check className="w-3 h-3" />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
