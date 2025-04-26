<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit, invalid }"
  >
    <form @submit.prevent="handleSubmit(createCharacter)">
      <div class="flex gap-4 mb-4">
        <section class="w-1/2">
          <label>Name</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Name"
          >
            <text-input
              v-model="character.name"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter name"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="w-1/2">
          <label>Pronouns</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Pronouns"
          >
            <text-input
              v-model="character.pronouns"
              :invalid="!!validationContext.errors[0]"
              placeholder="Enter pronouns"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <div class="flex gap-4">
        <section class="mb-4 w-1/2">
          <label>Class</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Class"
          >
            <dropdown
              v-model="character.class_id"
              :invalid="!!validationContext.errors[0]"
              :options="classOptions"
              placeholder="Select Class"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>

        <section class="mb-4 w-1/2">
          <label>Race</label>
          <validation-provider
            v-slot="validationContext"
            :rules="{ required: true }"
            name="Race"
          >
            <dropdown
              v-model="character.race_id"
              :invalid="!!validationContext.errors[0]"
              :options="raceOptions"
              placeholder="Select Race"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <div class="flex gap-4">
        <section class="w-1/2 mb-4">
          <label>Level</label>
          <validation-provider
            v-slot="validationContext"
            name="Level"
          >
            <number-input
              v-model="character.level"
              :invalid="!!validationContext.errors[0]"
              :max="20"
              :min="1"
              placeholder="Write a short description for the class"
            />
            <small class="text-danger">{{ validationContext.errors[0] }}</small>
          </validation-provider>
        </section>
      </div>

      <section class="mb-4">
        <label>Profile Picture (Optional)</label>
        <validation-provider
          v-slot="validationContext"
          :rules="{ isImageFile }"
          name="Profile Picture"
        >
          <file-input
            v-model="profilePicture"
            :invalid="!!validationContext.errors[0]"
            placeholder="Browse files"
          />
          <small class="text-danger">{{ validationContext.errors[0] }}</small>
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
          :disabled="invalid || loading"
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
  import RaceService from "@/services/RaceService";
  import ClassService from "@/services/ClassService";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import Dropdown from "@/components/ui/input/Dropdown.vue";
  import CharacterService from "@/services/CharacterService";
  import FileInput from "@/components/ui/input/FileInput.vue";
  import TextInput from "@/components/ui/input/TextInput.vue";
  import NumberInput from "@/components/ui/input/NumberInput.vue";
  import {isImageFile} from "@core/utils/validations/validations";

  export default {
    name: "CreateCharacterModal",
    components: {NumberInput, TextInput, FileInput, CButton, Dropdown},
    data() {
      return {
        loading: false,
        character: {
          name: "",
          pronouns: "",
          class_id: 0,
          race_id: 0,
          level: 1,
        },
        profilePicture: null,
        raceOptions: [],
        classOptions: [],
      }
    },
    computed: {
      isImageFile() {
        return isImageFile
      }
    },
    mounted() {
      this.getRaces()
      this.getClasses()
    },
    methods: {
      async getClasses() {
        this.loading = true;
        try {
          const filters = {
            page: 0,
            page_size: 100,
            search: "",
          }

          const res = await ClassService.list(filters)
          this.classOptions = res.data.data.map(classType => {
            return {label: classType.name, value: classType.id};
          })
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get classes, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async getRaces() {
        this.loading = true;
        try {
          const filters = {
            page: 0,
            page_size: 100,
            search: "",
          }

          const res = await RaceService.list(filters)
          this.raceOptions = res.data.data.map(race => {
            return {label: race.name, value: race.id};
          })
        } catch (err) {
          const res = err.response;
          let errorText = "Could not get races, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async createCharacter() {
        this.loading = true;
        try {
          const dto = {
            name: this.character.name,
            pronouns: this.character.pronouns,
            class_id: this.character.class_id,
            race_id: this.character.race_id,
            level: this.character.level,
          }

          const res = await CharacterService.create(dto)

          if (this.profilePicture) {
            await CharacterService.uploadProfilePicture(res.data.id, this.profilePicture)
          }

          HelperService.successToast(this.$toast, "Character created successfully")
          await this.$router.push({name: 'character-details', params: {id: res.data.id}})
          this.$emit("close")
        } catch (err) {
          const res = err.response;
          let errorText = "Could not create character, please refresh and try again";

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