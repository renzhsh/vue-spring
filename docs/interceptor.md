# 拦截器(interceptor)

对 router 路由的跳转和 axios 的请求做些拦截处理。

## 基本使用

```js
// 拦截器配置文件 index.js

export default {
    name: "router.auth",
    fn: (Vue, context) => {}
};
```

注入到系统中：

```js
import RouterAuth from "index.js";

// main.js
spring.set("interceptor", itcpt => {
    itcpt.addHook(RouterAuth);
});

// 或者
spring.setHook((itcpt, context) => {
    itcpt.addHook(RouterAuth);
});
```
