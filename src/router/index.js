import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/components/Home";
import ordersRoutes from "./ordersRoutes";
import Login from "@/components/Login";
import inventoryRoutes from "./inventoryRoutes";
import productionRoutes from "./productionRoutes";
import Qrcode from "../components/Qrcode";



Vue.use(VueRouter)

const routes = [
    {path: '/', component: Home},
    {path: 'QR', component: Qrcode, name:'qrcode'},
    {
        path: '/inventory',
        name:'inventory',
        // lazy loading, only when it is required
        component: () => import(/* webpackChunkName: "Inventory" */ '@/components/Inventory.vue'),
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },

    {path: '/home', name:'home', component: Home},
    ...ordersRoutes,
    ...inventoryRoutes,
    ...productionRoutes,

    {path: '/login', name:'login', component: Login},
    {path: '*', redirect:'/'}, // always must be at the end
]

const router = new VueRouter({
    mode:'hash',
    routes : [...routes],

})

// eslint-disable-next-line no-unused-vars
// this is global router gueards!!!
// eslint-disable-next-line no-unused-vars
// router.beforeEach((to, from, next) => {
//
//         console.log(to, from )
//
// })

export default router