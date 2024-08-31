export default {
    scrollBehavior() {
        return {top: 0};
    },

    routes: (_routes) => [
        {
            name: "home",
            path: "/",
            component: () => import('~/app/views/home/index').then((r: any) => r.default || r)
        }
    ]
};
