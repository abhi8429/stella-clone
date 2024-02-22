<template>
  <div></div>
</template>

<script>
import {httpMixin} from "@/mixin/http-mixin";
import {mapActions, mapGetters} from "vuex";
import {geDecodedToken} from "@/common/http-common";
import {ACCESS_TOKEN} from "@/properties/close-friend";
import {SERVICE_CONTENT, SERVICE_IDENTIY, SERVICE_SUBSCRIPTION} from "@/properties/micro-service";

export default {
  name: "CustomerRouter",
  mixins: [httpMixin],
  created() {
    this.routeCustomer();
  },
  methods: {
    ...mapGetters(['getUser', 'getInvitee', 'getInfluencerPlatformId', 'getRedirectTo']),
    ...mapActions(['setUser', 'setInvitee', 'setRedirectTo']),
    routeCustomer() {
      let customerId = geDecodedToken(ACCESS_TOKEN).id;
      let url = `${SERVICE_IDENTIY}/api/v1/customers/${customerId}`;
      this.getData(url, (customer) => {
        this.setUser(customer);
        if (this.$route.params.urlPrefix) {
          let invitee = this.$route.params.urlPrefix;
          this.getUnSecureData(`${SERVICE_IDENTIY}/api/v1/influencers/urlSuffix/${invitee}`, (influencer) => {
            this.getData(`${SERVICE_SUBSCRIPTION}/api/v1/customers/${this.getUser().id}/subscriptions/influencer-platform/${this.getInfluencerPlatformId()}/active`, (activeSub) => {
              if (activeSub) {
                //Got to bonus
                this.routeToBonus(customerId);
              } else {
                this.setInvitee(influencer);
                this.$router.push({name: 'Subscription'});
              }
            });
          });

        } else {
          this.routeToBonus(customerId);
        }
      });
    },
    routeToBonus(customerId) {
      let redirectTo = this.getRedirectTo();
      if (redirectTo) {
        this.setRedirectTo(null);
        this.$router.push({name: 'CustomerDirectMessage', params: {customerId: redirectTo.chatMessage}});
      } else {
        let url = `${SERVICE_CONTENT}/api/v1/customers/${customerId}/content/available`;
        this.getData(url, (contentAvailable) => {
          //If there are customer content, then show them
          console.log('AVAILABLE', contentAvailable);
          if (contentAvailable) {
            this.$router.replace({name: 'CustomerBonusContentList'});
          } else {
            this.$router.replace({name: 'CustomerDashboardMobile'});
          }
        });
      }


    },
    isCustomRequest() {
      let path = this.$route.redirectedFrom;
    }
  }
}
</script>

<style scoped>

</style>
