import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rinepaoqofwfsvwrwhkd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpbmVwYW9xb2Z3ZnN2d3J3aGtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMTM4NjYsImV4cCI6MjA5NTg4OTg2Nn0.PStGkDGtTJdmKRTPCncX5KA534fSLLL4vf5iylbpbx0'
);

async function test() {
  const { data, error } = await supabase.from('rooms').select('*');
  console.log('Data:', data);
  console.log('Error:', error);
}

test();
