import User from './user';
import refresher from './refresh'
import { defaultConfig } from './config';

const OAuth2 = {
    setup(_config) {
        Object.assign(defaultConfig, _config);
    },
    startup() {
        refresher.startup();
    }
}

export default {
    install(SpringX, Vue, useFn, startFn) {

        SpringX.prototype.oauth2 = OAuth2;

        let user = new User();
        Vue.prototype.$User = user;
        Vue.$User = user;

        startFn.push(() => {
            OAuth2.startup();
        })
    }
}