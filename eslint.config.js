// @ts-check
import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ts.configs.recommended,
  svelte.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig,
      },
    },
    rules: {
      // Resolve gets called in the getLocalizedPath utility
      "svelte/no-navigation-without-resolve": "off",
    },
  },
  {
    plugins: {
      // @ts-expect-error 'eslint-plugin-only-warn' does not provide type definitions
      onlyWarn,
    },
  },
  prettier,
  svelte.configs.prettier,
);
