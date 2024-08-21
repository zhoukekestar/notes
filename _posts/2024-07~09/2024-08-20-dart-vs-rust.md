---
layout: post
title:  "Dart vs Rust vs Java"
date:  2024-08-20
tags: [js]
---

  Dart vs Rust vs Java 强语言类型写 Web 页面 Build Size 比较。

# Dart

[Build a web app with Dart](https://dart.dev/web/get-started)

```sh
# install dart
$ brew tap dart-lang/dart
$ brew install dart

# install webdev tools
$ dart pub global activate webdev

# create a new project
$ dart create -t web quickstart
$ cd quickstart
$ webdev serve

# build
$ webdev build --output web:build
```

Build size: 60KB

![image](https://github.com/user-attachments/assets/f076028a-ee49-49b3-aaf6-1cec3e910732)


# Rust

## 简单 Demo

```sh
$ cargo generate --git https://github.com/rustwasm/wasm-pack-template
$ cd wasm-game-of-life
$ cargo install wasm-bindgen-cli
$ cargo add web-sys
$ wasm-pack build --target=web
```

  参考 [online-demo](https://unpkg.com/pipe-zkk-game_of_life@0.1.1/index.html)

![image](https://github.com/user-attachments/assets/e3be03a4-8698-4643-b01a-79310d792eb6)

Build size: 20KB

## Yew 框架

参考 [Rust Web ](https://zhoukekestar.github.io/notes/2022/12/06/rust-web.html)

[页面](https://unpkg.com/hello-rust-wasm@0.2.0/dist/index.html)

![image](https://github.com/user-attachments/assets/7af391c6-42b1-46f0-a45d-5c5c350f077a)

Build size: 90KB
> Polyfill 200KB，此处应该 IE11 兼容大小，不含在内


# Java

  Java 编译成 WebAssembly，有个测试 [JWebassembly](https://github.com/i-net-software/JWebAssembly) 项目，Demo 如下：

  ![image](https://github.com/user-attachments/assets/0a16f25e-dd66-402c-b5a4-cd30bfcd0ccb)

Build size: 10KB


# 其他对比

* Dart 是 Google 主导开发，持续性维护状态未知，暂不开放社区
* Rust 是 Mozilla 主导开发，[社区活跃](https://github.com/rust-lang/rust)


# 参考

* [rust wasm](https://rustwasm.github.io/docs/book/game-of-life/hello-world.html)
* [web-sys](https://rustwasm.github.io/wasm-bindgen/examples/dom.html)
* [wasm-bingen](https://github.com/rustwasm/wasm-bindgen)
* [Rust Web 开发指北](https://zhoukekestar.github.io/notes/2022/12/06/rust-web.html)
* [java wasm](https://stackoverflow.com/questions/68265863/how-to-compile-java-to-wasm-webassembly)
  * [wasm languages/java](https://developer.fermyon.com/wasm-languages/java)
