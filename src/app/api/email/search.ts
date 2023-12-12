import { ImapSimple } from 'imap-simple';

import { timeSinceLastMonth, timeSinceLastWeek } from '@/app/api/email/util';

// Method to search for unseen emails
export async function searchUnseenEmails(connection: ImapSimple) {
  const fetchOptions = {
    bodies: ['HEADER', 'TEXT'],
    markSeen: false,
    struct: true,
  };
  const searchCriteria = ['UNSEEN', timeSinceLastWeek()];
  const results = await connection.search(searchCriteria, fetchOptions);

  if (results.length === 0) {
    console.log('No unread emails.');
    return [];
  }

  return results;
} // Method to search for unseen emails

export async function searchAllEmails(connection: ImapSimple) {
  const fetchOptions = {
    bodies: ['HEADER', 'TEXT'],
    markSeen: false,
    struct: true,
  };
  const searchCriteria = ['ALL', timeSinceLastMonth()];
  const results = await connection.search(searchCriteria, fetchOptions);

  if (results.length === 0) {
    console.log('No unread emails.');
    return [];
  }

  return results;
}
