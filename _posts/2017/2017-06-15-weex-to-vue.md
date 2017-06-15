---
layout: post
title:  "Weex2Vue Tools"
date:   2017-06-15
tags: [weex, vue]
commentIssueId: 20
---

* Weex2Vue Tools
  * Webpack config file for weex2vue.
    * Optimize offcial webpack config. Add virtual file for vue entries. (优化官方webpack配置，使用虚拟文件作为vue-entry。)
    * FooterPlugin for debuging js code. (给JS源文件添加调试注释)
  * px-loader for weex css. (给weex文件的无单位数字添加px)
  * weex2vue: transform weex files to vue files. (批量转换weex文件为vue文件)


### webpack.vue.config.js

```js
const path = require('path');
const fs = require('fs');
const VirtualModulePlugin = require('virtual-module-webpack-plugin');

/* 添加 @sourceURL 方便动态脚本的调试 */
const FooterPlugin = require('./libs/FooterPlugin.js');

const entry = {};
const EXTNAME = '.vue';
const plugins = [new FooterPlugin()];

/*
 * 遍历所有后缀为 EXTNAME 的文件
 */
const walk = (dir, root) => {
  const directory = path.join(__dirname, root, dir);
  fs.readdirSync(directory).forEach((file) => {
    const fullpath = path.join(directory, file);
    const stat = fs.statSync(fullpath);

    if (stat.isFile() && path.extname(fullpath) === EXTNAME) {
      const name = path.join(dir, path.basename(file, EXTNAME));

      // console.log(name, file, fullpath)
      // entry[name] = `${fullpath}?entry=true`;

      // 加载一个虚拟的 entry.js 文件
      entry[`${name}`] = `${name}.js`;

      // 设置虚拟 entry.js 文件的内容，初始化 Vue
      plugins.push(new VirtualModulePlugin({
        moduleName: `./src-www/${name}.js`,
        contents: `
          var App = require('./${file}');
          App.el = '#root';
          new Vue(App);
        `,
      }));
    } else if (stat.isDirectory()) {
      const subdir = path.join(dir, file);
      walk(subdir, root);
    }
  });
};

walk('./', 'src-www');

module.exports = {
  entry,
  output: {
    path: `${__dirname}/dist-www`,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  chrome: 52,
                  browsers: ['ie >= 8'],
                },
              }],
            ],
            plugins: [
              ['transform-runtime', {
                polyfill: false,
                regenerator: true,
              }],
            ],
          },
        },
      }, {
        test: /\.vue$/,
        // 修复 weex 文件中，不带 px 的 bug
        use: ['vue-loader', './libs/px-loader.js'],
      },
    ],
  },
  plugins,
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'src-www'),
      'node_modules',
    ],
  },
};
```

### px-loader

```js
module.exports = function (source) {
  this.cacheable && this.cacheable();
  source = source
    .replace(/height: (\d*);/g, 'height: $1px;')
    .replace(/width: (\d*);/g, 'width: $1px;')
    .replace(/top: (\d*);/g, 'top: $1px;')
    .replace(/bottom: (\d*);/g, 'bottom: $1px;')
    .replace(/left: (\d*);/g, 'left: $1px;')
    .replace(/right: (\d*);/g, 'right: $1px;')
    .replace(/margin-top: (\d*);/g, 'margin-top: $1px;')
    .replace(/margin-bottom: (\d*);/g, 'margin-bottom: $1px;')
    .replace(/margin-left: (\d*);/g, 'margin-left: $1px;')
    .replace(/margin-right: (\d*);/g, 'margin-right: $1px;')
    .replace(/padding-top: (\d*);/g, 'padding-top: $1px;')
    .replace(/padding-bottom: (\d*);/g, 'padding-bottom: $1px;')
    .replace(/padding-left: (\d*);/g, 'padding-left: $1px;')
    .replace(/padding-right: (\d*);/g, 'padding-right: $1px;')
    .replace(/line-height: (\d*);/g, 'line-height: $1px;')
    .replace(/font-size: (\d*);/g, 'font-size: $1px;')
  return source;
}

```


### weex2vue

```js
const fs = require('fs');
const path = require('path');

/**
 * 遍历文件夹
 */
const walkSync = (dir, files = []) => {
  fs.readdirSync(dir).map((file) => {
    fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), files)
      : files.push({
        name: file,
        path: path.join(dir, file),
      });
  });
  return files;
};

/*
 * 转换单位
 */
const addPx = c => c
  .replace(/height: (\d*);/g, 'height: $1px;')
  .replace(/width: (\d*);/g, 'width: $1px;')
  .replace(/top: (\d*);/g, 'top: $1px;')
  .replace(/bottom: (\d*);/g, 'bottom: $1px;')
  .replace(/left: (\d*);/g, 'left: $1px;')
  .replace(/right: (\d*);/g, 'right: $1px;')
  .replace(/margin-top: (\d*);/g, 'margin-top: $1px;')
  .replace(/margin-bottom: (\d*);/g, 'margin-bottom: $1px;')
  .replace(/margin-left: (\d*);/g, 'margin-left: $1px;')
  .replace(/margin-right: (\d*);/g, 'margin-right: $1px;')
  .replace(/padding-top: (\d*);/g, 'padding-top: $1px;')
  .replace(/padding-bottom: (\d*);/g, 'padding-bottom: $1px;')
  .replace(/padding-left: (\d*);/g, 'padding-left: $1px;')
  .replace(/padding-right: (\d*);/g, 'padding-right: $1px;')
  .replace(/line-height: (\d*);/g, 'line-height: $1px;')
  .replace(/font-size: (\d*);/g, 'font-size: $1px;')

/*
 * 转换表达式
 */
const expression = c => c
  .replace(/if=['"]{{(.*?)}}['"]/g, 'v-if="$1"') // v-if
  .replace(/repeat=['"]{{(.*?)}}['"]/g, 'v-for="$1"') // v-for
  .replace(/onclick=/g, '@click=') // @click
  .replace(/\s(\S*?)=['"]{{(\S*?)}}['"]/g, ':$1="$2"') // 属性绑定
  .replace(/require\(['"](.*?)\.we['"]\)/g, 'require("$1.vue")') // 引用文件转换

/**
 * 标签转换
 */
const transformTag = c => c
  .replace(/<style>/, '<style scoped>');

/**
 * data: {} to data() {{}}
 *
 * module.exports = {
 *   data: {
 *     a: {}
 *   }
 * }
 *
 * 转换成函数方式
 *
 * module.exports = {
 *   data() { return {
 *     a: {}
 *   }},
 * }
 */
const transformData = (c) => {
  let i = c.indexOf('module.exports');
  let dataChanged = false;
  if (i !== -1) {
    const flags = [];
    for (; i < c.length; i += 1) {
      if (c.substr(i, 5) === 'data:' && flags.length === 1) {
        c = c.replace(new RegExp(`([\\s\\S]{${i}})(.{5})`), '$1data() { return ');
        dataChanged = true;
      } else if (dataChanged && flags.length === 3 && c[i] === '}') {
        c = c.replace(new RegExp(`([\\s\\S]{${i}})([},]{1,2})`), '$1}},');
        break;
      }

      if (c[i] === '{') {
        flags.push('{');
      } else if (c[i] === '}') {
        flags.shift();
      }
    }
  }
  return c;
};


walkSync(path.join(__dirname, '../src-www')).map(file => {
  if (/\.we$/.test(file.name)) {
    let context = String(fs.readFileSync(file.path));

    context = addPx(context);

    context = expression(context);

    context = transformData(context);

    context = transformTag(context);

    context += '<!-- This file is created by weex2vue. -->';

    fs.writeFileSync(file.path.replace(/\.we$/, '.vue'), context);
  }
});

console.log('Done!');

```
