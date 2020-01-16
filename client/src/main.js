import Vue from "vue";
import App from "./App.vue";
// import socketio from 'socket.io-client';
import VueSocketIO from "vue-socket.io";
// Add Emoji parsing for messages
import vuetwemoji from "vue-twemoji";

// export const SocketInstance = socketio('http://localhost:7777');

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:7777"
  })
);
Vue.use(vuetwemoji);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
