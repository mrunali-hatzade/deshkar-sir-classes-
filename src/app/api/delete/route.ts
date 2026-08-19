import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json();
    if (!filePath) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 });
    }

    // Prevent directory traversal attacks
    const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
    const absolutePath = path.join(process.cwd(), 'public', 'uploads', safePath);

    // Verify it is inside the uploads folder
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!absolutePath.startsWith(uploadsDir)) {
      return NextResponse.json({ error: 'Unauthorized path' }, { status: 403 });
    }

    // Check if file exists
    try {
      await fs.access(absolutePath);
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Delete file
    await fs.unlink(absolutePath);

    // Clean up empty directories recursively (optional but clean)
    let parentDir = path.dirname(absolutePath);
    while (parentDir !== uploadsDir) {
      const files = await fs.readdir(parentDir);
      if (files.length === 0) {
        await fs.rmdir(parentDir);
        parentDir = path.dirname(parentDir);
      } else {
        break;
      }
    }

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (e: any) {
    console.error('Delete error:', e);
    return NextResponse.json({ error: e.message || 'Failed to delete file' }, { status: 500 });
  }
}
