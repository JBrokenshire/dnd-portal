<template>
  <div class="page">
    <page-header />

    <div class="content padding-x">
      <slot />
    </div>

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
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content {
  flex-grow: 1
}
</style>