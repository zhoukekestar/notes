---
layout: post
title:  "ModelScope 测试"
date:  2022-11-05
tags: [note]
---

  测试 ModelScope

# 安装

参考：https://modelscope.cn/docs/%E7%8E%AF%E5%A2%83%E5%AE%89%E8%A3%85

```sh
$ pip3 install torch torchvision torchaudio
$ pip3 install "modelscope[nlp]" -f https://modelscope.oss-cn-beijing.aliyuncs.com/releases/repo.html
```

# 依赖

```sh
$ pip3 install mmdet
# 需要安装 mmcv-full
# $ pip3 install mmcv
$ pip3 install mmcv-full
$ pip3 install timm
```

# 测试

## 人体检测

https://www.modelscope.cn/models/damo/cv_resnet18_human-detection/summary


#### 测试代码


```python
from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks
object_detect = pipeline(Tasks.human_detection,model='damo/cv_resnet18_human-detection')
img_path = 'https://modelscope.oss-cn-beijing.aliyuncs.com/test/images/image_detection.jpg'
result = object_detect(img_path)
print(result)
```

#### 测试结果

```sh
➜  modeltest python3 test.py
2022-11-05 18:48:58,014 - modelscope - INFO - PyTorch version 1.13.0 Found.
2022-11-05 18:48:58,017 - modelscope - INFO - Loading ast index from /Users/zhoukeke/.cache/modelscope/ast_indexer

...

2022-11-05 18:49:08,847 - modelscope - INFO - cuda is not available, using cpu instead.
{'scores': array([0.998648, 0.998366, 0.998095], dtype=float32), 'labels': ['person', 'person', 'person'], 'boxes': array([[ 45, 132, 228, 414],
       [215, 126, 386, 401],
       [372, 125, 588, 376]])}
```


## 中文分词

参考：https://www.modelscope.cn/models/damo/nlp_structbert_word-segmentation_chinese-base/summary

#### 测试代码


```python
from modelscope.pipelines import pipeline
from modelscope.utils.constant import Tasks

p = pipeline('word-segmentation', 'damo/nlp_structbert_word-segmentation_chinese-base')

res = p('阿里巴巴集团的使命是让天下没有难做的生意')

print(res)
```

#### 分词结果

```sh
➜  modeltest python3 test2.py
2022-11-05 18:44:31,774 - modelscope - INFO - PyTorch version 1.13.0 Found.

...

2022-11-05 18:44:40,703 - modelscope - INFO - cuda is not available, using cpu instead.
/Python/3.9/lib/python/site-packages/transformers/modeling_utils.py:763: FutureWarning: The `device` argument is deprecated and will be removed in v5 of Transformers.
  warnings.warn(
{'output': '阿里巴巴 集团 的 使命 是 让 天下 没有 难 做 的 生意'}
```