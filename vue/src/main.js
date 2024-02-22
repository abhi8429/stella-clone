import Vue from 'vue';
import Vuex from "vuex";
import App from './App.vue';
// import '@/registerServiceWorker';
import moment from 'moment';
// import LoadScript from 'vue-plugin-load-script';
import Vuelidate from 'vuelidate';
import VuexPersist from 'vuex-persist';
import VueGtm from 'vue-gtm';

/*import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';*/
import {actions, getters, mutations, state} from '@/store/global-store'
import router from '@/router';

import '@/assets/styles/bootstrap.min.css';
import '@/assets/styles/close-friend-main.css';
import '@/assets/styles/common-style.css';
import '@/assets/styles/stella-main.css';
// import '@/assets/styles/close-friend-snapchat.css';
import {setAbsolutePath} from "@/common/absolute-path"
import {closeFriend} from './properties/close-friend'
import {logError} from "@/common/logger-service";
import {AGENCY_DIGIS} from "@/properties/agency";

Vue.config.productionTip = false
Vue.config.errorHandler = (err, vm, info) => {
  logError(err, vm, info);
}
Vue.config.warnHandler = (err, vm, info) => {
  logError(err, vm, info, true);
}

setAbsolutePath();

Vue.use(Vuex);
// Vue.use(LoadScript);
Vue.use(Vuelidate);
// Vue.use(ElementUI, { locale });

Vue.use(VueGtm, {
  id: process.env.VUE_APP_GTM_ID,
  defer: false,
  enabled: true,
  debug: false,
  loadScript: true,
  vueRouter: router,
  trackOnNextTick: false,
});

console.log('process.env.VUE_APP_GTM_ID', process.env.VUE_APP_GTM_ID);
const vuexLocalStorage = new VuexPersist({
  key: 'vuex-closefriend', // The key to store the state on in the storage provider.
  storage: window.sessionStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [vuexLocalStorage.plugin]
});

Vue.filter('formatDateTime', function (value) {
  if (value) {
    return moment(value).format(closeFriend['DateFormat.DateTime']);
  } else {
    return value;
  }
});

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(value).format(closeFriend['DateFormat.Date']);
  } else {
    return value;
  }
});
//format("hh:mm A")
Vue.filter('formatTime', function (value) {
  if (value) {
    return moment(value).format(closeFriend['DateFormat.Time']);
  } else {
    return value;
  }
});

Vue.mixin({
  computed:{
    isDigis() {
      return this.$store.state.agentName === AGENCY_DIGIS;
    }
  },
  methods: {

    setFocus() {
      //e.g input[id=bla] or input[name=bla] will get appropriate input field on querySelectorAll();
      // this.$el.querySelector('select').focus();
      Vue.nextTick(() => {
        let els = this.$el.querySelectorAll('input,select,textarea');
        if (els.length > 0) {
          els[0].focus();
        }
      })
      //$("form:not(.filter) :input:visible:enabled:first").focus();
    },
    isMobile: function () {
      let check = false;
      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    }
  },

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
