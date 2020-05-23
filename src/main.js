/**
 * 启动项配置
 */

import App from "./app";

/**********************功能模块配置**********************/
import SpringX from "./spring";

import System from "@/views/System";
import Demo from "@/views/demo";

const spring = new SpringX();

spring
    .use([System, Demo])
    .setup({
        el: "#app",
        render: h => h(App)
    });
