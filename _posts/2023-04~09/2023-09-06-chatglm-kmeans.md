---
layout: post
title:  "ChatGLM 向量化聚类"
date:  2023-09-06
tags: [note]
---

  本文简单阐述与记录处理用户反馈文本的方案，使用 ChatGLM 对文本向量化后，使用 K-means 进行简单的聚类，使用 t-SNE 进行简单的降维可视化展现。业务数据已做脱敏展示，并仅做示意使用，非真实数据。

# 基础聊天

  参考 [ChatGLM获取Embedding向量](https://juejin.cn/post/7229676998749241405)

```python
from transformers import AutoTokenizer, AutoModel

# 参考 [ChatGLM2-6B 部署测试验证](https://zhoukekestar.github.io/notes/2023/07/03/chatglm.html)
# 需要把 THUDM/chatglm-6b 改成你自己的路径
tokenizer = AutoTokenizer.from_pretrained("../chatglm2-6b", trust_remote_code=True)
model = AutoModel.from_pretrained("../chatglm2-6b", trust_remote_code=True).cuda()
model.eval()

response, history = model.chat(tokenizer, "你好", history=[])
print(response)
```

# 获取 Embedding

```python
from transformers import AutoTokenizer, AutoModel
import torch
import numpy as np
import json
import pdb

DEVICE = "cuda"
DEVICE_ID = "0"
CUDA_DEVICE = f"{DEVICE}:{DEVICE_ID}" if DEVICE_ID else DEVICE

# 初始化 ChatGLM2
tokenizer = AutoTokenizer.from_pretrained("../chatglm2-6b", trust_remote_code=True)
model = AutoModel.from_pretrained("../chatglm2-6b", trust_remote_code=True).cuda()
model.eval()

# 获取 ChatGLM 的 embedding
def get_glm_embedding(text):
  inputs = tokenizer([text], return_tensors="pt").to(CUDA_DEVICE)
  resp = model.transformer(**inputs, output_hidden_states=True)
  y = resp.last_hidden_state
  y_mean = torch.mean(y, dim=0, keepdim=True)
  y_mean = y_mean.cpu().detach().numpy()
  y_mean = y_mean[0][0]

  # 全部打印出来
  np.set_printoptions(threshold=100000)
  return np.array2string(y_mean, separator=', ')


# 将结果保存到文件中
def save_text_to_file(text, name="resp.txt"):
  f = open(name, "a")
  f.write(text)
  f.close()

# 输入文本
texts = []
# 结果
result = {}

list = """测试文本1
测试文本2
测试文本3""".split('\n')

# 遍历
for li in list:
  result[li] = get_glm_embedding(li)

# 保存结果
save_text_to_file(json.dumps(result))

```

# Python Debug


### VSCode

  由于 Python 版本问题，可能存在终端可以执行，点击 VSCode debug 失败的情况，所以，需要配置一下 Python 路径。

* 查看详情 https://code.visualstudio.com/docs/python/debugging
  * 原有的 Python Path 是老版本，需要切换至新版
* `where python3.11` 查找你当前的 Python 路径
  * 比如：`/opt/homebrew/bin/python3.11`
* VSCode 输入命令 `Python: Select Interpreter`，并输入你当前的 Python Path

### Terminal

  终端下的 Python 调试可参考 [Python Debug](https://www.python51.com/jc/1461.html)

```python
import pdb

pdb.set_trace()

print("hello world!")
```

命令：

* pp，打印
* n，下一步，执行下一步
* s，步进，一步步的执行
* l，列出，显示断点周围的源代码
* c，继续，继续程序的运行
* r，返回，继续直到当前函数返回

# K-Means 聚类


```python
import json
from sklearn.cluster import KMeans

# https://stackoverflow.com/questions/8369219/how-can-i-read-a-text-file-into-a-string-variable-and-strip-newlines
# 读取上述大模型处理后的 文本与对应的向量
# 样例格式：{ "测试文本1": "[1, 2, 3]", "测试文本2": "[1, ,1, 2]"}
with open('./resp2.txt', 'r') as file:
    data = file.read().replace('\n', '')

# 转 JSON
jsonobj = json.loads(data)

# 处理成向量数组，并保存文本顺序
kmeanslist = []
texts = []

for j in jsonobj:
    vec = json.loads(jsonobj[j])
    texts.append(j)
    kmeanslist.append(vec)


# KMeans 聚类，默认 8，也可自定义跳转
# kmeans = KMeans(n_clusters=5)
kmeans = KMeans()
kmeans.fit(kmeanslist)

# 绑定聚类分组与文本
results = []
for index, item in enumerate(kmeans.labels_):
    results.append(f'{item} {texts[index]}')

# 排序
results.sort()

# 输出结果
listToStr = '\n'.join([str(elem) for elem in results])
print(listToStr)

```

相关结果可参考：https://aliyuque.antfin.com/pipe.zkk/up5gbm/gftoetdg2cd3poof/edit

```
0 严重超时
0 货品一直没送到
1 物流入库太慢了
1 物流卡着不动
1 物流太慢
1 物流太慢了吧
```

# 高维向量低维化

  参考 [t-SNE](https://lvdmaaten.github.io/tsne/), 与 [样例效果](https://lvdmaaten.github.io/tsne/examples/caltech101_tsne.jpg)

  通过降维可视化工具：https://systemjs.1688.com/krump/schema/2322.html，可以能拿到类似如下效果

  ![image](https://github.com/zhoukekestar/notes/assets/7157346/31e55d5e-f277-40f0-bb55-f35054cf0cff)


# References

* [ChatGLM2-6B 部署测试验证](https://zhoukekestar.github.io/notes/2023/07/03/chatglm.html)
* [Embedding](https://juejin.cn/post/7229676998749241405)
* [保存文件](https://www.w3schools.com/python/python_file_write.asp)
* [k-means](https://www.w3schools.com/python/python_ml_k-means.asp)
* [Python Debug](https://www.python51.com/jc/1461.html)
