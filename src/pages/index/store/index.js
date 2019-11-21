import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import priv from './modules/priv'
import judge from './modules/judge'
import getters from './getters'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    priv,
    judge
  },
  getters,
  plugins: [createPersistedState({
		storage: window.sessionStorage
	})]
})

export default store
