<template>
  <div id="app" v-if="!$store.state.agentName">
    <router-view :key="$route.fullPath"></router-view>
  </div>
  <div id="app2" v-else>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      enable: false
    }
  },
  created() {
    // this.$router.replace({name: 'Login'});
  }
}
</script>

