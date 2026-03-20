import express from 'express';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Initialize database
const db = new Database('subscribers.db');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS clubhouse_bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    guests INTEGER NOT NULL,
    requirements TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const stmt = db.prepare('INSERT INTO subscribers (email) VALUES (?)');
    stmt.run(email);
    console.log(`New subscriber: ${email}`);
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error: any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ error: 'Email already subscribed' });
    }
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/book-clubhouse', (req, res) => {
  const { name, email, phone, date, guests, requirements } = req.body;

  if (!name || !email || !phone || !date || !guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO clubhouse_bookings (name, email, phone, date, guests, requirements)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(name, email, phone, date, Number(guests), requirements);
    
    console.log('--- NEW CLUBHOUSE BOOKING ENQUIRY ---');
    console.log(`To: chairman@torquaytennisclub.co.uk`);
    console.log(`From: ${name} (${email})`);
    console.log(`Phone: ${phone}`);
    console.log(`Date: ${date}`);
    console.log(`Guests: ${guests}`);
    console.log(`Requirements: ${requirements || 'None'}`);
    console.log('------------------------------------');

    res.status(201).json({ message: 'Enquiry sent successfully' });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Newsletter server running at http://localhost:${port}`);
});
