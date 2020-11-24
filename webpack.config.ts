import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {join} from 'path';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import {Configuration, HotModuleReplacementPlugin} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

const extensions = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.json',
  '.css',
  '.scss',
  '.sass',
];

const config: Configuration & Required<Pick<Configuration, 'output' | 'plugins'>> = {
  context: __dirname,
  mode: 'development',
  entry: {
    index: {
      import: './src/index.tsx',
    },
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions,
    plugins: [new TsConfigPathsPlugin({extensions})],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: 'ts-loader',
        options: {transpileOnly: true},
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: __dirname,
    port: 8000,
    hot: true,
    historyApiFallback: true,
    overlay: true,
    stats: 'minimal',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
    }),
    new ForkTsCheckerWebpackPlugin({async: false}),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'public', to: ''},
      ],
    }),
  ],
};

switch (process.env.NODE_ENV) {
  case 'prod':
    config.mode = 'production';
    config.devtool = false;
    // config.devtool = 'source-map';
    break;

  case 'dev':
    config.plugins.push(
      new HotModuleReplacementPlugin(), //
    );
    break;

  default:
    if (null == process.env.NODE_ENV) {
      throw new Error('[NODE_ENV] Environment not defined');
    }

    throw new Error(`[NODE_ENV] Unknown environment "${process.env.NODE_ENV}"`);
}

if (process.env.ANALYZE === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin());
}

export default config;
