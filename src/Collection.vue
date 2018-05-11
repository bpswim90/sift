<template>
    <div class="container-fluid">
        <div id="collection">
            <h1 class="my-4">
                {{collectionName}}
            </h1>
            <hr>
            Collections will go here!
        </div>
    </div>
</template>

<script>
var Firebase = require('firebase')

module.exports = {
    props: ['collectionId'],
    computed: {
        userId: function() {
            return this.$store.getters.getUserId
        },
        collectionName: function() {
            var ref = Firebase.database().ref('collections/' + this.userId + '/' + this.collectionId + '/name')
            var collectionName = ""

            ref.once('value', function(data) {
                collectionName = data.val()
            })

            return collectionName
        }
    }
}
</script>

<style>
#collection {
    max-width: 800px;
    margin: auto;
}
</style>