
import { useState, useEffect, useContext } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatMessages } from "@/components/ChatMessages";
import { Menu } from "lucide-react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext} from "../context/AuthProvider";
import { useLazyFetchChatsQuery} from '../services/chats';

const Index = () => {
  const navigate = useNavigate();
  const { user, chats, setChats, accessToken, setMessages } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [fetchChats, {}] = useLazyFetchChatsQuery();

  useEffect(() => {
    if (accessToken === null) {
      navigate("/sign-in");
      return
    }

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    const messageId = searchParams.get("message_id");
    var params = {}
    if(messageId) {
      params = {message_id: messageId};
    }

    const chatId = searchParams.get("chat_id")
    if(chatId) {
      params = {chat_id: chatId};
    }

    fetchChats({}).then(response => {
      if(response.error && response.error.status == 401) {
        localStorage.removeItem('accessToken');
        navigate("/sign-in");
        return
      }

      const results = response.data;
      setChats(results);

      if(results.length > 0) {
        var messages = []
        if(chatId) {
          results.map((result) => {
            if(result.id == chatId) {
              messages = result.messages;
            }
          })
        } else {
          messages = results[0].messages;
        }
        const newMessage = searchParams.get("new");
        if (!newMessage) {
          setSearchParams({chat_id: chatId || results[0].id});
          setMessages(messages);
        }
      }
    });

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-2 left-2 z-50 p-2 rounded-lg bg-[var(--background)] border border-[var(--border)] hover:bg-[var(--message-bg)] transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        fixed md:relative z-40 md:translate-x-0
      `}>
        <ChatSidebar chats={chats} user={user}/>
      </div>

      {/* Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <ChatMessages user={user} />
    </div>
  );
};

export default Index;
