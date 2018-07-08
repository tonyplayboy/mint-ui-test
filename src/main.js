import  Vue from 'vue'
import  app from './App.vue'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './css/globel.css'

import VueRouter from 'vue-router'
import router from './router.js'
import MintUI from 'mint-ui';
import VueResource from 'vue-resource';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.use(MintUI);
Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';
Vue.http.options.emulateJSON = true;
Vue.use(VueRouter);

// 全局时间过滤器
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
});

// 安装 图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


//vuex仓库实现共享数据
const store = new Vuex.Store({
    state: { // this.$store.state.***
        // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
        cart:JSON.parse(localStorage.getItem('cart') || '[]')
    },
    mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
        addToCart(state, goodsinfo) {
            // 点击加入购物车，把商品信息，保存到 store 中的 cart 上
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2. 如果没有，则直接把 商品数据，push 到 cart 中即可
            // 假设 在购物车中，没有找到对应的商品
            var flag = false
            state.cart.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                state.cart.push(goodsinfo);
            }
            // 当 更新 cart 之后，把 cart 数组，存储到 本地的 localStorage 中
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            state.cart.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true
                }
            });
            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        removeFormCar(state, id) {
            // 根据Id，从store 中的购物车中删除对应的那条商品数据
            state.cart.some((item, i) => {
                if (item.id == id) {
                    state.cart.splice(i, 1)
                    return true;
                }
            })
            // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateGoodsSelected(state, info) {
            state.cart.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            // 把最新的 所有购物车商品的状态保存到 store 中去
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },
    getters: { // this.$store.getters.***
        // 相当于 计算属性，也相当于 filters
        getAllCount(state) {
            var c = 0;
            state.cart.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            }
            state.cart.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.sell_price * item.count
                }
            })
            return o
        }
    }
})

var vm = new Vue({
    el:'#app',
    render:c => c(app),
    router,
    store
});