const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = env => {
  const lambdaName = process.env.LAMBDA;

  if (!lambdaName) {
    console.error('Missing lambda name. Please use as `LAMBDA=<lambda-name> yarn/npm build');
    process.exit(1);
  }

  return {
    target: 'node',
    entry: {
      app: path.resolve(__dirname, `./dist/lambdas/${lambdaName}`),
    },
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
      filename: `${lambdaName}.js`,
      libraryTarget: 'commonjs2',
    },
    optimization: {
      minimize: true,
      removeAvailableModules: true,
      mangleExports: 'size',
      nodeEnv: false,
    },
  };
};
