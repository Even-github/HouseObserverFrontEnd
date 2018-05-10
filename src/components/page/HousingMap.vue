<template>
    <div id="main-container">
        <div class="content-item-container">
            <h2><i class="el-icon-document"></i> 全国房价概况</h2><hr>
            <div id="housing-map"></div>
        </div>
        <div class="content-item-container">
            <h2><i class="el-icon-document"></i> 各省房价概况</h2><hr>
            <div id="province-bar"></div>
            <div id="province-container">
                <el-table
                    :data="provinceTableData"
                    stripe=true
                    style="width: 100%">
                    <el-table-column
                        prop="province"
                        label="省份"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="provinceAveragePrice"
                        label="平均房价"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        class="rate"
                        prop="provinceRate"
                        label="周变化率">
                    </el-table-column>
                    <el-table-column
                        prop="statisticalTime"
                        sortable
                        label="更新时间">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="content-item-container">
            <h2><i class="el-icon-document"></i> 热门城市房价概况</h2><hr>
            <div id="city-container">
                <el-table
                    :data="cityTableData"
                    stripe=true
                    style="width: 100%">
                    <el-table-column
                        prop="city"
                        label="城市"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="cityAveragePrice"
                        label="平均房价"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        class="rate"
                        prop="cityRate"
                        label="周变化率">
                    </el-table-column>
                    <el-table-column
                        prop="statisticalTime"
                        sortable
                        label="更新时间">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import chinaJson from '../../../static/json/china.json'

    export default {
        name: "housing-map",
        data() {
            return {
                mapDataUrl: this.$serverMainPath + 'province/getAveragePrice',
                cityDataUrl: this.$serverMainPath + 'city/getCityPriceInfo',
                provinceTableData: [],
                cityTableData: [],
                basicData: {
                    '北京':'-',
                    '天津':'-',
                    '上海':'-',
                    '重庆':'-',
                    '河北':'-',
                    '河南':'-',
                    '云南':'-',
                    '辽宁':'-',
                    '黑龙江':'-',
                    '湖南':'-',
                    '安徽':'-',
                    '山东':'-',
                    '新疆':'-',
                    '江苏':'-',
                    '浙江':'-',
                    '江西':'-',
                    '湖北':'-',
                    '广西':'-',
                    '甘肃':'-',
                    '山西':'-',
                    '内蒙古':'-',
                    '陕西':'-',
                    '吉林':'-',
                    '福建':'-',
                    '贵州':'-',
                    '广东':'-',
                    '青海':'-',
                    '西藏':'-',
                    '四川':'-',
                    '宁夏':'-',
                    '海南':'-',
                    '台湾':'-',
                    '香港':'-',
                    '澳门':'-',
                },
                housingData: [],
                barProvinceList: [],
                barProvinceDataList: []
            }
        },
        mounted() {
            this.loadMap();
            this.loadTable();
        },
        methods: {
            loadMap() {
                let self = this;
                self.$axios.get(self.mapDataUrl)
                    .then((res) => { //从后台加载数据
                        let data =  res.data.data;
                        for(let item in data.housingMapData) {
                            self.basicData[item] = data.housingMapData[item].toFixed(2);
                        }
                        self.convertData(); //转换数据格式
                        self.drawMap(); //绘制地图
                        self.provinceTableData = data.provincePriceInfo;
                        for (let i = 0; i < self.provinceTableData.length; i++) {
                            self.provinceTableData[i].provinceAveragePrice = self.provinceTableData[i].provinceAveragePrice.toFixed(2);
                            self.provinceTableData[i].statisticalTime  = this.$dateFormat(self.provinceTableData[i].statisticalTime);
                            if (self.provinceTableData[i].provinceRate != null) {
                                self.provinceTableData[i].provinceRate = self.provinceTableData[i].provinceRate.toFixed(2) + '%';
                            } else {
                                self.provinceTableData[i].provinceRate = '-'
                            }
                        }
                        self.drawProvinceBar(); //加载完列表之后再加载柱状图
                    })
            },
            loadTable() {
                let self = this;
                self.$axios.get(self.cityDataUrl)
                    .then((res) => {
                        self.cityTableData = res.data.data;
                        for (let i = 0; i < self.cityTableData.length; i++) {
                            self.cityTableData[i].cityAveragePrice = self.cityTableData[i].cityAveragePrice.toFixed(2);
                            if (self.cityTableData[i].cityRate != null) {
                                self.cityTableData[i].cityRate = self.cityTableData[i].cityRate.toFixed(2) + '%';
                            } else {
                                self.cityTableData[i].cityRate = '-'
                            }
                            self.cityTableData[i].statisticalTime = this.$dateFormat(self.cityTableData[i].statisticalTime);
                        }
                })
            },
            drawMap() {
                this.$echarts.registerMap('china', chinaJson);
                let map = this.$echarts.init(document.getElementById('housing-map'));
                map.setOption({
                    title : {
                        text: '全国房价水平地图',
                        textStyle: {
                            fontSize: '24'
                        },
                        subtext: '数据来源：安居客、链家网',
                        left: 'center'
                    },
                    tooltip : {
                        trigger: 'item'
                    },
                    visualMap: {
                        min: 0,
                        max: 100000,
                        left: 'left',
                        top: 'bottom',
                        text:['高','低'],
                        calculable : true
                    },
                    series: [{
                        name: '省份平均房价（元）',
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        data: this.housingData
                    }]
                })
            },
            drawProvinceBar() {
                let self = this;
                for (let i = self.provinceTableData.length - 1; i >= 0; i--) {
                    self.barProvinceList.push(self.provinceTableData[i].province);
                    self.barProvinceDataList.push(self.provinceTableData[i].provinceAveragePrice);
                    console.log(self.barProvinceDataList)
                }
                let provinceBar = this.$echarts.init(document.getElementById('province-bar'));
                provinceBar.setOption({
                    title: {
                        text: '全国各省房价水平',
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
                        data: ['省份房价']
                    },
                    xAxis: {
                        name: '元/平方米',
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        name: '省份',
                        type: 'category',
                        data: this.barProvinceList
                    },
                    series: [
                        {
                            name: '省份平均房价',
                            type: 'bar',
                            data: this.barProvinceDataList,
                            label: {
                                normal: {
                                    show: true,
                                    textBorderColor: '#333',
                                    textBorderWidth: 2
                                }
                            },
                        },
                    ]
                })
            },
            convertData() {
                let self = this;
                let dataArray = new Array();
                for (let name in self.basicData) {
                    let item = new Object();
                    item.name = name;
                    item.value = self.basicData[name];
                    dataArray.push(item);
                }
                self.housingData = dataArray;
                console.log(self.basicData['广东']);
                for (let i = 0; i < self.housingData.length; i++) {
                    console.log(self.housingData[i].name + ":" + self.housingData[i].value); //TODO
                }
            }
        }
    }
</script>

<style scoped>
    #housing-map {
        margin: 20px auto;
        width: 800px;
        height: 500px;
    }

    #main-container {
        width: 1000px;
        padding: 20px 0px;
        margin: 0px auto;
    }

    #province-container, #city-container {
        margin: 20px auto;
        width: 800px;
        height: auto;
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

    #province-bar {
        margin: 20px auto;
        width: 800px;
        height: 500px;
    }

    .el-table {
        font-size: 20px;
    }
</style>
