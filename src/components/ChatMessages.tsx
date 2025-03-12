
import React, { useState, useRef, useEffect, useContext } from "react";
import { toast } from "@/components/ui/use-toast";
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

export const ChatMessages = ({dbMessages, user, containerRef}) => {
  // console.log("dbMessages", dbMessages)
  const inputRef = useRef(null);
  const { chats, setChats, accessToken, messages, setMessages } = useContext(AuthContext);
  // const [messages, setMessages] = useState<Message[]>(dbMessages);
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
    console.log("----->>")
    console.log(messages)
    console.log("----->>")

  }, [messages]);

  const simulateReceiveMessage = () => {
    const replyMsg: Message = {
      id: Date.now(),
      message: `# Design System Documentation

## Introduction
Welcome to our comprehensive design system documentation. This guide will help you understand our visual language and components.

### Core Principles
Our design system is built on three fundamental principles:
1. Consistency
2. Accessibility
3. Scalability

#### Getting Started
New to our design system? Here's what you need to know first.

## Visual Elements

### Color System
Here's our color palette breakdown:

| Category | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|--------|
| Primary | #646CFF | #747BFF | CTAs |
| Secondary | #434343 | #A0A0A0 | Text |
| Accent | #FF4545 | #FF6B6B | Alerts |
| Background | #FFFFFF | #141413 | Surface |

### Typography Hierarchy
1. Display (32px)
2. Heading (24px)
3. Subheading (20px)
4. Body (16px)

## Components Library

### Interactive Elements
* Buttons
* Inputs
* Dropdowns

### Layout Components
- Cards
- Grids
- Navigation bars

#### Usage Guidelines
* Follow **accessibility** guidelines
* Maintain _consistent_ spacing
* Use appropriate \`color contrast\`

> Important: Always refer to the latest version of this documentation.

You can find more details in our [complete documentation](https://example.com/docs).

### Code Examples

\`\`\`typescript
interface Theme {
  light: string;
  dark: string;
}

const theme: Theme = {
  light: '#FFFFFF',
  dark: '#141413'
}
\`\`\`

---

Need help? Contact our [design team](mailto:design@example.com) 🎨`,
      name: "other",
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };

    toast({
      description: "Sierra is typing...",
      duration: 2000,
    });

    setTimeout(() => {
      setMessages(prev => [...prev, replyMsg]);
    }, 2000);
  };


  const simulateMessageReceived = async (chatIdThread = null, message = null ) => {
    toast({
      description: "Sierra is typing...",
      duration: 2000,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        // { role: "system", content: "You are a helpful assistant." },
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
      name: "Sierra",
      role: "bot",
      message: completion.choices[0].message.content
    };

    setMessages((messages) => [
      ...messages,
      params
    ]);

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

          // createTempMessageLoader();
          simulateMessageReceived(newChatId, message);

          scrollToBottom();
        }
      })
    })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;
    console.log(newMessage)
    console.log("Input", inputRef.current.value)

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
    
    // const newMsg: Message = {
    //   id: Date.now(),
    //   message: newMessage,
    //   role: "user",
    //   name: "Danny",
    //   chat_id: 15,
    //   user_id: 1,
    //   created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //   updated_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //   read: false,
    //   sending: true
    // };

    // setMessages(prev => [...prev, newMsg]);
    // setIsSending(true);
    // setNewMessage("");

    // await new Promise(resolve => setTimeout(resolve, 1000));

    // setMessages(prev => 
    //   prev.map(msg => 
    //     msg.id === newMsg.id 
    //       ? { ...msg, sending: false } 
    //       : msg
    //   )
    // );
    
    // setIsSending(false);
    
    // toast({
    //   description: "Message sent",
    //   duration: 2000,
    // });

    // setTimeout(async () => {
    //   simulateReceiveMessage();
    // }, 2000);
  };

  const saveToMessageDb = async (params, reload = false) => {
    try {
      await createThread(params).then(response => {
        console.log("response", response)

        if (reload) {
          console.log(response)
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
    <div className="flex-1 flex flex-col h-[100dvh]" ref={containerRef}>
      <ChatHeader onSendSimulatedMessage={simulateReceiveMessage} />

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
