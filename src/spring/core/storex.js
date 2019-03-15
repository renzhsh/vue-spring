import Vue from 'vue';
import Vuex from 'vuex';
import context from './context';
Vue.use(Vuex);

class StoreX {
    constructor() {
        context.store = new Vuex.Store({
            strict: process.env.NODE_ENV !== 'production'
        });
    }

    useStore({ vuex }) {
        if (!vuex.name || !vuex.config) return;
        context.store.registerModule(vuex.name, vuex.config)
    }
}

const store = new StoreX();

export default {
    install(SpringX, Vue, useFn, startFn) {
        SpringX.prototype.storex = store;
        useFn.vuex = (ele) => {
            store.useStore(ele)
        }
    }
}