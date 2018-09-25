import Vue from 'vue';
import App from './app';

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

    mount(el) {
        springXStartFn.forEach(fn => {
            fn();
        })

        return new Vue({
            el: el,
            router: context.router,
            store: context.store,
            render: h => h(App)
        });
    };
}

SpringX.use = (module) => {
    module.install && module.install(SpringX, Vue, springXUseFn, springXStartFn, context);
}