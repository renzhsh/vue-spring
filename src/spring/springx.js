import Vue from "vue";

import { context } from "@/spring/base";

let springXStartFn = [];
let springXUseFn = {};

context.Vue = Vue;

export class SpringX {
    set(name, fn) {
        if (this[name]) {
            fn(this[name], context);
        }
        return this;
    }

    /**
     *
     * @param {*} { install, route, vuex }
     */
    use(plugin) {
        let plugins = [];
        if (plugin instanceof Array) {
            plugins = [...plugin];
        } else {
            plugins = [plugin];
        }

        plugins.forEach(p => {
            p.install && Vue.use(p);
            for (var useFn in springXUseFn) {
                p[useFn] && springXUseFn[useFn](p);
            }
        });

        return this;
    }

    beforeSetup(fn) {
        fn && springXStartFn.push(fn);

        return this;
    }

    setup(option) {
        springXStartFn.forEach(fn => {
            fn(context);
        });

        new Vue(
            Object.assign({}, option, {
                router: context.router,
                store: context.store
            })
        );
        return this;
    }
}

SpringX.use = module => {
    module.install &&
        module.install(SpringX, Vue, springXUseFn, springXStartFn, context);
};
