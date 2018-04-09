<template>
    <div class="card" v-show="name">
        <img class="card-img-top" v-bind:src="img">
        <div class="card-body">
            <h4 class="card-title">{{name}}</h4>
            <small v-show="url">by <a v-bind:href="url" class="card-link">{{source}}</a></small>
        </div>
    </div>
</template>

<script>
    export default {


    }
</script>

<style>
    .card {display: inline-block}
</style>