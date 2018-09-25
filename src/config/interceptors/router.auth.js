export default {
    name: "router.auth",
    fn: (Vue, context) => {
        // oauth认证
        context.router.beforeEach((to, from, next) => {
            // 判断该路由是否需要登录权限
            if (!to.meta.ignoreAuth && !Vue.$User.Logined) {
                next({
                    name: 'login',
                    query: {
                        redirect: to.fullPath
                    } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                });
            } else {
                next();
            }
        })
    }
}