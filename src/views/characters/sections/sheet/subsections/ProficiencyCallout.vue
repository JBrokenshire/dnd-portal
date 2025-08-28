<template>
  <div class="border-b border-[#c5313166] mb-2 pb-2">
    <div class="font-bold uppercase text-[14px] text-gray-light">{{ $props.title }}</div>
    <div class="text-white text-[13px]">{{ $props.values.join(', ') }}</div>
  </div>
</template>

<script>
  export default {
    name: "ProficiencyCallout",
    props: {
      title: {
        type: String,
        required: true,
      },
      values: {
        type: Array,
        default: () => [],
      }
    },
  }
</script>

<style scoped>

</style>