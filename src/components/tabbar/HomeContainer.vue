<template>
  <div>
      <!--轮播图-->
      <swiper :lunbotuList="lunbotuList">
      </swiper>
      <!--六宫格-->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/newsList">
              <img src="../../images/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div></router-link></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/photoList">
              <img src="../../images/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div></router-link></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/goodsList">
               <img src="../../images/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div></router-link></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="#">
               <img src="../../images/menu4.png" alt="">
              <div class="mui-media-body">留言反馈</div></router-link></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="#">
               <img src="../../images/menu5.png" alt="">
              <div class="mui-media-body">视频专区</div></router-link></li>
          <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="#">
               <img src="../../images/menu6.png" alt="">
              <div class="mui-media-body">联系我们</div></router-link></li>

      </ul>

  </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import swiper from "../subcomponents/swiper.vue";
    export  default {
        data() {
            return {
                lunbotuList:[]
            }
        },
        components: {
            swiper
        },
        created() {
            this.getLunbotu()
        },
        methods: {
            getLunbotu() {
                // 获取轮播图数据的方法
                this.$http.get("getlunbo")
                .then(result => {
                    //console.log(result.body);
                    if (result.body) {
                        this.lunbotuList = result.body;
                    } else {
                        Toast("加载轮播图失败。。。");
                    }
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border: none;
        img {
            width: 60px;
            height: 60px;
        }

        .mui-media-body {
            font-size: 13px;
        }
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: 0;
    }
</style>

