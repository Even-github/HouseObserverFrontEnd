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
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: '1',
                        title: '数据源管理',
                        subs: [
                            {
                                index: 'AllDataSource',
                                title: '所有数据源'
                            },
                            {
                                index: 'CreateDataSource',
                                title: '新增数据源'
                            },
                            {
                                index: 'UpdateDataSource',
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
                                index: 'CreateSpiderJob',
                                title: '新建爬虫任务'
                            },
                            {
                                index: 'SpiderMonitor',
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
                                index: 'AllHouseData',
                                title: '楼盘数据一览'
                            }
                        ]
                    }

                    // {
                    //     icon: 'el-icon-date',
                    //     index: 'readme',
                    //     title: '自述'
                    // },
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: '2',
                    //     title: '表格',
                    //     subs: [
                    //         {
                    //             index: 'basetable',
                    //             title: '基础表格'
                    //         },
                    //         {
                    //             index: 'vuetable',
                    //             title: 'Vue表格组件'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-date',
                    //     index: '3',
                    //     title: '表单',
                    //     subs: [
                    //         {
                    //             index: 'baseform',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             index: 'vueeditor',
                    //             title: '编辑器'
                    //         },
                    //         {
                    //             index: 'markdown',
                    //             title: 'markdown'
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'basecharts',
                    //     title: '图表'
                    // },
                    // {
                    //     icon: 'el-icon-upload2',
                    //     index: 'drag',
                    //     title: '拖拽'
                    // }
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
