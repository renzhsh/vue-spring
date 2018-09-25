let DataList = {};

export default class {
    constructor(userStore) {
        this.userStore = userStore;
        this.ready = true;
    }

    get(key) {
        let entry = DataList[key];

        return entry ? entry.value : null;
    }

    get EntryArray() {
        let list = [];

        for (var key in DataList) {
            let entry = DataList[key];

            if (entry.type == 'cache') {
                list.push(entry);
            } else {
                let item = this.userStore.get(key);
                let expired = item ? item.expired : null;

                list.push(Object.assign({}, entry, {
                    expired: expired.date2String()
                }));
            }
        }

        return list;
    }
    /**
     * 内存数据
     */
    setEntry(key, value, meta) {
        DataList[key] = {
            key: key,
            value: value,
            type: 'cache',
            meta: meta
        };
    }

    removeEntry(key) {
        delete DataList[key];
    }

    /**
     * disk数据
     */
    async setLocalEntry({ key, expired, remoteFn, meta }) {
        if (!(remoteFn instanceof Function)) {
            throw `remoteFn of '${key}' is not a valid function`;
        }

        let entry = {
            key: key,
            type: 'disk',
            value: null,
            expired: expired,
            remoteFn: remoteFn,
            meta: meta
        };

        DataList[key] = entry;

        let item = this.userStore.get(key);

        // 已过期 或 30分钟内过期
        if (!item || (item && item.expired < (new Date()).addMinutes(30))) {
            this.ready = false;
            entry.value = await remoteFn();
            this.userStore.set(key, entry.value, expired);
        } else {
            entry.value = item.value;
        }

        if (!this.ready) {
            let exists = false;
            for (var p in DataList) {
                if (DataList[p] === null) {
                    exists = true;
                }
            }

            this.ready = !exists;
        }

    }

    async updateLocalEntry(key) {
        let entry = DataList[key];

        if (entry.type == 'disk') {
            entry.value = await entry.remoteFn();
            this.userStore.set(key, entry.value, entry.expired);
        }
    }
}