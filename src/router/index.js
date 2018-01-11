import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [
                {
                    path: '/',
                    component: resolve => require(['../components/page/Index.vue'], resolve)
                },
                {
                    path: '/AllDataSource',
                    component: resolve => require(['../components/page/AllDataSource.vue'], resolve)
                },
                {
                    path: '/CreateDataSource',
                    component: resolve => require(['../components/page/CreateDataSource.vue'], resolve)
                },
                {
                    path: '/UpdateDataSource',
                    component: resolve => require(['../components/page/UpdateDataSource.vue'], resolve)
                },
                {
                    path: '/CreateSpiderJob',
                    component: resolve => require(['../components/page/CreateSpiderJob.vue'], resolve)
                },
                {
                    path: '/SpiderMonitor',
                    component: resolve => require(['../components/page/SpiderMonitor.vue'], resolve)
                },
                {
                    path: '/AllHouseData',
                    component: resolve => require(['../components/page/AllHouseData.vue'], resolve)
                }
            ]
        },
    ]
})
