import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isUserLogedIn:'',
        currentUsername:'',
        currentRawMaterialPicture:''
    },
    getters:{
       getIsUserLogedIn(state){
           return state.isUserLogedIn
       },
       getCurrentUsername(state){
           return state.currentUsername
       },
       getCurrentRawMAterialPicture(state){
           return state.currentRawMaterialPicture

       }
    },
    mutations: {
        checkIsUserLogedIn(state, email){
            if(email){
               return  state.isUserLogedIn = true
            }
            else{
               return  state.isUserLogedIn = false
            }
        },

        checkCurrentUsername(state, username){
            if (username){
                return state.currentUsername = username
            }
        },

        updateCurrentRawMaterialPicture(state, picture){
            return state.currentRawMaterialPicture = picture
        },
    }
})

