import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUsername:'',
        currentRawMaterialPicture:''
    },
    getters:{
       getIsUserLogedIn(state){
           if(state.currentUsername !== ''){
               return true
           }
           return false
       },
       getCurrentUsername(state){
           return state.currentUsername
       },
       getCurrentRawMAterialPicture(state){
           return state.currentRawMaterialPicture

       }
    },
    mutations: {

        updateCurrentUsername(state, username){
            state.currentUsername = username
        },

    }
})

