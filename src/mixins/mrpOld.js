// import {cloneDeep} from "lodash";

// mrp_plan(orders){
//
//     let final_products_copy = cloneDeep(this.all_final_products)
//     // let total_per_rm = {}
//     let total_per_order = {}
//     for (let each_ord of orders){
//         for ( let each_fin_prd of this.all_final_products){
//             if(each_ord.product_id === each_fin_prd.b2c_website_product_id && each_ord.product_size.toUpperCase() === each_fin_prd.size){
//                 let cur_raw_mat_id = each_fin_prd.raw_material
//                 let cur_raw_mat = this.getRawMaterialById(cur_raw_mat_id)
//                 // this calculates per raw material, but returns object where the key is raw id
//                 // if(total_per_rm[cur_raw_mat_id]){
//                 //     total_per_rm[cur_raw_mat_id][0] += 1
//                 //     total_per_rm[cur_raw_mat_id][1].push(each_ord)
//                 // }
//                 // else{
//                 //     total_per_rm[cur_raw_mat_id] = [1, []]
//                 //     total_per_rm[cur_raw_mat_id][1].push(each_ord)
//                 // }
//
//                 let each_fin_prd_copy = final_products_copy.find(item => item.id === each_fin_prd.id)
//
//                 if(total_per_order[each_ord.order_id]){
//                     total_per_order[each_ord.order_id][0].push(cur_raw_mat)
//                     total_per_order[each_ord.order_id][1].push(each_fin_prd)
//                     if(each_fin_prd_copy.quantity > 0){
//                         total_per_order[each_ord.order_id][2].push(1)
//                         each_fin_prd_copy.quantity -=1
//                     }
//
//                 }
//                 else{
//                     total_per_order[each_ord.order_id] = [ [], [], [] ]
//                     total_per_order[each_ord.order_id][0].push(cur_raw_mat)
//                     total_per_order[each_ord.order_id][1].push(each_fin_prd)
//                     if(each_fin_prd_copy.quantity > 0){
//                         total_per_order[each_ord.order_id][2].push(1)
//                         each_fin_prd_copy.quantity -=1
//                     }
//                 }
//             }
//         }
//     }
//     let final_per_rm = []
//     // this calculates per raw material, but returns object where the key raw mat object
//     // for (const [key, value] of Object.entries(total_per_rm)){
//     //     // console.log(value, 'v')
//     //     let id = Number(key)
//     //     let cur_raw_mat = this.getRawMaterialById(id)
//     //     let sup_el = [cur_raw_mat, value]
//     //     final_per_rm.push(sup_el)
//     // }
//     return [final_per_rm, total_per_order]
// },