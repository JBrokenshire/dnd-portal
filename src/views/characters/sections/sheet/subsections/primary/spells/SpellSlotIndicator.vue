<template>
  <div
    :class="`flex-center bg-[#10161A] h-[21px] w-[21px] m-[2px] min-w-[20px] cursor-pointer hover:border-fighter hover:border-2 ${active ? 'border-2 border-fighter' : 'border border-[#d8d8d8]'}`"
    @click="active = !active"
  >
    <div
      :class="`w-[10px] h-[10px] bg-fighter transition-200 ${active ? 'scale-100' : 'scale-0'}`"
    />
  </div>
</template>

<script>
  export default {
    name: "SpellSlotIndicator",
    data() {
      return {
        active: false
      }
    }
  }
</script>

<style scoped>

</style>