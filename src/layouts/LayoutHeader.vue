<template>
  <div class="min-vh-100">
    <page-header />

    <slot />

    <page-footer />
  </div>
</template>

<script>
  import PageHeader from "@/components/layout/PageHeader.vue";
  import PageFooter from "@/components/layout/PageFooter.vue";

  export default {
    name: "LayoutHeader",
    components: {
      PageFooter,
      PageHeader
    }
  }
</script>

<style scoped>

</style>