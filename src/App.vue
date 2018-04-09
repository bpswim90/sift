<template>
  <div id="app">
    <ResultCard></ResultCard>
  </div>
</template>

<script>
import ResultCard from "./components/ResultCard.vue";

export default {
    name: 'app',
    components: {
        ResultCard
    },
    data () {
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
