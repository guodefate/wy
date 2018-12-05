import Vue from 'vue'
import Router from 'vue-router'
import newsitem from '@/views/newsitem'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newsitem',
      component: newsitem
    },
    {
      path:'/newsitem',
      name:'newsitem',
      component:()=>import('@/views/newsitem')

    },
    {
      path:'/purchase',
      name:'purchase',
      component:()=>import('@/views/purchase')

    },
    {
      path:'/topic',
      name:'topic',
      component:()=>import('@/views/topic')

    },
    {
      path:'/company',
      name:'company',
      component:()=>import('@/views/company')

    },
    {
      path:'/comitem',
      name:'comitem',
      component:()=>import('@/views/comitem')

    },
    {
      path:'/news',
      name:'news',
      component:()=>import('@/views/news')

    },
    {
      path:'/product',
      name:'product',
      component:()=>import('@/views/product')

    },
    {
      path:'/exhibition',
      name:'exhibition',
      component:()=>import('@/views/exhibition')

    },
    {
      path:'/register',
      name:'register',
      component:()=>import('@/views/register')

    },
    {
      path:'/login',
      name:'login',
      component:()=>import('@/views/login')

    },
    {
      path:'/help',
      name:'help',
      component:()=>import('@/views/help')

    },
    {
      path:'/group',
      name:'group',
      component:()=>import('@/views/group')

    },
  ]
})
