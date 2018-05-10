<template>
    <div id="container">
        <div class="content-item-container">
            <h2><i class="el-icon-search"></i> 搜索对比城市</h2><hr>
            <div id="search_container">
                <el-input v-model="search_word1" placeholder="输入城市1" class="handle-input mr10 search_box"></el-input>
                <p style="float:left;line-height:30px;">vs</p>
                <el-input v-model="search_word2" placeholder="输入城市2" class="handle-input mr10 search_box"></el-input>
                <el-button id="search_button" type="primary" icon="search" @click="search">搜索</el-button>
            </div>
        </div>
        <div id="content_container" style="display: none;">
            <div class="content-item-container">
                <h2><i class="el-icon-document"></i> 最新房价对比</h2><hr>
                <div id="contrast-bar"></div>
            </div>
        </div>
        <div id="error" style="display: none;">
            <p id="error-msg" style="text-align: center;color: grey"></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "city-contrast",
        data() {
            return {
                search_word1: '',
                search_word2: '',
                url: this.$serverMainPath + 'city/getCityContrast',
                cityList: [],
                city1Data: {},
                city2Data: {},
            }
        },
        methods: {
            search() {
                let self = this;
                self.$axios.get(self.url, {params:{city1:self.search_word1,city2:self.search_word2}})
                    .then((res) => {
                        let resultData = res.data.data;
                        if (res.data.message == 'ok') {
                            document.getElementById('container').style.paddingTop = '20px';
                            document.getElementById('content_container').style.display = '';
                            document.getElementById('error').style.display = 'none';

                            let cityInfo1 = resultData.cityInfo1;
                            self.city1Data = new Object();
                            self.city1Data.name = cityInfo1.city;
                            self.city1Data.dataList = new Array();
                            self.city1Data.dataList.push(cityInfo1.averagePrice);
                            self.city1Data.dataList.push(cityInfo1.newAveragePrice);
                            self.city1Data.dataList.push(cityInfo1.usedAveragePrice);

                            let cityInfo2 = resultData.cityInfo2;
                            self.city2Data = new Object();
                            self.city2Data.name = cityInfo2.city;
                            self.city2Data.dataList = new Array();
                            self.city2Data.dataList.push(cityInfo2.averagePrice);
                            self.city2Data.dataList.push(cityInfo2.newAveragePrice);
                            self.city2Data.dataList.push(cityInfo2.usedAveragePrice);

                            self.cityList.push(self.city1Data.name);
                            self.cityList.push(self.city2Data.name);

                            self.drawBar();
                        } else {
                            document.getElementById('content_container').style.display = 'none'
                            document.getElementById('error-msg').innerText = res.data.message;
                            document.getElementById('error').style.display = ''
                        }
                    })
            },
            drawBar() {
                let contrastBar = this.$echarts.init(document.getElementById('contrast-bar'));
                contrastBar.setOption({
                    title: {
                        text: '城市房价对比',
                        left: 'center',
                        textStyle: {
                            fontSize: '24'
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: this.cityList,
                        right: 'right',
                        textStyle: {
                            fontSize: '18'
                        },
                    },
                    grid: {
                        left: 100
                    },
                    xAxis: {
                        type: 'value',
                        name: '元/平方米',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    yAxis: {
                        type: 'category',
                        inverse: true,
                        data: ['总平均房价', '新房平均房价', '二手房平均房价'],
                        axisLabel: {
                            fontSize: '13',
                        }
                    },
                    series: [
                        {
                            name: this.city1Data.name,
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    textBorderColor: '#333',
                                    textBorderWidth: 2
                                }
                            },
                            data: this.city1Data.dataList
                        },
                        {
                            name: this.city2Data.name,
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    textBorderColor: '#333',
                                    textBorderWidth: 2
                                }
                            },
                            data: this.city2Data.dataList
                        }
                    ]
                });
            }
        }
    }
</script>

<style scoped>
    #container {
        margin: auto;
        width: 900px;
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

    .search_box {
        width: 360px;
        float: left;
        margin: 0px 10px;
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

    #contrast-bar {
        margin: 20px auto;
        width: 840px;
        height: 400px;
    }
</style>
