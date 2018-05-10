<template>
    <div class="modal fade" id="newCollectionForm" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add new collection</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label for="collectionName" class="col-2 col-form-label">Name</label>
                        <div class="col-10">
                            <input type="text" class="form-control" id="collectionName" v-model="collectionName">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" v-on:click="addNewCollection()">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            collectionName: ""
        }
    },
    methods: {
        addNewCollection: function() {
            this.$store.dispatch('addNewCollection', this.collectionName)
            $('#newCollectionForm').modal('hide')
        }
    }
}
</script>

<style>
</style>
