"use client";

import { useEffect } from "react";
import { useTOC } from "./toc-context";
import { BlogTopic } from "./types";

export const TOCSetter = ({ topics }: { topics: BlogTopic[] }) => {
  const { setTopics } = useTOC();

  useEffect(() => {
    setTopics(topics);
    return () => setTopics([]);
  }, [topics, setTopics]);

  return null;
};