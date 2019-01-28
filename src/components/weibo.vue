<template>
	<div>
		<tab/>
		<div class="weibo_box">
			<div class="card m-panel card9 weibo-member card-vip" v-for="item in weiboData" :node-id="item.id" @click="showKey(item)">
				<div class="card-wrap">
					<div class="card-main">
						<header class="weibo-top m-box m-avatar-box">
							<a class="m-img-box"><img :src="item.user.avatar_hd"><i class="m-icon m-icon-yellowv"></i></a>
							<div class="m-box-col m-box-dir m-box-center">
								<div class="m-text-box">
									<a><h3 class="m-text-cut">{{ item.user.name }}<i class="m-icon m-icon-vipl6"></i></h3></a>
									<h4 class="m-text-cut"><span class="time">昨天 10:40</span><span class="from" v-html="item.source"></span></h4>
								</div>
							</div>
						</header>
						<article class="weibo-main">


						
							<div class="weibo-og">
								<div class="weibo-text">{{ item.text }}</div>
								<div>
									<div class="weibo-media-wraps weibo-media media-b" v-if="item.pic_urls.length > 0">
										<div class="single-img" v-for="mePic in item.pic_urls">
											<div class="f-bg-img" :style="{backgroundImage:'url(' + mePic.thumbnail_pic + ')'}"></div>
										</div>
									</div>
									<div class="weibo-media-wraps weibo-media media-b" v-else></div>
								</div>
							</div>









							

							<div class="weibo-rp" v-if="item.retweeted_status">
								<div class="weibo-text">
									<span><a href="https://m.weibo.cn/u/1642351362?uid=1642351362&amp;luicode=10000011&amp;lfid=1076035015936252">@{{ item.retweeted_status.user.name }}</a>:</span>
							        <span>{{ item.retweeted_status.text }}</span>
							    </div>
    							<div>
    								<div class="weibo-media-wraps weibo-media media-b">
    									<div class="single-img" style="width: 9.375rem; height: 12.5rem;" v-if="item.retweeted_status.pic_urls.length == 1">
											<div class="f-bg-img" v-for="pic in item.retweeted_status.pic_urls" :style="{backgroundImage:'url(' + pic.thumbnail_pic + ')'}"></div>
    									</div>
    									<ul class="m-auto-list" v-else-if="item.retweeted_status.pic_urls.length > 1">
    										<li class="m-auto-box" v-for="pic in item.retweeted_status.pic_urls">
    											<div class="m-img-box m-imghold-square">
    												<div class="f-bg-img" :style="{backgroundImage:'url(' + pic.thumbnail_pic + ')'}"></div>
    											</div>
    										</li>
    									</ul>
    									<div class="single-img" v-else></div>
    								</div>
    							</div>
    						</div>

						</article>
						<footer class="m-ctrl-box m-box-center-a">
							<div class="m-diy-btn m-box-col m-box-center m-box-center-a">
								<i class="m-font m-font-forward"></i>
								<h4 v-if="item.reposts_count == 0">转发</h4>
								<h4 v-else>{{ item.reposts_count }}</h4>
							</div>
							<span class="m-line-gradient"></span>
							<div class="m-diy-btn m-box-col m-box-center m-box-center-a">
								<i class="m-font m-font-comment"></i>
								<h4 v-if="item.comments_count == 0">评论</h4>
								<h4 v-else>{{ item.comments_count }}</h4>
							</div>
							<span class="m-line-gradient"></span>
							<div class="m-diy-btn m-box-col m-box-center m-box-center-a">
								<i class="m-icon m-icon-like"></i>
								<h4 v-if="item.attitudes_count == 0">赞</h4>
								<h4 v-else>{{ item.attitudes_count }}</h4>
							</div>
						</footer>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
import Vue from 'vue'
import axios from 'axios'
import tab from '@/components/tab'
import weiboCon from '@/components/weiboCon'
export default {
  name: 'Weibo',
  components: {
  	tab
  },
  data () {
    return {
      weiboData: []
    }
  },
  created: function () {
  	this.getWeibo();
  },
  methods: {
  	getWeibo: function(){
  		const _this = this
  		axios.get(API_PROXY + 'https://api.weibo.com/2/statuses/user_timeline.json?access_token=2.00cJ39TFakGAcCfe8a6d929aWnnPtB')
		  .then(function(response){
		  	console.log(response.data.statuses)
		  	Vue.set(_this.$data,'weiboData',response.data.statuses);
		  })
		  .catch(function(err){
		    console.log(err);
		});
  	},
  	showKey: function(item){
  		const weiboId = item.id
  		this.$router.push({name: 'weiboCon', params:{id:weiboId , weiboData:item }})
  	}
  }
}
	
</script>

<style >
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



</style>