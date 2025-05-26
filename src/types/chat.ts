
export interface Message {
  id: string | number;
  message: string;
  name: string;
  role: string;
  created_at?: string;
  updated_at?: string;
  chat_id?: number;
  user_id?: number;
  read?: boolean;
  sending?: boolean;
  content?: string;
  sender?: string;
  timestamp?: string;
}
