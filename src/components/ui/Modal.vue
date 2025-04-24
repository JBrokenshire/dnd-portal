<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-xs"
    >
      <div
        aria-modal="true"
        class="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
        role="dialog"
      >
        <div class="flex-between flex-row-reverse w-full absolute top-0 left-0 px-6 py-3">
          <button
            v-if="showClose"
            class="transition-all px-2 aspect-square rounded text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
            @click="$emit('close')"
          >
            <div class="sr-only">Close</div>
            ✕
          </button>
          <div
            v-if="title"
            class="text-lg font-bold flex-grow"
          >
            {{ title }}
          </div>
        </div>

        <div class="mt-8">
          <slot />

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Modal",
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: "",
      },
      showClose: {
        type: Boolean,
        default: true,
      }
    },
  };
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
