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

或者

```js
spring.setRouter((routerX, context) => {
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

## 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

参考[router 路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

```js
const Foo = () => import('./Foo.vue')

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```
