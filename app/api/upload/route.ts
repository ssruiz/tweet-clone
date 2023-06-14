import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/utils';

type Data = {
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    const secure_url = await uploadImage(request);
    return NextResponse.json({ fileUrl: secure_url });
  } catch (e) {
    console.log('e', e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
