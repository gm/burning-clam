import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.contacts.create({
      email,
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
