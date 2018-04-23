<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            const admin_path =  '/admin/';
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '1',
                        title: '数据源管理',
                        subs: [
                            {
                                index: admin_path + 'AllDataSource',
                                title: '所有数据源'
                            },
                            {
                                index: admin_path + 'CreateDataSource',
                                title: '新增数据源'
                            },
                            {
                                index: admin_path + 'UpdateDataSource',
                                title: '爬虫更新数据源'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '2',
                        title: '爬虫管理',
                        subs: [
                            {
                                index: admin_path + 'CreateSpiderJob',
                                title: '新建爬虫任务'
                            },
                            {
                                index: admin_path + 'SpiderMonitor',
                                title: '爬虫任务监控'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '3',
                        title: '楼盘数据管理',
                        subs: [
                            {
                                index: admin_path + 'AllHouseData',
                                title: '楼盘数据一览'
                            }
                        ]
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
        background-color: #235170;
    }
</style>
