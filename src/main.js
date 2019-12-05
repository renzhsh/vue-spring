/**
 * 启动项配置
 */
import Vue from "vue";

import App from "./app";

/**********************第三方插件*************************/

/**********************自定义插件*************************/

/**********************功能模块配置**********************/
import SpringX from "./spring";

import System from "@/views/system";
import Demo from "@/views/demo";

// 拦截器
import interceptors from "./config/interceptors";

// 用户数据
import userDatas from "./config/userData";

const spring = new SpringX();

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
    },
    {
        Name: "Control",
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

spring
    .setRouter((routerX, context) => {
        // console.dir(context);
    })
    .setStore((store, context) => {
        // console.dir(store);
    })
    .setHook((intcpt, context) => {
        // intcpt.addHook(interceptors);
    })
    .setAuth2(auth => {
        auth.setToken("xxx")
            .setPermission(
                perms,
                _ => {
                    return {
                        key: _.Name,
                        actions: _.Actions
                    };
                },
                _ => _.Name
            )
            .setup();
    })
    // .set("userData", userData => {
    //     userData.setLocalEntryArray(userDatas);
    // })
    .use([System, Demo])
    .beforeSetup(context => {
        // console.dir(context.routes);
    })
    .setup({
        el: "#app",
        render: h => h(App)
    });
