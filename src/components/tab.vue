<template>
  <div class="tab_fixed">
    <ul class="tab_box">
      <router-link tag='li' to="/home" exact-active-class="active"><a href="">微博</a></router-link>
      <router-link tag='li' to="/message" exact-active-class="active"><a href="">消息</a></router-link>
      <router-link tag='li' to="/user" exact-active-class="active"><a href="">我的</a></router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #333;
}
.tab_fixed{
  width: 100%;
  height: 2.75rem;
  line-height: 2.75rem;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
}
.tab_box{
  width: 100%;
  text-align: center;
  font-size: 1rem;
  background-color: #fff;
  background-color: #fcfcfc;
  border-top: 1px solid #eee;
  

  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
.tab_box li{
  width: 100%;
  border-right: 1px solid #e6e6e6;
}
.tab_box li:last-child{
  border-right: 0;
}
.active a{
  color: #ff8200;
}
</style>
