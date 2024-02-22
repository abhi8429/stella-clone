<template>
  <div class="container-fluid hv-100">
    <div class="row  p-md-4 pb-md-0 h-100">

      <div class="col-lg-4 col-12 mx-auto">
<!--        <div class="text-center small-device-img-class">-->
<!--          <img class="img-fluid " src="@/assets/images/stella/logo-stella-white.png">-->
<!--        </div>-->
      <logo></logo>

        <div :class="isDigis?'text-dark text-center font-size-16 font-family-poppins mt-5 new-padding-class':'text-white text-center font-size-16 font-family-poppins mt-5 new-padding-class'">
          <span :class="isDigis?'text-dark font-weight-500':'text-white'">What do you want to charge for private messages?</span>
        </div>

        <div :class="isDigis?'text-center text-dark font-size-12 font-family-poppins mt-1 new-padding-class2':'text-center text-white font-size-12 font-family-poppins mt-1 new-padding-class2'">
          <span :class="isDigis?'text-dark font-size-12 font-weight-500':'text-white font-size-12'">Set the price for each message your subscribers send you,
            as well as how much it costs to unlock bonus content that you message back to them.
          </span>
        </div>


        <div class="col-sm-12 d-md-flex flex-column justify-content-between mt-5">
          <global-message/>
          <div class="d-flex flex-column justify-content-between mb-3">
            <span :class="isDigis?'text-dark font-size-12 mb-1 font-weight-500':'text-white-50 font-size-12 mb-1 font-weight-500'">Price per message</span>
            <required-field v-if="isSubmitted && !$v.chatSetting.pricePerMessage.required"/>
            <input type="number" placeholder="Enter an amount in $" :class="isDigis?'private-input-class-digis font-weight-500 dark-placeholder':'private-input-class font-weight-500'"
                   v-model="chatSetting.pricePerMessage">
          </div>

          <div class="d-flex flex-column justify-content-between">
            <span :class="isDigis?'text-dark font-size-12 mb-1 font-weight-500':'text-white font-size-12 mb-1 font-weight-500'">Bonus content unlock price</span>
            <required-field v-if="isSubmitted && !$v.chatSetting.pricePerFile.required"/>
            <input type="number" placeholder="Enter an amount in $" :class="isDigis?'private-input-class-digis placeholder-dark font-weight-500':'private-input-class  font-weight-500'"
                   v-model="chatSetting.pricePerFile">
          </div>
        </div>

      </div>
      <div class="col-lg-8  button-media-query d-flex flex-row justify-content-between pt-2">

<!--        <button type="button" class="btn btn-outline-secondary" style="color: #fff; border: 2px solid #626262">Cancel-->
<!--        </button>-->
        <cancel-button @cancel="$router.back()"></cancel-button>
        <!--          <button  type="button" class="gradient-new-class text-dark" disabled>Next Step</button>-->
<!--        <button type="button" class="text-dark dark-disable-button"-->
<!--                @click="save()">Next Step-->
<!--        </button>-->
      <save-button @saved="save()"></save-button>
      </div>
    </div>

  </div>
</template>
<script>

import {httpMixin} from "@/mixin/http-mixin";
import {required} from "vuelidate/lib/validators";
import RequiredField from "@/components/module/shared/RequiredField";
import {mapActions, mapGetters} from "vuex";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {SERVICE_DIRECT_MESSAGE} from "@/properties/micro-service";
import Logo from "@/components/module/shared/Logo";
import CancelButton from "@/components/module/shared/CancelButton";
import SaveButton from "@/components/module/shared/SaveButton";

export default {
  name: 'PrivateMessageCharge',
  components: {SaveButton, CancelButton, Logo, GlobalMessage, RequiredField},
  title: 'Message charge',
  mixins: [httpMixin],
  data() {
    return {
      chatSetting: {messageChargeRequired: true},
      isSubmitted: false,
    }
  },
  validations() {
    return {
      chatSetting: {
        pricePerMessage: {required},
        pricePerFile: {required}
      }
    }
  },
  created() {
    this.getChatSetting()
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setMessage']),
    getChatSetting() {
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/message-settings/influencers/${this.getUser().id}`;
      this.getData(url, (chatSetting) => {
        if (chatSetting) {
          this.chatSetting = chatSetting;
        }
      });
    },
    save() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.chatSetting.influencerId = this.getUser().id;
      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/message-settings/influencers/${this.getUser().id}`;
      this.putData(url, this.chatSetting, (chatSetting) => {
        // this.setMessage('SAVED.SUCCESSFULLY');
        this.$router.replace({name: 'CreatorDone'});
      });
    },
  }
}
</script>


<style scoped>
/*for small mobile device under with 375px*/

@media only screen and (max-width: 378px) {

  .small-device-img-class {
    margin-top: 7rem;
  }

  .new-padding-class {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .new-padding-class2 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

}

@media only screen and (min-width: 380px) {

  .small-device-img-class {
    margin-top: 7rem;
  }

  .new-padding-class2 {
    padding-left: 2rem;
    padding-right: 2rem;
  }


}

@media only screen and (min-width: 380px) and (max-width: 568px) {

  .small-device-img-class {
    margin-top: 7rem;
  }

  .new-padding-class {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .new-padding-class2 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

}


@media only screen and (max-width: 768px) {

  .button-media-query {
    position: fixed;
    bottom: 0.8rem;
    left: 0%;
    right: 0%;
    border-top: 2px solid #1f1f1f;
  }

  .new-padding-class {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .new-padding-class2 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

}


@media only screen and (min-width: 769px) and (max-width: 1023px) {
  .button-media-query {
    position: fixed;
    bottom: 0.8rem;
    left: 0%;
    right: 0%;
    border-top: 2px solid #1f1f1f;
  }

  .new-padding-class {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .new-padding-class2 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

}

@media only screen  and (min-width: 1024px) {
  .button-media-query {
    position: fixed;
    bottom: 0.8rem;
    left: 17%;
    right: 17%;
    border-top: 2px solid #1f1f1f;
  }

  .new-padding-class {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .new-padding-class2 {
    padding-left: 2rem;
    padding-right: 2rem;
  }

}
</style>
