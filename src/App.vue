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
            this.$store.dispatch('setUserFavorites')
        },
        setUserCollections: function() {
            this.$store.dispatch('setUserCollections')
        }
    },
    //Set user and userFavorites in state
    created() {
        this.setUser()
        this.setUserFavorites()
        this.setUserCollections()
    }
}
</script>

<style>
</style>