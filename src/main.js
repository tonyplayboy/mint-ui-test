import  Vue from 'vue'
import  app from './App.vue'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './css/globel.css'

import VueRouter from 'vue-router'
import router from './router.js'
import MintUI from 'mint-ui';
import VueResource from 'vue-resource';


Vue.use(MintUI);
Vue.use(VueResource);
Vue.http.options.root = 'http://127.0.0.1:3000';
Vue.http.options.emulateJSON = true;
Vue.use(VueRouter);

// 全局时间过滤器
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 安装 图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router
});