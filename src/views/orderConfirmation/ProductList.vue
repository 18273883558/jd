<template>
  <div class="products">
    <div class="products_title">
      {{shopName}}
    </div>  
    <div class="products_wrapper">
      <div class="products_list">
        <div 
          v-for="item in productList"
          :key="item._id"
          class="products_item" 
        >
          <img class="products_item_img" :src="item.imgUrl" alt="">
          <div class="products_item_detail">
            <h4 class="products_item_title">{{item.name}}</h4>      
            <p class="products_item_price">
              <span>
                <span class="products_item_yen">&yen;</span>
                {{item.price}}×{{item.count}}
              </span>
              <span class="products_item_total">
                <span class="products_item_yen">&yen;</span>
                {{(item.price*item.count).toFixed(2)}}
              </span>
            </p>
          </div>
        </div> 
      </div>
    </div>  
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {useCommonCartEffect} from '../../effects/cartEffects'


export default {
  name:'ProductList',

  setup(){
    const route=useRoute() 
    const shopId=route.params.id
    const {productList,shopName}=useCommonCartEffect(shopId)

    return{productList,shopName}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
@import '../../style/mixins.scss';
.products{
  margin: .16rem .18rem .1rem .18rem; 
  background: $bgColor;
  &_title{
    font-size: .16rem;
    padding: .16rem;
    color: $content-fontColor;
  }
  &_wrapper{
    overflow-y: scroll;
    margin:0 .18rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.6rem;
  }
  &_list{
    background: $bgColor;
  }
  &_item{
    position: relative;
    display: flex; 
    padding: 0 .16rem .16rem .16rem;
    &_img{
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &_detail{
      flex: 1;
    }
    &_title{
      margin:0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontColor;
      @include ellipsis 
    }
    &_price{
      display: flex;
      margin:.06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &_total{
      text-align: right;
      flex: 1;
      color: $dark-fontColor;
    }
    &_yen{
      font-size: .12rem;
    }
  }
}
</style>