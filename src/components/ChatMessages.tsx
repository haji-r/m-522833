
import React, { useState, useRef, useEffect, useContext } from "react";
// import { toast } from "@/components/ui/use-toast";
import { toast } from 'sonner';
import { Message } from "@/types/chat";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { initialMessages } from "@/constants/initialMessages";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { AuthContext} from "../context/AuthProvider";
import { useCreateChatMutation, useLazyFetchChatQuery, useUpdateChatMutation, useLazyFetchChatsQuery} from '../services/chats';
import { useCreateThreadMutation, useLazyFetchThreadQuery, useLazyFetchThreadsQuery } from '../services/threads';
import OpenAI from "openai";
import env from "react-dotenv";

export const ChatMessages = ({ user }) => {
  const inputRef = useRef(null);
  const { chats, setChats, accessToken, messages, setMessages, selectedModel } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [ updateChat, {} ] = useUpdateChatMutation();
  const [ fetchChats, {} ] = useLazyFetchChatsQuery();

  const [ createChat, {data: newChat, error, isLoading: createIsLoading} ] = useCreateChatMutation();
  const [ createThread, {data: newThread, error: threadError, isLoading: threadIsLoading} ] = useCreateThreadMutation();
  const openai = new OpenAI({ apiKey: env.GPT_API_KEY, dangerouslyAllowBrowser: true });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateMessageReceived = async (chatIdThread = null, message = null ) => {
    toast.loading(`${selectedModel} is typing...`);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    const chatId = chatIdThread || searchParams.get("chat_id")
    const params = {
      id: Math.random(),
      chat_id: chatId,
      // userId: user._id,
      avatar: "",
      name: selectedModel,
      role: "bot",
      message: completion.choices[0].message.content
    };

    setMessages((messages) => [
      ...messages,
      params
    ]);

    toast.dismiss();
    saveToMessageDb(params);
    scrollToBottom();
  };

  const createNewChatThread = (message = "", chatId) => {
    const messageParams = {
      role: 'user',
      name: '',
      message: message
    }

    const chatParams = {
      title: message,
      messages: [messageParams]
    }

    createChat(chatParams).then(response => {
      if(response.error) {
        alert(response.error.detail);
        return;
      }

      const newChatId = response.data.id

      fetchChats().then(response => {
        if(response.error) {
          alert(response.error.detail);
          return;
        }

        const results = response.data;
        setChats(results);

        if(results.length > 0) {
          var messages = []
          if(chatId) {
            results.map((result) => {
              if(result.id == chatId) {
                messages = result.messages
              }
            })
          } else {
            messages = results[0].messages
          }

          setSearchParams({chat_id: results[0].id})
          setMessages(messages);
          simulateMessageReceived(newChatId, message);
          scrollToBottom();
        }
      })
    })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    inputRef.current.value = "";
    // MARK: Check if a thread is selected - this is indicated by a chat_id present on the parameter
    const chatId = searchParams.get("chat_id")
    if(chatId) {
      /** MARK: 
       * Save new message and update chat updated_at date 
       * to reflect latest in conversation thread.
      */
      const messageObj = {
        role: "user",
        message: newMessage.trim(),
        chat_id: chatId
      }
      saveToMessageDb(messageObj, true);
      updateChat({id: chatId, body: {}}).then(_ => {
        fetchChats().then(response => {
          const results = response.data;
          setChats(results);
        })
      });

    } else {
      /** MARK:
       * Else if it's a new chat/question create new thread by creating
       * main chat with associated messages
      */
      createNewChatThread(newMessage.trim(), chatId)
    }
    setNewMessage("")
  };

  const saveToMessageDb = async (params, reload = false) => {
    try {
      await createThread(params).then(response => {
        if (reload) {
          setMessages((messages) => [
            ...messages,
            response.data
          ]);

          // createTempMessageLoader();
          simulateMessageReceived(params.chat_id, params.message);
          // fillChatTitle(params);
        }
        scrollToBottom();
  
      });
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-[100dvh]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto py-2 sm:py-4 space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-8 scrollbar-hide bg-[var(--background)]">
        {messages.map((message, index) => {
          const isFirstInGroup = index === 0 || messages[index - 1].name !== message.name;
          const isLastInGroup = index === messages.length - 1 || messages[index + 1].name !== message.name;

          return (
            <ChatMessage
              key={message.id}
              message={message}
              user={user}
              isFirstInGroup={isFirstInGroup}
              isLastInGroup={isLastInGroup}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        isSending={isSending}
        inputRef={inputRef}
      />
    </div>
  );
};
