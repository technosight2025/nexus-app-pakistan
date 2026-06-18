// src/app/hooks/useResponsive.ts
"use client";

import { useState, useEffect } from "react";

/**
 * Simple responsive hook that returns booleans for common breakpoints.
 * Adjust breakpoints to match your design system if needed.
 */
export function useResponsive() {
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width < 640; // < sm
  const isTablet = width >= 640 && width < 1024; // sm to lg
  const isDesktop = width >= 1024; // lg and up

  return { isMobile, isTablet, isDesktop };
}
