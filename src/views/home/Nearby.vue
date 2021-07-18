<template>
<div class="nearby">
  <h3 class="nearby_title">附件店铺</h3>
  <div 
    v-for="item in nearbyList"
    :key="item.id"
    class="nearby_item"
  >
    <img :src="item.imgUrl" class="neaby_item_img">
    <div class="nearby_content">
      <div class="nearby_content_title">{{item.title}}</div>
      <div class="nearby_content_tags">
        <span 
          class="nearby_content_tag"
          v-for="(innerItem,index) in item.tags"
          :key="index"
        >
          {{innerItem}}
        </span>
      </div>
      <p class="nearby_content_highlight">
        {{item.desc}}
      </p>
    </div>     
  </div>
</div>
</template>

<script>
export default {
  name:'Nearby',
  setup(){
    const nearbyList=[
      {
        id:1,
        imgUrl:'http://www.dell-lee.com/imgs/vue3/near.png',
        title:'沃尔玛',
        tags:['月售一万+','起送￥0','基础运费￥5'],
        desc:'VIP尊享满89元减4元运费券（每月3张）'
      },
      {
        id:2,
        imgUrl:'http://www.dell-lee.com/imgs/vue3/near.png',
        title:'沃尔玛',
        tags:['月售一万+','起送￥0','基础运费￥5'],
        desc:'VIP尊享满89元减4元运费券（每月3张）'
      },
      {
        id:3,
        imgUrl:'http://www.dell-lee.com/imgs/vue3/near.png',
        title:'沃尔玛',
        tags:['月售一万+','起送￥0','基础运费￥5'],
        desc:'VIP尊享满89元减4元运费券（每月3张）'
      }
    ]
    return{nearbyList}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.nearby{
  &_title{
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    color: $content-fontcolor;
    font-weight: normal;
  }
  &_item{
    display: flex;
    padding-top: .12rem;   
    img{
      margin-right: .16rem;
      width: .56rem;
      height: .56rem;
    }
  }
  &_content{
    flex: 1;  //让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
    padding-bottom: .12rem;
    border-bottom: 1px solid $content-bgcolor;
    &_title{
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &_tags{
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }
    &_tag{
      margin-right: .16rem;
    }
    &_highlight{
      margin: .08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color: #e93b3b;
    }
  }
}
</style>