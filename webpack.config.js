module.exports = {
  entry: {
    background: "./src/background.js"
  },
  output: {
    path: "extension",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  }
};
