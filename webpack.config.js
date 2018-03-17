const path = require('path');
module.exports = {
  entry: './build/pretty-json-min.js',
  output: {
    libraryTarget: "umd",
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  }
};