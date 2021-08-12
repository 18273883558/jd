import { createStore } from 'vuex'

// 缓存购物车
const setLocalCartList=(state)=>{
  const {cartList}=state
  const cartListString=JSON.stringify(cartList)
  localStorage.cartList=cartListString
}

const getLocalCartList=()=>{
  try{
    return JSON.parse(localStorage.cartList || {})
  }
  catch(e){
    return{}
  }
}

export default createStore({
  state: {
    // cartList:{
    //   第一层级是商铺id
      // shopId:{
    //     shopName:'沃尔玛'
    //     productList:{
              // productId:{
                // price:''
              // }
    //     }
    //   },
    // }
    cartList:getLocalCartList()
  },
  mutations: {
    // 商品数量更改逻辑
    changeCartItemInfo(state,payload){
      const {shopId,productId,productInfo} = payload
      let shopInfo=state.cartList[shopId] || {
        shopName:'',productList:{}
      }
      let product=shopInfo.productList[productId]
      if(!product){ 
        productInfo.count=0
        product=productInfo
      }
      product.count = product.count+payload.num
      if(payload.num>0){product.check=true}
      if(product.count<0){product.count=0}
      shopInfo.productList[productId]=product
      state.cartList[shopId]=shopInfo
      // console.log(state.cartList)
      setLocalCartList(state) 
    },

    changeShopName(state,payload){
      const {shopId,shopName}=payload
      const shopInfo=state.cartList[shopId] || {
        shopName:'',productList:{}
      }
      shopInfo.shopName=shopName
      state.cartList[shopId]=shopInfo
      setLocalCartList(state) 
    },

    // 更改购物车中商品选中状态
    changeCartItemChecked(state,payload){
      const {shopId,productId}=payload
      const product=state.cartList[shopId].productList[productId]
      product.check=!product.check
      setLocalCartList(state) 
    },
    // 清空购物车
    cleanCartProducts(state,payload){
      const {shopId}=payload
      state.cartList[shopId].productList={}
      setLocalCartList(state) 
    },

    // 点击全选
    setCartItemsChecked(state,payload){
      const {shopId}=payload
      const products=state.cartList[shopId].productList
      if(products){
        for(let key in products){
          const product=products[key]
          product.check=true
        }
      }
      setLocalCartList(state) 
    },
    clearCartData(state,shopId){
      state.cartList[shopId].productList={}
    }
  },
  actions: {
  },
  modules: {
  }
})
