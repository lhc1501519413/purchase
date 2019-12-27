const host = location.protocol+"//"+location.host;
const baseUrl = location.protocol+"//"+location.host+"/cloud.php"
// const baseUrl = process.env.API;
const webSocketUrl = 'ws://127.0.0.1:9797/ws';
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
  zh_CN
}