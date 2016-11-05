function setTime(){
	var date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth()+1,
		day = date.getDate(),
		hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds(),
		millisecond = date.getMilliseconds(),

		month = filling(month);
		day = filling(day);
		hour = filling(hour);
		minute = filling(minute);
		second = filling(second);

		time = null;

	time = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second+":"+millisecond;

	return time;
}

function filling(number){
	number =  number < 10 ? "0"+number : number;

	return number;
}

module.exports = setTime;