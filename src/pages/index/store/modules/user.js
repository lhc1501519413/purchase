const state = {
  token: '',
  username: '',
  logined: '',
  type:'',
  supply_info:{}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_LOGINED: (state, logined) => {
    state.logined = logined
  },
  SET_TYPE: (state, type) => {
    state.type = type
  },
  SUPPLY_INFO: (state, type) => {
    state.supply_info = type
  }
}

export default {
  state,
  mutations
}

