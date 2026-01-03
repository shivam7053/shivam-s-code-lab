"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";

export const ExperimentGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Placeholder for Blog Cards */}
      {[1, 2].map((item) => (
        <Card key={item} className="p-4 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold text-primary/80">Database</p>
            <h4 className="font-bold text-large">Mastering SQL Joins</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <p className="text-default-500">A deep dive into Inner, Outer, and Cross joins with practical examples.</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};