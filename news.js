var express = require('express');
var Mock = require('mockjs');
var router = express.Router();
module.exports = router;

var SetTime = require("./setTime");

/*获取最新消息通知*/
router.get('/new', function(req, res){
	var result = Mock.mock({
		'status': 1,
		'data|10': [{
			'readed': false,
			'id|+1': Mock.Random.increment(),
			'title|1': ['天宫二号发射成功，每笔多送50%积分', '日落西山，积分到账', '尊敬的用户您好！', '恭喜您升级为铜牌用户！'],
			'content|1': ['烤炉模式的城，到黄昏，如同打翻的调色盘一般。有红的、黄的、紫的，相互重叠~','小二已在此等候多时，欢迎您使用小熊停车。祝您一路平安，万事如意。','恭喜您升级为铜牌用户，享受铜牌特权，详情见等级特权说明。'],
			'date|1': ['2016-5-27','2016-6-4', '2016-7-12','2016-8-23','2016-9-15', '2016-10-14']
		}]
	});

	console.log("api/news/new success. "+SetTime());
	res.send(result);
});

/*获取历史消息通知*/
router.get('/old', function(req, res){
	var count = req.query.count;
	console.log("请求的数据条数："+count);

	var result = Mock.mock({
		'status': 1,
		'data|10': [{
			'readed': true,
			'id|+1': Mock.Random.increment(),
			'title|1': ['历史消息1', '历史消息2', '历史消息3', '历史消息4'],
			'content|1': ['三顾茅庐？草船借箭？逗你玩呢~','历史是一面镜子，让你看清长牙五爪的祖先','以史为鉴可以明事理'],
			'date|1': ['2015-5-27','2015-6-4', '2015-7-12','2015-8-23','2015-9-15', '2015-10-14']
		}]
	});

	console.log("api/news/old success. "+SetTime());
	res.send(result);
});