import * as fs from 'fs';
import { connect, MessageBodyPart } from 'imap-simple';

import config from '@/app/api/email/config';
import { IGetCategorisedEmails } from '@/app/api/email/interfaces';

export function timeSinceLastMonth() {
  const delay = 24 * 3600 * 1000 * 30;
  let lastMonth: string | Date = new Date();
  lastMonth.setTime(Date.now() - delay);
  lastMonth = lastMonth.toISOString();
  return ['SINCE', lastMonth];
}

export function timeSinceLastWeek() {
  const delay = 24 * 3600 * 1000 * 7;
  let lastWeek: string | Date = new Date();
  lastWeek.setTime(Date.now() - delay);
  lastWeek = lastWeek.toISOString();
  return ['SINCE', lastWeek];
}

// Method to connect to the IMAP server
export async function connectToImap() {
  const connection = await connect(config);
  await connection.openBox('INBOX');
  return connection;
}

// Method to save the result to a file
export function saveResultToFile(result: IGetCategorisedEmails) {
  const resultJson = JSON.stringify(result, null, 2);
  fs.writeFileSync('filteredEmails.json', resultJson);
}

// Method to read the JSON file and return the parsed object
export async function readResultFromFile(): Promise<IGetCategorisedEmails> {
  try {
    const fileContent = fs.readFileSync('filteredEmails.json', 'utf-8');
    const parsedResult = JSON.parse(fileContent) as IGetCategorisedEmails;
    return parsedResult;
  } catch (error) {
    console.error('Error reading the file:', error);
    throw new Error('Failed to read the file');
  }
}

// Method to extract the "message-id" from the email headers
export function extractMessageId(header: MessageBodyPart): string {
  const messageIdMatch = header.body['message-id']?.[0].match(/<([^>]+)>/);

  return messageIdMatch ? messageIdMatch[1] : '';
}
