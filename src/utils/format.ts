export function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function formatDate(date: Date, month: "long" | "short" = "short"): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month, day: "numeric", timeZone: "UTC" });
}

/** Strip the file extension from a content entry id to get the URL slug. */
export function postSlug(id: string): string {
  return id.replace(/\.[^.]+$/, "");
}
