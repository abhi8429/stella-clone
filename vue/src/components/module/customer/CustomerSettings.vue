<template>
<section class="container-fluid">
  <div class="row p-md-4 pb-md-0">
    <div class="border-around border-md-1 border-0 p-2">
      <div>

        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


        <Customer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></Customer-menu>
        <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>

        <section class="closefriend-hero background-white">
          <div class="container mt-3">
            <div class="row">

              <div class="col-12 col-sm-12 col-md-12">
                <div class="custom-card">
                  <div class="custom-body">
                    <div class="">
                      <div class="">
                        <div class="row py-3 mx-1">
                          <div class="col-md-3 col-12">
                            <h5 class="ml-4 mt-2 font-size-24 font-weight-bold text-center">Account Settings</h5>
                          </div>
                        </div>
                        <global-message></global-message>
                        <pending-custom-requests/>
                        <div class="row  py-md-3 mx-1 pb-0">
                          <div class="col-md-8 mx-auto col-12 vertical-center justify-content-md-start mt-md-0 mt-3 ">
                            <div class="row px-1 profile-form">
                              <div class="col-12 col-md-6 px-md-1">

                                <div class="form-group">
                                  <label for="">Name<span class="danger">*</span>
                                  </label>
                                  <input type="text" class="form-control stella-group"
                                         placeholder="Example: Adam"
                                         v-model="user.name">
                                  <span class="error invalid-feedback" v-if="isRequired('name')">This is required field</span>
                                </div>
                              </div>

                              <div class="col-12 col-md-12 px-md-1">
                                <div v-for="(customerPlatform, index) in user.customerPlatforms"
                                     :key="index" class="form-group">
                                  <label for="">{{customerPlatform.platform.name}} Handle<span class="danger">*</span>
                                  </label>
                                  <input type="text" class="form-control stella-group"
                                         placeholder="Example: myemail@com"
                                         v-model="handles[index].handle">
                                  <span v-if="isSubmit && !$v.handles.$each[index].handle.required"
                                          class="error invalid-feedback">This is required field</span>
                                </div>
                              </div>

                              <div class="col-12 col-md-12 px-md-1">
                                <div class="form-group">
                                  <label for="">Email<span class="danger">*</span>
                                  </label>
                                  <input type="text" class="form-control stella-group"
                                         placeholder="Example: myemail@com"
                                         v-model="user.email">
                                  <span class="error invalid-feedback" v-if="isRequired('email')">This is required field</span>
                                  <span class="error invalid-feedback" v-if="isValidEmail()">Not a valid email address</span>
                                </div>
                              </div>

                              <div class="col-12 col-md-6 px-md-1">
                                <div class="form-group">
                                  <label for="">Password<span class="danger">*</span>
                                  </label>
                                  <input type="password" class="form-control stella-group full-border"
                                         v-model.lazy="pwd"
                                         placeholder="Update password">
                                  <span v-if="isSubmit && !$v.pwd.required" class="error invalid-feedback">This is required field</span>
                                </div>
                              </div>

                              <div class="col-12 col-md-6 px-md-1">
                                <div class="form-group">
                                  <label for="">Repeat password<span class="danger">*</span>
                                  </label>
                                  <input type="password" class="form-control stella-group full-border"
                                         placeholder="Re-enter new password"
                                         v-model="repeatPassword">
                                  <span v-if="isSubmit && !$v.repeatPassword.required" class="error invalid-feedback">This is required field</span>
                                  <span v-else-if="isSubmit && !$v.repeatPassword.sameAs" class="error invalid-feedback">Passwords must match</span>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        <div class="row py-md-3 pb-3 mx-4">
                          <div class="col-md-2 p-0">
                            <logout-button></logout-button>
                          </div>
                          <div class="col-md-2 p-0 offset-md-8">
                            <button type="button"
                                    class="btn rounded-pill text-dark gradient-a btn-lg w-100"
                                    @click="save()">Save
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</section>
</template>

<script>

import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import {email, required, sameAs} from "vuelidate/lib/validators";
import {BASE_URL} from '@/properties/close-friend';
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import {SERVICE_IDENTIY} from "@/properties/micro-service";
import LogoutButton from "@/components/module/shared/LogoutButton";
import {igValidationMixin} from "@/mixin/ig-validation-mixin";
import PendingCustomRequests from "@/components/module/customer/shared/PendingCustomRequests";
import titleMixin from "../../../mixin/title-mixin";

export default {
  name: 'CustomerSettings',
  title: 'Customer settings',
  mixins: [igValidationMixin, titleMixin],
  components: {HeaderMenu, CustomerMenu,
    GlobalMessage, LogoutButton, PendingCustomRequests},
  data() {
    return {
      user: {},
      handles: [],
      repeatPassword: null,
      showSlideBar: false,
      pwd: null,
      BASE_URL,
      isSubmit: false,
    }
  },
  validations() {
    return {
      user: {
        name: {required},
        email: {required, email},
     /*   password: {required}, this does not seem to work, using local variable pwd instead */
      },
      repeatPassword: {
        required, sameAs: sameAs(function () {
          return this.pwd;
        })
      },
      pwd: {
        required
      },
      handles: {
        required,
        $each: {
          handle: {required}
        }
      }
    }
  },
  created() {
    this.initIGValidity();
    this.user = this.getUser();
   /* this.user.password = '';*/
    this.user.customerPlatforms.forEach((customerPlatform) => {
      this.handles.push({handle: customerPlatform.handle, customerPlatformId: customerPlatform.id});
    });
  },
  methods: {
    isRequired(attrib) {
      return this.isSubmit && !this.$v.user[attrib].required;
    },
    isValidEmail() {
      return this.isSubmit && !this.$v.user.email.email;
    },
    save() {
      this.isSubmit = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log('failed', this.$v);
        return;
      }

      console.log('success');
      this.user.password = this.pwd;
      this.patchData(`${SERVICE_IDENTIY}/api/v1/customers/${this.user.id}`, this.user, (data) => {
        this.user = data;
        this.pwd = null;
        this.repeatPassword = null;
        this.isSubmit = false;
        this.setUser(data);
        /**
         This is not transactional, need to make changes at the backend to support the same
         */
        let url = `${SERVICE_IDENTIY}/api/v1/customers/${this.user.id}/customer-platform/`
        this.handles.forEach((handle) => {
          this.patchData(`${url}${handle.customerPlatformId}`, {handle: handle.handle}, (data) => {
            this.setMessage('SAVED.SUCCESSFULLY');
          });

        })

        // this.initIGValidity();
      });
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    }
  }
}
;
</script>


