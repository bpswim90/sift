<template>
    <div class="container-fluid">
        <div id="collection">
            <div class="d-flex justify-content-between my-2">
                <h1 class="my-auto">
                    {{collectionName}}
                </h1>
                <button type="button" class="btn btn-outline-primary my-auto">Edit</button>
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
                    v-bind:userFavoritesArray="userFavoritesArray">
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
            userFavoritesWithId: []
        }
    },
    components: {
        'result-card': ResultCard
    },
    computed: {
        userId: function() {
            return this.$store.getters.getUserId
        },
        collectionName: function() {
            var ref = Firebase.database().ref('collections/' + this.userId + '/' + this.collectionId + '/name')
            var collectionName = ""

            ref.once('value', function(data) {
                collectionName = data.val()
            })

            return collectionName
        },
        userFavoritesArray: function() {
            var favoritesArray = []
            this.userFavoritesWithId.forEach(function(favorite) {
                favoritesArray.push(favorite.value)
            })
            return favoritesArray
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