"use client";

import React, { useEffect, useState } from 'react';
import { Loader2, Heart, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

type Memory = {
  id: string;
  image_url: string;
  timestamp: string;
};

export default function PublicGallery() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemories = async () => {
      try {
        const res = await fetch('/api/memories');
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setMemories(data.memories || []);
      } catch (err) {
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-24">
        <Loader2 className="w-8 h-8 animate-spin text-[#047857]" />
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="text-center py-20 px-6 bg-slate-50 rounded-3xl border border-slate-100">
        <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#1E1B4B] mb-2">No Memories Yet</h3>
        <p className="text-slate-500">Be the first to share a moment from the event!</p>
      </div>
    );
  }

  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {memories.map((memory, idx) => (
        <motion.div 
          key={memory.id} 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.05 }}
          className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-100"
        >
          <img 
            src={memory.image_url} 
            alt="Event Memory" 
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <button className="text-white hover:text-red-400 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
