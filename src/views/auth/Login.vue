<template>
  <div class="position-relative min-vh-100 flex-center">
    <div class="background-image">
      <b-img :src="backgroundImage" />
    </div>

    <b-card
      class="col-3 shadow-lg flex-grow-1 mx-4"
      style="max-width:420px; min-width: 280px;"
      title="Login"
    >
      <validation-observer
        ref="observer"
        v-slot="{ handleSubmit, invalid }"
      >
        <b-form @submit.stop.prevent="handleSubmit(login)">
          <!-- Username -->
          <section class="mb-2">
            <label>Username</label>
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true }"
              name="Username"
            >
              <b-form-input
                v-model="username"
                :state="getValidationState(validationContext)"
                placeholder="Enter username..."
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </section>

          <!-- Password -->
          <section class="mb-2">
            <label>Password</label>
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true }"
              name="Password"
            >
              <section class="d-flex align-items-center">
                <b-form-input
                  v-model="password"
                  :state="getValidationState(validationContext)"
                  :type="passwordFieldType"
                  class="mr-2"
                  placeholder="●●●●●●●●"
                />
                <feather-icon
                  :icon="passwordToggleIcon"
                  class="cursor-pointer"
                  size="24"
                  @click="togglePasswordVisibility"
                />
              </section>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </validation-provider>
          </section>

          <section class="my-4">
            <b-btn
              :disabled="invalid || loading"
              class="w-100"
              type="submit"
              variant="primary"
            >
              Login
            </b-btn>
          </section>
        </b-form>
      </validation-observer>

      <!-- Sign up -->
      <section
        class="mb-2 full-width text-center"
      >
        Don't have an account?<br>
        <router-link :to="{name: 'auth-sign-up'}">Sign Up</router-link>
      </section>
    </b-card>
  </div>

</template>

<script>
  import auth from "@/auth/auth";
  import HelperService from "@/services/HelperService";
  import {togglePasswordVisibility} from "@core/mixins/ui/forms"

  export default {
    name: "Login",
    mixins: [togglePasswordVisibility],
    data() {
      return {
        password: "",
        username: "",
        status: "",
        loading: false,
        backgroundImage: require('@/assets/images/pages/login.jpg'),
      }
    },
    computed: {
      passwordToggleIcon() {
        return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
      },
    },
    methods: {
      getValidationState({dirty, validated, valid = null}) {
        return dirty || validated ? valid : null;
      },
      async login() {
        this.loading = true
        try {
          const dto = {
            username: this.username,
            password: this.password,
          }

          const res = await auth.login(dto)
          auth.setToken(res.data.access_token)
          await auth.refreshCurrentUser()

          HelperService.successToast(this.$toast, `Welcome back ${auth.getCurrentUser().username}!`)
          await this.$router.push({name: 'home'})
        } catch (err) {
          console.error(err)
        } finally {
          this.loading = false
        }
      },
    },
  }
</script>

<style>
</style>
