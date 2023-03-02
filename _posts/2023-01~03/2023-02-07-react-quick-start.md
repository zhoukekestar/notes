---
layout: post
title:  "React Quick Start"
date:  2023-02-07
tags: [note]
---

  React Quick Start.

# React Bundle

```sh
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

## Multiple Entry

```sh
$ npm install react-app-rewired --save-dev
$ npx react-app-rewired start
```

```js
// config-overrides.js
const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: 'src/entrya/entrya.js',
    omitHash: true,
    outPath: '/public/entrya.html'
  },
  {
    entry: 'src/entryb/entryb.js',
    omitHash: true,
    outPath: '/public/entryb.html'
  }
]);

module.exports = {
  webpack: function(config, env) {
    multipleEntry.addMultiEntry(config);
    config.output.filename = "static/js/[name].js";
    return config;
  }
};
```


## CSS in JS

  inline css / style into single js file

```js
// config-overrides.js
const styleLoader = require.resolve('style-loader');

module.exports = {
  webpack: function(config, env) {

    // 把 CSS 直接打包在 JS 中，避免使用的时候太麻烦，无需额外 link css
    // Bundle css into JS, No extrnal link element
    // https://github.com/facebook/react/blob/977bccd24de2b062d2c114e6cf160d2bd9ed9493/fixtures/flight/config/webpack.config.js#L114
    const oneOf = config.module.rules[1].oneOf;
    oneOf.forEach(item => {
      if (item?.use?.[0]?.loader?.indexOf('mini-css-extract-plugin') > -1) {
        item.use[0].loader = styleLoader;
      }
    });
    return config;
  }
};
```


# Vite

```sh
$ npm i vite -D
$ npx vite build
```


```js
// vite.config.js
const { defineConfig } = require('vite');

module.exports = defineConfig({
  server: {
    host: 'localhost',
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      },
    },
    target: 'es2015',
    // lib: {
    //   entry: './index.js',
    //   name: 'MyLib',
    //   formats: ["iife"],
    // },
    //speed up build
    // minify: false,
  },
});

```

### for IE11

```js
const { defineConfig } = require('vite');
const babel = require('vite-plugin-babel').default;

module.exports = defineConfig({
  plugins: [
    babel({
      babelConfig: {
        presets: ['@babel/preset-env'],
        targets: {
          ie: '11',
        },
      },
    }),
  ],
});
```

# Shell Tips

```sh
$ [ ! -d "not-exist" ] && echo "no"
$ [ -d "exist" ] && echo "yes"
$ [ ! -d \"$BUILD_DEST\" ] && mkdir $BUILD_DEST

# Mac can use rm -rf ./build/**/*.txt
# BUT Linux can only delete first level files
$ rm -rf ./build/static/js/*.LICENSE.txt
```


# For Def

```json
// abc.json
{
  "assets": {
    "type": "command",
    "command": {
      "cmd": [
        "tnpm install",
        "tnpm run build",
        // "mkdir $BUILD_DEST",
        "mv ./dist $BUILD_DEST"
      ]
    }
  }
}
```

ts 其实不用以下代码
```
const { defineConfig } = require('vite');
// const babel = require('vite-plugin-babel').default;
// const transform = require('vite-plugin-require-transform');
// const commonjs = require('vite-plugin-commonjs');

module.exports = defineConfig({
  server: {
    host: 'localhost',
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  plugins: [
    // commonjs(),
    // babel({
    //   babelConfig: {
    //     // 部分 JS 新语法兼容
    //     plugins: [
    //       // ['@babel/plugin-proposal-decorators', { legacy: true }]
    //     ],
    //     // presets: ['@babel/preset-env'],

    //     // 工作台大部分场景下，无需兼容 IE11，直接使用当前配置即可
    //     // 如果有特殊场景，需要兼容 IE11 的，使用以下插件即可
    //     // targets: {
    //     //   ie: '11',
    //     // },
    //   },
    // }),

    // transform({}),
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
    // target: 'es2015',
    lib: {
      entry: './src/index.ts',
      name: 'MyLib',
      formats: ['iife'],
    },
    // 本地测试的时候，可以先关闭压缩，加快构建速度
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
});

```

