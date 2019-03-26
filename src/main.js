/**
 * 启动项配置
 */
import Vue from "vue";

import App from "./app";

/**********************第三方插件*************************/
// element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

/**********************自定义插件*************************/

/**********************功能模块配置**********************/
import SpringX from "./spring";

import System from "@/views/System";
import Demo from "@/views/Demo";

// 拦截器
import interceptors from "./config/interceptors";

// 用户数据
import userDatas from "./config/userData";

const spring = new SpringX();

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
    .set("oauth2", OAuth2 => {
        OAuth2.setup({
            // Token路径
            TokenPath: "/OAuth/Token",
            // 客户端 Id
            ClientId: "123456",
            // 客户端密钥
            ClientSecret: "abcdef"
        });
    })
    .set("userData", userData => {
        userData.setLocalEntryArray(userDatas);
    })
    .use([System, Demo])
    .beforeSetup(context => {
        console.dir(context.routes);
    })
    .setup({
        el: "#app",
        render: h => h(App)
    });
