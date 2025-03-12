
import React from 'react';
import { Search, Plus, Moon, Sun } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useTheme } from "./ThemeProvider";
import { useNavigate, useSearchParams } from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface User {
  id: string;
  name: string;
  avatar: string;
  status: string;
}

const users: User[] = [
  { 
    id: "1", 
    name: "Sarah Parker", 
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", 
    status: "Working on the new design" 
  },
  { 
    id: "2", 
    name: "Mike Johnson", 
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952", 
    status: "In a meeting" 
  },
  { 
    id: "3", 
    name: "Emma Wilson", 
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", 
    status: "Available" 
  },
  { 
    id: "4", 
    name: "Tom Anderson", 
    avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", 
    status: "Busy" 
  },
];

export const ChatSidebar = ({chats, user}) => {
  dayjs.extend(relativeTime);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log("ChatSidebar", chats)
  
  const chatId = searchParams.get("chat_id")
  if(chatId) {
    console.log('HEY')
  }

  const hoverBackground = (theme === "dark") ? "hover:bg-white/10" : "hover:bg-slate-200"
  const avatar = (user && (user.avatar.length > 1) ) ? user.avatar : "https://bluerydge.com/_ipx/_/icons/ic-profile.svg"

  return (
    <div className="w-[280px] sm:w-80 h-full glass p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <img 
              src={avatar} 
              alt="Me" 
              className="object-cover"
            />
          </Avatar>
          <span className="font-medium">{user.first_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => navigate('?new=true')}>
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-1 ring-white/20 transition-all"
        />
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
        {chats.map((chat) => {
          const selectedDarkBackground = (searchParams.get("chat_id") == chat.id && theme === "dark") ? "bg-white/10" : null;
          const selectedLightBackground = (searchParams.get("chat_id") == chat.id && theme === "light") ? "bg-slate-200" : null;
          const listThemedBackground = selectedDarkBackground || selectedLightBackground

          return (
            <div
              key={chat.id}
              className={`flex items-center gap-3 p-2 rounded-lg ${hoverBackground} cursor-pointer transition-colors ${listThemedBackground}`}
            >
              {/* <Avatar className="w-10 h-10">
                <img src={chat?.avatar} alt={chat.title} className="object-cover" />
              </Avatar> */}
              <a
                key={chat.id} 
                // className="text-base p-4 cursor-pointer hover:bg-slate-200 flex w-full text-primary-600 flex flex-col gap-y-2 bg-slate-50"
                href={`?chat_id=${chat.id}`}
              >

                <div className="flex-1 min-w-0">
                  <div className="font-medium">{chat.title}</div>
                  <div className="text-sm text-muted truncate">{dayjs(chat.updated_at).fromNow()}</div>
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  );
};
