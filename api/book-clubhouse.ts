import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    // 1. Log to Vercel console as backup
    console.log('--- NEW CLUBHOUSE BOOKING ENQUIRY (Resend) ---');
    console.log(`From: ${name} (${email})`);
    console.log(`Phone: ${phone}`);
    console.log(`Date: ${date}`);
    console.log(`Guests: ${guests}`);
    console.log(`Requirements: ${requirements || 'None'}`);
    console.log('--------------------------------------------');

    // 2. Send email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Torquay Tennis Club <onboarding@resend.dev>',
        to: 'chairman@torquaytennisclub.co.uk',
        subject: `New Clubhouse Booking Enquiry - ${name}`,
        reply_to: email,
        html: `
          <h2>New Clubhouse Booking Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Date of Event:</strong> ${date}</p>
          <p><strong>Number of Guests:</strong> ${guests}</p>
          <p><strong>Special Requirements:</strong></p>
          <p>${requirements || 'None'}</p>
          <hr />
          <p><em>This enquiry was sent from the Torquay Tennis Club website.</em></p>
        `
      });
    } else {
      console.warn('RESEND_API_KEY is not set. Email not sent.');
    }

    return response.status(201).json({ message: 'Enquiry sent successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
