import { NextResponse } from 'next/server';

import { getFilteredEmailsOffline } from '@/app/api/email/filter';

export async function GET() {
  const result = await getFilteredEmailsOffline();
  return NextResponse.json(result);
}
