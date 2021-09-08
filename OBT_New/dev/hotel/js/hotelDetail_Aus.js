var netUserId = $.session.get('netLoginId');
var id = netUserId.split('"')[1]
var obtLanguage = $.session.get('obtLanguage');
var hotelDetailInfo = JSON.parse($.cookie('hotelDetailInfo'));
console.log(hotelDetailInfo);
var queryKeyList = hotelDetailInfo.queryKey.split(',');
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var companyCorporate = hotelDetailInfo.companyCorporate
var TAorderNo = $.session.get('TAorderNo');
// 有TA单时，时间进行限制
var TAnumber = $.session.get('TAnumber');
var TAminDate = 0, TAmaxDate = 365
if (TAnumber != undefined && TAnumber != "" && $.session.get('goOnBooktravelInfo')) {
	var goOnBooktravelInfo = JSON.parse($.session.get('goOnBooktravelInfo'));
	TAminDate = goOnBooktravelInfo.starTime.split(" ")[0]
	TAmaxDate = goOnBooktravelInfo.endTime.split(" ")[0]
}
showToolTip('No more room details')

//中英文对象
var cn = {
	"progressBar": {
		"search": "查询",
		"book": "预订",
		"complete": "完成",
	},
	"imgPop": {
		"tittle": "酒店图片",
	},
	"hotelInfoBody": {
		"telephone": "电话：",
		"fax": "传真：",
		"score": "评分：",
		"lowest": "起",
		"reselection": "重新选择",
		"showMore": "查看更多",
		"hideMore": "收起",
	},
	"hotelTabBody": {
		"rooms": "房型列表",
		"serviceIntro": "服务介绍",
		"commentList": "评论列表",
	},
	"hotelRoomList": {
		"weekDay": '星期天, 星期一, 星期二, 星期三, 星期四, 星期五, 星期六',
		"search": "查询",
		"roomType": "房型",
		"bedType": "床型",
		"breakfast": "早餐",
		"price": "价格(含税)",
		"book": "预订",
		"Finish": "订完",
		"Request": "申请",
		"wifiTittle": "宽带",
		"violation": "费用超标",
		"violationApple": "违反政策",
		"dailyRateBodyTittle1": "您已选择",
		"dailyRateBodyTittle2": "至",
		"dailyRateBodyTittle3": " 共 ",
		"dailyRateBodyTittle4": " 晚",
		"bedTypeList": "单床/双床",
		"companyAgreement": "公司协议",
		"agreementTips": "预订前请务必仔细阅读酒店价格条款及早餐宽带情况",
		"director": "副总监及以上级别",
		"employee": "所有员工适用",
	},
	"hotelIntroBody": {
		"popularAmenities": "Most Popular Amenities",
		"otherAmenities": "Other Amenities",
		"recreation": "休闲服务",
		"facilities": "设施服务",
		"HotelService": "酒店服务",
		"FoodService": "餐饮服务",
		"TrafficInfo": "周边交通",
	},
	"hotelRemind": "该酒店暂时无法预订，请重新选择",
	"shuttleRemind": "APPLE在该酒店提供班车服务。",
	"allMapBtn": "查看地图",
	"morePic": "更多图片",
	"moreDetails": "更多详情",
	"all": "全部",
	priceType: {
		1: '协议价格',
		2: '第三方价格',
		3: '第三方价格',
		4: ['协议价格', 'BCD价格'],
		7: 'BCD价格',
		8: '第三方价格',
		9: ['协议托管价格', 'BCD直连价格']
	},
	bedDetailPop: {
		description: '房间描述',
		cancelPolicy: '取消政策',
		basicInformation: '基础信息',
		roomFacilities: '房间设施',
		guaranteeCardType: '担保信用卡',
		otherCharges: '其他费用'
	}
}
var en = {
	"progressBar": {
		"search": "Search",
		"book": "Book",
		"complete": "Complete",
	},
	"imgPop": {
		"tittle": "Hotel Pictures",
	},
	"hotelInfoBody": {
		"telephone": "Telephone:",
		"fax": "Fax:",
		"score": "Score:",
		"lowest": "From",
		"reselection": "Modify",
		"showMore": "Show more",
		"hideMore": "Retract",
	},
	"hotelTabBody": {
		"rooms": "Rooms",
		"serviceIntro": "Service Intro",
		"commentList": "Comment List",
	},
	"hotelRoomList": {
		"weekDay": 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
		"search": "Search",
		"roomType": "Room Type",
		"bedType": "Bed Type",
		"breakfast": "Breakfast",
		"price": "Price (Tax Included)",
		"book": "Book",
		"Finish": "Sold Out",
		"Request": "Apply",
		"wifiTittle": "Internet",
		"violation": "Out of Policy",
		"violationApple": "Out of Policy",
		"dailyRateBodyTittle1": "You have chosen",
		"dailyRateBodyTittle2": "to",
		"dailyRateBodyTittle3": " total ",
		"dailyRateBodyTittle4": " nights",
		// "bedTypeList":"Single beds / double bed",
		"bedTypeList": "Single/ double beds",
		"companyAgreement": "Corporate",
		"agreementTips": "Please always carefully review hotel rate terms and inclusions before booking.",
		"director": "Associated Director",
		"employee": "All Employees",
	},
	"hotelIntroBody": {
		"popularAmenities": "Most Popular Amenities",
		"otherAmenities": "Other Amenities",
		"recreation": "Recreation",
		"facilities": "Facilities",
		"HotelService": "Services",
		"FoodService": "Restaurants",
		"TrafficInfo": "Traffic Info",
	},
	"hotelRemind": "The hotel is not available now, please choose other hotel.",
	"shuttleRemind": "APPLE provides shuttle service support in this hotel.",
	"allMapBtn": "Show on map",
	"morePic": "More photos",
	"moreDetails": "More Details",
	"all": "All",
	priceType: {
		1: 'Corporate Rate',
		2: '3rd Party Rate',
		3: '3rd Party Rate',
		4: ['Corporate Rate', 'BCD Rate'],
		7: 'BCD Rate',
		8: '3rd Party Rate',
		9: ['Corporate Rate', 'BCD Direct']
	},
	bedDetailPop: {
		description: 'Room Description',
		cancelPolicy: 'Cancel Policy',
		basicInformation: 'Basic Information',
		roomFacilities: 'Room Facilities',
		guaranteeCardType: 'Guarantee Card Type',
		otherCharges: 'Other Charges'
	}
}
if (ProfileInfo.onlineStyle == "APPLE") {
	en.hotelRoomList.book = "Select";
}
function get_lan(m) {
	//获取文字
	var lan = $.session.get('obtLanguage');     //语言版本
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
	if (t == undefined) t = cn[m];
	if (t == undefined) t = en[m];

	return t;
}
$(document).click(function (e) {
	var target = $(e.target)
	if (!target.is('.destination_wrapper *,.destination_showMore')) {
		$('.destination_moreBox').closePopWindow(300)
	}
})
function useTransportsAndAttractionsEffect(res) {
	// 正常样式，由于数据格式不对，暂时停用
	// $('.hotelLocation_destination').html('\
	// 	<div class="hotel_destination_transport hotel_destination_items">\
	// 		<div class="hotel_destination_items_title"><img src="../../images/Aus/common/icon_home_air-gray.png"/><h4>Transport</h4></div>\
	// 		<ul>\
	// 			<li>\
	// 				<span>Melbourne International Aireport</span>\
	// 				<span>27.40KM</span>\
	// 			</li>\
	// 			<li>\
	// 				<span>Melbourne International Aireport2</span>\
	// 				<span>36.40KM</span>\
	// 			</li>\
	// 		</ul>\
	// 	</div>\
	// 	<div class="hotel_destination_attractions hotel_destination_items">\
	// 		<div class="hotel_destination_items_title"><img src="../../images/Aus/common/icon_landmark-gray.png"/><h4>Attractions</h4></div>\
	// 		<ul>\
	// 			<li>\
	// 				<span>Melbourne International Aireport</span>\
	// 				<span>27.40KM</span>\
	// 			</li>\
	// 		</ul>\
	// 	</div>\
	// 	<div class="hotel_destination_more">\
	// 		<span class="destination_showMore">more Transports & attractions</span>\
	// 		<div class="destination_moreBox hidden negative hide">\
	// 			<div class="destination_wrapper">\
	// 				<div class="hotel_destination_transport hotel_destination_items">\
	// 					<div class="hotel_destination_items_title"><img src="../../images/Aus/common/icon_home_air-gray.png"/><h4>Transport</h4></div>\
	// 					<ul>\
	// 						<li>\
	// 							<span>Melbourne International Aireport</span>\
	// 							<span>27.40KM</span>\
	// 						</li>\
	// 						<li>\
	// 							<span>Melbourne International Aireport2</span>\
	// 							<span>36.40KM</span>\
	// 						</li>\
	// 						<li>\
	// 							<span>Melbourne International Aireport2</span>\
	// 							<span>36.40KM</span>\
	// 						</li>\
	// 					</ul>\
	// 				</div>\
	// 				<div class="hotel_destination_attractions hotel_destination_items">\
	// 					<div class="hotel_destination_items_title"><img src="../../images/Aus/common/icon_landmark-gray.png"/><h4>Attractions</h4></div>\
	// 					<ul>\
	// 						<li>\
	// 							<span>Melbourne International Aireport</span>\
	// 							<span>27.40KM</span>\
	// 						</li>\
	// 						<li>\
	// 							<span>Melbourne International Aireport</span>\
	// 							<span>27.40KM</span>\
	// 						</li>\
	// 						<li>\
	// 							<span>Melbourne International Aireport</span>\
	// 							<span>27.40KM</span>\
	// 						</li>\
	// 						<li>\
	// 							<span>Melbourne International Aireport</span>\
	// 							<span>27.40KM</span>\
	// 						</li>\
	// 					</ul>\
	// 				</div>\
	// 			</div>\
	// 		</div>\
	// 	</div>')
	$('.hotelLocation_destination').html('\
		<div class="hotel_destination_transport hotel_destination_items">\
			<div class="hotel_destination_items_title"><img src="../../images/Aus/common/icon_home_air-gray.png"/><h4>Transport</h4></div>\
			<p class="hotel_destination_items_text shortLine"></p>\
		</div>\
		<div class="hotel_destination_attractions hotel_destination_items">\
			<div class="hotel_destination_items_title"><img src="../../images/Aus/common/icon_landmark-gray.png"/><h4>Attractions</h4></div>\
			<p class="hotel_destination_items_text shortLine"></p>\
		</div>\
		<div class="hotel_destination_more">\
			<span class="destination_showMore">more Transports & attractions</span>\
			<div class="destination_moreBox hidden negative hide">\
				<div class="destination_wrapper">\
					<div class="hotel_destination_transport hotel_destination_items">\
						<div class="hotel_destination_items_title"><img src="../../images/Aus/common/icon_home_air-gray.png"/><h4>Transport</h4></div>\
						<p class="hotel_destination_items_text"></p>\
					</div>\
					<div class="hotel_destination_attractions hotel_destination_items">\
						<div class="hotel_destination_items_title"><img src="../../images/Aus/common/icon_landmark-gray.png"/><h4>Attractions</h4></div>\
						<p class="hotel_destination_items_text"></p>\
					</div>\
				</div>\
			</div>\
		</div>')
	if(!res.Transport && !res.Attractions) {
		$('.destination_showMore').remove()
	}
	if(res.Transport!=null){
		var transport = res.Transport.split('\n');
		transport.map(function(item){
			if(item != ''){
				$('.hotel_destination_transport .hotel_destination_items_text').append('<span>'+item+'</span>')
			}
		})
	}
	if(res.Attractions!=null){
		var attractions = res.Attractions.split('\n')
		attractions.map(function(item){
			if(item != ''){
				$('.hotel_destination_attractions .hotel_destination_items_text').append('<span>'+item+'</span>')
			}
		})
	}
	// $('.hotel_destination_transport .hotel_destination_items_text').append(res.Transport)
	// $('.hotel_destination_attractions .hotel_destination_items_text').append(res.Attractions.split('Attractions - ')[1])
	$('.destination_showMore').click(function () {
		$('.destination_moreBox').usePopWindowEffect(300)
	})
}
function initImgPopList() {
	// 列表轮播样式
	var imgBtnList_width = 0
	$('.imgBtnList').css('width', 'auto')
	$('.imgBtn').map(function (index) {
		imgBtnList_width += $('.imgBtn').eq(index).width() + 40
	})
	$('.imgBtnList').css('width', (imgBtnList_width) + 'px')
	var width = $('.imgBtnChecked').width()
	var left = $('.imgBtnChecked').offset().left - $('.imgBtn_wrapper').offset().left
	$('.imgBtn_underLine').css('width', width + 'px').css('left', left + 'px')
}
function useTransformEffect(wrapper, list, itemName) {
	// 轮播事件
	var boxLeft = $(wrapper).offset().left
	var boxRight = boxLeft + $(wrapper).width()
	var lastTransform = $(list).css('transform').split(',')[4] || 0
	if ($(this).prev(itemName).length != 0 && $(this).prev().offset().left < boxLeft) {
		var prevLeft = $(list).offset().left - $(this).prev().offset().left
		$(list).css('transform', 'translateX(' + prevLeft + 'px)')
	} else if ($(this).next(itemName).length != 0 && $(this).next().offset().left + $(this).next().width() > boxRight) {
		var prevNext = lastTransform - $(this).next().offset().left - $(this).next().width() + boxRight
		$(list).css('transform', 'translateX(' + prevNext + 'px)')
	}
}

function handleSelctRoomClick() {
	$('.select_hotel_btn').unbind('click').click(function () {
		$(".hotelImgPop").addClass("hide");
		$("#cover").css("display", "none");
		$('.hotelTab[name="roomList"]').click();
	})
}
function handleMoreDetailsClick() {
	$('.bedLiText_moreDetails').unbind('click').click(function () {
		fetchBedMoreDetail($(this).attr('HotelRoomInfo'))
	})
}
function fetchBedMoreDetail(hotelRoomInfo) {
	var jsonObj = {
		queryKey: queryKeyList[0] + ',' + queryKeyList[1] + ',' + queryKeyList[2] + ',' + hotelRoomInfo,
		id: id,
		Language: obtLanguage
	}
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryHotelPriceCheckPost",
			jsonStr: JSON.stringify(jsonObj)
		},
		success: function (data) {
			$('body').mLoading("hide");
			var hotelPriceDetail = JSON.parse(data)
			$('.bedDetails_pop').html('\
				<header>\
					<div class="bedDetails_pop_title"><h1>no more detail</h1></div>\
					<div class="close_bedDetails"></div>\
				</header>')
			$(".close_bedDetails").unbind('click').click(function () {
				$("#cover_moreDetail").hide();
				$('.bedDetails_pop').addClass('hide');
			})
			if (hotelPriceDetail != '' && hotelPriceDetail.Code === '200') {
				console.log(hotelPriceDetail)
				var breakfast = hotelPriceDetail.NewBreakfast ? '<span>Breakfast ' + hotelPriceDetail.NewBreakfast + '</span>' : ''
				$('.bedDetails_pop .bedDetails_pop_title').html('<h1>' + hotelPriceDetail.RoomTypeName + '</h1>' + breakfast)
				var bedDetailBody = document.createElement('article')
				if (hotelPriceDetail.RoomDescription) {
					bedDetailBody.innerHTML += '\
						<div class="bedDetails_pop_props">\
							<h3 class="title-description">'+ get_lan('bedDetailPop').description + '</h3>\
							<div class="bedDetails_props_body">\
								<p>'+ hotelPriceDetail.RoomDescription + '</p>\
							</div>\
						</div>'
				}
				if (hotelPriceDetail.CancelPolicy || hotelPriceDetail.GaranteeReminder) {
					var cancelPolicy = '', garanteeReminder = ''
					if (hotelPriceDetail.CancelPolicy) {
						cancelPolicy = '<p class="bedDetail_pop_cancelPolicy">' + hotelPriceDetail.CancelPolicy + '</p>'
					}
					if (hotelPriceDetail.GaranteeReminder) {
						garanteeReminder = '<p>' + hotelPriceDetail.GaranteeReminder + '</p>'
					}
					bedDetailBody.innerHTML += '\
						<div class="bedDetails_pop_props">\
							<h3 class="title-cancelPolicy">'+ get_lan('bedDetailPop').cancelPolicy + '</h3>\
							<div class="bedDetails_props_body">'+ cancelPolicy + garanteeReminder + '</div>\
						</div>'
				}
				if (hotelPriceDetail.AdditionalDetailList.length > 0) {
					var basicInfo = ''
					hotelPriceDetail.AdditionalDetailList.map(function (basic) {
						basicInfo += '<li>' + basic.Content + '</li>'
					})
					bedDetailBody.innerHTML += '\
					<div class="bedDetails_pop_props">\
						<h3 class="title-basicInformation">'+ get_lan('bedDetailPop').basicInformation + '</h3>\
						<div class="bedDetails_props_body">\
							<ul class="bedDetails_basicInfo_list">'+ basicInfo + '</ul>\
						</div>\
					</div>'
				}
				if (hotelPriceDetail.Amenitys.length > 0) {
					var amenities = ''
					hotelPriceDetail.Amenitys.map(function (amenity) {
						amenities += '<li>' + amenity + '</li>'
					})
					bedDetailBody.innerHTML += '\
					<div class="bedDetails_pop_props">\
						<h3 class="title-roomFacilities">'+ get_lan('bedDetailPop').roomFacilities + '</h3>\
						<div class="bedDetails_props_body">\
							<ul class="bedDetails_roomFacilities_list">'+ amenities + '</ul>\
						</div>\
					</div>'
				}
				if (hotelPriceDetail.AcceptedCreditCards.length > 0) {
					var creditCard = ''
					function format(str) {
						return str.toLocaleLowerCase().replace(/\s*/g, "");
					}
					hotelPriceDetail.AcceptedCreditCards.map(function (card) {
						if (format(card) == format("AMERICAN EXPRESS") || format(card) == format("Diners") || format(card) == format("Union") || format(card) == format("JCB") || format(card) == format("Master") || format(card) == format("VISA") || format(card) == format("DISCOVER CARD") || format(card) == format("WORLD BANK")) {
							creditCard += '<li><img src="./images/CreditCardType/' + format(card) + '.png"></li>'
						}
					})
					bedDetailBody.innerHTML += '\
					<div class="bedDetails_pop_props">\
						<h3 class="title-guaranteeCardType">'+ get_lan('bedDetailPop').guaranteeCardType + '</h3>\
						<div class="bedDetails_props_body">\
							<ul class="bedDetails_creditCard_list">'+ creditCard + '</ul>\
						</div>\
					</div>'
				}
				if (hotelPriceDetail.RoomExtraList.length > 0) {
					var otherCharges = ''
					hotelPriceDetail.RoomExtraList.map(function (charge) {
						otherCharges += '<li>' + charge.Des + ':' + charge.Amount + charge.Currency + '</li>'
					})
					bedDetailBody.innerHTML += '\
					<div class="bedDetails_pop_props">\
						<h3 class="title-otherCharges">'+ get_lan('bedDetailPop').otherCharges + '</h3>\
						<div class="bedDetails_props_body">\
							<ul class="bedDetails_otherCharges_list">'+ otherCharges + '</ul>\
						</div>\
					</div>'
				}

				$('.bedDetails_pop').append(bedDetailBody)
				$("#cover_moreDetail").show();
				$('.bedDetails_pop').removeClass('hide');
			} else{
				showToolTip('No more room details!')
			}
		}
	})
}
$(function () {
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryHotelDetailPost",
			jsonStr: '{"queryKey":"' + hotelDetailInfo.queryKey + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function (data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			if (res.CheckIn != null) {
				showContent(res);//内容展示
			} else {
				$('body').mLoading("show");
				alert(get_lan("hotelRemind"));
				window.close();
			}
		},
		error: function () {
			// alert('fail');
		}
	});
})
function showContent(res) {
	res.Telephone = res.Telephone == null ? "" : res.Telephone;
	res.Fax = res.Fax == null ? "" : res.Fax;
	res.Address = res.Address == null ? "" : res.Address;
	res.LeisureService = res.LeisureService == null ? "" : res.LeisureService;
	res.MeetingService = res.MeetingService == null ? "" : res.MeetingService;
	res.HotelService = res.HotelService == null ? "" : res.HotelService;
	res.FoodService = res.FoodService == null ? "" : res.FoodService;
	res.TrafficInfo = res.TrafficInfo == null ? "" : res.TrafficInfo;
	var showBusRemind = res.HasShuttleBus ? "" : "hide";
	$("#main").append('\
		<div id="cover_moreDetail"></div>\
		<div class="hotelImgPop hide">\
			<div id="cover"></div>\
			<div class="pic_pop">\
				<header class="pic_pop_header">\
					<h2 class="pop_title">'+ get_lan('imgPop').tittle + '</h2>\
					<div class="closeImgPop"></div>\
				</header>\
				<div class="pic_pop_body">\
					<img  src="" class="bigImg" alt="" width="100%" height="100%">\
					<span class="pic_pop_picsNumber"></span>\
					<div class="left"></div>\
					<div class="right"></div>\
				</div>\
				<div class="pic_pop_imgs">\
					<div class="imgBtn_wrapper"><div class="imgBtn_underLine"></div><ul class="imgBtnList"></ul></div>\
					<div class="imgListBody">\
					<ul id="imgList" class="flexWrap"></ul>\
					</div>\
				</div>\
				<footer class="imgFoot">\
					<a class="select_hotel_btn" href="#hotelTabBody">select room</a>\
				</footer>\
			</div>\
		</div>\
		<div class="bedDetails_pop hide">\
		</div>\
		<div class="map_pop_container">\
			<header class="pic_pop_header">\
				<h2 class="pop_hotelName"></h2>\
				<div class="closeMapPop"></div>\
			</header>\
			<p class="hotelAddress"></p>\
			<div id="hotelMap"></div>\
			<div id="mapboxMap"></div>\
		</div>\
		<div class="autoCenter">\
		  <div class="progressBar flexRow"></div>\
		  <div class="wrapper">\
		    <div class="hotelInfoBody"></div>\
			<div class="hotelMapPhoto_wrapper"></div>\
		    <div class="agreementHotel"></div>\
		    <div class="hotelTabBody flexRow" id="hotelTabBody">\
		      <div class="hotelTab hotelTabActive" name="roomList">'+ get_lan('hotelTabBody').rooms + '</div>\
		      <div class="hotelTab" name="introList">'+ get_lan('hotelTabBody').serviceIntro + '</div>\
		      <div class="hotelTab" name="commentList">'+ get_lan('hotelTabBody').commentList + '</div>\
		    </div>\
		    <div class="hotelRoomBody">\
				<div class="eTravel_reminder_box"></div>\
				<div class="hotelRoomSearch flexRow">\
					<div class="checkInDateSearch">\
						<div class="checkInDateIcon"></div>\
						<input type="text" id="checkInDate" readonly="" value="">\
						<div class="checkInWeek"></div>\
					</div>\
					<div> - </div>\
					<div class="checkOutDateSearch">\
						<div class="checkOutDateIcon"></div>\
							<input type="text" id="checkOutDate" readonly="" value="">\
						<div class="checkOutWeek"></div>\
					</div>\
					<div class="hotelRoomSearchBtn">'+ get_lan('hotelRoomList').search + '</div>\
				</div>\
				<div class="hotelRoomList"></div>\
		    </div>\
		    <article class="hotelIntroBody hide"></article>\
		    <div class="commentListBody hide"></div>\
		  </div>\
		</div>\
	')
	if (TAorderNo != undefined) {
		console.log('隐藏')
		$('.menu .autoCenter').addClass('hide')
		$('.orderTittle').addClass('hide')
		$('.autoScrollY').addClass('hide')
		$('footer').addClass('hide')
		$('.menu').css("height", '40px')
	}
	if (res.AbacusPriceNotContainTax) {
		if (obtLanguage == "CN") {
			$(".priceTittle").text("价格(不含税)");
		} else {
			$(".priceTittle").text("Price (Tax Excluded)");
		}
	}


	$(".progressBar").html('\
		<div class="progressLine active"></div><span class="activeProgress">'+ get_lan('progressBar').search + '</span>\
		<div class="progressLine progressBackColor"></div>'+ get_lan('progressBar').book + '\
		<div class="progressLine progressBackColor"></div>'+ get_lan('progressBar').complete + '\
	')
	// console.log(res.Transport)
	// console.log(res.Attractions)
	$('.hotelMapPhoto_wrapper').html('\
		<div class="hotelImgBody">\
			<div class="hotelImgBody_wrapper">\
				<div class="hotelImgBody_pic0"></div>\
				<div class="hotelImgBody_secondPart">\
					<div class="hotelImgBody_pic1"></div>\
					<div class="hotelImgBody_thirdPart">\
						<div class="hotelImgBody_pic2"></div>\
						<div class="hotelImgBody_pic3"></div>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class="hotelLocation">\
			<div class="allMapBtn">\
				<img class="smallMap" src="../../images/Aus/hotel/pic_detailmap.png"/>\
				<img class="bigMap" src="../../images/Aus/hotel/pic_nopicmap_386_160.png"/>\
				<span class="allMapText">'+ get_lan('allMapBtn') + '</span>\
			</div>\
			<div class="hotelLocation_destination">\
			</div>\
		</div>\
	')
	var noPic = '<div class="hotelImgBody_noPic"><span>暂无图片</span></div>'
	var imgSize = [{ width: 440, height: 360 }, { width: 336, height: 226 }, { width: 166, height: 130 }, { width: 166, height: 130 }]
	if (res.ImageUrl.length === 0) {
		$('.hotelImgBody').remove()
		$('.hotelMapPhoto_wrapper').addClass('noPic')
	} else {
		for (var i = 0; i < 4; i++) {
			var imgIndex = res.ImageUrl[i] ? i : 1
			var pic = '<img class="hotelImg" src="' + res.ImageUrl[imgIndex] + '" onload="AutoResizeImage(' + imgSize[imgIndex].width + ',' + imgSize[imgIndex].height + ',this)"/><div class="hotelImgBodyMask" data-img="' + res.ImageUrl[imgIndex] + '"><div>'
			$('.hotelImgBody_pic' + i).append(pic)
		}
	}
	if (res.ImageUrl.length >= 4) {
		$('.hotelImgBody_pic3 .hotelImgBodyMask').append('<span>see all ' + res.ImageUrl.length + ' photos</span>')
	}
	$('.allMapBtn').unbind('click').click(function () {
		$('.map_pop_container').show()
		$('#cover_moreDetail').show()
		if (obtLanguage === 'CN') {
			$('#mapboxMap').hide();
			/*地图*/
			var map = new BMap.Map("hotelMap");    // 创建Map实例
			// 百度地图API功能
			var Longitude = parseFloat(res.Longitude);
			var Laitude = parseFloat(res.Laitude);
			var hotelName = res.Name;
			var hotelAddress = res.Address;
			var hotelPhone = res.Telephone;
			var imgSrc = res.ImageUrl[0];
			var poi = new BMap.Point(Longitude, Laitude);
			var LocationType = JSON.parse($.cookie('hotelDetailInfo')).LocationType;


			setTimeout(function () {
				var convertor = new BMap.Convertor();
				var pointArr = [];
				pointArr.push(poi);
				convertor.translate(pointArr, 3, 5, translateCallback)
			}, 50);
			//坐标转换完之后的回调函数
			translateCallback = function (data) {
				if (data.status === 0) {
					var content = '<div><img src="' + imgSrc + '" alt=""/>地址：' + hotelAddress + '<br/>电话：' + hotelPhone + '<br/></div>';

					//创建检索信息窗口对象
					var searchInfoWindow = null;
					searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
						title: hotelName,      //标题
						width: 290,             //宽度
						height: 105,              //高度
						panel: "panel",         //检索结果面板
						enableAutoPan: true,     //自动平移
						searchTypes: [
							BMAPLIB_TAB_SEARCH,   //周边检索
							BMAPLIB_TAB_TO_HERE,  //到这里去
							BMAPLIB_TAB_FROM_HERE //从这里出发
						]
					});
					if (LocationType == 2) {
						map.centerAndZoom(data.points[0], 16);
						map.enableScrollWheelZoom();
						var marker = new BMap.Marker(data.points[0]); //创建marker对象
					} else {
						map.centerAndZoom(poi, 16);
						map.enableScrollWheelZoom();
						var marker = new BMap.Marker(poi); //创建marker对象
					}

					marker.addEventListener("click", function (e) {
						searchInfoWindow.open(marker);
					})
					map.addOverlay(marker); //在地图中添加marke
					// map.setCenter(data.points[0]);
				}
			}
		} else {
			$('#hotelMap').hide();
			var mapbox = new Mapbox();
			// var defaultMarker = $('#hotelAddress').attr('latitude') && $('#hotelAddress').attr('longitude') ? true:false;
			try {
				var options = {
					centerLng: parseFloat(res.Longitude),
					centerLat: parseFloat(res.Laitude),
					defaultMarker: true,
					hideSearchBar: true,
					container: '',
					zoom: 17
				}
				mapbox.initMapBox(options);
			} catch (err) {
				console.log(err)
			}
		}
	})
	useTransportsAndAttractionsEffect(res)
	hotelImgPop(res);//酒店图片弹窗
	$(".hotelImgBodyMask").unbind("click").click(function () {
		var img = $(this).attr('data-img')
		hotelImgPop(res);//酒店图片弹窗
		$('.imgFoot').html('<a class="select_hotel_btn" href="#hotelTabBody">select room</a>')
		handleSelctRoomClick()
		setTimeout(function () {
			$(".hotelImgPop").removeClass("hide");
			$("#cover").css("display", "block");
			initImgPopList()
			$('#imgList img').map(function (index) {
				//点击打开指定图片
				if ($('#imgList img').eq(index).attr('src') === img) {
					$('#imgList img').eq(index).click()
				}
			})
		}, 50)
	})
	var showScore = res.HotelRating == 0 ? "hide" : "";
	var currency = ProfileInfo.OfficeCurrency
	if (res.RoomTypes) {
		if (res.RoomTypes[0].RateInfos.length > 0 && res.RoomTypes[0].RateInfos[0].Currency) {
			currency = res.RoomTypes[0].RateInfos[0].Currency
		}
	}

	var price = res.LocalCurrency == null ? res.LowestPrice : res.LocalLowestPrice
	currency = res.LocalCurrency == null ? currency : res.LocalCurrency
	var hotelInfoPrice =
		obtLanguage === 'CN'
			? '<span>' + price + '</span> ' + currency + get_lan('hotelInfoBody').lowest
			: get_lan('hotelInfoBody').lowest + ' ' + currency + '<span>' + price + '</span>'
	var hotelDescription = res.Description == null ? "" : res.Description;
	//地图弹窗内容
	$('.hotelAddress').html('<img src="../../../images/Aus/common/icon_locate-gray.png"><span>' + res.Address + '</span></p>')
	$('.pop_hotelName').html(res.Name)
	//酒店详情内容
	$(".hotelInfoBody").html('\
		<div class="hotel_header_contacts">\
			<div>\
				<div class="hotelInfoName flexRow">\
					<h2 title="'+ res.Name + '" class="ellipsis">' + res.Name + '</h2>\
					<div class="starBox"><div class="hotelInfoStar"></div><div class="hotelLiStarHalf"></div></div>\
					<span class="hotelReselection">' + get_lan('hotelInfoBody').reselection + '</span>\
				</div>\
				<div class="hotelInfoBusRemind flexRow '+ showBusRemind + '">' + get_lan("shuttleRemind") + '</div>\
				<p class="hotelAddress"><img src="../../../images/Aus/common/icon_locate-gray.png"><span>'+ res.Address + '</span></p>\
				<p class="hotelInfoTelephone"><img src="../../../images/Aus/common/icon_phone-gray.png"><span>'+ get_lan('hotelInfoBody').telephone + res.Telephone + '</span></p>\
				<p class="hotelInfoFax"><img src="../../../images/Aus/common/icon_fax-gray.png"><span>'+ get_lan('hotelInfoBody').fax + res.Fax + '</span></p>\
			</div>\
			<div class="hotel_header_right">\
				<div class="eTravel_grade">\
					<p class="eTravel_Score '+ showScore + '">' + res.HotelRating + '</p>\
				</div>\
				<div class="hotelInfoPrice">'+ hotelInfoPrice + '</div>\
				<a class="select_hotel_btn" href="#hotelTabBody">Select Room</a>\
			</div>\
		</div>\
		<p class="hotelInfoDescription">\
			<img src="../../../images/Aus/common/icon_introduction-gray.png">\
			<span class="hotelDescription">'+ hotelDescription + '</span>\
		</p>\
		<p class="showMore">'+ get_lan('hotelInfoBody').showMore + '</p>\
	')
	if (!res.Telephone) {
		$('.hotelInfoTelephone').hide()
	}
	if (!res.Fax) {
		$('.hotelInfoFax').hide()
	}
	if (!hotelDescription) {
		$('.hotelInfoDescription').hide()
	}
	handleSelctRoomClick()
	// 设置详情高度
	var row = Math.round($('.hotelInfoDescription').height() / parseFloat($('.hotelInfoDescription').css('line-height')))
	var desRow = Math.round($('.hotelDescription').height() / parseFloat($('.hotelDescription').css('line-height')))
	if (row < desRow) {
		$('.showMore').show()
		$('.showMore').click(function () {
			$('.hotelInfoDescription').toggleClass('active')
			var text = $('.hotelInfoDescription').hasClass('active') ? get_lan('hotelInfoBody').hideMore : get_lan('hotelInfoBody').showMore
			$(this).text(text)
		})
	}

	$(".hotelReselection").unbind("click").click(function () {
		// window.location.href='../../hotel/hotelList.html?cache=1';
		if (window.history.length == 1) {
			window.close();
		} else {
			window.history.go(-1);
		}
	})
	var oneStarWidth = 14
	var hotelLiStarWidth = (parseInt(res.StarCode) * oneStarWidth) + 'px'
	$('.hotelInfoStar').css('width', hotelLiStarWidth)
	if (hotelLiStarWidth === '0px') {
		$(".hotelInfoStar").addClass('hide')
	}
	// 是否存在半星  res.ExtStarCode=5
	if (!(res.ExtStarCode > 0)) {
		$('.hotelLiStarHalf').css('display', 'none')
	}

	if (ProfileInfo.onlineStyle == "APPLE") {
		$(".hotelInfoStar").remove();
		$(".hotelInfoScore").remove();
	}
	function showHotelTabInfo(dom) {
		$(".hotelTab").removeClass("hotelTabActive");
		$(dom).addClass("hotelTabActive");
		switch ($(dom).attr("name")) {
			case "roomList":
				$(".hotelRoomBody").removeClass("hide");
				$(".hotelIntroBody").addClass("hide");
				$(".commentListBody").addClass("hide");
				break;
			case "introList":
				$(".hotelIntroBody").removeClass("hide");
				$(".hotelRoomBody").addClass("hide");
				$(".commentListBody").addClass("hide");
				$('.serviceBody').map(function (index) {
					$('.showMore span').text(get_lan('hotelInfoBody').showMore)
					$('.serviceBody').eq(index).useShowMoreEffect(2)
				})
				break;
			case "commentList":
				$(".hotelIntroBody").addClass("hide");
				$(".hotelRoomBody").addClass("hide");
				$(".commentListBody").removeClass("hide");
				break;
		}
	}
	$(".hotelTab").unbind("click").click(function () {
		var that = this
		if (window.pageYOffset > 0) {
			window.scrollTo({ top: 0, behavior: "smooth" })
			setTimeout(function () {
				showHotelTabInfo(that)
			}, (300/700 * window.pageYOffset))
		}else{
			showHotelTabInfo(that)
		}
	})
	hotelRoomList(res);
	serviceList(res);
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryHotelRatingInfo",
			jsonStr: '{"hotelId":"' + queryKeyList[2] + '","id":' + netUserId + '}'
		},
		success: function (data) {
			var res = JSON.parse(data);
			console.log(res);
			if (res.length == 0) {
				$(".hotelTab").eq(2).hide();
			}
			commentList(res);
		},
		error: function () {
			// alert('fail');
		}
	});
}
function hotelImgPop(res) {
	var hotelImgArray = [];
	hotelImgArray.push({ "type": 'all', "TypeDes": get_lan('all'), "images": [] })
	res.HotelImages.map(function (item) {
		hotelImgArray.push({ "type": item.Type, "TypeDes": item.TypeDes, "images": [] });
	});
	Array.prototype.distinct = function () {
		var arr = this,
			result = [],
			i,
			j,
			len = arr.length;
		for (i = 0; i < len; i++) {
			for (j = i + 1; j < len; j++) {
				if (arr[i].type === arr[j].type) {
					j = ++i;
				}
			}
			result.push(arr[i]);
		}
		return result;
	}
	res.HotelImages.map(function (item) {
		hotelImgArray.distinct().map(function (typeItem) {
			if (item.Type == typeItem.type) {
				typeItem.images.push(item);
			}
		})
		hotelImgArray[0].images.push(item)
	});
	$(".imgBtnList").html('');
	hotelImgArray.distinct().map(function (item, index) {
		var imgBtnText = item.TypeDes + '(' + item.images.length + ')'

		$(".imgBtnList").append('<li class="imgBtn" index="' + index + '">' + imgBtnText + '</li>')
	})
	$('.imgBtnList').append('<li style="clear:both;"></li>')
	$(".imgBtn").unbind("click").click(function () {
		var self = this
		$("#imgList").html('');
		hotelImgArray.distinct()[parseInt($(this).attr('index'))].images.map(function (item, index) {
			$("#imgList").append('<li index="' + index + '"><img src="' + item.ImageUrl + '" title="' + item.TypeDes + parseInt(index + 1) + '" class="imgLi" alt="' + item.TypeDes + '"></li>')
		})
		var numberOfGroups = hotelImgArray.distinct()[parseInt($(this).attr('index'))].images.length
		$(".imgBtn").removeClass('imgBtnChecked')
		$(this).addClass('imgBtnChecked')
		// $('#imgList').css('transform', 'translateX(0)')
		useTransformEffect.call(this, '.imgBtn_wrapper', '.imgBtnList', '.imgBtn')
		var width = $(self).width()
		var left = $(self).offset().left - $('.imgBtn_wrapper').offset().left
		$('.imgBtn_underLine').css('width', width + 'px').css('left', left + 'px')

		$('#imgList').css('width', ((80 + 8) * $('#imgList li').length - 8) + 'px')
		// 每个图片绑定事件
		$('#imgList li').unbind('click').click(function () {
			var index = parseInt($(this).attr('index')) + 1
			$('.pic_pop_picsNumber').text(index + '/' + numberOfGroups)
			$('.bigImg').attr('src', $(this).find('img').attr('src'))
			$('.bigImg').attr('alt', $(this).find('img').attr('alt'))
			$('.bigImg').attr('title', $(this).find('img').attr('title'))
			$('#imgList .imgLi').removeClass('checkedImg')
			$(this).find('img').addClass('checkedImg')
		})
		$("#imgList li").eq(0).click();

		//左侧按钮
		$('.left').unbind('click').click(function () {
			var index = $('#imgList li').find('.checkedImg').parent().index()
			$("#imgList li").eq(index - 1).click();

		})
		//右侧按钮
		$('.right').unbind('click').click(function () {
			var index = $('#imgList li').find('.checkedImg').parent().index()
			var length = $('#imgList li').length
			if (index == length - 1) {
				index = -1
			}
			$("#imgList li").eq(index + 1).click();

		})
	})
	$(".imgBtn").eq(0).click();
	$(".closeImgPop").unbind("click").click(function () {
		$(".hotelImgPop").addClass("hide");
		$("#cover").css("display", "none");
		$('.map_pop_container').hide()
	})
	$('.closeMapPop').unbind('click').click(function () {
		$("#cover_moreDetail").css("display", "none");
		$('.map_pop_container').hide()
	})
}
/*酒店房间列表*/
function hotelRoomList(res) {

	$("#checkInDate").val(res.CheckIn);
	$("#checkOutDate").val(res.CheckOut);
	$(".checkInWeek").text(getWeek(res.CheckIn));
	$(".checkOutWeek").text(getWeek(res.CheckOut));
	var departureValue = new Date($("#checkInDate").val().replace(/-/g, "/"));
	$("#checkOutDate").datepicker('destroy');
	$("#checkOutDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		minDate: departureValue,  // 当前日期之后的 0 天，就是当天
		maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		onSelect: function () {
			$(".checkOutWeek").text(getWeek($("#checkOutDate").val()));
		}
	});
	$("#checkInDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
		maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		onSelect: function () {
			$(".checkInWeek").text(getWeek($("#checkInDate").val()));
			var departureValue = new Date($("#checkInDate").val().replace(/-/g, "/"));
			$("#checkOutDate").datepicker('destroy');
			$("#checkOutDate").datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				minDate: departureValue,  // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				onSelect: function () {
					$(".checkOutWeek").text(getWeek($("#checkOutDate").val()));
				}
			});
			$("#checkOutDate").val(getNextDay($("#checkInDate").val()));
			$(".checkOutWeek").text(getWeek($("#checkOutDate").val()));
		}
	});




	var agreementIndex = 0
	var agreementHotelShow = false;
	var hotelInfo = ""
	var bedInfo = ""
	var bedIndex = ""
	var bedTotalFare = 0

	var hotelDailyRate = ""
	var hotelDailyCurrency = ""

	res.RoomTypes.map(function (item, index) {
		// var roomImg = item.RoomImgs.length==0?'../hotel/images/hotelRoomImg.jpg':item.RoomImgs[0];
		// 12.05新增BCD默认图片
		let onlineStyle = ProfileInfo.onlineStyle;
		let noimgUrl = onlineStyle == "BCD" ? "../../hotel/images/BCDnoPicture.png" : "../../hotel/images/noPicture.png";

		var roomImg = item.RoomImgs.length == 0 ? noimgUrl : item.RoomImgs[0];
		var roomImgHidden = ''
		var outLiRoom = '<div class="liRoomType">' + item.RoomTypeName + '</div>';
		var inLiRoom = '';
		if (onlineStyle == 'APPLE') {
			//隐藏图片
			var roomImgHidden = 'hide'
			var outLiRoom = '';
			var inLiRoom = '<div class="liRoomType">' + item.RoomTypeName + '</div>';
		}
		var remark = item.Remark == null ? '' : item.Remark;
		$(".hotelRoomList").append('\
			<div class="hotelRoomLi">\
				<div class="hotelRoomLi_wrapper">\
					<div class="hotelRoomLi_left">\
						'+ outLiRoom + '\
						<div class="hotelRoomLi_img"><img class="roomImg '+ roomImgHidden + '" src="' + roomImg + '" index="' + index + '"/></div>\
						<p class="hotelRoomLi_more" index="' + index + '">' + get_lan('morePic') + '</p>\
					</div>\
					<div class="bedList hotelRoomLi_right"></div>\
				</div>\
			</div>\
		')

		// 协议酒店是否显示
		item.RateInfos.map(function (bedItem, bedIndex) {
			/*  酒店类型 */
			var priceType = ''
			if (ProfileInfo.onlineStyle === 'BCD') {
				var hotelResourceType = parseInt(bedItem.HotelResourceType)
				switch (hotelResourceType) {
					case 4: case 9:
						if (item.IsAgreement || item.IsManualAgreement) {
							priceType = get_lan('priceType')[hotelResourceType][0]
						} else {
							priceType = get_lan('priceType')[hotelResourceType][1]
						}
						break;
					default: priceType = get_lan('priceType')[hotelResourceType]; break;
				}
			}
			var priceTypeDom =
				priceType === '' ?
					'' :
					'<span class="priceType">' + priceType + '</span>'
			/*  酒店类型 */

			var PolicyRuleShow = bedItem.PolicyRule == null ? "hide" : "";
			//免费取消
			var freeCancel = bedItem.PolicyRule == null ? "" : "hide";
			var cancelText = obtLanguage == "CN" ? "免费取消" : "Free CNCL"
			var policyUnderline = bedItem.Policy == null ? "" : "policyUnderline";
			var RateType = bedItem.RateType == null ? "" : bedItem.RateType;
			if (bedItem.PolicyTime) {
				var a = parseInt(bedItem.PolicyTime.split(":")[0]);
				var s = ''
				s += a - 2 + '01';
				s += ',';
				s += a - 1 + '59';
			}
			else {
				var s = '1601,1759';
			}
			var showViolation = bedItem.Type == 3 || bedItem.Type == 4 ? "" : "hide";
			var ruleMarginLeft = bedItem.Type == 3 || bedItem.Type == 4 ? "" : "ruleMarginLeft";
			var canNotBook = (bedItem.Type == 3 || bedItem.Type == 4) && res.HotelOutPolicyNoBook ? "canNotBook" : "";
			var showRate = "hide";
			if (ProfileInfo.onlineStyle == "APPLE") {
				var DailyRateColor = '222';
			} else {
				// 3.23 修改,绿色加深
				var DailyRateColor = item.IsAgreement || item.IsTMCAgreement ? '599903' : 'EF7908';
				if (RateType != '') {
					showRate = "";
				}
			}
			var showCorporate = companyCorporate == 'true' ? '' : 'hide'
			hotelDailyRate = bedItem.LocalDailyRate == "" || bedItem.LocalDailyRate == null ? bedItem.DailyRate : bedItem.LocalDailyRate;
			hotelDailyCurrency = bedItem.LocalDailyRate == "" || bedItem.LocalDailyRate == null ? bedItem.Currency : bedItem.LocalCurrency;

			var btnText = bedItem.HotelResourceType == 1 ? get_lan('hotelRoomList').Request : get_lan('hotelRoomList').book
			var bookHotelText = bedItem.HasRoom == 2 ? get_lan('hotelRoomList').Finish : btnText;

			var hotelRoomFinish = bedItem.HasRoom == 2 ? "hotelRoomFinish" : "";
			var RateStartDate = bedItem.RateGroups[0].StartDate != null && bedItem.RateGroups[0].StartDate != "" ? bedItem.RateGroups[0].StartDate.substring(0, 10) : "";
			var RateEndDate = bedItem.RateGroups[bedItem.RateGroups.length - 1].EndDate != null && bedItem.RateGroups[bedItem.RateGroups.length - 1].EndDate != "" ? bedItem.RateGroups[bedItem.RateGroups.length - 1].EndDate.substring(0, 10) : "";
			var rateUnderline = bedItem.RateGroups.length > 1 ? "rateUnderline" : "";
			var dailyRateBodyString = '';
			if (bedItem.RateGroups.length > 1) {
				bedItem.RateGroups.map(function (rItem) {
					if (rItem.StartDate != null) {
						dailyRateBodyString += '<div class="dailyRateBodyLi"><div class="dailyRateBodyLiTittle">' + rItem.StartDate.substring(5, 10) + '</div><div class="dailyRateBodyLiContent">' + rItem.Price + '</div></div>'
					}
				})
			}
			var showBookBtn = ProfileInfo.ManualPriceNoBook && bedItem.HotelResourceType == 1 ? "hide" : "";

			var violationText = ProfileInfo.onlineStyle == "APPLE" ? get_lan('hotelRoomList').violationApple : get_lan('hotelRoomList').violation
			var lastTime = bedItem.PolicyTime == null ? "18:00" : bedItem.PolicyTime;//后台返回空时，默认18点
			var typeClass = "hide";
			var cancelPolicy = '', cancelTips = '';
			if (ProfileInfo.onlineStyle != "APPLE") {
				if (bedItem.CancelPolicy) {
					cancelPolicy = '<div class="cancelPolicy cancelPolicy hidden negative ' + index + '">' + bedItem.CancelPolicy + '</div>';
					cancelTips = ' tips';
				} else if (bedItem.Policy) {
					cancelPolicy = '<div class="cancelPolicy cancelPolicy hidden negative ' + index + '">' + bedItem.Policy + '</div>';
					cancelTips = ' tips';
				}
			}

			if (ProfileInfo.onlineStyle != "APPLE" && bedItem.FuXunPayType) {
				if (bedItem.FuXunPayType == "到店付" || bedItem.FuXunPayType.indexOf("site") > -1) {
					typeClass = "paySelf"
				}
				if (bedItem.FuXunPayType == "公司支付" || bedItem.FuXunPayType.indexOf("Central") > -1) {
					typeClass = "payCompany"
				}
			}
			if (res.ManualHotelReferenceDisplay && bedItem.HotelResourceType == 1) {
				agreementHotelShow = true;
				if (!$('.hotelRoomLi').eq(index).hasClass('hide')) {
					$('.hotelRoomLi').eq(index).addClass('hide');
				}
				if (agreementIndex == 0) {
					hotelInfo = item
					bedInfo = bedItem
					bedIndex = index
					agreementIndex++
					bedTotalFare = hotelDailyRate
				}
			}
			// 判断文本，显示图标
			var twinBed = ['双床']
			var singleBed = ['大床']
			var bedIcon = ''
			if (twinBed.indexOf(item.BedType) > -1) {
				bedIcon = 'icon_twinbed.png'
			} else if (singleBed.indexOf(item.BedType) > -1) {
				bedIcon = 'icon_singbed.png'
			}
			bedIcon = bedIcon === '' ? '' : '<img class="bedLiText_bedIcon" src="../../../images/Aus/hotel/' + bedIcon + '"/>'
			var showBreaskfast = bedItem.BreakFast ? '' : 'hide'
			var showWlan = item.WLAN ? '' : 'hide'
			var currency = bedItem.Currency || ProfileInfo.OfficeCurrency
			$(".bedList").eq(index).append('\
				<div class="bedLi ">'+ inLiRoom + '\
					<div class="bedLi_informations">\
						<div class="bedLiText">\
							<div class="bedLiText_typeGroup">\
								'+ bedIcon + '\
								<span class="bedLiText_bedType">' + item.BedType + '</span>\
								<span class="bedLiText_moreDetails" HotelRoomInfo="' + item.HotelRoomType + ',' + bedItem.RatePlanCode + ',' + s + '">' + get_lan('moreDetails') + '</span>\
							</div>\
							<div class="bedLiPolicyRule '+ PolicyRuleShow + ' ' + policyUnderline + ' ' + cancelTips + '" Policy="' + bedItem.Policy + '">' + bedItem.PolicyRule + cancelPolicy + '</div>\
							<div class="bedLiPolicyRule '+ freeCancel + ' ' + policyUnderline + ' ' + cancelTips + '" Policy="' + bedItem.Policy + '">' + cancelText + cancelPolicy + '</div>\
						</div>\
						<div class="bedLi_props">\
							<div class="bedBreakfast '+ showBreaskfast + '">' + bedItem.BreakFast + '</div>\
							<div class="bedWLAN '+ showWlan + '">' + item.WLAN + '</div>\
						</div>\
						<div class="bedLi_tag">\
							<div class="companyPay companyPay-corporate '+ showCorporate + '">' + get_lan('hotelRoomList').companyAgreement + '</div>\
							<div class="companyPay companyPay-companyPay '+ showRate + '" Policy="' + bedItem.Policy + '">' + RateType + '</div>\
						</div>\
						<div class="bedLi_description">'+ remark + '</div>\
					</div>\
					<div class="bedLi_operations">\
						<div class="bedLi_operations_left">\
							<div class="violationIcon '+ showViolation + '">' + violationText + '</div>\
							<div class="shakeHands" style="color: #'+ DailyRateColor + ';">\
								<span class="hotelDailyRate_currency">' + hotelDailyCurrency + '</span>\
								<div class="bedLi_operations_priceBox">\
									<span class="hotelDailyRateText ' + rateUnderline + '" roomInfo="' + item.HotelRoomType + ',' + bedItem.RatePlanCode + '">' + hotelDailyRate + '</span>\
									<div class="dailyRateBody" roomInfo="'+ item.HotelRoomType + ',' + bedItem.RatePlanCode + '">\
										<div class="dailyRateBodyTittle">'+ get_lan('hotelRoomList').dailyRateBodyTittle1 + ' ' + RateStartDate + ' ' + get_lan('hotelRoomList').dailyRateBodyTittle2 + ' ' + RateEndDate + get_lan('hotelRoomList').dailyRateBodyTittle3 + ' ' + bedItem.RateGroups.length + ' ' + get_lan('hotelRoomList').dailyRateBodyTittle4 + '</div>\
										<div class="dailyRateBodyContent">\
										'+ dailyRateBodyString + '\
										</div>\
									</div>\
								</div>\
							</div>\
							<div class="bedLi_operations_average">\
								<span class="hotelAveragePerNight"></span>\
							</div>\
						</div>\
						<div class="bedLi_operations_right">\
							'+ priceTypeDom + '\
							<div class="payType '+ typeClass + ' ' + showBookBtn + '">' + bedItem.FuXunPayType + '</div>\
							<div class="bedLiBookBody '+ showBookBtn + '">' + '\
								<div class="bedLiBook ' + hotelRoomFinish + ' ' + canNotBook + '" HotelResourceType="' + bedItem.HotelResourceType + '" FuXunPayType="' + bedItem.FuXunPayType + '" GuestType="' + bedItem.GuestType + '" DailyRate="' + bedItem.DailyRate + '" TotalFare="' + bedItem.TotalFare + '" HotelRoomInfo="' + item.HotelRoomType + ',' + bedItem.RatePlanCode + ',' + s + '" LocalDailyRate="' + bedItem.LocalDailyRate + '" LocalCurrency="' + bedItem.LocalCurrency + '" currency="' + currency + '" LocalTotalFare="' + bedItem.LocalTotalFare + '" lastestTime="' + lastTime + '">' + bookHotelText + '</div>\
							</div>\
						</div>\
					</div>\
				</div>\
			')
			if (ProfileInfo.onlineStyle == "APPLE") {
				$(".bedLiBook").css("border-radius", "4px");
				$(".bedBreakfast").css("margin-left", "0px");
				$(".bedWLAN").css("margin-left", "9px");
				$(".bedLiPolicyRule").css("margin-left", "10px");
				if ($('.violationIcon').hasClass('hide')) {
					$('.violationIcon').removeClass('hide').css('background', 'white').text('');
				}
			}
			$('.bedLiPolicyRule').unbind('mouseenter').bind('mouseenter', function () {
				$(this).children('.cancelPolicy').openPopWindow(300)
			})
			$('.bedLiPolicyRule').unbind('mouseleave').bind('mouseleave', function () {
				$(this).children('.cancelPolicy').closePopWindow(300)
			})
			var bedDom = $('.cancelPolicy' + index);
			bedDom.css('top', (-55 - bedDom.height() + 'px'));
			// 是否有协议酒店 IsManualAgreement 

			if (showBookBtn == "hide") {
				// 隐藏所有协议酒店
				if (res.ManualHotelReferenceDisplay && agreementHotelShow) {
					$(".hotelRoomLi").eq(index).hide()
				}
			}
		})
		handleMoreDetailsClick()

		if (ProfileInfo.onlineStyle == "APPLE") {
			$(".bedLiPolicyRule").unbind("click").click(function () {
				if ($(this).attr("Policy") != "null") {
					alert($(this).attr("Policy"));
				}
			})
		}
		$(".bedLiRateType").unbind("click").click(function () {
			if ($(this).attr("Policy") != "null") {
				alert($(this).attr("Policy"));
			}
		})
	})
	// if (res.AbacusPriceNotContainTax) {
	if (obtLanguage == "CN") {
		$(".hotelAveragePerNight").text("平均每日价");
	} else {
		$(".hotelAveragePerNight").text("average per night");
	}
	// }
	// 协议酒店
	if (!res.ManualHotelReferenceDisplay || !agreementHotelShow) {
		$('.agreementHotel').remove()
	} else {
		//显示协议酒店时，隐藏价格,2020.05.22
		$('.hotelInfoPrice').remove()
		// 协议酒店 agreementHotel
		// if(agreementHotelShow){
		// 只隐藏第一个酒店
		// $(".hotelRoomLi").eq(bedIndex).hide()
		// 只有存在协议酒店时才显示上面的
		var agreementTips = hotelInfo.ManualAgreementRemark
		var employeeLevel = res.IsAssociatedDirector ? get_lan('hotelRoomList').director : get_lan('hotelRoomList').employee
		if (agreementTips == "" || agreementTips == null) {
			agreementTips = get_lan('hotelRoomList').agreementTips
		}
		$('.agreementHotel').html('\
					<div class="item companyLogo"><img src="../companyLogoImg/BCD.png"></div>\
					<div class="item item1">'+ hotelInfo.RoomTypeName.split('(')[0] + '</div>\
					<div class="item item2"><img src="./images/hotelType/icon_bed_single_double.png"><div>'+ get_lan('hotelRoomList').bedTypeList + '</div></div>\
					<div class="item item3"><img src="./images/hotelType/icon_breakf_single.png"><div>'+ bedInfo.BreakFast + '</div></div>\
					<div class="item item4"><img src="./images/hotelType/icon_wifi.png"><div>'+ hotelInfo.WLAN + '</div></div>\
					<div class="item item5">'+ bedTotalFare + '<span>' + hotelDailyCurrency + '</span></div>\
					<div class="lineType"><img src="./images/icon_hotts.png">'+ agreementTips + '</div>\
					<div class="agreementLabel">'+ get_lan('hotelRoomList').companyAgreement + '</div>\
					<div class="employeeLevel">'+ employeeLevel + '</div>\
				')
		// 早餐
		if (bedInfo.BreakFast == "不含早" || bedInfo.BreakFast == "No Breakfast") {
			$('.agreementHotel .item3 img').attr('src', './images/hotelType/icon_breakf_no.png')
		} else {
			$('.agreementHotel .item3 img').attr('src', './images/hotelType/icon_breakf_single.png')
		}
		// wifi
		if (hotelInfo.WLAN == "有" || hotelInfo.WLAN == "包宽带" || hotelInfo.WLAN == "Free" || hotelInfo.WLAN == "宽带") {
			$('.agreementHotel .item4 img').attr('src', './images/hotelType/icon_wifi.png')
		} else {
			$('.agreementHotel .item4 img').attr('src', './images/hotelType/icon_wifi_no.png')
		}
		// 公司logo
		tools.isHasImg($('.logoImg').css('background-image').split('\"')[1], ".companyLogo img")


	}
	//sabre酒店含早显示
	if (ProfileInfo.onlineStyle != "APPLE") {
		if (!res.ManualHotelReferenceDisplay || !$('.agreementHotel')[0]) {
			$('.eTravel_reminder_box').append('<span class="eTravel_reminder_box_icon"></span><span>' + get_lan('hotelRoomList').agreementTips + '</span>');
		} else {
			$('.eTravel_reminder_box').hide()
		}
	}


	$(".hotelDailyRateText").hover(function () {
		if ($(this).hasClass("rateUnderline")) {
			for (var i = 0; i < $(".dailyRateBody").length; i++) {
				if ($(".dailyRateBody").eq(i).attr("roomInfo") == $(this).attr("roomInfo")) {
					$(".dailyRateBody").eq(i).css("display", "block");
				}
			}
		}
	}, function () {
		$(".dailyRateBody").css("display", "none");
	});
	//房间图片
	$(".roomImg,.hotelRoomLi_more").unbind("click").click(function () {
		// 新版
		var imgList = {
			HotelImages: []
		}
		var room = obtLanguage == "CN" ? "房间" : "Room"
		res.RoomTypes[parseInt($(this).attr('index'))].RoomImgs.map(function (item) {
			imgList.HotelImages.push({
				ImageUrl: item,
				Type: "10",
				TypeDes: room,
			})
		})
		if (imgList.HotelImages == 0) {
			return false;
		}
		hotelImgPop(imgList);//酒店图片弹窗
		$('.imgFoot').html('')
		setTimeout(function () {
			$(".hotelImgPop").removeClass("hide");
			$("#cover").css("display", "block");
			var h = $('.pic_pop').height()
			var w = $('.pic_pop').width()
			initImgPopList()
			// $('.pic_pop').css('margin-left',-w/2+'px')
			// $('.pic_pop').css('margin-top',-h/2+'px')
		}, 50)
	})

	//酒店提前天数提醒
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
			res.map(function (item) {
				if (item.LimitType == 3) {
					$(".hotelRoomSearchBtn").attr("CanSearch", item.CanSearch);
					$(".hotelRoomSearchBtn").attr("StartLimit", item.StartLimit);
					$(".hotelRoomSearchBtn").attr("Message", item.Message);
				}
			})
		},
		error: function () {
			// alert('fail');
		}
	});
	//搜索酒店
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
	$(".hotelRoomSearchBtn").unbind("click").click(function () {
		if ($(this).attr("startlimit") && parseInt($(this).attr("startlimit")) > 0) {
			if (datedifference(getNowFormatDate(), $('#checkInDate').val()) < parseInt($(this).attr("startlimit"))) {
				if ($(this).attr("Message").indexOf("\\n") != -1) {
					var mymessage = confirm($(this).attr("Message").split("\\n").join('\n'));
				} else {
					var mymessage = confirm($(this).attr("Message"));
				}
				if (mymessage == true) {
					if ($(this).attr("CanSearch") != "true") {
						return false;
					}
				} else {
					return false;
				}
			}
		}

		var queryKeyList = hotelDetailInfo.queryKey.split(',');
		queryKeyList[0] = $("#checkInDate").val();
		queryKeyList[1] = $("#checkOutDate").val();
		$(".hotelTab").eq(0).click();
		$('.hotelRoomList').html('');
		$('.hotelRoomBody').mLoading("show");
		hotelDetailInfo.queryKey = queryKeyList.join(',');
		$.cookie('hotelDetailInfo', JSON.stringify(hotelDetailInfo));
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/QueryHotelDetailPost",
				jsonStr: '{"queryKey":"' + queryKeyList.join(',') + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
			},
			success: function (data) {
				$('.hotelRoomBody').mLoading("hide");
				var res = JSON.parse(data);
				console.log(res);
				if (res.CheckIn) {
					hotelRoomList(res);
				} else {
					console.log('cannot find the result');
				}
			},
			error: function () {
				// alert('fail');
			}
		});
	})
	$(".bedLiBook").unbind("click").click(function () {
		queryKeyList = JSON.parse($.cookie('hotelDetailInfo')).queryKey.split(',');
		var hotelChooseInfo = {
			'queryKey': queryKeyList[0] + ',' + queryKeyList[1] + ',' + queryKeyList[2] + ',' + $(this).attr("HotelRoomInfo"),
			'GuestType': $(this).attr("GuestType"),
			'TotalFare': $(this).attr("TotalFare"),
			'DailyRate': $(this).attr("DailyRate"),
			'LocalDailyRate': $(this).attr("LocalDailyRate"),
			'LocalCurrency': $(this).attr("LocalCurrency"),
			'LocalTotalFare': $(this).attr("LocalTotalFare"),
			'lastestTime': $(this).attr("lastestTime"),
			'FuXunPayType': $(this).attr("FuXunPayType"),
			'currency': $(this).attr("currency"),
			'HotelResourceType': $(this).attr("HotelResourceType")

		}
		$.session.set('hotelChooseInfo', JSON.stringify(hotelChooseInfo));
		window.location.href = '../../hotel/bookHotelRoom.html';
	})
	$(".hotelRoomFinish,.canNotBook").unbind('click');
}
/*服务列表*/
$.fn.useShowMoreEffect = function (maxLines) {
	// 设置详情高度
	var that = this
	var row = Math.round($(that).height() / parseFloat($(that).css('line-height')))
	if (row > maxLines) {
		var showMore = $(that).siblings('.showMore')
		showMore.css('display', 'flex')
		$(that).removeClass('active')
		showMore.unbind('click').click(function () {
			$(that).toggleClass('active')
			var text = $(that).hasClass('active') ? get_lan('hotelInfoBody').hideMore : get_lan('hotelInfoBody').showMore
			showMore.find('span').text(text)
		})
	}
}
function serviceList(res) {
	var serviceTopic = 0
	$(".hotelIntroBody").html('\
		<h2 class="hotelIntroBody_header">Services and Amenities</h2>\
		')
	if (res.PopularAmenities && res.PopularAmenities.length > 0) {
		var popularAmenitiesIcons = ''
		var popularAmenityItems = ''
		$.getJSON('/hotel/hotelPopularIcon.json', function(d) {
			popularAmenitiesIcons = d
			res.PopularAmenities.map(function (popular) {
				var img = ''
				if (popularAmenitiesIcons[popular.Content]) {
					var img = '<img src="/images/Aus/hotel/popular/' + popularAmenitiesIcons[popular.Content] + '.png" alt="' + popular.Content + '"/>'
				}
				popularAmenityItems += '<li>' + img + popular.Content + '</li>'
			})
			$('.hotelIntroBody_header').after('\
				<div class="serviceItem">\
					<h3 class="serviceTittle popularAmenities">'+ get_lan('hotelIntroBody').popularAmenities + '</h3>\
					<ul class="popularAmenitiesList">'+ popularAmenityItems + '</ul>\
				</div>'
			)
			serviceTopic++
		})
	}
	if (res.OtherAmenities && res.OtherAmenities.length > 0) {
		var otherAmenityItems = ''
		res.OtherAmenities.map(function (amenity) {
			otherAmenityItems += '<li>' + amenity + '</li>'
		})
		$('.hotelIntroBody').append('\
			<div class="serviceItem">\
				<h3 class="serviceTittle otherAmenities">'+ get_lan('hotelIntroBody').otherAmenities + '</h3>\
				<ul class="otherAmenitiesList">'+ otherAmenityItems + '</ul>\
			</div>'
		)
	}
	if (res.Recreation) {
		$('.hotelIntroBody').append('\
			<div class="serviceItem">\
				<h3 class="serviceTittle recreation">'+ get_lan('hotelIntroBody').recreation + '</h3>\
				<p class="serviceBody active">'+ res.Recreation + '</p>\
				<p class="showMore"><span>'+ get_lan('hotelInfoBody').showMore + '</span></p>\
			</div>'
		)
		serviceTopic++
	}
	if (res.Faclities) {
		$('.hotelIntroBody').append('\
			<div class="serviceItem">\
				<h3 class="serviceTittle facilities">'+ get_lan('hotelIntroBody').facilities + '</h3>\
				<p class="serviceBody active">'+ res.Faclities + '</p>\
				<p class="showMore"><span>'+ get_lan('hotelInfoBody').showMore + '</span></p>\
			</div>'
		)
		serviceTopic++
	}
	if (res.Services) {
		$('.hotelIntroBody').append('\
			<div class="serviceItem">\
				<h3 class= "serviceTittle hotelService" > '+ get_lan('hotelIntroBody').HotelService + '</h3 >\
				<p class="serviceBody active">'+ res.Services + '</p>\
				<p class="showMore"><span>'+ get_lan('hotelInfoBody').showMore + '</span></p>\
			</div>'
		)
		serviceTopic++
	}
	if (res.Restaurants) {
		$('.hotelIntroBody').append('\
			<div class="serviceItem">\
				<h3 class="serviceTittle foodService">'+ get_lan('hotelIntroBody').FoodService + '</h3>\
				<p class="serviceBody active">'+ res.Restaurants + '</p>\
				<p class="showMore"><span>'+ get_lan('hotelInfoBody').showMore + '</span></p>\
			</div>'
		)
		serviceTopic++
	}


	if (serviceTopic === 0) {
		$('.hotelIntroBody').hide()
		$('.hotelTab[name="introList"]').hide()
	}
}
// 删除周边交通
// <div class="serviceTittle">'+get_lan('hotelIntroBody').TrafficInfo+'</div>
// 		<div class="serviceBody">'+res.TrafficInfo+'</div>
/*酒店评论列表*/
function commentList(res) {
	res.map(function (item, index) {
		if (item.nameEN != "Anonymous") {
			var name = obtLanguage == "CN" ? '*' + item.nameCN.substring(1, item.nameCN.length) : '*' + item.nameEN.split('/')[1];
		} else {
			var name = obtLanguage == "CN" ? item.nameCN : item.nameEN;
		}
		$(".commentListBody").append('\
			<div class="commentListLi flexRow">\
			  <div class="commentListLiName">'+ name + '</div>\
			  <div class="commentListLiBody">\
			    <div class="commentListLiDate">'+ item.dateTime + '</div>\
			    <div class="commentListLiStar"></div>\
			    <div class="commentListLiContent">'+ item.ratingContent + '</div>\
			  </div>\
			</div>\
		')
		switch (parseInt(item.ratingAvg)) {
			case 0:
				$(".commentListLiStar").eq(index).css("width", "0px");
				break;
			case 1:
				$(".commentListLiStar").eq(index).css("width", "16px");
				break;
			case 2:
				$(".commentListLiStar").eq(index).css("width", "32px");
				break;
			case 3:
				$(".commentListLiStar").eq(index).css("width", "48px");
				break;
			case 4:
				$(".commentListLiStar").eq(index).css("width", "64px");
				break;
			case 5:
				$(".commentListLiStar").eq(index).css("width", "80px");
				break;
			default:
				$(".commentListLiStar").eq(index).css("width", "0px");
				break;
		}
	})
}
function getNextDay(d) {
	d = new Date(d);
	d = +d + 1000 * 60 * 60 * 24;
	d = new Date(d);
	var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
	var month = ("00" + (d.getMonth() + 1)).substr(-2);
	//格式化
	return d.getFullYear() + "-" + month + "-" + day;
}
function getWeek(dateStr) {
	var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
	return get_lan('hotelRoomList').weekDay.split(',')[myDate.getDay()];
}