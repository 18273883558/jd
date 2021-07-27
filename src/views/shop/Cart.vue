<template>
  <div class="cart">
    <div class="product">
      <div 
        class="product_item" 
        v-for="(item,index) in  productList"
        :key={index}
      >
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
            @click="()=>{changeCartInfo(shopId,item._id,item,-1)}"
          >
            -
          </span>
          {{item.count || 0}}
          <span 
            class="product_number_plus"
            @click="()=>{changeCartInfo(shopId,item._id,item,1)}"
          >
            +
          </span>
        </div>
      </div> 
    </div>
    <div class="check">
      <div class="check_icon">
        <img 
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check_icon_img"
        >
        <div class="check_icon_tag">{{total}}</div>
      </div>
      <div class="check_info">
        总计：<span class="check_info_price">&yen; {{price}}</span>
      </div>
      <div class="check_btn">
        去结算
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute} from 'vue-router'

// 获取购物车信息逻辑
const useCartEffect=(shopId)=>{
  const store=useStore()
  const cartList=store.state.cartList

  //购物车商品数量
  const total=computed(()=>{
    const productList=cartList[shopId]
    let count=0
    if(productList){
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

  // 购物车总价格
  const price=computed(()=>{
    const productList=cartList[shopId]
    let price=0
    if(productList){
      for(let i in productList){
        const product = productList[i]
        if(product.count){
          price += (product.count * product.price)            
        }           
      }      
    }      
    // price保留两位小数
    return price.toFixed(2)
  })

  // 购物车详细信息列表
  const productList=computed(()=>{
    const productList=cartList[shopId] || []
    return productList
  })
  return {total,price,productList}
}

export default {
  name:'Cart',
  setup(){
    const route=useRoute()
    const shopId=route.params.id
    const{total,price, productList}=useCartEffect(shopId)
    return {total,price, productList}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/virables.scss';
.cart{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
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
      color: #fff;
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
    color: #fff;
    font-size: .14rem;
  }
}
.product{
  flex: 1;
  overflow-y: scroll;
  background: #fff;
  &_item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
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
      bottom: .12rem;
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
</style>