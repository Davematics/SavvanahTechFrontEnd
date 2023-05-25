import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../Auth';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/Home.vue'),
        meta: {
          requiresAuth: true
      }
      },

      {
        path: '/mybooks',
        name: 'mybooks',
        component: () => import('@/views/books/MyBooks.vue'),
        meta: {
          requiresAuth: true
      }
        
      },

      {
        path: '/book/:id',
        name: 'bookDetails',
        component: () => import('@/views/books/BookDetails.vue'),
        meta: {
          requiresAuth: true
      }
        
      },

      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/Profile.vue'),
        meta: {
          requiresAuth: true
      }
        
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) ) {
      if (Auth.check()) {
          next();
          return;
      } else {
          router.push('/login');
      }
  } else {
    console.log(routes.path)
      next();
  }
});
export default router
