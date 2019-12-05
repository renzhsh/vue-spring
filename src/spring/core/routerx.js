import Vue from "vue";
import VueRouter from "vue-router";
import { context } from "@/spring/base";
import routeManage from "./routes";
Vue.use(VueRouter);

// router 对象是否已注册
let registered = false;

class RouterX {
    constructor() {
        context.router = new VueRouter({
            routes: []
        });
    }

    setup(option) {
        context.router = new VueRouter(option);
        if (option.routes && Array.isArray(option.routes)) {
            routeManage.AddRoutes(
                {
                    routeConfig: option.routes
                },
                true
            );
        }
        return this;
    }

    addRoutes(routes) {
        context.router.addRoutes(routes);
        routeManage.AddRoutes(
            {
                routeConfig: routes
            },
            true
        );
        return this;
    }

    useRoute({ route }) {
        if (registered) {
            throw "It's invalid that register routeConfig into vue after object router is created";
        }
        routeManage.AddRoutes(route);
        return this;
    }

    register() {
        context.router.addRoutes(routeManage.UnregRoutes);
        registered = true;
        return this;
    }
}

const routerX = new RouterX();

export default {
    install(SpringX, Vue, useFn, startFn) {
        SpringX.prototype.routerx = routerX;

        SpringX.prototype.setRouter = function(fn) {
            return SpringX.prototype.set("routerx", fn);
        };

        useFn.route = ele => {
            routerX.useRoute(ele);
        };
        startFn.push(() => {
            routerX.register();
        });
    }
};
