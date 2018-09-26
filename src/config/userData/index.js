import model from './model';
import axios from 'axios';

const NODE_ENV = process.env.NODE_ENV;

function getValue(url, fn) {
    axios.get(url).then(resp => {
        let data = resp.data;
        if (data.Success) {
            let value = null;
            if (data.Data && data.Data.Value) {
                value = JSON.parse(data.Data.Value);
            }
            fn(value);
        } else {
            throw data.Message;
        }
    })
}

export default [{
    key: 'General',
    expired: '2h',
    remoteFn: () => {
        return new Promise((resolve, reject) => {
            // 生产环境
            if (NODE_ENV === 'production') {
                getValue('/api/config?scope=Map&key=General', (value) => {
                    resolve(value);
                })
            } else {
                resolve(model['General']);
            }
        })
    },
    meta: {
        desc: '常规设置'
    }
}, {
    key: 'HDConfig',
    expired: '2h',
    remoteFn: () => {
        return new Promise((resolve, reject) => {
            // 生产环境
            if (NODE_ENV === 'production') {
                getValue('/api/config?scope=Map&key=HDConfig', (value) => {
                    resolve(value);
                })
            } else {
                resolve(model['HDConfig']);
            }
        })
    },
    meta: {
        desc: '高清数据底本'
    }
}, {
    key: 'KongweiConfig',
    expired: '2h',
    remoteFn: () => {
        return new Promise((resolve, reject) => {
            // 生产环境
            if (NODE_ENV === 'production') {
                getValue('/api/config?scope=Map&key=KongweiConfig', (value) => {
                    resolve(value);
                })
            } else {
                resolve(model['KongweiConfig']);
            }
        })
    },
    meta: {
        desc: '控违'
    }
}, {
    key: 'GuotuConfig',
    expired: '2h',
    remoteFn: () => {
        return new Promise((resolve, reject) => {
            // 生产环境
            if (process.env.NODE_ENV === 'production') {
                getValue('/api/config?scope=Map&key=GuotuConfig', (value) => {
                    resolve(value);
                })
            } else {
                resolve(model['GuotuConfig']);
            }
        })
    },
    meta: {
        desc: '国土监察'
    }
}, {
    key: 'ZqianConfig',
    expired: '2h',
    remoteFn: () => {
        return new Promise((resolve, reject) => {
            // 生产环境
            if (NODE_ENV === 'production') {
                getValue('/api/config?scope=Map&key=ZqianConfig', (value) => {
                    resolve(value);
                })
            } else {
                resolve(model['ZqianConfig']);
            }
        })
    },
    meta: {
        desc: '征迁'
    }
}, {
    key: 'DjianConfig',
    expired: '2h',
    remoteFn: () => {
        return new Promise((resolve, reject) => {
            // 生产环境
            if (NODE_ENV === 'production') {
                getValue('/api/config?scope=Map&key=DjianConfig', (value) => {
                    resolve(value);
                })
            } else {
                resolve(model['DjianConfig']);
            }
        })
    },
    meta: {
        desc: '党建'
    }
}, {
    key: 'ExpandConfig',
    expired: '2h',
    remoteFn: () => {
        return new Promise((resolve, reject) => {
            // 生产环境
            if (process.env.NODE_ENV === 'production') {
                getValue('/api/config?scope=Map&key=ExpandConfig', (value) => {
                    resolve(value);
                })
            } else {
                resolve(model['ExpandConfig']);
            }
        })
    },
    meta: {
        desc: '更多服务'
    }
}, {
    key: 'NaviMenus',
    expired: '2h',
    remoteFn: () => {
        return new Promise((resolve, reject) => {
            // 生产环境
            if (process.env.NODE_ENV === 'production') {
                getValue('/api/config?scope=Map&key=NaviMenus', (value) => {
                    if (value && value.menus) {
                        resolve(value.menus);
                    } else {
                        resolve([]);
                    }
                })
            } else {
                resolve(model['NaviMenus'].menus);
            }
        })
    },
    meta: {
        desc: '导航菜单'
    }
}]