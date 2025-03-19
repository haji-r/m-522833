import { Avatar } from "@/components/ui/avatar";
import { Check } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Message } from "@/types/chat";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// interface ChatMessageProps {
//   message: Message;
//   isFirstInGroup: boolean;
//   isLastInGroup: boolean;
// }

export const ChatMessage = ({ message, user, isFirstInGroup, isLastInGroup }) => {
  dayjs.extend(relativeTime);

  const avatar = message.role === "user" ? user.avatar : `../../../src/assets/images/${message.name.toLowerCase()}.webp`;
  const bubble = message.role === "user" ? "bg-[var(--bubble-sent)] text-[var(--foreground)]" : "bg-[var(--message-bg)] text-[var(--foreground)]";
  const avatarDefault = avatar.length > 1 ? avatar : "https://bluerydge.com/_ipx/_/icons/ic-profile.svg"

  return (
    <div 
      className={`flex items-start gap-2 sm:gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
    >
      <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-0.5 flex-shrink-0">
        <img 
          src={avatarDefault} 
          alt={message.role === "user" ? message.name : "Ai"} 
          className="object-cover"
        />
      </Avatar>
      <div className={`flex flex-col ${message.name === "" ? "items-end" : "items-start"}`}>
        <div 
          className={`px-6 sm:px-6 py-6 rounded-lg max-w-[85%] sm:max-w-[75%] ${bubble} ${message?.sending ? "opacity-70" : ""} prose prose-sm sm:prose-base max-w-none`}
        >
          <ReactMarkdown>{message.message}</ReactMarkdown>
        </div>
        <div className="flex items-center gap-1 text-xs text-[var(--muted)] mt-1 px-1">
          {dayjs(message.created_at).fromNow()}
          {message.name === "" && (
            message?.sending ? (
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[var(--muted)] animate-pulse" />
            ) : (
              message?.read && <Check className="w-2 h-2 sm:w-3 sm:h-3" />
            )
          )}
        </div>
      </div>
    </div>
  );
};
