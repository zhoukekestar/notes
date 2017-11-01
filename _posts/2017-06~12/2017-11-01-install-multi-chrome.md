---
layout: post
title:  "Install multiple versions of Chrome on Mac"
date:   2017-11-01
tags: [mac]
commentIssueId: 63
---

Install multiple versions of Chrome on Mac.
在 Mac 上安装多个版本的 Chrome.

## Stop auto-update
```
$ defaults read com.google.Keystone.Agent checkInterval
$ defaults write com.google.Keystone.Agent checkInterval 0
```

## Download
Download Chrome from [uptodown](http://google-chrome.en.uptodown.com/mac/old).

## Install
* Double click downloaded file.
* Drop it to Applications floder.
* Select `keep both`
* Change name to `Google Chrome xx.app`

## Add Shortcut
* Utilities -> Script Editor
* Click new Document
```
do shell script "/Applications/Google\\ Chrome\\ 48.app/Contents/MacOS/Google\\ Chrome --user-data-dir=/Users/$USER/Library/Application\\ Support/Google/Chrome48 > /dev/null 2>&1 &"
```
* Set File format to application with name `Google Chrome xxs`;
* Then you can open `Chrome xx` by double click `Google Chrome xxs`

## Or bash
You can open chrome by bash simply.
```
$ "/Applications/Google Chrome 48.app/Contents/MacOS/Google Chrome" --user-data-dir="/Users/zhoukeke/Library/Application Support/Google/Chrome48" > /dev/null 2>&1 &
```

## References
* [Install Two Versions of Chrome on OS X](https://www.gitbook.com/book/gkedge/install-two-versions-of-chrome-on-os-x/details)
