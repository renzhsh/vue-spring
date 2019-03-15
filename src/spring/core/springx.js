import Vue from 'vue';

import context from './context';

let springXStartFn = [];
let springXUseFn = {};

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
        })

        return this;
    }

    mount(el, app) {
        springXStartFn.forEach(fn => {
            fn();
        })

        return new Vue({
            el: el,
            router: context.router,
            store: context.store,
            render: h => h(app)
        });
    };
}

SpringX.use = (module) => {
    module.install && module.install(SpringX, Vue, springXUseFn, springXStartFn, context);
}