import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json();
    if (!imageData) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    // Extract base64 content
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const destPath = path.join(process.cwd(), 'public', 'images', 'teacher_deshkar.png');
    await fs.writeFile(destPath, buffer);

    return NextResponse.json({ message: 'Cropped image saved successfully' });
  } catch (e: any) {
    console.error('Save cropped image error:', e);
    return NextResponse.json({ error: e.message || 'Failed to save cropped image' }, { status: 500 });
  }
}
