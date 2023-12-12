import { Message, MessageBodyPart } from 'imap-simple';

import {
  FilteredEmailsBySender,
  FilteredEmailsByTopic,
  FilterKeyWords,
  IGetCategorisedEmails,
} from '@/app/api/email/interfaces';
import { extractMessageId, readResultFromFile } from '@/app/api/email/util';

// Method to filter emails by topic
export function filterEmailsByTopic(
  results: Message[],
  keywords: FilterKeyWords[]
): FilteredEmailsByTopic {
  const filteredEmailsMap: FilteredEmailsByTopic = []; // Process each email

  for (const email of results) {
    const header = email.parts.find(
      (part: MessageBodyPart) => part.which === 'HEADER'
    );

    if (header && header.body.subject.length > 0) {
      const subject = header.body.subject[0];
      const from = header.body.from[0];
      const date = header.body.date[0];
      const body = email.parts.find(
        (part: MessageBodyPart) => part.which === 'TEXT'
      )?.body; // Check if the email matches any of the specified keywords
      const messageId = extractMessageId(header);

      for (const keyword of keywords) {
        const positiveMatches = keyword.positiveFilters.some(
          (filter) =>
            subject.toLowerCase().includes(filter.toLowerCase()) ||
            body?.toLowerCase().includes(filter.toLowerCase())
        );
        const negativeMatches = keyword.negativeFilters.some(
          (filter) =>
            subject.toLowerCase().includes(filter.toLowerCase()) ||
            body?.toLowerCase().includes(filter.toLowerCase())
        );

        if (positiveMatches && !negativeMatches) {
          // Add the email to the corresponding keyword list
          const existingCategory = filteredEmailsMap.find(
            (category) => category.topic === keyword.topic
          );

          if (existingCategory) {
            existingCategory.emails.push({
              id: messageId,
              subject,
              from,
              date,
              body,
            });
          } else {
            filteredEmailsMap.push({
              topic: keyword.topic,
              emails: [
                {
                  id: messageId,
                  subject,
                  from,
                  date,
                  body,
                },
              ],
            });
          }
        }
      }
    }
  }

  return filteredEmailsMap;
}

// Method to filter emails by sender
export function filterEmailsBySender(
  results: Message[]
): FilteredEmailsBySender {
  const filteredEmailsBySender: FilteredEmailsBySender = [];

  // Process each email
  for (const email of results) {
    const header = email.parts.find(
      (part: MessageBodyPart) => part.which === 'HEADER'
    );

    if (header && header.body.subject.length > 0) {
      const subject = header.body.subject[0];
      const from = header.body.from[0];
      const date = header.body.date[0];
      const body = email.parts.find(
        (part: MessageBodyPart) => part.which === 'TEXT'
      )?.body;

      // Add the email to the corresponding sender list
      const existingSender = filteredEmailsBySender.find(
        (sender) => sender.sender === from
      );

      if (existingSender) {
        existingSender.emails.push({
          id: extractMessageId(header),
          subject,
          from,
          date,
          body,
        });
      } else {
        filteredEmailsBySender.push({
          sender: from,
          emails: [
            {
              id: extractMessageId(header),
              subject,
              from,
              date,
              body,
            },
          ],
        });
      }
    }
  }

  return filteredEmailsBySender;
}

// Function to retrieve emails based on specific keywords
export async function getFilteredEmailsOffline(): Promise<IGetCategorisedEmails> {
  try {
    const readResult = await readResultFromFile();

    return readResult;
  } catch (error) {
    console.error('Error retrieving or processing emails:', error);
    throw new Error('Failed to retrieve and filter emails');
  }
}
