<template>
<div>
    <router-view></router-view>
</div>
</template>

<script>
module.exports = {
    name: 'app',
    methods: {
        setUser() {
            this.$store.dispatch('setUser')
        },
        setUserFavorites() {
            this.$store.dispatch('setUserFavorites')
        },
        setUserCollections() {
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