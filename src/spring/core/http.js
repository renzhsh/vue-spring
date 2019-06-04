import axios from "axios";

export class HttpFactory {
    constructor() {
        this.createHttp();
    }
    createHttp(option = {}) {
        this._http = axios.create(option);
    }

    get $http() {
        return this._http;
    }
}

const factory = new HttpFactory();

export const http = factory.$http;

export default {
    install(SpringX, Vue, useFn, startFn) {
        SpringX.prototype.httpFactory = factory;

        SpringX.prototype.setHttp = function(fn) {
            return SpringX.prototype.set("httpFactory", fn);
        };
    }
};
