---
layout: post
title:  "合并视频"
date:  2024-07-11
tags: [tool]
---

  使用 ffmpeg 合并视频

# 使用 ffmpeg

* 方法1: 本地安装
```sh
$ brew install ffmpeg
```

* 方法2:使用 wasm

```sh
$ open https://ffmpegwasm.netlify.app/playground/
```

# 合并

本地仅需一条命令即可：

```sh
$ ffmpeg -i left.mp4 -i right.mp4 -filter_complex hstack output.mp4
```

或直接使用在线工具执行上述命令

![image](https://github.com/zhoukekestar/notes/assets/7157346/03f75f1c-ee79-4882-8434-5efedee327d8)


# 参考

* [ffmpeg-merge-two-videos-into-one-with-side-by-side-same-quality-output](https://stackoverflow.com/questions/42255139/ffmpeg-merge-two-videos-into-one-with-side-by-side-same-quality-output)
* [ffmpeg-stitch-videos-horizontally](https://www.baeldung.com/linux/ffmpeg-stitch-videos-horizontally)
* [https://ffmpegwasm.netlify.app/playground/](https://ffmpegwasm.netlify.app/playground/)
