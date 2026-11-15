import { NextResponse } from 'next/server';

export const revalidate = 300;

const DRIVE_FOLDER_ID = '1JylhFuqaiwM2-OnynK3eK4FGPPXv4MbW';

export interface DrivePosterEntry {
  id: string;
  name: string;
  imageUrl: string;
  fallbackImageUrl: string;
  driveUrl: string;
}

/**
 * Fetches live file entries from the public Blossoms 2026-27 Drive posters folder
 * so newly uploaded posters appear automatically without manual redeploys.
 */
export async function GET() {
  try {
    const folderViewUrl = `https://drive.google.com/embeddedfolderview?id=${DRIVE_FOLDER_ID}#list`;
    const res = await fetch(folderViewUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return NextResponse.json({ posters: [] }, { status: 200 });
    }

    const html = await res.text();
    const posters: DrivePosterEntry[] = [];
    const entryRegex = /id="entry-([A-Za-z0-9_-]+)"[\s\S]*?class="flip-entry-title">(.*?)<\/div>/g;

    let match: RegExpExecArray | null = entryRegex.exec(html);
    while (match !== null) {
      const id = match[1].trim();
      const name = match[2].trim();
      posters.push({
        id,
        name,
        imageUrl: `https://lh3.googleusercontent.com/d/${id}=w1200`,
        fallbackImageUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w1200`,
        driveUrl: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
      });
      match = entryRegex.exec(html);
    }

    return NextResponse.json({ posters }, { status: 200 });
  } catch {
    return NextResponse.json({ posters: [] }, { status: 200 });
  }
}
