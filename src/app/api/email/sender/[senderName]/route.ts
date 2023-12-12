import { NextRequest, NextResponse } from 'next/server';

import { ISenderAllEmails } from '@/app/api/email/interfaces';
import { readResultFromFile } from '@/app/api/email/util';

export async function GET(
  request: NextRequest,
  { params }: { params: { senderName: string } }
) {
  const senderName = params.senderName;
  const filteredEmails = await readResultFromFile();

  const senderData = filterSender(filteredEmails.bySender, senderName);

  if (senderData) {
    return NextResponse.json(senderData);
  } else {
    return NextResponse.error();
  }
}

function filterSender(
  senders: ISenderAllEmails[],
  senderName: string
): ISenderAllEmails | null {
  const filteredSender = senders.find((sender) => sender.sender === senderName);

  return filteredSender || null;
}
