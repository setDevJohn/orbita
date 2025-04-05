import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

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
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      indent: ["error", 2, { SwitchCase: 1 }], // Usar 2 espaços
      quotes: ["error", "single"], // Usar aspas simples
      semi: ["error", "always"], // Sempre usar ponto e vírgula
      "block-spacing": ["error", "always"], // Espaço em branco dentro de blocos
      "object-curly-spacing": ["error", "always"], // Espaço dentro de chaves
      "no-console": ["warn"], // Avisar ao usar console.log
      curly: ["error", "all"], // Exigir chaves para todas as declarações de controle
      "consistent-return": "error", // Consistência em retornar valores em funções
      "no-alert": "error", // Proibir o uso de alertas
      eqeqeq: ["error", "always"], // Usar estritamente `===` e `!==`
      "react/prop-types": "off", // Você pode desligar isso se estiver usando TypeScript
      "react/jsx-boolean-value": ["error", "always"], // Exigir valores booleanos em JSX
      "react/jsx-sort-props": "warn", // Avisar sobre a ordem das props
      "react/jsx-no-duplicate-props": "error", // Proibir props duplicadas
    },
  }
);
