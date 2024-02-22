<template>
  <div class="col-sm-12 border-bottom">
    <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>
    <InfluencerMenu @menuClicked="slideBar()" :show-slide-bar="showSlideBar" />
    <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>
  </div>
</template>

<script>

import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";

export default {
  name: "InfluencerMessageHeader",
  props: ['isLoading'],
  components: {
    InfluencerMenu,
    HeaderMenu},
  data() {
    return {
      showSlideBar: false
    }
  },
  methods: {
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    },
  }
}
</script>

<style scoped>

</style>
