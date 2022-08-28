---
layout: html
title:  "HTML tips"
date:   2017-03-20
---

<head>
  <meta charset="utf-8">
  <title>inline</title>
  <style>
    p {
      font-size: 40px;
      border: dashed 1px rgba(0, 0, 0, 0.15);
    }
    p span {
      height: 1px;
      width: 1em;
      background: #f00;
      margin: 0 10px;
      display: inline-block;
      cursor: pointer;
      position: relative;
    }
    p span:after {
      content: '';
      display: none;
      position: absolute;
      top: 0;
      left: -10000px;
      width: 20000px;
      height: 1px;
      background: #f00;
    }
    p span:hover:after {
      display: block;
    }
  </style>
</head>
<body>
  <p style='line-height: 83px;'>abcdefghij,ABCD你好
    <span style='vertical-align: baseline;'></span>
    <span style='vertical-align: text-bottom;'></span>
    <span style='vertical-align: text-top;'></span>
    <span style='vertical-align: bottom;'></span>
    <span style='vertical-align: top;'></span>
    <span style='vertical-align: middle;'></span>
    <span style='vertical-align: sub;'></span>
    <span style='vertical-align: super;'></span>
  </p>
  <p style='line-height: 1em;'>
    abcdefghij,ABCD你好
    <span style='vertical-align: baseline;'></span>
    <span style='vertical-align: text-bottom;'></span>
    <span style='vertical-align: text-top;'></span>
    <span style='vertical-align: bottom;'></span>
    <span style='vertical-align: top;'></span>
    <span style='vertical-align: middle;'></span>
    <span style='vertical-align: sub;'></span>
    <span style='vertical-align: super;'></span>
  </p>
</body>
