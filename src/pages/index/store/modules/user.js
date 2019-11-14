const state = {
  token: '',
  username: '',
  type:''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_TYPE: (state, type) => {
    state.type = type
  }
}

export default {
  state,
  mutations
}

