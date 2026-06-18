"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Camera } from 'lucide-react';

interface MemoryItem {
  id: string;
  url: string;
  title: string;
  likes: number;
}

interface MemoriesPortalProps {
  initialMemories: MemoryItem[];
}

export const MemoriesPortal: React.FC<MemoriesPortalProps> = ({ initialMemories }) => {
  const [memories, setMemories] = useState<MemoryItem[]>(initialMemories);

  const handleLike = (id: string) => {
    setMemories(memories.map(m => m.id === id ? { ...m, likes: m.likes + 1 } : m));
  };

  return (
    <section className="bg-nexus-creme py-32 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h3 className="text-nexus-emerald text-sm uppercase tracking-[0.3em] font-semibold mb-4">The Legacy</h3>
          <h2 className="text-4xl md:text-5xl font-serif text-nexus-charcoal">Digital Memories</h2>
          <p className="mt-4 text-nexus-charcoal/60 font-light max-w-xl mx-auto">
            The event may be over, but the memories last forever. Explore the highlights and upload your own snaps below.
          </p>
        </motion.div>

        {/* Action Button */}
        <div className="flex justify-center mb-16">
          <button className="flex items-center gap-2 px-8 py-4 bg-nexus-emerald text-white rounded-full hover:bg-emerald-800 transition-all hover:scale-105 shadow-xl shadow-emerald-900/20">
            <Camera size={20} />
            <span>Upload Your Photo</span>
          </button>
        </div>

        {/* Masonry Grid Simulation */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {memories.map((memory, index) => (
            <motion.div 
              key={memory.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-lg bg-white"
            >
              <img src={memory.url} alt={memory.title} className="w-full h-auto object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <p className="text-white font-serif text-xl mb-2">{memory.title}</p>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => handleLike(memory.id)}
                    className="flex items-center gap-2 text-white/80 hover:text-nexus-gold transition-colors"
                  >
                    <Heart size={20} className="hover:fill-nexus-gold" />
                    <span className="font-light">{memory.likes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
