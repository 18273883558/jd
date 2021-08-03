// 商品数量加减相关逻辑
import {useStore} from 'vuex'

export const useCommonCartEffect=()=>{
  const store=useStore()
  const cartList=store.state.cartList
  const changeCartItemInfo=(shopId,productId,productInfo,num)=>{
    store.commit('changeCartItemInfo',{
      shopId,productId,productInfo,num
    })
    // console.log(shopId,productId,productInfo)
  }
  return {cartList,changeCartItemInfo}
}