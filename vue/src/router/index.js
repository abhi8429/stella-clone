import Vue from 'vue';
import VueRouter from "vue-router";

import {routes as influencerRoutes} from '@/router/module/influencer/influencer-routes';
import {routes as customerRoutes} from '@/router/module/subscriber/customer-routes';
import {routes as messagingRoutes} from '@/router/module/messaging/messaging-routes';
import {
  AXIOS,
  AXIOS_LOGIN,
  getToken,
  getTokenExp,
  isRememberMe,
  isRole,
  removeToken,
  setToken
} from "@/common/http-common";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "@/properties/close-friend";
import {SERVICE_IDENTIY} from "@/properties/micro-service";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  /*fallback: true,*/
  routes: [...influencerRoutes, ...customerRoutes,...messagingRoutes,
    {path: '*', redirect: '/'}
  ]
});

export default router;

/*router.beforeEach((to, from, next) => {
  // Redirect if fullPath begins with a hash (ignore hashes later in path)
  if (to.fullPath.substr(0,2) === "/#") {
    const path = to.fullPath.substr(2);
    next(path);
    return;
  }
  next();
});*/

router.beforeEach((to, from, next) => {
  // isTokenValid();
  checkPathAndGoNext(to, next);
});

/*router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in
  // and trying to access a restricted page
  /!*const publicPages = ['/', '/loginMobile'];
  const authRequired = !publicPages.includes(to.path);
  const isValidToken = isTokenValid();

  console.log('to.name', to.name);
  console.log('to.fullPath', to.fullPath);

  if (to.name === 'SignUpSomnium' || to.fullPath.includes('#')
    || to.name === 'CreateCustomerAccountMobile' || to.name === 'LoginMobile'
    || (to.name === 'StartMobile' && !isValidToken)) {
    console.log('checkPathAndGoNext', 'checkPathAndGoNext');
    checkPathAndGoNext(to, next);
  } else if (to.name === 'StartMobile' && isValidToken) {
    console.log('gotIn', to);
    if (isRole('INFLUENCER')) {
      return next({name: 'CreatorDashboardMobile'});
    } else {
      console.log('beforeEach', 'there');
      return next({name: 'CustomerDashboardMobile'});
    }
  } /!*else if (isValidToken) {
    console.log('isValidToken', isValidToken);
    next({name: 'StartMobile'})
  } else {
    next();
  }*!/
  if (isValidToken) {
    next();
  } else {
    return next({name: 'StartMobile'});
  }*!/
  // checkPathAndGoNext(to, next);

  /!* if (!isTokenValid()) {
     removeToken(ACCESS_TOKEN);
     removeToken(REFRESH_TOKEN);
     return next({
       path: '/',
     });
   }*!/
});*/

function checkPathAndGoNext(to, next) {
  if (to.fullPath.substr(0, 2) === "/#") {
    const path = to.fullPath.substr(2);
    next(path);
    return;
  }
  next();
}

function isTokenValid() {

  let tokenExp = getTokenExp(ACCESS_TOKEN);
  if (tokenExp === null) {
    return false;
  } else {
    let now = new Date();

    /* If the token is going to expire in less than 60 seconds, refresh token
       i.e get new tokan
       The javscript Date is in milliseconds, thats why - 60 seconds x 1000
     */
    let timeDiff = (tokenExp - now);
    if ((timeDiff > 0 && (timeDiff <= 60 * 1000)) || isRememberMe()) {
      //refresh token
      const body = `refresh_token=${getToken(REFRESH_TOKEN)}&grant_type=refresh_token`
      AXIOS_LOGIN.post(`${SERVICE_IDENTIY}/oauth/token`, body)
        .then(response => {
          //Revoke old token
          AXIOS().delete(`${SERVICE_IDENTIY}/oauth/revokeToken`)
            .then(response => {
              console.log('revoked...')
            })
            .catch(e => {
              // do not do any thing
            })

          setToken(ACCESS_TOKEN, response.data[ACCESS_TOKEN])
        })
        .catch(e => {
          return false;
        })
      return true;
    } else if (timeDiff <= 0) {
      return false;
    } else {
      return true;
    }
  }
}
