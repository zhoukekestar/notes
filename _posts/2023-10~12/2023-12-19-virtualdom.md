<!-- ---
layout: post
title:  "再谈 Virtual DOM"
date:  2023-12-19
tags: [note]
--- -->


* DSL vs JSX
* Ecosystem
  * Three.JS
  *
*

> The big improvements that React brought to the mainstream were componentization, and popularizing declarative rendering.
> https://news.ycombinator.com/item?id=34621279

> For some reason I thought the virtual DOM was a native feature of the browser
> https://news.ycombinator.com/item?id=34633339

# VDom is not just VDOM

> Note that a virtual DOM is pure overhead if you already have a real DOM to work with.
> https://news.ycombinator.com/item?id=34616031
>


# Steps

* diff
  * https://github.com/Matt-Esch/virtual-dom/blob/master/vtree/diff.js
* patch



# Diff Alogrithm

### RTED

> RTED requires O(n2) space as the most space-efficient competitors, and its runtime complexity of O(n3) in the worst case is optimal.

# References

* https://news.ycombinator.com/item?id=34612162
* https://svelte.dev/blog/virtual-dom-is-pure-overhead
* https://github.com/mbasso/asm-dom
* https://github.com/patrick-steele-idem/morphdom
* https://zhoukekestar.github.io/notes/2017/08/07/webcomponents-demo.html
* https://zhoukekestar.github.io/notes/2017/08/07/beyond-framework.html



* [RTED: A Robust Algorithm for the Tree Edit Distance](https://vldb.org/pvldb/vol5/p334_mateuszpawlik_vldb2012.pdf)
* [Minimal Edit-Based Diffs for Large Trees](https://dl.acm.org/doi/pdf/10.1145/3340531.3412026)
* [Detecting Changes in XML Documents](https://people.cs.rutgers.edu/~amelie/papers/2002/diff.pdf)
*
