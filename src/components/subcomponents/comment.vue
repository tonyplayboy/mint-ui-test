<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="content"></textarea>

        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content }}
                </div>
            </div>

        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>

    import {Toast} from 'mint-ui'

    export  default {
        data() {
            return {
                pageIndex:1,
                comments:[],
                content:''
            }
        },
        props:['id'],
        created() {
            this.getComments()
        },
        methods: {
            getComments() {
                this.$http.get("getcomments/" + this.id + "/" + this.pageIndex)
                    .then(result => {
                        //console.log(result.body);
                        if (result.body) {
                            this.comments = this.comments.concat(result.body);
                        } else {
                            Toast("加载评论失败。。。");
                        }
                    })
            },
            getMore() {
                this.pageIndex++;
                this.getComments()
            },
            addComment() {
                if(this.content.trim().length === 0) {
                    Toast("请输入评论内容。。。");
                    return;
                }
                //console.log(new Date('YYYY-MM-DD HH:mm:ss'));
                var newComment = {
                    user_name:'匿名用户',
                    add_time:Date.now(),
                    content:this.content.trim(),
                    news_id:this.$route.params.id
                }
                this.$http.post("addcomment/" ,newComment)
                    .then(result => {
                        if (result.body.affectedRows === 1) {
                            this.comments.unshift(newComment);
                            this.content = '';
                        } else {
                            Toast("加载评论失败。。。");
                        }
                    })
            }
        }
    };
</script>

<style lang="scss" scoped>
    .cmt-container {
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    line-height: 30px;
                    background-color: #ccc;
                    text-indent: 1em;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>
