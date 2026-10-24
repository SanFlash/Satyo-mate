import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({ status: 'ok', app: 'autolearn-qa', timestamp: new Date().toISOString() });
}
