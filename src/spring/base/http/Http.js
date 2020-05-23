import axios from "axios";

export default class Http {
    constructor(option = {}) {
        this.$http = axios.create(option);

        // 对于简单请求的跨域访问，浏览器默认先发送options请求判断是否允许跨域
        // 设置该头部，标识该访问不是简单请求
        this.$http.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";

        this.$http.interceptors.response.use(resp => {
            return resp.data;
        }, error => {
            return Promise.reject(error);
        });
    }

    /**
     * 创建新实例
     * @param {*} option 
     */
    newInstance(option = {}) {
        return new Http(option);
    }

    /**
     * 
     * @param {*} option 
     */
    setOption(option = {}) {
        this.$http = axios.create(option);
    }

    /**
     * 添加Header
     * @param {*} headers 对象|数组
     */
    setHeader(headers) {
        if (!Array.isArray(headers)) {
            headers = [headers];
        }

        headers.forEach(header => {
            for (var key in header) {
                if (header[key] === '' || header[key] === null || header[key] === undefined) {
                    delete this.$http.defaults.headers.common[key];
                }
                else {
                    this.$http.defaults.headers.common[key] = header[key];
                }
            }
        })
    }

    /**
     * 添加Token
     * @param {*} token 
     */
    addAuthToken(token) {
        this.$http.defaults.headers.common['Authorization'] = token;
    }

    removeAuthToken() {
        delete this.$http.defaults.headers.common['Authorization'];
    }

    beforeRequest(fn, errFn) {
        this.$http.interceptors.request.use(fn, errFn);
    }

    afterResponse(fn, errFn) {
        this.$http.interceptors.response.use(fn, errFn);
    }

    /**
     * 拦截器
     */
    get interceptors() {
        return this.$http.interceptors;
    }

    request(config) {
        return this.$http.request(config);
    }

    get(url, config = {}) {
        return this.$http.get(url, config);
    }

    head(url, config = {}) {
        return this.$http.head(url, config);
    }

    delete(url, config = {}) {
        return this.$http.delete(url, config);
    }

    post(url, data = {}, config = {}) {
        return this.$http.post(url, data, config);
    }

    put(url, data = {}, config = {}) {
        return this.$http.put(url, data, config);
    }

    patch(url, data = {}, config = {}) {
        return this.$http.patch(url, data, config);
    }
}