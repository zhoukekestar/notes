---
layout: post
title:  "Docker Node Demo"
date:   2016-04-12 15:39:00 +0800
categories: docker node
tags: [docker, nodejs]
---

# index.js

{% highlight js linenos %}
var express = require('express');

// Constants
var PORT = 8080;

// App
var app = express();
app.get('/', function (req, res) {
  res.send('Hello world\n');
});

app.listen(PORT);
console.log(__dirname)
console.log('Running on http://localhost:' + PORT);

{% endhighlight %}

# package.json

{% highlight json %}
{
  "name": "docker-centos-hello",
  "private": true,
  "version": "0.0.1",
  "description": "Node.js Hello world app on CentOS using docker",
  "author": "Daniel Gasienica <daniel@gasienica.ch>",
  "dependencies": {
    "express": "3.2.4"
  }
}
{% endhighlight %}

# Dockerfile
{% highlight bash %}
FROM    centos:centos6

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN     yum install -y epel-release
# Install Node.js and npm
RUN     yum install -y nodejs npm

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install --production

# Bundle app source
COPY . /src

EXPOSE  8080
CMD ["node", "/src/index.js"]
{% endhighlight %}
