---
layout: post
title:  "jekyll note"
date:   2016-12-09 12:00:00 +0800
categories: jekyll note
tags: [note, tips, jekyll]
---

# Install jekyll. Steps for Windows.

1、Download Ruby & install

2、gem install

```base
gem install jekyll // Ruby: v2.3.1  jekyll: v3.2.1
gem install bundler
jekyll new blog
cd blog
```

3、Copy files

Copy `Ruby23-x64/lib/ruby/gems/2.3.0/gems/minima-1.0.1/_layouts/*.html` TO `CURRENT DIR`.

I don't know why i should do this.... The files are exist, but jekyll can't find it.

4、Run

```bash
jekyll build
jekyll serve
```


# Delveping Gemfile

```bash
source "https://rubygems.org"
ruby RUBY_VERSION
gem "jekyll", "3.2.1"
gem "minima"
```


# Deploying Gemfile

```bash
source "https://rubygems.org"
ruby RUBY_VERSION
gem "minima"
gem 'github-pages'
```

# Add custom style to current page.
The style needs to be placed before the content.

```html
<style type='text/css'>
  li a {
    color: #f00;
  }
</style>
```
