# Http

## http Usage

参考[Axios中文文档](https://www.kancloud.cn/yunye/axios/234845)

```js
// 基本用法
import {http} from 'rzs-spring'

http.get(url);
http.post(url,data);
http.put(url,data);
http.delete(url);
```

```js
// 全局配置
spring.setHttp((factory, context)=>{
    factory.createHttp(option); // 参照axios 创建参数

    factory.$http.interceptors.request.use(); // 添加拦截器
    factory.$http.interceptors.response.use();
})
```

```js
// 创建新实例
import {HttpFactory} from 'rzs-spring'

let factory=new HttpFactory();
factory.createHttp(config); // 参照axios 创建参数
factory.$http.interceptors.request.use(); // 添加拦截器
factory.$http.interceptors.response.use();
```