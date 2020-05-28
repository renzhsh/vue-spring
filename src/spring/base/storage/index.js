import { WebStorage } from "./WebStorage";
import { Cookies } from './cookies';

// eslint-disable-next-line
const _global = typeof window !== "undefined" ? window : global || {};

export function StorageFactory({ namespace = "vuejs__", storage = "local" }) {
    if (storage && ["local", "session"].indexOf(storage) === -1) {
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

export const local = StorageFactory({ storage: "local" });
export const session = StorageFactory({ storage: "session" });
export const cookies = new Cookies();

export default {
    install(Spring, Vue) {
        Object.defineProperties(Vue, {
            $local: {
                get: function () {
                    return local;
                }
            },
            $session: {
                get: function () {
                    return session;
                }
            },
            $cookies: {
                get: function () {
                    return cookies;
                }
            }
        })

        Object.defineProperties(Vue.prototype, {
            $local: {
                get: function () {
                    return local;
                }
            },
            $session: {
                get: function () {
                    return session;
                }
            },
            $cookies: {
                get: function () {
                    return cookies;
                }
            }
        })
    }
};
