import Orders from "@/views/Orders";
import stockOrderDetails from "@/views/stockOrderDetails";


const ordersRoutes= [

    {
        path: '/stockOrders/',
        name:'stockOrders',
        component: Orders,
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
                }
            }
    },

    {
        path: '/stockOrder/details/:stockOrderId',
        name:'stockOrderDetails',
        component: stockOrderDetails
    },
]

export default ordersRoutes