let DataList = {};

export default class {
    constructor(userStore) {
        this.userStore = userStore;
        this.ready = true;
    }

    get(key) {
        return this.userStore.get(key);
    }

    get EntryKeys() {
        let list = [];

        for (var key in DataList) {
            list.push(key)
        }

        return list;
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
            value: null,
            expired: expired,
            remoteFn: remoteFn,
            meta: meta
        };

        DataList[key] = entry;

        let item = this.userStore.get(key);

        // 已过期 或 30分钟内过期
        if (!item || (item && item.expired < new Date() + 30 * 60 * 1000)) {
            this.ready = false;
            entry.value = await remoteFn();
            this.userStore.set(key, entry.value, expired);
        } else {
            entry.value = item.value;
        }

        // 是否所有数据项都已加载完成
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

        entry.value = await entry.remoteFn();
        this.userStore.set(key, entry.value, entry.expired);
    }
}
