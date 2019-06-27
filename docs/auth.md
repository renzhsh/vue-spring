# Auth

访问授权管理

## 路由配置规范

```js
{
    path: "/", // [必填项]
    name: 'main', // [必填项] 唯一标识
    component: resolve => {
        require(["./Main"], resolve);
    },
    hidden: true, // 在菜单中不展示这个路由，包括子路由。
    hideChildren:true, // 在菜单中不展示子路由。
    meta: {
        title:'', // [必填项] 菜单中的文本
        icon:'', // [必填项] 菜单中的图标
        ignoreAuth: true, // 无需登录即可访问
        permission: "control", // 访问该页面需要的权限, 大小写不敏感
        action: ['add', 'update', 'delete'] //  访问该页面需要的action, 大小写不敏感
    }
}
```

## 启动设置

```js
spring.setAuth2((auth, context) => {
    auth.setup();
    //auth.setup(true); 打印鉴权日志
});
```

## auth 实例

```js
// 在vue内部
this.$auth2;
```

### API

#### setToken(token) // http 请求 Token

#### setPermission(permisson,fn1,fn2) // 设置权限列表
> fn1, fn2:permisson的格式化函数，默认``_=>_``

```js
// 设置权限
const perms = [
    {
        Name: "table",
        Actions: [
            {
                Name: "Add"
            },
            {
                Name: "Delete"
            },
            {
                Name: "Update"
            }
        ]
    }
];

this.$auth2.setPermission(perms,
                _ => {
                    return {
                        key: _.Name,
                        actions: _.Actions
                    };
                },
                _ => _.Name);
```
#### clear() 用户注销后，调用该函数。清除token和权限

#### isLogined() 判断用户是否登录（依据是否设置token）,返回true | false

#### hasPermission(permission, action = []) 判断是否有权限

#### AccessMenu 可访问的菜单列表。剔除无权限和隐藏的菜单。

#### Token 获取AccessToken, 如果为空则返回null

### action 指令
```html
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 ```