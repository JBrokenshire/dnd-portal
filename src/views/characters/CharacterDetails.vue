<template>
  <div>
    <router-link
      :to="{name: 'characters'}"
      class="flex items-center gap-2 text-lg mb-4 nav-link"
    >
      <feather-icon
        icon="ChevronLeftIcon"
        size="32"
      />
      Back to Characters
    </router-link>
  </div>
</template>

<script>
  import CharacterService from "@/services/CharacterService";
  import HelperService from "@/services/HelperService";

  export default {
    name: "CharacterDetails",
    components: {},
    data() {
      return {
        character: null,
        loading: false,
      }
    },
    mounted() {
      this.getCharacter()
    },
    methods: {
      async getCharacter() {
        this.loading = true
        try {
          const res = await CharacterService.get(this.$route.params.id)
          this.character = res.data
          console.log(this.character)
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get character, please refresh and try again";

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