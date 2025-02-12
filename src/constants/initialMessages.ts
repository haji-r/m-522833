
import { Message } from "../types/chat";

export const initialMessages: Message[] = [
  { 
    id: "1", 
    content: "# Welcome to the Chat! 👋\n\nThis chat supports *italic*, **bold**, and many other elements!", 
    sender: "other", 
    timestamp: "09:15", 
    read: true 
  },
  { 
    id: "2", 
    content: "Here's an example of what we can do:\n\n### Styled Lists\n- <span style='color: #646cff'>Colored text</span>\n- **Bold items**\n- *Italic items*\n\n### Code Examples\n```typescript\nconst greeting = 'Hello World!';\nconsole.log(greeting);\n```", 
    sender: "me", 
    timestamp: "09:17", 
    read: true 
  },
  { 
    id: "3", 
    content: "We can also do tables and quotes:\n\n| Feature | Support |\n|---------|----------|\n| Tables | ✅ |\n| Lists | ✅ |\n| Code | ✅ |\n\n> This is a blockquote with some _emphasized_ text\n\n### Links and Images\nCheck out this [link](https://example.com) 🔗", 
    sender: "other", 
    timestamp: "09:20", 
    read: true 
  },
  { 
    id: "4", 
    content: "## Advanced Formatting\n\n<div style='padding: 10px; border-radius: 5px; background-color: var(--message-bg);'>\n\n### Nested Content\n1. First item\n2. Second item\n   - Sub-item 1\n   - Sub-item 2\n\n</div>\n\n---\n\n<sup>This is superscript</sup> and <sub>this is subscript</sub>", 
    sender: "me", 
    timestamp: "09:22", 
    read: true 
  },
  { 
    id: "5", 
    content: "We can even do keyboard shortcuts:\n\nPress <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy\n\nAnd add some inline code: `const x = 42;`\n\n### Emoji Support\n🚀 🎨 💻 ⚡️", 
    sender: "other", 
    timestamp: "09:25", 
    read: true 
  },
];
