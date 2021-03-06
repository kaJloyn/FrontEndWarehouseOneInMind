import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "@/views/Home";
import ordersRoutes from "./ordersRoutes";
import Login from "@/views/Login";
import inventoryRoutes from "./inventoryRoutes";
import productionRoutes from "./productionRoutes";
import Qrcode_Out from "../views/Qrcode_Out";
import Qrcode_In from "../views/Qrcode_In"
import QRresult_Out from "../views/QRresult_Out"
import QRresult_In from "../views/QRresult-In"
import All_QR_Raw_Mat from "../views/All_QR_Raw_Mat"
import All_QR_Final_Prod from "../views/All_QR_Final_Prod";
import Inventory_Final_Prd from "../views/Inventory_Final_Prd";
import MRP from "../views/MRP";
import Qrcode_Revision from "../views/Qrcode_Revision";
import QRresult_Revision from "../views/QRresult_Revision";
import Financial from "../views/Financial";
import OrderRecomendation from "../views/OrderRecomendation";
import KPI from "../views/KPI";


Vue.use(VueRouter)

const routes = [
    {path: '/', component: Home},

    {path: 'order-recommendation', component: OrderRecomendation, name:'order-recommendation',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },

    {path: 'kpi', component: KPI, name:'KPI',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },
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

    {path: 'QR-Revision', component: Qrcode_Revision, name:'qrcode-revision',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },
    {path: 'qr-result-revision', component: QRresult_Revision, name:'QRresult_Revision',
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
    {path: 'all-qr_raw_mat', component: All_QR_Raw_Mat, name: 'All_QR_Raw_Mat',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },

    {path: 'all-qr_final_prod', component: All_QR_Final_Prod, name: 'All_QR_Final_Prod',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },


    {path: '/inventory',
        name:'inventory',
        // lazy loading, only when it is required
        component: () => import(/* webpackChunkName: "Inventory" */ '@/views/Inventory.vue'),
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },
    {path: 'inventory-final-products', component: Inventory_Final_Prd, name: 'Inventory_Final_Prd',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        },

    },
    {path: 'MRP', component: MRP, name: 'MRP',
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
    {path: 'finance', component: Financial, name: 'financial',
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    },
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