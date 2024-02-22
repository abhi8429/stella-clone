<template>
  <button type="button" class="btn btn-outline-secondary mt-1"
          :style="isDigis?'color:#000; border: 2px solid #000; font-weight:700':'color: #fff; border: 2px solid #626262'"
  @click="$emit('cancel')">{{text}}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      default: 'Back'
    },
  },
  name: "CancelButton"
}
</script>

<style scoped>

</style>
