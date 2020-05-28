export class Cookies {
    constructor() {
        this.defaultConfig = {
            expires: '1d',
            path: '; path=/'
        };
    }

    /**
     * 
     * @param {*} expireTimes 默认1d
     * @param {*} path 默认'/'。 注意：// 哈希模式下：域名/projectName/#/aaaa 默认为 '/projectName'。 域名/projectName#/aaaa 默认为 '/'。确认 #号前面是否有'/'。
     */
    config(expireTimes, path) {
        if (expireTimes) {
            this.defaultConfig.expires = expireTimes;
        }
        if (path === '') {
            this.defaultConfig.path = '';
        } else {
            this.defaultConfig.path = '; path=' + path;
        }
    }

    /**
     * 
     * @param {*} key 
     */
    get(key) {
        var value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null

        if (value && value.startsWith("{") && value.endsWith("}")) {
            try {
                value = JSON.parse(value)
            } catch (e) {
                return value;
            }
        }
        return value;
    }

    /**
     * 
     * @param {*} key cookie名
     * @param {*} value  cookie值, 会自动帮你把对象转为string 
     * @param {*} expireTimes  cookie有效时间，默认时间为1d。可以为到期时间点(expire=) [Date]，也可以为有效时间段单位s(max-age=)[Number]，传入Infinity||-1被认该cookie永久有效，传入0 会被判断为false导致取默认值，传入非-1 的负数会立即删除该cookie。
     * @param {*} path cookie所在目录，默认 '/' 根目录
     * @param {*} domain cookie所在的域，默认为请求地址
     * @param {*} secure 如果一个cookie被设置了Secure=true，那么这个cookie只能用https协议发送给服务器，用http协议不发送。
     */
    set(key, value, expireTimes, path, domain, secure) {
        if (!key) {
            throw new Error("cookie name is not find in first argument")
        } else if (/^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            throw new Error("cookie key name illegality ,Cannot be set to ['expires','max-age','path','domain','secure']\t", "current key name: " + key);
        }
        // support json object
        if (value && value.constructor === Object) {
            value = JSON.stringify(value);
        }
        var _expires = "; max-age=86400"; // temp value, default expire time for 1 day
        expireTimes = expireTimes || this.defaultConfig.expires;
        if (expireTimes) {
            switch (expireTimes.constructor) {
                case Number:
                    if (expireTimes === Infinity || expireTimes === -1) _expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                    else _expires = "; max-age=" + expireTimes;
                    break;
                case String:
                    if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes)) {
                        // get capture number group
                        var _expireTime = expireTimes.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, "$1");
                        // get capture type group , to lower case
                        switch (expireTimes.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                            // Frequency sorting
                            case 'm': _expires = "; max-age=" + +_expireTime * 2592000; break; // 60 * 60 * 24 * 30
                            case 'd': _expires = "; max-age=" + +_expireTime * 86400; break; // 60 * 60 * 24
                            case 'h': _expires = "; max-age=" + +_expireTime * 3600; break; // 60 * 60
                            case 'min': _expires = "; max-age=" + +_expireTime * 60; break; // 60
                            case 's': _expires = "; max-age=" + _expireTime; break;
                            case 'y': _expires = "; max-age=" + +_expireTime * 31104000; break; // 60 * 60 * 24 * 30 * 12
                            default: new Error("unknown exception of 'set operation'");
                        }
                    } else {
                        _expires = "; expires=" + expireTimes;
                    }
                    break;
                case Date:
                    _expires = "; expires=" + expireTimes.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + _expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : this.defaultConfig.path) + (secure ? "; secure" : "");
        return this;
    }

    /**
     * 
     * @param {*} key 
     * @param {*} path 
     * @param {*} domain 
     */
    remove(key, path, domain) {
        if (!key || !this.isKey(key)) {
            return false;
        }
        document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : this.defaultConfig.path);
        return this;
    }

    /**
     * 是否有key cookie
     * @param {*} key 
     */
    has(key) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }

    /**
     * 
     */
    keys() {
        if (!document.cookie) return [];
        var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var _index = 0; _index < _keys.length; _index++) {
            _keys[_index] = decodeURIComponent(_keys[_index]);
        }
        return _keys;
    }
}