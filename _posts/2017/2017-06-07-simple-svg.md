---
layout: post
title:  "Simple SVG"
date:   2017-06-07
tags: [svg, html, css]
commentIssueId: 16
---

# SVG for resume

## First Version
One triangle & Two bold lines

<svg height='100' width='210' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M0 0 L100 100 L0 100 Z" fill='#02ae51'></path>
  <path d="M40 0 L140 100" stroke-width='20' stroke='#02ae51'></path>
  <path d="M90 0 L190 100" stroke-width='20' stroke='#02ae51'></path>
</svg>

Yeah! We should modify two lines longer!

<svg height='100' width='210' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M0 0 L100 100 L0 100 Z" fill='#02ae51'></path>
  <path d="M30 -10 L150 110" stroke-width='20' stroke='#02ae51'></path>
  <path d="M80 -10 L200 110" stroke-width='20' stroke='#02ae51'></path>
</svg>

That's it!

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg height='100' width='210' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M0 0 L100 100 L0 100 Z" fill='#02ae51'></path>
  <path d="M30 -10 L150 110" stroke-width='20' stroke='#02ae51'></path>
  <path d="M80 -10 L200 110" stroke-width='20' stroke='#02ae51'></path>
</svg>
```

This version works great with latest Chrome, but lower version of Chrome can't display correctly.

![resume-bug]({{ site.baseurl }}/assets/2017/06-07-simple-svg/resume-bug.png)
![svg-bug]({{ site.baseurl }}/assets/2017/06-07-simple-svg/svg-bug.png)

## Second Version

So I have to draw two parallelogram instead of two lines. Like this:

![draft]({{ site.baseurl }}/assets/2017/06-07-simple-svg/draft.png)

<svg height='100' width='180' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M0 0 L100 100 L0 100 Z" fill='#02ae51'></path>
  <path d="M20 0 L40 0 L140 100 L120 100 Z" fill='#02ae51'></path>
  <path d="M60 0 L80 0 L180 100 L160 100 Z" fill='#02ae51'></path>
</svg>

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg height='100' width='180' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <path d="M0 0 L100 100 L0 100 Z" fill='#02ae51'></path>
  <path d="M20 0 L40 0 L140 100 L120 100 Z" fill='#02ae51'></path>
  <path d="M60 0 L80 0 L180 100 L160 100 Z" fill='#02ae51'></path>
</svg>
```

# Circle

Circle with SVG use `stroke-dasharray` & `stroke-dashoffset`

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="35" width="35" version="1.1">
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#ccc" stroke-width="2" fill="transparent"/>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#02ae51" stroke-width="2" fill="transparent" stroke-dasharray="0, 100, 100" class='percent' stroke-dashoffset='75'/>
</svg>

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="35" width="35" version="1.1">
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#ccc" stroke-width="2" fill="transparent"/>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#02ae51" stroke-width="2" fill="transparent" stroke-dasharray="0, 100, 100" class='percent' stroke-dashoffset='75'/>
</svg>
```

So, let's control it with `class`

```css
.p25 .percent {
  stroke-dashoffset: 25;
}
.p50 .percent {
  stroke-dashoffset: 50;
}
.p75 .percent {
  stroke-dashoffset: 75;
}
.p100 .percent {
  stroke-dashoffset: 100;
}
```

Add class to svg
```html
<svg height="35" width="35" class='p50'>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#ccc" stroke-width="2" fill="transparent"/>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#02ae51" stroke-width="2" fill="transparent" stroke-dasharray="0, 100, 100" class='percent' stroke-dashoffset='75'/>
</svg>
```

<style>
.p25 .percent {
  stroke-dashoffset: 25;
}
.p50 .percent {
  stroke-dashoffset: 50;
}
.p75 .percent {
  stroke-dashoffset: 75;
}
.p100 .percent {
  stroke-dashoffset: 100;
}
</style>

<svg height="35" width="35" class='p25'>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#ccc" stroke-width="2" fill="transparent"/>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#02ae51" stroke-width="2" fill="transparent" stroke-dasharray="0, 100, 100" class='percent' stroke-dashoffset='75'/>
</svg>

<svg height="35" width="35" class='p50'>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#ccc" stroke-width="2" fill="transparent"/>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#02ae51" stroke-width="2" fill="transparent" stroke-dasharray="0, 100, 100" class='percent' stroke-dashoffset='75'/>
</svg>

<svg height="35" width="35" class='p75'>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#ccc" stroke-width="2" fill="transparent"/>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#02ae51" stroke-width="2" fill="transparent" stroke-dasharray="0, 100, 100" class='percent' stroke-dashoffset='75'/>
</svg>

<svg height="35" width="35" class='p100'>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#ccc" stroke-width="2" fill="transparent"/>
  <circle cx="50%" cy="50%" r="15.915494309189533" stroke="#02ae51" stroke-width="2" fill="transparent" stroke-dasharray="0, 100, 100" class='percent' stroke-dashoffset='75'/>
</svg>


# SVG Clock

Try an animation clock by SVG!

Style:
```css
.clock .percent {
  animation: clock 10s linear infinite;
}
@keyframes clock {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 600;
  }
}
```

SVG:
```html
<svg height="210" width="210" class='clock'>
  <circle cx="50%" cy="50%" r="95.49296585513721" stroke="#ccc" stroke-width="2" fill="transparent"/>
  <circle cx="50%" cy="50%" r="95.49296585513721" stroke="#02ae51" stroke-width="10" fill="transparent" stroke-dasharray="1, 599" stroke-linecap='round' class="percent"/>
</svg>
```


<style>
.clock .percent {
  animation: clock 10s linear infinite;
}
@keyframes clock {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 600;
  }
}
</style>
<svg height="210" width="210" class='clock'>
  <circle cx="50%" cy="50%" r="95.49296585513721" stroke="#ccc" stroke-width="2" fill="transparent"/>
  <circle cx="50%" cy="50%" r="95.49296585513721" stroke="#02ae51" stroke-width="10" fill="transparent" stroke-dasharray="1, 599" stroke-linecap='round' class="percent"/>
</svg>
