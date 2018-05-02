var Vue = require('vue')
var Vuex = require('vuex')
var Firebase = require('firebase')

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        user: null
    },
    getters: {
        getUser: state => {
            return state.user
        },
        getUserEmail: state => {
            if (state.user !== null) {
                return state.user.email
            }
        },
        getUserId: state => {
            if (state.user !== null) {
                return state.user.uid
            }
        }
    },
    mutations: {
        setUser: state => {
            state.user = Firebase.auth().currentUser
        }
    },
    actions: {
        setUser: context => {
            context.commit('setUser')
        }
    }
})

module.exports = store