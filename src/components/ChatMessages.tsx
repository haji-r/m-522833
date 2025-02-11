
import { Avatar } from "@/components/ui/avatar";
import { Check, Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
  timestamp: string;
  read: boolean;
  sending?: boolean;
}

const initialMessages: Message[] = [
  { id: "1", content: "Hey! How's your day going?", sender: "other", timestamp: "09:15", read: true },
  { id: "2", content: "Pretty good! Just working on some new designs. How about you?", sender: "me", timestamp: "09:17", read: true },
  { id: "3", content: "That's great! I'm actually looking for some design inspiration. Mind sharing what you're working on?", sender: "other", timestamp: "09:20", read: true },
  { id: "4", content: "Of course! I'm designing a new chat interface with a minimalist Perplexity-inspired look.", sender: "me", timestamp: "09:22", read: true },
  { id: "5", content: "That sounds amazing! I love Perplexity's clean design. Would love to see it when it's ready!", sender: "other", timestamp: "09:25", read: true },
];

export const ChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateReceiveMessage = () => {
    const replyMsg: Message = {
      id: Date.now().toString(),
      content: "Just saw your latest updates - they look fantastic! 🎨",
      sender: "other",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    toast({
      description: "Sarah is typing...",
      duration: 2000,
    });

    setTimeout(() => {
      setMessages(prev => [...prev, replyMsg]);
    }, 2000);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      sending: true
    };

    setMessages(prev => [...prev, newMsg]);
    setIsSending(true);
    setNewMessage("");

    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessages(prev => 
      prev.map(msg => 
        msg.id === newMsg.id 
          ? { ...msg, sending: false } 
          : msg
      )
    );
    
    setIsSending(false);
    
    toast({
      description: "Message sent",
      duration: 2000,
    });

    setTimeout(async () => {
      simulateReceiveMessage();
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      <div className="bg-[var(--background)] border-b border-[var(--border)] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="User" className="object-cover" />
          </Avatar>
          <div>
            <div className="font-medium text-[var(--foreground)]">Sarah Parker</div>
            <div className="text-sm text-[var(--muted)]">Active now</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={simulateReceiveMessage}
            className="p-2 hover:bg-[var(--message-bg)] rounded-full transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" transform="rotate(180 12 12)" />
            </svg>
          </button>
          <button className="p-2 hover:bg-[var(--message-bg)] rounded-full transition-colors">
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-6 px-4 md:px-8 scrollbar-hide bg-[var(--background)]">
        {messages.map((message, index) => {
          const isFirstInGroup = index === 0 || messages[index - 1].sender !== message.sender;
          const isLastInGroup = index === messages.length - 1 || messages[index + 1].sender !== message.sender;
          
          return (
            <div 
              key={message.id} 
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
                  } ${message.sending ? "opacity-70" : ""}`}
                >
                  {message.content}
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
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-[var(--background)] border-t border-[var(--border)]">
        <div className="flex items-center gap-2 bg-[var(--message-bg)] rounded-lg p-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none px-2 text-[var(--foreground)]"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={isSending}
          />
          <button 
            type="submit"
            className={`p-2 hover:bg-[var(--border)] rounded-full transition-colors ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSending}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};
