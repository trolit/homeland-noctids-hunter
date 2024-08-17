import eslintPluginVue from "eslint-plugin-vue";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  ...eslintPluginVue.configs["flat/strongly-recommended"],
  eslintConfigPrettier,
  {
    files: ["src/**/*.{ts,vue}"],

    rules: {},
  },
];
