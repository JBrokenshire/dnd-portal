export default [
  {
    path: "/characters",
    name: "characters",
    component: () => import("@/views/characters/CharacterList.vue"),
  }
]