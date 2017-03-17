---
layout: post
title:  "Graphql Visualization"
date: 2017-03-16
tags: [graphql, visualization]
---

# Requirements
* Install `graphviz` form [graphviz.org](http://www.graphviz.org), add it to `PATH`
* Install `graphqlviz` by `npm install -g graphqlviz`

# Visualize it as an image
* `graphqlviz http://localhost:3000/graphql | dot -Tpng -o graph.png`
