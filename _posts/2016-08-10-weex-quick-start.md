---
layout: post
title:  "Weex Quick Start"
date:   2016-08-10 16:01:00 +0800
categories: weex quickstart
---

## [查看项目](https://github.com/zhoukekestar/weex-quick-start)

## app/libs，复制libs
app/libs下有`inspector-[debug/release].aar`,`weex_debug-[debug/release].aar`,`weex_sdk-[debug/release].aar`等6个文件

所有的文件都可以从weex项目下build文件夹下找到（当然需要之前编译过才行）[参考文章](http://blog.csdn.net/getchance/article/details/47257389)

比如：以我当前电脑环境为例，我的weex项目clone在`D:\Temp-Doc\weex\weex-repo`目录下。

所以在运行过playground后，可以在`D:\Temp-Doc\weex\weex-repo\android\sdk\build\outputs\aar`找到`weex_sdk-[debug/release].aar`

ps: 不想运行playground的同学，可以直接clone当前项目，在当前项目`app/libs`下有上传aar文件


## MainApplication.class
初始化SDKEngine
{% highlight java %}
public class MainApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        WXEnvironment.addCustomOptions("appName", "QuickStart");
        WXSDKEngine.initialize(this, null);

        WXSDKEngine.setIWXImgLoaderAdapter(new ImageAdapter());

    }
}
{% endhighlight %}
写完后，别忘了在`AndroidManifest.xml`设置application的name属性
{% highlight xml %}
<application
    android:name=".MainApplication"
    ...
{% endhighlight %}

## MainActivity.class
大部分代码直接看吧，主要是下面几句，将assets中的index.js（这个是.we文件编译后的js文件）作为template，并渲染
{% highlight java %}
String template = WXFileUtils.loadFileContent("index.js", this);
mInstance.render("pagenmae", template, null, null, -1, -1, WXRenderStrategy.APPEND_ASYNC);

{% endhighlight %}

## AndroidManifest.xml
{% highlight xml %}
 <uses-permission android:name="android.permission.INTERNET" /> // 各种权限，能写的都写上吧。。。
 <application
       android:name=".MainApplication"
       tools:overrideLibrary="com.taobao.android.dexposed"  // 重写库，需要引入com.taobao.android:dexposed:0.1.8依赖
       android:allowBackup="false"                          // 由于上面的重写，这里需要设置false
       android:icon="@mipmap/ic_launcher"
       android:label="@string/app_name"
       android:supportsRtl="true"
       android:theme="@style/AppTheme">

       <activity android:name=".MainActivity">
           <intent-filter>
               <action android:name="android.intent.action.MAIN" />

               <category android:name="android.intent.category.LAUNCHER" />
           </intent-filter>
       </activity>
   </application>
{% endhighlight %}

## build.gradle

设置libs文件，采用方式1（即自定义aar方式）引入SDK时需要使用，采用其他方式可注释掉
{% highlight gradle %}
repositories {
    flatDir {
        dirs project(':app').file('libs')
    }
}
{% endhighlight %}
引入weex-sdk，我采用了3种方式，自定义aar、以module方式引入sdk目录、官方发布aar
{% highlight gradle %}

// 方式1：SDK 自定义arr引入（构建playground的时候会在weex\android\sdk\build\outputs\aar\weex_sdk-release.aar）
compile(name:'weex_sdk-release', ext:'aar')

// 方式2：SDK 目录引入
// compile project(':weex_sdk')

// 方式3：SDK 官方发布引入，官方会发布SDK到jcenter
// compile 'com.taobao.android:weex_sdk:0.6.1'

{% endhighlight %}

## settings.gradle
采用方式2（即引入sdk目录自己构建的时候）引入WEEX_SDK时需要，其他方式可注释掉。。。貌似有个jsframework未初始化的错误，然后把他引入就好了，这个情况我不清楚了，第一次出现问题后，就没出现了，所以没有在意
{% highlight gradle %}
include ":weex_sdk"
project(":weex_sdk").projectDir = new File("D:\\Temp-Doc\\weex\\weex-repo\\android\\sdk")
// 采用方式2（即引入sdk目录自己构建的时候）引入WEEX_SDK时需要
// ../weex-repo/android/sdk 目录为 https://github.com/alibaba/weex/tree/dev/android/sdk 在本地的目录
{% endhighlight %}
