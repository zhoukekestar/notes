---
layout: post
title:  "Chrome Extension"
date:   2017-06-01
tags: [chrome, extension, note]
commentIssueId: 1
---

## Get last focused window.
[Document](https://developer.chrome.com/extensions/windows)

```js
chrome.windows.getLastFocused({
  populate: true
  },
  (res) => {
    console.log(res);
  },
);
```

## Get tab detail
[Document](https://developer.chrome.com/extensions/tabs)

```js
chrome.tabs.get(699, (tab) => console.log(tab))
```

## webRequest
[Document](https://developer.chrome.com/extensions/webRequest)

#### http -> https
If you can't visit `http://www.google.com.hk`. It will atomically modify `http` to `https`.

```js
chrome.webRequest.onErrorOccurred.addListener(
  details => {
    console.log(details);
    if (details.type === 'main_frame' && /ERR_CONNECTION_TIMED_OUT|ERR_CONNECTION_RESET/.test(details.error) && /http:/.test(details.url)) {
      chrome.tabs.update(details.tabId, {
        url: details.url.replace('http:', 'https:'),
      });
    }
  },
  {
    urls: ["<all_urls>"]
  }
);
```
