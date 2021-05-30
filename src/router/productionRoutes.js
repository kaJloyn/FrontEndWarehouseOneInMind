import BOM from "../components/BOM";
import CreateBom from "../components/CreateBom";
const productionRoutes = [
    {
        path: 'bom`s',
        name:'bill of materials',
        component:BOM
    },
    {
        path:'createBom',
        name:'create bom',
        component: CreateBom
    }
]
export default productionRoutes