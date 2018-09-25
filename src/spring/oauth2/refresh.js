import axios from 'axios';
import qs from 'qs';
import store from './store';
import axiosConfig from './interceptor';

import { config } from './config';

class Refresher {
    constructor() {
        this.running = false;
    }

    startup() {
        if (this.running) return;
        if (store.Token) {
            // 登录已超时，退出重新登录
            if (this.expireLeft() < 0) {
                store.Token = null;
            }
        }

        setInterval(() => {
            this.chkAndRefresh()
        }, 100 * 1000)
        this.running = true;
    }

    /**
     * token的有效期小于120秒,刷新token
     */
    chkAndRefresh() {
        if (store.Token && !this.tokenRefreshing && this.expireLeft() < 120) {
            this.tokenRefreshing = true;
            this.refresh_token().then((token) => {
                store.Token = token;
                this.tokenRefreshing = false;
            })
        }
    }

    refresh_token() {
        let url = config.TokenPath;
        let params = {
            grant_type: 'refresh_token',
            'client_id': config.ClientId,
            'client_secret': config.ClientSecret,
            'refresh_token': store.Token.refresh_token
        };
        return new Promise((resolve, reject) => {
            axios.post(url, params, axiosConfig).then((resp) => {
                resolve(resp.data);
            })
        });
    }

    /**
     * expire 剩余时间，单位：秒
     */
    expireLeft() {
        if (store.Token) {
            let expire = new Date(store.Token.expires),
                now = new Date();

            return (expire.getTime() - now.getTime()) / 1000;
        } else {
            return -1;
        }
    }
}

export default new Refresher();