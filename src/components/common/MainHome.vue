<template>
    <div class="main-page">
        <header class="home-header">
            <el-menu id="navigation" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <div id="logo">
                    <img src="../../assets/logo.png" />
                </div>
                <el-menu-item index="1"><a :href="index"><div>首页</div></a></el-menu-item>
                <el-menu-item index="2"><a :href="HousingMap"><div>全国房价</div></a></el-menu-item>
                <el-menu-item index="3"><a :href="ProvinceHousing"><div>省份房价</div></a></el-menu-item>
                <el-submenu index="4">
                    <template slot="title">城市房价</template>
                    <el-menu-item index="4-1"><a :href="CityHousing"><div>城市房价详情</div></a></el-menu-item>
                    <el-menu-item index="4-2"><a :href="CityContrast"><div>城市房价对比</div></a></el-menu-item>
                </el-submenu>
                <el-menu-item index="5"><a :href="login" target="_blank"><div>管理员登录</div></a></el-menu-item>
                <el-menu-item index="6"><a :href="about"><div>关于</div></a></el-menu-item>
            </el-menu>
        </header>
        <main class="home-main">
            <router-view></router-view>
        </main>
        <footer class="home-footer">
            <p id="footer_text">Copyright © 2017-2018 看房价 </p>
        </footer>
    </div>
</template>

<script>
    import index from "../../router";

    export default {
        name: "main-home",
        data() {
            return {
                activeIndex: '1',
                index: this.$mainPath + 'index',
                HousingMap: this.$mainPath + 'HousingMap',
                ProvinceHousing: this.$mainPath + 'ProvinceHousing',
                CityHousing: this.$mainPath + 'CityHousing',
                CityContrast: this.$mainPath + 'CityContrast',
                login: this.$rootPath + 'login',
                about: this.$mainPath + 'about',
            }
        },
        methods: {
            handleSelect(key) {
                let self = this
                self.activeIndex = key
            }
        },
    }
</script>

<style scoped>
    .main-page {
        width:100%;
        height:100%;
        overflow: scroll;
    }

    .home-header {
        background-color: #FFFFFF;
        height: 60px;
    }

    .el-menu-demo {
        border-bottom: #e0e2e5 2px solid;
    }

    .el-menu {
        background-color: #FFFFFF;
    }

    .home-main {
        background-color: #eef1f6;
        min-height: 600px;
    }
    .home-footer {
        background-color: #eef1f6;
        height: 60px;
        border-top: #e0e2e5 2px solid;
        background-color: #FFFFFF;
    }
    #logo {
        height: 60px;
        padding: 0px;
        margin-left: 200px;
        margin-right: 400px;
        float: left;
        z-index: 1;
    }

    #logo img {
        height: 60px;
    }

    #navigation {
        z-index: 999;
    }

    #footer_text {
        line-height: 60px;
        text-align: center;
    }

    .nav-a {
        height: 60px;
    }
</style>

