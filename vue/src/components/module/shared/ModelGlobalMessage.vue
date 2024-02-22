<template>
  <div class="row mx-2" v-if="showGlobalMsg || showMessage">
    <div class="alert alert-custom-success show fade mt-2 mb-0" v-if="showMessage">
      <div class="alert-body">
        <button class="close" @click="resetMsg()">
          <i class="fa fa-check"></i></button>
        <span class="alert-span">
          {{message}}
        </span>
      </div>
    </div>

    <!-- warning alert -->
    <div class="alert alert-custom-warning show fade mt-2 mb-0" v-if="showWarning">
      <div class="alert-body">
        <button class="close" @click="resetMsg()"><i class="fa fa-info"></i></button>
        <span class="alert-span">
          {{ getMsg(warning) }}
        </span>
      </div>
    </div>

    <div class="alert alert-custom-danger show fade mt-2 mb-0" v-if="showGlobalMsg">
      <div class="alert-body">
        <button class="close" @click="resetMsg()"><i class="fa fa-times"></i></button>
        <span class="alert-span">
          <template v-for="globalError in globalErrors">
          {{ getMsg(globalError) }}<br>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import * as messageService from '@/common/message-service'

export default {
  name: "GlobalMessage",
  props: ['globalErrors', 'message', 'warning'],
  computed: {
    showGlobalMsg() {
      return (this.globalErrors != null && this.globalErrors.length !== 0);
    },
    showMessage() {
      return !!this.message;
    },
    showWarning() {
      return !!this.warning;
    }
  },
  methods: {
    getMsg(messageObj) {
      let msg = messageService.getMessage(messageObj.code);
      if (!msg) {
        msg = messageService.getMessage(messageObj.defaultMessage);
      }
      if (messageObj.arguments && messageObj.arguments.length !== 0) {
        msg = messageService.replaceMsgWithArgs(msg, messageObj.arguments);
      }
      return msg;
    },
    resetMsg() {
      /* if (this.globalErrors && this.globalErrors.length !== 0) {
         this.globalErrors.splice(0);
       }*/
      /*  this.globalErrors = [];
        this.message = '';*/
      this.$emit("clearMessages");
    },
    cleanUpMessage(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.resetMsg();
        }, 10000);
      }
    },
  },
   watch: {
     showGlobalMsg: function (newValue, oldValue) {
       this.cleanUpMessage(newValue);
     },
     showMessage: function (newValue, oldValue) {
       this.cleanUpMessage(newValue);
     },
     showWarning: function (newValue, oldValue) {
       this.cleanUpMessage(newValue);
     }
   }
}
</script>

