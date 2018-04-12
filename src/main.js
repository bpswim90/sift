var Vue = require('vue')
var VueRouter = require('vue-router')
var Search = require('./Search.vue')
var LogIn = require('./LogIn.vue')
var App = require('./App.vue')

Vue.use(VueRouter)

var routes = [
    { path: '', component: LogIn },
    { path: '/login', component: LogIn},
    { path: '/search', component: Search}
]

var router = new VueRouter({
    routes: routes
})

new Vue({ // eslint-disable-line no-new
    el: '#app',
    render: (h) => h(App),
    router: router
})