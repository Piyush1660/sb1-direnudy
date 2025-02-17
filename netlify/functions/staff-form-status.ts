import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your project's URL and anon key
const supabase = createClient('https://itgxxoqvxlmldvofbqgm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0Z3h4b3F2eGxtbGR2b2ZicWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3OTEwNzIsImV4cCI6MjA1NTM2NzA3Mn0.u8QXlVTNcyKWcSf9T1LjJteNm7AQDzSGuW_1XgoyqPQ');

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'GET') {
    try {
      // Fetch the form status from Supabase
      const { data, error } = await supabase
        .from('staffFormStatus')
        .select('isStaffFormOpen')
        .eq('id', 1)
        .single(); // Ensure we're fetching a single record

      if (error) {
        console.error('Supabase error:', error);
        return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Failed to fetch status' }) };
      }

      return { statusCode: 200, body: JSON.stringify({ isStaffFormOpen: data?.isStaffFormOpen }) };
    } catch (error) {
      console.error('API error:', error);
      return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Failed to fetch status' }) };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const { isStaffFormOpen } = JSON.parse(event.body || '{}');
      
      const { data, error } = await supabase
        .from('staffFormStatus')
        .upsert([{ id: 1, isStaffFormOpen }]);

      if (error) {
        console.error('Supabase error:', error);
        return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Failed to update status' }) };
      }

      return { statusCode: 200, body: JSON.stringify({ success: true, isStaffFormOpen }) };
    } catch (error) {
      console.error('API error:', error);
      return { statusCode: 500, body: JSON.stringify({ success: false, message: 'Failed to update status' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
}
