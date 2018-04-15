var Vue = require('vue')
var VueRouter = require('vue-router')
var Search = require('./Search.vue')
var LogIn = require('./LogIn.vue')
var App = require('./App.vue')

Vue.use(VueRouter)

var routes = [
    { 
        path: '', 
        component: LogIn
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
    var requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth) {
        next('/login');
    } else {
        next();
    }
})

new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: (h) => h(App),
    router: router
})