import { create } from 'zustand'

interface NotificationState {
  unreadCount: number
  isPolling: boolean
  startPolling: () => void
  stopPolling: () => void
  clearNotifications: () => void
}

export const useNotifications = create<NotificationState>((set, get) => ({
  unreadCount: 0,
  isPolling: false,
  startPolling: () => {
    if (get().isPolling) return;
    
    set({ isPolling: true });
    
    // Simulate initial fetch
    set({ unreadCount: Math.floor(Math.random() * 5) + 1 });

    // Poll every 15 seconds for new notifications (mocked)
    const interval = setInterval(() => {
      set((state) => ({
        // Randomly increment notifications or keep same
        unreadCount: state.unreadCount + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 15000);

    // Attach interval to window to clear it later if needed (hacky but works for mock)
    (window as any).__notification_interval = interval;
  },
  stopPolling: () => {
    if ((window as any).__notification_interval) {
      clearInterval((window as any).__notification_interval);
    }
    set({ isPolling: false });
  },
  clearNotifications: () => set({ unreadCount: 0 })
}))
