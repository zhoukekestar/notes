---
layout: post
title:  "Webapck Optimization by Google"
date:   2018-02-11
tags: [learning]
commentIssueId: 74
---



webpack 可能确实是太难用了,所以 社区也除了 parcel 这样的打包工具, 但 webpack 在大型项目中还拥有不可动摇的地位. 以下最佳实践来自 [Google](https://developers.google.com/web/fundamentals/performance/webpack/).



## 插件选项

### UglifyJS

> 压缩 js 代码

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
```

###  style-loader

> 因为 css 代码在引入后, 是一个字符串, uglifyjs 无法压缩, 所以, 需使用 css-loader 去进行压缩

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { minimize: true } },
        ],
      },
    ],
  },
};
```

### DefinePlugin

```js
 // webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
```

### 使用 ES-Modle 进行 Tree-Shaking

> TreeShaking 是通过 UglifyJs 进行的
>
> **Note:** In webpack, tree-shaking doesn’t work without a minifier. Webpack just removes export statements for exports that aren’t used; it’s the `UglifyJsPlugin` that removes unused code. Therefore, if you compile the bundle without the minifier, it won’t get smaller. 
>
> You aren’t required to use precisely this plugin though. Any minifier that supports dead code removal (e.g. [Babel Minify plugin](https://github.com/webpack-contrib/babel-minify-webpack-plugin) or [Google Closure Compiler plugin](https://github.com/roman01la/webpack-closure-compiler)) will do the trick.
>
> **Warning:** Don’t accidentally compile ES modules into CommonJS ones. 
>
> If you use Babel with `babel-preset-env` or `babel-preset-es2015`, check the settings of these presets. By default, they transpile ES’ `import` and `export` to CommonJS’ `require` and `module.exports`. [Pass the `{ modules: false }` option](https://github.com/babel/babel/tree/master/experimental/babel-preset-env)to disable this.

### 图片压缩

#### url loader

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
        },
      },
    ],
  }
};
```

#### svg-url-loader

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true,
        },
      },
    ],
  },
};
```

#### image-webpack-loader

```js
 // webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // This will apply the loader before the other ones
        enforce: 'pre',
      },
    ],
  },
};
```



###  ModuleConcatenationPlugin

> 将模块进行合并

```js
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
```

### externals

> 外部依赖通用框架

```js
// webpack.config.js
module.exports = {
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};
```

```js
// webpack.config.js
module.exports = {
  output: { libraryTarget: 'amd' },

  externals: {
    'react': { amd: '/libraries/react.min.js' },
    'react-dom': { amd: '/libraries/react-dom.min.js' },
  },
};
```



### HtmlWebpackPlugin

> 使用长缓存

```js
// webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.[chunkhash].js',
        // → bundle.8e0d62a03.js
  },
  plugins: [new HtmlWebpackPlugin()],
};
```



### CommonsChunkPlugin

> 将公共依赖区分打包

```js
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',

      minChunks: module => module.context &&
        module.context.includes('node_modules'),
    }),

    // This plugin must come after the vendor one (because webpack
    // includes runtime into the last chunk)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',

      // minChunks: Infinity means that no app modules
      // will be included into this chunk
      minChunks: Infinity,
    }),
  ],
};
```

> 将部分代码 inline 到页面

```js
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
      minChunks: Infinity,
      filename: 'runtime.js',
        // → Now the runtime file will be called
        // “runtime.js”, not “runtime.79f17c27b335abc7aaf4.js”
    }),
  ],
};
```



### Analyze Bundle

####  webpack-dashboard

```js
// webpack.config.js
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
  plugins: [
    new DashboardPlugin(),
  ],
};
```

###  webpack-bundle-analyzer

```js
// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
};
```



## References

* [Webpack Optimization by Google](https://developers.google.com/web/fundamentals/performance/webpack/)