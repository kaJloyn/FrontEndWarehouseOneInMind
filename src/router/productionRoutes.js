import BOM from "../views/BOM";
import CreateBom from "../views/CreateBom";
import AbsoluteRawMaterialsStock from "../views/AbsoluteRawMaterialsStock";
const productionRoutes = [
    {
        path: 'absoluteRawMatStock',
        name:'absolute raw materials stock',
        component:AbsoluteRawMaterialsStock,
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