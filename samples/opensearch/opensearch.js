var ALY = require('../../index.js');

var opensearch = new ALY.OpenSearch({
  accessKeyId: '在阿里云 opensearch 申请的 accessKeyId',
  secretAccessKey: '在阿里云 opensearch 申请的 secretAccessKey',
  // 参考 opensearch 控制台，获取 endpoint
  endpoint: 'http://opensearch-cn-hangzhou.aliyuncs.com',
  // 这是 opensearch sdk 目前支持最新的 api 版本, 不需要修改
  apiVersion: '2015-01-01'
});

var test_app_name = 'sdk_test';

opensearch.uploadDoc({
  "app_name": test_app_name,
  "action": "push",
  "items": [
    {
      "cmd": "add",
      "timestamp":(new Date()).getTime(),
      // 注意, fields 下面的所有属性必须全部序列化为字符串, 包括整型. 如 4 必须转换为 "4",
      // 否则 sdk 会报验证错误.
      "fields":{
        "id":"12113313131", //更新文档主键，必填
        "title":"This is the title",//add为全字段更新，必须给出所有字段值
        "body":"This is the body"
      }
    },
    {
      "cmd": "add",
      "timestamp":new Date(),
      "fields":{
        "id":"12113933132",
        "title":"This is the title",
        "body":"This is the body"
      }
    }
  ],
  "table_name": "main"
}, function(err, res) {
  console.log(err, res);
});

opensearch.listApp({}, function(err, res) {
  console.log(err, res);
});

opensearch.search({
  'index_name': test_app_name,
  'query': 'default:\'搜索\''
}, function() {
  console.log(arguments);
});
