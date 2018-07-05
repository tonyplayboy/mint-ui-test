<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id === 0 ? 'mui-active':'']"
                       @tap="getPhotoListByCateId(item.id)"
                       v-for="item in cates" :key="item.id">
                        {{  item.title }}
                    </a>

                </div>
            </div>
        </div>

        <ul class="photo-list">
            <!--tag="li"指定渲染成li标签-->
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
                <img v-lazy="item.url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.content }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    // 1. 导入 mui 的js文件
    import mui from "../../lib/mui/js/mui.min.js";

    export default {
        data() {
            return {
                cates: [], // 所有分类的列表数组
                list: [] // 图片列表的数组
            };
        },
        created() {
            this.getAllCategory();
            // 默认进入页面，就主动请求 所有图片列表的数据
            this.getPhotoListByCateId(0);
        },
        mounted() {
            // 2. 初始化滑动控件
            mui(".mui-scroll-wrapper").scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            getAllCategory() {
                // 获取所有的图片分类
                this.$http.get("getimgcategory").then(result => {
                    if (result.body) {
                        this.cates = result.body;
                        //手动制造出一个"全部"的分类
                        this.cates.unshift({
                            title: "全部", id: 0
                        })
                    }
                });
            },
            getPhotoListByCateId(cateId) {
                // 根据 分类Id，获取图片列表
                this.$http.get("getimages/" + cateId).then(result => {
                    if (result.body) {
                        this.list = result.body;
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    * {
        touch-action: pan-y;
    }



    .photo-list {
        list-style: none;
        margin: 0;
        padding: 20px;
        li {
            background-color: #ccc;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 0 9px #999;
            position: relative;
            img {
                width: 100%;
                vertical-align: middle;
            }
            img[lazy="loading"] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info {
                color: white;
                text-align: left;
                position: absolute;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;
                .info-title {
                    font-size: 14px;
                }
                .info-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>
