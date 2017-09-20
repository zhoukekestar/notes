---
layout: post
title:  "Groovy Example"
date:   2017-09-20
tags: [java, groovy]
commentIssueId: 56
---

Groovy Examples

```groovy
def res = [
    "hello": "world",
    "arr": [1,3,4,1,3]
]

res.remove('hello')
res.arr.removeAll([1])

println res // [arr:[3, 4, 3]]

res = [
    "hello": "world",
    "arr": [1,3,4,1,3]
]

res.arr = res.arr.findResults({ //i ->
//    print i
//    println it
//    println it.key
//    println it.value
    it > 2 ? it : null
})
println res // [hello:world, arr:[3, 4, 3]]


groups =  [
    "groups":[
        "pageSize":10,
        "result":[
            [
            "groupStatus":1,
            "hostId":3632383918,
            "id":520,
            "name":"子纳测试1",
            "subType":null
            ]
        ],
        "start":0,
        "total":1
    ]
];
println ([
    "groups": [
        "pagesize": groups?.groups?.pagesizse,
        "total": groups?.groups?.total,
        "start": groups?.groups?.start,

        "result": groups?.groups?.result?.collect({
            [
                "userId": it["hostId"],
                "tagId": it["id"],
                "tagName": it["name"]
            ]
        })

    ]
]);

//println newres;  [groups:[pagesize:null, total:1, start:0, result:[[userId:3632383918, tagId:520, tagName:子纳测试1]]]]
```
