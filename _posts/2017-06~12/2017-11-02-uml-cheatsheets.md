---
layout: post
title:  "UML Cheatsheets"
date:   2017-11-02
tags: [mac]
commentIssueId: 65
---

## UML 访问控制

```
class Dummy {
- private field1
# protected field2
~ package method1()
+ public method2()
}
```

| 可见/访问性 | 在同一类中 | 同一包中 | 不同包中  | 同一包子类中  | 不同包子类中 |
|:--|:--|:--|:--|:--|:--|
| public |  yes |  yes |  yes |  yes |  yes |
| protected  |  yes |  yes |  no |  yes |  yes |
| package  |  yes |  yes |  no |  yes |  no |
| private |  yes |  no |  no |  no |  no |

Static method 使用下划线 <sup>1<sup>

## References
1. [UMLdiagram](http://pages.cs.wisc.edu/~hasti/cs302/examples/UMLdiagram.html)
2. [Java中的访问控制public,private,protected,package](http://blog.sina.com.cn/s/blog_5dbdb9780100b6ji.html)
3. [21分钟入门UML](http://www.jianshu.com/p/1256e2643923)
