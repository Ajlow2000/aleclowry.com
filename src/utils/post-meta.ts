import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import { basename, join } from "node:path";

const LOWERCASE_WORDS = new Set([
  "a", "an", "the",
  "and", "but", "or", "for", "nor", "so", "yet",
  "at", "by", "in", "of", "on", "to", "up", "as",
]);

// Words that should always be fully uppercased regardless of position.
const ACRONYMS = new Set([
  "vpn",
  "api",
  "url",
  "html",
  "css",
  "js",
  "ts",
  "sdk",
  "cli",
  "ui",
  "ux",
  "rts",
]);

export function slugToTitle(slug: string): string {
  const words = slug.split("-").filter(Boolean);
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (ACRONYMS.has(lower)) return word.toUpperCase();
      const isFirst = i === 0;
      const isLast = i === words.length - 1;
      return isFirst || isLast || !LOWERCASE_WORDS.has(lower)
        ? word[0].toUpperCase() + word.slice(1)
        : word;
    })
    .join(" ");
}

/** Returns the post title: explicit frontmatter wins, otherwise derived from
 *  the filename slug with standard title-case rules applied. */
export function resolveTitle(post: {
  id: string;
  data: { title?: string };
}): string {
  if (post.data.title) return post.data.title;
  const slug = basename(post.id).replace(/\.[^.]+$/, "");
  return slugToTitle(slug);
}

function getGitDate(postId: string): Date {
  const filePath = join(process.cwd(), "src", "content", "writing", postId);
  try {
    const result = execSync(
      `git log --follow -1 --format="%cI" -- "${filePath}"`,
      { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }
    ).trim();
    if (result) return new Date(result);
  } catch {
    // git unavailable — fall through
  }
  try {
    return statSync(filePath).mtime;
  } catch {
    // truly nothing we can do — happy new year 1970
    return new Date(0);
  }
}

/** Returns the post date: explicit frontmatter wins, otherwise derived from
 *  the most recent git commit touching the file (falls back to mtime). */
export function resolveDate(post: {
  id: string;
  data: { date?: Date };
}): Date {
  return post.data.date ?? getGitDate(post.id);
}
