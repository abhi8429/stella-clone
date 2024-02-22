<template>
  <header class="sticky">
    <nav class="navbar navbar-expand-lg navbar-light" >
      <div class="navbar-container">
        <router-link class="navbar-brand" :to="{name: 'HomePage'}" replace>
          <img src="@/assets/images/stella/logo-stella-white.png" class="img-fluid"
               style="margin-right: 100px; display: inline; pointer-events: none;">
        </router-link>
        <span class="closefriend-header-top-btn-wrapper hamburger">
<!--                    <span class="side-menu notification rounded-circle">5</span>-->
                    <span class="hamburger-menu" data-trigger="here">
                        <img class="btn-close" v-if="isClose"
                             style="object-fit:cover;"
                             src="@/assets/images/stella/close.png" @click="$emit('close')">
                        <img src="@/assets/images/stella/dash-menu.png" v-else
                             @click="$emit('slideMenu')">
                    </span>
                </span>
      </div>
    </nav>
    <loading-modal :is-loading="isLoading"></loading-modal>
  </header>
</template>

<script>

import LoadingModal from "@/components/module/shared/LoadingModal";

export default {
  name: "HeaderMenu",
  props: ['isLoading','isClose'],
  components: {LoadingModal}
}
</script>

<style scoped>

</style>
