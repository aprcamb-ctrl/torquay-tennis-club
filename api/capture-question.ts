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

  const { question } = request.body;

  if (!question) {
    return response.status(400).json({ error: 'Missing question field' });
  }

  try {
    // 1. Log to Vercel console
    console.log('--- NEW UNANSWERED AI QUESTION ---');
    console.log(`Question: ${question}`);
    console.log('--------------------------------------------');

    // 2. Send email via Resend
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Torquay Tennis Club <onboarding@resend.dev>',
        to: 'aprcamb@googlemail.com',
        subject: `[AI Alert] Unanswered Question from Chatbot`,
        html: `
          <h2>Unanswered Dashboard Alert</h2>
          <p>A user asked the AI assistant a question that it could not answer using the current knowledge base. Please review this question and consider adding the exact answer to the <code>knowledge-base.json</code> file.</p>
          <hr />
          <p><strong>Question:</strong> ${question}</p>
          <hr />
          <p><em>This alert was generated automatically by the Torquay Tennis Club website AI assistant.</em></p>
        `
      });
    } else {
      console.warn('RESEND_API_KEY is not set. Email not sent.');
    }

    return response.status(201).json({ message: 'Question captured successfully' });
  } catch (error) {
    console.error('Capture error:', error);
    return response.status(500).json({ error: 'Internal server error' });
  }
}
