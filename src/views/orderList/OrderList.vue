<template>
  <div class="wrapper">
    <div class="title">
      我的订单
    </div>
    <div class="orders">
      <div 
        class="order" 
        v-for="(item,index) in list"
        :key="index"
      >
        <div class="order_title">
          {{item.shopName}}
          <span class="order_status">{{item.isCanceled? '已取消':'已下单'}}</span>
        </div>
        <div class="order_content">
          <div class="order_content_imgs">
            <template
              v-for="(innerItem,innerIndex) in item.products"
              :key="innerIndex"
            >
              <img 
                class="order_content_img" 
                :src="innerItem.product.img"
                v-if="innerIndex <= 3"
              >
            </template>
          </div>
          <div class="order_content_info">
            <div class="order_content_price">
              ￥{{item.totalPrice}}
            </div>
            <div class="order_content_count">
              共{{item.totalNumber}}件
            </div>
          </div>
        </div>
      </div>     
    </div>
  </div>  
  <Docker :currentIndex="2"/>
</template>

<script>
import {reactive,toRefs} from 'vue'
import {get} from '../../utils/request.js'
import Docker from '../../components/Docker.vue'

 
// 订单列表逻辑
const useOrderListEffect=()=>{
  const data=reactive({list:[]})
  const getNearbyList=async()=>{
    const result=await get('/api/order')
    if(result?.errno===0 && result?.data?.length){
      const orderList=result.data
      orderList.forEach((order)=>{
        const products=order.products || []
        let totalPrice=0
        let totalNumber=0
        products.forEach((productItem)=>{
          totalNumber+=(productItem?.orderSales || 0)
          totalPrice+=((productItem?.product?.price*productItem?.orderSales) || 0)
        })
        order.totalPrice=totalPrice.toFixed(2)
        order.totalNumber=totalNumber
      })
      console.log(orderList)
      data.list=result.data
    }      
  }
  getNearbyList()
  const {list}=toRefs(data)
  return {list}
}

export default {
  name:'OrderList',
  components:{
    Docker
  },
  setup(){
    const {list}=useOrderListEffect()
    console.log(list)
    return {list}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper{
  overflow: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  background: rgb(248,248,248);
}
.title{
  line-height: .44rem;
  background: $bgColor;
  font-size: .16rem;
  color: $content-fontColor;
  text-align: center;
}
// .orders{

// }
.order{
  margin: .16rem .18rem;
  padding: .16rem;
  background: $bgColor;
  &_title{
    margin-bottom: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontColor;
  }
  &_status{
    float: right;
    font-size: .14rem;
    color: $light-fontColor;
  }
  &_content{
    display: flex;
    &_imgs{
      flex: 1;
    }
    &_img{
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &_info{
      width: .7rem;
    }
    &_price{
      margin-bottom: .04rem;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
      text-align: right;
    }
    &_count{
      line-height: .14rem;
      font-size: .12rem;
      color: $content-fontColor;
      text-align: right;
    }
  }
}
</style>