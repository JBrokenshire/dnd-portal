<template>
  <div class="h-[770px] relative">
    <saving-throws :character="$props.character" />

    <senses :character="$props.character" />

    <proficiency-groups :character="$props.character" />
  </div>
</template>

<script>

  import SavingThrows from "@/views/characters/sections/sheet/subsections/SavingThrows.vue";
  import Senses from "@/views/characters/sections/sheet/subsections/Senses.vue";
  import ProficiencyGroups from "@/views/characters/sections/sheet/subsections/ProficiencyGroups.vue";

  export default {
    name: "CharacterSubsections",
    components: {ProficiencyGroups, Senses, SavingThrows},
    props: {
      character: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>