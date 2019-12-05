import UserData from "./userData";
import Loading from "./loading";
import { StorageFactory } from "@/spring/base";

class UserDataX {
    constructor(context) {
        this.router = context.router;
        this.userData = context.userData;
    }

    setLocalEntry(option) {
        this.userData.setLocalEntry(option);
        return this;
    }

    setLocalEntryArray(list) {
        list.forEach(item => {
            this.setLocalEntry(item);
        });

        return this;
    }

    injectLoadingPage(routeConfig) {
        if (routeConfig instanceof Object) {
            this.routes = [routeConfig];
        } else if (routeConfig instanceof Array) {
            this.routes = routeConfig;
        }

        this.routes &&
            this.routes.forEach(route => {
                Object.assign(route.meta, {
                    ignoreUserData: true
                });
            });

        return this;
    }

    startup() {
        this.router.addRoutes(
            this.routes || [
                {
                    name: "userDataLoading",
                    path: "/data/loading",
                    meta: {
                        ignoreAuth: true,
                        ignoreUserData: true
                    },
                    component: Loading
                    // component: resolve => {
                    //     require(['./loading'], resolve);
                    // }
                }
            ]
        );

        this.router.beforeEach((to, from, next) => {
            if (!to.meta.ignoreUserData && !this.userData.ready) {
                next({
                    name: "userDataLoading",
                    query: {
                        redirect: to.fullPath
                    } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                });
            } else {
                next();
            }
        });
    }
}

export default {
    install(SpringX, Vue, useFn, startFn, context) {
        let userStore = StorageFactory({ namespace: "_userData_" });
        let userData = new UserData(userStore);

        Vue.prototype.$userData = userData;
        Vue.$userData = userData;
        context.userData = userData;

        let userDataX = new UserDataX(context);
        SpringX.prototype.userData = userDataX;

        startFn.push(() => {
            userDataX.startup();
        });
    }
};
