---
layout: post
title:  "Rust WebAssembly"
date:  2022-10-26
tags: [note]
---

Rust WebAssembly Examples.

# Prepares

* `wasm-pack` [rustwasm.github.io](https://rustwasm.github.io/wasm-pack/installer/)

```sh
$ curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```


# Steps

```sh
$ cargo generate --git https://github.com/rustwasm/wasm-pack-template
$ cd wasm-game-of-life
$ wasm-pack build

$ npm init wasm-app www
$ cd www
```

change package.json

```json
{
  // ...
  "dependencies": {                     // Add this three lines block!
    "wasm-game-of-life": "file:../pkg"
  },
  "devDependencies": {
    //...
  }
}
```

continue

```sh
# you need install again after modify the package json file
$ npm install

$ npm start
```


