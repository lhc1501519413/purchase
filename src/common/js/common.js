Date.prototype.Format = function(fmt) { //author: f
  var o = {
    "M+": this.getMonth() + 1, //月份
    "D+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Array.prototype.indexOfObj = function(key, val) { // 查找key为val的下标
  for (var i = 0; i < this.length; i++) {
    if (this[i][key] == val) return i;
  }
  return -1;
};
Array.prototype.merge=function(arr,key){ // 合并且根据条件去重
  var arr2=[];
  this.forEach(elem => {
    let index = arr.indexOfObj(key,elem)
    if(arr2.indexOfObj(key,elem)==-1){
      arr2.push(arr[index])
    }
  });
  return arr2
}
Array.prototype.indexOfObjNot = function(key, val) { // 查找key不为val的下标
  for (var i = 0; i < this.length; i++) {
    if (this[i][key] != val) return true;
  }
  return false;
};
Array.prototype.removeObj = function(key, val) {
  var index = this.indexOfObj(key, val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Array.prototype.resort = function() { // 重新排序
  var arr=[]
  for(let i=1;i<=this.length;i++){
    this.some(elem=>{
      if(elem.device_num==i){
        arr.push(elem)
        return true;
      }
    })
  }
  return arr
};

Object.defineProperty(Object.prototype,'indexOfObjValue',{
  value:function(keyName,value){
    for(var key in this){
      if(this[key][keyName]!=value)return true;
      else continue
    }
    return false
  }
})
Object.defineProperty(Object.prototype,"extend",{ // 定义object.prototype.extend
  writable:true,
  enumerable:false,
  configurable:true,
  value:function(o){
    var names = Object.getOwnPropertyNames(o);
    for (let i = 0; i < names.length; i++) {
      if(names[i] in this) continue
      var desc=Object.getOwnPropertyDescriptor(o,names[i])
      Object.defineProperty(this,names[i],desc)      
    }
  }
})
function isEmptyObject(obj) { //判断对象是否为空
  for (var key in obj) {
    return false; //返回false，不为空对象
  }
  return true; //返回true，为空对象
}
function isEmptyArray(arr) { //判断数组是否为空
  if(arr.length!=0){
    return false; //返回false，不为空对象
  }
  return true; //返回true，为空对象
}
function getZero(num) {
  if (num < 10) {
    num = '0' + String(num);
  }
  return num+"";
}
function getUnix(num){
  if ( num >= 10 && num < 100) {
    num = '0' + String(num);
  }else if( num < 10 ){
    num = '00' + String(num);
  }
  return num;
}
// 日期过滤器
function day(num) {
  switch (num) {
    case 0:
      return "周日"
      break;
    case 1:
      return "周一"
      break;
    case 2:
      return "周二"
      break;
    case 3:
      return "周三"
      break;
    case 4:
      return "周四"
      break;
    case 5:
      return "周五"
      break;
    default:
      return "周六"
      break;
  }
}
function toDecimal(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return false;
  }
  var f = Math.round(x * 100) / 100;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + 2) {
    s += '0';
  }
  return s;
}

function isArray(obj){
  return toString.call(obj) === "[object Array]";
}
function add_routes(target,params){
  target.$router.addRoutes(params);
  let routes = JSON.parse(sessionStorage.getItem("routes"));
  if(routes){
    routes.concat(params)
  }else{
    routes = params;
  }
  sessionStorage.setItem("routes",JSON.stringify(routes))
}
function treeSelectFormat(params){
  params.forEach(elem=>{
    elem.value = elem.id||elem.type_id;
    elem.title = elem.name||elem.type_name||elem.level;
    if(elem.child && elem.child.length){
      treeSelectFormat(elem.child)
      elem.children = elem.child;
    }
  })
  return params
}
export default {
  isEmptyObject,
  isEmptyArray,
  getZero,
  day,
  toDecimal,
  getUnix,
  isArray,
  treeSelectFormat,
  add_routes
}