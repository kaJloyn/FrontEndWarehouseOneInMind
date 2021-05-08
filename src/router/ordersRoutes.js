import Orders from "@/components/Orders";
import stockOrderDetails from "@/components/stockOrderDetails";


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