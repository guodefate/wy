import Vue from 'vue'
import VueRouter from 'vue-router'
import newsitem from '@/views/newsitem'
import Vuex from 'vuex' //引入状态管理

Vue.use(VueRouter)

// export default new Router({
// mode:'history',
// base:'/dist/',
let routes = [{
            path: '/',
            name: 'newsitem',
            component: newsitem
        },
        {
            path: '/newsitem',
            name: 'newsitem',
            component: () =>
                import ('@/views/newsitem')

        },
        {
            path: '/purchase',
            name: 'purchase',
            component: () =>
                import ('@/views/purchase')

        },
        {
            path: '/topic',
            name: 'topic',
            component: () =>
                import ('@/views/topic')

        },
        {
            path: '/comitem',
            name: 'comitem',
            component: () =>
                import ('@/views/comitem')

        },
        {
            path: '/product',
            name: 'product',
            component: () =>
                import ('@/views/product'),
        },
        {
            path: '/products',
            name: 'products',
            component: () =>
                import ('@/views/products')
        },
        {
            path: '/exhibition',
            name: 'exhibition',
            component: () =>
                import ('@/views/exhibition')

        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/views/login')

        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('@/views/register'),
            meta: {
                name: 'register',
            }

        },
        {
            path: '/help',
            name: 'help',
            component: () =>
                import ('@/views/help')

        },
        {
            path: '/group',
            name: 'group',
            component: () =>
                import ('@/views/group'),
            meta: {
                requireAuth: true, //添加该字段，表示进入这个路由是需要登录的
                name:'group'
            }

        },
        {
            path: '/pwd',
            name: 'pwd',
            component: () =>
                import ('@/views/pwd')

        },
        {
            path: '/newcomerprize',
            name: 'newcomerprize',
            component: () =>
                import ('@/views/newcomerprize'),
            meta: {
                requireAuth: true, //添加该字段，表示进入这个路由是需要登录的
                nam: 'prize',
            }
        },
        {
            path: '/groupsuccess',
            meta: { name: 'groupsuccess' },
            component: () =>
                import ('@/views/groupsuccess')
        }
        
    ]
    // })
    // 实例化路由对象
let router = new VueRouter({
        routes,
        //去除#
        // mode: 'history',
        scrollBehavior(to, from,savedPosition) {
            return {
              x: 0,
              y: 0
            }
          }
    })
    
  


    // router.beforeEach((to, from, next) => {
    //     if (from.meta.name == 'group') {
    //             let path = this.$store.state.paththis.$store.state.path
    //             console.log(path);
    //             this.$store.commit('updatapath', path);
    //             next();
    //         // if (to.meta.name == "register") {
    //         //     let path = this.$store.state.path
            
    //         //     next();
            
    //         // }
    //             }
    //         })
export default router