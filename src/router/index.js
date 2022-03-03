import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ManageShopping from '../views/ManageShopping.vue'
import AddShoppingList from '../views/AddShoppingList.vue'
import ManageLists from '../views/ManageLists.vue'
import ShoppingList from '../views/ShoppingList.vue'
import Settings from '../views/Settings.vue'
import Units from '../views/Units.vue'
import Categories from '../views/Categories.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/units',
    name: 'Units',
    component: Units
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/manage-shopping',
    name: 'ManageShopping',
    component: ManageShopping
  },
  {
    path: '/manage-shopping/add-shopping-list',
    name: 'AddShoppingList',
    component: AddShoppingList
  },
  {
    path: '/manage-shopping/manage-lists',
    name: 'ManageLists',
    component: ManageLists
  },
  {
    path: '/manage-shopping/manage-lists/shopping-list/:id',
    name: 'ShoppingList',
    component: ShoppingList,
    props: true
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
