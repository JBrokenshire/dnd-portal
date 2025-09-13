<template>
  <div class="cursor-pointer mb-[13px]">
    <div class="text-white font-bold leading-[1.2] text-[14px]">{{ $props.trait.name }}</div>
    <div class="text-gray-light text-[12px]">
      <p>{{ $props.trait.description }}</p>
    </div>

    <div
      v-if="$props.trait.trait_spells"
      class="feature-ability-section"
    >
      <!-- Trait Spells -->
      <div
        v-for="(traitSpell, index) in $props.trait.trait_spells"
        :key="`trait-${$props.trait.name}-trait-spell-${index}`"
        class="flex items-center cursor-pointer"
      >
        <div class="mr-[5px]">
          <span class="text-white">
            {{ traitSpell.spell.name }}
            <span class="ml-[.188rem] text-gray-light">({{ numberToPosition(traitSpell.spell.level) }})</span>
          </span>
        </div>

        <div class="text-white flex items-center">
          <div class="inline-flex items-center font-bold mr-[5px]">
            <spell-slot-indicator
              v-for="use in traitSpell.uses"
              :key="`trait-spell-${index}-slot-indicator-${use}`"
            />
          </div>
          <div class="text-gray-light mr-[5px]">/</div>
          <div>{{ traitSpell.reset }}</div>
        </div>
      </div>
    </div>

    <div
      v-if="$props.trait.options"
      class="feature-ability-section"
    >
      <div
        v-for="(option, index) in $props.trait.options"
        :key="`trait-${$props.trait.name}-option${index}`"
      >
        <div class="font-bold text-white leading-[1.2]">{{ option.name }}</div>
        <div class="text-white mt-[5px]">{{ option.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import SpellSlotIndicator from "@/views/characters/sections/sheet/subsections/primary/spells/SpellSlotIndicator.vue";

  export default {
    name: "RaceTraitDisplay",
    components: {SpellSlotIndicator},
    props: {
      trait: {
        type: Object,
        required: true
      }
    },
    methods: {
      numberToPosition(number) {
        switch (number) {
        case 1:
          return '1st'
        case 2:
          return '2nd'
        case 3:
          return '3rd'
        default:
          return `${number}th`
        }
      }
    }
  }
</script>

<style scoped>

</style>