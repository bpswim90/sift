<template>
    <div class="container-fluid">
        <div id="collection">
            <h1 class="my-4">
                {{collectionName}}
            </h1>
            <hr>

            <div class="card-columns" id="collection-column">
                <result-card v-for="recipe in recipes"
                    v-bind:name="recipe.name"
                    v-bind:source="recipe.source"
                    v-bind:url="recipe.url"
                    v-bind:img="recipe.img"
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
            recipes: []
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
        ref.once('value', function(data) {
            data.forEach(function(data) {
                recipesList.push(data.val())
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