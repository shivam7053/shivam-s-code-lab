"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { TOCProvider } from "../components/toc-context";

export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextThemesProvider attribute="class" defaultTheme="system">
      <HeroUIProvider navigate={router.push}>
        <TOCProvider>
          {children}
        </TOCProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
