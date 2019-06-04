# VueY

VueX 的简化版。当属性发生变化时，动态更新所有的依赖项。

## VueY Usage

```js
import { vueY } from "rzs-spring";

vueY.set("xxx", this.num); // 单一值
vueY.set("yyy", _ => _["xxx"] + 5); // 计算函数

let y = vueY["yyy"]; // yyy依赖于xxx
```

## API

```js
import { VueY, vueY } from "rzs-spring";
```

> VueY 类
> vueY 实例

### set(key, value|function)

### vueY[key] 读取
