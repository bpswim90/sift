<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-light fixed-top">
        <span class="navbar-brand mb-0 h1">Sift</span>

        <div class="navbar-collapse collapse">
            <form class="mx-2 my-auto d-inline w-100" v-on:submit.prevent="recipeSearch">
                <div class="input-group">
                    <input class="form-control" type="text" placeholder="Search" v-model="searchTerm">
                    <div class="input-group-append">
                        <button class="btn btn-outline-success" type="submit">Search</button>         
                    </div>
                </div>
            </form>
        </div>
    </nav>

    <div class="filters" v-show="recipes.length !== 0">
        <button type="button" class="btn btn-secondary mx-1"
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
            v-show="favoriteSources.length === 0 || isFavorite(recipe.source)">
        </result-card>
    </div>
  </div>
</template>

<script>
var ResultCard = require("./components/ResultCard.vue")

module.exports = {
    components: {
        'result-card': ResultCard
    },
    data: function () {
        return {
            recipes: [],
            favoriteSources: [],
            searchTerm: ""
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
        //Search with no filters
        recipeSearch: function () {
            var app = this
            app.recipes = []
            
            $.getJSON("https://api.edamam.com/search?q=" + this.searchTerm + "&app_id=1a3c4674&app_key=4dc3b79571f6296aef24bb347b2a75fc&from=0&to=50",
                function(json) {
                    json.hits.forEach(function (result) {
                        app.recipes.push(result.recipe)
                    })
                }
            );
        },
        //For performing a new search with site filters selected
        filterSearch: function() {
            var app = this
            app.recipes = []

            $.getJSON("https://api.edamam.com/search?q=" + this.searchTerm + "&app_id=1a3c4674&app_key=4dc3b79571f6296aef24bb347b2a75fc&from=0&to=50",
                function(json) {
                    var filteredRecipes = json.hits.filter(function (result) {
                        return (app.favoriteSources.indexOf(result.recipe.source) !== -1)
                    })
                    filteredRecipes.forEach(function(result) {
                        app.recipes.push(result.recipe)
                    })
                }
            );
        },

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
