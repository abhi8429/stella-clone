<template xmlns="http://www.w3.org/1999/html">
  <!-- Modal -->
  <div class="modal fade" id="filter-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg ">
      <div class="modal-content" style="background:#000; border: 1px solid #2f2f2f;">
        <div class="modal-header" style="border-bottom: 1px solid #1f1f1f;">
          <h5 class="modal-title text-white" id="exampleModalLabel">Create New Filter</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <!-- <span aria-hidden="true">&times;</span> -->
          </button>
        </div>
        <div class="modal-body" style="background: #000;">
          <div class="contianer-fluid">
            <div class="row">
              <div class="col-sm-12 d-flex flex-row justify-content-between">
                <div style="width: 15%;" class="pt-3">
                  <!--                  <p>Emoji</p>-->
                  <img src="@/assets/images/dollor-img2.png" width="40" height="40" class="my-4" alt="">
                </div>

                <div style="width: 85%;">
                  <model-global-message
                    :global-errors="globalErrors"
                    :message="message"
                    @clearMessages="clearMessages()"/>
                  <required-field v-if="isSubmitted && !$v.filterSetting.name.required"/>
                  <p>Filter Name</p>
                  <input type="text" class="coloredInput2 w-100 text-white" v-model="filterSetting.name"
                         placeholder="What's this called?">
                </div>
              </div>
              <div class="col-sm-12 mt-4 d-flex flex-column justify-content-start">
                <div class="d-flex flex-row justify-content-between">
                  <p class="text-white">Tipped Over Amount</p>
                  <label class="switch mt-1">
                    <input type="checkbox" @change="changed($event, ['tippedOverAmount'])"
                           v-model="filterSetting.tippedOverAmountRequired">
                    <span class="slider round"></span>
                  </label>

                </div>
                <div class="d-flex flex-column">
                  <required-field
                    v-if="isSubmitted && filterSetting.tippedOverAmountRequired && !$v.filterSetting.tippedOverAmount.required"/>
                  <p>Tipped Amount</p>
                  <input type="number" class="coloredInput2 w-100 text-white" v-model="filterSetting.tippedOverAmount"
                         :disabled="!filterSetting.tippedOverAmountRequired" placeholder="Amount">
                </div>
              </div>
              <div class="col-sm-12 mt-4 d-flex flex-column justify-content-start">
                <div class="d-flex flex-row justify-content-between">
                  <p class="text-white">Spent Over</p>
                  <label class="switch mt-1">
                    <input type="checkbox" @change="changed($event, ['spentOverAmount'])"
                           v-model="filterSetting.spentOverAmountRequired">
                    <span class="slider round"></span>
                  </label>

                </div>
                <div class="d-flex flex-column">
                  <required-field
                    v-if="isSubmitted && filterSetting.spentOverAmountRequired && !$v.filterSetting.spentOverAmount.required"/>
                  <p>Spent Amount</p>
                  <input type="number" class="coloredInput2 w-100 text-white" v-model="filterSetting.spentOverAmount"
                         :disabled="!filterSetting.spentOverAmountRequired" placeholder="Amount">
                </div>
              </div>
              <div class="col-sm-12 mt-4 d-flex flex-column justify-content-start">
                <div class="d-flex flex-row justify-content-between">
                  <p class="text-white">Subscribed Over</p>
                  <label class="switch mt-1">
                    <input type="checkbox" @change="changed($event, ['subscribedOverCount', 'subscribedOverTime'])"
                           v-model="filterSetting.subscribedOverRequired">
                    <span class="slider round"></span>
                  </label>

                </div>
                <required-field
                  v-if="filterSetting.subscribedOverRequired && isSubmitted && !$v.filterSetting.subscribedOverCount.required"/>
                <invalid-integer-field
                  v-if="filterSetting.subscribedOverRequired && isSubmitted && !$v.filterSetting.subscribedOverCount.integer"/>
                <span style="color: red" v-if="isRequired('subscribedOverRequired', 'subscribedOverTime')">Over time field
                  required</span>
                <div class="d-flex flex-row justify-content-between">
                  <div style="width: 50%;" class="px-2">
                    <p>Count</p>
                    <input type="number" v-model="filterSetting.subscribedOverCount"
                           :disabled="!filterSetting.subscribedOverRequired" class="coloredInput2 text-white"
                           style="width: 100%;" placeholder="Number of">
                  </div>
                  <div style="width: 50%;">
                    <p>Time</p>
                    <div class="dropdown" style="background: #333333; border-radius: 8px;">
                      <input class="coloredInput2" :value="filterSetting.subscribedOverTime" style="color: white"
                             :disabled="true">
                      <button class="btn dropdown-toggle dropdown-toggle-split" type="button" data-toggle="dropdown"
                              aria-expanded="false" style="text-align:end; color: #fff;">

                        <!-- <span class="dropdown-toggle dropdown-toggle-split"></span> -->
                      </button>

                      <div class="dropdown-menu dropdown-class"
                           style="top: 0px;left: -120px;transform: translate3d(345px, 44px, 0px); background: #000; border: 1px solid rgb(213, 202, 215)">
                        <a class="dropdown-item" href=""
                           @click.prevent="$set(filterSetting, 'subscribedOverTime', 'Months')">Months</a>
                        <a class="dropdown-item" href=""
                           @click.prevent="$set(filterSetting, 'subscribedOverTime', 'Years')">Year</a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div class="col-sm-12 mt-4 d-flex flex-column justify-content-start">
                <div class="d-flex flex-row justify-content-between">
                  <p class="text-white">Inactive over</p>
                  <label class="switch mt-1">
                    <input type="checkbox" @change="changed($event, ['inactiveOverCount', 'inactiveOverTime'])"
                           v-model="filterSetting.inactiveOverRequired">
                    <span class="slider round"></span>
                  </label>

                </div>
                <required-field
                  v-if="filterSetting.inactiveOverRequired && isSubmitted && !$v.filterSetting.inactiveOverCount.required"/>
                <invalid-integer-field
                  v-if="filterSetting.inactiveOverRequired && isSubmitted && !$v.filterSetting.inactiveOverCount.integer"/>
                <span style="color: red" v-if="isRequired('inactiveOverRequired', 'inactiveOverTime')">Over time field
                  required</span>
                <div class="d-flex flex-row justify-content-between">
                  <div style="width: 50%;" class="px-2">
                    <p>Count</p>
                    <input type="number" v-model="filterSetting.inactiveOverCount"
                           :disabled="!filterSetting.inactiveOverRequired" class="coloredInput2 text-white"
                           style="width: 100%;" placeholder="Number of">
                  </div>
                  <div style="width: 50%;">
                    <p>Time</p>
                    <div class="dropdown" style="background: #333333; border-radius: 8px;">
                      <input class="coloredInput2" :value="filterSetting.inactiveOverTime" style="color: white"
                             :disabled="true">
                      <button class="btn dropdown-toggle dropdown-toggle-split" type="button"
                              :disabled="!filterSetting.inactiveOverRequired" data-toggle="dropdown"
                              aria-expanded="false"
                              style="text-align:end; color: #fff;">

                        <!-- <span class="dropdown-toggle dropdown-toggle-split"></span> -->
                      </button>

                      <div class="dropdown-menu dropdown-class"
                           style="top: 0px;left: -120px;transform: translate3d(345px, 44px, 0px);background: #000; border: 1px solid rgb(213, 202, 215)">
                        <a class="dropdown-item" href=""
                           @click.prevent="$set(filterSetting, 'inactiveOverTime', 'Months')">Months</a>
                        <a class="dropdown-item" href=""
                           @click.prevent="$set(filterSetting, 'inactiveOverTime', 'Years')">Year</a>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer" style="border-top: 1px solid #000;">
          <button type="button" class="btn  button-class" style="width: 100%; padding: 12px 16px; border-radius: 12px;"
                  @click="save()">Save changes
          </button>
          <button type="button" class="btn btn-outline-secondary"
                  style="width: 100%; padding: 12px 16px; border-radius: 12px;" data-dismiss="modal">Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {SERVICE_DIRECT_MESSAGE} from "@/properties/micro-service";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {integer, required} from "vuelidate/lib/validators";
import InvalidIntegerField from "@/components/module/shared/InvalidIntegerField";
import RequiredField from "@/components/module/shared/RequiredField";
import '@/assets/styles/direct-message/direct-message-common.css';
import {clone} from '@/common/Utils';
import {modelHttpMixin} from "@/mixin/model-http-mixin";
import ModelGlobalMessage from "@/components/module/shared/ModelGlobalMessage";


export default {
  name: "FilterModal",
  components: {
    RequiredField, InvalidIntegerField,
    GlobalMessage, ModelGlobalMessage
  },
  mixins: [modelHttpMixin],
  data() {
    return {
      filterSetting: {},
      isSubmitted: false
    }
  },
  validations() {
    let filterSetting = {name: {required}};
    if (this.filterSetting.tippedOverAmountRequired) {
      filterSetting.tippedOverAmount = {required}
    }
    if (this.filterSetting.spentOverAmountRequired) {
      filterSetting.spentOverAmount = {required}
    }
    if (this.filterSetting.subscribedOverRequired) {
      filterSetting.subscribedOverCount = {required, integer};
      filterSetting.subscribedOverTime = {required};
    }
    if (this.filterSetting.inactiveOverRequired) {
      filterSetting.inactiveOverCount = {required, integer};
      filterSetting.inactiveOverTime = {required};
    }
    return {filterSetting};
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    show(filter) {
      $('#filter-modal').modal();
      this.filterSetting = {
        subscribedOverTime: null,
        inactiveOverTime: null,
        tippedOverAmountRequired: false,
        spentOverAmountRequired: false,
        subscribedOverRequired: false,
        inactiveOverRequired: false
      }
      this.isSubmitted = false;

      if (filter) {
        this.filterSetting = clone(filter);
      }
    },
    changed(event, attrs) {
      if (!event.target.checked) {
        attrs.forEach((attr) => {
          this.filterSetting[attr] = null;
        });
      } else if (attrs.length === 2 && !this.filterSetting[attrs[1]]) {
        this.filterSetting[attrs[1]] = 'Months';
      }
    },
    isRequired(reqAttr, attrib) {
      return this.filterSetting[reqAttr] && this.isSubmitted && !this.$v.filterSetting[attrib].required;
    },
    isInteger(reqAttr, attrib) {
      return this.filterSetting[reqAttr] && this.isSubmitted && !this.$v.filterSetting[attrib].integer;
    },
    save() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/filter-settings/influencers/${this.getUser.id}`;
      this.filterSetting.influencerId = this.getUser.id;
      this.putData(url, this.filterSetting, (filterSetting) => {
        this.filterSetting = filterSetting;
        this.message = 'Saved successfully';
        this.$emit('saved', filterSetting);
        this.isSubmitted = false;
      });
    },
    hide() {
      $('#filter-modal').modal('hide');
    },
  }

}
</script>


<style scoped>
.dropdown-class a {
  color: #fff;
  font-size: 16px;
  background: #000;
}
</style>
