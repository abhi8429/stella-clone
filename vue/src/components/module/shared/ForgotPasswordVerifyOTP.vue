<template>
  <div id="verifyOTP" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="verifyOTP" style="display: none;"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-body  p-4 m-4">
          <div class="justify-content-center d-flex">
            <img src="@/assets/images/help-mail.svg" 
            style="filter:grayscale(1)">
          </div>
          <h4 class="font-size-24 font-weight-bold text-center mt-4">Verify Your Identity</h4>
          <div class="text-left">
            <model-global-message
              :global-errors="globalErrors"
              :message="message"
              @clearMessages="clearMessages()"/>
          </div>
<!--          <p class="pt-1 pb-2 font-size-12 text-center">We have sent email with your code to <span class="success">example@gmail.com</span>
            .</p>-->
          <div class="form-group mt-3">
            <span class="danger ml-2" v-if="isRequired('otp')">This is required field</span>
            <input id="otp"
                   type="number"
                   autocomplete="false"
                   placeholder="Enter verification code"
                   class="form-control stella-group" name="otp"
                   v-model="changePassword.otp">
          </div>
          <div class="d-block text-center py-1">
            <button type="button"
                    class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                    @click="verifyOTP()">Continue
            </button>
            <p class="mt-3">Didn't receive an email? <a class="success" href="#" @click="resendOTP()">Resend</a></p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {SERVICE_IDENTIY} from "@/properties/micro-service";
import {forgotPasswordMixin} from "@/mixin/forgot-password-mixin";
import ModelGlobalMessage from "@/components/module/shared/ModelGlobalMessage";
import {required} from "vuelidate/lib/validators";

export default {
  name: "ForgotPasswordVerifyOTP",
  mixins: [forgotPasswordMixin],
  components: {ModelGlobalMessage},
  data() {
    return {}
  },
  validations: {
    changePassword: {
      otp: {required},
    }
  },
  methods: {
    show(changePassword) {
      this.changePassword = changePassword;
      $('#verifyOTP').modal();
      this.message = "We have sent the OTP to your email";
    },
    hide() {
      $('#verifyOTP').modal('hide');
    },
    verifyOTP() {
      this.isLoading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let url = `${SERVICE_IDENTIY}/api/v1/password/otp/verify`;
      this.postUnsecuredData(url, this.changePassword, (data) => {
        this.hide();
        this.$emit("otpVerified", this.changePassword);
      });
    },
    resendOTP() {

      let url = `${SERVICE_IDENTIY}/api/v1/password/otp/send`;
      this.postUnsecuredData(url, this.changePassword, (data) => {
        this.message = "OTP has been resent to your email";
        /*   this.hide();
           this.$emit("otpVerified", this.changePassword);*/
      });
    }

  }
}
</script>

<style scoped>

</style>
