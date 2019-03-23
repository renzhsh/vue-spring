# Router

Router 配置项

> 在`context`中注册对象`router`

## 基本示例

```js
// 用户管理模块 index.js
{
    // 路由配置
    route: {
        layout:'/', // 父组件路径,可选项
        routeConfig: [
            {
                path: "/user",
                component: resolve => {
                    require(["./User"], resolve);
                }
            }
        ];
    }
}
```

```js
// 系统入口 main.js
import User from "@/views/User";

const spring = new SpringX();

spring.use(User);
```

routeConfig 的具体配置 参照[Router 构造配置](https://router.vuejs.org/zh-cn/api/options.html#routes)

## Router 初始化配置

可以通过如下方式，对 Router 的初始化进行配置：

```js
spring.set("routerx", (routerX, context) => {
    routerX.setup(option).addRoutes(option);
});
```

### routerX API

#### `1. routerx.setup(option)`

`Router`的构造函数，具体参考[Router 构建选项](https://router.vuejs.org/zh/api/#router-%E6%9E%84%E5%BB%BA%E9%80%89%E9%A1%B9)

示例：

```js
routerx.setup({
    mode: "hash",
    base: "/app",
    scrollBehavior: () => {}
});
```

#### `2. routerx.addRoutes(option)`

即方法[`router.addRoutes`](https://router.vuejs.org/zh/api/#router-addroutes)
