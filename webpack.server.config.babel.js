import configBase from './webpack.base.config.babel';

/* global __dirname */

var fs = require('fs');
var path = require('path');

const cssModuleLoaderStr = 'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]';

const config = {
  ...configBase,

  entry: path.resolve(__dirname, 'server.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
    chunkFilename: '[name].[chunkhash:5].js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', cssModuleLoaderStr, 'postcss']
      }, {
        test: /\.scss$/,
        loaders: ['style', cssModuleLoaderStr, 'postcss', 'sass']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=5000&name=/[path][name].[hash:5].[ext]'
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      },
      {
        // This loader is needed for some packages, e.g. sanitize-html (and markdown-it?)
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};

export default config;
