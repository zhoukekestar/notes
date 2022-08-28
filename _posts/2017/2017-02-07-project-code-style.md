---
layout: post
title:  "PROJECT: code style"
date:   2017-02-07 11:29:00 +0800
categories: javascript code style
tags: [javascript, style]
---

# Javascript Code style

## ESLint

Use `.eslintrc` file to config your javascript code style. And we follow [airbnb](https://github.com/airbnb/javascript) code style.

```json
{
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },

  "globals": {
    "jQuery": true
  },

  "extends": "airbnb",
  "plugins": ["html"],
  "setting": {
    "html/html-extensions": [".html", ".we"]
  }
}
```

### How-to
* `npm i eslint --save-dev` to install eslint.
* `npm i --save-dev eslint-config-airbnb eslint eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react` to install plugins.
* `eslint app.js` to eslint one file if you install eslint globally, OR, `./node_modules/.bin/eslint.cmd app.js` to eslint one file.
* `eslint app.js --fix` to eslint one file & auto fix error.

### Atom
* install `linter`
* install `linter-eslint`
* [option] You can fix error on save.
* [option] Use global ESLint installtion.

### Sublime
* `Ctrl + Shift + P`
* Install packages
* Package: `SublimeLinter`
* Package: `SublimeLinter-contrib-eslint`
* SublimeLinter Setting, set your node Path: (`where node` for windows,  `which node` for OSX)
```json
"linters": {
    "eslint": {
        "args": [
            "--config", "/user/.eslintrc", "--no-eslintrc"
        ]
    }
},
"path" {
  "linux": [],
  "osx": [],
  "windows": ["C:/Program Files/nodejs/node.exe"]
}
```

## editorconfig
```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf
# editorconfig-tools is unable to ignore longs strings or urls
max_line_length = null

```


## Project
* [TGIdeas](http://tgideas.qq.com/webplat/info/news_version3/804/7104/7106/m5723/201701/548650.shtml)
  ![1485166255_18_w4500_h2500](https://user-images.githubusercontent.com/7157346/187056928-c4e2539f-c65b-4308-9437-f337a3df2c34.jpg)
