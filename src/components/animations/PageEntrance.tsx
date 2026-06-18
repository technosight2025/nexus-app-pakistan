'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function PageEntrance({ children }: { children: React.ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if the page has already animated during this session
    const hasAnimated = sessionStorage.getItem('nexus_portal_animated');
    if (!hasAnimated) {
      setShouldAnimate(true);
      sessionStorage.setItem('nexus_portal_animated', 'true');
    }
    setIsReady(true);
  }, []);

  if (!isReady) {
    // Avoid flash of content before mounting on client
    return <div className="opacity-0">{children}</div>;
  }

  if (!shouldAnimate) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Custom easeOutExpo
    >
      {children}
    </motion.div>
  );
}
