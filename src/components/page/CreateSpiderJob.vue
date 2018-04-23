<template>
    <div class="table">
        <div class="handle-box">
            <el-input v-model="select_word" placeholder="搜索关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="source_name" label="数据源名称" width="130">
            </el-table-column>
            <el-table-column prop="type" label="类型" width="100">
            </el-table-column>
            <el-table-column prop="city" label="城市" width='100'>
            </el-table-column>
            <el-table-column prop="county" label="区/县" width='150'>
            </el-table-column>
            <el-table-column prop="url" label="详情地址">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button size="small"
                               @click="creatJob(scope.$index, scope.row)">创建任务</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="total_pages">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: this.$serverMainPath + 'admin/spider_data_source/getData',
                createUrl: this.$serverMainPath + 'admin/spider/scheduleByDataSourceId',
                tableData: [],
                cur_page: 1,
                select_word: '',
                del_list: [],
                is_search: false,
                total_pages: 0
            }
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.source_name === self.del_list[i].source_name){
                            is_del = true;
                            break;
                        }
                    }
                    return d;
                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                let keyword = '';
                if (self.is_search == true) {
                    keyword = self.select_word;
                }
                self.$axios.get(self.url, {params:{pageNum:self.cur_page,pageSize:9,keyword:keyword}})
                    .then((res) => {
                        self.tableData = res.data.data;
                        for (let i = 0; i < self.tableData.length; i++) {
                            if (self.tableData[i].type == "new") {
                                self.tableData[i].type = "新房";
                            } else {
                                self.tableData[i].type = "二手房";
                            }
                        }
                        self.total_pages = res.data.totalPage;
                    })
            },
            search(){
                let self = this;
                self.is_search = true;
                self.getData();
            },
            creatJob(index, row) {
                let self = this;
                self.$axios.get(self.createUrl, {params:{id: row.id}})
                    .then((res) => {
                        if (res.data.data.status == 'ok') {
                            this.$message.success('创建成功!任务编码：' + res.data.data.jobid);
                        } else {
                            this.$message.error('创建失败！');
                        }
                    })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
