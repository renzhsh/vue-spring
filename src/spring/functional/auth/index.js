import Perm from "./perm";
import RouterHook from "./hook";
import RouteAction from "./action";
import MenuManage from "./menu";
import Vue from "vue";

class Authorization {
    setToken(token) {
        Perm.setToken(token);
        return this;
    }

    setPermission(perms, permFn = _ => _, actionFn = _ => _) {
        var permission = perms.map(p => {
            var perm = permFn(p);
            if (perm.actions === undefined) {
                perm.actions = [];
            }
            if (!Array.isArray(perm.actions)) {
                console.error("auth2: action must be array!");
                perm.actions = [];
            }

            perm.actions = perm.actions.map(act => actionFn(act));

            return perm;
        });
        Perm.setPermission(permission);
        return this;
    }

    clear() {
        Perm.clear();
        return this;
    }

    isLogined() {
        return Perm.isLogined();
    }

    hasPermission(permission, action = []) {
        return Perm.hasPermission(permission, action);
    }

    setup(enableLog = false) {
        this.hook = new RouterHook(enableLog);
        this.hook.setup();

        Vue.use(RouteAction, {
            hasPermission: (permission, action) => {
                return Perm.hasPermission(permission, action);
            },
            enableLog: enableLog
        });
    }
}

Object.defineProperties(Authorization.prototype, {
    AccessMenu: {
        get: function() {
            return MenuManage.AccessMenu;
        }
    },
    Token: {
        get: function() {
            return Perm.getToken();
        }
    }
});

export default {
    install(SpringX, Vue, useFn, startFn, context) {
        var auth2 = new Authorization();

        Object.defineProperties(SpringX.prototype, {
            $auth2: {
                get: function get() {
                    return auth2;
                }
            }
        });

        SpringX.prototype.setAuth2 = function(fn) {
            return SpringX.prototype.set("$auth2", fn);
        };

        Object.defineProperties(Vue.prototype, {
            $auth2: {
                get: function get() {
                    return auth2;
                }
            }
        });
    }
};
