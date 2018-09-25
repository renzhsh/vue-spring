# Vue Spring 简介

在一个常规的前后端（Frontend for Backends）程序中，我们需要使用 VueRouter、Vuex，有时需要注册全局 API 或者注册插件等。
基本上这些信息都是散落在各个模块内部的，没有统一的一个配置文件。在模块调整的时候，需要修改多处的代码。VueConfig 就是
为了解决这个问题的。

Vue Spring 提供了 VueRouter、Vuex、全局 API、Vue 组件和菜单项等内容的配置管理功能，以模块为单位注册到 Vue 系统实例中。
Vue Spring 的最大优势在于划清了模块之间的界限，新增和删除模块时修改少量的配置代码即可完成。

参考：
[模块配置规范](./docs/specification.md)
[Spring 扩展](./docs/springx-extent.md)

# 安装 spring

```js
npm install spring
```

# 导入

```js
import Spring from "spring";
```

<!-- # 添加引用
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Vuex from 'vuex';
Vue.use(Vuex);
``` -->

# 使用

## 1. 模块开发

参考[模块配置规范](./docs/specification.md)配置模块

## 2. 在 vue 实例初始化之前注册模块

```js
import System from "@/views/System";
Spring.use(System);
```

## 3. 配置并启动

```js
Spring.set("routerx", routerX => {
    // routerX 初始化设置
    //routerX
    // .initialize(...)
    // .addRoutes(...)
})
    .use([System])
    .mount("#app"); // 挂载到dom, Spring/Vue实例正式启动
```
