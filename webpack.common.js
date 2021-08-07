const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(__dirname, 'src', 'index'),
    background: path.join(__dirname, 'src', 'background', 'background'),
    content: path.join(__dirname, 'src', 'content', 'content'),
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
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        // { from: 'src/assets', to: 'assets' },
        { from: 'manifest.json', to: 'manifest.json' },
      ],
    }),
  ],
};
