<template>
  <button @click="logout()" type="button"
          class="btn rounded-pill my-1 my-md-0 btn-outline-dark-grey text-white btn-lg w-100 d-flex justify-content-center align-items-center">
    <img src="@/assets/images/logout.svg" style=" filter: invert(1);" class="me-1" width="20">Logout
  </button>
</template>

<script>
import {mapActions} from 'vuex'
import {cleanUpAfterLogout} from "@/common/login-service";

export default {
  name: "LogoutButton",
  methods: {
    ...mapActions(['setInvitee']),
    logout() {
      this.setInvitee(null);
      cleanUpAfterLogout();
      this.$router.replace({name: 'HomePage'});
      // this.$router.replace({name: 'LoginMobile'});
    },
  }
}
</script>

<style scoped>

</style>
