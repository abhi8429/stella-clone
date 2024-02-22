<template>
  <div class="col-12 col-sm-12 col-md-12"  style="margin-top: 5px;"
       v-if="pendingCustomRequests > 0 || messageCount > 0">
    <div class="alert alert-warning mb-2">
      <div class="font-orange d-flex flex-column">
        <div class="custom-mobile-responsive d-flex flex-row justify-content-between" v-if="pendingCustomRequests > 0">
          <p>{{pendingCustomRequests}} Pending Custom Requests</p>
          <a
            class=" font-orange custom-mobile-button"
            @click="$router.replace({name: 'CustomerCustomRequestList'})">
            <p class="ml-1"><u>Review</u></p>
          </a>
        </div>
        <div class="custom-mobile-responsive d-flex flex-row justify-content-between" v-if="messageCount > 0">
          <p>{{messageCount}} Message in inbox</p>
          <a
            class="font-orange custom-mobile-button"
            @click="$router.replace({name: 'CustomerDirectMessage'})">
            <p class="ml-1"><u>Review</u></p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {SERVICE_CONTENT, SERVICE_DIRECT_MESSAGE} from "@/properties/micro-service";
import {httpMixin} from "@/mixin/http-mixin";
import {geDecodedToken} from "@/common/http-common";
import {ACCESS_TOKEN} from "@/properties/close-friend";

export default {
  name: "PendingCustomRequests",
  mixins: [httpMixin],
  data() {
    return {
      pendingCustomRequests: 0,
      messageCount: 0,
    }
  },
  created() {
    let userId = geDecodedToken(ACCESS_TOKEN).id;
    //Get pending custom request count
    let url = `${SERVICE_CONTENT}/api/v1/customers/${userId}/custom-request/count`;
    this.getData(url, (count) => {
      this.pendingCustomRequests = count;
      if (count > 0) {
        this.$emit('pendingCustomRequests', count)
      }
    });
    //Get messages not read
    url = `${SERVICE_DIRECT_MESSAGE}/api/v1/chat/chat-messages/customers/${userId}/unread-count`
    this.getData(url, (count) => {
      this.messageCount = count;
    });
  }
}
</script>

<style scoped>
@media only screen and (max-width: 1023px){

  .custom-mobile-responsive{
    width: 100%;
  }
  .custom-mobile-button
  {
    /*margin-top: 3%;*/
  }
}
.alert-btn2{
  float: right;
  position: absolute;
  right: 6px;
  /*top: 5px;*/
  border-radius: 10px;
  border: none;
  padding: 8px 15px;
}
</style>
