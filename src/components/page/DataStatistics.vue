<template>
    <div class="container">
        <h2>数据统计</h2><hr style="margin: 10px 0px;">
        <div class="line-container">
            <h4>请选定本次统计的时间范围</h4>
        </div>
        <div class="line-container">
            <p>开始时间（上一次统计时间）：{{beginTime}}</p>
        </div>
        <div class="line-container">
            <p id="endtime-label">截止时间：</p>
            <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker>
        </div>
        <div class="line-container">
            <el-button type="primary" class="handle-del mr10" id="statistic-btn" @click="statistics">开始统计</el-button>
            <i class="el-icon-loading" style="display:none;" id="loading-icon"></i>
        </div>
        <div class="line-container">
            <p class="attention">提示：统计的时间可能会比较长，请耐心等待。</p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                statisticsUrl: this.$serverMainPath + 'statisticsManager/statisticsAll',
                beginTimeUrl: this.$serverMainPath + 'statisticsLog/getLastStatisticsTime',
                stateUrl: this.$serverMainPath + 'statisticsManager/getStatisticsState',
                beginTime: '-',
                endTime: '',
                btnBasicClassName: ''
            }
        },
        mounted() {
            this.getLastStatisticsTime();
            this.getStatisticsState();
        },
        methods: {
            getLastStatisticsTime() {
                let self = this;
                self.$axios.get(self.beginTimeUrl)
                    .then((res) => {
                        let result = res.data.data;
                        if (result) {
                            self.beginTime = this.$timeFormat(result);
                        }
                    })
            },
            //检测统计程序是否正在运行
            getStatisticsState() {
                let self = this;
                self.$axios.get(self.stateUrl)
                    .then((res) => {
                        let result = res.data.data;
                        if (result == true) {
                            self.banBtn();
                        }
                    })
            },
            statistics() {
                let self = this;
                if (self.endTime) {
                    self.banBtn();
                    self.$axios.get(self.statisticsUrl, {params:{endTime: self.endTime / 1000}})
                        .then((res) => {
                            result = res.data;
                            if (result.success == 'success') {
                                self.$message.success('统计完成！');
                            } else {
                                if (result.description) {
                                    this.$message.error(result.description);
                                }
                            }
                            self.restoreBtn();
                        })
                } else {
                    this.$message.error('请选择截止时间！');
                }
            },
            banBtn() {
                let self = this;
                let btn = document.getElementById('statistic-btn');
                btn.setAttribute('disabled', 'disabled');
                self.btnBasicClassName = btn.className;
                btn.className = self.btnBasicClassName + ' is-disabled';
                btn.innerHTML = '正在统计';
                document.getElementById('loading-icon').style.display = '';
            },
            restoreBtn() {
                let self = this;
                let btn = document.getElementById('statistic-btn');
                btn.removeAttribute('disabled');
                btn.className = self.btnBasicClassName;
                btn.innerHTML = '开始统计';
                document.getElementById('loading-icon').style.display = 'none';
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

    #endtime-label{
        float:left;
    }
</style>
