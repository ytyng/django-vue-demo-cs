const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const backendTarget = 'http://127.0.0.1:8000';

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  context: path.resolve(__dirname, './src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.vue/,
        loader: 'vue-loader',
        options: {
          esModule: true
        }
      },
      {
        test: /\.html/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vuex$': 'vuex/dist/vuex.esm.js',
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    // make sure to include the plugin for the magic
    new VueLoaderPlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: '',
          to: '../dist/',
          ignore: [
            '!*.html'
          ]
        },
      ],
    ),
    // new WriteFilePlugin(),
  ],
  devServer: {
    contentBase: 'dist/',
    proxy: {
      // '/backend': {
      //   target: backendTarget,
      //   pathRewrite: {'^/backend': ''},
      // },
      '/static': {
        target: backendTarget,
      },
      '/admin': {
        target: backendTarget,
      },
      '/product': {
        target: backendTarget,
      },
    }
  }
};
