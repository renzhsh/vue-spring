## router 规范

```js
{
    path: "/",
    name: 'main', // 唯一标识
    component: resolve => {
        require(["./Main"], resolve);
    },
    hidden: true, // 在菜单中不展示这个路由，包括子路由。
    hideChildren:true, // 在菜单中不展示子路由。
    meta: {
        title:'', // 菜单中的文本
        icon:'', // 菜单中的图标
        ignoreAuth: true, // 忽略登录
        permission: "control", // 访问该页面需要的权限
        action: ['add', 'update', 'delete'] //  访问该页面需要的action
    }
}
```


```js
// 启动
spring.setAuth2(auth => {
        auth.setup();
    })
```

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

```js
this.$auth2.AccessMenu
```