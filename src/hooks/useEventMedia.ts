'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client'; // آپ کا براؤزر سپابیس کلائنٹ

export interface MediaItem {
  id: string;
  event_id: string;
  url: string;
  caption: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function useEventMedia(eventId: string) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // 1. پہلی بار لوڈ ہونے پر ڈیٹا بیس سے ڈیٹا لائیں
    const fetchInitialMedia = async () => {
      const { data, error } = await supabase
        .from('event_media')
        .select('*')
        .eq('event_id', eventId);

      if (!error && data) {
        setMedia(data as MediaItem[]);
      }
      setLoading(false);
    };

    fetchInitialMedia();

    // 2. ریئل ٹائم چینل کو سبسکرائب کریں (Live Broadcast Listening)
    const channel = supabase
      .channel(`live-media-${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE', // جب بھی کوئی ڈیٹا اپڈیٹ ہو
          schema: 'public',
          table: 'event_media',
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          const updatedItem = payload.new as MediaItem;
          // اسٹیٹ کو بغیر پیج ریفریش کیے لائیو اپڈیٹ کریں
          setMedia((prev) =>
            prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
          );
        }
      )
      .subscribe();

    // کلین اپ جب یوزر پیج سے چلا جائے
    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId]);

  // اسٹیٹس اپڈیٹ کرنے کا فنکشن (جب کلائنٹ بٹن دبائے گا)
  const updateMediaStatus = async (mediaId: string, status: 'approved' | 'rejected') => {
    const { error } = await supabase
      .from('event_media')
      .update({ status })
      .eq('id', mediaId);

    if (error) {
      console.error('Error updating status:', error.message);
    }
  };

  return { media, loading, updateMediaStatus };
}
