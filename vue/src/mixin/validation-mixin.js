import moment from 'moment'
import {commMsg} from "@/properties/common-messages";
import * as dateTimeService from '@/common/datetime-service'
import {closeFriend} from "@/properties/close-friend";

export const validationMixin = {

  data() {
    return {
      hasValErrors: {},
      oldValues: {}
    }
  },

  /**
   * When using this directive, make sure either use it with http-mixin, where data 'message'
   * (which is used here) is defined, or if your component is not using http-mixin then, define
   * 'message' in your component
   */
  directives: {
    'val': {
      bind(el, binding, vnode) {

        let value = el.value.trim();
        let vm = vnode.context;
        //this expression contains ' at the beginning and the end, remove it
        // let expression = binding.expression.replace(new RegExp("'", 'g'), "");
        /**
         * Above commented code can be removed bind.value gets you dynamic and constant values
         * i.e v-val.number="'some'" will return some without the single quotes and also any
         * dynamic value e.g v-val.number="`some${someThingElse}`" will return some1, assuming
         * someThingElse is 1
         */

        if(!value) {
          return;
        }

        let expression = binding.value;
        if(expression === undefined || expression === '') {
          expression = el.id;
        }

        if (binding.modifiers['date']) {
          if (moment(value, closeFriend['DateFormat.Date'], true).isValid() === false) {
            //This is required to change the object's properties, if it were a
            // variable then just vm.hasValErrors = '' would work, but if you
            // want to set or change property of hasValErrors.something then use vm.$set
            vm.$set(vm.hasValErrors, expression, true);

          }
        } else if(binding.modifiers['time']) {
          if (dateTimeService.isValidTime(value) === false) {
            vm.$set(vm.hasValErrors, expression, true);
          }

        } else if (binding.modifiers['number']) {
          if (isNaN(value) === true) {
            vm.$set(vm.hasValErrors, expression, true);
          }
        }

      },
      update(el, binding, vnode, vOldNode) {
        let vm = vnode.context;
        let value = el.value.trim();
        let oldValue;

        //this expression contains ' at the beginning and the end, remove it
        // let expression = binding.expression.replace(new RegExp("'", 'g'), "");
        let expression = binding.value;
        //If binding.value is not defined then use id e.g v-val.number=""
        if(expression === undefined || expression === '') {
          expression = el.id;
        }
        oldValue = vm.oldValues[expression];
        if (value === oldValue) {
          return;
        }

        vm.$set(vm.oldValues, expression, value);
        if (binding.modifiers['date']) {
          if (value && moment(value, closeFriend['DateFormat.Date'], true).isValid() === false) {
            vm.$set(vm.message, expression, commMsg['typeMismatch.java.time.ZonedDateTime']);
            vm.$set(vm.hasValErrors, expression, true);
          } else {
            vm.$set(vm.message, expression, '');
            vm.$set(vm.hasValErrors, expression, false);
          }
        } else if(binding.modifiers['time']) {
          if (value && dateTimeService.isValidTime(value) === false) {
            vm.$set(vm.message, expression, commMsg['typeMismatch.java.time.LocalTime']);
            vm.$set(vm.hasValErrors, expression, true);
          } else {
            vm.$set(vm.message, expression, '');
            vm.$set(vm.hasValErrors, expression, false);
          }

        } else if (binding.modifiers['number']) {
          if (value && isNaN(value) === true) {
            vm.$set(vm.message, expression, commMsg['typeMismatch']);
            vm.$set(vm.hasValErrors, expression, true);
          } else {
            vm.$set(vm.message, expression, '');
            vm.$set(vm.hasValErrors, expression, false);
          }
        }

      }
    }
  },

  methods: {

    hasValError() {
      let hasError = false;
      let fields = Object.keys(this.hasValErrors);
      for (let field of fields) {
        if (this.hasValErrors[field] === true) {
          hasError = true;
          break;
        }
      }
      //this.$forceUpdate() (Forces the directives to run again)
      // not required as message is already flagged in the directives
      return hasError;
    }
  }
}

