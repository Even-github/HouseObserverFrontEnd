<template>
    <div>
        <div class="form-box">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="数据源" prop="source_name">
                    <el-input v-model="form.source_name"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio label="新房"></el-radio>
                        <el-radio label="二手房"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="城市" prop="city">
                    <el-input v-model="form.city"></el-input>
                </el-form-item>
                <el-form-item label="区/县" prop="county">
                    <el-input v-model="form.county"></el-input>
                </el-form-item>
                <el-form-item label="URL" prop="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    source_name: '',
                    type: '新房',
                    city: '',
                    county: '',
                    url: ''
                },
                rules: {
                    source_name: [
                        {required: true, message: '请输入数据源', trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: '请输入城市', trigger: 'blur'}
                    ],
                    county: [
                        {required: true, message: '请输入区/县', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入URL', trigger: 'blur'}
                    ]
                },
                submitUrl: 'http://localhost:8081/admin/spider_data_source/insert'
            }
        },
        methods: {
            onSubmit() {
                let self = this;
                if (self.form.type == "新房") {
                    self.form.type = "new";
                } else {
                    self.form.type = "used";
                }
                // self.$axios.get(self.submitUrl, {params:self.form})
                self.$axios.post(self.submitUrl, self.form)
                    .then((res) => {
                        if (res.data.success == true) {
                            this.$message.success('提交成功！');
                        } else {
                            this.$message.error('提交失败!');
                        }
                    })
            }
        }
    }
</script>
