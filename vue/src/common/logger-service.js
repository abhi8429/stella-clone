import {AXIOSunsecure, geDecodedToken} from "@/common/http-common";
import {ACCESS_TOKEN} from "@/properties/close-friend";
import {SERVICE_MESSAGING} from "@/properties/micro-service";

export const logError = (err, vm, info, isWarn=false) => {

  console.log('err', err);
  console.log('info', info);
  console.log('VUE_APP_LOG', process.env.VUE_APP_LOG);
  if(process.env.VUE_APP_LOG === "true") {
    let errorText = null;
    if (!isWarn) {
      errorText = err.name + ' ' + err.message + ' ' + err.stack;
    } else {
      errorText = err;
    }

    let urlSuffix = vm.$route.params.urlPrefix;
    if (!urlSuffix) {
      let invitee = vm.$store.state.invitee;
      if (invitee) {
        urlSuffix = invitee.urlSuffix;
      }
    }
    let userToken = geDecodedToken(ACCESS_TOKEN);
    let putData = {error: errorText,
      info: info,
      userAgent: (navigator.userAgent || navigator.vendor || window.opera),
      userId: userToken? userToken.id : null,
      path: vm.$route.fullPath,
      urlSuffix:urlSuffix
    };
    AXIOSunsecure().post(`${SERVICE_MESSAGING}/api/v1/internal/error/log`, putData)
      .then(response => {
      })
      .catch(e => {
        console.log(e);
      });
  }
}


