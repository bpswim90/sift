<template>
    <div class="card">
        <div class="card-body p-5">
            <h5 class="card-title mb-3">Welcome to sift.</h5>
            <p class="card-subtitle text-muted mb-4">Find your next great meal.</p>
            <form>
                <input type="email" class="form-control mb-1" placeholder="E-mail">
                <input type="password" class="form-control mb-1" placeholder="Password">
                <button type="submit" class="btn btn-primary form-control">Log In</button>
            </form>
        </div>
        <div class="card-footer">
            Not a member yet? Sign up!
        </div>
    </div>
</template>

<script>
module.exports = {
    
}
</script>

<style>
.card {
    width: 400px;
    margin: auto;
}
</style>