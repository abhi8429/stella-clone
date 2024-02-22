import {httpMixin} from "@/mixin/http-mixin";
import {SERVICE_SUBSCRIPTION} from "@/properties/micro-service";
import {copy} from "@/common/Utils";

const NEED_TO_ADD = 'NeedToAdd';

export const newSubscriptionMixin = {

  mixins: [httpMixin],
  data() {
    return {
      isNeedToAddExists: false,
      NEED_TO_ADD,
      copied: false
    }
  },
  methods: {
    //Get all subscriptions
    checkNewSubscription(userId) {
      this.getData(`${SERVICE_SUBSCRIPTION}/api/v1/influencers/${userId}/status/${NEED_TO_ADD}`, (data) => {
        this.isNeedToAddExists = data.find(custSub => custSub.status === NEED_TO_ADD);
      });
    },
    goToNewSubscription() {
      this.$router.push({name: 'CreatorDashboardMobile', params: {scrollToNewSubscription: true}})
    },
    copy,
    copyNow(urlSuffix) {
      this.copy(urlSuffix);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
  }
}
