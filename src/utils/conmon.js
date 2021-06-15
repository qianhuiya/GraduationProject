const formatDate = (date, fmt) => {
	//格式化正常时间
	if (typeof date == 'string') {
		return date;
	}
	if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss';
	if (!date || date == null) return null;
	var o = {
		'M+': date.getMonth() + 1, // 月份
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 小时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds(), // 秒
		'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
		S: date.getMilliseconds() // 毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
	}
	return fmt;
};
const timeDate = (date) => {
	//转换格式化的时间为标准时间
	return new Date(date);
};
const timeDates = (date) => {
	//转换正常时间为时间戳
	return new Date(date).getTime();
};

const genImgUrl = (url, w, h) => {
	//为图片地址加上宽高
	if (!h) {
		h = w;
	}
	if (!w && !h) {
		h = w = 20;
	}
	url += `?param=w${w}h${h}`;
	return url;
};

export default {
	formatDate,
	timeDate,
	timeDates,
    genImgUrl,

};
