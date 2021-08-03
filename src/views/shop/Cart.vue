<template>
  <div 
    class="mask" 
    v-if="showCart"
    @click="handleCartShowChange"
  >
  </div>
  <div class="cart">
    <div class="product" v-if="showCart">
      <div class="product_header">
        <div class="product_header_all" @click="()=>setCartItemsChecked(shopId)">
          <span 
            class="product_header_icon iconfont"
            v-html="allChecked? '&#xe70f;' : '&#xe66c; '"
          >
          </span>  
          全选
        </div>
        <div 
          class="product_header_clear" 
        >
          <span
            class="product_header_clear_btn"
            @click="()=>cleanCartProducts(shopId)"  
          >
            清空购物车
          </span>
        </div>
      </div>
      <template      
        v-for="(item,index) in  productList"
        :key={index}
      > 
        <div class="product_item" v-if="item.count>0">
          <div 
            class="product_item_checked iconfont"
            v-html="item.check? '&#xe70f;':'&#xe66c;'"
            @click="()=>{changeCartItemChecked(shopId,item._id)}"
          >
            
          </div>
          <img class="product_item_img" :src="item.imgUrl" alt="">
          <div class="product_item_detail">
            <h4 class="product_item_title">{{item.name}}</h4>
            <p class="product_item_price">
              <span class="product_item_yen">&yen;</span>{{item.price}}
              <span class="product_item_origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product_number">
            <span 
              class="product_number_minus"
              @click="()=>{changeCartItemInfo(shopId,item._id,item,-1)}"
            >
              -
            </span>
            {{item.count || 0}}
            <span 
              class="product_number_plus"
              @click="()=>{changeCartItemInfo(shopId,item._id,item,1)}"
            >
              +
            </span>
          </div>
        </div>
      </template> 
    </div>
    <div class="check">
      <div class="check_icon">
        <img 
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check_icon_img"
          @click="handleCartShowChange"
        >
        <div class="check_icon_tag">{{total}}</div>
      </div>
      <div class="check_info">
        总计：<span class="check_info_price">&yen; {{price}}</span>
      </div>
      <div class="check_btn">
        <router-link :to="{name:'Home'}">去结算</router-link> 
      </div>
    </div>
  </div>
</template>

<script>
import {computed,ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {useCommonCartEffect} from './commonCartEffect.js'


// 获取购物车信息逻辑
const useCartEffect=(shopId)=>{
  const {changeCartItemInfo} =useCommonCartEffect()
  const store=useStore()
  const cartList=store.state.cartList

  //购物车图标上显示的各商品总数量
  const total=computed(()=>{
    const productList=cartList[shopId]?.productList  //获取id为shopId的商店下的已加入购物车的商品列表
    let count=0
    if(productList){
      // 循环商品列表获取各商品数量,计算各商品总数量count
      for(let i in productList){
        const product = productList[i]
        if(product.count){
          count += product.count
        } 
        // console.log(count)
      }
    }      
    return count
  })

  // 判断购物车中商品是否全部选中，设置全选图标选中
  const allChecked=computed(()=>{
    const productList=cartList[shopId]?.productList 
    let result=true
    if(productList){
      for(let i in productList){
        const product = productList[i]
        if(product.count>0 && product.check==false){
          result=false
        }        
      }     
    }
    return result 
  })

  // 购物车总价格
  const price=computed(()=>{
    const productList=cartList[shopId]?.productList  //获取id为shopId的商店下的已加入购物车的商品列表
    let price=0
    if(productList){
      // 循环购物车列表获取各商品的数量和价格,并计算总价格price
      for(let i in productList){
        const product = productList[i]
        if(product.check){
          price += (product.count * product.price) 
        }          
      }      
    }      
    // price保留两位小数
    return price.toFixed(2)
  })

  // 购物车详细信息列表
  const productList=computed(()=>{
    const productList=cartList[shopId]?.productList || []
    return productList
  })
  
  // 更改购物车中商品选中状态
  const changeCartItemChecked=(shopId,productId)=>{
    store.commit('changeCartItemChecked',{
      shopId,productId
    })
    // console.log(shopId,productId,productInfo)
  }

  // 清空购物车
  const cleanCartProducts=(shopId)=>{
    store.commit('cleanCartProducts',{shopId})
  }
  // 点击全选
  const setCartItemsChecked=(shopId)=>{
     store.commit('setCartItemsChecked',{shopId})
  }

  return {
    total,price,productList,changeCartItemInfo,setCartItemsChecked,
    changeCartItemChecked,cleanCartProducts,allChecked
  }
}

// 购物车的展示与隐藏
const toggleCartEffect=()=>{
  const showCart=ref(false)
  const handleCartShowChange=()=>{
    showCart.value=!showCart.value
  }
  return {showCart,handleCartShowChange}
}

export default {
  name:'Cart',
  setup(){
    const route=useRoute()
    const shopId=route.params.id

    const{
      total,price, productList,changeCartItemInfo,setCartItemsChecked,
      changeCartItemChecked,cleanCartProducts,allChecked
    }=useCartEffect(shopId)
    const{showCart,handleCartShowChange}=toggleCartEffect()
    return {
      shopId,total,price, productList,allChecked,setCartItemsChecked,showCart,
      changeCartItemInfo,changeCartItemChecked,cleanCartProducts,handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/virables.scss';
.mask{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,.5);
  z-index: 1;
}
.cart{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: $bgColor;
}

.product{
  flex: 1;
  overflow-y: scroll;
  background: $bgColor;
  &_header{
    display: flex; 
    border-bottom: 1px solid $content-bgColor;
    line-height: .52rem;
    font-size: .14rem;
    color: $content-fontColor;
    &_all{
      width: .64rem;
      margin-left: .18rem;
    }
    &_icon{
      display: inline-block;
      color: $btn-bgColor;
      margin-right: .1rem;
      font-size: .2rem;
      vertical-align: top;
    }
    &_clear{
      flex: 1;
      margin-right: .16rem;
      text-align: right;
      &_btn{
        display: inline-block;
      }
    }
  }
  &_item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &_checked{
      line-height: .5rem;
      margin-right: .2rem;
      color: $btn-bgColor;
      font-size: .2rem;
    }
    &_detail{
      overflow: hidden;
    }
    &_img{
      width: .46rem;
      height: .46rem;
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
      margin:.06rem 0 0 0;
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
      bottom: .26rem;
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

.check{
  display: flex;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;
  &_icon{
    position: relative;
    width: .84rem;
    &_img{
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }
    &_tag{
      position: absolute;
      left: .46rem;
      top: .04rem;
      padding: 0 .04rem;
      min-width:.2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: $hightlight-fontColor;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &_info{
    flex: 1;   
    color: $content-fontColor;
    font-size: .12rem;
    &_price{
      color: $hightlight-fontColor;
      font-size: .18rem;
    }
  }
  &_btn{
    width: .98rem;
    background-color:#4fb0F9 ;
    text-align: center;
    font-size: .14rem;
    a{
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>