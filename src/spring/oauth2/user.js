import axios from 'axios';
import qs from 'qs';
import store from './store';
import axiosConfig from './interceptor';

import { config } from './config';

function catchError(error) {
    if (error.response && error.response.status == 400) {
        switch (error.response.data.error) {
            case 'invalid_grant':
                console.error('用户名或密码不正确');
                throw '用户名或密码不正确';
            case 'invalid_client':
                console.error('非官方客户端，禁止登录');
                throw '非官方客户端，禁止登录';
        }
    }
}

export default class {
    /**
     * 客户端模式（client credentials）
     */
    async clientLogin() {
        let url = config.TokenPath;
        console.dir(url)
        let params = {
            grant_type: 'client_credentials',
            'client_id': config.ClientId,
            'client_secret': config.ClientSecret
        };

        try {
            let resp = await axios.post(url, params, axiosConfig);
            store.Token = resp.data;
        } catch (ex) {
            catchError(ex);
        }
    }

    /**
     * 密码模式（resource owner password credentials）
     */
    async passwordLogin(username, password) {
        try {
            let url = config.TokenPath;
            let params = {
                grant_type: 'password',
                'client_id': config.ClientId,
                'client_secret': config.ClientSecret,
                'username': username,
                'password': password
            };
            let resp = await axios.post(url, params, axiosConfig);
            store.Token = resp.data;

        } catch (ex) {
            catchError(ex);
        }
    }

    /**
     * 退出登录
     */
    logout() {
        store.Token = null;
    }

    /**
     * 用户注册
     * @param {*} username
     * @param {*} password
     */
    async register(username, password) {
        let url = config.RegisterPath;
        let params = {
            'username': username,
            'password': password
        };
        let resp = await axios.post(url + '?' + qs.stringify(params), {}, axiosConfig);
        if (!resp.data.Success) {
            throw resp.data.Message;
        }
    }

    /**
     * 修改密码
     * @param {*} oldPwd
     * @param {*} newPwd
     */
    async modifyPassword(oldPwd, newPwd) {
        let url = config.ModifyPasswordPath;
        let params = {
            'oldPwd': oldPwd,
            'newPwd': newPwd
        };
        let resp = await axios.put(url + '?' + qs.stringify(params), {}, Object.assign({}, axiosConfig, {
            headers: {
                Authorization: 'bearer ' + this.AccessToken
            }
        }));
        if (!resp.data.Success) {
            throw resp.data.Message;
        } else {
            store.Token = null;
        }
    }

    /**
     * 更新用户信息
     * @param {*} info
     */
    async modifyUserInfo(info) {
        let url = config.ModifyUserInfoPath;
        let resp = await axios.put(url, info, Object.assign({}, axiosConfig, {
            headers: {
                Authorization: 'bearer ' + this.AccessToken
            }
        }));
        if (!resp.data.Success) {
            throw resp.data.Message;
        } else {
            store.UserInfo = resp.data.Data;
        }
    }

    get AccessToken() {
        if (store.Token) {
            return store.Token.access_token;
        }
        return null;
    }

    get UserInfo() {
        return store.UserInfo;
    }

    get Logined() {
        return this.AccessToken != null;
    }
}