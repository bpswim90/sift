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

            <!--Collection card-->
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body pb-2">
                            <h4 class="card-title">Make Again</h4>
                        </div>
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col px-0">
                                    <img class="img-fluid rounded-left" src="https://www.edamam.com/web-img/c42/c423e9709acd75bcf5806436eddc74c2.jpg">
                                </div>
                                <div class="col px-1">
                                    <img class="img-fluid" src="https://www.edamam.com/web-img/6c9/6c9960eaf107c71cffdaed4e57ff8bdf.jpg">
                                </div>
                                <div class="col px-0">
                                    <img class="img-fluid rounded-right" src="https://www.edamam.com/web-img/35f/35f25638bc22fd3de19b2bf3fcf75c27.jpg">
                                </div>
                            </div>
                        </div>
                    </div>
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