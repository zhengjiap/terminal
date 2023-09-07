module.exports = {
  // env指定代码的运行环境
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/vue3-recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  // rules字段定义了具体的Lint规则，这里只配置了一个规则prettier/prettier，用于报告违反Prettier规范的代码错误。
  rules: {
    "prettier/prettier": "error",
  },
};
