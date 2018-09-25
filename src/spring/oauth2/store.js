import Vue from 'vue';
import storage from './storage';
import { config } from './config';

export default new Vue({
    data() {
        return {
            token: null
        }
    },
    created() {
        this.token = storage.get(config.TOKEN_KEY);
    },
    computed: {
        Token: {
            get: function() {
                return this.token;
            },
            set: function(token) {
                if (token) {
                    let expires = new Date();
                    expires.setSeconds(expires.getSeconds() + parseInt(token.expires_in));
                    storage.set(config.TOKEN_KEY, Object.assign({}, token, {
                        expires: expires
                    }));
                } else {
                    storage.remove(config.TOKEN_KEY);
                }

                this.token = storage.get(config.TOKEN_KEY);
            }
        },
        UserInfo: {
            get: function() {
                if (this.Token) {
                    var result = {};
                    let tokenKeys = ['access_token', 'expires_in', 'expires', 'refresh_token', 'token_type'];
                    for (var key in this.Token) {
                        if (tokenKeys.indexOf(key) == -1) {
                            result[key] = this.Token[key];
                        }
                    }
                    return result;
                } else {
                    return null;
                }
            },
            set: function(info) {
                this.Token = Object.assign({}, this.Token, info);
            }
        }
    }
});