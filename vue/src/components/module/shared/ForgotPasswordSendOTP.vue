<template>
  <div id="sendOTP" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="sendOTP" style="display: none;"
       aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content stella-modal">
        <div class="modal-body p-2 m-2">

          <img class="img-fluid float-end d-block zoom-12" data-dismiss="modal" src="@/assets/images/stella/close.png">

          <div class="my-5 py-4 text-center d-md-none d-block" >
            <img class="img-fluid hero-img" src="@/assets/images/stella/reset-password.png">
          </div>



          <div class="text-white font-size-24 font-family-poppins mt-4">Forgot Password?</div>

          <div class="text-grey font-size-16 mt-4">Don't worry! Please enter your email associated with your account.
          </div>

          <div class="py-3 w-100 invisible"></div>

          <model-global-message
            :global-errors="globalErrors"
            :message="message"
            @clearMessages="clearMessages()"/>

          <div class="form-group mt-3">
            <label class="mb-2 font-dark-grey font-size-16">Your Email</label>
              <span class="danger ml-2" v-if="isRequired('email')">This is required field</span>
              <span class="danger ml-2" v-if="isValidEmail()">Not a valid email address</span>
            </label>
            <div class="input-group flex-nowrap stella-group">

            <input id="email" type="email"
                   autocomplete="false"
                   placeholder="example@mail.com"
                   class="form-control stella-group border border-white"
                   style="color: #212529 !important;"
                   name="email"
                   v-model="changePassword.email">
            </div>
          </div>

          <div class="py-3 w-100 invisible"></div>

          <div class="d-flex justify-content-center py-2">
            <button type="button"
                    class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                    @click="sendOTP()">Send OTP
            </button>
          </div>

          <div class="py-3 w-100 invisible"></div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {SERVICE_IDENTIY} from "@/properties/micro-service";
import {forgotPasswordMixin} from "@/mixin/forgot-password-mixin";
import ModelGlobalMessage from "@/components/module/shared/ModelGlobalMessage";
import {required, email} from "vuelidate/lib/validators";

export default {
  name: "ForgotPasswordSendOTP",
  mixins: [forgotPasswordMixin],
  components: {ModelGlobalMessage},
  date() {
    return {}
  },
  validations: {
    changePassword: {
      email: {required, email},
    }
  },
  /*
   changePassword: {
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        otp: null,
        email: null
      }
  * */

  methods: {
    show() {
      $('#sendOTP').modal();
      this.changePassword = {};
    },
    hide() {
      $('#sendOTP').modal('hide');
    },
    isValidEmail() {
      return this.isLoading && !this.$v.changePassword.email.email;
    },
    sendOTP() {

      this.isLoading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let url = `${SERVICE_IDENTIY}/api/v1/password/otp/send`;
      this.postUnsecuredData(url, this.changePassword, (data) => {
        this.hide();
        this.$emit("otpSent", this.changePassword);
      });

    }
  }
}
</script>

<style scoped>

</style>
