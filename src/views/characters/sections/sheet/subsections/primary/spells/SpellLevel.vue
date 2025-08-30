<template>
  <div v-if="$props.spells.length > 0">
    <div class="border-b border-[#c5313166] flex items-center pb-0 mb-[10px]">
      <div class="text-fighter text-[13px] font-bold grow shrink basis-0 min-w-0 uppercase">
        {{ $props.title }}
      </div>
    </div>

    <div>
      <div class="text-gray-light flex">
        <div class="spell-level__col-name w-[35px]" />
        <div class="spell-level__col-name w-[135px]">Name</div>
        <div class="spell-level__col-name w-[35px]">Time</div>
        <div class="spell-level__col-name w-[55px]">Range</div>
        <div class="spell-level__col-name w-[45px]">Hit / DC</div>
        <div class="spell-level__col-name w-[85px]">Effect</div>
        <div class="spell-level__col-name grow shrink basis-0">Notes</div>
      </div>

      <div class="pt-[5px] pb-[8px]">
        <spell
          v-for="spell in $props.spells"
          :key="`spell-${$props.title}-${spell.name}`"
          :attack-modifier="$props.attackModifier"
          :save-dc="$props.saveDc"
          :spell="spell"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Spell from "@/views/characters/sections/sheet/subsections/primary/spells/Spell.vue";

  export default {
    name: "SpellLevel",
    components: {Spell},
    props: {
      title: {
        type: String,
        required: true
      },
      spells: {
        type: Array,
        required: true,
      },
      attackModifier: {
        type: Number,
        required: true,
      },
      saveDc: {
        type: Number,
        required: true,
      }
    }
  }
</script>

<style scoped>
</style>