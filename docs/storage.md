# Storage Usage

Storage 对`localStorage`和`sessionStorage`的基本方法进行了封装，并额外提供了基于内存的`memoryStorage`。
Storage 提供了工厂函数`StorageFactory`, 具体的使用方式如下。

> 在`context`中注册对象`ls`和`ss`

## 示例

```js
import { StorageFactory } from "rzs-spring";

const ls = StorageFactory({ storage: "local" }); // localStorage

ls.set("foo", "boo");

ls.set("foo", "boo", 60 * 60 * 1000); //expiry 1 hour

ls.get("foo");

ls.get("boo", 10); //if not set boo returned default 10

ls.on("foo", callback); //watch change foo key and triggered callback

ls.off("foo", callback); //unwatch
```

Spring 提供了默认的 storage: `ls`(localStorage) 和 `ss`(sessionStorage), 可以通过以下方式访问：

```js
// 全局访问
import {_ls, _ss} from 'rzs-spring';
_ls;
_ss;

// Vue实例内
this.$ls;
this.$ss;

```

## API

#### `StorageFactory({ namespace = "vuejs\_\_", storage = "local" })

创建 Storage 对象。

-   参数`namespace` 命名空间，存储键的前缀
-   参数`storage` 取值`local`、`session`、`memory`, 分别对应`localStorage`、`sessionStorage`、`memoryStorage`

#### `ls.get(name, def)`

Returns value under `name` in storage. Internally parses the value from JSON before returning it.

-   `def`: default null, returned if not set `name`.

#### `ls.set(name, value, expire)`

Persists `value` under `name` in storage. Internally converts the `value` to JSON.

-   `expire`: default null, life time in milliseconds `name`

#### `ls.remove(name)`

Removes `name` from storage. Returns `true` if the property was successfully deleted, and `false` otherwise.

#### `ls.clear()`

Clears storage.

#### `ls.on(name, callback)`

Listen for changes persisted against `name` on other tabs. Triggers `callback` when a change occurs, passing the following arguments.

-   `newValue`: the current value for `name` in storage, parsed from the persisted JSON
-   `oldValue`: the old value for `name` in storage, parsed from the persisted JSON
-   `url`: the url for the tab where the modification came from

#### `ls.off(name, callback)`

Removes a listener previously attached with `ls.on(name, callback)`.
