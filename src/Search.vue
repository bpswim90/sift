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

            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                    <i class="fas fa-user-circle fa-lg mr-2"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                    <span class="dropdown-item-text mx-4 text-muted">{{ userEmail }}</span>
                    <div class="dropdown-divider"></div>
                    <!--TODO: Add link to my profile-->
                    <button class="dropdown-item" type="button" v-on:click="logOut">Log Out</button>
                </div>
            </div>
        </div>
    </nav>

    <router-view v-bind:recipes="recipes"></router-view>
  </div>
</template>

<script>
var SearchResults = require("./components/SearchResults.vue")
var Firebase = require("firebase")

module.exports = {
    components: {
        'search-results': SearchResults
    },
    data: function () {
        return {
            recipes: [],
            searchTerm: ""
        }
    },
    computed: {
        userEmail: function() {
            var user = Firebase.auth().currentUser

            if (user !== null) {
                return user.email;
            }
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

        logOut: function() {
            Firebase.auth().signOut().then(() => {
                this.$router.replace('/login')
            })
        }
    }
}
</script>

<style>
.dropdown-menu-right {
    right: 0;
    left: auto;
}
</style>
