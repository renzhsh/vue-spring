export default {
    route: {
        routeConfig: [{
            path: '/',
            component: resolve => {
                require(['./Main'], resolve);
            },
            meta:{
                permission:['control']
            }
        }]
    }
}