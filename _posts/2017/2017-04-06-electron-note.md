---
layout: post
title:  "Electorn Note"
date:   2017-04-06
tags: [electron, note]
commentIssueId: 5
---

# Install electron
```shell
set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
npm install electron --save-dev
```

# Run in terminal
`.\"./node_modules/.bin/electron" .`, [more](http://stackoverflow.com/questions/20765337/how-to-fix-is-not-an-internal-or-external-command-error)

# Debugging in VSCode
Attention! Electron version should be `1.5.1` as `1.6.*` is not work on VSCode.

`Ctrl + P` & `ext install debugger-for-chrome` to install `Debugger for chrome`, then you can debug the main process.

# Packager
*  `npm install electron-packager -g`
* `electron-packager . --overwrite --icon ./favicon.png --ignore=\.cmd`
