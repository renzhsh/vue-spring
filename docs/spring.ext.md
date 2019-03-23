# Spring 模块开发

## 1、扩展方式

```
import { SpringX } from 'spring';
import RouterX from './routerx';

SpringX.use(RouterX);
```

## 2、模块定义

```
export default {
    install: function(SpringX, Vue, useFn, startFn) {

        SpringX.prototype.routerx = routerX;
        useFn.route = (ele) => {
            routerX.useRoute(ele);
        }
        startFn.push(() => {
            routerX.register();
        })
    }
}
```

### 2.1 每个模块单独配置

```
SpringX.prototype.routerx = routerX;
```

在 SpringX 的原型链中扩展`routerx`,方便 RouterX 模块的单独配置：

```
Spring
    .set('routerx', (routerX) => {
        // routerX的函数返回this,可以链式调用
        routerX
            .initialize(...)
            .useRoute(...)
    })
```

### 2.2 给模块添加扩展

```
useFn.route = (ele) => {
            routerX.useRoute(ele);
        }
```

扩展完成后，可以这样调用：

```
Spring.use(CustomModule)
```

如果`CustomModule`满足如下的定义，则`routerX.useRoute(CustomModule)`被执行。

```
{
    route:{}
}
```

### 2.3 启动函数

```
startFn.push(() => {
            routerX.register();
        })
```

在创建 Vue 实例之前，`routerX.register()`会被执行。
