<template>
  <div class="wrapper">
      <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png">
      <div class="wrapper_input">
          <input 
            type="text" 
            class="wrapper_input_content" 
            placeholder="请输入用户名"
            v-model="username"
          />
      </div>  
      <div class="wrapper_input">
          <input 
            type="password" 
            class="wrapper_input_content" 
            placeholder="请输入密码"
            v-model="password"
            autocomplete="new-password"
          />
      </div>
      <div class="wrapper_login-button" @click="handleLogin">登录</div>
      <div class="wrapper_login-link" @click="handleRegisterClick">立即注册</div>
  </div>
  <Toast v-if="show" :message="toastMessage"/>
</template>

<script>
import { useRouter } from 'vue-router';
import { post } from '../../utils/request'
import { reactive,toRefs } from 'vue'
import Toast,{useToastEffect} from '../../components/Toast.vue'

// 登录
const useLoginEffect=(showToast)=>{
  // useRouter方法获取到路由实例
  const router=useRouter()
  const data = reactive({
    username:'',
    password:''
  })   
  const handleLogin=async()=>{
    try{
        const{username,password}=data
        if(username.indexOf(' ')!=-1||password.indexOf(' ')!=-1||username==''||password==''){
          showToast('用户名或密码错误')
        }else{
            const result=await post('/api/user/login',{
            username:data.username,
            password:data.password
          })
          console.log(result)
          if(result.errno===0){
            localStorage.isLogin=true
            router.push({name:'Home'})
          }else{
            showToast('登录失败')
          }
        }
      }
    catch(e){
      showToast('请求失败')
    }      
  }
  const {username,password}=toRefs(data)
  // 想当于令username=data.username,password=data.password
  return{username,password,handleLogin}
}

// 跳转注册页面
const useRegisterEffect=()=>{
  const router=useRouter()
  const handleRegisterClick=()=>{
    router.push({name:'Register'})
  }
  return{handleRegisterClick}
}

export default {
  name:'Login',
  components:{
      Toast
  },
  setup(){
    const { show,toastMessage,showToast }=useToastEffect()
    const { username,password,handleLogin }=useLoginEffect(showToast)  
    const { handleRegisterClick }=useRegisterEffect()
    return{handleLogin,handleRegisterClick,username,password,show,toastMessage}
  }
}

// async表示该函数是一个异步函数，意味着该函数的执行不会阻塞后面代码的执行 
// 异步函数的调用跟普通函数一样

// await即等待，用于等待一个Promise对象。
// 它只能在异步函数 async function中使用，否则会报错
// 它的返回值不是Promise对象而是Promise对象处理之后的结果
</script>

<style lang="scss" scoped>
@import '../../style/virables.scss';
.wrapper{
  position: absolute;
  top: 50%;
  left: 0; 
  right: 0;
  transform: translateY(-50%);
  &_img{
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }
  &_input{
    box-sizing: border-box;
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #F9F9F9;
    border: 1px solid rgb(0, 0, 0,0.10);
    border-radius: 6px;
    border-radius: 6px;
    &_content{
      line-height: .48rem;
      border:none;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontcolor;
      &::placeholder{
        color: $content-notice-fontcolor;
      }
    }
  }
  &_login-button{
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: #0091ff;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,225,0.32);
    border-radius: .04rem;
    border-radius: .04rem;
    color: #fff;
    font-size: .16rem;
    text-align: center;
  }
  &_login-link{
    font-size: .14rem;
    color: $content-notice-fontcolor;
    text-align: center;
  }
}
</style>