<template>
<section class="container-fluid">
  <div class="row p-md-4 pb-md-0">
    <div class="border-around border-md-1 border-0 p-2">
      <div>

        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


        <influencer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></influencer-menu>
        <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>

        <section class="closefriend-hero background-white">
          <div class="container mt-5">
            <div class="row">
              <div class="col-12 col-sm-6 col-md-6 vertical-center mb-2" v-if="isNeedToAddExists">
                <!-- Here            -->
                <div class="gradient-a border-radius-10 w-100">
                  <div class="bg-animation d-flex p-3 px-3 align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                      <img class="img-fluid me-2" src="@/assets/images/stella/dash-side-icon.svg">
                      <span class="text-dark font-weight-800 font-size-16">You have new subscribers</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <img class="img-fluid ms-1" src="@/assets/images/stella/arrow-simple-right-black.svg"
                           @click="goToNewSubscription()">
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-6 col-md-6 vertical-center mb-2">

                <div class="input-group flex-nowrap stella-group">
                  <span class="input-group-text pe-0"></span>
                  <input type="text" class="form-control px-0 font-gradient-a font-weight-bold"
                         :value="constructCustomerURL(user.urlSuffix)"
                         readonly id="url-suffix">
                  <span class="input-group-text p-1 pe-2">
                    <button
                      id="copy_id"
                      class="btn py-2 px-3 font-size-18 copy-btn border-radius-12 text-white"
                      @click="copyNow('url-suffix')">{{ copyLabel }}</button>
                  </span>
                </div>

              </div>

            </div>
              <div class="row pb-3 pt-5 justify-content-center">
                <div class="col-md-4 col-12">
                  <div class="row">

                    <div class="col-12 mt-4">
                      <global-message></global-message>
                    </div>
                    <div class="col-12 mt-4">
                      <label class="form-label mb-2">Title</label>

                      <div class="stella-group">
                        <input type="text" length="60" class="form-control stella-group" style="color:black!important;" v-model="customRequestOption.title">
                      </div>

                      <div class="invalid-feedback" v-if="isRequired('title')">You haven't filled this filled</div>
                    </div>
                    <div class="col-12 mt-4">
                      <label class="form-label mb-2">Price</label>
                      <div class="input-group stella-group">
                        <span class="input-group-text" id="basic-addon1">$</span>
                        <input type="number"
                               class="stella-group border-0 pl-1"
                               v-model="customRequestOption.price">
                      </div>
                      <div class="invalid-feedback" v-if="isRequired('price')">You haven't filled this filled</div>
                    </div>


                    <div class="col-12 mt-5">
                      <div class="btn-group-lg ios-ui-select btn-group-vertical upload-section w-100" role="group" aria-label="Basic example">
                        <!-- <button type="button" class="btn font-family-poppins btn-dark border-radius-10 btn-disabled">update</button> -->
                        <button  v-if="isEdit" type="button" class="btn font-family-poppins btn-dark border-radius-10" @click="deleteCustomRequest()">Delete</button>
                      </div>

                      <button type="button"
                              class="btn rounded-pill text-dark gradient-a btn-lg w-100 mt-3"
                              @click="createOrUpdateCustomRequest()">Finish
                      </button>

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

import {mapActions, mapGetters} from "vuex";

import {httpMixin} from "@/mixin/http-mixin";
import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import InfluencerMenu from "@/components/module/influencer/shared/InfluencerMenu";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {required} from "vuelidate/lib/validators";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {newSubscriptionMixin} from "@/mixin/new-subscription-mixin";
import {constructCustomerURL} from "@/common/baseURL-service";
import titleMixin from "../../../../mixin/title-mixin";


export default {
  name: 'CustomRequestOptionCreate',
  title: 'Create custom request option',
  mixins: [newSubscriptionMixin, titleMixin],
  components: {
    HeaderMenu, InfluencerMenu,
    GlobalMessage,

  },
  data() {
    return {
      user: [],
      customRequestOption: {},
      showSlideBar: false,

      isSubmitted: false

    }
  },
  validations() {
    return {
      customRequestOption: {
        title: {required},
        price: {required}
      }
    }
  },
  created() {
    this.user = this.getUser();
    if (this.isEdit) {
      this.load();
    }
    this.checkNewSubscription(this.user.id);
  },
  computed: {
    isEdit() {
      return !!this.$route.params.customRequestOptionId;
    },
    copyLabel() {
      return this.copied ? 'Copied' : 'Copy';
    }
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setMessage']),
    constructCustomerURL,
    isRequired(attrib) {
      return this.isSubmitted && !this.$v.customRequestOption[attrib].required;
    },
    createOrUpdateCustomRequest() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (!this.isEdit) {
        this.create();
      } else {
        this.update();
      }
    },
    load() {
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/custom-request-options/${this.$route.params.customRequestOptionId}`;
      this.getData(url, (customRequestOption) => {
        this.customRequestOption = customRequestOption;
      });

    },
    create() {
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/custom-request-options/`;
      this.postData(url, this.customRequestOption, (customRequestOptions) => {
        this.customRequestOptions = customRequestOptions;
        this.goto({saved: true});
      });
    },
    update() {
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/custom-request-options/${this.customRequestOption.id}`;
      this.patchData(url, this.customRequestOption, (customRequestOptions) => {
        this.customRequestOptions = customRequestOptions;
        this.goto({saved: true});
      });
    },
    goto(query) {
      this.$router.replace({name: 'CustomRequestOptionList', query});
    },
    deleteCustomRequest() {
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/custom-request-options/${this.customRequestOption.id}`;
      this.getDelete(url, () => {
        this.goto({deleted: true});
      });

    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    }
  }
}
;
</script>


