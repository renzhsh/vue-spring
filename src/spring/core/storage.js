function expireParse(expired) {
    let item = {
        year: 0,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
    };

    if (!expired) {
        this.item['y'] = 9999;
    }
    if (typeof expired == 'string' && expired.length) {
        let arrs = expired.split(':');
        arrs.forEach(arr => {
            let num = parseInt(arr) || 0;
            let word = arr[arr.length - 1];
            switch (word) {
                case 'y':
                    item['year'] = num;
                    break;
                case 'M':
                    item['month'] = num;
                    break;
                case 'd':
                    item['day'] = num;
                    break;
                case 'h':
                    item['hour'] = num;
                    break;
                case 'm':
                    item['minute'] = num;
                    break;
                case 's':
                    item['second'] = num;
                    break;
            }
        })
    }

    return item;
}

class Storage {
    constructor(_prefix) {
        this.store = window.localStorage;
        this.prefix = _prefix;
    }
    set(key, value, expired) {

        let exp = expireParse(expired);
        
        let item = {
            key: key,
            value: value,
            expired: (expired instanceof Date ? expired : (new Date()).expire(exp)).date2String()
        }

        this.store.setItem(this.prefix + key, JSON.stringify(item));
    }
    get(key) {
        if (!key) {
            throw new Error('没有找到key。');
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。');
        }
        let value = null;
        let item = JSON.parse(this.store.getItem(this.prefix + key));
        if (item !== null) {
            item.expired = Date.string2Date(item.expired);
            // 有效期内
            if (item.expired > new Date()) {
                value = item;
            } else {
                this.remove(key);
            }
        }

        return value;
    }
    remove(key) {
        this.store.removeItem(this.prefix + key);
    }
}

function StorageFactory(prefix) {
    return new Storage(prefix || 'local_');
}

export default {
    install(SpringX, Vue, useFn, startFn, context) {
        Vue.storageFactory = StorageFactory;
        context.storageFactory = StorageFactory;
    }
}

export { StorageFactory };