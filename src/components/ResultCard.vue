<template>
    <div>
        <div class="card" v-show="name">
            <img class="card-img-top" v-bind:src="img">
            
            <div class="card-img-overlay">
                <button class="btn btn-light" id="removeRecipe" data-toggle="modal" :data-target="'#removeFromCollection'+index"
                    v-if="editMode"><i class="fas fa-times"></i></button>
                <button class="btn btn-primary float-right" data-toggle="modal" :data-target="'#addToCollection'+index"><i class="fas fa-plus"></i></button>
            </div>
            
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <h4 class="card-link my-auto"><a v-bind:href="url">{{name}}</a></h4>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small v-show="source">by {{source}}</small>
                <span id='addUserFavorite' v-on:click="addToUserFavorites()" v-show="!isUserFavorite">
                    <i class="far fa-heart mx-1"></i>
                </span>
                <span v-show="isUserFavorite">
                    <i class="fas fa-heart mx-1"></i>
                </span>
            </div>
        </div>

        <!--Modal for adding recipe to a new/other collection-->
        <div class="modal fade" :id="'addToCollection'+index" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Choose Collection</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        To which collection would you like to add <b>{{name}}</b>?
                    </div>
                    <div class="modal-body p-0 pb-1">
                        <div class="list-group list-group-flush">
                            <button type="button" v-for="collection in userCollections"
                                class="list-group-item list-group-item-action"
                                v-on:click="addToCollection(collection.key)">
                                {{collection.name}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--Modal for removing a recipe from a collection-->
        <div class="modal fade" :id="'removeFromCollection'+index" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Remove recipe?</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to remove this recipe? This can't be undone.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger"
                            v-on:click="removeFromCollection()">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var Firebase = require('firebase')

module.exports = {
    // currentCollectionId refers to the collection the ResultCard is displayed in, if any
    // Recipe Id refers to the id of the recipe the ResultCard is displaying, if any
    props: ['name','img','url','source','recipeId','currentCollectionId','index','userFavoritesArray', 'editMode'],
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
        addToCollection: function(collectionId) {
            //This method takes in a collection id, and passes the currently rendered recipe
            //to the store to be added to the specified collection.

            var collectionAndRecipe = {
                collectionId: collectionId,
                recipe: {
                    name: this.name,
                    img: this.img,
                    url: this.url,
                    source: this.source
                }
            }

            var addToCollectionModal = '#addToCollection' + this.index

            this.$store.dispatch('addToCollection', collectionAndRecipe)
            $(addToCollectionModal).modal('hide')
        },
        removeFromCollection: function() {
            var collectionAndRecipe = {
                collectionId: this.currentCollectionId,
                recipeId: this.recipeId
            }

            this.$store.dispatch('removeFromCollection', collectionAndRecipe)

            var removeFromCollectionModal = '#removeFromCollection' + this.index
            $(removeFromCollectionModal).modal('hide')
        }
    }
}
</script>

<style>
.card {display: inline-block}

/*Below fixes an issue with card-img-overlay
making links not clickable*/
.card-link {
    position: relative
}

.fa-heart {
    color: red
}

#addUserFavorite {
    cursor: pointer;
    position: relative
}
</style>