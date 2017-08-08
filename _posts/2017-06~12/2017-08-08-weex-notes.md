---
layout: post
title:  "Weex 浅析"
date:   2017-08-08
tags: [weex]
commentIssueId: 46
---

`weex`在原生端的主要原理是，通过 `v8` 引擎，将 `bundlejs` 和 `weex-framework` 结合在一起在 `v8` 上跑出结果，然后，通过返回对象动态布局 `native` 端页面
* v8
* 引擎接口：jsbridge
* 引擎调用JAVA
* JNI 实践小 Demo

## V8

`weex` 中使用的 `v8` 引擎代码，代码仓库: [`weex_js_engine`](https://github.com/alibaba/weex_js_engine).

其中，主要使用到的技术为 `Android` 中的 `JNI` 技术。
> 在编程领域, JNI (Java Native Interface,Java本地接口)是一种编程框架,使得Java虚拟机中的Java程序可以调用本地应用/或库,也可以被其他程序调用。 本地程序一般是用其它语言（C、C++或汇编语言等）编写的, 并且被编译为基于本机硬件和操作系统的程序。

`weex` 通过调用使用 `C/C++` 编写的自定义 `JS Engine`, 将 `JS` 代码跑在该引擎上，并将 View 和需要与原生交互的业务代码通过 `JSBridge` 与原生交互。

## 引擎接口

通过查看 [com_taobao_weex_bridge_WXBridge.cpp](https://github.com/alibaba/weex_js_engine/blob/master/jni/v8core/com_taobao_weex_bridge_WXBridge.cpp), 我们不难发现，其中从 `V8` 主要暴露给原生的的接口有：
* `Java_com_taobao_weex_bridge_WXBridge_initFramework`: `initFramework` 方法

  该方法主要在应用初始化时候调用，由[weex](https://github.com/apache/incubator-weex/) 项目生成，在 `weex-SDK` 的 `assets/main.js` 中能找到具体的框架实现文件。

* `Java_com_taobao_weex_bridge_WXBridge_execJS`: `execJS` 方法

## 引擎调用 JAVA

在 `C/C++` 中，如果在调用接口需要返回的，直接 `return` 即可。若是需要异步调用 `JAVA` 的，可以做以下类似的操作：

```c
// 如 WXBridge.cpp 中，调用 Bridge.java 中的 callAddElement 方法。
if (jCallAddElementMethodId == NULL) {
  jCallAddElementMethodId = env->GetMethodID(
    jBridgeClazz,
   "callAddElement",
   "(Ljava/lang/String;Ljava/lang/String;[BLjava/lang/String;Ljava/lang/String;)I");
}

int flag = env->CallIntMethod(
  jThis,
  jCallAddElementMethodId,
  jInstanceId,
  jref,
  jdomString,
  jindex,
  jCallback);
```

## 接下来，是 JNI 的一个 DEMO 实践

简要地实现一个 `C++` 接口，类比 `weex_js_engine` 在 `V8` 引擎上做的一个接口扩展。然后 `Java` 将“引擎”载入到应用中，应用通过调用相应的接口，通过返回的数据，动态绘制按钮。类似 `weex` 在运行 `bundlejs` 后，获取 `view` 对象，然后再通过 `android` 动态绘制 `view`。

## 安装 NDK
NDK (Native Development Kit), 主要将 `C/C++` 代码编译成 `.so` 文件的一个库。在该样例代码中，可以在运行后的 `app\build\intermediates\transforms\stripDebugSymbol\debug\folders\2000\1f\main\lib` 目录下找到 `.so` 的库文件。当然，在编译后的 `apk` 文件的 `lib` 目录下也能找到该文件。

> 原生开发工具包（英语：native development kit，简称NDK）是一种基于原生程序接口的软件开发工具。通过此工具开发的程序直接以本地语言运行，而非虚拟机。因此只有java等基于虚拟机运行的语言的程序才会有原生开发工具包。

`android` -> `SDK Manager` -> `Android SDK` -> `NDK`

![tim 20170808113240](https://user-images.githubusercontent.com/7157346/29065772-b7deed52-7c5f-11e7-9b87-450bfb19ada5.png)

## 新建项目
记得在新建时，把 `C++` 支持勾上。

![tim 20170808111556](https://user-images.githubusercontent.com/7157346/29065771-b7a0a3bc-7c5f-11e7-9d78-853fd6d82754.png)


## 编写“引擎”接口

这里是简单展示一下 `weex_js_engine` 的大概原理。样例中，为 `MainActivity` 新增一个 `newBtn` 接口，接口返回一个 `hashMap` 对象，将绘制时需要的参数以 `map` 的形式传给 `Java`。

```c
JNIEXPORT jobject JNICALL
Java_io_github_zhoukekestar_hellojni_MainActivity_newBtn(
        JNIEnv *env,
        jobject
) {
    jclass mapClass = env->FindClass("java/util/HashMap");
    jsize map_len = 5;
    jmethodID init = env->GetMethodID(mapClass, "<init>", "(I)V");
    jobject hashMap = env->NewObject(mapClass, init, map_len);

    jmethodID put = env->GetMethodID(mapClass, "put",
                                     "(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;");

    env->CallObjectMethod(hashMap, put,
                          env->NewStringUTF(((string)"height").c_str()),
                          env->NewStringUTF(((string)"100").c_str()));
    env->CallObjectMethod(hashMap, put,
                          env->NewStringUTF(((string)"width").c_str()),
                          env->NewStringUTF(((string)"500").c_str()));
    env->CallObjectMethod(hashMap, put,
                          env->NewStringUTF(((string)"x").c_str()),
                          env->NewStringUTF(((string)"100").c_str()));
    env->CallObjectMethod(hashMap, put,
                          env->NewStringUTF(((string)"y").c_str()),
                          env->NewStringUTF(((string)"100").c_str()));
    env->CallObjectMethod(hashMap, put,
                          env->NewStringUTF(((string)"text").c_str()),
                          env->NewStringUTF(((string)"hello jni").c_str()));
    return hashMap;
}
```

## 获取“引擎”数据

获取“引擎”数据，并动态绘制原生控件

```java
public class MainActivity extends AppCompatActivity {

    // 应用启动时即加载 C++ 库
    static {
        System.loadLibrary("native-lib");
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 通过返回的数据，我们就可以动态新建一个 button 了
        ConstraintLayout layout = (ConstraintLayout)findViewById(R.id.content);
        HashMap btnConfig = newBtn();
        Button button = new Button(this);
        button.setWidth(Integer.parseInt((String) btnConfig.get("width")));
        button.setHeight(Integer.parseInt((String) btnConfig.get("height")));
        button.setText((String) btnConfig.get("text"));
        button.setX(Float.parseFloat((String) btnConfig.get("x")));
        button.setY(Float.parseFloat((String) btnConfig.get("y")));
        layout.addView(button);
    }

    // 定义了 newBtn 接口，通过该方法，可以调用 C++ 代码，并返回数据
    public native HashMap newBtn();
}
```

## 运行截图

![wechat image_20170808165801](https://user-images.githubusercontent.com/7157346/29065770-b79fd806-7c5f-11e7-995e-8e7a85c5aa7e.png)

## 样例源码

[drafts/hellojni](https://github.com/zhoukekestar/drafts/tree/master/hellojni)

## References
* [V8Android](https://github.com/crossle/V8Android)
* [ android studio 生成 jniLibs 目录](http://blog.csdn.net/qq_18524107/article/details/52165124)
* [JsBridge 源码分析](http://www.jianshu.com/p/fce3e2f9cabc)
