<template>
  <div class="order">
    <div class="order_price">
      实付金额<b>￥{{calculations.price}}</b>
    </div>
    <div class="order_btn" @click="()=>handleShowConfirmChange(true)">
      提交订单
    </div>
  </div>
  <div class="mask" v-show="showConfirm" @click="()=>handleShowConfirmChange(false)">
    <div class="mask_content" @click.stop>
      <h3 class="mask_content_title">确认要离开收银台吗</h3>
      <p class="mask_content_desc">请尽快完成支付，否则会被取消</p>
      <div class="mask_content_btns">
        <div 
          class="mask_content_btn mask_content_btn-first"
          @click="()=>handleConfirmOrder(true)"
        >
          取消订单
        </div>
        <div 
          class="mask_content_btn mask_content_btn-last"
          @click="()=>handleConfirmOrder(false)"
        >
          确认支付
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import {useStore} from 'vuex'
import { post } from '../../utils/request'
import {useCommonCartEffect} from '../../effects/cartEffects'


// 下单相关逻辑
const useMakeOrderEffect=(shopId,shopName,productList)=>{
  const router=useRouter()
  const store=useStore()
  const handleConfirmOrder=async(isCanceled)=>{
    // console.log(productList.value)
    const products=[]
    for(let i in productList.value){
      const product=productList.value[i]
      products.push({id:parseInt(product._id),num:product.count})
    }
    // console.log(products)
    try{
      const result=await post('/api/order',{
        addressId:1,
        shopId:shopId,
        shopName:shopName.value,
        isCanceled:isCanceled,
        products:products
      })
      console.log(result)
      if(result.errno===0){
        store.commit('clearCartData',shopId)
        router.push({name:'OrderList'})
      }
    }
    catch(e){
      console.log(e)
    }      
  }
  return {handleConfirmOrder}
}

// 蒙层展示
const useShowMaskEffect=()=>{
  const showConfirm=ref(false)
  const handleShowConfirmChange=(status)=>{
    showConfirm.value=status
  }
  return {showConfirm,handleShowConfirmChange}
}

export default {
  name:'Order',

  setup(){
    const route=useRoute() 
    const shopId=parseInt(route.params.id,10)
    const {calculations,shopName,productList}=useCommonCartEffect(shopId)
    const {handleConfirmOrder}=useMakeOrderEffect(shopId,shopName,productList)
    const {showConfirm,handleShowConfirmChange} = useShowMaskEffect()

    return{showConfirm,handleShowConfirmChange,calculations,handleConfirmOrder}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';

.order{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;
  &_price{
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontColor;
  }
  &_btn{
    width: .98rem;
    background: #4fb0f9;
    color: $bgColor;
    text-align: center;
    font-size: .14rem;
  }
}
.mask{
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,.50);
  &_content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    text-align: center;
    border-radius: .04rem;
    &_title{
      margin: .24rem 0 0 0;
      line-height: .26rem;
      font-size: .18rem;
      color: #333;
      text-align: center;
    }
    &_desc{
      margin-top: .08rem 0 0 0;
      font-size: .14rem;
      color: #666;
    }
    &_btns{ 
      display: flex;
      margin: .24rem .58rem ;
    }
    &_btn{
      flex: 1;
      width: .9rem;
      line-height: .32rem;
      border-radius: .16rem;
      font-size: .14rem;
      &-first{
        margin-right: .12rem;
        border: .01rem solid #4fb0f9;
        color: #4fb0f9;
      }
      &-last{
        margin-left: .12rem;
        background: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>