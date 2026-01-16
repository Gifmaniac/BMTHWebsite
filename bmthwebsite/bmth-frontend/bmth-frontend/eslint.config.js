import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/cypress.config.ts",
      "**/src/context/store/**",
      "**/src/services/api/helper.ts",
      "**/src/pages/Admin/Inventory/shared/useInventorySelection.ts",
      "**/src/pages/Store/Shopdetail/ShirtDetail.tsx",
      "**/src/pages/Store/cart/Cart.tsx",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "error",
    },
  },
];