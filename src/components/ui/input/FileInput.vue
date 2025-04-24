<template>
  <div>
    <input
      :class="state === false ? 'border-danger' : 'border-gray-light'"
      accept="image/*"
      class="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm"
      type="file"
      @change="onFileChange"
    >
    <span
      class="text-gray font-medium"
    >
      {{ fileName }}
    </span>
    <p
      v-if="state === false"
      class="mt-1 text-sm text-danger"
    >
      Invalid file. Please upload a valid image.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'FileInput',
    props: {
      value: File,
      placeholder: {
        type: String,
        default: 'Select file'
      },
      state: {
        type: Boolean,
        default: null
      }
    },
    computed: {
      fileName() {
        return this.value ? this.value.name : '';
      }
    },
    methods: {
      onFileChange(event) {
        const file = event.target.files[0];
        this.$emit('input', file);
      }
    }
  };
</script>
