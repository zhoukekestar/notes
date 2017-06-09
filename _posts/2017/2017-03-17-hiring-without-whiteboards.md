---
layout: post
title:  "Hiring without whiteboards"
date: 2017-03-16
tags: [hiring, interview]
commentIssueId: 14
---

This is inspired by [Hiring-without-whiteboards](https://github.com/poteto/hiring-without-whiteboards).

# TL;DR
> Discussing a real world problem (with or without whiteboard) is 👍 <br>
Solving CS trivia, technical puzzles, riddles, brainteasers (with or without whiteboard) is 👎
![twitter](https://camo.githubusercontent.com/b572721913dce55c9d2bfa0275201c2101dba4e5/68747470733a2f2f692e696d6775722e636f6d2f784a56366346342e706e67)

# Hiring without whiteboards 👍
Yep, I hate typical, Computer-Science based (like sort, etc) `whiteboard` interviews too.

I do believe the problem can be solved by Google search is not a big problem.

The problems like `How to implement this feature like this site` is not a big issue too as it always has solutions in GitHub if it's just a normal feature.

The fake interviews:
* `Boss`: What's the output with code `['1', '2','3'].map(parseInt)`?
* `Employee`: Ummm... Excuses Me? Can I borrow your computer and run this code on your Chrome? I will get the answer immediately.
* `Boss`: No, you can not use computer!
* `Employee`: OK, The answer is `[1, 2, 3]`?
* `Boss`: No.
* `Employee`: What? The answer is `[1, NaN, NaN]`?! What's happening just now and WHYYYYY? Let me Google it!
* `Boss`: Okay...
* `Employee`: Run `['1', '2','3'].map(function() { console.log(arguments) })` & Read the [parseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) manual. Yeah! Got it!
* Boss: No, no, no. The most important thing is you don't understand the function `map` & `parseInt`.
* Employee: Sorry? But, we never use `map` & `parseInt` like this. I will code  like this `['1', '2', '3'].map(n => parseInt(n))`.
* Boss: Sorry, you are rejected.

Funny!

But... Wait! What are we going to do in interviews?

Discussing the employee's real world project may be the best choice.
* What problems have you met?
* How to solve those issues?
* Do you have any ideas to improve our company's products?

Or you can just list projects' problems you are facing. Like:
* How to access multiple systems just with one account?
* How to specify a user to request limited API at API Level (not just UI Level)?

# Hiring with whiteboards 👎
* [Interview-answers](http://zhoukekestar.github.io/notes/2017/06/07/interview-answers.html) is an article written by me for whiteboards interview.
* [Those](http://blog.poetries.top/2017/03/12/front-end-interview-summary/) questions are not so good.
