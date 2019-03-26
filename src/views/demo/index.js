export default {
    route: {
        layout: "/",
        routeConfig: [
            {
                path: "/demo",
                component: resolve => {
                    require(["./Demo"], resolve);
                }
            }
        ]
    }
};
