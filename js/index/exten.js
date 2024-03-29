	// === 系统初始化 ===
	const name = "FlowLoss";
	const version = "2.8";
	document.getElementById("version").innerText = version;
	
	// === 全局函数初始化 ==
	
	// === 全局数据初始化 ==
	var json_data = localStorage.getItem('flowloss_data');
	if (json_data === null || json_data === undefined || json_data === "object") {
	  var flowloss_data = json_data ? JSON.parse(json_data) : {"set":{},"user":{}};
	  localStorage.setItem('flowloss_data', JSON.stringify(flowloss_data));
	} else {
	  var flowloss_data = json_data ? JSON.parse(json_data) : {"set":{},"user":{}};
	}
	
	
	
	function up_flowloss_data() {
	  localStorage.setItem('flowloss_data', JSON.stringify(flowloss_data));
	  var json_data = localStorage.getItem('flowloss_data');
	  var flowloss_data = json_data ? JSON.parse(JSON.stringify(json_data)) : {"set":{},"user":{}};
	}
	
	// === 客户端更新模块 ===
	function DetectUpdates() {
		try {
			const app_latest_version = "1.6.4";
			const client_latest_version = "1.1.0";
			
			if (compareVersions(app_local_version, app_latest_version) < 0) {
				layer.open({
					type: 1,
					title: '检测更新',
					offset: 'b',
					anim: 'slideUp',
					area: ['100%', '160px'],
					shadeClose: false,
					scrollbar: false,
					content: '<div style="padding: 16px;">检测到新版本，请访问官网 net.u3o.cn/app 下载新版本后使用，官方交流群：139646813</div>'
				});
				return false;
			}
			
			if (compareVersions(client_local_version, client_latest_version) < 0) {
				layer.open({
					type: 1,
					title: '检测更新',
					offset: 'b',
					anim: 'slideUp',
					area: ['100%', '160px'],
					shadeClose: false,
					scrollbar: false,
					content: '<div style="padding: 16px;">检测到新版本，请访问官网 net.u3o.cn/app 下载新版本后使用，官方交流群：139646813</div>'
				});
				return false;
			}
			return true;
		} catch (error) {
		  // 错误处理逻辑
		  return true;
		}
	}
	
	function compareVersions(a, b) {
	  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
	}

	
	// === 弹窗模块 ===
    layui.use('layer', function(){
        const $ = layui.jquery, layer = layui.layer; 
		
		// 获取上次关闭提示框的时间
        // var lastCloseTime_alert = localStorage.getItem('lastCloseTime_alert');

		// 如果上次关闭时间不为空，则计算当前时间与上次关闭时间的时间差
		if (flowloss_data.set.alert) {
			var now = new Date().getTime();
			var diff = now - parseInt(flowloss_data.set.alert);
			var hourDiff = diff / (1000 * 60 * 60);
				
			// 如果时间差大于等于6小时，则弹出提示框并更新上次关闭时间为当前时间
			if (hourDiff >= 6 && DetectUpdates()) {
				showAlert();
				updateLastCloseTime_alert();
			}
		} else {
			// 如果上次关闭时间为空，则直接弹出提示框
			if(DetectUpdates()) showAlert();
		}
		
		// 弹出提示框
		function showAlert() {
		    layer.open({
				type: 1,
				anim: 4,
				title: 'FlowLoss - 重要通知',
				closeBtn: false,
				area: '300px;',
				btn: ['我知道了'],
				moveType: 1,
				scrollbar: false,
				content: '<div style="padding: 40px; line-height: 20px; background-color: #393D49; color: #e2e2e2; font-weight: 300;">尊敬的用户您好，</br></br>&ensp;&ensp;&ensp;最近出现很多仿冒的网站和APP，<span class="text-danger">本工具永久免费使用，请大家谨慎甄别，谨防上当受骗！</span><br><br>感谢大家一直以来对 FlowLoss 的支持和关注。我们一直致力于提供最专业、以及灵活、多元化的网络质量测试工具，并将一如既往地提供免费且优质的服务。衷心感谢您的关注与支持！<!--<br><br><span class="text-danger"><b>最近因为使用了某CDN不稳定导致的FlowLoss不定时无法正常访问，导致大量用户无法使用，对此带来不便，深感抱歉，现已停用该CDN。<b></span>--></div>',
				success: function(layero) {
					var btn = layero.find('.layui-layer-btn');
				}
			});
		}
		
		// 更新上次关闭提示框的时间
		function updateLastCloseTime_alert() {
			var now = new Date().getTime();
			flowloss_data.set.alert = now.toString();
			localStorage.setItem('flowloss_data', JSON.stringify(flowloss_data));
		}
		
		// 关闭提示框后更新上次关闭时间，并设置定时器1小时后再次弹出提示框
		$(document).on('click','.layui-layer-btn0',function(){
			updateLastCloseTime_alert();
			/*setTimeout(function() {
				showAlert();
			}, 60 * 60 * 1000);*/
		});
    });
	
	
	// === 暗黑模块 ===
	if (flowloss_data.set.darktime) {
		var now = new Date().getTime();
		var diff = now - parseInt(flowloss_data.set.darktime);
		var hourDiff = diff / (1000 * 60 * 60);
				
		// 如果时间差小于等于3小时，则设置夜间模式状态
		if (hourDiff <= 3) {
			if(flowloss_data.set.darkmode) {
				document.body.classList.add("dark-mode");
			}
		} else {
			flowloss_data.set.darkmode = false;
			localStorage.setItem('flowloss_data', JSON.stringify(flowloss_data));
		}
	}

	/*const Userdarkmode = document.cookie; //得到Cookie
	if (Userdarkmode.includes('Userdarkmode=1')) {
		const darkmode = localStorage.getItem('darkmode');
		if (darkmode == 1) document.body.classList.add("dark-mode");
	} else {
		if (isNightMode()) {
			// 如果是夜间模式时间，从本地存储中读取并设置夜间模式状态
			const nightMode = localStorage.getItem("darkmode");
			if (nightMode === "true") {
				// 如果本来就是夜间模式，不需要修改
			} else {
				// 否则切换到夜间模式
				document.body.classList.add("dark-mode");
			}
		} else {
			// 如果不是夜间模式时间，保持白天模式状态
			var nightMode = localStorage.getItem("darkmode");
			if (nightMode === "true") {
				// 如果之前是夜间模式，切换到白天模式
				document.body.classList.remove("dark-mode");
				localStorage.setItem('darkmode', '0');
			} else {
				// 否则保持默认白天模式状态
			}
		}
	}

	function isNightMode() {
	  const startHour = 19; // 夜间模式开始时间（24小时制）
	  const endHour = 7; // 夜间模式结束时间（24小时制）
	  const now = new Date(); // 获取当前时间
	  const hour = now.getHours(); // 获取当前小时数
	  return hour >= startHour || hour < endHour; // 如果当前小时数大于等于夜间模式开始时间，或者小于夜间模式结束时间，则返回 true；否则返回 false。
	}

	// 设置设定的小时数列表（24小时制）
	const targetHours = [7, 19];

	// 标记操作是否已经执行过
	let operationExecuted = {};

	// 检测函数
	function checkTime() {
		const Userdarkmode = document.cookie;//得到Cookie
		if (Userdarkmode.includes('Userdarkmode=1'))return;
		// 获取当前时间
		const now = new Date();
		const currentHour = now.getHours();

		// 遍历设定的时间列表
		for (let i = 0; i < targetHours.length; i++) {
			const targetHour = targetHours[i];
			const key = `h${targetHour}`;

			// 判断是否为设定的小时并且未执行对应的操作
			if (currentHour === targetHour && !operationExecuted[key]) {
			  if (targetHour === 7) {
				// 如果是7点，则执行对应的操作1
				localStorage.setItem('darkmode', '0');
				document.body.classList.remove("dark-mode");
				console.log("It's time to execute operation1 at 7 o'clock!");
				// 清除19点操作的标记
				operationExecuted['h19'] = false;
			  } else if (targetHour === 19) {
				// 如果是19点，则执行对应的操作2
				localStorage.setItem('darkmode', '1');
				document.body.classList.add("dark-mode");
				console.log("It's time to execute operation2 at 19 o'clock!");
				// 清除7点操作的标记
				operationExecuted['h7'] = false;
			  }
			  
			  // 标记对应的操作已经执行过
			  operationExecuted[key] = true;
			} else if (currentHour !== targetHour) {
			  // 如果当前时间不是设定的时间，则重置对应的标记
			  operationExecuted[key] = false;
			}
		}
	}

	// 每15分钟调用一次检测函数
	setInterval(checkTime, 15 * 60 * 1000);*/


	// === 客户端模块 ===
	var userAgent = navigator.userAgent.toLowerCase();
	if (userAgent.includes('FlowLossClient')) {
		// 如果浏览器标识中包含 "FlowLossClient"，则可以执行以下代码来隐藏某个标签：
		var elementToHide = document.querySelector('#app_btn'); // 替换为需要隐藏的元素 ID
		if (elementToHide) {
			elementToHide.style.display = 'none';
		}
		var elementToHide = document.querySelector('#brand_figure'); // 替换为需要隐藏的元素 ID
		if (elementToHide) {
			elementToHide.style.display = 'none';
		}
		var elementToHide = document.querySelector('#about_link'); // 替换为需要隐藏的元素 ID
		if (elementToHide) {
			elementToHide.style.display = 'none';
		}
		/*var taotaoLink = document.getElementById("taotao"); // 获取taotao标签
		taotaoLink.setAttribute("href", "https://tao.arsn.cn/index.php?r=index/wap");*/
	}


	// === 首页数据处理模块 ===
	var isMobile = function (){
		var ua = navigator.userAgent;
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
		isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
		isAndroid = ua.match(/(Android)\s+([\d.]+)/);
		return isIphone || isAndroid;
	}
	function adtsadd(uin) {
		var url = isMobile() ? 'mqq://card/show_pslcard?src_type=internal&version=1&uin=' + uin + '&card_type=person&source=sharecard' : 'tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=' + uin + '&website=qq';
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.indexOf('flowlossapp') !== -1) {
			layer.prompt({title: '请联系下方QQ号', value: uin, btn: ['复制', '取消'], formType: 0}, function(value, index, elem){
				elem.select();
				document.execCommand("copy");
				// 弹出提示框
				layer.alert('已复制到剪贴板', {icon: 6});
				layer.close(index);
			});
		} else {
		window.location.href = url;
		}
	}

	function help(){
		layer.open({
			type: 2,
			title: false,
			scrollbar: false,
			shadeClose: true,
			area: ['90%', '90%'],
			content: ['/docs/faq-general.html', 'yes']
		});
	}
	
	function showad(url, pic) {
	  var img = new Image();
	  img.onload = function() {
		var width = this.width;
		var height = this.height;

		var screenWidth = window.innerWidth; // 获取手机屏幕的宽度
		var screenHeight = window.innerHeight; // 获取手机屏幕的高度

		// 计算弹窗的宽度和高度
		var popupWidth = Math.min(width, screenWidth);
		var popupHeight = Math.max(height, screenHeight);

		layer.open({
		  type: 1,
		  title: false,
		  area: [popupWidth + 'px', popupHeight + 'px'],
		  shade: 0.8,
		  closeBtn: 0,
		  shadeClose: true,
		  content: `<a href="${url}" target="_blank" time="2030-12-30"><img src="${pic}" onerror="this.src=\'//jsd.cdn.zzko.cn/gh/arsnyeon/flowloss-cdn-jsd/img/ads-750x220.jpg\'"></a>`
		});

		layer.msg('点击图片跳转广告链接，点击图片其他任意处关闭', {
		  offset: [popupHeight + 'px', '600px'], // 设置垂直偏移量为弹窗的高度
		  time: 8000
		});
	  };
	  img.src = pic;
	}
	
	// === 首页广告模块 ===
	if ($('.slick-slider').length) {
		$('.slick-slider').slick({
			autoplay: true,
			autoplaySpeed: 3000, // 6秒切换一次
			arrows: false, // 是否显示箭头
			dots: false, // 是否显示小圆点
		});
	}
		
	// 获取所有的 img-wrapper 元素
	const imgWrappers = document.querySelectorAll('.img-wrapper');

	// 遍历每个 img-wrapper 元素
	imgWrappers.forEach((imgWrapper) => {
	  // 获取该 img-wrapper 下的第一个 a 标签
	  const firstAnchor = imgWrapper.querySelector('a');

	  if (firstAnchor) {
		// 获取时间属性值
		const timeAttribute = firstAnchor.getAttribute('time');

		if (timeAttribute) {
		  // 将时间属性字符串转换为日期对象
		  const expirationDate = new Date(timeAttribute);
		  const currentDate = new Date();

		  // 判断时间是否过期
		  if (currentDate > expirationDate) {
			// 更改链接地址
			firstAnchor.href = "/co";

			// 更改 img 的图片地址
			const imgElement = firstAnchor.querySelector('img');
			if (imgElement) {
			  imgElement.src = "//jsd.cdn.zzko.cn/gh/arsnyeon/flowloss-cdn-jsd/img/ads-750x220.jpg";
			}
		  }
		}
	  }
	});
	
	// 关闭广告处理
	try {
		const box = document.querySelector('#adts_id');
		const closeButton = document.querySelector('.adts-close');

		closeButton.addEventListener('click', () => {
		  box.style.display = "none";
		  updateLastCloseTime_adts();
		  layer.alert('广告显示已关闭，为保障广告商权益，3小时后恢复显示！', {icon: 7});
		});

		// 如果上次关闭时间不为空，则计算当前时间与上次关闭时间的时间差
		if (flowloss_data.set.adstime) {
			var now = new Date().getTime();
			var diff = now - parseInt(flowloss_data.set.adstime);
			var hourDiff = diff / (1000 * 60 * 60);
				
		// 如果时间差大于等于3小时，则显示广告位
			if (hourDiff >= 3) {
				box.style.display = "inline";
				getadinfo();
			}
		} else {
		// 如果上次关闭时间为空，则显示广告位
			box.style.display = "inline";
			getadinfo();
		}
	} catch (error) {
	  // 错误处理逻辑
	}
	
	// 获取云端广告信息
	function getadinfo() {
		try {
			fetch('https://info.u3o.cn/ajax.php?act=ad')
				.then(response => response.json())
				.then(result => {
					if (result.code == 200) {
						var box = document.getElementById("spread");
						box.querySelector('a').href = result.data.url;
						box.querySelector('img').src = result.data.img;
					}
				});
		} catch (error) {
			console.log(error); // 处理fetch请求本身的错误
		}
	}
	
	// 更新上次关闭广告位的时间
	function updateLastCloseTime_adts() {
		var now = new Date().getTime();
		flowloss_data.set.adstime = now.toString();
		localStorage.setItem('flowloss_data', JSON.stringify(flowloss_data));
	}

	
	// === 好卡无忧模块 ===
	function srclink(id) {
		var srclink = document.getElementById("srclink");
		if (id == 1) {
			srclink.src = "//haokawx.lot-ml.com/Product/Index/93815";
		} else if (id == 2)  {
			layer.open({
				content: '是否进入美化版店铺？',
				btn: ['是', '否'],
				closeBtn: 0,
				move: false, // 禁止移动弹窗
				yes: function(index) {
					layer.close(index);
					window.open("http://card.haokale.com/?id=9480");
				},
				btn2: function(index) {
					layer.close(index);
					srclink.src = "//91haoka.cn/gth/#/minishop?share_id=529192&shop_name=%E6%A3%AE%E9%81%87%E4%BC%98%E5%8D%A1";
				}
			});
		} else if (id == 3)  {
			srclink.src = "https://docs.qq.com/form/page/DUGhXZFJ2T0ZRa2Ry";
		}
	}
	
	function link_kf() {
		layer.open({
			title: '微信号: sreenews',
			btn: '联系客服',
			btnAlign: 'c',
			area: ['300px', '360px'],
			shadeClose: true,
			offset: 'auto',
			content: '<div class="text-center"><p id="btntomsg">长按识别下方二维码添加微信</p><img class="qrcode" style="width: 70%!important" src="//jsd.cdn.zzko.cn/gh/arsnyeon/flowloss-cdn-jsd/img/haoka_kf.png" alt=""></div>',
			yes: function(index, layero) {
				// 点击联系客服按钮后执行的回调函数
				var textToCopy = 'sreenews'; // 复制客服微信号
				copytext(textToCopy);
				document.getElementById('btntomsg').innerText = '客服微信已复制，快去联系吧';
				setTimeout(function() {
					window.open('weixin://'); // 调用打开微信
				}, 1500); // 指定延迟的毫秒数，这里是1秒
				return false; // 阻止弹窗自动关闭
			}
		});
	}
	
	function link_copy() {
		var srclink = document.getElementById("srclink");
		var textToCopy = '【好卡无优】四大运营商流量卡，大流量低月租，0元包邮到家，正规号卡无套路，免费领卡：https://suo.im/mi'; //  + srclink.src
		copytext(textToCopy);
		layer.msg('链接已复制，快分享给你的朋友看看吧！');
	}
	
	function copytext(textToCopy) {
		navigator.clipboard.writeText(textToCopy);
		var tempInput = document.createElement('input');
		tempInput.setAttribute('value', textToCopy);
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand('copy');
		document.body.removeChild(tempInput);
	}

	try {
		const iplun = (new Date().getTime() / (365 * 600000000)).toFixed(1);
		document.querySelector(".tips-label").textContent = `已有${iplun}万人领取`;
		
		const cities = ["北京","上海","广州","深圳","杭州","天津","成都","重庆","南京","苏州","武汉","西安","郑州","长沙","青岛","大连","厦门","福州","济南","沈阳","无锡","宁波","珠海","佛山","东莞","昆明","合肥","哈尔滨","石家庄","太原","南昌","长春","南宁","海口","呼和浩特","兰州","银川","乌鲁木齐","拉萨"];
		const numberSegments = [
		  // 中国移动号段 197(5G)
		  "139", "138", "137", "136", "135", "134", "159", "158", "157", "150", "151", 
		  "152", "188", "187", "182", "183", "184", "178", "147", "172", "195", "198",
		  // 中国联通号段 196(5G)
		  "130", "131", "132", "156", "155", "186", "185", "176", "175", "166", "145",
		  "166", "196",
		  // 中国电信号段 190(5G)
		  "133", "153", "189", "180", "181", "177", "173", "149", "190", "191", "193",
		  "199",
		  // 中国广电号段 192(5G)
		  "192"
		];
		const chineseSurnames = [
		  "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", 
		  "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", 
		  "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", 
		  "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", 
		  "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", 
		  "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳", 
		  "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", 
		  "倪", "汤", "滕", "殷", "毕", "邬", "安", "常", "乐", "于", 
		  "时", "傅", "皮", "卞", "齐", "康", "伍", "余", "元", "卜", 
		  "顾", "孟", "平", "黄", "和", "穆", "萧", "尹", "姚", "邵",
		  "堪", "汪", "祁", "毛", "禹", "狄", "米", "贝", "明", "藏"
		];
		
		const randomTextElements = document.querySelectorAll('.swiper-slide.color_fff');
		
		const newTextList = [];
		randomTextElements.forEach(element => {
		  newTextList.push(`${cities[Math.floor(Math.random() * cities.length)]} ${numberSegments[Math.floor(Math.random() * numberSegments.length)]}****${Math.floor(Math.random() * 9000) + 1000} ${chineseSurnames[Math.floor(Math.random() * chineseSurnames.length)]}${Math.random() < 0.5 ? "先生" : "女士"}已领取`);
		});

		// 循环遍历每个随机文字元素，并将新文字赋值给它们
		randomTextElements.forEach((element, index) => {
		  element.textContent = newTextList[index];
		});
		
		var mySwiper = new Swiper('.swiper', {
			direction: 'vertical', // 垂直切换选项
			loop: true, // 循环模式选项
			autoplay: true,
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
			},
			// 如果需要前进后退按钮
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			// 如果需要滚动条
			scrollbar: {
				el: '.swiper-scrollbar',
			}
		})
	} catch (error) {
	  // 错误处理逻辑
	}
	
	// === waline评论模块 ===
	// waline - A simple comment system with backend support fork from Valine
	// https://waline.js.org/
	
	try {
		Waline.init({
			el: '#waline',
			serverURL: 'https://flowloss-waline.arsn.cn/',
			path: window.location.pathname,
			search: false,
			copyright: false,
			login: 'force',
			emoji: [
				'https://unpkg.com/sticker-heo@2022.7.5/Sticker-100/',
				// https://emoji.shojo.cn/bili/src/小黄脸/
				// https://jsd.cdn.zzko.cn/npm/sticker-heo/Sticker-100/
				// https://gitee.com/GamerNoTitle/Valine-Magic/
			],
			imageUploader: (file) => {
				let formData = new FormData();
				let headers = new Headers();

				formData.append('file', file);
				formData.append("album_id", "18");
				formData.append("permission", "0");
				headers.append('Authorization', 'Bearer 44|coeR1Fr0i3mdM4gGCDA7ooF9KpLQaum3s6JZSaVv');
				headers.append('Accept', 'application/json');

				return fetch('https://www.wmimg.com/api/v1/upload', {
						method: 'POST',
						headers: headers,
						body: formData,
					})
					.then((resp) => resp.json())
					.then((resp) => resp.data.links.url);
			},
			reaction: [
				'https://unpkg.com/sticker-heo@2022.7.5/Sticker-100/鼓掌.png',
				'https://unpkg.com/sticker-heo@2022.7.5/Sticker-100/菜狗.png',
				'https://unpkg.com/sticker-heo@2022.7.5/Sticker-100/正确.png',
				'https://unpkg.com/sticker-heo@2022.7.5/Sticker-100/错误.png',
				'https://unpkg.com/sticker-heo@2022.7.5/Sticker-100/思考.png',
				'https://unpkg.com/sticker-heo@2022.7.5/Sticker-100/睡觉.png',
			],
			locale: {
				reaction0: '鼓励',
				reaction1: '菜狗',
				reaction2: '正确',
				reaction3: '错误',
				reaction4: '思考',
				reaction5: '无聊',
				level0: '炼体',
				level1: '炼气',
				level2: '筑基',
				level3: '金丹',
				level4: '元婴',
				level5: '化神',
				admin: '官方',
				reactionTitle: '就现在，表明你的态度！',
				placeholder: '请文明发言哟 ヾ(≧▽≦*)o\n请勿恶意发送评论，尽量提供详细的信息~\n根据《互联网跟帖评论服务管理规定》文件，将展示您的归属地，并开启强制注册登录后才允许评论',
			},
		});
	} catch (error) {
	  // 错误处理逻辑
	}
	
	// === 开发者版权声明 ==
	function createWaterMark() {
		const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" width="380" height="200"><text y="180" x="0" stroke="#ffffff" stroke-opacity="0.1" fill="#bbbbbb" fill-opacity="0.1" transform="rotate(-10)" font-size="20">FlowLoss net.u3o.cn</text></svg>`;
		return `data:image/svg+xml;base64,${window.btoa(unescape(encodeURIComponent(svgStr)))}`;
	}
	const watermakr = document.createElement("div");
	watermakr.className = "copyrightbg";
	watermakr.style.backgroundImage = `url(${createWaterMark()})`;
	document.body.appendChild(watermakr);
	const config = {
		attributes: true,
		childList: true,
		subtree: true
	};
	const callback = function(mutationsList, observer) {
		for (let mutation of mutationsList) {
			mutation.removedNodes.forEach(function(item) {
				if (item === watermakr) {
					document.body.appendChild(watermakr);
				}
			});
		}
	};
	const targetNode = document.body;
	const observer = new MutationObserver(callback);
	observer.observe(targetNode, config);
	
	if(flowloss_data.set.darkmode) {
		document.querySelector(".copyrightbg").style.display = "none";
	}
	
	// === 开发者信息模块 ===
	
	// 烦人的 浏览器插件，输出一大堆错误信息、、清除掉！	
	console.clear();
	
	// 版权声明
	console.log(`%c \u0046\u006c\u006f\u0077\u004c\u006f\u0073\u0073 ${version} https://net.u3o.cn/`, "color:#fff; background: linear-gradient(55deg, #212121 0%, #212121 40%, #323232 calc(40% + 1px), #323232 60%, #008F95 calc(60% + 1px), #008F95 70%, #14FFEC calc(70% + 1px), #14FFEC 100%);padding:5px; border-radius: 5px;");
	console.error('版权所有，盗我代码还不留原始版权的人是小狗！→_→');