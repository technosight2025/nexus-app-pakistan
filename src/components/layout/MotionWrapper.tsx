"use client"

import React from "react"
import { motion } from "framer-motion"

export function MotionDiv({ children, className, delay = 0, animationStyle = 'fade-up' }: { children: React.ReactNode, className?: string, delay?: number, animationStyle?: string }) {
  if (animationStyle === 'none') return <div className={className}>{children}</div>
  
  let initial = { opacity: 0, y: 0, scale: 1, x: 0 }
  let animate = { opacity: 1, y: 0, scale: 1, x: 0 }
  
  if (animationStyle === 'fade-up') initial.y = 30
  if (animationStyle === 'scale-in') initial.scale = 0.9
  if (animationStyle === 'slide-right') initial.x = -30

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
