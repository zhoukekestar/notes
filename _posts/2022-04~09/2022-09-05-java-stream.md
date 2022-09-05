---
layout: post
title:  "Java Stream & Reactor"
date:  2022-09-05
tags: [java]
---

  Stream + Lambda 用来处理、转换数据确实非常合适。

# 字符串转数字数组

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Test {
    public static void main(String[] args) {
        String str = "1, 22, 7, 20, 101, 30";
        List<Long> numbers = Arrays.stream(str.split(","))
                .map(s -> Long.valueOf(s.trim()))
                .filter(t -> t < 100)
                .sorted()
                .collect(Collectors.toList());
        System.out.println(numbers);
        // [1, 7, 20, 22, 30]
    }
}
```

# Reactor

Maven, 参考 [reactor-by-example](https://www.infoq.com/articles/reactor-by-example/)
```xml
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-core</artifactId>
    <version>3.4.22</version>
</dependency>
```

### 样例 1

来自 [projectreactor-dot-io-reactor3-intro](https://speakerdeck.com/simonbasle/projectreactor-dot-io-reactor3-intro?slide=46)

```java
Flux
    .range(3, 5)                    // 3, 4, 5, 6, 7
    .map(t -> t + 1)                // 4, 5, 6, 7, 8
    .filter(t -> t % 2 == 0)        // 4, 6, 8
    .buffer(2)                      // [4, 6], [8]
    .subscribe(System.out::println);// print [4,6] \n [8]
```

### 样例 2

  flatMapIterable 将一个对象拆分为多个对象

```java
Flux.just("hello_world_!")
        .flatMapIterable(t -> Arrays.asList(t.split("_")))
        .flatMap(t -> Flux.just("prefix_" + t))
        .subscribe(System.out::println);
/*
prefix_hello
prefix_world
prefix_!
*/
```

### 自定义 Publisher

```java

public class Main {
    public static void main(String[] args) {

        Flux
                .fromIterable(Arrays.asList("hello","world"))
                .flatMap(t -> new TimePublisher(t))
                .map(t -> {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    String time = sdf.format(new Date());
                    return t + "_" + time;
                })
                .subscribe(System.out::println);
    }


    static class TimePublisher implements Publisher {
        private String str;
        private String time;

        public TimePublisher(String s) {
            this.str = s;
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            this.time = sdf.format(new Date());
        }

        @Override
        public void subscribe(Subscriber subscriber) {
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            subscriber.onNext(this.time + "_" + this.str);
        }
    }
}

/*
2022-09-05 22:19:28_hello_2022-09-05 22:19:31
2022-09-05 22:19:31_world_2022-09-05 22:19:34
*/
```

# 自定义异步 Publisher

* 将自定义 Publisher extends Mono
* `.flatMap(t -> new TimePublisher(t))` 同步触发
```txt
Thread[main,5,main]
2022-09-05 22:29:43_hello_2022-09-05 22:29:46
Thread[main,5,main]
2022-09-05 22:29:46_world_2022-09-05 22:29:49
Thread[main,5,main]
```

* `.flatMap(t -> new TimePublisher(t).subscribeOn(Schedulers.parallel()))` 异步触发
```txt
Thread[parallel-1,5,main]
Thread[main,5,main]
Thread[parallel-2,5,main]
2022-09-05 22:31:00_world_2022-09-05 22:31:03
2022-09-05 22:31:00_hello_2022-09-05 22:31:03
```

具体实现

```java

public class Main {
    public static void main(String[] args) throws InterruptedException {

        Flux
                .fromIterable(Arrays.asList("hello","world"))
                .flatMap(t -> new TimePublisher(t).subscribeOn(Schedulers.parallel()))
                .map(t -> {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    String time = sdf.format(new Date());
                    return t + "_" + time;
                })
                .subscribe(System.out::println);


        System.out.println(Thread.currentThread());
        Thread.sleep(10000);

    }


    static class TimePublisher extends Mono {
        private String str;
        private String time;

        public TimePublisher(String s) {
            this.str = s;
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            this.time = sdf.format(new Date());
        }

        @Override
        public void subscribe(Subscriber subscriber) {
            System.out.println(Thread.currentThread());
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            subscriber.onNext(this.time + "_" + this.str);
        }
    }
}
```


# 参考

* [https://www.runoob.com/java/java8-streams.html](https://www.runoob.com/java/java8-streams.html)
*