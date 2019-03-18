import { MemoryStorage } from "./MemoryStorage";
import { WebStorage } from "./WebStorage";

// eslint-disable-next-line
const _global = typeof window !== "undefined" ? window : global || {};

export function StorageFactory({ namespace = "vuejs__", storage = "local" }) {
    if (storage && ["memory", "local", "session"].indexOf(storage) === -1) {
        throw new Error(`Vue-ls: Storage "${storage}" is not supported`);
    }

    let store = null;

    switch (storage) {
        case "local":
            store = "localStorage" in _global ? _global.localStorage : null;
            break;

        case "session":
            store = "sessionStorage" in _global ? _global.sessionStorage : null;
            break;
        case "memory":
            store = MemoryStorage;
            break;
    }

    if (!store) {
        store = MemoryStorage;
        // eslint-disable-next-line
        console.error(
            `Vue-ls: Storage "${
                _options.storage
            }" is not supported your system, use memory storage`
        );
    }

    const ws = new WebStorage(store);

    ws.type = storage;

    ws.setOptions(
        Object.assign(ws.options, {
            namespace: namespace
        })
    );

    return ws;
}

_global.StorageFactory = StorageFactory;

export default {
    /**
     *
     */
    install(SpringX, Vue, useFn, startFn, context) {
        const ls = StorageFactory({ storage: "local" });
        const ss = StorageFactory({ storage: "session" });

        context.ls = ls;
        context.ss = ss;

        Vue.$ls = ls;
        Vue.$ss = ss;

        Object.defineProperty(Vue.prototype, "$ls", {
            /**
             * Define $ls property
             *
             * @return {WebStorage}
             */
            get() {
                return ls;
            }
        });

        Object.defineProperty(Vue.prototype, "$ss", {
            /**
             * Define $ls property
             *
             * @return {WebStorage}
             */
            get() {
                return ss;
            }
        });
    }
};
