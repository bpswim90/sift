<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>
module.exports = {
    name: 'app',
    methods: {
        setUser: function() {
            this.$store.dispatch('setUser')
        },
        setUserFavorites: function() {
            this.$store.dispatch('setUserFavoritesWithId')
        }
    },
    created() {
        this.setUser()
        this.setUserFavorites()
    }
}
</script>

<style>
</style>