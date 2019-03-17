import Vue from 'vue';
import VueRouter from 'vue-router';
import context from './context';
import output from '../utils/output';
Vue.use(VueRouter);

let Routes = [];

const m = new Map();

// router 对象是否已注册
let registered = false;

function mutation(routeConfig) {
    routeConfig.forEach(element => {
        if (!m.has(element.path)) {
            m.set(element.path, element);
        } else {
            output.error(`use Route Failed! Duplicate registration of path:${element.path}`)
        }
        if (Array.isArray(element.children)) {
            mutation(element.children)
        }
    });
}

function useRoute({ layout, routeConfig }) {
    if (registered) {
        output.warning("It's invalid that register routeConfig into vue after object router is created")
    }
    if (!routeConfig) return;
    routeConfig = Array.isArray(routeConfig) ? routeConfig : [routeConfig];
    if (layout) {
        if (!m.has(layout)) {
            throw `use Route Failed! not found component where path is '${layout}'`
        }

        let current = m.get(layout);
        if (current.children === undefined) {
            current.children = [];
        }

        current.children = [...current.children, ...routeConfig];
    } else {
        Routes = [...Routes, ...routeConfig];
    }

    mutation(routeConfig)
}

class RouterX {
    constructor() {
        context.router = new VueRouter({
            routes: []
        });
    }

    setup(option) {
        context.router = new VueRouter(option);
        return this;
    }

    addRoutes(routes) {
        context.router.addRoutes(routes);
        return this;
    }

    useRoute({ route }) {
        useRoute(route);
        return this;
    }

    register() {
        context.router.addRoutes(Routes)
        registered = true;
        return this;
    }
}

const routerX = new RouterX();

export default {
    install(SpringX, Vue, useFn, startFn) {

        SpringX.prototype.routerx = routerX;
        useFn.route = (ele) => {
            routerX.useRoute(ele);
        }
        startFn.push(() => {
            routerX.register();
        })
    }
}
