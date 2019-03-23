# VueX

VueX 配置项

> 在`context`中注册对象`store`

## 基本示例

```js
// 用户管理模块 index.js
{
    // vuex配置
    vuex: {
        path:'myModule', // 注册模块myModule
        //path:['nested', 'myModule'], // 注册嵌套模块 `nested/myModule`
        config:{
            state,getter,mutation,action
        }
    }
}
```

```js
// 系统入口 main.js
import User from "@/views/User";

const spring = new SpringX();

spring.use(User);
```

vuex 的具体配置 参照[Vuex](https://vuex.vuejs.org/zh-cn/getting-started.html)

## VueX 初始化配置

可以通过如下方式，对 Vuex 的初始化进行配置：

```js
spring.set("vuex", (vuex, context) => {
    vuex.setup(option).registerModule(option);
});
```

或者：

```js
spring.setStore((vuex, context) => {
    vuex.setup(option).registerModule(option);
});
```

### routerX API

#### `1. vuex.setup(option)`

`vuex`的构造函数，具体参考[Vuex.Store 构造器选项](https://vuex.vuejs.org/zh/api/#vuex-store-%E6%9E%84%E9%80%A0%E5%99%A8%E9%80%89%E9%A1%B9)

示例：

```js
vuex.setup({
    state,
    mutations,
    actions
});
```

#### `2. vuex.registerModule(option)`

即方法[`vuex.registerModule`](https://vuex.vuejs.org/zh/api/#registermodule)
