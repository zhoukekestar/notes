---
layout: post
title:  "Webpack Usage"
date:   2017-06-14
tags: [webpack, js]
commentIssueId: 19
---

* How to use webpack?
  * Simple Example.
  * Split CSS from bundle.
  * Split common module from bundle.
* How to write a simple webpack-plugin?

See more detail on [webapck-demo](https://github.com/zhoukekestar/drafts/tree/master/webpack-demo).

## Use Webpack

### Simple Example

#### entry.js
```js
require('./base.css');
console.log('entry.js');
require('./common.js');
```

#### webpack.config.js

```js
const webpack = require('webpack');

module.exports = {
  entry: './src/entry-2.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle-2-2.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
}
```

### split CSS from bundle

```js
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/entry-2.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle-2-4.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader'
        })
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle-2-4.css'),
  ]
}
```

### split common modules from bundle

```js
const webpack = require('webpack');
const path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './src/entry-3.js',
            vendor: 'moment'
        },
        output: {
            // filename: 'bundle-3.[name].[chunkhash].js',
            filename: 'bundle-3.[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // Specify the common bundle's name.
            })
        ]
    }
}
```

## How to write a simple webpack-plugin
```js
const webpack = require('webpack');
const path = require('path');
const ConcatSource = require("webpack-sources").ConcatSource;

class FooterPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const options = this.options;
    compiler.plugin('emit', function(compilation, callback) {

      Object.keys(compilation.assets).map(file => {
        compilation.assets[file] = new ConcatSource(compilation.assets[file], '\n', `//@ sourceURL=${file}`);
      });

      callback();
    });
  }
}

module.exports = function(env) {
    return {
        entry: './src/entry-4.js',
        output: {
            // filename: 'bundle-3.[name].[chunkhash].js',
            filename: 'bundle-4.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            }
          ],
        },
        plugins: [
          new FooterPlugin({})
        ]
    }
}

```
