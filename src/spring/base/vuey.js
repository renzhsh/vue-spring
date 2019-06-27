import Vue from "vue";

export class VueY {
    constructor() {
        this.state = new Vue({
            data() {
                return {
                    obj: {}
                };
            }
        });
    }

    /**
     * @example set('key',111) || set('key', _=>_['key']+1)
     * @param {*} key
     * @param {*} value
     */
    set(key, value) {
        if (typeof value === "function") {
            if (Object.getOwnPropertyNames(this).indexOf(key) > -1) {
                throw `in vueY: Cannot redefine property: ${key}`;
            }
            Object.defineProperty(this, key, {
                get: () => {
                    return value(this);
                }
            });
        } else {
            this.state.$set(this.state.obj, key, value);
            if (Object.getOwnPropertyNames(this).indexOf(key) == -1) {
                Object.defineProperty(this, key, {
                    get: function() {
                        return this.state.obj[key];
                    }
                });
            }
        }
    }
}

export const _vueY = new VueY();
