import {AXIOSunsecure} from "@/common/http-common";
import {SERVICE_IDENTIY} from "@/properties/micro-service";

export const forgotPasswordMixin = {

  data() {
    return {
      changePassword: {},
      isLoading: false,
      globalErrors: [],
      message: null
    }
  },
  methods: {
    clearMessages() {
      this.globalErrors.splice(0);
      this.message = '';
    },
    isRequired(attrib) {
      return this.isLoading && !this.$v.changePassword[attrib].required;
    },
    postUnsecuredData(url, postData, fn) {

      this.isLoading = true;
      AXIOSunsecure().post(url, postData)
        .then(response => {
          this.isLoading = false;
          //This should be called last after doing all the above
          //so that we can override the message.
          fn(response.data);

        })
        .catch(e => {
          this.catchError(e);
        })
    },

    catchError(error) {
      this.isLoading = false;
      if (error.response) {
        this.globalErrors= error.response.data.allErrors;
      } else if (error.request) {
        this.globalErrors.push({code: 'Network.Error'});
      } else {
        // Something happened in setting up the request that triggered an Error
        this.globalErrors.push({code: error.message});
      }
    },
  }

}
