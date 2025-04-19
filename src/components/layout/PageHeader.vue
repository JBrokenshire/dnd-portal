<template>
  <div
    class="w-full padding-x py-2 flex-between"
    style="z-index: 10;"
  >
    <div class="d-flex align-items-baseline">
      <router-link
        :to="{name: 'home'}"
        class="d-none d-sm-block mr-4"
      >
        <b-img
          :src="websiteLogo"
          class="logo"
        />
      </router-link>
      <h5>Welcome {{ currentUser && currentUser.username }}</h5>
    </div>

    <b-button
      class="d-flex align-items-center text-center shadow"
      variant="danger"
      @click="logout"
    >
      <span class="mr-2">Logout</span>
      <feather-icon icon="LogOutIcon" />
    </b-button>
  </div>
</template>

<script>
  import auth from "@/auth/auth";
  import HelperService from "@/services/HelperService";

  export default {
    name: "PageHeader",
    data() {
      return {
        websiteLogo: require('@/assets/images/website-logo.png'),
      }
    },
    computed: {
      currentUser() {
        return auth.getCurrentUser();
      }
    },
    methods: {
      logout() {
        const username = this.currentUser.username;
        auth.logout();
        HelperService.successToast(this.$toast, `Goodbye ${username}`);
        this.$router.push({name: "auth-login"});
      }
    }
  }
</script>

<style scoped>

</style>