<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" >

                    <div class="mui-media-body">
                        <p>{{ newsInfo.title }}</p>
                        <p class='mui-ellipsis'>
                            <span>发表时间: {{ newsInfo.add_time | dateFormat}}</span>
                            <span>点击:{{ newsInfo.click}}次</span>
                        </p>
                    </div>

            </li>
        </ul>
        <p>{{ newsInfo.zhaoyao}}</p>
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue';
    import {Toast} from 'mint-ui';

    export  default {
        data() {
            return {
                id: this.$route.params.id,
                newsInfo:{}
            }
        },
        created() {
            this.getNewsInfo()
        },
        methods: {
            getNewsInfo() {
                // 获取轮播图数据的方法
                this.$http.get("getnewsinfo/"+this.id)
                    .then(result => {
                        //console.log(result.body);
                        if (result.body[0]) {
                            this.newsInfo = result.body[0];
                        } else {
                            Toast("加载新闻详情失败。。。");
                        }
                    })
            }
        },
        components:{ //子组件
            'cmt-box' :comment
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
