<template>
	<div>
		<div class="lite-topbar lite-page-top">
			<div class="nav-left" @click="$router.back()"><i class="m-font m-font-arrow-left"></i></div>
			<div class="nav-main"><h4>微博正文</h4></div>
			<div class="nav-right"><i class="m-font m-font-dot-more"></i></div>
		</div>
		<div class="main" style="margin-top: 2.75rem;" v-if="itemData.length != 0"><!--  -->
			<div class="card m-panel card9 f-weibo">
				<div class="card-wrap">
					<header class="weibo-top m-box">
						<div class="m-avatar-box m-box-center">
							<a href="/profile/3644441127" class="m-img-box">
								<img :src="itemData.user.profile_image_url">
								<i class="m-icon m-icon-goldv"></i>
							</a>
						</div>
						<div class="m-box-dir m-box-col m-box-center">
							<div class="m-text-box">
								<a href="/profile/3644441127" class=""><h3 class="m-text-cut">{{ itemData.user.name }}<i class="m-icon m-icon-vipl6"></i></h3></a>
								<h4 class="m-text-cut">
									<span class="time">{{ itemData.created_at }}</span>
									<span class="from">来自 <a href="" v-html="itemData.source"></a></span>
								</h4>
							</div>
						</div>
					</header>
				</div>
				<article class="weibo-main">
					<div class="card-wrap">
						<div class="weibo-og">
							<div class="weibo-text">{{ itemData.text }}</div>
							<div>
								<div class="weibo-media-wraps weibo-media f-media media-b">
									<ul class="m-auto-list">
										<li class="m-auto-box3">
											<div class="m-img-box m-imghold-4-3">
												<span class="feed-mark">动图</span>
												<div class="f-bg-img" style="background-image: url(&quot;https://wx2.sinaimg.cn/orj360/d939c227gy1ft4vjoocmzg20fk06ee86.gif&quot;);"></div>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</article>
			</div>

			<div>
				<div class="lite-page-tab">
					<div class="tab-item" @click="hasRepost(0)"><i>转发<em></em></i><i></i></div>
				    <div class="tab-item cur" @click="hasComment(1)"><i>评论<em></em></i><i></i></div>
				    <div class="tab-item" @click="hasAttitude(2)"><i>赞<em></em></i><i></i></div>
				</div>
				<div class="lite-page-tab" v-if="openData.length != 0">
					<div class="tab-item" v-for="(item,index) in openData" @click="">
						<i>{{ item.text }}<em></em></i>
						<i>{{ item.textNum }}</i>
					</div>
				</div>
				<div>111</div>
				<div>222</div>
				<div>333</div>
				<div first-check="true" class="comment-content" style="margin-top: -1px; padding-bottom: 3.44rem;">
				  <div v-if="commentData.length != 0" v-for="commentItem in commentData">
				    <div class="card m-avatar-box lite-page-list" >
				      <div class="card-wrap">
				        <div class="card-main">
				          <div class="m-box">
				            <div class="m-img-box">
				              <img :src="commentItem.user.profile_image_url">
				              <i class="m-icon m-icon-yellowv"></i>
				            </div>
				            <div class="m-box-col m-box-dir m-box-center lite-line">
				              <div class="m-box">
				                <div class="m-box-col m-box-dir">
				                  <div class="m-text-box">
				                    <h4 class="m-text-cut">{{ commentItem.user.name }}</h4>
				                    <h3>{{ commentItem.text }}</h3>
				                  </div>
				                </div>
				              </div>
				              <div class="lite-bot m-text-cut">
				                <div class="m-box-center-a time">{{ commentItem.created_at }}</div>
				                <aside><i class="lite-iconf lite-iconf-comments"></i><em></em></aside>
				                <aside><i class="lite-iconf lite-iconf-like"></i><em></em></aside>
				              </div>
				            </div>
				          </div>
				        </div>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
export default {
  name: 'WeiboCon',
  data () {
    return {
      itemData: [],
      commentData: [],
      openData: [
      	{ text: '转发' ,textNum: 0,isOpen: false },
      	{ text: '评论' ,textNum: 0,isOpen: true },
      	{ text: '点赞' ,textNum: 0,isOpen: false }
      ]
    }
  },
  created: function () {
  	this.hasData();
  	this.hasComment();
  },
  methods: {
  	hasData: function(){
  		const _this = this
  		const weiboMid = this.$route.params.id
  		axios.get(API_PROXY + 'http://i2.api.weibo.com/statuses/page_count.json?access_token=2.00cJ39TFakGAcCfe8a6d929aWnnPtB&id='+weiboMid)
		  .then(function(response){
		  	console.log(response.data)
		  	const changeTime = new Date(response.data.created_at);
	  		const newTime = changeTime.getFullYear() + '-' + (changeTime.getMonth() + 1) + '-' + changeTime.getDate();
	  		const repost = response.data.reposts_count; //获取转发量
	  		const comment = response.data.comments_count; //获取评论量
	  		const attitude = response.data.attitudes_count; //获取点赞量

		  	Vue.set(_this.$data,'itemData',response.data);
	  		Vue.set(_this.itemData,'created_at',newTime);
	  		Vue.set(_this.openData, 0 , { text: '转发', textNum: repost, isOpen: false });
	  		Vue.set(_this.openData, 1 , { text: '评论', textNum: comment, isOpen: true });
	  		Vue.set(_this.openData, 2 , { text: '点赞', textNum: attitude, isOpen: false });
	  		console.log(_this.openData)


		  })
		  .catch(function(err){
		    console.log(err);
		});
  	},
  	hasComment: function(){
  		const _this = this
  		const weiboMid = this.$route.params.id
  		axios.get(API_PROXY + 'https://api.weibo.com/2/comments/show.json?access_token=2.00cJ39TFakGAcCfe8a6d929aWnnPtB&id='+weiboMid)
		  .then(function(response){
		  	console.log(response.data)
		  	console.log(response.data.comments)
		  	Vue.set(_this.$data,'commentData',response.data.comments);
		  	for(let num = 0; num <= response.data.comments.length; num++){
		  		const commentTime = new Date(response.data.comments[num].created_at);
		  		const newCommentTime = commentTime.getFullYear() + '-' + (commentTime.getMonth() + 1) + '-' + commentTime.getDate();
		  		Vue.set(_this.commentData[num],'created_at',newCommentTime);
		  	}
		  })
		  .catch(function(err){
		    console.log(err);
		});  
  	},
  	changebox: function(index){
  		const _this = this;

  	}
  }
}
</script>

<style scoped>
@font-face {
	font-family:marvelfont;src:url(../assets/marvelfont.woff2) format("woff2"),url(../assets/marvelfont.woff) format("woff"),url(../assets/marvelfont.svg) format("svg"),url(../assets/marvelfont.ttf) format("truetype");font-weight:400;font-style:normal
}
.m-font {
	font-family: marvelfont;
	display: inline-block;
	-webkit-font-smoothing: antialiased
}
.card {
    margin-bottom: .5625rem;
}
.m-panel {
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid;
    background: #fff;
}
.card .card-wrap {
    margin-left: .75rem;
    margin-right: .75rem;
    height: 100%;
}
.card .card-wrap .card-main {
    box-sizing: border-box;
    margin-left: -.75rem;
    margin-right: -.75rem;
    height: 100%;
}
.m-box{
	display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}
.card .card-wrap .card-main>.m-box {
    height: 100%;
}
.card9 .weibo-top {
    padding: 0 .75rem;
}
.card9.card-vip {
    background-repeat: no-repeat;
    background-position: top right;
    background-size: contain;
}
.card9>.card-wrap {
    padding-top: .9375rem;
}
.m-img-box {
    display: inline-block;
    width: 100%;
}
.m-avatar-box .m-img-box {
    border-radius: 50%;
    position: relative;
}
.card9 .weibo-top .m-img-box {
    width: 2.5rem;
    height: 2.5rem;
}
.m-avatar-box .m-img-box::before {
    content: "";
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid rgba(0,0,0,.05);
    border-radius: 50%;
}
.m-img-box img {
    width: 100%;
    height: 100%;
    vertical-align: top;
    -o-object-fit: cover;
    object-fit: cover;
}
.m-avatar-box .m-img-box img {
    border-radius: 50%;
}
.m-icon {
    display: inline-block;
    vertical-align: top;
    background-image: url(../assets/sprite.svg);
    background-size: 3em auto;
    width: 1em;
    height: 1em;
}
.m-icon-yellowv {
    background-position: -1em -1em;
}
.m-icon {
    font-size: 14px;
}
.m-avatar-box .m-img-box .m-icon {
    position: absolute;
    z-index: 3;
    right: -.0625rem;
    bottom: -.0625rem;
}
.m-box-col {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    display: block;
    min-width: 0;
}
.m-box-center-a {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.m-box-center {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.m-box-dir {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
}
.card9 .weibo-top .m-text-box {
    margin-left: .75rem;
}
.m-text-box>* {
    margin: 0 0 .375rem 0;
}
.m-text-cut {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.m-text-box h3 {
    font-size: 1rem;
    color: #333;
    line-height: 1.4;
}
.card9 .weibo-top .m-text-box h3 {
    font-size: .9375rem;
    margin: 0;
}
.card9.weibo-member .weibo-top .m-text-box h3 {
    color: #F46200;
}
.m-icon-vipl6 {
    background-position: -1em -49em;
}
.m-text-box h3 .m-icon {
    vertical-align: -.125rem;
}
.m-text-box>:last-child {
    margin: 0;
}
.m-text-box h4 {
    font-size: .75rem;
    color: #636363;
    line-height: 1.5;
}
.m-text-box h4:last-child {
    color: #939393;
}
.card9 .weibo-top .m-text-box h4 {
    color: #939393;
}
.card9 .weibo-main .weibo-og {
    font-size: 1.0625rem;
    color: #333;
    padding: .75rem;
}
.card9 .weibo-main .weibo-text {
    line-height: 1.5;
    word-wrap: break-word;
}
footer.m-ctrl-box {
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid;
    height: 2.125rem;
}
.m-ctrl-box .m-diy-btn {
    color: #939393;
    height: 100%;
}
.m-ctrl-box .m-font {
    font-size: 1rem;
    vertical-align: middle;
}
.m-font-forward::before {
    content: "\E004";
}
.m-font-comment::before {
    content: "\E003";
}
.m-ctrl-box .m-diy-btn h4 {
    font-size: .8125rem;
    display: inline-block;
    margin-top: 0;
    margin-left: .25rem;
}
.m-line-gradient {
    -webkit-mask: -webkit-linear-gradient(top,transparent,#000 30%,#000 70%,transparent 100%);
    width: 1px;
    background-color: #e6e6e6;
    height: 1.5rem;
}
.m-icon-like {
    background-position: -1em -25em;
}
.m-text-box .from{
	margin-left: 0.375rem;
}
.card9 .weibo-rp {
    background-color: #f7f7f7;
    margin-top: -.25rem;
    padding: .75rem;
}
.card9 .weibo-rp .weibo-text {
    font-size: .9375rem;
    color: #636363;
    line-height: 1.6;
}
.card9 .weibo-main a {
    color: #507DAF;
}
.card9 .weibo-main .weibo-media {
    margin-top: .625rem;
}
.card9 .weibo-main .media-b {
    margin: .625rem -.125rem -.375rem;
}
.card9 .weibo-main .weibo-media .single-img {
    position: relative;
    max-width: 9.375rem;
    max-height: 9.375rem;
    overflow: hidden;
}
.f-bg-img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
}
.card9 .weibo-main .media-b .m-auto-list {
    margin-left: -.125rem;
    margin-right: -.125rem;
    margin-bottom: -.25rem;
    padding: 0 0;
}
.card9 .weibo-main .media-b .m-auto-list {
    max-width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
}
.card9 .weibo-main .media-b .m-auto-box {
    padding-left: .125rem;
    padding-right: .125rem;
    margin-bottom: .25rem;
}
.card9 .weibo-main .weibo-media .m-auto-list li {
    display: inline-block;
    vertical-align: top;
}
.card9 .weibo-main .media-b .m-auto-list .m-auto-box {
    width: 32%;
}
[class*=m-imghold] {
    height: 0;
    position: relative;
}
.m-imghold-square {
    padding-bottom: 100%;
}
.lite-topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0;
    background-color: #fafafa;
    color: #262626;
    border-top-width: 0;
    border-right-width: 0;
    border-bottom-width: 1px;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid;
    font-size: 1rem;
    z-index: 995;
}
.lite-page-top {
    height: 2.75rem;
}
.lite-topbar .nav-left, .lite-topbar .nav-main, .lite-topbar .nav-right, .lite-topbar .nav-search {
    position: absolute;
    line-height: 2.75rem;
}
.lite-topbar .nav-left {
    left: .75rem;
    z-index: 1;
}
.lite-page-top .nav-left {
    left: .625rem;
}
.lite-topbar .m-font-arrow-left {
    cursor: pointer;
}
.lite-page-top .m-font {
    color: #282f3c;
    font-size: 1.3125rem;
}
.lite-topbar .nav-left .m-font-arrow-left {
    font-size: 1.3125rem;
    margin-left: -.625rem;
}
.lite-page-top .nav-left .m-font-arrow-left {
    margin-left: 0;
}
.m-font-arrow-left::before {
    content: "\E017";
}
.m-font-dot-more::before {
    content: "\E001";
}
.lite-topbar .nav-main {
    top: 0;
    right: 0;
    left: 0;
    font-size: 1rem;
    color: #a5adb5;
}
.lite-page-top .nav-main {
    text-align: center;
}
.lite-page-top .nav-main {
    color: #282f3c;
    font-size: 1.0625rem;
}
.nav-left, .nav-right {
    z-index: 100;
}
.lite-topbar .nav-right {
    right: .9375rem;
}
.lite-page-top .nav-right {
    right: .625rem;
}
.f-weibo.card9 .weibo-main .media-b {
    margin: .625rem 0 -.375rem;
}
.f-weibo.card9 .weibo-main .media-b .m-auto-list {
    margin: 0 0 -.25rem;
}
.f-media .m-auto-list .m-auto-box3 {
    width: 33.33%;
}
.card9 .weibo-main .weibo-media .m-auto-list li {
    display: inline-block;
    vertical-align: top;
}
.m-img-box {
    display: inline-block;
    width: 100%;
}
[class*=m-imghold] {
    height: 0;
    position: relative;
}
.f-weibo .m-img-box {
    background-color: #e6e6e6;
}
.f-media .m-auto-list .m-imghold-4-3 {
    padding-bottom: 100%;
}
.f-media .feed-mark {
    z-index: 9;
}
.card9 .weibo-main .feed-mark {
    position: absolute;
    background-color: rgba(80,125,175,.75);
    right: 0;
    bottom: 0;
    border-radius: .125rem 0 0 0;
    padding: .125rem;
    color: #fff;
    font-size: .625rem;
}
.f-bg-img {
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
}
.f-weibo .f-bg-img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    width: 100%;
    height: 100%;
}
.lite-page-tab {
    position: relative;
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 .75rem;
    margin-top: -2px;
    background: #fff;
    box-shadow: 0 1px 0 0 #e6e6e6;
    color: #a5aeb5;
    font-size: .875rem;
    z-index: 2;
}
.lite-page-tab .tab-item {
    display: inline-block;
    margin-right: 1.5rem;
}
.lite-page-tab .tab-item i {
    position: relative;
}
.lite-page-tab .cur {
    color: #697480;
}
.comment-content[data-v-0aa9128a] {
    min-height: 15rem;
    background-color: #fbfbfb;
    position: relative;
}
.lite-page-wrap .card {
    margin-bottom: 0;
}
.card .card-wrap {
    margin-left: .75rem;
    margin-right: .75rem;
    height: 100%;
}
.card .card-wrap .card-main {
    box-sizing: border-box;
    margin-left: -.75rem;
    margin-right: -.75rem;
    height: 100%;
}
.lite-msg .card-wrap .card-main, .lite-page-list .card-wrap .card-main {
    margin: 0;
    padding: .75rem 0;
}
.card .card-wrap .card-main>.m-box {
    height: 100%;
}
.lite-msg .m-img-box, .lite-page-list .m-img-box {
    width: 2rem;
    height: 2rem;
    margin: 0 .5rem 0 0;
}
.m-avatar-box .m-img-box:before {
    border-color: hsla(0,0%,90%,.15);
}
.lite-line {
    border-top-width: 1px;
    border-right-width: 0;
    border-bottom-width: 0;
    border-left-width: 0;
    border-color: #e6e6e6;
    border-style: solid;
    margin: -.75rem -.75rem 0 0;
    padding: .75rem .75rem 0 0;
}
.lite-page-list .m-text-box {
    padding-right: 0;
}
.lite-msg .m-text-box h4, .lite-page-list .m-text-box h4 {
    font-size: .875rem;
    color: #333;
}
.lite-msg .m-text-box h3, .lite-page-list .m-text-box h3 {
    word-wrap: break-word;
}
.lite-page-list .m-text-box h3 {
    word-wrap: break-word;
}
.lite-page-list .lite-bot {
    margin-top: .5rem;
    line-height: .9375rem;
    font-size: .6875rem;
    color: #999;
}


.lite-page-list .lite-bot .time {
    float: left;
    height: 100%;
}
.lite-page-list .lite-bot aside {
    float: right;
}
.lite-iconf {
    font-family: litefont;
    font-size: 1.75rem;
    color: #fff;
}
.lite-iconf-comments, .lite-iconf-like, .lite-iconf-liked, .lite-iconf-report, .lite-iconf-share {
    color: rgba(40,47,60,.8);
    font-size: 1.125rem;
}
.lite-page-list .lite-bot .lite-iconf {
    font-size: .8125rem;
    color: #999;
}
.lite-page-list .lite-bot aside em {
    margin-left: .1875rem;
}
.lite-iconf-like:before {
    content: "\E010";
}
.lite-iconf-comments:before {
    content: "\E009";
}
.lite-msg, .lite-page-list {
    background: #fff;
}
.lite-msg.card, .lite-page-list.card {
    margin-bottom: 0;
}
.lite-page-wrap .card {
    margin-bottom: 0;
}
</style>