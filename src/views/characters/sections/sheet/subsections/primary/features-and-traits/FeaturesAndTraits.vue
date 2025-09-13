<template>
  <div class="overflow-y-auto">
    <!-- Class Features -->
    <div>
      <div class="content-section__header">
        <div class="content-section__header-text">Class Features</div>
      </div>
    </div>

    <!-- Racial Traits -->
    <div>
      <div class="content-section__header">
        <div class="content-section__header-text">Racial Traits</div>
      </div>

      <race-trait-display
        v-for="(trait, index) in $props.character.race.traits"
        :key="`race-trait-${index}`"
        :trait="trait"
      />
    </div>
  </div>
</template>

<script>
  import RaceTraitDisplay
    from "@/views/characters/sections/sheet/subsections/primary/features-and-traits/RaceTraitDisplay.vue";

  export default {
    name: "FeaturesAndTraits",
    components: {RaceTraitDisplay},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style scoped>

</style>