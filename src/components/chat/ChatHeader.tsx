
import { Avatar } from "@/components/ui/avatar";
import { Info } from "lucide-react";

interface ChatHeaderProps {
  onSendSimulatedMessage: () => void;
}

export const ChatHeader = ({ onSendSimulatedMessage }: ChatHeaderProps) => {
  return (
    <div className="bg-[var(--background)] border-b border-[var(--border)] p-2 sm:p-4 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-3">
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="User" className="object-cover" />
        </Avatar>
        <div>
          <div className="font-medium text-sm sm:text-base text-[var(--foreground)]">Sarah Parker</div>
          <div className="text-xs sm:text-sm text-[var(--muted)]">Active now</div>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={onSendSimulatedMessage}
          className="p-1.5 sm:p-2 hover:bg-[var(--message-bg)] rounded-full transition-colors"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" transform="rotate(180 12 12)" />
          </svg>
        </button>
        <button className="p-1.5 sm:p-2 hover:bg-[var(--message-bg)] rounded-full transition-colors">
          <Info className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};
