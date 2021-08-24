<template>
  购物车页面
  <Docker :currentIndex="1"/>
</template>

<script>
import Docker from '../../components/Docker.vue'
export default {
  name:'CartList',
  components:{
    Docker
  }
}
</script>