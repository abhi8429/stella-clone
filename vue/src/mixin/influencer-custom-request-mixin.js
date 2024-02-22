import {modelHttpMixin} from "@/mixin/model-http-mixin";

export const influencerCustomRequestMixin = {

  mixins: [modelHttpMixin],
  data() {
    return {
      customRequest: {customer: {}},
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
