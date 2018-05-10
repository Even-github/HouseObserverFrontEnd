<template>
    <div id="container">
        <div class="content-item-container">
            <h1 style="text-align: center">关于</h1>
            <div id="content-container" v-html="content"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "about",
        data() {
            return {
                contentUrl: this.$serverMainPath + 'about/getAbout',
                content: ''
            }
        },
        mounted() {
            this.getContent();
        },
        methods: {
            getContent() {
                let self = this;
                self.$axios.get(self.contentUrl)
                    .then((res) => {
                        let result = res.data.data;
                        if (result) {
                            self.content = result.content;
                        }
                    });
            },
        }
    }
</script>

<style scoped>
    #container {
        width: 900px;
        margin: 0px auto;
        padding-top: 20px;
    }

    #about-text {
        font-size: 16px;
        margin-top: 14px;
    }

    #content-container {
        min-height: 300px;
        margin-top: 20px;
    }

    .content-item-container {
        background-color: #ffffff;
        border-radius: 15px;
        margin: 20px auto;
        padding: 10px 10px;
        min-height: 500px;
    }
</style>
