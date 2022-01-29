---
layout: mypost
date: 2021-11-29 23:44:33
title: Vue3中在循环里使用Ref
categories: [Vue3.X]
---

> 本文中涉及的技术是 Vue3.x + Vite.js,
> 你以为你对 Vue 已经足够熟练使用了，但是现实偶尔还是会给你一巴掌然后问你你真的会吗？呜呜呜...

### 1. v-for 中的 Ref 错误使用

事情是这样的：

有一个需求是某个页面中有一个流程图比对的功能 (流程图已经被抽离出了`Graph.vue`)，既然是比对，那就需要两个流程图啦，一顿劈里啪啦敲下一个页面结构, 假设它是这样:

template:

```html
<section>
  <div v-for="item in ['A', 'B']" :key="item">
    <Graph :ref="`graphRef${item}`" />
  </div>
</section>
```

script:

```js
const graphRefA = (ref < typeof Graph) | (null > null);
const graphRefB = (ref < typeof Graph) | (null > null);
```

如果用户修改了某个比对因素，这时候假设需要 `Graph` 组件里面执行以下`doSomething`方法吧，这个时候敲下类似这样代码：

```js
graphRefA.value?.doSomething();
graphRefB.value?.doSomething();
```

本地跑起来，对着那些比对因素一顿改，嗯嗯看起来稳的一批，`Graph`里的`doSomething`执行的很顺畅呢，就是这样，上测试环境吧！
就在我悠哉游哉划水的时候，测试同学找我说，修改比对因素后，页面图形没反应呀，我第一反应就是"这不可能啊", 赶紧打开测试环境试了一下，咦？啥情况？？

<hr />
通过在`source`中找到对应的源文件，发现打包后的代码里，ref 那块变成这样
![source.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0326f6e51b7a4498a01f687682adf36d~tplv-k3u1fbpfcp-watermark.image?)
找到在`source`里找到`graphRefA.value?.doSomething()`对应的位置，加个断点 debug 了一下，惊呆了`graphRefA`直接就是 null 呀。这可是能`doSomething`呢！
然后又结合别的页面单独引入`Graph`组件使用的时候没有这个问题呀，那可以排除是`Graph`组件自身的问题，那问题可能就只剩下这个 **循环+ref** 的操作了。
### 2. 官方教你怎么做事
后面再官方文档里找到[v-for 中的 Ref 数组](https://v3.cn.vuejs.org/guide/migration/array-refs.html), 啊，原来这个操作官方文档还专门给了使用方法。
template:
```html
<div v-for="item in list" :ref="setItemRef"></div>
```
script:
```js
import { onBeforeUpdate, onUpdated } from "vue";
export default {
  setup() {
    let itemRefs = [];
    const setItemRef = (el) => {
      if (el) {
        itemRefs.push(el);
      }
    };
    onBeforeUpdate(() => {
      itemRefs = [];
    });
    onUpdated(() => {
      console.log(itemRefs);
    });
    return {
      setItemRef,
    };
  },
};
```
果然是我使用问题了。。。
### 3. 官方操作补充
可以看到，官方网站里面的`itemRefs`是一个数组，并且打印后会发现这个数据里的 item 是没有属性可以去区分这个 ref 是`graphRefA`还是`graphRefB`呢，所以我决定采取文档下面的 Tip 里提到的，将`itemRefs`设成对象，那样的话，取的时候就很轻松了：
template:
```html
<div v-for="item in ['A', 'B']" :key="item">
  <Graph :ref="(el) => setGraphRef(el, item)" />
</div>
```

script:

```js
let graphRefs: { [key: string]: typeof Graph } = {};
const setGraphRef = (el: typeof Graph, type: string) => {
  if (el) {
    graphRefs[type] = el;
  }
};
```

在修改比对因素后想要调用`doSomething`的话就这样写：

```js
for (const item of ["A", "B"]) {
  const targetRef = graphRefs[item];
  if (targetRef) targetRef.doSomething();
}
```

emmm...这次才真的稳了。
