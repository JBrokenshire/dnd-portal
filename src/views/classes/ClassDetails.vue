<template>
  <div>
    <router-link
      :to="{name: 'classes'}"
      class="flex items-center gap-2 text-lg mb-4 nav-link"
    >
      <feather-icon
        icon="ChevronLeftIcon"
        size="32"
      />
      Back to Classes
    </router-link>

    <div v-if="classType">
      <div class="flex flex-col lg:flex-row-reverse gap-4">
        <div class="flex-grow sm:min-w-1/2 lg:min-w-1/4">
          <card
            class="flex flex-col gap-4"
            title="Actions"
          >
            <c-button
              :disabled="loading"
              variant="primary"
              @click="showUpdateModal = true"
            >
              Update
            </c-button>
            <c-button
              :disabled="loading"
              variant="danger"
              @click="showDeleteModal = true"
            >
              Delete
            </c-button>
          </card>
        </div>
        <card
          :title="`${classType.name} Details`"
          class="mb-4 flex-grow"
        >
          <div class="flex-between gap-4">
            <div class="flex-grow self-start">
              <div class="mb-4 description">{{ classType.short_description }}</div>
              <div class="text-sm sm:text-lg">
                <div class="flex gap-4">
                  <div class="font-bold flex-grow md:max-w-1/3 lg:max-w-1/4">Hit Die:</div>
                  <div>D{{ classType.hit_point_die_value }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold flex-grow md:max-w-1/3 lg:max-w-1/4">Saves:</div>
                  <div>{{ classType.saves.join(" & ") }}</div>
                </div>
                <div class="flex gap-4">
                  <div class="font-bold flex-grow md:max-w-1/3 lg:max-w-1/4">Primary Ability:</div>
                  <div>{{ classType.primary_ability }}</div>
                </div>
              </div>
            </div>
            <img
              :alt="`${classType.name} Logo`"
              :src="logoURL"
              class="hidden md:block w-full max-w-[100px] lg:max-w-[150px] xl:max-w-[200px] rounded-lg aspect-square object-cover"
            >
          </div>
        </card>

      </div>
    </div>

    <modal
      id="modal-update-class"
      :visible="showUpdateModal"
      size="md"
      title="Update Class"
      @close="closeModals"
    >
      <edit-class-modal
        :existing="classType"
        @close="closeModals"
        @update="updateClass"
      />
    </modal>

    <modal
      id="modal-delete-class"
      :show-close="false"
      :visible="showDeleteModal"
      size="sm"
      title="Delete Class"
    >
      <delete-modal
        type="class"
        @close="closeModals"
        @delete="deleteClass"
      />
    </modal>
  </div>
</template>

<script>
  import Card from "@/components/ui/Card.vue";
  import Modal from "@/components/ui/Modal.vue";
  import ClassService from "@/services/ClassService";
  import HelperService from "@/services/HelperService";
  import CButton from "@/components/ui/CustomButton.vue";
  import DeleteModal from "@/components/modals/DeleteModal.vue";
  import EditClassModal from "@/views/classes/sections/EditClassModal.vue";

  export default {
    name: "ClassDetails",
    components: {EditClassModal, DeleteModal, Modal, CButton, Card},
    data() {
      return {
        classType: null,
        loading: false,
        showUpdateModal: false,
        showDeleteModal: false,
      }
    },
    computed: {
      logoURL() {
        if (this.classType.logo) {
          return `${HelperService.getApiUrl()}/files/${
            this.classType.logo.file_location
          }/${this.classType.logo.filename}`;
        }

        return "";
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
          this.classType.saves = JSON.parse(this.classType.saves);
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
      },
      async updateClass(updatedClass) {
        this.loading = true;
        try {
          const dto = {
            name: updatedClass.name,
            saves: JSON.stringify(updatedClass.saves),
            short_description: updatedClass.short_description,
            primary_ability: updatedClass.primary_ability,
            hit_point_die_value: updatedClass.hit_point_die_value,
          }

          const res = await ClassService.update(this.classType.id, dto)
          this.classType = res.data;
          this.classType.saves = JSON.parse(this.classType.saves);

          HelperService.successToast(this.$toast, "Class updated successfully")
          this.closeModals()
        } catch (err) {
          const res = err.response;
          let errorText = "Could not update class, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      async deleteClass() {
        this.loading = true;
        try {
          await ClassService.delete(this.classType.id);

          HelperService.successToast(this.$toast, "Class deleted successfully")
          await this.$router.push({name: "classes"})
        } catch (err) {
          const res = err.response;
          let errorText = "Could not delete class, please refresh and try again";

          if (res && res.data.error) {
            errorText = res.data.error;
          }

          HelperService.errorToast(this.$toast, err, errorText)
        } finally {
          this.loading = false;
        }
      },
      closeModals() {
        this.showUpdateModal = false;
        this.showDeleteModal = false;
      },
    }
  }
</script>

<style scoped>

</style>