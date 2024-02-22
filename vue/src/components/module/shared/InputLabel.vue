<template>
  <label for="name" class="font-size-12" :class="isDigis?'text-dark font-weight-500':'label-color'">{{text}}
  </label>
</template>

<script>
export default {
  props:['text'],
  name: "InputLabel"
}

</script>

<style scoped>

</style>
