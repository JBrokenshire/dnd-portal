export default [
  {
    path: "/auth/login",
    name: "auth-login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      resource: "Auth",
      action: "Read",
      redirectIfLoggedIn: true,
      layout: "full",
    },
  },
]
