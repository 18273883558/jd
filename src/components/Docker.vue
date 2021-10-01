<template>
  <div class="docker">
    <div 
      v-for="(item,index) in dockerList"
      :class="{'docker_item':true,'docker_item--active':index===currentIndex}" 
      class="docker_item"
      :key="item.icon"
    > 
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon"></div>
        <div class="docker_title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    name:'Docker',
    props:['currentIndex'],
    // setup()函数返回一个对象，该对象的属性可以在模板中使用
    setup(){
      const dockerList=[
          {icon:'&#xe719;',text:'首页',to:{name:'Home'}},
          // {icon:'&#xe603;',text:'购物车',to:{name:'CartList'}},
          {icon:'&#xe61e;',text:'订单',to:{name:'OrderList'}},
          // {icon:'&#xe610;',text:'我的',to:{name:'Home'}}
      ]
      return{dockerList}   
    }
}
</script>

<style lang="scss" scoped>
@import '../style/virables.scss';
.docker{
  display: flex;
  position: absolute;
  padding: 0 .18rem;
  box-sizing: border-box;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: .01rem solid $content-bgColor;
}
.docker_item{
  flex: 1;
  text-align: center;
  a{
    color: $content-fontColor;
    text-decoration: none;
  }
  .iconfont{
    font-size: .18rem;
    margin: .07rem 0 .02rem 0;
  }
}
.docker_item--active{
  a{
    color: #1FA4FC;
  }
}

.docker_title{
  font-size: .2rem;
  transform: scale(0.5,0.5);
  transform-origin: center top;
}
</style>

