import Connection from 'imap';
import { connect, ImapSimpleOptions } from 'imap-simple';
import { NextResponse } from 'next/server';

const gmailEmail = process.env.GMAIL_EMAIL;
const gmailAppPassword = process.env.GMAIL_APP_PSWD;

export async function GET() {
  try {
    const latestEmail = await getLatestEmail();
    console.log('SUCCESS ----------------------');
    console.log('Latest Email:', latestEmail);
    return NextResponse.json(latestEmail);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error();
  }
}

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

async function getLatestEmail() {
  return connect(config)
    .then(async function (connection) {
      return connection.openBox('INBOX').then(async function () {
        const fetchOptions: Connection.FetchOptions = {
          bodies: ['HEADER', 'TEXT'],
          markSeen: false,
          struct: true,
        };

        const searchCriteria = ['UNSEEN', timeSinceLastWeek()];

        const results = await connection.search(searchCriteria, fetchOptions);
        if (results.length === 0) {
          return null; // No unread emails
        }

        const latestEmail = results[0];
        if (!latestEmail) {
          return null; // Handle the case where latestEmail is undefined
        }

        const Header = latestEmail.parts.find(
          (part) => part.which === 'HEADER'
        );

        if (!Header) {
          return null;
        }

        if (Header.body.subject.length > 0) {
          const subject = Header.body?.subject[0];
          const from = Header.body?.from[0];
          const date = Header.body?.date[0];

          const body = latestEmail.parts.find(
            (part) => part.which === 'TEXT'
          )?.body;

          const formattedEmail = {
            subject,
            from,
            date,
            body,
          };

          return formattedEmail;
        }
      });
    })
    .catch(function (err) {
      console.log(err);
      throw new Error('Failed to retrieve emails');
    });
}

function timeSinceLastMonth() {
  const delay = 24 * 3600 * 1000 * 30;
  let lastMonth: string | Date = new Date();
  lastMonth.setTime(Date.now() - delay);
  lastMonth = lastMonth.toISOString();
  return ['SINCE', lastMonth];
}

function timeSinceLastWeek() {
  const delay = 24 * 3600 * 1000 * 7;
  let lastWeek: string | Date = new Date();
  lastWeek.setTime(Date.now() - delay);
  lastWeek = lastWeek.toISOString();
  return ['SINCE', lastWeek];
}

export async function handleEmails() {
  return connect(config)
    .then(function (connection) {
      return connection.openBox('INBOX').then(function () {
        const delay = 24 * 3600 * 1000 * 30;
        let lastMonth: string | Date = new Date();
        lastMonth.setTime(Date.now() - delay);
        lastMonth = lastMonth.toISOString();
        const searchCriteria = ['UNSEEN', timeSinceLastMonth()];

        const fetchOptions = {
          bodies: ['HEADER', 'TEXT'],
          markSeen: false,
        };

        return connection
          .search(searchCriteria, fetchOptions)
          .then(function (results) {
            const from = results.map(function (res) {
              return res.parts.filter(function (part) {
                return part.which === 'HEADER';
              })[0].body.from[0];
            });

            //console.log(subjects);
            return from;
            // =>
            //   [ 'Hey Chad, long time no see!',
            //     'Your amazon.com monthly statement',
            //     'Hacker Newsletter Issue #445' ]
          });
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}
