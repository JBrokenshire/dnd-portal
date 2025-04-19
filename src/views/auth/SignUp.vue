<template>
  <div class="position-relative flex-center">
    <div class="background-image">
      <b-img :src="backgroundImage" />
    </div>

    <b-card
      class="col-3 shadow-lg flex-grow-1 mx-4"
      style="max-width:420px; min-width: 280px;"
      title="Sign Up"
    >
      <validation-observer
        ref="observer"
        v-slot="{ handleSubmit, invalid }"
      >
        <b-form @submit.stop.prevent="handleSubmit(signUp)">
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

          <!-- Confirm Password -->
          <section class="mb-2">
            <label>Confirm Password</label>
            <validation-provider
              v-slot="validationContext"
              :rules="{ required: true }"
              name="Confirm Password"
            >
              <section class="d-flex align-items-center">
                <b-form-input
                  v-model="confirmPassword"
                  :state="getValidationState(validationContext)"
                  :type="passwordFieldType"
                  class="mr-2"
                  placeholder="●●●●●●●●"
                />
              </section>

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
              <small
                v-if="password !== confirmPassword"
                class="text-danger"
              >
                Passwords do not match.
              </small>
            </validation-provider>
          </section>

          <section class="my-4">
            <b-btn
              :disabled="invalid || loading"
              class="w-100"
              type="submit"
              variant="primary"
            >
              Sign Up
            </b-btn>
          </section>
        </b-form>
      </validation-observer>

      <!-- Sign up -->
      <section
        class="mb-2 full-width text-center"
      >
        Already have an account?
        <router-link :to="{name: 'auth-login'}">Login</router-link>
      </section>
    </b-card>
  </div>

</template>

<script>
  import {togglePasswordVisibility} from "@core/mixins/ui/forms"
  import UserService from "@/services/UserService";
  import HelperService from "@/services/HelperService";
  import auth from "@/auth/auth";

  export default {
    name: "SignUp",
    mixins: [togglePasswordVisibility],
    data() {
      return {
        username: "",
        password: "",
        confirmPassword: "",
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
      async signUp() {
        this.loading = true
        try {
          const createUserDTO = {
            username: this.username,
            password: this.password,
            confirm_password: this.confirmPassword
          }

          await UserService.create(createUserDTO)

          const loginDTO = {
            username: this.username,
            password: this.password,
          }
          const res = await auth.login(loginDTO)
          auth.setToken(res.data.access_token)
          await auth.refreshCurrentUser()

          HelperService.successToast(this.$toast, `Welcome ${auth.getCurrentUser().username}!`)
          await this.$router.push({name: 'home'})
        } catch (err) {
          const res = err.response;
          let errorText = "Could not create user, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false
        }
      },
      forgotPassword() {
        this.$router.push({name: 'auth-forgot-password'})
      },
    },
  }
</script>

<style>
</style>
