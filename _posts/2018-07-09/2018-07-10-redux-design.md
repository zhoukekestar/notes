---
layout: post
title:  "不一样的 Redux"
date:   2018-07-10
tags: [js]
commentIssueId: 89
---



Redux 除了最平常的特性之外，解决了 React 中一些痛点，比如：
* 集中化的数据管理，避免数据流的混乱
* 解决数据流需要一层层通过 props 传递的问题

除了以上在我认知范围内的，我也一直在纠结，作者为什么通过这种设计来达到以上两点，因为仅仅以上两点需求，没必要这么“过度设计”。



## 不一样的 Redux

文章很好地阐述了 Redux 的强大之处

* undo / redo, 因为 redux 需要每个 action 都有一个清晰的表述，使得 undo / redo 这种通常需要系统级支持的特性，较为完美地支持了

* 在共享、在线协作平台这种场景下，只需要多用户之间相互传递 action 即能实现协作特性

  ![image](https://user-images.githubusercontent.com/7157346/42484930-e9b3617a-8427-11e8-85cc-63a3efe17ba5.png)

* 乐观页面，同”乐观锁“一样乐观，在与用户的交互中，乐观看待与服务端的数据交互，比如在点赞这种情况下，由于大部分情况都是成功的，所以我们及时”同步“反馈用户操作，无需等待服务端的延时返回。为什么？因为我们有 undo 啊~

  ![image](https://user-images.githubusercontent.com/7157346/42484928-e041395a-8427-11e8-8626-1b8f902055d2.png)

* 状态恢复，通过中心化的管理模式，我们很容易就能做到像 CPU 中断时的保存现场，以及中断后的恢复现场，Easy to understand, no more explanation.

* ”修改封闭，扩展开放“，由于 redux 分层足够清晰，所以扩展也足够简单，hook dispatch 就行

* ”时光机器式“的调试，还是由于 action 的特性，使得这种神奇的方式得以落地实现

  ![redux-time-travel](https://user-images.githubusercontent.com/7157346/42484911-cb701366-8427-11e8-8a81-ea4d2ba6cecd.gif)

* Bug Reporter，由于有用户所有的 action 记录，使得 bug 复现也容易多了。

  ![image](https://user-images.githubusercontent.com/7157346/42486164-5a6127d6-842d-11e8-822b-b68ad69a3595.png)





## References

1. [redux designer guide](https://www.smashingmagazine.com/2018/07/redux-designers-guide/)