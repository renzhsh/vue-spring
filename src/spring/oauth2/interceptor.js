import axios from 'axios';
import qs from 'qs';

export default {
    headers: {
        // 对于简单请求的跨域访问，浏览器默认先发送options请求判断是否允许跨域
        // 设置该头部，标识该访问不是简单请求
        'Content-Type': "application/x-www-form-urlencoded"
    },
    transformRequest: [function(data) {
        return qs.stringify(data);
    }]
}
