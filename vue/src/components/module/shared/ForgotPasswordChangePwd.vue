<template>
  <div id="changePass" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="changePass"
       style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content closefriend-modal">
        <div class="modal-body  p-4 m-4">

          <h4 class="font-size-24 font-weight-bold   mt-4">Set New Password</h4>
          <model-global-message
            :global-errors="globalErrors"
            :message="message"
            @clearMessages="clearMessages()"/>
          <p class="pt-1 pb-2 font-size-12 ">for <span class="success">{{changePassword.email}}</span> .</p>
          <div class="form-group">
            <div class="d-block">
              <label for="password" class="font-grey">Password
                <span class="danger ml-2" v-if="isRequired('newPassword')">This is required field</span>
              </label>
            </div>
            <div class="input-group">
              <input id="password"
                     autocomplete="false"
                     placeholder="Password"
                     type="password"
                     class="form-control stella-group"
                     name="password"
                     v-model="changePassword.newPassword">
              <div class="input-group-prepend">
                        <span class="input-group-text eye" id="basic-addon1" @click="showPassword('password')">
                            <i id="show_id1" class="fa fa-eye"></i>
                            <i id="hide_id1" class="fa fa-eye-slash d-none"></i>
                        </span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="d-block">
              <label for="password" class="font-grey">Confirm Password
                <span class="danger ml-2" v-if="isRequired('confirmPassword')">This is required field</span>
              </label>
            </div>
            <div class="input-group">
              <input id="confirm_password"
                     autocomplete="false"
                     placeholder="Confirm password"
                     type="password"
                     class="form-control stella-group"
                     name="conformPassword"
                     v-model="changePassword.confirmPassword">
              <div class="input-group-prepend">
                        <span class="input-group-text eye" id="basic-addon2" @click="showPassword('confirm_password')">
                            <i id="show_id2" class="fa fa-eye"></i>
                            <i id="hide_id2" class="fa fa-eye-slash d-none"></i>
                        </span>
              </div>
            </div>
          </div>
          <div class="d-block text-center py-1">
            <button type="button"
                    class="btn stella-btn gradient-a w-100 text-dark rounded-pill"
                    @click="setPassword()">Set Password
            </button>
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
import {showPassword} from '@/common/Utils'
import {required} from "vuelidate/lib/validators";

export default {
  name: "ForgotPasswordChangePwd",
  mixins: [forgotPasswordMixin],
  components: {ModelGlobalMessage},
  data() {
    return {}
  },
  validations: {
    changePassword: {
      newPassword: {required},
      confirmPassword: {required}
    }
  },
  methods: {
    showPassword,
    show(changePassword) {
      this.changePassword = changePassword;
      $('#changePass').modal();
    },
    hide() {
      console.log('changePassword', this.changePassword);
      $('#changePass').modal('hide');
    },
    setPassword() {
      this.isLoading = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let url = `${SERVICE_IDENTIY}/api/v1/password/change`;
      this.postUnsecuredData(url, this.changePassword, (data) => {
        this.message = 'Saved.Successfully';
        setTimeout(() => {
          this.hide();
        }, 2000);
      });
    },
  }
}
</script>

<style scoped>

</style>
