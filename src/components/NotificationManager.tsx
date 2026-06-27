'use client';

import { useEffect, useRef } from 'react';

export default function NotificationManager() {
  const previousDataRef = useRef<any[]>([]);

  useEffect(() => {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notification');
      return;
    }

    // Request permissions on mount if haven't asked yet
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log("Push notifications enabled.");
        }
      });
    }

    // Initialize previous data state from local storage on mount
    const initialData = localStorage.getItem('nexus_quotations');
    if (initialData) {
      try {
        previousDataRef.current = JSON.parse(initialData);
      } catch (e) {
        // ignore JSON parse errors
      }
    }

    // Storage event listener for cross-tab diffing
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nexus_quotations' && e.newValue) {
        try {
          const newData = JSON.parse(e.newValue);
          const oldData = previousDataRef.current;

          // Diffing Engine: Find any quotation that has a new action in its actionHistory
          newData.forEach((newQuote: any) => {
            const oldQuote = oldData.find(q => q.id === newQuote.id);
            
            const newHistoryLength = newQuote.actionHistory ? newQuote.actionHistory.length : 0;
            const oldHistoryLength = (oldQuote && oldQuote.actionHistory) ? oldQuote.actionHistory.length : 0;

            if (newHistoryLength > oldHistoryLength) {
              // A new action was added! Grab the latest action
              const latestAction = newQuote.actionHistory[newHistoryLength - 1];
              
              // Only fire if we have permission
              if (Notification.permission === 'granted') {
                new Notification(`Project ${newQuote.id}: ${latestAction.action}`, {
                  body: latestAction.description || `Event update for ${newQuote.client}`,
                  icon: '/favicon.ico', // Optional: could add a nice logo here
                  tag: `quote-${newQuote.id}-${Date.now()}` // Prevents stacking too many
                });
              }
            }
          });

          // Update ref for the next diff
          previousDataRef.current = newData;
        } catch (error) {
          console.error("Error parsing storage data for notifications", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return null; // Headless component
}
