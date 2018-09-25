import context from '../core/context';
import Vue from 'vue';

class Interceptor {
    constructor() {
        this.items = [];
    }
    addInterceptor(ceptor) {
        let ceptors = [];
        if (ceptor instanceof Array) {
            ceptors = [...ceptor];
        } else if (ceptor instanceof Object) {
            ceptors = [ceptor];
        }
        this.items.push(...ceptors);
        ceptors.forEach(cpt => {
            if (cpt.fn instanceof Function) {
                cpt.fn(Vue, context);
            }
        })
        return this;
    }
}

const intcpt = new Interceptor();

export default {
    install(SpringX, Vue, useFn, startFn) {

        SpringX.prototype.interceptor = intcpt;
    }
}