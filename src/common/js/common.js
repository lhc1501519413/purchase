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
Object.defineProperties(Array.prototype, {
  intersect: { // 比较多个数组，返回相同项
    value: function () {
      if (!arguments.length)
        return [];
      var arr1 = this;
      var result = arr2 = null;
      var n = 0;
      while (n < arguments.length) {
        result = [];
        arr2 = arguments[n];
        var l = arr1.length;
        var l2 = arr2.length;
        for (var i = 0; i < l; i++) {
          for (var j = 0; j < l2; j++) {
            if (arr1[i] === arr2[j]) result.push(arr1[i]);
          }
        }
        arr1 = result;
        n++;
      }
      return result.unique();
    },
  },
  diff: { // 比较多个数组，返回不同项
    value: function () {
      var arr1 = this;
      var result,arr2;
      result = arr2 = null;
      var n = 0;
      while (n < arguments.length) {
        result = [];
        arr2 = arguments[n];
        var l = arr1.length;
        var l2 = arr2.length;
        var diff = true;
        for (var i = 0; i < l; i++) {
          for (var j = 0; j < l2; j++) {
            if (arr1[i] === arr2[j]) {
              diff = false;
              break;
            }
          }
          diff ? result.push(arr1[i]) : diff = true;
        }
        arr1 = result;
        n++;
      }
      return result.unique();
    }
  },
  indexOfObj: { // 查找key为val的下标
    value: function (key, val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i][key] == val) return i;
      }
      return -1;
    }
  },
  indexOfObjHas: { // 查找数组是否包含key为val的值
    value: function (key, val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i][key] === val) return true;
      }
      return false;
    }
  },
  removeObj: { // 移除key为val的值
    value: function (key, val) {
      var index = this.indexOfObj(key, val);
      if (index > -1) {
        this.splice(index, 1);
      }
    }
  },
  remove: { // 移除val
    value: function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    }
  },
  merge: { // 获取arr中key值为this中元素的唯一值
    value: function (arr, key) {
      var arr2 = [];
      this.forEach(elem => {
        let index = arr.indexOfObj(key, elem)
        if(arr2.indexOfObj(key, elem) == -1 && index!=-1) arr2.push(arr[index])
      });
      return arr2
    }
  },
  sample: { // 乱序数组，返回n个值，如无n值，随机返回一个值  arr.sort(()=>Math.random()-0.5)
    value: function (n) {
      if (n === void 0) return this[random(this.length - 1)];
      var sample = Array.isArray(this) ? [...this] : Object.assign({}, this);
      var length = sample.length;
      var last = length - 1;
      n = Math.min(n, length);
      for (let index = 0; index < n; index++) {
        var rand = random(index, last);
        [sample[index], sample[rand]] = [sample[rand], sample[index]]
      };
      return sample.slice(0, n);
    }
  },
  flatten: { // 摊平数组
    value: function (shallow = 1) {
      var ret = [];
      var index = 0;
      for (var i = 0; i < this.length; i++) {
        var value = this[i];
        if (isArray(value)) {
          if (shallow -= 1) {
            value = value.flatten(shallow);
          }
          var j = 0,
            len = value.length;
          ret.length += len;
          while (j < len) {
            ret[index++] = value[j++];
          }
        } else {
          ret[index++] = value;
        }
      }
      return ret;
    }
  },
  unique: { // 数组去重
    value: function (cb) {
      var ret = [];
      var target, i = 0;
      for (; i < this.length; i++) {
        var target = isFunction(cb) ? cb(this[i]) : this[i];
        if (ret.indexOf(target) === -1) {
          ret.push(target);
        }
      }
      return ret;
    }
  },
  uniqueMergeObj:{
    value:function(arr2,key){
      let arr1 = [...this,...arr2];
      let newJson = [];
      arr1.forEach(elem1=>{
        let bool = true;
        newJson.forEach(elem2=>{
          if(elem1[key]==elem2[key]){
            bool = false;
          }
        })
        if(bool){
          newJson.push(elem1);
        }
      })
      return newJson
    }
  },
  uniqueObj:{
    value:function(arr2,key){
      let arr1 = this;
      let newJson = [];
      arr1.forEach(elem1=>{
        let bool = true;
        arr2.forEach(elem2=>{
          if(elem1[key]==elem2[key]){
            bool = false;
          }
        })
        if(bool){
          newJson.push(elem1);
        }
      })
      return newJson
    }
  },
  initial: { // 获取倒数第n项之前的数据
    value: function (n = 0) {
      return [].slice.call(this, 0, Math.max(0, this.length - n));
    }
  },
  rest: { // 获取第n项及之后的数据
    value: function (n = 0) {
      return [].slice.call(this, n);
    }
  },
  compact: {	// 去掉数组中所有的假值
    value: function () {
      return this.filter(elem => !!elem === true);
    }
  },
});
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
function isFunction(fn) {
  return toString.call(fn) === "[object Function]";
};
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