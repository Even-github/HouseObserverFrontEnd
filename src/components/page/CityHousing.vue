<template>
    <div id="container">
        <div class="content-item-container">
            <h2><i class="el-icon-search"></i> 搜索城市</h2><hr>
            <div id="search_container">
                <el-input v-model="search_word" id="search_box" placeholder="搜索城市" class="handle-input mr10"></el-input>
                <el-button id="search_button" type="primary" icon="search" @click="search">搜索</el-button>
            </div>
        </div>
        <div id="content_container" style="display: none;">
            <div class="content-item-container">
                <h2><i class="el-icon-document"></i> {{city}}最新房价</h2><hr>
                <div id="new-prize-container">
                    <table id="new-prize">
                        <tr style="height: 50px;vertical-align: bottom;">
                            <td style="font-size: 30px;color: green;">{{totalAveragePrice}}元/平方米</td>
                            <td style="font-size: 30px;color: green;">{{newAveragePrice}}元/平方米</td>
                            <td style="font-size: 30px;color: green;">{{usedAveragePrice}}元/平方米</td>
                        </tr>
                        <tr class="prize-label">
                            <td>平均房价</td>
                            <td>新房平均房价</td>
                            <td>二手房平均房价</td>
                        </tr>
                        <tr style="height: 50px;vertical-align: bottom;">
                            <td style="font-size: 30px;color: blue;">{{cityRate}}%</td>
                            <td style="font-size: 30px;">{{statisticsTime}}</td>
                        </tr>
                        <tr class="prize-label">
                            <td>周增长率</td>
                            <td>统计时间</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="content-item-container">
                <h2><i class="el-icon-document"></i> {{city}}房价趋势</h2><hr>
                <div id="tendency-chart"></div>
            </div>
            <div class="content-item-container">
                <h2><i class="el-icon-document"></i> {{city}}区域房价情况</h2><hr>
                <div id="city-table">
                    <el-table
                        :data="tableData"
                        stripe=true
                        style="width: 100%">
                        <el-table-column
                            prop="county"
                            label="地区"
                            width="320px">
                        </el-table-column>
                        <el-table-column
                            prop="averagePrice"
                            label="平均房价"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            class="rate"
                            prop="weekGrowthRate"
                            label="周增长率">
                        </el-table-column>
                        <el-table-column
                            prop="statisticalTime"
                            label="更新时间"
                            sortable>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="content-item-container">
                <h2><i class="el-icon-document"></i> {{city}}房价趋势预测</h2><hr>
                <div id="forecast-pie"></div>
            </div>
            <div class="content-item-container">
                <h2><i class="el-icon-document"></i> 投票</h2><hr>
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
                submitUrl: this.$serverMainPath + 'city/submitVote',
                getVoteUrl: this.$serverMainPath + 'city/getCityVote',
                search_word: '',
                city: '',
                totalAveragePrice: '',
                newAveragePrice: '',
                usedAveragePrice: '',
                cityRate: '',
                statisticsTime: '',
                timeList: [],
                priceList: [],
                tableData: [],
                forecastAttitude: ['房价将会上涨', '房价将会下跌', '房价将会保持平稳'],
                forecastData: [],
                selected: '0',
                id: ''
            }
        },
        methods: {
            search() {
                let self = this;
                self.$axios.get(self.url, {params:{city:self.search_word}})
                    .then((res) => {
                        let resultData = res.data.data;
                        if(resultData.cityPriceMainInfo) {
                            document.getElementById('container').style.paddingTop = '20px';
                            document.getElementById('content_container').style.display = '';
                            document.getElementById('empty').style.display = 'none';
                            let cityPriceMainInfo = resultData.cityPriceMainInfo;
                            let cityPriceChart = resultData.cityPriceChart;
                            self.id = cityPriceMainInfo.id;
                            self.city = cityPriceMainInfo.city;
                            self.totalAveragePrice = cityPriceMainInfo.averagePrice.toFixed(2);
                            if (cityPriceMainInfo.newAveragePrice != null) {
                                self.newAveragePrice = cityPriceMainInfo.newAveragePrice.toFixed(2);
                            } else {
                                self.newAveragePrice = '-'
                            }
                            if (cityPriceMainInfo.usedAveragePrice != null) {
                                self.usedAveragePrice = cityPriceMainInfo.usedAveragePrice.toFixed(2);
                            } else {
                                self.usedAveragePrice = '-'
                            }
                            if (cityPriceMainInfo.weekGrowthRate != null) {
                                self.cityRate = cityPriceMainInfo.weekGrowthRate.toFixed(2);
                            } else {
                                self.cityRate = '-'
                            }
                            self.statisticsTime = this.$dateFormat(cityPriceMainInfo.statisticalTime);

                            self.timeList = cityPriceChart.timeList;
                            self.priceList = cityPriceChart.priceList;
                            self.tableData = resultData.countyPriceInfoList;
                            self.convertForecastData(cityPriceMainInfo);
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
                        left: 'center',
                        textStyle: {
                            fontSize: '24'
                        },
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
                let self = this;
                let forecastPie = self.$echarts.init(document.getElementById('forecast-pie'));
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
                        data: self.forecastAttitude
                    },
                    series: [
                        {
                            name: '持此观点的人数',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: self.forecastData,
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
            convertForecastData(param) {
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
                    self.timeList[i] = self.$dateFormat(self.timeList[i]);
                }
                for (let i = 0; i < self.priceList.length; i++) {
                    self.priceList[i] = self.priceList[i].toFixed(2);
                }
                for (let i = 0; i < self.tableData.length; i++) {
                    self.tableData[i].averagePrice = self.tableData[i].averagePrice.toFixed(2);
                    self.tableData[i].statisticalTime = this.$dateFormat(self.tableData[i].statisticalTime);
                    if (self.tableData[i].weekGrowthRate != null) {
                        self.tableData[i].weekGrowthRate = self.tableData[i].weekGrowthRate.toFixed(2) + '%';
                    } else {
                        self.tableData[i].weekGrowthRate = '-'
                    }
                }
            },
            submitVote() {
                let self = this;
                self.$axios.get(self.submitUrl, {params:{id:self.id,selected:self.selected}})
                    .then((res) => {
                        let result = res.data;
                        if (result) {
                            if (result.success == true) {
                                self.$message.success('提交成功！');
                                self.getVote();
                                self.drawPie();
                            } else {
                                this.$message.error('提交失败！');
                            }
                        }
                    });
            },
            getVote() {
                let self = this;
                self.$axios.get(self.getVoteUrl, {params:{id:self.id}})
                    .then((res) => {
                        let resultData = res.data.data;
                        if (resultData) {
                            self.convertForecastData(resultData);
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    #container {
        margin: auto;
        width: 900px;
        /*min-height: 500px;*/
        padding: 200px 0px 10px 0px;
    }

    #search_container {
        width: 880px;
        height: 30px;
        margin: 20px auto;
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

    #search_box {
        width: 790px;
    }

    .content-item-container {
        background-color: #ffffff;
        border-radius: 15px;
        margin-bottom: 20px;
        padding: 10px 10px;
    }

    hr {
        color: #00ca79;
    }

    h2 {
        font-weight: 500;
        font-size: 26px;
        padding-bottom: 10px;
    }

    .el-table {
        font-size: 20px;
    }
</style>
