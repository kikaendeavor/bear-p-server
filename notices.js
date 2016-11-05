var express = require('express');
var Mock = require('mockjs');
var router = express.Router();
module.exports = router;

var SetTime = require("./setTime");


/*获取最新公告*/
router.get('/new', function(req, res){
	var result = Mock.mock({
		'status': 1,
		'data|10': [{
			'id|+1': Mock.Random.increment(),
			'title|1': ['小熊停车完成A轮融资', '系统升级公告', '股东大会', '积分规则调整'],
			'content|1': ['资本市场风起云涌，投资、并购此起彼伏。小熊停车始终坚持以用户为本，不断提高服务水平，优化产品设计，提高用户体验。','为了支持公司业务发展，机房扩容，计划于2016-10-28 3:00进行，届时系统可能会出现服务延时，请您谅解','计划于2016-10-14日召开股东代表大会。']
		}]
	});

	console.log("api/notice/new success. "+SetTime());
	res.send(result);
});

/*获取历史公告*/
router.get('/old', function(req, res){
	var count = req.query.count;
	console.log("请求的数据条数："+count);

	var result = Mock.mock({
		'status': 1,
		'data|10': [{
			'id|+1': Mock.Random.increment(),
			'title|1': ['历史消息one', '历史消息two', '历史消息three', '历史消息four'],
			'content|1': ['历史上恐龙是怎么灭绝的？恐龙自己都不知道。','故事讲了一遍又一遍，事故发生一次又一次','历史离你太久远了，他不想见你。']
		}]
	});

	console.log("api/notice/old success. "+SetTime());
	res.send(result);
});