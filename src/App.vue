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
        }
    },
    created() {
        this.setUser()
    }
}
</script>

<style>
</style>