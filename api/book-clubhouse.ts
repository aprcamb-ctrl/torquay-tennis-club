import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, guests, requirements } = request.body;

  if (!name || !email || !phone || !date || !guests) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // NOTE: SQLite (better-sqlite3) is omitted here because it's not compatible with Vercel's ephemeral filesystem.
    // In a production environment, you should use a remote database (e.g. Supabase, Neon) or an email service.

    console.log('--- NEW CLUBHOUSE BOOKING ENQUIRY (Vercel Function) ---');
    console.log(`To: chairman@torquaytennisclub.co.uk`);
    console.log(`From: ${name} (${email})`);
    console.log(`Phone: ${phone}`);
    console.log(`Date: ${date}`);
    console.log(`Guests: ${guests}`);
    console.log(`Requirements: ${requirements || 'None'}`);
    console.log('------------------------------------------------------');

    return response.status(201).json({ message: 'Enquiry sent successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
