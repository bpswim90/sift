<template>
    <div class="col-md-6">
        <div class="card mb-4">
            <div class="card-body d-flex justify-content-between">
                <div class="my-auto">
                    <router-link v-bind:to="'/search/collection/' + collection.key">
                        <h4 class="my-auto">{{collection.name}}</h4>
                    </router-link>
                </div>
                <button class="btn btn-secondary my-auto" v-if="editMode" data-toggle="modal" :data-target="'#removeCollection'+index">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col px-0 bg-light">
                        <img class="img-fluid rounded-left" :src="img1src">
                    </div>
                    <div class="col px-1 bg-light">
                        <img class="img-fluid" :src="img2src">
                    </div>
                    <div class="col px-0 bg-light">
                        <img class="img-fluid rounded-right" :src="img3src">
                    </div>
                </div>
            </div>
        </div>
        <!--Modal for confirming removeCollection-->
        <div class="modal fade" :id="'removeCollection'+index" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Remove collection?</h5>
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to remove this collection? This will delete all recipes in the collection and can't be undone.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger"
                            v-on:click="removeCollection(collection.key, index)">Remove</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var Firebase = require('firebase')

module.exports = {
    props: ['collection','index','editMode'],
    data: function() {
        return {
            imgSources: []
        }
    },
    computed: {
        img1src: function() {
            if (this.imgSources[0]) {
                return this.imgSources[0]
            } else {
                return 'src/assets/grey_filler.jpg'
            }
        },
        img2src: function() {
            if (this.imgSources[1]) {
                return this.imgSources[1]
            } else {
                return 'src/assets/grey_filler.jpg'
            }
        },
        img3src: function() {
            if (this.imgSources[2]) {
                return this.imgSources[2]
            } else {
                return 'src/assets/grey_filler.jpg'
            }
        },
    },
    methods: {
        removeCollection: function(collectionId, index) {
            this.$store.dispatch('removeCollection',collectionId)

            var removeCollectionModal = '#removeCollection' + index
            $(removeCollectionModal).modal('hide')
        }
    },
    created: function() {
        var ref = Firebase.database().ref('/recipes/' + this.collection.key)

        var imgSourcesList = []
        ref.limitToLast(3).on("value", function(data) {
            imgSourcesList.splice(0,imgSourcesList.length)
            data.forEach(function(data) {
                var recipeObj = data.val()
                var imgSource = recipeObj.img
                imgSourcesList.push(imgSource)
            })
        })

        this.imgSources = imgSourcesList
    }
}
</script>

<style>

</style>