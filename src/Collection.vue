<template>
    <div class="container-fluid">
        <div id="collection">
            <div class="d-flex justify-content-between my-2">
                <h1 class="my-auto">
                    {{collectionName()}}
                </h1>
                <button type="button" class="btn btn-outline-primary my-auto"
                    v-bind:class="{ active: editMode }"
                    v-on:click="toggleEditMode">Edit</button>
            </div>
            <hr>

            <div class="card-columns" id="collection-column">
                <result-card v-for="(recipe, index) in recipes"
                    v-bind:name="recipe.name"
                    v-bind:source="recipe.source"
                    v-bind:url="recipe.url"
                    v-bind:img="recipe.img"
                    v-bind:recipeId="recipe.recipeId"
                    v-bind:currentCollectionId="collectionId"
                    v-bind:index="`${index}`"
                    v-bind:userFavoritesArray="userFavoritesArray"
                    v-bind:editMode="editMode">
                </result-card>
            </div>
        </div>
    </div>
</template>

<script>
var Firebase = require('firebase')
var ResultCard = require('./components/ResultCard.vue')

module.exports = {
    props: ['collectionId'],
    data: function() {
        return {
            recipes: [],
            userFavoritesWithId: [],
            editMode: false
        }
    },
    components: {
        'result-card': ResultCard
    },
    computed: {
        userId: function() {
            return this.$store.getters.getUserId
        },
        userFavoritesArray: function() {
            var favoritesArray = []
            this.userFavoritesWithId.forEach(function(favorite) {
                favoritesArray.push(favorite.value)
            })
            return favoritesArray
        }
    },
    methods: {
        collectionName: function() {
            var ref = Firebase.database().ref('collections/' + this.userId + '/' + this.collectionId + '/name')
            var collectionName = ""

            ref.once('value', function(data) {
                collectionName = data.val()
            })

            return collectionName
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
        var ref = Firebase.database().ref('/recipes/' + this.collectionId)

        var recipesList = []
        ref.on('value', function(data) {
            recipesList.splice(0,recipesList.length)
            data.forEach(function(data) {
                var recipeObj = data.val()
                recipeObj.recipeId = data.key
                recipesList.push(recipeObj)
            })
        })

        this.recipes = recipesList
        this.userFavoritesWithId = this.$store.getters.getUserFavorites
    }
}
</script>

<style>
#collection {
    max-width: 800px;
    margin: auto;
}
</style>