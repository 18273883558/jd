// 商品数量加减相关逻辑
import {useStore} from 'vuex'
import { computed } from 'vue'

export const useCommonCartEffect=(shopId)=>{
  const store=useStore()
  const cartList=store.state.cartList
  const changeCartItemInfo=(shopId,productId,productInfo,num)=>{
    store.commit('changeCartItemInfo',{
      shopId,productId,productInfo,num
    })
    // console.log(shopId,productId,productInfo)
  }

  // 购物车详细信息列表
  const productList=computed(()=>{
    const productList=cartList[shopId]?.productList || {}
    const notEmptyProductList={}
    for(let i in productList){
      const product=productList[i]
      if(product.count>0){
        notEmptyProductList[i]=product
      }
    }
    console.log(notEmptyProductList)
    return notEmptyProductList
  })

  //商铺名
  const shopName=computed(()=>{
    const shopName=cartList[shopId]?.shopName || ''
    return shopName
  })

  const calculations=computed(()=>{
    const productList=cartList[shopId]?.productList  //获取id为shopId的商店下的已加入购物车的商品列表
    const result={total:0,price:0,allChecked:true}
    if(productList){
      // 循环商品列表获取各商品信息
      for(let i in productList){
        const product = productList[i]
        // 总数量total
        // if(product.count){
          result.total += product.count
        // }
        // 总价格price
        if(product.check){
          result.price += (product.count * product.price) 
        }
        // 判断购物车中商品是否全部选中，设置全选图标选中
        if(product.count>0 && product.check==false){
          result.allChecked=false
        }     
      }
    }
    result.price=result.price.toFixed(2)  
    // console.log(result)
    return result
  })

  return {cartList,changeCartItemInfo,productList,shopName,calculations}
}
