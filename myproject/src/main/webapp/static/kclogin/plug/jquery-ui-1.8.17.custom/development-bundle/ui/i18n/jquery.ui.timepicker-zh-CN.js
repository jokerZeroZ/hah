/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Cloudream (cloudream@gmail.com). */
jQuery(function($){
	$.timepicker.regional['zh-CN'] = {
		currentText: '当前',
		closeText: '确定',
		timeText: '时间',
		hourText: '小时',
		minuteText: '分钟',
		secondText: '秒',
		timeOnlyTitle: '时间选择'
	};
	$.timepicker.setDefaults($.timepicker.regional['zh-CN']);
});
