<template>
    <div class="table">
        <h2>爬虫任务监控</h2><hr style="margin: 10px 0px;">
        <h3 class="status-title" style="float:left">正在进行</h3>
        <el-button  @click="refresh" style="float:right">刷新</el-button>
        <el-table :data="this.running" border style="width: 100%">
            <el-table-column prop="id" label="任务编号" width="300">
            </el-table-column>
            <el-table-column prop="spider" label="爬虫" width="250">
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button size="small"
                               @click="cancelJob(scope.$index, scope.row)">取消任务</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h3 class="status-title">等待中</h3>
        <el-table :data="this.pending" border style="width: 100%">
            <el-table-column prop="id" label="任务编号" width="300">
            </el-table-column>
            <el-table-column prop="spider" label="爬虫">
            </el-table-column>
            <el-table-column label="操作"  width="100">
                <template scope="scope">
                    <el-button size="small"
                               @click="cancelJob(scope.$index, scope.row)">取消任务</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h3 class="status-title">已完成</h3>
        <el-table :data="this.finished" border style="width: 100%">
            <el-table-column prop="id" label="任务编号" width="300">
            </el-table-column>
            <el-table-column prop="spider" label="爬虫" width="250">
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listjobUrl: this.$serverMainPath + 'admin/spider/listjobs',
                cancelUrl: this.$serverMainPath + 'admin/spider/cancelJob',
                running: [],
                pending: [],
                finished: []
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
                self.$axios.get(self.listjobUrl)
                    .then((res) => {
                        self.running = res.data.data.running;
                        self.pending = res.data.data.pending;
                        self.finished = res.data.data.finished;
                    })
            },
            refresh() {
                let self = this;
                self.getData();
            },
            cancelJob(index, row) {
                let self = this;
                self.$axios.get(self.cancelUrl, {params:{id: row.id}})
                    .then((res) => {
                        if (res.data.data.status == 'ok') {
                            this.$message.success('任务'+ row.id +'已取消！');
                            self.getData();
                        } else {
                            this.$message.error('任务'+ row.id +'取消失败！');
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
    .status-title{
        margin: 10px 10px 10px 10px;
    }
</style>
