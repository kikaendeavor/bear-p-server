var Mock = require('mockjs');
var express = require('express');
var bodyParser = require('body-parser');
//var url = require('url');
//var q = require('q');
var os = require('os');

var app = express();
app.use(bodyParser.json());
app.listen(3027);

app.use(bodyParser.urlencoded({ extended: true , limit: '2mb'}));
app.use(bodyParser.json({limit: '2mb'}));

app.get('/api/', function (req, res) {
	res.send('Hello World!');
});


var netAddress = os.networkInterfaces();
console.log(JSON.stringify(netAddress, 'utf8'));
/*var ipv4 = netAddress.eth0 ? netAddress.eth0[0].address : netAddress.lo[0].address;*/
var ipv4 = '---';
console.log('server is started @ '+ ipv4 +':3027');


app.use('/api/news', require('./news'));
app.use('/api/notices', require('./notices'));
app.use('/api/news-notices-detail', require('./news-notices-detail'));
app.use('/api/feedback', require('./feedback'));



var SetTime = require("./setTime");

/*返回停车场可用车位数 和 可用级别：
	0 : 剩余车位数<=3 || 占总车位百分比 <= 3%;
	1 : 占总车位百分比 < 10% || 剩余车位数 <= 10;
	2： 车位充足;
*/
app.get('/api/parks-status', function(req, res){
	var params = req.query.parks;
	params = JSON.parse(params);
	/*console.log("type: "+ typeof params);
	console.log("length: "+ params.length);
	console.log(JSON.stringify(params));*/

	var result = {
		status: 1,
		data: []
	};
	for(var i=0; i<params.length; i++){
		var parksStatus = Mock.mock({
			'avaliableLevel|1': [0,1,2], 
			'remain|0-200': 1
		});

		result.data[i] = {
			'point': params[i].point,
			'name': params[i].name,
			'address': params[i].address,
			'avaliableLevel': parksStatus.avaliableLevel,
			'remain': parksStatus.remain
		};
	}

	console.log("api/parks-status success. "+SetTime());

	res.send(result);
});

/*根据停车场坐标查询并返回停车场具体信息*/
app.get('/api/park-detail', function(req, res){
	var params = req.query.coordinate;
	/*params = JSON.parse(params);*/
	
	/*console.log("type: "+ typeof params);
	console.log(JSON.stringify(params));*/

	var result = Mock.mock({
		'status': 1,
		'data': {
			'parkType|1-3': ['CS1','CS2','CS3'],	//车位大小 CS1:普通小型车，CS2:普通大型车，CS3:大型加长车
			'total|100-300': 1,
			'occupied|0-100': 1,
			'openTime|1': ['全天','6:00~22:00', '8:00~18:00'],	//开放时间OT1:全天，OT2:自定义
			'phone': '18792867208',
			'chargingPile': {
				'total|0-10': 1,
				'occupied|0-5': 1
			},
			'feeDescription': ['1小时内免费','6:00~22:00 每小时2元','22:00~次日6:00 每小时1元'],
			//每个停车场可以上传3张照片，供用户预览。不提供则采用默认图片
			'pictures|0-3': ['http://www.hnguotong.com/PostImage/News/20111012054847477.JPG', 'http://img5.imgtn.bdimg.com/it/u=3686552168,2645494585&fm=21&gp=0.jpg', 'http://img3.imgtn.bdimg.com/it/u=56145661,2351876348&fm=21&gp=0.jpg'],	
			'score': Mock.Random.natural(0,5),
			'note': ['最终解释权归停车场所有。']
		}
	});

	console.log("api/park-detail success. "+SetTime());
	res.send(result);
});


app.post('/api/upload', function(req, res){
	var data = req.body;

	res.send();
});