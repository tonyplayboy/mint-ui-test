<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <p>{{ item.title }}</p>
                        <p class='mui-ellipsis'>
                        <span>发表时间: {{ item.add_time | dateFormat}}</span>
                        <span>点击:{{ item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>



        </ul>
    </div>
</template>

<script>

    import {Toast} from 'mint-ui'

    export  default {
        data() {
            return {
                newsList:[]
            }
        },
        created() {
            this.getNewsList()
        },
        methods: {
            getNewsList() {
                // 获取轮播图数据的方法
                this.$http.get("getnewslist")
                    .then(result => {
                        //console.log(result.body);
                        if (result.body) {
                            this.newsList = result.body;
                        } else {
                            Toast("加载新闻列表失败。。。");
                        }
                    })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .mui-table-view {
        li {
            p {
                font-size: 14px;
            }
            .mui-ellipsis {
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
