
export interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
  timestamp: string;
  read: boolean;
  sending?: boolean;
}
