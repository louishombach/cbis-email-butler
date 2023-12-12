import { NextRequest, NextResponse } from 'next/server';

import { readResultFromFile } from '@/app/api/email/util';

/**
 * GET function for /api/email/topic/[topicName]
 * @param request The request object
 * @param param1 The params object
 * @returns ITpoicAllEmails interface
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { topicName: string } }
) {
  const topicName = params.topicName;
  const filteredEmails = await readResultFromFile();

  const topicData = filteredEmails.byTopic.find(
    (topic) => topic.topic === topicName
  );

  if (!topicData) {
    return NextResponse.error();
  }

  return NextResponse.json({
    topic: topicData.topic,
    emails: topicData.emails,
  });
}
