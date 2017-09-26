var path    = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  [
    './client'
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    publicPath: "/assets/",
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['node_modules', 'shared'],
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: 'inline-source-map'
};
