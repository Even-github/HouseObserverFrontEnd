<template>
    <div class="table">
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column prop="name" label="数据源名称" width="180">
            </el-table-column>
            <el-table-column prop="count" label="数据量（条）" width="150">
            </el-table-column>
            <el-table-column prop="url" label="URL">
            </el-table-column>
            <el-table-column prop="spider" label="爬虫" width='250'>
            </el-table-column>
            <el-table-column label="操作" width='100'>
                <template scope="scope">
                    <el-button size="small"
                               @click="update(scope.$index, scope.row)">更新</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataUrl: this.$serverMainPath + 'admin/spider/getDataSourceInfo',
                scheduleUrl: this.$serverMainPath + 'admin/spider/scheduleBySpiderName',
                tableData: [],
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                self.$axios.get(self.dataUrl)
                    .then((res) => {
                        self.tableData = res.data.data;
                    })
            },
            update(index, row) {
                let self = this;
                self.$axios.get(self.scheduleUrl, {params:{spiderName:row.spider}})
                    .then((res) => {
                        if (res.data.data.status == 'ok') {
                            this.$message.success('已加入爬虫任务队列！');
                        } else {
                            this.$message.error('更新失败！');
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .handle-box{
        margin-bottom: 20px;
    }
    .handle-select{
        width: 120px;
    }
    .handle-input{
        width: 300px;
        display: inline-block;
    }
</style>
