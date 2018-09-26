/**
 * 启动项配置
 */
import Vue from 'vue'

/**********************第三方插件*************************/
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

/**********************自定义插件*************************/

/**********************功能模块配置**********************/
import Spring from './spring'

import System from '@/views/System'

// 拦截器
import interceptors from './config/interceptors'

// 用户数据
import userDatas from './config/userData';

Spring
    .set('routerx', (routerX) => {
        // routerX
        //     .initialize({})
        //     .useRoute(Layout.route)
    })
    .set('oauth2', (OAuth2) => {
        OAuth2.setup({
            // Token路径
            TokenPath: '/OAuth/Token',
            // 客户端 Id
            ClientId: '123456',
            // 客户端密钥
            ClientSecret: 'abcdef',
        });
    })
    .set('interceptor', (itcpt) => {
        // itcpt.addInterceptor(interceptors)
    })
    .set('userData', userData => {
        userData.setLocalEntryArray(userDatas)
    })
    .use([System])
    .mount('#app');