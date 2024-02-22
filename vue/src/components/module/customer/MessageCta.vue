<template>
  <div>

    <header-help :is-loading="isLoading"></header-help>
    <section class="closefriend-hero background-white margin-padding-class">
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2">
            <div class="row justify-content-center">
              <div class="col-md-6 col-12 px-1">
                <h4 class="font-weight-400 py-3 border-bottom border-dark text-white font-size-14 margin-left-class">Send {{invitee.name}} a Message!</h4>
                <global-message></global-message>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 mb-md-2">
            <div class="row justify-content-center mx-md-0 mx-1">
              <div class="col-md-8 col-12 px-1">
                <span class="text-white font-size-12 font-weight-300">Start chatting with your favorite creator.</span>
                <button type="button" @click="goToMessage()"
                        class=" mt-3 font-size-16 font-weight-500 gradient-a" style="width: 100%; padding: 5px;border-radius: 8px;color: #000;border: 1px solid #000">
                  Send a Message
                </button>
              </div>
              <div class="col-md-8 col-12 px-1">
                <button type="button" @click="skip()"
                        class="mt-3 btn btn-outline-secondary py-1 font-size-15-18" style="width: 100%; border-radius: 8px;padding:8px">
                  Skip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import {httpMixin} from "@/mixin/http-mixin";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {SERVICE_CONTENT, SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import {required} from "vuelidate/lib/validators";

export default {
  name: 'messageCta',
  mixins: [httpMixin],
  components: {GlobalMessage, LoadingModal, HeaderHelp},
  data() {
    return {
      invitee: {},
    }
  },
  validations: {
    tip: {
      amount: {required}
    }
  },
  created() {
    this.invitee = this.getInvitee();
    if (this.$route.query.saved) {
      this.setMessage('SAVED.SUCCESSFULLY');
    }
  },
  methods: {
    ...mapGetters(['getUser', 'getInvitee']),
    ...mapActions(['setMessage']),
    goToMessage() {
      this.$router.push({name: 'CustomerDirectMessage', params: {customerId: this.invitee.id}});
    },
    skip() {
      let url = `${SERVICE_CONTENT}/api/v1/customers/${this.getUser().id}/content/available`;
      this.getData(url, (contentAvailable) => {
        //Check if their are contents, if yes, then show contents
        if (contentAvailable) {
          this.$router.replace({name: 'CustomerBonusContentList'});
        } else {
          this.$router.replace({name: 'CustomerDashboardMobile'});
        }
      });
    },
  }
}
;
</script>

<style scoped>
@media only screen and (max-width: 767px)
{
  .margin-padding-class{
    margin-top: 10rem;
  }
  .margin-left-class{
    margin-left: 12px;
  }
}
@media only screen and (min-width:768px) {

  .margin-padding-class{
    margin-top: 12rem;
  }

}
</style>
