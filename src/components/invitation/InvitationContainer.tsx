"use client";

import React, { useRef } from 'react';
import { AudioProvider, AudioController } from './AudioController';
import { CinematicHero } from './CinematicHero';
import { StoryTimeline } from './StoryTimeline';
import { EventsJourney, EventDetail } from './EventsJourney';
import { RSVPWizard } from './RSVPWizard';
import { Registry } from './Registry';
import { MemoriesPortal } from './MemoriesPortal';

interface InvitationData {
  id: string;
  brideName: string;
  groomName: string;
  weddingDate: string;
  heroBackground: string;
  status: "Pre-Event" | "Live" | "Post-Event";
  allowRegistry: boolean;
  storyBlocks: any[];
  events: EventDetail[];
  memories: any[];
}

interface InvitationContainerProps {
  data: InvitationData;
  guestName: string;
}

export const InvitationContainer: React.FC<InvitationContainerProps> = ({ data, guestName }) => {
  const storyRef = useRef<HTMLDivElement>(null);

  const scrollToStory = () => {
    storyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AudioProvider>
      <main className="min-h-screen bg-nexus-charcoal font-sans selection:bg-nexus-gold/30">
        <AudioController />

        <CinematicHero 
          brideName={data.brideName}
          groomName={data.groomName}
          weddingDate={data.weddingDate}
          backgroundUrl={data.heroBackground}
          onBeginJourney={scrollToStory}
        />

        <div ref={storyRef}>
          <StoryTimeline storyBlocks={data.storyBlocks} />
        </div>

        {/* Conditional Rendering based on Event Status */}
        {data.status !== "Post-Event" ? (
          <>
            <EventsJourney events={data.events} />
            <Registry allowRegistry={data.allowRegistry} />
            <RSVPWizard guestName={guestName} />
          </>
        ) : (
          <MemoriesPortal initialMemories={data.memories} />
        )}
        
        {/* Footer */}
        <footer className="bg-nexus-charcoal py-12 text-center border-t border-white/5">
          <p className="text-white/40 font-light text-sm">
            Powered by <span className="font-serif text-nexus-gold">NEXUS</span>
          </p>
        </footer>
      </main>
    </AudioProvider>
  );
};
