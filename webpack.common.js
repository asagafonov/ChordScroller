const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index'),
    background: path.join(__dirname, 'src', 'background', 'background'),
    content: path.join(__dirname, 'src', 'content', 'content'),
    popup: path.join(__dirname, 'src', 'popup', 'popup'),
  },
  module: {
    rules:
      [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
      ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/popup/popup.html'),
      filename: 'popup.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'manifest.json', to: 'manifest.json' },
      ],
    }),
  ],
};
