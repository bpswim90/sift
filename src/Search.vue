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
                        <button class="btn btn-outline-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                        </button>
                        <div class="dropdown-menu dropdown-menu-right">
                            <button class="dropdown-item" type="button" v-on:click="recipeSearch">Search All</button>
                            <button class="dropdown-item" type="button" v-on:click="favoriteSearch">Search My Favorites</button>
                        </div>
                    </div>
                </div>
            </form>

            <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">
                    <i class="fas fa-user-circle fa-lg mr-2"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                    <span class="dropdown-item-text mx-4 text-muted">{{ userEmail }}</span>
                    <router-link class="dropdown-item" to="/search/profile">My Profile</router-link>
                    <div class="dropdown-divider"></div>
                    <button class="dropdown-item" type="button" v-on:click="logOut">Log Out</button>
                </div>
            </div>
        </div>
    </nav>

    <router-view v-bind:recipes="recipes" v-bind:userEmail="userEmail" v-bind:userFavoritesWithId="userFavoritesWithId"></router-view>
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
            searchTerm: "",
            userFavoritesWithId: []
        }
    },
    computed: {
        userEmail: function() {
            return this.$store.getters.getUserEmail
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
        var userId = this.$store.getters.getUserId
        var ref = Firebase.database().ref('/users/' + userId + '/favorites')

        var theList = []
        ref.on("value", function(data) {
            //List must be cleared every time .on is run so it doesn't hold the old values
            theList.splice(0,theList.length)
            data.forEach(function(data) {
                var item = {
                    key: data.key,
                    value: data.val()
                    }
                theList.push(item)
            })
        })
        this.userFavoritesWithId = theList
    },
    methods: {
        //Search with no filters
        recipeSearch: function () {
            var app = this
            this.$router.push('/search')

            app.recipes = []
            
            $.getJSON("https://api.edamam.com/search?q=" + this.searchTerm + "&app_id=1a3c4674&app_key=4dc3b79571f6296aef24bb347b2a75fc&from=0&to=50",
                function(json) {
                    json.hits.forEach(function (result) {
                        app.recipes.push(result.recipe)
                    })
                }
            );
        },
        //For performing a new search with your favorites
        favoriteSearch: function() {
            var app = this
            this.$router.push('/search')

            app.recipes = []

            $.getJSON("https://api.edamam.com/search?q=" + this.searchTerm + "&app_id=1a3c4674&app_key=4dc3b79571f6296aef24bb347b2a75fc&from=0&to=50",
                function(json) {
                    var filteredRecipes = json.hits.filter(function (result) {
                        return (app.userFavoritesArray.indexOf(result.recipe.source) !== -1)
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
