const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
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
          test: /\.pug$/,
          loader: 'pug-loader',
        },
      ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'manifest.json', to: 'manifest.json' },
      ],
    }),
  ],
};
