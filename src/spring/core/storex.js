import Vue from "vue";
import Vuex from "vuex";
import context from "./context";
Vue.use(Vuex);

class StoreX {
    constructor() {
        context.store = new Vuex.Store({
            strict: process.env.NODE_ENV !== "production"
        });
    }

    setup(option) {
        context.store = new Vuex.Store(option);
        return this;
    }

    registerModule({ vuex }) {
        if (!vuex.path || !vuex.module) return;
        context.store.registerModule(vuex.path, vuex.module);
    }
}

const store = new StoreX();

export default {
    install(SpringX, Vue, useFn, startFn) {
        SpringX.prototype.storex = store;
        useFn.vuex = ele => {
            store.registerModule(ele);
        };
    }
};
