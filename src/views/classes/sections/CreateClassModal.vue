<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }"
  >
    <form @submit.stop.prevent="handleSubmit(createClass)">
      <div class="mb-2">
        <label>Name</label>
        <validation-provider
          v-slot="validationContext"
          :rules="{ required: true }"
          name="Name"
        >
          <text-input
            v-model="newClass.name"
            :state="getValidationState(validationContext)"
            placeholder="Enter class name"
          />
          <small class="text-danger">{{ validationContext.errors[0] }}</small>
        </validation-provider>
      </div>

      <section class="mb-2">
        <label>Logo</label>
        <validation-provider
          v-slot="validationContext"
          :rules="{ isImageFile }"
          name="Image"
        >
          <file-input
            v-model="image"
            :state="getValidationState(validationContext)"
            placeholder="Browse files"
          />
        </validation-provider>
      </section>

      <div class="float-right flex gap-2 mt-2">
        <c-button
          class="mr-2"
          @click="$emit('close')"
        >
          Cancel
        </c-button>
        <c-button
          type="submit"
          variant="primary"
        >
          Create
        </c-button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
  import ClassService from "@/services/ClassService";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import FileInput from "@/components/ui/input/FileInput.vue";
  import {isImageFile} from "@core/utils/validations/validations";

  export default {
    name: "CreateClassModal",
    components: {CButton, FileInput, TextInput},
    data() {
      return {
        loading: false,
        newClass: {
          name: "",
        },
        image: null,
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    methods: {
      getValidationState({dirty, validated, valid = null}) {
        return dirty || validated ? valid : null;
      },
      async createClass() {
        this.loading = true;
        try {
          const dto = {
            name: this.newClass.name,
          }
          const res = await ClassService.create(dto)
          console.log(res)

          if (this.image) {
            await ClassService.uploadLogo(res.data.id, this.image)
          }

          this.$router.push({name: 'class-details', params: res.data.id})
          this.$emit("close")
        } catch (err) {
          const res = err.response;
          let errorText = "Could not create class, please refresh and try again";

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