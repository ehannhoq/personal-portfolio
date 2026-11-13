import { getWorkshopItem } from '@/lib/steam-workshop';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing Workshop ID' },
        { status: 400 }
      );
    }
    
    const data = await getWorkshopItem(id);
    return NextResponse.json(data);

  } catch (error) {
    console.error('Steam API error:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}