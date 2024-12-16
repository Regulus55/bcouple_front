module.exports = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
        // source map 로딩을 비활성화
        exclude: /node_modules\/boxicons/,
      },
    ],
  },
}
