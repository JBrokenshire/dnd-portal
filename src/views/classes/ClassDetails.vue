<template>
  <div>
    <card
      v-if="classType"
      :title="classType.name"
      class="mb-4"
    />
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import ClassService from "@/services/ClassService";
  import HelperService from "@/services/HelperService";

  export default {
    name: "ClassDetails",
    components: {Card},
    data() {
      return {
        classType: null,
        loading: false,
      }
    },
    mounted() {
      this.getClass()
    },
    methods: {
      async getClass() {
        this.loading = true;
        try {
          const res = await ClassService.get(this.$route.params.id);
          this.classType = res.data;
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get class, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      }
    }
  }
</script>

<style scoped>

</style>