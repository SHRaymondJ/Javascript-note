(function($) {
    $('body').mLoading("show");
	var TAnumber=$.session.get('TAnumber')?$.session.get('TAnumber'):'';
	var TAnumberIndex=$.session.get('TAnumberIndex');
	var TAnumbertest=window.sessionStorage.getItem('TAnumber')
	var obtLanguage=$.session.get('obtLanguage');
	var seatNUm = $.session.get('cityTAnumber');
	var cityTAnumber=$.session.set('cityTAnumber')
	//ThreeCode是租车使用的，以后有需求请做特殊处理
	
	// 判断是否是json字符串
	
	
	// 各模块城市缓存
	var otherCityJson;
	
	function isJsonString(str) {  
	        try {  
	            if (typeof JSON.parse(str) == "object") {  
	                return true;  
	            }  
	        } catch(e) {  
	        }  
	        return false;  
	    }  
		//构建城市分类字面量
		if(ProfileInfo.onlineStyle=="APPLE"){
			var otherCity = {
			    hot: {hot:[]},
			    ABCDEFGH: {},
			    IJKLMNOP: {},
			    QRSTUVWXYZ: {}
			};
		}else{
			var otherCity = {
				hot: {hot:[]},
			   A:{},B:{},C:{},D:{},E:{},F:{},G:{},H:{},
			   I:{},J:{},K:{},L:{},M:{},N:{},O:{},P:{},
			   Q:{},R:{},S:{},T:{},U:{},V:{},W:{},X:{},Y:{},Z:{}
			};
		}
		// 生成城市列表
		function cityList(json,city,cityType){
			
			if(ProfileInfo.onlineStyle=="APPLE"){
				cityData(json,city,cityType);
			}else{
				newCityData(json,city,cityType);
			}
		}
	


	var data6={
			url: $.session.get('obtCompany')+"/SystemService.svc/InitAllHotelCityPost",
			jsonStr:'{"key":'+$.session.get('netLoginId')+'}'
		}
	// AllHotelCity InitAllHotelLimitCity(string key, string travelRequestNo);
    $.ajax(
      { 
        type:'post', 
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:data6,
        async:false,
        success : function(data) {
			console.log(JSON.parse(data));
            $('body').mLoading("hide");
			otherCityJson = JSON.parse(data).DomsticCitys;
			JSON.parse(data).InterCitys.map(function(item){
				otherCityJson.push(item);
			})
			
			cityList(JSON.parse(data).DomsticCitys,otherCity)
			cityList(JSON.parse(data).InterCitys,otherCity)
        },
        error : function() {
          // alert('fail');
        }
      }
    );

	function newCityData(cityJson,city,cityType){
		var list=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
			 cityJson.map(function(item){
				 if(item.Key == "热门"||item.Key == "#"){
					 if(item.Value.length!=0){
						 item.Value.map(function(sItem){
							 city.hot["hot"].push(sItem);
						 })
					 }
				 }
				list.map(function(letter){
					if(item.Key == letter){
						if(item.Value.length!=0){
							item.Value.map(function(sItem){
								city[letter][letter] ? city[letter][letter].push(sItem) : (city[letter][letter] = [], city[letter][letter].push(sItem));
							})
						}
					}
				})
			 })
		
	}
	
    function cityData(cityJson,city){
			cityJson.map(function(item){
			    if(item.Key == "热门"||item.Key == "#"){
			        if(item.Value.length!=0){
			            item.Value.map(function(sItem){
			                city.hot["hot"].push(sItem);
			            })
			        }
			    }
			    var list1 = ["A",'B','C','D','E','F','G','H'];
			    list1.map(function(letter){
			        if(item.Key == letter){
			            if(item.Value.length!=0){
			                item.Value.map(function(sItem){
			                    city["ABCDEFGH"][letter] ? city["ABCDEFGH"][letter].push(sItem) : (city["ABCDEFGH"][letter] = [], city["ABCDEFGH"][letter].push(sItem));
			                })
			            }
			        }
			    })
			    var list2 = ['I','J','K','L','M','N','O','P'];
			    list2.map(function(letter){
			        if(item.Key == letter){
			            if(item.Value.length!=0){
			                item.Value.map(function(sItem){
			                    city["IJKLMNOP"][letter] ? city["IJKLMNOP"][letter].push(sItem) : (city["IJKLMNOP"][letter] = [], city["IJKLMNOP"][letter].push(sItem));
			                })
			            }
			        }
			    })
			    var list3 = ['Q','R','S','T','U','V','W','X','Y','Z'];
			    list3.map(function(letter){
			        if(item.Key == letter){
			            if(item.Value.length!=0){
			                item.Value.map(function(sItem){
			                    city["QRSTUVWXYZ"][letter] ? city["QRSTUVWXYZ"][letter].push(sItem) : (city["QRSTUVWXYZ"][letter] = [], city["QRSTUVWXYZ"][letter].push(sItem));
			                })
			            }
			        }
			    })
			})
        
    }
    // console.log(hotelCity);

    var KuCity = function(target) {
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
        init: function() {
            this.creatItem();
            this.tabChange();
            this.citySelect();
            this.inputSearch();
            this.keySelect();
            this.stopPropagation();
        },
        //创建市列表
        creatItem: function() {
            var targetId = this.targetId;
			if(this.target.context.className.indexOf("cityDepart") != -1|| this.target.context.className.indexOf("cityArrivel") != -1 ){
				var city = otherCity;
			}
            // if(this.isContainerExit) return;
            $(".kucity").remove();
			if(ProfileInfo.onlineStyle=="APPLE"){
				var template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header"></h3><ul class="kucity_nav flexRow"><li class="active">Key</li><li>ABCDEFGH</li><li>IJKLMNOP</li><li>QRSTUVWXYZ</li></ul><div class="kucity_body"></div></div><ul class="result"></ul></div>';
			} else{
				console.log(city)
				// console.log(cityJson)
				var hotKey=obtLanguage=="CN"?"热门":"Hot"
									// <li class="active">Key</li>
				// 1.6修改
				var template = '\
					<div class="kucity">\
						<div class="citybox">\
							<h3 class="kucity_header"></h3>\
								<ul class="kucity_nav flexRow">\
									<li class="active">'+hotKey+'</li>\
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
					if(TAnumber&&$.session.get('TAOneCity')!=1){
						template = '<div class="kucity"><div class="citybox"><h3 class="kucity_header"></h3><ul class="kucity_nav flexRow"></ul><div class="kucity_body"></div></div><ul class="result"></ul></div>';
					}
			}
			
            if(targetId != "carDeparture" && targetId != "carArrival"){
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
				            var code = city[group][itemKey[i]][j].Code == null?city[group][itemKey[i]][j].ThreeCode:city[group][itemKey[i]][j].Code;
				            var citycode = city[group][itemKey[i]][j].CityCode == null?city[group][itemKey[i]][j].ThreeCode:city[group][itemKey[i]][j].CityCode;
				            citycode=citycode?citycode:""
							switch($.session.get('obtLanguage'))
				            {
				            case 'CN':
				              str += '<span code="'+code+'" citycode="'+citycode+'" title="'+city[group][itemKey[i]][j].NameCN+'">' + city[group][itemKey[i]][j].NameCN + '</span>'
				              break;
				            case 'EN':
				              str += '<span code="'+code+'" citycode="'+citycode+'" title="'+city[group][itemKey[i]][j].NameEN+'">' + city[group][itemKey[i]][j].NameEN + '</span>'
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
				if(JSON.parse($.session.get('ProfileInfo')).onlineStyle=="APPLE"){
				  $(".kucity_item dd span").css("width","100%");
				}
				this.isContainerExit = true;
			}
        },
        //创建搜索结果列表
        creatResult: function(city, value) {
            console.log(city);
				var allCity = [];
				city.map(function(item){
					if(item.Key!="热门"&&item.Key!="#"){
						item.Value.map(function(cItem){
							var searchCode = cItem.Code==null?cItem.ThreeCode:cItem.Code;
							if(cItem.NameCN.indexOf(value) != -1||cItem.NameEN.toUpperCase().split(' ').join('').indexOf(value.toUpperCase()) != -1||searchCode.toUpperCase().indexOf(value.toUpperCase()) != -1){
								allCity.push(cItem);
							}
						})
					}
				})
				function City(city,value){
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
					var cityA = City(a,value)
					var cityB = City(b,value)
					return cityA - cityB
				})
				// console.log(allCity);
				var len = allCity.length,
					str = '';
				if (!!len) {
					for (var i = 0; i < len; i++) {
						var searchCode = allCity[i].ThreeCode && allCity[i].ThreeCode !=null?allCity[i].ThreeCode:allCity[i].Code;
						// var searchCode = allCity[i].Code==null?allCity[i].ThreeCode:allCity[i].Code;
						var CityCode = allCity[i].Code ==null?allCity[i].ThreeCode:allCity[i].Code;
						CityCode=CityCode?CityCode:""
						str += '<li><span class="name" citycode="'+CityCode+'" code="'+searchCode+'">' + allCity[i].NameCN + '</span><span class="letter">' + allCity[i].NameEN +'</span>'+'('+searchCode+')'+'</li>'
					}
					this.container.find('.result').html('').html(str).find('li').eq(0).addClass('active');
				} else {
					if($.session.get('obtLanguage')=="CN"){
						this.container.find('.result').html('<li>没有找到<span class="noresult">' + value + '</span>相关信息</li>');
					}else if($.session.get('obtLanguage')=="EN"){
						this.container.find('.result').html('<li> No information about<span class="noresult">' + value + '</span>was found</li>');
					}
				}
        },
        //列表切换
        tabChange: function() {
            $('.kucity_nav').on('click', 'li', function(e) {
                var current = $(e.target),
                    index = current.index();

                current.addClass('active').siblings().removeClass('active');
                $('.kucity_item').eq(index).addClass('active').siblings().removeClass('active');
                $(' .kucity_body').scrollTop(0);

            })
        },
        //城市选择
        citySelect: function() {
            var self = this;
            $('.kucity_item dd').on('click', 'span', function(e) {
                if(self.target.attr("id")=="hotelCity"||self.target.attr("id")=="hotelIntlCity"){
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
                            jsonStr:'{"cityCode":"'+($(e.target).attr('code'))+'","id":'+netUserId+',"checkIn":"'+$("#hotelDepartureDate").val()+'","checkOut":"'+$("#hotelReturnDate").val()+'"}'
                        },
                        success : function(data) {
                            var res = JSON.parse(data);
							console.log(res);

							// 12.24 删除币种
							// var hotelType=$('input[name="hotel"]:checked')[0].id
							if(JSON.parse($.session.get('ProfileInfo')).onlineStyle=="APPLE"){
								var hotelType=$('input[name="applehotel"]:checked')[0].id
							}else{
								var hotelType=$('input[name="hotel"]:checked')[0].id
							}
							console.log(hotelType)
							// if(hotelType=="domHotel"){
							// 	$("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
							// }
							if(hotelType=="intlHotel"){
								$("#hotelPrice").val(res.minFare+'-'+res.maxFare);
							}else{
								$("#hotelPrice").val(res.minFare+'-'+res.maxFare+ProfileInfo.OfficeCurrency);
							}
                            $("#hotelPrice").attr("minPrice",res.minFare);
                            $("#hotelPrice").attr("maxPrice",res.maxFare);
                            $.ajax(
                              {
                                type:'post',
                                url : $.session.get('ajaxUrl'), 
                                dataType : 'json',
                                data:{
                                    url: $.session.get('obtCompany')+"/QueryService.svc/GetCustomerCompanyAddressPost",
                                    jsonStr:'{"cityCode":"'+($(e.target).attr('code'))+'","id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
                                },
                                success : function(data) {
                                    $('body').mLoading("hide");
                                    var res = JSON.parse(data);
									console.log(res);
									//中心城市经纬度
									if((res.latitude && res.longitude) && (res.latitude!=0 || res.longitude!=0)){
										$.session.set('centerLat',res.latitude);
										$.session.set('centerLng',res.longitude);
									}else{
                                        $.session.remove('centerLat');
										$.session.remove('centerLng');
                                    }
									$("#hotelAddress").val('').removeAttr('longitude').removeAttr('latitude');
                                    if(res.companyInfos.length == 0){
                                        $("#hotelAddressSelect").addClass("hide");
                                    }else{
                                        $("#hotelAddressSelect").removeClass("hide");
                                        if($.session.get('obtLanguage')=="CN"){
                                            $("#hotelAddressSelect").html('<option value="">请选择公司</option>');
                                        }else if($.session.get('obtLanguage')=="EN"){
                                            $("#hotelAddressSelect").html('<option value="">Please select</option>');
                                        }
                                        res.companyInfos.map(function(item){
                                            if(item.CompanyAddress!=""){
                                                $("#hotelAddressSelect").append('\
                                                    <option value="'+item.CompanyAddress+'" key="'+item.Key+'">'+item.CompanyName+'</option>\
                                                    ')
                                            }
                                        })
                                       /*酒店位置*/
                                       $("#hotelAddressSelect").change(function(){
                                           $("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
                                           $("#hotelAddress").attr("key",$('#hotelAddressSelect option:selected').attr("key"));
                                       }) 
                                    }
                                },
                                error : function() {
                                  // alert('fail'); 
                                } 
                              }
                            );
                        },
                        error : function() {
                          // alert('fail'); 
                        } 
                      }
                    );
                }
                if(self.target.context.className.indexOf("MultipleArrivelCity") != -1){
                    var inputIndex = parseInt(self.target.attr("inputIndex"))+1;
                    if(self.target.attr("inputIndex")!=$(".MultipleArrivelCity").length-1){
                        $(".MultipleDepartureCity").eq(inputIndex).val(($(e.target).text()));
                        $(".MultipleDepartureCity").eq(inputIndex).attr("code",($(e.target).attr('code')));
                    }
                }
				if(self.target.context.className.indexOf("domMultipleArrivel") != -1){
				    var inputIndex = parseInt(self.target.attr("inputIndex"))+1;
				    if(self.target.attr("inputIndex")!=$(".domMultipleArrivel").length-1){
				        $(".domMultipleDeparture").eq(inputIndex).val(($(e.target).text()));
				        $(".domMultipleDeparture").eq(inputIndex).attr("code",($(e.target).attr('code')));
				    }
				}
				
				
                if(self.target.attr("id")=="carDeparture"){
                    $("#carArrival").attr("locationcode",($(e.target).attr('locationcode')));
                    $("#carArrival").val(($(e.target).text()));
                    $("#carArrival").attr("code",($(e.target).attr('code')));
                }
                self.target.val(($(e.target).text()));
                self.target.attr("code",($(e.target).attr('code')));
                self.target.attr("citycode",($(e.target).attr('citycode')));
                self.target.attr("locationcode",($(e.target).attr('locationcode')));
                self.container.hide();
            })
        },
        //上下键选择搜索结果
        keySelect: function() {
            var self = this;
            this.target.unbind('keydown').on('keydown', function(e){
                var current = self.resultct.find('.active').index();
                if(current !== -1){
                    switch(e.keyCode){
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
                            if($.session.get('obtLanguage')=="EN"){
                                self.target.val(self.resultct.find('.active .letter').text());
                            }else if($.session.get('obtLanguage')=="CN"){
                                self.target.val(self.resultct.find('.active .name').text());
                            }
                            if(self.target.attr("id")=="hotelCity"||self.target.attr("id")=="hotelIntlCity"){
                                $('body').mLoading("show");
                                var code = self.resultct.find('.active .name').attr("code");
                                $.ajax(
                                  {
                                    type:'post',
                                    url : $.session.get('ajaxUrl'),
                                    dataType : 'json',
                                    data:{
                                        url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
                                        jsonStr:'{"cityCode":"'+(code)+'","id":'+netUserId+',"checkIn":"'+$("#hotelDepartureDate").val()+'","checkOut":"'+$("#hotelReturnDate").val()+'"}'
                                    },
                                    success : function(data) {
                                        var res = JSON.parse(data);
                                        console.log(res);
                                        // $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
										// 12.24 删除币种
										if(JSON.parse($.session.get('ProfileInfo')).onlineStyle=="APPLE"){
											var hotelType=$('input[name="applehotel"]:checked')[0].id
										}else{
											var hotelType=$('input[name="hotel"]:checked')[0].id
										}
										// var hotelType=$('input[name="hotel"]:checked')[0].id
										
										console.log(hotelType)
										if(hotelType=="domHotel"){
											$("#hotelPrice").val(res.minFare+'-'+res.maxFare+ProfileInfo.OfficeCurrency);
										}
										if(hotelType=="intlHotel"){
											$("#hotelPrice").val(res.minFare+'-'+res.maxFare);
										}
                                        $("#hotelPrice").attr("minPrice",res.minFare);
                                        $("#hotelPrice").attr("maxPrice",res.maxFare);
                                        $.ajax(
                                          {
                                            type:'post',
                                            url : $.session.get('ajaxUrl'), 
                                            dataType : 'json',
                                            data:{
                                                url: $.session.get('obtCompany')+"/QueryService.svc/GetCustomerCompanyAddressPost",
                                                jsonStr:'{"cityCode":"'+($(e.target).attr('code'))+'","id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
                                            },
                                            success : function(data) {
                                                $('body').mLoading("hide");
                                                var res = JSON.parse(data);
												console.log(res);
												//中心城市经纬度
												if((res.latitude && res.longitude) && (res.latitude!=0 || res.longitude!=0)){
													$.session.set('centerLat',res.latitude);
													$.session.set('centerLng',res.longitude);
												}else{
													$.session.remove('centerLat');
													$.session.remove('centerLng');
												}
                                                $("#hotelAddress").val('').removeAttr('longitude').removeAttr('latitude');
                                                if(res.companyInfos.length == 0){
                                                    $("#hotelAddressSelect").addClass("hide");
                                                }else{
                                                    $("#hotelAddressSelect").removeClass("hide");
                                                    if($.session.get('obtLanguage')=="CN"){
                                                        $("#hotelAddressSelect").html('<option value="">请选择公司</option>');
                                                    }else if($.session.get('obtLanguage')=="EN"){
                                                        $("#hotelAddressSelect").html('<option value="">Please select</option>');
                                                    }
                                                    res.companyInfos.map(function(item){
                                                        if(item.CompanyAddress!=""){
                                                            $("#hotelAddressSelect").append('\
                                                                <option value="'+item.CompanyAddress+'" key="'+item.Key+'">'+item.CompanyName+'</option>\
                                                                ')
                                                        }
                                                    })
                                                   /*酒店位置*/
                                                   $("#hotelAddressSelect").change(function(){
                                                        $("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
                                                        $("#hotelAddress").attr("key",$('#hotelAddressSelect option:selected').attr("key"));
                                                   })
                                                }
                                            },
                                            error : function() {
                                              // alert('fail'); 
                                            } 
                                          }
                                        );
                                    },
                                    error : function() {
                                      // alert('fail'); 
                                    } 
                                  } 
                                );
                            }
                            if(self.target.attr("id")=="carDeparture"){
                                if($.session.get('obtLanguage')=="EN"){
                                    $("#carArrival").val(self.resultct.find('.active .letter').text());
                                }else if($.session.get('obtLanguage')=="CN"){
                                    $("#carArrival").val(self.resultct.find('.active .name').text());
                                }
                                $("#carArrival").attr("code",self.resultct.find('.active .name').attr("code"));
                                $("#carArrival").attr("locationcode",self.resultct.find('.active .name').attr("locationcode"));
								$("#carArrival").attr("vendervode",$(this).find('.vendervode').text());
                            }
							if(self.target.attr("id")=="carDeparture" || self.target.attr("id")=="carArrival"){
								  kucity.target.attr('vendervode',$(this).find('.vendervode').text());
								  if($('#carDeparture').attr('vendervode')!="" || $('#carArrival').attr('vendervode')!=""){
									  $('#carCompany').attr('disabled','disabled')
								  }else{
									  $('#carCompany').removeAttr('disabled')
								  }
							}
							
                            self.target.attr("code",self.resultct.find('.active .name').attr("code"));
                            self.target.attr("citycode",self.resultct.find('.active .name').attr("citycode"));
                            self.target.attr("locationcode",self.resultct.find('.active .name').attr("locationcode"));
                            self.triggleShow('all');
                            self.target.blur();
                            if(self.target.context.className.indexOf("MultipleArrivelCity") != -1){
                                var inputIndex = parseInt(self.target.attr("inputIndex"))+1;
                                if(self.target.attr("inputIndex")!=$(".MultipleArrivelCity").length-1){
                                    if($.session.get('obtLanguage')=="EN"){
                                        $(".MultipleDepartureCity").eq(inputIndex).val(self.resultct.find('.active .letter').text());
                                    }else if($.session.get('obtLanguage')=="CN"){
                                        $(".MultipleDepartureCity").eq(inputIndex).val(self.resultct.find('.active .name').text());
                                    }
                                    $(".MultipleDepartureCity").eq(inputIndex).attr("code",self.resultct.find('.active .name').attr("code"));
                                }
                            }
							if(self.target.context.className.indexOf("domMultipleArrivel") != -1){
							    var inputIndex = parseInt(self.target.attr("inputIndex"))+1;
							    if(self.target.attr("inputIndex")!=$(".domMultipleArrivel").length-1){
							        if($.session.get('obtLanguage')=="EN"){
							            $(".domMultipleDeparture").eq(inputIndex).val(self.resultct.find('.active .letter').text());
							        }else if($.session.get('obtLanguage')=="CN"){
							            $(".domMultipleDeparture").eq(inputIndex).val(self.resultct.find('.active .name').text());
							        }
							        $(".domMultipleDeparture").eq(inputIndex).attr("code",self.resultct.find('.active .name').attr("code"));
							    }
							}
                            break;
                        default: 
                            self.isKeyslect = false;
                            break;
                    }

                    function keyActive(isInorder) {
                        var max = self.resultct.find('li').length - 1;
                        if(isInorder){
                            current = current == max ? 0 : current + 1;
                        }else{
                            current = current == 0 ? max : current - 1;
                        }
                        self.resultct.find('li').eq(current).addClass('active').siblings().removeClass('active');
                        self.isKeyslect = true;
                    }
                }
            })
        },
        //搜索
        inputSearch: function() {
            var self = this;
            this.target.on('keyup', function(e) {
                if(!self.isKeyslect){
                    self.throttle(search, this);
                }
            })
            // 输入框搜索
            function search(e) {
				if(self.target.context.className.indexOf("cityDepart") != -1|| self.target.context.className.indexOf("cityArrivel") != -1 ){
					var city = otherCityJson;
				}
                var container = self.container;
                self.triggleShow(false);
                var value = $(this).val().split(' ').join('');
				self.creatResult(city, value);
            }
			this.target.on('blur', function(e) {
				if($('.kucity .result').css('display')=="block"){//搜索框打开的时候,失去焦点就默认选中第一个城市
					// if(e.target.getAttribute("code")!=$('.result .active .name').attr('code')){
						var citycode=$('.result .active .name').attr('citycode')
						e.target.setAttribute("code",$('.result .active .name').attr('code'))
						e.target.setAttribute("citycode",citycode?citycode:"")
						if(obtLanguage=="CN"){
							e.target.value=$('.result .active .name').text()
						}else{
							e.target.value=$('.result .active .letter').text()
						}
					// }
				}
			})
        },
        //列表，结果，整体 显示切换
        triggleShow: function(open) {
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
        throttle: function(fn, context) {
			clearTimeout(fn.tId);
			// fn.tId = setTimeout(function(){
			// 	fn.call(context);
			// }, 100)
			
			var timmer=new Date().getTime()
			fn.tId=setTimeout(function(){
				var thisTimmer=new Date().getTime()
				if(thisTimmer-timmer>495){//防止时间出错
					fn.call(context);
				}
			},500)
			
			// clearTimeout(fn.tId);
   //          fn.tId = setTimeout(function(){
			// 	fn.call(context);
   //          // }, 100)
   //          }, 300)
        },
        //阻止事件冒泡
        stopPropagation: function() {
            var self = this;
            //阻止事件冒泡
            this.container.on('mousedown', stopPropagation);
            this.target.on('mousedown', stopPropagation);
            //页面点击 隐藏
            $(document).on('mousedown', function(e) {
                self.container.hide();
            })
            function stopPropagation(e) {
                e.stopPropagation();
            }
        }
    };

    var kucity = null;
    $.fn.kuCity = function(options) {
        var target = $(this);
		
        target.on('focus', function(e) {
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
			if(($(target).attr('id')=="carDeparture"|| $(target).attr('id')=="carArrival")){
				$('.kucity').hide();
				// return false;
			}
            kucity.resultct.on('click', 'li', function() {
                if($.session.get('obtLanguage')=="EN"){
                    kucity.target.val($(this).find('.letter').text());
                }else if($.session.get('obtLanguage')=="CN"){
                    kucity.target.val($(this).find('.name').text());
                }
                kucity.target.attr("code",$(this).find('.name').attr('code'));
                kucity.target.attr("citycode",$(this).find('.name').attr('citycode'));
                kucity.target.attr("locationcode",$(this).find('.name').attr('locationcode'));
                kucity.triggleShow('all');
                /*多段*/
                if(kucity.target.context.className.indexOf("MultipleArrivelCity") != -1){
                    var inputIndex = parseInt(kucity.target.attr("inputIndex"))+1;
                    if(kucity.target.attr("inputIndex")!=$(".MultipleArrivelCity").length-1){
                        if($.session.get('obtLanguage')=="EN"){
                            $(".MultipleDepartureCity").eq(inputIndex).val($(this).find('.letter').text());
                        }else if($.session.get('obtLanguage')=="CN"){
                            $(".MultipleDepartureCity").eq(inputIndex).val($(this).find('.name').text());
                        }
                        $(".MultipleDepartureCity").eq(inputIndex).attr("code",$(this).find('.name').attr('code'));
                    }
                }
				//国内多段
				if(kucity.target.context.className.indexOf("domMultipleArrivel") != -1){
				    var inputIndex = parseInt(kucity.target.attr("inputIndex"))+1;
				    if(kucity.target.attr("inputIndex")!=$(".domMultipleArrivel").length-1){
				        if($.session.get('obtLanguage')=="EN"){
				            $(".domMultipleDeparture").eq(inputIndex).val($(this).find('.letter').text());
				        }else if($.session.get('obtLanguage')=="CN"){
				            $(".domMultipleDeparture").eq(inputIndex).val($(this).find('.name').text());
				        }
				        $(".domMultipleDeparture").eq(inputIndex).attr("code",$(this).find('.name').attr('code'));
				    }
				}
				
                /*酒店*/
                if(kucity.target.attr("id")=="hotelCity"||kucity.target.attr("id")=="hotelIntlCity"){
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
                            jsonStr:'{"cityCode":"'+($(kucity.target).attr('code'))+'","id":'+netUserId+',"checkIn":"'+$("#hotelDepartureDate").val()+'","checkOut":"'+$("#hotelReturnDate").val()+'"}'
                        },
                        success : function(data) {
                            var res = JSON.parse(data);
                            console.log(res);
                            
							// $("#hotelPrice").val('￥'+res.minFare+'-'+res.maxFare);
							// 12.24 删除币种
							// var hotelType=$('input[name="hotel"]:checked')[0].id
							if(JSON.parse($.session.get('ProfileInfo')).onlineStyle=="APPLE"){
								var hotelType=$('input[name="applehotel"]:checked')[0].id
							}else{
								var hotelType=$('input[name="hotel"]:checked')[0].id
							}
							console.log(hotelType)
							if(hotelType=="domHotel"){
								$("#hotelPrice").val(res.minFare+'-'+res.maxFare+ProfileInfo.OfficeCurrency);
							}
							if(hotelType=="intlHotel"){
								$("#hotelPrice").val(res.minFare+'-'+res.maxFare);
							}
                            $("#hotelPrice").attr("minPrice",res.minFare);
                            $("#hotelPrice").attr("maxPrice",res.maxFare);
                            
                            $.ajax(
                              {
                                type:'post',
                                url : $.session.get('ajaxUrl'), 
                                dataType : 'json',
                                data:{
                                    url: $.session.get('obtCompany')+"/QueryService.svc/GetCustomerCompanyAddressPost",
                                    jsonStr:'{"cityCode":"'+($(kucity.target).attr('code'))+'","id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
                                },
                                success : function(data) {
                                    $('body').mLoading("hide");
                                    var res = JSON.parse(data);
									console.log(res);
									//中心城市经纬度
									if((res.latitude && res.longitude) && (res.latitude!=0 || res.longitude!=0)){
										$.session.set('centerLat',res.latitude);
										$.session.set('centerLng',res.longitude);
									}else{
                                        $.session.remove('centerLat');
										$.session.remove('centerLng');
                                    }
                                    $("#hotelAddress").val('').removeAttr('longitude').removeAttr('latitude');
                                    if(res.companyInfos.length == 0){
                                        $("#hotelAddressSelect").addClass("hide");
                                    }else{
                                        $("#hotelAddressSelect").removeClass("hide");
                                        if($.session.get('obtLanguage')=="CN"){
                                            $("#hotelAddressSelect").html('<option value="">请选择公司</option>');
                                        }else if($.session.get('obtLanguage')=="EN"){
                                            $("#hotelAddressSelect").html('<option value="">Please select</option>');
                                        }
                                        res.companyInfos.map(function(item){
                                            if(item.CompanyAddress!=""){
                                                $("#hotelAddressSelect").append('\
                                                    <option value="'+item.CompanyAddress+'" key="'+item.Key+'">'+item.CompanyName+'</option>\
                                                    ')
                                            }
                                        })
                                       /*酒店位置*/
                                       $("#hotelAddressSelect").change(function(){
                                           $("#hotelAddress").val($('#hotelAddressSelect option:selected').val());
                                           $("#hotelAddress").attr("key",$('#hotelAddressSelect option:selected').attr("key"));
                                       }) 
                                    }
                                },
                                error : function() {
                                  // alert('fail'); 
                                } 
                              }
                            );
                        },
                        error : function() {
                          // alert('fail'); 
                        } 
                      }
                    );
                }
                /*租车*/
                if(kucity.target.attr("id")=="carDeparture"){
                    if($.session.get('obtLanguage')=="EN"){
                        $("#carArrival").val($(this).find('.letter').text());
                    }else if($.session.get('obtLanguage')=="CN"){
                        $("#carArrival").val($(this).find('.name').text());
                    }
                    $("#carArrival").attr("code",$(this).find('.name').attr('code'));
                    $("#carArrival").attr("locationcode",$(this).find('.name').attr('locationcode'));
                    $("#carArrival").attr("vendervode",$(this).find('.vendervode').text());
                }
				if(kucity.target.attr("id")=="carDeparture" || kucity.target.attr("id")=="carArrival"){
					  kucity.target.attr('vendervode',$(this).find('.vendervode').text());
					  if($('#carDeparture').attr('vendervode')!="" || $('#carArrival').attr('vendervode')!=""){
						  $('#carCompany').attr('disabled','disabled')
					  }else{
						  $('#carCompany').removeAttr('disabled')
					  }
				}
            })
        })
        return this;
    };
})(jQuery)
