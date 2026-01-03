"use client";

import React from "react";
import { motion } from "framer-motion";
import { getOptimizedImageUrl } from "./image-utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

export const Hero = ({ title, subtitle, image }: HeroProps) => {
  const bgImage = getOptimizedImageUrl(image);

  return (
    <div className="relative w-full py-20 md:py-32 px-6 overflow-hidden bg-background">
      {/* Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 dark:opacity-70 blur-[2px] scale-105"
            style={{ backgroundImage: `url('${bgImage}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>
      )}

      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Decorative Gradients */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-default-500 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="h-1.5 bg-primary mt-8 rounded-full" 
        />
      </div>
    </div>
  );
};