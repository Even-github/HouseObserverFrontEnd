<template>
    <div id="container">
        <div id="search_container">
            <el-input v-model="search_word" placeholder="搜索省份" class="handle-input mr10"></el-input>
            <el-button id="search_button" type="primary" icon="search" @click="search(search_word)">搜索</el-button>
        </div>
        <div id="content_container" style="display: none">
            <h2>{{province}}最新房价</h2><hr>
            <div id="new-Price-container">
                <table id="new-Price">
                    <tr style="height: 50px;vertical-align: bottom;">
                        <td style="font-size: 30px;color: green;">{{provinceAveragePrice}}元/平方米</td>
                        <td style="font-size: 30px;color: blue">{{provinceRate}}%</td>
                        <td style="font-size: 30px">{{statisticsTime}}</td>
                    </tr>
                    <tr style="font-size: 14px;color: gray;vertical-align: top;">
                        <td>平均房价</td>
                        <td>周增长率</td>
                        <td>更新时间</td>
                    </tr>
                </table>
            </div>
            <h2>{{province}}房价趋势</h2><hr>
            <div id="tendency-chart"></div>
            <h2>{{province}}热门城市房价情况</h2><hr>
            <div id="city-table">
                <el-table
                    :data="tableData"
                    stripe=true
                    :default-sort = "{prop: 'averagePrice', order: 'descending'}"
                    style="width: 100%">
                    <el-table-column
                        prop="city"
                        label="城市"
                        width="320px">
                    </el-table-column>
                    <el-table-column
                        prop="averagePrice"
                        label="平均房价"
                        sortable
                        width="180">
                    </el-table-column>
                    <el-table-column
                        class="rate"
                        prop="weekGrowthRate"
                        sortable
                        label="周变化率">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div id="empty" style="display: none;">
            <p style="text-align: center;color: grey">暂无该省的相关数据</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "province-housing",
        data() {
            return {
                url: this.$serverMainPath + 'province/getProvincePriceInfo',
                search_word: '',
                province: '',
                provinceAveragePrice: '',
                provinceRate: '',
                statisticsTime: '',
                timeList: [],
                priceList: [],
                tableData: []
            }
        },
        methods: {
            search(search_word) {
                let self = this;
                self.$axios.get(self.url, {params:{province:search_word}})
                    .then((res) => {
                        document.getElementById('search_container').style.marginTop = '10px';
                        let resultData = res.data.data;
                        if(resultData.provinceNewPriceInfo) {
                            document.getElementById('content_container').style.display = '';
                            document.getElementById('empty').style.display = 'none';
                            let provincePriceInfo = resultData.provinceNewPriceInfo;
                            let provinceNewPriceChart = resultData.provinceNewPriceChart;
                            self.province = provincePriceInfo.province;
                            self.provinceAveragePrice = provincePriceInfo.averagePrice.toFixed(2);
                            self.provinceRate = provincePriceInfo.weekGrowthRate.toFixed(2);
                            self.statisticsTime = self.$timeFormat(provincePriceInfo.statisticalTime);
                            self.timeList = provinceNewPriceChart.timeList;
                            self.priceList = provinceNewPriceChart.priceList;
                            self.tableData = resultData.cityPriceInfoList;
                            self.dataFormat();
                            self.drawLine();
                        } else {
                            document.getElementById('content_container').style.display = 'none'
                            document.getElementById('empty').style.display = ''
                        }
                    })
            },
            drawLine() {
                let tendency = this.$echarts.init(document.getElementById('tendency-chart'))
                tendency.setOption({
                    title: {
                        text: this.province + '房价趋势图',
                        left: 'center'
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis'
                    },
                    xAxis: {
                        name: '时间',
                        type: 'category',
                        data: this.timeList
                    },
                    yAxis: {
                        name: '平均价格（元）',
                        type: 'value'
                    },
                    series: [{
                        data: this.priceList,
                        type: 'line'
                    }]
                })
            },
            dataFormat() {
                let self = this;
                for (let i = 0; i < self.timeList.length; i++) {
                    self.timeList[i] = self.$timeFormat(self.timeList[i]);
                }
                for (let i = 0; i < self.priceList.length; i++) {
                    self.priceList[i] = self.priceList[i].toFixed(2);
                }
                for (let i = 0; i < self.tableData.length; i++) {
                    self.tableData[i].averagePrice = self.tableData[i].averagePrice.toFixed(2);
                    self.tableData[i].weekGrowthRate = self.tableData[i].weekGrowthRate.toFixed(2);
                }
            }
        }
    }
</script>

<style scoped>
    #container {
        margin: auto;
        width: 900px;
        min-height: 500px;
    }

    #search_container {
        width: 900px;
        height: 30px;
        margin: 200px auto 40px auto;
    }

    #content_container {
        width: 900px;
        height: auto;
    }

    .handle-input {
        width: 800px;
        margin-right: 10px;
    }

    .handle-input, #search_button{
        float: left;
    }

    #new-Price-container {
        margin-bottom: 30px;
    }

    #content_container {
        width: 900px;
    }

    #tendency-chart {
        margin: 20px auto;
        width: 900px;
        height: 400px;
    }

    #city-table {
        margin: 20px auto;
        width: 800px;
        height: auto;
    }

    #new-Price, #new-Price tr{
        width: 900px;
    }

    #new-Price tr {
        text-align: center;
    }
</style>
