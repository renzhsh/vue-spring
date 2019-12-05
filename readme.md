# Vue Spring

在一个常规的前后端（Frontend for Backends）程序中，我们需要使用 VueRouter、Vuex，有时需要注册 API 或者注册插件等，
这些信息都是在全局性文件中进行配置的。这种全局性配置在大型项目中缺点就体现出来了，配置项多，维护困难。

Vue Spring 采用了分而治之的思想，将这些配置项划分成各个模块，并注册到 Vue 系统实例中，开发者只需维护自己关心的模块即可。

## Usage

```js
import SpringX from "vue-spring";

// 按照spring规范封装好的模块
import System from "@/views/System";

import App from "./App";

const spring = new SpringX();

spring.use(System).setup({
    el: "#app",
    render: h => h(App)
});
```

请参考 [Spring 文档](./docs/readme.md)
