<template>
  <span style="color: red">{{ requiredMessage }}</span>
</template>

<script>
import {getMessage} from "@/common/message-service";

export default {
  name: "InvalidEmailField",
  computed: {
    requiredMessage () {
      return getMessage('INVALID.EMAIL.FIELD');
    }
  }
}
</script>

<style scoped>

</style>
