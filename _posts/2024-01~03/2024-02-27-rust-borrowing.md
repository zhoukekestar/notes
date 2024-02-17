---
layout: post
title:  "Rust 所有权和借用"
date:  2024-02-17
tags: [note]
---


  以字符串为例，举例 Rust 中的所有权的借用机制。

# 正常打印

```rs
fn main() {
    let s = String::from("hello");
    println!("{}", s);
}
```

# 修改字符串打印

```rs
fn main() {
  // 添加可变声明
  let mut s = String::from("hello");

  // 添加字符串
  s.push_str(", world");

  println!("{}", s);
}
```


# 所有权

### 所有权转移打印

```rs
fn main() {
  let s = String::from("hello");

  // 所有权转移
  change(s);

  // 此处已经无法正常访问 s 变量，也无法打印
  // println!("{}", s)
}

fn change(some_string: String) {
  // 正常打印
  println!("{}", some_string)
}
```


### 转移所有权后修改字符串并打印

```rs
fn main() {
  let s = String::from("hello");

  change(s);

  // 所有权已转移，此处无法打印
  // println!("{}", s)
}

// 声明为可变量，是否可变仅对当前变量名生效
// 所有 main 函数中的 s 不用声明为 let mut s = xxx;
fn change(mut some_string: String) {
  some_string.push_str(", world");
  println!("{}", some_string)
}
```

# 借用


### 借用一起打印

```rs
fn main() {
  let s = String::from("hello");

  // 只是借用
  change(&s);

  // 所以此处可以打印
  println!("{}", s)
}

fn change(some_string: &String) {
  // 此处打印借用的字符串
  println!("{}", some_string)
}

```


### 借用修改后，一起打印新字符串

```rs
fn main() {
  // 需要声明可变
  let mut s = String::from("hello");

  // 借用可变字符串
  change(&mut s);

  // 因为为借用，所以能正常打印，且被修改了
  // 此处打印出 hello, world
  println!("{}", s)
}

// 声明「借用」「可变」字符串
fn change(some_string: &mut String) {
  // 修改字符串
  some_string.push_str(", world");

  // 打印 hello, world
  println!("{}", some_string)
}
```
