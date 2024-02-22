<template>

  <a class="col-12 d-flex align-items-center justify-content-between menu-item" @click="logout()">
      <div class="d-flex align-items-center" >
        <div><img class="img-fluid menu-list-icon zoom-8" src="@/assets/images/stella/logout-menu.png"></div>
        <div class="text-white ms-3">Logout</div>
      </div>
      <div>
        <img class="img-fluid" src="@/assets/images/stella/arrow-simple-right.png">
      </div>
  </a>
</template>

<script>
import {cleanUpAfterLogout} from "@/common/login-service";
import {mapActions} from 'vuex';

export default {
  name: "LogoutMenu",

  methods: {
    ...mapActions(['setInvitee']),
    logout() {
      this.setInvitee(null);
      cleanUpAfterLogout();
      this.$router.replace({name: 'HomePage'});
    }
  }
}
</script>

<style scoped>

</style>
