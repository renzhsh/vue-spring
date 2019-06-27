import { _ls as ls, _vueY as vueY } from "@spring/base";

function isString(str) {
    return typeof str == "string" && str.constructor == String;
}

class Permission {
    constructor() {
        let token = ls.get("AccessToken", null),
            permission = ls.get("Permission", null);

        vueY.set("spring__token", token);
        vueY.set("spring__permission", permission);
    }

    setToken(token) {
        ls.set("AccessToken", token, 24 * 60 * 60 * 1000); //expiry 1 day
        vueY.set("spring__token", token);
    }

    setPermission(permission) {
        ls.set("Permission", permission, 24 * 60 * 60 * 1000); //expiry 1 day
        vueY.set("spring__permission", permission);
        this.map = undefined;
    }

    clear() {
        ls.remove("AccessToken");
        ls.remove("Permission");
        vueY.set("spring__token", null);
        vueY.set("spring__permission", null);
        this.map = undefined;
    }

    isLogined() {
        if (ls.get("AccessToken", false)) {
            return true;
        } else {
            return false;
        }
    }

    getToken() {
        return ls.get("AccessToken", null);
    }

    loadMap() {
        let permission = ls.get("Permission", null);
        if (permission === null) return;
        this.map = new Map();

        for (let p of permission) {
            let actions = p.actions.map(act =>
                isString(act) ? act.toUpperCase() : ""
            );

            if (!isString(p.key)) {
                console.error("permisson must be string");
                continue;
            }

            let key = p.key.toUpperCase();

            this.map.set(key, actions);
        }
    }

    /**
     * permission @string
     * action @Array
     */
    hasPermission(permission, action = []) {
        if (this.map === undefined) {
            this.loadMap();
        }

        if (!isString(permission)) {
            throw "in hasPermission: permission must be string";
        }

        let key = permission.toUpperCase();
        if (!this.map.has(key)) {
            return false;
        }

        if (action && Array.isArray(action) && action.length >= 0) {
            let actionInPerm = this.map.get(key);

            let actionResult = 0;

            for (var act of action) {
                if (actionInPerm.indexOf(act.toUpperCase()) > -1) {
                    actionResult++;
                }
            }

            if (actionResult < action.length) {
                return false;
            }
        }

        return true;
    }
}

export default new Permission();
