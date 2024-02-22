<template>
  <div v-if="isLoading">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <pulse-loader></pulse-loader>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PulseLoader from "vue-spinner/src/PulseLoader";

export default {
  name: "LoadingModal",
  props: {
    isLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    PulseLoader
  },
  computed: {
    // ...mapGetters(['isLoading'])
  }
}
</script>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: above;
  padding-top: 20px;
}

.modal-container {
  width: 130px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: rgba(0, 0, 0, .01);
  border-radius: 2px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, .33);*/
  transition: all .3s ease;
  color: #028E16;
  font-family: Helvetica, Arial, sans-serif;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

/* Blink style */
.blink {
  -webkit-animation-name: blinker;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;

  -moz-animation-name: blinker;
  -moz-animation-duration: 1s;
  -moz-animation-timing-function: linear;
  -moz-animation-iteration-count: infinite;

  animation-name: blinker;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@-moz-keyframes blinker {
  0% {
    opacity: 1.0;
  }
  50% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
}

@-webkit-keyframes blinker {
  0% {
    opacity: 1.0;
  }
  50% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
}

@keyframes blinker {
  0% {
    opacity: 1.0;
  }
  50% {
    opacity: 0.0;
  }
  100% {
    opacity: 1.0;
  }
}


</style>
