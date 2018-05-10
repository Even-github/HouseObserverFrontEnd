<template>
    <div>
        <h2>网站介绍管理</h2><hr style="margin: 10px 0px;">
        <quill-editor id="about-editor" v-model="content">
        </quill-editor>
        <el-button type="primary" class="handle-del mr10" id="submit-btn" @click="submit">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: "about-editor",
        data() {
            return {
                contentUrl: this.$serverMainPath + 'about/getAbout',
                submitUrl: this.$serverMainPath + 'about/submitAbout',
                id: '',
                content: ''
            }
        },
        mounted() {
          this.getContent();
        },
        methods: {
            getContent() {
                let self = this;
                self.$axios.get(self.contentUrl)
                    .then((res) => {
                        let result = res.data.data;
                        if (result) {
                            self.id = result.id;
                            self.content = result.content;
                        }
                    });
            },
            submit() {
                let self = this;
                self.$axios.get(self.submitUrl, {params:{id: self.id, content: self.content}})
                    .then((res) => {
                        let result = res.data;
                        if (result.success == true) {
                            self.$message.success('提交成功！');
                        } else {
                            self.$message.error('提价失败！');
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    #about-editor {
        height: 420px;
    }
</style>

<style>
    .ql-container {
        min-height: 200px;
        height: 350px !important;
    }
</style>
