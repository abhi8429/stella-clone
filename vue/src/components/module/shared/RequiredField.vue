<template>
  <span class="danger">{{ requiredMessage }}</span>
</template>

<script>
import {getMessage} from "@/common/message-service";

export default {
  name: "RequiredField",
  computed: {
    requiredMessage () {
      return getMessage('REQUIRED.FIELD');
    }
  }
}
</script>

<style scoped>

</style>
