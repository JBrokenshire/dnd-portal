<template>
  <div
    v-if="character"
    class="flex flex-col min-h-[100vh]"
  >
    <character-sheet-header :character="character" />
    <div class="relative flex-grow character-sheet-body">
      <!-- Background Image -->
      <img
        :src="backgroundImageURL"
        alt=""
        class="absolute w-full h-full top-0 left-0 -z-10 object-cover"
      >

      <div class="mx-auto max-w-[1200px]">
        <character-quick-info
          :character="character"
          @update="updateCharacter"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import HelperService from "@/services/HelperService";
  import CharacterService from "@/services/CharacterService";
  import CharacterSheetHeader from "@/views/characters/sections/sheet/CharacterSheetHeader.vue";
  import CharacterQuickInfo from "@/views/characters/sections/sheet/quick-info/CharacterQuickInfo.vue";

  export default {
    name: "CharacterDetails",
    components: {CharacterQuickInfo, CharacterSheetHeader},
    data() {
      return {
        character: null,
        loading: false,
      }
    },
    computed: {
      backgroundImageURL() {
        if (this.character.class.background_image) {
          return `${HelperService.getApiUrl()}/files/${
            this.character.class.background_image.file_location
          }/${this.character.class.background_image.filename}`;
        }

        return "";
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
      },
      updateCharacter(newCharacter) {
        this.character = newCharacter;
      }
    }
  }
</script>

<style>
.character-sheet-body * {
  font-family: "Roboto Condensed", sans-serif !important;
  letter-spacing: -0.04rem;
}
</style>