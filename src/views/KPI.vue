<template>
    <div>
        <table-component-normal
            :table-heads="table_headers"
            :keys="keys"
            :items="kpiB2cShipments"
            :special_case="'countArray'"
            :styles="styles"
        />
    </div>
</template>

<script>
    import requestsDataMixin from "../mixins/requestDataMixin";
    import TableComponentNormal from "../components/TableComponentNormal";

    export default {
        name: "KPI",
        components: {TableComponentNormal},
        mixins:[requestsDataMixin],
        data(){
            return {
                table_headers: [
                    'Дата',

                    'Завършени Поръчки',
                    'Бр. Заврш.Продукти',
                    'Сума Заврш.Прод',

                    'Незапочнати Поръчки',
                    'Бр. Незап.Продукти',
                    'Сума Незап.Прод',

                    'Задържани Поръчки',
                    'Бр. Зад.Продукти',
                    'Сума Зав.Прод',

                    'Чакащи Поръчки',
                    'Бр. Чак.Продукти',
                    'Сума Чак.Прод',

                    'Отказани Поръчки',
                    'Бр. Отк.Продукти',
                    'Сума Отк.Прод'
                ],
                keys: [
                    'date',

                    'finished_orders',
                    'products_finished',
                    'value_finished',

                    'processing_orders',
                    'products_processing',
                    'value_processing',

                    'on_hold_orders',
                    'products_on_hold',
                    'value_on_hold',

                    'pending_orders',
                    'products_pending',
                    'value_pending',

                    'cancelled_orders',
                    'products_cancelled',
                    'value_canceled',
                ],
                kpiB2cShipments:[],
                styles:[
                    {lower_limit: 1,  upper_limit: 3, color: 'blue'},
                    {lower_limit: 4,  upper_limit: 6, color: 'green'},
                    {lower_limit: 7,  upper_limit: 9, color: 'orange'},
                    {lower_limit: 10,  upper_limit: 12, color: 'grey'},
                    {lower_limit: 13,  upper_limit: 15, color: 'red'}
                ]
            }
        },
        methods:{

        },
        async created() {
            this.kpiB2cShipments = await this.getKpiB2cShipments()
            console.log(this.kpiB2cShipments, 'kpi shipments')
        }
    }

</script>

<style scoped>

</style>