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

  const signin = (token, callback) => {
    console.log("TOKEN", token)
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

  const value = { user, setUser, signin, signout, chats, setChats, accessToken, setAccessToken, messages, setMessages };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
