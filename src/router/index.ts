import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

//Importation de tous les composants

import HomePage from '../views/HomePage.vue'

import AdminHome from '../views/Admin/AdminHome.vue'


import AdminGererConcerts from '../views/Admin/AdminGererConcerts.vue'
import AdminCreateConcert from '../views/Admin/AdminCreateConcert.vue'
import AdminEditConcert from '../views/Admin/AdminEditConcert.vue'
import AdminDetailsConcert from '../views/Admin/AdminDetailsConcert.vue'

import AdminGererCategories from '../views/Admin/AdminGererCategories.vue'
import AdminCreateCategorie from '../views/Admin/AdminCreateCategorie.vue'
import AdminEditCategorie from '../views/Admin/AdminEditCategorie.vue'

import AdminGererUtilisateurs from '../views/Admin/AdminGererUtilisateurs.vue'
import AdminCreateUtilisateur from '../views/Admin/AdminCreateUtilisateur.vue'


import UserHome from '../views/User/UserHome.vue'
import UserCreateConcert from '../views/User/UserCreateConcert.vue'
import UserGererConcerts from '../views/User/UserGererConcerts.vue'
import UserEditConcert from '../views/User/UserEditConcert.vue'
import UserDetailsConcert from '../views/User/UserDetailsConcert.vue'

const routes: Array<RouteRecordRaw> = [

  //Page de connexion

  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },


  //Page d'accueil - admin

  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  },

  //Concerts - admin

  {
    path: '/admin/concerts',
    name: 'AdminGererConcerts',
    component: AdminGererConcerts
  },

  {
    path: '/admin/concerts/create',
    name: 'AdminCreateConcert',
    component: AdminCreateConcert
  },

  {
    path: '/admin/concerts/details/:id',
    name: 'AdminDetailsConcert',
    component: AdminDetailsConcert
  },

  {
    path: '/admin/concerts/edit/:id',
    name: 'AdminEditConcert',
    component: AdminEditConcert
  },

  //Categories - admin

  {
    path: '/admin/categories',
    name: 'AdminGererCategories',
    component: AdminGererCategories
  },

  {
    path: '/admin/categories/create',
    name: 'AdminCreateCategorie',
    component: AdminCreateCategorie
  },

  {
    path: '/admin/categories/edit/:id',
    name: 'AdminEditCategorie',
    component: AdminEditCategorie
  },

  //Utilisateurs - admin

  {
    path: '/admin/utilisateurs',
    name: 'AdminGererUtilisateurs',
    component: AdminGererUtilisateurs
  },

  {
    path: '/admin/utilisateurs/create',
    name: 'AdminCreateUtilisateur',
    component: AdminCreateUtilisateur
  },

  //User

  {
    path: '/user',
    name: 'UserHome',
    component: UserHome
  },

  {
    path: '/user/concerts/create',
    name: 'UserCreateConcert',
    component: UserCreateConcert
  },

  {
    path: '/user/concerts',
    name: 'UserGererConcerts',
    component: UserGererConcerts
  },

  {
    path: '/user/concerts/edit/:id',
    name: 'UserEditConcert',
    component: UserEditConcert
  },

  {
    path: '/user/concerts/details/:id',
    name: 'UserDetailsConcert',
    component: UserDetailsConcert
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
