<template>
    <div>
        <div class="card" v-show="name">
            <img class="card-img-top" v-bind:src="img">
            <div class="card-body">
                <h4 class="card-title">{{name}}
                    <!-- old button <button class="btn btn-primary" v-on:click="addToCollection()">Save</button>-->
                    <button class="btn btn-primary" data-toggle="modal" data-target="#addToCollection">Save</button>
                </h4>
                <small v-show="url">by <a v-bind:href="url" class="card-link">{{source}}</a></small>
                <span id='addUserFavorite' v-on:click="addToUserFavorites()" v-show="!isUserFavorite">
                    <i class="far fa-heart fa-xs mx-1"></i>
                </span>
                <span v-show="isUserFavorite">
                    <i class="fas fa-heart fa-xs mx-1"></i>
                </span>

            </div>
        </div>
        <div class="modal fade" id="addToCollection" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Choose Collection</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body p-0 pb-1">
                        <div class="list-group list-group-flush">
                            <button type="button" v-for="collection in userCollections"
                                class="list-group-item list-group-item-action">
                                {{collection.name}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var Firebase = require('firebase')

module.exports = {
    props: ['name','img','url','source','userFavoritesArray'],
    computed: {
        userId: function() {
            return this.$store.getters.getUserId
        },

        //Checks if the source is in the user's personal list of favorites
        isUserFavorite: function() {
            if (this.userFavoritesArray.indexOf(this.source) > -1) {
                return true
            } else {
                return false
            }
        },

        userCollections: function() {
            return this.$store.getters.getUserCollections
        }
    },
    methods: {
        addToUserFavorites: function() {
            this.$store.dispatch('addToUserFavorites', this.source)
        },
        addToCollection: function() {
            var recipeObj = {
                name: this.name,
                img: this.img,
                url: this.url,
                source: this.source
            }

            this.$store.dispatch('addToCollection', recipeObj)
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