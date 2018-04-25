<template>
    <div class="container-fluid">
        <div id="profile">
            <h1 id="profile-header" class="my-4"><i class="far fa-user-circle mr-2"></i>{{userEmail}}</h1>
            <hr>
            <h3>My Favorite Sources</h3>
            <div class="my-4">
                <ul>
                    <li v-for="favorite in userFavorites">
                        {{favorite}}
                    </li>
                </ul>
            </div>
            <hr>
            <h3>My Collections</h3>
        </div>
    </div>
</template>

<script>
var Firebase = require('firebase')

module.exports = {
    props: ['userEmail','userFavorites']
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
</style>