<template>
  <div id="app">
    <router-view class="router"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
* {-webkit-tap-highlight-color: rgba(0, 0, 0, 0); margin:0; padding:0; word-break: break-all; word-wrap: break-word;}
a {text-decoration:none;-webkit-tap-highlight-color:rgba(0, 0, 0, 0);-webkit-text-size-adjust:none;-webkit-user-select: none; -o-text-size-adjust:none; -ms-text-size-adjust:none; text-size-adjust:none; }
a:link,a:active,a:visited,a:focus{text-decoration:none;}
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, code, form, fieldset, legend, input, textarea, p, blockquote, th, td, hr, button, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { margin: 0; padding: 0;}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {display: block;}
audio, canvas, video {display: inline-block;*display: inline;*zoom: 1;}
html,body,input, select, textarea,button { font-size:10px; font-family:"Helvetica","STHeiti","Hiragino Sans GB";}
table { border-collapse: collapse;border-spacing: 0;}
th { text-align: inherit;}
fieldset, img { border: 0;}
iframe { display: block;}
abbr, acronym { border: 0; font-variant: normal;}
del { text-decoration: line-through; }
address, caption, cite, code, dfn, em, th, var { font-style: normal; font-weight: 500;}
ol, ul { list-style: none; }
caption, th { text-align: left;}
h1, h2, h3, h4, h5, h6 {font-weight:normal;}
p,span,em,b,font,a{ font-weight:normal;font-style:normal;}
header,section,footer{width:100%;}
h1, h2, h3, h4, h5, h6{border:none;}
i,em{font-style: normal;}
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
html{
  font-size: 16px;
  background-color: #f2f2f2;
}
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.router{
  width: 100%;
  height: auto;
  padding-bottom: 3rem;
}
</style>
