const PERMISSION_ENUM = {
    add: { key: "add", label: "新增" },
    delete: { key: "delete", label: "删除" },
    edit: { key: "edit", label: "修改" },
    query: { key: "query", label: "查询" },
    get: { key: "get", label: "详情" },
    enable: { key: "enable", label: "启用" },
    disable: { key: "disable", label: "禁用" },
    import: { key: "import", label: "导入" },
    export: { key: "export", label: "导出" }
};

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 */

export default {
    install(Vue, { hasPermission, enableLog = false }) {
        Vue.directive("action", {
            bind: function(el, binding, vnode) {
                const permission = vnode.context.$route.meta.permission;
                if (permission === undefined || permission.length === 0) {
                    return;
                }
                const actionName = binding.arg;

                if (!hasPermission(permission, [actionName])) {
                    (el.parentNode && el.parentNode.removeChild(el)) ||
                        (el.style.display = "none");

                    if (enableLog) {
                        console.error(
                            `action: no permission (${permission}:${actionName}) on ${
                                vnode.context.$route.fullPath
                            }`
                        );
                    }
                }
            }
        });
    }
};
