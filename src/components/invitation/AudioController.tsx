"use client";

import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export const AudioContext = React.createContext<AudioContextType>({
  isPlaying: false,
  toggleAudio: () => {},
  isMuted: false,
  toggleMute: () => {},
});

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // In a real implementation, we would use an HTMLAudioElement here.
  // For the design/prototype phase, we manage the state visually.

  const toggleAudio = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

export const AudioController: React.FC = () => {
  const { isPlaying, toggleAudio, isMuted, toggleMute } = React.useContext(AudioContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed top-4 right-4 z-50 flex gap-2"
    >
      <button 
        onClick={toggleAudio}
        className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/40 transition-all"
        aria-label="Toggle Audio"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
      </button>
      <button 
        onClick={toggleMute}
        className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/40 transition-all"
        aria-label="Toggle Mute"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </motion.div>
  );
};
