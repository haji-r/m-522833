
import { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { initialMessages } from "@/constants/initialMessages";
import { ChatHeader } from "./chat/ChatHeader";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";

export const ChatMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateReceiveMessage = () => {
    const replyMsg = {
      id: Date.now().toString(),
      content: `# Design System Documentation

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

\`\`\`javascript
const theme = {
  light: '#FFFFFF',
  dark: '#141413'
}
\`\`\`

---

Need help? Contact our [design team](mailto:design@example.com) 🎨`,
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    const newMsg = {
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
    <div className="flex-1 flex flex-col h-[100dvh]">
      <ChatHeader onSendSimulatedMessage={simulateReceiveMessage} />

      <div className="flex-1 overflow-y-auto py-2 sm:py-4 space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-8 scrollbar-hide bg-[var(--background)]">
        {messages.map((message, index) => {
          const isFirstInGroup = index === 0 || messages[index - 1].sender !== message.sender;
          const isLastInGroup = index === messages.length - 1 || messages[index + 1].sender !== message.sender;
          
          return (
            <ChatMessage
              key={message.id}
              message={message}
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
      />
    </div>
  );
};
