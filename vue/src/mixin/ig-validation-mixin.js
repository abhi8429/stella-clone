import {httpMixin} from "@/mixin/http-mixin";
import {SERVICE_IDENTIY} from "@/properties/micro-service";
import {mapActions, mapGetters} from "vuex";

export const igValidationMixin = {

  mixins: [httpMixin],
  data() {
    return {
      times: 0,
    }
  },
  methods: {
    ...mapActions(['setUser', 'setWarning', 'setMessage']),
    ...mapGetters(['getUser']),
    initIGValidity() {
      this.times = 0;
      // this.checkIGValidity();
    },

    checkIGValidity() {
      if (this.times === 0) {
        this.callIGValidityAPI();
      }
      const interval = setInterval(() => {
        this.times++;
        this.callIGValidityAPI();
        if (this.times === 5) { //Try till 5 minute
          clearInterval(interval);
        }
      }, 60000); //Every minute
    },

    callIGValidityAPI() {
      this.getData(`${SERVICE_IDENTIY}/api/v1/customers/${this.getUser().id}/invalidIg`, (isInvalidIg) => {
        if (isInvalidIg) {
          this.setWarning("INVALID.IG");
        }
      }, true);
    }
  }
}
