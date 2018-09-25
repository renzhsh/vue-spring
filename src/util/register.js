import Vue from 'vue';

/**
 * 将函数注册到Vue对象中
 * @param {object} context 
 */
function register(context) {
    deepRegister(Vue, context);
}

function deepRegister(target, source) {
    for (var k in source) {
        if (typeof source[k] === 'object') {
            deepRegister(target, source[k]);
        } else {
            target.prototype['$$' + k] = source[k];
        }
    }
};

export default {
    install(Vue, options) {
        Vue.prototype.$$register = register;
        Vue.$$register = register;
    }
}