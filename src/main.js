var Vue = require('vue')
var VueRouter = require('vue-router')
var Firebase = require('firebase')
var Search = require('./Search.vue')
var SignUp = require('./SignUp.vue')
var LogIn = require('./LogIn.vue')
var App = require('./App.vue')

// Firebase config
var config = {
    apiKey: "AIzaSyCGp5GMgDVWNCPtEXyzVzNcn-lskKiQaHs",
    authDomain: "sift-f0539.firebaseapp.com",
    databaseURL: "https://sift-f0539.firebaseio.com",
    projectId: "sift-f0539",
    storageBucket: "",
    messagingSenderId: "710146700302"
};

Firebase.initializeApp(config);

Vue.use(VueRouter)

var routes = [
    { 
        path: '', 
        component: LogIn
    },
    {
        path: '/signup',
        component: SignUp
    },
    { 
        path: '/login', 
        component: LogIn
    },
    {
        path: '/search',
        component: Search,
        meta: {
            requiresAuth: true
        }
    }
]

var router = new VueRouter({
    routes: routes
})

//Global navigation guard: redirects to /login if page requires login
router.beforeEach((to, from, next) => {
    var currentUser = Firebase.auth().currentUser
    var requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !currentUser) {
        next('/login')
    } else if (requiresAuth && currentUser) {
        next()
    } else {
        next()
    }
})

new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: (h) => h(App),
    router: router
})