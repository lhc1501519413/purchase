const getters = {
  token: state => state.user.token,
  username: state => state.user.username,
  type: state => state.user.type,
  supply_info: state => state.user.supply_info,
  priv: state => state.priv.priv,
  judgeStatus: state => state.judge.status,
}
export default getters
