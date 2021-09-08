var netUserId = $.session.get('netLoginId');
var id = netUserId.split('"')[1]
var obtLanguage = $.session.get('obtLanguage');
var isReturn = tools.queryString().isReturn;
var pareType = tools.queryString().pareType
var searchIntlInfo = JSON.parse($.session.get('searchIntlInfo'));
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
console.log(searchIntlInfo);
// 有TA单时，时间进行限制
var TAnumber = $.session.get('TAnumber');
var TAminDate = 0,
	TAmaxDate = 365
if (TAnumber != undefined && TAnumber != "" && $.session.get('goOnBooktravelInfo') != undefined && $.session.get(
	'goOnBooktravelInfo') != "") {
	var goOnBooktravelInfo = JSON.parse($.session.get('goOnBooktravelInfo'));
	TAminDate = goOnBooktravelInfo.starTime.split(" ")[0]
	TAmaxDate = goOnBooktravelInfo.endTime.split(" ")[0]
	var minTime = new Date().getTime()
	var minTime2
	if (TAminDate == 0) {
		minTime2 = new Date().getTime()
	} else {
		minTime2 = new Date(TAminDate.replace(/-/g, "/")).getTime()
	}
	TAminDate = minTime < minTime2 ? TAminDate : new Date()
}
// console.log(JSON.parse($.session.get('returnTicket')));

// 时间选择
var day = $.session.get('searchIntelDay');
var returnday = $.session.get('searchIntelReturnDay');
var setTime = 'all'
var setReturnTime = 'all'

function showPlusMinus() {
	if ($('#domDepartureSelect').val() != "all") {
		// $('#DepartPlusMinus').css('color','#000000')
		$('#DepartPlusMinus').removeAttr('disabled')
	} else {
		// $('#DepartPlusMinus').css('color':'#000000')
		$('#DepartPlusMinus').attr('disabled', 'disabled')
	}
	if ($('#domReturnSelect').val() != "all") {
		// $('#returnPlusMinus').css('color','#000000')
		$('#returnPlusMinus').removeAttr('disabled')
	} else {
		// $('#DepartPlusMinus').css('color':'#000000')
		$('#returnPlusMinus').attr('disabled', 'disabled')
	}
}

//中英文对象
var cn = {
	"progressBar": {
		"search": "查询",
		"book": "预订",
		"complete": "完成",
	},
	"searchBody": {
		"oneWay": "单程",
		"roundTrip": "来回程",
		"allDay": "全天",
		"search": "查询",
		"weekDay": '星期天, 星期一, 星期二, 星期三, 星期四, 星期五, 星期六',
		"from": '出发',
		"to": '抵达',
		"departure": "去程",
		"return": "回程",
		'cabins': {
			// 'cabin1': '不限',
			'cabin1': '全部',
			'cabin2': '经济舱',
			'cabin3': '公务舱',
			'cabin4': '头等舱',
			'cabin5': '公务舱/头等舱',
			'cabin6': "超级经济舱",
		},
		filter: '筛选',
		reset: "重置",
	},
	'airportName': {
		'all': '全部航空公司',
	},
	"ticketList": {
		"listRemind": "没有相关的航班信息！",
		"tittle": "机票列表",
		"FlightNo": "航班",
		"PlaneType": "机型",
		"Punctuality": "准点率",
		"Duration": "用时",
		"LowestFare": "最低价",
		"LowestFareFlight": "该航班最低价",
		"PreferredAirline": "协议航空公司",
		"CompanyPreferred": "公司推荐",
		"preDay": "前一天",
		"nextDay": "后一天",
		"Code_share": "(共享)",
		"Tax": "税",
		"includeTax": "含税",
		"roundTittleGo": "去程票",
		"roundTittleReturn": "回程票",
		// "stopIcon":"经停",
		"stopIcon": "转机",
		"protocol": "协议价",
		"flightDetail": "航班详情",
		"BaggageInfo": "行李:",
		"noStop": "无转机",
		"stopOver": "转机",
		'book': '预订',
		'baggagePolicy': 'Policies and Baggage Allowance',
		'discountRate': '折扣价',
		'corporateRate': '协议价'
	},
	"flightDetailPop": {
		"Flytime": "飞行",
		"transfer": "中转 ",
	},
	"ticketSpread": {
		"cabinCode": "舱位",
		"seatsNum": "座位数",
		"cabinType": "舱位类型",
		"NominalPrice": "票面价",
		"Tax": "税",
		"choose": "选择",
		'restriction': "限制条件",
		"violation": "违反政策",
	},
	"LowestAirlineRemind": "该航班为廉价航空，托运行李额须以航司规则为准，详情请咨询差旅顾问。",
	"popBody": {
		"popTittle": "您的预订与贵公司差旅政策不符，请选择原因",
		"confirm": "确定",
		"reasonTittle": "根据贵公司差旅政策规定， 因您未选择最低价格航班，请您选择原因：",
		"lowestTittle": "根据贵公司差旅政策规定， 全天最低价航班为：",
		"lowestTittle1": "根据贵公司差旅政策规定， 前后",
		"lowestTittle2": "小时最低价航班为：",
		"chooseLowest": "预订最低票价",
		"rasonRemind": "请选择理由",
		"ticketPrice": "票价:",
		"save": "可节省:",
		"true": "实际承运:",
	},
	"rulePopHeader": "退改签规则",
	"cabinRemind": "您选择的行程没有可销售运价",
	"pointBody": {
		"lowest": "最低票价",
		"recommend": "协议航空公司",
		"or": "或",
		"points": " 分",
	},
	"approachingTakeoff": {
		"title": "临近起飞",
		"para1": "1. 本航班已临近起飞时间，购票前请先到值机柜台确认出票后仍有时间值机 (支付成功后至少需 5-10 分钟完成出票) 。",
		"para2": "2. 若出票失败，订单自动取消并全额退款，若已出票，退改损失需自行承担",
		"btn": "确认预订"
	},
	'refineSearch': {
		"title": "优化搜索",
		"show": '显示 ',
		"of": ' / ',
		"collapse": '收起',
		"expand": '展开',
		"stops": '经停',
		"nearby": '附近机场',
		"connections": '中转机场',
		"airlines": '航空公司',
		"depart": '出发机场',
		"arrive": '到达机场',
		"anyStops": '任意经停',
		"nonStop": '无经停',
		"stopOne": '1 经停',
		"stopsMore": '2个以上',
		"all": '全部',
		"none": '无',
		"reset": "重置为原始搜索条件",
		"departureSort": "出发时间",
		"durationSort": "用时",
		"priceSort": "价格",
		"sortBy": "排序：",
		"default": "默认",
		"departureSortAsc": "出发时间早 - 晚",
		"departureSortDesc": "出发时间晚 - 早",
		"durationSortAsc": "用时少 - 多",
		"durationSortDesc": "用时多 - 少",
		"priceSortAsc": "价格低 - 高",
		"priceSortDesc": "价格高 - 低",
		"sortTitle": "去程票",
		"sortTitleReturn": "回程票",
	},
	taxReminder: '价格包含税金和费用',
	coronavirusTitle: '冠状病毒和旅行禁令',
	coronavirusReminder: '本报告总结了最近世界各地的一些旅行限制情况，',
	learnMore: '了解更多',
}
var en = {
	"progressBar": {
		"search": "Search",
		"book": "Book",
		"complete": "Complete",
	},
	"searchBody": {
		"oneWay": "One-way",
		"roundTrip": "Round-Trip",
		'allDay': "All Day",
		"search": "Search",
		"weekDay": 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
		"from": 'from',
		"to": 'to',
		"departure": "departure",
		"return": "return",
		'cabins': {
			'cabin1': 'All Classes',
			'cabin2': 'Economy',
			'cabin3': 'Business',
			'cabin4': 'First',
			'cabin5': 'Business/First',
			'cabin6': "Economy Extra",
		},
		filter: 'Filter',
		reset: "Reset to Original Search",
	},
	'airportName': {
		'all': 'All Airlines',
	},
	"ticketList": {
		"listRemind": "No relevant flight available",
		"tittle": "Segment List",
		"FlightNo": "Flight",
		"PlaneType": "Aircraft",
		"Punctuality": "Punctuality",
		"Duration": "Duration",
		"LowestFare": "Lowest Fare",
		"LowestFareFlight": "Lowest Fare of the same Flight",
		"PreferredAirline": "Preferred Airline",
		"CompanyPreferred": "Company Preferred",
		"preDay": "Previous Day",
		"nextDay": "Next Day",
		"Code_share": "(share)",
		"Tax": "Tax",
		"includeTax": "Tax Included",
		"roundTittleGo": "Departure",
		"roundTittleReturn": "Return",
		// "stopIcon":"Connecting",
		"stopIcon": "Stopover",
		"protocol": "Corporate",
		"flightDetail": "Flight Details",
		"BaggageInfo": "Baggage:",
		"noStop": "Nonstop",
		"stopOver": "stop",
		'book': 'Book',
		'baggagePolicy': 'Policies and Baggage Allowance',
		'discountRate': 'Discount Rate',
		'corporateRate': 'Corporate Rate'
	},
	"flightDetailPop": {
		"Flytime": "Flying Time",
		"transfer": "Layover",
	},
	"ticketSpread": {
		"cabinCode": "Cabin Code",
		"seatsNum": "Seats Num",
		"cabinType": "Cabin Type",
		"NominalPrice": "Nominal Price",
		"Tax": "Tax",
		"choose": "Choose",
		'restriction': "Restriction",
		"violation": "Out of Policy",
	},
	"LowestAirlineRemind": "This is a low-cost flight, the checked-in baggage allowance will be subject to airline's policy. Please contact your consultant for details of luggage issue.",
	"popBody": {
		"popTittle": "Your reservation does not match your company's travel policy, please select the reason",
		"confirm": "Confirm",
		"reasonTittle": "According to your company's travel policy, if you have not selected the lowest price flight, please choose the reason:",
		"lowestTittle": "According to your company's travel policy, the lowest fare of flight in this day is：",
		"lowestTittle1": "According to your company's travel policy, the ",
		"lowestTittle2": "-hour minimum flight is",
		"chooseLowest": "Book the lowest fare",
		"rasonRemind": "Please choose reasons.",
		"ticketPrice": "Ticket Price:",
		"save": "Save:",
		"true": "True:",
	},
	"rulePopHeader": "Restriction",
	"cabinRemind": "No fare available for the flights you selected.",
	"pointBody": {
		"lowest": "lowest price",
		"recommend": "recommended airline's",
		"or": "/",
		"points": " Points",
	},
	"approachingTakeoff": {
		"title": "Approaching Takeoff",
		"para1": "1. The flight is approaching the departure time. Please confirm at the airlines counter if you have enough time to complete the check in process. (it will take at least 5-10 minutes to complete the ticket issuance after successful payment).",
		"para2": "2. If travelers are refused to check in at airline counter once ticket issued, they need to pay the change fee and refund penalty at their own account.",
		"btn": "Confirm Booking"
	},
	'refineSearch': {
		"title": "Refine Search",
		"show": 'showing ',
		"of": ' of ',
		"collapse": 'Collapse Filters',
		"expand": 'Expand Filters',
		"stops": 'Stops',
		"nearby": 'Nearby Airports',
		"connections": 'Connections',
		"airlines": 'Airlines',
		"depart": 'Depart',
		"arrive": 'Arrive',
		"anyStops": 'Any Stops',
		"nonStop": 'Non-stop',
		"stopOne": '1 Stop',
		"stopsMore": '2+ Stops',
		"all": 'All',
		"none": 'none',
		"reset": "Reset to Original Search",
		"sortBy": "Sort by: ",
		"default": "Default",
		"departureSort": "Departure time",
		"durationSort": "Duration",
		"priceSort": "Price",
		"departureSortAsc": "Departure time early to late",
		"departureSortDesc": "Departure time late to early",
		"durationSortAsc": "Duration less to more",
		"durationSortDesc": "Duration more to less",
		"priceSortAsc": "Price low to high",
		"priceSortDesc": "Price high to low",
		"sortTitle": "Departure",
		"sortTitleReturn": "Return",
	},
	taxReminder: 'Price includes taxes and fees.',
	coronavirusTitle: 'Coronavirus and travel bans',
	coronavirusReminder: 'This report summarizes some recent travel restriction developments around the world due to the',
	learnMore: 'Learn more',
}

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
	if (t == undefined) t = cn[m];
	if (t == undefined) t = en[m];

	return t;
}
//弹窗
var textObj = {
	title: get_lan('approachingTakeoff').title,
	body: "<p>" + get_lan('approachingTakeoff').para1 + "</p>\
			<br>\
			<p>" + get_lan('approachingTakeoff').para2 + "</p>",
	btnText: get_lan('approachingTakeoff').btn
}
var start = new PopUpWindow(textObj);
$(function () {
	showContent(); //内容展示
	ticketList(); //机票列表
})
//2021.2 筛选改版
var departureSortDefault = get_lan('refineSearch').departureSort;
var durationSortDefault = get_lan('refineSearch').durationSort;
var priceSortDefault = get_lan('refineSearch').priceSort;
function newFilter(segmentList) {

	var segmentList = segmentList || [];
	var resultArray = [].concat(segmentList);
	/**
	 * 因为回程票中英文切换获取到的数据永远是首次进入页面时的语言，
	 * 另外中文回参的Departure和Destination是机场名，英文的是三字码，必须做判断才能验证。
	 * 所以，先用第一条数据判断下是中文还是英文。
	 */
	var dataLanguage = 'EN';
	var i = 0;
	do {
		if (segmentList[0].Departure == segmentList[0].InterSegments[i].AirportDeparte) {
			dataLanguage = 'CN';
			break;
		} else {
			i++;
		}
	} while (i < segmentList[0].InterSegments.length)
	var connectionsCodes = [], departCodes = [], arriveCodes = [];
	/**
	 * connections: {text: InterSegments.AirportDeparte, value: InterSegments.AirportDeparteCode}
	 * depart     : {text: InterSegments.AirportDeparte, value: InterSegments.AirportDeparteCode}
	 * arrive     : {text: InterSegments.AirportArrive, value: InterSegments.AirportArriveCode}
	 * airlineArr : {text: AirLine, value: AirLine, lowestPrice: Fare + TotalTax, currency: currency}
	 */
	var connections = [], depart = [], arrive = [], airlineArr = [{ text: get_lan('refineSearch').all, value: 'all' }];
	var airline = {};
	var currency = segmentList[0].Curreny
	segmentList.map(function (segment) {
		var lowestPrice = parseInt(segment.Fare) + parseInt(segment.TotalTax)
		if (!airline[segment.AirLine] ||
			lowestPrice < parseInt(airline[segment.AirLine])) {
			airline[segment.AirLine] = lowestPrice;
		}
		//遍历数据初始化筛选内容
		segment.InterSegments.map(function (segmentChild) {
			if (dataLanguage == 'CN') {
				var segDepC = segmentChild.AirportDeparte, segArrC = segmentChild.AirportArrive;
			} else {
				var segDepC = segmentChild.AirportDeparteCode, segArrC = segmentChild.AirportArriveCode;
			}
			if (segDepC == segment.Departure) {
				if (departCodes.indexOf(segDepC) == -1) {
					departCodes.push(segDepC);
					depart.push({
						text: segmentChild.AirportDeparte,
						value: segDepC
					})
				}
			} else if (connectionsCodes.indexOf(segDepC) == -1) {
				connectionsCodes.push(segDepC);
				connections.push({
					text: segmentChild.AirportDeparte,
					value: segmentChild.AirportDeparteCode
				})
			}

			if (segArrC == segment.Destination && arriveCodes.indexOf(segArrC) == -1) {
				arriveCodes.push(segArrC);
				arrive.push({
					text: segmentChild.AirportArrive,
					value: segArrC,
				})
			}
		})
	})
	for (var airCompany in airline) {
		airlineArr.push({
			text: airCompany,
			value: airCompany,
			lowestPrice: airline[airCompany],
			currency: currency
		})
	}
	// 升序排列
	airlineArr = airlineArr.sort(function (a, b) {
		return a.lowestPrice - b.lowestPrice
	})
	var filters = [
		{
			name: "stops",
			title: get_lan('refineSearch').stops,
			default: get_lan('refineSearch').all,
			values: [
				{
					text: get_lan('refineSearch').anyStops,
					value: 'all',
				}, {
					text: get_lan('refineSearch').nonStop,
					value: 0,
				}, {
					text: get_lan('refineSearch').stopOne,
					value: 1,
				}, {
					text: get_lan('refineSearch').stopsMore,
					value: 2,
				},
			],
			condition: function (resultArray, value) {
				switch (value) {
					case 2:
						for (var i = resultArray.length - 1; i >= 0; i--) {
							if (resultArray[i].InterSegments.length - 1 >= value) {
								resultArray.splice(i, 1);
							}
						}; break;
					default:
						for (var i = resultArray.length - 1; i >= 0; i--) {
							if (resultArray[i].InterSegments.length - 1 == value) {
								resultArray.splice(i, 1);
							}
						}; break;
				}
				return resultArray;
			}
		}, {
			name: "nearyBy",
			title: get_lan('refineSearch').nearby,
			default: get_lan('refineSearch').nearby,
			child: [
				{
					name: "depart",
					title: get_lan('refineSearch').depart,
					default: get_lan('refineSearch').all,
					values: depart,
					condition: function (resultArray, value) {
						for (var i = resultArray.length - 1; i >= 0; i--) {
							if (resultArray[i].Departure == value) {
								resultArray.splice(i, 1);

							}
						}
						return resultArray;
					}
				}, {
					name: "arrive",
					title: get_lan('refineSearch').arrive,
					default: get_lan('refineSearch').all,
					values: arrive,
					condition: function (resultArray, value) {
						for (var i = resultArray.length - 1; i >= 0; i--) {
							if (resultArray[i].Destination == value) {
								resultArray.splice(i, 1);

							}
						}
						return resultArray;
					}
				}
			]
		}, {
			name: "connections",
			title: get_lan('refineSearch').connections,
			default: get_lan('refineSearch').all,
			values: connections,
			condition: function (resultArray, value) {
				for (var index = resultArray.length - 1; index >= 0; index--) {
					for (var i = 0; i < resultArray[index].InterSegments.length; i++) {
						if (resultArray[index].InterSegments[i].AirportDeparteCode == value) {
							resultArray.splice(index, 1);
							break;
						}
					}
				}
				return resultArray;
			}
		}, {
			name: "airlines",
			title: get_lan('refineSearch').airlines,
			default: get_lan('refineSearch').all,
			values: airlineArr,
			condition: function (resultArray, value) {
				if (value != 'all') {
					for (var i = resultArray.length - 1; i >= 0; i--) {
						if (resultArray[i].AirLine == value) {
							resultArray.splice(i, 1);
						}
					}
				}

				return resultArray;
			}
		}
	]
	console.log(filters);
	initFilterSort();
	//优化搜索 - 初始化 - 筛选框
	function initFilterSort() {
		var showingCounts = segmentList.length, Summary = segmentList.length;

		//遍历filters数组，把筛选条件绑定到大小筛选块
		filters.map(function (filterOption, filterIndex) {
			//1. 如果child长度大于等于1，大筛选块内用input+options，否则普通options
			var openCardBody = '', closeCardBody = '', multiple = '';
			if (filterOption.child && filterOption.child.length >= 1) {
				var openSelectorBox = '';
				multiple = 'multiple';
				filterOption.child.map(function (cardChild, index) {
					var options = ''
					cardChild.values.map(function (option) {
						options += '\
							<li class="openBox__card__itemBox" value="' + option.value + '" selector="' + cardChild.name + '">\
								<div class="filter__selector selected"></div>\
								<div class="filter__selector__desc">' + option.text + '</div>\
							</li>'
					})
					if (options != '') {
						openSelectorBox += '\
						<h3 class="openBox__card__title filter_sub_title">' + cardChild.title + '</h3>\
						<ul>'+ options + '</ul>'
					}
				})
				if (openSelectorBox != '') {
					openCardBody = '<div class="openBox__card__selectorBox">' + openSelectorBox + '</div>';
				}
			} else if (filterOption.values.length >= 1) {
				var options = ''
				filterOption.values.map(function (option) {
					options += '\
						<li class="openBox__card__itemBox" value="' + option.value + '" selector="' + filterOption.name + '">\
							<div class="filter__selector selected"></div>\
							<div class="filter__selector__desc">' + option.text + '</div>\
						</li>'

				})
				openCardBody = '<ul class="openBox__card__selectorBox">' + options + '</ul>';
			}
			//2. 大筛选条件
			if (openCardBody != '') {
				$('.filter_box').append('\
					<div class="filter_option-box">\
						<h3 class="openBox__card__title filter_sub_title">' + filterOption.title + '</h3>\
						<div class="openBox__card__body" index="'+ filterIndex + '">' + openCardBody + '</div>\
					</div>');
			}
		})
		if (isReturn == 1) {
			$(".sort__title").text(get_lan('refineSearch').sortTitleReturn);
		}
		//5. 绑定筛选事件
		mapFilters(filterClickHandler);
		// if (ProfileInfo.onlineStyle != 'APPLE') {
		// 	$('.openBox__card__title').css('background-color', $('.menu').css('background-color'));
		// }
		$('.filter_reset_btn').click(function () {
			//还原搜索条件
			$('.openBox__card__itemBox').map(function (index) {
				addSelectedByIndex('.openBox__card__itemBox', index)
			})
			$('.filter__airCompany').map(function (index) {
				addSelectedByIndex('.filter__airCompany', index)
			})
			resetSorts();
			mapFilters(resetFilterInput)

			resultArray = [].concat(segmentList);
			setAirline(resultArray);
		})
		function mapFilters(callback) {
			filters.map(function (filterOption) {
				if (filterOption.child && filterOption.child.length >= 1) {
					filterOption.child.map(function (cardChild) {
						callback(cardChild);
					})
				} else {
					callback(filterOption);
				}
			})
		}
		function addSelectedByIndex(parent, index) {
			if (!$(parent).eq(index).children('.filter__selector').hasClass('selected')) {
				$(parent).eq(index).children('.filter__selector').addClass('selected');
			}
		}
		function resetFilterInput(selector) {
			$('input[name=' + selector.name + ']').val(selector.default);
		}
		function filterClickHandler(selector) {
			$('.openBox__card__itemBox[selector=' + selector.name + ']').click(function () {
				filterAirline(selector, this);
			});
			if (selector.name == 'airlines') {
				$('.filter__airCompany').click(function () {
					filterAirline(selector, this);
				})
			}
		}
		function filterAirline(selector, dom) {
			var value = $(dom).attr('value');
			if (value == 'all') {
				if ($('.openBox__card__itemBox[selector=' + selector.name + '][value="' + value + '"]').children('.filter__selector').hasClass('selected')) {
					$('.openBox__card__itemBox[selector=' + selector.name + ']').children('.filter__selector').removeClass('selected')
				} else {
					$('.openBox__card__itemBox[selector=' + selector.name + ']').children('.filter__selector').addClass('selected')
				}
			} else {
				$('.openBox__card__itemBox[selector=' + selector.name + '][value="' + value + '"]').children('.filter__selector').toggleClass('selected')
				var length = $('.openBox__card__itemBox[selector=' + selector.name + ']').length;
				var all = true;
				for (var i = 0; i < length; i++) {
					if (!$('.openBox__card__itemBox[selector=' + selector.name + ']').eq(i).children('.filter__selector').hasClass('selected') &&
						$('.openBox__card__itemBox[selector=' + selector.name + ']').eq(i).attr('value') != 'all') {
						all = false;
						break;
					}
				}
				if (all) {
					$('.openBox__card__itemBox[selector=' + selector.name + '][value="all"]').children('.filter__selector').addClass('selected')
				} else {
					$('.openBox__card__itemBox[selector=' + selector.name + '][value="all"]').children('.filter__selector').removeClass('selected')
				}
			}

			if (selector.name == 'airlines') {
				if (value == 'all') {
					if ($('.openBox__card__itemBox[selector=' + selector.name + '][value="' + value + '"]').children('.filter__selector').hasClass('selected')) {
						$('.filter__airCompany[selector=' + selector.name + ']').children('.filter__selector').addClass('selected')
					} else {
						$('.filter__airCompany[selector=' + selector.name + ']').children('.filter__selector').removeClass('selected')
					}
				}
				$('.filter__airCompany[selector=' + selector.name + '][value="' + value + '"]').children('.filter__selector').toggleClass('selected')
			}
			resetSorts();

			resultArray = [].concat(segmentList);
			mapFilters(function (filter) {
				var isSelectedAll = true, inputText = '';
				filter.values.map(function (option) {
					if (!$('.openBox__card__itemBox[selector=' + filter.name + '][value="' + option.value + '"]').children('.filter__selector').hasClass('selected')) {
						resultArray = filter.condition(resultArray, option.value);
						isSelectedAll = false;
					} else {
						inputText += option.text + " ";
					}
				})
				inputText = isSelectedAll ? filter.default : inputText == '' ? get_lan('refineSearch').none : inputText;
				$('input[name=' + filter.name + ']').val(inputText);
			})
			setAirline(resultArray);
		}
		function setAirline(resultArray) {
			console.log(resultArray);
			if (resultArray.length > 0) {
				ticketListInfo(resultArray);	//函数内有alert，影响体验
			} else {
				$(".ticketList").html('');
			}
			sortTicketInfo(resultArray);
			showingCounts = resultArray.length;
			resultCount = '(' + get_lan('refineSearch').show + showingCounts + get_lan('refineSearch').of + Summary + ')';
			$('.filter__bar__resultCount').html(resultCount);
		}

	}
}
function resetSorts() {
	$('.sort__button').removeClass('active').removeAttr('sortType');
	$('.departureTimeSortNew').text(departureSortDefault);
	$('.durationSortNew').text(durationSortDefault);
	$('.priceSortNew').text(priceSortDefault);
}
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" })
}
$(document).on('click', function (e) {
	var target = $(e.target)
	if (!target.is('.sort_box_operations-list *')) {
		$('.sort_box_operations-pop').closePopWindow(500, $('.sort_box_operations-selected'))
	}
	if (!target.is('.ticketFlightDetail *')) {
		$('.flight_detail_pop:not(".hidden")').closePopWindow(300)
	}
	if (!target.is('.search_filter-box *')) {
		$('.search_filter-box_pop:not(".hidden")').closePopWindow(300, $('.search_filter-box'))
	}
})

function useSortEffect() {
	$('.sort_box_operations-selected').click(function () {
		$(this).siblings().usePopWindowEffect(500, $(this))
	})
}
//内容展示
function showContent() {
	$("#main").html(
		'<div class="autoCenter">\
            <div class="progressBar"></div>\
			<div class="searchBody"></div>\
			<section class="container">\
				<aside class="filter_side">\
					<section class="filter_wrapper">\
						<div class="filter_box">\
							<div class="filter_reset">\
								<h3 class="filter_title">'+ get_lan('searchBody').filter + '</h3>\
								<button class="filter_reset_btn">'+ get_lan('searchBody').reset + '</button>\
							</div>\
						</div>\
					<section>\
					<div class="filter_switch"></div>\
				</aside>\
				<section class="air_main">\
					<div class="ticketBody"></div>\
					<div class="eTravel_reminder_box pointsHeader hide">\
						<div class="eTravel_reminder_box_icon"></div>\
						<span class="pointsReminder"></span>\
					</div>\
					<div class="eTravel_reminder_box-orange">'+ get_lan('taxReminder') + '</div>\
					<div class="coronavirus-reminder">\
						<h2>'+ get_lan('coronavirusTitle') + '</h2>\
						<p>'+ get_lan('coronavirusReminder') + '\
							<a href="https://www.bcdtravel.com/covid-19-information/" target="_blank">'+ get_lan('learnMore') + '</a>\
						</p>\
					</div>\
					<div class="sort_box">\
						<h3 class="sort__title">'+ get_lan('refineSearch').sortTitle + '</h3>\
						<div class="sort_box_operations">\
							<h3 class="sort_box_operations-title">'+ get_lan('refineSearch').sortBy + '</h3>\
							<div class="sort_box_operations-list">\
								<p class="sort_box_operations-selected">'+ get_lan('refineSearch').default + '</p>\
								<ul class="sort_box_operations-pop hidden negative">\
									<li class="sort_box_operations-option departureTimeSort" sortType="asc">'+ get_lan('refineSearch').departureSortAsc + '</li>\
									<li class="sort_box_operations-option departureTimeSort" sortType="desc">'+ get_lan('refineSearch').departureSortDesc + '</li>\
									<li class="sort_box_operations-option durationSort" sortType="asc">'+ get_lan('refineSearch').durationSortAsc + '</li>\
									<li class="sort_box_operations-option durationSort" sortType="desc">'+ get_lan('refineSearch').durationSortDesc + '</li>\
									<li class="sort_box_operations-option priceSort" sortType="asc">'+ get_lan('refineSearch').priceSortAsc + '</li>\
									<li class="sort_box_operations-option priceSort" sortType="desc">'+ get_lan('refineSearch').priceSortDesc + '</li>\
								</ul>\
							</div>\
						</div>\
					</div>\
					<ul class="ticketList"></ul>\
				</section>\
			</section>\
        </div>'
	)
	useSortEffect()
	if (TAorderNo != undefined) {
		console.log('隐藏')
		$('.menu .autoCenter').addClass('hide')
		$('.orderTittle').addClass('hide')
		$('.autoScrollY').addClass('hide')
		$('footer').addClass('hide')
		$('.menu').css("height", '40px')
	}
	$(".progressBar").html('\
			<div class="progressLine active"></div><span class="activeProgress">'+ get_lan('progressBar').search + '</span>\
			<div class="progressLine progressBackColor"></div>'+ get_lan('progressBar').book + '\
			<div class="progressLine progressBackColor"></div>'+ get_lan('progressBar').complete + '\
        ')
	var showOneWay = ProfileInfo.onlineStyle == "APPLE" ? "hide" : "";
	var optionStr = ''
	if (ProfileInfo.onlineStyle == "APPLE") { //苹果的舱位两个,其他的为全部
		optionStr = '<option value="1" berthType="1">' + get_lan('searchBody').cabins.cabin2 + '</option>\
					<option value="2" berthType="2">' + get_lan('searchBody').cabins.cabin3 + '</option>'
	} else {
		optionStr = '<div class="search_filter-box_pop_item"  berthType="0">' + get_lan('searchBody').cabins.cabin1 + '</div>\
					<div class="search_filter-box_pop_item" berthType="1"><span class="level">'+ get_lan('searchBody').cabins.cabin2 + '</span></div>\
					<div class="search_filter-box_pop_item" berthType="2"><span class="level">'+ get_lan('searchBody').cabins.cabin3 + '</span></div>\
					<div class="search_filter-box_pop_item" berthType="3"><span class="level">'+ get_lan('searchBody').cabins.cabin4 + '</span></div>\
					<div class="search_filter-box_pop_item" berthType="4"><span class="level">'+ get_lan('searchBody').cabins.cabin6 + '</span></div>'
	}
	// 24小时
	var hours = new Array(24)

	for (var i = 0; i < hours.length; i++) {
		hours[i] = i + ':00'
	}
	hours.unshift(get_lan("searchBody").allDay)
	var hoursOptions = '', hoursValue = '', hoursClass = ''
	hours.map(function (item, index) {
		if (item === get_lan('searchBody').allDay) {
			hoursValue = 'all'
			hoursClass = 'intlAllDay'
		} else {
			hoursValue = index - 1
			hoursClass = ''
		}
		hoursOptions += '<option value="' + hoursValue + '" class="' + hoursClass + '">' + item + '</option>'
	})
	// +-12小时
	var hoursDiff = new Array(12)
	for (var i = 0; i < hoursDiff.length; i++) {
		hoursDiff[i] = '±' + (i + 1) + 'H'
	}
	var hoursDiffOptions = ''
	hoursDiff.map(function (item, index) {
		hoursDiffOptions += '<option value="' + (index + 1) + '">' + item + '</option>'
	})
	// 2020.1.20  修改304行 <div class="intlDepartureWeek">'+getWeek(searchIntlInfo.date)+'</div></div>
	// 335行  <div class="intlReturnDateWeek">'+getWeek(GetDateStr(1,searchIntlInfo.date))+'</div></div>
	$(".searchBody").html('\
	<div class="search_wrapper">\
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
		<form class="search_inputItems">\
			<div class="intlDepartureCitySearch search_input-box">\
				<h6 class="search_title">'+ get_lan('searchBody').from + '</h6>\
				<input class="search_input search_from" type="text" autocomplete="off" id="intlDepartureCity" \
					value="' + searchIntlInfo.departureCityText + '" code="' + searchIntlInfo.departureCity + '" \
					cn="'+ searchIntlInfo.departureCityName.cn + '" en="' + searchIntlInfo.departureCityName.en + '">\
			</div>\
			<div class="intlArrivalCitySearch search_input-box">\
				<h6 class="search_title">'+ get_lan('searchBody').to + '</h6>\
				<input class="search_input search_to" type="text" autocomplete="off" id="intlArrivalCity" \
					value="' + searchIntlInfo.arrivalCityText + '" code="' + searchIntlInfo.arrivalCity + '" \
					cn="'+ searchIntlInfo.arrivalCityName.cn + '" en="' + searchIntlInfo.arrivalCityName.en + '">\
			</div>\
			<div class="intlDepartureDateSearch search_input-box">\
				<h6 class="search_title">'+ get_lan('searchBody').departure + '</h6>\
				<div class="search_input-box-multiple">\
					<input class="search_air-date" type="text" id="intlDepartureDate" readonly value="' + searchIntlInfo.date + '">\
					<select type="text" id="intlDepartureSelect" onchange="GrayIntelDepartPlusMinus()">'+ hoursOptions + '</select>\
					<div class="intlDepartureWeek">\
						<select class="plusMinus" type="text" id="DepartPlusMinusintel">'+ hoursDiffOptions + '</select>\
					</div>\
				</div>\
			</div>\
			<div class="intlReturnDateSearch search_input-box">\
				<h6 class="search_title">'+ get_lan('searchBody').return + '</h6>\
				<div class="search_input-box-multiple">\
					<input class="search_air-date" type="text" id="intlReturnDate" readonly value="' + GetDateStr(1, searchIntlInfo.date) + '">\
					<select type="text" id="intlReturnSelect" onchange="GrayIntelreturnPlusMinus()">'+ hoursOptions + '</select>\
					<div class="intlReturnDateWeek">\
						<select  class="plusMinus" type="text" id="returnPlusMinusintel">'+ hoursDiffOptions + '</select>\
					</div>\
				</div>\
			</div>\
		</form>\
		<div class="search_buttonItems">\
			<div class="search_items">\
				<div class="search_filter-box">\
					<div class="search_filter-box_title">\
						<img src="../../images/Aus/air/icon_class.png" alt="level"/>\
						<span class="search_level_text">All</span>\
					</div>\
					<div class="search_filter-box_pop hidden negative" id="intlCabin">'+ optionStr + '</div>\
				</div>\
			</div>\
        	<div class="searchAirBtn search_btn">' + get_lan('searchBody').search + '</div>\
		</div>\
    </div>')
	if (ProfileInfo.NeedSpecialPolicy) {
		$(".search_level_text").text($('.search_filter-box_pop_item[berthType="0"]').text());
		$(".search_level_text").attr('berthType', 0)
	} else {
		$('.search_filter-box_title').click(function () {
			$('.search_filter-box_pop').usePopWindowEffect(300, $('.search_filter-box'))
		})
		$('.search_filter-box_pop_item').click(function () {
			$(".search_level_text").text($(this).text());
			$('.search_level_text').attr('berthType', $(this).attr('berthType'))
			// $('.search_filter-box').removeClass('active')
		})
	}
	//时间限制
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
				if (item.LimitType == 2) {
					$(".searchAirBtn").attr("CanSearch", item.CanSearch);
					$(".searchAirBtn").attr("StartLimit", item.StartLimit);
					$(".searchAirBtn").attr("Message", item.Message);
					$(".chooseDate").hide();
				}
			})
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
			url: $.session.get('obtCompany') + "/SystemService.svc/ProfilePost",
			jsonStr: '{"key":' + netUserId + '}'
		},
		success: function (data) {
			var res = JSON.parse(data);
			console.log(res);
			if (res.SearchInterAirWTime && res.DomesticHideAllDay) {
				$(".intlAllDay").remove();
				$("#intlDepartureSelect").val("8");
				$("#intlReturnSelect").val("17");
			}
			if (!res.SearchInterAirWTime) {
				$("#intlDepartureSelect").remove();
				$("#intlReturnSelect").remove();
			} else {
				if (searchIntlInfo.queryKey.split(',')[2].indexOf(' ') != -1) {
					var departureHour = searchIntlInfo.queryKey.split(',')[2].split(' ')[1].split(':')[0];
					$("#intlDepartureSelect").val(departureHour);
				} else {
					$("#intlDepartureSelect").val('all');
				}
				if (searchIntlInfo.queryKeyReturn && searchIntlInfo.queryKeyReturn.split(',')[3].indexOf(' ') != -1) {
					var arrivalHour = searchIntlInfo.queryKeyReturn.split(',')[3].split(' ')[1].split(':')[0];
					$("#intlReturnSelect").val(arrivalHour);
				} else {
					$("#intlReturnSelect").val('all');
				}
			}
		},
		error: function () {
			// alert('fail');
		}
	});
	$(".search_level_text").text($('.search_filter-box_pop_item[berthType="' + searchIntlInfo.showCabins + '"]').text());
	$(".search_level_text").attr('berthType', searchIntlInfo.showCabins)
	// 202.1.20 新增
	if (!ProfileInfo.QueryDomesticTicketsWithTime) {
		$("#DepartPlusMinus").remove();
		$("#DepartPlusMinus").remove();
		// 检查是否有±几小时的权限
		if (!ProfileInfo.ShowDomesticTimeSlt) {
			$(".intlDepartureWeek").remove();
			$('.intlReturnDateWeek').remove()
			$('.search_input-box-multiple').addClass('noTime')
		}
	} else {
		if (searchIntlInfo.queryKey.split(',')[2].indexOf(' ') != -1) {
			var departureHour = searchIntlInfo.queryKey.split(',')[2].split(' ')[1].split(':')[0];
			$("#intlDepartureSelect").val(departureHour);
		} else {
			$("#intlDepartureSelect").val('all');
		}
		if (searchIntlInfo.queryKeyReturn && searchIntlInfo.queryKeyReturn.split(',')[3].indexOf(' ') != -1) {
			var arrivalHour = searchIntlInfo.queryKeyReturn.split(',')[3].split(' ')[1].split(':')[0];
			$("#intlReturnSelect").val(arrivalHour);
		} else {
			$("#intlReturnSelect").val('all');
		}
		// 检查是否有±几小时的权限
		if (!ProfileInfo.ShowDomesticTimeSlt) {
			$(".intlDepartureWeek").remove();
			$('.intlReturnDateWeek').remove()
			$('.search_input-box-multiple').addClass('noTime')
		}

		// 正负小时,±小时默认值 以及状态显示
		if (day > 0) {
			$('#DepartPlusMinusintel').val(day)
		} else {
			$('#DepartPlusMinusintel').val(12)//5改为12
		}
		if (returnday > 0) {
			$('#returnPlusMinusintel').val(returnday)
		} else {
			$('#returnPlusMinusintel').val(12)
		}
		// 默认值设置后
		showPlusMinus()
	}
	GrayIntelDepartPlusMinus()
	GrayIntelreturnPlusMinus()
	if (searchIntlInfo.alterTicketInfo) {
		$(".searchBody").hide();
	}
	$("input[name='searchState']").click(function () {
		var selectedValue = $('input[name="searchState"]:checked').attr("state")
		if (selectedValue == '1') {
			$(".intlReturnDateSearch *").attr('disabled', 'disabled');
		} else if (selectedValue == '2') {
			$(".intlReturnDateSearch *").removeAttr('disabled');
			var departureValue = new Date($("#intlDepartureDate").val().replace(/-/g, "/"));
			$("#intlReturnDate").datepicker('destroy');
			$("#intlReturnDate").datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				minDate: departureValue, // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				// onSelect: function () {
				// 	$(".intlReturnDateWeek").text(getWeek($("#intlReturnDate").val()));
				// }
			});
			if (ProfileInfo.SearchInterAirWTime && ProfileInfo.DomesticHideAllDay) {
				$('#intlReturnSelect').val(17)
			} else {
				$('#intlReturnSelect').val('all')
			}
			$('#returnPlusMinusintel').val(12)//5换成12

		}
	})
	$(".searchAirBtn").unbind("click").click(function () {
		var that = this;
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
		var cityList = '"' + $('#intlDepartureCity').attr("code") + '","' + $('#intlArrivalCity').attr("code") + '"';
		tools.appleRemindPop(cityList, 1, netUserId, function () {
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
						} else {
							searchIntl()
						}
					} else {
						return false;
					}
				} else {
					searchIntl()
				}
			} else {
				searchIntl()
			}
		});

		function searchIntl() {
			var Direct = JSON.parse($.session.get('searchIntlInfo')).isDirect;
			var transitCityCode = JSON.parse($.session.get('searchIntlInfo')).transitCityCode;
			if ($('input[name="searchState"]:checked').attr("state") == '1') {
				var searchIntlInfo = {
					'type': 'oneWay',
					'departureCityText': $('#intlDepartureCity').val(),
					'arrivalCityText': $('#intlArrivalCity').val(),
					'departureCity': $('#intlDepartureCity').attr("code"),
					'arrivalCity': $('#intlArrivalCity').attr("code"),
					'date': $('#intlDepartureDate').val(),
					'queryKey': $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' + $('#intlDepartureDate').val(),
					'showCabins': $(".search_level_text").attr("berthtype"),
					'isDirect': Direct,
					'transitCityCode': transitCityCode,
				}
				if (ProfileInfo.SearchInterAirWTime) {
					if ($("#intlDepartureSelect option:selected").val() == "all") {
						var DepartureSelectValue = ''
					} else {
						var DepartureSelectValue = ' ' + $("#intlDepartureSelect option:selected").val() + ':00:00';
					}


					searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' +
						$('#intlDepartureDate').val() + DepartureSelectValue;
				}

				if ($('#DepartPlusMinusintel').val() == undefined || $('#DepartPlusMinusintel').val() == "undefined") {
					$.session.set('searchIntelDay', '');
				} else {
					$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
				}
				// 2020.1.20缓存更改后的正负±小时
				setRecentSearch(searchIntlInfo)
				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				location.replace('../../intlAir/airTicketList.html');
			} else if ($('input[name="searchState"]:checked').attr("state") == '2') {
				var searchIntlInfo = {
					'type': 'roundTrip',
					'departureCityText': $('#intlDepartureCity').val(),
					'arrivalCityText': $('#intlArrivalCity').val(),
					'departureCity': $('#intlDepartureCity').attr("code"),
					'arrivalCity': $('#intlArrivalCity').attr("code"),
					'date': $('#intlDepartureDate').val(),
					'returndate': $('#intlReturnDate').val(),
					'queryKey': $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' + $('#intlDepartureDate').val(),
					'queryKeyReturn': $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' + $('#intlDepartureDate').val() + ',' + $('#intlReturnDate').val(),
					'showCabins': $(".search_level_text").attr("berthtype"),
					'isDirect': Direct,
					'transitCityCode': transitCityCode,
				}
				if (ProfileInfo.SearchInterAirWTime) {
					if ($("#intlDepartureSelect option:selected").val() == "all") {
						var DepartureSelectValue = ''
					} else {
						var DepartureSelectValue = ' ' + $("#intlDepartureSelect option:selected").val() + ':00:00';
					}
					if ($("#intlReturnSelect option:selected").val() == "all") {
						var ReturnSelectValue = ''
					} else {
						var ReturnSelectValue = ' ' + $("#intlReturnSelect option:selected").val() + ':00:00';
					}
					$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
					$.session.set('searchIntelReturnDay', $('#returnPlusMinusintel').val())
					searchIntlInfo.queryKey = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") + ',' +
						$('#intlDepartureDate').val() + DepartureSelectValue;
					searchIntlInfo.queryKeyReturn = $('#intlDepartureCity').attr("code") + ',' + $('#intlArrivalCity').attr("code") +
						',' + $('#intlDepartureDate').val() + DepartureSelectValue + ',' + $('#intlReturnDate').val() +
						ReturnSelectValue;
				}

				// 2020.1.20缓存更改后的正负±小时
				if ($('#DepartPlusMinusintel').val() == undefined || $('#DepartPlusMinusintel').val() == "undefined") {
					$.session.set('searchIntelDay', '');
				} else {
					$.session.set('searchIntelDay', $('#DepartPlusMinusintel').val());
				}

				if ($('#returnPlusMinusintel').val() == undefined || $('#returnPlusMinusintel').val() == "undefined") {
					$.session.set('searchIntelReturnDay', '');
				} else {
					$.session.set('searchIntelReturnDay', $('#returnPlusMinusintel').val());
				}
				setRecentSearch(searchIntlInfo)
				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				location.replace('../../intlAir/airTicketList.html');
			}
		}
	})
	$("#intlDepartureCity").kuCity();
	$("#intlArrivalCity").kuCity();

	$("#intlDepartureDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		minDate: TAminDate, // 当前日期之后的 0 天，就是当天
		maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		onSelect: function () {
			// $(".intlDepartureWeek").text(getWeek($("#intlDepartureDate").val()));
			var departureValue = new Date($("#intlDepartureDate").val().replace(/-/g, "/"));
			var selectedValue = $('input[name="searchState"]:checked').attr("state")
			if (selectedValue == '2') {
				$("#intlReturnDate").datepicker('destroy');
				$("#intlReturnDate").datepicker({
					dateFormat: 'yy-mm-dd',
					changeMonth: true,
					changeYear: true,
					minDate: departureValue, // 当前日期之后的 0 天，就是当天
					maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
					hideIfNoPrevNext: true,
					showOtherMonths: true,
					selectOtherMonths: true,
					onSelect: function () {
					}
				});
				$("#intlReturnDate").val(getNextDay($("#intlDepartureDate").val()));
			}
		}
	});

	function getNextDay(d) {
		d = new Date(d);
		d = +d + 1000 * 60 * 60 * 24;
		d = new Date(d);
		var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
		var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
		//格式化
		return d.getFullYear() + "-" + month + "-" + day;
	}
	GetCompanyImageInfos()

	/*2020-10-9 积分*/
	var PointTypeId2;
	var PointTypeId3;
	var pointsType = '';
	if (ProfileInfo.PointInfo && ProfileInfo.PointInfo.PointRuleList) {
		ProfileInfo.PointInfo.PointRuleList.map(function (item) {
			if (item.PointTypeId == 2 && (item.RegionType == "ALL" || item.RegionType == "I") && (item.PointServiceType == 0 || item.PointServiceType == 1)) {
				pointsType += get_lan("pointBody").lowest + ' ';
				PointTypeId2 = '2';
			}
			if (item.PointTypeId == 3 && (item.RegionType == "ALL" || item.RegionType == "I") && (item.PointServiceType == 0 || item.PointServiceType == 1)) {
				if (PointTypeId2 == '2') {
					pointsType += get_lan("pointBody").or + ' ' + get_lan("pointBody").recommend + ' ';
				} else {
					pointsType += get_lan("pointBody").recommend + ' ';
				}
				PointTypeId3 = '3';
			}
		})
	}
	if (PointTypeId2 == '2' || PointTypeId3 == '3') {
		$(".pointsHeader").removeClass("hide");
	}
	if (obtLanguage == "CN") {
		$(".pointsReminder").text("预订 " + pointsType + "的机票即可获得积分奖励");
	} else if (obtLanguage == "EN") {
		$(".pointsReminder").text("Book the " + pointsType + "ticket  to get bonus points");
	}
	if (isReturn == 1) {
		$(".pointsHeader").addClass("hide");
	}
	/*end*/
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
				$('.picBody').remove()
				return false
			}
			var res = JSON.parse(data);
			console.log(res);
			if (res.code == 200) {
				res.CompanyImageList.map(function (item) {
					if (item.type == 5) {
						$('.picGroupImg').attr("src", item.path)
						if (item.hyperLink == "") {
							$(".picHref").remove()
						} else {
							$(".picHref").attr("href", item.hyperLink)
						}
					}
				})

			} else {
				$('.picGroupImg').attr("src", "../staticFile/query.png")
				$(".picHref").remove()
				if (ProfileInfo.onlineStyle == "APPLE") {
					$('.picBody').remove()
				}
				// 应该不需要提示
			}
		},
		error: function () {
			// alert('fail');
		}
	});
};
// 近期搜索
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

function getWeek(dateStr) {
	var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
	return get_lan('searchBody').weekDay.split(',')[myDate.getDay()];
}

function GetDateStr(AddDayCount, date) {
	var dd = new Date(date.replace(/-/g, '/'));
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
	var y = dd.getFullYear();
	var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
	return y + "-" + m + "-" + d;
}

//机票列表
function ticketList() {
	// $('body').mLoading("show");
	tools.searchLoadingShow()
	if (searchIntlInfo.type == "oneWay") {
		var queryKey = searchIntlInfo.queryKey;
		var preDayDate = GetDateStr(-1, searchIntlInfo.date);
		var nextDayDate = GetDateStr(1, searchIntlInfo.date);
		$(".chooseDate").html('\
            <span class="preDay">(' + preDayDate.substring(5, preDayDate.length) + ')' + get_lan('ticketList').preDay + '</span>\
            <span class="nextDay">(' + nextDayDate.substring(5, nextDayDate.length) + ')' + get_lan('ticketList').nextDay + '</span>\
        ')
		//前一天 后一天
		if (new Date() >= new Date(GetDateStr(0, searchIntlInfo.date).replace(/\-/g, "\/"))) {
			$(".preDay").hide();
		}
		$(".preDay").unbind("click").click(function () {
			if (new Date() < new Date(GetDateStr(0, searchIntlInfo.date).replace(/\-/g, "\/"))) {
				var queryKeyList = queryKey.split(',');
				// queryKeyList[2] = preDayDate;
				if ($('#intlDepartureSelect').val() == undefined || $('#intlDepartureSelect').val() == "undefined") {
					queryKeyList[2] = preDayDate;
				} else {
					queryKeyList[2] = preDayDate + " " + $('#intlDepartureSelect').val() + ":00";
				}
				searchIntlInfo.date = preDayDate;
				searchIntlInfo.queryKey = queryKeyList.join(",");
				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				location.reload();
			} else {
				$(".preDay").hide();
			}
		})
		$(".nextDay").unbind("click").click(function () {
			var queryKeyList = queryKey.split(',');
			// queryKeyList[2] = nextDayDate;
			if ($('#intlDepartureSelect').val() == undefined || $('#intlDepartureSelect').val() == "undefined") {
				queryKeyList[2] = nextDayDate;
			} else {
				queryKeyList[2] = nextDayDate + " " + $('#intlDepartureSelect').val() + ":00";
			}
			searchIntlInfo.date = nextDayDate;
			searchIntlInfo.queryKey = queryKeyList.join(",");
			$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
			location.reload();
		})
		var goTimeLimite = $.session.get('searchIntelDay') ? $.session.get('searchIntelDay') : ""
		var backTimeLimite = $.session.get('searchIntelReturnDay') ? $.session.get('searchIntelReturnDay') : ""

		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/InterSegmentSearchNew ",
				jsonStr: '{"request":{"goTimeLimite":"' + goTimeLimite + '","backTimeLimite":"' + backTimeLimite +
					'","queryKey":"' + queryKey + '","airlineKey":"ALL","id":' + netUserId + ',"Language":"' + obtLanguage +
					'","cabinType":"' + searchIntlInfo.showCabins + '","isDirect":"' + searchIntlInfo.isDirect +
					'","connectionLocationStr":"' + searchIntlInfo.transitCityCode + '"}}'
			},
			success: function (data) {
				// $('body').mLoading("hide");
				tools.searchLoadingHide()
				var res = JSON.parse(data);
				console.log(res);

				setTime = $('#intlDepartureSelect').val()
				day = $.session.get('searchIntelDay');

				if (res.code == 200) {
					ticketListInfo(res.segmentList); //渲染列表
					newFilter(res.segmentList);
					chooseAirLine(res.segmentList); //选择航空公司
					sortTicketInfo(res.segmentList); //排序
				} else {
					alert(res.errMsg)
				}
			},
			error: function () {
				// alert('fail');
			}
		});
		$("input[name='searchState'][value=1]").attr('checked', true);
		$("input[name='searchState'][value=1]").click();

	} else if (searchIntlInfo.type == "roundTrip") {
		if (!isReturn || isReturn != 1) {
			var preDayDate = GetDateStr(-1, searchIntlInfo.date);
			var nextDayDate = GetDateStr(1, searchIntlInfo.date);
			$(".chooseDate").html('\
                <span class="preDay">(' + preDayDate.substring(5,
				preDayDate.length) + ')' + get_lan('ticketList').preDay + '</span>\
                <span class="nextDay">(' +
				nextDayDate.substring(5, nextDayDate.length) + ')' + get_lan('ticketList').nextDay + '</span>\
                ')
			//前一天 后一天
			if (new Date() >= new Date(GetDateStr(0, searchIntlInfo.date).replace(/\-/g, "\/"))) {
				$(".preDay").hide();
			}
			if (searchIntlInfo.date == searchIntlInfo.returndate) {
				$(".nextDay").hide();
			}
			$(".preDay").unbind("click").click(function () {
				if (new Date() < new Date(GetDateStr(0, searchIntlInfo.date).replace(/\-/g, "\/"))) {
					var queryKeyReturnList = searchIntlInfo.queryKeyReturn.split(',');

					if ($('#intlDepartureSelect').val() == undefined || $('#intlDepartureSelect').val() == "undefined") {
						queryKeyReturnList[2] = preDayDate;
					} else {
						queryKeyReturnList[2] = preDayDate + " " + $('#intlDepartureSelect').val() + ":00";
					}

					searchIntlInfo.date = preDayDate;
					searchIntlInfo.queryKeyReturn = queryKeyReturnList.join(",");
					$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
					location.reload();
				} else {
					$(".preDay").hide();
				}
			})
			$(".nextDay").unbind("click").click(function () {
				var queryKeyReturnList = searchIntlInfo.queryKeyReturn.split(',');

				if ($('#intlDepartureSelect').val() == undefined || $('#intlDepartureSelect').val() == "undefined") {
					queryKeyReturnList[2] = nextDayDate;
				} else {
					queryKeyReturnList[2] = nextDayDate + " " + $('#intlDepartureSelect').val() + ":00";
				}
				searchIntlInfo.date = nextDayDate;
				searchIntlInfo.queryKeyReturn = queryKeyReturnList.join(",");
				$.session.set('searchIntlInfo', JSON.stringify(searchIntlInfo));
				location.reload();
			})
			$(".roundTittle").text(get_lan('ticketList').roundTittleGo);
			var queryKey = searchIntlInfo.queryKeyReturn;
			var goTimeLimite = $.session.get('searchIntelDay') ? $.session.get('searchIntelDay') : ""
			var backTimeLimite = $.session.get('searchIntelReturnDay') ? $.session.get('searchIntelReturnDay') : ""
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/InterSegmentSearchNew ",
					jsonStr: '{"request":{"goTimeLimite":"' + goTimeLimite + '","backTimeLimite":"' + backTimeLimite +
						'","queryKey":"' + queryKey + '","airlineKey":"ALL","id":' + netUserId + ',"Language":"' + obtLanguage +
						'","cabinType":"' + searchIntlInfo.showCabins + '","isDirect":"' + searchIntlInfo.isDirect +
						'","connectionLocationStr":"' + searchIntlInfo.transitCityCode + '"}}'
				},
				success: function (data) {
					// $('body').mLoading("hide");
					tools.searchLoadingHide()
					var res = JSON.parse(data);
					console.log(res);
					var airTicketList = [];
					setTime = $('#intlDepartureSelect').val()
					day = $.session.get('searchIntelDay');
					setReturnTime = $('#intlReturnSelect').val()
					returnday = $.session.get('searchIntelReturnDay');


					if (res.code == '200') {
						res.segmentList.map(function (item) {
							if (item.RouteType == 1) {
								airTicketList.push(item);
							}
						})
						ticketListInfo(airTicketList); //渲染页面
						newFilter(airTicketList);
						chooseAirLine(airTicketList); //选择航空公司
						sortTicketInfo(airTicketList); //排序
					} else {
						alert(res.errMsg)
					}



				},
				error: function () {
					// alert('fail');
				}
			});
		} else if (isReturn == 1) {
			$(".chooseDate").hide();
			$(".roundTittle").text(get_lan('ticketList').roundTittleReturn);
			$(".sort__title").text(get_lan('refineSearch').sortTitleReturn);
			var queryKey = searchIntlInfo.queryKeyReturn;
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetInterAirFreeInCache",
					jsonStr: '{"queryKey":"' + queryKey + '","id":' + netUserId + ',"Language":"' + obtLanguage +
						'","airlineKey":"ALL","cabinType":"' + searchIntlInfo.showCabins + '","isDirect":"' + searchIntlInfo.isDirect +
						'"}'
				},
				success: function (data) {
					// $('body').mLoading("hide");
					tools.searchLoadingHide()
					var res = JSON.parse(data);
					console.log(res);
					var airTicketListReturn = [];

					setTime = $('#intlDepartureSelect').val()
					day = $.session.get('searchIntelDay');
					setReturnTime = $('#intlReturnSelect').val()
					returnday = $.session.get('searchIntelReturnDay');

					res[0].map(function (item) {
						if (item.RouteType != 1) {
							airTicketListReturn.push(item);
						}
					})
					var returnAirLineCode = JSON.parse($.session.get('returnTicket')).AirLineCode;
					var returnSegIdList = JSON.parse(JSON.parse($.session.get('returnTicket')).returnSegIdList)
					var returnAirLine = [];
					airTicketListReturn.map(function (item) {
						returnSegIdList.map(function (sItem) {
							if (item.SegID == sItem) {
								returnAirLine.push(item)
							}
						})
					})
					console.log(returnAirLine)
					ticketListInfo(returnAirLine);
					newFilter(returnAirLine);
					sortTicketInfo(returnAirLine); //排序
				},
				error: function () {
					// alert('fail');
				}
			});
		}
		$("input[name='searchState'][value=2]").attr('checked', true);
		$(".intlReturnDateSearch").css("display", "block");
		var departureValue = new Date($("#intlDepartureDate").val().replace(/-/g, "/"));
		$("#intlReturnDate").val(searchIntlInfo.returndate);
		$("#intlReturnDate").datepicker('destroy');
		$("#intlReturnDate").datepicker({
			dateFormat: 'yy-mm-dd',
			changeMonth: true,
			changeYear: true,
			minDate: departureValue, // 当前日期之后的 0 天，就是当天
			maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
			hideIfNoPrevNext: true,
			showOtherMonths: true,
			selectOtherMonths: true,
			onSelect: function () {
				// $(".intlReturnDateWeek").text(getWeek($("#intlReturnDate").val()));
			}
		});
	}
}
//选择航空公司
function chooseAirLine(res) {
	var alineLineList = [],
		i,
		j,
		len = res.length;
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (res[i].AirLineSort === res[j].AirLineSort) {
				j = ++i;
			}
		}
		alineLineList.push(res[i]);
	}
	var alineLineSort = function (arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (arr[i].AirLineCode.charCodeAt() > arr[j].AirLineCode.charCodeAt()) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var AirportList = [],
		AirportArriveList = [];
	i,
		j,
		len = res.length;
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (res[i].Departure === res[j].Departure) {
				j = ++i;
			}
		}
		AirportList.push(res[i]);
	}
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (res[i].Destination === res[j].Destination) {
				j = ++i;
			}
		}
		AirportArriveList.push(res[i]);
	}
	// console.log(AirportList)
	alineLineSort(alineLineList).map(function (item) {
		$(".airLineChoose").append('\
        <option airCode="' + item.AirLineCode + '">' + item.AirLineCode + '-' + item.AirLineSort + '</option>\
        ')
	})
	AirportList.map(function (item) {
		$(".departAirPortChoose").append('\
        <option airport="' + item.Departure + '">' + item.Departure + '</option>\
        ')
	})
	AirportArriveList.map(function (item) {
		$(".arrivalAirPortChoose").append('\
        <option airport="' + item.Destination + '">' + item.Destination + '</option>\
        ')
	})
	var airlineAirList = [],
		departAirPortList = [],
		arrivalAirPortList = [],
		recommedList = [];
	res.map(function (item) {
		airlineAirList.push(item);
		departAirPortList.push(item);
		arrivalAirPortList.push(item);
	})

	$(".airLineChoose").change(function () {
		airlineAirList = [];
		if ($('.airLineChoose option:selected').attr("airCode") == 'All') {
			res.map(function (item) {
				airlineAirList.push(item);
			})
		} else {
			res.map(function (item) {
				item.InterSegments.map(function (sItem) {
					if (sItem.MarketingCode == $('.airLineChoose option:selected').attr("airCode")) {
						airlineAirList.push(item);
					}
				})
			})
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList);
		$(".priceSort,.departureTimeSort,.durationSort").css("color", '#000');
		$(".priceSortIcon,.departureTimeSortIcon,.durationSortIcon").css("background-position", "0px 0px");
	})
	$(".departAirPortChoose").change(function () {
		departAirPortList = [];
		if ($('.departAirPortChoose option:selected').attr("airport") == 'all') {
			res.map(function (item) {
				departAirPortList.push(item);
			})
		} else {
			res.map(function (item) {
				if (item.Departure == $('.departAirPortChoose option:selected').attr('airport')) {
					departAirPortList.push(item)
				}
			})
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList);
		$(".priceSort,.departureTimeSort,.durationSort").css("color", '#000');
		$(".priceSortIcon,.departureTimeSortIcon,.durationSortIcon").css("background-position", "0px 0px");
	})
	$(".arrivalAirPortChoose").change(function () {
		arrivalAirPortList = [];
		if ($('.arrivalAirPortChoose option:selected').attr("airport") == 'all') {
			res.map(function (item) {
				arrivalAirPortList.push(item);
			})
		} else {
			res.map(function (item) {
				if (item.Destination == $('.arrivalAirPortChoose option:selected').attr('airport')) {
					arrivalAirPortList.push(item)
				}
			})
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList);
		$(".priceSort,.departureTimeSort,.durationSort").css("color", '#000');
		$(".priceSortIcon,.departureTimeSortIcon,.durationSortIcon").css("background-position", "0px 0px");
	})

	//推荐航班
	$('#recommed').change(function () {
		console.log($(this).is(":checked"))
		if (ProfileInfo.ShowDAgreementOrLevel3) {
			recommedList = [];
			if (!$(this).is(":checked")) {
				res.map(function (item) {
					recommedList.push(item);
				})
			} else {
				res.map(function (item) {
					if (item.isAgreementOrLevel3) {
						recommedList.push(item)
					}
				})
			}
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList, recommedList);
	})
	if (ProfileInfo.ShowDAgreementOrLevel3 && (searchIntlInfo.type == 'oneWay' || (searchIntlInfo.type == 'roundTrip' && isReturn != 1))) {
		// $('#recommed').prop('checked',"true")
		$('#recommed').click()
		$('.recommed').removeClass('hide')//注意类名和ID
	} else {
		$('.recommed').remove()
	}
}

function siftAirList(airlineList, departAirPortList, arrivalAirPortList, recommedList) {
	var chooseAirLine = [];
	var hasRecommed = []
	var result = [];
	airlineList.map(function (item) {
		departAirPortList.map(function (dItem) {
			if (item.SegID == dItem.SegID) {
				chooseAirLine.push(item);
			}
		})
	})
	// console.log(chooseAirLine)
	chooseAirLine.map(function (item) {
		arrivalAirPortList.map(function (aItem) {
			if (item.SegID == aItem.SegID) {
				// result.push(item);
				hasRecommed.push(item);
			}
		})
	})
	hasRecommed.map(function (item) {
		if (recommedList && recommedList.length > 0 && $('#recommed').is(':checked')) {
			recommedList.map(function (aItem) {
				if (item.SegID == aItem.SegID) {
					result.push(item);
				}
			})
		} else {
			if (ProfileInfo.ShowDAgreementOrLevel3 && $('#recommed').is(':checked')) {
				result = []
			} else {
				result = hasRecommed
			}
		}
	})
	// console.log(result);
	ticketListInfo(result, "recommed");
	sortTicketInfo(result); //排序
}
//机票排序
function sortTicketInfo(res) {
	var date = new Date();
	var timeSortAsc = [];
	var timeSortDes = [];
	var useTimeSortAsc = [];
	var useTimeSortDes = [];
	var priceSortAsc = [];
	var priceSortDes = [];
	res.map(function (item) {
		timeSortAsc.push(item);
		timeSortDes.push(item);
		useTimeSortAsc.push(item);
		useTimeSortDes.push(item);
		priceSortAsc.push(item);
		priceSortDes.push(item);
	})
	var bubbleSortAsc = function (arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (date.setHours(arr[i].DateStart.split(":")[0], arr[i].DateStart.split(":")[1]) > date.setHours(arr[j].DateStart
					.split(":")[0], arr[j].DateStart.split(":")[1])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var bubbleSortDes = function (arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (date.setHours(arr[i].DateStart.split(":")[0], arr[i].DateStart.split(":")[1]) < date.setHours(arr[j].DateStart
					.split(":")[0], arr[j].DateStart.split(":")[1])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var usetimebubbleSortAsc = function (arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseFloat(arr[i].Duration.split('h')[0]) + 0.01 * parseFloat(arr[i].Duration.split('h')[1].split('m')[0]) >
					parseFloat(arr[j].Duration.split('h')[0]) + 0.01 * parseFloat(arr[j].Duration.split('h')[1].split('m')[0])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var usetimebubbleSortDes = function (arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseFloat(arr[i].Duration.split('h')[0]) + 0.01 * parseFloat(arr[i].Duration.split('h')[1].split('m')[0]) <
					parseFloat(arr[j].Duration.split('h')[0]) + 0.01 * parseFloat(arr[j].Duration.split('h')[1].split('m')[0])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var pricebubbleSortAsc = function (arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseInt(arr[i].Fare) + parseInt(arr[i].TotalTax) > parseInt(arr[j].Fare) + parseInt(arr[j].TotalTax)) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var pricebubbleSortDes = function (arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseInt(arr[i].Fare) + parseInt(arr[i].TotalTax) < parseInt(arr[j].Fare) + parseInt(arr[j].TotalTax)) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}

	$(".departureTimeSort").unbind("click").click(function () {
		console.log($(this).attr("sortType"))
		$(this).siblings().removeClass('active');
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
		}
		if ($(this).attr("sortType") == "asc") {
			ticketListInfo(bubbleSortAsc(timeSortAsc));
		} else if ($(this).attr("sortType") == "desc") {
			ticketListInfo(bubbleSortDes(timeSortDes));
		}
		$('.sort_box_operations-selected').text($(this).text())
	})
	$(".durationSort").unbind("click").click(function () {
		$(this).siblings().removeClass('active');
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
		}
		if ($(this).attr("sortType") == "asc") {
			ticketListInfo(usetimebubbleSortAsc(useTimeSortAsc));
		} else if ($(this).attr("sortType") == "desc") {
			ticketListInfo(usetimebubbleSortDes(useTimeSortDes));
		}
		$('.sort_box_operations-selected').text($(this).text())
	})
	$(".priceSort").unbind("click").click(function () {
		$(this).siblings().removeClass('active');
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
		}
		if ($(this).attr("sortType") == "asc") {
			ticketListInfo(pricebubbleSortAsc(priceSortAsc));
		} else if ($(this).attr("sortType") == "desc") {
			ticketListInfo(pricebubbleSortDes(priceSortDes));
		}
		$('.sort_box_operations-selected').text($(this).text())
	})
}

function ticketListInfo(res, recommed) {
	// console.log(res);
	if (res.length == 0) {
		if (recommed == "recommed" && ProfileInfo.ShowDAgreementOrLevel3) {
			//有推荐航班权限 且推荐航班被选中
		} else {
			alert(get_lan("ticketList").listRemind);
		}
	}
	$(".ticketList").html('');

	/*2020-10-9积分*/
	var PointTypeId2;
	var PointTypeId3;
	var PointValue2;
	var PointValue3;
	if (ProfileInfo.PointInfo && ProfileInfo.PointInfo.PointRuleList) {
		ProfileInfo.PointInfo.PointRuleList.map(function (item) {
			if (item.PointTypeId == 2 && (item.RegionType == "ALL" || item.RegionType == "I") && (item.PointServiceType == 0 || item.PointServiceType == 1)) {
				PointTypeId2 = '2';
				PointValue2 = item.PointValue;
			}
			if (item.PointTypeId == 3 && (item.RegionType == "ALL" || item.RegionType == "I") && (item.PointServiceType == 0 || item.PointServiceType == 1)) {
				PointTypeId3 = '3';
				PointValue3 = item.PointValue;
			}
		})
	}
	/*end*/
	res.map(function (item, index) {
		var ticketPriceColor = item.ShowLowestFare == 1 ? "ticketPriceColor" : "";
		var showStop = item.InterSegments.length > 1 ? "" : "hide";
		var stopAirport = item.Transit != null ? item.Transit : '';
		var showTicketViolation = item.SegPolicyType == 4 || item.SegPolicyType == 3 ? "" : "hide";
		var ticketAirLineColor = item.isCodeShare ? "ticketAirLineColor" : "";
		var protocolShow = item.FareType == 2 ? "" : "hide";
		if (ProfileInfo.onlineStyle == "APPLE") {
			protocolShow = "hide";
		}
		if (item.AirLineCode == "3U") {
			var airlineIcon = "a3u";
		} else if (item.AirLineCode == "3W") {
			var airlineIcon = "a3w";
		} else if (item.AirLineCode == "8L") {
			var airlineIcon = "a8l";
		} else if (item.AirLineCode == "9C") {
			var airlineIcon = "a9C";
		} else {
			var airlineIcon = item.AirLineCode;
		}
		var showTicketDays = item.Days > 0 ? "" : "hide";
		var showBaggageInfo =
			(item.BaggageInfo == null ||
				item.BaggageInfo.baggagePiecesField == "" &&
				item.BaggageInfo.baggageWeightField == "" &&
				item.BaggageInfo.baggageWeightUnitField == "")
				? "hide"
				: "";
		if (obtLanguage == "CN") {
			var BaggageInfo = item.BaggageInfo.baggagePiecesField == "" ? item.BaggageInfo.baggageWeightField + ' ' + item.BaggageInfo
				.baggageWeightUnitField : item.BaggageInfo.baggagePiecesField + " 件";
		} else if (obtLanguage == "EN") {
			var BaggageInfo = item.BaggageInfo.baggagePiecesField == "" ? item.BaggageInfo.baggageWeightField + ' ' + item.BaggageInfo
				.baggageWeightUnitField : item.BaggageInfo.baggagePiecesField + " Piece(s)";
		}
		var DepTerm = item.InterSegments[0].DepTerm == null || item.InterSegments[0].DepTerm == "" ? "" : '(' + item.InterSegments[0].DepTerm + ')';
		var ArrTerm =
			item.InterSegments[item.InterSegments.length - 1].ArrTerm == null
				|| item.InterSegments[item.InterSegments.length - 1].ArrTerm == ''
				? ""
				: '(' + item.InterSegments[item.InterSegments.length - 1].ArrTerm + ')';
		var intlFlightNo = '';
		item.InterSegments.map(function (item) {
			intlFlightNo += item.FlightNo;
			intlFlightNo += ', ';
		})
		var ShowCabinDetail = res[0].ShowCabinDetail ? "hide" : "";
		var showStopOver = "",
			hideStopOver = "hide",
			StayTime = "",
			stopNum = '1'
		if (item.InterSegments.length > 1) {
			showStopOver = ""
			hideStopOver = "hide"
			StayTime = item.InterSegments[1].StayTime
		} else {
			showStopOver = "hide"
			hideStopOver = ""
			StayTime = ""
		}
		var dateStartDay = item.Date.split(' ')[0].split('-').join('');
		var dateStartTime = item.DateStart.split(':').join('');
		var dateStart = dateStartDay + dateStartTime;
		stopNum = item.InterSegments.length - 1
		var interSegments = ''
		if (item.InterSegments.length > 0) {
			interSegments = '<h1 class="flightDetailPopTittle">' + get_lan("ticketList").flightDetail + '</h1>'
			item.InterSegments.map(function (interSegment) {
				airlineIcon = interSegment.MarketingCode == "3U" ? "a3u" : interSegment.MarketingCode;
				airlineIcon = interSegment.MarketingCode == "3W" ? "a3w" : interSegment.MarketingCode;
				airlineIcon = interSegment.MarketingCode == "8L" ? "a8l" : interSegment.MarketingCode;
				airlineIcon = interSegment.MarketingCode == "9C" ? "a9c" : interSegment.MarketingCode;
				var showStayTime = interSegment.StayTime != "" ? "" : "hide";
				var DepTerm = interSegment.DepTerm == null || interSegment.DepTerm == "" ? "" : '(' + interSegment.DepTerm + ')';
				var ArrTerm = interSegment.ArrTerm == null || interSegment.ArrTerm == "" ? "" : '(' + interSegment.ArrTerm + ')';
				interSegments += '\
					<div class="flightDetailLi">\
						<div class="flightDetailStayTime ' + showStayTime + '">\
							<span>' + get_lan("flightDetailPop").transfer + ' ' + interSegment.AirportDeparte + ' ' + interSegment.StayTime + '</span>\
						</div>\
						<div class="flightDetailLiHeader">\
							<div class="flightAirLineIcon ' + airlineIcon + '"></div>\
							<span>' + interSegment.Marketing + ' ' + interSegment.FlightNo + ' &nbsp;&nbsp;&nbsp;' + get_lan('ticketList').PlaneType + ':' + interSegment.PlaneType + '</span>\
						</div>\
						<div class="flightDetailLiBody">\
							<div class="flightDetailLiBody_date-box">\
								<div class="flightStartTime">' + interSegment.TimeStart + '</div>\
								<div class="flightDetailFlytime">' + interSegment.FlyTime + '</div>\
								<div class="flightArriveTime">' + interSegment.TimeArrive + '</div>\
							</div>\
							<div class="flightLine"></div>\
							<div class="flightDetailLiBody_airports">\
								<div class="flightStartAirport" title="' + interSegment.AirportDeparte + DepTerm + '">' + interSegment.AirportDeparte + DepTerm + '</div>\
								<div class="flightArriveAirport" title="' + interSegment.AirportArrive + ArrTerm + '">' + interSegment.AirportArrive + ArrTerm + '</div>\
							</div>\
						</div>\
					</div>'
			})
		}
		var cabinItems = ''
		var activeCabinIndex = 0, matchedSegments = item.InterCabins.length, hasActiveCabin = false
		item.InterCabins.map(function (cabin, cIndex) {
			if (searchIntlInfo.type == "roundTrip" && isReturn == 1 && pareType != cabin.RecommendedPareType) {
				matchedSegments--
				return
			}
			if ((searchIntlInfo.type == "roundTrip" && !isReturn) || searchIntlInfo.type == "oneWay") {
				activeCabinIndex = 0
			} else if (!hasActiveCabin) {
				activeCabinIndex = cIndex
				hasActiveCabin = true

			}
			// fare是不含税的
			var includeTax = cabin.CabinCurrency + (parseInt(cabin.CabinFare) + parseInt(cabin.CabinTax))
			var active = activeCabinIndex === cIndex ? 'active' : ''
			cabinItems += '\
				<div class="ticket-cabin_item '+ active + '" cabinID="' + cabin.CabinID + '" price="' + cabin.CabinFare + '" tax="' + cabin.CabinTax + '" includeTax="' + includeTax + '" pareType="' + cabin.RecommendedPareType + '">\
					<h3 class="ticket-cabin_price">'+ cabin.CabinCurrency + cabin.CabinFare + '</h3>\
					<span class="ticket-cabin_pare_type">'+ cabin.RecommendedPareTypeName + '</span>\
				</div>'
		})
		if (matchedSegments === 0) {
			return
		}
		$(".ticketList").append('\
            <li class="ticketLi" key="'+ index + '">\
				<section class="ticket_values">\
					<div class="ticket-cabin_list">'+ cabinItems + '</div>\
					<div class="ticket-main">\
						<div class="ticket_header">\
							<div class="ticketAirLineIcon ' + airlineIcon + '"></div>\
							<div title="' + item.AirLine + '" class="ticketAirLine">' + item.AirLine + '</div>\
							<div class="companyPay companyPay-corporate '+ protocolShow + '">' + get_lan('ticketList').protocol + '</div>\
							<span class="list_points hide"></span>\
						</div>\
						<div class="ticket_body">\
							<div class="ticket_main-info">\
								<div class="ticket_info-box">\
									<div class="ticket_info-box-left">\
										<h1 class="ticketFlightNo">' + intlFlightNo.substring(0, intlFlightNo.length - 2) + '</h1>\
										<div class="ticketPlaneType">\
											<span class="planeType">' + get_lan('ticketList').PlaneType + ' ' + item.InterSegments[0].PlaneType + '</span>\
											<span class="cabinName">'+ item.CabinName + '</span>\
										</div>\
									</div>\
									<div class="ticket_info-box-middle">\
										<div class="ticket_info_start">\
											<div class="ticketTimeStart">' + item.DateStart + '</div>\
											<div class="ticketAirportDeparte">' + item.Departure + DepTerm + '</div>\
										</div>\
										<div class="ticketTimeLine">\
											<div class="stopIcon ' + showStop + '">' + get_lan('ticketList').stopIcon + '</div>\
											<div class="ticketLine"></div>\
											<div class="stopBody ' + showStop + '" title="' + stopAirport + '">' + stopAirport + '</div>\
										</div>\
										<div class="ticket_info_end">\
											<div class="ticketTimeArrive">' + item.DateArrive + '\
												<div class="ticketDays ' + showTicketDays + '">+' + item.Days + '</div>\
											</div>\
											<div class="ticketAirportArrive">' + item.Destination + ArrTerm + '</div>\
										</div>\
									</div>\
									<div class="ticket_info-box-right">\
										<div class="ticketDuration">' + item.Duration + '</div>\
										<div class="stopOver ">\
											<span class="underline ' + showStopOver + '">' + stopNum + get_lan('ticketList').stopOver + '</span> \
											<span class="' + hideStopOver + '">' + get_lan('ticketList').noStop + '</span>\
											<div class="flight_detail_pop hidden negative">'+ interSegments + '</div>\
										</div>\
										<div class="stopOverTime ' + showStopOver + '">' + StayTime + '</div>\
									</div>\
								</div>\
								<div class="ticket_button-box">\
									<div class="violationIcon ' + showTicketViolation + '">' + get_lan('ticketSpread').violation + '</div>\
									<div class="bookBtn" dateStart="' + dateStart + '" CabinID="' + item.InterCabins[activeCabinIndex].CabinID + '" \
										spread="off" AirLineCode="' + item.AirLineCode + '" SegID="' + item.SegID + '" ticketTax="' + item.InterCabins[activeCabinIndex].CabinTax + '" \
										ticketPrice="' + item.InterCabins[activeCabinIndex].CabinFare + '" LimitFare="' + item.LimitFare + '"' + '" pareType="' + item.InterCabins[activeCabinIndex].RecommendedPareType + '">\
										'+ get_lan('ticketList').book + '\
									</div>\
								</div>\
							</div>\
							<div class="ticket_additional-info">\
								<div class="ticket_additional-info-list">\
									<div class="ticket_additional-info-discount hide">46% '+ get_lan('ticketList').discountRate + '</div>\
									<div class="ticket_additional-info-baggage '+ showBaggageInfo + '">\
										<span class="ticket_baggage-btn">'+ get_lan('ticketList').baggagePolicy + '</span>\
										<div class="ticket_baggage-pop hidden negative">'+ get_lan('ticketList').BaggageInfo + BaggageInfo + '</div>\
									</div>\
									<div class="ticketRestriction ' + ShowCabinDetail + '" ruleSegID="' + item.SegID + '" CabinID="' + item.InterCabins[activeCabinIndex].CabinID + '">' + get_lan('ticketSpread').restriction + '</div>\
									<div class="ticketFlightDetail ' + showStop + '" index="' + index + '">\
										<span>' + get_lan("ticketList").flightDetail + '</span>\
										<div class="flight_detail_pop hidden negative">'+ interSegments + '</div>\
									</div>\
								</div>\
								<div class="ticket_price-part">\
									<p class="ticket_price '+ ticketPriceColor + '">' + item.Curreny + (parseInt(item.InterCabins[activeCabinIndex].CabinFare) + parseInt(item.InterCabins[activeCabinIndex].CabinTax)) + '</p>\
									<p class="ticket_tax">'+ get_lan('ticketList').Tax + ' ' + item.InterCabins[activeCabinIndex].CabinTax + '</p>\
									<p class="ticket_corporate-rate '+ protocolShow + '">' + get_lan('ticketList').corporateRate + '</p>\
								</div>\
							</div>\
						</div>\
					</div>\
				</section>\
            </li>\
        ')
		$('.ticketLi[key="' + index + '"] .ticket-cabin_item').click(function () {
			$(this).addClass('active')
			$(this).siblings().removeClass('active')
			$('.ticketLi[key="' + index + '"] .bookBtn').attr('CabinID', $(this).attr('cabinID'))
			$('.ticketLi[key="' + index + '"] .bookBtn').attr('pareType', $(this).attr('pareType'))
			$('.ticketLi[key="' + index + '"] .bookBtn').attr('ticketprice', $(this).attr('price'))
			$('.ticketLi[key="' + index + '"] .bookBtn').attr('ticketTax', $(this).attr('tax'))
			$('.ticketLi[key="' + index + '"] .ticketRestriction').attr('CabinID', $(this).attr('cabinID'))
			$('.ticketLi[key="' + index + '"] .ticket_price').text($(this).attr('includeTax'))
			$('.ticketLi[key="' + index + '"] .ticket_tax').text(get_lan('ticketList').Tax + ' ' + $(this).attr('tax'))
		})
		if (item.ShowLowestFare == 1) {
			if (PointTypeId2 == "2") {
				if (!ProfileInfo.PointHoney) {
					$(".list_points").eq(index).text('+' + PointValue2 + get_lan("pointBody").points);
					$(".list_points").eq(index).removeClass("hide");
				}
			}
		}
		if (item.FareType == 2) {
			if (PointTypeId3 == "3") {
				if (!ProfileInfo.PointHoney) {
					$(".list_points").eq(index).text('+' + PointValue3 + get_lan("pointBody").points);
					$(".list_points").eq(index).removeClass("hide");
				}
			}
			if (item.ShowLowestFare == 1) {
				if (PointTypeId2 == "2" && PointTypeId3 == "3") {
					if (!ProfileInfo.PointHoney) {
						$(".list_points").eq(index).text('+' + (parseInt(PointValue2) + parseInt(PointValue3)) + get_lan("pointBody").points);
					}
				}
			}
		}
		if (isReturn == 1) {
			$(".list_points").addClass("hide");
		}

		if (searchIntlInfo.type == "roundTrip" && !isReturn) {
			$(".ticketRestriction").addClass("hide");
		}
		$('.ticket_baggage-btn').unbind('mouseenter').bind('mouseenter', (function () {
			$(this).siblings().openPopWindow()
		}))
		$('.ticket_baggage-btn').unbind('mouseleave').bind('mouseleave', (function () {
			$(this).siblings().closePopWindow(300)
		}))
		$(".ticketRestriction").unbind("click").click(function () {
			$('body').mLoading("show");
			if (searchIntlInfo.type == "roundTrip" && isReturn == 1) {
				ruleSegID = JSON.parse($.session.get('returnTicket')).SegID + '-' + $(this).attr("ruleSegID");
				ruleCabinID = JSON.parse($.session.get('returnTicket')).CabinID + '-' + $(this).attr("CabinID");

			} else if (searchIntlInfo.type == "oneWay") {
				ruleSegID = $(this).attr("ruleSegID");
				ruleCabinID = $(this).attr("CabinID");
			}
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/InterRuleSearch",
					jsonStr: '{"OptionId":"' + ruleSegID + '","CabinId":"' + ruleCabinID + '","id":' +
						netUserId + ',"Language":"' + obtLanguage + '"}'
				},
				success: function (data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					$(".rulePop").html('\
                        <div class="rulePopHeader">' + get_lan("rulePopHeader") +
						'<div class="closeRule">x</div></div>\
                        ');
					if (res.ErrMsg != "") {
						alert(res.ErrMsg);
					} else {
						res.Rules.map(function (item) {
							$(".rulePop").append(
								'\
                                <div class="flexRow">\
                                  <div class="rulePopTittle"><span>' +
								item.Title + '</span></div>\
                                  <div class="rulePopBody">' + item.Content +
								'</div>\
                                </div>\
                            ')
						})
						openRulePop();
						$("#cover,.closeRule").unbind("click").click(function () {
							closeRulePop();
						})
					}
				},
				error: function () {
					// alert('fail'); 
				}
			});
		})
	})
	$(".ticketFlightDetail span").unbind("click").click(function () {
		if ($('.flight_detail_pop:not(".hidden")')[0] != $(this).siblings()[0]) {
			$('.flight_detail_pop:not(".hidden")').usePopWindowEffect(300)
		}
		$(this).siblings('.flight_detail_pop').usePopWindowEffect(300)
	})
	$(".stopOver .underline").unbind("mouseenter").bind("mouseenter", function () {
		$(this).siblings('.flight_detail_pop').openPopWindow()
	})
	$(".stopOver .underline").unbind("mouseleave").bind("mouseleave", function () {
		$(this).siblings('.flight_detail_pop').closePopWindow(300)
	})
	$(".bookBtn").unbind("click").click(function () {
		if (searchIntlInfo.type == "oneWay") {
			var SegID = $(this).attr("SegID");
			if (res[0].ShowCabinDetail) {
				MoreIntlPrice(SegID, this);
			} else {
				var that = this;
				approachingRemind(this, function () {
					searchIntlTicket($(that).attr("CabinID"), SegID, $(that).attr("AirLineCode"));
				})
			}
		} else if (searchIntlInfo.type == "roundTrip" && !isReturn) {
			var SegID = $(this).attr("SegID");
			var AirLineCode = $(this).attr("AirLineCode");
			var ticketPrice = $(this).attr("ticketPrice");
			var ticketTax = $(this).attr("ticketTax");
			var CabinID = $(this).attr("CabinID");
			var pareType = $(this).attr('pareType')
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetNextSegmentIDs",
					jsonStr: '{"id":' + netUserId + ',"selectedId":"' + SegID + '"}'
				},
				success: function (data) {
					var res = JSON.parse(data);
					console.log(res);
					var returnTicket = {
						'type': 'roundTrip',
						'SegID': SegID,
						"AirLineCode": AirLineCode,
						'returnSegIdList': data,
						"ticketPrice": ticketPrice,
						"ticketTax": ticketTax,
						'CabinID': CabinID,
					}
					$.session.set('returnTicket', JSON.stringify(returnTicket));
					window.location.href = '../../intlAir/airTicketList.html?isReturn=1&pareType=' + pareType;
				},
				error: function () {
					//alert('fail');
				}
			});

		} else if (searchIntlInfo.type == "roundTrip" && isReturn == 1) {
			var returnTicket = JSON.parse($.session.get('returnTicket'))
			var SegID = returnTicket.SegID + '-' + returnTicket.CabinID + ',' + $(this).attr("SegID")
			if (res[0].ShowCabinDetail) {
				MoreIntlPrice(SegID, this);
			} else {
				var that = this;
				approachingRemind(this, function () {
					searchIntlTicket($(that).attr("CabinID"), SegID, $(that).attr("AirLineCode"));
				})
			}
		}

		function MoreIntlPrice(SegID, that) {
			//换新接口
			// url: $.session.get('obtCompany') + "/QueryService.svc/InterAirCabinSearchPost",
			if (ProfileInfo.HideOutLimitFareAir) {
				var limitfare = $(that).attr("limitfare")
			} else {
				var limitfare = ""
			}
			var jsonStr = '{"request":{"queryKey":"' + SegID + '","id":' + netUserId + ',"Language":"' + obtLanguage + '","maxFare":"' + limitfare + '"}}'
			console.log(jsonStr)

			if ($(that).attr("spread") == 'off') {
				$(that).attr("spread", "on");
				$(that).parent().next().show();
				$('body').mLoading("show");
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/InterAirCabinSearchNew",
						jsonStr: '{"request":{"queryKey":"' + SegID + '","id":' + netUserId + ',"Language":"' + obtLanguage + '","maxFare":"' + limitfare + '"}}'
						// jsonStr: '{"queryKey":"' + SegID + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
					},
					success: function (data) {
						$('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						if (res.length != 0) {
							$(that).parent().next().html('\
                                <table class="spreadTable" border="0" cellpadding="0" cellspacing="0">\
                                	<tr>\
                                		<th>' + get_lan('ticketSpread').cabinCode + '</th>\
                                		<th>' + get_lan('ticketSpread').seatsNum + '</th>\
										<th>' + get_lan('ticketSpread').cabinType + '</th>\
                                		<th></th>\
                                		<th>' + get_lan('ticketSpread').NominalPrice + '</th>\
                                		<th>' + get_lan('ticketSpread').Tax + '</th>\
										<th></th>\
										<th></th>\
										<th></th>\
										<th></th>\
                                	</tr>\
                                </table>\
                                '
							);
							$(that).children(".ticketPriceText").text(parseInt(res[0].CabinFare) + parseInt(res[0].CabinTax));
							res.map(function (item) {
								var showViolation = item.PolicyType == 4 || item.PolicyType == 3 ? "" : "hide";
								var showBaggageInfo = item.BaggageInfo == null ? "hide" : "";
								var showHandImg = item.FareTypeCode == 2 ? "" : "hide";
								if (obtLanguage == "CN") {
									var BaggageInfo = item.BaggageInfo.baggagePiecesField == "" ? item.BaggageInfo.baggageWeightField + ' ' +
										item.BaggageInfo.baggageWeightUnitField : item.BaggageInfo.baggagePiecesField + " 件";
								} else if (obtLanguage == "EN") {
									var BaggageInfo = item.BaggageInfo.baggagePiecesField == "" ? item.BaggageInfo.baggageWeightField + ' ' +
										item.BaggageInfo.baggageWeightUnitField : item.BaggageInfo.baggagePiecesField + " Piece(s)";
								}
								$(that).parent().next().children(".spreadTable").append('\
                                    <tr>\
										<td>' + item.CabinCode + '</td>\
										<td>' + item.Seats + '</td>\
										<td>' + item.CabinType + '</td>\
										<td>' + item.CabinFare + '</td>\
										<td>' + item.CabinTax + '</td>\
										<td class="restrictionBtn" CabinID="' + item.CabinID + '">' + get_lan('ticketSpread').restriction + '</td>\
										<td><div class="' + showBaggageInfo + '">' + get_lan('ticketList').BaggageInfo + BaggageInfo + '</div></td>\
										<td><div class="violationIcon ' + showViolation + '">' + get_lan('ticketSpread').violation + '</div></td>\
										<td><div class="chooseTicket" CabinID="' + item.CabinID + '">' + get_lan('ticketSpread').choose + '</div></td>\
                                    </tr>\
                                ');
							})
							$(".restrictionBtn").unbind("click").click(function () {
								$('body').mLoading("show");
								if (searchIntlInfo.type == "roundTrip" && isReturn == 1) {
									ruleCabinID = JSON.parse($.session.get('returnTicket')).CabinID + '-' + $(this).attr("CabinID");
									ruleSegID = SegID.split(',').join('-');
								} else if (searchIntlInfo.type == "oneWay") {
									ruleSegID = SegID;
									ruleCabinID = $(this).attr("CabinID");
								}
								$.ajax({
									type: 'post',
									url: $.session.get('ajaxUrl'),
									dataType: 'json',
									data: {
										url: $.session.get('obtCompany') + "/QueryService.svc/InterRuleSearch",
										jsonStr: '{"OptionId":"' + ruleSegID + '","CabinId":"' + ruleCabinID + '","id":' +
											netUserId + ',"Language":"' + obtLanguage + '"}'
									},
									success: function (data) {
										$('body').mLoading("hide");
										var res = JSON.parse(data);
										console.log(res);
										$(".rulePop").html('\
                                            <div class="rulePopHeader">' + get_lan("rulePopHeader") + '<div class="closeRule">x</div></div>\
                                        ');
										if (res.ErrMsg != "") {
											alert(res.ErrMsg);
										} else {
											res.Rules.map(function (item) {
												$(".rulePop").append('\
                                                    <div class="flexRow">\
														<div class="rulePopTittle"><span>' + item.Title + '</span></div>\
														<div class="rulePopBody">' + item.Content + '</div>\
                                                    </div>\
                                                ')
											})
											openRulePop();
											$("#cover,.closeRule").unbind("click").click(function () {
												closeRulePop();
											})
										}
										// var rulePopHeight = $(".rulePop").height()%2==1?$(".rulePop").height()+1:$(".rulePop").height();
										// $(".rulePop").css("height",rulePopHeight+'px');
									},
									error: function () {
										// alert('fail'); 
									}
								});
							})
							$(".chooseTicket").unbind("click").click(function () {
								var target = this;
								approachingRemind(that, function () {
									searchIntlTicket($(target).attr("CabinID"), SegID, $(that).attr("AirLineCode"));
								})
							})
						} else {
							alert(get_lan("cabinRemind"));
							$(that).attr("spread", "off");
						}
					},
					error: function () {
						// alert('fail'); 
					}
				});
			} else if ($(that).attr("spread") == 'on') {
				$(that).attr("spread", "off");
				$(that).parent().next().hide();
			}
		}
	})
}
function approachingRemind(that, success) {
	var flightTimeStr = $(that).attr('dateStart').split(',')[0];
	if (flightTimeStr.length < 12) {
		console.log('时间格式不对，请检查');
	} else {
		var REMINDTIME = 3 * 60 * 60 * 1000;
		if (flightTime(flightTimeStr) - currentTime() < REMINDTIME) {
			start.popUp('body', function () {
				success(that);
			});
		} else {
			success(that);
		}
	}
}
function searchIntlTicket(CabinID, SegID, AirLineCode) {
	var intlTicketInfo = {
		'type': searchIntlInfo.type,
		'segmentKey': SegID + '-' + CabinID,
		'AirLineCode': AirLineCode,
	}
	$.session.set('intlTicketInfo', JSON.stringify(intlTicketInfo));
	window.location.href = '../../intlAir/bookIntlAirTicket.html';
}

function openRulePop() {
	$("#cover").show();
	$(".rulePop").show();
}

function closeRulePop() {
	$("#cover").hide();
	$(".rulePop").hide();
}

function openFlightDetailPop() {
	$("#cover").show();
	$(".flightDetailPop").show();
}

function closeFlightDetailPop() {
	$("#cover").hide();
	$(".flightDetailPop").hide();
}
// 国际票
function GrayIntelDepartPlusMinus() {
	if ($('#intlDepartureSelect').val() == 'all') {
		$('#DepartPlusMinusintel').attr('disabled', 'disabled')
		$('#DepartPlusMinusintel').css('border-color', '#9b9b9b')
	} else {
		$('#DepartPlusMinusintel').removeAttr('disabled')
		$('#DepartPlusMinusintel').css('border-color', '#000')
	}
}

function GrayIntelreturnPlusMinus() {
	if ($('#intlReturnSelect').val() == 'all') {
		$('#returnPlusMinusintel').attr('disabled', 'disabled')
		$('#returnPlusMinusintel').css('border-color', '#9b9b9b')
		$('#returnPlusMinusintel').css('color', '#9b9b9b')
	} else {
		$('#returnPlusMinusintel').removeAttr('disabled')
		$('#returnPlusMinusintel').css('border-color', '#000')
		$('#returnPlusMinusintel').css('color', '#000')
	}
}
window.onscroll = function () {
	//清除弹窗
	//sort
	$('.sort_box_operations-pop').closePopWindow(500, $('.sort_box_operations-selected'))
	//flight detail
	$('.flight_detail_pop:not(".hidden")').closePopWindow(300)
	//cabin search
	$('.search_filter-box_pop:not(".hidden")').closePopWindow(300, $('.search_filter-box'))

	// 筛选固定
	var filterOffsetTop = $('.searchBody').offset().top + $('.searchBody').height()
	if (document.documentElement.scrollTop >= filterOffsetTop && $('.ticketList').height() > $('.filter_wrapper').height()) {
		$('.filter_wrapper').addClass('fixed').css('height', window.innerHeight + 'px')
		if (document.documentElement.scrollLeft >= 25) {
			$('.filter_switch').addClass('show')
			$('.filter_switch').unbind('click').on('click', function () {
				$('.filter_wrapper').toggleClass('close')
				$('.filter_switch').toggleClass('close')
				$('.filter_box').toggleClass('hide')
			})
		} else {
			$('.filter_switch').removeClass('show close')
			$('.filter_wrapper').removeClass('close')
			$('.filter_box').removeClass('hide')
		}
	} else {
		$('.filter_wrapper').removeClass('fixed').css('height', '')
		$('.filter_switch').removeClass('show close')
		$('.filter_wrapper').removeClass('close')
		$('.filter_box').removeClass('hide')
	}
}
window.onresize = function () {
	if ($('.filter_wrapper').hasClass('fixed')) {
		$('.filter_wrapper').css('height', window.innerHeight + 'px')
	}
}
// 时间段筛选
function fillterTimeList(res) {
	console.log(ProfileInfo.ShowDomesticTimeSlt)
	// 有权限,不是allday,正负时间不为空
	var flag = ''
	var dayTime = ''
	var fillterArr = [];

	if (searchIntlInfo.type == "oneWay" || (searchIntlInfo.type == "roundTrip" && isReturn != 1)) {
		flag = setTime
		if (typeof day == "undefined") {
			// dayTime=3
			dayTime = 5
		} else {
			// dayTime=day
			dayTime = $('#DepartPlusMinusintel').val()
			// dayTime=3
		}
	} else if (searchIntlInfo.type == "roundTrip") {
		flag = setReturnTime
		if (typeof returnday == "undefined") {
			// dayTime=3
			dayTime = 5
		} else {
			// dayTime=returnday
			dayTime = $('#returnPlusMinusintel').val()
			// dayTime=3
		}
	}
	if (ProfileInfo.ShowDomesticTimeSlt && flag != "all") {
		var date = new Date('2019/8/8 12:00');
		var t1 = flag;
		var a = t1.split(":")[0];
		date.setHours(a)

		res.map(function (item) {

			var t2 = item.DateStart

			var b = t2.split(":");

			var minTime = date.getTime() - dayTime * 3600 * 1000
			var maxTime = date.getTime() + dayTime * 3600 * 1000

			var iTime = new Date('2019/8/8 12:00')
			iTime.setHours(parseInt(b[0]))
			iTime.setMinutes(parseInt(b[1]))
			var itemTime = iTime.getTime()

			if ((minTime < itemTime || minTime == itemTime) && (maxTime > itemTime || maxTime == itemTime)) {
				fillterArr.push(item)
			} else { }
		})

		return fillterArr;
	} else {
		return res
	}
}
