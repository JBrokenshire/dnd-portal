<template>
  <div>
    <div>TEST</div>
    <b-button
      :disabled="loading"
      @click="logout"
    >Logout
    </b-button>
  </div>
</template>

<script>
  import auth from "@/auth/auth";
  import HelperService from "@/services/HelperService";

  export default {
    name: "Home",
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      async logout() {
        this.loading = true
        try {
          const currentUser = auth.getCurrentUser();

          auth.logout()
          HelperService.successToast(this.$toast, `Goodbye ${currentUser.username}`);
          await this.$router.push({name: "auth-login"})
        } catch (err) {
          const res = err.response;
          let errorText = "Could not log out, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText);
        } finally {
          this.loading = false
        }
      }
    }
  }
</script>

<style scoped>

</style>