<template>
  <div class="w-full bg-character-sheet-header text-white py-8">
    <div class="mx-auto max-w-[1200px]">
      <router-link
        :to="{name: 'characters'}"
      >
        <c-button
          class="max-w-fit flex gap-1 mb-2 text-sm"
        >
          <feather-icon
            class="mb-[.125rem]"
            icon="ChevronLeftIcon"
          />
          Back to Characters
        </c-button>
      </router-link>
      <div class="flex items-center gap-4">
        <img
          :class="`w-[100px] aspect-square border-2 border-fighter rounded`"
          :src="profilePictureURL"
          alt="Profile Picture"
        >
        <div>
          <h1 class="text-2xl font-bold">{{ character.name }}</h1>
          <div class="text-sm text-gray-light">{{ character.pronouns && `${character.pronouns} | ` }}
            {{ character.race.name }} | {{ character.class.name }}
          </div>
          <div>Level {{ character.level }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";

  export default {
    name: 'CharacterSheetHeader',
    components: {CButton},
    props: {
      character: {
        type: Object,
        required: true
      }
    },
    computed: {
      profilePictureURL() {
        if (this.$props.character.profile_picture) {
          return `${HelperService.getApiUrl()}/files/${
            this.$props.character.profile_picture.file_location
          }/${this.$props.character.profile_picture.filename}`;
        }

        return "";
      }
    }
  }
</script>

<style scoped>

</style>