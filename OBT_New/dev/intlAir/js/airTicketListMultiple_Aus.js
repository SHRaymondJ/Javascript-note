var netUserId = $.session.get('netLoginId');
var id = netUserId.split('"')[1]
var obtLanguage = $.session.get('obtLanguage');
var searchIntlInfo = JSON.parse($.session.get('searchIntlInfo'));
console.log(searchIntlInfo);
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var intlState = parseInt(tools.queryString().intlState);
var TAorderNo = $.session.get('TAorderNo');
//中英文对象
var cn = {
    "progressBar": {
        "search": "查询",
        "book": "预订",
        "complete": "完成",
    },
    'siftBody': {
        "departureTime": "起飞时间",
        "arrivalTime": "到达时间",
        "price": "价格",
    },
    'airportName':
    {
        'all': '全部航班',
    },
    "ticketList": {
        "listRemind": "该运价无法预订，请线下联系服务组！",
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
        filter: '筛选',
		reset: "重置",
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
    'siftBody': {
        "departureTime": "Departure Time",
        "arrivalTime": "Arrival Time",
        "price": "Price",
    },
    'airportName':
    {
        'all': 'All',
    },
    "ticketList": {
        "listRemind": "No relevant flight available or out of policy",
        "tittle": "Segment list",
        "FlightNo": "Flight",
        "PlaneType": "AirCraft",
        "Punctuality": "Punctuality",
        "Duration": "Duration",
        "LowestFare": "Lowest Fare",
        "LowestFareFlight": "Lowest Fare of the same Flight",
        "PreferredAirline": "Preferred Airline",
        "CompanyPreferred": "Company Preferred",
        "preDay": "PreDay",
        "nextDay": "NextDay",
        "Code_share": "(share)",
        "Tax": "Tax",
        "includeTax": "Tax include",
        "roundTittleGo": "Departure",
        "roundTittleReturn": "Return",
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
		filter: 'Filter',
		reset: "Reset to Original Search",
    },
    "flightDetailPop": {
        "Flytime": "Fly",
        "transfer": "Transfer in ",
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
    taxReminder: 'Price includes taxes and fees.',
    coronavirusTitle: 'Coronavirus and travel bans',
    coronavirusReminder: 'This report summarizes some recent travel restriction developments around the world due to the',
    learnMore: 'Learn more',
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
$(function () {
    showContent();//内容展示
    ticketList();//机票列表
    GetCompanyImageInfos()
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
    console.log(!target.is('.ticketFlightDetail *'))
	if (!target.is('.sort_box_operations-list *')) {
		$('.sort_box_operations-pop').closePopWindow(500, $('.sort_box_operations-selected'))
	}
	if (!target.is('.ticketFlightDetail *')) {
        console.log(123)
		$('.flight_detail_pop:not(".hidden")').closePopWindow(300)
	}
	if (!target.is('.search_filter-box *')) {
		$('.search_filter-box_pop').closePopWindow(300, $('.search_filter-box'))
	}
})

function useSortEffect() {
	$('.sort_box_operations-selected').click(function () {
		$(this).siblings().usePopWindowEffect(500, $(this))
	})
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
                return false;
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
                // alert(res.errMsg)
            }
        },
        error: function () {
            // alert('fail');
        }
    });
};
//内容展示
function showContent() {
    $("#main").html(
        '<div class="autoCenter">\
            <div class="progressBar"></div>\
            <section class="container">\
                <aside class="filter_side">\
                    <section class="filter_wrapper">\
                        <div class="filter_box">\
                            <div class="filter_reset">\
                                <h3 class="filter_title">'+ get_lan('refineSearch').filter + '</h3>\
                                <button class="filter_reset_btn">'+ get_lan('refineSearch').reset + '</button>\
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
                        <h3 class="sort__title">'+ get_lan('ticketList').tittle + '</h3>\
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
    //筛选排序模块
    $(".siftBody").html('\
        <select class="airLineChoose">\
        <option airCode="All">'+ get_lan('airportName').all + '</option>\
        </select>\
        <div class="departureTimeSort flexRow">'+ get_lan('siftBody').departureTime + '<div class="departureTimeSortIcon"></div></div>\
        <div class="priceSort flexRow">'+ get_lan('siftBody').price + '<div class="priceSortIcon"></div></div>\
        ')
}
function getWeek(dateStr) {
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return get_lan('searchBody').weekDay.split(',')[myDate.getDay()];
}

function GetDateStr(AddDayCount, date) {
    var dd = new Date(date.replace(/-/g, '/'));
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;//获取当前月份的日期
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}

//机票列表
function ticketList() {
    // $('body').mLoading("show");
    tools.searchLoadingShow()
    if (intlState == 1) {
        $.ajax({
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/QueryService.svc/InterSegmentSearchFreeNew",
                jsonStr: '{"request":{"airlineKey":"ALL","id":' + netUserId + ',"Language":"' + obtLanguage + '","orgList":"' + searchIntlInfo.orgList + '","dstList":"' + searchIntlInfo.dstList + '","dateList":"' + searchIntlInfo.dateList + '","cabinType":"' + searchIntlInfo.cabinType + '"}}'
            },
            success: function (data) {
                // $('body').mLoading("hide");
                tools.searchLoadingHide()
                var res = JSON.parse(data);
                console.log(res);
                if (res.code == 200) {
                    if (res.segmentList.length != 0) {
                        ticketListInfo(res.segmentList[intlState - 1], res.segmentList.length);
                        newFilter(res.segmentList[intlState - 1]);
                        chooseAirLine(res.segmentList[intlState - 1]);//选择航空公司
                        sortTicketInfo(res.segmentList[intlState - 1]);//排序
                    } else {
                        alert(get_lan("ticketList").listRemind);
                    }
                } else {
                    alert(res.errMsg)
                }
            },
            error: function () {
                // alert('fail');
            }
        });
    }
    else {
        $.ajax({
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/QueryService.svc/GetInterAirFreeInCache",
                jsonStr: '{"id":' + netUserId + '}'
            },
            success: function (data) {
                // $('body').mLoading("hide");
                tools.searchLoadingHide()
                var res = JSON.parse(data);
                console.log(res);
                if (res.length != 0) {
                    console.log($.session.get('NextSegmentIDs' + (intlState - 1)));
                    var NextSegmentIDs = JSON.parse($.session.get('NextSegmentIDs' + (intlState - 1)));
                    console.log(NextSegmentIDs);
                    var ticketList = [];
                    res[intlState - 1].map(function (item) {
                        NextSegmentIDs.map(function (sItem) {
                            if (item.SegID == sItem) {
                                ticketList.push(item);
                            }
                        })
                    })
                    console.log(ticketList);
                    ticketListInfo(ticketList, res.length);
                    newFilter(ticketList);
                    chooseAirLine(ticketList);//选择航空公司
                    sortTicketInfo(ticketList);//排序
                } else {
                    alert(get_lan("ticketList").listRemind);
                }
            },
            error: function () {
                // alert('fail');
            }
        });
    }
}
//机票信息
function ticketListInfo(res, index) {
    console.log(res);
    $(".ticketList").html('');

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
            intlFlightNo += ',';
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
                intlFlightNo += interSegment.FlightNo;
                intlFlightNo += ', ';
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

        $(".ticketList").append('\
            <li class="ticketLi" key="'+ index + '">\
                <section class="ticket_values">\
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
    })
    if (intlState != index) {
        $(".ticketRestriction").hide();
    }
    $('.ticket_baggage-btn').unbind('mouseenter').bind('mouseenter', (function () {
        $(this).siblings().openPopWindow()
    }))
    $('.ticket_baggage-btn').unbind('mouseleave').bind('mouseleave', (function () {
        $(this).siblings().closePopWindow(300)
    }))
    $(".ticketRestriction").unbind("click").click(function () {
        $('body').mLoading("show");
        $.ajax({
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/QueryService.svc/InterRuleSearch",
                jsonStr: '{"OptionId":"' + $(this).attr("ruleSegID") + '","CabinId":"' + $(this).attr("CabinId") + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
            },
            success: function (data) {
                $('body').mLoading("hide");
                var res = JSON.parse(data);
                console.log(res);
                $(".rulePop").html('\
                    <div class="rulePopHeader">'+ get_lan("ticketSpread").restriction + '<div class="closeRule">x</div></div>\
                    ');
                if (res.ErrMsg != "") {
                    alert(res.ErrMsg);
                } else {
                    res.Rules.map(function (item) {
                        $(".rulePop").append('\
                            <div class="flexRow" style="border-bottom:1px solid #cdcdcd;">\
                              <div class="rulePopTittle"><span style="line-height:60px;">'+ item.Title + '</span></div>\
                              <div class="rulePopBody">'+ item.Content + '</div>\
                            </div>\
                            ')
                    })
                    openRulePop();
                    $("#cover,.closeRule").unbind("click").click(function () {
                        closeRulePop();
                    })
                }
                // $(".rulePop").css("height",'80px');
                // var rulePopHeight = $(".rulePop").height()%2==1?$(".rulePop").height()+1:$(".rulePop").height();
                // $(".rulePop").css("height",rulePopHeight+'px');
            },
            error: function () {
                // alert('fail'); 
            }
        });
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
        if (intlState != index) {
            if (intlState == 1) {
                var multipleTicket = {
                    'SegID': $(this).attr("SegID"),
                }
                $.session.set('multipleTicket', JSON.stringify(multipleTicket));
                $.ajax({
                    type: 'post',
                    url: $.session.get('ajaxUrl'),
                    dataType: 'json',
                    data: {
                        url: $.session.get('obtCompany') + "/QueryService.svc/GetNextSegmentIDs",
                        jsonStr: '{"id":' + netUserId + ',"selectedId":"' + JSON.parse($.session.get('multipleTicket')).SegID + '"}'
                    },
                    success: function (data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $.session.set('NextSegmentIDs' + intlState, data);
                        window.location.href = '../../intlAir/airTicketListMultiple.html?intlState=2';
                    },
                    error: function () {
                        //alert('fail');
                    }
                });
            } else {
                var SegIDList = JSON.parse($.session.get('multipleTicket')).SegID.split(',');
                if (SegIDList.length < intlState) {
                    var SegID = JSON.parse($.session.get('multipleTicket')).SegID + ',' + $(this).attr("SegID");
                } else {
                    SegIDList[intlState - 1] = $(this).attr("SegID");
                    var SegID = SegIDList.join(',');
                }

                var multipleTicket = {
                    'SegID': SegID,
                }
                $.session.set('multipleTicket', JSON.stringify(multipleTicket));
                $.ajax({
                    type: 'post',
                    url: $.session.get('ajaxUrl'),
                    dataType: 'json',
                    data: {
                        url: $.session.get('obtCompany') + "/QueryService.svc/GetNextSegmentIDs",
                        jsonStr: '{"id":' + netUserId + ',"selectedId":"' + JSON.parse($.session.get('multipleTicket')).SegID + '"}'
                    },
                    success: function (data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $.session.set('NextSegmentIDs' + intlState, data);
                        window.location.href = '../../intlAir/airTicketListMultiple.html?intlState=' + (intlState + 1);
                    },
                    error: function () {
                        //alert('fail');
                    }
                });
            }
        } else {
            var SegID = JSON.parse($.session.get('multipleTicket')).SegID + ',' + $(this).attr("SegID");
            console.log(SegID);
            if (res[0].ShowCabinDetail) {
                MoreIntlPrice(SegID, this);
            } else {
                searchIntlTicket($(this).attr("CabinID"), SegID, $(this).attr("AirLineCode"));
            }
        }
        function MoreIntlPrice(SegID, that) {
            if (ProfileInfo.HideOutLimitFareAir) {
                var limitfare = $(that).attr("limitfare")
            } else {
                var limitfare = ""
            }
            if ($(that).attr("spread") == 'off') {
                $(that).attr("spread", "on");
                $(that).parent().next().show();
                $('body').mLoading("show");
                $.ajax({
                    type: 'post',
                    url: $.session.get('ajaxUrl'),
                    dataType: 'json',
                    // data:{
                    //     url: $.session.get('obtCompany')+"/QueryService.svc/InterAirCabinSearchFree",
                    //     jsonStr:'{"queryKey":"'+SegID+'","id":'+netUserId+',"isFreeType":"true","Language":"'+obtLanguage+'"}'
                    // },
                    data: {
                        url: $.session.get('obtCompany') + "/QueryService.svc/InterAirCabinSearchNew",
                        jsonStr: '{"request":{"queryKey":"' + SegID + '","id":' + netUserId + ',"isFreeType":"true","Language":"' + obtLanguage + '","maxFare":"' + limitfare + '"}}'
                    },
                    success: function (data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        if (res.length != 0) {
                            $(that).parent().next().html('\
                                <table class="spreadTable" border="0" cellpadding="0" cellspacing="0">\
                                <tr>\
                                <th>'+ get_lan('ticketSpread').cabinType + '</th>\
                                <th>'+ get_lan('ticketSpread').seatsNum + '</th>\
                                <th></th>\
                                <th></th>\
                                <th>'+ get_lan('ticketSpread').NominalPrice + '</th>\
                                <th>'+ get_lan('ticketSpread').Tax + '</th>\
                                <th></th>\
                                <th></th>\
                                </tr>\
                                </table>\
                                ');
                            //'+get_lan('ticketSpread').cabinCode+'
                            //'+item.CabinCode+'
                            res.map(function (item) {
                                var showHandImg = item.FareTypeCode == 2 ? "" : "hide";
                                var showBaggageInfo = item.BaggageInfo == null ? "hide" : "";
                                var BaggageInfo = item.BaggageInfo.baggagePiecesField == "" ? item.BaggageInfo.baggageWeightField + item.BaggageInfo.baggageWeightUnitField : item.BaggageInfo.baggagePiecesField;
                                $(that).parent().next().children(".spreadTable").append('\
                                    <tr>\
                                        <td>'+ item.CabinType + '</td>\
                                        <td>'+ item.Seats + '</td>\
                                        <td><div class="'+ showBaggageInfo + '">' + get_lan('ticketList').BaggageInfo + BaggageInfo + '</div></td>\
                                        <td><img class="'+ showHandImg + '" src="../../css/images/handImg.png" style="margin-top:2px;width:26px;height:15px;"></td>\
                                        <td>'+ item.CabinFare + '</td>\
                                        <td>'+ item.CabinTax + '</td>\
                                        <td class="restrictionBtn" CabinID="'+ item.CabinID + '" style="cursor:pointer;text-decoration:underline;">' + get_lan('ticketSpread').restriction + '</td>\
                                        <td><div class="chooseTicket" CabinID="'+ item.CabinID + '">' + get_lan('ticketSpread').choose + '</div></td>\
                                    </tr>\
                                    ');
                            })
                            $(that).children(".ticketPriceText").text(parseInt(res[0].CabinFare) + parseInt(res[0].CabinTax));
                            var ruleSegID = SegID.split(',')[SegID.split(',').length - 1];
                            $(".restrictionBtn").unbind("click").click(function () {
                                $('body').mLoading("show");
                                $.ajax({
                                    type: 'post',
                                    url: $.session.get('ajaxUrl'),
                                    dataType: 'json',
                                    data: {
                                        url: $.session.get('obtCompany') + "/QueryService.svc/InterRuleSearch",
                                        jsonStr: '{"OptionId":"' + ruleSegID + '","CabinId":"' + $(this).attr("CabinId") + '","id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
                                    },
                                    success: function (data) {
                                        $('body').mLoading("hide");
                                        var res = JSON.parse(data);
                                        console.log(res);
                                        $(".rulePop").html('\
                                            <div class="rulePopHeader">'+ get_lan("ticketSpread").restriction + '<div class="closeRule">x</div></div>\
                                            ');
                                        if (res.ErrMsg != "") {
                                            alert(res.ErrMsg);
                                        } else {
                                            res.Rules.map(function (item) {
                                                $(".rulePop").append('\
                                                    <div class="flexRow" style="border-bottom:1px solid #cdcdcd;">\
                                                      <div class="rulePopTittle"><span style="line-height:60px;">'+ item.Title + '</span></div>\
                                                      <div class="rulePopBody">'+ item.Content + '</div>\
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
                            $(".chooseTicket").unbind("click").click(function () {
                                searchIntlTicket($(this).attr("CabinID"), SegID, $(that).attr("AirLineCode"));
                            })
                        }
                    },
                    error: function () {
                        // alert('fail'); 
                    }
                });
            } else if ($(this).attr("spread") == 'on') {
                $(this).attr("spread", "off");
                $(this).parent().next().hide();
            }
        }
    })
}
function searchIntlTicket(CabinID, SegID, AirLineCode) {
    var SegIDList = SegID.split(',');
    for (var i = 0; i < SegIDList.length; i++) {
        SegIDList[i] = SegIDList[i] + '-' + CabinID;
    }
    var segmentKey = SegIDList.join(',');
    console.log(segmentKey);
    var intlTicketInfo = {
        'type': 'multiple',
        'segmentKey': segmentKey,
        'AirLineCode': AirLineCode,
    }
    $.session.set('intlTicketInfo', JSON.stringify(intlTicketInfo));
    window.location.href = '../../intlAir/bookIntlAirTicket.html';
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
    // console.log(AirportList)
    alineLineSort(alineLineList).map(function (item) {
        $(".airLineChoose").append('\
        <option airCode="'+ item.AirLineCode + '">' + item.AirLineCode + '-' + item.AirLineSort + '</option>\
        ')
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
        ticketListInfo(airlineAirList);
        sortTicketInfo(airlineAirList);//排序
    })
}
window.onscroll = function () {
    //清除弹窗
    //sort
    $('.sort_box_operations-pop').closePopWindow(500, $('.sort_box_operations-selected'))
    //flight detail
    $('.flight_detail_pop:not(".hidden")').closePopWindow(300)

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