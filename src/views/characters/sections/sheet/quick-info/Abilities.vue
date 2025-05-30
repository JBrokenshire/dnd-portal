<template>
  <section class="w-[564px] flex-between">
    <h2 class="sr-only">Ability Scores</h2>
    <ability
      :score="$props.character.strength"
      title="STRENGTH"
    />
    <ability
      :score="$props.character.dexterity"
      title="DEXTERITY"
    />
    <ability
      :score="$props.character.constitution"
      title="CONSTITUTION"
    />
    <ability
      :score="$props.character.intelligence"
      title="INTELLIGENCE"
    />
    <ability
      :score="$props.character.wisdom"
      title="WISDOM"
    />
    <ability
      :score="$props.character.charisma"
      title="CHARISMA"
    />
  </section>
</template>

<script>
  import Ability from "@/views/characters/sections/sheet/quick-info/Ability.vue";

  export default {
    name: 'Abilities',
    components: {Ability},
    props: {
      character: {
        type: Object,
        required: true,
      }
    }
  }
</script>

<style scoped>

</style>