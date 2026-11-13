import { existsSync } from "node:fs";
import { join } from "node:path";

const extensions = ["jpg", "jpeg", "png", "webp"];

/**
 * Finds a founder portrait in /public/team/<slug>.(jpg|jpeg|png|webp).
 * Drop the photo in with that name and it appears everywhere — no code change.
 * Server-only (reads the filesystem); returns null when there is no file yet.
 */
export function portraitFor(slug: string): string | null {
  for (const ext of extensions) {
    if (existsSync(join(process.cwd(), "public", "team", `${slug}.${ext}`))) {
      return `/team/${slug}.${ext}`;
    }
  }
  return null;
}
