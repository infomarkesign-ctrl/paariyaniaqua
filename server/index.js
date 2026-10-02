import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'node:crypto';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const {
  PORT = 3001,
  SMTP_HOST = 'smtpout.secureserver.net',
  SMTP_PORT = 465,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
  DISPUTE_EMAIL,
  FAST2SMS_API_KEY,
  FAST2SMS_ROUTE = 'otp',
  AUTH_SECRET,
} = process.env;

if (!AUTH_SECRET) {
  console.error('AUTH_SECRET is not set. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 30 * 1000;
const MAX_ATTEMPTS = 5;
const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;

// identifier -> { hash, expiresAt, sentAt, attempts }
const otps = new Map();

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

function hashOtp(identifier, otp) {
  return crypto.createHmac('sha256', AUTH_SECRET).update(`${identifier}:${otp}`).digest('hex');
}

function normalize(channel, value) {
  const raw = String(value ?? '').trim();
  if (channel === 'email') {
    const email = raw.toLowerCase();
    return EMAIL_RE.test(email) ? email : null;
  }
  if (channel === 'phone') {
    const phone = raw.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
    return PHONE_RE.test(phone) ? phone : null;
  }
  return null;
}

function signToken(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', AUTH_SECRET).update(body).digest('base64url');
  return `${body}.${sig}`;
}

function verifyToken(token) {
  const [body, sig] = String(token ?? '').split('.');
  if (!body || !sig) return null;
  const expected = crypto.createHmac('sha256', AUTH_SECRET).update(body).digest('base64url');
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return null;
  }
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString());
  return payload.exp > Date.now() ? payload : null;
}

async function sendEmailOtp(email, otp) {
  await transporter.sendMail({
    from: MAIL_FROM || SMTP_USER,
    to: email,
    subject: `${otp} is your Pariyani Aqua Pearl login code`,
    text: `Your Pariyani Aqua Pearl login OTP is ${otp}. It is valid for 5 minutes. Do not share it with anyone.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
        <h2 style="color:#0f2a44;margin:0 0 12px">Pariyani Aqua Pearl</h2>
        <p style="color:#333">Use the code below to sign in:</p>
        <p style="font-size:32px;letter-spacing:8px;font-weight:bold;color:#0d9488;margin:16px 0">${otp}</p>
        <p style="color:#666;font-size:13px">This code is valid for 5 minutes. Do not share it with anyone.</p>
      </div>`,
  });
}

async function sendSmsOtp(phone, otp) {
  const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
    method: 'POST',
    headers: {
      authorization: FAST2SMS_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      route: 'q',
      numbers: phone,
      message: `Your Pariyani Aqua Pearl login OTP is ${otp}. Valid for 5 minutes.`,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.return) {
    const errorMsg = Array.isArray(data.message) ? data.message[0] : data.message;
    throw new Error(`Fast2SMS: ${errorMsg || res.status}`);
  }
}

const app = express();
app.use(express.json());

// Enable CORS for frontend dev server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post('/api/auth/send-otp', async (req, res) => {
  const { channel } = req.body ?? {};
  const identifier = normalize(channel, req.body?.identifier);
  if (!identifier) {
    return res.status(400).json({
      error: channel === 'phone' ? 'Enter a valid 10-digit mobile number.' : 'Enter a valid email address.',
    });
  }

  const key = `${channel}:${identifier}`;
  const existing = otps.get(key);
  if (existing && Date.now() - existing.sentAt < RESEND_COOLDOWN_MS) {
    const wait = Math.ceil((RESEND_COOLDOWN_MS - (Date.now() - existing.sentAt)) / 1000);
    return res.status(429).json({ error: `Please wait ${wait}s before requesting another OTP.` });
  }

  const otp = crypto.randomInt(100000, 1000000).toString();

  try {
    if (channel === 'email') await sendEmailOtp(identifier, otp);
    else await sendSmsOtp(identifier, otp);
    console.log(`[otp] sent successfully to ${key}`);
  } catch (err) {
    console.error(`[otp] send failed for ${key}:`, err.message);
    return res.status(502).json({ error: 'Could not send OTP right now. Please try again shortly.' });
  }

  otps.set(key, { hash: hashOtp(key, otp), expiresAt: Date.now() + OTP_TTL_MS, sentAt: Date.now(), attempts: 0 });
  res.json({ ok: true, expiresIn: OTP_TTL_MS / 1000, resendIn: RESEND_COOLDOWN_MS / 1000 });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { channel, otp } = req.body ?? {};
  const identifier = normalize(channel, req.body?.identifier);
  const key = `${channel}:${identifier}`;
  const record = identifier && otps.get(key);

  if (!record || record.expiresAt < Date.now()) {
    otps.delete(key);
    return res.status(400).json({ error: 'OTP expired. Please request a new one.' });
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    otps.delete(key);
    return res.status(429).json({ error: 'Too many attempts. Please request a new OTP.' });
  }
  record.attempts += 1;

  const given = hashOtp(key, String(otp ?? '').trim());
  if (!crypto.timingSafeEqual(Buffer.from(given), Buffer.from(record.hash))) {
    return res.status(400).json({ error: `Incorrect OTP. ${MAX_ATTEMPTS - record.attempts} attempts left.` });
  }

  otps.delete(key);
  const user = { channel, identifier };
  const token = signToken({ ...user, exp: Date.now() + TOKEN_TTL_MS });
  res.json({ token, user });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.replace(/^Bearer /, '');
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Not signed in.' });
  res.json({ user: { channel: payload.channel, identifier: payload.identifier } });
});

app.get('/api/contact-info', (req, res) => {
  res.json({
    support: SMTP_USER,
    dispute: DISPUTE_EMAIL,
  });
});

app.post('/api/contact/dispute', async (req, res) => {
  const { email, subject, message } = req.body ?? {};

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Email, subject, and message are required.' });
  }

  if (!DISPUTE_EMAIL) {
    return res.status(503).json({ error: 'Dispute email service is not configured.' });
  }

  try {
    await transporter.sendMail({
      from: MAIL_FROM || SMTP_USER,
      to: DISPUTE_EMAIL,
      replyTo: email,
      subject: `[DISPUTE] ${subject}`,
      text: `Customer Email: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
          <h2 style="color:#0f2a44;margin:0 0 12px">Dispute Report</h2>
          <p style="color:#666;font-size:13px"><strong>From:</strong> ${email}</p>
          <p style="color:#666;font-size:13px"><strong>Subject:</strong> ${subject}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
          <p style="color:#333;white-space:pre-wrap">${message}</p>
        </div>`,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('[dispute] send failed:', err.message);
    res.status(502).json({ error: 'Could not submit dispute. Please try again later.' });
  }
});

// Clean up expired OTPs
setInterval(() => {
  const now = Date.now();
  for (const [key, rec] of otps) if (rec.expiresAt < now) otps.delete(key);
}, 60 * 1000).unref();

// Serve the built frontend in production
const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^(?!\/api\/).*/, (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
  transporter.verify().then(
    () => console.log('[smtp] connected'),
    (err) => console.error('[smtp] connection failed:', err.message),
  );
});
