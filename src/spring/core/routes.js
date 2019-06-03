/**
 * 路由列表
 */
import { context } from "@spring/base";

export const Routes = []; // 路由
const RouteIndex = new Map(); // 路由索引
const RegIndex = new Map(); //已注册的路由索引

context.routes = Routes;

class RouteManage {
    /**
     * 添加路由
     * layout @string
     * routeConfig @[object, Array]
     * registered @Boolean 是否已注册到router
     */
    AddRoutes({ layout, routeConfig }, registered = false) {
        routeConfig = Array.isArray(routeConfig) ? routeConfig : [routeConfig];
        if (layout) {
            if (!RouteIndex.has(layout)) {
                throw `use Route Failed! not found component where path is '${layout}'`;
            }

            let current = RouteIndex.get(layout);
            if (current.children === undefined) {
                current.children = [];
            }

            current.children = [...current.children, ...routeConfig];
        } else {
            Routes.push(...routeConfig);
        }

        if (registered) {
            this._updateRegIndex(routeConfig);
        }

        this._updateIndex(routeConfig);
    }

    /**
     * 更新索引
     */
    _updateIndex(_routes) {
        _routes.forEach(element => {
            if (!RouteIndex.has(element.path)) {
                RouteIndex.set(element.path, element);
            } else {
                throw `AddRoutes Failed! Duplicate registration of path:${
                    element.path
                }`;
            }
            if (Array.isArray(element.children)) {
                this._updateIndex(element.children);
            }
        });
    }

    /**
     * 更新已注册的路由索引
     */
    _updateRegIndex(_routes) {
        _routes.forEach(element => {
            if (!RegIndex.has(element.path)) {
                RegIndex.set(element.path, element);
            }
            if (Array.isArray(element.children)) {
                this._updateRegIndex(element.children);
            }
        });
    }

    /**
     * 未注册的路由
     */
    get UnregRoutes() {
        return this._unregItem(Routes);
    }

    _unregItem(routes) {
        return routes.filter(r => {
            if (RegIndex.has(r.path)) return false;

            if (Array.isArray(r.children)) {
                r.children = this._unregItem(r.children);
            }
            return true;
        });
    }
}

export default new RouteManage();
