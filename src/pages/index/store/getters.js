const getters = {
  token: state => state.user.token,
  username: state => state.user.username,
  type: state => state.user.type,
  priv: state => state.priv.priv,
}
export default getters
