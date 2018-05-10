import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import "babel-polyfill";
import echarts from 'echarts'
import {rootPath, mainPath, adminPath, serverMainPath, dateFormat, timeFormat} from "../static/js/utils";
import vueQuillEditor from 'vue-quill-editor'

'../static/js/utils.js'

Vue.use(ElementUI);
Vue.use(vueQuillEditor)
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$rootPath = rootPath;
Vue.prototype.$mainPath = mainPath;
Vue.prototype.$adminPath = adminPath;
Vue.prototype.$serverMainPath = serverMainPath;
Vue.prototype.$timeFormat = timeFormat;
Vue.prototype.$dateFormat = dateFormat;

Vue.prototype.$axios.defaults.withCredentials = true;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
