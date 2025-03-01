import { NextRequest, NextResponse } from 'next/server';
import { handleSanityWebhook } from '@/lib/sanity-webhook-handler';

export async function POST(req: NextRequest) {
  // Verify webhook secret to secure this endpoint
  const authHeader = req.headers.get('authorization');
  const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;
  
  if (authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  
  // Process the webhook
  const result = await handleSanityWebhook(req);
  
  return NextResponse.json(result);
} 