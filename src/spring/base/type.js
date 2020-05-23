/**
 * 类型与非空判断
 */
export const types = {
    isArray(obj) {
        return typeof obj == "object" && obj.constructor == Array;
    },

    isString(str) {
        return typeof str == "string" && str.constructor == String;
    },

    isNumber(obj) {
        return typeof obj == "number" && obj.constructor == Number;
    },

    isDate(obj) {
        return typeof obj == "object" && obj.constructor == Date;
    },

    isFunction(obj) {
        return typeof obj == "function" && obj.constructor == Function;
    },

    isObject(obj) {
        return typeof obj == "object" && obj.constructor == Object;
    }
}
