// 注意，数据文件中不能有注释
// data 数据 请用module.exports = `` 导出
// guojihua 数据 请用 module.exports = ({}) 导出
// 数据都是键值对：如 
// module.exports = ({ hello : '你好', hello : 'Hell0', hello: '葡语'}); guojihua.js
// module.exports = ` hello : '你好', hello : 'Hell0', hello: '葡语' `  data.js

var data = require('./guojihua');
var dataValue = require('./data');
var fs = require('fs');
var ch = [];
var puyu = [];
var eng = [];
var fied = [];


var reg = /(([A-Z\u4e00-\u9fa5]+)([\u4e00-\u9fa5]+)((\\|\,|\、|\，|\。|\.|\/|\【|\】|\:|[A-Z]|[0-9])*([\u4e00-\u9fa5]+)*)*)/g;

var getValue = dataValue.match(reg);

// 葡语
for (var ka in data) {
  var pram = {};
  pram[ka] = data[ka]
  fied.push(ka);
  puyu.push(pram);
}

// 中文
for (var i = 0; i < fied.length; i++) {
  var pp = {};
  pp[fied[i]] = getValue[i];
  ch.push(pp);
}
// 英语
for (var i = 0; i < fied.length; i++) {
  var pp = {};
  pp[fied[i]] = getValue[i];
  eng.push(pp);
}

// 中文
var write = [];
ch.forEach((o) => {
  for (var jj in o) {
    var value = `"${jj}": "${o[jj]}",`
  }
  write.push(value)
});
var str = write.join("\n");

// 葡语
var writePu = [];
puyu.forEach((p) => {
  for (var ss in p) {
    var valuePu = `"${ss}": "${p[ss]}",`
  }
  writePu.push(valuePu)
});
var strPu = writePu.join("\n");
// 英语
var writeEn = [];
eng.forEach((p) => {
  for (var ss in p) {
    var valueEn = `"${ss}": "${p[ss]}",`
  }
  writeEn.push(valueEn)
});
var strEn = writePu.join("\n");


fs.writeFile('zh.js', str, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("中文翻译文件数据写入成功！");
});
fs.writeFile('pu.js', strPu, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("葡语翻译文件数据写入成功！");
});
fs.writeFile('en.js', strEn, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("英语翻译文件数据写入成功！");
});
