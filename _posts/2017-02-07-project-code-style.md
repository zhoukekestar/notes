---
layout: post
title:  "PROJECT: code style"
date:   2017-02-07 11:29:00 +0800
categories: javascript code style
---

# Javascript Code style

## ESLint

Use `.eslintrc` file to config your javascript code style. And we follow [airbnb](https://github.com/airbnb/javascript) code style.

```json
{
  "extends": "airbnb"
}
```

### How-to
* `npm i -g eslint --save-dev` install eslint globally.
* `npm i -g --save-dev eslint-config-airbnb eslint eslint-plugin-jsx-a11y eslint-plugin-import eslint-plugin-react` install plugins globally too.
* `eslint app.js` to eslint one file.
* `eslint app.js --fix` to eslint one file & auto fix error.


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
