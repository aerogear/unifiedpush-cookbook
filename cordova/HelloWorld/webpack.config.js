const path = require('path');
  module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'www/js'),
      filename: 'index.js',
    },
    devtool: 'inline-source-map',
  };
