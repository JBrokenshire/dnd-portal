export default [
  {
    path: "/characters",
    name: "characters",
    component: () => import("@/views/characters/CharacterList.vue"),
  },
  {
    path: "/characters/:id",
    name: "character-details",
    component: () => import("@/views/characters/CharacterDetails.vue"),
  },
]