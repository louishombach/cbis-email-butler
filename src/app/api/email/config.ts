import { ImapSimpleOptions } from 'imap-simple';

const gmailEmail = process.env.GMAIL_EMAIL;
const gmailAppPassword = process.env.GMAIL_APP_PSWD;

if (!gmailEmail || !gmailAppPassword) {
  throw new Error('Gmail credentials not found, check you .env file');
}

const email = gmailEmail;
const password = gmailAppPassword;

// IMAP configuration
const config: ImapSimpleOptions = {
  imap: {
    user: email,
    password: password,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
  },
};

export default config;
