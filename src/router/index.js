import VueRouter from "vue-router"

import auth from "@/router/routes/auth"
import {isUserLoggedIn} from "@/auth/utils"
import {canNavigate} from "@/libs/acl/routeProtection"
import character from "@/router/routes/character";

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home/Home.vue"),
    },
    ...auth,
    ...character
  ],
})


router.beforeEach(async(to, _, next) => {
  const isLoggedIn = await isUserLoggedIn()
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({name: "auth-login"})
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next("/")
  }

  return next()
})


export default router
