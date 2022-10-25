---
layout: post
title:  "Rust Macro"
date:  2022-10-25
tags: [note]
---

Rust Macro Examples.

# Function Macro

```rust

macro_rules! funcmacro {
    () => {
        println!("funcmacro");
    };
    ($a: expr, $b: expr) => {
        println!("res: {}", $a + $b);
    }
}

fn main() {
    funcmacro!();
    funcmacro!(1, 2);
}

```

Run Result

```rust
✗ cargo run
    Finished dev [unoptimized + debuginfo] target(s) in 0.56s
     Running `target/debug/hello`
funcmacro
res: 3
```

# Attribute Macro

Step 1:

```toml
[lib]
proc-macro = true
```

Step 2:

```rust
use hello::*;

#[attrmacro]
fn hello() {}

fn main() {
    hello();
}

```

Step 3:

```rust

use proc_macro::{TokenStream};
use quote::{quote};

#[proc_macro_attribute]
pub fn attrmacro(_metadata: TokenStream, _input: TokenStream) -> TokenStream {
    TokenStream::from(quote!{fn hello() { println!("world")}})
}
```

Debug Result

```rust
#![feature(prelude_import)]
#[prelude_import]
use std::prelude::rust_2021::*;
#[macro_use]
extern crate std;
use hello::*;
fn hello() {
    {
        ::std::io::_print(::core::fmt::Arguments::new_v1(&["world\n"], &[]));
    }
}
fn main() {
    hello();
}
```

Run Resut

```shell
✗ cargo run
warning: unused manifest key: package.proc-macro
   Compiling hello v0.1.0 (~/rust-examples/hello)
    Finished dev [unoptimized + debuginfo] target(s) in 0.44s
     Running `target/debug/hello`
world
```

## Debug Macro

```rust

# 安装 expand
$ cargo install cargo-expand

# 目前仅 nightly 支持
$ rustup install nightly
$ rustup default nightly

# 测试
$ cargo expand --bin hello
```

- [How do I debug macros?](https://stackoverflow.com/questions/30200374/how-do-i-debug-macros)
* [error: the option `Z` is only accepted on the nightly compiler](https://stackoverflow.com/questions/48675235/error-the-option-z-is-only-accepted-on-the-nightly-compiler)




# Derive Macro

Step 1：

```rust

use hello::*;
// drive macro demo

pub trait DeriveMacro {
    fn print();
}

#[derive(DeriveMacro)]
struct MyStruct {}

fn main() {
    MyStruct::print();
}

```

Step 2:

```rust
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, token::Token, DeriveInput};

#[proc_macro_derive(DeriveMacro)]
pub fn derive_trait(input: TokenStream) -> TokenStream {
    let input = parse_macro_input!(input as DeriveInput);
    let name = input.ident;

    let expanded = quote! {

        impl DeriveMacro for #name {
          fn print() {
            println!("hello from DeriveMacro")
          }
        }
    };

    TokenStream::from(expanded)
}

```

Run Result
```rust
✗ cargo run
     Running `target/debug/hello`
hello from DeriveMacro
```

# Full Demo

```rust
// lib.rs
use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, token::Token, DeriveInput};

#[proc_macro_attribute]
pub fn attrmacro(_metadata: TokenStream, _input: TokenStream) -> TokenStream {
    TokenStream::from(quote! {fn hello() { println!("hello from attribute macro")}})
}

#[proc_macro_derive(DeriveMacro)]
pub fn derive_trait(input: TokenStream) -> TokenStream {
    let input = parse_macro_input!(input as DeriveInput);
    let name = input.ident;

    let expanded = quote! {

        impl DeriveMacro for #name {
          fn print() {
            println!("hello from derive macro")
          }
        }
    };

    TokenStream::from(expanded)
}
```

```rust
// main.rs
use hello::*;

macro_rules! funcmacro {
    () => {
        println!("hello from function macro");
    };
    ($a: expr, $b: expr) => {
        println!("hello from function macro res: {}", $a + $b);
    };
}

#[attrmacro]
fn hello() {}


// drive macro demo

pub trait DeriveMacro {
    fn print();
}

#[derive(DeriveMacro)]
struct MyStruct {}

fn main() {
    funcmacro!();
    funcmacro!(1, 2);

    hello();

    MyStruct::print();
}

```

```toml
# Cargo.toml

[package]
name = "hello"
version = "0.1.0"
edition = "2021"
proc-macro = true

[lib]
proc-macro = true

[dependencies]
syn = {version="1.0.57",features=["full","fold"]}
quote = "1.0.8"
```

Run Result

```
✗ cargo run
hello from function macro
hello from function macro res: 3
hello from attribute macro
hello from derive macro
```

# References

* [Macros in Rust: A tutorial with examples - LogRocket Blog](https://blog.logrocket.com/macros-in-rust-a-tutorial-with-examples/)
* [Macros - The Rust Programming Language](https://doc.rust-lang.org/book/ch19-06-macros.html)
