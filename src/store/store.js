var Vue = require('vue')
var Vuex = require('vuex')
var Firebase = require('firebase')

Vue.use(Vuex)

var store = new Vuex.Store({
    state: {
        user: null,
        userFavorites: []
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
        },
        getUserFavorites: state => {
            return state.userFavorites
        }
    },
    mutations: {
        setUser: state => {
            state.user = Firebase.auth().currentUser
        },
        setUserFavorites: (state, theUserFavorites) => {
            state.userFavorites = theUserFavorites
        }
    },
    actions: {
        setUser: context => {
            context.commit('setUser')
        },
        setUserFavorites: context => {
            var ref = Firebase.database().ref('/users/' + context.getters.getUserId + '/favorites')

            var theList = []
            ref.on("value", function(data) {
                //List must be cleared every time .on is run so it doesn't hold the old values
                theList.splice(0,theList.length)
                data.forEach(function(data) {
                    var item = {
                        key: data.key,
                        value: data.val()
                        }
                    theList.push(item)
                })
            })

            context.commit('setUserFavorites',theList)
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
        },
        removeUserFavorite: (context, favoriteId) => {
            var ref = Firebase.database().ref('/users/' + context.getters.getUserId + '/favorites/' + favoriteId)
            ref.remove()
        },
        addNewCollection: (context, collectionName) => {
            var  collectionData = {
                name: collectionName
            }

            var newCollectionKey = Firebase.database().ref().child('collections').push().key

            var updates = {}
            updates['/collections/' + newCollectionKey] = collectionData
            updates['/users/' + context.getters.getUserId + '/collections/' + newCollectionKey] = collectionData

            Firebase.database().ref().update(updates)
        }
    }
})

module.exports = store