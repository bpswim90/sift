<template>
<div id="app">
    <div class="card mx-auto" id="signup">
        <div class="card-body p-5">
            <h5 class="card-title mb-3">Sign up for sift.</h5>
            <p class="card-subtitle text-muted mb-5">Create an account to begin searching for recipes.</p>
            <form v-on:submit.prevent="signUp">
                <input type="email" class="form-control mb-1" placeholder="E-mail" v-model="email">
                <input type="password" class="form-control mb-1" placeholder="Password" v-model="password">
                <button type="submit" class="btn btn-primary form-control">Sign Up</button>
            </form>
        </div>
        <div class="card-footer text-muted text-center">
            <small>Already signed up? <router-link to="/login">Log in here.</router-link></small>
        </div>
    </div>
</div>
</template>

<script>
var Firebase = require('firebase')

module.exports = {
    name: 'app',
    data: function() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        signUp: function() {
            Firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    user => {
                        this.$router.replace('/search')
                    },
                    error => {
                        alert(error.message)
                    }
                )
        }
    }
}
</script>

<style>
#signup {
    display: block;
    max-width: 400px
}
</style>