"use client";

import { BlogTopic } from "./types";
import { Card, CardBody, CardHeader, Divider } from "@heroui/react";

interface TopicViewerProps {
  topics: BlogTopic[];
}

export const TopicViewer = ({ topics }: TopicViewerProps) => {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="space-y-8">
      {topics.map((topic, index) => (
        <div key={topic.id || index} id={`topic-${index}`} className="scroll-mt-24">
          <Card className="w-full">
            <CardHeader className="bg-default-50 px-6 py-4">
              <h2 className="text-xl font-bold text-primary">
                <span className="text-default-400 mr-2">#{index + 1}</span>
                {topic.title}
              </h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-6 prose prose-blue dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap font-sans">{topic.content}</div>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};
