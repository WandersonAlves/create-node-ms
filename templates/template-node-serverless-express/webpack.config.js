const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  target: 'node',
  entry: {
    app: './dist/index.js',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    alias: {
      '@infra': path.resolve(__dirname, 'dist', 'infra'),
      '@mocks': path.resolve(__dirname, 'dist', 'mocks'),
      '@modules': path.resolve(__dirname, 'dist', 'modules'),
      '@server': path.resolve(__dirname, 'dist', 'server'),
      '@shared': path.resolve(__dirname, 'dist', 'shared'),
      '@test': path.resolve(__dirname, 'dist', 'test'),
      '@utils': path.resolve(__dirname, 'dist', 'utils'),
    },
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'build.js',
    libraryTarget: 'commonjs2',
  },
  optimization: {
    minimize: true,
    removeAvailableModules: true,
    mangleExports: 'size',
    nodeEnv: false,
  },
};
