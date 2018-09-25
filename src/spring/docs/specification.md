# 模块定义

模块定义包括下面3个部分，都是可选的。

```js
{
    install:{},
    vuex:{},
    route:{},
}

```

## install

```js
{
    install(Vue, option){

    }
}
```

参考 [vue 插件开发](https://cn.vuejs.org/v2/guide/plugins.html)

## vuex

```js
{
    name:string, // 命名空间
    config:{
        state,getter,mutation,action
    }
}
```

config 的具体配置参考 [Vuex](https://vuex.vuejs.org/zh-cn/getting-started.html)

## route

```js
{
    layout:string, // 布局页面的路径
    routeConfig:{} | []
}
```

示例：

```js
{
    route: {
        layout: '/',
        routeConfig: [{
            path: '/userlist',
            component: UserList
        }, {
            path: '/user',
            component: User
        }]
    }
}
```

routeConfig 的具体配置 参照[Router 构造配置](https://router.vuejs.org/zh-cn/api/options.html#routes)
