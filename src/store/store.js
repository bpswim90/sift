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
        },
        addToUserFavorites: (context, source) => {
            var ref = Firebase.database().ref('/users/' + context.getters.getUserId + '/favorites')

            var theList = []
            ref.on("value", function(data) {
                //List must be cleared every time .on is run so it doesn't hold the old values
                theList.splice(0,theList.length)
                data.forEach(function(data) {
                    theList.push(data.val())
                })
            })

            if (theList.indexOf(source) === -1) {
                Firebase.database().ref('users/' + context.getters.getUserId).child('favorites').push(source)
            }
        }
    }
})

module.exports = store