<template>
    <div class="container-fluid">
        <div id="profile">
            <h1 id="profile-header" class="my-4"><i class="far fa-user-circle mr-2"></i>{{userEmail}}</h1>
            <hr>
            <h3>My Favorite Sources</h3>
            <div class="my-4">
                <button class="btn btn-outline-primary" disabled>Bon Appetit</button>
                <button class="btn btn-outline-primary" disabled>Food52</button>
                <button class="btn btn-outline-primary" disabled>Smitten Kitchen</button>
            </div>
            <hr>
            <h3>My Collections</h3>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ['userEmail']
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