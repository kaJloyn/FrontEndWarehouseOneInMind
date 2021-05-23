import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUsername: '',
        currentRawMaterialPicture:''
    },
    getters:{
       getIsUserLoggedIn(state){
           return !!state.currentUsername;
       },
       getCurrentUsername(state){
           return state.currentUsername
       },
       getCurrentRawMaterialPicture(state){
           return state.currentRawMaterialPicture

       }
    },
    mutations: {
        updateCurrentUsername(state, username){
            state.currentUsername = username
        },

    },
})

