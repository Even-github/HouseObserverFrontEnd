<template>
    <div id="main">
        <div id="title">
            <h1 style="font-size: 50px;">把握趋势，掌控未来</h1>
        </div>
        <div id="button-container">
            <table id="button-table">
                <tr>
                    <td><el-button @click="visit(nation_url)" class="buttons" type="primary" round>
                        <span class="button-font">全国房价</span>
                    </el-button></td>
                    <td><el-button @click="visit(province_url)" class="buttons" type="success" round>
                        <span class="button-font">省份房价</span>
                    </el-button></td>
                </tr>
                <tr>
                    <td><el-button @click="visit(city_url)" class="buttons" type="info" round>
                        <span class="button-font">城市房价</span>
                    </el-button></td>
                    <td><el-button @click="visit(about_url)" class="buttons" type="warning" round>
                        <span class="button-font">关于</span>
                    </el-button></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "main-index",
        data() {
            return {
                nation_url: this.$mainPath + 'HousingMap',
                province_url: this.$mainPath + 'ProvinceHousing',
                city_url: this.$mainPath + 'CityHousing',
                about_url: this.$mainPath + 'about'
            }
        },
        methods: {
            visit(url) {
                location.href = url;
            }
        }
    }
</script>

<style scoped>
    #main {
        background-image: url("../../../static/img/home-background-img.jpg");
        background-position: center;
        background-attachment: fixed;
        width: 100%;
        min-height: 600px;
    }

    #title {
        padding-top: 100px;
    }

    #title h1{
        color: #FFFFFF;
        margin: 0px auto;
        text-align: center;
    }

    #button-container {
        width: 600px;
        height: 300px;
        margin: 30px auto;
    }

    #button-table {
        width: 600px;
        height: 300px;
    }

    .buttons {
        width: 300px;
        height: 150px;
    }

    .button-font {
        font-size: 40px;
    }
</style>
