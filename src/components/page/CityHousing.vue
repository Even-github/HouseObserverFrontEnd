<template>
    <div id="container">
        <div id="search_container">
            <el-input v-model="search_word" placeholder="搜索城市" class="handle-input mr10"></el-input>
            <el-button id="search_button" type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <div id="content_container" style="display: none;">
            <h2>{{city}}最新房价</h2><hr>
            <div id="new-prize-container">
                <table id="new-prize">
                    <tr style="height: 50px;vertical-align: bottom;">
                        <td style="font-size: 30px;color: green;">{{totalAveragePrize}}元/平方米</td>
                        <td style="font-size: 30px;color: green;">{{newAveragePrize}}元/平方米</td>
                        <td style="font-size: 30px;color: green;">{{usedAveragePrize}}元/平方米</td>
                    </tr>
                    <tr class="prize-label">
                        <td>平均房价</td>
                        <td>新房平均房价</td>
                        <td>二手房平均房价</td>
                    </tr>
                    <tr style="height: 50px;vertical-align: bottom;">
                        <td style="font-size: 30px;color: green;">{{cityRate}}%</td>
                        <td style="font-size: 30px;color: green;">{{statisticsTime}}</td>
                    </tr>
                    <tr class="prize-label">
                        <td>周变化率</td>
                        <td>统计时间</td>
                    </tr>
                </table>
            </div>
            <h2>{{city}}房价趋势</h2><hr>
            <div id="tendency-chart"></div>
            <h2>{{city}}区域房价情况</h2><hr>
            <div id="city-table">
                <el-table
                    :data="tableData"
                    stripe=true
                    :default-sort = "{prop: 'averagePrice', order: 'descending'}"
                    style="width: 100%">
                    <el-table-column
                        prop="county"
                        label="地区"
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
                    <el-table-column
                        prop="statisticalTime"
                        label="更新时间"
                        sortable>
                    </el-table-column>
                </el-table>
            </div>
            <h2>{{city}}房价趋势预测</h2><hr>
            <div id="forecast-pie"></div>
            <div id="vote-container">
                <p>你认为{{city}}的房价在未来呈怎样的趋势发展？</p>
                <el-radio v-model="selected" label="0">
                    <span class="select-item">我认为房价将会上涨</span>
                </el-radio><br />
                <el-radio v-model="selected" label="1">
                    <span class="select-item">我认为房价将会下跌</span>
                </el-radio><br />
                <el-radio v-model="selected" label="2">
                    <span class="select-item">我认为房价将会保持平稳</span>
                </el-radio><br />
                <el-button @click="submitVote" type="primary" class="submit-button">提交</el-button>
            </div>
        </div>
        <div id="empty" style="display: none;">
            <p style="text-align: center;color: grey">暂无该城市的相关数据</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "city-housing",
        data() {
            return {
                url:  this.$serverMainPath + 'city/getCityNewPrice',
                search_word: '',
                city: '',
                totalAveragePrize: '',
                newAveragePrize: '',
                usedAveragePrize: '',
                cityRate: '',
                statisticsTime: '',
                timeList: [],
                priceList: [],
                tableData: [],
                forecastAttitude: ['房价将会上涨', '房价将会下跌', '房价将会保持平稳'],
                forecastData: [],
                selected: '0'
            }
        },
        methods: {
            search() {
                let self = this;
                self.$axios.get(self.url, {params:{city:self.search_word}})
                    .then((res) => {
                        document.getElementById('search_container').style.marginTop = '10px';
                        let resultData = res.data.data;
                        if(resultData.cityPriceMainInfo) {
                            document.getElementById('content_container').style.display = '';
                            document.getElementById('empty').style.display = 'none';
                            let cityPriceMainInfo = resultData.cityPriceMainInfo;
                            let cityPriceChart = resultData.cityPriceChart;
                            self.city = cityPriceMainInfo.city;
                            self.totalAveragePrize = cityPriceMainInfo.averagePrice.toFixed(2);
                            self.newAveragePrize = cityPriceMainInfo.newAveragePrice.toFixed(2);
                            self.usedAveragePrize = cityPriceMainInfo.usedAveragePrice.toFixed(2);
                            self.cityRate = cityPriceMainInfo.weekGrowthRate.toFixed(2);
                            self.statisticsTime = this.$timeFormat(cityPriceMainInfo.statisticalTime);
                            self.timeList = cityPriceChart.timeList;
                            self.priceList = cityPriceChart.priceList;
                            self.tableData = resultData.countyPriceInfoList;
                            self.ConvertForecastData(cityPriceMainInfo);
                            self.dataFormat();
                            self.drawLine();
                            self.drawPie();
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
                        text: this.city + '房价趋势图',
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
            drawPie() {
                let forecastPie = this.$echarts.init(document.getElementById('forecast-pie'));
                forecastPie.setOption({
                    title : {
                        text: '网友对房价趋势的预测',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.forecastAttitude
                    },
                    series : [
                        {
                            name: '持此观点的人数',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: this.forecastData,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            ConvertForecastData(param) {
                let self = this;
                let forecast = new Array();
                forecast.push({name: self.forecastAttitude[0], value: param.voteRise});
                forecast.push({name: self.forecastAttitude[1], value: param.voteFall});
                forecast.push({name: self.forecastAttitude[2], value: param.voteSmooth});
                self.forecastData = forecast;
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
                    self.tableData[i].statisticalTime = this.$timeFormat(self.tableData[i].statisticalTime);
                }
            },
            submitVote() {

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

    #new-prize-container {
        margin-bottom: 30px;
    }

    #content_container {
        width: 900px;
    }

    #tendency-chart, #forecast-pie{
        margin: 20px auto;
        width: 900px;
        height: 400px;
    }

    #city-table {
        margin: 20px auto;
        width: 800px;
        height: auto;
    }

    #new-prize, #new-prize tr{
        width: 900px;
    }

    #new-prize tr {
        text-align: center;
    }

    .prize-label {
        font-size: 14px;
        color: gray;
        vertical-align: top;
    }

    #vote-container {
        width: 900px;
        height: 200px;
    }

    #vote-container p {
        font-size: 20px;
        margin: 10px auto;
    }

    .select-item {
        font-size: 16px;
    }

    .submit-button {
        margin-top: 20px;
    }
</style>
