<template>
<div>
    <router-link to="/search">Search</router-link>
    <router-link to="/login">LogIn</router-link>
    <router-link to="/signup">SignUp</router-link>

    <router-view></router-view>
</div>
</template>

<script>
module.exports = {
    name: 'app'
}
</script>

<style>
</style>