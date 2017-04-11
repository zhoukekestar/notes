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
This guide is deeply follows [this article](http://seanlane.net/blog/2016/Hosting_comments_within_issues_on_Github_Pages)

## Add style to your `css/main.scss` file

```css
/********************************
*
*  COMMENTS
*
********************************/

#comments {
  border-top: solid 1px #e2e2e2;
  margin-top: 100px;
  padding-top: 40px;
}

.comment {
  position: relative;
  color: black;
  display: block;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 0px;
  width: 100%;
  padding-left: 60px;
  box-sizing: border-box;
}

.comment .commentgravatar {
  position: absolute;
  left: 0;
}
.comment .commentgravatar img {
  height: 40px;
  width: 40px;
}
.comment .commentheader {
  border: 1px solid #d1d5da;
  padding-left: 20px;
  background-color: #f6f8fa;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}

.commentheader:before {
  content: '';
  position: absolute;
  left: 44px;
  top: 10px;
  border: solid 8px;
  border-color: transparent rgb(209, 213, 218) transparent transparent;
}
.commentheader:after {
  content: '';
  position: absolute;
  left: 45px;
  top: 10px;
  border: solid 8px;
  border-color: transparent rgb(246, 248, 250) transparent transparent;
}

.comment .commentheader a:link {
  text-decoration: none;
}

.comment .commentheader a:hover {
  border-bottom:1px solid;
}


.comment .commentheader .commentuser {
  font-size: 12px;
  font-weight: bold;
  margin-right: 10px;
}

.comment .commentheader .commentdate {
  color: #777;
  font-size: 11px;
  line-height: 33px;
}

.comment .commentbody {
  color: #333;
  display: block;
  overflow: visible;
  padding: 1em;
  word-wrap: break-word;
  background-color: #fff;
  border: solid 1px #ccc;
  font-size: 14px;
  border-radius: 0 0 5px 5px;
}

.comment .commentbody p {
  margin-bottom: 0.5em;
  margin-top: 0.5em;
  margin-left: 0em;
  margin-right: 0em;
}

.comment .commentbody pre {
  background-color: rgba(27,31,35,0.05);
  padding: 0 .4em;
}

.comment .commentbody pre code {
}

.comment .commentbody code {
  background-color: rgba(27,31,35,0.05);
  font-size: 85%;
  padding: 0 .2em;
}
div#comments #header a {
  text-decoration: underline;
}

```

## add code to your `_layouts/post.html`

```html
\{\% if page.commentIssueId \%\}
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

    function loadComments (data) {
      var comments = document.querySelector('#comments');
      data.forEach(function(item) {
        var cuser = item.user.login;
        var cuserlink = "https://www.github.com/" + item.user.login;
        var clink = "https://github.com/zhoukekestar/blog/issues/{{page.commentIssueId}}#issuecomment-" + item.url.substring(item.url.lastIndexOf("/") + 1);
        var cbody = item.body_html;
        var cavatarlink = item.user.avatar_url;
        var cdate = new timeago().format(item.created_at);

        comments.innerHTML += (
            "<div class='comment'>"
            + "<div class='commentgravatar'>"
              + "<img src='" + cavatarlink + "'>"
            + "</div>"
            + "<div class='commentheader'>"
              + "<a class='commentuser' href='" + cuserlink + "'>" + cuser + "</a><a class='commentdate' href='" + clink + "'>" + cdate + "</a>"
            + "</div>"
            + "<div class='commentbody'>" + cbody + "</div></div>");
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
\{\% endif \%\}
```
