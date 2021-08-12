<template>
  <div 
    class="mask" 
    v-if="showCart && calculations.total >0"
    @click="handleCartShowChange"
  >
  </div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total>0">
      <div class="product_header">
        <div class="product_header_all" @click="()=>setCartItemsChecked(shopId)">
          <span 
            class="product_header_icon iconfont"
            v-html="calculations.allChecked? '&#xe70f;' : '&#xe66c; '"
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
      <div
        v-for="item in  productList"
        :key='item._id'
        class="product_item"
      >
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
            class="product_number_minus iconfont"
            @click="()=>{changeCartItemInfo(shopId,item._id,item,-1)}"
          >
            &#xe701;
          </span>
          {{item.count || 0}}
          <span 
            class="product_number_plus iconfont"
            @click="()=>{changeCartItemInfo(shopId,item._id,item,1)}"
          >
            &#xe667;
          </span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check_icon">
        <img 
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check_icon_img"
          @click="handleCartShowChange"
        >
        <div class="check_icon_tag">{{calculations.total}}</div>
      </div>
      <div class="check_info">
        总计：<span class="check_info_price">&yen; {{calculations.price}}</span>
      </div>
      <div class="check_btn" v-show="calculations.total>0">
        <router-link :to="{path:'/orderConfirmation/'+shopId}">去结算</router-link> 
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'
import {useCommonCartEffect} from '../../effects/cartEffects'


// 获取购物车信息逻辑
const useCartEffect=(shopId)=>{
  const {calculations,changeCartItemInfo,productList} =useCommonCartEffect(shopId)
  const store=useStore()

  
  
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
    productList,changeCartItemInfo,setCartItemsChecked,
    changeCartItemChecked,cleanCartProducts,calculations
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
      calculations,productList,changeCartItemInfo,setCartItemsChecked,
      changeCartItemChecked,cleanCartProducts
    }=useCartEffect(shopId)
    const{showCart,handleCartShowChange}=toggleCartEffect()
    return {
      shopId,calculations, productList,setCartItemsChecked,showCart,
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
    border-bottom: .01rem solid $content-bgColor;
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
      &_minus{
        position: relative;
        top: .01rem;
        color: $medium-fontColor;
        margin-right: .05rem;
      }
      &_plus{
        color: $btn-bgColor;
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