<template>
  <div>
    <div class="wrapper">
      <StaticPart />
      <Nearby />
    </div>  
    <Docker />
  </div>  
</template>

<script>
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from './Docker.vue'
export default {
    name:'Home',
    components:{
      StaticPart,
      Nearby,
      Docker
    }
}
</script>


<style lang="scss" scoped>
.wrapper{
  overflow: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  padding: 0 .18rem .2rem .18rem;
}

</style>
