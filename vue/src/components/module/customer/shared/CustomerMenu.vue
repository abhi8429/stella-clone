<template>
  <aside class="menu-bg" :class="showSlideBar ? 'offcanvas offcanvas-right show' : 'offcanvas offcanvas-right '" id="side_bar">
      <div class="text-right py-4 mx-2">
        <img src="@/assets/images/stella/logo-stella-white.png" class="img-fluid"
               style="margin-right: 100px;display: inline;pointer-events: none;width: 140px;">
        <img class="btn-close" src="@/assets/images/stella/close.png" @click="$emit('menuClicked')">
      </div>
    <nav class="row mt-2 me-2 ms-3">

      <router-link class="col-12 d-flex align-items-center justify-content-between menu-item"
                   :to="{ name: 'CustomerDirectMessage'}">
        <div class="d-flex align-items-center" >
          <div><img class="img-fluid menu-list-icon" src="@/assets/images/stella/custom-req.png"></div>
          <div class="text-white ms-3">Message</div>
        </div>
        <div :class="isAnimate? 'new-shake': 'new-no-shake'" >
          New
        </div>
        <div>
          <img class="img-fluid menu-list-icon" src="@/assets/images/stella/arrow-simple-right.png">
        </div>
      </router-link>

      <router-link class="col-12 d-flex align-items-center justify-content-between menu-item" :to="{ name: 'CustomerCustomRequestList'}" replace>
        <div class="d-flex align-items-center" >
          <div><img class="img-fluid menu-list-icon" src="@/assets/images/stella/star.png"></div>
          <div class="text-white ms-3">Custom Requests</div>
        </div>
        <div class="d-flex flex-row justify-content-around">
<!--        <div v-if="pendingCustomRequests > 0"-->
<!--           class="btn btn-sm bg-success-light rounded-pill text-success font-size-14 text-center text-uppercase me-3 px-3">&ndash;&gt;-->
<!--        {{pendingCustomRequests}} Pending Custom Requests-->
<!--        </div>-->

          <img class="img-fluid menu-list-icon" src="@/assets/images/stella/arrow-simple-right.png">
        </div>
      </router-link>

      <router-link class="col-12 d-flex align-items-center justify-content-between menu-item" :to="{ name: 'CustomerBonusContentList'}" replace>
          <div class="d-flex align-items-center" >
            <div><img class="img-fluid menu-list-icon" src="@/assets/images/stella/bonus-content-menu.png"></div>
            <div class="text-white ms-3">Bonus Content</div>
          </div>
          <div>
            <img class="img-fluid menu-list-icon" src="@/assets/images/stella/arrow-simple-right.png">
          </div>
      </router-link>

      <router-link class="col-12 d-flex align-items-center justify-content-between menu-item" :to="{ name: 'CustomerDashboardMobile'}" replace>
          <div class="d-flex align-items-center" >
            <div><img class="img-fluid menu-list-icon" src="@/assets/images/stella/payment-menu.png"></div>
            <div class="text-white ms-3">Subscriptions</div>
          </div>
          <div>
            <img class="img-fluid menu-list-icon" src="@/assets/images/stella/arrow-simple-right.png">
          </div>
      </router-link>


      <router-link class="col-12 d-flex align-items-center justify-content-between menu-item" :to="{ name: 'CustomerRecentTransaction'}" replace>
          <div class="d-flex align-items-center" >
            <div><img class="img-fluid menu-list-icon" src="@/assets/images/stella/recent-trans.png"></div>
            <div class="text-white ms-3">Recent Transactions</div>
          </div>
          <div>
            <img class="img-fluid menu-list-icon" src="@/assets/images/stella/arrow-simple-right.png">
          </div>
      </router-link>

      <router-link class="col-12 d-flex align-items-center justify-content-between menu-item" :to="{ name: 'PaymentOption'}" replace>
          <div class="d-flex align-items-center" >
            <div><img class="img-fluid menu-list-icon" src="@/assets/images/stella/payment-menu.png"></div>
            <div class="text-white ms-3">Payment Options</div>
          </div>
          <div>
            <img class="img-fluid menu-list-icon" src="@/assets/images/stella/arrow-simple-right.png">
          </div>
      </router-link>

      <router-link class="col-12 d-flex align-items-center justify-content-between menu-item" :to="{ name: 'CustomerSettings'}" replace>
          <div class="d-flex align-items-center" >
            <div><img class="img-fluid menu-list-icon" src="@/assets/images/stella/account-settings.png"></div>
            <div class="text-white ms-3">Account Settings</div>
          </div>
          <div>
            <img class="img-fluid menu-list-icon" src="@/assets/images/stella/arrow-simple-right.png">
          </div>
      </router-link>

      <router-link class="col-12 d-flex align-items-center justify-content-between menu-item" :to="{ name: 'HelpMobile'}" replace>
          <div class="d-flex align-items-center" >
            <div><img class="img-fluid menu-list-icon" src="@/assets/images/stella/info.png"></div>
            <div class="text-white ms-3">Help</div>
          </div>
          <div>
            <img class="img-fluid menu-list-icon" src="@/assets/images/stella/arrow-simple-right.png">
          </div>
      </router-link>

      <logout-menu></logout-menu>

      <div class="py-5 invisible"></div>
    </nav>
  </aside>
</template>

<script>
import LogoutMenu from "@/components/module/shared/LogoutMenu";
import {mapGetters} from "vuex";
// import pendingCustomRequests from "@/components/module/customer/shared/PendingCustomRequests";

export default {
  props: ['showSlideBar'],
  name: "CustomerMenu",
  components: {LogoutMenu},
  computed: {
    ...mapGetters(['getUser']),
  },
  data() {
    return {
      isAnimate: true,
      pollInterval: null,
    }
  },
  created() {
    this.pollInterval = setInterval(() => {
      this.animate();
    }, 1000)
  },
  destroyed() {
    clearInterval(this.pollInterval);
  },
  methods: {
    animate() {
      this.isAnimate = !this.isAnimate;
    },
  }
}
</script>

<style scoped>
.new-shake {
  background: #55EFC4;
  padding: 2px 7px;
  font-size: 12px;
  color: #000;
  border-radius: 4px;
  animation:  shake 0.8s
}

.new-no-shake {
  background: #55EFC4;
  padding: 2px 7px;
  font-size: 12px;
  color: #000;
  border-radius: 4px;
}
@keyframes shake{
  0%{
    transform: translateX(0)
  }
  25%{
    transform: translateX(25px);
  }

  50%{
    transform: translateX(-25px);
  }
  100%{
    transform: translateX(0px);
  }
}


</style>


