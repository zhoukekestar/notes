---
layout: post
title:  "快速开发"
date:  2024-01-19
tags: [note]
---

  串联使用 zx、chrome-cli、fzf 快速开发

# Requirements

* `brew install chrome-cli`
* `brew install fzf`
* `npm install -g zx`

# Steps

## Chrome

  使用 chrome-cli 来获取当前的 URL 地址，源码信息等。

  [https://github.com/prasmussen/chrome-cli](https://github.com/prasmussen/chrome-cli)

## fzf

  使用 fzf 来快速筛选本地项目

  [https://github.com/junegunn/fzf](https://github.com/junegunn/fzf)


## zx

  使用 zx 来串联整体的流程

  [https://github.com/google/zx](https://github.com/google/zx)


## bash

```sh
function publish() {
  zx -i ~/bin/def-publish.mjs
}
```

# Scripts

```js
#!/usr/bin/env zx

$.verbose = false

import prompts from 'prompts'

// URL 信息
const tabInfo = await $`chrome-cli info`
const url = String(tabInfo).match(/Url:\ (.*)/)?.[1]

function getProjectFromUrl () {
  return url.match(/app\/([^\/]*\/[^\/]*)\//)?.[1]
}

/**
 * 打开本地项目
 */
async function openLocalProject (project) {
  let filterResult = null
  try {
    filterResult = String(
      (await $`fd . ~/workspace --type directory --max-depth 4 | fzf --filter="${project}" | head -n 6`) ||
        ''
    )
  } catch (e) {}

//   console.log('filterResult', filterResult)
  if (filterResult) {
    const projects = filterResult.split('\n').filter(t => t);

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: '选择项目？',
      choices: projects.map(item => {
        return { title: item, value: item }
      }),
      initial: 0
    })

    if (response.value) {
      await $`code ${response.value}`
    }
  } else {
    console.log('未找到本地项目，请手动 Clone 并打开 👉  ' + `https://gitlab.alibaba-inc.com/${project}`)
  }
}

const project = getProjectFromUrl(url)
if (project) {
  openLocalProject(project)
} else {
  // 源码信息
  const documentBody = String(await $`chrome-cli source`)
  let cdnUrls = documentBody.match(/alicdn.com\/([^\/\?\s]*\/[^\/\?\s]*)\//g)
  const names = ['/ctf', '/coke', '/1688', '/mwb', '/cbu']
  const filteredCdnUrls = Array.from(
    new Set(
      cdnUrls?.filter(url => {
        for (let name of names) {
          if (url.includes(name)) {
            return true
          }
        }
      }) || []
    )
  )

  if (!filteredCdnUrls || filteredCdnUrls.length === 0) {
    console.log('未找到项目')
  } else {


    const response = await prompts({
      type: 'select',
      name: 'value',
      message: '选择项目？',
      choices: filteredCdnUrls.map(item => {
        return { title: item, value: item }
      }),
      initial: 0
    })

    if (response.value) {
      const project = response.value.match(
        /alicdn.com\/([^\/\?\s]*\/[^\/\?\s]*)\//
      )?.[1]
      console.log('open ' + response.value + ' ' + project)
      openLocalProject(project)
    }
  }
}
```
