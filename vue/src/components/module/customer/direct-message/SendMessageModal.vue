<template>
  <div class="modal fade" id="send-message-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <loading-modal :is-loading="isLoading"/>
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content" style="background:#000; border: 1px solid #2f2f2f;">
        <div class="modal-header" style="border-bottom: 1px solid #1f1f1f;">
          <h5 class="modal-title text-white" id="exampleModalLabel">Send message?</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <!-- <span aria-hidden="true">&times;</span> -->
          </button>
        </div>
        <div class="modal-body" style="background: #000;">
          <div class="contianer-fluid">
            <model-global-message
              :global-errors="globalErrors"
              :message="message"
              @clearMessages="clearMessages()"/>
            <div class="row">
              <p>You will be charged ${{ pricePerMessage }} for this message</p>
              <div data-v-767611da="" class="border border-dark rounded py-4 ml-2" style="width: 95%;">

                <div data-v-767611da="" class="dropdown"
                     style="border-radius:16px; display: flex; flex-direction: row; justify-content: space-between;">
                  <div>
                    <p data-v-767611da="">Paying from</p>
                    <p data-v-767611da="" type="text" class=" text-white">
                      {{
                        getCardDetails(cards[selectedCardIndex])
                      }}
                    </p>
                  </div>
                  <button data-v-767611da="" type="button" data-toggle="dropdown" aria-expanded="false"
                          class="btn dropdown-toggle dropdown-toggle-split"
                          style="text-align: end; color: rgb(255, 255, 255); font-size: 2rem;"></button>
                  <div data-v-767611da="" class="dropdown-menu dropdown-class"
                       style="background: #000;color: #fff;border: 1px solid #b2b2b2; position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(345px, 44px, 0px);"
                       x-placement="bottom-start">
                    <a v-for="(card, index) in cards" :key="index"
                       data-v-767611da="" href=""
                       @click.prevent="cardSelected(index)"
                       class="dropdown-item" style="background: #000;color: #fff">
                      {{ getCardDetails(card) }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer" style="border-top: 1px solid #000;">
          <button type="button" class="btn  button-class" style="width: 100%; border-radius: 12px"
                  @click="pay">Send Message
          </button>
          <button type="button" class="btn btn-outline-secondary"
                  @click="$emit('editMessage')"
                  style="width: 100%; padding: 12px 16px; border-radius: 12px;" data-dismiss="modal">Edit Message
          </button>
        </div>
      </div>
    </div>

    <message-payment
      ref="messagePayment"
      @paymentFailed="(error) => {
        isLoading = false;
        if(Array.isArray(error)){
          globalErrors.push(...error);
        } else {
        pushGlobalError(error);
        }
      }"
      @paymentSuccess="() => {
        isLoading = false;
        $emit('messageSent', draftMessage);
        hide();
      }"/>
  </div>
</template>

<script>
import {SERVICE_PAYMENT} from "@/properties/micro-service";
import {mapGetters} from "vuex";
import MessagePayment from "@/components/module/customer/direct-message/shared/MessagePayment";
import {MESSAGE} from "@/common/analytics-service";
import GlobalMessage from "@/components/module/shared/GlobalMessage";
import {modelHttpMixin} from "@/mixin/model-http-mixin";

export default {
  name: "SendMessageModal",
  components: {GlobalMessage, MessagePayment},
  mixins: [modelHttpMixin],
  data() {
    return {
      pricePerMessage: null,
      cards: [{brand: 'Add new card'}],
      selectedCardIndex: 0,
      influencerId: null,
      customerId: null,
      draftMessage: null,
      originalCardIndex: null
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    getCards() {
      let url = `${SERVICE_PAYMENT}/api/v1/stripe/customers/${this.getUser.id}/cards`;
      this.getData(url, (cards) => {
        this.cards = cards;
        this.cards.push({brand: 'Add new card'});
        this.setDefaultCardIndex();
      });
    },
    setDefaultCardIndex() {
      this.selectedCardIndex = this.cards.findIndex((card) => card.defaultCard === true);
      if (this.selectedCardIndex === -1) {
        this.selectedCardIndex = 0;
      }
      if (this.$route.query.cardAdded) {
        let index = this.cards.findIndex((card) => card.cardId == this.$route.query.cardAdded);
        if (index !== -1) {
          this.selectedCardIndex = index;
        }
      }
      this.originalCardIndex = this.selectedCardIndex;
    },
    getCardDetails(card) {
      if(!card) return;
      if (card.cardId) {
        return `${card.brand} .... ${card.last4Digit}`
      } else {
        return card.brand;
      }
    },
    show(influencerId, customerId, draftMessage, pricePerMessage) {
      $('#send-message-modal').modal();
      this.influencerId = influencerId;
      this.customerId = customerId;
      this.draftMessage = draftMessage;
      this.pricePerMessage = pricePerMessage;
      this.selectedCardIndex = 0;
      this.originalCardIndex = null;
      this.cards = [];
      this.getCards();
    },
    hide() {
      $('#send-message-modal').modal('hide');
    },
    cardSelected(index) {
      this.selectedCardIndex = index;
      if (!this.cards[index].cardId) {
        this.hide();
        this.$router.replace({name: 'CustomerCardDetail', query: {messageCard: this.influencerId}});
      }
    },
    markAsDefaultCard(fn) {
      for (let i = 0; i < this.cards.length; i++) {
        this.cards[i].defaultCard = false;
      }
      this.cards[this.selectedCardIndex].defaultCard = true;
      let card = this.cards[this.selectedCardIndex];
      let url = `${SERVICE_PAYMENT}/api/v1/stripe/customers/${this.getUser.id}/cards/${card.cardId}/`;
      this.patchData(url, card, (data) => {
        fn();
      });
    },
    pay() {
      let mode = this.selectedCardIndex === -1 ? 'Online' : 'Offline';
      if (this.selectedCardIndex !== -1 && this.originalCardIndex !== this.selectedCardIndex) {
        this.markAsDefaultCard(() => {
          this.isLoading = true;
          this.$refs.messagePayment.pay(this.influencerId, this.customerId,
            this.draftMessage.id, MESSAGE, mode);
        });
      } else {
        this.isLoading = true;
        this.$refs.messagePayment.pay(this.influencerId, this.customerId,
          this.draftMessage.id, MESSAGE, mode);
      }
    },
  }

}
</script>

