export default {
    scrollBehavior() {
        return {top: 0};
    },

    routes: (_routes) => [
        {
            name: "home",
            path: "/",
            component: () => import('~/app/views/home/index').then((r: any) => r.default || r)
        },
        {
            name: "chat-thread",
            path: "/thread/:id",
            component: () => import('~/app/views/home/index').then((r: any) => r.default || r)
        }
    ]
};
