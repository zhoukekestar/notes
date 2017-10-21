---
layout: post
title:  "React Apollo Notes"
date:   2017-10-21
tags: [react, apollo]
commentIssueId: 61
---

[Apollo Client](http://dev.apollodata.com/)
> The flexible, production ready GraphQL client for React and native apps.

## [Full-Stack Tutorial](https://dev-blog.apollodata.com/full-stack-react-graphql-tutorial-582ac8d24e3b?_ga=2.260780943.363586923.1508482262-591974180.1508482262)

Error Message
```log
Network error: Schema must be an instance of GraphQLSchema. Also ensure that there are not multiple versions of GraphQL installed in your node_modules directory.
```
Related Topics
* https://github.com/apollographql/react-apollo/issues/742
* https://github.com/apollographql/apollo-test-utils/issues/35

So we use `npm list | grep graphql` to list all graphql version.
```bash
ali-6c96cfd8f2a1:client zhoukeke$ npm list | grep graphql
client@0.1.0 /Users/zhoukeke/workspace/GitHub/graphql-tutorial/client
│ ├── graphql@0.10.5
│ ├── graphql-tag@2.5.0
│ └─┬ graphql-tools@1.2.3
│   └── @types/graphql@0.9.4
├─┬ graphql@0.11.7
├─┬ graphql-tools@2.5.1
│ │ ├── @types/graphql@0.10.2
│ │ │ ├── graphql@0.10.5
│ │ ├── graphql@0.10.5
│ │ ├── graphql-anywhere@3.1.0
```

How to fixed it?
* `sudo npm install npm -g`
* `npm install graphql@0.10.5`

