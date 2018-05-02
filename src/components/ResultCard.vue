<template>
    <div class="card" v-show="name">
        <img class="card-img-top" v-bind:src="img">
        <div class="card-body">
            <h4 class="card-title">{{name}}</h4>
            <small v-show="url">by <a v-bind:href="url" class="card-link">{{source}}</a></small>
            <span id='addUserFavorite' v-on:click="addToUserFavorites()" v-show="!isUserFavorite">
                <i class="far fa-heart fa-xs mx-1"></i>
            </span>
            <span v-show="isUserFavorite">
                <i class="fas fa-heart fa-xs mx-1"></i>
            </span>

        </div>
    </div>
</template>

<script>
var Firebase = require('firebase')

module.exports = {
    props: ['name','img','url','source','userFavoritesArray'],
    computed: {
        userId: function() {
            var user = Firebase.auth().currentUser

            if (user !== null) {
                return user.uid
            }
        },

        //Checks if the source is in the user's personal list of favorites
        isUserFavorite: function() {
            if (this.userFavoritesArray.indexOf(this.source) > -1) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        addToUserFavorites: function() {
            var app = this

            var ref = Firebase.database().ref('/users/' + this.userId + '/favorites')

            var theList = []
            ref.on("value", function(data) {
                //List must be cleared every time .on is run so it doesn't hold the old values
                theList.splice(0,theList.length)
                data.forEach(function(data) {
                    theList.push(data.val())
                })
            })

            if (theList.indexOf(this.source) === -1) {
                Firebase.database().ref('users/' + this.userId).child('favorites').push(this.source)
            }
       }
    }
}
</script>

<style>
.card {display: inline-block}

.fa-heart {
    color: red
}

#addUserFavorite {
    cursor: pointer
}
</style>