<template>
    <div class="login-wrap">
        <div class="ms-title">全国房价爬虫管理系统</div>
        <div class="ms-login">
            <el-form :model="userInfo" :rules="rules" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="id">
                    <el-input v-model="userInfo.id" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="password" placeholder="密码" v-model="userInfo.pwd"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5';

    export default {
        data() {
            return {
                loginUrl: this.$serverMainPath + 'adminUser/login',
                userInfo: {
                    id: '',
                    pwd: ''
                },
                rules: {
                    id: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            login() {
                let self = this;
                self.userInfo.pwd = md5(self.userInfo.pwd);
                self.$axios.get(self.loginUrl, {params:self.userInfo})
                    .then((res) => {
                        let result = res.data;
                        if (result.success == true) {
                            window.location.href = self.$adminPath + 'index';
                        } else {
                            self.$message.error(result.description);
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        background-image: url("../../../static/img/login-background.jpg");
        background-position: center;
        background-attachment: fixed;
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
