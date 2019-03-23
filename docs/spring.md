# Spring Usage

## 基本使用

```js
import SpringX from "rzs-spring";

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
