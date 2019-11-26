// const host = window.location.protocol+"//"+window.location.host + '/bid';
// const baseUrl = 'http://smart.acuit.net/bid/cloud.php'
// const host = window.location.protocol+"//"+window.location.host + '/purchases';
// const baseUrl = 'http://demo.acuit.net/cloud.php';
const host = window.location.protocol+"//"+window.location.host + '/purchase';
const baseUrl = 'http://192.168.2.134/cloud.php';
// const host = window.location.protocol+"//"+window.location.host;
// const baseUrl = process.env.API;
const webSocketUrl = 'ws://127.0.0.1:9797/ws';
var token,realname,username,type,supplyInfo,comInfo,com_info,supply_info;
token=localStorage.getItem('token')||'';
realname=localStorage.getItem('realname')||'';
username=localStorage.getItem('username')||'';
type=localStorage.getItem('type')||'';
supplyInfo= localStorage.getItem('supply_info');
comInfo= localStorage.getItem('com_info');
if(comInfo !== 'undefined'){
  com_info = JSON.parse(comInfo);
}else{
  com_info = '';
}
if(supplyInfo !== 'undefined'){
  supply_info = JSON.parse(supplyInfo);
}else{
  supply_info = '';
}
const RexConfig = {
  RexUserName:/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/,
	RexPassword: /^\w{8,16}$/, //修改密码正则表达式
	RexPhone: /^0?1[3|4|5|8][0-9]-\d{8}$/ // 固定电话
}
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default{
  baseUrl,
  host,
  webSocketUrl,
  RexConfig,
  token,
  realname,
  username,
  type,
  supply_info,
  com_info,
  zh_CN
}