import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { SYNTAX_THEMES } from "./src/config.ts";

export default defineConfig({
  output: "static",
  markdown: {
    shikiConfig: {
      themes: SYNTAX_THEMES,
      transformers: [
        {
          name: "code-filename",
          root(root) {
            const meta = this.options?.meta?.__raw ?? "";
            const match = meta.match(/filename="([^"]+)"/);
            if (!match) return;
            root.children = [
              {
                type: "element",
                tagName: "div",
                properties: { class: "code-with-filename" },
                children: [
                  {
                    type: "element",
                    tagName: "div",
                    properties: { class: "code-filename" },
                    children: [{ type: "text", value: match[1] }],
                  },
                  ...root.children,
                ],
              },
            ];
          },
        },
      ],
    },
  },
  integrations: [mdx()],
});
