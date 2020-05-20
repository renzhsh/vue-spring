import { WebStorage } from "./WebStorage";

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

export const localStorage = StorageFactory({ storage: "local" });
export const sessionStorage = StorageFactory({ storage: "session" });

export default {

    install() { }

};
