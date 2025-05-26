export default [
  {
    path: "/characters",
    name: "characters",
    component: () => import("@/views/characters/CharacterList.vue"),
  },
  {
    path: "/characters/:id/sheet",
    name: "character-details",
    component: () => import("@/views/characters/CharacterDetails.vue"),
  },
  {
    path: "/characters/builder",
    name: "character-builder",
    component: () => import("@/views/characters/CharacterBuilder.vue"),
  }
]