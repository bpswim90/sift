<template>
    <div>
        <div class="filters mt-2" v-show="recipes.length !== 0">
            <button type="button" class="btn btn-secondary mr-1"
                v-on:click="resetFavoriteSources">Reset</button>
            <button v-for="source in filterSources" type="button" class="btn btn-outline-secondary mx-1" data-toggle="button"
                v-bind:class="{ active: isFavorite(source) }"
                v-on:click="toggleIsFavorite(source)">{{source}}</button>
        </div>

        <div class="card-columns">
            <result-card v-for="recipe in recipes"
                v-bind:name="recipe.label"
                v-bind:source="recipe.source"
                v-bind:url="recipe.url"
                v-bind:img="recipe.image"
                v-bind:userFavoritesArray="userFavoritesArray"
                v-show="favoriteSources.length === 0 || isFavorite(recipe.source)">
            </result-card>
        </div>
    </div>
</template>

<script>
var ResultCard = require("./ResultCard.vue")

module.exports = {
    props: ['recipes', 'userFavoritesArray'],
    components: {
        'result-card': ResultCard
    },
    data: function() {
        return {
            favoriteSources: []
        }
    },
    computed: {
        //Computes an alphabetical list of recipe sources for the filter buttons
        filterSources: function() {
            var sources = []
            this.recipes.forEach(function (recipe) {
                if (sources.indexOf(recipe.source) === -1)
                    sources.push(recipe.source)
            })
            return sources.sort()
        }
    },
    methods: {

        //Checks if the source has been selected from the list of source filters
        isFavorite: function(source) {
            if (this.favoriteSources.indexOf(source) > -1) {
                return true
            } else {
                return false
            }
        },

        toggleIsFavorite: function(source) {
            var app = this
            if (this.favoriteSources.indexOf(source) === -1){
                this.favoriteSources.push(source)
            } else {
               var sourceIndex = this.favoriteSources.indexOf(source)
               this.favoriteSources.splice(sourceIndex, 1)
            }
        },

        resetFavoriteSources: function() {
            var app = this
            this.favoriteSources = []
        }
    }
}
</script>

<style>
</style>