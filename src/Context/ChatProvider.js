"use client";
import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("test name");
  const history = useHistory();

  return (
    <div>
      <ChatContext.Provider value={{ user }}>{children}</ChatContext.Provider>
    </div>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
