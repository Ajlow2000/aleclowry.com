import { getCollection } from "astro:content";
import { resolveDate, resolveTitle } from "./post-meta";

type CollectionFilter = Parameters<typeof getCollection<"writing">>[1];

/** Drop-in replacement for `getCollection("writing")` that bakes in
 *  `resolvedTitle` and `resolvedDate` so callers never need to call the
 *  resolve helpers directly. */
export async function getPosts(filter?: CollectionFilter) {
  const posts = await getCollection("writing", filter);
  return posts.map((post) => ({
    ...post,
    resolvedTitle: resolveTitle(post),
    resolvedDate: resolveDate(post),
  }));
}

export type ResolvedPost = Awaited<ReturnType<typeof getPosts>>[number];
