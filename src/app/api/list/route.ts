import { promises as fs } from 'fs';
import path from 'path';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  async function walk(dir: string): Promise<string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map(async (dirent): Promise<string[]> => {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) return await walk(res);
        // Return relative path from public folder
        return [path.relative(uploadsDir, res).replace(/\\/g, '/')];
      })
    );
    return files.flat();
  }
  try {
    try {
      await fs.access(uploadsDir);
    } catch {
      return new Response(JSON.stringify({ files: [] }));
    }
    const fileList = await walk(uploadsDir);
    // Flatten array structure (walk recursively returns nested arrays)
    const flatList = fileList.flat(Infinity);
    return new Response(JSON.stringify({ files: flatList }));
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Failed to list files' }), { status: 500 });
  }
}
