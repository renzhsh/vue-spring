import perm from "./perm";
import context from "../core/context";
import ErrorPage from "./errorPage";

export default class {
    constructor(enableLog = false) {
        this.enableLog = enableLog;

        this.lastRoute = undefined;
        this.lastCount = 0;
    }

    setup() {
        if (!context.router) {
            console.error("router not found! auth2 hook setup failed!");
            return;
        }

        context.router.addRoutes([
            {
                name: "auth-error",
                path: "/auth/error",
                meta: {
                    ignoreAuth: true
                },
                component: ErrorPage
            }
        ]);

        context.router.beforeEach((to, from, next) => {
            if (!this.lastRoute || this.lastRoute.fullPath !== to.fullPath) {
                this.lastRoute = to;
                this.lastCount = 1;
            } else {
                this.lastCount += 1;
            }
            if (this.lastCount > 3) {
                console.error("当前页面已进入死循环，请检查菜单和权限配置", to);
                next({ name: "auth-error" });
                return;
            }

            if (to.matched.length === 0) {
                if (this.enableLog) {
                    console.error(`router : no match route for `, to);
                }
                next({ name: "404" });
                return;
            }

            if (!perm.isLogined() && !to.meta.ignoreAuth) {
                if (this.enableLog) {
                    console.error("router : not logined");
                }
                next({ name: "login", query: { redirect: to.fullPath } });
                return;
            }

            let { permission, action = [] } = to.meta;
            if (permission === undefined) {
                next();
                return;
            }

            if (perm.hasPermission(permission, action)) {
                next();
                return;
            } else {
                if (this.enableLog) {
                    console.error(
                        `router : no permission on ${to.fullPath}`,
                        permission,
                        action
                    );
                }
                next({ name: "405" });
                return;
            }
        });
    }
}
