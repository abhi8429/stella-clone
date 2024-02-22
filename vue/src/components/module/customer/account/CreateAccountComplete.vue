<template>
  <div>
    <header-help :is-loading="isLoading"></header-help>
    <section class="closefriend-hero background-white">
      <div class="container mt-5">
        <div class="row">
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 px-3">
            <div class="login-card">
              <div class="login-header text-center">
                <h2>Almost Done!</h2>
                <global-message></global-message>
                <p class="text-muted">This information will allow you to manage your subscriptions and receive updates
                  from {{getInvitee.name}}</p>
              </div>
              <div class="login-body">

                <div class="form-group">
                  <required-field v-if="isRequired('name')"/>
                  <input type="text"
                         placeholder="Enter your name"
                         class="form-control"
                         v-model="user.name">
                </div>
                <div class="form-group">
                  <required-field v-if="isRequired('password')"/>
                  <div class="input-group">
                    <input placeholder="Enter your password"
                           type="password" class="form-control"
                           id="password"
                           v-model="user.password">
                    <div class="input-group-prepend">
				                            <span class="input-group-text eye"
                                          id="basic-addon1" @click="showPassword('password')">
				                            	<i id="show_id" class="fa fa-eye"></i>
				                            	<i id="hide_id" class="fa fa-eye-slash d-none"></i>
				                            </span>
                    </div>
                  </div>
                </div>
                <div class="form-group custom-arrow">
                  <required-field v-if="isRequired('countryCode')"/>
                  <select placeholder="Enter your country"
                          class="form-control"
                          name="country"
                          v-model="user.countryCode">
                    <option :value="null" selected disabled>Country</option>
                    <option v-for="country in countries" :value="country.code">
                      {{ country.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <required-field v-if="isRequired('phone')"/>
                  <input type="number"
                         placeholder="Phone Number"
                         class="form-control"
                         v-model="user.phone">
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3 px-3 position-bottom ">
            <div class="row justify-content-center mx-md-0 mx-1">
              <div class="col-md-12 col-12 px-1 ">
                <button type="submit" class="btn btn-mobile btn-lg btn-block mt-3 btn-mobile font-size-15-18"
                        :class="buttonColor"
                        @click="finish()">Finish
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
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";
import {mapActions} from "vuex";
import {showPassword} from "@/common/Utils";
import {required} from "vuelidate/lib/validators";
import {SERVICE_IDENTIY} from "@/properties/micro-service";
import HeaderHelp from "@/components/module/influencer/shared/HeaderHelp";
import {customerAccountMixin} from "@/mixin/customer-account/customer-account-mixin";
import RequiredField from "@/components/module/shared/RequiredField";
import titleMixin from "../../../../mixin/title-mixin";

export default {
  name: "CreateAccountComplete",
  title: 'Create account complete',
  mixins: [customerAccountMixin, titleMixin],
  components: {
    GlobalMessage, LoadingModal, HeaderHelp, RequiredField
  },
  data() {
    return {
      user: {},
      isSubmit: false,
      countries: []
    }
  },
  validations: {
    user: {
      name: {required},
      countryCode: {required},
      password: {required},
      phone: {required},
    },
  },
  /*computed: {
    ...mapGetters(['getInvitee']),
  },*/
  created() {
    this.user = this.getUser;
    this.user.countryCode = 'US';
    this.loadCountries();

  },
  methods: {
    ...mapActions(['setMessage', 'setUser']),
  /*  ...mapGetters(['getUser']),*/
    showPassword,
    isRequired(attrib) {
      return this.isSubmit && !this.$v.user[attrib].required;
    },
    isValidEmail() {
      return this.isSubmit && !this.$v.user.email.email;
    },
    loadCountries() {
      this.getUnSecureData('identity/api/v1/lookup/countries', (data) => {
        this.countries = data;
      });
    },
    finish() {

      this.isSubmit = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      console.log(this.getInvitee);
      this.patchData(`${SERVICE_IDENTIY}/api/v1/customers/${this.user.id}`, this.user, (data) => {

        this.user = data;
        this.setUser(data);
        this.$router.replace({name: 'MessageCta', query: {saved: true}})
        // this.showCustomerContent();
      });
    },
  }
}
</script>

<style scoped>

.alert-snapchat-danger {
  border: 0;
  border-radius: 0;
  background: #FF7D7D;
}

.custom-control-label::before {
  background: transparent;
  border: 2px solid black;
}

/*.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active {
  border: 2px solid #ff7d7d;
  background: #000;
}
.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active > .customer-pricing{
  color: #FFFA37;
}
.btn.customer-pricing-toggle:not(:disabled):not(.disabled).active > .per-month{
  color: #FF7D7D !important;
  opacity: 0.5;
}
.btn.customer-pricing-toggle:not(:disabled):not(.disabled) {
  border: 2px solid #000;
}
.btn.focus, .btn:focus {
  outline: 0;
  box-shadow: none;
}
.form-outline {
  border: 1px solid #FFFA37 !important;
  border-radius: 18px;
}
.select-tags.active {
  background: #000;
  border: 0.2px solid #53535363;
  box-sizing: border-box;
  border-radius: 5px;
}*/
</style>
