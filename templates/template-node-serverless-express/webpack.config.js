const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    app: './dist/index.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'build.js',
    libraryTarget: 'commonjs2',
  },
  optimization: {
    minimize: false,
  },
};
