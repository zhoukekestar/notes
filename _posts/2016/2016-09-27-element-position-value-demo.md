---
layout: html
title:  "元素位置信息"
date:   2016-09-27 08:53:00 +0800
---

<head>
  <meta charset="utf-8">
  <title>getBoundingClientRect</title>
  <style>
    body {
      width: 4000px;
      height: 4000px;
    }
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
      top: 800px;
    }
  </style>
</head>
<body>
  <div id='block'></div>
  <div id='info'></div>
  <script>
    window.onscroll = function() {
      var bound = block.getBoundingClientRect();

      var html = 'top:' + bound.top + '<br />'
                + 'left:' + bound.left + '<br />'
                + 'bottom:' + bound.bottom + '<br />'
                + 'right:' + bound.right + '<br />'
                + 'height:' + bound.height + '<br />'
                + 'width:' + bound.width + '<br />';

      info.innerHTML = html;
    }
  </script>
</body>


