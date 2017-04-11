---
layout: post
title:  "jekyll notes"
date:   2017-04-11
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

# Hosting comments based on github issues
This guide is deeply follows on [this article](http://seanlane.net/blog/2016/Hosting_comments_within_issues_on_Github_Pages)

## Add style to your `css/main.scss` file

```css
/********************************
*
*  COMMENTS
*
********************************/


.comment {
    background-color: transparent;
    border-color: #CACACA;
    border-style: solid;
    border-width: 1px;
    color: black;
    display: block;
    margin-bottom: 10px;
    margin-top: 10px;
    padding: 0px;
    width: 100%;
  }

.comment .commentheader {
  border-bottom-color: #CACACA;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  color: black;
  background-image: -webkit-linear-gradient(#F8F8F8,#E1E1E1);
  background-image: -moz-linear-gradient(#F8F8F8,#E1E1E1);
  color: black;
  display: block;
  float: left;
  font-family: helvetica, arial, freesans, clean, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  height: 33px;
  line-height: 33px;
  margin: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0px;
  text-overflow: ellipsis;
  text-shadow: rgba(255, 255, 255, 0.699219) 1px 1px 0px;
  white-space: nowrap;
  width: 100%;
}

.comment .commentheader .commentgravatar {
  background-attachment: scroll;
  background-clip: border-box;
  background-image: none;
  background-origin: padding-box;
  color: black;
  display: inline-block;
  float: none;
  font-family: helvetica, arial, freesans, clean, sans-serif;
  font-size: 1px;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  height: 20px;
  line-height: 1px;
  margin-left: 5px;
  margin-right: 3px;
  margin-top: -2px;
  overflow-x: visible;
  overflow-y: visible;
  padding: 1px;
  text-overflow: clip;
  text-shadow: rgba(255, 255, 255, 0.699219) 1px 1px 0px;
  vertical-align: middle;
  white-space: nowrap;
  width: 20px;
}

.comment .commentheader a:link {
  text-decoration: none;
}

.comment .commentheader a:hover {
  border-bottom:1px solid;
}


.comment .commentheader .commentuser {
  background-color: transparent;
  color: black;
  display: inline;
  float: none;
  font-family: helvetica, arial, freesans, clean, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  height: 0px;
  line-height: 16px;
  margin-left: 5px;
  margin-right: 10px;
  overflow-x: visible;
  overflow-y: visible;
  padding: 0px;
  text-overflow: clip;
  text-shadow: rgba(255, 255, 255, 0.699219) 1px 1px 0px;
  white-space: nowrap;
  width: 0px;
}

.comment .commentheader .commentdate {
  background-color: transparent;
  color: #777;
  display: inline;
  float: none;
  font-family: helvetica, arial, freesans, clean, sans-serif;
  font-size: 11px;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  height: 0px;
  line-height: 33px;
  margin: 0px;
  overflow-x: visible;
  overflow-y: visible;
  padding: 0px;
  text-overflow: clip;
  text-shadow: rgba(255, 255, 255, 0.699219) 1px 1px 0px;
  white-space: nowrap;
  width: 20em;
}

.comment .commentbody {
  background-attachment: scroll;
  background-clip: border-box;
  background-color: transparent;
  background-image: none;
  background-origin: padding-box;
  color: #333;
  display: block;
  margin-bottom: 1em;
  margin-left: 1em;
  margin-right: 1em;
  margin-top: 40px;
  overflow-x: visible;
  overflow-y: visible;
  padding: 0em;
  position: static;
  width: 96%;
  word-wrap: break-word;
}

.comment .commentbody p {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  margin-left: 0em;
  margin-right: 0em;
}

.comment .commentbody pre {
  border: 0px solid #ddd;
  background-color: #eef;
  padding: 0 .4em;
}

.comment .commentbody pre code {
  border: 0px solid #ddd;
}

.comment .commentbody code {
  border: 1px solid #ddd;
  background-color: #eef;
  font-size: 85%;
  padding: 0 .2em;
}
div#comments #header a {
  text-decoration: underline;
}

```

## add code to your `_layouts/post.html`

```html
{% if page.commentIssueId %}
  <div id="comments">
    <h2>Comments</h2>
    <div id="header">
      Want to leave a comment? Visit <a href="https://github.com/zhoukekestar/blog/issues/{{page.commentIssueId}}"> this post's issue page on GitHub</a> (you'll need a GitHub account. What? Like you already don't have one? :).
    </div>
  </div>
  <script src='https://cdn.bootcss.com/es6-promise/4.1.0/es6-promise.auto.min.js'></script>
  <script src='https://cdn.bootcss.com/fetch/2.0.3/fetch.min.js'></script>
  <script src='https://cdn.bootcss.com/timeago.js/3.0.0/timeago.min.js'></script>
  <script type="text/javascript">

      function loadComments(data) {
        var comments = document.querySelector('#comments');
        data.forEach(function(item) {
          var cuser = item.user.login;
          var cuserlink = "https://www.github.com/" + item.user.login;
          var clink = "https://github.com/zhoukekestar/blog/issues/{{page.commentIssueId}}#issuecomment-" + item.url.substring(item.url.lastIndexOf("/") + 1);
          var cbody = item.body_html;
          var cavatarlink = item.user.avatar_url;
          var cdate = new timeago().format(item.created_at);

          comments.innerHTML += ("<div class='comment'><div class='commentheader'><div class='commentgravatar'>"
              + '<img src="' + cavatarlink + '" alt="" width="20" height="20">'
              + "</div><a class='commentuser' href=\"" + cuserlink + "\">"
              + cuser + "</a><a class='commentdate' href=\"" + clink
              + "\">" + cdate + "</a></div><div class='commentbody'>" + cbody + "</div></div>");
        })
      }

      fetch('https://api.github.com/repos/zhoukekestar/blog/issues/{{page.commentIssueId}}/comments', {
        headers: {
          Accept: "application/vnd.github.full+json"
        }
      }).then(function (response) {
        return response.json();
      }).then(function (body) {
        loadComments(body);
      })
  </script>
{% endif %}
```
