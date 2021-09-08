
var netUserId = $.session.get('netLoginId');
var id = netUserId.split('"')[1]
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var SEARCH = tools.queryString().search || 'air';
var CONTINUEBOOK = tools.queryString().continue

var TAorderNo = $.session.get('TAorderNo');
var TAnumber = $.session.get('TAnumber');
var TAnumberIndex = $.session.get('TAnumberIndex');
// TA单，时间最小值，最大值
var TAminDate = 0,
	TAmaxDate = 365

if (TAnumber != undefined && TAnumber != "" && $.session.get('goOnBooktravelInfo') != undefined && $.session.get('goOnBooktravelInfo') != "") {
	var goOnBooktravelInfo = JSON.parse($.session.get('goOnBooktravelInfo'));
	TAminDate = Dateformat(goOnBooktravelInfo.starTime.split(" ")[0], 0)
	TAmaxDate = goOnBooktravelInfo.endTime.split(" ")[0]
}

// 设置当前点击是订单还是待审核单
var btnIndex = 1
//防抖函数
function debounce(func, delay) {
	var delay = delay || 200;
	var timeout = null;
	return function () {
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			func.apply(this, arguments);
		}, delay);
	};
}
//时间点为全天时,±几小时置灰
// 国内票
function GrayDepartPlusMinus() {
	if ($('#domDepartureSelect').val() == 'all') {
		$('#DepartPlusMinus').attr('disabled', 'disabled')
	} else {
		$('#DepartPlusMinus').removeAttr('disabled')
	}
}

function GrayreturnPlusMinus() {
	if ($('#domReturnSelect').val() == 'all') {
		$('#returnPlusMinus').attr('disabled', 'disabled')
	} else {
		$('#returnPlusMinus').removeAttr('disabled')
	}
}
// 国际票
function GrayIntelDepartPlusMinus() {
	if ($('#intlDepartureSelect').val() == 'all') {
		$('#DepartPlusMinusintel').attr('disabled', 'disabled')
	} else {
		$('#DepartPlusMinusintel').removeAttr('disabled')
	}
}

function GrayIntelreturnPlusMinus() {
	if ($('#intlReturnSelect').val() == 'all') {
		$('#returnPlusMinusintel').attr('disabled', 'disabled')
	} else {
		$('#returnPlusMinusintel').removeAttr('disabled')
	}
}
function renderSearchContainer(state) {
	SEARCH = state
	searchBody()
}
//语言转换
function get_lan(m) {
	//获取文字
	var lan = $.session.get('obtLanguage'); //语言版本
	//选取语言文字
	switch (lan) {
		case 'CN':
			var t = cn[m];
			break;
		case 'EN':
			var t = en[m];
			break;
		default:
			var t = cn[m];
	}
	//如果所选语言的json中没有此内容就选取其他语言显示
	if (t == undefined) t = cn[m];
	if (t == undefined) t = en[m];
	return t;
}
//中英文对象
var cn = {
	"tripRemind": "您有未完成的行程,是否继续?",
	"appleSearchRemind": "Hi Apple Travelers,\nPlease be aware that instant ticketing is now applicable for all online bookings.Please click OK to select your flights.",
	"appleIntlRemind": "国际票单程价格较贵，请确认是否继续查询？",
	'searchBody': {
		'airDom': '国内机票',
		'airIntl': '国际机票',
		'hotel': '酒店',
		'train': '火车',
		'car': '租车',
		'visa': '签证',
		'oneWay': '单程',
		'roundTrip': '往返',
		"multiple": "多段",
		'from': '出发城市',
		'to': '到达城市',
		'fromPlaceholder': '出发城市',
		'toPlaceholder': '到达城市',
		'departure': '出发日期',
		'return': '回程日期',
		'departureDate': '出发日期',
		'returnDate': '回程日期',
		'departureTime': '出发时间',
		'returnTime': '回程时间',
		'cabin': '舱位类型',
		'search': '搜索',
		'locationPlaceholder': '选择或填写位置',
		'cabins': {
			// 'cabin1': '不限',
			'cabin1': '全部',
			'cabin2': '经济舱',
			'cabin3': '公务舱',
			'cabin4': '头等舱',
			'cabin5': '公务舱/头等舱',
			'cabin6': "超级经济舱",
		},
		'switch': '换',
		'trainNo': '车次查询',
		'trainNoText': '请输入查询车次',
		'hotelCity': '入住城市',
		'hotelCityInput': '请输入入住城市',
		'hotelCheckInDate': '入住日期',
		'hotelCheckOutDate': '离店日期',
		'hotelPrice': '金额',
		'all': '全部',
		'allStar': '不限',
		"star12": "二星级及以下/经济",
		"star3": "三星级/舒适",
		"star4": "四星级/高档",
		"star5": "五星级/奢华",
		'hotelAddress': '位置',
		'hotelRank': '酒店星级',
		'hotelKeyWords': '关键字',
		'hotelKeyInput': '(选填)酒店名/地标/商圈/地铁线',
		'keyWordRemind': '请先选择城市',
		'isDirect': '仅查询直飞',
		'codeShare': '代码共享航班',
		'addAirIntl': "添加航程",
		'multipleRemind': "请先填写完",
		'domHotel': "国内",
		'intlHotel': "国际",
		'allDay': "全天",
		'addTransit': "指定转机",
		'transit': "转机城市",
		'transitRemind': "转机城市(选填)",
		'carFrom': "取车地点",
		'carTO': "还车地点",
		'carFromDate': "取车日期",
		'carToDate': "还车日期",
		'carCompany': "租车公司",
		'openMapHotel': "地图模式"
	},
	'keyWordBody': {
		// 'hotel': '推荐酒店',
		'hotel': '热门酒店',
		'brand': '品牌',
		'district': '行政区',
		'commercial': '商圈',
		'extCommercial': '附属商圈',
		'keywordHotel': '热门',
		'keywordBrand': '品牌',
		'keywordDistrict': '行政区',
		'keywordCommercial': '商圈',
		'keywordExtCommercial': '附属商圈',
	},
	'searchRemind': '请正确填写！',
	'tableRemind': '您暂无有效订单!',
	'tableRemind2': '您暂无待审核订单!',
	'table': {
		'myOrders': '我的订单',
		'pendingApproval': '待审核订单',
		'more': '更多订单',
		'type': '类型',
		'orderNumber': '订单号',
		'traveler': '旅客',
		'roundTime': '行程时间',
		'shift': '班次',
		'price': '价格',
		'route': '行程',
		'status': '订单状态',
		"approval": "提交审核",
		"applyDate": "申请时间",
		"operation": "操作",
		"agree": "同意",
		"deny": "拒绝",
		"myTrips": '我的行程',
		"taTab": "审批单",
		"taTabPfizer": "会议信息",
	},
	'expiration': '证件过期提醒',
	'footer': {
		'industryNews': '业界动态',
		'companyNews': '公司新闻',
		'WeChat': '微信公众号',
		'APP': 'APP下载',
		'leanMore': 'Want to learn more?',
		'scan': 'Scan the underlying code for the WeChat official account or download APP'
	},
	'accountRemind': '账号过期，请重新登陆',
	'contactType': "技术支持，请联系 BCD helpdesk：021-61327099 &nbsp;9:00-18:00(工作日)",
	'mapboxSelect': "Select this location",
	'mapboxCancel': "Cancel",
	'air': '机票',

}
var en = {
	"tripRemind": "You have unfinished trip, do you want to continue?",
	"appleSearchRemind": "Hi Apple Travelers,\nPlease be aware that instant ticketing is now applicable for all online bookings.Please click OK to select your flights.",
	"appleIntlRemind": "The fare of one-way ticket is expensive, would you like to continue?",
	'searchBody': {
		'airDom': 'Air Domestic',
		'airIntl': 'Air International',
		'hotel': 'Hotel',
		'train': 'Rail',
		'car': 'Car',
		'visa': 'Visa',
		'oneWay': 'One-way',
		'roundTrip': 'Round-trip',
		"multiple": "Multiple",
		'from': 'From',
		'to': 'To',
		'fromPlaceholder': 'Departure',
		'toPlaceholder': 'Arrival',
		'departure': 'Departure',
		'arrival': 'Arrival',
		'departureDate': 'Departure',
		'returnDate': 'Return',
		'departureTime': 'Dep Time',
		'returnTime': 'Return Time',
		'cabin': 'Class',
		'search': 'Search',
		'cabins': {
			'cabin1': 'All Classes',
			'cabin2': 'Economy',
			'cabin3': 'Business',
			'cabin4': 'First',
			'cabin5': 'Business/First',
			'cabin6': "Economy Extra",
		},
		'switch': 'Switch',
		'trainNo': 'Train no.',
		'trainNoText': 'e.g K8410',
		'hotelCity': 'Destination',
		'hotelCityInput': 'Please enter the city for checking in.',
		'locationPlaceholder': 'Select or input location',
		'hotelCheckInDate': 'Check-in',
		'hotelCheckOutDate': 'Check-out',
		'hotelPrice': 'Price',
		'all': 'All',
		'allStar': 'ALL',
		"star12": "1-star&2-star/economy",
		"star3": "3-star/comfortable",
		"star4": "4-star/upscale",
		"star5": "5-star/deluxe",
		'hotelAddress': 'Location',
		'hotelRank': 'Rank',
		'hotelKeyWords': 'Key Words',
		'hotelKeyInput': 'Hotel Name/Landmark/Business Circle/Metro Line',
		'keyWordRemind': 'Please choose the city first.',
		'isDirect': 'Direct Flight',
		'codeShare': 'Codeshare',
		'addAirIntl': "Add Segment",
		'multipleRemind': "Please fill out first.",
		'domHotel': "Domestic",
		'intlHotel': "International/Regional",
		'allDay': "All Day",
		'addTransit': "Add Transit",
		'transit': "Transit",
		'transitRemind': "Transit(Optional)",
		'carFrom': "Pick-up",
		'carTO': "Drop-off",
		'carFromDate': "Pick-up Date",
		'carToDate': "Drop-off Date",
		// 'carCompany': "Car Company",
		'carCompany': "Car Rental Company",
		'openMapHotel': "Show on map"
	},
	'keyWordBody': {
		// 'hotel': 'Recommended Hotel',
		'hotel': 'Top hotels',
		'brand': 'Brand',
		'district': 'District',
		'commercial': 'Business Area',
		'extCommercial': 'Land Mark',
		'keywordHotel': 'Top',
		'keywordBrand': 'Brand',
		'keywordDistrict': 'District',
		'keywordCommercial': 'Business Area',
		'keywordExtCommercial': 'Land Mark',
	},
	'searchRemind': 'Please fill in correctly!',
	'tableRemind': 'You have no valid orders !',
	'tableRemind2': 'You have no pending approvals !',
	'table': {
		'myOrders': 'My Orders',
		'pendingApproval': 'Pending Approval',
		'more': 'More',
		'type': 'Type',
		'orderNumber': 'Order Number',
		'traveler': 'Traveler',
		'roundTime': 'Travel Time',
		'shift': '',
		'price': 'Price',
		'route': 'Route',
		'status': 'Status',
		"approval": "Submit Audit",
		"applyDate": "Apply Date",
		"operation": "Approval",
		"agree": "Approve",
		"deny": "Reject",
		"myTrips": 'My Trips',
		"taTab": "Application Form",
		"taTabPfizer": "Meeting information",
	},
	'expiration': 'Expiration',
	'footer': {
		'industryNews': 'Industry News',
		'companyNews': 'Company News',
		'WeChat': 'Official Account',
		'APP': 'App Download',
		'leanMore': 'Want to learn more?',
		'scan': 'Scan the underlying code for the WeChat official account or download APP'
	},
	'accountRemind': 'Account expired, please re login.',
	'contactType': "For technical support, please contact BCD helpdesk：021-61327099 &nbsp;9:00-18:00(working day)",
	'mapboxSelect': "Select this location",
	'mapboxCancel': "Cancel",
	'air': 'Air',

}


if (ProfileInfo.onlineStyle == "APPLE") {
	cn.searchBody.hotelKeyInput = "酒店名/苹果办公点";
	en.searchBody.hotelKeyInput = "Hotel name or Apple point of interest";
	cn.appleIntlRemind = "对于国际票的行程的最佳运价，您应该选择“往返”。";
	en.appleIntlRemind = "For international return trips you should select 'Round-trip' for the best fares.";
	cn.contactType =
		"For technical support, please contact travel.china@apple.com <br>For reservation support, please contact travel.china@apple.com";
	en.contactType =
		"For technical support, please contact travel.china@apple.com <br>For reservation support, please contact travel.china@apple.com";
}
if (ProfileInfo.onlineStyle == "BCD") {
	cn.searchBody.airDom = "国内";
	en.searchBody.airDom = "Dom";
	cn.searchBody.airIntl = "国际/港澳台";
	en.searchBody.airIntl = "Rgl/Intl";
}
// 日期格式，获取几天后的日期
function Dateformat(dateTime, AddDayCount) {
	dateTime = dateTime.replace(/-/g, '/')
	var dd = new Date(dateTime);
	if (dd.getTime() < new Date().getTime()) {
		dd = new Date()
	}
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	// dd.setDate(dd.getDate()); 
	var y = dd.getFullYear();
	var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
	return y + "-" + m + "-" + d;
}

$(function () {

	if ($.session.get('goOnBookOrderNo')) {
		$.session.remove('goOnBookOrderNo');
	}
	if ($.session.get('goOnBookHotelInfo')) {
		$.session.remove('goOnBookHotelInfo');
	}
	showContent(); //内容展示
	showCompanyNews(ProfileInfo.companyId); //公司新闻
	searchBody(); //搜索部分
	myOrderTableInfo(); //我的订单
	GetCompanyImageInfos()//广告图片
	/*2020-10-9*/
	if (ProfileInfo.PointInfo && ProfileInfo.PointInfo.PointRuleList) {
		ProfileInfo.PointInfo.PointRuleList.map(function (item) {
			if (item.PointTypeId == 1 && (item.RegionType == "ALL" || item.RegionType == "D") && (item.PointServiceType == 0 || item.PointServiceType == 1)) {
				if (obtLanguage == "CN") {
					$(".domPointsRemind").text("ⓘ 提前" + item.RuleValue + "天预订，您将获得" + item.PointValue + "积分");
					$(".domPointsRemind").removeClass("hide");
				} else if (obtLanguage == "EN") {
					$(".domPointsRemind").text("ⓘ Try to book " + item.RuleValue + " days in advance, to earn " + item.PointValue + " points");
					$(".domPointsRemind").removeClass("hide");
				}
			}
		})
		ProfileInfo.PointInfo.PointRuleList.map(function (item) {
			if (item.PointTypeId == 1 && (item.RegionType == "ALL" || item.RegionType == "I") && (item.PointServiceType == 0 || item.PointServiceType == 1)) {
				if (obtLanguage == "CN") {
					$(".intlPointsRemind").text("ⓘ 提前" + item.RuleValue + "天预订，您将获得" + item.PointValue + "积分");
					$(".intlPointsRemind").removeClass("hide");
				} else if (obtLanguage == "EN") {
					$(".intlPointsRemind").text("ⓘ Try to book " + item.RuleValue + " days in advance, to earn " + item.PointValue + " points");
					$(".intlPointsRemind").removeClass("hide");
				}
			}
		})
	}
	/*end*/

})
/*首页选择审批单*/
if (ProfileInfo.HasTravelRequest && ProfileInfo.IndexTravelRequest && !TAnumber && !$.session.get('TAsearchOnly')) {
	indexTANumber();
} else if (ProfileInfo.HasTravelRequest && !ProfileInfo.IndexTravelRequest) {

}

function indexTANumber() {
	if ($.session.get('obtLanguage') == "CN") {
		var popTittle = ProfileInfo.ChainCode === "Pfizer China" ? "查看您的会议信息" : "请选择您的申请单";
		var travelApplication = "差旅申请单";
		var meetingApplication = "会议申请单";
		var applicationRemind = "当前没有审批单";
		var select = '选择';
		var searchOnly = '仅查询';
		var search = '搜索';
		var customer = '已选出行员工:';
		var selectPassengerRemind = '查找代订旅客 可输入姓名';
	} else {
		var popTittle = ProfileInfo.ChainCode === "Pfizer China" ? "Please select your meeting" : "Please select the application form";
		var travelApplication = "Travel Application Form";
		var meetingApplication = "Meeting Application Form";
		var applicationRemind = "Currently there is no travel request.";
		var select = 'Select';
		var searchOnly = 'Search Only';
		var search = 'Search';
		var customer = 'Application Form of:';
		var selectPassengerRemind = 'Enter First Name to search traveler';
	}
	var requestForm = [], meetingForm = []

	$("body").append('\
		<div class="requestCover">\
			<div class="travelRequestPop">\
				<div class="travelRequestPopTittle">\
					' + popTittle + '\
					<div id="closeTApop" ></div>\
				</div>\
				<div class="TAchoosePassenger"></div>\
				<div class="travelRequestListBox">\
					<div class="passengerName"></div>\
					<ul class="travelList">\
						<li class="selected" type="travel">' + travelApplication + '</li>\
						<li type="meeting">' + meetingApplication + '</li>\
					</ul>\
					<div class="travelApplicationList"></div>\
					<div class="travelApplicationBtn">' + searchOnly + '</div>\
				</div>\
			</div>\
		</div>\
		')
	$("#closeTApop").unbind("click").click(function () {
		$(".requestCover").remove();
	})
	function appendApplicationForm(arr) {
		if (arr.length == 0) {
			$(".travelApplicationList").append('\
				<img src="/images/Aus/common/pic_noapplication.png" />\
				<p class="applicationRemind">' + applicationRemind + '</p>'
			)
			$('.travelApplicationList').addClass('noPic')
			$('.travelApplicationBtn').hide()
			return
		} else {
			$('.travelApplicationList').removeClass('noPic')
			$('.travelApplicationBtn').show()

		}
		arr.map(function (item) {
			$(".travelApplicationList").append('\
			<div class="applicationLi">\
				<div class="applicationLi-travelRequestNo">' + item.TravelRequestNo + '</div>\
				<div class="applicationLi-time">\
					<div>' + item.StartTime + '~' + item.EndTime + '</div>\
					<div> '+ item.TravelRequestName + '</div>\
				</div>\
				<div class="applicationLi-city">' + item.CityInfos[0].OrgCity + '~' + item.CityInfos[0].DstCity + '</div>\
				<div class="selectApplication" TravelRequestNo="' + item.TravelRequestNo + '">' + select + '</div>\
			</div>\
		')
		})
	}
	$('.travelList li').unbind('click').click(function () {
		$(this).siblings().removeClass('selected')
		$(this).addClass('selected')
		$('.travelApplicationList').html('')
		switch ($(this).attr('type')) {
			case 'travel':
				appendApplicationForm(requestForm);
				break;
			case 'meeting':
				appendApplicationForm(meetingForm);
				break;
		}
	})
	$(".travelApplicationBtn").unbind("click").click(function () {
		$.session.remove("TAnumber");
		$.session.remove("TAnumberIndex");
		$.session.remove("TACustomerId");
		$.session.set('TAsearchOnly', '1');
		location.reload();
	})
	if ($.session.get("TACustomerId")) {
		var TACustomerId = $.session.get("TACustomerId").split(",")[0];
		customerTARequest(TACustomerId);
	} else {
		customerTARequest(ProfileInfo.ID);
	}

	function customerTARequest(customerId) {
		$('body').mLoading("show");
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/SystemService.svc/GetCustomerTravelRequestPost",
				jsonStr: '{"customerId":"' + customerId + '","id":' + netUserId + ',"language":"' + $.session.get('obtLanguage') +
					'"}'
			},
			success: function (data) {
				$('body').mLoading("hide");
				var res = JSON.parse(data);
				$(".travelApplicationList").html('');
				if (res.message || res.customerTRs.length == 0) {
					appendApplicationForm([])

					meetingForm.length = 0
					requestForm.length = 0
				} else if (res.customerTRs.length != 0) {
					$('.travelApplicationList').removeClass('noPic')
					res.customerTRs.map(function (item) {
						if (item.RequestType === '3') {
							meetingForm.push(item)
						} else {
							requestForm.push(item)
						}
					})
					appendApplicationForm(requestForm)

					$(".selectApplication").unbind("click").click(function () {
						var TravelRequestNo = $(this).attr("TravelRequestNo");
						if ($(".TAselectedCustomer").attr("CustomerID") != "") {
							$.session.set('TACustomerId', $(".TAselectedCustomer").attr("CustomerID") + ',' + $(".TAselectedCustomer").attr("CompanyID") + ',' + $(".TAselectedCustomer").attr("employeeName"))
						} else {
							$.session.remove("TACustomerId");
						}

						$.session.set('TAnumber', TravelRequestNo);
						TAnumber = TravelRequestNo;
						$.session.remove("TAsearchOnly");
						location.reload();
					})
					if (ProfileInfo.HasTravelRequest && !ProfileInfo.IndexTravelRequest) {
						$(".selectApplication").remove();
						$(".selectApplication").unbind("click");
					}
				}

			},
			error: function () {
				// alert('fail');
			}
		});
	}

	TAchooseCustomer('', function (data) {
		var res = JSON.parse(data);
		console.log(res);
		if (res.length > 1) {
			var profileName = obtLanguage == "CN" ? ProfileInfo.CustomerCN : ProfileInfo.CustomerEN;
			$(".TAchoosePassenger").html('\
				<div class="selectPassengerBody">\
					<div class="selectPassengerBody-inputBox">\
						<input type="text" class="selectPassengerInput" autocomplete="off" placeholder="'+ selectPassengerRemind + '">\
						<div class="selectPassengerArrow"><img src="/images/Aus/common/icon_pulldown.png" /></div>\
					</div>\
					<div class="selectPassengerSearch">'+ search + '</div>\
					<div class="selectPassengerList autoScrollY"></div>\
				</div>\
			')
			$('.passengerName').html('\
				<div class="TAchoosePassenger-wrapper">\
					' + customer + '\
					<span class="TAselectedCustomer" CompanyID="' + ProfileInfo.CompanyID + '" CustomerID="' + ProfileInfo.ID + '" employeeName="' + ProfileInfo.CustomerCN + '">' + profileName + '</span>\
				</div>')
			res.map(function (item) {
				var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
				if ($.session.get("TACustomerId")) {
					var TACustomerId = $.session.get("TACustomerId").split(",")[0];
					if (item.ID == TACustomerId) {
						$(".TAselectedCustomer").text(name);
						$(".TAselectedCustomer").attr("CompanyID", item.CompanyID);
						$(".TAselectedCustomer").attr("CustomerID", item.ID);
						$(".TAselectedCustomer").attr("employeeName", item.NameCN);
					}
				}
				$(".selectPassengerList").append('\
					<div class="selectPassengerLi ellipsis" CompanyID="'+ item.CompanyID + '" searchId="' + item.ID + '" employeeName="' + item.NameCN + '" name="' + name + '">' + name + '(' + item.Email + ')' + '</div>\
				')
			})
			clickPassengerLi();
			$(".selectPassengerArrow").unbind("click").click(function () {
				if (!$(this).attr("spread") || $(this).attr("spread") == "no") {
					$(".selectPassengerList").css("display", "block");
					$(this).attr("spread", "yes");
					$('.selectPassengerList').mLoading("show");
					TAchooseCustomer('', function (data) {
						var res = JSON.parse(data);
						console.log(res);
						if (res.length > 1) {
							res.map(function (item) {
								var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
								$(".selectPassengerList").append('\
									<div class="selectPassengerLi ellipsis" CompanyID="'+ item.CompanyID + '" searchId="' + item.ID + '" employeeName="' + item.NameCN + '" name="' + name + '">' + name + '(' + item.Email + ')' + '</div>\
								')
							})
							$('.selectPassengerList').mLoading("hide");
							clickPassengerLi();
						}
					});
				} else if ($(this).attr("spread") == "yes") {
					$(".selectPassengerList").css("display", "none");
					$(this).attr("spread", "no");
				}
			})
			$('.selectPassengerInput').bind('keypress', function (event) {
				if (event.keyCode == "13") {
					$(".selectPassengerSearch").click();
				}
			});
			$(".selectPassengerSearch").unbind("click").click(function () {
				$(".selectPassengerList").css("display", "block");
				$(".selectPassengerArrow").attr("spread", "yes");
				var nameLike = $(".selectPassengerInput").val();
				$('.selectPassengerList').mLoading("show");
				TAchooseCustomer(nameLike, function (data) {
					var res = JSON.parse(data);
					console.log(res);
					if (res.length >= 1) {
						res.map(function (item) {
							var name = obtLanguage == "CN" ? item.NameCN : item.NameEN;
							$(".selectPassengerList").append('\
								<div class="selectPassengerLi ellipsis" CompanyID="'+ item.CompanyID + '" searchId="' + item.ID + '" employeeName="' + item.NameCN + '" name="' + name + '">' + name + '(' + item.Email + ')' + '</div>\
							')
						})
						$('.selectPassengerList').mLoading("hide");
						clickPassengerLi();
					}
				});
			})
		} else {
			//如果没有代订权限，或者有待定权限但是返回的为空
			var profileName = obtLanguage == "CN" ? ProfileInfo.CustomerCN : ProfileInfo.CustomerEN;
			$(".TAchoosePassenger").html('')
			$('.passengerName').html('\
				<div class="TAchoosePassenger-wrapper">\
					' + customer + '\
					<span class="TAselectedCustomer" CompanyID="" CustomerID="" employeeName="">' + profileName + '</span>\
				</div>')
			$('.TAchoosePassenger').css({ "position": "absolute", "left": "-20000px", "opacity": "0" })
		}
	});
	function clickPassengerLi() {
		$(".selectPassengerLi").unbind("click").click(function () {
			var customerId = $(this).attr("searchId");
			$(".TAselectedCustomer").text($(this).attr("name"));
			$(".TAselectedCustomer").attr("CompanyID", $(this).attr("CompanyID"));
			$(".TAselectedCustomer").attr("CustomerID", $(this).attr("searchId"));
			$(".TAselectedCustomer").attr("employeeName", $(this).attr("employeeName"));
			customerTARequest(customerId);
			$(".selectPassengerList").css("display", "none");
		})
	}
	if (ProfileInfo.HasTravelRequest && !ProfileInfo.IndexTravelRequest) {
		$(".travelApplicationBtn").remove();
	}
}

function TAchooseCustomer(nameLike, callback) {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/QueryMatchedPassengersPost",
			jsonStr: '{"nameLike":"' + nameLike + '","id":' + netUserId + ',"language":"' + $.session.get('obtLanguage') + '"}'
		},
		success: function (data) {
			$('body').mLoading("hide");
			$(".selectPassengerList").html('');
			callback(data);
		},
		error: function () {
			// alert('fail');
		}
	});
}
/*end*/

//内容展示
function showContent() {
	//<img src="../index/images/bgImg.jpg" class="bgImg">
	// 19-10-29改
	var mailcontact1 = "For technical support, please contact ";
	var mailcontact2 = "For reservation support, please contact ";
	var mailAdress1 = 'travel.china@apple.com'
	var mailAdress2 = 'travel.china@apple.com'
	var appleStr = '<span class="footerContact">' + get_lan("contactType") + '</span>'

	if (ProfileInfo.onlineStyle == "APPLE") {
		appleStr = ''
	}
	if (ProfileInfo.onlineStyle == "APPLE") {
		//苹果,不修改
	} else if (ProfileInfo.onlineStyle == "BCD") {
		//BCD,修改
	} else {
		//公版
	}
	// 主公司ID ProfileInfo.ChainCode: "NIKE"
	// 子公司id ProfileInfo.companyId: "XMVH",

	// 添加banner的js<script type="text/javascript" src="../index/js/banner.js"></script>
	// 添加是这个格式
	// console.log(tools.isHasImg('../index/images/bgImg.jpg'))
	if (ProfileInfo.onlineStyle == "APPLE") {
		var TitleStr = '\
			<div class="pendTab mainFontColor hide">\
				<span>' + get_lan('table').pendingApproval + '</span>\
			</div>\
			<div class="ApproveLengthIcon hide"></div>'
	} else {
		var TitleStr = '\
			<div class="pendTab hide">\
				<span>' + get_lan('table').pendingApproval + '</span>\
				<div class="ApproveLengthIcon hide"></div>\
			</div>'
	}

	if (ProfileInfo.HideQRCode) {
		var appDownloadBoxHtml = '';
	} else {
		var appDownloadBoxHtml =
			'<div>\
				<img src="./../staticFile/index/pic_appQR.png" alt="">\
				<div class="tac">'+ get_lan('footer').APP + '</div>\
			</div>';
	}

	$("#main").html('\
        <div>\
            <div class="search-container">\
                <div class="banner">\
                    <ul class="banner-img">\
                        <li><a href="#"><img id="test1" src="../staticFile/images/bgImg.jpg" class="bgImg"></a></li>\
                        <li><a href="#"><img id="test2" src="../staticFile/images/banner1.jpg" class="bgImg"></a></li>\
                        <li><a href="#"><img id="test3" src="../staticFile/images/banner2.jpg" class="bgImg"></a></li>\
                        <li><a href="#"><img id="test4" src="../staticFile/images/banner3.jpg" class="bgImg"></a></li>\
                        <li><a href="#"><img id="test5" src="../staticFile/images/banner4.jpg" class="bgImg"></a></li>\
                    </ul>\
                    <ul class="banner-circle"></ul>\
                </div>\
            </div>\
			<div class="search_wrapper"></div>\
            <div class="order_wrapper">\
				<div class="autoCenter clearfix" >\
					<div class="orderTable-wrapper">\
						<div class="orderTittle">\
							<div class="orderTittleActive myOrderTab">\
								<span>' + get_lan('table').myOrders + '</span>\
							</div>\
							' + TitleStr + '\
						</div>\
						<div class="orderHeader"></div>\
						<div class="autoScrollY" id="tableBody"></div>\
						<div class="orderTable-showMore">\
							<span linkState="myOrders" class="moreOrderText">' + get_lan('table').more + '</span>\
							<img src="../../images/Aus/common/icon_showmore.png" class="rightArrow" linkState="myOrders"/>\
						</div>\
					</div>\
					<div class="rightGroup" style="float: right;">\
						<div class="videoGroup" style=""> \
							<img class="videoImg" src=""/>\
							<div class="videoPlay"></div>\
						</div>\
						<div class="picGroup">\
							<img class="picGroupImg" src="../staticFile/index.png"/><a class="picHref" href="javascript:volid(0);" target="_blank"></a>\
						</div>\
					</div>\
				</div>\
				<div class="reminder hide">\
					<div class="autoCenter">\
						<span class="reminderText mainFontColor">' + get_lan('expiration') + '</span>\
					</div>\
				</div>\
			</div>\
        </div>\
		<footer class="indexFooter">\
		    <div class="autoCenter clearfix">\
		        <div class="newsBody ">\
					<div class="newsList"></div>\
					<div class="QRright clearfix">\
						<div class="screenText" >\
							<h3>'+ get_lan('footer').leanMore + '</h3>\
							<p>'+ get_lan('footer').scan + '</p>\
						</div>\
						<div class="QRgroup">\
							<div>\
								<img src="./../staticFile/index/pic_weQR.png" alt="">\
								<div class="tac">'+ get_lan('footer').WeChat + '</div>\
							</div>\
							' + appDownloadBoxHtml + '\
						</div>\
					</div>\
		        </div>\
		    </div>\
		</footer>\
		<strong class="supportReminder">For technical support, please contact BCD helpdesk: +86 021-61327099  9:00-18:00(weekdays)</strong>\
    '
	)

	if (CONTINUEBOOK) {
		$('.rightGroup').remove()
		$('.orderTable-wrapper').addClass('continueBook')
	}
	// 2020-03-09 弹框
	var tips = $.session.get('tipsNum')
	if (tips == 1 && ProfileInfo.reminderTitle != "") {
		$.session.set('tipsNum', 2)
		var title = ProfileInfo.reminderTitle
		var content = ProfileInfo.reminderContent
		$('body')
			.append('\
				<div id="cover2">\
					<div class="tipsGroup">\
						<div class="tipsTitle">' + title + '</div>\
						<div class="tipsDiv">\
							<div class="tipsContent">' + content + '</div>\
						</div>\
						<div class="tipsFoot clearfix"><div class="footBtn">Confirm</div></div>\
					</div>\
				</div>')
		if (obtLanguage == "CN") {
			$(".footBtn").text('确定')
		}
		var checkTipsTimer = setInterval(function () {
			if ($('.tipsGroup').height() >= window.innerHeight) {
				$('.tipsDiv').css('height', (window.innerHeight - 180) + 'px')
				clearInterval(checkTipsTimer)
			}
		}, 100)
		$('.footBtn').click(function () {
			$('#cover2').remove()
		})
	}
	/*end*/

	/*首页审批单*/
	var taTab = ProfileInfo.ChainCode === "Pfizer China" ? get_lan("table").taTabPfizer : get_lan("table").taTab
	if (ProfileInfo.HasTravelRequest && ProfileInfo.IndexTravelRequest) {
		// #F6AA25 改为 #041e5b
		$(".orderTittle").append('\
			<div class="taTab">\
				<span>' + taTab + '</span>\
			</div>\
		')
	}
	if (ProfileInfo.HasTravelRequest && !ProfileInfo.IndexTravelRequest) {
		$(".orderTittle").append('\
			<div class="taTab">\
				<span>' + taTab + '</span>\
			</div>\
		')
	}
	$(".taTab").unbind("click").click(function () {
		indexTANumber();
	})
	/*end*/
	// var companyImg=ProfileInfo.companyId?ProfileInfo.companyId:ProfileInfo.ChainCode
	// advertiseCompany子公司
	if (ProfileInfo.advertiseCompany) {
		$(".banner-img").html('\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner1.jpg" class="bgImg"></a></li>\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner2.jpg" class="bgImg"></a></li>\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner3.jpg" class="bgImg"></a></li>\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner4.jpg" class="bgImg"></a></li>\
		   <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.companyId +
			'/banner5.jpg" class="bgImg"></a></li>\
		')
	}
	// advertiseChainCompany主公司
	else if (ProfileInfo.advertiseChainCompany) {	//Nina 20201224需求 如果advertiseCompany是true就不显示ChainCode得图片
		$(".banner-img").html('\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner1.jpg" class="bgImg"></a></li>\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner2.jpg" class="bgImg"></a></li>\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner3.jpg" class="bgImg"></a></li>\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner4.jpg" class="bgImg"></a></li>\
		    <li><a href="#"><img src="../staticFile/images/' + ProfileInfo.ChainCode +
			'/banner5.jpg" class="bgImg"></a></li>\
		')
	}


	if (ProfileInfo.onlineStyle == "eTravel") {
		$(".banner-img").html('\
            <li><a href="#"><img src="../staticFile/images/banner1_eTravel.jpg" class="bgImg"></a></li>\
            <li><a href="#"><img src="../staticFile/images/banner2_eTravel.jpg" class="bgImg"></a></li>\
            <li><a href="#"><img src="../staticFile/images/banner3_eTravel.jpg" class="bgImg"></a></li>\
            <li><a href="#"><img src="../staticFile/images/banner4_eTravel.jpg" class="bgImg"></a></li>\
            <li><a href="#"><img src="../staticFile/images/banner5_eTravel.jpg" class="bgImg"></a></li>\
        ')
	}
	if (ProfileInfo.onlineStyle == "APPLE") {
		$(".newsBody").remove();
		$("footer").css("height", "55px");
		$(".myOrderTab").text('<span>' + get_lan("table").myTrips + '</span>');
	}
	$(".etravelText").remove();
	if (ProfileInfo.onlineStyle == "eTravel") {
		$(".footerContact").remove();
	}
	if (ProfileInfo.NeedApproval) {
		$(".pendTab").removeClass("hide");
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/OrderService.svc/ApproveListPost",
				jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
			},
			success: function (data) {
				if (data != '') {
					var res = JSON.parse(data)
					console.log(res);
					var approveList = [];
					res.map(function (item) {
						if (!item.IsHistory) {
							approveList.push(item);
						}
					})
					if (approveList.length == 0) {
						$(".ApproveLengthIcon").addClass("hide");
					} else {
						$(".ApproveLengthIcon").removeClass("hide");
						$(".ApproveLengthIcon").text(approveList.length);
					}
				} else {
					// alert(get_lan('accountRemind'));
				}
			},
			error: function () {
				// alert('fail');
			}
		});
	}
	if (ProfileInfo.NoQueryOrder) {
		$(".moreOrderText").hide();
		$(".rightArrow").hide();
	}
	//点击我的订单，待审核订单
	$(".myOrderTab").unbind('click').click(function () {
		$(".rightArrow").attr("linkState", "myOrders");
		$(".moreOrderText").attr("linkState", "myOrders");
		$(".myOrderTab,.pendTab").removeClass("orderTittleActive");
		$(".myOrderTab").addClass("orderTittleActive");
		btnIndex = 1
		myOrderTableInfo();
	})
	$(".pendTab").unbind('click').click(function () {
		$(".rightArrow").attr("linkState", "approvals");
		$(".moreOrderText").attr("linkState", "approvals");
		$(".myOrderTab,.pendTab").removeClass("orderTittleActive");
		$(".pendTab").addClass("orderTittleActive");
		btnIndex = 2
		pendingApproval();
	})
	$(".moreOrderText").unbind("click").click(function () {
		if ($(this).attr("linkState") == "myOrders") {
			window.location.href = '../../orders/orders.html';
		} else if ($(this).attr("linkState") == "approvals") {
			window.location.href = '../../application/queryApplication.html';
		}
	})
	$(".rightArrow").unbind("click").click(function () {
		if ($(this).attr("linkState") == "myOrders") {
			window.location.href = '../../orders/orders.html';
		} else if ($(this).attr("linkState") == "approvals") {
			window.location.href = '../../application/queryApplication.html';
		}
	})
	// if(TAorderNo!=undefined){
	if (TAnumber != undefined && TAnumberIndex == 1) {
		$($(".menusLi")[1]).hide()
		$('.moreOrderText').hide()
		$('.rightArrow').hide()
	}
}
// 广告图片接口
function GetCompanyImageInfos() {
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetCompanyImageInfosWType",
			jsonStr: '{"key":' + netUserId + ',"appType":"WEB"}',
		},
		success: function (data) {
			if (data == "" || data.indexOf("404") > -1) {
				// $('.picGroup').remove()
				$('.videoGroup').remove()
				$(".picHref").remove()
				$('#tableBody').css("height", "400px")
				return false
			}
			var res = JSON.parse(data);
			console.log(res);

			//图片列表
			var imgList = []
			if (res.code == 200) {
				var noVideo = true
				var noPic = true
				res.CompanyImageList.map(function (item) {
					if (item.type == 0) {
						noPic = false;
						imgList.push(item)
					}
					if (item.type == 10) {
						noVideo = false
						$('.videoGroupVideo').attr("src", item.path)
						$('.videoImg').attr("src", item.hyperLink)

						$(".videoPlay").click(function () {
							$("body").append(
								'<div id="coverVideo">\
									<div class="videoGroupPop">\
										<span class="closeVideo"></span>\
										<video width="660px" height="" controls="controls" autoplay="autoplay"  controlsList = "nodownload">\
											<source src="' + item.path + '"  type="video/mp4"></source>\
										</video>\
									</div>\
								</div>')
							$(".closeVideo").click(function () {
								$("#coverVideo").remove()
							})
						})
					}
				})
				if (imgList.length == 1) {
					$('.picGroupImg').attr("src", imgList[0].path)
					if (imgList[0].hyperLink == "") {
						$(".picHref").remove()
					} else {
						$(".picHref").attr("href", imgList[0].hyperLink)
						$(".picGroup a").css('position', 'absolute');
					}
				} else if (!noPic) {
					//移除单个样式
					$(".picGroupImg").remove()
					$(".picHref").remove()

					var length = imgList.length
					var n = 0;
					$('.picGroup').append('\
						<div class="navList"></div>\
					')
					//添加轮播图
					$('.picGroup').append('\
						<div class="lunbotuGroup"></div>\
					')
					$('.lunbotuGroup').css({ "width": "calc(220px * " + length + ")", "height": "274px", "position": "relative", "left": "0" })
					$('.lunbotuGroup').css({ "transition": "all 1s" })
					imgList.map(function (item, index) {
						$('.lunbotuGroup').append('\
							<div class="lunbotu">\
								<a href="'+ item.hyperLink + '" target="_blank">\
									<img src="'+ item.path + '" alt="">\
								</a>\
							</div>\
						')
						$('.navList').append('\
							<span index="'+ index + '"></span>\
						')
					})
					$('.navList span').click(function () {
						var clickNum = $(this).attr('index')
						n = clickNum
						clearInterval(t)
						lunbofun()
						t = setInterval(start, 10000);
					})
					function lunbofun() {
						$('.lunbotuGroup').css("left", -n * 220 + "px")
						$('.navList span').css("background", "#B7B7B7")
						$('.navList span').eq(n).css("background", "#F6AA25")
					}
					lunbofun()
					function start() {
						n++;
						if (n >= length) {
							n = 0;
							$('.lunbotuGroup').css({ "transition": "all 0s" })
						} else {
							$('.lunbotuGroup').css({ "transition": "all 1s" })
						}
						lunbofun();
					}
					var t = setInterval(start, 10000);
				}

				if (noPic) {
					//移除图片，高度400px
					$('.picGroupImg').attr("src", "../staticFile/index.png")
					$(".picHref").remove()
					$('#tableBody').css("height", "400px")
				}
				if (noVideo) {
					//移除视频，高度400px
					$('.videoGroup').remove()
					$('#tableBody').css("height", "400px")
				}

			} else {
				if (ProfileInfo.onlineStyle == "APPLE") {
					$('.picGroup').remove()
				}
				$('.videoGroup').remove()
				$(".picHref").remove()
				$('#tableBody').css("height", "400px")

				// 应该不需要提示
				// alert(res.errMsg)
			}
			// 


		},
		error: function () {
			// alert('fail');
		}
	});
}
function getHoursOptions(className) {
	// 24小时
	var hours = new Array(24)

	if (className) {
		for (var i = 0; i < hours.length; i++) {
			hours[i] = i + ':00'
		}
		hours.unshift(get_lan("searchBody").allDay)
	} else {
		for (var i = 0; i < hours.length; i++) {
			hours[i] = i
		}
	}
	var hoursOptions = '', hoursValue = '', hoursClass = ''
	hours.map(function (item, index) {
		if (item === get_lan('searchBody').allDay) {
			hoursValue = 'all'
			hoursClass = className
		} else {
			hoursValue = index
			hoursClass = ''
		}
		hoursOptions += '<option value="' + hoursValue + '" class="' + hoursClass + '">' + item + '</option>'
	})

	return hoursOptions
}
function getHoursDiffOptions() {
	// +-12小时
	var hoursDiff = new Array(12)
	for (var i = 0; i < hoursDiff.length; i++) {
		hoursDiff[i] = '±' + (i + 1) + 'H'
	}
	var hoursDiffOptions = ''
	hoursDiff.map(function (item, index) {
		hoursDiffOptions += '<option value="' + (index + 1) + '">' + item + '</option>'
	})
	return hoursDiffOptions
}
function reRenderBannerSize() {
	var lastHeight = $('.search_wrapper').innerHeight()
	var renderTimer = setInterval(function () {
		$('.search-container').css('height', $('.search_wrapper').innerHeight() + 136 + 'px')
		if ($('.search_wrapper').innerHeight() != lastHeight) {
			clearInterval(renderTimer)
		}
	}, 100)
}
// 搜索界面
function searchBody() {
	var hoursDiffOptions = getHoursDiffOptions()
	//租车
	var enStyle = obtLanguage == "CN" ? "" : "height:0;line-height:17px";
	// 19-10-29改苹果舱位去掉超级经济舱与头等舱
	var optionStr =
		'<option berthType="0">' + get_lan('searchBody').cabins.cabin1 + '</option>\
		<option berthType="1">' + get_lan('searchBody').cabins.cabin2 + '</option>\
		<option berthType="4">' + get_lan('searchBody').cabins.cabin6 + '</option>\
		<option berthType="2">' + get_lan('searchBody').cabins.cabin3 + '</option>\
		<option berthType="3">' + get_lan('searchBody').cabins.cabin4 + '</option>'
	if (ProfileInfo.onlineStyle == "APPLE") {
		optionStr =
			'<option berthType="1">' + get_lan('searchBody').cabins.cabin2 + '</option>\
	        <option berthType="2">' + get_lan('searchBody').cabins.cabin3 + '</option>'
	}

	if (ProfileInfo.onlineStyle === 'BCD') {
		var openMapHotel =
			'<div class="openMapHotelBox">\
				<input type="checkbox" id="openMapHotel"><label for="openMapHotel">' + get_lan('searchBody').openMapHotel + '</label>\
			</div>'
	} else {
		var openMapHotel = ''
	}
	var showCarRent = ProfileInfo.isCarRental ? "" : "hide"
	if (SEARCH == 'hotel') {
		$('.search_wrapper').html('\
			<form class="search_inputItems">\
				<div class="search_destination search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').hotelCity + '</h6>\
					<input class="search_input" type="text" id="hotelCity" autocomplete="off" placeholder="'+ get_lan('searchBody').hotelCityInput + '" />\
				</div>\
				<div class="search_checkIn search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').hotelCheckInDate + '</h6>\
					<input class="search_input" type="text" id="hotelDepartureDate" readonly="readonly" />\
				</div>\
				<div class="search_checkOut search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').hotelCheckOutDate + '</h6>\
					<input class="search_input" type="text" id="hotelReturnDate" readonly="readonly" />\
				</div>\
				<div class="search_hotelAddress search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').hotelAddress + '</h6>\
					<div class="hotelAddressBody">\
						<input type="text" class="hotel_addr search_input" id="hotel_addr" autocomplete="off" placeholder="'+ get_lan('searchBody').locationPlaceholder + '"/>\
						<ul class="search_hotelAddress_options hide"></ul>\
					</div>\
				</div>\
				<div class="search_keyWords search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').hotelKeyWords + '</h6>\
					<div class="search_keyword_box">\
						<input class="search_input" type="text" id="keyWordInput" autocomplete="off" placeholder="'+ get_lan('searchBody').hotelKeyInput + '"/>\
						<div class="keyWordBody"></div>\
					</div>\
				</div>\
			</form>\
			<div class="search_buttonItems">\
				<div class="search_items">\
					<div class="search_filter-box search_price">\
						<div class="search_price_title search_filter-box_title">\
							<img src="../../images/Aus/hotel/icon_price.png" alt="price"/>\
							<span class="search_price_text" minPrice="0" maxPrice="5000">'+ get_lan('searchBody').allStar + '</span>\
						</div>\
						<div class="search_filter-box_pop searchPriceBody hidden negative hide">\
							<div class="search_filter-box_pop_item hotelPriceBtn" minPrice="0" maxPrice="5000">'+ get_lan('searchBody').allStar + '</div>\
							<div class="search_filter-box_pop_item hotelPriceBtn" id="price1" minPrice="0" maxPrice="150">0-150'+ ProfileInfo.OfficeCurrency + '</div>\
							<div class="search_filter-box_pop_item hotelPriceBtn" id="price2" minPrice="151" maxPrice="300">151-300'+ ProfileInfo.OfficeCurrency + '</div>\
							<div class="search_filter-box_pop_item hotelPriceBtn" id="price3" minPrice="301" maxPrice="450">301-450'+ ProfileInfo.OfficeCurrency + '</div>\
							<div class="search_filter-box_pop_item hotelPriceBtn" id="price4" minPrice="451" maxPrice="600">451-600'+ ProfileInfo.OfficeCurrency + '</div>\
							<div class="search_filter-box_pop_item hotelPriceBtn" id="price5" minPrice="601" maxPrice="1000">601-1000'+ ProfileInfo.OfficeCurrency + '</div>\
							<div class="search_filter-box_pop_item hotelPriceBtn" id="price6" minPrice="1001" maxPrice="5000">1001-5000'+ ProfileInfo.OfficeCurrency + '</div>\
							<div class="hotel_price_range">\
								<input type="number" value="0" class="searchMinPrice">\
								<div class="hyphen">-</div>\
								<input type="number" value="700" class="searchMaxPrice">\
							</div>\
						</div>\
					</div>\
					<div class="search_filter-box search_level">\
						<div class="search_level_title search_filter-box_title">\
							<img src="../../images/Aus/hotel/icon_star.png" alt="level"/>\
							<span class="search_level_text" star="1-2-3-4-5">'+ get_lan('searchBody').allStar + '</span>\
						</div>\
						<div class="search_filter-box_pop searchStarBody hidden negative hide">\
							<div class="search_filter-box_pop_item hotelStarBtn starChoose all" star="1-2-3-4-5">'+ get_lan('searchBody').allStar + '</div>\
							<div class="search_filter-box_pop_item hotelStarBtn two" star="1-2"><span class="level">2</span><span class="star"></span></div>\
							<div class="search_filter-box_pop_item hotelStarBtn" star="3"><span class="level">3</span><span class="star"></span></div>\
							<div class="search_filter-box_pop_item hotelStarBtn" star="4"><span class="level">4</span><span class="star"></span></div>\
							<div class="search_filter-box_pop_item hotelStarBtn" star="5"><span class="level">5</span><span class="star"></span></div>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="searchHotelBtn search_btn" state="domHotel">'+ get_lan('searchBody').search + '</div>\
		')
	}
	else if (SEARCH == 'air') {
		var showOneWay = ProfileInfo.onlineStyle == "APPLE" ? "hide" : "";
		var optionStr = ''
		if (ProfileInfo.onlineStyle == "APPLE") { //苹果的舱位两个,其他的为全部
			optionStr = '<option value="1" berthType="1">' + get_lan('searchBody').cabins.cabin2 + '</option>\
						<option value="2" berthType="2">' + get_lan('searchBody').cabins.cabin3 + '</option>'
		} else {
			optionStr = '<div class="search_filter-box_pop_item search-cabin_item" berthType="0">' + get_lan('searchBody').cabins.cabin1 + '</div>\
						<div class="search_filter-box_pop_item search-cabin_item" berthType="1"><span class="level">'+ get_lan('searchBody').cabins.cabin2 + '</span></div>\
						<div class="search_filter-box_pop_item search-cabin_item" berthType="2"><span class="level">'+ get_lan('searchBody').cabins.cabin3 + '</span></div>\
						<div class="search_filter-box_pop_item search-cabin_item" berthType="3"><span class="level">'+ get_lan('searchBody').cabins.cabin4 + '</span></div>\
						<div class="search_filter-box_pop_item search-cabin_item" berthType="4"><span class="level">'+ get_lan('searchBody').cabins.cabin6 + '</span></div>'
		}
		$('.search_wrapper').html('\
			<div class="search_radio-box ' + showOneWay + '">\
				<label class="search_radio">\
					<input type="radio" state="1" value="1" name="searchState" class="searchState"/>\
					<span class="radio-input"></span>\
					<span class="radio-text">' + get_lan('searchBody').oneWay + '</span>\
				</label>\
				<label class="search_radio">\
					<input type="radio" state="2" value="2" name="searchState" class="searchState"/>\
					<span class="radio-input"></span>\
					<span class="radio-text">' + get_lan('searchBody').roundTrip + '</span>\
				</label>\
				<label class="search_radio">\
					<input type="radio" state="3" value="3" name="searchState" class="searchState"/>\
					<span class="radio-input"></span>\
					<span class="radio-text">' + get_lan('searchBody').multiple + '</span>\
				</label>\
			</div>\
			<form class="notMultipleAir">\</form>\
			<form class="multipleAir hide">\</form>\
			<div class="search_buttonItems air-items showOptions">\
				<div class="search_items">\
					<div class="search_filter-box" id="search_items-intlCabin">\
						<div class="search_filter-box_title" id="search_items-intlTitle">\
							<img src="../../images/Aus/air/icon_class.png" alt="level"/>\
							<span class="search_level_text" berthType="0">' + get_lan('searchBody').all + '</span>\
						</div>\
						<div class="search_filter-box_pop hidden negative hide" id="intlCabin">'+ optionStr + '</div>\
					</div>\
					<div class="search_option-box">\
						<input type="checkbox" class="domCodeShareCheckBox" id="codeShare">\
						<label class="domCodeShareText" for="codeShare">' + get_lan('searchBody').codeShare + '</label>\
					</div>\
					<div class="search_option-box">\
						<input type="checkbox" class="domDirectCheckBox intlDirectCheckBox" id="directText">\
						<label class="domDirectText" for="directText">' + get_lan('searchBody').isDirect + '</label>\
					</div>\
				</div>\
			</div>\
			<div class="searchIntlBtn search_btn">'+ get_lan('searchBody').search + '</div>\
		')
		// 单程往返
		$('.notMultipleAir').html('\
			<div class="search_inputItems">\
				<div class="search_air-airports_box">\
					<div class="intlDepartureCitySearch search_input-box">\
						<h6 class="search_title">'+ get_lan('searchBody').from + '</h6>\
						<input class="search_input search_from" type="text" autocomplete="off" id="intlDepartureCity"  placeholder="' + get_lan('searchBody').fromPlaceholder + '"/>\
					</div>\
					<div class="search_station_transform" index="0" rotate="0">\
						<img src="/images/Aus/air/icon_dom.png"/>\
						<img src="/images/Aus/air/icon_dh.png" class="search_station_transform-icon"/>\
					</div>\
					<div class="intlArrivalCitySearch search_input-box">\
						<h6 class="search_title">'+ get_lan('searchBody').to + '</h6>\
						<input class="search_input search_to" type="text" autocomplete="off" id="intlArrivalCity" placeholder="'+ get_lan('searchBody').toPlaceholder + '" />\
					</div>\
				</div>\
				<div class="intlDepartureDateSearch search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').departureDate + '</h6>\
					<div class="search_input-box-multiple">\
						<input class="search_air-date" type="text" id="intlDepartureDate" readonly />\
						<select type="text" id="intlDepartureSelect" onchange="GrayIntelDepartPlusMinus()">'+ getHoursOptions('intlAllDay') + '</select>\
						<div class="intlDepartureWeek">\
							<select class="plusMinus" type="text" id="DepartPlusMinusintel" disabled="disabled">'+ hoursDiffOptions + '</select>\
						</div>\
					</div>\
				</div>\
				<div class="intlReturnDateSearch search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').returnDate + '</h6>\
					<div class="search_input-box-multiple">\
						<input class="search_air-date" type="text" id="intlReturnDate" readonly/>\
						<select type="text" id="intlReturnSelect" onchange="GrayIntelreturnPlusMinus()">'+ getHoursOptions('intlAllDay') + '</select>\
						<div class="intlReturnDateWeek">\
							<select  class="plusMinus" type="text" id="returnPlusMinusintel">'+ hoursDiffOptions + '</select>\
						</div>\
					</div>\
				</div>\
			</div>\
			<div class="search_inputItems" >\
				<div class="addTransitBody">\
					<div class="addTransitIcon"></div>\
					<div class="search_title transitText">' + get_lan('searchBody').addTransit + '</div>\
				</div>\
				<div class="transitCityBody hide">\
					<input class="search_input" autocomplete="off" type="text" id="transitCity" placeholder="' + get_lan('searchBody').transitRemind + '">\
					<div class="hideTransitIcon"></div>\
				</div>\
			</div>\
		')
		// 多段
		$('.multipleAir').html('\
		<div class="search_inputItems">\
			<div class="search_air-airports_box">\
				<div class="intlDepartureCitySearch search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').from + '</h6>\
					<input class="search_input search_from MultipleDepartureCity" type="text" autocomplete="off" placeholder="' + get_lan('searchBody').fromPlaceholder + '"/>\
				</div>\
				<div class="search_station_transform" index="0" rotate="0">\
					<img src="/images/Aus/air/icon_dom.png"/>\
					<img src="/images/Aus/air/icon_dh.png" class="search_station_transform-icon"/>\
				</div>\
				<div class="intlArrivalCitySearch search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').to + '</h6>\
					<input class="search_input search_to MultipleArrivelCity" inputIndex="0" type="text" autocomplete="off" placeholder="'+ get_lan('searchBody').toPlaceholder + '" />\
				</div>\
			</div>\
			<div class="intlDepartureDateSearch search_input-box">\
				<h6 class="search_title">'+ get_lan('searchBody').departureDate + '</h6>\
				<div class="search_input-box-multiple">\
					<input class="search_air-date MultipleDepartureDate" type="text" readonly />\
					<select type="text" class="MultipleSelect">'+ getHoursOptions('intlAllDay') + '</select>\
				</div>\
			</div>\
		</div>\
		<div class="search_inputItems">\
			<div class="search_air-airports_box">\
				<div class="intlDepartureCitySearch search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').from + '</h6>\
					<input class="search_input search_from MultipleDepartureCity" type="text" autocomplete="off" placeholder="' + get_lan('searchBody').fromPlaceholder + '"/>\
				</div>\
				<div class="search_station_transform" index="1" rotate="0">\
					<img src="/images/Aus/air/icon_dom.png"/>\
					<img src="/images/Aus/air/icon_dh.png" class="search_station_transform-icon"/>\
				</div>\
				<div class="intlArrivalCitySearch search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').to + '</h6>\
					<input class="search_input search_to MultipleArrivelCity" inputIndex="1" type="text" autocomplete="off" placeholder="'+ get_lan('searchBody').toPlaceholder + '" />\
				</div>\
			</div>\
			<div class="intlDepartureDateSearch search_input-box">\
				<h6 class="search_title">'+ get_lan('searchBody').departureDate + '</h6>\
				<div class="search_input-box-multiple">\
					<input class="search_air-date MultipleDepartureDate" type="text" readonly />\
					<select type="text" class="MultipleSelect">'+ getHoursOptions('intlAllDay') + '</select>\
				</div>\
			</div>\
		</div>\
		<div class="addAirIntlBody">\
			<div class="addAirIntlBody-icon"></div>\
			' + get_lan("searchBody").addAirIntl + '\
		</div>\
		')
		if (ProfileInfo.NeedSpecialPolicy) {
			$(".search_level_text").text($('.search-cabin_item[berthType="0"]').text());
			$(".search_level_text").attr('berthType', 0)
		} else {
			$('#search_items-intlTitle').click(function () {
				$('#intlCabin').usePopWindowEffect(300, $('#search_items-intlCabin'))
				switchSearchWrapperZIndex($('#intlCabin'))
			})
			$('.search-cabin_item').click(function () {
				$(".search_level_text").text($(this).text());
				$('.search_level_text').attr('berthType', $(this).attr('berthType'))
			})
		}
		useSwapStationEffect()
	}
	else if (SEARCH == 'rail') {
		var showOneWay = ProfileInfo.onlineStyle == "APPLE" ? "hide" : "";
		var optionStr = ''
		$('.search_wrapper').html('\
			<div class="search_radio-box ' + showOneWay + '">\
				<label class="search_radio">\
					<input type="radio" state="1" value="1" name="searchState" class="searchState"/>\
					<span class="radio-input"></span>\
					<span class="radio-text">' + get_lan('searchBody').oneWay + '</span>\
				</label>\
				<label class="search_radio">\
					<input type="radio" state="2" value="2" name="searchState" class="searchState"/>\
					<span class="radio-input"></span>\
					<span class="radio-text">' + get_lan('searchBody').roundTrip + '</span>\
				</label>\
			</div>\
			<form class="notMultipleAir">\</form>\
			<div class="search_inputItems air-items">\
				<div class="search_items">\
					<div class="intlArrivalCitySearch search_input-box">\
						<h6 class="search_title">'+ get_lan('searchBody').trainNo + '</h6>\
						<input class="search_input" type="text" autocomplete="off" id="trainCabin" placeholder="'+ get_lan('searchBody').trainNoText + '" />\
					</div>\
				</div>\
			</div>\
			<div class="searchTrainBtn search_btn">'+ get_lan('searchBody').search + '</div>\
		')
		// 单程往返
		$('.notMultipleAir').html('\
			<div class="search_inputItems">\
				<div class="search_air-airports_box">\
					<div class="intlDepartureCitySearch search_input-box">\
						<h6 class="search_title">'+ get_lan('searchBody').from + '</h6>\
						<input class="search_input search_from" type="text" autocomplete="off" id="trainDepartureCity"  placeholder="' + get_lan('searchBody').fromPlaceholder + '"/>\
					</div>\
					<div class="search_station_transform" index="0" rotate="0">\
						<img src="/images/Aus/air/icon_dom.png"/>\
						<img src="/images/Aus/air/icon_dh.png" class="search_station_transform-icon"/>\
					</div>\
					<div class="intlArrivalCitySearch search_input-box">\
						<h6 class="search_title">'+ get_lan('searchBody').to + '</h6>\
						<input class="search_input search_to" type="text" autocomplete="off" id="trainArrivalCity" placeholder="'+ get_lan('searchBody').toPlaceholder + '" />\
					</div>\
				</div>\
				<div class="intlDepartureDateSearch search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').departureDate + '</h6>\
					<div class="search_input-box-multiple">\
						<input class="search_air-date" type="text" id="trainDepartureDate" readonly />\
						<select type="text" class="trainDepartureSelect">'+ getHoursOptions('trainAllDay') + '</select>\
					</div>\
				</div>\
				<div class="intlReturnDateSearch search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').returnDate + '</h6>\
					<div class="search_input-box-multiple">\
						<input class="search_air-date" type="text" id="trainReturnDate" readonly/>\
						<select type="text" class="trainReturnSelect">'+ getHoursOptions('trainAllDay') + '</select>\
					</div>\
				</div>\
			</div>\
		')

		useSwapStationEffect()
	}
	else if (SEARCH == 'car') {
		$('.search_wrapper').html('\
			<form class="notMultipleAir">\
				<div class="search_inputItems">\
					<div class="search_air-airports_box">\
						<div class="intlDepartureCitySearch search_input-box">\
							<h6 class="search_title">'+ get_lan('searchBody').carFrom + '</h6>\
							<input class="search_input search_from" type="text" autocomplete="off" id="carDeparture"  placeholder="' + get_lan('searchBody').carFrom + '"/>\
						</div>\
						<div class="search_station_transform" index="0" rotate="0">\
							<img src="/images/Aus/air/icon_dom.png"/>\
							<img src="/images/Aus/air/icon_dh.png" class="search_station_transform-icon"/>\
						</div>\
						<div class="intlArrivalCitySearch search_input-box">\
							<h6 class="search_title">'+ get_lan('searchBody').carTO + '</h6>\
							<input class="search_input search_to" type="text" autocomplete="off" id="carArrival" placeholder="'+ get_lan('searchBody').carTO + '" />\
						</div>\
					</div>\
					<div class="intlDepartureDateSearch search_input-box">\
						<h6 class="search_title">'+ get_lan('searchBody').carFromDate + '</h6>\
						<div class="search_input-box-multiple">\
							<input class="search_air-date" type="text" id="carFromDate" readonly />\
							<select type="text" id="carFromHour">'+ getHoursOptions() + '</select><span style="flex:0.1">:</span>\
							<select type="text" id="carFromMin">\
								<option value="00">00</option>\
								<option value="30">30</option>\
							</select>\
						</div>\
					</div>\
					<div class="intlReturnDateSearch search_input-box">\
						<h6 class="search_title">'+ get_lan('searchBody').carToDate + '</h6>\
						<div class="search_input-box-multiple">\
							<input class="search_air-date" type="text" id="carToDate" readonly />\
							<select type="text" id="carToHour">'+ getHoursOptions() + '</select><span style="flex:0.1">:</span>\
							<select type="text" id="carToMin">\
								<option value="00">00</option>\
								<option value="30">30</option>\
							</select>\
						</div>\
					</div>\
				</div>\
			</form>\
			<div class="search_buttonItems air-items showOptions">\
				<div class="search_items">\
					<div class="search_filter-box" id="search_items-intlCabin">\
						<div class="search_filter-box_title search_carCompany_title " id="search_items-intlTitle">\
							<img src="../../images/Aus/air/icon_class.png" alt="level"/>\
							<span class="search_carCompany_text" berthType="0">' + get_lan('searchBody').all + '</span>\
						</div>\
						<div class="search_filter-box_pop hidden negative hide" id="carCompany"></div>\
					</div>\
				</div>\
			</div>\
			<div class="searchCarBtn search_btn">'+ get_lan('searchBody').search + '</div>\
		')
		$('#search_items-intlTitle').click(function () {
			$('#carCompany').usePopWindowEffect(300, $('#search_items-intlCabin'))
			switchSearchWrapperZIndex($('#carCompany'))
		})
	}

	reRenderBannerSize()
	handleSearchButtonClick()

	$(".selectTimeStyle").remove();
	$("#hotel_addr").on('input propertychange', function () {
		$("#hotel_addr").removeAttr("key");
	})
	$("#hotel_addr").on('focus', function () {
		if (obtLanguage != "CN" && $('#hotelCity').attr('citycode')) {
			var centerLat = $('#hotel_addr').attr('latitude') || $.session.get('centerLat')
			var centerLng = $('#hotel_addr').attr('longitude') || $.session.get('centerLng')
			if (!centerLat || !centerLng) {
				return false;
			}
			if ($('.mapboxgl-ctrl-geocoder').length == 0) {
				$('#mapboxMap').show();
				var mapbox = new Mapbox();
				var defaultMarker = $('#hotel_addr').attr('latitude') && $('#hotel_addr').attr('longitude') ? true : false;
				try {
					var options = {
						centerLng: centerLng,
						centerLat: centerLat,
						defaultMarker: defaultMarker,
						hideSearchBar: false,
					}
					mapbox.initMapBox(options);
				} catch (err) {
					mapbox.__mapboxClose();
					$('.mapbox_tips').show();
					setTimeout(function () {
						$('.mapbox_tips').hide();
					}, 3000);
				}
			}
		} else {
			$('.search_hotelAddress_options').removeClass('hide')
		}
	});

	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/ProfilePost",
			jsonStr: '{"key":' + netUserId + '}'
		},
		success: function (data) {
			var res = JSON.parse(data);
			var accessInfo = {
				"isDomesticAir": res.isDomesticAir,
				"isInterAir": res.isInterAir,
				"isHotel": res.isHotel,
				"isTrain": res.isTrain,
			}
			$.session.set('accessInfo', JSON.stringify(accessInfo));
			var flag = 0;
			/** 判断用户能订什么票的权限 */
			if (!res.isDomesticAir) {
				$(".airDom ").hide();
				$('.airDomBody').hide();
			} else {
				if (flag == 0) {
					$('.airDomBody').show();
					$('.airDom ').addClass('tabActive');
					flag = 1;
				}
			}

			if (!res.isInterAir) {
				$(".airIntl ").hide();
				$('.airIntlBody').hide();
			} else {
				if (flag == 0) {
					$('.airIntlBody').show();
					$("#intlRoundTrip").click();
					$('.airIntl ').addClass('tabActive');
					flag = 1;
				}
			}
			if (!res.isHotel) {
				$(".Hotel ").hide();
				$('.hotelBody').hide();
			} else {
				if (flag == 0) {
					$('.Hotel ').addClass('tabActive');
					if (ProfileInfo.HotelJumpHRS) {
						window.open(ProfileInfo.HotelJumpHRS_Url);
						$(".tab").eq(0).click();
					} else {
						$('.hotelBody').show();
					}
					flag = 1;
				}
			}
			if (!res.isTrain) {
				$(".Train").hide();
				$('.trainBody').hide();
			} else {
				if (flag == 0) {
					$('.Train ').addClass('tabActive');
					$('.trainBody').show();
					flag = 1;
				}
			}
			if (!res.isDomesticAir && !res.isInterAir && !res.isHotel && !res.isTrain) {
				$(".searchBody").hide();
			}
			if (res.onlineStyle == "APPLE") {
				$(".Hotel").hide();
				$(".appleHotel").removeClass("hide");
				$(".hotelBody").remove();
			} else {
				$(".appleHotelBody").remove();
			}
			if (res.InterDirectSearch) {
				$(".intlDirectCheckBox").prop("checked", true);
			}
			if (res.QueryDomesticTicketsWithTime && res.DomesticHideAllDay) {
				$(".domAllDay").remove();
				$("#domDepartureSelect").val("8");
				$("#domReturnSelect").val("17");
			}
			if (res.SearchInterAirWTime && res.DomesticHideAllDay) {
				$(".intlAllDay").remove();
				$("#intlDepartureSelect").val("8");
				$("#intlReturnSelect").val("17");
				$(".MultipleSelect").val("8");
				$('.domMultipleSelect').val('8')
			}

			if (res.SearchTrainWithTimeDetail) {
				$(".trainAllDay").remove();
				// domDepartureSelect
				$(".trainDepartureSelect").val("8");
				$('.trainReturnSelect').val('17')
			}
			if (res.HideInterMutiple) {
				$('#intlMultipleTrip+label').remove()
				$('#intlMultipleTrip').remove()
			}
			var chooseFunction = {
				'dom': chooseDom,
				'air': chooseIntl,
				'rail': chooseTrain,
				'hotel': chooseHotel,
				'car': chooseCar
			}
			chooseFunction[SEARCH]()
		},
		error: function () {
			// alert('fail');
		}
	});
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryDateLimit",
			jsonStr: '{"id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function (data) {
			var res = JSON.parse(data);
			console.log(res);
			var limitArray = {
				1: '.searchDomBtn',
				2: '.searchIntlBtn',
				3: '.searchHotelBtn'
			}
			res.map(function (item) {
				if ([1, 2, 3].indexOf(item.LimitType) > -1) {
					$(limitArray[item.LimitType]).attr("CanSearch", item.CanSearch);
					$(limitArray[item.LimitType]).attr("StartLimit", item.StartLimit);
					$(limitArray[item.LimitType]).attr("Message", item.Message);
				}
			})
		},
		error: function () {
			// alert('fail');
		}
	});
	/*根据profile的改变*/
	if (!ProfileInfo.isCodeShare) {
		$(".domCodeShareText").remove();
		$(".domCodeShareCheckBox").remove();
	}
	if (!ProfileInfo.QueryDomesticTicketsWithTime) {
		$("#domDepartureSelect,#domReturnSelect").remove();
	}
	if (!ProfileInfo.SearchTrainWithTimeDetail) {
		$(".trainDepartureSelect,.trainReturnSelect").remove();
	}
	if (!ProfileInfo.ShowDomesticTimeSlt) {
		$(".plusMinus").remove();
	}
	if (!ProfileInfo.SearchInterAirWTime) {
		$("#intlDepartureSelect,#intlReturnSelect,.MultipleSelect").remove();
	}
	//隐藏租车公司权限
	if (ProfileInfo.HideCarRentalCompany) {
		$('.carLine').remove()
	}
	// 方糖，隐藏舱位类型选择，国内国际
	if (ProfileInfo.NeedSpecialPolicy) {
		$("#domCabin  option:first").prop("selected", 'selected');
		$("#domCabin").attr('disabled', 'disabled')
		$("#intlCabin  option:first").prop("selected", 'selected');
		$("#intlCabin").attr('disabled', 'disabled')
	}
	$('.searchPage').hide();
	$('.airDomBody').show();
	//tab切换
	$(".tab").unbind("click").click(function () {
		$('.tab').removeClass('tabActive');
		$(this).addClass('tabActive');
		$('.searchPage').hide();
		if ($(this).hasClass('airDom')) {
			$('.airDomBody').show();
		} else if ($(this).hasClass('airIntl')) {
			$('.airIntlBody').show();
			$("#intlRoundTrip").click();
		} else if ($(this).hasClass('Hotel')) {
			if (ProfileInfo.HotelJumpHRS) {
				window.open(ProfileInfo.HotelJumpHRS_Url);
				$(".tab").eq(0).click();
			} else {
				$('.hotelBody').show();
			}
		} else if ($(this).hasClass('Train')) {
			$('.trainBody').show();
		} else if ($(this).hasClass('appleHotel')) {
			appleHotelPop();
			$('.appleHotelBody').show();
		} else if ($(this).hasClass('Car')) {
			$('.carBody').show();
		} else if ($(this).hasClass('Visa')) {
			$('.visaBody').show();
			// window.location.href='../visa/visaPage.html'
		}
	})
	if (TAnumber != undefined && TAnumber != "") {
		getCity()
	}
	// 2020.11.26 酒店跳转
	if (ProfileInfo.HotelJumpHRSWeb) {
		$('#indexHotelTab').unbind("click").click(function () {
			window.open(ProfileInfo.HRSWebsite);
		})
	}
}
/*2020-2-11 apple酒店提醒*/
function appleHotelPop(callback) {
	$("body").append('\
	 	<div class="remindCover" style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0, 0, 0, 0.7);z-index: 9999;">\
			<div class="remindPop" style="width: 1000px;height: 270px;background-color: #fff;z-index: 101;position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);border-radius: 10px;padding: 10px;font-family: Sans-serif,Arial,Verdana;">\
				<div class="remindPopTittle" style="border-bottom:1px solid #e6e6e6;width: 100%;height: 80px;line-height: 80px;font-size: 26px;font-weight: 600;position: relative;box-sizing: border-box;padding-left: 10px;font-family: Arial,Verdana;">HOTEL BOOKING ALERT<div class="WHclosePopIcon" style="width: 30px;height: 30px;line-height: 30px;text-align: center;font-size: 26px;font-weight: 600;color: #9b9b9b;position: absolute;top: 25px;right: 10px;cursor: pointer;">x</div></div>\
					<div style="box-sizing: border-box;padding:10px;font-size: 15px;line-height:24px;">\
						<p>Apple Travel currently is working with our hotel partners to ensure that we only have our colleagues stay in hotels that meet the standard set by EHS. </p>\
						<br>\
						<p>Hotels in China may temporarily suspend operations or change check-in restrictions due to the ongoing COVID-19 situation. If you plan to stay at a hotel in China within the next two days, please contact Apple Travel to confirm hotel restrictions before traveling.</p>\
				</div>\
			</div>\
	    </div>\
	    ')
	$(".WHclosePopIcon").unbind("click").click(function () {
		$(".remindCover").remove();
		if (callback) {
			callback();
		}
	})
}
/*end*/
//国内机票
function chooseDom() {
	$("input[name=domTrip]").each(function () {
		$(this).click(function () {
			var discount = $(this).attr('id');
			if (discount == "domOneWay") {
				$('.domnotMultiple').show()
				$('.domMultiple').hide()
				$("#domDepartureDate").datepicker('destroy');
				// 12.04修改

				$("#returnPlusMinus").attr('disabled', 'disabled')
				$("#domReturnDate").attr('disabled', 'disabled')
				$("#domReturnSelect").attr('disabled', 'disabled')
				dateChoose("domDepartureDate", "");
				$('.searchDomBtn').attr('state', 'oneWay')
			}
			if (discount == "domRoundTrip") {
				$('.domnotMultiple').show()
				$('.domMultiple').hide()
				$("#domReturnDate").val(getNextDay($("#domDepartureDate").val()));
				// 12.04修改
				GrayreturnPlusMinus()
				$("#domReturnDate").removeAttr('disabled')
				$("#domReturnSelect").removeAttr('disabled')
				$("#domDepartureDate").datepicker('destroy');
				dateChoose("domDepartureDate", "domReturnDate");
				$('.searchDomBtn').attr('state', 'roundTrip');
			}
			if (discount == 'domMultiple') {
				$('.domnotMultiple').hide()
				$('.domMultiple').show().removeClass('hide');
				$('.domAirMultipleBody').show().removeClass('hide');
				$('.searchDomBtn').attr('state', 'multiple')
			}
		});
	});
	// 12.04修改
	$("#returnPlusMinus").attr('disabled', 'disabled')
	$("#domReturnSelect").attr('disabled', 'disabled')
	$('.plusMinus').val('12')//3改成12
	GrayDepartPlusMinus()
	// 2020.1.20 新增国际机票

	$('#DepartPlusMinusintel').val('12')//5改成12
	$('#returnPlusMinusintel').val('12')
	GrayIntelDepartPlusMinus()
	$("#domDepartureCity").kuCity();
	$("#domArrivalCity").kuCity();
	//国内多段
	$('.domMultipleDeparture').kuCity()
	$('.domMultipleArrivel').kuCity()

	$("#domDepartureDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: 0, // 当前日期之后的 0 天，就是当天
		maxDate: 365, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
	});
	$("#domDepartureDate").val(GetDateStr(0));
	$("#domReturnDate").val(GetDateStr(1));
	// 国内票多段时间
	$(".domMultipleDepartureDate").eq(0).val(GetDateStr(0));
	domMultipleDepartureDate();
	/*apple*/
	if (ProfileInfo.onlineStyle == "APPLE") {
		$("#domCabin").remove();
		$(".domCabinTittle").remove();

		$('.domTabBar span').eq(2).remove()
	}
	/*交换*/
	$(".switchIconDom").unbind("click").click(function () {
		cityConversion("domDepartureCity", "domArrivalCity")
	})
	$(".searchDomBtn").unbind("click").click(function () {
		// var btnState=$('.searchDomBtn').attr('state')
		//单程往返
		var that = this;
		var hasDom = false;
		if ($('#domDepartureCity').attr("code") && $('#domArrivalCity').attr("code")) {
			hasDom = true;
		}
		var hasmultiple = false;
		if ($('.domMultipleDeparture').eq(0).attr('code') && $('.domMultipleDeparture').eq(1).attr('code') && $('.domMultipleArrivel').eq(0).attr('code') && $('.domMultipleArrivel').eq(1).attr('code')) {
			hasmultiple = true;
		}
		if (hasDom || hasmultiple) {
			var cityList = '"' + $('#domDepartureCity').attr("code") + '","' + $('#domArrivalCity').attr("code") + '"';
			tools.appleRemindPop(cityList, 1, netUserId, function () {
				var starDom = $('input[name="domTrip"]:checked').attr('id') == "domMultiple" ? $('.domMultipleDepartureDate').eq(0).val() : $('#domDepartureDate').val()
				if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
					if (datedifference(getNowFormatDate(), starDom) < parseInt($(that).attr("startlimit"))) {
						if ($(that).attr("Message").indexOf("\\n") != -1) {
							var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
						} else {
							var mymessage = confirm($(that).attr("Message"));
						}
						if (mymessage == true) {
							if ($(that).attr("CanSearch") != "true") {
								return false;
							}
						} else {
							return false;
						}
					}
				}

				if (ProfileInfo.onlineStyle == "APPLE") {
					var r = confirm(get_lan("appleSearchRemind"));
					if (r == false) {
						return false;
					}
					var berthtype = 1;
					searchDom(berthtype)
				} else {
					var berthtype = $("#domCabin  option:selected").attr("berthtype");
					searchDom(berthtype)
				}
			});

			function searchDom(berthtype) {
				if ($(".searchDomBtn").attr("state") == "oneWay") {
					var searchDomInfo = {
						'type': 'oneWay',
						'departureCityText': $('#domDepartureCity').val(),
						'arrivalCityText': $('#domArrivalCity').val(),
						'departureCity': $('#domDepartureCity').attr("code"),
						'arrivalCity': $('#domArrivalCity').attr("code"),
						'date': $('#domDepartureDate').val(),
						'queryKey': $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' + $(
							'#domDepartureDate').val() + ',' + 'ALL',
						'showCabins': berthtype,
						'codeShare': $('.domCodeShareCheckBox').is(':checked'),
						'isDirect': $('.domCabinInfo .domDirectCheckBox').is(':checked'),
					}
					if (ProfileInfo.QueryDomesticTicketsWithTime) {
						if ($("#domDepartureSelect  option:selected").val() == "all" || $("#domDepartureSelect  option:selected").val() == undefined) {
							var DepartureSelectValue = ''
						} else {
							var DepartureSelectValue = ' ' + $("#domDepartureSelect  option:selected").val() + ':00:00';
						}
						searchDomInfo.queryKey = $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' +
							$(
								'#domDepartureDate').val() + DepartureSelectValue + ',ALL'
					}
					//12.04修改
					if (ProfileInfo.ShowDomesticTimeSlt) {
						$.session.set('searchDomesticDay', $('#DepartPlusMinus').val());
					} else {
						$.session.set('searchDomesticDay', '');
					}
					$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
					window.location.href = '../../domesticAir/airTicketList.html';
				} else if ($(".searchDomBtn").attr("state") == "roundTrip") {
					var searchDomInfo = {
						'type': 'roundTrip',
						'departureCityText': $('#domDepartureCity').val(),
						'arrivalCityText': $('#domArrivalCity').val(),
						'departureCity': $('#domDepartureCity').attr("code"),
						'arrivalCity': $('#domArrivalCity').attr("code"),
						'date': $('#domDepartureDate').val(),
						'returndate': $('#domReturnDate').val(),
						'queryKey': $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' + $(
							'#domDepartureDate').val() + ',' + 'ALL',
						'queryKeyReturn': $('#domArrivalCity').attr("code") + ',' + $('#domDepartureCity').attr("code") + ',' + $(
							'#domDepartureDate').val() + ',' + $('#domReturnDate').val() + ',',
						'showCabins': berthtype,
						'codeShare': $('.domCodeShareCheckBox').is(':checked'),
						'isDirect': $('.domCabinInfo .domDirectCheckBox').is(':checked'),
					}
					if (ProfileInfo.QueryDomesticTicketsWithTime) {
						if ($("#domDepartureSelect  option:selected").val() == "all" || $("#domDepartureSelect  option:selected").val() == undefined) {
							var DepartureSelectValue = ''
						} else {
							var DepartureSelectValue = ' ' + $("#domDepartureSelect  option:selected").val() + ':00:00';
						}
						if ($("#domReturnSelect  option:selected").val() == "all" || $("#domReturnSelect  option:selected").val() == undefined) {
							var ReturnSelectValue = ''
						} else {
							var ReturnSelectValue = ' ' + $("#domReturnSelect  option:selected").val() + ':00:00';
						}
						//12.04修改
						if (ProfileInfo.ShowDomesticTimeSlt) {
							if ($('#domDepartureSelect').val() == 'all') {
								$.session.set('searchDomesticDay', '');
							} else {
								$.session.set('searchDomesticDay', $('#DepartPlusMinus').val());
							}
							if ($('#domReturnSelect').val() == 'all') {
								$.session.set('searchDomesticReturnDay', '');
							} else {
								$.session.set('searchDomesticReturnDay', $('#returnPlusMinus').val());
							}
						} else {
							$.session.set('searchDomesticDay', '');
							$.session.set('searchDomesticReturnDay', '');
						}


						searchDomInfo.queryKey = $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' +
							$(
								'#domDepartureDate').val() + DepartureSelectValue + ',ALL';
						searchDomInfo.queryKeyReturn = $('#domArrivalCity').attr("code") + ',' + $('#domDepartureCity').attr("code") +
							',' + $('#domDepartureDate').val() + DepartureSelectValue + ',' + $('#domReturnDate').val() +
							ReturnSelectValue +
							',ALL';
					}
					$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
					window.location.href = '../../domesticAir/airTicketList.html';
				} else if ($(".searchDomBtn").attr("state") == "multiple") {
					var searchDomInfo = {
						'type': 'multiple',
						'departureCityText': $('.domMultipleDeparture').eq(0).val(),
						'arrivalCityText': $('.domMultipleArrivel').eq(0).val(),
						'lastDepartureCityText': $('.domMultipleDeparture').eq(1).val(),
						'lastCityText': $('.domMultipleArrivel').eq(1).val(),
						'departureCity': $('.domMultipleDeparture').eq(0).attr('code'),
						'arrivalCity': $('.domMultipleArrivel').eq(0).attr("code"),
						'lastDepartureCity': $('.domMultipleDeparture').eq(1).attr('code'),
						'lastCity': $('.domMultipleArrivel').eq(1).attr('code'),
						'date': $('.domMultipleDepartureDate').eq(0).val(),
						'returndate': $('.domMultipleDepartureDate').eq(1).val(),
						'queryKey': $('.domMultipleDeparture').eq(0).attr('code') + ',' + $('.domMultipleArrivel').eq(0).attr('code') + ',' + $(
							'.domMultipleDepartureDate').eq(0).val() + ',' + 'ALL',
						'queryKeyReturn': $('.domMultipleDeparture').eq(1).attr('code') + ',' + $('.domMultipleArrivel').eq(1).attr('code') + ',' + $(
							'.domMultipleDepartureDate').eq(0).val() + ',' + $('.domMultipleDepartureDate').eq(1).val(),
						'showCabins': berthtype,
						'codeShare': $('.domCodeShareCheckBox').is(':checked'),
						'isDirect': $('.domMultiCabinInfo .domDirectCheckBox').is(':checked'),
					}
					$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
					window.location.href = '../../domesticAir/airTicketList.html';
				}
			}
		} else {
			alert(get_lan('searchRemind'));
		}
	})
}
function useSwapStationEffect() {
	$('.search_station_transform').unbind('click').click(function () {
		var index = $(this).attr('index')
		var multiple = ''
		if (SEARCH === 'air') {
			// 机票有多段
			multiple = $('.multipleAir').hasClass('hide') ? '.notMultipleAir' : '.multipleAir'
		}

		var rotate = parseInt($(this).attr('rotate')) + 180
		$(multiple + ' .search_station_transform-icon').eq(index).css('transform', 'rotate(' + rotate + 'deg)')
		$(multiple + ' .search_station_transform').attr('rotate', rotate)
		// 交换数据
		var from = $(multiple + ' .search_from').eq(index), to = $(multiple + ' .search_to').eq(index)
		var val = to.val() || '',
			code = to.attr('code') || '',
			cn = to.attr('cn') || '',
			en = to.attr('en') || '',
			cityCode = to.attr('cityCode') || ''
		var fromVal = from.val() || '',
			fromCode = from.attr('code') || '',
			fromCn = from.attr('cn') || '',
			fromEn = from.attr('en') || '',
			fromCityCode = from.attr('cityCode') || ''
		to.val(fromVal)
			.attr('code', fromCode)
			.attr('cn', fromCn)
			.attr('en', fromEn)
			.attr('cityCode', fromCityCode)
		from.val(val)
			.attr('code', code)
			.attr('cn', cn)
			.attr('en', en)
			.attr('cityCode', cityCode)
	})
}
//国际机票
function chooseIntl() {
	$("input[name=searchState]").each(function () {
		$(this).click(function () {
			var state = $(this).attr('state');
			if (state == "1") {
				$(".notMultipleAir").removeClass("hide");
				$(".multipleAir").addClass("hide");
				$('.air-items').removeClass('hideOptions').addClass('showOptions')

				$("#intlDepartureDate").datepicker('destroy');
				$("#intlReturnDate").datepicker('destroy').attr('disabled', 'disabled');
				dateChoose("intlDepartureDate", "");
				$('.searchIntlBtn').attr('state', 'oneWay');
				if (ProfileInfo.onlineStyle == "APPLE") {
					var r = confirm(get_lan("appleIntlRemind"))
					if (r == true) {
						$("#intlRoundTrip").click();
					}
				}
				// 改变颜色  禁止选择
				$("#returnPlusMinusintel").attr('disabled', 'disabled')
				$("#intlReturnSelect").attr('disabled', 'disabled')
			}
			if (state == "2") {
				$(".notMultipleAir").removeClass("hide");
				$(".multipleAir").addClass("hide");
				$('.air-items').removeClass('hideOptions').addClass('showOptions')

				$("#intlReturnDate").val(getNextDay($("#intlDepartureDate").val())).removeAttr('disabled');
				$("#intlDepartureDate").datepicker('destroy');
				dateChoose("intlDepartureDate", "intlReturnDate");
				$('.searchIntlBtn').attr('state', 'roundTrip')
				$("#returnPlusMinusintel").removeAttr('disabled')
				$("#intlReturnSelect").removeAttr('disabled')
				GrayIntelreturnPlusMinus()
			}
			if (state == "3") {
				$(".notMultipleAir").addClass("hide");
				$(".multipleAir").removeClass("hide");
				$('.air-items').removeClass('showOptions').addClass('hideOptions')
				$('.searchIntlBtn').attr('state', 'multiple')
			}
			reRenderBannerSize()
		});
	});
	$("input[name='searchState'][value=2]").click()
	$("input[name='searchState'][value=2]").attr('checked', true);

	/*单程往返*/
	$("#intlDepartureCity").kuCity();
	$("#intlArrivalCity").kuCity();
	$("#transitCity").kuCity();
	/*转机*/
	$(".transitText,.addTransitIcon").unbind("click").click(function () {
		$(".transitCityBody").removeClass("hide");
		$(".addTransitBody").addClass("hide");
		$(".intlDirectCheckBoxBody").addClass("hide");
	})
	$(".hideTransitIcon").unbind("click").click(function () {
		$(".transitCityBody").addClass("hide");
		$(".addTransitBody").removeClass("hide");
		$(".intlDirectCheckBoxBody").removeClass("hide");
	})
	$("#intlDepartureDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: 0, // 当前日期之后的 0 天，就是当天
		maxDate: 365, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
	});
	$("#intlDepartureDate").val(GetDateStr(0));
	$("#intlReturnDate").val(GetDateStr(1));
	$(".switchIconIntl").unbind("click").click(function () {
		cityConversion("intlDepartureCity", "intlArrivalCity");
	})
	/*多段*/
	$(".MultipleDepartureDate").eq(0).val(GetDateStr(0));
	MultipleDepartureDate();
	$(".addAirIntlBody").unbind("click").click(function () {
		var multipleLiLength = $(".MultipleDepartureDate").length - 1;
		if (!$(".MultipleDepartureCity").eq(multipleLiLength).attr("code") || !$(".MultipleArrivelCity").eq(
			multipleLiLength).attr("code")) {
			alert(get_lan("searchBody").multipleRemind);
			return false;
		}
		$(this).before('\
			<div class="search_inputItems">\
				<div class="search_air-airports_box">\
					<div class="intlDepartureCitySearch search_input-box">\
						<h6 class="search_title">'+ get_lan('searchBody').from + '</h6>\
						<input class="search_input search_from MultipleDepartureCity" type="text" autocomplete="off" placeholder="' + get_lan('searchBody').fromPlaceholder + '"/>\
					</div>\
					<div class="search_station_transform" index="'+ (multipleLiLength + 1) + '" rotate="0">\
						<img src="/images/Aus/air/icon_dom.png"/>\
						<img src="/images/Aus/air/icon_dh.png" class="search_station_transform-icon"/>\
					</div>\
					<div class="intlArrivalCitySearch search_input-box">\
						<h6 class="search_title">'+ get_lan('searchBody').to + '</h6>\
						<input class="search_input search_to MultipleArrivelCity" inputIndex="'+ (multipleLiLength + 1) + '" type="text" autocomplete="off" placeholder="' + get_lan('searchBody').toPlaceholder + '" />\
					</div>\
				</div>\
				<div class="intlDepartureDateSearch search_input-box">\
					<h6 class="search_title">'+ get_lan('searchBody').departureDate + '</h6>\
					<div class="search_input-box-multiple">\
						<input class="search_air-date MultipleDepartureDate" type="text" readonly />\
						<select type="text" class="MultipleSelect">'+ getHoursOptions('intlAllDay') + '</select>\
					</div>\
				</div>\
				<div class="delMultipleLi"></div>\
			</div>\
            '
		)
		useSwapStationEffect()
		reRenderBannerSize()
		if (ProfileInfo.SearchInterAirWTime && ProfileInfo.DomesticHideAllDay) {
			$(".intlAllDay").remove();
			$(".MultipleSelect").eq($(".MultipleSelect").length - 1).val("8");
		}
		if (!ProfileInfo.SearchInterAirWTime) {
			$(".MultipleSelect").remove();
		}
		$(".MultipleDepartureCity").eq($(".MultipleDepartureCity").length - 1).val($(".MultipleArrivelCity").eq($(".MultipleArrivelCity").length - 2).val());
		$(".MultipleDepartureCity").eq($(".MultipleDepartureCity").length - 1).attr("code", $(".MultipleArrivelCity").eq($(".MultipleArrivelCity").length - 2).attr("code"));
		$(".MultipleDepartureCity").kuCity();
		$(".MultipleArrivelCity").kuCity();

		$(".delMultipleLi").unbind("click").click(function () {
			$(this).parent().remove();
			for (var i = 0; i < $(".multipleAir .search_station_transform").length; i++) {
				$(".multipleAir .search_station_transform").eq(i).attr('index', i);
				$('.multipleAir .MultipleArrivelCity').eq(i).attr('inputIndex', i)
			}
			reRenderBannerSize()
		})
		MultipleDepartureDate("add");
	})
	$(".MultipleDepartureCity").kuCity();
	$(".MultipleArrivelCity").kuCity();
	// MultipleDepartureDate 移到外面去
	// 近期搜索国际票
	function setRecentSearch(searchAirInfo) {
		var newRecentInfo = searchAirInfo
		newRecentInfo.departureCityName = {
			cn: $("#intlDepartureCity").attr('cn'),
			en: $("#intlDepartureCity").attr('en')
		}
		newRecentInfo.arrivalCityName = {
			cn: $("#intlArrivalCity").attr('cn'),
			en: $("#intlArrivalCity").attr('en')
		}
		searchAirInfo.departureCityName = {
			cn: $("#intlDepartureCity").attr('cn'),
			en: $("#intlDepartureCity").attr('en')
		}
		searchAirInfo.arrivalCityName = {
			cn: $("#intlArrivalCity").attr('cn'),
			en: $("#intlArrivalCity").attr('en')
		}
		if (localStorage.getItem('recentSearch')) {
			var recentAirSearch = JSON.parse(localStorage.getItem('recentSearch'))
			if (JSON.parse(localStorage.getItem('recentSearch')).air) {
				recentAirSearch.air = recentAirSearch.air.filter(function (element) {
					if (element.departureCity !== newRecentInfo.departureCity || element.arrivalCity !== newRecentInfo.arrivalCity
						|| element.date !== newRecentInfo.date || element.returndate !== newRecentInfo.returndate) {
						return true
					} else {
						return false
					}
				})
				recentAirSearch.air.unshift(newRecentInfo)
				if (recentAirSearch.air.length > 5) {
					recentAirSearch.air.pop()
				}
			} else {
				recentAirSearch['air'] = [newRecentInfo]
			}
		} else {
			var recentAirSearch = { air: [newRecentInfo] }
		}
		localStorage.setItem('recentSearch', JSON.stringify(recentAirSearch))
	}
	/*搜索国际机票*/
	$(".searchIntlBtn").unbind("click").click(function () {
		var that = this;
		if ($(".searchIntlBtn").attr("state") == "oneWay" || $(".searchIntlBtn").attr("state") == "roundTrip") {
			var cityList = '"' + $('#intlDepartureCity').attr("code") + '","' + $('#intlArrivalCity').attr("code") + '"';
			//先调继续搜索接口看有没有弹窗
			tools.appleRemindPop(cityList, 1, netUserId, function () {
				if ($('#intlDepartureCity').attr("code") && $('#intlArrivalCity').attr("code")) {
					if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
						if (datedifference(getNowFormatDate(), $('#intlDepartureDate').val()) < parseInt($(that).attr("startlimit"))) {
							if ($(that).attr("Message").indexOf("\\n") != -1) {
								var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
							} else {
								var mymessage = confirm($(that).attr("Message"));
							}
							if (mymessage == true) {
								if ($(that).attr("CanSearch") != "true") {
									return false;
								}
							} else {
								return false;
							}
						}
					}
					if (ProfileInfo.onlineStyle == "APPLE") {
						var r = confirm(get_lan("appleSearchRemind"));
						if (r == false) {
							return false;
						} else {
							searchIntl()
						}
					} else {
						searchIntl()
					}

					function searchIntl() {
						if (!$(".transitCityBody").hasClass("hide") && $("#transitCity").attr("code")) {
							var transitCityCode = $("#transitCity").attr("code");
							var isDirect = false;
						} else if (!$(".transitCityBody").hasClass("hide") && !$("#transitCity").attr("code")) {
							alert(get_lan('searchRemind'));
							return false;
						} else {
							var transitCityCode = "";
							var isDirect = $('.intlDirectCheckBox').is(':checked');
						}
						var searchIntlInfo = {
							'type': 'oneWay',
							'departureCityText': $('#intlDepartureCity').val(),
							'arrivalCityText': $('#intlArrivalCity').val(),
							'departureCity': $('#intlDepartureCity').attr("code"),
							'arrivalCity': $('#intlArrivalCity').attr("code"),
							'date': $('#intlDepartureDate').val(),
							'queryKey': $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' + $(
								'#intlDepartureDate').val(),
							'showCabins': $(".search_level_text").attr("berthtype"),
							'isDirect': isDirect,
							'transitCityCode': transitCityCode,
						}
						if ($(".searchIntlBtn").attr("state") == "oneWay") {
							if (ProfileInfo.onlineStyle != "APPLE") {
								var r = confirm(get_lan("appleIntlRemind"))
								if (r == false) {
									return false;
								}
							}
							setRecentSearch(searchIntlInfo)

							if (ProfileInfo.SearchInterAirWTime) {
								if ($("#intlDepartureSelect  option:selected").val() == "all" || $("#intlDepartureSelect  option:selected").val() == undefined) {
									var DepartureSelectValue = ''
								} else {
									var DepartureSelectValue = ' ' + $("#intlDepartureSelect  option:selected").val() + ':00:00';
								}
								searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") +
									',' +
									$('#intlDepartureDate').val() + DepartureSelectValue;
							}
							// 2020.1.20 国际机票  时间筛选
							if (ProfileInfo.ShowDomesticTimeSlt) {
								if ($('#intlDepartureSelect').val() == 'all') {
									$.session.set('searchIntelDay', '');
								} else {
									$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
								}
							} else {
								$.session.set('searchIntelDay', '');
							}
							$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
							window.location.href = '../../intlAir/airTicketList.html';
						} else if ($(".searchIntlBtn").attr("state") == "roundTrip") {
							searchIntlInfo.type = "roundTrip"
							searchIntlInfo.returndate = $('#intlReturnDate').val()
							searchIntlInfo.queryKeyReturn = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' + $(
								'#intlDepartureDate').val() + ',' + $('#intlReturnDate').val()

							if (ProfileInfo.SearchInterAirWTime) {
								if ($("#intlDepartureSelect option:selected").val() == "all" || $("#intlDepartureSelect option:selected").val() == undefined) {
									var DepartureSelectValue = ''
								} else {
									var DepartureSelectValue = ' ' + $("#intlDepartureSelect option:selected").val() + ':00:00';
								}
								if ($("#intlReturnSelect option:selected").val() == "all" || $("#intlReturnSelect option:selected").val() == undefined) {
									var ReturnSelectValue = ''
								} else {
									var ReturnSelectValue = ' ' + $("#intlReturnSelect option:selected").val() + ':00:00';
								}
								searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") +
									',' +
									$('#intlDepartureDate').val() + DepartureSelectValue;
								searchIntlInfo.queryKeyReturn = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") +
									',' + $('#intlDepartureDate').val() + DepartureSelectValue + ',' + $('#intlReturnDate').val() +
									ReturnSelectValue;
							}
							setRecentSearch(searchIntlInfo)

							// 2020.1.20 国际机票  时间筛选
							if (ProfileInfo.ShowDomesticTimeSlt) {
								if ($('#intlDepartureSelect').val() == 'all') {
									$.session.set('searchIntelDay', '');
								} else {
									$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
								}
								if ($('#intlReturnSelect').val() == 'all') {
									$.session.set('searchIntelReturnDay', '');
								} else {
									$.session.set('searchIntelReturnDay', $('#returnPlusMinusintel').val());
								}
							} else {
								$.session.set('searchIntelDay', '');
								$.session.set('searchIntelReturnDay', '');
							}
							$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
							window.location.href = '../../intlAir/airTicketList.html?intlState=1';
						}
					}
				} else {
					alert(get_lan('searchRemind'));
				}
			});
		} else if ($(".searchIntlBtn").attr("state") == "multiple") {
			var orgList = '';
			var dstList = '';
			var dateList = '';
			/*2020-2-26*/
			var cityList = ''
			/*end*/
			for (var i = 0; i < $(".multipleAir .search_inputItems").length; i++) {
				if (!$(".MultipleDepartureCity").eq(i).attr("code") || !$(".MultipleArrivelCity").eq(i).attr("code") || $(".MultipleDepartureDate").eq(i).val() == "") {
					alert(get_lan('searchRemind'));
					return false;
				}
				if (ProfileInfo.SearchInterAirWTime) {
					if ($(".MultipleSelect").eq(i).val() == "all") {
						var MultipleTime = '';
					} else {
						var MultipleTime = ' ' + $(".MultipleSelect").eq(i).val() + ':00:00';
					}
				} else {
					var MultipleTime = '';
				}
				orgList += $(".MultipleDepartureCity").eq(i).attr("code");
				orgList += ',';
				dstList += $(".MultipleArrivelCity").eq(i).attr("code");
				dstList += ',';
				dateList += $(".MultipleDepartureDate").eq(i).val() + MultipleTime;
				dateList += ',';
				cityList += '"' + $(".MultipleDepartureCity").eq(i).attr("code") + '","' + $(".MultipleArrivelCity").eq(i).attr(
					"code") + '",';
			}
			var intlDateList = dateList.substring(0, dateList.length - 1).split(',');

			function test(arr, i) {
				if (i == 0) {
					return "yes";
				} else {
					if ((new Date(arr[i].split(' ')[0].replace(/-/g, "\/"))) >= (new Date(arr[i - 1].split(' ')[0].replace(/-/g, "\/")))) {
						return test(arr, i - 1);
					} else {
						return "no";
					}
				}
			}
			if (test(intlDateList, intlDateList.length - 1) == "no") {
				alert(get_lan('searchRemind'));
				return false;
			}
			// if (ProfileInfo.onlineStyle == "APPLE") {
			var cityList = cityList.substring(0, cityList.length - 1);
			tools.appleRemindPop(cityList, 1, netUserId, function () {
				if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
					if (datedifference(getNowFormatDate(), $('.MultipleDepartureDate ').eq(0).val()) < parseInt($(that).attr(
						"startlimit"))) {
						if ($(that).attr("Message").indexOf("\\n") != -1) {
							var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
						} else {
							var mymessage = confirm($(that).attr("Message"));
						}
						if (mymessage == true) {
							if ($(that).attr("CanSearch") != "true") {
								return false;
							} else {
								searchMultipleIntl(orgList, dstList, dateList)
							}
						} else {
							return false;
						}
					} else {
						searchMultipleIntl(orgList, dstList, dateList)
					}
				} else {
					searchMultipleIntl(orgList, dstList, dateList)
				}
			});
			// } else {
			// 	searchMultipleIntl(orgList, dstList, dateList);
			// }

			function searchMultipleIntl(orgList, dstList, dateList) {
				var searchIntlInfo = {
					'type': 'multiple',
					"orgList": orgList.substring(0, orgList.length - 1),
					"dstList": dstList.substring(0, dstList.length - 1),
					"dateList": dateList.substring(0, dateList.length - 1),
					"cabinType": $(".search_level_text").attr("berthtype"),
				}
				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				window.location.href = '../../intlAir/airTicketListMultiple.html?intlState=1';
			}
		}
	})
}
//国内多段时间
function domMultipleDepartureDate(type) {
	if (type != "add") {
		$(".domMultipleDepartureDate").datepicker('destroy')
	}
	for (var i = 0; i < $(".domMultipleDepartureDate").length; i++) {
		if (i == $(".domMultipleDepartureDate").length - 2) {
			var dateIndex = i;
			$(".domMultipleDepartureDate").eq(dateIndex + 1).val($(".domMultipleDepartureDate").eq(dateIndex).val());
			var mindate = 0,
				maxdate = 365
			if (TAnumber != undefined && TAnumber != "") {
				// mindate = TAminDate
				var minTime = new Date().getTime()
				var minTime2
				if (TAminDate == 0) {
					minTime2 = new Date().getTime()
				} else {
					minTime2 = new Date(TAminDate.replace(/-/g, "/")).getTime()
				}
				mindate = minTime < minTime2 ? TAminDate : new Date()
				maxTime = TAmaxDate
				maxdate = TAmaxDate
				if (type != "add") {
					var t = new Date(mindate)
					var y = t.getFullYear()
					var m = t.getMonth() + 1 < 10 ? 0 + "" + (t.getMonth() + 1) : t.getMonth() + 1
					var d = t.getDate()
					$(".domMultipleDepartureDate").eq(dateIndex).val(y + '-' + m + '-' + d);
				}
				$(".domMultipleDepartureDate").eq(dateIndex + 1).val($(".domMultipleDepartureDate").eq(dateIndex).val());
			}
			$(".domMultipleDepartureDate").eq(dateIndex).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: mindate, // 当前日期之后的 0 天，就是当天
				maxDate: maxdate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
				onSelect: function () {
					// MultipleDepartureDate();
					$(".domMultipleDepartureDate").eq(dateIndex + 1).val($(".domMultipleDepartureDate").eq(dateIndex).val());
					$(".domMultipleDepartureDate").eq(dateIndex + 1).datepicker('destroy');
					$(".domMultipleDepartureDate").eq(dateIndex + 1).datepicker({
						dateFormat: 'yy-mm-dd',
						changeMonth: true,
						minDate: $(".domMultipleDepartureDate").eq(dateIndex + 1).val(), // 当前日期之后的 0 天，就是当天
						maxDate: maxdate, // 当前日期之后的 0 天，就是当天
						hideIfNoPrevNext: true,
						showOtherMonths: true,
						selectOtherMonths: true,
						changeYear: true,
					});
				}
			});
			$(".domMultipleDepartureDate").eq(dateIndex + 1).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: $(".domMultipleDepartureDate").eq(dateIndex + 1).val(), // 当前日期之后的 0 天，就是当天
				maxDate: maxdate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
				onSelect: function () {
					// MultipleDepartureDate();
				}
			});
		}
	}
}
// 多段 时间
function MultipleDepartureDate(type) {
	if (type != "add") {
		$(".MultipleDepartureDate").datepicker('destroy')
	}
	for (var i = 0; i < $(".MultipleDepartureDate").length; i++) {
		if (i == $(".MultipleDepartureDate").length - 2) {
			var dateIndex = i;
			$(".MultipleDepartureDate").eq(dateIndex + 1).val($(".MultipleDepartureDate").eq(dateIndex).val());
			var mindate = 0,
				maxdate = 365
			if (TAnumber != undefined && TAnumber != "") {
				// mindate = TAminDate
				var minTime = new Date().getTime()
				var minTime2
				if (TAminDate == 0) {
					minTime2 = new Date().getTime()
				} else {
					minTime2 = new Date(TAminDate.replace(/-/g, "/")).getTime()
				}
				mindate = minTime < minTime2 ? TAminDate : new Date()
				maxTime = TAmaxDate
				maxdate = TAmaxDate
				if (type != "add") {
					var t = new Date(mindate)
					var y = t.getFullYear()
					var m = t.getMonth() + 1 < 10 ? 0 + "" + (t.getMonth() + 1) : t.getMonth() + 1
					var d = t.getDate()
					$(".MultipleDepartureDate").eq(dateIndex).val(y + '-' + m + '-' + d);
				}
				$(".MultipleDepartureDate").eq(dateIndex + 1).val($(".MultipleDepartureDate").eq(dateIndex).val());
			}
			$(".MultipleDepartureDate").eq(dateIndex).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: mindate, // 当前日期之后的 0 天，就是当天
				maxDate: maxdate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
				onSelect: function () {
					// MultipleDepartureDate();
					$(".MultipleDepartureDate").eq(dateIndex + 1).val($(".MultipleDepartureDate").eq(dateIndex).val());
					$(".MultipleDepartureDate").eq(dateIndex + 1).datepicker('destroy');
					$(".MultipleDepartureDate").eq(dateIndex + 1).datepicker({
						dateFormat: 'yy-mm-dd',
						changeMonth: true,
						minDate: $(".MultipleDepartureDate").eq(dateIndex + 1).val(), // 当前日期之后的 0 天，就是当天
						maxDate: maxdate, // 当前日期之后的 0 天，就是当天
						hideIfNoPrevNext: true,
						showOtherMonths: true,
						selectOtherMonths: true,
						changeYear: true,
					});
				}
			});
			$(".MultipleDepartureDate").eq(dateIndex + 1).datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				minDate: $(".MultipleDepartureDate").eq(dateIndex + 1).val(), // 当前日期之后的 0 天，就是当天
				maxDate: maxdate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				changeYear: true,
				onSelect: function () {
					// MultipleDepartureDate();
				}
			});
		}
	}
}

/*时间内提示*/
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

function datedifference(sDate1, sDate2) {
	var dateSpan,
		tempDate,
		iDays;
	sDate1 = Date.parse(sDate1);
	sDate2 = Date.parse(sDate2);
	dateSpan = sDate2 - sDate1;
	dateSpan = Math.abs(dateSpan);
	iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
	return iDays
};
function switchSearchWrapperZIndex(dom) {
	setTimeout(function () {
		if (dom.hasClass('hidden')) {
			$('.search_wrapper').css('z-index', 0)	// 控制弹窗到底层
		} else {
			$('.search_wrapper').css('z-index', 1)	// 控制弹窗到第一层
		}
	}, 11)
}
function handleSearchButtonClick() {
	$('.search_price_title').mousedown(function () {
		$(this).siblings().usePopWindowEffect(300, $('.search_price'))
		$('.searchStarBody').closePopWindow(300, $('.search_level'))
		switchSearchWrapperZIndex($(this).siblings())
	})
	$('.search_level_title').mousedown(function () {
		$(this).siblings().usePopWindowEffect(300, $('.search_level'))
		$('.searchPriceBody').closePopWindow(300, $('.search_price'))
		switchSearchWrapperZIndex($(this).siblings())
	})
}
$(document).on('mousedown', function (e) {
	var target = $(e.target)
	if (!target.is('.search_price *')) {
		$('.searchPriceBody').closePopWindow(300, $('.search_price'))
	}
	if (!target.is('.search_level *')) {
		$('.searchStarBody').closePopWindow(300, $('.search_level'))
	}
	if (!target.is('#search_items-intlCabin *')) {
		// 机票和租车
		$('#intlCabin,#carCompany').closePopWindow(300, $('#search_items-intlCabin'))
	}
	if (!target.is('.search_price *') && !target.is('.search_level *') && !target.is('.search_keyword_box *') && !target.is('#search_items-intlCabin *')) {
		$('.search_wrapper').css('z-index', 0)	// 控制弹窗到底层
	}
	if (!target.hasClass('hotel_addr') && !target.hasClass('search_hotelAddress_option')) {
		$('.search_hotelAddress_options').addClass('hide')
	}
})
window.onscroll = function () {
	//清除弹窗
	$('.search_wrapper').css('z-index', 0)	// 控制弹窗到底层
	$('.searchStarBody').closePopWindow(300, $('.search_filter-box'))
	$('.searchPriceBody').closePopWindow(300, $('.search_filter-box'))
	$('#intlCabin,#carCompany').closePopWindow(300, $('.search_filter-box'))
	closeHeaderPopWindow()
}

//酒店
function chooseHotel() {
	var HotelSearchLevel = []

	$('.search_wrapper').attr('name', 'hotel')
	// $('input[name="hotelState"][state="2"]').attr('checked', true)
	// $("input[name=hotelState],input[name=applehotel]").each(function () {
	// 	$(this).click(function () {
	// 		var discount = $(this).attr('state');
	// 		if (discount == "1") {
	// 			$("#hotelCity").val('');
	// 			$("#hotelCity").removeAttr('code');
	// 			$("#hotelCity").removeAttr("id").attr("id", "hotelCity");
	// 			$("#hotelCity").kuCity();
	// 			$('.searchHotelBtn').attr('state', 'domHotel');
	// 			$('.searchAppleHotelBtn').attr('state', 'domHotel');
	// 		}
	// 		if (discount == "2") {
	// 			$("#hotelCity").val('');
	// 			$("#hotelCity").removeAttr('code');
	// 			$("#hotelCity").removeAttr("id").attr("id", "hotelCity");
	// 			$("#hotelCity").kuCity();
	// 			$('.searchHotelBtn').attr('state', 'intlHotel');
	// 			$('.searchAppleHotelBtn').attr('state', 'intlHotel');
	// 		}
	// 	});
	// });
	$("#hotelCity").kuCity();
	$("#hotelDepartureDate").val(GetDateStr(0));
	$("#hotelReturnDate").val(GetDateStr(1));
	dateChoose("hotelDepartureDate", "hotelReturnDate");

	//选择星级
	$(".hotelStarBtn").unbind("click").click(function () {
		if ($(this).attr("star") == "1-2-3-4-5") {
			$(".hotelStarBtn").removeClass("starChoose");
			$(this).addClass("starChoose");
			HotelSearchLevel.length = 0
			$('.search_level_text').text(get_lan('searchBody').allStar)

		} else {
			if ($(this).hasClass("starChoose")) {
				$(this).removeClass("starChoose");
				var noSingleOption = true
				$('.hotelStarBtn').map(function (index) {
					if ($('.hotelStarBtn').eq(index).hasClass('starChoose')) {
						noSingleOption = false
					}
				})
				if (noSingleOption) {
					$(".hotelStarBtn").eq(0).addClass("starChoose");
				}
			} else {
				$(this).addClass("starChoose");
				$(".hotelStarBtn").eq(0).removeClass("starChoose");
			}
			if ($(".starChoose").length == 0) {
				$(".hotelStarBtn").eq(0).addClass("starChoose");
				HotelSearchLevel.length = 0
			} else {
				HotelSearchLevel.length = 0
				$('.searchStarBody .starChoose').map(function (index) {
					var star = $('.searchStarBody .starChoose').eq(index).attr('star')
					if (star == "1-2-3-4-5") {
						HotelSearchLevel.push(get_lan('searchBody').allStar)
					}
					if (star === '1-2') {//二星级以及一下
						HotelSearchLevel.push(get_lan('searchBody').star12)
					}
					if (star === '3') {//三星级
						HotelSearchLevel.push(get_lan('searchBody').star3)
					}
					if (star === '4') {//四星级
						HotelSearchLevel.push(get_lan('searchBody').star4)
					}
					if (star === '5') {//五星级
						HotelSearchLevel.push(get_lan('searchBody').star5)
					}
				})
				$('.search_level_text').text(HotelSearchLevel.join(', '))
			}
		}
	})
	//选择价格
	$(".hotelPriceBtn").unbind("click").click(function () {
		$('.hotelPriceBtn').removeClass('starChoose')
		$(this).addClass('starChoose')

		$(".searchMinPrice").val($(this).attr("minPrice"))
		$(".searchMaxPrice").val($(this).attr("maxPrice"))
		setPriceTitle()
	})
	function setPriceTitle() {
		var min = $('.searchMinPrice').val()
		var max = $('.searchMaxPrice').val()
		$('.search_price_text').text(min + '-' + max + ProfileInfo.OfficeCurrency)
		$('.search_price_text').attr('minPrice', min)
		$('.search_price_text').attr('maxPrice', max)
	}
	var minIndex, maxIndex
	$(".searchMinPrice").unbind("change").change(function () {
		getinputPrice()
		setPriceTitle()
	})
	$(".searchMaxPrice").unbind("change").change(function () {
		getinputPrice()
		setPriceTitle()
	})

	function getinputPrice() {
		var inputMin = $(".searchMinPrice").val()
		var inputMax = $(".searchMaxPrice").val()
		$(".hotelPriceBtn").map(function (index) {
			var max = $(this).attr("maxPrice")
			var min = $(this).attr("minPrice")
			if (max == inputMax) {
				maxIndex = index
			}
			if (min == inputMin) {
				minIndex = index
			}
		})
		$('.hotelPriceBtn').removeClass('starChoose')
		if (maxIndex == minIndex) {
			$($('.hotelPriceBtn')[maxIndex]).addClass('starChoose')
		}
	}

	$("input[name=hotelCheck]").each(function () {
		$(this).click(function () {
			if ($(this).is(':checked')) {
				$(this).next(".star").css("color", "#F58A00");
			} else {
				$(this).next(".star").css("color", "#000");
			}
		});
	});
	$("#keyWordInput").unbind("click").click(function () {
		if ($(".searchHotelBtn").attr("state") == "domHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
		} else if ($(".searchHotelBtn").attr("state") == "intlHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
		}
		if (!hotelCityCode) {
			$(".keyWordBody").html('');
			alert(get_lan('searchBody').keyWordRemind);
		} else {
			$("#keyWordInput").on('input propertychange', function () {
				debounceSearchHotel();
			})
			var debounceSearchHotel = debounce(searchHotel, 500);
			function searchHotel() {
				$(".keyWordBody").html("");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/SearchHotelRelatedInfoPost",
						jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + obtLanguage +
							'","queryKey":"' + $("#keyWordInput").val() + '"}'
					},
					success: function (data) {
						var res = JSON.parse(data);
						console.log(res);
						$(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
						res.RelatedInfos.map(function (item) {
							var keyWordType = '', keyWordTypeText = '';
							switch (parseInt(item.Type)) {
								case 1:
									keyWordType = 'keywordTitle--district';
									keyWordTypeText = get_lan('keyWordBody').keywordDistrict;
									break;
								case 2:
									keyWordType = 'keywordTitle--commercial';
									keyWordTypeText = get_lan('keyWordBody').keywordCommercial;
									break;
								case 3:
									keyWordType = 'keywordTitle--extCommercial';
									keyWordTypeText = get_lan('keyWordBody').keywordExtCommercial;
									break;
								case 4:
									keyWordType = 'keywordTitle--brand';
									keyWordTypeText = get_lan('keyWordBody').keywordBrand;
									break;
								case 5:
									keyWordType = 'keywordTitle--hotel';
									keyWordTypeText = get_lan('keyWordBody').keywordHotel;
									break;
								default:
									keyWordType = '';
									keyWordTypeText = '';
									break;
							}
							var contentDom = "<span class='content'>" + item.Content.replace($('#keyWordInput').val(), "<b>" + $('#keyWordInput').val() + "</b>") + "</span>";
							var keyWordTypeHTML = '<span class="keyWordBodyLi--type">' + keyWordTypeText + '</span>';
							$(".keyWordBodyList").append('\
                                <li class="keyWordBodyLi ' + keyWordType + '" type="' +
								item.Type + '" relationId="' + item.ID + '" key="' + item.Key + '">' + contentDom + keyWordTypeHTML +
								'</li>\
                                ')
						})
						$(".keyWordBodyLi").on('mousedown', function () {
							$("#keyWordInput").val($(this).find('.content').text());
							$("#keyWordInput").attr("relationId", $(this).attr("relationId"));
							$("#keyWordInput").attr("hoteltype", $(this).attr("type"));
							$("#keyWordInput").attr("key", $(this).attr("key"));
							$(".keyWordBody").hide();
							$('.search_wrapper').css('z-index', 0)

						})
					},
					error: function () {
						// alert('fail');
					}
				});
			}
			$('body').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelRelatedInfoPost",
					jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + $.session.get(
						'obtLanguage') + '"}'
				},
				success: function (data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					//推荐酒店
					var hotelLength = res.HistoryHotelList.length > 4 ? 4 : res.HistoryHotelList.length;
					var hotelStr = '';
					for (var i = 0; i < hotelLength; i++) {
						if (obtLanguage == "CN") {
							hotelStr += '<div class="relationLi" type="' + res.HistoryHotelList[i].Type +
								'" relationId="' + res.HistoryHotelList[i].ID + '" key="' + res.HistoryHotelList[i].NameCn + '">' + res.HistoryHotelList[
									i].NameCn + '</div>';
						} else if (obtLanguage == "EN") {
							hotelStr += '<div class="relationLi" type="' + res.HistoryHotelList[i].Type +
								'" relationId="' + res.HistoryHotelList[i].ID + '" key="' + res.HistoryHotelList[i].NameCn + '">' + res.HistoryHotelList[
									i].NameEn + '</div>';
						}
					}

					var brandLength = res.BrandList.length > 10 ? 10 : res.BrandList.length;
					var districtLength = res.DistrictList.length > 10 ? 10 : res.DistrictList.length;
					var commercialLength = res.CommercialList.length > 10 ? 10 : res.CommercialList.length;
					var extCommercialLength = res.ExtCommercialList.length > 10 ? 10 : res.ExtCommercialList.length;

					function moreBtn(cls) {
						return '<div class="moreBtn ' + cls + '">More</div>'
					}
					var brandMore = res.BrandList.length > 10 ? moreBtn('brand') : '';
					var districtMore = res.DistrictList.length > 10 ? moreBtn('district') : '';
					var commercialMore = res.CommercialList.length > 10 ? moreBtn('commercial') : '';
					var extCommercialMore = res.ExtCommercialList.length > 10 ? moreBtn('extCommercial') : '';

					var keyWordsIndexNormal = {
						brandLength: brandLength,
						districtLength: districtLength,
						commercialLength: commercialLength,
						extCommercialLength: extCommercialLength
					}
					var keyWordsIndexPopWindow = {
						brandLength: res.BrandList.length,
						districtLength: res.DistrictList.length,
						commercialLength: res.CommercialList.length,
						extCommercialLength: res.ExtCommercialList.length
					}
					function getKeyWordsDom(lengthObj) {
						//品牌
						var brandStr = '';
						for (var i = 0; i < lengthObj.brandLength; i++) {
							if (obtLanguage == "CN") {
								brandStr += '<div class="relationLi" type="' + res.BrandList[i].Type + '" relationId="' + res.BrandList[i].ID +
									'" key="' + res.BrandList[i].NameCn + '">' + res.BrandList[i].NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								brandStr += '<div class="relationLi" type="' + res.BrandList[i].Type + '" relationId="' + res.BrandList[i].ID +
									'" key="' + res.BrandList[i].NameCn + '">' + res.BrandList[i].NameEn + '</div>';
							}
						}
						//行政区
						var districtStr = '';
						for (var i = 0; i < lengthObj.districtLength; i++) {
							if (obtLanguage == "CN") {
								districtStr += '<div class="relationLi" type="' + res.DistrictList[i].Type + '" relationId="' + res.DistrictList[
									i].ID + '" key="' + res.DistrictList[i].NameCn + '">' + res.DistrictList[i].NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								districtStr += '<div class="relationLi" type="' + res.DistrictList[i].Type + '" relationId="' + res.DistrictList[
									i].ID + '" key="' + res.DistrictList[i].NameCn + '">' + res.DistrictList[i].NameEn + '</div>';
							}
						}
						//商圈
						var commercialStr = '';
						for (var i = 0; i < lengthObj.commercialLength; i++) {
							if (obtLanguage == "CN") {
								commercialStr += '<div class="relationLi" type="' + res.CommercialList[i].Type + '" relationId="' + res.CommercialList[
									i].ID + '" key="' + res.CommercialList[i].NameCn + '">' + res.CommercialList[i].NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								commercialStr += '<div class="relationLi" type="' + res.CommercialList[i].Type + '" relationId="' + res.CommercialList[
									i].ID + '" key="' + res.CommercialList[i].NameCn + '">' + res.CommercialList[i].NameEn + '</div>';
							}
						}
						//附属商圈
						var extCommercialStr = '';
						for (var i = 0; i < lengthObj.extCommercialLength; i++) {
							if (obtLanguage == "CN") {
								extCommercialStr += '<div class="relationLi" type="' + res.ExtCommercialList[i].Type + '" relationId="' +
									res.ExtCommercialList[i].ID + '" key="' + res.ExtCommercialList[i].NameCn + '">' + res.ExtCommercialList[i]
										.NameCn + '</div>';
							} else if (obtLanguage == "EN") {
								extCommercialStr += '<div class="relationLi" type="' + res.ExtCommercialList[i].Type + '" relationId="' +
									res.ExtCommercialList[i].ID + '" key="' + res.ExtCommercialList[i].NameCn + '">' + res.ExtCommercialList[i]
										.NameEn + '</div>';
							}
						}
						return {
							brandStr: brandStr,
							districtStr: districtStr,
							commercialStr: commercialStr,
							extCommercialStr: extCommercialStr
						}
					}
					var keyWordsNormalObj = getKeyWordsDom(keyWordsIndexNormal);
					var keyWordsIndexPopWindowObj = getKeyWordsDom(keyWordsIndexPopWindow);	//弹窗用的对象
					var showHotel = hotelStr == "" ? "hide" : "";
					var showBrand = keyWordsNormalObj.brandStr == "" ? "hide" : "";
					var showDistrict = keyWordsNormalObj.districtStr == "" ? "hide" : "";
					var showCommercial = keyWordsNormalObj.commercialStr == "" ? "hide" : "";
					var showExtCommercial = keyWordsNormalObj.extCommercialStr == "" ? "hide" : "";
					$(".keyWordBody").html('\
                        <div class="relationBody ' + showHotel + '">\
                          	<div class="relationTittle flexRow keywordTitle--hotel">\
                            	<div>' + get_lan('keyWordBody').hotel + '</div>\
                         	 </div>\
                          	<div class="relationContent flexWrap">' + hotelStr + '</div>\
                        </div>\
                        <div class="relationBody ' + showBrand + '">\
                          	<div class="relationTittle flexRow keywordTitle--brand">\
                            	<div>' + get_lan('keyWordBody').brand + '</div>\
                          	</div>\
                          	<div class="relationContent flexWrap">' + keyWordsNormalObj.brandStr + '</div>\
                        </div>\
                        <div class="relationBody ' + showDistrict + '">\
                          	<div class="relationTittle flexRow keywordTitle--district">\
                            	<div>' + get_lan('keyWordBody').district + '</div>\
                          	</div>\
                          	<div class="relationContent flexWrap">' + keyWordsNormalObj.districtStr + '</div>\
                        </div>\
                        <div class="relationBody ' + showCommercial + '">\
                          	<div class="relationTittle flexRow keywordTitle--commercial">\
                            	<div>' + get_lan('keyWordBody').commercial + '</div>\
                          	</div>\
                          	<div class="relationContent flexWrap">' + keyWordsNormalObj.commercialStr + '</div>\
                        </div>\
                        <div class="relationBody ' + showExtCommercial + '">\
                          	<div class="relationTittle flexRow keywordTitle--extCommercial">\
                            	<div>' + get_lan('keyWordBody').extCommercial + '</div>\
                          	</div>\
                        	<div class="relationContent flexWrap">' + keyWordsNormalObj.extCommercialStr + '</div>\
                        </div>\
                    ')
					$(".relationLi").on('mousedown', function () {
						$("#keyWordInput").val($(this).text());
						$("#keyWordInput").attr("relationId", $(this).attr("relationId"));
						$("#keyWordInput").attr("hoteltype", $(this).attr("type"));
						$("#keyWordInput").attr("key", $(this).attr("key"));
						$(".keyWordBody").hide();
						$('.search_wrapper').css('z-index', 0)

					})
				},
				error: function () {
					// alert('fail'); 
				}
			});
		}
	})
	//苹果关键字
	$("#appleKeyWordInput").off("focus").on('focus', function () {
		$("#appleKeyWordInput").on('blur', function () {
			$(".keyWordBody").hide();
			$('.search_wrapper').css('z-index', 0)
		})
		if ($(".searchAppleHotelBtn").attr("state") == "domHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
		} else if ($(".searchAppleHotelBtn").attr("state") == "intlHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
		}
		if (!hotelCityCode) {
			$("#appleKeyWordInput").blur();
			alert(get_lan('searchBody').keyWordRemind);
		} else {
			$(".keyWordBody").show();
			$('.search_wrapper').css('z-index', 1)
			$('.keyWordBody').mLoading("show");
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetQueryHotelConditionPost",
					jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"language":"' + obtLanguage + '"}'
				},
				success: function (data) {
					$('.keyWordBody').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					$(".keyWordBody").html('<ul class="keyWordBodyList"></ul>');
					res.infoList.map(function (item) {
						if (item.Address != "") {
							$(".keyWordBodyList").append('\
                                <li class="keyWordBodyLi" type="' + item.Type + '" name="' + item.Name + '" address="' + item.Key + '">\
                                  	<div class="keyWordBodyLiName" title="' + item.Name + '">' + item.Name + '</div>\
                                  	<div class="keyWordBodyLiAddress" title="' + item.Address + '">' + item.Address + '</div>\
                                </li>\
                            ')
						}
					})
					altRows(".keyWordBodyLi");
					$(".keyWordBody").addClass("autoScrollY");
					$("#appleKeyWordInput").off('input propertychange');
					$("#appleKeyWordInput").on('input propertychange', function () {
						$("#appleKeyWordInput").removeAttr("appleType");
						$("#appleKeyWordInput").removeAttr('key');
						$(".keyWordBodyList").html("");
						if ($("#appleKeyWordInput").val() != "") {
							res.infoList.map(function (item) {
								if (item.Name.toUpperCase().indexOf($("#appleKeyWordInput").val().toUpperCase()) != -1 || item.Address
									.toUpperCase().indexOf($("#appleKeyWordInput").val().toUpperCase()) != -1) {
									if (item.Address != "") {
										$(".keyWordBodyList").append('\
                                            <li class="keyWordBodyLi" type="' + item.Type + '" name="' + item.Name + '" address="' + item.Key + '">\
                                              	<div class="keyWordBodyLiName" title="' + item.Name + '">' + item.Name + '</div>\
                                              	<div class="keyWordBodyLiAddress" title="' + item.Address + '">' + item.Address + '</div>\
                                            </li>\
                                            '
										)
									}
								}
							})
							altRows(".keyWordBodyLi");
						}
						clickKeyWordBodyLi();
					})
					clickKeyWordBodyLi();

					function clickKeyWordBodyLi() {
						$(".keyWordBodyLi").on('mousedown', function () {
							$("#appleKeyWordInput").val($(this).attr("name"));
							if ($(this).attr("type") == "1") {
								$("#appleKeyWordInput").attr("appleType", "hotel");
								$("#appleKeyWordInput").attr('key', $(this).attr("name"));
							} else if ($(this).attr("type") == "2") {
								$("#appleKeyWordInput").attr("appleType", "company");
								$("#appleKeyWordInput").attr('key', $(this).attr("address"));
							}
							$(".keyWordBody").hide();
							$('.search_wrapper').css('z-index', 0)
						})
					}
				},
				error: function () {
					// alert('fail');
				}
			});
		}
	})
	$("#hotelPrice").on('focus', function () {
		$(".hotelPriceBody").show();
	})
		.on('blur', function () {
			$(".hotelPriceBody").hide();
		})
	$(".hotelPriceLi").on('mousedown', function () {
		$("#hotelPrice").val($(this).text());
		$("#hotelPrice").attr("minPrice", $(this).attr("minPrice"));
		$("#hotelPrice").attr("maxPrice", $(this).attr("maxPrice"));
	})
	$("#keyWordInput").on('focus', function () {
		var hotelCityCode = $('#hotelCity').attr("code");
		if (hotelCityCode) {
			$(".keyWordBody").show();
			$('.search_wrapper').css('z-index', 1)
		}
	})
		.on('blur', function () {
			$(".keyWordBody").hide();
			$('.search_wrapper').css('z-index', 0)
		})
	$(".searchHotelBtn").unbind("click").click(function () {
		var that = this;
		// if ($(this).attr("state") == "domHotel") {
		// 	var hotelCityCode = $('#hotelCity').attr("cityCode");
		// 	var hotelCityText = $('#hotelCity').val();
		// 	var hotelState = "domHotel";
		// } else if ($(this).attr("state") == "intlHotel") {
		var hotelCityCode = $('#hotelCity').attr("cityCode") || $('#hotelCity').attr('Code');
		var hotelCityText = $('#hotelCity').val();
		var hotelState = "intlHotel";
		// }
		if (hotelCityCode) {
			var cityList = '"' + hotelCityCode + '"';
			tools.appleRemindPop(cityList, 2, netUserId, function () {
				if ($(that).attr("startlimit") && parseInt($(that).attr("startlimit")) > 0) {
					if (datedifference(getNowFormatDate(), $('#hotelDepartureDate').val()) < parseInt($(that).attr("startlimit"))) {
						if ($(that).attr("CanSearch") != "true") {
							if ($(that).attr("Message").indexOf("\\n") != -1) {
								alert($(that).attr("Message").split("\\n").join('\n'));
							} else {
								alert($(that).attr("Message"));
							}
							return false;
						} else {
							if ($(that).attr("Message").indexOf("\\n") != -1) {
								var mymessage = confirm($(that).attr("Message").split("\\n").join('\n'));
							} else {
								var mymessage = confirm($(that).attr("Message"));
							}
							if (mymessage == true) {
								if ($(that).attr("CanSearch") != "true") {
									return false;
								} else {
									// searchAppleHotel(hotelCityCode, hotelCityText, hotelState)
									continueSearchHotel(hotelCityCode, hotelCityText, hotelState)
								}
							} else {
								return false;
							}
						}
					} else {
						continueSearchHotel(hotelCityCode, hotelCityText, hotelState)
					}
				} else {
					continueSearchHotel(hotelCityCode, hotelCityText, hotelState)
				}
			});
		} else {
			alert(get_lan('searchRemind'))
		}
	})
	function continueSearchHotel(hotelCityCode, hotelCityText, hotelState) {
		var hotelAreaTypeID = $("#keyWordInput").attr("hoteltype") && $("#keyWordInput").attr("hoteltype") != 5 ? $(
			"#keyWordInput").attr("relationId") + '-' + $("#keyWordInput").attr("hoteltype") : '';

		var hotelname = !$("#keyWordInput").attr("hoteltype") || $("#keyWordInput").attr("hoteltype") == 5 ? $("#keyWordInput").val().split(",").join(' ') : '';

		var hotel_longitude = $('#hotel_addr').attr('longitude') ? $('#hotel_addr').attr('longitude') : "";
		var hotel_latitude = $('#hotel_addr').attr('latitude') ? $('#hotel_addr').attr('latitude') : "";
		var hotel_lonLat = hotel_longitude + ',' + hotel_latitude;
		if (hotelState == "domHotel") {
			if ($("#hotel_addr").val() != "" && hotel_longitude == "" && hotel_latitude == "") {
				if ($("#hotel_addr").attr("key")) {
					var address = $("#hotelCity").val() + $("#hotel_addr").attr("key").split(",").join(' ');
				} else {
					var address = $("#hotelCity").val() + $("#hotel_addr").val().split(",").join(' ');
				}
			} else {
				var address = "";
			}
		} else if (hotelState == "intlHotel") {
			if ($("#hotel_addr").val() != "" && hotel_longitude == "" && hotel_latitude == "") {
				if ($("#hotel_addr").attr("key")) {
					var address = $("#hotelCity").val() + $("#hotel_addr").attr("key").split(",").join(' ');
				} else {
					var address = $("#hotelCity").val() + $("#hotel_addr").val().split(",").join(' ');
				}
			} else {
				var address = "";
			}
		}
		var stars = '0-';
		for (var i = 0; i < $('.searchStarBody .starChoose').length; i++) {
			stars += $('.searchStarBody .starChoose').eq(i).attr("star");
			stars += '-';
		}
		stars = stars.substring(0, stars.length - 1);
		var queryKey = hotelCityCode + ',' + hotelAreaTypeID + ',' + hotelname + ',' + address + ',' + $(
			"#hotelDepartureDate").val() + ',' + $("#hotelReturnDate").val() + ',' + stars + ',' + $(".search_price_text").attr(
				"minPrice") + ',' + $(".search_price_text").attr("maxPrice") + ",1,1,1,2000," + hotel_lonLat;
		var searchHotelInfo = {
			'queryKey': queryKey,
			'hotelCode': hotelCityCode,
			'hotelCityText': hotelCityText,
			'hotelState': hotelState,
			'hotelAddressText': $("#hotel_addr").val(),
			'hotelKeyWordText': $("#keyWordInput").val(),
			'cn': $("#hotelCity").attr('cn'),
			'en': $("#hotelCity").attr('en'),
		}
		var newRecentInfo = searchHotelInfo
		newRecentInfo.departureDate = $("#hotelDepartureDate").val()
		newRecentInfo.returnDate = $("#hotelReturnDate").val()
		newRecentInfo.cn = $("#hotelCity").attr('cn')
		newRecentInfo.en = $("#hotelCity").attr('en')
		if (localStorage.getItem('recentSearch')) {
			var recentHotelSearch = JSON.parse(localStorage.getItem('recentSearch'))
			if (JSON.parse(localStorage.getItem('recentSearch')).hotel) {
				recentHotelSearch.hotel = recentHotelSearch.hotel.filter(function (element) {
					if (element.hotelCode !== newRecentInfo.hotelCode || element.departureDate !== newRecentInfo.departureDate || element.returnDate !== newRecentInfo.returnDate) {
						return true
					} else {
						return false
					}
				})
				recentHotelSearch.hotel.unshift(newRecentInfo)
				if (recentHotelSearch.hotel.length > 5) {
					recentHotelSearch.hotel.pop()
				}
			} else {
				recentHotelSearch['hotel'] = [newRecentInfo]
			}
		} else {
			var recentHotelSearch = { hotel: [newRecentInfo] }
		}
		localStorage.setItem('recentSearch', JSON.stringify(recentHotelSearch))
		$.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
		if (ProfileInfo.onlineStyle !== 'BCD') {
			window.location.href = '../../hotel/hotelList.html';
		} else if ($('#openMapHotel').prop('checked')) {
			window.location.href = '../../hotel/mapHotelList.html';
		} else {
			window.location.href = '../../hotel/hotelList.html';
		}
	}
	//apple酒店查询
	$(".searchAppleHotelBtn").unbind("click").click(function () {
		if ($(this).attr("state") == "domHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
			var hotelCityText = $('#hotelCity').val();
			var hotelState = "domHotel";
		} else if ($(this).attr("state") == "intlHotel") {
			var hotelCityCode = $('#hotelCity').attr("code");
			var hotelCityText = $('#hotelCity').val();
			var hotelState = "intlHotel";
		}
		cityList = '"' + hotelCityCode + '"';
		tools.appleRemindPop(cityList, 2, netUserId, function () {
			searchAppleHotel(hotelCityCode, hotelCityText, hotelState)
		});

		function searchAppleHotel(hotelCityCode, hotelCityText, hotelState) {
			if (hotelCityCode) {
				var hotelAreaTypeID = '';
				if (!$("#appleKeyWordInput").attr("appleType") || $("#appleKeyWordInput").attr("appleType") == "company") {
					if (!$("#appleKeyWordInput").attr("appleType") && $("#appleKeyWordInput").val() != "") {
						var hotelname = $("#appleKeyWordInput").val();
					} else {
						var hotelname = "";
					}
				} else if ($("#appleKeyWordInput").attr("appleType") == "hotel") {
					var hotelname = $("#appleKeyWordInput").attr("key");
				}
				var stars = '0-1-2-3-4-5';
				if (!$("#appleKeyWordInput").attr("appleType") || $("#appleKeyWordInput").attr("appleType") == "hotel") {
					var address = "";
				} else if ($("#appleKeyWordInput").attr("appleType") == "company") {
					var address = $("#appleKeyWordInput").attr("key").split(",").join(" ");
				}
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
						jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate").val() +
							'","checkOut":"' + $("#hotelReturnDate").val() + '"}'
					},
					success: function (data) {
						var res = JSON.parse(data);
						console.log(res);
						if (res.HasManual) {
							maxFare = res.manualMaxFare;
						} else {
							maxFare = res.maxFare;
						}

						var queryKey = hotelCityCode + ',' + hotelAreaTypeID + ',' + hotelname + ',' + address + ',' + $(
							"#hotelDepartureDate").val() + ',' + $("#hotelReturnDate").val() + ',' + stars + ',' + res.minFare + ',' +
							maxFare + ',1,1,1,2000,,';
						var searchHotelInfo = {
							'queryKey': queryKey,
							'hotelCode': hotelCityCode,
							'hotelCityText': hotelCityText,
							'hotelState': hotelState,
							'appleType': $("#appleKeyWordInput").attr("appleType"),
							'appleKey': $("#appleKeyWordInput").attr("key"),
							'appleValue': $("#appleKeyWordInput").val(),
						}
						$.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
						window.location.href = '../../hotel/mapHotelList.html';
					},
					error: function () {
						// alert('fail'); 
					}
				});

			} else {
				alert(get_lan('searchRemind'))
			}
		}
	})
}
//国内火车票
function chooseTrain() {
	$("input[name=searchState]").each(function () {
		$(this).click(function () {
			var state = $(this).attr('state');
			if (state == "1") {
				$("#trainDepartureDate").datepicker('destroy');
				$("#trainReturnDate").datepicker('destroy').attr("disabled", "disabled");
				$(".trainReturnSelect").attr("disabled", "disabled")
				dateChoose("trainDepartureDate", "");
				$('.searchTrainBtn').attr('state', 'oneWay')
			}
			if (state == "2") {
				$("#trainReturnDate").val(getNextDay($("#trainDepartureDate").val()));
				$(".trainReturnSelect").removeAttr("disabled")
				$("#trainReturnDate").removeAttr("disabled").removeAttr("disabled")
				$("#trainDepartureDate").datepicker('destroy');
				dateChoose("trainDepartureDate", "trainReturnDate");
				$('.searchTrainBtn').attr('state', 'roundTrip')
			}
		});
	});
	$("input[name='searchState'][value=1]").click()
	$("input[name='searchState'][value=1]").attr('checked', true);
	$("#trainDepartureCity").kuCity();
	$("#trainArrivalCity").kuCity();
	$("#trainDepartureDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		minDate: 0, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		changeYear: true,
		maxDate: 31, // 当前日期之后的 0 天，就是当天
	});
	$("#trainDepartureDate").val(GetDateStr(0));
	$("#trainReturnDate").val(GetDateStr(1));
	$(".switchIconTrain").unbind("click").click(function () {
		cityConversion("trainDepartureCity", "trainArrivalCity");
	})
	function setRecentSearch(searchTrainInfo) {
		var newRecentInfo = searchTrainInfo
		newRecentInfo.departureCityName = {
			cn: $("#trainDepartureCity").attr('cn'),
			en: $("#trainDepartureCity").attr('en')
		}
		newRecentInfo.arrivalCityName = {
			cn: $("#trainArrivalCity").attr('cn'),
			en: $("#trainArrivalCity").attr('en')
		}
		searchTrainInfo.departureCityName = {
			cn: $("#trainDepartureCity").attr('cn'),
			en: $("#trainDepartureCity").attr('en')
		}
		searchTrainInfo.arrivalCityName = {
			cn: $("#trainArrivalCity").attr('cn'),
			en: $("#trainArrivalCity").attr('en')
		}
		if (localStorage.getItem('recentSearch')) {
			var recentTrainSearch = JSON.parse(localStorage.getItem('recentSearch'))
			if (JSON.parse(localStorage.getItem('recentSearch')).rail) {
				recentTrainSearch.rail = recentTrainSearch.rail.filter(function (element) {
					if (element.departureCity !== newRecentInfo.departureCity || element.arrivalCity !== newRecentInfo.arrivalCity
						|| element.date !== newRecentInfo.date || element.returndate !== newRecentInfo.returndate) {
						return true
					} else {
						return false
					}
				})
				recentTrainSearch.rail.unshift(newRecentInfo)
				if (recentTrainSearch.rail.length > 5) {
					recentTrainSearch.rail.pop()
				}
			} else {
				recentTrainSearch['rail'] = [newRecentInfo]
			}
		} else {
			var recentTrainSearch = { rail: [newRecentInfo] }
		}
		localStorage.setItem('recentSearch', JSON.stringify(recentTrainSearch))
	}
	$(".searchTrainBtn").unbind("click").click(function () {
		$.session.set('trainTicketChanges', '');
		if ($('#trainDepartureCity').attr("code") && $('#trainArrivalCity').attr("code")) {

			var cityList = '"' + $('#trainDepartureCity').val() + '","' + $('#trainArrivalCity').val() + '"';
			tools.appleRemindPop(cityList, 4, netUserId, function () {
				searchTrain()
			});

			function searchTrain() {
				if ($(".searchTrainBtn").attr("state") == "oneWay") {
					//整点
					if ($(".trainDepartureSelect option:selected").val() == "all" || $(".trainDepartureSelect option:selected").val() == undefined) {
						var DepartureSelectValue = ''
						var domTime = ''//暂时没用
					} else {
						var DepartureSelectValue = ' ' + $(".trainDepartureSelect  option:selected").val() + ':00:00';
						var domTime = $(".trainDepartureSelect  option:selected").val()
					}
					var searchTrainInfo = {
						'type': 'oneWay',
						'departureCityText': $('#trainDepartureCity').val(),
						'arrivalCityText': $('#trainArrivalCity').val(),
						'departureCity': $('#trainDepartureCity').attr("code"),
						'arrivalCity': $('#trainArrivalCity').attr("code"),
						'date': $('#trainDepartureDate').val(),
						'queryKey': $('#trainDepartureCity').val() + ',' + $('#trainArrivalCity').val() + ',' + $(
							'#trainDepartureDate')
							.val() + DepartureSelectValue + ',' + $("#trainCabin").val(),
						'domqueryKey': $('#trainDepartureCity').attr('citycode') + ',' + $('#trainArrivalCity').attr('citycode') + ',' + $(
							'#trainDepartureDate')
							.val() + DepartureSelectValue + ',' + $("#trainCabin").val() + 'ALL',
						'domTime': domTime,
					}
					setRecentSearch(searchTrainInfo)

					$.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
					window.location.href = '../../train/trainTicketList.html';
				} else if ($(".searchTrainBtn").attr("state") == "roundTrip") {
					//整点
					if ($(".trainDepartureSelect  option:selected").val() == "all" || $(".trainDepartureSelect option:selected").val() == undefined) {
						var DepartureSelectValue = ''
						var domTime = ''
					} else {
						var DepartureSelectValue = ' ' + $(".trainDepartureSelect  option:selected").val() + ':00:00';
						var domTime = $(".trainDepartureSelect  option:selected").val()
					}
					if ($(".trainReturnSelect option:selected").val() == "all" || $(".trainReturnSelect option:selected").val() == undefined) {
						var ReturnSelectValue = ''
						var domTimeReturn = ''
					} else {
						var ReturnSelectValue = ' ' + $(".trainReturnSelect  option:selected").val() + ':00:00';
						var domTimeReturn = $(".trainReturnSelect  option:selected").val()
					}
					var searchTrainInfo = {
						'type': 'roundTrip',
						'departureCityText': $('#trainDepartureCity').val(),
						'arrivalCityText': $('#trainArrivalCity').val(),
						'departureCity': $('#trainDepartureCity').attr("code"),
						'arrivalCity': $('#trainArrivalCity').attr("code"),
						'date': $('#trainDepartureDate').val(),
						'returndate': $('#trainReturnDate').val(),
						'queryKey': $('#trainDepartureCity').val() + ',' + $('#trainArrivalCity').val() + ',' + $('#trainDepartureDate')
							.val() + DepartureSelectValue + ',' + $("#trainCabin").val(),
						'queryKeyReturn': $('#trainArrivalCity').val() + ',' + $('#trainDepartureCity').val() + ',' + $(
							'#trainReturnDate').val() + ReturnSelectValue + ',' + $("#trainCabin").val(),
						'domqueryKey': $('#trainDepartureCity').attr('citycode') + ',' + $('#trainArrivalCity').attr('citycode') + ',' + $(
							'#trainDepartureDate')
							.val() + DepartureSelectValue + ',' + $("#trainCabin").val() + ',ALL',
						'domqueryKeyReturn': $('#trainArrivalCity').attr('citycode') + ',' + $('#trainDepartureCity').attr('citycode') + ',' + $(
							'#trainReturnDate').val() + ReturnSelectValue + ',' + $("#trainCabin").val() + ',ALL',
						'domTime': domTime,
						'domTimeReturn': domTimeReturn,
					}
					setRecentSearch(searchTrainInfo)
					$.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
					window.location.href = '../../train/trainTicketList.html';
				}
			}
		} else {
			alert(get_lan('searchRemind'))
		}
	})
}
//租车
function chooseCar() {
	$("#carFromDate").val(GetDateStr(0));
	$("#carToDate").val(GetDateStr(1));
	dateChoose("carFromDate", "carToDate");
	$("#carDeparture").kuCity();
	$("#carArrival").kuCity();

	$("#carFromHour").val(10);
	$("#carToHour").val(10);
	/*租车公司*/
	// 更换接口  GetInformationsPost 换成 GetNewInformationsPost多一个参数id
	if (!ProfileInfo.HideCarRentalCompany) {//隐藏租车权限
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/SystemService.svc/GetCarRentalCompanyPost",
				jsonStr: '{"id":' + netUserId + ',"culture":"' + obtLanguage + '"}'
			},
			success: function (data) {
				var res = JSON.parse(data);
				//   console.log(res);
				// res.CarInformationList.map(function(item) {
				res.map(function (item) {
					$("#carCompany").append('<div class="search_filter-box_pop_item search-carCompany_item" value="' + item.Code + '">' + item.Name + '</div>')
				})
				$('.search-carCompany_item').unbind('click').click(function () {
					$(".search_carCompany_text").text($(this).text());
					$('.search_carCompany_text').attr('value', $(this).attr('value'))
				})
			},
			error: function () {
				// alert('fail');
			}
		});
	}
	$(".searchCarBtn").unbind("click").click(function () {
		if ($('#carDeparture').attr("code") && $('#carArrival').attr("code")) {
			var carCompany = ProfileInfo.HideCarRentalCompany ? "" : $('.search_carCompany_text').attr('value')
			var isCitycar = false;
			if ($('#carDeparture').attr('vendervode') != "") {
				carCompany = $('#carDeparture').attr('vendervode')
				isCitycar = true
			}
			if ($('#carArrival').attr('vendervode') != "") {
				carCompany = $('#carArrival').attr('vendervode')
				isCitycar = true
			}

			var searchCarInfo = {
				'departureCityText': $('#carDeparture').val(),
				'arrivalCityText': $('#carArrival').val(),
				'departureCity': $('#carDeparture').attr("code"),
				'arrivalCity': $('#carArrival').attr("code"),
				'date': $('#carFromDate').val() + ' ' + $("#carFromHour").val() + ':' + $("#carFromMin").val(),
				'returndate': $('#carToDate').val() + ' ' + $("#carToHour").val() + ':' + $("#carToMin").val(),
				'carCompany': carCompany,
				'pickupAdd': $('#carDeparture').attr("locationcode"),
				'returnAdd': $('#carArrival').attr("locationcode"),
				'isCitycar': isCitycar,
			}
			$.session.set('searchCarInfo', JSON.stringify(searchCarInfo));
			window.location.href = '../../car/carList.html';
		} else {
			alert(get_lan('searchRemind'))
		}
	})
}
/*交换城市*/
function cityConversion(startCityId, arrivalCityId) {
	var startCity = $('#' + startCityId + ''), arrivalCity = $('#' + arrivalCityId + '')
	var startCityText = startCity.val();
	var arrivalText = arrivalCity.val();
	var startCityCode = startCity.attr('code');
	var arrivalCode = arrivalCity.attr('code');
	if (startCity.attr('code') && arrivalCity.attr('code')) {
		startCity.val(arrivalText);
		startCity.attr('code', arrivalCode);
		arrivalCity.val(startCityText);
		arrivalCity.attr('code', startCityCode);
	} else if (!startCity.attr('code') && arrivalCity.attr('code')) {
		startCity.val(arrivalText);
		startCity.attr('code', arrivalCode);
		arrivalCity.val('');
		arrivalCity.removeAttr('code');
	} else if (startCity.attr('code') && !arrivalCity.attr('code')) {
		arrivalCity.val(startCityText);
		arrivalCity.attr('code', startCityCode);
		startCity.val('');
		startCity.removeAttr('code');
	}
}

function getNextDay(d) {
	d = new Date(d);
	d.setTime(d.getTime() + 1000 * 60 * 60 * 24);
	var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
	var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
	//格式化
	return d.getFullYear() + "-" + month + "-" + day;
}
//日期
function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
	return y + "-" + m + "-" + d;
}
// 初始化我的订单
function initMyOrderTable() {
	if (ProfileInfo.onlineStyle == "APPLE") {
		$('.orderHeader').html('\
			<div class="tr flexRow">\
				<div style="width: 130px;padding-left:20px;box-sizing:border-box;">'+ get_lan('table').orderNumber + '</div>\
				<div style="width: 159px;padding-left: 10px;">'+ get_lan('table').traveler + '</div>\
				<div style="width: 40px;"></div>\
				<div style="width: 200px;">'+ get_lan('table').roundTime + '</div>\
				<div style="width: 68px;"></div>\
				<div style="width: 378px;">'+ get_lan('table').route + '</div>\
				<div style="width: 100px;">'+ get_lan('table').price + '</div>\
				<div style="width: 100px;">'+ get_lan('table').status + '</div>\
			</div>\
		')
		$("#tableBody").html('<div id="orderTable"></div>')
	} else {
		$('.orderHeader').html('\
			<div class="tr flexRow">\
				<div style="width: 130px;padding-left:20px;min-width: 130px;max-width: 130px;">' + get_lan('table').orderNumber + '</div>\
				<div style="width: 160px;padding-left: 10px;display:none">' + get_lan('table').traveler + '</div>\
				<div style="min-width: 40px;max-width: 40px;"></div>\
				<div style="min-width: 92px;max-width: 92px;"></div>\
				<div style="min-width: 175px;max-width: 175px;">' + get_lan('table').roundTime + '</div>\
				<div class="orderRoute">' + get_lan('table').route + '</div>\
				<div style="width: 100px;min-width: 100px;max-width: 100px;">' + get_lan('table').price + '</div>\
				<div style="width: 100px;min-width: 100px;max-width: 100px;">' + get_lan('table').status + '</div>\
			</div>\
		')
		$("#tableBody").html('<div id="orderTable"></div>')
	}
}
// 无订单结果
$.fn.insertNoValidOrderReminder = function (reminderText, pic) {
	$('.orderHeader').html('')
	$(this).html('\
		<div class="orderTable-noOrder">\
			<img src="/images/Aus/common/'+ pic + '"/>\
			<p>'+ reminderText + '</p>\
		</div>')
}
//我的订单
function myOrderTableInfo() {
	initMyOrderTable()
	$('#tableBody').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/OrderService.svc/MyTripListPost",
			jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
		},
		success: function (data) {
			if (btnIndex != 1) {
				return false;
			} else {
				// btnIndex = 3
			}
			if (data != '') {
				var res = JSON.parse(data)
				console.log(res);
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/OrderService.svc/getContinueOrder",
						jsonStr: '{"id":' + netUserId + '}'
					},
					success: function (data) {
						if (data != '') {
							var res = JSON.parse(data)
							console.log(res);
							if (res != '') {
								var tripRemind = confirm(get_lan("tripRemind"));
								if (tripRemind == true) {
									var finishedInfo = {
										'orderNo': res,
									}
									console.log($.session.get('finishedInfo'));
									$.session.set('finishedInfo', JSON.stringify(finishedInfo));
									window.location.href = '../../purchaseTrip/purchaseTrip.html';

								}
							}
						}
					},
					error: function () {
						// alert('fail');
					}
				});
				var noTravelData = [];
				res.map(function (item) {
					if (!item.isHistory) {
						noTravelData.push(item);
					}
				})
				if (noTravelData.length == 0) {
					$('#tableBody').mLoading("hide");
					// $("#tableBody").html('\
					//       <div class="ordersRemind">' + get_lan('tableRemind') +
					// 	'</div>\
					// ')
					$("#tableBody").insertNoValidOrderReminder(get_lan('tableRemind'), 'pic_noorders.png')
				} else {
					initMyOrderTable()
					noTravelData.map(function (item, index) {
						if (TAnumber != undefined && TAnumberIndex == 1) {
							if (TAorderNo != item.OrderNo) {
								return false
							}
						}
						var tableCell = item.OrderItems.length > 1 || item.OrderItems[0].ItemName.length > 40 ? "table-cell" :
							"cellLine";
						var ShowApproval = item.ShowApproval ? "hide" : "hide";
						// 苹果
						if (ProfileInfo.onlineStyle == "APPLE") {
							$("#orderTable").append('\
							    <div class="flexRow">\
							       <div class="ellipsis" style="width: 130px;box-sizing:border-box;padding-left:20px;">\
										<span class="orderNoClick ' + tableCell + '" style="cursor:pointer;">' + item.OrderNo + '</span>\
									</div>\
							       	<div class="ellipsis" style="width: 160px;box-sizing:border-box;padding-left: 10px;">\
									   <span class="' + tableCell + '">' + item.OrderCustomer + '</span>\
									</div>\
									<table class="orderDetailsTable" border="0">\
										<tr>\
											<th style="width:30px;"></th>\
											<th style="width:200px;"></th>\
											<th style="width:75px;"></th>\
											<th style="width:380px;"></th>\
											<th style="width:100px;"></th>\
											<th style="width:100px;"></th>\
										</tr>\
									</table>\
							       	<div style="width: 100px;" class="hide">\
							         	<div class="submit ' + tableCell + ' ' + ShowApproval + '" orderNumber="' + item.OrderNo + '">' + get_lan('table').approval + '</div>\
							       	</div>\
							    </div>\
							')
						} else {
							$("#orderTable").append('\
							    <div class="flexRow">\
							       	<div class="" style="min-width: 130px;max-width: 130px;box-sizing:border-box;padding-left:20px;display: inline-block;">\
								   		<div class="ellipsis ' + tableCell + '">' + item.OrderCustomer + '</div>\
								   		<div class="ellipsis orderNoClick ' + tableCell + '" style="cursor:pointer;">' + item.OrderNo + '</div>\
								   	</div>\
							       	<div class="ellipsis" style="display: inline-block;display:none;width: 160px;box-sizing:border-box;padding-left: 10px;"></div>\
							       	<table class="orderDetailsTable" border="0">\
										<tr>\
											<th style="width:30px;"></th>\
											<th style="width:75px;"></th>\
											<th style="width:200px;"></th>\
											<th class="orderRoute"></th>\
											<th style="width:100px;"></th>\
											<th style="width:100px;"></th>\
										</tr>\
							       	</table>\
							       	<div style="width: 100px;" class="hide">\
							         	<div class="submit ' + tableCell + ' ' + ShowApproval + '" orderNumber="' + item.OrderNo + '">' + get_lan('table').approval + '</div>\
							       	</div>\
							    </div>')
						}


						item.OrderItems.map(function (aitem) {
							var liIcon = {
								1: "planeIcon",
								2: "hotelIcon",
								3: "trainIcon",
								4: "carIcon"
							}[aitem.ItemType]

							var stateColor = "#1E66AE";
							if (ProfileInfo.onlineStyle == "APPLE") {
								if (aitem.itemState == "已完成" || aitem.itemState == "Completed" || aitem.itemState == "已改签" || aitem.itemState ==
									"Changed" || aitem.itemState == "已确认" || aitem.itemState == "Confirmed" || aitem.itemState == "已退票" ||
									aitem.itemState == "Refunded") {
									stateColor = "#222";
								} else {
									stateColor = "#222";
								}
							} else {
								if (aitem.itemState == "已完成" || aitem.itemState == "Completed") {
									stateColor = "#5A88C6";
								} else if (aitem.itemState == "已改签" || aitem.itemState == "Changed") {
									stateColor = "#5A88C6";
								} else if (aitem.itemState == "退票中" || aitem.itemState == "Refunding") {
									stateColor = "#8DC73F";
								} else if (aitem.itemState == "已确认" || aitem.itemState == "Confirmed") {
									stateColor = "#5A88C6";
								} else if (aitem.itemState == "未出票" || aitem.itemState == "Reserved") {
									stateColor = "#FF6720";
								} else if (aitem.itemState == "已退票" || aitem.itemState == "Refunded") {
									stateColor = "#5A88C6";
								} else if (aitem.itemState == "出票中" || aitem.itemState == "In process") {
									stateColor = "#8DC73F";
								} else if (aitem.itemState == "处理中" || aitem.itemState == "On request") {
									stateColor = "#8DC73F";
								}
							}
							$(".orderDetailsTable").eq(index).append('\
                              	<tr class="myOrdersTr">\
                                	<td><div class="' + liIcon + '"></div></td>\
                                	<td class="myOrdersTr-orderNo">' + aitem.flightAndTrainNo + '</td>\
                                	<td style="padding-left:10px;">' + aitem.ItemDate + '</td>\
                               		<td style="padding-right:10px;" title="' + aitem.ItemName + '">' + aitem.ItemName + '</td>\
                                	<td>' + aitem.ItemFare + '</td>\
                                	<td class="orderStatus" style="color:' + stateColor + '">' + aitem.itemState + '</td>\
                              	</tr>')
						})
					})
					altRows(".myOrdersTr");
					$(".submit").unbind("click").click(function () {
						var searchOrderInfo = {
							'orderNo': $(this).attr("orderNumber"),
							'approval': true,
						}
						$.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
						window.location.href = '../../orders/orderDetails.html';
					})
					$('#tableBody').mLoading("hide");
					// altRows('orderTable');//表格
					$(".orderNoClick").unbind("click").click(function () {
						var searchOrderInfo = {
							'orderNo': $(this).text(),
						}
						$.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
						window.location.href = '../../orders/orderDetails.html';
					})
					if (ProfileInfo.NoQueryOrder) {
						$(".orderNoClick").unbind("click");
					}
				}
			} else {
				$('#tableBody').mLoading("hide");
				// alert(get_lan('accountRemind'));
				// window.location.href='../../login/loginPage.html';
			}
		},
		error: function () {
			// alert('fail');
		}
	});
}
//初始化待审核订单
function initPendingApproval() {
	if (ProfileInfo.onlineStyle == "APPLE") {
		$('.orderHeader').html('\
			<div class="tr flexRow">\
				<div style="width: 130px;padding-left:20px;">' + get_lan('table').orderNumber + '</div>\
				<div style="width: 100px;">' + get_lan('table').traveler + '</div>\
				<div style="width: 100px;">' + get_lan('table').applyDate + '</div>\
				<div style="width: 40px;"></div>\
				<div style="width: 170px;">' + get_lan('table').roundTime + '</div>\
				<div style="width: 90px;">' + get_lan('table').shift + '</div>\
				<div style="width: 300px;">' + get_lan('table').route + '</div>\
				<div style="width: 100px;">' + get_lan('table').price + '</div>\
				<div style="width: 150px;">' + get_lan('table').operation + '</div>\
			</div>\
		')
		$("#tableBody").html('<div id="orderTable"></div>')
	} else {
		$('.orderHeader').html('\
			<div class="tr flexRow">\
				<div style="width: 143px;padding-left:20px;">' + get_lan('table').orderNumber + '</div>\
				<div style="width: 194px;">' + get_lan('table').applyDate + '</div>\
				<div style="width: 182px;">' + get_lan('table').roundTime + '</div>\
				<div class="pendingRoute">' + get_lan('table').route + '</div>\
				<div style="width: 100px;">' + get_lan('table').price + '</div>\
				<div style="width: 150px;">' + get_lan('table').operation + '</div>\
			</div>\
		')
		$("#tableBody").html('<div id="orderTable"></div>')
	}
}
//待审核订单
function pendingApproval() {
	initPendingApproval()
	$('#tableBody').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/OrderService.svc/ApproveListPost",
			jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
		},
		success: function (data) {
			if (btnIndex != 2) {
				return false;
			} else {
				// btnIndex = 3
			}
			if (data != '') {
				var res = JSON.parse(data);
				$('#tableBody').mLoading("hide");
				console.log(res);
				if (res.length == 0) {
					// $("#tableBody").html('\
					//     <div class="ordersRemind">' + get_lan('tableRemind2') + '</div>\
					// ')
					$('#tableBody').insertNoValidOrderReminder(get_lan('tableRemind2'), 'pic_noappoval.png')

				} else {
					initPendingApproval()
					var approveList = [];
					res.map(function (item) {
						if (!item.IsHistory) {
							approveList.push(item);
						}
					})
					console.log(approveList);
					if (approveList.length == 0) {
						$(".ApproveLengthIcon").addClass("hide");
						$('#tableBody').insertNoValidOrderReminder(get_lan('tableRemind2'), 'pic_noappoval.png')
					}
					$(".ApproveLengthIcon").text(approveList.length);


					if (ProfileInfo.onlineStyle == "APPLE") {
						approveList.map(function (item, index) {
							var tableCell = item.Segment.length + item.Hotel.length + item.Train.length > 1 ? "table-cell" : "cellLine";
							$("#orderTable").append('\
						        <div class="flexRow">\
						           	<div class="ellipsis" style="width: 130px;box-sizing:border-box;padding-left:20px;">\
								   		<span class="approveNoClick mainFontColor ' + tableCell + '" style="text-decoration:underline;cursor:pointer;">' + item.OrderNo + '</span>\
									</div>\
						           	<div class="ellipsis" style="width: 100px;box-sizing:border-box;">\
								   		<span class="' + tableCell + '">' + item.Passenger + '</span>\
									</div>\
						           	<div class="ellipsis" style="width: 100px;box-sizing:border-box;">\
									   	<span class="' + tableCell + '">' + item.BookTime.split(' ')[0] + '</span>\
									</div>\
									<table class="orderDetailsTable" border="0" style="width:580px;">\
										<tr>\
											<th style="width:40px;"></th>\
											<th style="width:170px;"></th>\
											<th style="width:90px;"></th>\
											<th style="width:300px;"></th>\
											<th style="width:100px;"></th>\
										</tr>\
									</table>\
						           	<div class="flexRow" style="width: 150px;">\
						              	<div class="agreeBtn ' + tableCell + '" ApplicationNo="' + item.ApplicationNo + '">' + get_lan('table').agree + '</div>\
						              	<div class="denyBtn ' + tableCell + '" ApplicationNo="' + item.ApplicationNo + '">' + get_lan('table').deny + '</div>\
						           	</div>\
						        </div>')
							/*机票*/
							item.Segment.map(function (sItem) {
								$(".orderDetailsTable").eq(index).append('\
						            <tr class="pendingTr">\
						              	<td><div class="planeIcon"></div></td>\
						              	<td>' + sItem[0].DepartureTime + '~' + sItem[0].ArrivalTime.substring(sItem[0].ArrivalTime.length - 5, sItem[0].ArrivalTime.length) + '</td>\
						              	<td>' + sItem[0].FlightNo + '</td>\
						              	<td>' + sItem[0].OrgAirport + '-' + sItem[0].DesAirport + '</td>\
						              	<td>' + sItem[0].AirFareAmount + '</td>\
						            </tr>')
							})
							/*酒店*/
							item.Hotel.map(function (hItem) {
								$(".orderDetailsTable").eq(index).append('\
						            <tr class="pendingTr">\
						              	<td><div class="hotelIcon"></div></td>\
						              	<td>' + hItem.CheckIn + '~' + hItem.CheckOut + '</td>\
						              	<td></td>\
						              	<td>' + hItem.HotelName + '</td>\
						              	<td>' + hItem.HotelFareAmount + '</td>\
						            </tr>')
							})
							/*火车*/
							item.Train.map(function (tItem) {
								$(".orderDetailsTable").eq(index).append('\
						            <tr class="pendingTr">\
						              	<td><div class="trainIcon"></div></td>\
						              	<td>' + tItem.TrainDepartureTime + '~' + tItem.TrainArrivalTime.substring(tItem.TrainArrivalTime.length - 5, tItem.TrainArrivalTime.length) + '</td>\
						              	<td>' + tItem.TrainCode + '</td>\
						              	<td>' + tItem.TrainDeparte + '-' + tItem.TrainArrive + '</td>\
						              	<td>' + tItem.TrainFareAmount + '</td>\
						            </tr>')
							})
						})
					} else {
						approveList.map(function (item, index) {
							var tableCell = item.Segment.length + item.Hotel.length + item.Train.length > 1 ? "table-cell" : "cellLine";
							$("#orderTable").append('\
						        <div class="flexRow">\
						           	<div class="approval-orderNumber" style="max-width: 130px;min-width: 130px;box-sizing:border-box;padding-left:20px;">\
										<div class="ellipsis ' + tableCell + '">' + item.Passenger + '</div>\
									   	<div class="ellipsis approveNoClick ' + tableCell + '" style="cursor:pointer;">' + item.OrderNo + '</div>\
									</div>\
						           	<div class="ellipsis flexRow" style="align-items: center;justify-content: center;min-width: 100px;max-width: 100px;box-sizing:border-box;">\
									   	<div class="approval-bookTime">' + item.BookTime.split(' ')[0] + '</div>\
									</div>\
						           	<table class="orderDetailsTable pendingOrderMain" border="0">\
						             	<tr>\
											<th style="width:30px;"></th>\
											<th style="width:75px;"></th>\
											<th style="width:180px;"></th>\
											<th class="pendingTextRoute"></th>\
											<th style="width:100px;"></th>\
						             	</tr>\
						           	</table>\
						           	<div class="flexRow" style="width: 150px;align-items: center;">\
						              	<div class="agreeBtn" ApplicationNo="' + item.ApplicationNo + '">' + get_lan('table').agree + '</div>\
						              	<div class="denyBtn" ApplicationNo="' + item.ApplicationNo + '">' + get_lan('table').deny + '</div>\
						           	</div>\
						        </div>')
							/*机票*/
							item.Segment.map(function (sItem) {
								$(".orderDetailsTable").eq(index).append('\
						            <tr class="pendingTr">\
						              	<td><div class="planeIcon"></div></td>\
						              	<td class="bold">' + sItem[0].FlightNo + '</td>\
						              	<td>' + sItem[0].DepartureTime + '~' + sItem[0].ArrivalTime.substring(sItem[0].ArrivalTime.length - 5, sItem[0].ArrivalTime.length) + '</td>\
						              	<td>' + sItem[0].OrgAirport + '-' + sItem[0].DesAirport + '</td>\
						              	<td>' + sItem[0].AirFareAmount + '</td>\
						            </tr>')
							})
							/*酒店*/
							item.Hotel.map(function (hItem) {
								$(".orderDetailsTable").eq(index).append('\
						            <tr class="pendingTr">\
						              	<td><div class="hotelIcon"></div></td>\
						              	<td></td>\
						              	<td>' + hItem.CheckIn + '~' + hItem.CheckOut + '</td>\
						              	<td>' + hItem.HotelName + '</td>\
						              	<td>' + hItem.HotelFareAmount + '</td>\
						            </tr>')
							})
							/*火车*/
							item.Train.map(function (tItem) {
								$(".orderDetailsTable").eq(index).append('\
						            <tr class="pendingTr">\
						              	<td><div class="trainIcon"></div></td>\
						              	<td class="bold">' + tItem.TrainCode + '</td>\
						              	<td>' + tItem.TrainDepartureTime + '~' + tItem.TrainArrivalTime.substring(tItem.TrainArrivalTime.length - 5, tItem.TrainArrivalTime.length) + '</td>\
						              	<td>' + tItem.TrainDeparte + '-' + tItem.TrainArrive + '</td>\
						              	<td>' + tItem.TrainFareAmount + '</td>\
						            </tr>')
							})
							/*其他*/
							if (item.TravelRequestNewMiscellList.length > 0) {
								$('body').mLoading("show");
								$.ajax({
									type: 'post',
									url: $.session.get('ajaxUrl'),
									dataType: 'json',
									data: {
										url: $.session.get('obtCompany') + "/orderService.svc/GetTravelRequestDetail",
										jsonStr: '{"orderNo":"' + item.OrderNo + '","id":' + netUserId + ',"companyId":"' + ProfileInfo.companyId + '","Language":"' + obtLanguage + '"}'
									},
									success: function (data) {
										var res = JSON.parse(data);
										console.log(res);
										$('body').mLoading("hide");
										res.map(function (otherItem) {
											if (otherItem.hotelDetails.length > 0) {
												var city = otherItem.hotelDetails[0].CityName;
												var date = otherItem.hotelDetails[0].CheckIn.split(" ")[0] + '-' + otherItem.hotelDetails[0].CheckOut.split(" ")[0]
											}
											if (otherItem.miscellDetails.length > 0) {
												var city = otherItem.miscellDetails[0].OrgCityName + '-' + otherItem.miscellDetails[0].DstCityName;
												var date = otherItem.miscellDetails[0].DepTime.split(" ")[0] + '-' + otherItem.miscellDetails[0].ArrTime.split(" ")[0]
											}
											$(".orderDetailsTable").eq(index).append('\
												<tr class="pendingTr">\
												  <td></td>\
												  <td></td>\
												  <td>'+ date + '</td>\
												  <td>' + otherItem.ProductName + '</td>\
												  <td>' + otherItem.FarePaid + otherItem.Currency + '</td>\
												</tr>\
											')
										})
									},
									error: function () {
										// alert('fail');
									}
								});
							}
						})
					}

					altRows(".pendingTr");
					$(".agreeBtn").unbind("click").click(function () {
						$('body').mLoading("show");
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/OrderService.svc/ApproveAgreePost",
								jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '","applicationNo":"' +
									$(this).attr("ApplicationNo") + '"}'
							},
							success: function (data) {
								$('body').mLoading("hide");
								var res = JSON.parse(data)
								console.log(res);
								pendingApproval();
								// window.location.href = '../../application/queryApplication.html';
							},
							error: function () {
								// alert('fail');
							}
						});
					})
					$(".denyBtn").unbind("click").click(function () {
						$('body').mLoading("show");
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/OrderService.svc/ApproveDenyPost",
								jsonStr: '{"id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '","applicationNo":"' +
									$(this).attr("ApplicationNo") + '"}'
							},
							success: function (data) {
								$('body').mLoading("hide");
								var res = JSON.parse(data)
								console.log(res);
								pendingApproval();
								// window.location.href = '../../application/queryApplication.html';
							},
							error: function () {
								// alert('fail');
							}
						});
					})
					$(".approveNoClick").unbind("click").click(function () {
						var applicationDetailInfo = {
							'orderNo': $(this).text(),
							'IsHistory': false,
						}
						$.session.set('applicationDetailInfo', JSON.stringify(applicationDetailInfo));
						window.location.href = '../../application/applicationDetail.html';
					})
					$('#tableBody').mLoading("hide");
					// altRows('orderTable');//表格
				}
			} else {
				// alert(get_lan('accountRemind'));
				// window.location.href='../../login/loginPage.html';
			}
		},
		error: function () {
			// alert('fail');
		}
	});
}
//表格颜色
function altRows(tr) {
	for (i = 0; i < $(tr).length; i++) {
		if (i % 2 == 0) {
			$(tr).eq(i).addClass("evenrowcolor");
		} else {
			$(tr).eq(i).addClass("oddrowcolor");
		}
	}
}
//公司新闻
function showCompanyNews(companyId) {
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetCompanyInfoPost",
			jsonStr: '{"id":' + netUserId + ',"companyID":"' + companyId + '","language":"' + obtLanguage + '"}'
		},
		success: function (data) {
			var res = JSON.parse(data);
			console.log(res);
			if (res.companyNews.length > 0) {
				$('.newsList').after('<div class="hr"></div>')
				$('.newsList').append('<div class="newsTitle">' + get_lan('footer').companyNews + '</div>')
			} else {
				$('.newsList').hide()
			}
			res.companyNews.map(function (item, index) {
				if (index < 6) {
					$(".newsList").append('\
						<div class="newsLi" index="' + index + '">\
							<span>' + item.Title + '</span>\
							<div class="line"></div> \
							<span>' + res.companyNews[index].Time + '</span>\
						</div>')
				}
			})
			$(".articlePop").html('\
            	<div class="articlePopHeader"><div class="closeAretcleIcon">x</div></div>\
            	<div class="articlePopHeaderBody"></div>')
			if (obtLanguage == "EN") {
				$(".articlePop").css("width", "800px");
			}
			$(".newsLi").unbind("click").click(function () {
				var index = parseInt($(this).attr("index"));
				openArticlePop();
				$(".articlePopHeaderBody").html('\
					<div class="articlePopTittle">' + res.companyNews[index].Title + '</div>\
                	<div class="articlePopDate">' + res.companyNews[index].Time + '</div>\
                	<div class="articlePopContent autoScrollY">' + res.companyNews[index].Content + '</div>\
                ')
			})
			$("#cover,.closeAretcleIcon").unbind("click").click(function () {
				closeArticlePop();
			})
		},
		error: function (data) {
			console.log(data);
		}
	});
}

function openArticlePop() {
	$("#cover").show();
	$(".articlePop").css("display", "block");
}

function closeArticlePop() {
	$("#cover").hide();
	$(".articlePop").css("display", "none");
}
// TA单号,自动填充城市
function getCity() {
	if ($.session.get('TAnumber')) {
		var userid = netUserId.split("\"")[1]
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/SystemService.svc/GetTravelRequestCityInfo",
				jsonStr: '{"travelRequestNo":"' + $.session.get('TAnumber') + '","key":"' + userid + '","count":""}'
			},
			success: function (data) {
				$('body').mLoading("hide");
				if (data == '' || data == "[]") {
					// alert('没有权限')
					// HotelGKBooking(orderRes,type,false);
				} else {

					var resArr = JSON.parse(data);
					var newRes = []
					for (var i = 0; i < resArr.length - 1; i = i + 2) {
						// if(i<2){
						var a = []
						a.push(resArr[i])
						a.push(resArr[i + 1])
						newRes.push(a)
						// }
					}
					console.log(newRes)

					var domAirFlag = false, intlAirFlag = false, hotelFlag = false, trainFlag = false;
					newRes.map(function (item) {
						setDefaultCity(item)
					})

					function setDefaultCity(res) {
						var travelObj = {
							"ArriveCityCode": '',
							"ArriveCityEN": '',
							"ArriveCityCN": '',
							"leaveCityCode": '',
							"leaveCityEN": '',
							"leaveCityCN": '',
							"type": true,
							"starTime": '',
							"endTime": '',
						}
						var arriveType = true
						var leaveType = true
						// res type  0出发 1到达  res[0]和res[1] 一组 res[2]和res[3] 一组，但是一般只需要第一组就行
						// serviceType 0.全部 1.机票 2.酒店 3.租车 4.火车
						res.map(function (item) {
							if (item.type == 0 || item.type == "0") {
								travelObj.ArriveCityCode = item.Code
								travelObj.ArriveCityCN = item.NameCN
								travelObj.ArriveCityEN = item.NameEN
								if (item.CountryId != 46 && item.CountryId != "46") {
									arriveType = false
								}
								travelObj.starTime = item.StartTime
							}
							if (item.type == 1 || item.type == "1") {
								travelObj.leaveCityCode = item.Code
								travelObj.leaveCityCN = item.NameCN
								travelObj.leaveCityEN = item.NameEN
								if (item.CountryId != 46 && item.CountryId != "46") {
									leaveType = false
								}
								travelObj.endTime = item.EndTime
							}
						})

						TAminDate = travelObj.starTime.split(' ')[0];
						TAmaxDate = travelObj.endTime.split(' ')[0];
						MultipleDepartureDate()
						if (!arriveType || !leaveType) {
							travelObj.type = false
						}
						// 默认
						// 国内

						// serviceType 0.全部 1.机票 2.酒店 3.租车 4.火车
						var serviceType = res.length > 0 ? res[0].serviceType : ""
						if (travelObj.type && (serviceType == 0 || serviceType == 1) && !domAirFlag) {
							domAirFlag = true
							// 国内机票限制
							$.session.set("domAirSession", JSON.stringify(travelObj))
							$('#domDepartureCity').attr('code', travelObj.ArriveCityCode)
							$('#domDepartureCity').val($.session.get('obtLanguage') == "CN" ? travelObj.ArriveCityCN : travelObj.ArriveCityEN)
							$('#domArrivalCity').attr('code', travelObj.leaveCityCode)
							$('#domArrivalCity').val($.session.get('obtLanguage') == "CN" ? travelObj.leaveCityCN : travelObj.leaveCityEN)

						}
						// 国际
						if ((serviceType == 0 || serviceType == 1) && !intlAirFlag && !travelObj.type) {
							intlAirFlag = true
							// 国际机票限制
							$.session.set("intlAirSession", JSON.stringify(travelObj))
							$('#intlDepartureCity').attr('code', travelObj.ArriveCityCode)
							$('#intlDepartureCity').attr('cityCode', travelObj.ArriveCityCode)
							$('#intlDepartureCity').attr('cn', travelObj.ArriveCityCN)
							$('#intlDepartureCity').attr('en', travelObj.ArriveCityCN)
							$('#intlDepartureCity').val($.session.get('obtLanguage') == "CN" ? travelObj.ArriveCityCN : travelObj.ArriveCityEN)
							$('#intlArrivalCity').attr('code', travelObj.leaveCityCode)
							$('#intlArrivalCity').attr('cityCode', travelObj.leaveCityCode)
							$('#intlArrivalCity').attr('cn', travelObj.leaveCityCN)
							$('#intlArrivalCity').attr('en', travelObj.leaveCityEN)
							$('#intlArrivalCity').val($.session.get('obtLanguage') == "CN" ? travelObj.leaveCityCN : travelObj.leaveCityEN)
						}
						// 酒店
						if ((serviceType == 0 || serviceType == 2) && !hotelFlag) {
							hotelFlag = true;
							// 酒店限制

							$.session.set("hotelSession", JSON.stringify(travelObj))
							$('#hotelCity').attr('code', travelObj.leaveCityCode)
							$('#hotelCity').attr('cn', travelObj.leaveCityCN)
							$('#hotelCity').attr('en', travelObj.leaveCityEN)
							$('#hotelCity').val($.session.get('obtLanguage') == "CN" ? travelObj.leaveCityCN : travelObj.leaveCityEN)

							// 是否是国际
							if (!travelObj.type) {
								$('.Hotel').click(function () {
									$('#intlHotel').attr('checked', 'checked')
									$('#intlHotel').click()
								})
							}
						}
						// 火车
						if (travelObj.type && (serviceType == 0 || serviceType == 4) && !trainFlag) {
							trainFlag = true
							// 火车限制
							$.session.set("trainSession", JSON.stringify(travelObj))
							$('#trainDepartureCity').attr('code', travelObj.ArriveCityCode)
							$('#trainDepartureCity').attr('cityCode', travelObj.ArriveCityCode)
							$('#trainDepartureCity').attr('cn', travelObj.ArriveCityCN)
							$('#trainDepartureCity').attr('en', travelObj.ArriveCityEN)
							$('#trainDepartureCity').val($.session.get('obtLanguage') == "CN" ? travelObj.ArriveCityCN : travelObj.ArriveCityEN)
							$('#trainArrivalCity').attr('code', travelObj.leaveCityCode)
							$('#trainArrivalCity').attr('cityCode', travelObj.leaveCityCode)
							$('#trainArrivalCity').attr('cn', travelObj.leaveCityCN)
							$('#trainArrivalCity').attr('en', travelObj.leaveCityEN)
							$('#trainArrivalCity').val($.session.get('obtLanguage') == "CN" ? travelObj.leaveCityCN : travelObj.leaveCityEN)

						}
						$.session.set('goOnBooktravelInfo', JSON.stringify(travelObj));

						// 限制时间范围
						setTimeout(function () {
							$('#domDepartureDate').val(Dateformat(travelObj.starTime, 0))
							$('#domReturnDate').val(Dateformat(travelObj.starTime, 1))
							limitTime("#domDepartureDate", travelObj.starTime, travelObj.endTime, "#domReturnDate")
							// limitTime("#domReturnDate", travelObj.starTime, travelObj.endTime)

							$('#intlDepartureDate').val(Dateformat(travelObj.starTime, 0))
							$('#intlReturnDate').val(Dateformat(travelObj.starTime, 1))
							limitTime("#intlDepartureDate", travelObj.starTime, travelObj.endTime, "#intlReturnDate")
							// limitTime("#intlReturnDate", travelObj.starTime, travelObj.endTime)

							$('#hotelDepartureDate').val(Dateformat(travelObj.starTime, 0))
							$('#hotelReturnDate').val(Dateformat(travelObj.starTime, 1))
							limitTime("#hotelDepartureDate", travelObj.starTime, travelObj.endTime, "#hotelReturnDate")
							limitTime("#hotelReturnDate", travelObj.starTime, travelObj.endTime)

							$('#trainDepartureDate').val(Dateformat(travelObj.starTime, 0))
							$('#trainReturnDate').val(Dateformat(travelObj.starTime, 1))
							limitTime("#trainDepartureDate", travelObj.starTime, travelObj.endTime, "#trainReturnDate")
							// limitTime("#trainReturnDate", travelObj.starTime, travelObj.endTime)
						}, 100)

						function limitTime(id, min, max, returnDate) {
							var minTime = new Date().getTime()
							var minTime2 = new Date(min.replace(/-/g, "/")).getTime()
							min = minTime < minTime2 ? min : new Date()
							$(id).datepicker('destroy'); //销毁原来的日期插件
							$(id).datepicker({
								dateFormat: 'yy-mm-dd',
								timeFormat: "HH:mm",
								changeMonth: true,
								minDate: min, // 当前日期之后的 0 天，就是当天
								maxDate: max, // 当前日期之后的 0 天，就是当天
								hideIfNoPrevNext: true,
								showOtherMonths: true,
								selectOtherMonths: true,
								changeYear: true,
								onSelect: function () {
									$(returnDate).datepicker('destroy');
									$(returnDate).val(getNextDay($(id).val()));
									$(returnDate).datepicker({
										dateFormat: 'yy-mm-dd',
										timeFormat: "HH:mm",
										changeMonth: true,
										minDate: $(id).val(), // 当前日期之后的 0 天，就是当天
										maxDate: max, // 当前日期之后的 0 天，就是当天
										hideIfNoPrevNext: true,
										showOtherMonths: true,
										selectOtherMonths: true,
										changeYear: true,
									});
								}
							});

						}
					}
				}
			},
		})
	}
}
// 获取证件有效期提醒
if (ProfileInfo.onlineStyle != "APPLE") {
	credentInfo()
}
function credentInfo() {
	var num = $.session.get("CustomerNum")
	if (num == 2) {
		return false
	}
	$.session.set("CustomerNum", 2)
	var userid = netUserId.split("\"")[1]
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetCustomerDocumentPost",
			jsonStr: '{"id":"' + userid + '","customerId":"' + ProfileInfo.ID + '","language":"' + obtLanguage + '"}'
		},
		success: function (data) {
			var res = JSON.parse(data)
			var newCustomerList = []
			res.map(function (item) {
				if (item.ExpiryType == 1 || item.ExpiryType == 2) {
					newCustomerList.push(item)
				}
			})
			if (newCustomerList.length > 0) {
				var title = obtLanguage == "CN" ? "证件有效期提醒" : "Reminder of Expiration Date";
				var str1 = obtLanguage == "CN" ? "已过期" : "Expired";
				var str2 = obtLanguage == "CN" ? "即将过期" : "Expire Soon";
				// var tips=obtLanguage=="CN"?"请注意更新您的证件以免耽误您的行程。":"Please renew it so as not to delay your trip.";
				var tips = obtLanguage == "CN" ? "请注意更新您的证件以免耽误您的行程。" : "";
				var btn = obtLanguage == "CN" ? "立即更新" : "Update Now";
				var btn2 = obtLanguage == "CN" ? "以后提醒" : "Remind Later";
				$('body').append('\
					<div id="coverCredent">\
						<div class="credentGroupPop">\
							<div class="closeCredent"></div>\
							<div class="credentTitle">'+ title + '</div>\
							<div class="credentList"></div>\
							<div class="credentTips">'+ tips + '</div>\
							<div class="credentBtnGroup">\
								<div class="credentBtn credentBtn2">'+ btn2 + '</div>\
								<div class="credentBtn credentBtn1">'+ btn + '</div>\
							</div>\
						</div>\
					</div>\
				')

				newCustomerList.map(function (item) {
					if (item.ExpiryType == 1) {
						$(".credentList").append('\
							<div class="credent">\
								<span>'+ item.nameDoc + '</span>\
								<span>'+ item.docExpiryDate + '</span>\
								<span style="color:#ff7a00">'+ str1 + '</span>\
							</div>\
						')
					} else if (item.ExpiryType == 2) {
						$(".credentList").append('\
							<div class="credent">\
								<span>'+ item.nameDoc + '</span>\
								<span>'+ item.docExpiryDate + '</span>\
								<span>'+ str2 + '</span>\
							</div>\
						')
					}
				})
				// 关闭按钮
				$(".closeCredent").click(function () {
					$("#coverCredent").remove()
				})
				//立即更新，跳转
				$(".credentBtn1").click(function () {
					window.location.href = '../profile/profilePage.html'
				})
				//以后提醒
				$(".credentBtn2").click(function () {
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/SystemService.svc/ModifyCustomerDocumentUpdatePost",
							jsonStr: '{"id":"' + userid + '","customerId":"' + ProfileInfo.ID + '","language":"' + obtLanguage + '"}'
						},
						success: function (data) {
							var res = JSON.parse(data)
							if (res.code == 200) {
								$('#coverCredent').remove()
							} else {
								alert(res.message)
							}
						},
					})
				})
			}
		},
	})

}