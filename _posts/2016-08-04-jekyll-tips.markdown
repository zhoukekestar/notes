---
layout: post
title:  "jekyll tips"
date:   2016-08-04 16:51:00 +0800
categories: jekyll tips
---

# Install jekyll. Steps for Windows.

1、Download Ruby & install

2、gem install
{% highlight bash %}

gem install jekyll // Ruby: v2.3.1  jekyll: v3.2.1
gem install bundler
jekyll new blog
cd blog

{% endhighlight %}

3、Copy files

Copy Ruby23-x64/lib/ruby/gems/2.3.0/gems/minima-1.0.1/_layouts/*.html TO CURRENT DIR. // I don't know why i should do this.... The files are exist, but jekyll can't fint it.

4、Run
{% highlight bash %}

jekyll build
jekyll serve

{% endhighlight %}


# Delveping Gemfile

{% highlight bash %}

source "https://rubygems.org"
ruby RUBY_VERSION
gem "jekyll", "3.2.1"
gem "minima"


{% endhighlight %}


# Deploying Gemfile

{% highlight bash %}
source "https://rubygems.org"
ruby RUBY_VERSION
gem "minima"
gem 'github-pages'

{% endhighlight %}
