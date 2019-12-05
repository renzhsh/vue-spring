# Vue Spring 文档

在一个常规的前后端（Frontend for Backends）程序中，我们需要使用 VueRouter、Vuex，有时需要注册 API 或者注册插件等，
这些信息都是在全局性文件中进行配置的。这种全局性配置在大型项目中缺点就体现出来了，配置项多，维护困难。

Vue Spring 采用了分而治之的思想，将这些配置项划分成各个模块，并注册到 Vue 系统实例中，开发者只需维护自己关心的模块即可。

## 基本使用

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

## API

#### `SpringX()` 构造函数

#### `spring.use(option)`

通过`spring.use()`方法注入 vue 插件，配置路由列表和 store 项等

#### `spring.set(name, fn)`

通过`spring.set()`方法对模块的初始化进行配置

#### `spring.setup(option)`

通过`spring.setup()`方法对 Vue 的系统实例进行配置。`option`中可以包含 vue 的生命周期钩子函数，mixin、指令等。

### 模块配置示例

vue 插件开发参考[vue 插件](https://cn.vuejs.org/v2/guide/plugins.html)

```js
// system模块 index.js
{
    // vue插件
    install: (Vue, option) => {},
    // 路由配置
    route: {
        routeConfig: [
            {
                path: "/",
                component: resolve => {
                    require(["./Main"], resolve);
                }
            },
            {
                path: "/home",
                component: resolve => {
                    require(["./Home"], resolve);
                }
            }
        ];
    }

}
```

```js
// 用户管理模块 index.js
{
    // 路由配置
    route: {
        layout:'/', // 父组件路径
        routeConfig: [
            {
                path: "/user",
                component: resolve => {
                    require(["./User"], resolve);
                }
            }
        ];
    },
    vuex:{

    }
}
```

```js
// 系统入口 main.js
import System from "@/views/System";
import User from "@/views/User";

const spring = new SpringX();

spring.use([System, User]);
```
