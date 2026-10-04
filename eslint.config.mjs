export default [
  {
    ignores: ["node_modules/**", "coverage/**", ".terraform/**"]
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs"
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
  }
];
