// Import necessary modules and components
import { NextRequest, NextResponse } from 'next/server';

import { readResultFromFile } from '@/app/api/email/util';

// GET function for /api/email/[emailId]
export async function GET(
  request: NextRequest,
  { params }: { params: { emailId: string } }
) {
  const emailId = params.emailId;
  const filteredEmails = await readResultFromFile();

  // Find the email with the specified emailId in the filteredEmails
  const foundEmail = findEmailById(filteredEmails, emailId);

  if (foundEmail) {
    return NextResponse.json(foundEmail);
  } else {
    return NextResponse.error();
  }
}

// Helper function to find an email by its id
function findEmailById(filteredEmails: any, emailId: string) {
  for (const category of filteredEmails.byTopic) {
    for (const email of category.emails) {
      if (email.id === emailId) {
        return email;
      }
    }
  }

  for (const sender of filteredEmails.bySender) {
    for (const email of sender.emails) {
      if (email.id === emailId) {
        return email;
      }
    }
  }

  return null;
}
