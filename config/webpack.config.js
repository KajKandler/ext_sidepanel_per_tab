'use strict';

const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');
const PATHS = require('./paths');

// Merge webpack configuration files
const config = (env, argv) =>
  merge(common, {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      })
    ],
    entry: {
      sidepanel: PATHS.src + '/sidepanel.js',
      background: PATHS.src + '/background.js',
      fetch_data: PATHS.src + '/fetch_data.js',
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
  });

module.exports = config;
