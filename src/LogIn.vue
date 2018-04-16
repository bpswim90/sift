<template>
<div id="app">
    <div class="card mx-auto" id="login">
        <div class="card-body p-5">
            <h5 class="card-title mb-3">Welcome to sift.</h5>
            <p class="card-subtitle text-muted mb-5">Search for recipes from your favorite sites across the internet.</p>
            <div>
                <input type="email" class="form-control mb-1" placeholder="E-mail" v-model="email">
                <input type="password" class="form-control mb-1" placeholder="Password" v-model="password">
                <button type="submit" class="btn btn-primary form-control" v-on:click="logIn">Log In</button>
            </div>
        </div>
        <div class="card-footer text-muted text-center">
            <small>Not a member yet? <router-link to="/signup">Sign up!</router-link></small>
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
        logIn: function() {
            Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
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
#login {
    display: block;
    width: 400px
}
</style>