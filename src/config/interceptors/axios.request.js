import qs from 'qs';

export default {
    name: "axios.request",
    fn: (Vue, context) => {
        // 添加请求拦截器
        context.axios.interceptors.request.use(function(config) {

            // 对于简单请求的跨域访问，浏览器默认先发送options请求判断是否允许跨域
            // 设置该头部，标识该访问不是简单请求
            config.headers["Content-Type"] = "application/x-www-form-urlencoded";

            if (Vue.$User.Logined) {
                if (config.url.indexOf('arcgis/rest/services') == -1) {
                    config.headers["Authorization"] = "bearer " + Vue.$User.AccessToken;
                }
            }

            config.transformRequest = [function(data) {
                return qs.stringify(data);
            }];

            // 在发送请求之前做些什么
            return config;
        }, function(error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });
    }
}