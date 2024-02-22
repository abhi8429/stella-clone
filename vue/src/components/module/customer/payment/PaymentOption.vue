<template>
<section class="container-fluid">
  <div class="row p-md-4 pb-md-0">
    <div class="border-around border-md-1 border-0 p-2">
      <div>

        <b @click="slideBar()" :class="showSlideBar ? 'screen-overlay show' : 'screen-overlay'"></b>


        <customer-menu @menuClicked="slideBar()" :show-slide-bar="showSlideBar"></customer-menu>
        <header-menu @slideMenu="slideBar()" :is-loading="isLoading"></header-menu>

        <section class="closefriend-hero background-white">
          <div class="container mt-3">
            <div class="row">
              <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                <div class="custom-card">
                  <global-message></global-message>
                  <pending-custom-requests/>
                  <div class="custom-body">
                    <div class="row">
                      <div class="col-md-12 col-12 ">
                        <div class="row px-1 m-0 p-0">
                          <div class="col-12 col-md-12 p-0 m-0 mb-3 mt-3">
                            <img src="@/assets/images/stella/payment-menu.png">
                            <b class="font-size-16 mx-3 text-white">Payment Options</b>
                          </div>
                          <template v-for="(card, index) in cards">
                            <div class="col-12 col-md-12 px-md-1 border-grey border-top-1">
                              <div class="form-check my-2">
                                <input class="form-check-input" type="radio"
                                       :id="`exampleRadios${index}`"
                                       :value="index" v-model="defaultCardIndex"
                                       @click="$refs.confirmSave.show()">
                                <label class="form-check-label mx-2" :for="`exampleRadios${index}`">
                                  <b class="font-size-16">{{ getCardDetails(card) }}</b>
                                  <div class="font-grey font-size-14"><b>{{ getCardExpiry(card) }}</b></div>
                                </label>
                                <img src="@/assets/images/stella/edit.png" class="edit-payment-option"
                                     @click="cardIndex = index;editCard()">
                                <img src="@/assets/images/stella/close.png" class="delete-payment-option"
                                     @click="cardIndex = index;$refs.confirmDelete.show();">
                              </div>
                            </div>
                          </template>
                          <div class="col-12 col-md-12 px-md-1 border-grey border-top-1">
                            <div class="form-group mt-4">
                              <div class="custom-control custom-checkbox"  style="cursor:pointer;" @click="addCard()">
                                <input type="checkbox" name="remember"
                                       class="custom-control-input">
                                <label class="custom-control-label">Add new card</label>
                              </div>
                            </div>
                          </div>
                          <!-- Uncomment latter                      -->
                          <!--                      <div class="col-12 col-md-12 px-md-1 border-grey border-top-1">
                                                  &lt;!&ndash; end of payment section &ndash;&gt;
                                                </div>-->


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <model-confirm-save
          ref="confirmSave"
          text="Would you like to make this card your default payment method?"
          confirm-btn-txt="Save"
          @cancel="setDefaultCardIndex()"
          @confirm="markAsDefaultCard()"/>

        <model-confirm-delete
          id="delete_model"
          ref="confirmDelete"
          text="Would you like to delete this card?"
          button-color="btn-danger border-0"
          confirm-btn-txt="Delete"
          @confirm="deleteCard()"
        />

      </div>
    </div>
  </div>
</section>
</template>

<script>

import HeaderMenu from "@/components/module/influencer/shared/HeaderMenu";
import CustomerMenu from "@/components/module/customer/shared/CustomerMenu";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {SERVICE_PAYMENT} from "@/properties/micro-service";
import ModelConfirmSave from "@/components/module/customer/shared/ModelBasic";
import ModelConfirmDelete from "@/components/module/customer/shared/ModelBasic";
import {igValidationMixin} from "@/mixin/ig-validation-mixin";
import {mapActions} from "vuex";
import PendingCustomRequests from "@/components/module/customer/shared/PendingCustomRequests";
import titleMixin from "../../../../mixin/title-mixin";

const URL = `${SERVICE_PAYMENT}/api/v1/stripe/customers`;
export default {
  name: 'PaymentOption',
  title: 'Payment options',
  mixins: [igValidationMixin, titleMixin],
  components: {
    HeaderMenu, CustomerMenu,
    GlobalMessage, ModelConfirmSave,
    ModelConfirmDelete, PendingCustomRequests
  },
  data() {
    return {
      user: {},
      cards: [],
      defaultCardIndex: null,
      cardIndex: null,

      showSlideBar: false
    }
  },
  created() {
    this.user = this.getUser();
    let url = `${URL}/${this.user.id}/cards`;
    this.getData(url, (data) => {
      this.cards = data;
      this.setDefaultCardIndex();
      this.initIGValidity();
    });
  },
  methods: {
    ...mapActions['setMessage'],
    setDefaultCardIndex() {
      this.defaultCardIndex = this.cards.findIndex((card) => card.defaultCard === true);
    },
    getCardDetails(card) {
      return `${card.brand} .... ${card.last4Digit}`
    },
    getCardExpiry(card) {
      return `Expires ${card.expMonth}/${card.expYear}`;
    },
    editCard() {
      this.$router.replace({name: 'CustomerCardDetail', params: {cardId: this.cards[this.cardIndex].cardId}});
    },
    deleteCard() {
      this.$refs.confirmDelete.hide();
      let url = `${URL}/${this.user.id}/cards/${this.cards[this.cardIndex].cardId}/`;
      this.getDelete(url, (data) => {
        this.cards.splice(this.cardIndex, 1);
        this.setMessage('DELETED.SUCCESSFULLY');
      });
    },
    markAsDefaultCard() {
      this.$refs.confirmSave.hide();
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].defaultCard = false;
      }
      this.cards[this.defaultCardIndex].defaultCard = true;

      let card = this.cards[this.defaultCardIndex];
      let url = `${URL}/${this.user.id}/cards/${card.cardId}/`;
      this.patchData(url, card, (data) => {
        this.setDefaultCardIndex();
        this.setMessage('SAVED.SUCCESSFULLY');
      });
    },
    addCard() {
      this.$router.replace({name: 'CustomerCardDetail'});
    },
    slideBar() {
      this.showSlideBar = !this.showSlideBar;
    }
  }
}

</script>

<style scoped>
input[type="radio"] + label:before {
  content: '';
  background: #fff;
  border: 4px solid #E0E0E0;
  height: 18px;
  width: 17.5px;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: -5px;
  cursor: pointer;
}

input[type="radio"] + label:after {
  content: '';
  background: #CACACA;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: absolute;
  top: 8px;
  left: -2px;
  transform: scale(1);
  cursor: pointer;
  transition: transform 0.3s linear, opacity 0.3s linear;
}

input[type="radio"]:checked + label:before {
  border: 4px solid #55EFC4;
}

input[type="radio"]:checked + label:after {
  opacity: 1;
  background: #047E15;
}

input[type=radio] {
  position: absolute;
  left: -9999px;
}

.edit-payment-option {
  position: absolute;
  top: 5px;
  right: 30px;
  cursor: pointer;
}

.delete-payment-option {
  position: absolute;
  top: 5px;
  right: 0;
  cursor: pointer;
}

.border-top-1 {
  border-top: 1px;
  border-style: solid;
  border-bottom: 0;
  border-left: 0;
  border-right: 0;
}

.border-grey {
  border-color: #E9E9E9;
}
</style>



