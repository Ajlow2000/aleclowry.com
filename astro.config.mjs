import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import { syntaxThemeLight, syntaxThemeDark } from "./src/utils/syntax-theme.ts";

export default defineConfig({
  output: "static",
  markdown: {
    shikiConfig: {
      themes: { light: syntaxThemeLight, dark: syntaxThemeDark },
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
