"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Calendar as CalendarIcon, ChevronRight, X } from 'lucide-react';

export interface EventDetail {
  id: string;
  type: "Mehndi" | "Baraat" | "Walima" | "Mayun";
  title: string;
  date: string;
  time: string;
  venueName: string;
  googleMapsUrl: string;
  dressCode?: string;
  coverImage: string;
}

interface EventsJourneyProps {
  events: EventDetail[];
}

export const EventsJourney: React.FC<EventsJourneyProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventDetail | null>(null);

  return (
    <section className="relative bg-nexus-charcoal py-32 px-4">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a227\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h3 className="text-nexus-gold text-sm uppercase tracking-[0.3em] font-semibold mb-4">The Celebration</h3>
          <h2 className="text-4xl md:text-5xl font-serif text-white">Events Journey</h2>
        </motion.div>

        {/* Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-nexus-gold/30 before:to-transparent">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Timeline Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-nexus-charcoal bg-nexus-gold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm transition-colors group-hover:bg-white/10 group-hover:border-nexus-gold/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-2xl font-serif text-white">{event.type}</h4>
                  <ChevronRight className="text-nexus-gold opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
                <div className="text-white/60 space-y-1 font-light text-sm">
                  <p className="flex items-center gap-2"><CalendarIcon size={14} /> {event.date}</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> {event.venueName}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-nexus-charcoal border border-nexus-gold/20 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="h-64 md:h-80 w-full relative">
                <img src={selectedEvent.coverImage} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-nexus-charcoal to-transparent" />
                <h2 className="absolute bottom-6 left-6 text-4xl font-serif text-white">{selectedEvent.title}</h2>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <span className="text-nexus-gold text-xs uppercase tracking-widest">When</span>
                    <p className="text-white/90 flex items-center gap-2"><CalendarIcon size={16} /> {selectedEvent.date}</p>
                    <p className="text-white/60 flex items-center gap-2"><Clock size={16} /> {selectedEvent.time}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-nexus-gold text-xs uppercase tracking-widest">Where</span>
                    <p className="text-white/90 flex items-start gap-2">
                      <MapPin size={16} className="mt-1 shrink-0" /> 
                      <span>{selectedEvent.venueName}</span>
                    </p>
                  </div>
                </div>

                {selectedEvent.dressCode && (
                  <div className="pt-6 border-t border-white/10 text-center">
                    <span className="text-nexus-gold text-xs uppercase tracking-widest block mb-2">Dress Code</span>
                    <p className="text-white/80 font-light">{selectedEvent.dressCode}</p>
                  </div>
                )}

                <div className="pt-6">
                  <a 
                    href={selectedEvent.googleMapsUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block w-full py-4 text-center rounded-xl bg-nexus-gold text-black font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
