module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: [], // source-map-loader 제거
        exclude: /node_modules\/boxicons/, // boxicons 폴더 제외
      },
    ],
  },
}
