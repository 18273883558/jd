<template>
<div class="nearby">
  <h3 class="nearby_title">附件店铺</h3>
  <router-link :to='"/shop/"+item._id' v-for="item in nearbyList" :key="item._id">
    <shop-info :item=item />
  </router-link>
</div>
</template>

<script>
import {ref} from 'vue'
import {get} from '../../utils/request.js'
import ShopInfo from '@/components/ShopInfo.vue'

const useNearbyListEffect=()=>{
  // ref创建响应式数据，数据变化，页面跟着变化
  const nearbyList=ref([])
  const getNearbyList=async()=>{
    const result=await get('/api/shop/hot-list')
    if(result?.errno===0 && result?.data?.length){
      nearbyList.value=result.data
    }
    // console.log(result.data)
  }
  return{nearbyList,getNearbyList}
}

export default{
  name:'Nearby',
  components:{
    ShopInfo
  },
  setup(){
    const{nearbyList,getNearbyList}=useNearbyListEffect()
    getNearbyList()
    return {nearbyList}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.nearby{
  &_title{
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    color: $content-fontColor;
    font-weight: normal;
  }
  a{
    text-decoration: none;
  }
}
</style>