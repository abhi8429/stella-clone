import {AXIOS, AXIOSunsecure} from "@/common/http-common";
import ModelGlobalMessage from "@/components/module/shared/ModelGlobalMessage";
import LoadingModal from "@/components/module/shared/LoadingModal";


export const modelHttpMixin = {

  data() {
    return {
      isLoading: false,
      isSubmitted: false,
      globalErrors: [],
      message: null,
      warning: null
    }
  },
  components: {
    ModelGlobalMessage, LoadingModal
  },
  methods: {
    clearMessages() {
      this.globalErrors.splice(0);
      this.message = '';
      this.warning = '';
      this.isLoading = false;
      this.isSubmitted = false;
    },
    getData(url, fn) {
      this.isLoading = true;
      AXIOS().get(url)
        .then(response => {
          this.isLoading = false;
          fn(response.data);
        })
        .catch(e => {
          this.catchError(e);
        })
    },
    delete(url, fn) {
      this.isLoading = true;
      AXIOS().delete(url)
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
    getUnSecureData(url, fn) {
      this.isLoading = true;
      AXIOSunsecure().get(url)
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
    postUnsecureData(url, putData, fn) {

      this.isLoading = true;
      AXIOSunsecure().post(url, putData)
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

    postData(url, postData, fn, errorFn) {
      this.isLoading = true;
      AXIOS().post(url, postData)
        .then(response => {
          this.isLoading = false;
          fn(response.data);

        })
        .catch(e => {
          this.catchError(e, errorFn);
        })
    },
    patchData(url, postData, fn) {
      this.isLoading = true;
      AXIOS().patch(url, postData)
        .then(response => {
          this.isLoading = false;
          fn(response.data);

        })
        .catch(e => {
          this.catchError(e);
        })
    },
    putData(url, putData, fn) {
      this.isLoading = true;
      AXIOS().put(url, putData)
        .then(response => {
          this.isLoading = false;
          fn(response.data);
        })
        .catch(e => {
          this.catchError(e);
        })
    },
    catchError(error, errorFn) {
      this.isLoading = false;
      if (error.response) {
        if (error.response.status === 401) {
          this.$router.replace({name: 'HomePage'});
          return;
        } //401 expired token,
        this.globalErrors.splice(0);
        /*   this.globalErrors.push(...error.response.data.allErrors);*/
        if (error.response.data.error) {
          this.globalErrors.push(error.response.data.error);
        } else {
          this.globalErrors.push(...error.response.data.allErrors);
        }
      } else if (error.request) {
        this.globalErrors.push({code: 'Network.Error'});
      } else {
        // Something happened in setting up the request that triggered an Error
        this.globalErrors.push({code: error.message});
      }
      if (errorFn) {
        errorFn();
      }
    },
    pushGlobalError(error) {
      this.globalErrors.push({code: error});
    }
  }

}
