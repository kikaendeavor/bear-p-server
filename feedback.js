var express = require('express');
var Mock = require('mockjs');
var formidable = require("formidable");
var _ = require("lodash");
var router = express.Router();
module.exports = router;


var SetTime = require("./setTime");

router.post('/', function(req, res){
	console.log("api/feedback ~ ");

	var result = {
		status: 1,
		msg:"feedback success."
	};
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		/*fields:{
			"appid":"HBuilder",
			"imei":"867830024509038",
			"p":"a",
			"md":"Mi-4c",
			"app_version":"7.4.0",
			"plus_versin":"1.9.9.25315",
			"os":"5.1.1",
			"net":"3",
			"content":"有bug",
			"contact":"18712341234"
		}
		files:{
			"images1":{
				"size":393517,
				"path":"C:\\Users\\kika\\AppData\\Local\\Temp\\upload_5a8987539862955badc6419718b8dc03",
				"name":"IMG_20161102_214644.jpg",
				"type":"image/jpeg",
				"mtime":"2016-11-03T08:30:06.323Z"
			},
			"images2":{
				"size":203090,
				"path":"C:\\Users\\kika\\AppData\\Local\\Temp\\upload_562daf7bef1ba21731e990977416ff14",
				"name":"IMG_20161013_163303.jpg",
				"type":"image/jpeg",
				"mtime":"2016-11-03T08:30:06.465Z"
			}
		}
		*/

		var images = 0;
		_.forEach(files, function(n, key){
			images++;
		});

		console.log("feedback content: "+ fields.content);
		console.log("feedback contact: "+ fields.contact);
		console.log("images num: "+ images);

		res.send(result);
	});
});