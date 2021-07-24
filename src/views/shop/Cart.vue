<template>
  <div class="cart">
    <div class="check">
      <div class="check_icon">
        <img 
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check_icon_img"
        >
        <div class="check_icon_tag">1</div>
      </div>
      <div class="check_info">
        总计：<span class="check_info_price">&yen;127</span>
      </div>
      <div class="check_btn">
        去结算
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
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
      right: .2rem;
      top: .04rem;
      width:.2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: #e93b3b;
      border-radius: 50%;
      font-size: .12rem;
      text-align: center;
      color: #fff;
      transform: scale(.5);
    }
  }
  &_info{
    flex: 1;   
    color: #333;
    font-size: .12rem;
    &_price{
      color: #e93b3b;
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
</style>