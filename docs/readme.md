# Vue Spring 文档

在一个常规的前后端（Frontend for Backends）程序中，我们需要使用 VueRouter、Vuex，有时需要注册 API 或者注册插件等，
这些信息都是在全局性文件中进行配置的。这种全局性配置在大型项目中缺点就体现出来了，配置项多，维护困难。

Vue Spring 采用了分而治之的思想，将这些配置项划分成各个模块，并注册到 Vue 系统实例中，开发者只需维护自己关心的模块即可。

## 功能点

-   [SpringX 的使用](./spring.md)
-   [Storage](./storage.md)
-   [RouteX](./router.md)
-   [VueX](./vuex.md)
-   [拦截器](./interceptor.md)
-   ~~userData~~
-   ~~oauth2~~
-   [SpringX 模块开发](./spring.ext.md)

## 目录结构

```
├─build                   # webpack 编译工具
├─config                  # webpack 配置
├─dist                    # 编译生成目录
├─docs                    # 文档
├─node_modules
├─src
│    ├─config
│    ├─spring             # spring 源码
│    │    ├─core          # 核心模块
│    │    │   ├─routex
│    │    │   ├─sprinx
│    │    │   └─storex
│    │    ├─interceptor   # 拦截器
│    │    ├─oauth2
│    │    ├─others        # npm包配置
│    │    ├─storage       # Storage
│    │    └─userData      # userData
│    ├─util
│    ├─views              # 业务视图
│    │    └─System        # System模块
│    ├─app.Vue
│    ├─main.js
│    └─vendors.js         # 对大文件进行优化
├─static                  # 静态文件目录，webpack 直接复制到dist目录
└─index.html
```
