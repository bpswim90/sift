<template>
<div id="app">
    <log-in-box id="login" class="mx-auto"></log-in-box>
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
#login {
    display: block;
    width: 400px
}
</style>