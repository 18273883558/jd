<template>
  <div class="content">
    <div class="category">
      <div 
        :class="{'category_item':true,'category_item--active':currentTab===item.tab}"
        v-for="item in categories"
        :key="item.name"
        @click="()=>handleTabClick(item.tab)"
      >
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <div 
        class="product_item" 
        v-for="(item,index) in list"
        :key={index}
      >
        <img class="product_item_img" :src="item.imgUrl" alt="">
        <div class="product_item_detail">
          <h4 class="product_item_title">{{item.name}}</h4>
          <p class="product_item_sales">月售{{item.sales}}件</p>
          <p class="product_item_price">
            <span class="product_item_yen">&yen;</span>{{item.price}}
            <span class="product_item_origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product_number">
          <span class="product_number_minus">-</span>
          0
          <span class="product_number_plus">+</span>
        </div>
      </div> 
    </div>    
  </div>
</template>

<script>
import {reactive,toRefs,ref,watchEffect} from 'vue'
import {useRoute} from 'vue-router'
import {get} from '../../utils/request'

const categories=[
  {name:'全部商品',tab:'all'},
  {name:'秒杀',tab:'seckill'},
  { name:'新鲜水果',tab:'fruit'}
]

const useTabEffect=()=>{
  const currentTab=ref(categories[0].tab)
  const handleTabClick=(tab)=>{
    currentTab.value=tab
  }
  return {currentTab,handleTabClick}
}

const useCurrentListEffect=(currentTab)=>{
  const route=useRoute()
  const shopId=route.params.id
  const content=reactive({
    list:[]
  })

  const getContentData=async()=>{
    const result =await get(`/api/shop/${shopId}/products`,{tab:currentTab.value})
    if(result.errno===0 && result.data.length){
     content.list=result.data
    }
    console.log(result) 
  }

  // watchEffect()方法接收一个函数对象作为参数，它会立即运行该函数，同时响应式地跟踪其依赖项，并在依赖项发生改变时重新运行该函数
  watchEffect(()=>{
    getContentData()
  })

  const {list}=toRefs(content)
  return {list}
}  

export default {
  name:'Content',
  setup(){
    const {currentTab,handleTabClick}=useTabEffect()
    const {list}=useCurrentListEffect(currentTab)
    return {categories,currentTab,handleTabClick,list}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.content{
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category{
  overflow-y: scroll;
  height: 100%;
  width: .76rem;
  background: $search-bgColor;
  &_item{
    line-height: .4rem;
    text-align: center;   
    font-size: .14rem;
    color: $content-fontColor;
    &--active{
      background: $bgColor;
    }
  }
}
.product{
  flex: 1;
  overflow-y: scroll;
  &_item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &_detail{
      overflow: hidden;
    }
    &_img{
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }
    &_title{
      margin:0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontColor;
      @include ellipsis 
    }
    &_sales{
      margin:.06rem 0;
      line-height: .16rem;
      font-size: .12rem;
      color: $content-fontColor;  
    }
    &_price{
      margin:0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &_yen{
      font-size: .12rem;
    }
    &_origin{
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }
    .product_number{
      position:absolute;
      right: 0;
      bottom: .12rem;
      &_minus,&_plus{
        display: inline-block;
        width: .2rem;
        height: .2rem;
        line-height: .16rem;
        border-radius: 50%;
        border: .01rem solid $medium-fontColor;
        font-size: .2rem;
        text-align: center;
      }
      &_minus{
        border: .01rem solid $medium-fontColor;
        color: $medium-fontColor;
        margin-right: .05rem;
      }
      &_plus{
        background: $btn-bgColor;
        color: $bgColor;
        margin-left: .05rem;
      }    
    }
  }
}
</style>