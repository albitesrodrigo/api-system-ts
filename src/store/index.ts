import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listProducts: [],
  },
  getters: {
    getListProducts: (state) => state.listProducts,
  },
  mutations: {
    setListProducts(state, payload) {
      state.listProducts = payload;
    },
  },
  actions: {
    setListProducts({ commit }, payload) {
      commit("setListProducts", payload);
    },
  },
  modules: {},
});
