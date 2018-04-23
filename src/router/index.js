import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/admin',
            component: resolve => require(['../components/common/AdminHome.vue'], resolve),
            children: [
                {
                    path: 'index',
                    component: resolve => require(['../components/page/AdminIndex.vue'], resolve)
                },
                {
                    path: 'AllDataSource',
                    component: resolve => require(['../components/page/AllDataSource.vue'], resolve)
                },
                {
                    path: 'CreateDataSource',
                    component: resolve => require(['../components/page/CreateDataSource.vue'], resolve)
                },
                {
                    path: 'UpdateDataSource',
                    component: resolve => require(['../components/page/UpdateDataSource.vue'], resolve)
                },
                {
                    path: 'CreateSpiderJob',
                    component: resolve => require(['../components/page/CreateSpiderJob.vue'], resolve)
                },
                {
                    path: 'SpiderMonitor',
                    component: resolve => require(['../components/page/SpiderMonitor.vue'], resolve)
                },
                {
                    path: 'AllHouseData',
                    component: resolve => require(['../components/page/AllHouseData.vue'], resolve)
                }
            ]
        },
        {
            path: '/main',
            component: resolve => require(['../components/common/MainHome.vue'], resolve),
            children: [
                {
                    path: 'index',
                    component: resolve => require(['../components/page/MainIndex.vue'], resolve)
                },
                {
                    path: 'housingMap',
                    component: resolve => require(['../components/page/HousingMap.vue'], resolve)
                },
                {
                    path: 'provinceHousing',
                    component: resolve => require(['../components/page/ProvinceHousing.vue'], resolve)
                },
                {
                    path: 'cityHousing',
                    component: resolve => require(['../components/page/CityHousing.vue'], resolve)
                },
                {
                    path: 'about',
                    component: resolve => require(['../components/page/About.vue'], resolve)
                },
            ]
        }
    ]
})
