import BOM from "../views/BOM";
import CreateBom from "../views/CreateBom";
const productionRoutes = [
    {
        path: 'bom`s',
        name:'bill of materials',
        component:BOM,
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
        path:'createBom',
        name:'create bom',
        component: CreateBom,
        beforeEnter(to, from, next){
            if(sessionStorage.getItem('authToken')){
                next()
            }
            else{
                next('/login')
            }
        }
    }
]
export default productionRoutes