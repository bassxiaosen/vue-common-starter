import Vue from "vue"
import Router from "vue-router"
import App from "./App"


import store from "./stores"


new Vue({
  render: h => h(App),
  store,
}).$mount('#app')