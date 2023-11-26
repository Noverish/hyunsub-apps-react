module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^(\\.|src).*(?<!css)$",
    "css",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,

  singleQuote: true,
  printWidth: 120,
}
