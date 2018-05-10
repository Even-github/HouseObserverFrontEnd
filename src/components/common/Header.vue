<template>
    <div class="header">
        <div class="logo">全国房价爬虫管理系统</div>
        <p id="exit" @click="exit">退出</p>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                exitUrl: this.$serverMainPath + '/adminUser/exit',
                loginUrl: this.$rootPath + 'login',
            }
        },
        methods: {
            exit() {
                let self = this;
                self.$axios.get(self.exitUrl)
                    .then((res) => {
                        let result = res.data;
                        if (result.success == true) {
                            window.location.href = self.loginUrl;
                        }
                    })
            },
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background-color: #306486;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    #exit {
        font-size:14px;
        float:right;
        margin-right:20px;
        cursor:pointer;
    }
</style>
