<template>
    <div>
        <h2>管理员登录密码管理</h2><hr style="margin: 10px 0px;">
        <div class="line-container">
            <h4>修改密码</h4>
        </div>
        <div class="line-container">
            <p>账号：{{id}}</p>
        </div>
        <div class="line-container">
            <p class="label">原密码：</p>
            <el-input
                class="pwd-input"
                type="password"
                placeholder="原密码"
                v-model="oldPwd"
                clearable>
            </el-input>
        </div>
        <div class="line-container">
            <p class="label">新密码：</p>
            <el-input
                class="pwd-input"
                type="password"
                placeholder="新密码"
                v-model="newPwd"
                clearable>
            </el-input>
        </div>
        <div class="line-container">
            <el-button type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5';

    export default {
        name: "update-pwd",
        data() {
            return {
                submitUrl: this.$serverMainPath + 'adminUser/updatePwd',
                getIdUrl: this.$serverMainPath + 'adminUser/getAdminUserId',
                id: '',
                olePwd: '',
                newPwd: ''
            }
        },
        mounted() {
            this.getId();
        },
        methods: {
            submit() {
                let self = this;
                self.$axios.get(self.submitUrl, {params:{oldPwd: md5(self.oldPwd), newPwd: md5(self.newPwd)}})
                    .then((res) => {
                        let result = res.data;
                        if (result.success == true) {
                            self.$message.success('修改成功！');
                        } else {
                            self.$message.error('修改失败,' + result.description);
                        }
                    });
            },
            getId() {
                let self = this;
                self.$axios.get(self.getIdUrl)
                    .then((res) => {
                        let resultData = res.data.data;
                        if (resultData) {
                            self.id = resultData;
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    .line-container {
        height: 38px;
        margin: 10px 0px;
    }

    .line-container p, .line-container h4 {
        line-height: 38px;
    }

    .label {
        float: left;
    }

    .pwd-input {
        float: left;
        width: 200px;
    }
</style>
