<template>
<div id="app">
    <div class="card mx-auto" id="login">
        <div class="card-body p-5">
            <h5 class="card-title mb-3">Welcome to sift.</h5>
            <p class="card-subtitle text-muted mb-5">Search for recipes from your favorite sites across the internet.</p>
            <form>
                <input type="email" class="form-control mb-1" placeholder="E-mail">
                <input type="password" class="form-control mb-1" placeholder="Password">
                <button type="submit" class="btn btn-primary form-control">Log In</button>
            </form>
        </div>
        <div class="card-footer text-muted text-center">
            <small>Not a member yet? Sign up!</small>
        </div>
    </div>
</div>
</template>

<script>
module.exports = {
    name: 'app'
}
</script>

<style>
#login {
    display: block;
    width: 400px
}
</style>