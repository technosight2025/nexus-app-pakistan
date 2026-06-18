"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface StoryBlock {
  title: string;
  text: string;
  image: string;
  align?: 'left' | 'right';
}

interface StoryTimelineProps {
  storyBlocks: StoryBlock[];
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ storyBlocks }) => {
  return (
    <section className="relative bg-nexus-creme py-32 px-4 overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-24">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-nexus-emerald text-sm uppercase tracking-[0.3em] font-semibold mb-4"
        >
          The Beginning
        </motion.h3>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-serif text-nexus-charcoal"
        >
          Our Story
        </motion.h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-px w-24 bg-nexus-gold mx-auto mt-8 origin-center"
        />
      </div>

      {/* Timeline Blocks */}
      <div className="max-w-5xl mx-auto space-y-32">
        {storyBlocks.map((block, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${!isEven ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/2"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full shadow-2xl">
                  <img 
                    src={block.image} 
                    alt={block.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-nexus-emerald/10 mix-blend-overlay" />
                </div>
              </motion.div>

              {/* Text Side */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full md:w-1/2 text-center md:text-left space-y-6"
              >
                <h4 className="text-3xl font-serif text-nexus-charcoal">{block.title}</h4>
                <p className="text-nexus-charcoal/70 leading-relaxed font-light text-lg">
                  {block.text}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
