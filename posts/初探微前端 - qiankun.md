---
title: 初探微前端 - qiankun
date: 2022-04-17
categories: [微前端]
---

# 初探微前端 - qiankun

> [qiankun](https://qiankun.umijs.org/zh/guide)

## 核心

- 不限制接入应用的技术栈
- 接入的应用独自管理
- 渐进式重构方案
- 子应用之间互相独立,运行状态不污染

## 为什么不用 iframe?

iframe 最大的特性就是提供了浏览器原生的硬隔离方案，不论是样式隔离、js 隔离这类问题统统都能被完美解决。但他的最大问题也在于他的隔离性无法被突破，导致应用间上下文无法被共享，随之带来的开发体验、产品体验的问题。

1. url 不同步。浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
2. UI 不同步，DOM 结构不共享。想象一下屏幕右下角 1/4 的 iframe 里来一个带遮罩层的弹框，同时我们要求这个弹框要浏览器居中显示，还要浏览器 resize 时自动居中..
3. 全局上下文完全隔离，内存变量不共享。iframe 内外系统的通信、数据同步等需求，主应用的 cookie 要透传到根域名都不同的子应用中实现免登效果。
4. 慢。每次子应用进入都是一次浏览器上下文重建、资源重新加载的过程。

## 实现

1. **主应用:**

   ```js
   import Vue from "vue";
   import App from "./App.vue";
   import { registerMicroApps, start } from "qiankun";
   import router from "./router";

   registerMicroApps([
     {
       name: "miner",
       entry: "//localhost:8001",
       container: "#miner-container",
       activeRule: "/miner",
     },
   ]);
   start();

   new Vue({
     router,
     render: (h) => h(App),
   }).$mount("#app");
   ```

2. **子应用:**

   - 入口文件:

     ```js
     import Vue from "vue";
     import App from "./App.vue";

     let instance;

     const render = () => {
       instance = new Vue({
         render: (h) => h(App),
       }).$mount("#miner");
     };

     if (window.__POWERED_BY_QIANKUN__) {
       // eslint-disable-next-line no-undef
       __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
     } else {
       render();
     }

     export async function bootstrap() {
       console.log("miner bootstrap");
     }

     export async function mount() {
       console.log("miner mount");
       render();
     }

     export async function unmount() {
       console.log("miner unmount");
       instance?.$destroy();
     }
     ```

   - webpack 配置(vue.config.js)

     ```js
     const packageName = require("./package.json").name;

     module.exports = {
       devServer: {
         port: 8001,
         headers: {
           "Access-Control-Allow-Origin": "*",
         },
       },
       configureWebpack: {
         output: {
           library: `${packageName}-[name]`,
           libraryTarget: "umd",
         },
       },
     };
     ```

3. 其他
