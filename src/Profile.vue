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
            <div class="row mb-5">
                <collection-card v-for="(collection, index) in userCollections"
                    v-bind:collection="collection"
                    v-bind:index="`${index}`"
                    v-bind:editMode="editMode">
                </collection-card>
            </div>
        </div>
    </div>
</template>

<script>
var NewCollectionForm = require('./components/NewCollectionForm.vue')
var CollectionCard = require('./components/CollectionCard.vue')
var Firebase = require('firebase')

module.exports = {
    components: {
        'new-collection-form': NewCollectionForm,
        'collection-card': CollectionCard
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