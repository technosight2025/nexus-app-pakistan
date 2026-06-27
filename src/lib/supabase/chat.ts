import { createClient } from './client';

export type ChatMessage = {
  id: string;
  booking_id: string;
  sender_type: string;
  sender_name: string;
  message: string;
  created_at: string;
};

export async function fetchMessages(bookingId: string): Promise<ChatMessage[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('booking_discussions')
      .select('*')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages from Supabase:', error);
      return [];
    }
    
    return data as ChatMessage[] || [];
  } catch (err) {
    console.error('Exception fetching messages:', err);
    return [];
  }
}

export async function insertMessage(
  bookingId: string, 
  senderType: string, 
  senderName: string, 
  message: string
): Promise<ChatMessage | null> {
  try {
    const supabase = createClient();
    const newMsg = {
      booking_id: bookingId,
      sender_type: senderType,
      sender_name: senderName,
      message,
    };

    const { data, error } = await supabase
      .from('booking_discussions')
      .insert(newMsg)
      .select()
      .single();

    if (error) {
      console.error('Error inserting message to Supabase:', error);
      return null;
    }

    return data as ChatMessage;
  } catch (err) {
    console.error('Exception inserting message:', err);
    return null;
  }
}
