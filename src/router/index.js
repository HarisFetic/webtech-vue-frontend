import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KraftuebungenView from '../views/KraftuebungenView.vue'
import AusdaueruebungenView from '../views/AusdaueruebungenView.vue'
import DoneView from '../views/DoneView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "about" */ '../components/DynamicForm.vue')
  },
  {
    path: '/kraftuebungen',
    name: 'kraftuebungen',
    component: KraftuebungenView
  },

  {
    path: '/ausdaueruebungen',
    name: 'ausdaueruebungen',
    component: AusdaueruebungenView
  },

  {
    path: '/done',
    name: 'done',
    component: DoneView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
