import { _ls as ls, _vueY as vueY } from "@/spring/base";
import perm from "./perm";
import { Routes } from "@/spring/core";

/**
 * 菜单管理
 */
class MenuManage {
    constructor() {
        vueY.set("spring__AccessMenu", _ =>
            this._accessMenu(_["spring__permission"])
        );
    }

    _mapMenu(routes) {
        return routes.map(r => {
            var target = Object.assign({}, r);
            if (target.hideChildren && target.children) {
                delete target["children"];
            }

            return target;
        });
    }

    _filterMenu(routes) {
        return routes.filter(r => {
            if (r.hidden) return false;

            if (r.meta) {
                let { permission, action } = r.meta;
                if (permission && !perm.hasPermission(permission, action)) {
                    return false;
                }
            }

            return true;
        });
    }

    _findMenu(routes) {
        var newRoutes = this._mapMenu(routes);
        newRoutes = this._filterMenu(newRoutes);

        for (var r of newRoutes) {
            if (r.children) {
                r.children = this._findMenu(r.children);
            }
        }

        return newRoutes;
    }

    _accessMenu(permission) {
        return this._findMenu(Routes);
    }

    get AccessMenu() {
        return vueY["spring__AccessMenu"];
    }
}

export default new MenuManage();
