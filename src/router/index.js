import Vue from 'vue'
import Router from 'vue-router'
import Weibo from '@/components/weibo'
import Message from '@/components/message'
import User from '@/components/user'
import weiboCon from '@/components/weiboCon'


Vue.use(Router)

export default new Router({
  routes: [
  	{ path: '/', redirect: '/home' },
    { path: '/home', name: 'Weibo', component: Weibo },
    { path: '/message', name: 'Message', component: Message },
    { path: '/user', name: 'User', component: User },
    { path: '/weiboCon/:id', name: 'weiboCon', component: weiboCon }
  ]
})
