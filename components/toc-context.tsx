"use client";

import React, { createContext, useContext, useState } from "react";
import { BlogTopic } from "./types";

interface TOCContextType {
  topics: BlogTopic[];
  setTopics: (topics: BlogTopic[]) => void;
}

const TOCContext = createContext<TOCContextType>({
  topics: [],
  setTopics: () => {},
});

export const useTOC = () => useContext(TOCContext);

export const TOCProvider = ({ children }: { children: React.ReactNode }) => {
  const [topics, setTopics] = useState<BlogTopic[]>([]);
  return (
    <TOCContext.Provider value={{ topics, setTopics }}>
      {children}
    </TOCContext.Provider>
  );
};