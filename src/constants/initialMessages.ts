
import { Message } from "../types/chat";

export const initialMessages: Message[] = [
  { 
    id: "1", 
    content: "# Hey! 👋\nHow's your day going?", 
    sender: "other", 
    timestamp: "09:15", 
    read: true 
  },
  { 
    id: "2", 
    content: "Pretty good! Just working on some **new designs**. How about you?\n\n```typescript\ninterface Design {\n  name: string;\n  status: 'in-progress' | 'complete';\n}\n```", 
    sender: "me", 
    timestamp: "09:17", 
    read: true 
  },
  { 
    id: "3", 
    content: "That's great! I'm actually looking for some design inspiration. Mind sharing what you're working on?\n\n### Areas of Interest\n- UI/UX patterns\n- Color schemes\n- Typography\n\n> I'm particularly interested in modern, minimal designs.", 
    sender: "other", 
    timestamp: "09:20", 
    read: true 
  },
  { 
    id: "4", 
    content: "Of course! I'm designing a new chat interface with a minimalist **Perplexity-inspired** look.\n\n| Feature | Status |\n|---------|--------|\n| Typography | ✅ |\n| Colors | 🟡 |\n| Components | 🚧 |\n\nCheck out our [design system](https://example.com) for more details!", 
    sender: "me", 
    timestamp: "09:22", 
    read: true 
  },
  { 
    id: "5", 
    content: "That sounds amazing! I love Perplexity's clean design.\n\n#### Key Elements I Like:\n1. Clean typography\n2. Minimal animations\n3. Focus on readability\n\nWould love to see it when it's ready! 🎨", 
    sender: "other", 
    timestamp: "09:25", 
    read: true 
  },
];
