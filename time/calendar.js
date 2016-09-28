(function(window){
	//初始化
	var time,
		date,
		upper,
		everyDay,
		prevMonth,
		nextMonth,
		weekText = ['日','一','二','三','四','五','六'],
		now = 0,
		len = 42,
		toDay = (new (Date)).getDate();
		//封装函数，形参
	function init(timeEle,dateEle,upperEle,everyDayEle,prevMonthEle,nextMonthEle){
		time = timeEle;
		date = dateEle;
		upper = upperEle;
		everyDay = everyDayEle;
		prevMonth = prevMonthEle;
		nextMonth = nextMonthEle;
		//调用时间函数，
		showTime();
		//调用自动切换时间
		autoPlay();
		//调用这个月的函数
		showDate(now,len);
		//调用每个月的函数
		changeMonth(now);
	}
	//自动切换时间
	function autoPlay(){
		setInterval(function(){
			showTime();
		},1000)
	}
	
	//显示时间
	function showTime(){
		//获取本机的日期时间
		var d = new Date();
		//获取年份
		var year = d.getFullYear();
		//获取月份，月份是从0开始，加1
		var month = d.getMonth()+1;
		//获取日期
		var day = d.getDate();
		//获取小时
		var hours = d.getHours();
		//获取分钟
		var minutes = d.getMinutes();
		//获取秒钟
		var seconds = d.getSeconds();
		//获取星期
		var week = d.getDay();
		//时间显示到页面上
		time.innerHTML = toTwo(hours)+':'+toTwo(minutes)+':'+toTwo(seconds);
		//年，月，日 ，星期 显示在页面上
		date.innerHTML = year+'年'+month+'月'+day+'日,星期'+weekText[week];
	}
	//显示每一天
	function showDate(now,len){
		//获取本机的日期时间
		var d = new Date();
		//设置日期
		d.setMonth(d.getMonth()+now);
		//console.log(d.getMonth()+now);
		//获取年份
		var year = d.getFullYear();
		//获取月份,月份是从0开始的
		var month = d.getMonth()+1;
		
		//填充upper的内容
		upper.innerHTML = year+'年'+month+'月';
		//判断这个月的第一天从那个位置开始显示，根据星期来算。
		//如果week是0说明是周日，那么就周日开始显示本月时间，
		d.setDate(1);
		var week = d.getDay();
		if(week == 0){
			week = 7;
		}
		week--;
		//上一个月的天数
		d.setDate(0);
		var prevDaysNum = d.getDate();

		//计算上个月从那一天开始显示；
		var prevMonthStartDays = prevDaysNum - week + 1;
		var createEveryDays = '';
		//创建上一个月的元素
		for(var i=prevMonthStartDays;i<=prevDaysNum;i++){
			
			createEveryDays += '<a href="javascript:;" class="old">'+i+'</a>';
		}
		
		

		//当前月多少天
		d.setMonth(d.getMonth()+now+2);
		
		d.setDate(0);
		var nowDaysNum = d.getDate(); 
		//创建当前月的元素
		for(var i=1;i<=nowDaysNum;i++){

			if(now==0&&toDay == i){
				createEveryDays += '<a href="javascript:;" class="active">'+i+'</a>';	
			}else{
				createEveryDays += '<a href="javascript:;">'+i+'</a>';
			}
		}
		//剩余格子
		len -= week+nowDaysNum;
		//计算下个月
		for(var i=1;i<=len;i++){
			if(now == -1&&i == toDay){
				createEveryDays += '<a href="javascript:;" class="old active">'+i+'</a>';
			}else{
				createEveryDays += '<a href="javascript:;" class="old">'+i+'</a>';
			}
		}

		//把字符串放入页面生成元素
		everyDay.innerHTML = createEveryDays;
		
	}
	function changeMonth(now){
     //点击事件，点击上一个
		prevMonth.onclick = function(){
			now--;
			showDate(now,len);
		};
		//点击事件，点击下一个
		nextMonth.onclick = function(){
			now++;
			showDate(now,len);
		};
	}
	//补零
	function toTwo(n){
		return n<10? '0'+n:''+n;
	}

	//对外提供方法
	window.init = init;
	
	
	
	
})(window);
