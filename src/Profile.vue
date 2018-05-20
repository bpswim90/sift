<template>
    <div class="container-fluid">
        <div id="profile">
            <h1 id="profile-header" class="my-4"><i class="far fa-user-circle mr-2"></i>{{userEmail}}</h1>
            <hr>
            <h3>My Favorite Sources</h3>
            <div class="my-4">
                <div class="btn btn-outline-primary m-1 disabled"
                    v-for="favorite in userFavoritesWithId">
                    {{favorite.value}}
                    <span id='deleteFavoriteIcon' v-on:click="removeUserFavorite(favorite.key)">
                        <i class="far fa-times-circle ml-1"></i>
                    </span>
                </div>
            </div>
            <hr>
            <div class="d-flex mb-3">
                <h3 class="my-auto mr-auto">My Collections</h3>
                <button type="button" class="btn btn-outline-primary mr-2 my-auto" v-bind:class="{ active: editMode }" v-on:click="toggleEditMode">Edit</button>
                <button type="button" class="btn btn-primary my-auto" data-toggle="modal" data-target="#newCollectionForm"><i class="fas fa-plus mr-2"></i>Add New</button>
            </div>

            <new-collection-form></new-collection-form>

            <!--Collection card-->
            <!--TODO: move to its own component-->
            <div class="row mb-5">
                <div class="col-md-6" v-for="(collection, index) in userCollections">
                    <div class="card mb-4">
                        <div class="card-body d-flex justify-content-between">
                            <div class="my-auto">
                                <router-link v-bind:to="'/search/collection/' + collection.key">
                                    <h4 class="my-auto">{{collection.name}}</h4>
                                </router-link>
                            </div>
                            <button class="btn btn-secondary my-auto" v-if="editMode" data-toggle="modal" :data-target="'#removeCollection'+index">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col px-0">
                                    <img class="img-fluid rounded-left" src="https://www.edamam.com/web-img/c42/c423e9709acd75bcf5806436eddc74c2.jpg">
                                </div>
                                <div class="col px-1">
                                    <img class="img-fluid" src="https://www.edamam.com/web-img/6c9/6c9960eaf107c71cffdaed4e57ff8bdf.jpg">
                                </div>
                                <div class="col px-0">
                                    <img class="img-fluid rounded-right" src="https://www.edamam.com/web-img/35f/35f25638bc22fd3de19b2bf3fcf75c27.jpg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Modal for confirming removeCollection-->
                    <div class="modal fade" :id="'removeCollection'+index" tabindex="-1" role="dialog">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Remove collection?</h5>
                                    <button type="button" class="close" data-dismiss="modal">
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    Are you sure you want to remove this collection? This will delete all recipes in the collection and can't be undone.
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-danger"
                                        v-on:click="removeCollection(collection.key, index)">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>
var NewCollectionForm = require('./components/NewCollectionForm.vue')
var Firebase = require('firebase')

module.exports = {
    components: {
        'new-collection-form': NewCollectionForm
    },
    props: ['userEmail','userFavoritesWithId'],
    data: function() {
        return {
            userCollections: [],
            editMode: false
        }
    },
    methods: {
        removeUserFavorite: function(favoriteId) {
            this.$store.dispatch('removeUserFavorite',favoriteId)
        },
        toggleEditMode: function() {
            if (this.editMode === false) {
                this.editMode = true
            } else {
                this.editMode = false
            }
        },
        removeCollection: function(collectionId, index) {
            this.$store.dispatch('removeCollection',collectionId)

            var removeCollectionModal = '#removeCollection' + index
            $(removeCollectionModal).modal('hide')
        }
    },
    created: function() {
        this.userCollections = this.$store.getters.getUserCollections
    }
}
</script>

<style>
#profile {
    max-width: 800px;
    margin: auto;
}
#profile-header {
    white-space: nowrap;
    overflow: hidden;
}
#deleteFavoriteIcon {
    cursor: pointer
}
</style>