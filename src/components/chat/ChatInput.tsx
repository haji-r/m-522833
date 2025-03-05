
interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isSending: boolean;
}

export const ChatInput = ({ newMessage, setNewMessage, handleSendMessage, isSending }: ChatInputProps) => {
  return (
    <form onSubmit={handleSendMessage} className="p-2 sm:p-4 bg-[var(--background)] border-t border-[var(--border)]">
      <div className="flex items-center gap-2 bg-[var(--message-bg)] rounded-lg p-1.5 sm:p-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none px-1.5 sm:px-2 text-sm sm:text-base text-[var(--foreground)]"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isSending}
        />
        <button 
          type="submit"
          className={`p-1.5 sm:p-2 hover:bg-[var(--border)] rounded-full transition-colors ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSending}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
          </svg>
        </button>
      </div>
    </form>
  );
};
