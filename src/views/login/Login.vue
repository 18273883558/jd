<template>
    <div class="wrapper">
        <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png">
        <div class="wrapper_input">
            <input type="text" class="wrapper_input_content" placeholder="请输入手机号"/>
        </div>
        <div class="wrapper_input">
            <input type="text" class="wrapper_input_content" placeholder="请输入密码"/>
        </div>
        <div class="wrapper_login-button">登录</div>
        <div class="wrapper_login-link">立即注册</div>
    </div>
</template>

<script>
export default {
    name:'login'
}
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