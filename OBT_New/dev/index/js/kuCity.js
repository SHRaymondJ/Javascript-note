var apacReadyPage = true
	// ;['index', 'intlAir', 'hotel', 'search'].map(function (item) {
	// 	if (window.location.href.indexOf(item) > -1) {
	// 		apacReadyPage = true
	// 	}
	// })
if (JSON.parse($.session.get('ProfileInfo')).onlineStyle === 'APAC' && apacReadyPage) {
	//日期选择插件
	function dateChoose(departure, returnDate) {
		// var departureValue = new Date($("#" + departure).val().replace(/-/g, "/"));
		var departureValue = new Date();
		var returnValue = new Date($("#" + departure).val().replace(/-/g, "/"));
		var maxTime = 365
		if (TAnumber != undefined && TAnumber != "") {
			maxTime = TAmaxDate
		}
		$("#" + returnDate).datepicker('destroy');
		$("#" + returnDate).datepicker({
			dateFormat: 'yy-mm-dd',
			changeMonth: true,
			minDate: returnValue, // 当前日期之后的 0 天，就是当天
			maxDate: maxTime, // 当前日期之后的 0 天，就是当天
			hideIfNoPrevNext: true,
			showOtherMonths: true,
			selectOtherMonths: true,
			changeYear: true,
		});
		if (TAnumber != undefined && TAnumber != "") {
			// departureValue = TAminDate
			var minTime = new Date().getTime()
			var minTime2
			if (TAminDate == 0) {
				minTime2 = new Date().getTime()
			} else {
				minTime2 = new Date(TAminDate.replace(/-/g, "/")).getTime()
			}
			departureValue = minTime < minTime2 ? TAminDate : new Date()
		}
		$("#" + departure).datepicker({
			dateFormat: 'yy-mm-dd',
			changeMonth: true,
			minDate: departureValue, // 当前日期之后的 0 天，就是当天
			maxDate: maxTime, // 当前日期之后的 0 天，就是当天
			hideIfNoPrevNext: true,
			showOtherMonths: true,
			selectOtherMonths: true,
			changeYear: true,
			onSelect: function () {
				var returnValue = new Date($("#" + departure).val().replace(/-/g, "/"));
				var maxTime = 365
				if (TAnumber != undefined && TAnumber != "") {
					maxTime = TAmaxDate
				}

				$("#" + returnDate).datepicker('destroy');
				$("#" + returnDate).datepicker({
					dateFormat: 'yy-mm-dd',
					changeMonth: true,
					minDate: returnValue, // 当前日期之后的 0 天，就是当天
					maxDate: maxTime, // 当前日期之后的 0 天，就是当天
					hideIfNoPrevNext: true,
					showOtherMonths: true,
					selectOtherMonths: true,
					changeYear: true,
				});
				$("#" + returnDate).val(getNextDay($("#" + departure).val()));
				if (departure == "hotelDepartureDate") {
					if ($(".searchHotelBtn").attr("state") == "domHotel") {
						var hotelCityCode = $('#hotelCity').attr("code");
					} else if ($(".searchHotelBtn").attr("state") == "intlHotel") {
						var hotelCityCode = $('#hotelIntlCity').attr("code");
					}
					if (hotelCityCode) {
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
								jsonStr: '{"cityCode":"' + hotelCityCode + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate")
									.val() + '","checkOut":"' + $("#hotelReturnDate").val() + '"}'
							},
							success: function (data) {
								var res = JSON.parse(data);
								console.log(res);
								$('body').mLoading("hide");
								// 12.24  删除币种符号
								// $("#hotelPrice").val(''+res.minFare+'-'+res.maxFare+ProfileInfo.OfficeCurrency);
								if ($(".searchHotelBtn").attr("state") == "intlHotel") {
									$("#hotelPrice").val(res.minFare + '-' + res.maxFare);
								} else {
									$("#hotelPrice").val('' + res.minFare + '-' + res.maxFare + ProfileInfo.OfficeCurrency);
								}
								$("#hotelPrice").attr("minPrice", res.minFare);
								$("#hotelPrice").attr("maxPrice", res.maxFare);
							},
							error: function () {
								// alert('fail'); 
							}
						});
					}
				}
			}
		});
	}
	// 新版
	(function ($) {
		$('body').mLoading("show");
		var TAnumber = $.session.get('TAnumber') ? $.session.get('TAnumber') : '';
		var id = $.session.get('netLoginId').split('"')[1]
		var TAnumberIndex = $.session.get('TAnumberIndex');
		var TAnumbertest = window.sessionStorage.getItem('TAnumber')
		var obtLanguage = $.session.get('obtLanguage');
		var seatNUm = $.session.get('cityTAnumber');
		var cityTAnumber = $.session.set('cityTAnumber')
		//ThreeCode是租车使用的，以后有需求请做特殊处理

		// 判断是否是json字符串


		// 各模块城市缓存
		var domCityJson = "", intlCityJson = "", intlDomCityJson = "", trainCityJson = ""
		var hotelCityJson = "", hotelIntlCityJson = "", carAddressJson = ""

		function isJsonString(str) {
			try {
				if (typeof JSON.parse(str) == "object") {
					return true;
				}
			} catch (e) {
			}
			return false;
		}
		//构建城市分类字面量
		if (ProfileInfo.onlineStyle == "APPLE") {
			var domCity = {
				hot: {
					hot: []
				},
				ABCDEFGH: {
				},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var intlCity = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var intlDomCity = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var trainCity = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var hotelCity = {
				hot: { hot: [] }
			};
			var hotelIntlCity = {
				hot: { hot: [] },
			};
			var carAddress = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
		} else {
			var domCity = {
				hot: {
					hot: []
				},
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var intlCity = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var intlDomCity = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var trainCity = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var hotelCity = {
				hot: { hot: [] }
			};
			var hotelIntlCity = {
				hot: { hot: [] }
			};
			var carAddress = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
		}
		// 生成城市列表
		function cityList(json, city, cityType) {

			if (ProfileInfo.onlineStyle == "APPLE") {
				cityData(json, city, cityType);
				// cityData(domCityJson,domCity);
				// cityData(intlCityJson,intlCity);
				// cityData(intlDomCityJson,intlDomCity);
				// cityData(trainCityJson,trainCity);
				// cityData(hotelCityJson,hotelCity);
				// cityData(hotelIntlCityJson,hotelIntlCity);
				// /*car*/ 
				// cityData(carAddressJson,carAddress);
			} else {
				newCityData(json, city, cityType);
				// newCityData(domCityJson,domCity);
				// newCityData(intlCityJson,intlCity);
				// newCityData(intlDomCityJson,intlDomCity);
				// newCityData(trainCityJson,trainCity);
				// newCityData(hotelCityJson,hotelCity);
				// newCityData(hotelIntlCityJson,hotelIntlCity);
				// /*car*/ 
				// newCityData(carAddressJson,carAddress);
			}
		}


		// 获取TA单限制的城市
		function cityFilter(cityType, jsonList, cityDom, airType) {
			var userid = netUserId.split("\"")[1]
			//不再进行过滤，由后台完成
			cityList(jsonList, cityDom, cityType)
			return false;
			console.log(jsonList)
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/GetTravelRequestCityInfo",
					jsonStr: '{"travelRequestNo":"' + TAnumber + '","key":"' + userid + '","count":""}'
				},
				success: function (data) {
					if (data == '' || data == "[]") {
						// alert('没有权限')
						// HotelGKBooking(orderRes,type,false);
						return "[]"
					} else {
						var o1 = JSON.parse(data)
						var o2 = jsonList
						o2.shift()
						// a1去重
						var a1New = []
						o1.map(function (aItem) {
							var f = true
							if (aItem.serviceType == cityType || aItem.serviceType == 0) {
								a1New.push(aItem)
							}
						})
						// a2去重
						var endArr = []
						var a2 = o2.filter(function (item) {
							return item.Value.length > 0
						})
						// endArr 是所有的城市
						// 遍历原数组
						var newobjArr = []
						a2.map(function (a2Item) {
							var arr = a2Item.Value.filter(function (vItem) {
								var f = false
								a1New.map(function (nItem) {
									if (cityType == 1 && (airType == "intel" || airType == "dom")) {
										if (nItem.Code == vItem.CityCode) {
											f = true
										}
									} else if (cityType == 2) {
										if (nItem.Code == vItem.ThreeCode) {
											f = true
										}
									} else if (cityType == 4) {
										if (nItem.NameCN == vItem.NameCN) {
											f = true
										}
									} else {
										if (nItem.Code == vItem.Code) {
											f = true
										}
									}
								})
								if (f) { return vItem }
							})
							var o = {
								Key: a2Item.Key,
								Value: arr
							}
							if (arr.length > 0) {
								newobjArr.push(o)
							}
						})
						setTimeout(function () {
							cityList(newobjArr, cityDom, cityType)
							// cityList(jsonList,cityDom,cityType)

							if (cityType == 1) {
								// 国内机票
								domCityJson = newobjArr
							}
							if (cityType == 1 && airType == "intel") {
								//国际票，国际全部
								intlCityJson = newobjArr
							}
							if (cityType == 1 && airType == "dom") {
								//国际票，主国内
								intlDomCityJson = newobjArr
							}
							if (cityType == 2 && airType == "intel") {
								//酒店
								hotelIntlCityJson = newobjArr
							}
							if (cityType == 2 && airType == "dom") {
								//酒店
								hotelCityJson = newobjArr
							}
							if (cityType == 4) {
								//火车
								trainCityJson = newobjArr
							}
						}, 100)
					}
				},
			})
		}

		// var TAnumber = tools.queryString().TAnumber;
		// List<QueryResult> InitLimitCitys(string key, string travelRequestNo);
		// jsonStr: '{"request":{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}}',



		var data1;
		// if(TAnumber && TAnumberIndex==1){
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data1 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitLimitCitys",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data1 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitCityPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		var domCityString = '';

		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: data1,
			async: false,
			success: function (data) {
				if (data == "" && TAnumber && TAnumberIndex) {
					// window.location.href='../../login/loginPage.html';
					if (obtLanguage == 'CN') {
						alert("出差城市信息缺失！")
					} else {
						alert("City business information missing!")
					}
				} else {
					if (TAnumber && $.session.get('TAOneCity') != 1) {
						// domCityString=data
						cityFilter("1", JSON.parse(data), domCity)
					} else {
						// domCityString = data;
						cityList(JSON.parse(data), domCity)
					}
					domCityJson = JSON.parse(data);
				}
				// var res = JSON.parse(data);
			},
			error: function () {
				// alert('fail');
			}
		});
		// var domCityJson = JSON.parse(domCityString);
		var intlCityString = '';
		var data2;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data2 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitInterLimitAirport",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data2 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitInterAirportPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		//  List<CityGroup> InitInterLimitAirport(string key, string travelRequestNo);

		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: data2,
			async: false,
			success: function (data) {
				if (data == "" && TAnumber) {
					// if(obtLanguage=='CN'){
					// 	alert("出差城市信息缺失！")
					// }else{
					// 	alert("City business information missing!")
					// }
				} else {
					// intlCityString = data;
					if (TAnumber && $.session.get('TAOneCity') != 1) {
						// domCityString=data
						cityFilter("1", JSON.parse(data), intlCity, "intel")
					} else {
						// domCityString = data;
						cityList(JSON.parse(data), intlCity)
					}
					intlCityJson = JSON.parse(data);
				}
				// var res = JSON.parse(data);
				// console.log(res);
			},
			error: function () {
				// alert('fail');
			}
		});
		// var intlCityJson = JSON.parse(intlCityString);
		// console.log(intlCityJson);
		var intlDomCityString = '';
		var data3;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data3 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitDomesticLimitAirport",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data3 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitDomesticAirportPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		// List<CityGroup> InitDomesticLimitAirport(string key, string travelRequestNo);

		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: data3,
			async: false,
			success: function (data) {

				if (data == "" && TAnumber) {
					// if(obtLanguage=='CN'){
					// 	alert("出差城市信息缺失！")
					// }else{
					// 	alert("City business information missing!")
					// }
				} else {
					if (TAnumber && $.session.get('TAOneCity') != 1) {
						// domCityString=data
						cityFilter("1", JSON.parse(data), intlDomCity, "dom")
					} else {
						// domCityString = data;
						cityList(JSON.parse(data), intlDomCity)
					}
					intlDomCityJson = JSON.parse(data);
					// intlDomCityString = data;
				}
				// var res = JSON.parse(data);
				// console.log(res);
			},
			error: function () {
				// alert('fail');
			}
		});
		// var intlDomCityJson = JSON.parse(intlDomCityString);
		// console.log(intlDomCityJson);
		var trainCityString = '';
		var data4;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data4 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitLimitTrainCity",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data4 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitTrainCityPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		// List<QueryResult> InitLimitTrainCity(string key, string travelRequestNo);

		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: data4,
			async: false,
			success: function (data) {
				if (data == "" && TAnumber) {
					// if(obtLanguage=='CN'){
					// 	alert("出差城市信息缺失！")
					// }else{
					// 	alert("City business information missing!")
					// }
				} else {
					// trainCityString = data;
					if (TAnumber && $.session.get('TAOneCity') != 1) {
						// domCityString=data
						cityFilter("4", JSON.parse(data), trainCity)
					} else {
						// domCityString = data;
						cityList(JSON.parse(data), trainCity)
					}
					trainCityJson = JSON.parse(data);
				}
				// var res = JSON.parse(data);
				// console.log(res);
			},
			error: function () {
				// alert('fail');
			}
		});
		// var trainCityJson = JSON.parse(trainCityString);
		// console.log(trainCityJson);
		var hotelCityString = '';
		var data5;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			// 酒店换成新接口，旧接口没有
			data5 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitHotelLimitCity",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data5 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitHotelCityPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		// List<QueryHotelCity> InitHotelLimitCity(string key, string travelRequestNo);

		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: data5,
			async: false,
			success: function (data) {
				console.log(JSON.parse(data))

				if (data == "" && TAnumber) {
					// if(obtLanguage=='CN'){
					// 	alert("出差城市信息缺失！")
					// }else{
					// 	alert("City business information missing!")
					// }
				} else {
					// hotelCityString = data;
					if (TAnumber && $.session.get('TAOneCity') != 1) {
						// domCityString=data
						cityFilter("2", JSON.parse(data), hotelCity, "dom")
					} else {
						// domCityString = data;
						cityList(JSON.parse(data), hotelCity)
					}
					hotelCityJson = JSON.parse(data)
				}
				// var res = JSON.parse(data);
				// console.log(res);
			},
			error: function () {
				// alert('fail');
			}
		});
		// var hotelCityJson = JSON.parse(hotelCityString);

		var hotelIntlCityString = '';
		var data6;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data6 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitAllHotelLimitCity",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			var obj = { Uid: id, Language: obtLanguage }
			data6 = {
				// url: $.session.get('obtCompany') + "/SystemService.svc/InitAllHotelCityPost",
				// jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
				url: $.session.get('obtCompany') + "/SystemService.svc/QueryAllHotelCityPost",
				jsonStr: JSON.stringify(obj)
			}
		}
		// AllHotelCity InitAllHotelLimitCity(string key, string travelRequestNo);
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: data6,
			async: false,
			success: function (data) {
				$('body').mLoading("hide");
				console.log(JSON.parse(data))
				if (data == "" && TAnumber) {
					// if(obtLanguage=='CN'){
					// 	alert("出差城市信息缺失！")
					// }else{
					// 	alert("City business information missing!")
					// }
				} else {
					var city = JSON.parse(data).InterCitys || JSON.parse(data)
					// hotelIntlCityString = data;
					if (TAnumber && $.session.get('TAOneCity') != 1) {
						// domCityString=data
						cityFilter("2", city, hotelIntlCity, "intel")
					} else {
						// domCityString = data;
						cityList(city, hotelIntlCity)
					}
					hotelIntlCityJson = city;
				}
				// var res = JSON.parse(data);
				// console.log(res);
			},
			error: function () {
				// alert('fail');
			}
		});
		// var hotelIntlCityJson = JSON.parse(hotelIntlCityString).InterCitys;
		// console.log(hotelIntlCityJson);

		/*租车2019-12-26*/
		var carAddressString = '';
		function searcCarCity(val, type, targetId) {
			var isletter2 = /^[a-zA-Z]+$/.test(val);
			if (val == "" || val == undefined || (isletter2 && val.length < 3)) {
				var content = ""
				$('.kucity').hide()
				return false;
			} else {
				var content = val
			}
			var carData = {
				// url: $.session.get('obtCompany')+"/SystemService.svc/InitCarCityPost",
				// jsonStr:'{"key":'+$.session.get('netLoginId')+'}',
				url: $.session.get('obtCompany') + "/SystemService.svc/SearchCarCityLocationPost",
				jsonStr: '{"id":' + $.session.get('netLoginId') + ',"content":"' + content + '","language":"' + obtLanguage + '"}'
			}
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: carData,
				async: false,
				success: function (data) {
					$('body').mLoading("hide");
					// carAddressString = data;
					// cityList(JSON.parse(data).cityList,carAddress)//格式化数据
					// carAddressJson = JSON.parse(data).cityList;

					// cityList(JSON.parse(data),carAddress)//格式化数据
					carAddressJson = JSON.parse(data);
					//   var res = JSON.parse(data);
					//   console.log(res);


					if (type == 'search') {
						$('.kucity').show()
						this.container = $('.kucity');
						this.resultct = $('.result');

						var arr = carAddressJson.cityList
						var itembox = $('<div class="kucity_item">');
						var len = arr.length,
							str = '';
						$('.result').html()
						arr.map(function (item) {
							if (!!len) {
								var searchCode = item.AirPortCode;
								str += '<li><span class="vendervode" style="display:none"></span><span class="name" code="' + searchCode + '" locationcode="">' + item.AirPortNameCn + '</span><span class="letter">' + item.AirPortNameEn + '</span>' + '(' + searchCode + ')' + '</li>'
							}
						})
						if (arr.length == 0) {
							$('.airTitle').hide()
						} else {
							$('.airTitle').show()
						}
						$('.airResult').append(str)
						$('.airResult').find('li').eq(0).addClass('active');
						//市内租车
						var locationArr = carAddressJson.locationList

						var len = locationArr.length,
							locationStr = '';
						var carCompanyID = ""
						if (targetId == "carArrival") {
							carCompanyID = $("#carDeparture").attr('vendervode')
						}
						// if(obtLanguage=="CN"){
						locationArr.map(function (item) {
							if (!!len) {
								var searchCode = item.AirPortCode;
								var cityCode = item.CityCode ? item.CityCode : "";
								var LocationCode = item.LocationCode
								var city = obtLanguage == "CN" ? item.LocationNameCn : item.LocationNameEn
								var LocationAddress = obtLanguage == "CN" ? item.LocationAddressCn : item.LocationAddressEn
								if (carCompanyID == "") {
									locationStr += '<li><span class="vendervode" style="display:none">' + item.VenderCode + '</span><span class="letter" style="display:none">' + item.LocationNameEn + '</span><span class="name" code="' + searchCode + '" locationcode="' + LocationCode + '">' + city + '</span>(' + cityCode + ')' + ' - ' + item.VenderCode + '<div class="carAddress">' + LocationAddress + '</div></li>'
								} else if (carCompanyID == item.VenderCode) {
									locationStr += '<li><span class="vendervode" style="display:none">' + item.VenderCode + '</span><span class="letter" style="display:none">' + item.LocationNameEn + '</span><span class="name" code="' + searchCode + '" locationcode="' + LocationCode + '">' + city + '</span>(' + cityCode + ')' + ' - ' + item.VenderCode + '<div class="carAddress">' + LocationAddress + '</div></li>'
								}
							}
						})
						// }else{

						// }
						if (locationArr.length == 0 && arr.length == 0) {
							$('.locationTitle').hide()
							if ($.session.get('obtLanguage') == "CN") {
								$('.locationResult').html('<li>没有找到<span class="noresult">' + val + '</span>相关信息</li>');
							} else if ($.session.get('obtLanguage') == "EN") {
								$('.locationResult').html('<li> No information about<span class="noresult">' + val + '</span>was found</li>');
							}
						} else {
							$('.locationTitle').show()
						}
						$('.locationResult').append(locationStr)
					}
				},
				error: function () {
					// alert('fail');
				}
			});
		}
		searcCarCity()
		// var carAddressJson = JSON.parse(carAddressString);
		// console.log(carAddressJson)
		/*end*/

		function newCityData(cityJson, city, cityType) {
			if (TAnumber && $.session.get('TAOneCity') != 1) {
				cityJson.shift();
				cityJson.map(function (item) {
					if (item.Value.length != 0) {
						item.Value.map(function (sItem) {
							var f = true
							city.hot["hot"].map(function (cItem) {
								if (cityType == "2") {
									if (cItem.ThreeCode == sItem.ThreeCode) {
										f = false
									}
								} else {
									if (cItem.Code == sItem.Code) {
										f = false
									}
								}
							})
							if (f) {
								city.hot["hot"].push(sItem);
							}
						})
					}
				})
			} else {
				cityJson.map(function (item) {
					if (item.Key == "热门" || item.Key == "#") {
						if (item.Value.length != 0) {
							item.Value.map(function (sItem) {
								city.hot["hot"].push(sItem);
							})
						}
					}
				})
			}

		}

		function cityData(cityJson, city) {
			cityJson.map(function (item) {
				if (item.Key == "热门" || item.Key == "#") {
					if (item.Value.length != 0) {
						item.Value.map(function (sItem) {
							city.hot["hot"].push(sItem);
						})
					}
				}
			})

		}
		// console.log(hotelCity);

		var KuCity = function (target) {
			this.target = target; // 输入框
			this.container = null; //插件容器
			this.resultct = null; //搜索结果容器
			this.isKeyslect = false; //是否在用上下键选择
			this.isContainerExit = false; // 插件容器是否已存在
			this.targetId = '';
		};

		KuCity.prototype = {
			constructor: KuCity,
			//初始化
			init: function () {
				this.creatItem();
				this.tabChange();
				this.citySelect();
				this.inputSearch();
				this.keySelect();
				this.stopPropagation();
			},
			//创建市列表
			creatItem: function () {
				var targetId = this.targetId;
				if (targetId == "domDepartureCity" || targetId == "domArrivalCity" || this.target.context.className.indexOf("domMultipleDeparture") != -1 || this.target.context.className.indexOf("domMultipleArrivel") != -1) {
					var city = domCity;
				}
				else if (targetId == "intlDepartureCity") {
					var city = intlDomCity;
				}
				else if (targetId == "transitCity" || targetId == "intlArrivalCity" || this.target.context.className.indexOf("MultipleDepartureCity") != -1 || this.target.context.className.indexOf("MultipleArrivelCity") != -1) {
					var city = intlCity;
				}
				else if (targetId == "carDeparture" || targetId == "carArrival") {
					var city = carAddress;
				}
				else if (targetId == "trainDepartureCity" || targetId == "trainArrivalCity") {
					var city = trainCity;
				}
				else if (targetId == "hotelCity" || targetId == 'hotelIntlCity') {
					var city = hotelIntlCity;
				}
				// if(this.isContainerExit) return;
				$(".kucity").remove();
				if (ProfileInfo.onlineStyle == "APPLE") {
					var template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header"></h3><ul class="kucity_nav flexRow"><li class="active">Key</li><li>ABCDEFGH</li><li>IJKLMNOP</li><li>QRSTUVWXYZ</li></ul><div class="kucity_body"></div></div><ul class="result"></ul></div>';
				} else {
					console.log(city)
					// console.log(cityJson)
					var hotKey = obtLanguage == "CN" ? "热门" : "Hot"
					// <li class="active">Key</li>
					// 1.6修改
					var template = '\
					<div class="kucity">\
						<div class="citybox">\
							<h3 class="kucity_header"></h3>\
							<div class="kucity_body"></div>\
						</div>\
						<ul class="result"></ul>\
					</div>';
					if (TAnumber && $.session.get('TAOneCity') != 1) {
						template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header"></h3><div class="kucity_body"></div></div><ul class="result"></ul></div>';
					}
				}

				if (targetId != "carDeparture" && targetId != "carArrival") {
					$(".kucity_body").html('');
					$(".result").html('');
					$('body').append(template);

					this.container = $('.kucity');
					this.resultct = $('.result');

					for (var group in city) {
						var itemKey = [];
						for (var item in city[group]) {
							itemKey.push(item);
						}
						itemKey.sort();
						var itembox = $('<div class="kucity_item">');
						itembox.addClass(group);

						for (var i = 0, iLen = itemKey.length; i < iLen; i++) {
							var popular = $.session.get('obtLanguage') === 'CN' ? '热门地点' : 'Popular Destinations'

							var dl = $('<dl>'),
								dt = '<dt>' + ((itemKey[i] == 'hot' || itemKey[i] == '#') ? popular : itemKey[i]) + '</dt>',
								dd = $('<dd>'),
								str = '';
							// console.log(city);
							for (var j = 0, jLen = city[group][itemKey[i]].length; j < jLen; j++) {
								var code = city[group][itemKey[i]][j].Code == null ? city[group][itemKey[i]][j].ThreeCode : city[group][itemKey[i]][j].Code;
								var citycode = city[group][itemKey[i]][j].CityCode == null ? city[group][itemKey[i]][j].ThreeCode : city[group][itemKey[i]][j].CityCode;
								citycode = citycode ? citycode : ""
								switch ($.session.get('obtLanguage')) {
									case 'CN':
										str += '<span code=' + code + ' citycode="' + citycode + '" cn="' + city[group][itemKey[i]][j].NameCN + '" en="' + city[group][itemKey[i]][j].NameEN + '">' + city[group][itemKey[i]][j].NameCN + '</span>'
										break;
									case 'EN':
										str += '<span code=' + code + ' citycode="' + citycode + '" cn="' + city[group][itemKey[i]][j].NameCN + '" en="' + city[group][itemKey[i]][j].NameEN + '">' + city[group][itemKey[i]][j].NameEN + '</span>'
										break;
								}
								// str += '<span>' + city[group][itemKey[i]][j].NameCN + '</span>'
							}

							dd.append(str);
							dl.append(dt).append(dd);
							itembox.append(dl);
						}
						$('.kucity_body').append(itembox);
						this.container.find('.hot').addClass('active');
					}

					if (localStorage.getItem('recentSearch') && JSON.parse(localStorage.getItem('recentSearch')).hotel && targetId == "hotelCity") {
						var recentHotel = JSON.parse(localStorage.getItem('recentSearch')).hotel
						console.log(recentHotel)

						var dl = $('<dl>'),
							dt = '<dt>' + ($.session.get('obtLanguage') === 'CN' ? '最近搜索' : 'Recent Searches') + '</dt>',
							dd = $('<dd>'),
							str = '';
						recentHotel.map(function (hotel) {
							switch ($.session.get('obtLanguage')) {
								case 'CN':
									var text = hotel.cn
									break;
								case 'EN':
									var text = hotel.en
									break;
							}
							var dateRange = hotel.departureDate + ' - ' + hotel.returnDate
							str += '<div code=' + hotel.hotelCode + ' cn="' + hotel.cn + '" en="' + hotel.en + '" class="kuCity_recentItem">\
										<span class="kuCity_destination" code=' + hotel.hotelCode + ' cityCode=' + hotel.hotelCode + ' cn="' + hotel.cn + '" en="' + hotel.en + '" \
											departureDate="' + hotel.departureDate + '" returnDate="' + hotel.returnDate + '">' + text + '</span>\
										<b class="kuCity_dateRange">'+ dateRange + '</b>\
									</div>'
						})
						dd.append(str);
						dl.append(dt).append(dd);
						this.container.find('.hot').prepend(dl);
					} else if (localStorage.getItem('recentSearch') && JSON.parse(localStorage.getItem('recentSearch')).air && ['intlDepartureCity', 'intlArrivalCity'].indexOf(targetId) > -1) {
						var recentRail = JSON.parse(localStorage.getItem('recentSearch')).air
						console.log(recentRail)
						var dl = $('<dl>'),
							dt = '<dt>' + ($.session.get('obtLanguage') === 'CN' ? '最近搜索' : 'Recent Searches') + '</dt>',
							dd = $('<dd>'),
							str = '';
						recentRail.map(function (air) {
							switch ($.session.get('obtLanguage')) {
								case 'CN':
									var text = air.departureCityName.cn + ' - ' + air.arrivalCityName.cn
									break;
								case 'EN':
									var text = air.departureCityName.en + ' - ' + air.arrivalCityName.en
									break;
							}
							var returnDate = air.returndate || ''
							var dateRange = '<p>' + air.date + '</p><p>&nbsp- ' + returnDate + '</p>'
							str += '<div class="kuCity_recentItem">\
										<span class="kuCity_destination" departureCode="' + air.departureCity + '" arrivalCode="' + air.arrivalCity + '" \
											departureCn="' + air.departureCityName.cn + '" departureEn="' + air.departureCityName.en + '" \
											arrivalCn="' + air.arrivalCityName.cn + '" arrivalEn="' + air.arrivalCityName.en + '" \
											departureDate="' + air.date + '" returnDate="' + returnDate + '" type="' + air.type + '">' + text + '</span>\
										<b class="kuCity_dateRange">'+ dateRange + '</b>\
									</div>'
						})
						dd.append(str);
						dl.append(dt).append(dd);
						this.container.find('.hot').prepend(dl);
					} else if (localStorage.getItem('recentSearch') && JSON.parse(localStorage.getItem('recentSearch')).rail && ['trainDepartureCity', 'trainArrivalCity'].indexOf(targetId) > -1) {
						var recentRail = JSON.parse(localStorage.getItem('recentSearch')).rail
						console.log(recentRail)
						var dl = $('<dl>'),
							dt = '<dt>' + ($.session.get('obtLanguage') === 'CN' ? '最近搜索' : 'Recent Searches') + '</dt>',
							dd = $('<dd>'),
							str = '';
						recentRail.map(function (rail) {
							switch ($.session.get('obtLanguage')) {
								case 'CN':
									var text = rail.departureCityName.cn + ' - ' + rail.arrivalCityName.cn
									break;
								case 'EN':
									var text = rail.departureCityName.en + ' - ' + rail.arrivalCityName.en
									break;
							}
							var returnDate = rail.returndate || ''
							var dateRange = '<p>' + rail.date + '</p><p>&nbsp- ' + returnDate + '</p>'
							str += '<div class="kuCity_recentItem">\
										<span class="kuCity_destination" departureCode="' + rail.departureCity + '" arrivalCode="' + rail.arrivalCity + '" \
											departureCn="' + rail.departureCityName.cn + '" departureEn="' + rail.departureCityName.en + '" \
											arrivalCn="' + rail.arrivalCityName.cn + '" arrivalEn="' + rail.arrivalCityName.en + '" \
											departureDate="' + rail.date + '" returnDate="' + returnDate + '" type="' + rail.type + '">' + text + '</span>\
										<b class="kuCity_dateRange">'+ dateRange + '</b>\
									</div>'
						})
						dd.append(str);
						dl.append(dt).append(dd);
						this.container.find('.hot').prepend(dl);
					}
					if (JSON.parse($.session.get('ProfileInfo')).onlineStyle == "APPLE") {
						$(".kucity_item dd span").css("width", "100%");
					}
					this.isContainerExit = true;
				} else if (targetId == "carDeparture" || targetId == "carArrival") {
					var air = obtLanguage == "CN" ? "机场租车点" : "Airport Rental Locations";
					var city = obtLanguage == "CN" ? "市内租车点" : "City Suggestions";
					var template = '\
					<div class="kucity">\
						<div class="citybox">\
							<h3 class="kucity_header"></h3>\
							<div class="kucity_body"></div>\
						</div>\
						<p class="airTitle">'+ air + '</p>\
						<ul class="result airResult"></ul>\
						<p class="locationTitle">'+ city + '</p>\
						<ul class="result locationResult"></ul>\
					</div>';

					// $(".kucity_body").html('');

					$(".result").html('');
					$('body').append(template);

					this.container = $('.kucity');
					this.resultct = $('.result');
					if ($('#' + targetId).val() == "") {
						return false;
					}
					var arr = carAddressJson.cityList
					var itembox = $('<div class="kucity_item">');
					var len = arr.length,
						str = '';
					$('.result').html()

					arr.map(function (item) {
						if (!!len) {
							var searchCode = item.AirPortCode;
							str += '<li><span class="vendervode" style="display:none"></span><span class="name" code="' + searchCode + '" locationcode="">' + item.AirPortNameCn + '</span><span class="letter">' + item.AirPortNameEn + '</span>' + '(' + searchCode + ')' + '</li>'
						}
					})
					if (arr.length == 0) {
						$('.airTitle').hide()
					} else {
						$('.airTitle').show()
					}
					$('.airResult').append(str)
					$('.airResult').find('li').eq(0).addClass('active');
					//市内租车
					var locationArr = carAddressJson.locationList
					var len = locationArr.length,
						locationStr = '';

					var carCompanyID = ""

					if (targetId == "carArrival") {
						carCompanyID = $("#carDeparture").attr('vendervode')
					}

					locationArr.map(function (item) {
						if (!!len) {
							var searchCode = item.AirPortCode;
							var cityCode = item.CityCode ? item.CityCode : "";
							var LocationCode = item.LocationCode
							var city = obtLanguage == "CN" ? item.LocationNameCn : item.LocationNameEn
							var LocationAddress = obtLanguage == "CN" ? item.LocationAddressCn : item.LocationAddressEn
							if (carCompanyID == "") {
								locationStr += '<li><span class="vendervode" style="display:none">' + item.VenderCode + '</span><span class="letter" style="display:none">' + item.LocationNameEn + '</span><span class="name" code="' + searchCode + '" locationcode="' + LocationCode + '">' + city + '</span>(' + cityCode + ')' + ' - ' + item.VenderCode + '<div class="carAddress">' + LocationAddress + '</div></li>'
							} else if (carCompanyID == item.VenderCode) {
								locationStr += '<li><span class="vendervode" style="display:none">' + item.VenderCode + '</span><span class="letter" style="display:none">' + item.LocationNameEn + '</span><span class="name" code="' + searchCode + '" locationcode="' + LocationCode + '">' + city + '</span>(' + cityCode + ')' + ' - ' + item.VenderCode + '<div class="carAddress">' + LocationAddress + '</div></li>'
							}
						}
					})
					if (locationArr.length == 0) {
						$('.locationTitle').hide()
					} else {
						$('.locationTitle').show()
					}

					$('.locationResult').append(locationStr)


				}
			},
			//创建搜索结果列表
			creatResult: function (city, value, type, targetId) {
				// console.log(city);
				if (type == 'car') {
					console.log(value)
					if (value == "") {
						$('.kucity').hide();
						// return false;
					}
					$('.result').html('')
					searcCarCity(value, 'search', targetId)
				} else {
					var allCity = [];
					city.map(function (item) {
						if (item.Key != "热门" && item.Key != "#") {
							item.Value.map(function (cItem) {
								var searchCode = cItem.Code == null ? cItem.ThreeCode : cItem.Code;
								if (cItem.NameCN.indexOf(value) != -1 || cItem.NameEN.toUpperCase().split(' ').join('').indexOf(value.toUpperCase()) != -1 || searchCode.toUpperCase().indexOf(value.toUpperCase()) != -1) {
									allCity.push(cItem);
								}
							})
						}
					})
					function City(city, value) {
						this._searchCode = city.Code == null ? city.ThreeCode : city.Code
						this._value = value
						this._index = {
							nameCN: city.NameCN.indexOf(this._value),
							nameEN: city.NameEN.toUpperCase().split(' ').join('').indexOf(this._value.toUpperCase()),
							code: this._searchCode.toUpperCase().indexOf(this._value.toUpperCase())
						}
						return this._index.nameCN > -1
							? this._index.nameCN
							: this._index.nameEN > -1
								? this._index.nameEN
								: this._index.code
					}
					allCity.sort(function (a, b) {
						// 按照搜索字母顺序排序
						var cityA = City(a, value)
						var cityB = City(b, value)
						return cityA - cityB
					})
					// console.log(allCity);
					var len = allCity.length,
						str = '';
					if (!!len) {
						for (var i = 0; i < len; i++) {
							var searchCode = allCity[i].ThreeCode && allCity[i].ThreeCode != null ? allCity[i].ThreeCode : allCity[i].Code;
							// var searchCode = allCity[i].Code==null?allCity[i].ThreeCode:allCity[i].Code;
							var CityCode = allCity[i].Code == null ? allCity[i].ThreeCode : allCity[i].Code;
							CityCode = CityCode ? CityCode : ""
							str += '<li>\
									<span class="name" citycode="'+ CityCode + '" code="' + searchCode + '" cn="' + allCity[i].NameCN + '" en="' + allCity[i].NameEN + '">' + allCity[i].NameCN + '</span>\
									<span class="letter">' + allCity[i].NameEN + '</span>' + '(' + searchCode + ')' + '\
								</li>'
						}
						this.container.find('.result').html('').html(str).find('li').eq(0).addClass('active');
					} else {
						if ($.session.get('obtLanguage') == "CN") {
							this.container.find('.result').html('<li>没有找到<span class="noresult">' + value + '</span>相关信息</li>');
						} else if ($.session.get('obtLanguage') == "EN") {
							this.container.find('.result').html('<li> No information about<span class="noresult">' + value + '</span>was found</li>');
						}
					}
				}


			},
			//列表切换
			tabChange: function () {
				$('.kucity_nav').on('click', 'li', function (e) {
					var current = $(e.target),
						index = current.index();

					current.addClass('active').siblings().removeClass('active');
					$('.kucity_item').eq(index).addClass('active').siblings().removeClass('active');
					$(' .kucity_body').scrollTop(0);

				})
			},
			//城市选择
			citySelect: function () {
				var self = this;
				$('.kucity_item dd').on('click', 'span', function (e) {
					if (self.target.attr("id") == "hotelCity" || self.target.attr("id") == "hotelIntlCity") {
						$('body').mLoading("show");
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
								jsonStr: '{"cityCode":"' + ($(e.target).attr('code')) + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate").val() + '","checkOut":"' + $("#hotelReturnDate").val() + '"}'
							},
							success: function (data) {
								var res = JSON.parse(data);
								console.log(res);

								// 12.24 删除币种
								// var hotelType=$('input[name="hotel"]:checked')[0].id
								if (JSON.parse($.session.get('ProfileInfo')).onlineStyle == "APPLE") {
									var hotelType = $('input[name="applehotel"]:checked')[0].id
								} else {
									var hotelType = $('input[name="hotelState"]:checked').attr('state')
								}
								console.log(hotelType)
								// if(hotelType=="domHotel"){
								// 	$("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
								// }
								if (hotelType == "2") {
									$(".search_price_text").text(res.minFare + '-' + res.maxFare);
								} else {
									$(".search_price_text").text(res.minFare + '-' + res.maxFare + ProfileInfo.OfficeCurrency);
								}
								$(".search_price_text").attr("minPrice", res.minFare);
								$(".search_price_text").attr("maxPrice", res.maxFare);
								$('.searchMinPrice').val(res.minFare).change()
								$('.searchMaxPrice').val(res.maxFare).change()
								$.ajax({
									type: 'post',
									url: $.session.get('ajaxUrl'),
									dataType: 'json',
									data: {
										url: $.session.get('obtCompany') + "/QueryService.svc/GetCustomerCompanyAddressPost",
										jsonStr: '{"cityCode":"' + ($(e.target).attr('code')) + '","id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
									},
									success: function (data) {
										$('body').mLoading("hide");
										var res = JSON.parse(data);
										console.log(res);
										//中心城市经纬度
										if ((res.latitude && res.longitude) && (res.latitude != 0 || res.longitude != 0)) {
											$.session.set('centerLat', res.latitude);
											$.session.set('centerLng', res.longitude);
										} else {
											$.session.remove('centerLat');
											$.session.remove('centerLng');
										}
										$("#hotel_addr").val('').removeAttr('longitude').removeAttr('latitude');
										if (res.companyInfos.length == 0) {
											$("#hotelAddressSelect").addClass("hide");
										} else {
											$("#hotelAddressSelect").removeClass("hide");
											if ($.session.get('obtLanguage') == "CN") {
												$("#hotelAddressSelect").html('<option value="">请选择公司</option>');
											} else if ($.session.get('obtLanguage') == "EN") {
												$("#hotelAddressSelect").html('<option value="">Please select</option>');
											}
											res.companyInfos.map(function (item) {
												if (item.CompanyAddress != "") {
													$(".search_hotelAddress_options").append('<li class="search_hotelAddress_option" value="' + item.CompanyAddress + '" key="' + item.Key + '">' + item.CompanyName + '</li>')
												}
											})
											// /*酒店位置*/
											// $("#hotelAddressSelect").change(function () {
											// 	$("#hotel_addr").val($('#hotelAddressSelect option:selected').val());
											// 	$("#hotel_addr").attr("key", $('#hotelAddressSelect option:selected').attr("key"));
											// })
											$(".search_hotelAddress_options li").click(function (e) {
												$("#hotel_addr").val($(this).attr("key"));
												$("#hotel_addr").attr("key", $(this).attr("key"));
												$('.search_hotelAddress_options').addClass('hide')
											})
										}
									},
									error: function () {
										// alert('fail'); 
									}
								});
							},
							error: function () {
								// alert('fail'); 
							}
						});
					}
					if (self.target.context.className.indexOf("MultipleArrivelCity") != -1) {
						var inputIndex = parseInt(self.target.attr("inputIndex")) + 1;
						if (self.target.attr("inputIndex") != $(".MultipleArrivelCity").length - 1) {
							$(".MultipleDepartureCity").eq(inputIndex).val(($(e.target).text()));
							$(".MultipleDepartureCity").eq(inputIndex).getRecentInfoFrom($(e.target))
						}
					}
					if (self.target.context.className.indexOf("domMultipleArrivel") != -1) {
						var inputIndex = parseInt(self.target.attr("inputIndex")) + 1;
						if (self.target.attr("inputIndex") != $(".domMultipleArrivel").length - 1) {
							$(".domMultipleDeparture").eq(inputIndex).val(($(e.target).text()));
							$(".domMultipleDeparture").eq(inputIndex).attr("code", ($(e.target).attr('code')));
						}
					}


					if (self.target.attr("id") == "carDeparture") {
						$("#carArrival").attr("locationcode", ($(e.target).attr('locationcode')));
						$("#carArrival").val(($(e.target).text()));
						$("#carArrival").attr("code", ($(e.target).attr('code')));
					}
					self.target.val(($(e.target).text()));
					self.target.getRecentInfoFrom($(e.target))
					self.container.hide();
					function PrefixZero(num, n) {
						return (Array(n).join(0) + num).slice(-n);
					}
					function renderDate(departureDom, returnDom) {
						var date = new Date()
						var departureDate = $(e.target).attr('departureDate')
						returnDate = null
						if ($(e.target).attr('returnDate')) {
							returnDate = $(e.target).attr('returnDate')
						}
						var today = [date.getFullYear(), PrefixZero(date.getMonth() + 1, 2), PrefixZero(date.getDate(), 2)].join('-')
						console.log(today, departureDate, today <= departureDate)
						if (today <= departureDate) {
							$('#' + departureDom).val(departureDate)
							if (returnDate) {
								$('#' + returnDom).val(returnDate)
							}
							var returnDateDom = returnDate ? returnDom : ''
							dateChoose(departureDom, returnDateDom);
						}
					}
					if (['intlDepartureCity', 'intlArrivalCity', 'trainDepartureCity', 'trainArrivalCity'].indexOf(self.target.attr('id')) > -1) {
						if ($(e.target).attr('type')) {
							// 最近搜索
							var departureCode = $(e.target).attr('departureCode'),
								arrivalCode = $(e.target).attr('arrivalCode'),
								departureCn = $(e.target).attr('departureCn'),
								departureEn = $(e.target).attr('departureEn'),
								arrivalCn = $(e.target).attr('arrivalCn'),
								arrivalEn = $(e.target).attr('arrivalEn'),
								type = $(e.target).attr('type'),
								departureCity = $.session.get('obtLanguage') == "EN" ? $(e.target).attr('departureEn') : $(e.target).attr('departureCn'),
								arrivalCity = $.session.get('obtLanguage') == "EN" ? $(e.target).attr('arrivalEn') : $(e.target).attr('arrivalCn')
							$('#intlDepartureCity').val(departureCity).attr('code', departureCode).attr('cn', departureCn).attr('en', departureEn)
							$('#trainDepartureCity').val(departureCity).attr('code', departureCode).attr('cn', departureCn).attr('en', departureEn)
							$('#intlArrivalCity').val(arrivalCity).attr('code', arrivalCode).attr('cn', arrivalCn).attr('en', arrivalEn)
							$('#trainArrivalCity').val(arrivalCity).attr('code', arrivalCode).attr('cn', arrivalCn).attr('en', arrivalEn)
							if (['trainDepartureCity', 'trainArrivalCity'].indexOf(self.target.attr('id')) > -1) {
								renderDate("trainDepartureDate", "trainReturnDate")
							} else {
								renderDate("intlDepartureDate", "intlReturnDate")
							}
							switch (type) {
								case 'oneWay': $('input[name="searchState"][value=1]').click(); $('input[name="searchState"][value=1]').click(); break;
								case 'roundTrip': $('input[name="searchState"][value=2]').click(); $('input[name="searchState"][value=2]').click(); break;
							}
						} else {
							// 普通搜索
							self.target.val(($(e.target).text()));
							self.target.attr("code", ($(e.target).attr('code')));
							self.target.attr("cn", ($(e.target).attr('cn')))
							self.target.attr("en", ($(e.target).attr('en')))
							self.container.hide();
						}
					}
					if (self.target.attr('id') === 'hotelCity') {
						renderDate("hotelDepartureDate", "hotelReturnDate");
					}
				})
			},
			//上下键选择搜索结果
			keySelect: function () {
				var self = this;
				this.target.unbind('keydown').on('keydown', function (e) {
					var current = self.resultct.find('.active').index();
					if (current !== -1) {
						switch (e.keyCode) {
							//上
							case 38:
								keyActive(false);
								break;
							//下
							case 40:
								keyActive(true);
								break;
							//确定
							case 13:
								self.isKeyslect = false;
								if ($.session.get('obtLanguage') == "EN") {
									self.target.val(self.resultct.find('.active .letter').text());
								} else if ($.session.get('obtLanguage') == "CN") {
									self.target.val(self.resultct.find('.active .name').text());
								}
								if (self.target.attr("id") == "hotelCity" || self.target.attr("id") == "hotelIntlCity") {
									$('body').mLoading("show");
									var code = self.resultct.find('.active .name').attr("code");
									$.ajax({
										type: 'post',
										url: $.session.get('ajaxUrl'),
										dataType: 'json',
										data: {
											url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
											jsonStr: '{"cityCode":"' + (code) + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate").val() + '","checkOut":"' + $("#hotelReturnDate").val() + '"}'
										},
										success: function (data) {
											var res = JSON.parse(data);
											console.log(res);
											// $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
											// 12.24 删除币种
											if (JSON.parse($.session.get('ProfileInfo')).onlineStyle == "APPLE") {
												var hotelType = $('input[name="applehotel"]:checked')[0].id
											} else {
												var hotelType = $('input[name="hotelState"]:checked').attr('state')
											}
											// var hotelType=$('input[name="hotel"]:checked')[0].id

											console.log(hotelType)
											if (hotelType == "1") {
												$(".search_price_text").text(res.minFare + '-' + res.maxFare + ProfileInfo.OfficeCurrency);
											}
											if (hotelType == "2") {
												$(".search_price_text").text(res.minFare + '-' + res.maxFare);
											}
											$(".search_price_text").attr("minPrice", res.minFare);
											$(".search_price_text").attr("maxPrice", res.maxFare);
											$('.searchMinPrice').val(res.minFare).change()
											$('.searchMaxPrice').val(res.maxFare).change()
											$.ajax({
												type: 'post',
												url: $.session.get('ajaxUrl'),
												dataType: 'json',
												data: {
													url: $.session.get('obtCompany') + "/QueryService.svc/GetCustomerCompanyAddressPost",
													jsonStr: '{"cityCode":"' + ($(e.target).attr('code')) + '","id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
												},
												success: function (data) {
													$('body').mLoading("hide");
													var res = JSON.parse(data);
													console.log(res);
													//中心城市经纬度
													if ((res.latitude && res.longitude) && (res.latitude != 0 || res.longitude != 0)) {
														$.session.set('centerLat', res.latitude);
														$.session.set('centerLng', res.longitude);
													} else {
														$.session.remove('centerLat');
														$.session.remove('centerLng');
													}
													$("#hotel_addr").val('').removeAttr('longitude').removeAttr('latitude');
													if (res.companyInfos.length == 0) {
														$("#hotelAddressSelect").addClass("hide");
													} else {
														$("#hotelAddressSelect").removeClass("hide");
														if ($.session.get('obtLanguage') == "CN") {
															$("#hotelAddressSelect").html('<option value="">请选择公司</option>');
														} else if ($.session.get('obtLanguage') == "EN") {
															$("#hotelAddressSelect").html('<option value="">Please select</option>');
														}
														res.companyInfos.map(function (item) {
															if (item.CompanyAddress != "") {
																$(".search_hotelAddress_options").append('<li class="search_hotelAddress_option" value="' + item.CompanyAddress + '" key="' + item.Key + '">' + item.CompanyName + '</li>')
															}
														})
														// /*酒店位置*/
														// $("#hotelAddressSelect").change(function () {
														// 	$("#hotel_addr").val($('#hotelAddressSelect option:selected').val());
														// 	$("#hotel_addr").attr("key", $('#hotelAddressSelect option:selected').attr("key"));
														// })
														$(".search_hotelAddress_options li").click(function (e) {
															$("#hotel_addr").val($(this).attr("key"));
															$("#hotel_addr").attr("key", $(this).attr("key"));
															$('.search_hotelAddress_options').addClass('hide')
														})
													}
												},
												error: function () {
													// alert('fail'); 
												}
											});
										},
										error: function () {
											// alert('fail'); 
										}
									});
								}
								if (self.target.attr("id") == "carDeparture") {
									if ($.session.get('obtLanguage') == "EN") {
										$("#carArrival").val(self.resultct.find('.active .letter').text());
									} else if ($.session.get('obtLanguage') == "CN") {
										$("#carArrival").val(self.resultct.find('.active .name').text());
									}
									$("#carArrival").attr("code", self.resultct.find('.active .name').attr("code"));
									$("#carArrival").attr("locationcode", self.resultct.find('.active .name').attr("locationcode"));
									$("#carArrival").attr("vendervode", $(this).find('.vendervode').text());
								}
								if (self.target.attr("id") == "carDeparture" || self.target.attr("id") == "carArrival") {
									kucity.target.attr('vendervode', $(this).find('.vendervode').text());
									if ($('#carDeparture').attr('vendervode') != "" || $('#carArrival').attr('vendervode') != "") {
										$('#carCompany').attr('disabled', 'disabled')
									} else {
										$('#carCompany').removeAttr('disabled')
									}
								}

								self.target.getRecentInfoFrom(self.resultct.find('.active .name'))
								self.triggleShow('all');
								self.target.blur();
								if (self.target.context.className.indexOf("MultipleArrivelCity") != -1) {
									var inputIndex = parseInt(self.target.attr("inputIndex")) + 1;
									if (self.target.attr("inputIndex") != $(".MultipleArrivelCity").length - 1) {
										if ($.session.get('obtLanguage') == "EN") {
											$(".MultipleDepartureCity").eq(inputIndex).val(self.resultct.find('.active .letter').text());
										} else if ($.session.get('obtLanguage') == "CN") {
											$(".MultipleDepartureCity").eq(inputIndex).val(self.resultct.find('.active .name').text());
										}
										$(".MultipleDepartureCity").eq(inputIndex).attr("code", self.resultct.find('.active .name').attr("code"));
									}
								}
								if (self.target.context.className.indexOf("domMultipleArrivel") != -1) {
									var inputIndex = parseInt(self.target.attr("inputIndex")) + 1;
									if (self.target.attr("inputIndex") != $(".domMultipleArrivel").length - 1) {
										if ($.session.get('obtLanguage') == "EN") {
											$(".domMultipleDeparture").eq(inputIndex).val(self.resultct.find('.active .letter').text());
										} else if ($.session.get('obtLanguage') == "CN") {
											$(".domMultipleDeparture").eq(inputIndex).val(self.resultct.find('.active .name').text());
										}
										$(".domMultipleDeparture").eq(inputIndex).attr("code", self.resultct.find('.active .name').attr("code"));
									}
								}
								break;
							default:
								self.isKeyslect = false;
								break;
						}

						function keyActive(isInorder) {
							var max = self.resultct.find('li').length - 1;
							if (isInorder) {
								current = current == max ? 0 : current + 1;
							} else {
								current = current == 0 ? max : current - 1;
							}
							self.resultct.find('li').eq(current).addClass('active').siblings().removeClass('active');
							self.isKeyslect = true;
						}
					}
				})
			},
			//搜索
			inputSearch: function () {
				var self = this;
				this.target.on('keyup', function (e) {
					if (!self.isKeyslect) {
						self.throttle(search, this);
					}
				})
				// 输入框搜索
				function search(e) {
					var targetId = self.targetId;
					// console.log(targetId)
					if (targetId == "domDepartureCity" || targetId == "domArrivalCity" || self.target.context.className.indexOf("domMultipleDeparture") != -1 || self.target.context.className.indexOf("domMultipleArrivel") != -1) {
						var city = domCityJson;
					}
					else if (targetId == "transitCity" || targetId == "intlDepartureCity" || targetId == "intlArrivalCity" || self.target.context.className.indexOf("MultipleDepartureCity") != -1 || self.target.context.className.indexOf("MultipleArrivelCity") != -1) {
						var city = intlCityJson;
					}
					else if (targetId == "trainDepartureCity" || targetId == "trainArrivalCity") {
						var city = trainCityJson;
					}
					else if (targetId == "hotelCity" || targetId == 'hotelIntlCity') {
						var city = hotelIntlCityJson;
					} else if (targetId == "carDeparture" || targetId == "carArrival") {
						var city = carAddressJson;
					}
					var container = self.container;
					self.triggleShow(false);
					var value = $(this).val().split(' ').join('');
					// console.log(value)
					//             if (value) {
					if (targetId == "carDeparture" || targetId == "carArrival") {
						self.creatResult(city, value, 'car', targetId);
					} else {
						self.creatResult(city, value);
					}
					// var url = 'https://sjipiao.alitrip.com/city_search.do?_ksTS=1439362066383_11337&lines=10&_input_charset=utf-8&needProvince=true&q=' + value;
					// $.ajax({
					//     url: url,
					//     type: 'get',
					//     dataType: 'jsonp'
					// }).done(function(re) {
					//     // console.log(re)
					//     self.creatResult(re, value);
					// })
					// } else {
					//     self.triggleShow(true);
					// }
				}
				this.target.on('blur', function (e) {
					if ($('.kucity .result').css('display') == "block") {//搜索框打开的时候,失去焦点就默认选中第一个城市
						// if(e.target.getAttribute("code")!=$('.result .active .name').attr('code')){
						var citycode = $('.result .active .name').attr('citycode')
						e.target.setAttribute("code", $('.result .active .name').attr('code'))
						e.target.setAttribute("citycode", citycode ? citycode : "")
						if (obtLanguage == "CN") {
							e.target.value = $('.result .active .name').text()
						} else {
							e.target.value = $('.result .active .letter').text()
						}
						// }
					}
				})
			},
			//列表，结果，整体 显示切换
			triggleShow: function (open) {
				var container = this.container;
				if (open === 'all') {
					container.hide()
				} else if (open) {
					container.find('.citybox').show().end().find('.result').hide();
				} else {
					container.find('.citybox').hide().end().find('.result').show();
				}
			},
			//函数节流
			throttle: function (fn, context) {
				clearTimeout(fn.tId);
				// fn.tId = setTimeout(function(){
				// 	fn.call(context);
				// }, 100)

				var timmer = new Date().getTime()
				fn.tId = setTimeout(function () {
					var thisTimmer = new Date().getTime()
					if (thisTimmer - timmer > 495) {//防止时间出错
						fn.call(context);
					}
				}, 500)

				// clearTimeout(fn.tId);
				//          fn.tId = setTimeout(function(){
				// 	fn.call(context);
				//          // }, 100)
				//          }, 300)
			},
			//阻止事件冒泡
			stopPropagation: function () {
				var self = this;
				//阻止事件冒泡
				this.container.on('mousedown', stopPropagation);
				this.target.on('mousedown', stopPropagation);
				//页面点击 隐藏
				$(document).on('mousedown', function (e) {
					self.container.hide();
				})
				function stopPropagation(e) {
					e.stopPropagation();
				}
			}
		};

		var kucity = null;
		$.fn.getRecentInfoFrom = function (dom) {
			$(this).attr("code", dom.attr('code'));
			$(this).attr("cn", dom.attr('cn'));
			$(this).attr("en", dom.attr('en'));
			$(this).attr("citycode", dom.attr('citycode'));
			$(this).attr("locationcode", dom.attr('locationcode'));
		}
		$.fn.kuCity = function (options) {
			var target = $(this);

			target.on('focus', function (e) {
				var top = $(this).offset().top + $(this).outerHeight(),
					left = $(this).offset().left;
				// kucity = kucity ? kucity : new KuCity(target);
				kucity = new KuCity(target);
				kucity.target = $(e.target);
				kucity.targetId = $(e.target).attr('id');
				kucity.init();
				kucity.container.show().offset({
					'top': top + 7,
					'left': left
				});
				kucity.triggleShow(true);
				// if(($(target).attr('id')=="carDeparture"|| $(target).attr('id')=="carArrival")&& $(target).val()==""){
				if (($(target).attr('id') == "carDeparture" || $(target).attr('id') == "carArrival")) {
					$('.kucity').hide();
					// return false;
				}
				kucity.resultct.on('click', 'li', function () {
					if ($.session.get('obtLanguage') == "EN") {
						kucity.target.val($(this).find('.letter').text());
					} else if ($.session.get('obtLanguage') == "CN") {
						kucity.target.val($(this).find('.name').text());
					}
					kucity.target.getRecentInfoFrom($(this).find('.name'))
					kucity.triggleShow('all');
					/*多段*/
					if (kucity.target.context.className.indexOf("MultipleArrivelCity") != -1) {
						var inputIndex = parseInt(kucity.target.attr("inputIndex")) + 1;
						if (kucity.target.attr("inputIndex") != $(".MultipleArrivelCity").length - 1) {
							var nextDeparture = $(".MultipleDepartureCity").eq(inputIndex)
							if ($.session.get('obtLanguage') == "EN") {
								nextDeparture.val($(this).find('.letter').text());
							} else if ($.session.get('obtLanguage') == "CN") {
								nextDeparture.val($(this).find('.name').text());
							}

							nextDeparture.getRecentInfoFrom($(this).find('.name'))
						}
					}
					//国内多段
					if (kucity.target.context.className.indexOf("domMultipleArrivel") != -1) {
						var inputIndex = parseInt(kucity.target.attr("inputIndex")) + 1;
						console.log(inputIndex)
						console.log($(".domMultipleDeparture").eq(inputIndex))
						if (kucity.target.attr("inputIndex") != $(".domMultipleArrivel").length - 1) {
							if ($.session.get('obtLanguage') == "EN") {
								$(".domMultipleDeparture").eq(inputIndex).val($(this).find('.letter').text());
							} else if ($.session.get('obtLanguage') == "CN") {
								$(".domMultipleDeparture").eq(inputIndex).val($(this).find('.name').text());
							}
							$(".domMultipleDeparture").eq(inputIndex).attr("code", $(this).find('.name').attr('code'));
						}
					}

					/*酒店*/
					if (kucity.target.attr("id") == "hotelCity" || kucity.target.attr("id") == "hotelIntlCity") {
						$('body').mLoading("show");
						$.ajax({
							type: 'post',
							url: $.session.get('ajaxUrl'),
							dataType: 'json',
							data: {
								url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
								jsonStr: '{"cityCode":"' + ($(kucity.target).attr('code')) + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate").val() + '","checkOut":"' + $("#hotelReturnDate").val() + '"}'
							},
							success: function (data) {
								var res = JSON.parse(data);
								console.log(res);

								// $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
								// 12.24 删除币种
								// var hotelType=$('input[name="hotel"]:checked')[0].id
								if (JSON.parse($.session.get('ProfileInfo')).onlineStyle == "APPLE") {
									var hotelType = $('input[name="applehotel"]:checked')[0].id
								} else {
									var hotelType = $('input[name="hotelState"]:checked').attr('state')
								}
								console.log(hotelType)
								if (hotelType == "1") {
									$(".search_price_text").text(res.minFare + '-' + res.maxFare + ProfileInfo.OfficeCurrency);
								}
								if (hotelType == "2") {
									$(".search_price_text").text(res.minFare + '-' + res.maxFare);
								}
								$(".search_price_text").attr("minPrice", res.minFare);
								$(".search_price_text").attr("maxPrice", res.maxFare);
								$('.searchMinPrice').val(res.minFare).change()
								$('.searchMaxPrice').val(res.maxFare).change()
								$.ajax({
									type: 'post',
									url: $.session.get('ajaxUrl'),
									dataType: 'json',
									data: {
										url: $.session.get('obtCompany') + "/QueryService.svc/GetCustomerCompanyAddressPost",
										jsonStr: '{"cityCode":"' + ($(kucity.target).attr('code')) + '","id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
									},
									success: function (data) {
										$('body').mLoading("hide");
										var res = JSON.parse(data);
										console.log(res);
										//中心城市经纬度
										if ((res.latitude && res.longitude) && (res.latitude != 0 || res.longitude != 0)) {
											$.session.set('centerLat', res.latitude);
											$.session.set('centerLng', res.longitude);
										} else {
											$.session.remove('centerLat');
											$.session.remove('centerLng');
										}
										$("#hotel_addr").val('').removeAttr('longitude').removeAttr('latitude');
										if (res.companyInfos.length == 0) {
											$("#hotelAddressSelect").addClass("hide");
										} else {
											$("#hotelAddressSelect").removeClass("hide");
											if ($.session.get('obtLanguage') == "CN") {
												$("#hotelAddressSelect").html('<option value="">请选择公司</option>');
											} else if ($.session.get('obtLanguage') == "EN") {
												$("#hotelAddressSelect").html('<option value="">Please select</option>');
											}
											res.companyInfos.map(function (item) {
												if (item.CompanyAddress != "") {
													$(".search_hotelAddress_options").append('<li class="search_hotelAddress_option" value="' + item.CompanyAddress + '" key="' + item.Key + '">' + item.CompanyName + '</li>')
												}
											})
											// /*酒店位置*/
											// $("#hotelAddressSelect").change(function () {
											// 	$("#hotel_addr").val($('#hotelAddressSelect option:selected').val());
											// 	$("#hotel_addr").attr("key", $('#hotelAddressSelect option:selected').attr("key"));
											// })
											$(".search_hotelAddress_options li").click(function (e) {
												$("#hotel_addr").val($(this).attr("key"));
												$("#hotel_addr").attr("key", $(this).attr("key"));
												$('.search_hotelAddress_options').addClass('hide')
											})
										}
									},
									error: function () {
										// alert('fail'); 
									}
								});
							},
							error: function () {
								// alert('fail'); 
							}
						});
					}
					/*租车*/
					if (kucity.target.attr("id") == "carDeparture") {
						if ($.session.get('obtLanguage') == "EN") {
							$("#carArrival").val($(this).find('.letter').text());
						} else if ($.session.get('obtLanguage') == "CN") {
							$("#carArrival").val($(this).find('.name').text());
						}
						$("#carArrival").attr("code", $(this).find('.name').attr('code'));
						$("#carArrival").attr("locationcode", $(this).find('.name').attr('locationcode'));
						$("#carArrival").attr("vendervode", $(this).find('.vendervode').text());
					}
					if (kucity.target.attr("id") == "carDeparture" || kucity.target.attr("id") == "carArrival") {
						kucity.target.attr('vendervode', $(this).find('.vendervode').text());
						if ($('#carDeparture').attr('vendervode') != "" || $('#carArrival').attr('vendervode') != "") {
							$('#carCompany').attr('disabled', 'disabled')
						} else {
							$('#carCompany').removeAttr('disabled')
						}
					}
				})
			})
			return this;
		};
	})(jQuery)
} else {
	// 旧版
	(function ($) {
		$('body').mLoading("show");
		var TAnumber = $.session.get('TAnumber') ? $.session.get('TAnumber') : '';
		var TAnumberIndex = $.session.get('TAnumberIndex');
		var TAnumbertest = window.sessionStorage.getItem('TAnumber')
		var obtLanguage = $.session.get('obtLanguage');
		var seatNUm = $.session.get('cityTAnumber');
		var cityTAnumber = $.session.set('cityTAnumber')
		//ThreeCode是租车使用的，以后有需求请做特殊处理

		// 判断是否是json字符串


		// 各模块城市缓存
		var domCityJson = "", intlCityJson = "", intlDomCityJson = "", trainCityJson = ""
		var hotelCityJson = "", hotelIntlCityJson = "", carAddressJson = ""

		function isJsonString(str) {
			try {
				if (typeof JSON.parse(str) == "object") {
					return true;
				}
			} catch (e) {
			}
			return false;
		}
		//构建城市分类字面量
		if (ProfileInfo.onlineStyle == "APPLE") {
			var domCity = {
				hot: {
					hot: []
				},
				ABCDEFGH: {
				},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var intlCity = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var intlDomCity = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var trainCity = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var hotelCity = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var hotelIntlCity = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
			var carAddress = {
				hot: { hot: [] },
				ABCDEFGH: {},
				IJKLMNOP: {},
				QRSTUVWXYZ: {}
			};
		} else {
			var domCity = {
				hot: {
					hot: []
				},
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var intlCity = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var intlDomCity = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var trainCity = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var hotelCity = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var hotelIntlCity = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
			var carAddress = {
				hot: { hot: [] },
				A: {}, B: {}, C: {}, D: {}, E: {}, F: {}, G: {}, H: {},
				I: {}, J: {}, K: {}, L: {}, M: {}, N: {}, O: {}, P: {},
				Q: {}, R: {}, S: {}, T: {}, U: {}, V: {}, W: {}, X: {}, Y: {}, Z: {}
			};
		}
		// 生成城市列表
		function cityList(json, city, cityType) {

			if (ProfileInfo.onlineStyle == "APPLE") {
				cityData(json, city, cityType);
				// cityData(domCityJson,domCity);
				// cityData(intlCityJson,intlCity);
				// cityData(intlDomCityJson,intlDomCity);
				// cityData(trainCityJson,trainCity);
				// cityData(hotelCityJson,hotelCity);
				// cityData(hotelIntlCityJson,hotelIntlCity);
				// /*car*/ 
				// cityData(carAddressJson,carAddress);
			} else {
				newCityData(json, city, cityType);
				// newCityData(domCityJson,domCity);
				// newCityData(intlCityJson,intlCity);
				// newCityData(intlDomCityJson,intlDomCity);
				// newCityData(trainCityJson,trainCity);
				// newCityData(hotelCityJson,hotelCity);
				// newCityData(hotelIntlCityJson,hotelIntlCity);
				// /*car*/ 
				// newCityData(carAddressJson,carAddress);
			}
		}


		// 获取TA单限制的城市
		function cityFilter(cityType, jsonList, cityDom, airType) {
			var userid = netUserId.split("\"")[1]
			//不再进行过滤，由后台完成
			cityList(jsonList, cityDom, cityType)
			return false;
			console.log(jsonList)
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/SystemService.svc/GetTravelRequestCityInfo",
					jsonStr: '{"travelRequestNo":"' + TAnumber + '","key":"' + userid + '","count":""}'
				},
				success: function (data) {
					if (data == '' || data == "[]") {
						// alert('没有权限')
						// HotelGKBooking(orderRes,type,false);
						return "[]"
					} else {
						var o1 = JSON.parse(data)
						var o2 = jsonList
						o2.shift()
						// a1去重
						var a1New = []
						o1.map(function (aItem) {
							var f = true
							if (aItem.serviceType == cityType || aItem.serviceType == 0) {
								a1New.push(aItem)
							}
						})
						// a2去重
						var endArr = []
						var a2 = o2.filter(function (item) {
							return item.Value.length > 0
						})
						// endArr 是所有的城市
						// 遍历原数组
						var newobjArr = []
						a2.map(function (a2Item) {
							var arr = a2Item.Value.filter(function (vItem) {
								var f = false
								a1New.map(function (nItem) {
									if (cityType == 1 && (airType == "intel" || airType == "dom")) {
										if (nItem.Code == vItem.CityCode) {
											f = true
										}
									} else if (cityType == 2) {
										if (nItem.Code == vItem.ThreeCode) {
											f = true
										}
									} else if (cityType == 4) {
										if (nItem.NameCN == vItem.NameCN) {
											f = true
										}
									} else {
										if (nItem.Code == vItem.Code) {
											f = true
										}
									}
								})
								if (f) { return vItem }
							})
							var o = {
								Key: a2Item.Key,
								Value: arr
							}
							if (arr.length > 0) {
								newobjArr.push(o)
							}
						})
						setTimeout(function () {
							cityList(newobjArr, cityDom, cityType)
							// cityList(jsonList,cityDom,cityType)

							if (cityType == 1) {
								// 国内机票
								domCityJson = newobjArr
							}
							if (cityType == 1 && airType == "intel") {
								//国际票，国际全部
								intlCityJson = newobjArr
							}
							if (cityType == 1 && airType == "dom") {
								//国际票，主国内
								intlDomCityJson = newobjArr
							}
							if (cityType == 2 && airType == "intel") {
								//酒店
								hotelIntlCityJson = newobjArr
							}
							if (cityType == 2 && airType == "dom") {
								//酒店
								hotelCityJson = newobjArr
							}
							if (cityType == 4) {
								//火车
								trainCityJson = newobjArr
							}
						}, 100)
					}
				},
			})
		}

		// var TAnumber = tools.queryString().TAnumber;
		// List<QueryResult> InitLimitCitys(string key, string travelRequestNo);
		// jsonStr: '{"request":{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}}',



		var data1;
		// if(TAnumber && TAnumberIndex==1){
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data1 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitLimitCitys",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data1 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitCityPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		var domCityString = '';

		$.ajax(
			{
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: data1,
				async: false,
				success: function (data) {
					if (data == "" && TAnumber && TAnumberIndex) {
						// window.location.href='../../login/loginPage.html';
						if (obtLanguage == 'CN') {
							alert("出差城市信息缺失！")
						} else {
							alert("City business information missing!")
						}
					} else {
						if (TAnumber && $.session.get('TAOneCity') != 1) {
							// domCityString=data
							cityFilter("1", JSON.parse(data), domCity)
						} else {
							// domCityString = data;
							cityList(JSON.parse(data), domCity)
						}
						domCityJson = JSON.parse(data);
					}
					// var res = JSON.parse(data);
				},
				error: function () {
					// alert('fail');
				}
			}
		);
		// var domCityJson = JSON.parse(domCityString);
		var intlCityString = '';
		var data2;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data2 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitInterLimitAirport",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data2 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitInterAirportPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		//  List<CityGroup> InitInterLimitAirport(string key, string travelRequestNo);

		$.ajax(
			{
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: data2,
				async: false,
				success: function (data) {
					if (data == "" && TAnumber) {
						// if(obtLanguage=='CN'){
						// 	alert("出差城市信息缺失！")
						// }else{
						// 	alert("City business information missing!")
						// }
					} else {
						// intlCityString = data;
						if (TAnumber && $.session.get('TAOneCity') != 1) {
							// domCityString=data
							cityFilter("1", JSON.parse(data), intlCity, "intel")
						} else {
							// domCityString = data;
							cityList(JSON.parse(data), intlCity)
						}
						intlCityJson = JSON.parse(data);
					}
					// var res = JSON.parse(data);
					// console.log(res);
				},
				error: function () {
					// alert('fail');
				}
			}
		);
		// var intlCityJson = JSON.parse(intlCityString);
		// console.log(intlCityJson);
		var intlDomCityString = '';
		var data3;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data3 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitDomesticLimitAirport",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data3 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitDomesticAirportPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		// List<CityGroup> InitDomesticLimitAirport(string key, string travelRequestNo);

		$.ajax(
			{
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: data3,
				async: false,
				success: function (data) {

					if (data == "" && TAnumber) {
						// if(obtLanguage=='CN'){
						// 	alert("出差城市信息缺失！")
						// }else{
						// 	alert("City business information missing!")
						// }
					} else {
						if (TAnumber && $.session.get('TAOneCity') != 1) {
							// domCityString=data
							cityFilter("1", JSON.parse(data), intlDomCity, "dom")
						} else {
							// domCityString = data;
							cityList(JSON.parse(data), intlDomCity)
						}
						intlDomCityJson = JSON.parse(data);
						// intlDomCityString = data;
					}
					// var res = JSON.parse(data);
					// console.log(res);
				},
				error: function () {
					// alert('fail');
				}
			}
		);
		// var intlDomCityJson = JSON.parse(intlDomCityString);
		// console.log(intlDomCityJson);
		var trainCityString = '';
		var data4;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data4 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitLimitTrainCity",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data4 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitTrainCityPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		// List<QueryResult> InitLimitTrainCity(string key, string travelRequestNo);

		$.ajax(
			{
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: data4,
				async: false,
				success: function (data) {
					if (data == "" && TAnumber) {
						// if(obtLanguage=='CN'){
						// 	alert("出差城市信息缺失！")
						// }else{
						// 	alert("City business information missing!")
						// }
					} else {
						// trainCityString = data;
						if (TAnumber && $.session.get('TAOneCity') != 1) {
							// domCityString=data
							cityFilter("4", JSON.parse(data), trainCity)
						} else {
							// domCityString = data;
							cityList(JSON.parse(data), trainCity)
						}
						trainCityJson = JSON.parse(data);
					}
					// var res = JSON.parse(data);
					// console.log(res);
				},
				error: function () {
					// alert('fail');
				}
			}
		);
		// var trainCityJson = JSON.parse(trainCityString);
		// console.log(trainCityJson);
		var hotelCityString = '';
		var data5;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			// 酒店换成新接口，旧接口没有
			data5 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitHotelLimitCity",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data5 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitHotelCityPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		// List<QueryHotelCity> InitHotelLimitCity(string key, string travelRequestNo);

		$.ajax(
			{
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: data5,
				async: false,
				success: function (data) {
					if (data == "" && TAnumber) {
						// if(obtLanguage=='CN'){
						// 	alert("出差城市信息缺失！")
						// }else{
						// 	alert("City business information missing!")
						// }
					} else {
						// hotelCityString = data;
						if (TAnumber && $.session.get('TAOneCity') != 1) {
							// domCityString=data
							cityFilter("2", JSON.parse(data), hotelCity, "dom")
						} else {
							// domCityString = data;
							cityList(JSON.parse(data), hotelCity)
						}
						hotelCityJson = JSON.parse(data)
					}
					// var res = JSON.parse(data);
					// console.log(res);
				},
				error: function () {
					// alert('fail');
				}
			}
		);
		// var hotelCityJson = JSON.parse(hotelCityString);

		var hotelIntlCityString = '';
		var data6;
		if (TAnumber && $.session.get('TAOneCity') != 1) {
			// 第一次获取订单号TAnumber,如果存在订单号就用新接口，InitLimitCitys，否则InitCityPost
			data6 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitAllHotelLimitCity",
				jsonStr: '{"key":' + $.session.get('netLoginId') + ',"travelRequestNo":"' + TAnumber + '"}'
			}
		} else {
			data6 = {
				url: $.session.get('obtCompany') + "/SystemService.svc/InitAllHotelCityPost",
				jsonStr: '{"key":' + $.session.get('netLoginId') + '}'
			}
		}
		// AllHotelCity InitAllHotelLimitCity(string key, string travelRequestNo);
		$.ajax(
			{
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: data6,
				async: false,
				success: function (data) {
					$('body').mLoading("hide");
					if (data == "" && TAnumber) {
						// if(obtLanguage=='CN'){
						// 	alert("出差城市信息缺失！")
						// }else{
						// 	alert("City business information missing!")
						// }
					} else {
						// hotelIntlCityString = data;
						if (TAnumber && $.session.get('TAOneCity') != 1) {
							// domCityString=data
							cityFilter("2", JSON.parse(data).InterCitys, hotelIntlCity, "intel")
						} else {
							// domCityString = data;
							cityList(JSON.parse(data).InterCitys, hotelIntlCity)
						}
						hotelIntlCityJson = JSON.parse(data).InterCitys;
					}
					// var res = JSON.parse(data);
					// console.log(res);
				},
				error: function () {
					// alert('fail');
				}
			}
		);
		// var hotelIntlCityJson = JSON.parse(hotelIntlCityString).InterCitys;
		// console.log(hotelIntlCityJson);

		/*租车2019-12-26*/
		var carAddressString = '';
		function searcCarCity(val, type, targetId) {
			var isletter2 = /^[a-zA-Z]+$/.test(val);
			if (val == "" || val == undefined || (isletter2 && val.length < 3)) {
				var content = ""
				$('.kucity').hide()
				return false;
			} else {
				var content = val
			}
			var carData = {
				// url: $.session.get('obtCompany')+"/SystemService.svc/InitCarCityPost",
				// jsonStr:'{"key":'+$.session.get('netLoginId')+'}',
				url: $.session.get('obtCompany') + "/SystemService.svc/SearchCarCityLocationPost",
				jsonStr: '{"id":' + $.session.get('netLoginId') + ',"content":"' + content + '","language":"' + obtLanguage + '"}'
			}
			$.ajax(
				{
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: carData,
					async: false,
					success: function (data) {
						$('body').mLoading("hide");
						// carAddressString = data;
						// cityList(JSON.parse(data).cityList,carAddress)//格式化数据
						// carAddressJson = JSON.parse(data).cityList;

						// cityList(JSON.parse(data),carAddress)//格式化数据
						carAddressJson = JSON.parse(data);
						//   var res = JSON.parse(data);
						//   console.log(res);


						if (type == 'search') {
							$('.kucity').show()
							this.container = $('.kucity');
							this.resultct = $('.result');

							var arr = carAddressJson.cityList
							var itembox = $('<div class="kucity_item">');
							var len = arr.length,
								str = '';
							$('.result').html()
							arr.map(function (item) {
								if (!!len) {
									var searchCode = item.AirPortCode;
									str += '<li><span class="vendervode" style="display:none"></span><span class="name" code="' + searchCode + '" locationcode="">' + item.AirPortNameCn + '</span><span class="letter">' + item.AirPortNameEn + '</span>' + '(' + searchCode + ')' + '</li>'
								}
							})
							if (arr.length == 0) {
								$('.airTitle').hide()
							} else {
								$('.airTitle').show()
							}
							$('.airResult').append(str)
							$('.airResult').find('li').eq(0).addClass('active');
							//市内租车
							var locationArr = carAddressJson.locationList

							var len = locationArr.length,
								locationStr = '';
							var carCompanyID = ""
							if (targetId == "carArrival") {
								carCompanyID = $("#carDeparture").attr('vendervode')
							}
							// if(obtLanguage=="CN"){
							locationArr.map(function (item) {
								if (!!len) {
									var searchCode = item.AirPortCode;
									var cityCode = item.CityCode ? item.CityCode : "";
									var LocationCode = item.LocationCode
									var city = obtLanguage == "CN" ? item.LocationNameCn : item.LocationNameEn
									var LocationAddress = obtLanguage == "CN" ? item.LocationAddressCn : item.LocationAddressEn
									if (carCompanyID == "") {
										locationStr += '<li><span class="vendervode" style="display:none">' + item.VenderCode + '</span><span class="letter" style="display:none">' + item.LocationNameEn + '</span><span class="name" code="' + searchCode + '" locationcode="' + LocationCode + '">' + city + '</span>(' + cityCode + ')' + ' - ' + item.VenderCode + '<div class="carAddress">' + LocationAddress + '</div></li>'
									} else if (carCompanyID == item.VenderCode) {
										locationStr += '<li><span class="vendervode" style="display:none">' + item.VenderCode + '</span><span class="letter" style="display:none">' + item.LocationNameEn + '</span><span class="name" code="' + searchCode + '" locationcode="' + LocationCode + '">' + city + '</span>(' + cityCode + ')' + ' - ' + item.VenderCode + '<div class="carAddress">' + LocationAddress + '</div></li>'
									}
								}
							})
							// }else{

							// }
							if (locationArr.length == 0 && arr.length == 0) {
								$('.locationTitle').hide()
								if ($.session.get('obtLanguage') == "CN") {
									$('.locationResult').html('<li>没有找到<span class="noresult">' + val + '</span>相关信息</li>');
								} else if ($.session.get('obtLanguage') == "EN") {
									$('.locationResult').html('<li> No information about<span class="noresult">' + val + '</span>was found</li>');
								}
							} else {
								$('.locationTitle').show()
							}
							$('.locationResult').append(locationStr)
						}
					},
					error: function () {
						// alert('fail');
					}
				}
			);
		}
		searcCarCity()
		// var carAddressJson = JSON.parse(carAddressString);
		// console.log(carAddressJson)
		/*end*/

		function newCityData(cityJson, city, cityType) {
			var list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
			if (TAnumber && $.session.get('TAOneCity') != 1) {
				cityJson.shift();
				cityJson.map(function (item) {
					if (item.Value.length != 0) {
						item.Value.map(function (sItem) {
							var f = true
							city.hot["hot"].map(function (cItem) {
								if (cityType == "2") {
									if (cItem.ThreeCode == sItem.ThreeCode) {
										f = false
									}
								} else {
									if (cItem.Code == sItem.Code) {
										f = false
									}
								}
							})
							if (f) {
								city.hot["hot"].push(sItem);
							}
						})
					}
				})
			} else {
				cityJson.map(function (item) {
					if (item.Key == "热门" || item.Key == "#") {
						if (item.Value.length != 0) {
							item.Value.map(function (sItem) {
								city.hot["hot"].push(sItem);
							})
						}
					}
					list.map(function (letter) {
						if (item.Key == letter) {
							if (item.Value.length != 0) {
								item.Value.map(function (sItem) {
									city[letter][letter] ? city[letter][letter].push(sItem) : (city[letter][letter] = [], city[letter][letter].push(sItem));
								})
							}
						}
					})
				})
			}

		}

		function cityData(cityJson, city) {
			cityJson.map(function (item) {
				if (item.Key == "热门" || item.Key == "#") {
					if (item.Value.length != 0) {
						item.Value.map(function (sItem) {
							city.hot["hot"].push(sItem);
						})
					}
				}
				var list1 = ["A", 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
				list1.map(function (letter) {
					if (item.Key == letter) {
						if (item.Value.length != 0) {
							item.Value.map(function (sItem) {
								city["ABCDEFGH"][letter] ? city["ABCDEFGH"][letter].push(sItem) : (city["ABCDEFGH"][letter] = [], city["ABCDEFGH"][letter].push(sItem));
							})
						}
					}
				})
				var list2 = ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
				list2.map(function (letter) {
					if (item.Key == letter) {
						if (item.Value.length != 0) {
							item.Value.map(function (sItem) {
								city["IJKLMNOP"][letter] ? city["IJKLMNOP"][letter].push(sItem) : (city["IJKLMNOP"][letter] = [], city["IJKLMNOP"][letter].push(sItem));
							})
						}
					}
				})
				var list3 = ['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
				list3.map(function (letter) {
					if (item.Key == letter) {
						if (item.Value.length != 0) {
							item.Value.map(function (sItem) {
								city["QRSTUVWXYZ"][letter] ? city["QRSTUVWXYZ"][letter].push(sItem) : (city["QRSTUVWXYZ"][letter] = [], city["QRSTUVWXYZ"][letter].push(sItem));
							})
						}
					}
				})
			})

		}
		// console.log(hotelCity);

		var KuCity = function (target) {
			this.target = target; // 输入框
			this.container = null; //插件容器
			this.resultct = null; //搜索结果容器
			this.isKeyslect = false; //是否在用上下键选择
			this.isContainerExit = false; // 插件容器是否已存在
			this.targetId = '';
		};

		KuCity.prototype = {
			constructor: KuCity,
			//初始化
			init: function () {
				this.creatItem();
				this.tabChange();
				this.citySelect();
				this.inputSearch();
				this.keySelect();
				this.stopPropagation();
			},
			//创建市列表
			creatItem: function () {
				var targetId = this.targetId;
				if (targetId == "domDepartureCity" || targetId == "domArrivalCity" || this.target.context.className.indexOf("domMultipleDeparture") != -1 || this.target.context.className.indexOf("domMultipleArrivel") != -1) {
					var city = domCity;
				}
				else if (targetId == "intlDepartureCity") {
					var city = intlDomCity;
				}
				else if (targetId == "transitCity" || targetId == "intlArrivalCity" || this.target.context.className.indexOf("MultipleDepartureCity") != -1 || this.target.context.className.indexOf("MultipleArrivelCity") != -1) {
					var city = intlCity;
				}
				else if (targetId == "carDeparture" || targetId == "carArrival") {
					var city = carAddress;
				}
				else if (targetId == "trainDepartureCity" || targetId == "trainArrivalCity") {
					var city = trainCity;
				}
				else if (targetId == "hotelCity") {
					var city = hotelCity;
				}
				else if (targetId == "hotelIntlCity") {
					var city = hotelIntlCity;
				}
				// if(this.isContainerExit) return;
				$(".kucity").remove();
				if (ProfileInfo.onlineStyle == "APPLE") {
					var template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header"></h3><ul class="kucity_nav flexRow"><li class="active">Key</li><li>ABCDEFGH</li><li>IJKLMNOP</li><li>QRSTUVWXYZ</li></ul><div class="kucity_body"></div></div><ul class="result"></ul></div>';
				} else {
					console.log(city)
					// console.log(cityJson)
					var hotKey = obtLanguage == "CN" ? "热门" : "Hot"
					// <li class="active">Key</li>
					// 1.6修改
					var template = '\
						<div class="kucity">\
							<div class="citybox">\
								<h3 class="kucity_header"></h3>\
									<ul class="kucity_nav flexRow">\
										<li class="active">'+ hotKey + '</li>\
										<li>A</li>\
										<li>B</li>\
										<li>C</li>\
										<li>D</li>\
										<li>E</li>\
										<li>F</li>\
										<li>G</li>\
										<li>H</li>\
										<li>I</li>\
										<li>J</li>\
										<li>K</li>\
										<li>L</li>\
										<li>M</li>\
										<li>N</li>\
										<li>O</li>\
										<li>P</li>\
										<li>Q</li>\
										<li>R</li>\
										<li>S</li>\
										<li>T</li>\
										<li>U</li>\
										<li>V</li>\
										<li>W</li>\
										<li>X</li>\
										<li>Y</li>\
										<li>Z</li>\
									</ul>\
								<div class="kucity_body"></div>\
							</div>\
							<ul class="result"></ul>\
						</div>';
					if (TAnumber && $.session.get('TAOneCity') != 1) {
						template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header"></h3><ul class="kucity_nav flexRow"></ul><div class="kucity_body"></div></div><ul class="result"></ul></div>';
					}
				}

				if (targetId != "carDeparture" && targetId != "carArrival") {
					$(".kucity_body").html('');
					$(".result").html('');
					$('body').append(template);

					this.container = $('.kucity');
					this.resultct = $('.result');

					for (var group in city) {
						var itemKey = [];
						for (var item in city[group]) {
							itemKey.push(item);
						}
						itemKey.sort();
						var itembox = $('<div class="kucity_item">');
						itembox.addClass(group);

						for (var i = 0, iLen = itemKey.length; i < iLen; i++) {

							var dl = $('<dl>'),
								dt = '<dt>' + (itemKey[i] == 'hot' ? '' : itemKey[i]) + '</dt>',
								dd = $('<dd>'),
								str = '';
							// console.log(city);
							for (var j = 0, jLen = city[group][itemKey[i]].length; j < jLen; j++) {
								var code = city[group][itemKey[i]][j].Code == null ? city[group][itemKey[i]][j].ThreeCode : city[group][itemKey[i]][j].Code;
								var citycode = city[group][itemKey[i]][j].CityCode == null ? city[group][itemKey[i]][j].ThreeCode : city[group][itemKey[i]][j].CityCode;
								citycode = citycode ? citycode : ""
								switch ($.session.get('obtLanguage')) {
									case 'CN':
										str += '<span code="' + code + '" citycode="' + citycode + '" title="' + city[group][itemKey[i]][j].NameCN + '" cn="' + city[group][itemKey[i]][j].NameCN + '">' + city[group][itemKey[i]][j].NameCN + '</span>'
										break;
									case 'EN':
										str += '<span code="' + code + '" citycode="' + citycode + '" title="' + city[group][itemKey[i]][j].NameEN + '" cn="' + city[group][itemKey[i]][j].NameCN + '">' + city[group][itemKey[i]][j].NameEN + '</span>'
										break;
								}
								// str += '<span>' + city[group][itemKey[i]][j].NameCN + '</span>'
							}

							dd.append(str);
							dl.append(dt).append(dd);
							itembox.append(dl);
						}
						$('.kucity_body').append(itembox);
						this.container.find('.hot').addClass('active');
					}
					if (JSON.parse($.session.get('ProfileInfo')).onlineStyle == "APPLE") {
						$(".kucity_item dd span").css("width", "100%");
					}
					this.isContainerExit = true;
				} else if (targetId == "carDeparture" || targetId == "carArrival") {
					var air = obtLanguage == "CN" ? "机场租车点" : "Airport Rental Locations";
					var city = obtLanguage == "CN" ? "市内租车点" : "City Suggestions";
					var template = '\
						<div class="kucity">\
							<div class="citybox">\
								<h3 class="kucity_header"></h3>\
								<div class="kucity_body"></div>\
							</div>\
							<p class="airTitle">'+ air + '</p>\
							<ul class="result airResult"></ul>\
							<p class="locationTitle">'+ city + '</p>\
							<ul class="result locationResult"></ul>\
						</div>';

					// $(".kucity_body").html('');

					$(".result").html('');
					$('body').append(template);

					this.container = $('.kucity');
					this.resultct = $('.result');
					if ($('#' + targetId).val() == "") {
						return false;
					}
					var arr = carAddressJson.cityList
					var itembox = $('<div class="kucity_item">');
					var len = arr.length,
						str = '';
					$('.result').html()

					arr.map(function (item) {
						if (!!len) {
							var searchCode = item.AirPortCode;
							str += '<li><span class="vendervode" style="display:none"></span><span class="name" code="' + searchCode + '" locationcode="">' + item.AirPortNameCn + '</span><span class="letter">' + item.AirPortNameEn + '</span>' + '(' + searchCode + ')' + '</li>'
						}
					})
					if (arr.length == 0) {
						$('.airTitle').hide()
					} else {
						$('.airTitle').show()
					}
					$('.airResult').append(str)
					$('.airResult').find('li').eq(0).addClass('active');
					//市内租车
					var locationArr = carAddressJson.locationList
					var len = locationArr.length,
						locationStr = '';

					var carCompanyID = ""

					if (targetId == "carArrival") {
						carCompanyID = $("#carDeparture").attr('vendervode')
					}

					locationArr.map(function (item) {
						if (!!len) {
							var searchCode = item.AirPortCode;
							var cityCode = item.CityCode ? item.CityCode : "";
							var LocationCode = item.LocationCode
							var city = obtLanguage == "CN" ? item.LocationNameCn : item.LocationNameEn
							var LocationAddress = obtLanguage == "CN" ? item.LocationAddressCn : item.LocationAddressEn
							if (carCompanyID == "") {
								locationStr += '<li><span class="vendervode" style="display:none">' + item.VenderCode + '</span><span class="letter" style="display:none">' + item.LocationNameEn + '</span><span class="name" code="' + searchCode + '" locationcode="' + LocationCode + '">' + city + '</span>(' + cityCode + ')' + ' - ' + item.VenderCode + '<div class="carAddress">' + LocationAddress + '</div></li>'
							} else if (carCompanyID == item.VenderCode) {
								locationStr += '<li><span class="vendervode" style="display:none">' + item.VenderCode + '</span><span class="letter" style="display:none">' + item.LocationNameEn + '</span><span class="name" code="' + searchCode + '" locationcode="' + LocationCode + '">' + city + '</span>(' + cityCode + ')' + ' - ' + item.VenderCode + '<div class="carAddress">' + LocationAddress + '</div></li>'
							}
						}
					})
					if (locationArr.length == 0) {
						$('.locationTitle').hide()
					} else {
						$('.locationTitle').show()
					}

					$('.locationResult').append(locationStr)


				}
			},
			//创建搜索结果列表
			creatResult: function (city, value, type, targetId) {
				// console.log(city);
				if (type == 'car') {
					console.log(value)
					if (value == "") {
						$('.kucity').hide();
						// return false;
					}
					$('.result').html('')
					searcCarCity(value, 'search', targetId)
				} else {
					var allCity = [];
					city.map(function (item) {
						if (item.Key != "热门" && item.Key != "#") {
							item.Value.map(function (cItem) {
								var searchCode = cItem.Code == null ? cItem.ThreeCode : cItem.Code;
								if (cItem.NameCN.indexOf(value) != -1 || cItem.NameEN.toUpperCase().split(' ').join('').indexOf(value.toUpperCase()) != -1 || searchCode.toUpperCase().indexOf(value.toUpperCase()) != -1) {
									allCity.push(cItem);
								}
							})
						}
					})
					function City(city, value) {
						this._searchCode = city.Code == null ? city.ThreeCode : city.Code
						this._value = value
						this._index = {
							nameCN: city.NameCN.indexOf(this._value),
							nameEN: city.NameEN.toUpperCase().split(' ').join('').indexOf(this._value.toUpperCase()),
							code: this._searchCode.toUpperCase().indexOf(this._value.toUpperCase())
						}
						console.log(this._index.nameEN, this._index.code)
						return this._index.nameCN > -1
							? this._index.nameCN
							: this._index.nameEN > -1
								? this._index.nameEN
								: this._index.code
					}
					allCity.sort(function (a, b) {
						// 按照搜索字母顺序排序
						var cityA = City(a, value)
						var cityB = City(b, value)
						return cityA - cityB
					})
					// console.log(allCity);
					var len = allCity.length,
						str = '';
					if (!!len) {
						for (var i = 0; i < len; i++) {
							var searchCode = allCity[i].ThreeCode && allCity[i].ThreeCode != null ? allCity[i].ThreeCode : allCity[i].Code;
							// var searchCode = allCity[i].Code==null?allCity[i].ThreeCode:allCity[i].Code;
							var CityCode = allCity[i].Code == null ? allCity[i].ThreeCode : allCity[i].Code;
							CityCode = CityCode ? CityCode : ""
							str += '<li><span class="name" citycode="' + CityCode + '" code="' + searchCode + '" cn="' + allCity[i].NameCN + '">' + allCity[i].NameCN + '</span><span class="letter">' + allCity[i].NameEN + '</span>' + '(' + searchCode + ')' + '</li>'
						}
						this.container.find('.result').html('').html(str).find('li').eq(0).addClass('active');
					} else {
						if ($.session.get('obtLanguage') == "CN") {
							this.container.find('.result').html('<li>没有找到<span class="noresult">' + value + '</span>相关信息</li>');
						} else if ($.session.get('obtLanguage') == "EN") {
							this.container.find('.result').html('<li> No information about<span class="noresult">' + value + '</span>was found</li>');
						}
					}
				}


			},
			//列表切换
			tabChange: function () {
				$('.kucity_nav').on('click', 'li', function (e) {
					var current = $(e.target),
						index = current.index();

					current.addClass('active').siblings().removeClass('active');
					$('.kucity_item').eq(index).addClass('active').siblings().removeClass('active');
					$(' .kucity_body').scrollTop(0);

				})
			},
			//城市选择
			citySelect: function () {
				var self = this;
				$('.kucity_item dd').on('click', 'span', function (e) {
					if (self.target.attr("id") == "hotelCity" || self.target.attr("id") == "hotelIntlCity") {
						$('body').mLoading("show");
						$.ajax(
							{
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
									jsonStr: '{"cityCode":"' + ($(e.target).attr('code')) + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate").val() + '","checkOut":"' + $("#hotelReturnDate").val() + '"}'
								},
								success: function (data) {
									var res = JSON.parse(data);
									console.log(res);

									// 12.24 删除币种
									// var hotelType=$('input[name="hotel"]:checked')[0].id
									if (JSON.parse($.session.get('ProfileInfo')).onlineStyle == "APPLE") {
										var hotelType = $('input[name="applehotel"]:checked')[0].id
									} else {
										var hotelType = $('input[name="hotel"]:checked')[0].id
									}
									console.log(hotelType)
									// if(hotelType=="domHotel"){
									// 	$("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
									// }
									if (hotelType == "intlHotel") {
										$("#hotelPrice").val(res.minFare + '-' + res.maxFare);
									} else {
										$("#hotelPrice").val(res.minFare + '-' + res.maxFare + ProfileInfo.OfficeCurrency);
									}
									$("#hotelPrice").attr("minPrice", res.minFare);
									$("#hotelPrice").attr("maxPrice", res.maxFare);
									$.ajax(
										{
											type: 'post',
											url: $.session.get('ajaxUrl'),
											dataType: 'json',
											data: {
												url: $.session.get('obtCompany') + "/QueryService.svc/GetCustomerCompanyAddressPost",
												jsonStr: '{"cityCode":"' + ($(e.target).attr('code')) + '","id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
											},
											success: function (data) {
												$('body').mLoading("hide");
												var res = JSON.parse(data);
												console.log(res);
												//中心城市经纬度
												if ((res.latitude && res.longitude) && (res.latitude != 0 || res.longitude != 0)) {
													$.session.set('centerLat', res.latitude);
													$.session.set('centerLng', res.longitude);
												} else {
													$.session.remove('centerLat');
													$.session.remove('centerLng');
												}
												$("#hotelAddress").val('').removeAttr('longitude').removeAttr('latitude');
												if (res.companyInfos.length == 0) {
													$("#hotelAddressSelect").addClass("hide");
												} else {
													$("#hotelAddressSelect").removeClass("hide");
													if ($.session.get('obtLanguage') == "CN") {
														$("#hotelAddressSelect").html('<option value="">请选择公司</option>');
													} else if ($.session.get('obtLanguage') == "EN") {
														$("#hotelAddressSelect").html('<option value="">Please select</option>');
													}
													res.companyInfos.map(function (item) {
														if (item.CompanyAddress != "") {
															$("#hotelAddressSelect").append('\
														<option value="'+ item.CompanyAddress + '" key="' + item.Key + '">' + item.CompanyName + '</option>\
														')
														}
													})
													/*酒店位置*/
													$("#hotelAddressSelect").change(function () {
														$("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
														$("#hotelAddress").attr("key", $('#hotelAddressSelect option:selected').attr("key"));
													})
												}
											},
											error: function () {
												// alert('fail'); 
											}
										}
									);
								},
								error: function () {
									// alert('fail'); 
								}
							}
						);
					}
					if (self.target.context.className.indexOf("MultipleArrivelCity") != -1) {
						var inputIndex = parseInt(self.target.attr("inputIndex")) + 1;
						if (self.target.attr("inputIndex") != $(".MultipleArrivelCity").length - 1) {
							$(".MultipleDepartureCity").eq(inputIndex).val(($(e.target).text()));
							$(".MultipleDepartureCity").eq(inputIndex).attr("code", ($(e.target).attr('code')));
						}
					}
					if (self.target.context.className.indexOf("domMultipleArrivel") != -1) {
						var inputIndex = parseInt(self.target.attr("inputIndex")) + 1;
						if (self.target.attr("inputIndex") != $(".domMultipleArrivel").length - 1) {
							$(".domMultipleDeparture").eq(inputIndex).val(($(e.target).text()));
							$(".domMultipleDeparture").eq(inputIndex).attr("code", ($(e.target).attr('code')));
						}
					}

					if (self.target.attr("id") == "carDeparture") {
						$("#carArrival").attr("locationcode", ($(e.target).attr('locationcode')));
						$("#carArrival").val(($(e.target).text()));
						$("#carArrival").attr("code", ($(e.target).attr('code')));
					}
					self.target.val(($(e.target).text()));
					self.target.attr("code", ($(e.target).attr('code')));
					self.target.attr("cn", ($(e.target).attr('cn')));
					self.target.attr("citycode", ($(e.target).attr('citycode')));
					self.target.attr("locationcode", ($(e.target).attr('locationcode')));
					self.container.hide();
				})
			},
			//上下键选择搜索结果
			keySelect: function () {
				var self = this;
				this.target.unbind('keydown').on('keydown', function (e) {
					var current = self.resultct.find('.active').index();
					if (current !== -1) {
						switch (e.keyCode) {
							//上
							case 38:
								keyActive(false);
								break;
							//下
							case 40:
								keyActive(true);
								break;
							//确定
							case 13:
								self.isKeyslect = false;
								if ($.session.get('obtLanguage') == "EN") {
									self.target.val(self.resultct.find('.active .letter').text());
								} else if ($.session.get('obtLanguage') == "CN") {
									self.target.val(self.resultct.find('.active .name').text());
								}
								if (self.target.attr("id") == "hotelCity" || self.target.attr("id") == "hotelIntlCity") {
									$('body').mLoading("show");
									var code = self.resultct.find('.active .name').attr("code");
									$.ajax(
										{
											type: 'post',
											url: $.session.get('ajaxUrl'),
											dataType: 'json',
											data: {
												url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
												jsonStr: '{"cityCode":"' + (code) + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate").val() + '","checkOut":"' + $("#hotelReturnDate").val() + '"}'
											},
											success: function (data) {
												var res = JSON.parse(data);
												console.log(res);
												// $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
												// 12.24 删除币种
												if (JSON.parse($.session.get('ProfileInfo')).onlineStyle == "APPLE") {
													var hotelType = $('input[name="applehotel"]:checked')[0].id
												} else {
													var hotelType = $('input[name="hotel"]:checked')[0].id
												}
												// var hotelType=$('input[name="hotel"]:checked')[0].id

												console.log(hotelType)
												if (hotelType == "domHotel") {
													$("#hotelPrice").val(res.minFare + '-' + res.maxFare + ProfileInfo.OfficeCurrency);
												}
												if (hotelType == "intlHotel") {
													$("#hotelPrice").val(res.minFare + '-' + res.maxFare);
												}
												$("#hotelPrice").attr("minPrice", res.minFare);
												$("#hotelPrice").attr("maxPrice", res.maxFare);
												$.ajax(
													{
														type: 'post',
														url: $.session.get('ajaxUrl'),
														dataType: 'json',
														data: {
															url: $.session.get('obtCompany') + "/QueryService.svc/GetCustomerCompanyAddressPost",
															jsonStr: '{"cityCode":"' + ($(e.target).attr('code')) + '","id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
														},
														success: function (data) {
															$('body').mLoading("hide");
															var res = JSON.parse(data);
															console.log(res);
															//中心城市经纬度
															if ((res.latitude && res.longitude) && (res.latitude != 0 || res.longitude != 0)) {
																$.session.set('centerLat', res.latitude);
																$.session.set('centerLng', res.longitude);
															} else {
																$.session.remove('centerLat');
																$.session.remove('centerLng');
															}
															$("#hotelAddress").val('').removeAttr('longitude').removeAttr('latitude');
															if (res.companyInfos.length == 0) {
																$("#hotelAddressSelect").addClass("hide");
															} else {
																$("#hotelAddressSelect").removeClass("hide");
																if ($.session.get('obtLanguage') == "CN") {
																	$("#hotelAddressSelect").html('<option value="">请选择公司</option>');
																} else if ($.session.get('obtLanguage') == "EN") {
																	$("#hotelAddressSelect").html('<option value="">Please select</option>');
																}
																res.companyInfos.map(function (item) {
																	if (item.CompanyAddress != "") {
																		$("#hotelAddressSelect").append('\
																	<option value="'+ item.CompanyAddress + '" key="' + item.Key + '">' + item.CompanyName + '</option>\
																	')
																	}
																})
																/*酒店位置*/
																$("#hotelAddressSelect").change(function () {
																	$("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
																	$("#hotelAddress").attr("key", $('#hotelAddressSelect option:selected').attr("key"));
																})
															}
														},
														error: function () {
															// alert('fail'); 
														}
													}
												);
											},
											error: function () {
												// alert('fail'); 
											}
										}
									);
								}
								if (self.target.attr("id") == "carDeparture") {
									if ($.session.get('obtLanguage') == "EN") {
										$("#carArrival").val(self.resultct.find('.active .letter').text());
									} else if ($.session.get('obtLanguage') == "CN") {
										$("#carArrival").val(self.resultct.find('.active .name').text());
									}
									$("#carArrival").attr("code", self.resultct.find('.active .name').attr("code"));
									$("#carArrival").attr("locationcode", self.resultct.find('.active .name').attr("locationcode"));
									$("#carArrival").attr("vendervode", $(this).find('.vendervode').text());
								}
								if (self.target.attr("id") == "carDeparture" || self.target.attr("id") == "carArrival") {
									kucity.target.attr('vendervode', $(this).find('.vendervode').text());
									if ($('#carDeparture').attr('vendervode') != "" || $('#carArrival').attr('vendervode') != "") {
										$('#carCompany').attr('disabled', 'disabled')
									} else {
										$('#carCompany').removeAttr('disabled')
									}
								}

								self.target.attr("code", self.resultct.find('.active .name').attr("code"));
								self.target.attr("cn", self.resultct.find('.active .name').attr("cn"));
								self.target.attr("citycode", self.resultct.find('.active .name').attr("citycode"));
								self.target.attr("locationcode", self.resultct.find('.active .name').attr("locationcode"));
								self.triggleShow('all');
								self.target.blur();
								if (self.target.context.className.indexOf("MultipleArrivelCity") != -1) {
									var inputIndex = parseInt(self.target.attr("inputIndex")) + 1;
									if (self.target.attr("inputIndex") != $(".MultipleArrivelCity").length - 1) {
										if ($.session.get('obtLanguage') == "EN") {
											$(".MultipleDepartureCity").eq(inputIndex).val(self.resultct.find('.active .letter').text());
										} else if ($.session.get('obtLanguage') == "CN") {
											$(".MultipleDepartureCity").eq(inputIndex).val(self.resultct.find('.active .name').text());
										}
										$(".MultipleDepartureCity").eq(inputIndex).attr("code", self.resultct.find('.active .name').attr("code"));
									}
								}
								if (self.target.context.className.indexOf("domMultipleArrivel") != -1) {
									var inputIndex = parseInt(self.target.attr("inputIndex")) + 1;
									if (self.target.attr("inputIndex") != $(".domMultipleArrivel").length - 1) {
										if ($.session.get('obtLanguage') == "EN") {
											$(".domMultipleDeparture").eq(inputIndex).val(self.resultct.find('.active .letter').text());
										} else if ($.session.get('obtLanguage') == "CN") {
											$(".domMultipleDeparture").eq(inputIndex).val(self.resultct.find('.active .name').text());
										}
										$(".domMultipleDeparture").eq(inputIndex).attr("code", self.resultct.find('.active .name').attr("code"));
									}
								}
								break;
							default:
								self.isKeyslect = false;
								break;
						}

						function keyActive(isInorder) {
							var max = self.resultct.find('li').length - 1;
							if (isInorder) {
								current = current == max ? 0 : current + 1;
							} else {
								current = current == 0 ? max : current - 1;
							}
							self.resultct.find('li').eq(current).addClass('active').siblings().removeClass('active');
							self.isKeyslect = true;
						}
					}
				})
			},
			//搜索
			inputSearch: function () {
				var self = this;
				this.target.on('keyup', function (e) {
					if (!self.isKeyslect) {
						self.throttle(search, this);
					}
				})
				// 输入框搜索
				function search(e) {
					var targetId = self.targetId;
					// console.log(targetId)
					if (targetId == "domDepartureCity" || targetId == "domArrivalCity" || self.target.context.className.indexOf("domMultipleDeparture") != -1 || self.target.context.className.indexOf("domMultipleArrivel") != -1) {
						var city = domCityJson;
					}
					else if (targetId == "transitCity" || targetId == "intlDepartureCity" || targetId == "intlArrivalCity" || self.target.context.className.indexOf("MultipleDepartureCity") != -1 || self.target.context.className.indexOf("MultipleArrivelCity") != -1) {
						var city = intlCityJson;
					}
					else if (targetId == "trainDepartureCity" || targetId == "trainArrivalCity") {
						var city = trainCityJson;
					}
					else if (targetId == "hotelCity") {
						var city = hotelCityJson;
					}
					else if (targetId == "hotelIntlCity") {
						var city = hotelIntlCityJson;
					} else if (targetId == "carDeparture" || targetId == "carArrival") {
						var city = carAddressJson;
					}
					var container = self.container;
					self.triggleShow(false);
					var value = $(this).val().split(' ').join('');
					// console.log(value)
					//             if (value) {
					if (targetId == "carDeparture" || targetId == "carArrival") {
						self.creatResult(city, value, 'car', targetId);
					} else {
						self.creatResult(city, value);
					}
					// var url = 'https://sjipiao.alitrip.com/city_search.do?_ksTS=1439362066383_11337&lines=10&_input_charset=utf-8&needProvince=true&q=' + value;
					// $.ajax({
					//     url: url,
					//     type: 'get',
					//     dataType: 'jsonp'
					// }).done(function(re) {
					//     // console.log(re)
					//     self.creatResult(re, value);
					// })
					// } else {
					//     self.triggleShow(true);
					// }
				}
				this.target.on('blur', function (e) {
					if ($('.kucity .result').css('display') == "block") {//搜索框打开的时候,失去焦点就默认选中第一个城市
						// if(e.target.getAttribute("code")!=$('.result .active .name').attr('code')){
						var citycode = $('.result .active .name').attr('citycode')
						e.target.setAttribute("code", $('.result .active .name').attr('code'))
						e.target.setAttribute("citycode", citycode ? citycode : "")
						if (obtLanguage == "CN") {
							e.target.value = $('.result .active .name').text()
						} else {
							e.target.value = $('.result .active .letter').text()
						}
						// }
					}
				})
			},
			//列表，结果，整体 显示切换
			triggleShow: function (open) {
				var container = this.container;
				if (open === 'all') {
					container.hide()
				} else if (open) {
					container.find('.citybox').show().end().find('.result').hide();
				} else {
					container.find('.citybox').hide().end().find('.result').show();
				}
			},
			//函数节流
			throttle: function (fn, context) {
				clearTimeout(fn.tId);
				// fn.tId = setTimeout(function(){
				// 	fn.call(context);
				// }, 100)

				var timmer = new Date().getTime()
				fn.tId = setTimeout(function () {
					var thisTimmer = new Date().getTime()
					if (thisTimmer - timmer > 495) {//防止时间出错
						fn.call(context);
					}
				}, 500)

				// clearTimeout(fn.tId);
				//          fn.tId = setTimeout(function(){
				// 	fn.call(context);
				//          // }, 100)
				//          }, 300)
			},
			//阻止事件冒泡
			stopPropagation: function () {
				var self = this;
				//阻止事件冒泡
				this.container.on('mousedown', stopPropagation);
				this.target.on('mousedown', stopPropagation);
				//页面点击 隐藏
				$(document).on('mousedown', function (e) {
					self.container.hide();
				})
				function stopPropagation(e) {
					e.stopPropagation();
				}
			}
		};

		var kucity = null;
		$.fn.kuCity = function (options) {
			var target = $(this);

			target.on('focus', function (e) {
				var top = $(this).offset().top + $(this).outerHeight(),
					left = $(this).offset().left;
				kucity = kucity ? kucity : new KuCity(target);
				kucity.target = $(e.target);
				kucity.targetId = $(e.target).attr('id');
				kucity.init();
				kucity.container.show().offset({
					'top': top + 7,
					'left': left
				});
				kucity.triggleShow(true);
				// if(($(target).attr('id')=="carDeparture"|| $(target).attr('id')=="carArrival")&& $(target).val()==""){
				if (($(target).attr('id') == "carDeparture" || $(target).attr('id') == "carArrival")) {
					$('.kucity').hide();
					// return false;
				}
				kucity.resultct.on('click', 'li', function () {
					if ($.session.get('obtLanguage') == "EN") {
						kucity.target.val($(this).find('.letter').text());
					} else if ($.session.get('obtLanguage') == "CN") {
						kucity.target.val($(this).find('.name').text());
					}
					kucity.target.attr("code", $(this).find('.name').attr('code'));
					kucity.target.attr("cn", $(this).find('.name').attr('cn'));
					kucity.target.attr("citycode", $(this).find('.name').attr('citycode'));
					kucity.target.attr("locationcode", $(this).find('.name').attr('locationcode'));
					kucity.triggleShow('all');
					/*多段*/
					if (kucity.target.context.className.indexOf("MultipleArrivelCity") != -1) {
						var inputIndex = parseInt(kucity.target.attr("inputIndex")) + 1;
						if (kucity.target.attr("inputIndex") != $(".MultipleArrivelCity").length - 1) {
							if ($.session.get('obtLanguage') == "EN") {
								$(".MultipleDepartureCity").eq(inputIndex).val($(this).find('.letter').text());
							} else if ($.session.get('obtLanguage') == "CN") {
								$(".MultipleDepartureCity").eq(inputIndex).val($(this).find('.name').text());
							}
							$(".MultipleDepartureCity").eq(inputIndex).attr("code", $(this).find('.name').attr('code'));
						}
					}
					//国内多段
					if (kucity.target.context.className.indexOf("domMultipleArrivel") != -1) {
						var inputIndex = parseInt(kucity.target.attr("inputIndex")) + 1;
						console.log(inputIndex)
						console.log($(".domMultipleDeparture").eq(inputIndex))
						if (kucity.target.attr("inputIndex") != $(".domMultipleArrivel").length - 1) {
							if ($.session.get('obtLanguage') == "EN") {
								$(".domMultipleDeparture").eq(inputIndex).val($(this).find('.letter').text());
							} else if ($.session.get('obtLanguage') == "CN") {
								$(".domMultipleDeparture").eq(inputIndex).val($(this).find('.name').text());
							}
							$(".domMultipleDeparture").eq(inputIndex).attr("code", $(this).find('.name').attr('code'));
						}
					}

					/*酒店*/
					if (kucity.target.attr("id") == "hotelCity" || kucity.target.attr("id") == "hotelIntlCity") {
						$('body').mLoading("show");
						$.ajax(
							{
								type: 'post',
								url: $.session.get('ajaxUrl'),
								dataType: 'json',
								data: {
									url: $.session.get('obtCompany') + "/QueryService.svc/GetHotelPolicyPricePost",
									jsonStr: '{"cityCode":"' + ($(kucity.target).attr('code')) + '","id":' + netUserId + ',"checkIn":"' + $("#hotelDepartureDate").val() + '","checkOut":"' + $("#hotelReturnDate").val() + '"}'
								},
								success: function (data) {
									var res = JSON.parse(data);
									console.log(res);

									// $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
									// 12.24 删除币种
									// var hotelType=$('input[name="hotel"]:checked')[0].id
									if (JSON.parse($.session.get('ProfileInfo')).onlineStyle == "APPLE") {
										var hotelType = $('input[name="applehotel"]:checked')[0].id
									} else {
										var hotelType = $('input[name="hotel"]:checked')[0].id
									}
									console.log(hotelType)
									if (hotelType == "domHotel") {
										$("#hotelPrice").val(res.minFare + '-' + res.maxFare + ProfileInfo.OfficeCurrency);
									}
									if (hotelType == "intlHotel") {
										$("#hotelPrice").val(res.minFare + '-' + res.maxFare);
									}
									$("#hotelPrice").attr("minPrice", res.minFare);
									$("#hotelPrice").attr("maxPrice", res.maxFare);

									$.ajax(
										{
											type: 'post',
											url: $.session.get('ajaxUrl'),
											dataType: 'json',
											data: {
												url: $.session.get('obtCompany') + "/QueryService.svc/GetCustomerCompanyAddressPost",
												jsonStr: '{"cityCode":"' + ($(kucity.target).attr('code')) + '","id":' + netUserId + ',"Language":"' + $.session.get('obtLanguage') + '"}'
											},
											success: function (data) {
												$('body').mLoading("hide");
												var res = JSON.parse(data);
												console.log(res);
												//中心城市经纬度
												if ((res.latitude && res.longitude) && (res.latitude != 0 || res.longitude != 0)) {
													$.session.set('centerLat', res.latitude);
													$.session.set('centerLng', res.longitude);
												} else {
													$.session.remove('centerLat');
													$.session.remove('centerLng');
												}
												$("#hotelAddress").val('').removeAttr('longitude').removeAttr('latitude');
												if (res.companyInfos.length == 0) {
													$("#hotelAddressSelect").addClass("hide");
												} else {
													$("#hotelAddressSelect").removeClass("hide");
													if ($.session.get('obtLanguage') == "CN") {
														$("#hotelAddressSelect").html('<option value="">请选择公司</option>');
													} else if ($.session.get('obtLanguage') == "EN") {
														$("#hotelAddressSelect").html('<option value="">Please select</option>');
													}
													res.companyInfos.map(function (item) {
														if (item.CompanyAddress != "") {
															$("#hotelAddressSelect").append('\
														<option value="'+ item.CompanyAddress + '" key="' + item.Key + '">' + item.CompanyName + '</option>\
														')
														}
													})
													/*酒店位置*/
													$("#hotelAddressSelect").change(function () {
														$("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
														$("#hotelAddress").attr("key", $('#hotelAddressSelect option:selected').attr("key"));
													})
												}
											},
											error: function () {
												// alert('fail'); 
											}
										}
									);
								},
								error: function () {
									// alert('fail'); 
								}
							}
						);
					}
					/*租车*/
					if (kucity.target.attr("id") == "carDeparture") {
						if ($.session.get('obtLanguage') == "EN") {
							$("#carArrival").val($(this).find('.letter').text());
						} else if ($.session.get('obtLanguage') == "CN") {
							$("#carArrival").val($(this).find('.name').text());
						}
						$("#carArrival").attr("code", $(this).find('.name').attr('code'));
						$("#carArrival").attr("locationcode", $(this).find('.name').attr('locationcode'));
						$("#carArrival").attr("vendervode", $(this).find('.vendervode').text());
					}
					if (kucity.target.attr("id") == "carDeparture" || kucity.target.attr("id") == "carArrival") {
						kucity.target.attr('vendervode', $(this).find('.vendervode').text());
						if ($('#carDeparture').attr('vendervode') != "" || $('#carArrival').attr('vendervode') != "") {
							$('#carCompany').attr('disabled', 'disabled')
						} else {
							$('#carCompany').removeAttr('disabled')
						}
					}
				})
			})
			return this;
		};
	})(jQuery)
}