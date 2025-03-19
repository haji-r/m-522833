import React, { useState, createContext } from 'react';
import { fakeAuthProvider } from '../services/auth';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const localAccessToken = localStorage.getItem('accessToken');

  const [user, setUser] = useState(localUser);

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);

  const [accessToken, setAccessToken] = useState(localAccessToken);

  const [selectedModel, setSelectedModel] = useState('Sierra');

  const signin = (token, callback) => {
    return fakeAuthProvider.signin(() => {
      // setUser(newUser);
      setAccessToken(token)
      callback();
    });
  };

  const signout = () => {
    localStorage.clear();
    setUser([]);
    setChats([]);
    setAccessToken([]);
    return true;
  };

  const value = { user, setUser, signin, signout, chats, setChats, accessToken, setAccessToken, messages, setMessages, selectedModel, setSelectedModel };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
