<template>
  <div class="h-[770px] relative">
    <saving-throws :character="$props.character" />
  </div>
</template>

<script>

  import SavingThrows from "@/views/characters/sections/sheet/subsections/SavingThrows.vue";

  export default {
    name: "CharacterSubsections",
    components: {SavingThrows},
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