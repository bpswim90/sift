<template>
<div id="app">
    <log-in-box></log-in-box>
</div>
</template>

<script>
var LogInBox = require("./components/LogInBox.vue")

module.exports = {
    name: 'app',
    components: {
        'log-in-box': LogInBox
    }
}
</script>

<style>
</style>