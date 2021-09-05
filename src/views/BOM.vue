<template>
    <div>
        <button @click="onPlaning"> Run Planiing</button>
        <div class="rawMaterial">
        <div v-for="rawMat in allRawMatWithBOM" :key="allRawMatWithBOM[rawMat]">
                <section class="rawMatDetails">
                    <article>
                        {{rawMat[0]['id']}}
                    </article>
                    <article style="font-weight: bold">
                        {{rawMat[0]['title']}}
                    </article>
                    <article>
                        {{rawMat[0]['cross_pn']}}
                    </article>
                    <article>
                        {{rawMat[0]['size']}}
                    </article>
                    <article>
                        {{rawMat[0]['color']}}
                    </article>
                </section>
            </div>
            <div >
                <img class="image" :src="currentRawMaterial(getOneIdOfRawMatForPicture())[0]['pic']" alt="">
            </div>

            <div class= bomDiv>
                <section class ="bomDet" v-for="bomDet in showBOMdetails()" :key="bomDet.id">
                    <article class="heading">{{bomDet.absoluteRawMaterial.name}}</article>
                    <article>цвят: {{bomDet.absoluteRawMaterial.color}}</article>
                    <article>{{bomDet.absoluteRawMaterial.uom}}</article>
                    <article>{{bomDet.quantity}}</article>
                    <article>{{bomDet.supplier['name']}}</article>
                </section>
            </div>
        </div>

    </div>
</template>

<script>
    import productionApiMixin from "../mixins/productionApiMixin";
    import requestsDataMixin from "../mixins/requestDataMixin";
    import axios from "axios";
    import getUserToken from "../common/userToken";



    export default {
        name: "BOM",

        mixins:[productionApiMixin, requestsDataMixin],
        data(){
            return{
                absoluteRawMaterialSuppliers:[],
                billOfMaterialAttribute:[],
                absoluteRawMaterials:[],
                allRawMatWithBOM: [],
                show:false
            }
        },

        methods:{

            async onPlaning(){
               await axios.get('http://www.1inmind.tk/scm-api/calcualtePlaning/',{
                   headers: {
                       'Authorization': `token ${getUserToken()}`
                   }
               })
                return window.alert('required abs raw material had been deducted from abs inventory')
            },

            async setAbsoluteRawMaterialSuppliers(){
                this.absoluteRawMaterialSuppliers = await this.getAbsoluteRawMaterialSuppliers()
            },
            async setBillOfMaterialAttribute(){
                this.billOfMaterialAttribute = await this.getBillOfMaterialAttribute()
            },
            async setAbsoluteRawMaterials(){
                this.absoluteRawMaterials = await this.getAbsoluteRawMaterial()
            },
            currentRawMaterial(id){
                return this.rawMaterials.filter(rm => rm.id === id)
            },

            getUniqueRawMatfromBilOfMat(){
                let result = new Set()
                for(let bm of this.billOfMaterialAttribute){
                    for(let rawMatId of bm.raw_material){
                        result.add(rawMatId)
                    }
                }
                return result
            },

            // return object by id Absolute Raw Material
            getCurrentAbsoluteRawMaterial(id){
                return this.absoluteRawMaterials.find(rm => rm.id === id)
            },

            // all raw mat with BOM
            setBomHeadLines(){
                for (let rawMatIds of this.getUniqueRawMatfromBilOfMat()){
                        let currentRawMat = this.currentRawMaterial(rawMatIds)
                        this.allRawMatWithBOM.push(currentRawMat)
                        this.allRawMatWithBOM.sort((a, b) => a[0]['id'] - b[0]['id'])
                }
            },

            // return a single pair of all BOM attributes for particular list of raw materials
            showBOMdetails(){
                let rawMatIdList = this.allRawMatWithBOM.map(raw_mat => raw_mat[0]['id'])
                let result = []
                let allBOMattributes = this.billOfMaterialAttribute.filter(bm => bm.raw_material.some(id => rawMatIdList.includes(id) >= 0))
                for (let eachBomAtr of allBOMattributes){
                    let bomElement = {
                        absoluteRawMaterial:this.getCurrentAbsoluteRawMaterial(eachBomAtr.absolute_raw_material),
                        quantity:eachBomAtr.quantity,
                        supplier: this.getCurrentSupplier(this.getCurrentAbsoluteRawMaterial(eachBomAtr.absolute_raw_material).supplier)
                    }
                    result.push(bomElement)
                }
                this.show= true
                return result
            },

            // return object of absolute raw material supplier
            getCurrentSupplier(absRawSuppId){
                return this.absoluteRawMaterialSuppliers.find(el => el.id === absRawSuppId)
            },
            getOneIdOfRawMatForPicture(){
                let rawMatIdList = this.allRawMatWithBOM.map(raw_mat => raw_mat[0]['id'])
                return rawMatIdList[0]
            }
        },
        async created() {
            Promise.all(
                [this.setAbsoluteRawMaterialSuppliers(),
                this.setBillOfMaterialAttribute(),
                this.setAbsoluteRawMaterials(),
                this.getRawMaterials()
                ]).then(this.setBomHeadLines, this.getOneIdOfRawMatForPicture())

        }
    }

</script>

<style scoped>

.rawMaterial{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: space-around;
    border: solid 3px;
    border-color: mediumseagreen;
    align-items: stretch;
    margin-top: 5px;
}
.rawMatDetails{
    display: flex;
    flex-direction: column;
    align-self: stretch;
    border-left: solid 1px;
    border-color: mediumseagreen;
}
.rawMatDetails article{
    padding-left: 1%;
    font-size: 14px;
}
.bomDiv{
    display: flex;
    align-items: flex-end;
    flex-direction: row;
}
.bomDet{
    border-left: solid 1px;
    border-color: mediumseagreen;
    margin-left: 5px;
    padding: 0.5% 1% 1% 0.5%;
}
.heading{
    font-size: 18px;
    font-weight: bold;
}
.image{
    margin-top: 12%;
    width: 90px;
    height: 90px;
}
button{
    margin-top: 5px;
}
</style>