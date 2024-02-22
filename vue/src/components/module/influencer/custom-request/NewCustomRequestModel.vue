<template>
  <div class="modal fade" id="custom_request_modal" tabindex="-1" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <loading-modal :is-loading="isLoading"/>
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" :style="isDigis?'background:#fff;':'background:#000; border: 1px solid #2f2f2f;'">
        <div class="modal-header" :style="isDigis?'border: 1px solid #000; background:#000':'border-bottom: 1px solid #1f1f1f;'">
          <h5 class="modal-title" :class="isDigis?'text-white font-weight-500 font-size-20':'text-white font-weight-500 font-size-20'" id="exampleModalLabel">Create new request</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <!-- <span aria-hidden="true">&times;</span> -->
          </button>
        </div>
        <div class="modal-body" :style="isDigis?'background:#fff':'background: #000;'">
          <div class="container-fluid">
            <div class="row p-0">
              <div class="col-sm-12 p-0">
                <span :class="isDigis?'text-dark font-weight-500':'text-white'">Title</span>
                <required-field v-if="isRequired('title')"/>
                <input type="text" maxlength="60"
                       :class="isDigis?'coloredInput2-digis w-100 text-dark mt-1 dark-placeholder':'coloredInput2 white-placeholder w-100 text-white mt-1'" placeholder="E.g. Get tagged in a comment"
                       v-model="customRequestOption.title">
              </div>
              <div class="col-sm-12 mt-3 p-0">
                <span  :class="isDigis?'text-dark font-weight-500':'text-white'">Price</span>
                <required-field  v-if="isRequired('price')"/>
                <input type="number"
                       :class="isDigis?'coloredInput2-digis w-100 text-dark mt-1 dark-placeholder':'coloredInput2 w-100 text-white mt-1 white-placeholder'" placeholder="Enter an amount in $"
                       v-model="customRequestOption.price">
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer" :style="isDigis?'border-top: 0px solid #000;':'border-top: 1px solid #000;'">
          <button type="button" :class="isDigis?'button-class3-digis':'button-class3'"
                  style="width: 100%;"
                  @click="createOrUpdateCustomRequest">Save
          </button>
          <button type="button" class="btn btn-outline-secondary"
                  :style="isDigis?'width: 100%; padding: 12px 16px; border-radius: 12px;color: #000; font-weight: 500 ;border:2px solid #000;'
                  :'width: 100%; padding: 12px 16px; border-radius: 12px;color: #000; font-weight: 500 ;'" data-dismiss="modal">Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {required} from "vuelidate/lib/validators";
import {mapActions, mapGetters} from "vuex";
import {SERVICE_CONTENT} from "@/properties/micro-service";
import {modelHttpMixin} from "@/mixin/model-http-mixin";
import RequiredField from "@/components/module/shared/RequiredField";
import {clone} from '@/common/Utils';

export default {
  name: 'NewCustomRequestModel',
  mixins: [modelHttpMixin],
  components: {RequiredField},
  data() {
    return {
      user: {},
      customRequestOption: {},
      isSubmitted: false,
      index: -1
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
  },
  methods: {
    ...mapGetters(['getUser']),
    ...mapActions(['setMessage']),
    show(customRequestOption, index) {
      this.customRequestOption = customRequestOption? clone(customRequestOption) : {};
      this.index = index;
      this.isSubmitted = false;
      $('#custom_request_modal').modal();
    },
    hide() {
      $('#custom_request_modal').modal('hide');
    },
    isRequired(attrib) {
      return this.isSubmitted && !this.$v.customRequestOption[attrib].required;
    },
    createOrUpdateCustomRequest() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if (!this.customRequestOption.id) {
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
      this.postData(url, this.customRequestOption, (customRequestOption) => {
        this.customRequestOption = customRequestOption;
        this.$emit('created', customRequestOption);
        this.hide();
      });
    },
    update() {
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/custom-request-options/${this.customRequestOption.id}`;
      this.patchData(url, this.customRequestOption, (customRequestOption) => {
        this.customRequestOption = customRequestOption;
        this.$emit('updated', customRequestOption, this.index);
        this.hide();
      });
    },
    deleteCustomRequest() {
      let url = `${SERVICE_CONTENT}/api/v1/influencers/${this.user.id}/custom-request-options/${this.customRequestOption.id}`;
      this.getDelete(url, () => {
        this.$emit('deleted', this.index);
        this.hide();
      });
    },
  }
}
</script>

<style scoped>

@media only screen and (min-width: 1024px) {
  .dropdown > input {
    width: 90%;
  }

}
</style>
