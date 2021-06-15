import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }, {
    path: '/Home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    redirect: '/Welcome',
    children: [
      {
        path: '/Welcome',
        component: () => import(/* webpackChunkName: "welcome" */ '../components/singInOrOut/welcome'),
      },
      {
        path: '/userList',
        component: () => import(/* webpackChunkName: "userList" */ '../components/users/userList')
      },{
        path: '/bookList',
        component: () => import(/* webpackChunkName: "userList" */ '../components/books/bookList')
      },{
        path: '/userData',
        component: () => import(/* webpackChunkName: "userList" */ '../components/users/userData')
      },{
        path: '/bookData',
        component: () => import(/* webpackChunkName: "userList" */ '../components/books/bookData')
      }
    ]

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
