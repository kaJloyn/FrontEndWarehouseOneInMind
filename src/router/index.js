import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/components/Home";
import ordersRoutes from "./ordersRoutes";
import Login from "@/components/Login";
import inventoryRoutes from "./inventoryRoutes";
import productionRoutes from "./productionRoutes";
import Qrcode_Out from "../components/Qrcode_Out";
import Qrcode_In from "../components/Qrcode_In"
import QRresult_Out from "../components/QRresult_Out"
import QRresult_In from  "../components/QRresult-In"
import AllQr from  "../components/AllQr"

Vue.use(VueRouter)

const routes = [
    {path: '/', component: Home},
    {path: 'QR-OUT', component: Qrcode_Out, name:'qrcode_out',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },

    {path: 'QR-IN', component: Qrcode_In, name:'qrcode-in',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },
    {path: 'qr-result-out', component: QRresult_Out, name:'QRresult_Out',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },
    {path: 'qr-result-in', component: QRresult_In, name:'QRresult_In',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },
    {path: 'all-qr', component: AllQr, name: 'AllQr',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }},


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