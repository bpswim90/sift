<template>
    <div class="container">
        <div id="profile">
            <h1 class="my-4">{{userEmail}}</h1>
            <h3>My favorite sources</h3>
            <ul>
                <li>Bon Appetit</li>
                <li>Food 52</li>
                <li>Smitten Kitchen</li>
            </ul>
            <h3>My Collection</h3>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ['userEmail']
}
</script>

<style>
</style>