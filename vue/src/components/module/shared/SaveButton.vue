<template>
  <button type="button"
      :class="isDigis?'digis-btn-class text-white mt-1':'text-dark dark-disable-button mt-1'"
          @click="$emit('saved')">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: {
      default: 'Next Step'
    },
  },
  name: "SaveButton"

}
</script>

<style scoped>

</style>
