const getters = {
  token: state => state.user.token,
  username: state => state.user.username,
  type: state => state.user.type,
  supply_info: state => state.user.supply_info,
  priv: state => state.priv.priv,
}
export default getters
