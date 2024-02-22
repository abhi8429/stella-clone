import {mapActions} from 'vuex'
import {ACCESS_TOKEN, REFRESH_TOKEN} from '@/properties/close-friend'
import {
  AXIOS,
  AXIOS_LOGIN,
  AXIOSdownLoad,
  AXIOSunsecure,
  AXIOSUnsecureUpload,
  AXIOSupload,
  getToken,
  getTokenExp,
  isRememberMe,
  isTokenExpired,
  setToken,
  XMLHttpReq
} from '@/common/http-common'
import {SERVICE_IDENTIY} from "@/properties/micro-service";

export const httpMixin = {

  data() {
    return {
      message: {},
      isLoading: false,
      request: null,
      isDownloadingFile: false
    }
  },

  methods: {
    ...mapActions(['pushGlobalError', 'clearGlobalMessages', 'setGlobalMessages']),
    getJquery() {
      return $;
    },
    setTitle(title) {
      document.title = title;
    },

    downLoadData(url, fn) {
      /* this.isLoading = true;*/

      this.checkTokenValidity(() => {
        AXIOSdownLoad().get(url)
          .then(response => {
            /* this.isLoading = false;*/
            fn(response.data, response.headers);
          })
          .catch(e => {
            this.catchError(e, true);
          })
      });

    },

    downLoadFile(url, isBlank) {
      this.isDownloadingFile = true;

      this.checkTokenValidity(() => {
        let fn = (msg) => {
          this.pushGlobalError(msg)
        };
        let doneFn = () => {
          this.isDownloadingFile = false;
        }
        this.request = XMLHttpReq(url);
        let req = this.request;
        req.onload = function (event) {
          doneFn();
          if (req.status === 200) {

            let a = document.createElement('a');
            document.body.appendChild(a); //Very important other wise it does not work in FF
            a.href = window.URL.createObjectURL(req.response);

            if (isBlank) {
              a.target = '_blank'
            } else {
              let contentDisposition = req.getResponseHeader('Content-Disposition');
              if (contentDisposition) {
                a.download = contentDisposition.split('filename=')[1].replace(new RegExp("\"", 'g'), "");
              }
            }
            a.click();
            a.parentElement.removeChild(a);

          } else {
            let reader = new FileReader();
            reader.addEventListener("loadend", function () {
              reader.result; //ontains the contents of blob as a typed array
              let message = String.fromCharCode.apply(null, new Uint8Array(reader.result));
              if (message) {
                fn(message);
              } else {
                fn('Error while downloading file : ' + req.status);
              }
            });
            reader.readAsArrayBuffer(req.response);
          }

        };
        req.send();
      });


    },

    downLoadText(url) {
      /* this.isLoading = true;*/

      this.checkTokenValidity(() => {

        AXIOSdownLoad().get(url)
          .then(response => {
            /* let msgError = response.data[MSG_AND_ERROR];
             this.setMessages(msgError);*/
            /* this.isLoading = false;*/

            /** TODO: This is something that did not work with Blob, some that can be looked into
             *
             let blob = new Blob([response.blob()], {type: response.headers['content-type']}),
             let  = (response.headers['Content-Disposition'] || '').split('filename=')[1];
             let a = document.createElement('a');
             document.body.appendChild(a); //Very important other wise it does not work in FF
             a.href = window.URL.createObjectURL(blob);
             a.download = filename;
             a.click();
             *
             */

            let contentDisposition = response.headers['content-disposition'];
            let a = document.createElement('a');
            document.body.appendChild(a); //Very important other wise it does not work in FF
            //Content disposition looks like this -> content-disposition: attachment; filename="<studyName>.json", remove the '"'
            // on either side of the filename. Get the file name and assign it to download attribute
            a.download = contentDisposition.split('filename=')[1].replace(new RegExp("\"", 'g'), "");
            a.href = "data:text/plain; charset=utf-8," + encodeURIComponent(response.data);
            /* a.target = "_blank";*/
            a.click();
          })
          .catch(e => {
            this.catchError(e, true);
          })
      });

    },

    uploadUnsecureData(url, formData, fn, event) {

      this.isLoading = true;

      AXIOSUnsecureUpload().post(url, formData)
        .then(response => {
          this.isLoading = false;

          //This should be called last after doing all the above
          //so that we can override the message.
          fn(response.data);

        })
        .catch(e => {
          this.catchError(e, true);
        })

    },

    uploadData(url, formData, fn, event) {

      this.isLoading = true;
      this.checkTokenValidity(() => {
        AXIOSupload().post(url, formData)
          .then(response => {
            this.isLoading = false;

            //This should be called last after doing all the above
            //so that we can override the message.
            fn(response.data);

          })
          .catch(e => {
            this.catchError(e, true);
          })
      });
    },

    getUnSecureData(url, fn) {
      console.log('getUnSecureData');
      this.isLoading = true;

      AXIOSunsecure().get(url)
        .then(response => {
          this.isLoading = false;
          //This should be called last after doing all the above
          //so that we can override the message.
          fn(response.data);
        })
        .catch(e => {
          this.catchError(e, true);
        })
    },

    getData(url, fn, disableLoadingModel) {
      console.log('getData');

      if (!disableLoadingModel) {
        this.isLoading = true;
      }
      this.checkTokenValidity(() => {
        AXIOS().get(url)
          .then(response => {
            this.isLoading = false;
            //This should be called last after doing all the above
            //so that we can override the message.
            fn(response.data);
          })
          .catch(e => {
            this.catchError(e, true);
          })
      });
    },

    putData(url, putData, fn) {
      this.isLoading = true;
      this.checkTokenValidity(() => {
        AXIOS().put(url, putData)
          .then(response => {
            this.isLoading = false;
            //This should be called last after doing all the above
            //so that we can override the message.
            fn(response.data);
          })
          .catch(e => {
            this.catchError(e, true);
          })
      });
    },

    putUnsecureData(url, putData, fn, event) {
      console.log('putUnsecureData');

      this.isLoading = true;
      AXIOSunsecure().put(url, putData)
        .then(response => {
          this.isLoading = false;
          //This should be called last after doing all the above
          //so that we can override the message.
          fn(response.data);

        })
        .catch(e => {
          this.catchError(e, true);
        })

    },

    getDelete(url, fn) {
      console.log('getDelete');
      this.checkTokenValidity(() => {
        AXIOS().delete(url)
          .then(response => {
            this.isLoading = false;
            //This should be called last after doing all the above
            //so that we can override the message.
            fn(response.data);
          })
          .catch(e => {
            this.catchError(e, true);
          })
      });
    },

    postUnsecureData(url, putData, fn, event) {
      console.log('postUnsecureData');

      this.isLoading = true;
      AXIOSunsecure().post(url, putData)
        .then(response => {
          this.isLoading = false;
          //This should be called last after doing all the above
          //so that we can override the message.
          fn(response.data);

        })
        .catch(e => {
          this.catchError(e, true);
        })

    },


    postData(url, putData, fn, event) {
      console.log('postData');

      this.isLoading = true;
      this.checkTokenValidity(() => {
        AXIOS().post(url, putData)
          .then(response => {
            this.isLoading = false;
            //This should be called last after doing all the above
            //so that we can override the message.
            fn(response.data);

          })
          .catch(e => {
            this.catchError(e, true);
          })
      });

    },

    patchData(url, putData, fn, event) {
      console.log('patchData');

      this.isLoading = true;
      this.checkTokenValidity(() => {
        AXIOS().patch(url, putData)
          .then(response => {
            this.isLoading = false;
            //This should be called last after doing all the above
            //so that we can override the message.
            fn(response.data);

          })
          .catch(e => {
            this.catchError(e, true);
          })
      });

    },

    catchError(error, clearMsg) {

      this.isLoading = false;
      if (error.response) {
        console.log('reponse status ....>  ' + error.response.status);
        console.log('response ....>  ', error.response);
        if (error.response.status === 401) {
          this.$router.replace({name: 'HomePage'});
          return;
        } //401 expired token,
        if (clearMsg) {
          this.clearGlobalMessages();
        }
        if (error.response.data.error) {
          this.pushGlobalError(error.response.data.error);
        } else {
          this.setGlobalMessages(error.response.data);
        }
        /*  console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);*/
      } else if (error.request) {
        if (clearMsg) {
          this.clearGlobalMessages();
        }
        this.pushGlobalError('Network.Error');
      } else {
        if (clearMsg) {
          this.clearGlobalMessages();
        }
        // Something happened in setting up the request that triggered an Error
        if (error.message) {
          this.pushGlobalError(error.message);
        }
      }
      this.scrollToGlobalError();
    },

    scrollToGlobalError() {
      this.$nextTick(() => {
        let el = document.getElementById('global_error');
        if (el) {
          el.scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    },

    checkTokenValidity(fn, doNotRedirect) {

      let tokenExp = getTokenExp(ACCESS_TOKEN);

      if (tokenExp === null) {
        console.log('going to...login')
        if (doNotRedirect) {
          fn();
        } else {
          this.$router.replace({name: 'HomePage'});
        }
      } else {
        let now = new Date();

        /* If the token is going to expire in less than 60 seconds, refresh token
           i.e get new tokan
           The javscript Date is in milliseconds, thats why - 60 seconds x 1000
         */
        let timeDiff = (tokenExp - now);
        console.log('isTokenExpired(ACCESS_TOKEN)', isTokenExpired(ACCESS_TOKEN));
        console.log('isRememberMe()', isRememberMe());
        if ((timeDiff > 0 && (timeDiff <= 60 * 1000)) || (isRememberMe() && isTokenExpired(ACCESS_TOKEN))) {
          //Delete token
          AXIOSunsecure().delete(`${SERVICE_IDENTIY}/token/revoke/accessToken/${getToken(ACCESS_TOKEN)}`)
            .then(response => {
              //refresh token
              const body = `refresh_token=${getToken(REFRESH_TOKEN)}&grant_type=refresh_token`
              AXIOS_LOGIN.post(`${SERVICE_IDENTIY}/oauth/token`, body)
                .then(response => {
                  setToken(ACCESS_TOKEN, response.data[ACCESS_TOKEN])
                  fn(); //Callback
                })
                .catch(e => {
                  this.catchError(e, false); //Don't want to clear already existing msg
                })
            })
            .catch(e => {
              this.catchError(e, false);
            });
        } else {
          fn(); //Callback
        }
      }

    },

  }
}
