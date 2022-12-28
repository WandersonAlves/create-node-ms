const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = env => {
  const lambdas = process.env.LAMBDA || '';

  if (!lambdas) {
    console.error('Missing lambda name. Please use as `LAMBDA=<lambda-name> yarn/npm build');
    process.exit(1);
  }

  const entryMultiple = {};
  const lambdasNames = lambdas.split(',');
  lambdasNames.forEach(v => {
    if (v === '') {
      return;
    }
    entryMultiple[v] = path.resolve(__dirname, `./dist/lambdas/${v}`);
  });

  const webpackConfig = {
    target: 'node',
    entry: {},
    resolve: {
      plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
      alias: {
        '@infra': path.resolve(__dirname, 'dist', 'infra'),
        '@mocks': path.resolve(__dirname, 'dist', 'mocks'),
        '@server': path.resolve(__dirname, 'dist', 'server'),
        '@shared': path.resolve(__dirname, 'dist', 'shared'),
        '@test': path.resolve(__dirname, 'dist', 'test'),
        '@utils': path.resolve(__dirname, 'dist', 'utils'),
        '@cases': path.resolve(__dirname, 'dist', 'cases'),
      },
    },
    externals: {
      'aws-sdk': 'aws-sdk',
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: `[name].js`,
      libraryTarget: 'commonjs2',
    },
    optimization: {
      minimize: true,
      removeAvailableModules: true,
      mangleExports: 'size',
      nodeEnv: false,
    },
  };

  if (Object.getOwnPropertyNames(entryMultiple).length > 0) {
    webpackConfig.entry = entryMultiple;
  }

  return webpackConfig;
};
