<template>
    <div class="card" v-show="name">
        <img class="card-img-top" v-bind:src="img">
        <div class="card-body">
            <h4 class="card-title">{{name}}</h4>
            <small v-show="url">by <a v-bind:href="url" class="card-link">{{source}}</a></small>
        </div>
        <div class="card-footer">
            <button type="button" class="btn btn-outline-danger" data-toggle="button"
                v-on:click="addToUserFavorites()">Add Site to Favorites</button>
        </div>
    </div>
</template>

<script>
var Firebase = require('firebase')

module.exports = {
    props: ['name','img','url','source'],
    computed: {
        userId: function() {
            var user = Firebase.auth().currentUser

            if (user !== null) {
                return user.uid
            }
        }
    },
    methods: {
       addToUserFavorites: function() {
           var app = this

           Firebase.database().ref('users/' + this.userId).child('favorites').push(this.source)
       }
    }
}
</script>

<style>
    .card {display: inline-block}
</style>