<template>
<div class="wrapper">
  <div class="search">
    <div 
      class="search_back iconfont"
      @click="handleBackClick"
    >
      &#xe64e;
    </div>
    <div class="search_content">
      <span class="search_content_icon iconfont">&#xe677;</span>
      <input 
        class="search_content_input" 
        placeholder="请输入商品名称"
      />
    </div>
  </div>
  <shop-info :item="item" :hideBorder="true" v-show="item.imgUrl"/>
  <Content />
</div>
</template>
 
<script>
import {useRouter,useRoute} from 'vue-router'
import {get} from '../../utils/request.js'
import {reactive,toRefs} from 'vue'
import ShopInfo from '@/components/ShopInfo.vue'
import Content from './Content.vue'

const useShopInfoEffect=()=>{
  // $route对象表示当前的路由信息，包含了当前 URL 解析得到的信息。包含当前的路径，参数
    const route=useRoute()
  // 更新一个大的响应式对象,用reactive定义这个对象,不用ref
    const data=reactive({
      item:{}
    })
    const getItemData=async()=>{
      const result=await get(`/api/shop/${route.params.id}`)
      if(result.errno===0 && result.data){
        data.item=result.data
      }
      // console.log(result)
    }
    const {item} =toRefs(data)  //令item=data.item
    return{item,getItemData}
}

// 点击回退
const useBackRouterEffect=()=>{
  // useRouter方法获取到全局路由实例
  const router=useRouter()
  const handleBackClick=()=>{
    router.back()
  }
  return handleBackClick
}

export default {
  name:'Shop',
  components:{
    ShopInfo,
    Content
  },
  setup(){
    const {item,getItemData}=useShopInfoEffect()
    getItemData()
    const handleBackClick=useBackRouterEffect()
    return{item,handleBackClick}
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/virables.scss';
  .wrapper{
    padding: 0 .18rem;
  }
  .search{
    margin: .14rem 0 .04rem 0;
    display: flex;
    line-height: .32rem;
    &_back{
      width: .3rem;
      font-size: .24rem;
      color: #b6b6b6;
    }
    &_content{
      display: flex;
      flex: 1;
      background: $search-bgColor;
      border-radius: .16rem;
      &_icon{
        width: .44rem;
        text-align: center;
        color: $search-fontColor;
      }
      &_input{
        display: block;
        width: 100%;
        padding-right: .2rem;
        border: none;
        outline: none;
        background: none;
        height: .32rem;
        font-size: .14rem;
        color: $content-fontColor;
        &::placeholder{
          color: $content-fontColor;
        }
      }
    }
  }
</style>