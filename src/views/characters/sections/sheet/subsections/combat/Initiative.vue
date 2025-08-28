<template>
  <div class="pt-[2px] w-[105px]">
    <section class="relative mx-auto cursor-pointer w-[5.625rem]">
      <div class="text-center font-bold text-white uppercase text-[.8125rem] mb-[.1875rem] text-outline">Initiative
      </div>

      <div
        class="relative flex-center text-center font-bold uppercase w-[5.625rem] h-[3.4375rem] text-[1.625rem] tracking-[-.0625rem]"
      >
        <div class="character-sheet-section-bg">
          <svg viewBox="0 0 70 45">
            <polygon
              fill="#10161ADB"
              points="68.8,22.5 55.8,43.3 14.2,43.3 1.2,22.5 14.2,1.8 14.3,1.7 55.7,1.7 55.8,1.8 "
            />
            <path
              d="M59.1,0H10.9L0,17.2v10.5L10.9,45H59l11-17.2V17.2L59.1,0z M58.2,2.2l10,15.8v3L56.5,2.3l-0.1-0.1H58.2z M14.8,2.2h40.5 l0.1,0.1L68,22.5L55.3,42.8H14.7L2,22.5L14.8,2.2L14.8,2.2z M1.8,18l10-15.8h1.8l-0.1,0.1L1.8,21V18z M11.8,42.8L1.8,27v-3 l11.7,18.8H11.8z M68.2,27l-10,15.8h-1.7L68.2,24V27z"
              fill="#972e2e"
            />
          </svg>
        </div>

        <h2 class="sr-only">Initiative</h2>

        <button
          class="font-normal rounded-[4px] relative inline-flex items-center justify-center bg-transparent transition-200 cursor-pointer w-[3.25rem] h-[2.125rem] text-white border border-fighter hover:bg-fighter-faded"
        >
          <span class="relative inline-flex items-center">
            <span class="text-gray-light text-[1.25rem] mr-[.063rem]">
              {{ initiativeModifier >= 0 ? '+' : '-' }}
            </span>
            <span>{{ Math.abs(initiativeModifier) }}</span>
          </span>
        </button>
      </div>
    </section>
  </div>
</template>

<script>
  import {modifierFromLevel} from "@/utils/characterSheet";

  export default {
    name: "Initiative",
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    computed: {
      // TODO: Update this when additional initiative modifiers have been added
      initiativeModifier() {
        return modifierFromLevel(this.$props.character.dexterity)
      }
    }
  }
</script>

<style scoped>

</style>