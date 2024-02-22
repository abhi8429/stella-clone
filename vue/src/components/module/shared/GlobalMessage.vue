<template>
  <div id='global_error' class="row mx-2" v-if="showGlobalMsg || showMessage || showWarning">
    <!-- success alert -->
    <div class="alert alert-custom-success show fade mt-2 mb-0" v-if="showMessage">
      <div class="alert-body">
        <button class="close" @click="resetMsg()">
          <i class="fa fa-check"></i></button>
        <span class="alert-span">
          {{ getMsg(getMessage) }}
        </span>
      </div>
    </div>

    <!-- warning alert -->
    <div class="alert alert-custom-warning show fade mt-2 mb-0" v-if="showWarning">
      <div class="alert-body">
        <button class="close" @click="resetMsg()"><i class="fa fa-info"></i></button>
        <span class="alert-span ">
          {{ getMsg(getWarning) }}
        </span>
      </div>
    </div>

    <!-- global error alert -->
    <div class="alert alert-custom-danger show fade mt-2 mb-0" v-if="showGlobalMsg">
      <div class="alert-body">
        <button class="close" @click="resetMsg()"><i class="fa fa-times"></i></button>
        <span class="alert-span text-white">
          <template v-for="globalError in globalErrors">
          {{ getMsg(globalError) }}<br>
          </template>
        </span>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex'
import * as messageService from '@/common/message-service'

export default {
  name: "GlobalMessage",
  data() {
    return {
      isSuccess: true
    }
  },
  computed: {
    ...mapGetters(['globalErrors', 'getMessage', 'getWarning']),
    showGlobalMsg() {
      let isFailure = (this.globalErrors != null && this.globalErrors.length !== 0);
      this.isSuccess = !isFailure;
      return isFailure;
    },
    showMessage() {
      return !!this.getMessage;
    },
    showWarning() {
      return !!this.getWarning;
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
    ...mapMutations(['clearGlobalErrors', 'clearErrMsg']),
    resetMsg() {
      this.clearGlobalErrors();
    },
  },
}
</script>

