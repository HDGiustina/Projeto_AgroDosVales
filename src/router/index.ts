import { route } from 'quasar/wrappers'
import { globalUser, updateUser } from 'src/composables/user'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  updateUser()
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    updateUser()
    const usuario = globalUser.value
    const rotasPermitidas = ['/bioativas', '/eventos', '/educacao', '/acess', '/recuperarsenha']

    if (to.path === '/bioativas' || to.path === '/eventos' || to.path === '/educacao' || to.path === '/acess' || to.path === '/recuperarsenha') {
      next()
    } else if (!usuario && !rotasPermitidas.includes(to.path)) {
      next({ path: '/bioativas' })
    } else if (usuario && to.path === '/') {
      next({ path: 'home' })
    } else {
      if (to.path.startsWith('/cadastros') && usuario && usuario.tipo_usuario !== 'admin') {
        next({ path: '/erro' })
      } else {
        next()
      }
    }
  })
  return Router
})
