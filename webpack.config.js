var webpack = require("webpack");

module.exports = {
  entry: [
    './client2/src/index.js'
  ],
  output: {
    path: __dirname + '/client2/',
    publicPath: '/',
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }],
  //   postLoaders: [
  //   { loader: "transform?brfs" }
  //   ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './client2'
  },
};
