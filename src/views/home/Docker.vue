<template>
  <div class="docker">
    <div 
      v-for="(item,index) in dockerList"
      :class="{'docker_item':true,'docker_item--active':index===0}" 
      class="docker_item"
      :key="item.icon"
    >
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker_title">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Docker',
    // setup()函数返回一个对象，该对象的属性可以在模板中使用
    setup(){
      const dockerList=[
          {icon:'&#xe719;',text:'首页'},
          {icon:'&#xe603;',text:'购物车'},
          {icon:'&#xe61e;',text:'订单'},
          {icon:'&#xe610;',text:'我的'}
      ]
      return{dockerList}   
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.docker{
  display: flex;
  position: absolute;
  padding: 0 .18rem;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid $content-bgcolor;
  color: $content-fontcolor;
}
.docker_item{
  flex: 1;
  text-align: center;
  .iconfont{
    font-size: .18rem;
    margin: .07rem 0 .02rem 0;
  }
}
.docker_item--active{
  color: #1FA4FC;
}

.docker_title{
  font-size: .2rem;
  transform: scale(0.5,0.5);
  transform-origin: center top;
}
</style>

