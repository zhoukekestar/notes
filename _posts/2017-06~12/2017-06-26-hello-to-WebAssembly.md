---
layout: post
title:  "Hello to WebAssembly"
date:   2017-06-26
tags: [webassembly]
---

WebAssembly or wasm is a new portable, size- and load-time-efficient format suitable for compilation to the web.
* Efficient & fast
* Safe
* Open and debuggable
* Part of the open web platform

Ref: [webassembly.org](http://webassembly.org/)

### Say Hello to WebAssembly
* Download & Install [emscripten](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html).
* Write `hello.c` in `C/C++`

  ```c
  #include <stdio.h>

  int main() {
    printf("hello, world!\n");
    return 0;
  }
  ```
* Run `emcc hello.c`, then you can get a `a.out.js`.
* Run `node a.out.js`

  ```bash
  C:\Users\Administrator\Desktop>emcc hello.c

  C:\Users\Administrator\Desktop>node a.out.js
  hello, world!

  ```

#### Create HTML file to run `hello.c`
* Run `emcc hello.c -o hello.html`
* Open `hello.html` with Chrome.
