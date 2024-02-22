<template>
  <span style="color: red">{{ requiredMessage }}</span>
</template>

<script>
import {getMessage} from "@/common/message-service";

export default {
  name: "InvalidIntegerField",
  computed: {
    requiredMessage () {
      return getMessage('INVALID.INTEGER.FIELD');
    }
  }
}
</script>

<style scoped>

</style>
