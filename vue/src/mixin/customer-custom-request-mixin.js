import {modelHttpMixin} from "@/mixin/model-http-mixin";

export const customerCustomRequestMixin = {

  mixins: [modelHttpMixin],
  data() {
    return {
      customRequest: {},
      customerId: null,
      influencerId: null,
    }
  },
  methods: {
    isRequired(attrib) {
      return this.isSubmitted && !this.$v.customRequest[attrib].required;
    },
  }
}
