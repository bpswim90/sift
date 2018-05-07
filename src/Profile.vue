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
            <h3 class="mb-4">My Collections</h3>

            <div class="card-deck">
                <div class="card">
                    <div class="card-body pb-2">
                        <h4 class="card-title">Make Again</h4>
                    </div>
                    <img class="card-img-bottom rounded" src="https://www.edamam.com/web-img/19e/19e5ea32ef3e12bdd4ba0abc04797ed0.jpg">
                </div>
                <div class="card">
                    <div class="card-body pb-2">
                        <h4 class="card-title">Salads</h4>
                    </div>
                    <img class="card-img-bottom rounded" src="https://www.edamam.com/web-img/c42/c423e9709acd75bcf5806436eddc74c2.jpg">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var Firebase = require('firebase')

module.exports = {
    props: ['userEmail','userFavoritesWithId'],
    methods: {
        removeUserFavorite: function(favoriteId) {
            this.$store.dispatch('removeUserFavorite',favoriteId)
        }
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