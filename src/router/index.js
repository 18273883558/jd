import { createRouter,  createWebHistory,} from 'vue-router'
// import Home from '../views/home/Home.vue'
// import Login from '../views/login/Login.vue'
// import Register from '../views/register/Register.vue'
// import Shop from '../views/shop/Shop.vue' 

const routes = [
  {
    path: '/',
    name: 'Home',
    component:()=>import (/* webpackChunkName: "home" */'../views/home/Home.vue')
  },
  {
    path:'/cartList',
    name:'CartList',
    component:()=>import (/* webpackChunkName: "register" */'../views/cartList/CartList.vue')
  },
  {
    path:'/shop/:id',
    name:'Shop',
    component:()=>import (/* webpackChunkName: "shop" */'../views/shop/Shop.vue')
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import (/* webpackChunkName: "register" */'../views/register/Register.vue')
  },
  {
    path:'/login',
    name:"Login",
    component:()=>import (/* webpackChunkName: "login" */'../views/login/Login.vue'),
    beforeEnter(to,from,next){
      const isLogin=localStorage.isLogin
      isLogin ? next({name:'Home'}) : next()
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由每次跳转之前调用方法
router.beforeEach((to,from,next)=>{
  const isLogin=localStorage.isLogin; //等价于const {isLogin}=localStorage;
  const {name} =to;
  const isLoginOrRegister = (name==="Login") || name==="Register";
  (isLogin || isLoginOrRegister) ? next() : next({name:'Login'})
    // 如果是登录状态或即将跳转的页面为Login页面
})

export default router
