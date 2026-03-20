import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = request.body;

  if (!email || !email.includes('@')) {
    return response.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // NOTE: SQLite (better-sqlite3) is omitted here because it's not compatible with Vercel's ephemeral filesystem.
    // In a production environment, you should use a remote database (e.g. Supabase, Neon) or a service like Mailchimp.

    console.log(`New subscriber (Vercel Function): ${email}`);

    return response.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
