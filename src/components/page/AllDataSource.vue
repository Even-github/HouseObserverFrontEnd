<template>
    <div class="table">
        <div class="handle-box">
            <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
            <el-input v-model="select_word" placeholder="搜索关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
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
                    <!--<el-button size="small"-->
                               <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
                url: 'http://localhost:8081/admin/spider_data_source/getData',
                delUrl: 'http://localhost:8081/admin/spider_data_source/delData',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
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
                    // if(!is_del){
                    //     if(d.type.indexOf(self.select_cate) > -1 &&
                    //         (d.source_name.indexOf(self.select_word) > -1 ||
                    //             d.type.indexOf(self.select_word) > -1)
                    //     ){
                    //         return d;
                    //     }
                    // }
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
            // handleEdit(index, row) {
            //     this.$message('编辑第'+(index+1)+'行');
            // },
            handleDelete(index, row) {
                let self = this;
                self.$axios.get(self.delUrl, {params:{ids: row.id}})
                    .then((res) => {
                        if (res.data.success == true) {
                            this.$message('删除第'+(index+1)+'行成功!');
                            self.getData();
                        } else {
                            this.$message.error('删除第'+(index+1)+'行失败!');
                        }
                    })
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                let ida = new Array();
                for (let i = 0; i < length; i++) {
                    ida.push(self.multipleSelection[i].id)
                }
                self.$axios.get(self.delUrl, {params:{ids: ida.toString()}})
                    .then((res) => {
                        if (res.data.success == true) {
                            this.$message('批量删除成功!');
                            self.getData();
                        } else {
                            this.$message.error('删除失败!');
                        }
                    })
                self.multipleSelection = [];
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
