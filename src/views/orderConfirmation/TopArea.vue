<template>
  <div class="top">
    <div class="top_header">
      <div 
        class="iconfont top_header_back"
        @click="handleBackClick"
      >
        &#xe64e;
      </div>
      确认订单
    </div>
    <div class="top_receiver">
      <div class="top_receiver_title">收货地址</div>
      <div class="top_receiver_address">北京理工大学国防科技园2号楼10层106</div>
      <div class="top_receiver_info">
        <span class="top_receiver_info_name">刘</span>
        <span class="top_receiver_info_name">888888</span>
      </div>
      <div class="iconfont top_receiver_icon">&#xe64e;</div>
    </div>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'

export default {
  name:'TopArea',
  setup(){
    const router=useRouter()
    const handleBackClick=()=>{
      router.back()
    }
    return{handleBackClick}
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.top{
  position: relative;
  height: 1.96rem;
  background-size: 100% 1.59rem;
  background: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
  &_header{
    position: relative;
    padding-top: .2rem;
    line-height: .24rem;
    color: $bgColor;
    text-align: center;
    font-size: .16rem;
    &_back{
      position: absolute;
      left: .18rem;  
      font-size: .22rem;    
    }
  }
  &_receiver{
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    height: 1.11rem;
    background: $bgColor;
    border-radius: .04rem;
    &_title{
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: $content-fontColor;
    }
    &_address{
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      color: $content-fontColor;
    }
    &_info{
      padding: .06rem 0 0 .16rem;
      &_name{
        margin-right: .06rem;
        line-height: .18rem;
        font-size: .12rem;
        color: $medium-fontColor;
      }
    }
    &_icon{
      transform: rotate(180deg);
      position: absolute;
      right: .16rem;
      top: .5rem;
      color: $medium-fontColor;
      font-size: .16rem;
    }
  }
}
</style>