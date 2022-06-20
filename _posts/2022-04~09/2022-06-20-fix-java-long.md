---
layout: post
title:  "Fix Java Long Number in Javascript"
date:  2022-06-20
tags: [note]
---

Fix Java Long Number in Javascript. Just make it to STRING!

# Short Answer

Give a mock json that responsed by Java Server like:

```json
{
  "note": "long json test",
  "number1": 123456789,
  "number2": 123456789123456789,
  "number3": 12345678912345678912345
}
```


## The bug

```js
const res = await fetch('https://systemjs.1688.com/krump/schema/1812.json').then(d => d.json())
console.log(res)
// {note: 'long json test', number1: 123456789, number2: 123456789123456780, number3: 1.234567891234568e+22}
```

## Fix bug

```js
let res = await fetch('https://systemjs.1688.com/krump/schema/1812.json').then(d => d.text())
res
    // Get all number by regexp
    .match(/(\d+)/g)

    // Filter all number that greater than Javascript MAX Number
    .filter(t => String(Number(t)) !== t)

    // Replace the Long Number by Javascript String
    .forEach(t => {
        res = res.replace(t, `"${t}"`);
    })

console.log(res);

/**
{
  "note": "long json test",
  "number1": 123456789,
  "number2": "123456789123456789",
  "number3": "12345678912345678912345"
}
*/
```