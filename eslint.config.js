import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: eslintPluginImport,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "color-hex-case": "upper",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      indent: ["error", 2, { SwitchCase: 1 }], // Usar 2 espaços
      quotes: ["error", "single"], // Usar aspas simples
      semi: ["error", "always"], // Sempre usar ponto e vírgula
      "block-spacing": ["error", "always"], // Espaço em branco dentro de blocos
      "object-curly-spacing": ["error", "always"], // Espaço dentro de chaves
      curly: ["error", "all"], // Exigir chaves para todas as declarações de controle
      "no-alert": "error", // Proibir o uso de alertas
      eqeqeq: ["error", "always"], // Usar estritamente `===` e `!==`
      "react/prop-types": "off", // Você pode desligar isso se estiver usando TypeScript
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // ex: fs, path
            "external", // ex: react, lodash
            "internal", // ex: @app/*
            "parent", // ../
            "sibling", // ./
            "index", // index.ts
            "object", // imports de objetos (ex: import * as X)
            "type", // apenas tipos (TypeScript)
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1, // no máximo 1 linha vazia consecutiva
          maxEOF: 0, // nenhuma linha vazia no final do arquivo
          maxBOF: 0, // nenhuma linha vazia no início do arquivo
        },
      ],
    },
  }
);
