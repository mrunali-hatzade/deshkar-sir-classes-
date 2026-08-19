import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const subject = (formData.get('subject') as string || 'general').trim().toLowerCase();
    const className = (formData.get('class') as string || 'unknown').trim().toLowerCase();
    const year = (formData.get('year') as string || 'unknown').trim().toLowerCase();

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', subject, className, year);
    
    // Ensure upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ 
      message: 'File uploaded successfully', 
      path: `/uploads/${subject}/${className}/${year}/${file.name}` 
    });
  } catch (e: any) {
    console.error('Upload error:', e);
    return NextResponse.json({ error: e.message || 'Failed to save file' }, { status: 500 });
  }
}
