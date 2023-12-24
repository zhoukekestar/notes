---
layout: post
title:  "lit-html 源码"
date:  2023-12-24
tags: [note]
---


  因为 lit-html 更新 dom 使用的方式和 virtual dom 不一样，所以，简单实现一下 lit-html。

# 在线 Demo

  lit-html 对外暴露一个 html 字符串模板函数，并使用 render 函数渲染。

  [https://zhoukekestar.github.io/toy-lit-html/index.html](https://zhoukekestar.github.io/toy-lit-html/index.html)

```html
<script type="module">
  import { html, render } from './lit.js';

  const helloTemplate = (name1, name2) => html`
    <div>hi ${name1} !</div>
    <div>hello ${name2} ?</div>
  `

  render(helloTemplate('foo', 'bar'), document.body)

  window.onclick = () => {
    render(helloTemplate('jucy' + Math.random(), 'bob'), document.body)
  }

</script>
```

# 效果

  首次渲染为 foo、bar，然后点击页面，渲染 jucy、bob，且仅更新对应的 text 节点。

  再次多次点击，bob 由于没有更新相关的值，所以后续的每次更新，bob 节点都无变化。

<video width="320" autoplay controls>
  <source src="https://github.com/zhoukekestar/notes/assets/7157346/496c65aa-62d4-43f3-97ec-531f2b0b7bf1" type="video/mp4">
Your browser does not support the video tag.
</video>


# Execute flow

  真实的 lit-html 大致执行顺序。

![](https://www.plantuml.com/plantuml/svg/jLVDRjiu4BxhAUPW83QGzGCuq6vsimKI82s2DEWb26nQcbXiACgbgDX5a2VelPUY1NhhgUYXv_PbsZn7Xv8fcoeJoqbw2HXgvfkVx-EGtiqrKxf8HH0eb34g-EjlEC5qAfZ6OymBeGUGw5ICSgsud8pgZqF1DIecyi0rDm0Lr02keFBA1ul5wTasN39H8ErauvSOwTCpk5wDlPTm4HynHM4bpfR_Tdi1YpI_f3ZBpQ1UDLoZJ5B08jAP8aV7okQcK1TAmjJ0nEZ1zYTbxFl3JexwXQcZwnRVFiaQAihIb6iNfdiFdCu4QnI_Vx05Dvy-thp_xY9PfwhXFWYxLpFjkhdDzjjCH3Pceh-Iupw9YinbHgQAJnB3caBZICBgpEVp3eovZC4FMA_wbTCJWIbAtG3K2S_xA204rsfBBxotUdqk9QhzawU7P6M4Vaky6HCNg7v7DysdlqMUTAz0lvwIwTx-mU7_mwD_Zq-sWIh0ENKsY_70BE6wjrD7S7cqYhIvhQhIUYmv_FdvmuzlR_nC7X0VJ4QMKNVNowpz5ZGt_B1-nckVPbb5MHUtCMAyFVwwWYm8dHkHoSUe9SwYmeYYpzDfflGpOgfRooCtfMhwsck5PcNouAICgY1iJa3Wvv0o7IMReooKVo-SIkZ3pehKpR97HBQlqw_rSyKc9gyxeOpcttszUVkblJYAQMncM7NLjEMEKaYQyxrT7SvOi3MHUAoEWETGfHG7juvnqsLx7PGgj42RN0QMgqWWexEvnemQXafNRHh0G-9HSwgpOmOYocfPmV-7vvd2hXc1pdHskiEcKvGnwAmyS8nBLAI9pVEesaTzBjc3q2sq1wgyNtSU1zlgpO_cs_G_HUvuWmHX23bIJ-A5DOIXVPciGanGBpj7oXjs1DS6ejFk6IDnLYusvjx_WAaazV1NZD-u7XyHdLY46TS9B4UsVNC-0iV_q8u5fiQ7THH7nuBb6af7wzSu-lYgO0AYGfcJiSHOCyxyAJLdsyxQsLFP__aPUCShsyXuaGTed6lgPKjHpQsKsWyWIKxF-LYG1leKaK48LjrEhrPy34awmP94Gv4qUxE4Koy4ly0SHlPDEWfsgJBpU-aN)



