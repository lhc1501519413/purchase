import { stat } from "fs"

const state = {
  priv:{
    inquiry_list: {
      view: 0,
      add: 0,
      edit: 0,
      delete: 0,
      submit: 0,
      audit: 0,
      refuse: 0,
      reback: 0,
      confirm: 0,
      give_up: 0
    },
    supply_inquiry_list: { view: 0, delete: 0, cancel: 0, report: 0 },
    contract_list: { view: 0, edit: 0, submit: 0, confirm: 0 },
    supply_contract_list: { view: 0, edit: 0, refuse: 0, confirm: 0 },
    apply_list: { view: 0, audit: 0, refuse: 0 },
    supply_list: { view: 0 }
  }
}
const mutations = {
  SET_PRIV: (state,priv) => {
    state.priv = priv
  }
}

export default {
  state,
  mutations
}