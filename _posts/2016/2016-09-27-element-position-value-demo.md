---
layout: html
title:  "元素位置信息"
date:   2016-09-27 08:53:00 +0800
---

<head>
  <meta charset="utf-8">
  <title>eventXY</title>
  <style>
  #info {
    position: fixed;
    right: 0;
    top: 0;
    padding: 10px;
    background: rgba(0, 0, 0, 0.39);
    color: #fff;
  }
  #block {
    height: 100px;
    width: 200px;
    background-color: #f00;
    position: absolute;
    left: 400px;
    top: 500px;
  }
  </style>
</head>
<body>
  <div id="block"></div>
  <div id="info"></div>
  <script>
    window.onclick = function(e) {

      var html = 'screenX:' + e.screenX + '<br />'
                + 'screenY:' + e.screenY + '<br />'
                + 'clientX:' + e.clientX + '<br />'
                + 'clientY:' + e.clientY + '<br />'
                + 'offsetX:' + e.offsetX + '<br />'
                + 'offsetY:' + e.offsetY + '<br />';

      info.innerHTML = html;
    }
  </script>
</body>

