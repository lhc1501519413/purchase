exports.install = function (Vue, options) {
  Vue.prototype.doPrint = function (options) {
    //判断iframe是否存在，不存在则创建iframe
    var iframe = document.getElementById("print-iframe");
    if (!iframe) {
      var el = document.querySelector(options);
      iframe = document.createElement('IFRAME');
      var doc = null;
      iframe.setAttribute("id", "print-iframe");
      iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
      document.body.appendChild(iframe);
      doc = iframe.contentWindow.document;
      //这里可以自定义样式
      //doc.write("<LINK rel="stylesheet" type="text/css" href="css/print.css">");
      doc.write('<div>' + el.innerHTML + '</div>');
      doc.close();
      iframe.contentWindow.focus();
    }
    iframe.contentWindow.print();
    if (navigator.userAgent.indexOf("MSIE") > 0) {
      document.body.removeChild(iframe);
    }
  }
};