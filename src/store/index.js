import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList:{
    //   第一层级是商铺id
      // 1:{
    //     第二层是商品id
    //     第二层内容是商品内容以及购物数量
    //     111:{

    //     }
    //   },
    //   2:{

    //   }
    }
  },
  mutations: {
    changeCartInfo(state,payload){
      const {shopId,productId,productInfo} = payload
      let shopInfo=state.cartList[shopId]
      if(!shopInfo){ shopInfo={} }
      let product=shopInfo[productId]
      if(!product){ 
        product=productInfo
        product.count=0 
      }
      product.count = product.count+payload.num
      if(product.count<0){product.count=0}
      shopInfo[productId]=product
      state.cartList[shopId]=shopInfo
      // console.log(shopInfo)
    }
  },
  actions: {
  },
  modules: {
  }
})
